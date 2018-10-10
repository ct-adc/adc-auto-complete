import Vue from 'vue';
import AutoComplete from 'local/main.vue';

new Vue({
    el: '#app',
    components: {
        AutoComplete
    },
    data: {
        data1: {
            list: [{code: 1, name: 1}, {code: 2, name: 2}],
            keys: ['code', 'name'],
            matchKeys: ['code', 'name'],
            showKeys: ['name'],
            allForEmpty: true,
            value: {code: 2},
            placeholder: '请输入位置类型，或者位置ID或名称'
        },
        data2: {
            list: [{code: 1, name: 1}, {code: 2, name: 2}],
            keys: ['code', 'name'],
            matchKeys: ['code', 'name'],
            showKeys: ['name'],
            allForEmpty: true,
            value: {},
            placeholder: '请输入位置类型，或者位置ID或名称'
        }
    },
    methods: {
        selectData1(item) {
            console.log('select', item);
        },
        selectData2(value) {
            this.data2.value = value;
            this.data1.value = {code: 1};
        },
        change(item) {
            console.log('change', item);
        },
        clear() {
            console.log('clear');
        }
    }
});
