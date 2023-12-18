package com.mywf.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FirstLoginInfoDTO {
    private String id;
    private String name;
    private String sex;
    private String DriverCardType;
}
