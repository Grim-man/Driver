package com.mywf.entity;

import lombok.Data;

@Data
public class CoachStudent {

    private Integer id;
    private String coachId;
    private String studentId;
    private String note;
}
