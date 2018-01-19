import Vue from 'vue';
import AutoComplete from 'main.vue';

Vue.component(AutoComplete.name, AutoComplete);

const list = [
    {
        Id: 1,
        Name: 'one'
    },
    {
        Id: 2,
        Name: 'two'
    },
    {
        Id: 3,
        Name: 'three'
    }, {
        Id: '',
        Name: '空值'
    }, {
        Id: 'case insensitive',
        Name: 'abs'
    }
];
const a = new Vue({
    el: '#app',
    data: {
        list: [],
        keys: ['Id', 'Name'],
        matchKeys: ['Id', 'Name'],
        showKeys: ['Id', 'Name'],
        allForEmpty: true,
        value: {Id: 1},
        placeholder: '请选择游戏'
    },
    methods: {
        select: function(item) {
            this.value = item;
        },
        getValue: function() {
            console.log(this.$refs.autoC.getValue());
        },
        reset: function() {
            this.value = {};
        },
        setValue: function() {
            this.value = {Id: 1};
        },
        setValueToString: function() {
            this.value = 'ruby';
        },
        change: function(item) {
            console.log(JSON.stringify(item));
        },
        search: function() {
            console.log('search');
            console.log(this.$refs.autoC.getValue());
        }
    }
});

setTimeout(function() {
    a.list = list;
}, 3000);
