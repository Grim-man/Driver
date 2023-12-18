package com.mywf.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class RegisterDTO {
    private String id;
    private String phone;
    private String pin;
    private String role;
    private String password;
    private String passwordAgain;
}
