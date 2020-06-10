<template>
  <div class="left-panel">
    <div class="head-info">
      <div class="head-info-img">
        <img src="../../assets/img/lht.jpg" height="80" width="80"/>
      </div>
      <div class="head-info-title">
        <div class="head-info-title-up">
          <span>{{user.realName}}</span>
        </div>
        <div class="head-info-title-down">
          <Tag color="warning">剩余生成角色次数:{{user.genTimes}}</Tag>
          <Button icon="md-aperture" style="margin-left: 20px" type="success" shape="circle" @click="genRole" :disabled="user.genTimes<=0"></Button>
        </div>
      </div>
    </div>
    <Tabs id="leftPanelTabs">
      <TabPane label="角色" icon="ios-person-outline">
        <div v-if="!noRole">
          <RoleInfo :player="user.defaultPlayer" ref="roleInfo"></RoleInfo>
        </div>
        <div v-if="noRole">
          <div class="norole-alert">
            <Alert show-icon>
              <div style="display: flex;line-height: 32px">
                您当前还没有角色，请生成角色。<Icon type="md-return-right" style="line-height: 32px"/>
                <Button icon="md-aperture" style="margin-left: 20px" type="success" shape="circle" :disabled="user.genTimes<=0" @click="genRole"></Button>
              </div>
              <Icon type="ios-bulb-outline" slot="icon" style="line-height: 32px"></Icon>
            </Alert>
          </div>
        </div>
      </TabPane>
      <TabPane label="技能" icon="md-color-wand">
        <SkillInfo></SkillInfo>
      </TabPane>
    </Tabs>

  </div>
</template>

<script>

    import RoleInfo from "./left/roleInfo"
    import SkillInfo from "./left/skillInfo"
    export default {
      name: "leftPanel",
      components:{RoleInfo,SkillInfo},
      data() {
        return {
          user:{},
          noRole:true,
          genName:''

        }
      },
      created(){
        this.loadData();
      },
      methods: {
        genRole(){
          this.$Modal.confirm({
            render: (h) => {
              return h('Input', {
                props: {
                  value: this.genName,
                  autofocus: true,
                  placeholder: '请输入生成的角色名称（长度2-8）'
                },
                on: {
                  input: (val) => {
                    this.genName = val;
                  }
                },

              })
            },
            onOk: () => {
              this.request.post({
                url:"/user/genPlayer",
                data:{name:this.genName}
              }).then((response)=>{
                this.loadData();
              });
            }
          });
        },
        loadData(){
          this.request.get({
            url:"/user/current"
          }).then((response)=>{
            let userDto = response.data;
            this.user = userDto;
            if(userDto.defaultPlayer){
              this.noRole = false;
              this.$nextTick(()=>{
                this.$refs.roleInfo.refresh();
              });
            }else{
              this.noRole = true;
            }
          });
        }
      }
    }
</script>

<style scoped>

  .left-panel{
    height: 100%;
    background: #383b42;
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

  .norole-alert{
    padding: 5px 20px 5px 20px;
  }
  .ivu-alert.ivu-alert-with-icon{
    padding-right: 10px;
  }
  .role-chart{
  }
</style>
<style>
  .echarts{
    width: 100%!important;
  }
  #leftPanelTabs .nav-text .ivu-tabs-ink-bar{
    background-color: #efff00;
  }
  #leftPanelTabs .ivu-tabs-nav .ivu-tabs-tab-active{
    color: #efff00!important;
  }
  #leftPanelTabs .ivu-tabs-nav .ivu-tabs-tab{
    color: #FFFFFF;
  }
</style>
