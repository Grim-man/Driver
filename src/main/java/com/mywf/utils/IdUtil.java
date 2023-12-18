package com.mywf.utils;

import java.util.Random;

public class IdUtil {

    public static synchronized String nextId(String role){
        try {
            Thread.sleep(1);
        }catch (InterruptedException e){
            e.printStackTrace();
        }
        StringBuilder id=new StringBuilder(String.valueOf(System.currentTimeMillis()));
        switch (role) {
            case "Student":
                id.setCharAt(0, 'S');
                break;
            case "Coach":
                id.setCharAt(0, 'C');
                break;
            case "Admin":
                id.setCharAt(0, 'A');
                break;
        }
        return id.toString();
    }

    public static String nextNickName(){
        Random random=new Random();
        return "用户" + (random.nextInt(900000000) + 100000000);
    }
}
