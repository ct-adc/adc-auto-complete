import {matchAtLeastOneKey} from './util';
import utility from 'ct-utility';

export default {
    computed: {
        /**
         * matched: 根据输入内容匹配出的数据子集
         * @returns {*}
         */
        matched() {
            // input即使有值，如果用户点击input获取焦点时，需忽略input内容并将全部内容显示出来
            const shouldReturnWholeList = (this.focusFlag || this.input === '') && this.allForEmpty;
            const shouldFilterByInput = this.input !== '' && (!this.focusFlag || this.focusFlag && !this.allForEmpty);

            if (shouldFilterByInput) {
                const matched = this.list.filter(item=>{
                    return matchAtLeastOneKey(item, this.input, this.matchKeys, this.caseSensitive);
                });
                const shouldReverseSelected = this.selectedContent.indexOf(this.input) > -1 && !utility.base.isEmptyObject(this.selected);
                // 如果当前的结果不是空时，用户只是删除了当前结果的部分input内容，但没有全部删除完（全部删除完时会触发this.selected={}），
                // 那么匹配列表中应该包含this.selected这条数据
               
                if (matched.length > 0) {
                    return matched;
                } else if (shouldReverseSelected) {
                    return [this.selected];
                }
                // 如果没有匹配出任何数据
                // if (this.autoSelectIfOne && !this.listVisible) {
                //     this.selected = {};
                // }
                return [];
            } else if (shouldReturnWholeList) {
                return this.list;
            }
            return [];
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
         * 大部分情况下input可以选择使用该值
         * @returns { * }
         */
        selectedContent() {
            const content = [];

            if (!utility.base.isEmptyObject(this.selected)){
                // selected有值时，根据showKeys算出应该填入input中的内容
                this.showKeys.map(key=>{
                    if (typeof this.selected[key] !== 'undefined') {
                        content.push(this.selected[key]);
                    }
                });
                if (content.length > 0) {
                    return content.join(' | ');
                }
            }
            if (this.autoClear) {
                // 如果没有选择任何一项数据，且配置了不匹配就清空内容时，将其重置为''
                return '';
            }
            // 如果不匹配也不清空内容时，那么保持当前input的内容不变
            return this.input;
        }
    }
};

