package com.mywf.impl;

import com.mywf.dao.UserMapper;
import com.mywf.entity.Student;
import com.mywf.entity.User;
import com.mywf.service.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
@Service
public class UserServiceImpl implements UserService {


    @Resource
    private UserMapper userMapper;

    @Override
    public Boolean isExists(String phone) {
        Integer res= userMapper.isExist(phone);
        return res != null && res !=0;
    }

    @Override
    public Boolean register(User user) {
        Integer res= userMapper.register(user);
        return res != null && res != 0;
    }

    @Override
    public String login(User user) {
        return userMapper.login(user);
    }

    @Override
    public Boolean isPwd(String id, String pwd) {
        return userMapper.isPwd(id, pwd) == 1;
    }

    @Override
    public Boolean modifyPwd(String id, String newPwd) {
        return userMapper.modifyPwd(id,newPwd)==1;
    }
}
