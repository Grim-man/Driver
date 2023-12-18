package com.mywf.dto;

import lombok.Data;
import java.sql.Date;

@Data
public class OrderDTO {
    private String orderType;
    private String coachId;
    private String startTime;
    private String endTime;
}
