package com.mywf.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.mywf.entity.Exam;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamMapper extends BaseMapper<Exam> {

    @Select("select os.id,os.order_id,ord.order_type,os.student_id,(select name from userinfo where id=os.student_id) student_name" +
            ",os.number,os.is_ok " +
            "from order_student os left join orders ord on ord.id=os.order_id where os.is_pass='已通过'" +
            "group by os.order_id, os.student_id;")
    List<Exam> getExam();


    @Select("select os.id,os.order_id,ord.order_type,os.student_id,(select name from userinfo where id=os.student_id) student_name" +
            ",os.number,os.is_ok " +
            "from order_student os left join orders ord on ord.id=os.order_id where student_id=#{student_id} and os.is_pass='已通过'" +
            " group by ord.order_type,os.student_id;")
    List<Exam> getStudentExam(String studentId);


    @Update("update order_student set is_ok='已通过',number=number+1 where id=#{id} ")
    void setOK(Integer id);

    @Update("update order_student set is_ok='未通过',number=number+1 where id=#{id} ")
    void setNotOK(Integer id);


    @Select("select number from order_student where id=#{id}")
    Integer getNumber(Integer id);

    @Select("select is_ok from order_student where id=#{id}")
    String getIsOk(Integer id);
}
