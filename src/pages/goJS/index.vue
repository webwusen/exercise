<template>
  <div id="myDiagramDiv"></div>
</template>

<script>
  import { defineComponent, onMounted, nextTick, ref } from 'vue'
  import go from 'gojs'
  export default defineComponent({
    setup() {
      const data = ref({
        myDiagram: ''
      })
      onMounted(() => {
        nextTick(() => {
          init()
        })
      })
      const open_nodewin = (e, node) => {
        console.log(node)
      }
      const openToggle = (e, data) => {
        //隐藏展开操作
        //   console.log(e, data);
        let definceKey = data.definceKey
        let node = this.myDiagram.model.findNodeDataForKey(definceKey)
        let status = node.onShowFlag
        //   console.log(node);
        //   let status=this.
        this.myDiagram.model.setDataProperty(node, 'onShowFlag', !status)
      }
      const init = () => {
        document.addEventListener('contextmenu', function () {
          return false
        })
        if (window.goSamples) goSamples() // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make // for conciseness in defining templates
        data.myDiagram = $(
          go.Diagram,
          'myDiagramDiv', // must name or refer to the DIV HTML element
          {
            layout: $(
              //树形图布局
              go.TreeLayout, // specify a Diagram.layout that arranges trees
              { angle: 90, layerSpacing: 40 }
            ),
            initialContentAlignment: go.Spot.Center, // // 获取或设置此图的初始内容的对齐点，用于确定部件相对于视口的初步定位。
            allowDrop: true, // must be true to accept drops from the Palette // 获取或设置用户是否可以在该图中结束拖放操作。当将图表与调色板一起使用时，通常设置为true。初始值是假的。
            // LinkDrawn: this.onLinkDrawn,
            // PartCreated: this.onPartCreated,
            // LinkRelinked: this.showLinkLabel,
            //"click" : closeEastPanel,
            // mouseDrop: this.onDiagramMouseDrap,
            'animationManager.isEnabled': false, // // 默认值是真的。设置为false不会停止动画，它只会阻止未来动画。停止正在进行的任何动画，使用stopanimation。设置此属性不会引发任何事件.。
            // slightly longer than default (600ms) animation
            'undoManager.isEnabled': true, // enable undo & redo  获取或设置是否undomanager记录任何变化。默认值为false，如果希望用户能够撤消或重做，则需要将该值设置为true。
            // ChangedSelection: this.onSelectionChanged,
            allowDelete: false, // 获取或设置用户是否可以从图表中删除对象.。初始值是真的。
            isReadOnly: true
          }
        )
        go.Shape.defineFigureGenerator('RoundedTopRectangle', function (shape, w, h) {
          // this figure takes one parameter, the size of the corner
          var p1 = 5 // default corner size
          if (shape !== null) {
            var param1 = shape.parameter1
            if (!isNaN(param1) && param1 >= 0) p1 = param1 // can't be negative or NaN
          }
          p1 = Math.min(p1, w / 2)
          p1 = Math.min(p1, h / 2) // limit by whole height or by half height?
          var geo = new go.Geometry()
          // a single figure consisting of straight lines and quarter-circle arcs
          geo.add(
            new go.PathFigure(0, p1)
              .add(new go.PathSegment(go.PathSegment.Arc, 180, 90, p1, p1, p1, p1))
              .add(new go.PathSegment(go.PathSegment.Line, w - p1, 0))
              .add(new go.PathSegment(go.PathSegment.Arc, 270, 90, w - p1, p1, p1, p1))
              .add(new go.PathSegment(go.PathSegment.Line, w, h))
              .add(new go.PathSegment(go.PathSegment.Line, 0, h).close())
          )
          // don't intersect with two top corners when used in an "Auto" Panel
          geo.spot1 = new go.Spot(0, 0, 0.3 * p1, 0.3 * p1)
          geo.spot2 = new go.Spot(1, 1, -0.3 * p1, 0)
          return geo
        })

        go.Shape.defineFigureGenerator('RoundedBottomRectangle', function (shape, w, h) {
          // this figure takes one parameter, the size of the corner
          var p1 = 5 // default corner size
          if (shape !== null) {
            var param1 = shape.parameter1
            if (!isNaN(param1) && param1 >= 0) p1 = param1 // can't be negative or NaN
          }
          p1 = Math.min(p1, w / 2)
          p1 = Math.min(p1, h / 2) // limit by whole height or by half height?
          var geo = new go.Geometry()
          // a single figure consisting of straight lines and quarter-circle arcs
          geo.add(
            new go.PathFigure(0, 0)
              .add(new go.PathSegment(go.PathSegment.Line, w, 0))
              .add(new go.PathSegment(go.PathSegment.Line, w, h - p1))
              .add(new go.PathSegment(go.PathSegment.Arc, 0, 90, w - p1, h - p1, p1, p1))
              .add(new go.PathSegment(go.PathSegment.Line, p1, h))
              .add(new go.PathSegment(go.PathSegment.Arc, 90, 90, p1, h - p1, p1, p1).close())
          )
          // don't intersect with two bottom corners when used in an "Auto" Panel
          geo.spot1 = new go.Spot(0, 0, 0.3 * p1, 0)
          geo.spot2 = new go.Spot(1, 1, -0.3 * p1, -0.3 * p1)
          return geo
        })
        data.myDiagram.linkTemplate = $(
          go.Link, // the whole link panel
          {
            routing: go.Link.Orthogonal,
            curve: go.Link.JumpOver,
            corner: 5,
            toShortLength: 4,
            relinkableFrom: true,
            relinkableTo: true,
            reshapable: true,
            resegmentable: true,
            // mouse-overs subtly highlight links:
            mouseEnter: function (e, link) {
              link.findObject('HIGHLIGHT').stroke = 'rgba(30,144,255,0.2)'
            },
            mouseLeave: function (e, link) {
              link.findObject('HIGHLIGHT').stroke = 'transparent'
            },
            selectionAdorned: false
          },
          new go.Binding('points').makeTwoWay(),
          $(
            go.Shape, // the highlight shape, normally transparent
            {
              isPanelMain: true,
              strokeWidth: 8,
              stroke: 'transparent',
              name: 'HIGHLIGHT'
            }
          ),
          $(
            go.Shape, // the link path shape 线条
            {
              isPanelMain: true,
              stroke: 'gray',
              strokeWidth: 2
            },
            new go.Binding('stroke', 'isSelected', function (sel) {
              return sel ? 'dodgerblue' : 'dodgerblue' //gray  //线条颜色
            }).ofObject()
          ),
          $(
            go.Shape, // the arrowhead  箭头
            {
              toArrow: 'standard',
              strokeWidth: 1, // 大小
              stroke: 'dodgerblue',
              fill: 'dodgerblue' // 颜色
            }
          ),
          $(
            go.Panel,
            'Auto', // the link label, normally not visible
            {
              visible: false,
              name: 'LABEL',
              segmentIndex: 2,
              segmentFraction: 0.5
            },
            new go.Binding('visible', 'visible').makeTwoWay(),
            $(
              go.Shape,
              'RoundedRectangle', // the label shape
              {
                fill: '#F8F8F8',
                strokeWidth: 0
              }
            ),
            $(
              go.TextBlock,
              'Yes', // the label
              {
                textAlign: 'center',
                font: '10pt helvetica, arial, sans-serif',
                stroke: '#333333',
                editable: true
              },
              new go.Binding('text').makeTwoWay()
            )
          )
        )

        data.myDiagram.nodeTemplateMap.add(
          'start',
          $(
            go.Node,
            'Vertical',
            {
              // stroke: "transparent",
              selectionAdorned: false //显示选择框
            },
            $(
              go.Panel,
              'Auto',
              {
                desiredSize: new go.Size(454, 30)
              },
              $(go.Shape, 'RoundedRectangle', {
                fill: '#000',
                figure: 'RoundedTopRectangle',
                parameter1: 2,
                stroke: '#000',
                strokeWidth: 1
              }),
              $(go.TextBlock, {
                text: '开始进入设计',
                height: 30,
                //   position: new go.Point(10, 0),
                margin: new go.Margin(0, 0, 0, 10),
                stroke: '#fff',
                maxLines: 1.5,
                verticalAlignment: go.Spot.Center,
                alignment: go.Spot.Left
              })
            ),
            $(
              go.Panel,
              'Auto',
              {
                margin: new go.Margin(0, 0, 0, 0)
                //   background: "#000",
                //   height: 30,
                //   minSize: new go.Size(440, 30),
              },
              $(go.Shape, 'RoundedRectangle', {
                fill: '#e2cbcb',
                stroke: '#e2cbcb',
                strokeWidth: 1,
                parameter1: 3
                //   figure: "RoundedBottomRectangle",
              }),
              $(
                go.Panel,
                'Horizontal',
                new go.Binding('height', function (e) {
                  return e.onShowFlag ? NaN : 0
                }),
                {
                  //   minSize: new go.Size(200, 30),
                  //   height: "auto",
                  background: '#e2cbcb',
                  padding: 5,
                  itemTemplate: $(
                    go.Panel,
                    'Position',
                    {
                      background: '#fff',
                      defaultAlignment: go.Spot.Left,
                      margin: 5,
                      padding: 10,
                      width: 210,
                      height: 80
                      //   click: this.open_nodewin,
                    },
                    [
                      $(
                        go.Panel,
                        'Horizontal',
                        {
                          defaultAlignment: go.Spot.Center
                        },
                        [
                          $(go.Picture, {
                            source: '/icon1.jpg',
                            margin: new go.Margin(0, 0, 3, 0),
                            // click: this.open_nodewin,
                            desiredSize: new go.Size(11, 12)
                          }),
                          $(go.TextBlock, new go.Binding('text', 'title'), {
                            margin: new go.Margin(0, 0, 0, 10),
                            verticalAlignment: go.Spot.Center,
                            font: 'bold 12px none'
                          })
                        ]
                      ),
                      $(go.TextBlock, {
                        text: '名单来源:标签圈选客群',
                        position: new go.Point(0, 20)
                      }),
                      $(go.TextBlock, {
                        text: '开始时间:2021-07-17 09:00',
                        position: new go.Point(0, 40)
                      })
                    ]
                  )
                },
                [new go.Binding('itemArray', 'items')]
              )
            ),

            $(
              go.Picture,
              {
                source: '/add.jpg',
                margin: new go.Margin(-12, 0, 0, 0)
                // click: this.open_nodewin,
                // desiredSize: new go.Size(25, 25)
              },
              [
                new go.Binding('desiredSize', 'addSatus', function (e) {
                  let size = e ? new go.Size(25, 25) : new go.Size()
                  return size
                })
              ]
            )
          )
        )
        // 多策略画布图
        data.myDiagram.nodeTemplateMap.add(
          'end1',
          $(
            go.Node,
            'Vertical',
            {
              // isShadowed: true,
              // shadowOffset: new go.Point(-10, -1),
              // shadowRoot: 10,
              // shadowColor: "#fff",
              selectionAdorned: false //显示选择框
            },
            $(
              go.Panel,
              'Auto',
              {
                width: 550
              },
              [
                $(go.Shape, 'RoundedRectangle', {
                  fill: '#fff',
                  stroke: '#fff',
                  strokeWidth: 2
                }),
                $(go.TextBlock, '策略一', {
                  height: 60,
                  //   margin: new go.Margin(-60, 0, 0, 0),
                  alignment: go.Spot.Top,
                  verticalAlignment: go.Spot.Center
                }),
                $(
                  go.Picture,
                  {
                    source: '/toggle.jpg',
                    //   margin: new go.Margin(0, 0, 3, 0),
                    // click: this.open_nodewin,
                    margin: new go.Margin(15, 10, 0, 0),
                    desiredSize: new go.Size(25, 25),
                    alignment: go.Spot.TopRight,
                    click: openToggle
                    // flip: go.GraphObject.FlipBoth,
                  },
                  [
                    new go.Binding('flip', 'onShowFlag', (e) => {
                      // console.log(e);
                      return e ? go.GraphObject.None : go.GraphObject.FlipBoth
                    }),
                    new go.Binding('definceKey', 'key')
                  ]
                )
              ],
              $(
                go.Panel,
                'Table',
                new go.Binding('height', 'onShowFlag', (e) => {
                  return e ? NaN : 0
                }),
                {
                  margin: new go.Margin(50, 0, 10, 0),
                  //   background: "#fff",
                  //   minSize: new go.Size(500, 0),
                  width: 530,
                  // padding: 10,
                  //   height: 0
                  defaultAlignment: go.Spot.Center,
                  itemTemplate: $(
                    go.Panel,
                    'Auto',
                    [
                      new go.Binding('row', (e) => {
                        // let arr = [1, 1, 2, 2, 3];
                        // return arr[e - 1];
                        return Math.ceil(Number(e) / 2)
                      }),
                      new go.Binding('column', (e) => {
                        // let arr = [0, 1, 0, 1, 0];
                        let status = e % 2 === 0
                        // return arr[e - 1];
                        return status ? 1 : 0
                      })
                    ],
                    {
                      //   desiredSize: new go.Size(250, 70),
                      margin: new go.Margin(10, 0, 0, 0)
                      //   background: "skyblue",
                    },
                    $(go.Shape, 'RoundedRectangle', {
                      fill: '#f3faef',
                      stroke: '#fff',
                      //   desiredSize: new go.Size(250, 70),
                      strokeWidth: 2
                    }),
                    $(
                      go.Panel,
                      'Vertical',
                      {
                        desiredSize: new go.Size(250, 70),
                        padding: 15,
                        defaultAlignment: go.Spot.Left
                      },
                      $(
                        go.Panel,
                        'Horizontal',
                        {
                          defaultAlignment: go.Spot.Center
                        },
                        [
                          $(go.Picture, {
                            source: '/icon1.jpg',
                            margin: new go.Margin(0, 0, 3, 0),
                            // click: this.open_nodewin,
                            desiredSize: new go.Size(11, 12)
                          }),
                          $(go.TextBlock, '产品配置', {
                            margin: new go.Margin(0, 0, 0, 10)
                          })
                        ]
                      ),
                      $(go.TextBlock, [new go.Binding('text', '')], {
                        margin: new go.Margin(10, 0, 0, 0)
                        // alignment: go.Spot.Center,
                      })
                    )
                  )
                },
                new go.Binding('itemArray', 'itemList')
              )
            ),
            $(
              go.Picture,
              {
                source: '/add.jpg',
                alignment: go.Spot.Bottom,
                margin: new go.Margin(-10, 0, 0, 0)
                // click: this.open_nodewin,
                // desiredSize: new go.Size(25, 25)
              },
              [
                new go.Binding('desiredSize', 'addSatus', function (e) {
                  let size = e ? new go.Size(25, 25) : new go.Size()
                  return size
                })
              ]
            )
          )
        )
        //   名单配置
        data.myDiagram.nodeTemplateMap.add(
          'list',
          $(
            go.Node,
            'Auto',
            $(go.Shape, 'RoundedRectangle', {
              fill: '#e08c94',
              //   figure: "RoundedTopRectangle",
              parameter1: 2,
              stroke: '#e08c94',
              desiredSize: new go.Size(250, 75),
              strokeWidth: 1
            }),
            $(
              go.Panel,
              'Vertical',
              {
                padding: 15,
                defaultAlignment: go.Spot.Left,
                desiredSize: new go.Size(250, 70)
              },
              [
                $(
                  go.Panel,
                  'Horizontal',
                  {
                    desiredSize: new go.Size(250, 30),
                    //   alignment: go.Spot.Center,
                    margin: new go.Margin(-6, 0, 0, 0)
                  },
                  [
                    $(go.Picture, {
                      source: '/list.jpg',
                      margin: new go.Margin(0, 0, 2, 0),
                      // click: this.open_nodewin,
                      desiredSize: new go.Size(18, 18)
                    }),
                    $(go.TextBlock, '达标名单', {
                      height: 30,
                      verticalAlignment: go.Spot.Center,
                      margin: new go.Margin(0, 0, 0, 10),
                      stroke: '#fff'
                    })
                  ]
                ),
                $(go.TextBlock, '达标人数:20000', {
                  desiredSize: new go.Size(250, 30),
                  margin: new go.Margin(4, 0, 0, 0),
                  stroke: '#fff'
                })
              ]
            )
          )
        )
        data.myDiagram.nodeTemplateMap.add(
          'collection',
          $(
            go.Node,
            'Auto',
            { selectionAdorned: false },
            $(go.Shape, 'RoundedRectangle', {
              fill: '#fff',
              //   figure: "RoundedTopRectangle",
              parameter1: 2,
              stroke: '#fff',
              // desiredSize: new go.Size(250, 75),
              strokeWidth: 1
            }),
            $(go.Panel, 'Vertical', [new go.Binding('itemArray', 'items')], {
              padding: 15,
              // defaultAlignment: go.Spot.Left,
              itemTemplate: $(
                go.Panel,
                'Vertical',
                {
                  margin: new go.Margin(20, 0, 0, 0)
                  // isShadowed: true,
                  // shadowOffset: new go.Point(-10, -1),
                  // shadowRoot: 10,
                  // shadowColor: "#fff",
                  // selectionAdorned: false, //显示选择框
                },
                $(
                  go.Panel,
                  'Auto',
                  {
                    width: 550
                  },
                  [
                    $(go.Shape, 'RoundedRectangle', {
                      fill: '#fff',
                      stroke: '#eee',
                      strokeWidth: 2
                    }),
                    $(go.TextBlock, '策略一', {
                      height: 60,
                      //   margin: new go.Margin(-60, 0, 0, 0),
                      alignment: go.Spot.Top,
                      verticalAlignment: go.Spot.Center
                    }),
                    $(
                      go.Picture,
                      {
                        source: '/toggle.jpg',
                        //   margin: new go.Margin(0, 0, 3, 0),
                        // click: this.open_nodewin,
                        margin: new go.Margin(15, 10, 0, 0),
                        desiredSize: new go.Size(25, 25),
                        alignment: go.Spot.TopRight,
                        click: openToggle
                        // flip: go.GraphObject.FlipBoth,
                      },
                      [
                        new go.Binding('flip', 'onShowFlag', (e) => {
                          // console.log(e);
                          return e ? go.GraphObject.None : go.GraphObject.FlipBoth
                        }),
                        new go.Binding('definceKey', 'key')
                      ]
                    )
                  ],
                  $(
                    go.Panel,
                    'Table',
                    new go.Binding('height', 'onShowFlag', (e) => {
                      return e ? NaN : 0
                    }),
                    {
                      margin: new go.Margin(50, 0, 10, 0),
                      //   background: "#fff",
                      //   minSize: new go.Size(500, 0),
                      width: 530,
                      //   height: 0
                      defaultAlignment: go.Spot.Center,
                      itemTemplate: $(
                        go.Panel,
                        'Auto',
                        [
                          new go.Binding('row', (e) => {
                            // let arr = [1, 1, 2, 2, 3];
                            // return arr[e - 1];
                            return Math.ceil(Number(e) / 2)
                          }),
                          new go.Binding('column', (e) => {
                            // let arr = [0, 1, 0, 1, 0];
                            let status = e % 2 === 0
                            // return arr[e - 1];
                            return status ? 1 : 0
                          })
                        ],
                        {
                          //   desiredSize: new go.Size(250, 70),
                          margin: new go.Margin(10, 0, 0, 0)
                          //   background: "skyblue",
                        },
                        $(go.Shape, 'RoundedRectangle', {
                          fill: '#f3faef',
                          stroke: '#fff',
                          //   desiredSize: new go.Size(250, 70),
                          strokeWidth: 2
                        }),
                        $(
                          go.Panel,
                          'Vertical',
                          {
                            desiredSize: new go.Size(250, 70),
                            padding: 15,
                            defaultAlignment: go.Spot.Left
                          },
                          $(
                            go.Panel,
                            'Horizontal',
                            {
                              defaultAlignment: go.Spot.Center
                            },
                            [
                              $(go.Picture, {
                                source: '/icon1.jpg',
                                margin: new go.Margin(0, 0, 3, 0),
                                // click: this.open_nodewin,
                                desiredSize: new go.Size(11, 12)
                              }),
                              $(go.TextBlock, '产品配置', {
                                margin: new go.Margin(0, 0, 0, 10)
                              })
                            ]
                          ),
                          $(go.TextBlock, [new go.Binding('text', '')], {
                            margin: new go.Margin(10, 0, 0, 0)
                            // alignment: go.Spot.Center,
                          })
                        )
                      )
                    },
                    new go.Binding('itemArray', 'itemList')
                  )
                )
              )
            })
          )
        )
        //单策略画布图
        data.myDiagram.nodeTemplateMap.add(
          'end2',
          $(
            go.Node,
            'Auto',
            {
              // isShadowed: true,
              // shadowOffset: new go.Point(-10, -1),
              // shadowRoot: 10,
              // shadowColor: "#fff",
            },
            [
              $(go.Shape, 'RoundedRectangle', {
                fill: '#fff',
                stroke: '#fff',
                strokeWidth: 2
              }),
              $(go.TextBlock, '策略一', {
                height: 60,
                //   margin: new go.Margin(-60, 0, 0, 0),
                alignment: go.Spot.Top,
                verticalAlignment: go.Spot.Center
              })
            ],
            $(
              go.Panel,
              'Vertical',
              [
                new go.Binding('height', 'onShowFlag', (e) => {
                  return e ? NaN : 0
                }),
                new go.Binding('margin', 'onShowFlag', (e) => {
                  return e ? new go.Margin(60, 0, 15, 0) : new go.Margin(60, 0, 0, 0)
                })
              ],
              {
                background: '#fff',
                minSize: new go.Size(300, 0),
                defaultAlignment: go.Spot.Center,
                itemTemplate: $(
                  go.Panel,
                  'Auto',
                  {
                    //   desiredSize: new go.Size(250, 70),
                    margin: new go.Margin(10, 0, 0, 0)
                    //   background: "skyblue",
                  },
                  $(go.Shape, 'RoundedRectangle', {
                    fill: '#f3faef',
                    stroke: '#fff',
                    //   desiredSize: new go.Size(250, 70),
                    strokeWidth: 2
                  }),
                  $(
                    go.Panel,
                    'Vertical',
                    {
                      desiredSize: new go.Size(250, 70),
                      padding: 15,
                      defaultAlignment: go.Spot.Left
                    },
                    $(
                      go.Panel,
                      'Horizontal',
                      {
                        defaultAlignment: go.Spot.Center
                      },
                      [
                        $(go.Picture, {
                          source: '/icon1.jpg',
                          margin: new go.Margin(0, 0, 3, 0),
                          // click: this.open_nodewin,
                          desiredSize: new go.Size(11, 12)
                        }),
                        $(go.TextBlock, '产品配置', {
                          margin: new go.Margin(0, 0, 0, 10)
                        })
                      ]
                    ),
                    $(go.TextBlock, '产品配置', {
                      margin: new go.Margin(10, 0, 0, 0),
                      alignment: go.Spot.Center
                    })
                  )
                )
              },
              new go.Binding('itemArray', 'itemList')
            )
          )
        )
        var model = $(go.TreeModel)
        let nodeDataArray = [
          {
            key: 1,
            category: 'start',
            addSatus: true, //添加按钮显示状态
            onShowFlag: true, //展开状态
            items: [{ title: '进入条件' }, { title: '初始名单' }]
          }
          // {
          //   category: "collection",
          //   items: [{ itemList: [1, 2, 3] }, { itemList: [1] }],
          // },
          //   {
          //     key: 2,
          //     parent: 1,
          //     category: 'end1',
          //     onShowFlag: true,
          //     addSatus: true,
          //     itemList: [1, 2, 3, 4, 5]
          //   },
          //   {
          //     category: 'list',
          //     parent: 2
          //   },
          //   {
          //     key: 3,
          //     category: 'list',
          //     parent: 2
          //   }
        ]
        model.nodeDataArray = nodeDataArray
        data.myDiagram.model = model
      }
    }
  })
</script>

<style scoped>
  #myDiagramDiv {
    height: 800px;
    background: skyblue;
  }
</style>
