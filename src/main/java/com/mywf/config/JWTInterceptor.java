package com.mywf.config;

import com.mywf.utils.JWTUtil;
import io.jsonwebtoken.*;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


public class JWTInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        if (!(handler instanceof HandlerMethod)) {
            return true;
        }
        String token=request.getHeader("authorization");
        if(token==null||token.equals("")){
            System.out.println("没有token（无效请求）");
            return false;
        }
        try {
           Claims claims=JWTUtil.parseJwt(token);
           HttpSession session=request.getSession();
           Object role=session.getAttribute(claims.getId());
           if(role==null||!role.equals(claims.getSubject())){
               System.out.println("role");
               return false;
           }
            request.setAttribute("id",claims.getId());
        } catch (MalformedJwtException e) {
            System.out.println("格式错误");
            return false;
        } catch (MissingClaimException e) {
            System.out.println("Jwt无效");
            return false;
        } catch (PrematureJwtException e) {
            System.out.println("生效实现太晚了吧");
            return false;
        } catch (SignatureException e) {
            System.out.println("签名不匹配");
            return false;
        }catch (ExpiredJwtException e){
            System.out.println("Jwt过期");
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("不知道怎么反正不对");
            return false;
        }
        return true;
    }
}
