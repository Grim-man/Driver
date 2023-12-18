package com.mywf.dto;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class CoachStudentDTO {
    private String id;
    private String studentId;
    private String name;
    private String sex;
    private String phone;
    private String studyState;
    private String DriverCardType;
    private Timestamp startTime;
    private Timestamp endTime;
    private String note;
}
