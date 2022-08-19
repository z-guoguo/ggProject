<template>
  <Layout :navData="data.navData" :navHeight="data.navHeight">
    <!-- 插槽 -->
    <template #content>
      <transition name="fade-transform">
        <router-view></router-view>
      </transition>
    </template>
  </Layout>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import Layout from '@/components/layout/index.vue'; // @ is an alias to /src
export default defineComponent({
  name: 'App',
  setup() {
    const data = reactive({
      navData: [{
        name: '组件生成器',
        code: 'builderView'
      },{
        name: 'G6',
        code: 'antV'
      },{
        name: '测试',
        code: 'mainView'
      }],
      navHeight: '60',//自定义layout组件头部菜单栏高度
    })

    return {
      data
    }
  },
  components: {
    Layout
  }
})
</script>


<style lang="less" scoped>
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
