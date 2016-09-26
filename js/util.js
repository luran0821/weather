/**
 * Created by hxsd on 2016/9/7.
 */
// 将ajax请求的方法封装到一个对象中，防止在团队开发中的命名冲突
var $ = {
    ajax:function(method,url,success,error){
        // step 1: 创建核心对象
        var xhr = this.createRequest();
        // step 2：配置请求和响应参数
        xhr.open(method,url,true);
        // 每当xhr的readyState的值改变一次，下面这个函数就会被调用一次
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                // 状态码：200-OK 404-文件没找到
                if(xhr.status == 200){
                    if(success){
                        success(xhr.responseText);
                    }
                }else{
                    if(error){
                        error(xhr.status);
                    }
                }
            }
        };
        // step 3: 发送请求
        xhr.send(null);
    },
    ajax2:function (options){
        // step 1: 创建核心对象
        var xhr = this.createRequest();
        // step 2：配置请求和响应参数
        xhr.open(options.method,options.url,true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                // 状态码：200-OK 404-文件没找到
                if(xhr.status == 200){
                    if(options.success){
                        options.success(xhr.responseText);
                    }
                }else{
                    if(options.error){
                        options.error(xhr.status);
                    }
                }
            }
        };
        // step 3: 发送请求
        xhr.send(null);
    },
    getJSON:function(url,success,error){
        // 下面使用new XMLHttpRequest()来创建核心的方式，
        // 只适用于IE7+，以及非ie的浏览器
        //var xhr = new XMLHttpRequest();
        var xhr = this.createRequest();
        xhr.open("GET",url,true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    if(success){
                        // 在这里，将返回的json转换为js对象
                        success(JSON.parse(xhr.responseText));
                    }
                }else{
                    if(error){
                        error(xhr.status);
                    }
                }
            }
        };
        xhr.send(null);
    },
    // 封装一个单独的方法，负责创建兼容性的xhr对象
    createRequest:function(){
        var xhr;

        try{    // 类似于if语句
            xhr = new XMLHttpRequest();
        }catch(e){// 类似于else
            // 说明浏览器不支持标准创建xhr的方式 - 比较老的IE浏览器
            try{
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            }catch(e){
                // 说明遇到了更老版本的IE浏览器
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        }

        return xhr;
    }
};
