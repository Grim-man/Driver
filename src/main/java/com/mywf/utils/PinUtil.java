package com.mywf.utils;

import java.util.Random;

public class PinUtil {
    private static final char[] CHARS = { '2', '3', '4', '5', '6', '7', '8',
            '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M',
            'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };


    public static String nextPin(int len){
        Random random=new Random();
        StringBuilder buffer = new StringBuilder();
        for(int i = 0; i < 6; i++)
        {
            buffer.append(CHARS[random.nextInt(CHARS.length)]);
        }
        return buffer.toString();
    }
}
