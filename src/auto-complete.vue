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
                   :placeholder="placeholder" :disabled="disabled" :maxlength="maxlength"/>
            <!-- 之所以加入keydown.enter是为了保证回车按下时如果autoselectIfOne为true时能够第一时间获取最终结果，避免回车触发的搜索在获取最终结果之前搜索，此时该条件不能及时更新-->
            <span class="glyphicon glyphicon-remove form-control-feedback text-muted" @click="empty"></span>
            <template v-if="listVisible">
                <ul ref="list" class="dropdown-menu" v-show="matched.length>0">
                    <li v-for="item in matched"
                        @click="select(item,$event)">
                        <a>
                        <span v-for="(key,index) in keys">
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
<script type="text/ecmascript-6">
    import utility from 'ct-utility';
    export default{
        name: 'auto-complete',
        props: {
            allForEmpty: {
                type: Boolean,
                default: true
            },
            list: {
                type: [Array],
                default(){
                    return []
                }
            },
            keys: {
                type: Array,
                default(){
                    return ['Id', 'Name'];
                }
            },
            matchKeys: {
                type: Array,
                default(){
                    return ['Id', 'Name'];
                }
            },
            showKeys: {
                type: Array,
                default(){
                    return ['Id', 'Name'];
                }
            },
            value: {
                type: [Object,String],
                default(){
                    return {};
                }
            },
            placeholder: {
                type: String,
                default: '输入内容后自动匹配...'
            },
            disabled: {
                type: Boolean,
                default: false
            },
            caseInsensitive:{
                type: Boolean,
                default: false
            },
            maxlength:{
                type:Number,
                default:100000
            },
            autoClear:{
                type:Boolean,
                default:false
            },
            autoSelectIfOne:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return {
                input: '',
                listVisible: false,
                selected: {},
                focusFlag: false
            }
        },
        created(){
            this.initSelected();
        },
        mounted(){
            this.input = this.selectedContent;
            window.addEventListener('click', this.clickHandler);
        },
        beforeDestroy(){
            window.removeEventListener('click', this.clickHandler);
        },
        computed: {
            matched(){
                var that = this;
                if (that.input != '' && !this.focusFlag) {
                    var matched = that.list.filter(function(item) {
                        return that.matchKeys.some(function(key) {
                            if(that.caseInsensitive){
                                var itemKeyLowerCased=(item[key] + '').replace(/([a-zA-Z])/g,($0,$1)=>{
                                    return $1.toLowerCase();
                                });
                                var inputLowerCased=that.input.replace(/([a-zA-Z])/g,($0,$1)=>{
                                    return $1.toLowerCase();
                                });
                                return itemKeyLowerCased.indexOf(inputLowerCased) > -1;
                            }else{
                                return (item[key] + '').indexOf(that.input) > -1;
                            }
                        })
                    })
                    if (matched.length > 0) {
                        return matched;
                    } else if (that.selectedContent.indexOf(this.input) > -1 && !utility.base.isEmptyObject(that.selected)) {
                        return [that.selected];
                    } else {
                        if(this.autoSelectIfOne){
                            this.selected={};
                        }
                        return [];
                    }
                } else if (this.focusFlag || that.allForEmpty) {
                    return that.list;
                } else {
                    return [];
                }
            },
            info(){
                if (this.matched.length !== 0) return;
                if (this.input === '' && !this.allForEmpty) {
                    return '请输入内容进行匹配！';
                } else {
                    return '没有匹配的内容！';
                }
            },
            selectedContent(){
                var content = [];
                var that = this;
                that.showKeys.map(function(key) {
                    if (typeof that.selected[key] != 'undefined') {
                        content.push(that.selected[key]);
                    }
                })
                if (content.length > 0) {
                    return content.join(' | ');
                } else {
                    if(that.autoClear){
                        return '';
                    }else{
                        return that.input;
                    }
                }
            }
        },
        methods: {
            initSelected(){
                var that = this;
                var value = that.value;
                if(typeof value ==='string'){
                    this.input=value;
                    this.selected={};
                }else if(typeof value === 'object'){
                    var valueKeysCount = Object.keys(value).length;
                    var listIsNotEmpty = that.list.length > 0;
                    var completed = false;
                    if (valueKeysCount > 0 && listIsNotEmpty) {
                        var simpleKeysCount = Object.keys(that.list[0]).length;
                        var valueIsBroken = listIsNotEmpty && simpleKeysCount > valueKeysCount;
                        if (valueIsBroken) {
                            //当value相比list是不完整对象时，根据list修正这个对象
                            var targetItems = that.list.filter(function(item) {
                                var keysInSelected = Object.keys(value);
                                var matchItems = keysInSelected.filter(function(i) {
                                    return value[i] === item[i];
                                })
                                return matchItems.length > 0;
                            });
                            if (targetItems.length > 0) {
                                completed = true;
                            }
                        }
                    }
                    if (completed) {
                        this.selected = targetItems[0];
                    } else {
                        this.selected = that.value;
                    }
                    that.$nextTick(function() {
                        if(JSON.stringify(this.selected)==='{}'){
                            that.input='';
                        }else{
                            that.input = that.selectedContent;
                        }
                    })
                }

            },
            clickHandler(event){
                var that = this;
                if (that.listVisible) {
                    if (event.target != that.$refs.input) {
                        that.listVisible = false;
                    }
                    if (that.input !== '') {
                        if(this.autoSelectIfOne && this.matched.length===1){
                            this.selected=this.matched[0];
                        }
                        that.input = that.selectedContent;
                    } else {
                        that.selected = {};
                    }
                }
            },
            focus(){
                this.listVisible = true;
                this.focusFlag = true;
            },
            select(item, event){
                event.stopPropagation();
                var selectedItem = JSON.parse(JSON.stringify(item));
                this.$emit('select', selectedItem);
                this.selected = selectedItem;
                this.$nextTick(function() {
                    this.input = this.selectedContent;
                })
                this.listVisible = false;
            },
            getValue(){
                if(!this.autoClear && JSON.stringify(this.selected)==='{}'){
                    return this.input;
                }else{
                    return JSON.parse(JSON.stringify(this.selected));
                }
            },
            watchSelected(newVal, oldVal){
                if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
                    this.$emit('change-val', JSON.parse(JSON.stringify(this.selected)));
                }
                if (utility.base.isEmptyObject(newVal)) {
                    this.$emit('clear');
                }
            },
            empty(){
                this.input = '';
            },
            showList(){
                this.focusFlag = false;
                this.listVisible=true;
            },
            hideList(){
                this.listVisible=false;
                if(this.autoSelectIfOne && this.matched.length===1){
                    this.selected=this.matched[0];
                    this.$nextTick(()=>{
                        this.input=this.selectedContent;
                    });
                }
                if(this.autoClear){
                    this.input=this.selectedContent;
                }
                this.focusFlag = false;
            }
        },
        watch: {
            value(){
                this.initSelected();
            },
            list(){
                this.initSelected();
            },
            selected: function(newVal, oldVal) {
                if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
                    this.$emit('change', JSON.parse(JSON.stringify(this.selected)));
                }
                if (utility.base.isEmptyObject(newVal)) {
                    this.$emit('clear');
                }
            },
            input(newVal){
                if (newVal === '') {
                    this.selected = {};
                }
            }
        }
    }
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