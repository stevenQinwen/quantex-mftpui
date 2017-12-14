# Mobx 开发要点 (踩坑指南)
## 定义Store的最佳方式
> [官方介绍(重要)](https://suprise.gitbooks.io/mobx-cn/content/best/store.html)

> Store 的主要职责是，从组件内移除`逻辑`和`状态`。大多数应用都需要至少两个 Store，一个用于`存储 UI 状态`，另一个用于`存储数据`。

如官方所言,在定义每个页面的Store方式的时候,我们会定义两个文件`UIState.js`和`Store.js`,分别对应官方文档里提及的`UI 状态`和`数据`。

这两个文件应分别存储以下常见信息(详见官方文档)

#### UIState 的职责有:
  - 不会在后端存储的信息
  - 会全局影响UI的信息：
    - Window尺寸
    - 提示消息
  - 更多可能存储的组件信息：
    - 当前选择
    - 工具条显示隐藏状态
    
#### Store 的职责有：
- 提供后端集成。在需要的时候存储数据。
- 当从后端获取到更新时，更新已有的实例。
- 每个 Store 都应该只有一个实例。

## Observable Arrays(坑)
> [官方介绍(重要)](https://suprise.gitbooks.io/mobx-cn/content/refguide/array.html)

所以使用数组作为可被观察的值时, 有以下两种场景的操作要求。
#### 场景一: 对数组值的操作类型为全量赋值
#### 场景二: 对数组值进行增量的增删查改

> 请记住无论如何 Array.isArray(observable([])) 都将返回 false ，所以当你需要传递一个可观察的数组给外部库时，最好使用 array.slice() 创建一个其浅拷贝在传递给其它库或者内置函数 使用（这是最好的做法）。
 
