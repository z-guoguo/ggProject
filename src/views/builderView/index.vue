<template>
  <div class="builderView">
    <div class="builderView_left">
      <div
        v-for="item in data.leftData"
        :key="item.code"
        :class="{
          rectangleStyle: item.code == 'rectangle',
          prismaticStyle: item.code == 'prismatic',
        }"
        @dragstart="dragDiv($event, item)"
        draggable="true"
      ></div>
    </div>
    <div
      class="builderView_right"
      @drop="dropEvent(data.currentData)"
      @dragover.prevent
    >
      <!--  @mousedown="mousedownDiv" -->
      <div
        v-for="(right, $index) in rightData"
        :key="$index"
        :style="{
          'margin-top': right.code == 'rectangle' && $index != 0 ? '-6px' : '0',
        }"
        :class="{
          rectangleStyle: right.code == 'rectangle',
          prismaticStyle: right.code == 'prismatic',
          lineStyle: right.code == 'line',
          arrowStyle: right.code == 'arrow',
        }"
      >
        <input
          type="text"
          class="rightInput"
          v-if="right.code == 'rectangle'"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, Ref, toRefs } from 'vue';
export default defineComponent({
    name: 'builderView',
    setup(_props,_ctx) {
        type P = {
            name: string,
            code: string,
            value: string
        }
        //reactive设置响应式数据
        const data = reactive({
            leftData: [{
                name: '长方形',
                code: 'rectangle',
                value: ''
            }
            // ,{
            //     name: '棱形',
            //     code: 'prismatic',
            //     value: ''
            // }
            ],
            clientX: '',//鼠标水平坐标
            clientY: '',//鼠标垂直坐标
            offsetLeft: '',//当前拖拽元素左侧偏移距离
            offsetTop: '',//当前拖拽元素上方偏移距离
            currentDragDom: '',
            currentData: {},//当前拖拽数据
        })
        //ref设置响应式数据
        const rightData: Ref<P[]> = ref([]);
        const dragDiv = (_event: any, item: never) => {
            data.currentData = item;
        }
        const dropEvent = (item:P) => {
            if(rightData.value.length!=0) {
                rightData.value.push({
                    name: '线',
                    code: 'line',
                    value: ''
                },{
                    name: '箭头',
                    code: 'arrow',
                    value: ''
                })
            }
            rightData.value.push(item);
            console.log(rightData.value);
        }
        /**
         * @description js实现元素拖拽移动
        */
        const mousedownDiv = (e:any) => {
            let offsetWidth = e.target.clientWidth;
            let offsetHeight = e.target.clientHeight;
            let parentNodeTop = e.target.parentNode.offsetTop + 20;//父元素上边距离上部距离
            let parentNodeLeft = e.target.parentNode.offsetLeft + 20;//父元素左边距离左侧距离
            let parentNodeBottomTop = e.target.parentNode.offsetTop + e.target.parentNode.offsetHeight - offsetHeight - 20;//父元素下边距离上部距离
            let parentNodeRightLeft = e.target.parentNode.offsetLeft + e.target.parentNode.offsetWidth - offsetWidth - 20;//父元素右边距离左侧距离
            let clientX = 0;
            let clientY = 0;
            document.onmousemove = function(event){
                clientX = event.clientX;
                clientY = event.clientY;
                e.target.style.position = 'absolute';
                e.target.style.left = ((clientX - offsetWidth/2) < parentNodeLeft)? (parentNodeLeft + "px") : ((clientX - offsetWidth/2)>parentNodeRightLeft)?(parentNodeRightLeft + 'px'):((clientX - offsetWidth/2) + "px")
                e.target.style.top = ((clientY - offsetHeight/2) < parentNodeTop)? (parentNodeTop + "px") : ((clientY - offsetHeight/2)>parentNodeBottomTop?(parentNodeBottomTop+ 'px'):(clientY - offsetHeight/2) + "px")
            };
            document.onmouseup = function(){
                //取消鼠标移动事件
                document.onmousemove = null;
                document.onmouseup = null;
            }
        }
        return {
            data,//reactive定义响应式数据
            rightData,//ref定义响应式数据：右侧渲染数据
            dragDiv,//开始拖拽
            dropEvent,//拖拽接收元素松开被拖拽元素事件
            mousedownDiv,//js实现元素拖拽（鼠标按下事件）
        }
    }
})
</script>
<style lang="less" scoped>
.builderView {
  display: flex;
  height: 100%;
  .builderView_left {
    width: 300px;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 20px 0;
    box-sizing: border-box;
    .rectangleStyle {
      width: 100px;
      height: 50px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin: 0 auto;
      cursor: pointer;
      background-color: #fff;
    }
    .prismaticStyle {
      width: 80px;
      height: 80px;
      transform: rotate(45deg);
      border: 1px solid #ddd;
      border-radius: 4px;
      margin: 0 auto;
      cursor: pointer;
      background-color: #fff;
      margin-top: 50px;
    }
  }
  .builderView_right {
    flex: 1;
    height: 100%;
    margin-left: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 20px;
    box-sizing: border-box;
    overflow: auto;
    .rectangleStyle {
      width: 100px;
      min-height: 30px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin: 0 auto;
      cursor: pointer;
      background-color: #fff;
      // padding: 10px 20px;
      text-align: center;
    }
    .prismaticStyle {
      width: 100px;
      height: 100px;
      transform: rotate(45deg);
      border: 1px solid #ddd;
      border-radius: 4px;
      margin: 0 auto;
      cursor: pointer;
      background-color: #fff;
      text-align: center;
      margin-top: 13px !important;
    }
    .lineStyle {
      width: 2px;
      height: 50px;
      background-color: lightBlue;
      margin: 0 auto;
    }
    .arrowStyle {
      width: 0;
      height: 0;
      border: 6px solid;
      border-color: lightBlue transparent transparent transparent;
      margin: 0 auto;
    }
    .rightInput {
      width: 98%;
      min-height: 30px;
      border: none;
      text-align: center;
    }
  }
}
</style>
