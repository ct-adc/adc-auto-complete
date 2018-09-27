import {isValueBroken, getMatchListByBrokenValue} from './util';
import utility from 'ct-utility';

export default {
    methods: {
        /**
         * 通过配置项(value、list)来初始化组件的input内容和优化后的selected
         */
        initSelected() {
            const value = this.value;

            if (typeof value === 'string') {
//                    如果value是一个字符串，那么它指的是input中应该展示该内容，那么此时意味着并没有选中数据源中的任何一项
                this.input = value;
                this.selected = {};
            } else if (typeof value === 'object') {
//                    如果value是一个对象，即初始时已经有选中的数据
                let targetItems;
                const valueIsBroken = isValueBroken(value, this.list);

                if (valueIsBroken) {
//                        当value相比list是不完整对象时，根据list修正这个对象
                    targetItems = getMatchListByBrokenValue(value, this.list);

                    if (targetItems.length > 0) {
                        this.selected = targetItems[0];
                    }
                } else {
                    this.selected = this.value;
                }
//                    修正好selected对象后，更新input的值，以便及时渲染input框
                this.$nextTick(()=>{
                    if (JSON.stringify(this.selected) === '{}') {
                        this.input = '';
                    } else {
                        this.input = this.selectedContent;
                    }
                });
            }
        },
        /**
         * window点击事件的回调函数
         * @param event
         */
        clickHandler(event) {
            if (!this.listVisible) return;
            if (event.target !== this.$refs.input) {
//                        点击非本组件input区域时，隐藏下拉列表
                this.listVisible = false;
            }
            
            if (this.input !== '') {
//                        如果输入框内容不为空，那么默认帮用户做出如下选择：
                const isSelectedInput = this.selectedContent === this.input && !utility.base.isEmptyObject(this.selected);
                const delSelectedInput = this.selectedContent.indexOf(this.input) > -1 && !utility.base.isEmptyObject(this.selected);
                const shouldSelectTheOnly = this.autoSelectIfOne && this.matched.length === 1;

                // 如果用户只是在选中的情况下点击了input而未做任何input操作 此时不做任何变更
                if (isSelectedInput) return;
                if (this.autoClear && delSelectedInput){
                    // 如果用户只是删除了部分已选中的项的内容，且设置了自动清空，那么帮用户补上该值
                    this.input = this.selectedContent;
                } else if (shouldSelectTheOnly){
//                      如果设置了只有一项时自动匹配，那么自动将selected设置为这一项
                    this.selected = this.matched[0];
                    this.input = this.selectedContent;
                } else if (!this.autoClear){
                    const input = this.input;

                    this.selected = {};
                    setTimeout(()=>{
                        this.input = input;
                    });
                } else {
                    this.selected = {};
                    this.input = this.selectedContent;
                }
            } else {
//             如果输入框内容为空，那么清空selected的值
                this.selected = {};
            }
        },
        /**
         * 获取焦点时显示下拉列表，同时同步focus事件给全局，因为其他的计算属性之类的视focus事件会做出特殊的处理
         */
        focus() {
            this.listVisible = true;
            this.focusFlag = true;
        },
        select(item, event) {
            event.stopPropagation();
            const selectedItem = JSON.parse(JSON.stringify(item));

            this.$emit('select', selectedItem);
            this.selected = selectedItem;
            this.$nextTick(()=>{
                this.input = this.selectedContent;
            });
            this.listVisible = false;
        },
        getValue() {
            if (!this.autoClear && JSON.stringify(this.selected) === '{}') {
                return this.input;
            }
            return JSON.parse(JSON.stringify(this.selected));
        },
        empty() {
            this.input = '';
            this.$emit('clear');
        },
        showList() {
            this.focusFlag = false;
            this.listVisible = true;
        },
        hideList() {
            this.listVisible = false;
            if (this.autoSelectIfOne && this.matched.length === 1) {
                this.selected = this.matched[0];
                this.$nextTick(() => {
                    this.input = this.selectedContent;
                });
            }
            if (this.autoClear) {
                this.input = this.selectedContent;
            }
            this.focusFlag = false;
        }
    }
};
