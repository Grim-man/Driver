package com.mywf.controller;

import com.baomidou.mybatisplus.extension.conditions.query.QueryChainWrapper;
import com.mywf.dao.ExamMapper;
import com.mywf.dao.OrderStudentMapper;
import com.mywf.dto.MyOrderDTO;
import com.mywf.dto.OrderDTO;
import com.mywf.dto.OrderVerifyDTO;
import com.mywf.entity.*;
import com.mywf.impl.ExamServiceImpl;
import com.mywf.impl.OrderServiceImpl;
import com.mywf.impl.OrderStudentServiceImpl;
import com.mywf.impl.UserInfoServiceImpl;
import com.mywf.utils.RegexUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

@Controller
public class OrderController {

    @Autowired
    private OrderStudentMapper orderStudentMapper;

    @Autowired
    private OrderServiceImpl orderService;

    @Autowired
    private OrderStudentServiceImpl orderStudentService;

    @Autowired
    private UserInfoServiceImpl userInfoService;


    @Autowired
    private ExamServiceImpl examService;

    @PostMapping("/getOrder")
    @ResponseBody
    public Result getOrder(){
        return Result.ok(String.valueOf(orderService.query().count()),
                orderService.query().orderByDesc("start_time").list());
    }

    @PostMapping("/getMyOrder")
    @ResponseBody
    public Result getMyOrder(@RequestBody Map<String,String> map){
        List<MyOrderDTO> list=orderStudentMapper.getMyOrder(map.get("id"));
        return Result.ok(String.valueOf(list.size()), list);
    }


    @PostMapping("/getMyCoachOrder")
    @ResponseBody
    public Result getMyCoachOrder(@RequestBody Map<String,String> map){
        final QueryChainWrapper<Orders> query = orderService.query();
        return Result.ok(String.valueOf(query.eq("coach_id",map.get("id")).count()),
                query.eq("coach_id",map.get("id")).list());
    }


    @PostMapping("/getOrderStudent")
    @ResponseBody
    public Result getOrderStudent(){
        return Result.ok(String.valueOf(orderService
                        .query()
                        .and(x->x.ne("coach_id","").ne("coach_name",""))
                        .count()),
                orderService
                        .query()
                        .and(x->x.ne("coach_id","").ne("coach_name",""))
                        .orderByDesc("start_time")
                        .list());
    }

    @PostMapping("/getOrderCoach")
    @ResponseBody
    public Result getOrderCoach(){
        return Result.ok(String.valueOf(orderService
                        .query()
                        .and(x->x.eq("coach_id","").eq("coach_name",""))
                        .count()),
                orderService
                        .query()
                        .and(x->x.eq("coach_id","").eq("coach_name",""))
                        .orderByDesc("start_time")
                        .list());
    }

    @PostMapping("/insertOrder")
    @ResponseBody
    public Result insertOrder(@RequestBody OrderDTO orderDTO){
        if(!RegexUtil.matchTitle(orderDTO.getOrderType())){
            return Result.fail("预约类型错误");
        }
        if(!RegexUtil.matchTitle(orderDTO.getStartTime())||!RegexUtil.matchTitle(orderDTO.getEndTime())){
            return Result.fail("时间格式错误");
        }
        Orders orders=new Orders();
        orders.setId(0);
        orders.setCoachId(orderDTO.getCoachId());
        if(!orderDTO.getCoachId().equals("")){
            UserInfo userInfo=userInfoService.query()
                    .eq("id",orderDTO.getCoachId())
                    .one();
            if(userInfo==null){
                return Result.fail("没有此教练");
            }
            orders.setCoachName(userInfo.getName());
        }else{
            orders.setCoachName("");
        }
        orders.setOrderType(orderDTO.getOrderType());
        orders.setStartTime(Timestamp.valueOf(orderDTO.getStartTime()));
        orders.setEndTime(Timestamp.valueOf(orderDTO.getEndTime()));
        boolean xx=orderService.save(orders);
        if(xx){
            return Result.ok("添加成功");
        }else{
            return Result.ok("添加失败");
        }
    }

    @PostMapping("/orderStudent")
    @ResponseBody
    public Result orderStudent(@RequestBody OrderStudent orderStudent){
        OrderStudent order_id = orderStudentService
                .query()
                .and(x -> x.eq("order_id", orderStudent.getOrderId())
                        .eq("student_id",orderStudent.getStudentId()))
                .one();
        if(order_id!=null) {
            String isOk = examMapper.getIsOk(order_id.getId());
            final Integer number = examMapper.getNumber(order_id.getId());
            if (number != null && isOk.equals("未通过")&& number == 3) {
                return Result.fail("考试三次失败，请重修");
            }
        }
        if(order_id!=null&&(order_id.getIsPass().equals("未审核")||order_id.getIsPass().equals("已通过"))){
            return Result.fail(order_id.getIsPass()+",请勿重试");
        }
        if(order_id!=null&&order_id.getIsPass().equals("未通过")){
            return Result.fail("未通过,请勿重试");
        }
        if(order_id!=null&&!order_id.getIsPass().equals("已取消")){
            order_id.setId(0);
        }
        if(order_id==null){
            order_id=orderStudent;
            order_id.setId(0);
            order_id.setIsPass("未审核");
        }
        final boolean xx = orderStudentService.saveOrUpdate(order_id);
        if(xx){
//            Exam exam=new Exam();
//            exam.setId(order_id.getId());
//            exam.setNumber(0);
//            exam.setIsOk("未考试");
//            examService.updateById(exam);
            return Result.ok("预约成功");
        }else{
            return Result.fail("预约失败");
        }
    }

    @PostMapping("/orderCoach")
    @ResponseBody
    public Result orderCoach(@RequestBody Map<String,String> map){
        Orders orders=new Orders();
        String coachName=userInfoService.query().eq("id",map.get("coachId")).one().getName();
        orders.setId(Integer.valueOf(map.get("orderId")));
        orders.setCoachId(map.get("coachId"));
        orders.setCoachName(coachName);
        System.out.println(orders);
        final boolean xx = orderService.updateById(orders);
        if(xx){
            return Result.ok("负责成功");
        }else{
            return Result.fail("负责失败");
        }
    }


    @PostMapping("/cancelOrder")
    @ResponseBody
    public Result cancelOrder(@RequestBody OrderStudent orderStudent){
        OrderStudent order_id = orderStudentService
                .query()
                .and(x -> x.eq("order_id", orderStudent.getOrderId())
                        .eq("student_id",orderStudent.getStudentId()))
                .one();
        System.out.println(order_id);
        if(order_id==null){
            return Result.fail("没有信息");
        }
        if(order_id.getIsPass().equals("未通过")||order_id.getIsPass().equals("已取消")){
            return Result.fail("已经取消");
        }
        order_id.setIsPass("已取消");
        final boolean xx = orderStudentService.updateById(order_id);
        if(xx){
            return Result.ok("取消成功");
        }else{
            return Result.fail("取消失败");
        }
    }

    @PostMapping("/cancelOrderCoach")
    @ResponseBody
    public Result cancelOrderCoach(@RequestBody Orders orders){
        Orders old = orderService
                .query().eq("id",orders.getId()).one();
        if(!old.getCoachId().equals(orders.getCoachId())){
            return Result.fail("权限错误");
        }
        orders.setCoachId("");
        orders.setCoachName("");
        final boolean xx = orderService.updateById(orders);
        if(xx){
            return Result.ok("取消成功");
        }else{
            return Result.fail("取消失败");
        }
    }

    @PostMapping("/modifyTime")
    @ResponseBody
    public Result modifyTime(@RequestBody Orders orders){
        Orders old = orderService
                .query().eq("id",orders.getId()).one();
        if(!old.getCoachId().equals(orders.getCoachId())){
            return Result.fail("权限错误");
        }
        orders.setStartTime(orders.getStartTime());
        orders.setEndTime(orders.getEndTime());
        final boolean xx = orderService.updateById(orders);
        if(xx){
            return Result.ok("修改成功");
        }else{
            return Result.fail("修改失败");
        }
    }

    @PostMapping("/getOrderVerify")
    @ResponseBody
    public Result getOrderVerify(){
        List<OrderVerifyDTO> list=orderStudentMapper.getOrderVerify();
        return Result.ok(String.valueOf(list.size()), list);
    }


    @PostMapping("/orderVerify")
    @ResponseBody
    public Result orderVerify(@RequestBody OrderStudent orderStudent){
        OrderStudent one = orderStudentService.query().and(x -> x
                .eq("order_id", orderStudent.getId())
                .eq("student_id", orderStudent.getStudentId())).one();
        one.setIsPass("已通过");
        System.out.println(orderStudent);
        boolean xx=orderStudentService.updateById(one);
        if(xx){
            return Result.ok("审核成功");
        }else{
            return Result.fail("审核失败");
        }
    }

    @PostMapping("/orderVerifyNot")
    @ResponseBody
    public Result orderVerifyNot(@RequestBody OrderStudent orderStudent){
        OrderStudent one = orderStudentService.query().and(x -> x
                .eq("order_id", orderStudent.getId())
                .eq("student_id", orderStudent.getStudentId())).one();
        one.setIsPass("已拒绝");
        System.out.println(orderStudent);
        boolean xx=orderStudentService.updateById(orderStudent);
        if(xx){
            return Result.ok("审核成功");
        }else{
            return Result.fail("审核失败");
        }
    }

    @PostMapping("/modifyOrder")
    @ResponseBody
    public Result modifyOrder(@RequestBody Orders order){
        final UserInfo coach = userInfoService.query().eq("id", order.getCoachId()).one();
        if(coach==null){
            order.setCoachName("");
        }else{
            order.setCoachName(coach.getName());
        }
        final boolean xx = orderService.updateById(order);
        if(xx){
            return Result.ok("修改成功");
        }else{
            return Result.ok("修改失败");
        }
    }



    @Autowired
    private ExamMapper examMapper;

    @PostMapping("/getExam")
    @ResponseBody
    public Result getExam(){
        final List<Exam> exam = examMapper.getExam();
        return Result.ok(String.valueOf(exam.size()),exam);
    }

    @PostMapping("/setExam")
    @ResponseBody
    public Result setExam(@RequestBody Exam exam){
        //判断考试是否通过，通过后不可再修改，未通过可修改
        String isOk = examMapper.getIsOk(exam.getId());
        if(isOk==null){
            return Result.fail("操作异常");
        }
        if(exam.getIsOk().equals("已通过")){
            if(examMapper.getNumber(exam.getId())==3){
                if(isOk.equals("已通过")){
                    return Result.fail("已经通过，不可修改");
                }else{
                    return Result.fail("三次未通过，请重修");
                }
            }
            if(isOk.equals("已通过")){
                return Result.fail("已经通过，不可修改");
            }else{
                examMapper.setOK(exam.getId());
                return Result.ok("设置成功");
            }
        }else if(exam.getIsOk().equals("未通过")){
            if(isOk.equals("已通过")) {
                return Result.fail("已经通过，不可修改");
            }
            if(examMapper.getNumber(exam.getId())==3){
                return Result.fail("三次未通过，请重修");
            }
            examMapper.setNotOK(exam.getId());
        }else{
            return Result.fail("错误的格式");
        }
        return Result.ok("设置成功");
    }


    @PostMapping("/getStudentExam")
    @ResponseBody
    public Result getStudentExam(@RequestBody Exam exam){
        final List<Exam> studentExam = examMapper.getStudentExam(exam.getStudentId());
        return Result.ok(String.valueOf(studentExam.size()),studentExam);
    }


}

