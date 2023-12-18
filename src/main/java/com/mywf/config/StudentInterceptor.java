package com.mywf.config;

import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class StudentInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        Object id=request.getAttribute("id");
        if(id==null||!request.getSession().getAttribute((String) id).equals("Student")){
            System.out.println("student");
            return false;
        }
        return true;
    }
}
