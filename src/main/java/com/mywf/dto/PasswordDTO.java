package com.mywf.dto;

import lombok.Data;

@Data
public class PasswordDTO {
    private String id;
    private String oldPwd;
    private String newPwd;
    private String newPwdAgain;
}
