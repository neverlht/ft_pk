<template>
  <div class="right-panel">
    <Tabs value="roleList">
      <TabPane label="角色列表" name="roleList">
        <CellGroup @on-click="attack">
          <Cell v-for="role in roleList" :title="'【'+role.talentName+'】'+role.name" :name="role.id+'@'+role.name">
            <Badge :count="role.success" type="success" show-zero slot="extra" />
            <Badge style="padding-left: 5px" :count="role.failed" show-zero slot="extra" />
          </Cell>
        </CellGroup>
      </TabPane>
      <TabPane label="超神榜" name="csList">
        <CellGroup @on-click="attack">
          <Cell v-for="cs in csList" :title="'【'+cs.talentName+'】'+cs.name" :name="cs.id+'@'+cs.name">
            <Badge :count="cs.success" type="success" show-zero slot="extra" />
          </Cell>
        </CellGroup>
      </TabPane>
      <TabPane label="超鬼榜" name="cgList">
        <CellGroup @on-click="attack">
          <Cell v-for="cg in cgList" :title="'【'+cg.talentName+'】'+cg.name" :name="cg.id+'@'+cg.name">
            <Badge :count="cg.failed" show-zero slot="extra" />
          </Cell>
        </CellGroup>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
    export default {
      name: "rightPanel",
      data() {
        return {
          roleList:[],
          csList:[],
          cgList:[]
        }
      },
      created(){
        this.loadData();
      },
      methods: {
        attack(name){
          let names = name.split("@");
          let id = names[0];
          let nameText = names[1];
          this.$Modal.confirm({
            title: '发起攻击',
            content: '<p>确认对'+nameText+'发起攻击吗？</p>',
            onOk: () => {
              this.request.post({
                url:"/flight/solo/"+id,
              }).then((response)=>{
                this.$emit("after-flight",response.data);
              });
            }
          });
        },
        loadData(){
          this.loadRoleList();
          this.loadCSList();
          this.loadCGList();
        },
        loadRoleList(){
          this.request.get({
            url:"/user/playerList"
          }).then((response)=>{
            this.roleList = response.data;
          });
        },
        loadCSList(){
          this.request.get({
            url:"/user/playerCSList"
          }).then((response)=>{
            this.csList = response.data;
          });
        },
        loadCGList(){
          this.request.get({
            url:"/user/playerCGList"
          }).then((response)=>{
            this.cgList = response.data;
          });
        }
      }
    }
</script>

<style scoped>
  .right-panel{
    height: 100%;
    border-left: 1px solid #EFEFEF;
    padding: 10px;
  }
</style>
