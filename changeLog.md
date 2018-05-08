## 更新日志

### 3.0.0-alpha.1

*2018-04-28*

- 修改 将caseInsensitive改为caseSensitive且默认为false

- 修改 补齐value时，如果value中含有多余的key则忽略，只需匹配list中含有的key即可

- 优化 添加v-model

- 优化 数据被清空时触发clear & change事件; 此前只触发change事件

### 2.1.1

*2018-04-18*

-修复 当value值残缺时，匹配list中的项时匹配逻辑出错，导致找到的项和value不对应

### 2.1.0

*2018-03-06*

- 优化 更新项目开发脚手架

- 修复 disabled为true时，需隐藏清空按钮

### 2.0.2

*2017-11-09*

- 修复 当点击回车时，autoClear为true则同步input=this.selectedContent

### 2.0.1

*2017-11-07*

- 修复 autoSelectIfOne为true时，修改select的时机从match.length===1时修改为listVisible=false时。因为在输入期间修改该值将导致过早同步到外部，和操作上的确定(点击input外部或按回车)不一致。

### 2.0.0

*2017-11-03*

- 新增 新增autoClear/autoSelectIfOne属性

### 1.5.0

*2017-08-24*

- 新增 新增case-insensitive支持

### 1.4.0

*2017-08-09*

- 新增 新增maxlength支持

### 1.3.2

*2017-08-08*

- 修复 input 添加autocomplete="off"

### 1.3.1

*2017-07-06*

- 修复 清空后没有消失弹框前val不为空的bug

### 1.3.0

*2017-06-15*

- 新增 新增disabled属性

### 1.2.0

*2017-05-23*

- 新增 加入在线demo

### 1.1.2

*2017-04-19*

- 修复 firefox下选择列表失效的问题

### 1.1.1

*2017-04-18*

- 修复 将value置为空值后输入框不为空

### 1.1.0

*2017-03-14*

- 手抖发了两次

### 1.0.0

*2017-03-14*

- 修复 去除value对外部的强依赖，添加selected私有属性，避免必须实时同步
- 添加 添加change事件和clear事件
- 修改 修改select事件的触发时机，从原来的value变化变为点击选择一项数据时更新

### 0.0.7
