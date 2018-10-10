import utility from 'ct-utility';

export default {
    methods: {
        initSelected(){
            if (typeof this.value === 'string'){
                this.input = this.value;
                this.selected = {};
            } else {
                this.selected = JSON.parse(JSON.stringify(this.value));
                if (!utility.base.isEmptyObject(this.selected)){
                    this.input = this.valueMethod(this.value);
                } else {
                    this.input = '';
                }
            }
        },
        empty(){
            this.selected = {};
            this.input = '';
            this.$emit('clear');
        },
        fetchData(query){
            this.loading = true;
            this.list = [];
            this.remoteMethod(query).then(data=>{
                this.loading = false;
                this.list = data;
                this.loadMsg = '';
            }).catch(msg=>{
                this.loading = false;
                this.list = [];
                this.loadMsg = msg;
            });
        },
        select(item, e){
            e.stopPropagation();
            this.$emit('select', item);
            this.$emit('change', item);
            this.selected = item;
            this.input = this.renderMethod(item);
            this.listVisible = false;
        },
        clickHandler(event){
            if (event.target !== this.$refs.input){
                this.listVisible = false;
                this.selectIfHideList();
            }
        },
        selectIfHideList(){
            const selectedIsEmpty = utility.base.isEmptyObject(this.selected);
            const deleteButAutoClear = this.autoClear && !utility.base.isEmptyObject(this.selected) && this.valueMethod(this.selected).indexOf(this.input) > -1;
            const notChange = !utility.base.isEmptyObject(this.selected) && this.valueMethod(this.selected) === this.input;

            if (notChange || deleteButAutoClear){
                this.input = this.valueMethod(this.selected);
            } else if (this.autoClear && selectedIsEmpty){
                this.selected = {};
                this.input = '';
            } 
        },
        keyupHandler(e){
            if (e.key === 'Enter'){
                this.listVisible = false;
                this.selectIfHideList();
            } else if (!this.autoClear){
                this.$emit('change', this.input);
            }
        }
    }
};
