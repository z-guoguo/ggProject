<template>
  <div class="antx">
    <div id="container"></div>
  </div>
</template>
<script lang="ts">
import {insertCss} from 'insert-css';
import { defineComponent, onMounted } from "vue";
import { Graph, Shape, Addon, Edge, NodeView} from '@antv/x6'
export default defineComponent({
  name: "antX",
  setup() {
    onMounted(() => {
      // 为了协助代码演示
      preWork()
      //定义输入输出锚点开始
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
        // 获取新的in链接桩
        getNewInPorts(length: number) {
          return Array.from(
            {
              length,
            },
            () => {
              return {
                group: 'in'
              }
            },
          )
        }
        // 新增out输出链接桩
        getNewOutPorts(length: number) {
          return Array.from(
            {
              length,
            },
            () => {
              return {
                group: 'out'
              }
            },
          )
        }
        updateInPorts(graph: Graph) {
          const minNumberOfPorts = 2
          const ports = this.getInPorts()
          const usedPorts = this.getUsedInPorts(graph)
          // 新增in链接桩
          const newPorts = this.getNewInPorts(
            Math.max(minNumberOfPorts - usedPorts.length, 1),
          )
          // 新增out链接桩
          const newOutPorts = this.getNewOutPorts(1);

          if (
            ports.length === minNumberOfPorts &&
            ports.length - usedPorts.length > 0
          ) {
            // noop
          } else if (ports.length === usedPorts.length) {
            debugger
            newPorts.push(newOutPorts[0]);
            console.log(newPorts,'new')
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
          }
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

      //定义输入输出锚点结束

      // #region 初始化画布
      const graph = new Graph({
        container: document.getElementById('graph-container')!,
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
                // attrs: {
                //   line: {
                //     stroke: '#A2B1C3',
                //     strokeWidth: 1,
                //     targetMarker: {
                //       name: 'classic',
                //       size: 7,
                //     },
                //   },
                // },
                attrs: {
                        line: {
                          stroke: '#1890ff',
                          strokeWidth: 1,
                          targetMarker: {
                            name: 'classic',
                            size: 8
                          },
                          strokeDasharray: 0, //虚线
                          style: {
                            animation: 'ant-line 30s infinite linear',
                          },
                        },
                      },
                      label: {
                        text:''
                      },
                      connector: '',//折线
                      router: {
                        name: 'manhattan'
                      },
                      zIndex: 0
              })
            },
          validateConnection({ sourceView, targetView, targetMagnet }) {//锚点是否可连接
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
        resizing: true,
        rotating: true,
        selecting: {
          enabled: true,
          rubberband: true,
          showNodeSelectionBox: true,
        },
        snapline: true,
        keyboard: true,
        clipboard: true,
      })
      //编辑
      graph.on('cell:dblclick', ({ cell, e }) => {
        const isNode = cell.isNode()
        const name = cell.isNode() ? 'node-editor' : 'edge-editor'
        cell.removeTool(name)
        cell.addTools({
          name,
          args: { 
            event: e,
            attrs: {
              backgroundColor: isNode ? '#EFF4FF' : '#FFF',
            },
          },
        })
      })
      //鼠标悬停在边上显示删除边
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
      // 设置边选中样式
      graph.on('selection:changed', (args) => {
              args.added.forEach(cell => {
                if(cell.isEdge()){
                 cell.isEdge() && cell.attr('line/strokeDasharray', 5) //虚线蚂蚁线
                 cell.addTools([
                    {
                      name: 'vertices',
                      args: {
                        padding: 4,
                        attrs: {
                          strokeWidth: 0.1,
                          stroke: '#2d8cf0',
                          fill: '#ffffff',
                        }
                      },
                    },
                  ])
                }
              })
              args.removed.forEach(cell => {
                cell.isEdge() && cell.attr('line/strokeDasharray', 0)  //正常线
                cell.removeTools()
              })
          })
      // 鼠标离开边恢复进入前状态
      graph.on('edge:mouseleave', ({ edge }) => {
        edge.removeTools()
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
// graph.addNode(
//   new MyShape().resize(120, 40).position(200, 50).updateInPorts(graph),
// )

// graph.addNode(
//   new MyShape().resize(120, 40).position(400, 50).updateInPorts(graph),
// )

// graph.addNode(
//   new MyShape().resize(120, 40).position(300, 250).updateInPorts(graph),
// )
      // #endregion
      // #region 初始化 stencil
      const stencil = new Addon.Stencil({
        title: '流程图',
        target: graph,
        stencilGraphWidth: 200,
        stencilGraphHeight: 180,
        collapsable: true,
        groups: [
          {
            title: '基础流程图',
            name: 'group1',
          }
        ],
        layoutOptions: {
          columns: 2,
          columnWidth: 80,
          rowHeight: 55,
        },
      })
      document.getElementById('stencil')!.appendChild(stencil.container)
      // #endregion

      // #region 快捷键与事件
      // copy cut paste
      graph.bindKey(['meta+c', 'ctrl+c'], () => {
        console.log('bindkey:+c')
        const cells = graph.getSelectedCells()
        if (cells.length) {
          graph.copy(cells)
        }
        return false
      })
      graph.bindKey(['meta+x', 'ctrl+x'], () => {
        console.log('bindkey+X')
        const cells = graph.getSelectedCells()
        if (cells.length) {
          graph.cut(cells)
        }
        return false
      })
      graph.bindKey(['meta+v', 'ctrl+v'], () => {
        console.log('bindkey+V')
        if (!graph.isClipboardEmpty()) {
          const cells = graph.paste({ offset: 32 })
          graph.cleanSelection()
          graph.select(cells)
        }
        return false
      })

      //undo redo
      graph.bindKey(['meta+z', 'ctrl+z'], () => {
        console.log('bindkey:+Z')
        if (graph.history.canUndo()) {
          graph.history.undo()
        }
        return false
      })
      graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
        if (graph.history.canRedo()) {
          graph.history.redo()
        }
        return false
      })

      // select all
      graph.bindKey(['meta+a', 'ctrl+a'], () => {
        const nodes = graph.getNodes()
        if (nodes) {
          graph.select(nodes)
        }
      })

      //delete
      // graph.bindKey('backspace', () => {
      //   const cells = graph.getSelectedCells()
      //   if (cells.length) {
      //     graph.removeCells(cells)
      //   }
      // })

      // zoom
      graph.bindKey(['ctrl+1', 'meta+1'], () => {
        const zoom = graph.zoom()
        if (zoom < 1.5) {
          graph.zoom(0.1)
        }
      })
      graph.bindKey(['ctrl+2', 'meta+2'], () => {
        const zoom = graph.zoom()
        if (zoom > 0.5) {
          graph.zoom(-0.1)
        }
      })
      // 控制连接桩显示/隐藏
      const showPorts = (ports: NodeListOf<SVGElement>, show: boolean) => {
        for (let i = 0, len = ports.length; i < len; i = i + 1) {
          ports[i].style.visibility = show ? 'visible' : 'hidden'
        }
      }
      graph.on('node:mouseenter', ({node}) => {
        console.log('mouseenter')
        const container = document.getElementById('graph-container')!
        const ports = container.querySelectorAll(
          '.x6-port-body',
        ) as NodeListOf<SVGElement>
        showPorts(ports, true);
        node.addTools({
          name: 'button-remove',
          args: {
            x: 0,
            y: 0,
            offset: { x: 0, y: 0 },
          },
        })
      })
      graph.on('node:mouseleave', ({node}) => {
        console.log('mouseleave')
        const container = document.getElementById('graph-container')!
        const ports = container.querySelectorAll(
          '.x6-port-body',
        ) as NodeListOf<SVGElement>
        showPorts(ports, false);
        node.removeTools()
      })
      // #endregion
      // 点击保存按钮获取流程数据
      const obj = document.getElementById('spanBtn');
      console.log(obj,'obj');
      obj?.addEventListener('click', function() {
        console.log(graph.model.getNodes())
        console.log(graph.model.getEdges())
      })

      // #region 初始化图形
      const ports = {
        groups: {
          // 上下左右锚点样式
          top: {
            position: 'top',
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: {
                  visibility: 'hidden',
                },
              },
            },
          },
          right: {
            position: 'right',
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: {
                  visibility: 'hidden',
                },
              },
            },
          },
          bottom: {
            position: 'bottom',
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: {
                  visibility: 'hidden',
                },
              },
            },
          },
          left: {
            position: 'left',
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: {
                  visibility: 'hidden',
                },
              },
            },
          },
        },
        items: [
          {
            group: 'top',
          },
          {
            group: 'right',
          },
          {
            group: 'bottom',
          },
          {
            group: 'left',
          },
        ],
      }

      Graph.registerNode(
        'custom-rect',
        {
          inherit: 'rect',
          width: 66,
          height: 36,
          attrs: {
            body: {
              strokeWidth: 1,
              stroke: '#5F95FF',
              fill: '#EFF4FF',
            },
            text: {
              fontSize: 12,
              fill: '#262626',
            },
          },
          ports: { ...ports },//渲染锚点
        },
        true,
      )


      const r2 = graph.createNode({
        shape: 'custom-rect',
        label: '过程'
      })
      const r3 = new MyShape().resize(80, 40).updateInPorts(graph);
      stencil.load([r3], 'group1')

      const imageShapes: any[] = []
      const imageNodes = imageShapes.map((item) =>
        graph.createNode({
          shape: 'custom-image',
          label: item.label,
          attrs: {
            image: {
              'xlink:href': item.image,
            },
          },
        }),
      )
      stencil.load(imageNodes, 'group2')
      // #endregion

      function preWork() {
        // 这里协助演示的代码，在实际项目中根据实际情况进行调整
        const container = document.getElementById('container')!
        const stencilContainer = document.createElement('div')
        stencilContainer.id = 'stencil'
        const graphContainer = document.createElement('div')
        graphContainer.id = 'graph-container'
        container.appendChild(stencilContainer)
        container.appendChild(graphContainer)
        const spanBtn = document.createElement('span');
        spanBtn.id = 'spanBtn';
        container.appendChild(spanBtn);
        spanBtn.innerText = '保存';
        insertCss(`
          #container {
            display: flex;
            border: 1px solid #dfe3e8;
            position: relative;
          }
          #stencil {
            width: 180px;
            height: 100%;
            position: relative;
            border-right: 1px solid #dfe3e8; 
          }
          #graph-container {
            width: calc(100% - 180px);
            height: 100%;
          }
          #spanBtn {
            display: inline-block;
            color: #fff;
            cursor: pointer;
            border: 1px solid #5ab4be;
            border-radius: 4px;
            width: 80px;
            height: 34px;
            line-height: 34px;
            text-align: center;
            background: #5ab4be;
            position: absolute;
            right: 0;
          }
          .x6-widget-stencil  {
            background-color: #fff;
          }
          .x6-widget-stencil-title {
            background-color: #fff;
          }
          .x6-widget-stencil-group-title {
            background-color: #fff !important;
          }
          .x6-widget-transform {
            margin: -1px 0 0 -1px;
            padding: 0px;
            border: 1px solid #239edd;
          }
          .x6-widget-transform > div {
            border: 1px solid #239edd;
          }
          .x6-widget-transform > div:hover {
            background-color: #3dafe4;
          }
          .x6-widget-transform-active-handle {
            background-color: #3dafe4;
          }
          .x6-widget-transform-resize {
            border-radius: 0;
          }
          .x6-widget-selection-inner {
            border: 1px solid #239edd;
          }
          .x6-widget-selection-box {
            opacity: 0;
          }
        `)
      }


    })
  },
});
</script>
<style lang="less" scoped>
.antx {
  height: 100%;
  // border: 1px solid #ddd;
  border-radius: 6px;
  #container {
    height: 100%;
  }
}
</style>
