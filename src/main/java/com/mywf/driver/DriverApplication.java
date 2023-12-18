package com.mywf.driver;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan({"com.mywf.config"})
@ComponentScan({"com.mywf.dao"})
@ComponentScan({"com.mywf.service"})
@ComponentScan({"com.mywf.impl"})
@ComponentScan({"com.mywf.controller"})
@MapperScan(basePackages = "com.mywf.dao")
@SpringBootApplication
public class DriverApplication {

    public static void main(String[] args) {
        SpringApplication.run(DriverApplication.class, args);
    }

}
