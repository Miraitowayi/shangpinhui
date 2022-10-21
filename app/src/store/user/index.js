//登录、注册模块的小仓库
import { reqGetCode, reqRegister, reqUserLogin, reqUserInfo, reqUserLogout } from '@/api';
import {setToken,getToken,removeToken} from '@/utils/token'
let state = {
     //验证码
     code: '',
     //身份标识符很重要【存储在vuex】
     // token: localStorage.getItem("TOKEN"),
     token:getToken(),
     //用户名
     nickName: '',
     // userInfo:{}
};
let mutations = {
     GETCODE(state, code) {
          state.code = code;
     },
     SET_TOKEN(state, token) {
          state.token = token;
     },
     SET_USERINFO(state, nickName) {
          state.nickName = nickName;
     },
     // SET_USERINFO(state, userInfo) {
     //      state.userInfo = userInfo;
     // },
     CLEAR(state) {
          //清除仓库相关用户信息及本地存储登录
          state.token = '';
          state.nickName = '';
          //本地存储令牌清空
          // localStorage.removeItem('TOKEN');
          removeToken()
     }
};
let actions = {
     //获取验证码
     async getCode({ commit, state, dispatch }, phone) {
          //获取验证码这个接口：把验证码返回，但是正常情况，后台把验证码发到用户手机上
          let result = await reqGetCode(phone);
          if (result.code == 200) {
               commit('GETCODE', result.data);
               return 'ok';
          } else {
               return Promise.reject();
          }
     }
     ,
     //注册用户的地方
     async registerUser({ commit, state, dispatch }, obj) {
          //注册接口没有返回data,不需要提交mutation
          let result = await reqRegister(obj);
          if (result.code == 200) {
               //注册成功
               return 'ok';
          } else {
               //注册失败
               return Promise.reject(new Error(result.message));
          }
     }
     ,
     //用户登录的地方:非常非常重要
     async userLogin({ commit, state, dispatch }, data) {
          //接口说明:后台老师目前登录接口返回数据不正确的，以后工作的时候登录接口成功，返回格式100%和相面例子一样的!!!
          /*
            举例子
             {
                   code:200,
                   data:{
                        token:'1e4vdadhajkhdakj6sahdajk'
                   },
                   message:'登录成功'
             }
          */
          let result = await reqUserLogin(data);
          //登录成功
          if (result.code == 200) {
               commit('SET_TOKEN', result.data.token);
               //以后开发的时候:经常的登录的成功获取token【持久化存储】
               // localStorage.setItem('TOKEN', result.data.token);
               setToken(result.data.token)
               return 'ok';
          } else {
               //登录失败
               return Promise.reject(new Error(result.message));
          }

     }
     ,
     //获取用户信息
     async getUserInfo({ commit, state, dispatch }) {
          let result = await reqUserInfo();
          // console.log(result);
          if (result.code == 200) {
               commit('SET_USERINFO', result.data.nickName);
               // commit('SET_USERINFO', result.data.userInfo);
               return 'ok';
          } else {
               return Promise.reject();
          }
     },
     //退出登录的业务
     async logout({ commit, state, dispatch }) {
          //发请求通知服务器销毁当前token【学生证】
          let result = await reqUserLogout();
          if (result.code == 200) {
               commit('CLEAR');
               return 'ok';
          } else {
               return Promise.reject(new Error(result.message));
          }
     }
};
let getters = {};

//对外暴露
export default {
     state,
     mutations,
     actions,
     getters
}