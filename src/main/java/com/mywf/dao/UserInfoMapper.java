package com.mywf.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.mywf.entity.Car;
import com.mywf.entity.Coach;
import com.mywf.entity.Student;
import com.mywf.entity.UserInfo;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserInfoMapper extends BaseMapper<UserInfo> {


}
