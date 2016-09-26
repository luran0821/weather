'use strict';
var ct = document.getElementById('city');
var positionBox = document.getElementById('position-box');
var innercontent = document.getElementById('innercontent');
var tmp = document.getElementById('tmp');
var basicCity = document.getElementById('basic-city');
var condTxt = document.getElementById('now-cond-txt');
var pcpn = document.getElementById('pcpn');
var windSc = document.getElementById('wind-sc');
var windSpd = document.getElementById('wind-spd');
var vis = document.getElementById('vis');
var hum = document.getElementById('hum');
var basicLoc = document.getElementById('basic-loc');
var wether = document.getElementById('wether');
var uli = document.createElement('ul');

var name, url,ac;
ct.onclick = function () {
    //切换城市功能
    //重置json表单
    uli.innerHTML='';
    positionBox.style.display = 'block';
    $.getJSON('data/002.json', function (stream) {
        //生成城市表单
        for (var i = 0; i < stream.length; i++) {
            uli.innerHTML += '<li><a href="javascript:;">' + stream[i].name + '</a></li>'

        }

        positionBox.appendChild(uli);
        ac  = uli.getElementsByTagName('a');
        //用a的innerHTML切换城市
        for (var i = 0; i < ac.length; i++) {
            ac[i].onclick = function () {
                name = this.innerHTML;
                positionBox.style.display = 'none';
                ajax(name);
            }
        }
    });

};
function ajax(name) {
    var xhr = new XMLHttpRequest();
    if (name) {
        url = "http://apis.baidu.com/heweather/weather/free?city=" + name + "";
    }else {
        url = "http://apis.baidu.com/heweather/weather/free?city=chengdu";
    }
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {

            var data = JSON.parse(xhr.responseText);
            basicCity.innerHTML = data['HeWeather data service 3.0'][0].basic.city;
            tmp.innerHTML = data['HeWeather data service 3.0'][0].now.tmp;
            condTxt.innerHTML = data['HeWeather data service 3.0'][0].now.cond.txt;
            pcpn.innerHTML = data['HeWeather data service 3.0'][0].now.pcpn + 'mm';
            windSc.innerHTML = data['HeWeather data service 3.0'][0].now.wind.sc;
            windSpd.innerHTML = data['HeWeather data service 3.0'][0].now.wind.spd + 'kmph';
            vis.innerHTML = data['HeWeather data service 3.0'][0].now.vis + 'km';
            hum.innerHTML = data['HeWeather data service 3.0'][0].now.hum + '%';
            basicLoc.innerHTML = '今天:' + data['HeWeather data service 3.0'][0].basic.update.loc;


            var forecast = data['HeWeather data service 3.0'][0].daily_forecast;
           //生成预测天气数据
            var component = '';
            for (var i = 0; i < forecast.length; i++) {
                component += '<div class="day"><h2>' + forecast[i].date + '</h2>';
                component += '<img src="img/' + pic[forecast[i].cond.txt_d] + '"alt="">';
                component += '<div class="day-c">' + forecast[i].tmp.max + '°/' + forecast[i].tmp.min + '°</div>';
                component += '<div>' + forecast[i].cond.txt_d + '</div>';
                component += '<div class="day-f">' + forecast[i].pop + '%可能降雨</div>';
                component += '</div>';
            }

            innercontent.innerHTML = component;


        }
    };

    xhr.setRequestHeader("apikey", "29160d821e9da46e840e7abf34eaad2a");
    xhr.send(null);

    //图标配置
    var pic = {
        "晴": "weath_03.png",
        "阴": "weath_10.png",
        "多云": "weath_19.png",
        "小雨": "weath_21.png",
        "毛毛雨/细雨": "weath_21.png",
        "大雨": "weath_22.png",
        "暴雨": "weath_22.png",
        "雷阵雨": "weath_23.png",
        "晴间多云": "weath_08.png",
        "阵雨": "weath_21.png",
        "中雨": "weath_21.png",
        "强阵雨": "weath_22.png"
    }


}
ajax();