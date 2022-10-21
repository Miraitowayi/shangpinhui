import {reqCategoryList,reqGetBannerList,reqGetFloorList} from '@/api'  
//home模块的小仓库

// state：仓库存储数据的地方
const state = {
    //state中数据默认初始值别瞎写,服务器返回对象，起始值返回就是对象，服务器返回是数组，起始值就是数组【根据接口返回值初始化】
    categoryList:[],
    //轮播图
    bannerList:[],
    floorList:[]
}
// mutations：修改state的唯一手段
const mutations = {
    GETCATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    }
}
// actions：处理业务逻辑，也可以处理异步
const actions = {
  //这里可以书写业务逻辑，但不能修改state
    //通过api里面的接口函数调用，向服务器发请求，获取服务器数据
    async categoryList({commit}){
        let result = await reqCategoryList()
        if(result.code == 200){
            commit('GETCATEGORYLIST',result.data)
        }
    },
    //获取首页轮播图的数据
    async getBannerList({commit}){
        let result = await reqGetBannerList()
        if(result.code == 200){
            commit('GETBANNERLIST',result.data)
        }
    },
    async getFloorList({commit}){
        let result = await reqGetFloorList()
        if(result.code == 200){
            commit('GETFLOORLIST',result.data)
        }
    }
}
// getters：相当于计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
const getters = {}

//对外暴露Store类的一个实例
export default {
state,
mutations,
actions,
getters
}