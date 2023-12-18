package com.mywf.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.mywf.dao.UserInfoMapper;
import com.mywf.entity.UserInfo;
import com.mywf.service.UserInfoService;
import org.springframework.stereotype.Service;

@Service
public class UserInfoServiceImpl extends ServiceImpl<UserInfoMapper, UserInfo> implements UserInfoService {
}
