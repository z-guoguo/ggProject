<template>
  <div class="antv">
    <div id="containers"></div>
  </div>
</template>
<script>
import { defineComponent, onMounted } from "vue";
import G6 from "@antv/g6";
export default defineComponent({
  name: "antV",
  setup() {
    onMounted(() => {
      /**
       * 该案例演示切换交互模式，在不同模式下实现拖动节点、增加节点、增加边的交互行为。
       */
      // let addedCount = 0;
      // // Register a custom behavior: add a node when user click the blank part of canvas
      // G6.registerBehavior('click-add-node', {
      //     // Set the events and the corresponding responsing function for this behavior
      //     getEvents() {
      //         // The event is canvas:click, the responsing function is onClick
      //         return {
      //         'canvas:click': 'onClick',
      //         };
      //     },
      //     // Click event
      //     onClick(ev) {
      //         const self = this;
      //         const graph = self.graph;
      //         // Add a new node
      //         graph.addItem('node', {
      //         x: ev.canvasX,
      //         y: ev.canvasY,
      //         id: `node-${addedCount}`, // Generate the unique id
      //         });
      //         addedCount++;
      //     },
      // });
      // // Register a custom behavior: click two end nodes to add an edge
      // G6.registerBehavior('click-add-edge', {
      //     // Set the events and the corresponding responsing function for this behavior
      //     getEvents() {
      //         return {
      //         'node:click': 'onClick', // The event is canvas:click, the responsing function is onClick
      //         mousemove: 'onMousemove', // The event is mousemove, the responsing function is onMousemove
      //         'edge:click': 'onEdgeClick', // The event is edge:click, the responsing function is onEdgeClick
      //         };
      //     },
      //     // The responsing function for node:click defined in getEvents
      //     onClick(ev) {
      //         // console.log(1111)
      //         // console.log(this)
      //         const self = this;
      //         const node = ev.item;
      //         const graph = self.graph;
      //         // The position where the mouse clicks
      //         const point = { x: ev.x, y: ev.y };
      //         const model = node.getModel();
      //         if (self.addingEdge && self.edge) {
      //         graph.updateItem(self.edge, {
      //             target: model.id,
      //         });

      //         self.edge = null;
      //         self.addingEdge = false;
      //         } else {
      //         // Add anew edge, the end node is the current node user clicks
      //         self.edge = graph.addItem('edge', {
      //             source: model.id,
      //             target: model.id,
      //         });
      //         self.addingEdge = true;
      //         }
      //     },
      //     // The responsing function for mousemove defined in getEvents
      //     onMousemove(ev) {
      //         const self = this;
      //         // The current position the mouse clicks
      //         const point = { x: ev.x, y: ev.y };
      //         if (self.addingEdge && self.edge) {
      //         // Update the end node to the current node the mouse clicks
      //         self.graph.updateItem(self.edge, {
      //             target: point,
      //         });
      //         }
      //     },
      //     // The responsing function for edge:click defined in getEvents
      //     onEdgeClick(ev) {
      //         const self = this;
      //         const currentEdge = ev.item;
      //         if (self.addingEdge && self.edge === currentEdge) {
      //         self.graph.removeItem(self.edge);
      //         self.edge = null;
      //         self.addingEdge = false;
      //         }
      //     },
      // });
      // // Initial data
      // const data = {
      //     nodes: [
      //         {
      //         id: 'node1',
      //         x: 100,
      //         y: 200,
      //         },
      //         {
      //         id: 'node2',
      //         x: 300,
      //         y: 200,
      //         },
      //         {
      //         id: 'node3',
      //         x: 300,
      //         y: 300,
      //         },
      //     ],
      //     edges: [
      //         {
      //         id: 'edge1',
      //         target: 'node2',
      //         source: 'node1',
      //         },
      //     ],
      // };

      // const container = document.getElementById('container');
      // // Add a layout 及子元素
      // const layoutBox = document.createElement('div');
      // layoutBox.id = 'layoutBox';
      // const layoutLeft = document.createElement('div');
      // layoutLeft.id = 'layoutLeft';
      // const layoutRight = document.createElement('div');
      // layoutRight.id = 'layoutRight';
      // // 设置layout样式
      // layoutBox.style = "height:100%;display:flex"
      // layoutLeft.style = "width: 300px;height:100%;border:1px solid #ddd;border-radius:6px;padding:20px";
      // layoutRight.style = "flex:1;height:100%;border:1px solid #ddd;border-radius:6px;margin-left:10px";
      // // 添加左侧元素
      // const node = document.createElement('div');
      // node.value = 'addNode'
      // node.id = 'nodeId';
      // node.style = 'width: 100px;height: 50px;margin: 0 auto;border:1px solid #ddd;border-radius:4px;cursor:pointer'
      // // 添加样式元素到container
      // layoutBox.appendChild(layoutLeft);
      // layoutBox.appendChild(layoutRight);
      // // container.appendChild(layoutBox);
      // // 添加子元素到左侧
      // layoutLeft.appendChild(node);
      // // Add a selector to DOM
      // const selector = document.createElement('select');
      // selector.id = 'selector';
      // selector.style.border = 'none';
      // const selection1 = document.createElement('option');
      // selection1.value = 'default';
      // selection1.innerHTML = 'Default Mode';
      // const selection2 = document.createElement('option');
      // selection2.value = 'addNode';
      // selection2.innerHTML = 'Add Node (By clicking canvas)';
      // const selection3 = document.createElement('option');
      // selection3.value = 'addEdge';
      // selection3.innerHTML = 'Add Edge (By clicking two end nodes)';
      // selector.appendChild(selection1);
      // selector.appendChild(selection2);
      // selector.appendChild(selection3);
      // container.appendChild(selector);

      // const width = container.scrollWidth;
      // const height = (container.scrollHeight || 500) - 30;
      // const graph = new G6.Graph({
      // container: 'container',
      // width,
      // height,
      // // The sets of behavior modes
      // modes: {
      //     // Defualt mode
      //     default: ['drag-node', 'click-select'],
      //     // Adding node mode
      //     addNode: ['click-add-node', 'click-select'],
      //     // Adding edge mode
      //     addEdge: ['click-add-edge', 'click-select'],
      // },
      // // The node styles in different states
      // nodeStateStyles: {
      //     // The node styles in selected state
      //     selected: {
      //         stroke: '#666',
      //         lineWidth: 2,
      //         fill: 'steelblue',
      //     },
      // },
      // });
      // graph.data(data);
      // graph.render();

      // // Listen to the selector, change the mode when the selector is changed
      // selector.addEventListener('change', (e) => {
      //     const value = e.target.value;
      //     // change the behavior mode
      //     graph.setMode(value);
      // });
      // // 左侧长方形node元素点击事件
      // node.addEventListener('click', (e) => {
      //     console.log(e.target.value)
      //     const value = e.target.value;
      //     // change the behavior mode
      //     graph.setMode(value);
      // });

      // if (typeof window !== 'undefined')
      // window.onresize = () => {
      //     if (!graph || graph.get('destroyed')) return;
      //     if (!container || !container.scrollWidth || !container.scrollHeight) return;
      //     graph.changeSize(container.scrollWidth, container.scrollHeight - 30);
      // };
      // ---------------------------------------------------------------------------------------
      // G6.Util.processParallelEdges processes the edges with same source node and target node,
      // on this basis, processParallelEdgesOnAnchorPoint consider the end nodes and anchor points in the same time.
    //   边设置
      const processParallelEdgesOnAnchorPoint = (
        edges,
        offsetDiff = 15,
        multiEdgeType = "quadratic",
        singleEdgeType = undefined,
        loopEdgeType = undefined
      ) => {
        const len = edges.length;
        const cod = offsetDiff * 2;
        const loopPosition = [
          "top",
          "top-right",
          "right",
          "bottom-right",
          "bottom",
          "bottom-left",
          "left",
          "top-left",
          "center"
        ];
        const edgeMap = {};
        const tags = [];
        const reverses = {};
        for (let i = 0; i < len; i++) {
          const edge = edges[i];
          const { source, target, sourceAnchor, targetAnchor } = edge;
          const sourceTarget = `${source}|${sourceAnchor}-${target}|${targetAnchor}`;

          if (tags[i]) continue;
          if (!edgeMap[sourceTarget]) {
            edgeMap[sourceTarget] = [];
          }
          tags[i] = true;
          edgeMap[sourceTarget].push(edge);
          for (let j = 0; j < len; j++) {
            if (i === j) continue;
            const sedge = edges[j];
            const {
              source: src,
              target: dst,
              sourceAnchor: srcAnchor,
              targetAnchor: dstAnchor,
            } = sedge;

            // 两个节点之间共同的边
            // 第一条的source = 第二条的target
            // 第一条的target = 第二条的source
            if (!tags[j]) {
              if (
                source === dst &&
                sourceAnchor === dstAnchor &&
                target === src &&
                targetAnchor === srcAnchor
              ) {
                edgeMap[sourceTarget].push(sedge);
                tags[j] = true;
                reverses[
                  `${src}|${srcAnchor}|${dst}|${dstAnchor}|${
                    edgeMap[sourceTarget].length - 1
                  }`
                ] = true;
              } else if (
                source === src &&
                sourceAnchor === srcAnchor &&
                target === dst &&
                targetAnchor === dstAnchor
              ) {
                edgeMap[sourceTarget].push(sedge);
                tags[j] = true;
              }
            }
          }
        }

        for (const key in edgeMap) {
          const arcEdges = edgeMap[key];
          const { length } = arcEdges;
          for (let k = 0; k < length; k++) {
            const current = arcEdges[k];
            if (current.source === current.target) {
              if (loopEdgeType) current.type = loopEdgeType;
              // 超过8条自环边，则需要重新处理
              current.loopCfg = {
                position: loopPosition[k % 8],
                dist: Math.floor(k / 8) * 20 + 50,
              };
              continue;
            }
            if (
              length === 1 &&
              singleEdgeType &&
              (current.source !== current.target ||
                current.sourceAnchor !== current.targetAnchor)
            ) {
              current.type = singleEdgeType;
              continue;
            }
            current.type = multiEdgeType;
            const sign =
              (k % 2 === 0 ? 1 : -1) *
              (reverses[
                `${current.source}|${current.sourceAnchor}|${current.target}|${current.targetAnchor}|${k}`
              ]
                ? -1
                : 1);
            if (length % 2 === 1) {
              current.curveOffset = sign * Math.ceil(k / 2) * cod;
            } else {
              current.curveOffset =
                sign * (Math.floor(k / 2) * cod + offsetDiff);
            }
          }
        }
        return edges;
      };

      const data = {
        // 节点数据
        nodes: [
          { id: "node1", x: 350, y: 100,label: 'A' },
          { id: "node2", x: 350, y: 250,label: 'B' }
        ]
      };
      // 新增节点按钮
      const descriptionDiv = document.createElement("div");
      const container = document.getElementById("containers");
      descriptionDiv.innerText = "新增节点";
      descriptionDiv.style =
        "width: 80px;height:34px;line-height:34px;text-align:center;border:1px solid #5ab4be;border-radius:4px;background:#5ab4be;color:#fff;cursor:pointer;margin:0 auto";
      container.appendChild(descriptionDiv);

      // custom a node with anchor-point shapes
      G6.registerNode(
        "rect-node",
        {
          // draw anchor-point circles according to the anchorPoints in afterDraw
          afterDraw(cfg, group) {
            const bbox = group.getBBox();
            const anchorPoints = this.getAnchorPoints(cfg);//设置锚点
            anchorPoints.forEach((anchorPos, i) => {
              group.addShape("circle", {
                attrs: {
                  r: 5,
                  x: bbox.x + bbox.width * anchorPos[0],
                  y: bbox.y + bbox.height * anchorPos[1],
                  fill: "#fff",
                  stroke: "#5ab4be",
                },
                name: `anchor-point`, // the name, for searching by group.find(ele => ele.get('name') === 'anchor-point')
                anchorPointIdx: i, // flag the idx of the anchor-point circle
                links: 0, // cache the number of edges connected to this shape
                visible: false, // invisible by default, shows up when links > 1 or the node is in showAnchors state
              });
            });
          },
          getAnchorPoints(cfg) {
            return (
              cfg.anchorPoints || [
                // [0, 0.5],
                // [0.33, 0],
                // [0.66, 0],
                // [1, 0.5],
                // [0.33, 1],
                // [0.66, 1],
              ]
            );
          },
          // response the state changes and show/hide the link-point circles
          setState(name, value, item) {
            if (name === "showAnchors") {
              const anchorPoints = item
                .getContainer()
                .findAll((ele) => ele.get("name") === "anchor-point");
              anchorPoints.forEach((point) => {
                if (value || point.get("links") > 0) point.show();
                else point.hide();
              });
            }
          },
        },
        "rect"
      );

      let sourceAnchorIdx, targetAnchorIdx;

      const width = container.scrollWidth;
      const height = (container.scrollHeight || 500) - 120;
    //   let beginDom;
      const graph = new G6.Graph({
        container: "containers",
        width,
        height,
        modes: {
          default: [
            "drag-node",
            // config the shouldBegin and shouldEnd to make sure the create-edge is began and ended at anchor-point circles
            {
              type: "create-edge",
            //   点击开始链接
              shouldBegin: (e) => {
                console.log('begin',e)
                // beginDom = e.target;
                const edges = graph.save().edges;
                if(edges.length!=0) return false
                // 避免从节点上的其他形状开始----只点击锚点触发，非锚点终止
                // if (e.target && e.target.get("name") !== "anchor-point")
                //   return false;
                sourceAnchorIdx = e.target.get("anchorPointIdx");
                e.target.set("links", e.target.get("links") + 1); // cache the number of edge connected to this anchor-point circle
                return true;
              },
            //   点击结束链接----只点击锚点触发，非锚点终止
              shouldEnd: (e) => {
                console.log('end',e.target)
                const edges = graph.save().edges;
                // if(edges.length!=0) return false
                edges.push({
                    source: 'node1',
                    target: 'node2',
                    label: 'default arrow',
                    style: {
                        endArrow: true,
                    },
                });
                processParallelEdgesOnAnchorPoint(edges);
                //避免在节点上的其他形状处结束
                // if (e.target && e.target.get("name") !== "anchor-point")
                //   return false;
                if (e.target) {
                  targetAnchorIdx = e.target.get("anchorPointIdx");
                  e.target.set("links", e.target.get("links") + 1); // cache the number of edge connected to this anchor-point circle
                  return true;
                }
                targetAnchorIdx = undefined;
                return true;
              },
              // update the sourceAnchor
              // getEdgeConfig: () => {
              //   return {
              //     sourceAnchor: sourceAnchorIdx
              //   }
              // }
            },
          ],
        },
        defaultNode: {
          type: "rect-node",
          style: {
            fill: "#eee",
            stroke: "#ccc",
          },
        },
        defaultEdge: {
          type: "quadratic",
          style: {
            stroke: "#F6BD16",
            lineWidth: 2,
          },
        },
      });

      graph.data(data);
      graph.render();
      // 新增节点按钮事件----新增事件
      descriptionDiv.addEventListener("click", (e) => {
          data.nodes.push({ 
              id: "node" + data.nodes.length+1,
            x: data.nodes[data.nodes.length - 1].x,
            y:  data.nodes[data.nodes.length - 1].y + 50
        });
        // 重新绘制
        graph.data(data);
        graph.render();
      });
      //链接完成事件
      graph.on("aftercreateedge", (e) => {
        // update the sourceAnchor and targetAnchor for the newly added edge
        graph.updateItem(e.edge, {
          sourceAnchor: sourceAnchorIdx,
          targetAnchor: targetAnchorIdx,
        });

        // 更新平行边的curveOffset
        //设置边(不重叠)
        const edges = graph.save().edges;
        processParallelEdgesOnAnchorPoint(edges);
        graph.getEdges().forEach((edge, i) => {
          graph.updateItem(edge, {
            curveOffset: edges[i].curveOffset,
            curvePosition: edges[i].curvePosition,
          });
        });
      });

      // 如果创建边缘在结束前被取消，更新锚点圆圈上的“链接”
      graph.on("afterremoveitem", (e) => {
        if (e.item && e.item.source && e.item.target) {
          const sourceNode = graph.findById(e.item.source);
          const targetNode = graph.findById(e.item.target);
          const { sourceAnchor, targetAnchor } = e.item;
          if (sourceNode && !isNaN(sourceAnchor)) {
            const sourceAnchorShape = sourceNode
              .getContainer()
              .find(
                (ele) =>
                  ele.get("name") === "anchor-point" &&
                  ele.get("anchorPointIdx") === sourceAnchor
              );
            sourceAnchorShape.set("links", sourceAnchorShape.get("links") - 1);
          }
          if (targetNode && !isNaN(targetAnchor)) {
            const targetAnchorShape = targetNode
              .getContainer()
              .find(
                (ele) =>
                  ele.get("name") === "anchor-point" &&
                  ele.get("anchorPointIdx") === targetAnchor
              );
            targetAnchorShape.set("links", targetAnchorShape.get("links") - 1);
          }
        }
      });

      // 单击第一个节点后，创建边缘，更新 sourceAnchor(点击第一个⭕️锚点即触发)
      graph.on("afteradditem", (e) => {
        if (e.item && e.item.getType() === "edge") {
          graph.updateItem(e.item, {
            sourceAnchor: sourceAnchorIdx,
          });
        }
      });

      // 一些监听器来控制节点的状态以显示和隐藏锚点圆---鼠标进入节点事件
      graph.on("node:mouseenter", (e) => {
        graph.setItemState(e.item, "showAnchors", true);
      });
    //   鼠标离开事件-隐藏锚点
      graph.on("node:mouseleave", (e) => {
        graph.setItemState(e.item, "showAnchors", false);
      });

      if (typeof window !== "undefined")
        window.onresize = () => {
          if (!graph || graph.get("destroyed")) return;
          if (!container || !container.scrollWidth || !container.scrollHeight)
            return;
          graph.changeSize(container.scrollWidth, container.scrollHeight - 20);
        };
    });
  },
});
</script>
<style lang="less" scoped>
.antv {
  height: 100%;
  // border: 1px solid #ddd;
  border-radius: 6px;
  #containers {
    height: 100%;
  }
}
</style>
