## ct-adc-auto-complete

输入内容后自动匹配中某个数据源中对应的数据，实时给用户展示出来

## 组件示例图

[!img](https://github.com/ct-adc/adc-auto-complete/blob/master/ct-adc-auto-complete.png)

## 在线demo

[在线demo](https://codepen.io/rubyisapm/pen/aWPXJX?editors=1010)

## 使用

从npm安装ct-adc-auto-complete

```
npm install ct-adc-auto-complete --save
```
在代码中使用

```
import {local as LocalAutoComplete, remote as RemoteAutoComplete} from 'ct-adc-auto-complete';
Vue.component(LocalAutoComplete.name,LocalAutoComplete);
Vue.component(RemoteAutoComplete.name,RemoteAutoComplete);
或者
new Vue({
    el: ...
    components: {
        LocalAutoComplete,
        RemoteAutoComplete
    },
    ...
})
```


   
## 更新日志

[更新日志](https://github.com/ct-adc/adc-auto-complete/blob/master/changeLog.md)
