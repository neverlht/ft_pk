<template>
  <div class="center-panel">
    <Card :bordered="false" style="height: 100%;overflow-y: auto">
      <p slot="title">战斗记录</p>
      <p v-for="log in logs">{{log}}</p>
    </Card>
  </div>
</template>

<script>
    export default {
      name: "centerPanel",
      data() {
        return {
          logs:[]
        }
      },
      created(){
      },
      methods: {
        showLogs(data){
          this.logs = [];
          let time = setInterval(() => {
            if(data&&data.length>0){
              this.logs.push(data.shift());
            }else{
              clearInterval(time);
            }
          }, 500);
        }
      }
    }
</script>

<style scoped>
  .center-panel{
    height: 100%;
    padding: 10px;
    background: #EFEFEF;
  }
</style>
