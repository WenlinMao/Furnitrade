/**
* @desc 封装了localStorage和sessionStorage的使用, 可直接保存, 获取对象.
*/
export function setLocal(name, value) {
    var data = value;
    if (typeof(data) !== 'string') {
        if (typeof(data) === 'undefined') {
            data = null;
        } else {
            data = JSON.stringify(data);
        }
    }
    localStorage.setItem(name, data);
 }
  
 export function getLocal(name) {
    var data = localStorage.getItem(name);
    try {
        return JSON.parse(data);
    } catch (e) {
        return data;
    }
 }
  
 export function setSession(name, value) {
    var data = value;
    if (typeof(data) !== 'string') {
        if (typeof(data) === 'undefined') {
            data = null;
        } else {
            data = JSON.stringify(data);
        }
    }
    sessionStorage.setItem(name, data);
 }
  
 export function getSession(name) {
    var data = sessionStorage.getItem(name);
    try {
        return JSON.parse(data);
    } catch (e) {
        return data;
    }
 }
  
 /**
 * @desc 封装了cookie使用
 */
 export function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + 6 * 60 * 60 * 1000);
    document.cookie = name + '=' + escape (value) + ';expires=' + exp.toGMTString();
  
 }
  
 export function getCookie(name) {
    if (document.cookie.length > 0) {
        let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
        let arr = document.cookie.match(reg);
        if( arr ){return unescape(arr[2]);}
        return null;
    }
 }
  
 export function clearCookie(){
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i =  keys.length; i--;) {
            document.cookie = keys[i] + '=0;expires=' + new Date( 0).toUTCString();
        }
    }
 }
  
 export function remove(name) {
    if (sessionStorage.getItem(name)) {
        sessionStorage.removeItem(name);
    }
    if (localStorage.getItem(name)) {
        localStorage.removeItem(name);
    }
 }
  
 export function clear(){
    sessionStorage.clear();
    localStorage.clear();
 }
 