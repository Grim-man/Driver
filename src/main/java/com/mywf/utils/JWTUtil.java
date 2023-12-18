package com.mywf.utils;

import com.mywf.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class JWTUtil {

    private static final String key="chi-jia-hang-driver-maker";

    public static String getJwt(User user) {
        JwtBuilder jwtBuilder = Jwts.builder()
                .setId(user.getId())
                .setSubject(user.getRole())    //用户名  角色
                .setIssuedAt(new Date())//登录时间
                .signWith(SignatureAlgorithm.HS256, key)
                .setExpiration(new Date(new Date().getTime() + 1000 * 60 * 10 * 3));
        //设置过期时间
        //前三个为载荷payload 最后一个为头部 header
        return jwtBuilder.compact();
    }


    public static Claims parseJwt(String token) {

        return Jwts.parser()
                .setSigningKey(key)
                .parseClaimsJws(token.split(" ")[1])
                .getBody();
    }

}

//token的解析
//有状态登录  服务器端保存用户信息
//无状态登录  服务器端没有保存用户信息   无状态效率比有状态效率高

