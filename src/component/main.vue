<template>
    <div class="autoComplete">
        <div class="dropdown">
            <input type="text"
                   autocomplete="off"
                   ref="input"
                   class="form-control has-feedback"
                   v-model="input"
                   @focus="focus"
                   @keyup="showList"
                   @keydown.enter="hideList"
                   @keyup.enter="hideList"
                   :placeholder="placeholder"
                   :disabled="disabled"
                   :maxlength="maxlength"/>
            <!-- 之所以加入keydown.enter是为了保证回车按下时如果autoselectIfOne为true时能够第一时间获取最终结果，避免回车触发的搜索在获取最终结果之前搜索，此时该条件不能及时更新-->
            <span v-if="!disabled" class="glyphicon glyphicon-remove form-control-feedback text-muted" @click="empty"></span>
            <template v-if="listVisible">
                <ul ref="list" class="dropdown-menu" v-show="matched.length>0">
                    <li v-for="(item, index) in matched"
                        @click="select(item,$event)" :key="index">
                        <a>
                        <span v-for="(key,index) in keys" :key="index">
                            {{item[key]}}
                            <span v-if="index!=keys.length-1">|</span>
                        </span>
                        </a>
                    </li>
                </ul>
                <ul ref="list" class="dropdown-menu" v-show="matched.length===0">
                    <li class="noResult">{{info}}</li>
                </ul>
            </template>
        </div>
    </div>
</template>
<script>
    import utility from 'ct-utility';
    import {isValueBroken, getMatchListByBrokenValue, matchAtLeastOneKey} from './module/util';

    export default {
        name: 'auto-complete',
        model: {
            prop: 'value',
            event: 'change'
        },
        props: {
            allForEmpty: {
                // 当为空时显示全部内容
                type: Boolean,
                default: true
            },
            list: {
                // 源数据
                type: [Array],
                default() {
                    return [];
                }
            },
            keys: {
                // 需要显示到list中的key
                type: Array,
                default() {
                    return ['Id', 'Name'];
                }
            },
            matchKeys: {
                // 可以参与匹配的key
                type: Array,
                default() {
                    return ['Id', 'Name'];
                }
            },
            showKeys: {
                // 需要显示到input框中的key
                type: Array,
                default() {
                    return ['Id', 'Name'];
                }
            },
            value: {
                // 选中的项或input中的值
                type: [Object, String],
                default() {
                    return {};
                }
            },
            placeholder: {
                // 输入框中的placeholder
                type: String,
                default: '输入内容后自动匹配...'
            },
            disabled: {
                // 是否禁用input框
                type: Boolean,
                default: false
            },
            caseSensitive: {
                // 匹配时是否大小写敏感
                type: Boolean,
                default: false
            },
            maxlength: {
                // 允许输入的最大长度
                type: Number,
                default: 100000
            },
            autoClear: {
                // 没有匹配到内容时是否清空
                type: Boolean,
                default: false
            },
            autoSelectIfOne: {
                // 当只有一项匹配时自动选择该项
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                input: '', // input框中的内容
                listVisible: false, // 下拉框是否可见
                selected: {}, // 选中的项
                focusFlag: false // 当发生focus事件时设置该flag为true
            };
        },
        created() {
            this.initSelected();
        },
        mounted() {
            this.input = this.selectedContent;
            window.addEventListener('click', this.clickHandler);
        },
        beforeDestroy() {
            window.removeEventListener('click', this.clickHandler);
        },
        computed: {
            /**
             * matched: 根据输入内容匹配出的数据子集
             * @returns {*}
             */
            matched() {
                const shouldReturnWholeList = (this.focusFlag || this.input === '') && this.allForEmpty;
                const shouldFilterByInput = this.input !== '' && (!this.focusFlag || this.focusFlag && !this.allForEmpty);

                if (shouldFilterByInput) {
//                    input即使有值，如果用户点击input获取焦点时，需忽略input内容并将全部内容显示出来
                    const matched = this.list.filter(item=>{
                        return matchAtLeastOneKey(item, this.input, this.matchKeys, this.caseSensitive);
                    });
                    const shouldReverseSelected = this.selectedContent.indexOf(this.input) > -1 && !utility.base.isEmptyObject(this.selected);
//                        如果当前的结果不是空时，用户只是删除了当前结果的部分input内容，但没有全部删除完（全部删除完时会触发this.selected={}），那么匹配列表中应该包含this.selected这条数据
                   
                    if (matched.length > 0) {
                        return matched;
                    } else if (shouldReverseSelected) {
                        return [this.selected];
                    }
//                    如果没有匹配出任何数据
                    if (this.autoSelectIfOne) {
                        this.selected = {};
                    }
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
             * selectedContent: 根据当前的数据选择和用户输入情况，计算出的input中应该展示出的内容，大部分情况下input可以选择使用该值
             * @returns { * }
             */
            selectedContent() {
                const content = [];

                if (!utility.base.isEmptyObject(this.selected)){
//                    selected有值时，根据showKeys算出应该填入input中的内容
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
//                    如果没有选择任何一项数据，且配置了不匹配就清空内容时，将其重置为''
                    return '';
                }
//                如果不匹配也不清空内容时，那么保持当前input的内容不变
                return this.input;
            }
        },
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
                    const mayDelSelectedInput = this.selectedContent.indexOf(this.input) > -1 && !utility.base.isEmptyObject(this.selected);
                    const shouldSelectTheOnly = this.autoSelectIfOne && this.matched.length === 1;

                    if (this.autoClear && mayDelSelectedInput){
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
        },
        watch: {
            value(newVal, oldVal) {
                if (JSON.stringify(newVal) !== JSON.stringify(oldVal)){
                    this.initSelected();
                }
            },
            list() {
                this.initSelected();
            },
            input(newVal, oldVal) {
                if (newVal === '') {
                    this.selected = {};
                }
                if (JSON.stringify(newVal) !== JSON.stringify(oldVal) && !this.autoClear && utility.base.isEmptyObject(this.selected)){
                    this.$emit('change', this.input);
                }
            },
            selected(newVal, oldVal){
                if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
                    this.$emit('change', JSON.parse(JSON.stringify(this.selected)));
                    if (utility.base.isEmptyObject(newVal)) {
                        this.$emit('clear');
                        this.$emit('change', {});
                    }
                }
            }
        }
    };
</script>
<style scoped>
    .autoComplete .dropdown-menu {
        width: 100%;
        max-height: 400px;
        overflow-y: scroll;
        display: block;
    }

    .autoComplete .dropdown-menu li {
        cursor: pointer;
    }

    .autoComplete .noResult {
        padding: 3px 20px;
    }

    .form-control-feedback {
        cursor: pointer;
        pointer-events: inherit;
    }

    .has-feedback {
        padding-right: 25px;
    }

    .has-feedback::-ms-clear {
        display: none;
    }
</style>
