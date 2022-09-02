<template>
    <div class="animationX6">
        <div id="container"></div>
    </div>
  </template>
  
  <script lang="ts">
  import { createVNode, defineComponent, onMounted, onUnmounted, ref } from 'vue';
import { Graph,Shape, Node, Path, Cell, Edge } from '@antv/x6'
import '@antv/x6-vue-shape'
import insertCss from 'insert-css'
import Step from './components/step.vue'
  
  export default defineComponent({
    name: 'animationX6',
    components:{
        // Step
    },
    setup() {
      const data = {
        // graph: {},//Graph实例
      }
        interface NodeStatus {
            id: string
            status: 'default' | 'success' | 'failed' | 'running'
            label?: string
        }
        let graph = ref<any>({}) // 流程图
        onMounted(()=> {
            const test = [
                {
                    "id": "1",
                    "shape": "dag-node",
                    "x": 290,
                    "y": 110,
                    "data": {
                    "label": "读数据",
                    "status": "success"
                    },
                    "ports": [
                    {
                        "id": "1-1",
                        "group": "bottom"
                    }
                    ]
                },
                {
                    "id": "2",
                    "shape": "dag-node",
                    "x": 290,
                    "y": 225,
                    "data": {
                    "label": "逻辑回归",
                    "status": "success"
                    },
                    "ports": [
                    {
                        "id": "2-1",
                        "group": "top"
                    },
                    {
                        "id": "2-2",
                        "group": "bottom"
                    },
                    {
                        "id": "2-3",
                        "group": "bottom"
                    }
                    ]
                },
                {
                    "id": "3",
                    "shape": "dag-node",
                    "x": 170,
                    "y": 350,
                    "data": {
                    "label": "模型预测",
                    "status": "success"
                    },
                    "ports": [
                    {
                        "id": "3-1",
                        "group": "top"
                    },
                    {
                        "id": "3-2",
                        "group": "bottom"
                    }
                    ]
                },
                {
                    "id": "4",
                    "shape": "dag-node",
                    "x": 450,
                    "y": 350,
                    "data": {
                    "label": "读取参数",
                    "status": "success"
                    },
                    "ports": [
                    {
                        "id": "4-1",
                        "group": "top"
                    },
                    {
                        "id": "4-2",
                        "group": "bottom"
                    }
                    ]
                },
                {
                    "id": "5",
                    "shape": "dag-edge",
                    "source": {
                    "cell": "1",
                    "port": "1-1"
                    },
                    "target": {
                    "cell": "2",
                    "port": "2-1"
                    },
                    "zIndex": 0
                },
                {
                    "id": "6",
                    "shape": "dag-edge",
                    "source": {
                    "cell": "2",
                    "port": "2-2"
                    },
                    "target": {
                    "cell": "3",
                    "port": "3-1"
                    },
                    "zIndex": 0
                },
                {
                    "id": "7",
                    "shape": "dag-edge",
                    "source": {
                    "cell": "2",
                    "port": "2-3"
                    },
                    "target": {
                    "cell": "4",
                    "port": "4-1"
                    },
                    "zIndex": 0
                }
            ];
            const nodeStatusList =
                [[
                    {
                    id: '1',
                    status: 'running',
                    },
                    {
                    id: '2',
                    status: 'default',
                    },
                    {
                    id: '3',
                    status: 'default',
                    },
                    {
                    id: '4',
                    status: 'default',
                    },
                ],
                [
                    {
                    id: '1',
                    status: 'success',
                    },
                    {
                    id: '2',
                    status: 'running',
                    },
                    {
                    id: '3',
                    status: 'default',
                    },
                    {
                    id: '4',
                    status: 'default',
                    },
                ],
                [
                    {
                    id: '1',
                    status: 'success',
                    },
                    {
                    id: '2',
                    status: 'success',
                    },
                    {
                    id: '3',
                    status: 'running',
                    },
                    {
                    id: '4',
                    status: 'running',
                    },
                ],
                [
                    {
                    id: '1',
                    status: 'success',
                    },
                    {
                    id: '2',
                    status: 'success',
                    },
                    {
                    id: '3',
                    status: 'success',
                    },
                    {
                    id: '4',
                    status: 'failed',
                    },
                ]];
                //创建vue组件节点
                Graph.registerNode(
                    'dag-node',
                    {
                        inherit: 'vue-shape',
                        width: 180,
                        height: 36,
                        component:{
                            render: ()=> {
                                return createVNode(Step);//创建vue组件节点
                            }
                        },
                        ports: {
                        groups: {
                            top: {
                            position: 'top',
                            attrs: {
                                circle: {
                                r: 4,
                                magnet: true,
                                stroke: '#C2C8D5',
                                strokeWidth: 1,
                                fill: '#fff',
                                },
                            },
                            },
                            bottom: {
                            position: 'bottom',
                            attrs: {
                                circle: {
                                r: 4,
                                magnet: true,
                                stroke: '#C2C8D5',
                                strokeWidth: 1,
                                fill: '#fff',
                                },
                            },
                            },
                        },
                        },
                    },
                    true,
                )
                Graph.registerEdge(
                    'dag-edge',
                    {
                        inherit: 'edge',
                        attrs: {
                        line: {
                            stroke: '#C2C8D5',
                            strokeWidth: 1,
                            targetMarker: null,
                        },
                        },
                    },
                    true,
                )
                Graph.registerConnector(
                    'algo-connector',
                    (s, e) => {
                        const offset = 4
                        const deltaY = Math.abs(e.y - s.y)
                        const control = Math.floor((deltaY / 3) * 2)

                        const v1 = { x: s.x, y: s.y + offset + control }
                        const v2 = { x: e.x, y: e.y - offset - control }

                        return Path.normalize(
                        `M ${s.x} ${s.y}
                        L ${s.x} ${s.y + offset}
                        C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x} ${e.y - offset}
                        L ${e.x} ${e.y}
                        `,
                        )
                    },
                    true,
                )
            graph.value = new Graph({
                container: document.getElementById('container')!,
                panning: {
                    enabled: true,//开启拖拽平移
                    eventTypes: ['leftMouseDown', 'mouseWheel','rightMouseDown'],//设置触发画布拖拽的行为 默认leftMouseDown
                },
                mousewheel: {
                    enabled: true,
                    modifiers: 'ctrl',
                    factor: 1.1,
                    maxScale: 1.5,
                    minScale: 0.5,
                },
                grid: true,// 网格
                highlighting: {
                    magnetAdsorbed: {
                    name: 'stroke',
                    args: {
                        attrs: {
                            fill: '#fff',
                            stroke: '#31d0c6',
                            strokeWidth: 4,
                        },
                    },
                    },
                    // 连线过程中，链接桩可以被链接时被使用
                    // magnetAvailable: { // 高亮
                    //     name: 'stroke',
                    //     args: {
                    //     attrs: {
                    //         fill: '#fff',
                    //         stroke: '#47C769',
                    //     },
                    //     },
                    // },
                },
                connecting: {
                    snap: true,
                    allowBlank: false,
                    allowLoop: false,
                    highlight: true,
                    connector: 'algo-connector',
                    connectionPoint: 'anchor',
                    anchor: 'center',
                    validateMagnet({ magnet }) {
                        return magnet.getAttribute('port-group') !== 'top'
                    },
                    createEdge() {
                        return graph.value.createEdge({
                            shape: 'dag-edge',
                            attrs: {
                                line: {
                                    strokeDasharray: '5 5',
                                },
                            },
                            zIndex: -1,
                        })
                    },
                },
                selecting: {
                    enabled: true,
                    multiple: true,
                    rubberEdge: true,
                    rubberNode: true,
                    modifiers: 'shift',
                    rubberband: true,
                },
            })
            graph.value.centerContent();//将画布内容中心与视口中心对齐
            // 创建元素和边
            // const rect = new Shape.Rect({
            //     x: 100,
            //     y: 200,
            //     width: 80,
            //     height: 40,
            //     // angle: 90,//旋转节点角度
            //     attrs: {//定制样式
            //         body: {
            //             fill: 'blue',//背景颜色
            //             stroke: '#000',  // 边框颜色
            //         },
            //         label: {
            //             text: 'rect',    // 文本
            //             fill: '#fff',    // 文字颜色
            //             fontSize: 13,    // 文字大小
            //         },
            //     },
            // })
            // graph.addNode(rect)
            // 初始化节点/边
            const init = (data: Cell.Metadata[]) => {
                const cells: Cell[] = []
                data.forEach((item) => {
                    if (item.shape === 'dag-node') {
                         cells.push(graph.value.createNode(item));
                     }else {
                         cells.push(graph.value.createEdge(item));
                    }
                })
                graph.value.resetCells(cells)
            }
            // 显示节点状态
            const showNodeStatus = async (statusList: NodeStatus[][]) => {
                const status = statusList.shift()
                status?.forEach((item) => {
                    const { id, status } = item
                    const node = graph.value.getCellById(id)
                    const edges = graph.value.getIncomingEdges(node)
                    edges?.forEach((edge:Edge) => {
                        edge.attr({
                            line: {
                                sourceMarker: {
                                    tagName: 'path',
                                },
                            },
                        })
                            //动线
                            edge.attr('line/strokeDasharray', 5)
                            edge.attr('line/style/animation', 'running-line 30s infinite linear')
                    })
                    const data = node.getData() as NodeStatus
                    node.setData({
                        ...data,
                        status: status
                    })
                })
                setTimeout(() => {
                    showNodeStatus(statusList)
                }, 3000)
            }
            init(test);
            // showNodeStatus(nodeStatusList)
            // graph.centerContent()

            graph.value.on('cell:mouseenter', (args: { cell:any }) => {
                // if (args.cell.isNode()) {
                // args.cell.addTools([
                //     {
                //     name: 'boundary',
                //     args: {
                //         attrs: {
                //         fill: '#7c68fc',
                //         stroke: '#333',
                //         'stroke-width': 1,
                //         'fill-opacity': 0.2,
                //         },
                //     },
                //     },
                //     {
                //     name: 'button-remove',
                //     args: {
                //         x: 0,
                //         y: 0,
                //         offset: { x: 10, y: 10 },
                //     },
                //     },
                // ])
                // } else {
                // args.cell.addTools([
                //     { name: 'vertices' },
                //     {
                //     name: 'button-remove',
                //     args: { distance: 20  },
                //     }])
                // }
            })
            graph.value.on('cell:mouseleave', (args: { cell:any }) => {
                // args.cell.removeTools()
            })
            
            
        })
        onUnmounted(() => {
            graph.value.dispose() // 销毁画布
        })
        return {
            data
        }
    }
  });
  </script>
  <style lang="less" scoped>
  .animationX6 {
    text-align: left;
    height: 100%;
    border: 1px solid #eee;
    border-radius: 4px;
    #container {
        width: 100%;
        height: 100%;
    }
  }
  </style>
  