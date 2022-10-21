<template>
  <div>
    <Header/>
    <!-- 路由组件出口地方 -->
    <router-view></router-view>
    <!-- 在Home、Search显示，在登陆、注册时候隐藏 -->
    <Footer v-show="$route.meta.show"/>
  </div>
  
</template>

<script>
//引入
// import Header from "./components/Header";
// import Footer from "./components/Footer";
export default {
//  components:{Header,Footer},
 name: "",
  data() {
    return {
      searchParams: {
        pageNo: 6,
        pageSize: 3,
      },
    };
  },
 mounted(){
  //派发一个action||获取商品分类的三级列表的数据
    this.$store.dispatch("categoryList");
 }
}
</script>

<style scoped>

</style>
