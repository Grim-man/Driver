package com.mywf.controller;

import com.mywf.dao.CoachStudentMapper;
import com.mywf.dto.CoachStudentDTO;
import com.mywf.entity.CoachStudent;
import com.mywf.entity.Result;
import com.mywf.entity.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

@Controller
public class CoachStudentController {

    @Autowired
    private CoachStudentMapper coachStudentMapper;


    @PostMapping("/getAllStudentById")
    @ResponseBody
    public Result getAllStudentById(@RequestBody Map<String,String> map){
        final List<CoachStudentDTO> list = coachStudentMapper.getAllStudentById(map.get("id"));
        return Result.ok(String.valueOf(list.size()),list);
    }

    @PostMapping("/insertMyStudent")
    @ResponseBody
    public Result insertMyStudent(@RequestBody CoachStudent coachStudent){
        coachStudent.setId(0);
        coachStudent.setNote("");
        final Boolean xx = coachStudentMapper.insertOne(coachStudent);
        if(xx){
            return Result.ok("添加成功");
        }else{
            return Result.fail("添加失败");
        }
    }

    @PostMapping("/deleteMyStudent")
    @ResponseBody
    public Result deleteMyStudent(@RequestBody CoachStudent coachStudent){
        final Boolean xx = coachStudentMapper.removeOne(coachStudent.getId());
        if(xx){
            return Result.ok("删除成功");
        }else{
            return Result.fail("删除失败");
        }
    }

    @PostMapping("/modifyNote")
    @ResponseBody
    public Result modifyNote(@RequestBody CoachStudent coachStudent){
        final Boolean xx = coachStudentMapper.modifyNote(coachStudent.getId(),coachStudent.getNote());
        if(xx){
            return Result.ok("修改成功");
        }else{
            return Result.fail("修改失败");
        }
    }


    @PostMapping("/getAllStudentExcludeExist")
    @ResponseBody
    public Result getAllStudentExcludeExist(@RequestBody UserInfo userInfo){
        List<UserInfo> list=coachStudentMapper.getAllStudentExcludeExist(userInfo.getId());
        return Result.ok(String.valueOf(list.size()),list);
    }

}
