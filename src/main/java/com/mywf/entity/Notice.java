package com.mywf.entity;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class Notice {
    private Integer id;
    private String name;
    private String content;
    private Timestamp startTime;
    private String auth;

}
