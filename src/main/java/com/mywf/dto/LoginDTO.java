package com.mywf.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginDTO {

    private String id;
    private String token;
    private String name;
    private String role;
}
