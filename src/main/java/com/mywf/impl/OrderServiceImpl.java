package com.mywf.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.mywf.dao.OrderMapper;
import com.mywf.entity.Orders;
import com.mywf.service.OrderService;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl extends ServiceImpl<OrderMapper, Orders> implements OrderService {
}
