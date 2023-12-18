package com.mywf.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowedMethods("GET", "HEAD", "POST", "PUT", "DELETE")//, "OPTIONS"
                .allowCredentials(true)
                .maxAge(3600)
                .allowedHeaders("*");

    }

    @Override
    public void addInterceptors(InterceptorRegistry registry){
        List<String> all=new ArrayList<>();
        //静态html
        all.add("/html/home");
        all.add("/html/login");
        all.add("/html/register");
        all.add("/html/main");
        all.add("/register");
        all.add("/sendPin");
        all.add("/login");
        all.add("/test");
        all.add("/initInfo");
        all.add("/getNotice");
        all.add("/getSelf");
        all.add("/modifySelf");
        all.add("/modifyPwd");
        registry.addInterceptor(new JWTInterceptor())
                .addPathPatterns("/**")
                .excludePathPatterns(all);
        List<String> admin=new ArrayList<>();
        admin.add("/getStudent");
        admin.add("/getStudentGroup");
        admin.add("/getCoach");
        admin.add("/getCar");
        admin.add("/getOrder");
        admin.add("/insertNotice");
        admin.add("/insertStudent");
        admin.add("/insertCar");
        admin.add("/modifyStudent");
        admin.add("/modifyCoach");
        admin.add("/modifyCar");
        admin.add("/insertOrder");
        admin.add("/getOrderVerify");
        admin.add("/orderVerify");
        admin.add("/orderVerifyNot");
        admin.add("/modifyOrder");
        admin.add("/getExam");
        admin.add("/setExam");
        registry.addInterceptor(new AdminInterceptor())
                .addPathPatterns(admin);
        List<String> coach=new ArrayList<>();
        coach.add("/getMyCoachOrder");
        coach.add("/getOrderCoach");
        coach.add("/orderCoach");
        coach.add("/cancelOrderCoach");
        coach.add("/modifyTime");
        coach.add("/getAllStudentById");
        coach.add("/insertMyStudent");
        coach.add("/deleteMyStudent");
        coach.add("/modifyNote");
        coach.add("/getAllStudentExcludeExist");
        registry.addInterceptor(new CoachInterceptor())
                .addPathPatterns(coach);
        List<String> student=new ArrayList<>();
        student.add("/getOrderStudent");
        student.add("/getMyOrder");
        student.add("/orderStudent");
        student.add("/cancelOrder");
        student.add("/getStudentExam");
        registry.addInterceptor(new StudentInterceptor())
                .addPathPatterns(student);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry){
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/");
    }
}