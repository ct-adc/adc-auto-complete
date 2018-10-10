export default {
    props: {
        placeholder: {
            type: String,
            default: ''
        },
        maxlength: {
            type: Number,
            default: 100000
        },
        value: {
            type: [Object, String],
            default(){
                return {};
            }
        },
        disabled: {
            type: Boolean,
            default: false
        },
        remoteMethod: {
            type: Function,
            required: true
        },
        renderMethod: {
            type: Function,
            required: true
        },
        valueMethod: {
            type: Function,
            required: true
        },
        autoClear: {
            type: Boolean,
            default: true
        },
        debounce: {
            type: Number,
            default: 250
        }
    }
};
