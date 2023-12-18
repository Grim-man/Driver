package com.mywf.constant;

public class RegexPatterns {

    // 电话号码格式
    public static final String phone="^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\\d{8}$";

    // 密码格式
    //public static final string pwd="^[A-Za-z0-9_]{6,20}$";
    public static final String pwd="^(\\w){6,20}$";

    // 验证码格式
    public static final String pin="[2-9A-Z]{6}";

    // 昵称格式
    public static final String nickname="^[\\u4e00-\\u9fa5_a-zA-Z0-9-]{1,16}$";

    // 驾照类型
    public static final String card="A1|A2|A3|B1|B2|C1|C2|C3|C4|D|E|F|M|N|P";

}
