$(document).ready(function () {
    //初始设置
    localStorage.setItem('current-notice','0')
    localStorage.setItem('current-notice-page','1')

    localStorage.setItem('current-student','0')
    localStorage.setItem('current-student-page','1')

    localStorage.setItem('current-coach','0')
    localStorage.setItem('current-coach-page','1')

    localStorage.setItem('current-car','0')
    localStorage.setItem('current-car-page','1')

    localStorage.setItem('current-order','0')
    localStorage.setItem('current-order-page','1')

    localStorage.setItem('current-order-verify','0')
    localStorage.setItem('current-order-verify-page','1')

    localStorage.setItem('current-order-student','0')
    localStorage.setItem('current-order-student-page','1')

    localStorage.setItem('current-myorder','0')
    localStorage.setItem('current-myorder-page','1')

    localStorage.setItem('current-order-coach','0')
    localStorage.setItem('current-order-coach-page','1')

    localStorage.setItem('current-myorder-coach','0')
    localStorage.setItem('current-myorder-coach-page','1')

    localStorage.setItem('current-my-student','0')
    localStorage.setItem('current-my-student-page','1')


    localStorage.setItem('current-exam','0')
    localStorage.setItem('current-exam-page','1')


    //初始化
    console.log('initNavItems')
    initNavItems()
    console.log('initNavName')
    initNavName()
    console.log('initNotice')
    initNotice()
    console.log('initSelf')
    initSelf()
    if(localStorage.getItem('role')==='Admin'){
        console.log('initStudent')
        initStudent()
        console.log('initCoach')
        initCoach()
        console.log('initCar')
        initCar()
        console.log('initOrder')
        initOrder()
        console.log('initOrderVerify')
        initOrderVerify()
        console.log('initExam')
        initExam()
    }
    if(localStorage.getItem('role')==='Student'){
        initOrderStudent()
        initMyOrder()
        initStudentExam()
    }
    if(localStorage.getItem('role')==='Coach'){
        initOrderCoach()
        initMyCoachOrder()
        initMyStudent()
        initStudentExclude()
    }


    //save
    $("#save").click(function () {
        const name = $("#name")
        const d_sex = $("#dropdown-sex")
        const d_card = $("#dropdown-card")
        if (!/^[\u4e00-\u9fa5_a-zA-Z0-9-]{1,16}$/.test(name.val())) {
            fail('昵称必须为中英文（还可以为下划线）1-16个字符')
            return
        }
        if (d_sex.val() === '性别') {
            fail('请选择性别')
            return
        }
        if (d_card.val() === '驾驶证类型') {
            fail('请选择要学习的驾照类型')
            return
        }
        ajax('/initInfo',
            {
                id:localStorage.getItem("id"),
                name: name.val(),
                sex: d_sex.val(),
                DriverCardType: d_card.val()
            },
            function (res) {
                if (res['success']) {
                    ok(res['msg'])
                    $("#modal-btn-close").click()
                    initSelf()
                } else {
                    fail(res['msg'])
                }
            })
    })

    //logout
    $("#btn-logout").click(function () {
        localStorage.clear()
        window.location.replace('/html/home')
    })

    //click
    // $("#home").click(function () {
    //     type='Notice'
    //     title('公告')
    //     page('Notice')
    //     $("#btn-add").show()
    //     op('Notice')
    //     createNoticeList(notice_arr)
    // })
    // $("#student").click(function () {
    //     type='Student'
    //     title('学生信息管理')
    //     page('Student')
    //     $("#btn-add").show()
    //     op('Student')
    //     createStudentTable(student_arr)
    // })
    //
    //
    // $("#coach").click(function () {
    //     type='Coach'
    //     title('教练信息管理')
    //     page('Coach')
    //     $("#btn-add").show()
    //     op('Coach')
    //     createCoachTable(coach_arr)
    // })
    //
    //
    // $("#car").click(function () {
    //     type='Car'
    //     title('车辆管理')
    //     page('Car')
    //     $("#btn-add").show()
    //     op('Car')
    //     createCarTable(car_arr)
    // })


    // $("body").on('click','.notice-array',function () {
    //     // console.log(Array.prototype.indexOf.call($(this).parent()))
    //     // console.log(document.getElementsByClassName('notice-array').)
    //     // ok($(this))
    //     console.log('具体的news')
    //     createNotice(notice_arr[$(".notice-array").index($(this))])
    // })
    const ul=$("#ul-nav")

    ul.on('click','#home',function () {
        type='Notice'
        title('公告')
        if(localStorage.getItem('role')==='Admin'){
            $("#btn-add").show()
        }else{
            $("#btn-add").hide()
        }
        page('Notice')
        op('Notice')
        createNoticeList(notice_arr)
    })

    ul.on('click','#student',function () {
        type='Student'
        title('学生信息管理')
        $("#btn-add").show()
        page('Student')
        op('Student')
        createStudentTable(student_arr)
    })

    ul.on('click','#coach',function () {
        type='Coach'
        title('教练信息管理')
        page('Coach')
        $("#btn-add").show()
        op('Coach')
        createCoachTable(coach_arr)
    })

    ul.on('click','#car',function () {
        type='Car'
        title('车辆管理')
        page('Car')
        $("#btn-add").show()
        op('Car')
        createCarTable(car_arr)
    })
    ul.on('click','#order',function () {
        type='Order'
        title('预约管理')
        page('Order')
        $("#btn-add").show()
        op('Order')
        createOrderTable(order_arr)
    })
    ul.on('click','#order-verify',function () {
        type='Order-Verify'
        title('预约审核')
        page('Order-Verify')
        $("#btn-add").hide()
        op('Order-Verify')
        createOrderVerifyTable(order_verify_arr)
    })
    ul.on('click','#order-student',function () {
        type='Order-Student'
        title('预约选择')
        $("#btn-add").hide()
        page('Order-Student')
        // $("#btn-add").show()
        op('Order-Student')
        createOrderStudentTable(order_student_arr)
    })
    ul.on('click','#myorder',function () {
        type='MyOrder'
        title('我的预约')
        $("#btn-add").hide()
        page('MyOrder')
        // $("#btn-add").show()
        op('MyOrder')
        createMyOrderTable(my_order_arr)
    })
    ul.on('click','#personal',function () {
        type='Personal'
        title('个人中心')
        $("#btn-add").hide()
        op('Personal')
        createPersonTable()
    })
    ul.on('click',"#order-coach",function () {
        type='Order-Coach'
        title("预约选择")
        $("#btn-add").hide()
        page('Order-Coach')
        op('Order-Coach')
        createOrderCoachTable(order_coach_arr)
    })
    ul.on('click','#orderdate-coach',function () {
        type='MyCoachOrder'
        title('预约日程管理')
        $("#btn-add").hide()
        page('MyCoachOrder')
        // $("#btn-add").show()
        op('MyCoachOrder')
        createMyCoachOrderTable(my_order_arr)
    })
    ul.on('click','#my-student',function () {
        type='MyStudent'
        title('我的学员')
        $("#btn-add").show()
        page('MyStudent')
        // $("#btn-add").show()
        op('MyStudent')
        createMyStudentTable(my_student_arr)
    })
    ul.on('click','#exam',function () {
        type='Exam'
        title('成绩管理')
        page('Exam')
        $("#btn-add").hide()
        op('Exam')
        createExamTable(exam_arr)
    })
    ul.on('click','#studentExam',function () {
        type='StudentExam'
        title('成绩查询')
        page('StudentExam')
        $("#btn-add").hide()
        op('StudentExam')
        createStudentExamTable(exam_arr)
    })

    $("#home").click()

    //add
    $("#btn-add").click(function () {
        createAddModal()
    })

    //prev
    $("#btn-prev").click(()=>{
        switch (type) {
            case 'Notice':{
                current=parseInt(localStorage.getItem("current-notice"))+1
                current_page=parseInt(localStorage.getItem("current-notice-page"))
                total_page=Math.ceil(parseInt(localStorage.getItem("page-notice"))/10)
                if(current_page>1){
                    current-=11
                    current_page--
                    localStorage.setItem("current-notice",current)
                    localStorage.setItem("current-notice-page",current_page)
                    page(type)
                    createNoticeList(notice_arr)
                }
                break
            }
            case 'Student':{
                current=parseInt(localStorage.getItem("current-student"))+1
                current_page=parseInt(localStorage.getItem("current-student-page"))
                total_page=Math.ceil(parseInt(localStorage.getItem("page-student"))/10)
                if(current_page>1){
                    current-=11
                    current_page--
                    localStorage.setItem("current-student",current)
                    localStorage.setItem("current-student-page",current_page)
                    page(type)
                    createStudentTable(student_arr)
                }
                break
            }
            case 'Coach':{
                current=parseInt(localStorage.getItem("current-coach"))+1
                current_page=parseInt(localStorage.getItem("current-coach-page"))
                total_page=Math.ceil(parseInt(localStorage.getItem("page-coach"))/10)
                if(current_page>1){
                    current-=11
                    current_page--
                    localStorage.setItem("current-coach",current)
                    localStorage.setItem("current-coach-page",current_page)
                    page(type)
                    createCoachTable(coach_arr)
                }
                break
            }
            case 'Car':{
                current=parseInt(localStorage.getItem("current-car"))+1
                current_page=parseInt(localStorage.getItem("current-car-page"))
                total_page=Math.ceil(parseInt(localStorage.getItem("page-car"))/10)
                if(current_page>1){
                    current-=11
                    current_page--
                    localStorage.setItem("current-car",current)
                    localStorage.setItem("current-car-page",current_page)
                    page(type)
                    createCarTable(car_arr)
                }
                break
            }
            case 'Order':{
                current=parseInt(localStorage.getItem("current-order"))+1
                current_page=parseInt(localStorage.getItem("current-order-page"))
                total_page=Math.ceil(parseInt(localStorage.getItem("page-order"))/10)
                if(current_page>1){
                    current-=11
                    current_page--
                    localStorage.setItem("current-order",current)
                    localStorage.setItem("current-order-page",current_page)
                    page(type)
                    createOrderTable(order_arr)
                }
                break
            }
            case 'Order-Verify':{
                current=parseInt(localStorage.getItem("current-order-verify"))+1
                current_page=parseInt(localStorage.getItem("current-order-verify-page"))
                total_page=Math.ceil(parseInt(localStorage.getItem("page-order-verify"))/10)
                if(current_page>1){
                    current-=11
                    current_page--
                    localStorage.setItem("current-order-verify",current)
                    localStorage.setItem("current-order-verify-page",current_page)
                    page(type)
                    createOrderVerifyTable(order_verify_arr)
                }
                break
            }
            case 'Order-Student':{
                current=parseInt(localStorage.getItem("current-order-student"))+1
                current_page=parseInt(localStorage.getItem("current-order-student-page"))
                total_page=Math.ceil(parseInt(localStorage.getItem("page-order-student"))/10)
                if(current_page>1){
                    current-=11
                    current_page--
                    localStorage.setItem("current-order-student",current)
                    localStorage.setItem("current-order-student-page",current_page)
                    page(type)
                    createOrderStudentTable(order_student_arr)
                }
                break
            }
            case 'MyOrder':{
                current=parseInt(localStorage.getItem("current-myorder"))+1
                current_page=parseInt(localStorage.getItem("current-myorder-page"))
                total_page=Math.ceil(parseInt(localStorage.getItem("page-myorder"))/10)
                if(current_page>1){
                    current-=11
                    current_page--
                    localStorage.setItem("current-myorder",current)
                    localStorage.setItem("current-myorder-page",current_page)
                    page(type)
                    createMyOrderTable(my_order_arr)
                }
                break
            }
            case 'Order-Coach':{
                current=parseInt(localStorage.getItem("current-order-coach"))+1
                current_page=parseInt(localStorage.getItem("current-order-coach-page"))
                total_page=Math.ceil(parseInt(localStorage.getItem("page-order-coach"))/10)
                if(current_page>1){
                    current-=11
                    current_page--
                    localStorage.setItem("current-order-coach",current)
                    localStorage.setItem("current-order-coach-page",current_page)
                    page(type)
                    createOrderCoachTable(order_coach_arr)
                }
                break
            }
            case 'MyCoachOrder':{
                current=parseInt(localStorage.getItem("current-myorder-coach"))+1
                current_page=parseInt(localStorage.getItem("current-myorder-coach-page"))
                total_page=Math.ceil(parseInt(localStorage.getItem("page-myorder-coach"))/10)
                if(current_page>1){
                    current-=11
                    current_page--
                    localStorage.setItem("current-myorder-coach",current)
                    localStorage.setItem("current-myorder-coach-page",current_page)
                    page(type)
                    createMyCoachOrderTable(my_order_arr)
                }
                break
            }
            case 'MyStudent':{
                current=parseInt(localStorage.getItem("current-my-student"))+1
                current_page=parseInt(localStorage.getItem("current-my-student-page"))
                total_page=Math.ceil(parseInt(localStorage.getItem("page-my-student"))/10)
                if(current_page>1){
                    current-=11
                    current_page--
                    localStorage.setItem("current-my-student",current)
                    localStorage.setItem("current-my-student-page",current_page)
                    page(type)
                    createMyStudentTable(my_student_arr)
                }
                break
            }
            case 'Exam':{
                current=parseInt(localStorage.getItem("current-exam"))+1
                current_page=parseInt(localStorage.getItem("current-exam-page"))
                total_page=Math.ceil(parseInt(localStorage.getItem("page-exam"))/10)
                if(current_page>1){
                    current-=11
                    current_page--
                    localStorage.setItem("current-exam",current)
                    localStorage.setItem("current-exam-page",current_page)
                    page(type)
                    createExamTable(exam_arr)
                }
                break
            }
            case 'StudentExam':{
                current=parseInt(localStorage.getItem("current-exam"))+1
                current_page=parseInt(localStorage.getItem("current-exam-page"))
                total_page=Math.ceil(parseInt(localStorage.getItem("page-exam"))/10)
                if(current_page>1){
                    current-=11
                    current_page--
                    localStorage.setItem("current-exam",current)
                    localStorage.setItem("current-exam-page",current_page)
                    page(type)
                    createStudentExamTable(exam_arr)
                }
                break
            }
        }
    })

    //next
    $("#btn-next").click(()=>{
        switch (type) {
            case 'Notice':{
                current=parseInt(localStorage.getItem("current-notice"))+1
                current_page=parseInt(localStorage.getItem("current-notice-page"))
                total_page=Math.ceil(parseInt(localStorage.getItem("page-notice"))/10)
                if(current_page<total_page){
                    current+=9
                    current_page++
                    localStorage.setItem("current-notice",current)
                    localStorage.setItem("current-notice-page",current_page)
                    page(type)
                    createNoticeList(notice_arr)
                }
                break
            }
            case 'Student':{
                current=parseInt(localStorage.getItem("current-student"))+1
                current_page=parseInt(localStorage.getItem("current-student-page"))
                total_page=Math.ceil(parseInt(localStorage.getItem("page-student"))/10)
                if(current_page<total_page){
                    current+=9
                    current_page++
                    localStorage.setItem("current-student",current)
                    localStorage.setItem("current-student-page",current_page)
                    page(type)
                    createStudentTable(student_arr)
                }
                break
            }
            case 'Coach':{
                current=parseInt(localStorage.getItem("current-coach"))+1
                current_page=parseInt(localStorage.getItem("current-coach-page"))
                total_page=Math.ceil(parseInt(localStorage.getItem("page-coach"))/10)
                if(current_page<total_page){
                    current+=9
                    current_page++
                    localStorage.setItem("current-coach",current)
                    localStorage.setItem("current-coach-page",current_page)
                    page(type)
                    createCoachTable(coach_arr)
                }
                break
            }
            case 'Car':{
                current=parseInt(localStorage.getItem("current-car"))+1
                current_page=parseInt(localStorage.getItem("current-car-page"))
                total_page=Math.ceil(parseInt(localStorage.getItem("page-car"))/10)
                if(current_page<total_page){
                    current+=9
                    current_page++
                    localStorage.setItem("current-car",current)
                    localStorage.setItem("current-car-page",current_page)
                    page(type)
                    createCarTable(car_arr)
                }
                break
            }
            case 'Order':{
                current=parseInt(localStorage.getItem("current-order"))+1
                current_page=parseInt(localStorage.getItem("current-order-page"))
                total_page=Math.ceil(parseInt(localStorage.getItem("page-order"))/10)
                if(current_page<total_page){
                    current+=9
                    current_page++
                    localStorage.setItem("current-order",current)
                    localStorage.setItem("current-order-page",current_page)
                    page(type)
                    createOrderTable(order_arr)
                }
                break
            }
            case 'Order-Verify':{
                current=parseInt(localStorage.getItem("current-order-verify"))+1
                current_page=parseInt(localStorage.getItem("current-order-verify-page"))
                total_page=Math.ceil(parseInt(localStorage.getItem("page-order-verify"))/10)
                if(current_page<total_page){
                    current+=9
                    current_page++
                    localStorage.setItem("current-order-verify",current)
                    localStorage.setItem("current-order-verify-page",current_page)
                    page(type)
                    createOrderVerifyTable(order_verify_arr)
                }
                break
            }
            case 'Order-Student':{
                current=parseInt(localStorage.getItem("current-order-student"))+1
                current_page=parseInt(localStorage.getItem("current-order-student-page"))
                total_page=Math.ceil(parseInt(localStorage.getItem("page-order-student"))/10)
                if(current_page<total_page){
                    current+=9
                    current_page++
                    localStorage.setItem("current-order-student",current)
                    localStorage.setItem("current-order-student-page",current_page)
                    page(type)
                    createOrderStudentTable(order_student_arr)
                }
                break
            }
            case 'MyOrder':{
                current=parseInt(localStorage.getItem("current-myorder"))+1
                current_page=parseInt(localStorage.getItem("current-myorder-page"))
                total_page=Math.ceil(parseInt(localStorage.getItem("page-myorder"))/10)
                if(current_page<total_page){
                    current+=9
                    current_page++
                    localStorage.setItem("current-myorder",current)
                    localStorage.setItem("current-myorder-page",current_page)
                    page(type)
                    createMyOrderTable(my_order_arr)
                }
                break
            }
            case 'Order-Coach':{
                current=parseInt(localStorage.getItem("current-order-coach"))+1
                current_page=parseInt(localStorage.getItem("current-order-coach-page"))
                total_page=Math.ceil(parseInt(localStorage.getItem("page-order-coach"))/10)
                if(current_page<total_page){
                    current+=9
                    current_page++
                    localStorage.setItem("current-order-coach",current)
                    localStorage.setItem("current-order-coach-page",current_page)
                    page(type)
                    createOrderCoachTable(order_coach_arr)
                }
                break
            }
            case 'MyCoachOrder':{
                current=parseInt(localStorage.getItem("current-myorder-coach"))+1
                current_page=parseInt(localStorage.getItem("current-myorder-coach-page"))
                total_page=Math.ceil(parseInt(localStorage.getItem("page-myorder-coach"))/10)
                if(current_page<total_page){
                    current+=9
                    current_page++
                    localStorage.setItem("current-myorder-coach",current)
                    localStorage.setItem("current-myorder-coach-page",current_page)
                    page(type)
                    createMyCoachOrderTable(my_order_arr)
                }
                break
            }
            case 'MyStudent':{
                current=parseInt(localStorage.getItem("current-my-student"))+1
                current_page=parseInt(localStorage.getItem("current-my-student-page"))
                total_page=Math.ceil(parseInt(localStorage.getItem("page-my-student"))/10)
                if(current_page<total_page){
                    current+=9
                    current_page++
                    localStorage.setItem("current-my-student",current)
                    localStorage.setItem("current-my-student-page",current_page)
                    page(type)
                    createMyStudentTable(my_student_arr)
                }
                break
            }
            case 'Exam':{
                current=parseInt(localStorage.getItem("current-exam"))+1
                current_page=parseInt(localStorage.getItem("current-exam-page"))
                total_page=Math.ceil(parseInt(localStorage.getItem("page-exam"))/10)
                if(current_page<total_page){
                    current+=9
                    current_page++
                    localStorage.setItem("current-exam",current)
                    localStorage.setItem("current-exam-page",current_page)
                    page(type)
                    createExamTable(exam_arr)
                }
                break
            }
            case 'StudentExam':{
                current=parseInt(localStorage.getItem("current-exam"))+1
                current_page=parseInt(localStorage.getItem("current-exam-page"))
                total_page=Math.ceil(parseInt(localStorage.getItem("page-exam"))/10)
                if(current_page<total_page){
                    current+=9
                    current_page++
                    localStorage.setItem("current-exam",current)
                    localStorage.setItem("current-exam-page",current_page)
                    page(type)
                    createStudentExamTable(exam_arr)
                }
                break
            }
        }
    })



})
let type=''
let self
let notice_arr=[]
let student_arr=[]
let coach_arr=[]
let car_arr=[]
let order_arr=[]
let order_verify_arr=[]
let order_student_arr=[]
let exam_arr=[]
let my_order_arr=[]
let my_student_arr=[]
let student_exclude_arr=[]
let order_coach_arr=[]
let current
let current_page=1
let total_page=0
let option=''


//alert
const alert= (message,type,timeout) =>{
    const wrapper=document.createElement('div')
    wrapper.innerHTML=[
        `<div class="alert alert-${type} up-max message-info fixed-top w-50 mx-auto d-flex justify-content-between" role="alert">`,
        `   <div>${message}</div>`,
        '</div>'
    ].join('')
    $("#alert").empty().append(wrapper).slideDown()
    setTimeout(function () {
        $("#alert").fadeOut()
    },timeout)
}

const ok = (msg) =>{
    alert(msg,'success',1000)
}

const fail = (msg) =>{
    alert(msg,'danger',1000)
}

const title = (msg)=>{
    $("#title").text(msg)
}

const ajax= (url,data,func) => {
    $.ajax({
        type: 'post',
        url: url,
        data: JSON.stringify(data),
        success: func,
        error: function (res) {
            console.log(res)
            alert('错误', 'danger')
        },
        headers: {
            'Authorization': localStorage.getItem('token')
        },
        contentType: 'application/json',
        dataType: 'json'
    })
}

//page
const page=(type)=>{
    if(type==='Notice'){
        $("#btn-page").text((parseInt(localStorage.getItem('current-notice-page')))+
            '/'+Math.ceil(parseInt(localStorage.getItem("page-notice"))/10)+'（页）')
    }else if(type==='Student'){
        $("#btn-page").text((parseInt(localStorage.getItem('current-student-page')))+
            '/'+Math.ceil(parseInt(localStorage.getItem("page-student"))/10)+'（页）')
    }else if(type==='Coach'){
        $("#btn-page").text((parseInt(localStorage.getItem('current-coach-page')))+
            '/'+Math.ceil(parseInt(localStorage.getItem("page-coach"))/10)+'（页）')
    }else if(type==='Car'){
        $("#btn-page").text((parseInt(localStorage.getItem('current-car-page')))+
            '/'+Math.ceil(parseInt(localStorage.getItem("page-car"))/10)+'（页）')
    }else if(type==='Order'){
        $("#btn-page").text((parseInt(localStorage.getItem('current-order-page')))+
            '/'+Math.ceil(parseInt(localStorage.getItem("page-order"))/10)+'（页）')
    }else if(type==='Order-Verify'){
        $("#btn-page").text((parseInt(localStorage.getItem('current-order-verify-page')))+
            '/'+Math.ceil(parseInt(localStorage.getItem("page-order-verify"))/10)+'（页）')
    }else if(type==='Exam'){
        $("#btn-page").text((parseInt(localStorage.getItem('current-exam-page')))+
            '/'+Math.ceil(parseInt(localStorage.getItem("page-exam"))/10)+'（页）')
    }else if(type==='Order-Student'){
        $("#btn-page").text((parseInt(localStorage.getItem('current-order-student-page')))+
            '/'+Math.ceil(parseInt(localStorage.getItem("page-order-student"))/10)+'（页）')
    }else if(type==='MyOrder'){
        $("#btn-page").text((parseInt(localStorage.getItem('current-myorder-page')))+
            '/'+Math.ceil(parseInt(localStorage.getItem("page-myorder"))/10)+'（页）')
    }else if(type==='Order-Coach'){
        $("#btn-page").text((parseInt(localStorage.getItem('current-order-coach-page')))+
            '/'+Math.ceil(parseInt(localStorage.getItem("page-order-coach"))/10)+'（页）')
    }else if(type==='MyCoachOrder'){
        $("#btn-page").text((parseInt(localStorage.getItem('current-myorder-coach-page')))+
            '/'+Math.ceil(parseInt(localStorage.getItem("page-myorder-coach"))/10)+'（页）')
    }else if(type==='MyStudent'){
        $("#btn-page").text((parseInt(localStorage.getItem('current-my-student-page')))+
            '/'+Math.ceil(parseInt(localStorage.getItem("page-my-student"))/10)+'（页）')
    }else if(type==='Exam'){
        $("#btn-page").text((parseInt(localStorage.getItem('current-exam-page')))+
            '/'+Math.ceil(parseInt(localStorage.getItem("page-exam"))/10)+'（页）')
    }else if(type==='StudentExam'){
        $("#btn-page").text((parseInt(localStorage.getItem('current-exam-page')))+
            '/'+Math.ceil(parseInt(localStorage.getItem("page-exam"))/10)+'（页）')
    }
}


const btn_group_hide=()=>{
    $("#btn-page").hide();
    $("#btn-prev").hide();
    $("#btn-next").hide()
    $("#btn-op").hide()
}
const btn_group_show=()=>{
    $("#btn-page").show();
    $("#btn-prev").show();
    $("#btn-next").show()
    $("#btn-op").show()
}

const btn_single_hide=()=>{
    $("#btn-single").hide()
}
const btn_single_show=()=>{
    $("#btn-single").show()
}


//op
const op=(type)=>{
    if(type==='Notice'){
        btn_group_show()
        $("#btn-op").hide()
        const back=$("#btn-single")
        back.off('click')
        back.html(`<option id="btn-notice-back" class="btn btn-outline-secondary">返回</option>`)
        back.on('click','#btn-notice-back',function () {
            if(localStorage.getItem('role')==='Admin'){
                $("#btn-add").show()
            }else{
                $("#btn-add").hide()
            }
            btn_group_show()
            $("#btn-op").hide()
            btn_single_hide()
            createNoticeList(notice_arr)
        })
        btn_single_hide()
    }else if(type==='Student'){
        btn_group_show()
        btn_single_hide()
        const op=$("#btn-op")
        op.off('change')
        op.html(`<option class="dropdown-item">按开始时间升序</option>`+
            `<option class="dropdown-item">按开始时间降序</option>`+
            `<option class="dropdown-item">性别</option>`+
            `<option class="dropdown-item">学习状态</option>`+
            `<option class="dropdown-item">驾照类型</option>`)
        // const arr=$("#btn-op .dropdown-item")
        op.change(function () {
            const it=$("#btn-op option:selected").text()
            if(it==='按开始时间升序'){
                createStudentTable(student_arr.sort(function (a,b) {
                    if(a.startTime === '...'){
                        return 1
                    }else if(b.startTime ===  '...'){
                        return 1
                    }
                    return a.startTime<b.startTime?-1:1
                }))
            }else if(it==='按开始时间降序'){
                createStudentTable(student_arr.sort(function (a,b) {
                    if(a.startTime === '...'){
                        return 1
                    }else if(b.startTime ===  '...'){
                        return 1
                    }
                    return a.startTime>b.startTime?-1:1
                }))
            }else if(it==='性别'){
                createStudentTable(student_arr.sort(function (a,b) {
                    if(a.sex==='女'){
                        return -1
                    }
                    return 1
                }))
            }else if(it==='学习状态'){
                student_arr=Enumerable.from(student_arr).orderBy(x=>x.studyState).toArray()
                createStudentTable(student_arr)
            }else if(it==='驾照类型'){
                student_arr=Enumerable.from(student_arr).orderBy(x=>x.driverCardType).toArray()
                createStudentTable(student_arr)
            }

        })
    }else if(type==='Coach'){
        btn_group_show()
        btn_single_hide()
        const op=$("#btn-op")
        op.off('change')
        op.html(`<option class="dropdown-item">按入职时间升序</option>`+
            `<option class="dropdown-item">按入职时间降序</option>`+
            `<option class="dropdown-item">性别</option>`+
            `<option class="dropdown-item">驾照类型</option>`)
        // const arr=$("#btn-op .dropdown-item")
        op.change(function () {
            const it=$("#btn-op option:selected").text()
            if(it==='按入职时间升序'){
                createCoachTable(coach_arr.sort(function (a,b) {
                    if(a.startTime === '...'){
                        return 1
                    }else if(b.startTime ===  '...'){
                        return 1
                    }
                    return a.startTime<b.startTime?-1:1
                }))
            }else if(it==='按入职时间降序'){
                createCoachTable(coach_arr.sort(function (a,b) {
                    if(a.startTime === '...'){
                        return 1
                    }else if(b.startTime ===  '...'){
                        return 1
                    }
                    return a.startTime>b.startTime?-1:1
                }))
            }else if(it==='性别'){
                createCoachTable(coach_arr.sort(function (a,b) {
                    if(a.sex==='女'){
                        return -1
                    }
                    return 1
                }))
            } else if(it==='驾照类型'){
                coach_arr=Enumerable.from(coach_arr).orderBy(x=>x.driverCardType).toArray()
                createCoachTable(coach_arr)
            }
        })
    }else if(type==='Car'){
        btn_group_show()
        btn_single_hide()
        const op=$("#btn-op")
        op.off('change')
        op.html(`<option class="dropdown-item">按时间升序</option>`+
            `<option class="dropdown-item">按时间降序</option>`+
            `<option class="dropdown-item">车牌号</option>`+
            `<option class="dropdown-item">状态</option>`+
            `<option class="dropdown-item">车辆类型</option>`)
        // const arr=$("#btn-op .dropdown-item")
        op.change(function () {
            const it=$("#btn-op option:selected").text()
            if(it==='按时间升序'){
                createCarTable(car_arr.sort(function (a,b) {
                    if(a.startTime === '...'){
                        return 1
                    }else if(b.startTime ===  '...'){
                        return 1
                    }
                    return a.startTime<b.startTime?-1:1
                }))
            }else if(it==='按时间降序'){
                createCarTable(car_arr.sort(function (a,b) {
                    if(a.startTime === '...'){
                        return 1
                    }else if(b.startTime ===  '...'){
                        return 1
                    }
                    return a.startTime>b.startTime?-1:1
                }))
            }else if(it==='状态'){
                car_arr=Enumerable.from(car_arr).orderBy(x=>x.status).toArray()
                createCarTable(car_arr)
            } else if(it==='车牌号'){
                car_arr=Enumerable.from(car_arr).orderBy(x=>x.carNumber).toArray()
                createCarTable(car_arr)
            }else if(it==='车辆类型'){
                car_arr=Enumerable.from(car_arr).orderBy(x=>x.carType).toArray()
                createCarTable(car_arr)
            }
        })
    }else if(type==='Personal'){
        btn_group_hide()
        const single=$("#btn-single")
        single.off('click')
        single.empty().append(`<option class="btn btn-sm btn-primary">修改密码</option>`)
        single.on('click',function () {
            const body=$("#modal-add-body")
            const add=$("#modal-btn-add")
            add.off('click')
            body.html('<div class="form-floating mb-2">\n' +
                '                    <input type="password" class="form-control" id="modal-modify-oldPwd" placeholder="off">\n' +
                '                    <label for="modal-add-student-name">密码</label>\n' +
                '                </div>'+
                '<div class="form-floating mb-2">\n' +
                '                    <input type="password" class="form-control" id="modal-modify-newPwd" placeholder="off">\n' +
                '                    <label for="modal-add-student-sex">新密码</label>\n' +
                '                </div>'+
                '<div class="form-floating mb-2">\n' +
                '                    <input type="password" class="form-control" id="modal-modify-newPwdAgain" placeholder="off">\n' +
                '                    <label for="modal-add-student-phone">再次输入</label>\n' +
                '                </div>'
            )
            add.click(function () {
                ajax('/modifyPwd',
                    {
                        id:localStorage.getItem('id'),
                        oldPwd:$("#modal-modify-oldPwd").val(),
                        newPwd:$("#modal-modify-newPwd").val(),
                        newPwdAgain:$("#modal-modify-newPwdAgain").val()
                    },(res)=>{
                        if(res['success']){
                            ok('修改成功')
                            $("#modal-add-trigger").click()
                        }else{
                            fail('修改失败')
                        }
                    })
            })
            $("#modal-add-trigger").click()
        })
        btn_single_show()
    }else if(type==='Order'){
        btn_group_show()
        btn_single_hide()
        const op=$("#btn-op")
        op.off('change')
        op.html(`<option class="dropdown-item">按开始时间升序</option>`+
            `<option class="dropdown-item">按开始时间降序</option>`+
            `<option class="dropdown-item">预约类型</option>`+
            `<option class="dropdown-item">负责教练</option>`)
        // const arr=$("#btn-op .dropdown-item")
        op.change(function () {
            const it=$("#btn-op option:selected").text()
            if(it==='按开始时间升序'){
                createOrderTable(order_arr.sort(function (a,b) {
                    if(a.startTime === '...'){
                        return 1
                    }else if(b.startTime ===  '...'){
                        return 1
                    }
                    return a.startTime<b.startTime?-1:1
                }))
            }else if(it==='按开始时间降序'){
                createOrderTable(order_arr.sort(function (a,b) {
                    if(a.startTime === '...'){
                        return 1
                    }else if(b.startTime ===  '...'){
                        return 1
                    }
                    return a.startTime>b.startTime?-1:1
                }))
            }else if(it==='预约类型'){
                order_arr=Enumerable.from(order_arr).orderBy(x=>x.orderType).toArray()
                createOrderTable(order_arr)
            } else if(it==='负责教练'){
                order_arr=Enumerable.from(order_arr).orderBy(x=>x.coachName).toArray()
                createOrderTable(order_arr)
            }
        })
    }else if(type==='Order-Coach'){
        btn_group_show()
        btn_single_hide()
        const op=$("#btn-op")
        op.off('change')
        op.html(`<option class="dropdown-item">按开始时间升序</option>`+
            `<option class="dropdown-item">按开始时间降序</option>`+
            `<option class="dropdown-item">预约类型</option>`)
        // const arr=$("#btn-op .dropdown-item")
        op.change(function () {
            const it=$("#btn-op option:selected").text()
            if(it==='按开始时间升序'){
                createOrderCoachTable(order_coach_arr.sort(function (a,b) {
                    if(a.startTime === '...'){
                        return 1
                    }else if(b.startTime ===  '...'){
                        return 1
                    }
                    return a.startTime<b.startTime?-1:1
                }))
            }else if(it==='按开始时间降序'){
                createOrderCoachTable(order_coach_arr.sort(function (a,b) {
                    if(a.startTime === '...'){
                        return 1
                    }else if(b.startTime ===  '...'){
                        return 1
                    }
                    return a.startTime>b.startTime?-1:1
                }))
            }else if(it==='预约类型'){
                order_coach_arr=Enumerable.from(order_coach_arr).orderBy(x=>x.orderType).toArray()
                createOrderCoachTable(order_coach_arr)
            }
        })
    } else if(type==='MyCoachOrder'){
        btn_group_show()
        btn_single_hide()
        const op=$("#btn-op")
        op.off('change')
        op.html(`<option class="dropdown-item">按开始时间升序</option>`+
            `<option class="dropdown-item">按开始时间降序</option>`+
            `<option class="dropdown-item">预约类型</option>`)
        // const arr=$("#btn-op .dropdown-item")
        op.change(function () {
            const it=$("#btn-op option:selected").text()
            if(it==='按开始时间升序'){
                createMyCoachOrderTable(my_order_arr.sort(function (a,b) {
                    if(a.startTime === '...'){
                        return 1
                    }else if(b.startTime ===  '...'){
                        return 1
                    }
                    return a.startTime<b.startTime?-1:1
                }))
            }else if(it==='按开始时间降序'){
                createMyCoachOrderTable(my_order_arr.sort(function (a,b) {
                    if(a.startTime === '...'){
                        return 1
                    }else if(b.startTime ===  '...'){
                        return 1
                    }
                    return a.startTime>b.startTime?-1:1
                }))
            }else if(it==='预约类型'){
                my_order_arr=Enumerable.from(my_order_arr).orderBy(x=>x.orderType).toArray()
                createMyCoachOrderTable(my_order_arr)
            }
        })
    }else if(type==='Order-Verify'){
        btn_group_show()
        btn_single_hide()
        const op=$("#btn-op")
        op.off('change')
        op.html(`<option class="dropdown-item">按开始时间升序</option>`+
            `<option class="dropdown-item">按开始时间降序</option>`+
            `<option class="dropdown-item">预约类型</option>`+
            `<option class="dropdown-item">负责教练</option>`+
            `<option class="dropdown-item">学员姓名</option>`+
            `<option class="dropdown-item">审核状态</option>`
        )
        // const arr=$("#btn-op .dropdown-item")
        op.change(function () {
            const it=$("#btn-op option:selected").text()
            if(it==='按开始时间升序'){
                createOrderVerifyTable(order_verify_arr.sort(function (a,b) {
                    if(a.startTime === '...'){
                        return 1
                    }else if(b.startTime ===  '...'){
                        return 1
                    }
                    return a.startTime<b.startTime?-1:1
                }))
            }else if(it==='按开始时间降序'){
                createOrderVerifyTable(order_verify_arr.sort(function (a,b) {
                    if(a.startTime === '...'){
                        return 1
                    }else if(b.startTime ===  '...'){
                        return 1
                    }
                    return a.startTime>b.startTime?-1:1
                }))
            }else if(it==='预约类型'){
                order_verify_arr=Enumerable.from(order_verify_arr).orderBy(x=>x.orderType).toArray()
                createOrderVerifyTable(order_verify_arr)
            } else if(it==='负责教练'){
                order_verify_arr=Enumerable.from(order_verify_arr).orderBy(x=>x.coachId).toArray()
                createOrderVerifyTable(order_verify_arr)
            } else if(it==='学员姓名'){
                order_verify_arr=Enumerable.from(order_verify_arr).orderBy(x=>x.studentId).toArray()
                createOrderVerifyTable(order_verify_arr)
            } else if(it==='审核状态'){
                order_verify_arr=Enumerable.from(order_verify_arr).orderBy(x=>x.isPass).toArray()
                createOrderVerifyTable(order_verify_arr)
            }
        })
    }else if(type==='Order-Student'){
        btn_group_show()
        btn_single_hide()
        const op=$("#btn-op")
        op.off('change')
        op.html(`<option class="dropdown-item">按开始时间升序</option>`+
            `<option class="dropdown-item">按开始时间降序</option>`+
            `<option class="dropdown-item">预约类型</option>`+
            `<option class="dropdown-item">负责教练</option>`)
        // const arr=$("#btn-op .dropdown-item")
        op.change(function () {
            const it=$("#btn-op option:selected").text()
            if(it==='按开始时间升序'){
                createOrderStudentTable(order_student_arr.sort(function (a,b) {
                    if(a.startTime === '...'){
                        return 1
                    }else if(b.startTime ===  '...'){
                        return 1
                    }
                    return a.startTime<b.startTime?-1:1
                }))
            }else if(it==='按开始时间降序'){
                createOrderStudentTable(order_student_arr.sort(function (a,b) {
                    if(a.startTime === '...'){
                        return 1
                    }else if(b.startTime ===  '...'){
                        return 1
                    }
                    return a.startTime>b.startTime?-1:1
                }))
            }else if(it==='预约类型'){
                order_student_arr=Enumerable.from(order_student_arr).orderBy(x=>x.orderType).toArray()
                createOrderStudentTable(order_student_arr)
            } else if(it==='负责教练'){
                order_student_arr=Enumerable.from(order_student_arr).orderBy(x=>x.coachId).toArray()
                createOrderStudentTable(order_student_arr)
            }
        })
    }else if(type==='MyOrder'){
        btn_group_show()
        btn_single_hide()
        const op=$("#btn-op")
        op.off('change')
        op.html(`<option class="dropdown-item">按开始时间升序</option>`+
            `<option class="dropdown-item">按开始时间降序</option>`+
            `<option class="dropdown-item">预约类型</option>`+
            `<option class="dropdown-item">负责教练</option>`)
        // const arr=$("#btn-op .dropdown-item")
        op.change(function () {
            const it=$("#btn-op option:selected").text()
            if(it==='按开始时间升序'){
                createMyOrderTable(my_order_arr.sort(function (a,b) {
                    if(a.startTime === '...'){
                        return 1
                    }else if(b.startTime ===  '...'){
                        return 1
                    }
                    return a.startTime<b.startTime?-1:1
                }))
            }else if(it==='按开始时间降序'){
                createMyOrderTable(my_order_arr.sort(function (a,b) {
                    if(a.startTime === '...'){
                        return 1
                    }else if(b.startTime ===  '...'){
                        return 1
                    }
                    return a.startTime>b.startTime?-1:1
                }))
            }else if(it==='预约类型'){
                my_order_arr=Enumerable.from(my_order_arr).orderBy(x=>x.orderType).toArray()
                createMyOrderTable(my_order_arr)
            } else if(it==='负责教练'){
                my_order_arr=Enumerable.from(my_order_arr).orderBy(x=>x.coachId).toArray()
                createMyOrderTable(my_order_arr)
            }
        })
    }else if(type==='MyStudent'){
        btn_group_show()
        btn_single_hide()
        const op=$("#btn-op")
        op.off('change')
        op.html(`<option class="dropdown-item">按开始时间升序</option>`+
            `<option class="dropdown-item">按开始时间降序</option>`+
            `<option class="dropdown-item">性别</option>`+
            `<option class="dropdown-item">学习状态</option>`+
            `<option class="dropdown-item">驾照类型</option>`
        )
        // const arr=$("#btn-op .dropdown-item")
        op.change(function () {
            const it=$("#btn-op option:selected").text()
            if(it==='按开始时间升序'){
                createMyStudentTable(my_student_arr.sort(function (a,b) {
                    if(a.startTime === '...'){
                        return 1
                    }else if(b.startTime ===  '...'){
                        return 1
                    }
                    return a.startTime<b.startTime?-1:1
                }))
            }else if(it==='按开始时间降序'){
                createMyStudentTable(my_student_arr.sort(function (a,b) {
                    if(a.startTime === '...'){
                        return 1
                    }else if(b.startTime ===  '...'){
                        return 1
                    }
                    return a.startTime>b.startTime?-1:1
                }))
            }else if(it==='性别'){
                createMyStudentTable(my_student_arr.sort(function (a,b) {
                    if(a.sex==='女'){
                        return -1
                    }
                    return 1
                }))
            }else if(it==='学习状态'){
                my_student_arr=Enumerable.from(my_student_arr).orderBy(x=>x.studyState).toArray()
                createMyStudentTable(my_student_arr)
            }else if(it==='驾照类型'){
                my_student_arr=Enumerable.from(my_student_arr).orderBy(x=>x.driverCardType).toArray()
                createMyStudentTable(my_student_arr)
            }

        })
    }else if(type==='Exam'){
        btn_group_show()
        btn_single_hide()
        const op=$("#btn-op")
        op.off('change')
        op.html(
            `<option class="dropdown-item">预约科目</option>`+
            `<option class="dropdown-item">学生姓名</option>`+
            `<option class="dropdown-item">考试次数</option>`+
            `<option class="dropdown-item">是否通过</option>`
        )
        // const arr=$("#btn-op .dropdown-item")
        op.change(function () {
            const it=$("#btn-op option:selected").text()
            if(it==='预约科目'){
                exam_arr=Enumerable.from(exam_arr).orderBy(x=>x.orderType).toArray()
                createExamTable(exam_arr)
            }else if(it==='学生姓名'){
                exam_arr=Enumerable.from(exam_arr).orderBy(x=>x.studentId).toArray()
                createExamTable(exam_arr)
            }else if(it==='考试次数'){
                exam_arr=Enumerable.from(exam_arr).orderByDescending(x=>x.number).toArray()
                createExamTable(exam_arr)
            }else if(it==='是否通过'){
                exam_arr=Enumerable.from(exam_arr).orderBy(x=>x.isOk).toArray()
                createExamTable(exam_arr)
            }

        })
    }else if(type==='StudentExam'){
        btn_group_show()
        btn_single_hide()
        const op=$("#btn-op")
        op.off('change')
        op.html(
            `<option class="dropdown-item">预约科目</option>`+
            `<option class="dropdown-item">考试次数</option>`+
            `<option class="dropdown-item">是否通过</option>`
        )
        // const arr=$("#btn-op .dropdown-item")
        op.change(function () {
            const it=$("#btn-op option:selected").text()
            if(it==='预约科目'){
                exam_arr=Enumerable.from(exam_arr).orderBy(x=>x.orderType).toArray()
                createStudentExamTable(exam_arr)
            }else if(it==='考试次数'){
                exam_arr=Enumerable.from(exam_arr).orderByDescending(x=>x.number).toArray()
                createStudentExamTable(exam_arr)
            }else if(it==='是否通过'){
                exam_arr=Enumerable.from(exam_arr).orderBy(x=>x.isOk).toArray()
                createStudentExamTable(exam_arr)
            }
        })
    }
}
//filter
const filter=(res)=>{
    if(res===car_arr){
        for(let i=0;i<res.length;i++){
            if(res[i]['carNumber']===null){
                res[i]['carNumber']=''
            }
            if(res[i]['carType']===null){
                res[i]['carType']=''
            }
            if(res[i]['status']===null){
                res[i]['status']=''
            }
            if(res[i]['startTime']===null){
                res[i]['startTime']='...'
            }
            if(res[i]['endTime']===null){
                res[i]['endTime']='...'
            }
        }
        return
    }
    for(let i=0;i<res.length;i++){
        if(res[i]['name']===null){
            res[i]['name']=''
        }
        if(res[i]['sex']===null){
            res[i]['sex']=''
        }
        if(res[i]['studyState']===null){
            res[i]['studyState']=''
        }
        if(res[i]['driverCardType']===null){
            res[i]['driverCardType']=''
        }
        if(res[i]['startTime']===null){
            res[i]['startTime']='...'
        }
        if(res[i]['endTime']===null){
            res[i]['endTime']='...'
        }
    }
}

//init
const initNavItems = () => {
    const role = localStorage.getItem('role')
    const ul = $(".nav.flex-column")
    // ul.empty()
    if (role === 'Admin') {
        ul.append(admin)
    } else if (role === 'Coach') {
        ul.append(coach)
    } else if (role === 'Student') {
        ul.append(student)
    }else{
        fail("初始化侧导航栏子项失败")
    }
}
const initNavName = () => {
    const name = localStorage.getItem('name')
    if(name==='null'||name===''){
        $("#modal-btn-close-x").hide()
        $("#modal-btn-close").hide()
        // $("#modal").modal({backdrop: 'static', keyboard: false})
        $("#modal-trigger").click()
    }else{
        alert(name+',您好','success',2500)
    }
    // $("#nav-name").text(name+",你好")

}
const initNotice=()=>{
    ajax('/getNotice',
        {
        },
        function (res) {
            console.log('getNotice')
            console.log(res)
            if (res['success']) {
                // ok(res['msg'])
                localStorage.setItem("page-notice",res['msg'])
                notice_arr=res['data']
                console.log(notice_arr)
            } else {
                fail(res['msg'])
            }
        })
}
const initStudent=()=>{
    ajax('/getStudent',
        {
        },
        function (res) {
            console.log('getStudent')
            if (res['success']) {
                // ok(res['msg'])
                localStorage.setItem("page-student",res['msg'])
                student_arr=res['data']
                filter(student_arr)
                console.log(student_arr)
            } else {
                fail(res['msg'])
            }
        })
}
const initCoach=()=>{
    ajax('/getCoach',
        {
        },
        function (res) {
            if (res['success']) {
                // ok(res['msg'])
                localStorage.setItem("page-coach",res['msg'])
                coach_arr=res['data']
                filter(coach_arr)
                console.log(coach_arr)
            } else {
                fail(res['msg'])
            }
        })
}
const initCar=()=>{
    ajax('/getCar',
        {
        },
        function (res) {
            if (res['success']) {
                // ok(res['msg'])
                localStorage.setItem("page-car",res['msg'])
                car_arr=res['data']
                filter(car_arr)
                console.log(car_arr)
            } else {
                fail(res['msg'])
            }
        })
}
const initOrder=()=>{
    ajax('/getOrder',
        {
        },
        function (res) {
            if (res['success']) {
                // ok(res['msg'])
                localStorage.setItem("page-order",res['msg'])
                order_arr=res['data']
                filter(order_arr)
                console.log(order_arr)
            } else {
                // fail(res['msg'])
            }
        })
}
const initOrderVerify=()=>{
    ajax('/getOrderVerify',
        {
        },
        function (res) {
            if (res['success']) {
                // ok(res['msg'])
                localStorage.setItem("page-order-verify",res['msg'])
                order_verify_arr=res['data']
            } else {
                // fail(res['msg'])
            }
        })
}
const initStudentExam=()=>{
    ajax('/getStudentExam',
        {
            'studentId':localStorage.getItem('id')
        },
        function (res) {
            if (res['success']) {
                // ok(res['msg'])
                localStorage.setItem("page-exam",res['msg'])
                exam_arr=res['data']
            } else {
                // fail(res['msg'])
            }
        })
}
const initOrderStudent=()=>{
    ajax('/getOrderStudent',
        {
        },
        function (res) {
            if (res['success']) {
                // ok(res['msg'])
                localStorage.setItem("page-order-student",res['msg'])
                order_student_arr=res['data']
            } else {
                // fail(res['msg'])
            }
        })
}
const initOrderCoach=()=>{
    ajax('/getOrderCoach',
        {
        },
        function (res) {
            if (res['success']) {
                // ok(res['msg'])
                localStorage.setItem("page-order-coach",res['msg'])
                order_coach_arr=res['data']
            } else {
                fail(res['msg'])
            }
        })
}
const initMyOrder=()=>{
    ajax('/getMyOrder',
        {
            id:localStorage.getItem('id')
        },
        function (res) {
            if (res['success']) {
                // ok(res['msg'])
                localStorage.setItem("page-myorder",res['msg'])
                my_order_arr=res['data']
            } else {
                fail(res['msg'])
            }
        })
}
const initMyCoachOrder=()=>{
    ajax('/getMyCoachOrder',
        {
            id:localStorage.getItem('id')
        },
        function (res) {
            if (res['success']) {
                // ok(res['msg'])
                localStorage.setItem("page-myorder-coach",res['msg'])
                my_order_arr=res['data']
            } else {
                fail(res['msg'])
            }
        })
}
const initMyStudent=()=>{
    ajax('/getAllStudentById',
        {
            id:localStorage.getItem('id')
        },
        function (res) {
            if (res['success']) {
                // ok(res['msg'])
                localStorage.setItem("page-my-student",res['msg'])
                my_student_arr=res['data']
                filter(my_student_arr)
            } else {
                fail(res['msg'])
            }
        })
}

const initExam=()=>{
    ajax('/getExam',
        {
        },
        function (res) {
            if (res['success']) {
                // ok(res['msg'])
                localStorage.setItem("page-exam",res['msg'])
                exam_arr=res['data']
            } else {
                // fail(res['msg'])
            }
        })
}
const initSelf=()=>{
    ajax('/getSelf',
        {
            id:localStorage.getItem('id')
        },
        function (res) {
            if (res['success']) {
                // ok(res['msg'])
                self=res['data']
                console.log(self)
            } else {
                fail(res['msg'])
            }
        })
}

const initStudentExclude=()=>{
    ajax('/getAllStudentExcludeExist',
        {
            id:localStorage.getItem('id')
        },
        function (res) {
            if (res['success']) {
                // ok(res['msg'])
                student_exclude_arr=res['data']
                filter(my_student_arr)
            } else {
                fail(res['msg'])
            }
        })
}



//create Notice And List
const createNoticeList=(res)=>{
    const ul=$("<ul></ul>")
    ul.attr('class','news_list')
    const page=parseInt(localStorage.getItem("current-notice"))
    const slice=res.slice(page,page+10)
    console.log(slice)
    for(let i=page;i<page+slice.length;i++){
        const a=$(`<a class="notice-array" href="#">${res[i]['name']}</a>`)
        ul.append(`<li onclick="notice_item(${i})"><span>[${res[i]['startTime']}]</span>${a.get(0).outerHTML}</li>`)
        // a.on('click',function () {
        //     createNotice(notice_arr[i])
        // })
    }
    $("#content").empty().append(ul)
}
const notice_item=(i)=>{
    $("#btn-add").hide()
    btn_group_hide()
    btn_single_show()
    createNotice(notice_arr[i])
}
const createNotice=(res)=>{
    console.log('createNotice')
    const wrapper=document.createElement('div')
    wrapper.setAttribute('class','OneOfTwo')
    const list=document.createElement('div')
    list.setAttribute('class','listConts')
    const title=document.createElement('h1')
    title.setAttribute('class','title')
    title.innerText=res['name']
    list.append(title)
    console.log(title)
    const info=document.createElement('div')
    info.setAttribute('class','info')
    info.innerText=res['startTime']
    list.append(info)
    console.log(info)
    const content=document.createElement('div')
    content.setAttribute('class','clear')
    const str=res['content'].split('\n\r')
    for(let i=0;i<str.length;i++){
        const line=document.createElement('p')
        line.setAttribute('class','each-word')
        const span=document.createElement('span')
        span.setAttribute('class','each-word-next')
        span.innerText=str[i]
        line.append(span)
        content.append(line)
    }
    const line=document.createElement('p')
    line.setAttribute('class','each-word')
    line.setAttribute('class','text-end')
    const span=document.createElement('span')
    span.setAttribute('class','each-word-next')
    span.innerText=res['auth']
    line.append(span)
    content.append(line)
    list.append(content)
    wrapper.append(list)
    $("#content").empty().append(wrapper)
}


//create Table
const createStudentTable=(res)=>{
    const div=$("<div class='table-responsive'></div>")
    const table=$('<table class="table table-striped table-sm">\n'+
        '                    <thead>\n' +
        '                    <tr>\n' +
        '                        <th scope="col">序号</th>\n' +
        '                        <th scope="col">ID</th>\n' +
        '                        <th scope="col">姓名</th>\n' +
        '                        <th scope="col">性别</th>\n' +
        '                        <th scope="col">手机号</th>\n' +
        '                        <th scope="col">学习状态</th>\n' +
        '                        <th scope="col">驾照类型</th>\n' +
        '                        <th scope="col">开始时间</th>\n' +
        '                        <th scope="col">结束时间</th>\n' +
        '                    </tr>\n' +
        '                    </thead>\n' +
        '                </table>')
    //'<tbody>\n' + '</tbody>\n'
    const body=$("<tbody></tbody>")
    const page=parseInt(localStorage.getItem("current-student"))
    const slice=res.slice(page,page+10)
    console.log(slice)
    for(let i=page;i<page+slice.length;i++){
        body.append(`<tr>\n` +
            `<td>${i+1}</td>\n` +
            `<td>${res[i]['id']}</td>\n` +
            `<td>${res[i]['name']}</td>\n` +
            `<td>${res[i]['sex']}</td>\n` +
            `<td>${res[i]['phone']}</td>\n` +
            `<td>${res[i]['studyState']}</td>\n` +
            `<td>${res[i]['driverCardType']}</td>\n` +
            `<td>${res[i]['startTime']}</td>\n` +
            `<td>${res[i]['endTime']}</td>\n` +
            `<td><button class="btn btn-outline-primary" onclick="modify_student(this,${i})">修改</button></td>\n`+
            `</tr>`)
    }
    table.append(body)
    div.append(table)
    $("#content").empty().append(div)
}

const modify_student=(button,i)=>{
    const title=$("#modal-modify-title")
    const body=$("#modal-modify-body")
    const add=$("#modal-btn-modify")
    add.off('click')
    title.text('学员信息修改')
    body.html(
        '<div class="col-sm-6 me-2">'+
        '                    <label>ID</label>\n' +
        `                    <input type="text" class="form-control" id="modal-modify-id" value="${student_arr[i]['id']}" disabled data-date-format="yyyy-mm-dd hh:ii:ss">\n` +
        '</div>'+
        '<div class="col-sm-6 me-2">'+
        '                    <label>姓名</label>\n' +
        `                    <input type="text" class="form-control" id="modal-modify-name" value="${student_arr[i]['name']}" data-date-format="yyyy-mm-dd hh:ii:ss">\n` +
        '</div>'+
        '<div class="col-sm-6 me-2">'+
        '                    <label>性别</label>\n' +
        `                    <input type="text" class="form-control" id="modal-modify-sex" value="${student_arr[i]['sex']}" data-date-format="yyyy-mm-dd hh:ii:ss">\n` +
        '</div>'+
        '<div class="col-sm-6 me-2">'+
        '                    <label>手机号</label>\n' +
        `                    <input type="text" class="form-control" id="modal-modify-phone" value="${student_arr[i]['phone']}" data-date-format="yyyy-mm-dd hh:ii:ss">\n` +
        '</div>'+
        '<div class="col-sm-6 me-2">'+
        '                    <label>学习状态</label>\n' +
        `                    <input type="text" class="form-control" id="modal-modify-studyState" value="${student_arr[i]['studyState']}" data-date-format="yyyy-mm-dd hh:ii:ss">\n` +
        '</div>'+
        '<div class="col-sm-6 me-2">'+
        '                    <label>驾照类型</label>\n' +
        `                    <input type="text" class="form-control" id="modal-modify-driverCardType" value="${student_arr[i]['driverCardType']}" data-date-format="yyyy-mm-dd hh:ii:ss">\n` +
        '</div>'+
        '<div class="col-sm-6 me-2">'+
        '                    <label>开始时间</label>\n' +
        `                    <input type="text" class="form-control" id="modal-modify-startTime" value="${student_arr[i]['startTime']}" data-date-format="yyyy-mm-dd hh:ii:ss">\n` +
        '</div>'+
        '<div class="col-sm-6 me-2">'+
        '                    <label>结束时间</label>\n' +
        `                    <input type="text" class="form-control" id="modal-modify-endTime" value="${student_arr[i]['endTime']}" data-date-format="yyyy-mm-dd hh:ii:ss">\n` +
        '</div>'
    )
    const startTime=$("#modal-modify-startTime")
    const endTime=$("#modal-modify-endTime")
    add.click(function () {
        ajax('/modifyStudent',
            {
                id:student_arr[i]['id'],
                name:$("#modal-modify-name").val(),
                sex:$("#modal-modify-sex").val(),
                phone:$("#modal-modify-phone").val(),
                studyState:$("#modal-modify-studyState").val(),
                driverCardType:$("#modal-modify-driverCardType").val(),
                startTime:startTime.val()==='...'?null:startTime.val(),
                endTime:endTime.val()==='...'?null:endTime.val()
            },(res)=>{
                if(res['success']){
                    ok(res['msg'])
                    initStudent()
                    $("#modal-modify-trigger").click()
                }else{
                    fail(res['msg'])
                }
            })
    })
    startTime.datetimepicker({
        language:  'zh-CN',
        pickerPosition:'top-right',
        prevText: '上月',           // 设置datepicker上一月按钮的样式
        nextText : '下月',
        prevButton: true, // ture显示上一月按钮 false不显示上一月按钮 位置在datepicker左上角
        nextButton: true,
        autoclose:true
    })
    endTime.datetimepicker({
        language:  'zh-CN',
        pickerPosition:'top-right',
        next: 'xdsoft_next',           // 设置datepicker上一月按钮的样式
        prev : 'xdsoft_prev',
        autoclose:true
    })
    $("#modal-modify-trigger").click()
}
const createCoachTable=(res)=>{
    const div=$("<div class='table-responsive'></div>")
    const table=$('<table class="table table-striped table-sm">\n'+
        '                    <thead>\n' +
        '                    <tr>\n' +
        '                        <th scope="col">序号</th>\n' +
        '                        <th scope="col">ID</th>\n' +
        '                        <th scope="col">姓名</th>\n' +
        '                        <th scope="col">性别</th>\n' +
        '                        <th scope="col">手机号</th>\n' +
        '                        <th scope="col">驾照类型</th>\n' +
        '                        <th scope="col">就职时间</th>\n' +
        '                        <th scope="col">离职时间</th>\n' +
        '                    </tr>\n' +
        '                    </thead>\n' +
        '                </table>')
    //'<tbody>\n' + '</tbody>\n'
    const body=$("<tbody></tbody>")
    const page=parseInt(localStorage.getItem("current-coach"))
    const slice=res.slice(page,page+10)
    for(let i=page;i<page+slice.length;i++){
        body.append(`<tr>\n` +
            `<td>${i+1}</td>\n` +
            `<td>${res[i]['id']}</td>\n` +
            `<td>${res[i]['name']}</td>\n` +
            `<td>${res[i]['sex']}</td>\n` +
            `<td>${res[i]['phone']}</td>\n` +
            `<td>${res[i]['driverCardType']}</td>\n` +
            `<td>${res[i]['startTime']}</td>\n` +
            `<td>${res[i]['endTime']}</td>\n` +
            `<td><button class="btn btn-outline-primary" onclick="modify_coach(this,${i})">修改</button></td>\n`+
            `</tr>`)
    }
    table.append(body)
    div.append(table)
    $("#content").empty().append(div)
}

const modify_coach=(button,i)=>{
    const title=$("#modal-modify-title")
    const body=$("#modal-modify-body")
    const add=$("#modal-btn-modify")
    add.off('click')
    title.text('教练信息修改')
    body.html(
        '<div class="col-sm-6 me-2">'+
        '                    <label>ID</label>\n' +
        `                    <input type="text" class="form-control" id="modal-modify-id" value="${coach_arr[i]['id']}" disabled data-date-format="yyyy-mm-dd hh:ii:ss">\n` +
        '</div>'+
        '<div class="col-sm-6 me-2">'+
        '                    <label>姓名</label>\n' +
        `                    <input type="text" class="form-control" id="modal-modify-name" value="${coach_arr[i]['name']}" data-date-format="yyyy-mm-dd hh:ii:ss">\n` +
        '</div>'+
        '<div class="col-sm-6 me-2">'+
        '                    <label>性别</label>\n' +
        `                    <input type="text" class="form-control" id="modal-modify-sex" value="${coach_arr[i]['sex']}" data-date-format="yyyy-mm-dd hh:ii:ss">\n` +
        '</div>'+
        '<div class="col-sm-6 me-2">'+
        '                    <label>手机号</label>\n' +
        `                    <input type="text" class="form-control" id="modal-modify-phone" value="${coach_arr[i]['phone']}" data-date-format="yyyy-mm-dd hh:ii:ss">\n` +
        '</div>'+
        '<div class="col-sm-6 me-2">'+
        '                    <label>驾照类型</label>\n' +
        `                    <input type="text" class="form-control" id="modal-modify-driverCardType" value="${coach_arr[i]['driverCardType']}" data-date-format="yyyy-mm-dd hh:ii:ss">\n` +
        '</div>'+
        '<div class="col-sm-6 me-2">'+
        '                    <label>开始时间</label>\n' +
        `                    <input type="text" class="form-control" id="modal-modify-startTime" value="${coach_arr[i]['startTime']}" data-date-format="yyyy-mm-dd hh:ii:ss">\n` +
        '</div>'+
        '<div class="col-sm-6 me-2">'+
        '                    <label>结束时间</label>\n' +
        `                    <input type="text" class="form-control" id="modal-modify-endTime" value="${coach_arr[i]['endTime']}" data-date-format="yyyy-mm-dd hh:ii:ss">\n` +
        '</div>'
    )
    const startTime=$("#modal-modify-startTime")
    const endTime=$("#modal-modify-endTime")
    add.click(function () {
        ajax('/modifyCoach',
            {
                id:coach_arr[i]['id'],
                name:$("#modal-modify-name").val(),
                sex:$("#modal-modify-sex").val(),
                phone:$("#modal-modify-phone").val(),
                driverCardType:$("#modal-modify-driverCardType").val(),
                startTime:startTime.val()==='...'?null:startTime.val(),
                endTime:endTime.val()==='...'?null:endTime.val()
            },(res)=>{
                if(res['success']){
                    ok(res['msg'])
                    initCoach()
                    $("#modal-modify-trigger").click()
                }else{
                    fail(res['msg'])
                }
            })
    })
    startTime.datetimepicker({
        language:  'zh-CN',
        pickerPosition:'top-right',
        prevText: '上月',           // 设置datepicker上一月按钮的样式
        nextText : '下月',
        prevButton: true, // ture显示上一月按钮 false不显示上一月按钮 位置在datepicker左上角
        nextButton: true,
        autoclose:true
    })
    endTime.datetimepicker({
        language:  'zh-CN',
        pickerPosition:'top-right',
        next: 'xdsoft_next',           // 设置datepicker上一月按钮的样式
        prev : 'xdsoft_prev',
        autoclose:true
    })
    $("#modal-modify-trigger").click()
}
const createStudentExamTable=(res)=>{
    const div=$("<div class='table-responsive'></div>")
    const table=$('<table class="table table-striped table-sm">\n'+
        '                    <thead>\n' +
        '                    <tr>\n' +
        '                        <th scope="col">序号</th>\n' +
        '                        <th scope="col">ID</th>\n' +
        '                        <th scope="col">预约类型</th>\n' +
        '                        <th scope="col">学生ID</th>\n' +
        '                        <th scope="col">学生姓名</th>\n' +
        '                        <th scope="col">考试次数</th>\n' +
        '                        <th scope="col">是否通过</th>\n' +
        // '                        <th scope="col">审核状态</th>\n' +
        '                    </tr>\n' +
        '                    </thead>\n' +
        '                </table>')
    //'<tbody>\n' + '</tbody>\n'
    const body=$("<tbody></tbody>")
    const page=parseInt(localStorage.getItem("current-exam"))
    const slice=res.slice(page,page+10)
    let set=''
    let bet=''
    for(let i=page;i<page+slice.length;i++){
        if(res[i]['isOk']==='未通过'||res[i]['number']<=3){
            // set=`<td><button class="btn btn-outline-primary" onclick="exam_ok(this,${i})">通过</button></td>`
            // bet=`<td><button class="btn btn-outline-danger" onclick="exam_ok_not(this,${i})">拒绝</button></td>`
            set=``
            bet=``
        }else{
            set=``
            bet=``
        }
        body.append(`<tr>\n` +
            `<td>${i+1}</td>\n` +
            `<td>${res[i]['id']}</td>\n` +
            `<td>${res[i]['orderType']}</td>\n` +
            // `<td>${res[i]['coachId']}</td>\n` +
            `<td>${res[i]['studentId']}</td>\n` +
            `<td>${res[i]['studentName']}</td>\n` +
            `<td>${res[i]['number']}</td>\n` +
            `<td>${res[i]['isOk']}</td>\n` +
            set+
            bet+
            `</tr>`)
    }
    table.append(body)
    div.append(table)
    $("#content").empty().append(div)
}

const createCarTable=(res)=>{
    const div=$("<div class='table-responsive'></div>")
    const table=$('<table class="table table-striped table-sm">\n'+
        '                    <thead>\n' +
        '                    <tr>\n' +
        '                        <th scope="col">序号</th>\n' +
        '                        <th scope="col">ID</th>\n' +
        '                        <th scope="col">车牌号</th>\n' +
        '                        <th scope="col">车类型</th>\n' +
        '                        <th scope="col">状态</th>\n' +
        '                        <th scope="col">就职时间</th>\n' +
        '                        <th scope="col">离职时间</th>\n' +
        '                    </tr>\n' +
        '                    </thead>\n' +
        '                </table>')
    //'<tbody>\n' + '</tbody>\n'
    const body=$("<tbody></tbody>")
    const page=parseInt(localStorage.getItem("current-car"))
    const slice=res.slice(page,page+10)
    for(let i=page;i<page+slice.length;i++){
        body.append(`<tr>\n` +
            `<td>${i+1}</td>\n` +
            `<td>${res[i]['id']}</td>\n` +
            `<td>${res[i]['carNumber']}</td>\n` +
            `<td>${res[i]['carType']}</td>\n` +
            `<td>${res[i]['status']}</td>\n` +
            `<td>${res[i]['startTime']}</td>\n` +
            `<td>${res[i]['endTime']}</td>\n` +
            `<td><button class="btn btn-outline-primary" onclick="modify_car(this,${i})">修改</button></td>\n`+
            `</tr>`)
    }
    table.append(body)
    div.append(table)
    $("#content").empty().append(div)
}
const modify_car=(button,i)=>{
    const title=$("#modal-modify-title")
    const body=$("#modal-modify-body")
    const add=$("#modal-btn-modify")
    add.off('click')
    title.text('车辆信息修改')
    body.html(
        '<div class="col-sm-6 me-2">'+
        '                    <label>ID</label>\n' +
        `                    <input type="text" class="form-control" id="modal-modify-id" value="${car_arr[i]['id']}" disabled data-date-format="yyyy-mm-dd hh:ii:ss">\n` +
        '</div>'+
        '<div class="col-sm-6 me-2">'+
        '                    <label>车牌号</label>\n' +
        `                    <input type="text" class="form-control" id="modal-modify-carNumber" value="${car_arr[i]['carNumber']}" data-date-format="yyyy-mm-dd hh:ii:ss">\n` +
        '</div>'+
        '<div class="col-sm-6 me-2">'+
        '                    <label>车辆类型</label>\n' +
        `                    <input type="text" class="form-control" id="modal-modify-carType" value="${car_arr[i]['carType']}" data-date-format="yyyy-mm-dd hh:ii:ss">\n` +
        '</div>'+
        '<div class="col-sm-6 me-2">'+
        '                    <label>状态</label>\n' +
        `                    <input type="text" class="form-control" id="modal-modify-status" value="${car_arr[i]['status']}" data-date-format="yyyy-mm-dd hh:ii:ss">\n` +
        '</div>'+
        '<div class="col-sm-6 me-2">'+
        '                    <label>开始时间</label>\n' +
        `                    <input type="text" class="form-control" id="modal-modify-startTime" value="${car_arr[i]['startTime']}" data-date-format="yyyy-mm-dd hh:ii:ss">\n` +
        '</div>'+
        '<div class="col-sm-6 me-2">'+
        '                    <label>结束时间</label>\n' +
        `                    <input type="text" class="form-control" id="modal-modify-endTime" value="${car_arr[i]['endTime']}" data-date-format="yyyy-mm-dd hh:ii:ss">\n` +
        '</div>'
    )
    const startTime=$("#modal-modify-startTime")
    const endTime=$("#modal-modify-endTime")
    add.click(function () {
        ajax('/modifyCar',
            {
                id:car_arr[i]['id'],
                carNumber:$("#modal-modify-carNumber").val(),
                carType:$("#modal-modify-carType").val(),
                status:$("#modal-modify-status").val(),
                startTime:startTime.val()==='...'?null:startTime.val(),
                endTime:endTime.val()==='...'?null:endTime.val()
            },(res)=>{
                if(res['success']){
                    ok(res['msg'])
                    initCar()
                    $("#modal-modify-trigger").click()
                }else{
                    fail(res['msg'])
                }
            })
    })
    startTime.datetimepicker({
        language:  'zh-CN',
        pickerPosition:'top-right',
        prevText: '上月',           // 设置datepicker上一月按钮的样式
        nextText : '下月',
        prevButton: true, // ture显示上一月按钮 false不显示上一月按钮 位置在datepicker左上角
        nextButton: true,
        autoclose:true
    })
    endTime.datetimepicker({
        language:  'zh-CN',
        pickerPosition:'top-right',
        next: 'xdsoft_next',           // 设置datepicker上一月按钮的样式
        prev : 'xdsoft_prev',
        autoclose:true
    })
    $("#modal-modify-trigger").click()
}
const createOrderTable=(res)=>{
    const div=$("<div class='table-responsive'></div>")
    const table=$('<table class="table table-striped table-sm">\n'+
        '                    <thead>\n' +
        '                    <tr>\n' +
        '                        <th scope="col">序号</th>\n' +
        '                        <th scope="col">ID</th>\n' +
        '                        <th scope="col">预约类型</th>\n' +
        // '                        <th scope="col">负责教练ID</th>\n' +
        '                        <th scope="col">负责教练</th>\n' +
        '                        <th scope="col">开始时间</th>\n' +
        '                        <th scope="col">结束时间</th>\n' +
        '                    </tr>\n' +
        '                    </thead>\n' +
        '                </table>')
    //'<tbody>\n' + '</tbody>\n'
    const body=$("<tbody></tbody>")
    const page=parseInt(localStorage.getItem("current-order"))
    const slice=res.slice(page,page+10)
    for(let i=page;i<page+slice.length;i++){
        body.append(`<tr>\n` +
            `<td>${i+1}</td>\n` +
            `<td>${res[i]['id']}</td>\n` +
            `<td>${res[i]['orderType']}</td>\n` +
            // `<td>${res[i]['coachId']}</td>\n` +
            `<td>${res[i]['coachName']}</td>\n` +
            `<td>${res[i]['startTime']}</td>\n` +
            `<td>${res[i]['endTime']}</td>\n` +
            `<td><button class="btn btn-outline-primary" onclick="modify_order(this,${i})">修改</button></td>\n`+
            `</tr>`)
    }
    table.append(body)
    div.append(table)
    $("#content").empty().append(div)
}
const modify_order=(button,i)=>{
    const title=$("#modal-modify-title")
    const body=$("#modal-modify-body")
    const add=$("#modal-btn-modify")
    add.off('click')
    title.text('预约信息修改')
    body.html(
        '<div class="col-sm-6 me-2">'+
        '                    <label>ID</label>\n' +
        `                    <input type="text" class="form-control" id="modal-modify-id" value="${order_arr[i]['id']}" disabled data-date-format="yyyy-mm-dd hh:ii:ss">\n` +
        '</div>'+
        '<div class="col-sm-6 me-2">'+
        '                    <label>预约类型</label>\n' +
        `                    <input type="text" class="form-control" id="modal-modify-orderType" value="${order_arr[i]['orderType']}" data-date-format="yyyy-mm-dd hh:ii:ss">\n` +
        '</div>'+
        '<div class="col-sm-6 me-2">'+
        '                    <label>负责教练ID</label>\n' +
        `                    <input type="text" class="form-control" id="modal-modify-coachId" value="${order_arr[i]['coachId']}" data-date-format="yyyy-mm-dd hh:ii:ss">\n` +
        '</div>'+
        '<div class="col-sm-6 me-2">'+
        '                    <label>开始时间</label>\n' +
        `                    <input type="text" class="form-control" id="modal-modify-startTime" value="${order_arr[i]['startTime']}" data-date-format="yyyy-mm-dd hh:ii:ss">\n` +
        '</div>'+
        '<div class="col-sm-6 me-2">'+
        '                    <label>结束时间</label>\n' +
        `                    <input type="text" class="form-control" id="modal-modify-endTime" value="${order_arr[i]['endTime']}" data-date-format="yyyy-mm-dd hh:ii:ss">\n` +
        '</div>'
    )
    const startTime=$("#modal-modify-startTime")
    const endTime=$("#modal-modify-endTime")
    add.click(function () {
        ajax('/modifyOrder',
            {
                id:order_arr[i]['id'],
                orderType:$("#modal-modify-orderType").val(),
                coachId:$("#modal-modify-coachId").val(),
                startTime:startTime.val()==='...'?null:startTime.val(),
                endTime:endTime.val()==='...'?null:endTime.val()
            },(res)=>{
                if(res['success']){
                    ok(res['msg'])
                    initCar()
                    $("#modal-modify-trigger").click()
                }else{
                    fail(res['msg'])
                }
            })
    })
    startTime.datetimepicker({
        language:  'zh-CN',
        pickerPosition:'top-right',
        prevText: '上月',           // 设置datepicker上一月按钮的样式
        nextText : '下月',
        prevButton: true, // ture显示上一月按钮 false不显示上一月按钮 位置在datepicker左上角
        nextButton: true,
        autoclose:true
    })
    endTime.datetimepicker({
        language:  'zh-CN',
        pickerPosition:'top-right',
        next: 'xdsoft_next',           // 设置datepicker上一月按钮的样式
        prev : 'xdsoft_prev',
        autoclose:true
    })
    $("#modal-modify-trigger").click()
}
const createOrderVerifyTable=(res)=>{
    const div=$("<div class='table-responsive'></div>")
    const table=$('<table class="table table-striped table-sm">\n'+
        '                    <thead>\n' +
        '                    <tr>\n' +
        '                        <th scope="col">序号</th>\n' +
        '                        <th scope="col">ID</th>\n' +
        '                        <th scope="col">预约类型</th>\n' +
        '                        <th scope="col">负责教练</th>\n' +
        '                        <th scope="col">开始时间</th>\n' +
        '                        <th scope="col">结束时间</th>\n' +
        '                        <th scope="col">学员姓名</th>\n' +
        '                        <th scope="col">审核状态</th>\n' +
        '                    </tr>\n' +
        '                    </thead>\n' +
        '                </table>')
    //'<tbody>\n' + '</tbody>\n'
    const body=$("<tbody></tbody>")
    const page=parseInt(localStorage.getItem("current-order-verify"))
    const slice=res.slice(page,page+10)
    let set=''
    let bet=''
    for(let i=page;i<page+slice.length;i++){
        if(res[i]['isPass']==='未审核'){
            set=`<td><button class="btn btn-outline-primary" onclick="order_verify(this,${i})">通过</button></td>`
            bet=`<td><button class="btn btn-outline-danger" onclick="order_verify_not(this,${i})">拒绝</button></td>`
        }else{
            set=``
            bet=``
        }
        body.append(`<tr>\n` +
            `<td>${i+1}</td>\n` +
            `<td>${res[i]['id']}</td>\n` +
            `<td>${res[i]['orderType']}</td>\n` +
            // `<td>${res[i]['coachId']}</td>\n` +
            `<td>${res[i]['coachName']}</td>\n` +
            `<td>${res[i]['startTime']}</td>\n` +
            `<td>${res[i]['endTime']}</td>\n` +
            `<td>${res[i]['studentName']}</td>\n` +
            `<td>${res[i]['isPass']}</td>\n` +
            set+
            bet+
            `</tr>`)
    }
    table.append(body)
    div.append(table)
    $("#content").empty().append(div)
}
const createOrderStudentTable=(res)=>{
    const div=$("<div class='table-responsive'></div>")
    const table=$('<table class="table table-striped table-sm">\n'+
        '                    <thead>\n' +
        '                    <tr>\n' +
        '                        <th scope="col">序号</th>\n' +
        '                        <th scope="col">ID</th>\n' +
        '                        <th scope="col">预约类型</th>\n' +
        // '                        <th scope="col">负责教练ID</th>\n' +
        '                        <th scope="col">负责教练</th>\n' +
        '                        <th scope="col">开始时间</th>\n' +
        '                        <th scope="col">结束时间</th>\n' +
        '                    </tr>\n' +
        '                    </thead>\n' +
        '                </table>')
    //'<tbody>\n' + '</tbody>\n'
    const body=$("<tbody></tbody>")
    const page=parseInt(localStorage.getItem("current-order-student"))
    const slice=res.slice(page,page+10)
    for(let i=page;i<page+slice.length;i++){
        body.append(`<tr>\n` +
            `<td>${i+1}</td>\n` +
            `<td>${res[i]['id']}</td>\n` +
            `<td>${res[i]['orderType']}</td>\n` +
            // `<td>${res[i]['coachId']}</td>\n` +
            `<td>${res[i]['coachName']}</td>\n` +
            `<td>${res[i]['startTime']}</td>\n` +
            `<td>${res[i]['endTime']}</td>\n` +
            `<td><button class="btn btn-outline-primary" onclick="order_student(this,${i})">预约</button></td>\n`+
            `</tr>`)
    }
    table.append(body)
    div.append(table)
    $("#content").empty().append(div)
}
const createMyOrderTable=(res)=>{
    const div=$("<div class='table-responsive'></div>")
    const table=$('<table class="table table-striped table-sm">\n'+
        '                    <thead>\n' +
        '                    <tr>\n' +
        '                        <th scope="col">序号</th>\n' +
        '                        <th scope="col">ID</th>\n' +
        '                        <th scope="col">预约类型</th>\n' +
        // '                        <th scope="col">负责教练ID</th>\n' +
        '                        <th scope="col">负责教练</th>\n' +
        '                        <th scope="col">开始时间</th>\n' +
        '                        <th scope="col">结束时间</th>\n' +
        '                        <th scope="col">是否通过</th>'+
        '                    </tr>\n' +
        '                    </thead>\n' +
        '                </table>')
    //'<tbody>\n' + '</tbody>\n'
    const body=$("<tbody></tbody>")
    const page=parseInt(localStorage.getItem("current-myorder"))
    const slice=res.slice(page,page+10)
    let set=``
    for(let i=page;i<page+slice.length;i++){
        if(res[i]['isPass']==='未审核'||res[i]['isPass']==='已通过'){
            set=`<td><button class="btn btn-outline-danger" onclick="myorder(this,${i})">取消</button></td>`
        }else{
            set=``
        }
        body.append(`<tr>\n` +
            `<td>${i+1}</td>\n` +
            `<td>${res[i]['id']}</td>\n` +
            `<td>${res[i]['orderType']}</td>\n` +
            // `<td>${res[i]['coachId']}</td>\n` +
            `<td>${res[i]['coachName']}</td>\n` +
            `<td>${res[i]['startTime']}</td>\n` +
            `<td>${res[i]['endTime']}</td>\n` +
            `<td>${res[i]['isPass']}</td>\n`+
            set+
            `</tr>`)
    }
    table.append(body)
    div.append(table)
    $("#content").empty().append(div)
}
const createExamTable=(res)=>{
    const div=$("<div class='table-responsive'></div>")
    const table=$('<table class="table table-striped table-sm">\n'+
        '                    <thead>\n' +
        '                    <tr>\n' +
        '                        <th scope="col">序号</th>\n' +
        '                        <th scope="col">ID</th>\n' +
        '                        <th scope="col">预约类型</th>\n' +
        '                        <th scope="col">学生ID</th>\n' +
        '                        <th scope="col">学生姓名</th>\n' +
        '                        <th scope="col">考试次数</th>\n' +
        '                        <th scope="col">是否通过</th>\n' +
        // '                        <th scope="col">审核状态</th>\n' +
        '                    </tr>\n' +
        '                    </thead>\n' +
        '                </table>')
    //'<tbody>\n' + '</tbody>\n'
    const body=$("<tbody></tbody>")
    const page=parseInt(localStorage.getItem("current-exam"))
    const slice=res.slice(page,page+10)
    let set=''
    let bet=''
    for(let i=page;i<page+slice.length;i++){
        if(res[i]['isOk']==='未通过'||res[i]['number']<=3){
            set=`<td><button class="btn btn-outline-primary" onclick="exam_ok(this,${i})">通过</button></td>`
            bet=`<td><button class="btn btn-outline-danger" onclick="exam_ok_not(this,${i})">拒绝</button></td>`
        }else{
            set=``
            bet=``
        }
        body.append(`<tr>\n` +
            `<td>${i+1}</td>\n` +
            `<td>${res[i]['id']}</td>\n` +
            `<td>${res[i]['orderType']}</td>\n` +
            // `<td>${res[i]['coachId']}</td>\n` +
            `<td>${res[i]['studentId']}</td>\n` +
            `<td>${res[i]['studentName']}</td>\n` +
            `<td>${res[i]['number']}</td>\n` +
            `<td>${res[i]['isOk']}</td>\n` +
            set+
            bet+
            `</tr>`)
    }
    table.append(body)
    div.append(table)
    $("#content").empty().append(div)
}

const exam_ok=(button,i)=>{
    ajax('/setExam',
        {
            id:exam_arr[i]['id'],
            isOk:'已通过'
        },(res)=>{
            if(res['success']){
                ok(res['msg'])
                initExam()
            }else{
                fail(res['msg'])
            }
        })
}

const exam_ok_not=(button,i)=>{
    ajax('/setExam',
        {
            id:exam_arr[i]['id'],
            isOk:'未通过'
        },(res)=>{
            if(res['success']){
                ok(res['msg'])
                initExam()
            }else{
                fail(res['msg'])
            }
        })
}
const createOrderCoachTable=(res)=>{
    const div=$("<div class='table-responsive'></div>")
    const table=$('<table class="table table-striped table-sm">\n'+
        '                    <thead>\n' +
        '                    <tr>\n' +
        '                        <th scope="col">序号</th>\n' +
        '                        <th scope="col">ID</th>\n' +
        '                        <th scope="col">预约类型</th>\n' +
        // '                        <th scope="col">负责教练ID</th>\n' +
        '                        <th scope="col">开始时间</th>\n' +
        '                        <th scope="col">结束时间</th>\n' +
        '                    </tr>\n' +
        '                    </thead>\n' +
        '                </table>')
    //'<tbody>\n' + '</tbody>\n'
    const body=$("<tbody></tbody>")
    const page=parseInt(localStorage.getItem("current-order-coach"))
    const slice=res.slice(page,page+10)
    for(let i=page;i<page+slice.length;i++){
        body.append(`<tr>\n` +
            `<td>${i+1}</td>\n` +
            `<td>${res[i]['id']}</td>\n` +
            `<td>${res[i]['orderType']}</td>\n` +
            `<td>${res[i]['startTime']}</td>\n` +
            `<td>${res[i]['endTime']}</td>\n` +
            `<td><button class="btn btn-outline-primary" onclick="order_coach(this,${i})">负责</button></td>\n`+
            `</tr>`)
    }
    table.append(body)
    div.append(table)
    $("#content").empty().append(div)
}
const createMyCoachOrderTable=(res)=>{
    const div=$("<div class='table-responsive'></div>")
    const table=$('<table class="table table-striped table-sm">\n'+
        '                    <thead>\n' +
        '                    <tr>\n' +
        '                        <th scope="col">序号</th>\n' +
        '                        <th scope="col">ID</th>\n' +
        '                        <th scope="col">预约类型</th>\n' +
        // '                        <th scope="col">负责教练ID</th>\n' +
        '                        <th scope="col">负责教练</th>\n' +
        '                        <th scope="col">开始时间</th>\n' +
        '                        <th scope="col">结束时间</th>\n' +
        '                    </tr>\n' +
        '                    </thead>\n' +
        '                </table>')
    //'<tbody>\n' + '</tbody>\n'
    const body=$("<tbody></tbody>")
    const page=parseInt(localStorage.getItem("current-myorder-coach"))
    const slice=res.slice(page,page+10)
    for(let i=page;i<page+slice.length;i++){
        // if(res[i]['isPass']==='未审核'||res[i]['isPass']==='已通过'){
        //     set=`<td><button class="btn btn-outline-danger" onclick="myorder(this,${i})">取消</button></td>`
        // }else{
        //     set=``
        // }
        body.append(`<tr>\n` +
            `<td>${i+1}</td>\n` +
            `<td>${res[i]['id']}</td>\n` +
            `<td>${res[i]['orderType']}</td>\n` +
            // `<td>${res[i]['coachId']}</td>\n` +
            `<td>${res[i]['coachName']}</td>\n` +
            `<td>${res[i]['startTime']}</td>\n` +
            `<td>${res[i]['endTime']}</td>\n` +
            `<td><button class="btn btn-outline-primary" onclick="modify_coach_time(this,${i})">修改</button></td>`+
            `<td><button class="btn btn-outline-danger" onclick="myorder_coach(this,${i})">取消</button></td>`+
            `</tr>`)
    }
    table.append(body)
    div.append(table)
    $("#content").empty().append(div)
}
const createMyStudentTable=(res)=>{
    const div=$("<div class='table-responsive'></div>")
    const table=$('<table class="table table-striped table-sm">\n'+
        '                    <thead>\n' +
        '                    <tr>\n' +
        '                        <th scope="col">序号</th>\n' +
        '                        <th scope="col">学员ID</th>\n' +
        '                        <th scope="col">学员姓名</th>\n' +
        '                        <th scope="col">学员性别</th>\n' +
        '                        <th scope="col">学员手机号</th>\n' +
        '                        <th scope="col">学习状态</th>\n' +
        '                        <th scope="col">驾照类型</th>\n' +
        '                        <th scope="col">开始时间</th>\n' +
        '                        <th scope="col">结束时间</th>\n' +
        '                        <th scope="col">备注</th>\n' +
        '                    </tr>\n' +
        '                    </thead>\n' +
        '                </table>')
    //'<tbody>\n' + '</tbody>\n'
    const body=$("<tbody></tbody>")
    const page=parseInt(localStorage.getItem("current-my-student"))
    const slice=res.slice(page,page+10)
    for(let i=page;i<page+slice.length;i++){
        // if(res[i]['isPass']==='未审核'||res[i]['isPass']==='已通过'){
        //     set=`<td><button class="btn btn-outline-danger" onclick="myorder(this,${i})">取消</button></td>`
        // }else{
        //     set=``
        // }
        body.append(`<tr>\n` +
            `<td>${i+1}</td>\n` +
            `<td>${res[i]['studentId']}</td>\n` +
            `<td>${res[i]['name']}</td>\n` +
            `<td>${res[i]['sex']}</td>\n` +
            `<td>${res[i]['phone']}</td>\n` +
            `<td>${res[i]['studyState']}</td>\n` +
            `<td>${res[i]['driverCardType']}</td>\n` +
            `<td>${res[i]['startTime']}</td>\n` +
            `<td>${res[i]['endTime']}</td>\n` +
            `<td>${res[i]['note']}</td>\n` +
            `<td><button class="btn btn-outline-primary" onclick="modify_my_student(this,${i})">修改备注</button></td>\n`+
            `<td><button class="btn btn-outline-danger" onclick="delete_my_student(this,${i})">删除</button></td>\n`+
            `</tr>`)
    }
    table.append(body)
    div.append(table)
    $("#content").empty().append(div)
}

const modify_my_student=(button,i)=>{
    const title=$("#modal-modify-title")
    const body=$("#modal-modify-body")
    const add=$("#modal-btn-modify")
    add.off('click')
    title.text('备注修改')
    body.html(
        '<div class="col-sm-6 me-2">'+
        '                    <label>备注</label>\n' +
        `<textarea class="form-control" id="modal-modify-note">${my_student_arr[i]['note']}</textarea>`+
        '</div>'
    )
    add.click(function () {
        ajax('/modifyNote',
            {
                id:my_student_arr[i]['id'],
                note:$("#modal-modify-note").val()
            },(res)=>{
                if(res['success']){
                    ok(res['msg'])
                    initMyStudent()
                    $("#modal-modify-trigger").click()
                }else{
                    fail(res['msg'])
                }
            })
    })
    $("#modal-modify-trigger").click()
}

const delete_my_student=(button,i)=>{
    const title=$("#modal-delete-title")
    const body=$("#modal-delete-body")
    const add=$("#modal-btn-delete")
    add.off('click')
    title.text('删除提示')
    body.html(
        '<div class="col-sm-6 me-2 h3">'+
        '                    <label>确定删除吗？</label>\n' +
        '</div>'
    )
    add.click(function () {
        ajax('/deleteMyStudent',
            {
                id:my_student_arr[i]['id'],
            },(res)=>{
                if(res['success']){
                    ok(res['msg'])
                    $("#modal-delete-trigger").click()
                    initMyStudent()
                }else{
                    fail(res['msg'])
                }
            })
    })
    $("#modal-delete-trigger").click()
}

const createPersonTable=()=>{
    const table=$('<div id="content-personal" class="container">\n' +
        '                        <div class="row mb-4">\n' +
        '                            <div class="row g-3">\n' +
        '                                <div class="col-sm-6">\n' +
        '                                    <label for="firstName" class="form-label h4">姓名</label>\n' +
        `                                    <input id="content-personal-name" type="text" class="form-control" id="firstName" placeholder="" value="${self['name']}" required="">\n` +
        '                                </div>\n' +
        '                                <div class="col-sm-6">\n' +
        `                                    <label for="person-sex" class="form-label h4">性别</label>\n` +
        `                                    <input id="content-personal-sex" type="text" class="form-control" id="person-sex" placeholder="" value="${self['sex']}" required="">\n` +
        '                                </div>\n' +
        '                                <div class="col-sm-6">\n' +
        '                                    <label for="person-phone" class="form-label h4">手机号</label>\n' +
        '                                    <div class="input-group has-validation">\n' +
        '                                        <span class="input-group-text">\n' +
        '                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-phone" viewBox="0 0 16 16">\n' +
        '                                                <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"/>\n' +
        '                                                <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>\n' +
        '                                            </svg>\n' +
        '                                        </span>\n' +
        `                                        <input type="text" disabled class="form-control" id="person-phone" placeholder="Phone" value="${self['phone']}" required="">\n` +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                                <div id="study-hide" class="col-sm-6">\n' +
        '                                    <label for="person-study" class="form-label h4">学习状态</label>\n' +
        '                                    <div class="input-group has-validation">\n' +
        '                                        <span class="input-group-text">\n' +
        '                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">\n' +
        '                                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>\n' +
        '                                            </svg>\n' +
        '                                        </span>\n' +
        `                                        <input id="content-personal-studyState" type="text" class="form-control" id="person-study" placeholder="学习状态（科目一）" value="${self['studyState']}" required="">\n` +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                                <div class="col-sm-6">\n' +
        '                                    <label for="person-card" class="form-label h4">驾照类型</label>\n' +
        '                                    <div class="input-group has-validation">\n' +
        '                                        <span class="input-group-text">\n' +
        '                                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-car-front" viewBox="0 0 16 16">\n' +
        '                                        <path d="M4 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2H6ZM4.862 4.276 3.906 6.19a.51.51 0 0 0 .497.731c.91-.073 2.35-.17 3.597-.17 1.247 0 2.688.097 3.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 10.691 4H5.309a.5.5 0 0 0-.447.276Z"/>\n' +
        '                                        <path fill-rule="evenodd" d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679c.033.161.049.325.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.807.807 0 0 0 .381-.404l.792-1.848ZM4.82 3a1.5 1.5 0 0 0-1.379.91l-.792 1.847a1.8 1.8 0 0 1-.853.904.807.807 0 0 0-.43.564L1.03 8.904a1.5 1.5 0 0 0-.03.294v.413c0 .796.62 1.448 1.408 1.484 1.555.07 3.786.155 5.592.155 1.806 0 4.037-.084 5.592-.155A1.479 1.479 0 0 0 15 9.611v-.413c0-.099-.01-.197-.03-.294l-.335-1.68a.807.807 0 0 0-.43-.563 1.807 1.807 0 0 1-.853-.904l-.792-1.848A1.5 1.5 0 0 0 11.18 3H4.82Z"/>\n' +
        '                                    </svg>\n' +
        '                                        </span>\n' +
        `                                        <input type="text" disabled class="form-control" id="person-card" placeholder="C1" value="${self['driverCardType']}" required="">\n` +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="row justify-content-center">\n' +
        '                            <div class="btn-group" role="group" aria-label="Basic example">\n' +
        '                                <button id="btn-personal-update" type="button" class="btn btn-outline-primary">保存</button>\n' +
        '<!--                                <button type="button" class="btn btn-secondary"></button>-->\n' +
        '<!--                                <button type="button" class="btn btn-secondary"></button>-->\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>')
    const content=$("#content")
    content.off('click')
    content.on('click','#btn-personal-update',function () {
        ajax('/modifySelf',
            {
                id:localStorage.getItem('id'),
                role:localStorage.getItem('role'),
                name:$("#content-personal-name").val(),
                sex:$("#content-personal-sex").val(),
                studyState:$("#content-personal-studyState").val(),
            },(res)=>{
            if(res['success']){
                ok('修改成功')
            }else{
                fail('修改失败')
            }
            })
    })
    content.empty().append(table)
    if(localStorage.getItem('role')!=='Student'){
        $("#study-hide").css('visibility','hidden')
    }
}


const order_student=(button,i)=>{
    ajax('/orderStudent',
        {
            orderId:order_student_arr[i]['id'],
            studentId:localStorage.getItem('id')
        },(res)=>{
        if(res['success']){
            ok(res['msg'])
            initMyOrder()
        }else{
            fail(res['msg'])
        }
        })

}

const order_verify=(button,i)=>{
    ajax('/orderVerify',
        {
            id:order_verify_arr[i]['id'],
            studentId:order_verify_arr[i]['studentId'],
            isPass:order_verify_arr[i]['isPass']
        },(res)=>{
            if(res['success']){
                ok(res['msg'])
                initOrderVerify()
                initExam()
            }else{
                fail(res['msg'])
            }
        })
}

const order_verify_not=(button,i)=>{
    ajax('/orderVerifyNot',
        {
            id:order_verify_arr[i]['id'],
            studentId:order_verify_arr[i]['studentId']
        },(res)=>{
            if(res['success']){
                ok(res['msg'])
                initOrderVerify()
                initExam()
            }else{
                fail(res['msg'])
            }
        })
}

const order_coach=(button,i)=>{
    ajax('/orderCoach',
        {
            orderId:order_coach_arr[i]['id'],
            coachId:localStorage.getItem('id')
        },(res)=>{
            if(res['success']){
                ok(res['msg'])
                initOrderCoach()
                initMyCoachOrder()
                createOrderCoachTable()
                // initMyOrder()
            }else{
                fail(res['msg'])
            }
        })
}

const myorder=(button,i)=>{
    ajax('/cancelOrder',
        {
            orderId:my_order_arr[i]['id'],
            studentId:localStorage.getItem('id')
        },(res)=>{
            if(res['success']){
                ok(res['msg'])
                initMyOrder()
            }else{
                fail(res['msg'])
            }
        })
}

const modify_coach_time=(button,i)=>{
    const title=$("#modal-modify-title")
    const body=$("#modal-modify-body")
    const add=$("#modal-btn-modify")
    add.off('click')
    title.text('日程修改')
    body.html(
        '<div class="col-sm-6 me-2">'+
        '                    <label>开始时间</label>\n' +
        `                    <input type="text" class="form-control" id="modal-modify-coach-startTime" value="${my_order_arr[i]['startTime']}" data-date-format="yyyy-mm-dd hh:ii:ss">\n` +
        '</div>'+
        '<div class="col-sm-6 me-2">'+
        '                    <label>结束时间</label>\n' +
        `                    <input type="text" class="form-control" id="modal-modify-coach-endTime" value="${my_order_arr[i]['endTime']}" data-date-format="yyyy-mm-dd hh:ii:ss">\n` +
        '</div>'
   )
    add.click(function () {
        ajax('/modifyTime',
            {
                id:my_order_arr[i]['id'],
                coachId:localStorage.getItem('id'),
                startTime:$("#modal-modify-coach-startTime").val(),
                endTime:$("#modal-modify-coach-endTime").val()
            },(res)=>{
                if(res['success']){
                    ok(res['msg'])
                    initMyCoachOrder()
                    $("#modal-add-trigger").click()
                }else{
                    fail(res['msg'])
                }
            })
    })
    $("#modal-modify-coach-startTime").datetimepicker({
        language:  'zh-CN',
        pickerPosition:'top-right',
        startDate:new Date(),
        prevText: '上月',           // 设置datepicker上一月按钮的样式
        nextText : '下月',
        prevButton: true, // ture显示上一月按钮 false不显示上一月按钮 位置在datepicker左上角
        nextButton: true,
        autoclose:true
    })
    $("#modal-modify-coach-endTime").datetimepicker({
        language:  'zh-CN',
        pickerPosition:'top-right',
        startDate:new Date(),
        next: 'xdsoft_next',           // 设置datepicker上一月按钮的样式
        prev : 'xdsoft_prev',
        autoclose:true
    })
    $("#modal-modify-trigger").click()
}

const myorder_coach=(button,i)=>{
    ajax('/cancelOrderCoach',
        {
            id:my_order_arr[i]['id'],
            coachId:localStorage.getItem('id')
        },(res)=>{
            if(res['success']){
                ok(res['msg'])
                initOrderCoach()
                initMyCoachOrder()
                createMyCoachOrderTable()
                // initMyOrder()
            }else{
                fail(res['msg'])
            }
        })
}


const createAddModal=()=>{
    const title=$("#modal-add-title")
    const body=$("#modal-add-body")
    const add=$("#modal-btn-add")
    add.off('click')
    if(type==='Notice'){
        title.text('公告添加')
        body.html('<div class="form-floating mb-2">\n' +
            '                    <input type="text" class="form-control" id="modal-add-notice-title" placeholder="off">\n' +
            '                    <label for="modal-add-notice-title">标题</label>\n' +
            '                </div>'+
        '<div class="form-floating mb-2">\n' +
        '                    <textarea id="modal-add-notice-body" class="height600"></textarea>\n' +
        '                    <label for="modal-add-notice-body">正文</label>\n' +
        '                </div>'+
        '<div class="form-floating mb-2">\n' +
        '                    <input type="text" class="form-control" id="modal-add-notice-auth" placeholder="off">\n' +
        '                    <label for="modal-add-notice-auth">作者</label>\n' +
        '                </div>'
        )
        add.click(function () {
            ajax('/insertNotice',
                {
                    name:$("#modal-add-notice-title").val(),
                    content:$("#modal-add-notice-body").val(),
                    auth:$("#modal-add-notice-auth").val()
                },(res)=>{
                if(res['success']){
                    ok(res['msg'])
                    initNotice()
                    $("#modal-add-trigger").click()
                }else{
                    fail(res['msg'])
                }
                })
        })
    }else if(type==='Student'){
        title.text('学员添加')
        body.html(
            '<div class="form-floating mb-2">\n' +
            '                    <input type="text" class="form-control" id="modal-add-student-name" placeholder="off">\n' +
            '                    <label for="modal-add-student-name">姓名</label>\n' +
            '                </div>'+
            '<div class="form-floating mb-2">\n' +
            '                    <input type="text" class="form-control" id="modal-add-student-sex" placeholder="off">\n' +
            '                    <label for="modal-add-student-sex">性别</label>\n' +
            '                </div>'+
            '<div class="form-floating mb-2">\n' +
            '                    <input type="text" class="form-control" id="modal-add-student-phone" placeholder="off">\n' +
            '                    <label for="modal-add-student-phone">手机号</label>\n' +
            '                </div>'+
            '<div class="form-floating mb-2">\n' +
            '                    <input type="text" class="form-control" id="modal-add-student-driverCardType" placeholder="off">\n' +
            '                    <label for="modal-add-student-driverCardType">驾照类型</label>\n' +
            '                </div>'
        )
        add.click(function () {
            ajax('/insertStudent',
                {
                    name:$("#modal-add-student-name").val(),
                    sex:$("#modal-add-student-sex").val(),
                    phone:$("#modal-add-student-phone").val(),
                    driverCardType:$("#modal-add-student-driverCardType").val(),
                    role:'Student'
                },(res)=>{
                    if(res['success']){
                        ok(res['msg'])
                        initStudent()
                        $("#modal-add-trigger").click()
                    }else{
                        fail(res['msg'])
                    }
                })
        })
    }else if(type==='Coach'){
        title.text('教练添加')
        body.html(
            '<div class="form-floating mb-2">\n' +
            '                    <input type="text" class="form-control" id="modal-add-coach-name" placeholder="off">\n' +
            '                    <label for="modal-add-coach-name">姓名</label>\n' +
            '                </div>'+
            '<div class="form-floating mb-2">\n' +
            '                    <input type="text" class="form-control" id="modal-add-coach-sex" placeholder="off">\n' +
            '                    <label for="modal-add-coach-sex">性别</label>\n' +
            '                </div>'+
            '<div class="form-floating mb-2">\n' +
            '                    <input type="text" class="form-control" id="modal-add-coach-phone" placeholder="off">\n' +
            '                    <label for="modal-add-coach-phone">手机号</label>\n' +
            '                </div>'+
            '<div class="form-floating mb-2">\n' +
            '                    <input type="text" class="form-control" id="modal-add-coach-driverCardType" placeholder="off">\n' +
            '                    <label for="modal-add-student-driverCardType">驾照类型</label>\n' +
            '                </div>'
        )
        add.click(function () {
            ajax('/insertStudent',
                {
                    name:$("#modal-add-coach-name").val(),
                    sex:$("#modal-add-coach-sex").val(),
                    phone:$("#modal-add-coach-phone").val(),
                    driverCardType:$("#modal-add-coach-driverCardType").val(),
                    role:'Coach'
                },(res)=>{
                    if(res['success']){
                        ok(res['msg'])
                        initCoach()
                        $("#modal-add-trigger").click()
                    }else{
                        fail(res['msg'])
                    }
                })
        })
    }else if(type==='MyStudent'){
        title.text('学员添加')
        const div=$('<div class="form-floating mb-2"></div>')
        const select=$('<select class="form-control" id="modal-add-my-student-studentId"><option onclick="option_eq_null()">学生</option></select>')
        for(let i=0;i<student_exclude_arr.length;i++){
            select.append(`<option onclick="option_click(${i})">${student_exclude_arr[i]['name']}</option>`)
        }
        div.append(select)
        body.html(div)
        add.click(function () {
            console.log(option)
            if(option==='') {
                fail('请选择学生')
                return
            }
            ajax('/insertMyStudent',
                {
                    coachId:localStorage.getItem('id'),
                    studentId:option
                },(res)=>{
                option=''
                    if(res['success']){
                        ok(res['msg'])
                        initMyStudent()
                        initStudentExclude()
                        filter(my_student_arr)
                        $("#modal-add-trigger").click()
                    }else{
                        fail(res['msg'])
                    }
                })
        })
    }else if(type==='Car'){
        title.text('车辆添加')
        body.html(
            '<div class="form-floating mb-2">\n' +
            '                    <input type="text" class="form-control" id="modal-add-car-carType" placeholder="off">\n' +
            '                    <label for="modal-add-car-carType">车辆类型</label>\n' +
            '                </div>'+
            '<div class="form-floating mb-2">\n' +
            '                    <input type="text" class="form-control" id="modal-add-car-carNumber" placeholder="off">\n' +
            '                    <label for="modal-add-car-carNumber">车牌号</label>\n' +
            '                </div>'+
            '<div class="form-floating mb-2">\n' +
            '                    <input type="text" class="form-control" id="modal-add-car-status" placeholder="off">\n' +
            '                    <label for="modal-add-car-status">车辆状态</label>\n' +
            '                </div>'
        )
        add.click(function () {
            ajax('/insertCar',
                {
                    carType:$("#modal-add-car-carType").val(),
                    carNumber:$("#modal-add-car-carNumber").val(),
                    status:$("#modal-add-car-status").val()
                },(res)=>{
                    if(res['success']){
                        ok(res['msg'])
                        initCar()
                        $("#modal-add-trigger").click()
                    }else{
                        fail(res['msg'])
                    }
                })
        })
    }else if(type==='Order'){
        title.text('预约添加')
        const div=$('<div class="form-floating mb-2"></div>')
        const select=$('<select class="form-control" id="modal-add-my-order-coachId"><option onclick="option_eq_null()">选择教练（可以为空）</option></select>')
        for(let i=0;i<coach_arr.length;i++){
            select.append(`<option onclick="option_click(${i})">${coach_arr[i]['name']}</option>`)
        }
        console.log(div)
        div.append(select)
        console.log(div[0])
        body.html(
            '<div class="form-floating mb-2">\n' +
            '                    <input type="text" class="form-control" id="modal-add-order-orderType" placeholder="off">\n' +
            '                    <label for="modal-add-order-orderType">预约类型</label>\n' +
            '                </div>'+
            div[0].outerHTML+
            '<div class="input-group mb-2">\n'+
            '<div class="col-sm-6 me-2"'+
            '                    <label>开始时间</label>\n' +
            `                    <input type="text" class="form-control" id="modal-add-order-startTime" data-date-format="yyyy-mm-dd hh:ii:ss">\n` +
            '</div>'+
            '<div class="col-sm-4>"'+
            '                    <label>结束时间</label>\n' +
            `                    <input type="text" class="form-control" id="modal-add-order-endTime" data-date-format="yyyy-mm-dd hh:ii:ss ">\n` +
            '</div>'+
            '</div>'
        )
        add.click(function () {
            ajax('/insertOrder',
                {
                    orderType:$("#modal-add-order-orderType").val(),
                    coachId:option==='选择教练（可以为空）'?'':option,
                    startTime:$("#modal-add-order-startTime").val(),
                    endTime:$("#modal-add-order-endTime").val()
                },(res)=>{
                    if(res['success']){
                        ok(res['msg'])
                        initOrder()
                        $("#modal-add-trigger").click()
                    }else{
                        fail(res['msg'])
                    }
                })
        })
        const startTime=$("#modal-add-order-startTime").datetimepicker({
            language:  'zh-CN',
            pickerPosition:'top-right',
            startDate:new Date(),
            prevText: '上月',           // 设置datepicker上一月按钮的样式
            nextText : '下月',
            prevButton: true, // ture显示上一月按钮 false不显示上一月按钮 位置在datepicker左上角
            nextButton: true,
            autoclose:true
        })
        $("#modal-add-order-endTime").datetimepicker({
            language:  'zh-CN',
            pickerPosition:'top-right',
            startDate:startTime.val(),
            next: 'xdsoft_next',           // 设置datepicker上一月按钮的样式
            prev : 'xdsoft_prev',
            autoclose:true
        })
    }
    $("#modal-add-trigger").click()
}

const option_click=(i)=>{
    if(type==='Order'){
        option=coach_arr[i]['id']
    }else if(type==='MyStudent'){
        option=student_exclude_arr[i]['id']
    }

}

const option_eq_null=()=>{
    option=''
}

// constant
const admin='<li class="nav-item">\n' +
    '<!--                        <button class="btn nav-link active" aria-current="page">-->\n' +
    '<!--                            <span class="align-text-bottom">首页</span></button>-->\n' +
    '                        <a class="nav-link" aria-current="page" href="#">\n' +
    '                            <span id="home" class="align-text-bottom">公告管理</span>\n' +
    '\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                    <li class="nav-item">\n' +
    '                        <a class="nav-link" href="#">\n' +
    '                            <span id="student" class="align-text-bottom">学员管理</span>\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                    <li class="nav-item">\n' +
    '                        <a class="nav-link" href="#">\n' +
    '                            <span id="coach" class="align-text-bottom">教练管理</span>\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                    <li class="nav-item">\n' +
    '                        <a class="nav-link" href="#">\n' +
    '                            <span id="car" class="align-text-bottom">车辆管理</span>\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    // '                    <li class="nav-item">\n' +
    // '                        <a class="nav-link" href="#">\n' +
    // '                            <span id="car-usage" class="align-text-bottom">车辆使用管理</span>\n' +
    // '                        </a>\n' +
    // '                    </li>\n' +
    '                    <li class="nav-item">\n' +
    '                        <a class="nav-link" href="#">\n' +
    '                            <span id="order" class="align-text-bottom">预约管理</span>\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                    <li class="nav-item">\n' +
    '                        <a class="nav-link" href="#">\n' +
    '                            <span id="order-verify" class="align-text-bottom">预约审核</span>\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                    <li class="nav-item">\n' +
    '                        <a class="nav-link" href="#">\n' +
    '                            <span id="exam" class="align-text-bottom">成绩管理</span>\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                    <li class="nav-item">\n' +
    '                        <a class="nav-link" href="#">\n' +
    '                            <span id="personal" class="align-text-bottom">个人中心</span>\n' +
    '                        </a>\n' +
    '                    </li>'

const coach='<li class="nav-item">\n' +
    '<!--                        <button class="btn nav-link active" aria-current="page">-->\n' +
    '<!--                            <span class="align-text-bottom">首页</span></button>-->\n' +
    '                        <a class="nav-link" aria-current="page" href="#">\n' +
    '                            <span id="home" class="align-text-bottom">首页</span>\n' +
    '\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                    <li class="nav-item">\n' +
    '                        <a class="nav-link" href="#">\n' +
    '                            <span id="order-coach" class="align-text-bottom">预约管理</span>\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                    <li class="nav-item">\n' +
    '                        <a class="nav-link" href="#">\n' +
    '                            <span id="orderdate-coach" class="align-text-bottom">预约日程管理</span>\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                    <li class="nav-item">\n' +
    '                        <a class="nav-link" href="#">\n' +
    '                            <span id="my-student" class="align-text-bottom">我的学员</span>\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                    <li class="nav-item">\n' +
    '                        <a class="nav-link" href="#">\n' +
    '                            <span id="personal" class="align-text-bottom">个人中心</span>\n' +
    '                        </a>\n' +
    '                    </li>'

const student='<li class="nav-item">\n' +
    '                        <a class="nav-link" aria-current="page" href="#">\n' +
    '                            <span id="home" class="align-text-bottom">公告</span>\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                      <li class="nav-item">\n' +
    '                        <a class="nav-link" href="#">\n' +
    '                            <span id="order-student" class="align-text-bottom">预约选择</span>\n' +
    '                        </a>\n' +
    '                    </li>'+
    '                      <li class="nav-item">\n' +
    '                        <a class="nav-link" href="#">\n' +
    '                            <span id="myorder" class="align-text-bottom">我的预约</span>\n' +
    '                        </a>\n' +
    '                    </li>'+
    '                    <li class="nav-item">\n' +
    '                        <a class="nav-link" href="#">\n' +
    '                            <span id="studentExam" class="align-text-bottom">成绩管理</span>\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                    <li class="nav-item">\n' +
    '                        <a class="nav-link" href="#">\n' +
    '                            <span id="personal" class="align-text-bottom">个人中心</span>\n' +
    '                        </a>\n' +
    '                    </li>'

const main='<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">\n' +
    '                <h1 class="h2">Dashboard</h1>\n' +
    '                <div class="btn-toolbar mb-2 mb-md-0">\n' +
    '                    <div class="btn-group me-2">\n' +
    '                        <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>\n' +
    '                        <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>\n' +
    '                    </div>\n' +
    '                    <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">\n' +
    '                        <span data-feather="calendar" class="align-text-bottom"></span>\n' +
    '                        This week\n' +
    '                    </button>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '<!--            <canvas class="my-4 w-100" id="myChart" width="900" height="380"></canvas>-->\n' +
    '\n' +
    '<!--            <h2>Section title</h2>-->\n' +
    '            <div class="table-responsive">\n' +
    '                <table class="table table-striped table-sm">\n' +
    '                    <thead>\n' +
    '                    <tr>\n' +
    '                        <th scope="col">#</th>\n' +
    '                        <th scope="col">Header</th>\n' +
    '                        <th scope="col">Header</th>\n' +
    '                        <th scope="col">Header</th>\n' +
    '                        <th scope="col">Header</th>\n' +
    '                    </tr>\n' +
    '                    </thead>\n' +
    '                    <tbody>\n' +
    '                    <tr>\n' +
    '                        <td>1,015</td>\n' +
    '                        <td>random</td>\n' +
    '                        <td>tabular</td>\n' +
    '                        <td>information</td>\n' +
    '                        <td>text</td>\n' +
    '                    </tr>\n' +
    '                    </tbody>\n' +
    '                </table>\n' +
    '            </div>'


const btn_add='<div class="btn-group me-2">\n' +
    '                        <button id="btn-add" type="button" class="btn btn-sm btn-primary">\n' +
    '                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">\n' +
    '                                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>\n' +
    '                            </svg>\n' +
    '                            添加\n' +
    '                        </button>\n' +
    '                    </div>'
