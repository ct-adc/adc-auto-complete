import Vue from 'vue';
import {remote as AutoComplete} from 'index.js';

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
        Id: 4,
        Name: 'four'
    }, {
        Id: '',
        Name: '空值'
    }, {
        Id: 'case insensitive',
        Name: 'abs'
    }
];

new Vue({
    el: '#app',
    data: {
        value: {
            Id: 3,
            Name: 'three'
        },
        timeout: null
    },
    methods: {
        remoteMethod(query = ''){
            return new Promise((resolve, reject)=>{
                clearTimeout(this.timeout);
                this.timeout = setTimeout(()=>{
                    const filtered = list.filter(item=>(item.Id + '').indexOf(query) > -1 || item.Name.indexOf(query) > -1);

                    if (Math.random() > 0.3){
                        resolve(filtered);
                    } else {
                        reject('加载出错');
                    }
                }, 1000);
            });
        },
        renderMethod(item){
            return `${item.Id}(${item.Name})`;
        },
        valueMethod(item){
            return `${item.Id}(${item.Name})`;
        },
        setValueToString(){
            this.value = 'ejfiejfe';
        },
        setValue(){
            this.value = {
                Id: 2,
                Name: 'two'
            };
        },
        changeHandler(){
            console.log('change');
        },
        selectHandler(){
            console.log('select');
        },
        clearHandler(){
            console.log('clear');
        }
    }
});
