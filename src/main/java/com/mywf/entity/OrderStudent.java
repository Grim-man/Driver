package com.mywf.entity;

import lombok.Data;

@Data
public class OrderStudent {
    private Integer id;
    private Integer orderId;
    private String studentId;
    private String isPass;
}
