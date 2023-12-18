package com.mywf.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Result {
    private Boolean success;
    private String msg;
    private Object data;
    @JsonFormat(shape =JsonFormat.Shape.STRING,pattern ="yyyy-MM-dd HH:mm:ss",timezone ="GMT+8")
    private Timestamp timestamp;

    public static Result ok(){
        return new Result(true, null, null, new Timestamp(System.currentTimeMillis()));
    }
    public static Result ok(String msg){
        return new Result(true, msg, null, new Timestamp(System.currentTimeMillis()));
    }
    public static Result ok(Object data){
        return new Result(true, null, data, new Timestamp(System.currentTimeMillis()));
    }
    public static Result ok(String msg,Object data){
        return new Result(true, msg, data, new Timestamp(System.currentTimeMillis()));
    }
    public static Result ok(List<?> data, Long total){
        return new Result(true, null, data,  new Timestamp(total));
    }
    public static Result fail(String errorMsg){
        return new Result(false, errorMsg, null,  new Timestamp(System.currentTimeMillis()));
    }

}
