export default {
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
    }
};
