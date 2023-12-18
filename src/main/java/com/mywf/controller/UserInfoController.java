package com.mywf.controller;


import com.baomidou.mybatisplus.extension.conditions.query.QueryChainWrapper;
import com.mywf.dao.OrderMapper;
import com.mywf.dto.FirstLoginInfoDTO;
import com.mywf.dto.PasswordDTO;
import com.mywf.entity.*;
import com.mywf.impl.CarServiceImpl;
import com.mywf.impl.NoticeServiceImpl;
import com.mywf.impl.UserInfoServiceImpl;
import com.mywf.service.CarService;
import com.mywf.service.UserInfoService;
import com.mywf.service.UserService;
import com.mywf.utils.IdUtil;
import com.mywf.utils.RegexUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

@Controller
public class UserInfoController {

    @Autowired
    private OrderMapper orderMapper;

    @Resource
    private UserService userService;

    @Autowired
    private UserInfoServiceImpl userInfoService;


    @Autowired
    private NoticeServiceImpl noticeService;


    @Autowired
    private CarServiceImpl carService;

    @PostMapping("/initInfo")
    @ResponseBody
    public Result initInfo(@RequestBody FirstLoginInfoDTO firstLoginInfoDTO){
        System.out.println(firstLoginInfoDTO);
        if(!RegexUtil.matchNickName(firstLoginInfoDTO.getName())){
            return Result.fail("用户名不符合标准");
        }
        if(!RegexUtil.matchGender(firstLoginInfoDTO.getSex())){
            return Result.fail("性别不符合标准");
        }
        if(!RegexUtil.matchCardType(firstLoginInfoDTO.getDriverCardType())){
            return Result.fail("驾照类型不符合标准");
        }
        UserInfo userInfo=new UserInfo();
        BeanUtils.copyProperties(firstLoginInfoDTO,userInfo);
        System.out.println(userInfo);
        userInfoService.updateById(userInfo);
        return Result.ok("更新完成");
    }


    @PostMapping("/getNotice")
    @ResponseBody
    public Result getNotice(){
        final QueryChainWrapper<Notice> query = noticeService.query();
        return Result.ok(String.valueOf(query.count()),query.orderByDesc("start_time").list());
    }


    @PostMapping("/getStudent")
    @ResponseBody
    public Result getStudent(){
        final QueryChainWrapper<UserInfo> query = userInfoService.query();
        return Result.ok(String.valueOf(query.eq("role","Student").count())
                ,query.eq("role","Student").list());
    }

    @PostMapping("/getStudentGroup")
    @ResponseBody
    public Result getStudent(@RequestBody Map<String,String> type){
        if(!RegexUtil.matchGroupType(type.get("type"))){
            return Result.fail("错误的类型");
        }
        final QueryChainWrapper<UserInfo> query = userInfoService.query();
        return Result.ok(String.valueOf(query.count()),
                query.eq("role","Student").orderByAsc(type.get("type")).list());
    }

    @PostMapping("/getCoach")
    @ResponseBody
    public Result getCoach(){
        final QueryChainWrapper<UserInfo> query = userInfoService.query();
        return Result.ok(String.valueOf(query.eq("role","Coach").count())
                ,query.eq("role","Coach").list());
    }

    @PostMapping("/getCar")
    @ResponseBody
    public Result getCar(){
        final QueryChainWrapper<Car> query = carService.query();
        return Result.ok(String.valueOf(query.count())
                ,query.list());
    }

    @PostMapping("/getSelf")
    @ResponseBody
    public Result getSelf(@RequestBody Map<String,String> map){
        String id=map.get("id");
        final QueryChainWrapper<UserInfo> query = userInfoService.query();
        return Result.ok(query.eq("id",id).one());
    }


    @PostMapping("/insertNotice")
    @ResponseBody
    public Result insertNotice(@RequestBody Notice notice){
        if(!RegexUtil.matchTitle(notice.getName())){
            return Result.fail("题目不符合要求");
        }
        if(!RegexUtil.matchContent(notice.getContent())){
            return Result.fail("正文不符合要求");
        }
        if(!RegexUtil.matchAuth(notice.getAuth())){
            return Result.fail("作者不符合要求");
        }
        notice.setId(0);
        notice.setStartTime(new Timestamp(System.currentTimeMillis()));
        boolean xx=noticeService.save(notice);
        if(xx){
            return Result.ok("添加成功");
        }else{
            return Result.ok("添加失败");
        }
    }


    @PostMapping("/insertStudent")
    @ResponseBody
    public Result insertStudent(@RequestBody UserInfo userInfo){
        if(!RegexUtil.matchNickName(userInfo.getName())){
            return Result.fail("名字不符合要求");
        }
        if(!RegexUtil.matchGender(userInfo.getSex())){
            return Result.fail("性别不符合要求");
        }
        String role=userInfo.getRole();
        if(!RegexUtil.matchRole(role)){
            return Result.fail("角色格式错误");
        }
        if(role.equals("Admin")){
            return Result.fail("不能注册管理员");
        }
        if(!RegexUtil.matchPhone(userInfo.getPhone())){
            return Result.fail("手机号错误");
        }
        if(!RegexUtil.matchCardType(userInfo.getDriverCardType())){
            return Result.fail("驾照类型错误");
        }
        if(userService.isExists(userInfo.getPhone())){
            return Result.fail("手机号已经被注册");
        }
        userInfo.setId(IdUtil.nextId(role));
        userInfo.setRole(role);
        userInfo.setStudyState(null);
        userInfo.setStartTime(new Timestamp(System.currentTimeMillis()));
        userInfo.setEndTime(null);
        User user=new User();
        BeanUtils.copyProperties(userInfo,user);
        boolean xx=userInfoService.save(userInfo);
        if(xx){
            user.setPassword("123456");
            userService.register(user);
            return Result.ok("添加成功");
        }else{
            return Result.ok("添加失败");
        }
    }

    @PostMapping("/insertCar")
    @ResponseBody
    public Result insertCar(@RequestBody Car car){
        if(!RegexUtil.matchCardType(car.getCarType())){
            return Result.fail("车辆类型错误");
        }
        if(!RegexUtil.matchAuth(car.getCarNumber())){
            return Result.fail("车牌号错误");
        }
        if(!RegexUtil.matchAuth(car.getStatus())){
            return Result.fail("状态错误");
        }
        car.setId(0);
        car.setStartTime(new Timestamp(System.currentTimeMillis()));
        car.setEndTime(null);
        boolean xx = carService.save(car);
        if(xx){
            return Result.ok("添加成功");
        }else{
            return Result.ok("添加失败");
        }
    }


    @PostMapping("/modifySelf")
    @ResponseBody
    public Result modifyStudentSelf(@RequestBody UserInfo userInfo){
        if(!RegexUtil.matchRole(userInfo.getRole())){
            return Result.fail("权限格式错误");
        }
        if(!RegexUtil.matchNickName(userInfo.getName())){
            return Result.fail("名字格式错误");
        }
        if(!RegexUtil.matchGender(userInfo.getSex())){
            return Result.fail("性别错误");
        }
        if(!RegexUtil.matchAuth(userInfo.getStudyState())){
            return Result.fail("状态错误");
        }
        if(userInfo.getRole().equals("Coach")){
            userInfo.setStudyState(null);
        }
        userInfo.setPhone(null);
        userInfo.setDriverCardType(null);
        userInfo.setStartTime(null);
        userInfo.setEndTime(null);
        boolean xx = userInfoService.updateById(userInfo);
        if(xx){
            return Result.ok("修改成功");
        }else{
            return Result.ok("修改失败");
        }
    }

    @PostMapping("/modifyPwd")
    @ResponseBody
    public Result modifyPwd(@RequestBody PasswordDTO passwordDTO){
        if(!RegexUtil.matchPwd(passwordDTO.getOldPwd())){
            return Result.fail("旧密码格式错误");
        }
        if(!userService.isPwd(passwordDTO.getId(),passwordDTO.getOldPwd())){
            return Result.fail("密码错误");
        }
        if(!RegexUtil.matchPwd(passwordDTO.getNewPwd())){
            return Result.fail("新密码格式错误");
        }
        if(!passwordDTO.getNewPwd().equals(passwordDTO.getNewPwdAgain())){
            return Result.fail("两次密码不一致");
        }
        Boolean xx=userService.modifyPwd(passwordDTO.getId(), passwordDTO.getNewPwd());
        if(xx){
            return Result.ok("修改成功");
        }else{
            return Result.ok("修改失败");
        }
    }

    @PostMapping("/modifyStudent")
    @ResponseBody
    public Result modifyStudent(@RequestBody UserInfo student){
        final boolean xx = userInfoService.updateById(student);
        if(xx){
            userService.modifyPwd(student.getId(),student.getPhone());
            return Result.ok("修改成功");
        }else{
            return Result.ok("修改失败");
        }
    }

    @PostMapping("/modifyCoach")
    @ResponseBody
    public Result modifyCoach(@RequestBody UserInfo coach){
        final boolean xx = userInfoService.updateById(coach);
        if(xx){
            userService.modifyPwd(coach.getId(),coach.getPhone());
            orderMapper.modifyCoachName(coach.getId(),coach.getName());
            return Result.ok("修改成功");
        }else{
            return Result.ok("修改失败");
        }
    }

    @PostMapping("/modifyCar")
    @ResponseBody
    public Result modifyCar(@RequestBody Car car){
        final boolean xx = carService.updateById(car);
        if(xx){
            return Result.ok("修改成功");
        }else{
            return Result.ok("修改失败");
        }
    }

}
