package com.mywf.dto;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class MyOrderDTO {
    private Integer id;
    private String orderType;
    private String coachId;
    private String coachName;
    private Timestamp startTime;
    private Timestamp endTime;
    private String isPass;
}
