<template>
  <div class="layout">
    <div class="layout_nav">
      <div v-for="item in data.navDataList" :key="item.code" @click="tabNav(item)" :class="{selected: item.code == data.currentActive}">{{item.name}}</div>
    </div>
    <div class="layout_content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { useRouter} from 'vue-router'
export default defineComponent({
  name: 'layoutWorld',
  /**
   * @description props 外部传入数据说明
   * @param navData {array} 头部导航菜单数据 {name:string,code:string} name 菜单展示名称 code对应菜单组件router路由name
   * @param navHeight {string | number} 传入头部导航栏高度 例如 200 ｜ '200'
  */
  props: {
    navData:{
      type: Array,
      default: function() {
        return [{
          name: '开发中，敬请期待',
          code: 'mainView'
        }]
      }
    },
    navHeight: {
      type:String || Number,
      default: 60
    }
  },
  setup(props:any, ctx) {
    const router = useRouter();//router
    // 定义DOM
    type  HTMLElementTagNameMap = {
      div: HTMLDivElement
    }
    // reactive 定义响应式数据
    const data = reactive({
      currentActive: 'Builder',
      navDataList: []
    });
    data.navDataList = ref(props.navData)
    // 类型设置
    type tabNavP = {
      name: string,
      code: string
    }
    /**
     * @description 导航栏菜单点击跳转相应组件
     * @param item {tabNavP} 当前点击菜单数据信息
     * @returns
    */
    const tabNav = (item:tabNavP) => {
      console.log(item)
      data.currentActive = item.code;//设置当前活动菜单，用于设置样式
      router.push({
        name: item.code
      })
    };
    /**
     * @description 钩子函数
    */
    onMounted(()=> {
      // 根据引用组件者 传入值进行修改页面头部菜单样式默认值
      let divObj = document.querySelectorAll<HTMLDivElement>('div.layout_nav');
      if(divObj !== null) {
        // 设置自定义高度
        divObj[0].style.height = props.navHeight + 'px';
        divObj[0].style.lineHeight = props.navHeight + 'px';
        // 设置自定义颜色
      }
      // 初始化设置头部菜单活动页及样式
      data.currentActive = props.navData[0].code;
      router.push({
        name: data.currentActive
      })
    });
    return {
      data,
      tabNav
    }
  }
});
</script>
<style lang="less" scoped>
@import "@/assets/css/variable.less";
.layout {
  height:100%;
  position: relative;
  .layout_nav {
    display: flex;
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
    box-sizing: border-box;
    background-color: @mainColor;
    >div {
      padding: 0 10px;
      box-sizing: border-box;
      margin-right: 10px;
      cursor: pointer;
      color: #fff;
    }
    .selected {
      background-color:@mainMatchColor;
    }
  }
  .layout_content {
    height: calc(100vh - 60px);
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>
