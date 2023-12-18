package com.mywf.dao;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.mywf.entity.Student;
import com.mywf.entity.User;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface UserMapper extends BaseMapper<User> {

    @Select("select count(*) from user where phone=#{phone}")
    Integer isExist(String phone);

    //    @Insert("insert into student values (#{id},#{}})")
    Integer register(User user);

    @Select("select id from user where phone=#{phone} and password=#{password} and role=#{role}")
    String login(User user);

    @Select("select count(id) from user where password=#{pwd} and id=#{id}")
    Integer isPwd(String id,String pwd);


    @Update("update user set password=#{newPwd} where id=#{id}")
    Integer modifyPwd(@Param("id")String id,@Param("newPwd") String newPwd);
}
