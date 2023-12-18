$(document).ready(function () {

    $("#register").click(function () {
       ajax('/register',
           {
               phone:$("#floatingInput").val(),
               pin:$("#pin").val(),
               password:$("#floatingPassword").val(),
               passwordAgain:$("#passwordAgain").val(),
               role:$("input[type='radio']:checked").val()
           },
           function (res) {
               if(res['success']){
                   ok(res['msg'])
                   window.location.href='/html/login'
               }else{
                   fail(res['msg'])
               }
           })
    })

    $("#send").click(function () {
       ajax('/sendPin',
           {phone:$("#floatingInput").val()},
           function (res) {
           console.log(res)
           if(res['success']){
             alert(res['msg'],'success',12000)
           }else{
               fail(res['msg'])
           }
       })
    })


    $("#login").click(function () {
        ajax('/login',
            {
                phone:$("#floatingInput").val(),
                password:$("#floatingPassword").val(),
                role:$("input[type='radio']:checked").val()
            },
            function (res) {
                if(res['success']){
                    ok(res['msg'])
                    localStorage.setItem("token", `Bearer ${res['data']['token']}`)
                    localStorage.setItem("id",res['data']['id'])
                    localStorage.setItem("role",res['data']['role'])
                    localStorage.setItem("name",res['data']['name'])
                    // sessionStorage.setItem("token",`Bearer ${res['data']}`)
                    window.location.href='/html/main'
                }else{
                    fail(res['msg'])
                }
            }
            )

    })

    $("#btn-jump-login").click(function () {
        // $.get('/login')
        window.location.href='/html/login'
        // $("#alert").alert('close')
    })
    $("#btn-jump-register").click(function () {
        // $.get('/register')
        window.location.href='/html/register'
    })
    $("#btn-login-jump-back").click(function () {
        // $.get('/home')
        window.location.href='/html/home'
    })
    $("#btn-register-jump-back").click(function () {
        // $.get('/home')
        window.location.href='/html/home'
    })
    $('#floatingInput').blur(function () {
       if(!checkPhone($(this).val())){
           alert("手机号码有误，请重填",'danger');
       }
    })

    $('#pin').blur(function () {
        if(!checkPin($(this).val())){
            alert('验证码错误','danger')
        }
    })

    $('#floatingPassword').blur(function () {
        if(!checkPwd($(this).val())){
            const pwd=$(this).val()
            if(pwd.length<6){
                alert('密码至少要6位字符或数字','danger')
            }else if(pwd.length>20){
                alert('密码大于20位','danger')
            }else{
                alert('有特殊字符','danger')
            }
        }
    })
    $("#passwordAgain").blur(function () {
        if(!checkPwdAg($(this).val())){
            alert("两次密码不相同",'danger')
        }
    })

    function checkPhone(phone){
        return /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(phone)
        // return /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678])$/.test(phone)
        // return /^1[3456789]d{9}$/.test(phone)
        // return /^1(3|4|5|6|7|8|9)d{9}$/.test(phone);

    }

    function checkPin(pin){
        return /^[2-9A-Z]{6}$/.test(pin);
    }

    function checkPwd(pwd){
        return /^(\w){6,20}$/.test(pwd)
    }

    function checkPwdAg(pwd){
        return $("#floatingPassword").val()===pwd
    }

    // const ajaxHtml=(url,data,func) =>{
    //     $.ajax({
    //         type:'get',
    //         url:url,
    //         data:JSON.stringify(data),
    //         async:false,
    //         success:func,
    //         error:function (res) {
    //             console.log(res)
    //             alert('错误','danger')
    //         },
    //         headers:{
    //             'Authorization':localStorage.getItem('token')
    //         },
    //         contentType:'application/json',
    //     })
    // }


    const ajax= (url,data,func) =>{
        $.ajax({
            type:'post',
            url:url,
            data:JSON.stringify(data),
            success:func,
            error:function (res) {
                console.log(res)
                alert('错误','danger')
            },
            headers:{
                'Authorization':localStorage.getItem('token')
            },
            contentType:'application/json',
            dataType:'json'
        })
    }

    const alert= (message,type,time) =>{
        const wrapper=document.createElement('div')
        wrapper.innerHTML=[
            `<div class="alert alert-${type} message-info fixed-top w-50 mx-auto d-flex justify-content-between" role="alert">`,
            `   <div>${message}</div>`,
            '</div>'
        ].join('')
        $("#alert").empty().append(wrapper).slideDown()
        setTimeout(function () {
            $("#alert").fadeOut()
        },time)
    }

    const ok = (msg) =>{
        alert(msg,'success',1000)
    }

    const fail = (msg) =>{
        alert(msg,'danger',1000)
    }
})

