package com.mywf.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.mywf.dto.MyOrderDTO;
import com.mywf.dto.OrderVerifyDTO;
import com.mywf.entity.OrderStudent;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderStudentMapper extends BaseMapper<OrderStudent> {


    @Select("select o.id,o.order_type,o.coach_id,o.coach_name,o.start_time,o.end_time,os.is_pass" +
            " from orders o left join order_student os on o.id = os.order_id" +
            " where os.student_id=#{studentId}")
    List<MyOrderDTO> getMyOrder(String studentId);

    @Select("select o.id,o.order_type,o.coach_id,o.coach_name,o.start_time,o.end_time,os.student_id," +
            "(select name from userinfo where id=os.student_id) student_name,os.is_pass" +
            " from orders o right join order_student os on o.id = os.order_id")
    List<OrderVerifyDTO> getOrderVerify();
}
