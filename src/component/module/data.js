export default {
    data() {
        return {
            input: '', // input框中的内容
            listVisible: false, // 下拉框是否可见
            selected: {}, // 选中的项
            focusFlag: false // 当发生focus事件时设置该flag为true
        };
    }
};
