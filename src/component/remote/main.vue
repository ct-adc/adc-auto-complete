<template>
    <div class="autoComplete">
        <div class="dropdown">
            <input type="text"
                   autocomplete="off"
                   ref="input"
                   class="form-control has-feedback"
                   v-model="input"
                   @keyup="keyupHandler"
                   @input="inputHandler"
                   @focus="listVisible = true;"
                   :placeholder="placeholder"
                   :disabled="disabled"
                   :maxlength="maxlength"/>
            <span v-if="!disabled" class="glyphicon glyphicon-remove form-control-feedback text-muted" @click="empty"></span>
            <template v-if="listVisible">
                <ul ref="list" class="dropdown-menu" v-show="list.length>0">
                    <li v-for="(item, index) in list"
                        @click="select(item,$event)" :key="index">
                        <a>
                            {{renderMethod(item)}}
                        </a>
                    </li>
                </ul>
                <ul ref="list" class="dropdown-menu" v-show="list.length===0">
                    <li class="noResult">{{emptyText}}</li>
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
    import watch from './module/watch';
    import {debounce} from 'throttle-debounce';
    export default {
        name: 'auto-complete',
        mixins: [props, data, computed, methods, watch],
        model: {
            prop: 'value',
            event: 'change'
        },
        created() {
            this.initSelected();
            this.fetchData();
            window.addEventListener('click', this.clickHandler);
            this.inputHandler = debounce(this.debounce, ()=>{
                this.fetchData(this.input);
            });
        },
        beforeDestroy(){
            window.removeEventListener('click', this.clickHandler);
        }
    };

</script>
<style scoped src="../style.css"></style>
