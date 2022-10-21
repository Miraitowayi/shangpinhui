//当前这个模块：API进行统一管理
import requests from "./request";
import mockRequest from './mockAjax'

//三级联动
///api/product/getBaseCategoryList  get  无参数
export const reqCategoryList = ()=>
    //发请求:axios发送请求返回结果Promise对象
    requests({
        url:'/product/getBaseCategoryList',
        method:'get'
});

//获取banner（home首页轮播图接口）
export const reqGetBannerList = ()=>
    //发请求:axios发送请求返回结果Promise对象
    mockRequest({
        url:'/banner',
        method:'get'
});

//获取floor
export const reqGetFloorList = ()=>
    //发请求:axios发送请求返回结果Promise对象
    mockRequest({
        url:'/floor',
        method:'get'
});

//获取搜索模块数据  地址：/api/list 请求方式：post 参数：需要带参数
//当前这个接口，给服务器传递参数params,至少是一个空对象
export const reqGetSearchInfo = (params) => 
    requests({
        url:"/list",
        method:"post",
        data:params

    })

//获取商品详情信息的接口 URL:/api/item/{skuId}  请求方式：get
export const reqDetailList = (skuId)=>requests({url:`/item/${skuId}`,method:'get'});

//加入购物车|将来修改商品个数的接口
export const reqAddOrUpdateCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'});


//获取用户购物车的数据接口
export const reqShopCart = ()=>requests({url:'/cart/cartList',method:'get'});


//删除某一个商品的接口
export const reqDeleteCart = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'});


//修改某一个商品的勾选的状态

export const reqUpdateChecked=(skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'});


//获取验证码接口
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'});

//注册的接口
export const reqRegister = (data)=>requests({url:`/user/passport/register`,method:'post',data});

//登录的接口:请求体携带参数 phone&&password
export const reqUserLogin = (data)=>requests({url:`/user/passport/login`,method:'post',data});

//获取用户登录成功以后用户信息的接口
export const reqUserInfo = ()=>requests({url:`/user/passport/auth/getUserInfo`,method:'get'});


//退出登录业务
export const reqUserLogout = ()=>requests({url:`/user/passport/logout`,method:'get'});



//获取用户地址信息
export const reqAddressInfo = ()=>requests({url:`/user/userAddress/auth/findUserAddressList`,method:'get'});


//获取商品清单数据
export const reqShopInfo = ()=>requests({url:`/order/auth/trade`,method:'get'});


//提交订单接口
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:'post',data});

//获取支付信息接口
export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'});

//查询支付结果
export const reqPayResult = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'});


//获取我的订单
export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'});
