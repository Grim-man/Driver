package com.mywf.service;

import com.mywf.dao.UserMapper;
import com.mywf.entity.Student;
import com.mywf.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

public interface UserService {

    Boolean isExists(String phone);

    Boolean register(User user);

    String login(User user);

    Boolean isPwd(String id,String pwd);

    Boolean modifyPwd(String id,String newPwd);
}
