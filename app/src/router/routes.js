//路由配置的信息   //引入路由组件
// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess';
// import Center from '@/pages/Center'
// //引入二级路由
// import MyOrder from '@/pages/Center/MyOrder'
// import TeamOrder from '@/pages/Center/TeamOrder'

export default [
    {
        path:"/pay",
        component:()=>import("@/pages/Pay"),
        meta:{show:true},
        beforeEnter: (to, from, next) => {
            if(from.path === '/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:"/trade",
        component:()=>import("@/pages/Trade"),
        meta:{show:true},
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if(from.path === '/shopcart'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:"/home",
        component:()=>import("@/pages/Home"),
        meta:{show:true}
    },
    {
        path:"/search/:keyword?",
        component:()=>import("@/pages/Search"),
        meta:{show:true},
        name:"search"
    },
    {
        path:"/login",
        component:()=>import("@/pages/Login"),
        meta:{show:false}
    },
    {
        path:"/register",
        component:()=>import("@/pages/Register"),
        meta:{show:false}
    },
    //重定向，在项目跑起来的时间，访问/立马让他定向到首页
    {
        path:"*",
        redirect:"/home"
    },
    {
        path:"/detail/:skuid",
        component:()=>import("@/pages/Detail"),
        meta:{show:true}
    },
    {
        path:"/addcartsuccess",
        name:'addcartsuccess',
        component:()=>import("@/pages/AddCartSuccess"),
        meta:{show:true}
    },
    {
        path:"/shopcart",
        component:()=>import("@/pages/ShopCart"),
        meta:{show:true}
    },
    {
        path: '/paysuccess',
        component: ()=>import("@/pages/PaySuccess"),
        meta: { show: true },
        //改为组件内守卫
        // beforeEnter: (to, from, next) => {
        //     if(from.path === '/pay'){
        //         next()
        //     }else{
        //         next(false)
        //     }
        // }
    },
    {
        path: '/center',
        component: ()=>import("@/pages/Center"),
        meta: { show: true },
        //二级路由配置的地方
        children:[
             //我的订单
             {
                  path:'myorder',
                  component:()=>import("@/pages/Center/MyOrder")
             }
             ,
             {
                 path:'teamorder',
                 component:()=>import("@/pages/Center/TeamOrder")
             }
             ,
             {
                 path:'/center',
                 //重定向  访问center  直接定向到myorder
                 redirect:'/center/myorder'
             }
        ]
    },
]