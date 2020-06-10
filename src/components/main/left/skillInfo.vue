<template>
  <div>
    <div class="skill-info">
      <div v-for="skill in skillList" class="skill-info-box" :class="{'disabled':(costTotal+skill.cost>10)&&!skill.checked}" @click="chooseSkill(skill)">
        <Tooltip placement="bottom" >
          <img class="skill-info-icon" :class="{'skill-checked':skill.checked}" :src="'http://fairytale.oss-cn-hangzhou.aliyuncs.com/ftpk/skill/'+skill.icon">
          <Icon v-if="skill.checked" class="skill-info-box-flag" type="md-checkbox" />
          <div slot="content">
            <p>{{skill.name}}</p>
            <pre>{{skill.description}}</pre>
          </div>
        </Tooltip>
      </div>
    </div>
    <Row style="float: right;margin-right: 40px">
      <Button @click="save" type="warning">保存</Button>
    </Row>
  </div>

</template>

<script>
    export default {
      name: "skillInfo",
      props:{
      },
      computed:{
        costTotal(){
          let result = 0;
          for(var skill of this.skillList){
            if(skill.checked){
              result+=skill.cost;
            }
          }
          return result;
        }
      },
      data() {
        return {
          skillList:[]
        }
      },
      created(){
        this.loadData();
      },
      methods: {
        save(){
          this.request.post({
            url:"/skill/save",
            data:this.skillList
          }).then((response)=>{
            this.$Message.success("保存成功");
            this.loadData();
          });
        },
        chooseSkill(skill){
          let flag = !skill.checked?1:-1;
          if(this.costTotal+flag*skill.cost<=10){
            skill.checked = !skill.checked;
          }
        },
        loadData(){
          this.request.get({
            url:"/skill/current"
          }).then((response)=>{
            this.skillList = response.data;
          });
        }
      }
    }
</script>

<style scoped>
  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    width: 230px;
  }
  .disabled .skill-info-icon{
    opacity:0.5;
  }
  .disabled .skill-info-icon:hover{
    cursor: not-allowed!important;
  }
  .skill-info{
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
  }
  .skill-info-box{
    width: 50px;
    height: 50px;
    margin: 5px;
    position: relative;
  }
  .skill-info-icon{
    border-radius: 25px;
    width: 50px;
    height: 50px;
    border: 2px solid #FFFFFF;
  }
  .skill-info-icon:hover{
    cursor: pointer;
    border: 2px solid #91d5ff;
  }
  .skill-info-box-flag{
    font-size: 18px;
    position: absolute;
    color: #feff00;
    right: -5px;
    top: -5px;
  }
  .skill-checked{
    border: 2px solid #feff00;
  }
</style>
