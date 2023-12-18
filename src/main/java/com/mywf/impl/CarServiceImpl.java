package com.mywf.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.mywf.dao.CarMapper;
import com.mywf.entity.Car;
import com.mywf.service.CarService;
import org.springframework.stereotype.Service;

@Service
public class CarServiceImpl extends ServiceImpl<CarMapper, Car> implements CarService {
}
