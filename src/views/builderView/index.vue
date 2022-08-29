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
    <!-- @drop="dropEvent(data.currentData)" -->
    <div
      class="builderView_right"
      
      @dragover.prevent
    >
      <!--  @mousedown="mousedownDiv" -->
      <!-- <div
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
      </div> -->

      <!-- X6 -->
      <div id="container"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, Ref, toRefs } from 'vue';
import { Graph, Edge, Shape, NodeView } from '@antv/x6'
export default defineComponent({
    name: 'builderView',
    setup(_props,_ctx) {
      onMounted(()=> {
        // X6----开始
        // 定义节点
        class MyShape extends Shape.Rect {
          getInPorts() {
            return this.getPortsByGroup('in')
          }

          getOutPorts() {
            return this.getPortsByGroup('out')
          }

          getUsedInPorts(graph: Graph) {
            const incomingEdges = graph.getIncomingEdges(this) || []
            return incomingEdges.map((edge: Edge) => {
              const portId = edge.getTargetPortId()
              return this.getPort(portId!)
            })
          }

          getNewInPorts(length: number) {
            return Array.from(
              {
                length,
              },
              () => {
                return {
                  group: 'in',
                }
              },
            )
          }

          updateInPorts(graph: Graph) {
            const minNumberOfPorts = 2
            const ports = this.getInPorts()
            const usedPorts = this.getUsedInPorts(graph)
            const newPorts = this.getNewInPorts(
              Math.max(minNumberOfPorts - usedPorts.length, 1),
            )

            if (
              ports.length === minNumberOfPorts &&
              ports.length - usedPorts.length > 0
            ) {
              // noop
            } else if (ports.length === usedPorts.length) {
              this.addPorts(newPorts)
            } else if (ports.length + 1 > usedPorts.length) {
              this.prop(
                ['ports', 'items'],
                this.getOutPorts().concat(usedPorts).concat(newPorts),
                {
                  rewrite: true,
                },
              )
            }

            return this
          }
        }

        MyShape.config({
          attrs: {
            root: {
              magnet: false,
            },
            body: {
              fill: '#EFF4FF',
              stroke: '#5F95FF',
              strokeWidth: 1,
            },
          },
          ports: {
            items: [
              {
                group: 'out',
              },
            ],
            groups: {
              in: {
                position: {
                  name: 'top',
                },
                attrs: {
                  portBody: {
                    magnet: 'passive',
                    r: 6,
                    stroke: '#5F95FF',
                    fill: '#fff',
                    strokeWidth: 1,
                  },
                },
              },
              out: {
                position: {
                  name: 'bottom',
                },
                attrs: {
                  portBody: {
                    magnet: true,
                    r: 6,
                    fill: '#fff',
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                  },
                },
              },
            },
          },
          portMarkup: [
            {
              tagName: 'circle',
              selector: 'portBody',
            },
          ],
        })

        // 高亮
        const magnetAvailabilityHighlighter = {
          name: 'stroke',
          args: {
            attrs: {
              fill: '#fff',
              stroke: '#47C769',
            },
          },
        }

        // 画布
        const graph = new Graph({
          container: document.getElementById('container')!||'',
          grid: true,
          highlighting: {
            magnetAvailable: magnetAvailabilityHighlighter,
            magnetAdsorbed: {
              name: 'stroke',
              args: {
                attrs: {
                  fill: '#fff',
                  stroke: '#31d0c6',
                },
              },
            },
          },
          connecting: {
            snap: true,
            allowBlank: false,
            allowLoop: false,
            highlight: true,
            connector: 'rounded',
            connectionPoint: 'boundary',
            router: {
              name: 'er',
              args: {
                direction: 'V',
              },
            },
            createEdge() {
              return new Shape.Edge({
                attrs: {
                  line: {
                    stroke: '#A2B1C3',
                    strokeWidth: 1,
                    targetMarker: {
                      name: 'classic',
                      size: 7,
                    },
                  },
                },
              })
            },
            validateConnection({ sourceView, targetView, targetMagnet }) {
              if (!targetMagnet) {
                return false
              }

              if (targetMagnet.getAttribute('port-group') !== 'in') {
                return false
              }

              if (targetView) {
                const node = targetView.cell
                if (node instanceof MyShape) {
                  const portId = targetMagnet.getAttribute('port')
                  const usedInPorts = node.getUsedInPorts(graph)
                  if (usedInPorts.find((port) => port && port.id === portId)) {
                    return false
                  }
                }
              }

              return true
            },
          },
        })
        function update(view: NodeView) {
          const cell = view.cell
          if (cell instanceof MyShape) {
            cell.getInPorts().forEach((port) => {
              const portNode = view.findPortElem(port.id!, 'portBody')
              view.unhighlight(portNode, {
                highlighter: magnetAvailabilityHighlighter,
              })
            })
            cell.updateInPorts(graph)
          }
        }

        graph.on('edge:connected', ({ previousView, currentView }) => {
          if (previousView) {
            update(previousView as NodeView)
          }
          if (currentView) {
            update(currentView as NodeView)
          }
        })

        graph.on('edge:removed', ({ edge, options }) => {
          if (!options.ui) {
            return
          }

          const target = edge.getTargetCell()
          if (target instanceof MyShape) {
            target.updateInPorts(graph)
          }
        })

        graph.on('edge:mouseenter', ({ edge }) => {
          edge.addTools([
            'source-arrowhead',
            'target-arrowhead',
            {
              name: 'button-remove',
              args: {
                distance: -30,
              },
            },
          ])
        })

        graph.on('edge:mouseleave', ({ edge }) => {
          edge.removeTools()
        })
        //编辑
        graph.on("cell:dblclick", ({ cell, e }) => {
          const isNode = cell.isNode();
          const name = cell.isNode() ? "node-editor" : "edge-editor";
          cell.removeTool(name);
          cell.addTools({
            name,
            args: {
              event: e,
              attrs: {
                backgroundColor: isNode ? "#EFF4FF" : "#FFF",
              },
            },
          });
        });
        graph.on('node:mouseenter', ({ node }) => {
          node.addTools({
            name: "button-remove",
            args: {
              x: 0,
              y: 0,
              offset: { x: 0, y: 0 },
            },
          });
        })
        // X6············结束
        // 绑定事件
        const builderViewRight = document.getElementsByClassName('builderView_right')[0];
        builderViewRight.addEventListener('drop', function() {
          const num:number = Math.random() * 10;
          graph.addNode(
            new MyShape().resize(120, 40).position(200 + num, 50 + num).updateInPorts(graph),
          )
        })
      })
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
            // if(rightData.value.length!=0) {
            //     rightData.value.push({
            //         name: '线',
            //         code: 'line',
            //         value: ''
            //     },{
            //         name: '箭头',
            //         code: 'arrow',
            //         value: ''
            //     })
            // }
            // rightData.value.push(item);
            // console.log(rightData.value);
            // X6
            // graph.addNode(
            //   new MyShape().resize(120, 40).position(200, 50).updateInPorts(graph),
            // )
        }
        /**
         * @description js实现元素拖拽移动
        */
        // const mousedownDiv = (e:any) => {
        //     let offsetWidth = e.target.clientWidth;
        //     let offsetHeight = e.target.clientHeight;
        //     let parentNodeTop = e.target.parentNode.offsetTop + 20;//父元素上边距离上部距离
        //     let parentNodeLeft = e.target.parentNode.offsetLeft + 20;//父元素左边距离左侧距离
        //     let parentNodeBottomTop = e.target.parentNode.offsetTop + e.target.parentNode.offsetHeight - offsetHeight - 20;//父元素下边距离上部距离
        //     let parentNodeRightLeft = e.target.parentNode.offsetLeft + e.target.parentNode.offsetWidth - offsetWidth - 20;//父元素右边距离左侧距离
        //     let clientX = 0;
        //     let clientY = 0;
        //     document.onmousemove = function(event){
        //         clientX = event.clientX;
        //         clientY = event.clientY;
        //         e.target.style.position = 'absolute';
        //         e.target.style.left = ((clientX - offsetWidth/2) < parentNodeLeft)? (parentNodeLeft + "px") : ((clientX - offsetWidth/2)>parentNodeRightLeft)?(parentNodeRightLeft + 'px'):((clientX - offsetWidth/2) + "px")
        //         e.target.style.top = ((clientY - offsetHeight/2) < parentNodeTop)? (parentNodeTop + "px") : ((clientY - offsetHeight/2)>parentNodeBottomTop?(parentNodeBottomTop+ 'px'):(clientY - offsetHeight/2) + "px")
        //     };
        //     document.onmouseup = function(){
        //         //取消鼠标移动事件
        //         document.onmousemove = null;
        //         document.onmouseup = null;
        //     }
        // }
        return {
            data,//reactive定义响应式数据
            rightData,//ref定义响应式数据：右侧渲染数据
            dragDiv,//开始拖拽
            dropEvent,//拖拽接收元素松开被拖拽元素事件
            // mousedownDiv,//js实现元素拖拽（鼠标按下事件）
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
    #container {
      height: 100%;
    }
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
