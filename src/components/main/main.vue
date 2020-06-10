<style scoped>
  .content{
    height: 100%;
  }

  .head-info{
    display: flex;
    padding: 10px;
  }
  .head-info-img{
  }
  .head-info-img img{
    border-radius:40px;
    border:2px solid #FFFFFF;
  }
  .head-info-title{
    width: 100%;
    text-align: center;
  }
  .head-info-title-up{
    color: #FFFFFF;
    font-size: 20px;
    line-height: 40px;
  }
  .head-info-title-down{
    line-height: 40px;
  }
  .content-info-row{
    text-align: center;
    font-size: 14px;
    color: #FFFFFF;
  }
</style>
<template>
  <div class="content">
    <Row style="height: 100%">
      <Col span="7" style="height: 100%">
        <LeftPanel></LeftPanel>
      </Col>
      <Col span="11" style="height: 100%">
        <CenterPanel ref="center"></CenterPanel>
      </Col>
      <Col span="6" style="height: 100%;">
        <RightPanel @after-flight="afterFlight"></RightPanel>
      </Col>
    </Row>
  </div>
</template>
<script type="text/babel">
  import LeftPanel from './leftPanel'
  import RightPanel from './rightPanel'
  import CenterPanel from './centerPanel'
  export default {
        components:{LeftPanel,RightPanel,CenterPanel},
        data() {
            return {
            }
        },
        created(){
          // this.loadUserInfo();
        },
        methods: {
          loadCurrentUserInfo(){
            this.request.get({
              url:"/user/current"
            }).then((response)=>{
            });
          },
          afterFlight(data){
            this.$refs['center'].showLogs(data);
          }
        }
    };
</script>
