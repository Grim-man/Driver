package com.mywf.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.mywf.dto.CoachStudentDTO;
import com.mywf.entity.CoachStudent;
import com.mywf.entity.UserInfo;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CoachStudentMapper extends BaseMapper<CoachStudent> {

    @Select("select cs.id,u.id as student_id, name, sex, phone, study_state, " +
            "driver_card_type, start_time, end_time,cs.note" +
            " from coach_student cs left join userinfo u on cs.student_id=u.id" +
            " where cs.coach_id=#{coachId}")
    List<CoachStudentDTO> getAllStudentById(String coachId);

    @Insert("insert into coach_student values (0,#{coachId},#{studentId},#{note})")
    Boolean insertOne(CoachStudent coachStudent);


    @Delete("delete from coach_student where id=#{id}")
    Boolean removeOne(Integer id);

    @Update("update coach_student set note=#{note} where id=#{id}")
    Boolean modifyNote(Integer id,String note);


    @Select("select u.id,u.name from userinfo u " +
            "where u.role='Student' and u.id not in (select student_id from coach_student where coach_id=#{id})")
    List<UserInfo> getAllStudentExcludeExist(String id);


}
