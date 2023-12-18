package com.mywf.dao;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.mywf.entity.Orders;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderMapper extends BaseMapper<Orders> {

    @Update("update orders set coach_name=#{coachName} where coach_id=#{coachId} ")
    void modifyCoachName(String coachId,String coachName);
}
