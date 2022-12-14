$(function(){
    var $loginBox = $('#loginBox')
    var $registerBox = $('#registerBox')
    var $userInfo = $('#userInfo')

    $loginBox.find('a').on('click',function(){
        $registerBox.show()
        $loginBox.hide()
    })

    $registerBox.find('a').on('click',function(){
        $loginBox.show()
        $registerBox.hide()
    })

    //注册
    $registerBox.find('button').on('click',function(){
        $.ajax({
            type:'post',
            url:'/api/user/register',
            data:{
                username:$registerBox.find('[name="username"]').val(),
                password:$registerBox.find('[name="password"]').val(),
                repassword:$registerBox.find('[name="repassword"]').val()
            },
            dataType:'json',
            success:function(result){
                // console.log(result)
                $registerBox.find('.colWarning').html(result.message)
                if(!result.code){
                    setTimeout(function(){
                        $loginBox.show()
                        $registerBox.hide()
                    },1000)
                }
            }
        })
    })

    //登录

    $loginBox.find('button').on('click',function(){
        $.ajax({
            type:'post',
            url:'/api/user/login',
            data:{
                username:$loginBox.find('[name="username"]').val(),
                password:$loginBox.find('[name="password"]').val(),
            },
            dataType:'json',
            success:function(result){
                $loginBox.find('.colWarning').html(result.message)
                if(!result.code){
                    // setTimeout(function(){
                    //     $loginBox.hide()
                    //     $userInfo.show()

                    //     $userInfo.find('.username').html(result.userInfo.username)
                    //     $userInfo.find('.info').html('你好，欢迎使用此博客')
                    // },1000)
                    window.location.reload()
                }
            }
        })
    })

    //退出
    $('#logout').on('click',function(){
        $.ajax({
            url:'/api/user/logout',
            success:function(result){
                if(!result.code){
                    window.location.reload()
                }
            }
        })
    })
})