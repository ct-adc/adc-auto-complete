## 功能点

1. 支持根据输入的内容从远程获取数据;

## v-model

绑定选中值，即需要在input中渲染出的结果

类型：{Object,String}
默认值: {}

该值可以是:

1. 含有和数据源中key一致的对象，或者任意的字符串；
2. 该对象须是完整的对象，因为该数据需要通过valueMethod进行渲染；
3. 可以是字符串，为字符串时，只有在autoClear为false时才有意义

## props

参数 | 说明 | 类型 | 默认值 | 可选值 | 描述 |
--- | --- | --- | --- | ---- | ---
placeholder | 输入框placeholder | String | 输入内容后自动匹配... | 任何你想提示的内容 | 输入框的placeholder内容 | 
disabled | 输入框是否不可用 | Boolean | false | true/false | 输入框是否不可用 |
maxlength | 输入框输入字数限制 | Number | 100000 | 任何数字 | 输入框输入字数限制 |
autoClear | 不匹配时自动清空 | Boolean | false | true/false | 是否在不匹配时自动清空input |
remoteMethod | 远程请求的方法 | Function（返回一个promise then回调参数为data catch回调参数为错误文本信息） |  无 | 返回promise的function | 远程请求的方法
renderMethod | 渲染下拉列表数据的方法 | Function(参数为list中的item) | 无 | function | 返回string类型
valueMethod | 渲染input数据的方法 | Function(参数为选中的项，即list中的item 或 item的子集(当v-model有值且该值和item中的项的key不完全匹配时)) | 无 | function | 返回string类型
debounce | input在输入时的debounce时间,单位: ms | Number | 250 | 数字 | 输入内容时停留多久进行数据请求 |

## 事件

事件名称 | 说明 | 回调参数类型 | 回调参数说明 | 描述
--- | --- | --- | --- | --- |
select | 选中数据 | Object | 选中的数据对象 | 当手动选择下方列表时，才会触发select事件
change | 数据改变 | Object | 选中的数据对象 | 当选中结果(selected)发生变化时，触发change事件；当数据由'空缺'状态变为'被补全'后，也会触发该事件; 当数据被清空时也会触发该事件
clear | 数据被清空 | 无 | 无 | 当组件中的值被清空（手动清空或点击X清空）时，触发该事件


## 注意事项

* 对value进行赋值或修改

  请使用对value直接赋值的方式，避免直接对其单个属性的操作，因为有可能导致其修改无法被监听。
  例如：value初始值为{}，后续将value.id = 1; 那么，因为value的id并没有被监听；所以，应该使用value = {id: 1};
   
## 更新日志

[更新日志](https://github.com/ct-adc/adc-auto-complete/blob/master/changeLog.md)
