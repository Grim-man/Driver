package com.mywf.utils;

public class StringUtil {

    public static boolean  isBlank(String str){
        return str == null || str.trim().equals("");
    }
}
