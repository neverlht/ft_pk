<template>
  <div>
    <div class="content-info">
      <Row class="content-info-row">
        <Col span="12">
          <Tag color="success">{{player.name}}</Tag>
        </Col>
        <Col span="12">
          <Tag color="error">【{{player.talentName==''?'无':player.talentName}}】</Tag>
        </Col>
      </Row>
      <Row class="content-info-row">
        <Col span="12">
          <Icon type="ios-heart" /><span>气血</span>
          {{player.hp}}
        </Col>
        <Col span="12">
          <Icon type="ios-beaker-outline" /><span>魔法</span>
          {{player.mp}}
        </Col>
      </Row>
      <Row class="content-info-row">
        <Col span="12">
          <Icon type="md-color-filter" /><span>攻击</span>
          {{player.attack}}
        </Col>
        <Col span="12">
          <Icon type="logo-html5" /><span>防御</span>
          {{player.def}}
        </Col>
      </Row>
      <Row class="content-info-row">
        <Col span="12">
          <Icon type="ios-flash-outline" /><span>法伤</span>
          {{player.fashang}}
        </Col>
        <Col span="12">
          <Icon type="ios-infinite" /><span>法防</span>
          {{player.fafang}}
        </Col>
      </Row>
      <Row class="content-info-row">
        <Col span="12">
          <Icon type="ios-nutrition" /><span>物爆</span>
          {{player.wubao}}
        </Col>
        <Col span="12">
          <Icon type="ios-nuclear" /><span>法爆</span>
          {{player.fabao}}
        </Col>
      </Row>
      <Row class="content-info-row">
        <Col span="12">
          <Icon type="md-paw" /><span>速度</span>
          {{player.speed}}
        </Col>
      </Row>
    </div>
    <br>
    <div class="role-chart">
      <chart ref="roleChart" :options="roleChartOp" :auto-resize="true"></chart>
    </div>
  </div>
</template>

<script>
  let option = {
    title: {
      text: '能力展示图',
      textStyle:{
        color:'#fff',
      }
    },
    tooltip: {},
    legend: {
      data: ['能力展示图']
    },
    color:['#f9fe00'],
    radar: {
      name: {
        textStyle: {
          color: '#fff',
          backgroundColor: '#9680ef',
          borderRadius: 3,
          padding: [3, 5]
        }
      },
      indicator: [
        { name: '气血', max: 9100},
        { name: '攻击', max: 2100},
        { name: '防御', max: 1300},
        { name: '法伤', max: 2100},
        { name: '法防', max: 1300},
        { name: '法爆', max: 15},
        { name: '物爆', max: 15},
        { name: '速度', max: 900}
      ]
    },
    series: [{
      name: '属性图',
      type: 'radar',
      data : [
        {
          value : [],
          name : '四号的属性'
        }
      ]
    }]
  };
    export default {
      name: "roleInfo",
      props:{
        player:{}
      },
      data() {
        return {
          roleChartOp:option
        }
      },
      created(){
        this.roleChartOp.series[0].data[0].value=[];
      },
      methods: {
        refresh(){
          this.roleChartOp.series[0].data[0].value=[];
          this.roleChartOp.series[0].data[0].value.push(this.player.hp);
          this.roleChartOp.series[0].data[0].value.push(this.player.attack);
          this.roleChartOp.series[0].data[0].value.push(this.player.def);
          this.roleChartOp.series[0].data[0].value.push(this.player.fashang);
          this.roleChartOp.series[0].data[0].value.push(this.player.fafang);
          this.roleChartOp.series[0].data[0].value.push(this.player.fabao);
          this.roleChartOp.series[0].data[0].value.push(this.player.wubao);
          this.roleChartOp.series[0].data[0].value.push(this.player.speed);
          this.$refs.roleChart.refresh();
        }
      }
    }
</script>

<style scoped>
  .content-info-row{
    text-align: center;
    font-size: 14px;
    color: #FFFFFF;
  }
</style>
