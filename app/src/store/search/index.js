//search模块的小仓库
import { reqGetSearchInfo } from '@/api'
// state：仓库存储数据的地方
const state = {
  searchList: {}
}
// mutations：修改state的唯一手段
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  }
}
// actions：处理业务逻辑，也可以处理异步
const actions = {
  //这里可以书写业务逻辑，但不能修改state
  //params形参：是当用户派发action的时候。第二个参数传过来的，至少是一个空对象
  async getSearchList({ commit }, params = {}) {
    let result = await reqGetSearchInfo(params)
    if (result.code == 200) {
      commit('GETSEARCHLIST', result.data)
    }
  }
}
// getters：相当于计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
const getters = {
  //state形参是当前仓库的state，不是大仓库中的state
  goodsList(state){
    return state.searchList.goodsList||[] 
  },
  trademarkList(state){
    return state.searchList.trademarkList||[] 
  },
  attrsList(state){
    return state.searchList.attrsList||[] 
  }
}

//对外暴露Store类的一个实例
export default {
  state,
  mutations,
  actions,
  getters
}