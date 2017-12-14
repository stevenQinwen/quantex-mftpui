---
category: Components
subtitle: 根据传进来的component属性切换输入控件
title: FormItemWrapper
---

## 何时使用

- 当一个字段输入空间需根据另一个字段值的变化切换不同的输入控件时，只给 Form 组件的 getFieldDecorator 装饰器绑定一个 child （FromItemWrapper 组件），通过该 child 传入的属性（component 等）切换被 FromItemWrapper 包裹的真实的输入控件
  

## API

### Extended TreeSelect props

| 参数               | 说明               | 类型      | 默认值    |
| ---------------- | ---------------- | ------- | ------ |
| component         | 返回输入控件名称             | Function() 或 string   | -     |


### 其他props请参考官网 [FormItemWrapper](http://localhost:8989/components/FormItemWrapper-cn/)
