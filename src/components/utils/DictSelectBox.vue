<template>
  <Select :multiple="multiple" :value="publicValue" @on-change="changeDict" :disabled="!loadFinished">
      <Option v-for="item,index in items" :value="index" :key="item[fieldKey]">{{item[fieldValue]}}</Option>
  </Select>
</template>

<script>
    export default {
        name: "DictSelectBox",
        props:{
          multiple: {
            type: Boolean,
            default: false
          },
          value: {
            type: [String, Number, Array],
            default: ''
          },
          fieldKey:{
            type:String,
            default:"name"
          },
          fieldValue:{
            type:String,
            default:'value'
          },
          //ref 参照 dict 字典
          type:"",
          //参照数据获取url
          url:"",
          //字典code
          code:""
        },
        created(){
          this.init();
        },
        computed: {
          publicValue(){
            let keys = this.value;
            if(!(keys instanceof Array)&&!isNaN(keys)&&keys!='')keys = [keys];
            let indexs = this.items.map((m,index)=>{
              if(keys.indexOf(m[this.fieldKey])>-1){
                return index;
              }
            }).filter(m=>m!==undefined);
            return indexs;
          },
        },
        methods:{
          init(){
            if(this.type =='dict'){
              if(this.code!=''){selectedStore
                this.loadDataByDict();
              }else{
                this.$Message.error("字典编码为空");
                return;
              }
            }else{
              if(this.url){
                this.loadDataByRef();
              }else{
                this.$Message.error("参照url为空");
                return;
              }
            }
          },
          loadDataByDict(){
            this.request.get({
              url:'/api/dictItems/'+this.code,
            }).then((response)=>{
              this.items = response.data;
              this.loadFinished = true;
            });
          },
          loadDataByRef(){
            this.request.get({
              url:this.url,
            }).then((response)=>{
              this.items = response.data;
              this.loadFinished = true;
            });
          },
          changeDict(item){
            if(this.items){
              if(this.multiple){
                let args = this.items.filter((m,index)=>item.indexOf(index)>-1);
                let argsResult = args.map(m=>m[this.fieldKey]);
                this.$emit("input",argsResult);
                this.$emit("on-change",argsResult);
              }else{
                this.$emit("input",this.items[item][this.fieldKey]);
                this.$emit('on-change', this.items[item]);
              }
            }
          }
        },
        data(){
          return{
            items:[],
            selectedValue:"",
            loadFinished:false
          }
        }
    }
</script>

<style scoped>

</style>
