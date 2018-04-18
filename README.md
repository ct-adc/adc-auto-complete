## ct-adc-auto-complete

输入内容后自动匹配中某个数据源中对应的数据，实时给用户展示出来

## 组件示例图

[!img](https://github.com/ct-adc/adc-auto-complete/blob/master/ct-adc-auto-complete.png)

## 在线demo

[在线demo](https://codepen.io/rubyisapm/pen/aWPXJX?editors=1010)

## 功能点

1. 在写入时自动匹配到相应的数据，匹配的数据源支持匹配key，例如只匹配id，或者同时匹配id和name或更多;
2. 支持配置在匹配时是否忽略大小写
3. 支持残缺value根据数据源自动补齐

## 使用

从npm安装ct-adc-auto-complete

```
npm install ct-adc-auto-complete --save
```
在代码中使用

```
import AutoComplete from 'ct-adc-auto-complete';
Vue.component(AutoComplete.name,AutoComplete);
或者
new Vue({
    el: ...
    components: {
        AutoComplete
    },
    ...
})
```

## props

参数 | 说明 | 类型 | 默认值 | 可选值 | 描述 |
--- | --- | --- | --- | ---- | ---
allForEmpty | 空内容匹配全部 | Boolean | true | false/true | 是否在input没有输入的情况下展示所有数据 | 
list | 数据源 | Array | [] | | 匹配需要使用的源数据，其中每一项为一个对象，对应数据源中的每一条数据 | 
keys | 列表中显示的key | Array | ['Id','Name'] | 一个数组，其中的key必须是数据源中数据的key | 需要在每项数据中显示出来的key值，这些值以&verbar;分隔 | 
matchKeys | 匹配key | Array | ['Id','Name'] | 一个数组，其中的key必须是数据源中数据的key | 可以参与匹配的key | 
showKeys | input中显示的key | Array | ['Id','Name'] | 一个数组，其中的key必须是数据源中数据的key | 选择数据后显示在input中的key值 | 
value | 选中值(需要在input中渲染出的结果) | Object,String | {} | 含有和数据源中key一致的对象，或者任意的字符串 | 该对象可以不是完整的对象，但是指定的key的值在数据源中必须唯一；如果是字符串，只有在autoClear为false时才有意义| 
placeholder | 输入框placeholder | String | 输入内容后自动匹配... | 任何你想提示的内容 | 输入框的placeholder内容 | 
disabled | 输入框是否不可用 | Boolean | false | true/false | 输入框是否不可用 |
maxlength | 输入框输入字数限制 | Number | 100000 | 任何数字 | 输入框输入字数限制 |
caseInsensitive | 匹配时是否区分大小写 | Boolean | false | true/false | 匹配数据源中的内容时，是否忽略大小写 |
autoClear | 不匹配时自动清空 | Boolean | false | true/false | 是否在不匹配时自动清空input |
autoSelectIfOne | 仅一条匹配时是否自动选中 | Boolean | false | true/false | 是否在只有一项匹配时自动选中该项 |


## 方法

### getValue

得到用户最终输入或选择的内容

#### 参数列表

无

#### 返回值

1. 当配置项autoClear为true时

类型 | 说明 | 备注 | 
--- | --- | --- | 
Object | 用户选择的数据对象 |

2. 当配置项autoClear为false时

类型 | 说明 | 备注 | 
--- | --- | --- | 
Object | 用户选择的数据对象 | 当用户输入的内容有匹配内容，且用户选择该匹配出的内容时，返回值为用户选择的数据对象
String | 输入到输入框中的内容 | 当用户没有匹配到内容时，返回值为输入框中的输入内容

## 事件

事件名称 | 说明 | 回调参数类型 | 回调参数说明 | 描述
--- | --- | --- | --- | --- |
select | 选中数据 | Object | 选中的数据对象 | 当手动选择下方列表时，才会触发select事件
change | 数据改变 | Object | 选中的数据对象 | 当选中结果(selected)发生变化时，触发change事件；当数据由'空缺'状态变为'被补全'后，也会触发该事件
clear | 数据被清空 | 无 | 无 | 当组件中的值被清空（手动清空或点击X清空）时，触发该事件

## 注意事项

* 对value进行赋值或修改

  请使用对value直接赋值的方式，避免直接对其单个属性的操作，因为有可能导致其修改无法被监听。
  例如：value初始值为{}，后续将value.id = 1; 那么，因为value的id并没有被监听；所以，应该使用value = {id: 1};
  
## Q & A
   
1. keys/matchKeys/showKeys能不能包含键值为对象或数组的键名？

   不能。参与计算或展示的key都必须是值为基本类型的键；

2. value可不可以不包含全部的key？

   * 当autoClear为false时，value可以为string类型，指定input中的内容。
   * 当autoClear为true时，value必须是对象。此时用户操作结果只能是list列表中指定的内容，value的内容可以被自动补全。
     例如：业务中编辑操作时，只给出了编辑项的Id值，但是其他的如name/shortName之类的并没有给全,组件会根据源数据list来算出匹配的完整数据；

   注意：请保证按传入的value中的部分key值查找list只能匹配一项数据，否则匹配的数据可能并非预期；

3. value中是否可以含有list中没有的key？

   不可以
   
## 更新日志

[更新日志](https://github.com/ct-adc/adc-auto-complete/blob/master/changeLog.md)

## 外部资源依赖列表

- jdPicker.js V2.0.0+

- webUploader V1.5.0+