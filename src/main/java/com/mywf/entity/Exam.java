package com.mywf.entity;

import lombok.Data;

@Data
public class Exam {
    private Integer id;
    private Integer orderId;
    private String orderType;
    private String studentId;
    private String studentName;
    private Integer number;
    private String isOk;
    private String isPass;
}
