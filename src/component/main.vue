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
    import props from './module/props';
    import data from './module/data';
    import computed from './module/computed';
    import methods from './module/methods';

    export default {
        name: 'auto-complete',
        mixins: [props, data, computed, methods],
        model: {
            prop: 'value',
            event: 'change'
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
        }
    };
</script>
<style scoped src="./style.css"></style>
