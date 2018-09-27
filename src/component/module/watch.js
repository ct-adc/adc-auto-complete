import utility from 'ct-utility';

export default {
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
            if (newVal !== oldVal && !this.autoClear && utility.base.isEmptyObject(this.selected)){
                this.$emit('change', this.input);
            }
        }
    }
};
