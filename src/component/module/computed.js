import { matchAtLeastOneKey } from './util';
import utility from 'ct-utility';

export default {
    computed: {
        /**
         * matched: 根据输入内容匹配出的数据子集
         * @returns {*}
         */
        matched() {
            let matched;
            // input即使有值，如果用户点击input获取焦点时，需忽略input内容并将全部内容显示出来
            const shouldReturnWholeList = (this.focusFlag || this.input === '') && this.allForEmpty;
            const shouldFilterByInput =
                this.input !== '' && (!this.focusFlag || this.focusFlag && !this.allForEmpty);

            if (shouldFilterByInput) {
                const matchedByInput = this.list.filter(item => {
                    return matchAtLeastOneKey(item, this.input, this.matchKeys, this.caseSensitive);
                });
                const rmSomeButAutoClear =
                    this.selectedContent.indexOf(this.input) > -1 &&
                    !utility.base.isEmptyObject(this.selected) &&
                    this.autoClear;
                const equalTotally =
                    this.selectedContent === this.input &&
                    !utility.base.isEmptyObject(this.selected);
                const shouldReverseSelected = rmSomeButAutoClear || equalTotally;
                /* 1.如果当前的结果不是空时，用户只是删除了当前结果的部分input内容，但没有全部删除完（全部删除完时会触发this.selected={}），如果此时用户设置了autoClear（即只能选择list中的内容，不允许用户自己输入其他的内容），那么匹配列表中应该包含this.selected这条数据 
                2.如果用户没有对input进行任何编辑，此时应保持selected值*/

                if (matchedByInput.length > 0) {
                    matched = matchedByInput;
                } else if (shouldReverseSelected) {
                    matched = [this.selected];
                } else {
                    matched = [];
                    if (!this.autoClear) {
                        // 当autoClear为true时，不能实时清空selected，因为会引发input中的内容更新为空值，且autoClear为true时，需要reverseSelected，故不能清空selected
                        // 即：当autoClear为false时，input值的编辑会随时影响最终结果，但autoClear为true时，则会有少许记忆功能，以便值的恢复
                        this.setSelected({});
                    }
                }
            } else if (shouldReturnWholeList) {
                matched = this.list;
            } else {
                matched = [];
            }
            return matched;
        },
        /**
         * info: 当匹配出的数据子集为空时，下方列表显示出的提示信息
         * @returns {*}
         */
        info() {
            if (this.matched.length !== 0) return;
            if (this.input === '' && !this.allForEmpty) {
                return '请输入内容进行匹配！';
            }
            return '没有匹配的内容！';
        },
        /**
         * selectedContent: 根据当前的数据选择和用户输入情况，计算出的input中应该展示出的内容，
         * 大部分情况下input可以选择使用该值, 但selectedContent中不做超前判断，例如input可能要被清空，
         * 但selectedContent的值返回的是当前input的值。
         * selectedContent为用户选择性使用的值，因为某些时候input中不应设置为该值
         * @returns { * }
         */
        selectedContent() {
            const content = [];
            let contentStr = '';

            if (!utility.base.isEmptyObject(this.selected)) {
                // selected有值时，根据showKeys算出应该填入input中的内容
                this.showKeys.map(key => {
                    if (typeof this.selected[key] !== 'undefined') {
                        content.push(this.selected[key]);
                    }
                });
                if (content.length > 0) {
                    contentStr = content.join(' | ');
                }
            } else {
                // 保持当前input的内容不变
                contentStr = this.input;
            }

            return contentStr;
        }
    }
};
