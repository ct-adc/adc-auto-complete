import { isValueBroken, getMatchListByBrokenValue } from './util';
import utility from 'ct-utility';

export default {
    methods: {
        /**
         * 通过配置项(value、list)来初始化组件的input内容和优化后的selected
         */
        initSelected() {
            const value = this.value;

            if (typeof value === 'string') {
                // 如果value是一个字符串，那么它指的是input中应该展示该内容，那么此时意味着并没有选中数据源中的任何一项
                this.input = value;
                this.setSelected({});
            } else if (typeof value === 'object') {
                // 如果value是一个对象，即初始时已经有选中的数据
                let targetItems;
                const valueIsBroken = isValueBroken(value, this.list);

                if (valueIsBroken) {
                    // 当value相比list是不完整对象时，根据list修正这个对象
                    targetItems = getMatchListByBrokenValue(value, this.list);

                    if (targetItems.length > 0) {
                        this.setSelected(targetItems[0]);
                    }
                } else {
                    this.setSelected(this.value);
                }
                // 修正好selected对象后，更新input的值，以便及时渲染input框
                this.$nextTick(() => {
                    if (utility.base.isEmptyObject(this.selected)) {
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
                // 点击非本组件input区域时，隐藏下拉列表
                this.listVisible = false;
            }
            this.confirmValueIfHideList();
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
            this.setSelected(selectedItem);
            this.$nextTick(() => {
                this.input = this.selectedContent;
            });
            this.listVisible = false;
        },
        getValue() {
            if (!this.autoClear && utility.base.isEmptyObject(this.selected)) {
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
            this.focusFlag = false;
            this.confirmValueIfHideList();
        },
        confirmValueIfHideList() {
            if (this.input.match(/^\s*$/)) {
                // 如果输入框内容为空，那么清空selected的值
                this.setSelected({});
                this.input = '';
            } else {
                // 如果输入框内容不为空，那么默认帮用户做出如下选择：
                const isSelectedInput =
                    !utility.base.isEmptyObject(this.selected) &&
                    this.selectedContent === this.input;
                const rmSomeButAutoClear =
                    this.selectedContent.indexOf(this.input) > -1 &&
                    !utility.base.isEmptyObject(this.selected) &&
                    this.autoClear;
                const shouldReverseSelected = rmSomeButAutoClear;
                const shouldSelectTheOnly = this.autoSelectIfOne && this.matched.length === 1;
                // 如果从选中了一个值到随意输入，那么this.selectedContent.indexOf(this.input) === -1,
                // 如果从空值到随意输入，那么this.selectedContent === this.input
                const shouldClear =
                    (this.selectedContent === this.input || this.selectedContent.indexOf(this.input) === -1) && this.autoClear;

                // 如果用户只是在选中的情况下点击了input而未做任何input操作 此时不做任何变更
                if (isSelectedInput) return;
                if (shouldReverseSelected) {
                    // 如果用户只是删除了部分已选中的项的内容，且设置了自动清空，那么帮用户补上该值
                    this.input = this.selectedContent;
                } else if (shouldSelectTheOnly) {
                    // 如果设置了只有一项时自动匹配，那么自动将selected设置为这一项
                    this.setSelected(this.matched[0]);
                    this.input = this.selectedContent;
                } else if (shouldClear) {
                    this.setSelected({});
                    this.input = '';
                }
            }
        },
        setSelected(selected, emit = true) {
            var oldSelected = JSON.stringify(this.selected);

            this.selected = selected;
            if (emit && oldSelected !== JSON.stringify(selected)) {
                this.emitChange();
            }
        },
        emitChange() {
            if (this.autoClear || !utility.base.isEmptyObject(this.selected)) {
                this.$emit('change', JSON.parse(JSON.stringify(this.selected)));
            } else {
                this.$emit('change', this.selectedContent);
            }
        }
    }
};
