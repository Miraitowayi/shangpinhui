//对于axios进行二次封装
import axios from "axios";
//引入进度条
import nProgress from "nprogress";
//在当前模块引入store
import store from "@/store";
//satrt:进度条开始   done:进度条结束
//引入进度条的样式
import "nprogress/nprogress.css"



//1：利用axios对象的方法create，去创建一个axios实例
//2：request就是axios，只不过稍微配置一下
const requests = axios.create({
    //配置对象
    //基础路径，发请求的时候，路径当中会出现api
    baseURL:"/api",
    //代表请求超时时间5s
    timeout:5000
})
//请求拦截器：再发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
    //config：配置对象，对象里面有一个属性很重要，headers请求头
    nProgress.start()  //进度条开始动
    if (store.state.shopcart.USER_ID) {
        config.headers.userTempId = store.state.shopcart.USER_ID;
    }

    //token[公共参数]

    if(store.state.user.token){
        config.headers.token = store.state.user.token;
    }

    //每一次发请求,请求头携带用户临时身份
    // config.headers.userTempId = SET_USERID();
    //不管那个模块发请求,请求拦截器，都可以触发。请求拦截器可以通过请求头每一次协大公共参数给服务器【用户未登录的临时身份】
    return config
})

//响应拦截器
requests.interceptors.response.use((res)=>{
    //成功的回调函数：服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
    nProgress.done()   //进度条结束
    return res.data
},(error)=>{
    //响应失败的回调函数
    return Promise.reject(new Error('failed'))
})


//对外暴露
export default requests