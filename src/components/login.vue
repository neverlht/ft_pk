<style scoped>
    .login-box{
        padding-top: 150px;
    }
    .title{
        text-align: center;
        font-size: 18px;
        letter-spacing: 15px;
        font-weight: bolder;
    }
</style>
<template>
  <div>
     <Row class="login-box">
        <Col span="6" offset="9">
            <Card>
                <p slot="title" class="title">登录</p>
                <Form :model="loginForm" label-position="right" :label-width="60">
                    <Form-item label="用户名">
                        <Input v-model="loginForm.username">
                            <Icon type="ios-person-outline" slot="prepend" size="18"></Icon>
                        </Input>
                    </Form-item>
                    <Form-item label="密  码">
                        <Input v-model="loginForm.password" type="password" @on-enter="login">
                            <Icon type="ios-lock-outline" slot="prepend"  size="18"></Icon>
                        </Input>
                    </Form-item>
                </Form>
                <Row>
                  <Button type="success" long @click="login" >登陆</Button>
                </Row>
                <Row style="padding-top:5px">
                  <Button type="error" long @click="reg" >注册</Button>
                </Row>
            </Card>
        </Col>
    </Row>
  </div>
</template>
<script type="text/babel">
  export default {
        data() {
            return {
                token:"",
                loginForm: {
                    username: '',
                    password: '',
                }
            }
        },
        mounted() {

        },
        methods: {
            login(){
                  this.request.post({
                    url:"/login",
                    data:this.loginForm
                  }).then((response)=>{
                    let exp = new Date();
                    exp.setTime(exp.getTime() + 30*24*60*60*1000);
                    document.cookie = "_login_token="+ encodeURI (response.data) + ";expires=" + exp.toGMTString();
                    this.$router.push("/main");
                  });
            },
            reg(){
              this.$router.push("/reg");
            }
        }
    };
</script>
