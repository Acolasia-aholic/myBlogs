var loginBox = document.querySelector('#loginBox')
var registerBox = document.querySelector('#registerBox')
var userInfo = document.querySelector('#userInfo')

//切换到注册面板
var login = document.getElementById('login')
login.addEventListener('click',function(){
    registerBox.style.display="block"
    loginBox.style.display="none"
})
//切换到登录面板
var register = document.getElementById('register')
register.addEventListener('click',function(){
    loginBox.style.display="block"
    registerBox.style.display="none"
})

// 注册
var registerbtn = registerBox.querySelector('button')
registerbtn.addEventListener('click',function reg(){
    //获取准备Post内容
    var username = registerBox.querySelectorAll('input')[0].value;
    var password = registerBox.querySelectorAll('input')[1].value;
    var repassword = registerBox.querySelectorAll('input')[2].value;
    //创建XMLHttpRequest对象
   function createXhr(){
    var xhr = null;
    if(window.XMLHttpRequest){
      xhr = new XMLHttpRequest();//谷歌、火狐等浏览器
    }else if(window.ActiveXObject){
      xhr = new ActiveXObject("Microsoft.XMLHTTP");//ie低版本
    }
    return xhr;
  }
    //创建XMLHttpRequest对象
    var xhr = createXhr();
    //确定请求参数
    xhr.open('POST','/api/user/register',true);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    //重写回调函数
    xhr.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        // console.log(xhr.responseText)
        var data=JSON.parse(xhr.responseText)
        // console.log(data)
        registerBox.querySelector('.colWarning').innerHTML=data.message
        if(!data.code){
            setTimeout(function(){
                loginBox.style.display="block"
                registerBox.style.display="none"
            },1000)}
        }
    }


    //发送请求
    var content = 'username='+username+'&password='+password+'&repassword='+repassword;
    xhr.send(content);
}
    
)

// 登录
var loginbtn = loginBox.querySelector('button')
loginbtn.addEventListener('click',function reg(){
    //获取准备Post内容
    var username = loginBox.querySelectorAll('input')[0].value;
    var password = loginBox.querySelectorAll('input')[1].value;
    //创建XMLHttpRequest对象
   function createXhr(){
    var xhr = null;
    if(window.XMLHttpRequest){
      xhr = new XMLHttpRequest();//谷歌、火狐等浏览器
    }else if(window.ActiveXObject){
      xhr = new ActiveXObject("Microsoft.XMLHTTP");//ie低版本
    }
    return xhr;
  }
    //创建XMLHttpRequest对象
    var xhr = createXhr();
    //确定请求参数
    xhr.open('POST','/api/user/login',true);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    //重写回调函数
    xhr.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        // console.log(xhr.responseText)
        var data=JSON.parse(xhr.responseText)
        loginBox.querySelector('.colWarning').innerHTML=data.message
        if(!data.code){
            // setTimeout(function(){
            //     userInfo.style.display="block"
            //     loginBox.style.display="none"
            //     userInfo.querySelector('.username').innerHTML=data.userInfo.username
            //     userInfo.querySelector('.info').innerHTML="你好，欢迎使用此博客"
            // },1000)
            window.location.reload()
          }
        }
       
    }

    //发送请求
    var content = 'username='+username+'&password='+password;
    xhr.send(content);
})

//退出--有一些问题，尚未解决，不能退出，可手动删除一下cookies
var logout = userInfo.querySelector('a')
logout.addEventListener('click',function reg(url,fn){
    
   function createXhr(){
    var xhr = null;
    if(window.XMLHttpRequest){
      xhr = new XMLHttpRequest();//谷歌、火狐等浏览器
    }else if(window.ActiveXObject){
      xhr = new ActiveXObject("Microsoft.XMLHTTP");//ie低版本
    }
    return xhr;
  }
    //创建XMLHttpRequest对象
    var xhr = createXhr();
    //确定请求参数
    xhr.open('GET','/api/user/logout',true);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    //重写回调函数
    xhr.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        var data=JSON.parse(xhr.responseText)
        if(!data.code){
            window.location.reload()
        }
    }
    xhr.send();
}
})