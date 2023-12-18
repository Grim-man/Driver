package com.mywf.entity;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class Orders {
    private Integer id;
    private String orderType;
    private String coachId;
    private String coachName;
    private Timestamp startTime;
    private Timestamp endTime;
}
