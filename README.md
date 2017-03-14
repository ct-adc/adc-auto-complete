# 自动匹配组件

## 使用

从npm安装`ct-adc-auto-complete`
```
npm install ct-adc-auto-complete
```
在代码中引用
```
import AutoComplete from 'ct-adc-auto-complete';
Vue.component(AutoComplete.name,AutoComplete);

```

## 参数说明

参数|描述|类型|默认值 
--- | --- | --- | --- | ----
allForEmpty | 是否在input没有输入的情况下展示所有数据 | Boolean | true
list | 该组件需要使用的源数据 | Array | []
keys | 需要在每项数据中显示出来的属性，这些属性值以|分隔 | Array | ['Id','Name']
matchKeys | 可以参与匹配的属性 | Array | ['Id','Name']
showKeys | 选择数据后显示在input中的属性 | Array | ['Id','Name']
value | 当前选中的对象,可以不是完整的对象 | Object | 无
placeholder | 输入框的placeholder内容 | String | 输入内容后自动匹配...

## 事件说明

* select事件

当选择一条数据时，触发select事件；

* change事件

当组件的selected发生改变时，触发change事件。
注意:当数据由'空缺'状态变为'被补全'后，也会触发该事件;

## Q & A

1. matchKeys能不能包含键值为对象或数组的键名？

不能。参与计算或展示的key都必须是值为基本类型的键；

2. value可不可以不包含全部的key？

可以，但value必须是对象。
例如业务中编辑操作时，只给出了编辑项的Id值，但是其他的如name/shortName之类的并没有给全,组件会根据源数据list来算出匹配的完整数据；

注意：请保证按传入的value中的部分key值查找list只能匹配一项数据，否则匹配的数据可能并非预期；


## changeLog

[changeLog](https://github.com/ct-adc/adc-auto-complete/blob/master/changeLog.md)
