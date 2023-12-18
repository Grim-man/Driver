package com.mywf.utils;

import com.mywf.constant.RegexPatterns;

public class RegexUtil {

//    private static

    public static boolean matchPhone(String phone){
        return match(phone,RegexPatterns.phone);
    }

    public static boolean matchPwd(String pwd){
        return match(pwd,RegexPatterns.pwd);
    }

    public static boolean matchNickName(String nickname) {
        return match(nickname,RegexPatterns.nickname);
    }

    public static boolean matchPin(String pin){ return match(pin,RegexPatterns.pin);}

    public static boolean matchRole(String role){
        if(StringUtil.isBlank(role)){
            return false;
        }
        return role.equals("Student")||role.equals("Coach")||role.equals("Admin");
    }

    public static boolean matchGender(String gender){
        if(StringUtil.isBlank(gender)){
            return false;
        }
        return gender.equals("男")||gender.equals("女");
    }

    public static boolean matchCardType(String card){
        return match(card,RegexPatterns.card);
    }

    public static boolean matchGroupType(String type){
        if(StringUtil.isBlank(type)){
            return false;
        }
        return type.equals("sex")||type.equals("study_state")||type.equals("driver_card_type");
    }

    public static boolean matchTitle(String title){
        if(StringUtil.isBlank(title)){
            return false;
        }
        return title.length()<100;
    }


    public static boolean matchContent(String content){
        if(StringUtil.isBlank(content)){
            return false;
        }
        return content.length()<30000;
    }

    public static boolean matchAuth(String auth){
        if(StringUtil.isBlank(auth)){
            return false;
        }
        return auth.length()<100;
    }


    private static boolean match(String str,String regex){
        if(StringUtil.isBlank(str)){
            return false;
        }
        return str.matches(regex);
    }
}
