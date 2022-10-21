import Vue from 'vue'
import App from './App.vue'

// 注册两个全局组件:Header、Footer,全局组件写法【定义一次,可以直接在任意地方使用】
//Vue.component(组件的名字,组件)
//组件:实质是VueComponent构造函数,为什么下面Header组件打印并非是VueComponent构造函数,因为Header组件暴露的
//配置项(JS),并非暴露Vue.extend()[返回VueComponent构造函数],用的是简写方式
//三级联动组件--全局组件
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TypeNav from '@/components/TypeNav';
import Pagination from '@/components/Pagination';
// import HintButton from '@/components/HintButton'
//第一个参数：全局组件的名字  第二个参数：哪一个组件
Vue.component(Header.name, Header);
Vue.component(Footer.name, Footer);
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)
// Vue.component(HintButton.name,HintButton);
/*
底下的写法目前是全部引入
完整引入element-ui组件库,可以使用任意UI组件【都是全局组件】
//引入elementUI插件
import ElementUI from 'element-ui';
//引入element样式
import 'element-ui/lib/theme-chalk/index.css';
//安装使用elementUI插件
Vue.use(ElementUI);
*/
//按需引入
import { Button, Row, Col, MessageBox,Message,Input} from 'element-ui';
//element-ui大多数组件，注册为全局组件Vue.component|Vue.use
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Input)
//按需引入写法不同的:MessageBox、Message、Loading、Notification
Vue.prototype.$msgbox = MessageBox;
//消息提示框
Vue.prototype.$alert = MessageBox.alert;

Vue.prototype.$message = Message;
//测试获取数据
// import { reqCategory } from '@/api';
// console.log('入口文件地方',reqCategory());

//引入路由
import router from '@/router'
//引入仓库
import store from './store'
//引入MockServer.js
import '@/mock/mockServe.js'
//引入swiper样式
import "swiper/css/swiper.css"
//统一接口api文件夹里面全部请求函数
import * as API from '@/api'

//引入懒加载插件
import VueLazyload from 'vue-lazyload'
import meinv from '@/assets/21.jpg'
//注册产检
Vue.use(VueLazyload,{
  //懒加载默认的图片
  loading:meinv
})

//引入校验插件
import '@/pages/plugins/validate'




Vue.config.productionTip = false

new Vue({
  //全局事件总线$bus
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  //注册路由
  router,
  //注册仓库：组件实例对象身上会多一个$store属性
  store,
  render: h => h(App),
  
}).$mount('#app')
