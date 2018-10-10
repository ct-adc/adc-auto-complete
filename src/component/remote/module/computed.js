export default {
    computed: {
        emptyText(){
            if (this.loading){
                return '加载中';
            } else if (this.loadMsg !== ''){
                return this.loadMsg;
            } else if (this.list.length === 0){
                return '没有数据';
            }
        }
    }
};
