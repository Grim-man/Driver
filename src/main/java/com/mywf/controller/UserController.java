package com.mywf.controller;

import com.mywf.dto.LoginDTO;
import com.mywf.dto.RegisterDTO;
import com.mywf.entity.Result;
import com.mywf.entity.User;
import com.mywf.entity.UserInfo;
import com.mywf.service.UserInfoService;
import com.mywf.service.UserService;
import com.mywf.utils.*;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.util.Map;

@Controller
public class UserController {

   @Resource
    private UserService userService;

   @Resource
   private UserInfoService userInfoService;


//    @PostMapping("/isExists")
//    @ResponseBody
    private Result isExists(String phone){
        //手机格式检查
        if(!RegexUtil.matchPhone(phone)){
            return Result.fail("手机格式错误");
        }
        //检查手机号是否存在
        if(userService.isExists(phone)){
            return Result.fail("手机号已存在");
        }
        return Result.ok();
    }

    @PostMapping("/sendPin")
    @ResponseBody
    public Result sendPin(@RequestBody Map<String,String> map, HttpSession session){
        String phone=map.get("phone");
        Result res=isExists(phone);
        if(!res.getSuccess()){
            return res;
        }
        String pin=PinUtil.nextPin(6);
        session.setAttribute(phone,pin);
        session.setMaxInactiveInterval(60*10);
        return Result.ok(pin);
    }

    @PostMapping("/register")
    @ResponseBody
    public Result register(@RequestBody RegisterDTO registerDTO, HttpSession session){
        String phone=registerDTO.getPhone();
        System.out.println(registerDTO);
        //手机号格式检查
        if(!RegexUtil.matchPhone(phone)){
            return Result.fail("手机格式错误");
        }
        //检查手机号是否存在
        if(userService.isExists(phone)){
            return Result.fail("手机号已存在");
        }
        //密码格式检查
        if(!RegexUtil.matchPwd(registerDTO.getPassword())){
            return Result.fail("密码格式错误");
        }
        if(!registerDTO.getPassword().equals(registerDTO.getPasswordAgain())){
            return Result.fail("两次密码不一致");
        }
        //验证码格式检查
        if(!RegexUtil.matchPin(registerDTO.getPin())){
            return Result.fail("验证码格式错误");
        }
        //验证码检查
        if(!registerDTO.getPin().equals(session.getAttribute(phone))){
            return Result.fail("验证码错误");
        }
        //角色检查
        if(!RegexUtil.matchRole(registerDTO.getRole())){
            return Result.fail("Role错误");
        }
        User user=new User();
        BeanUtils.copyProperties(registerDTO,user);
        String id= IdUtil.nextId(registerDTO.getRole());
        user.setId(id);
        System.out.println(user);
        System.out.println(registerDTO);
//        return Result.fail(user.getId());
        Boolean xx=userService.register(user);
        UserInfo userInfo=new UserInfo();
        BeanUtils.copyProperties(user,userInfo);
        userInfo.setStudyState("学习");
        userInfo.setStartTime(new Timestamp(System.currentTimeMillis()));
        if(xx){
            userInfoService.save(userInfo);
            return Result.ok("注册成功");
        }else{
            return Result.fail("注册失败");
        }

    }


    @PostMapping("/login")
    @ResponseBody
    public Result login(@RequestBody User user,HttpSession session){
        if(!RegexUtil.matchPhone(user.getPhone())){
            return Result.fail("手机格式错误");
        }
        //密码格式检查
        if(!RegexUtil.matchPwd(user.getPassword())){
            return Result.fail("密码格式错误");
        }
        if(!RegexUtil.matchRole(user.getRole())){
            return Result.fail("Role错误");
        }
        if(!userService.isExists(user.getPhone())){
            return Result.fail("手机号没有注册");
        }
        String id=userService.login(user);
        if(id==null){
            return Result.fail("账号密码错误或者权限错误");
        }
        user.setId(id);
        session.setAttribute(user.getId(),user.getRole());
        session.setMaxInactiveInterval(60*30);
        LoginDTO loginDTO=new LoginDTO(user.getId(),JWTUtil.getJwt(user),"",user.getRole());
        UserInfo userInfo=userInfoService.query().eq("id",user.getId()).one();
        if(userInfo!=null){
            loginDTO.setName(userInfo.getName());
        }
        return Result.ok("登录成功",loginDTO);
//        session.setAttribute(user.getPhone(),);
    }
}
