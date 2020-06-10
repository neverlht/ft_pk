<style scoped>

</style>
<template>
  <div style="text-align: center;padding: 20px">

    <Row>
      <h2>用户注册</h2>
    </Row>
    <br>
    <Row>
      <Col span="12" offset="6">
        <Alert type="warning">目前只开放邀请码注册方式，完全开放等待测试完成之后……</Alert>
        <Form ref="regForm" :rules="regFormRules" :model="regForm" label-position="right" :label-width="80">
          <Form-item label="用户名" prop="username">
            <Input v-model="regForm.username" >
            </Input>
          </Form-item>
          <Form-item label="密码" prop="password">
            <Input v-model="regForm.password" type="password">
            </Input>
          </Form-item>
          <Form-item label="确认密码" prop="repassword">
            <Input v-model="regForm.repassword" type="password">
            </Input>
          </Form-item>
          <Form-item label="姓名" prop="realName">
            <Input v-model="regForm.realName">
            </Input>
          </Form-item>
          <Form-item label="邮箱" prop="email">
            <Input v-model="regForm.email">
            </Input>
          </Form-item>
          <Form-item label="邀请码" prop="invitationCode">
            <Input v-model="regForm.invitationCode">
            </Input>
          </Form-item>
        </Form>
        <Row>
          <Button type="success" long @click="submit">注册</Button>
        </Row>
      </Col>
    </Row>

  </div>
</template>
<script type="text/babel">
  export default {
        data() {
            const validatePass = (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入密码'));
              } else {
                let pattern = /^[a-zA-Z0-9]{6,20}$/;
                let valiReg = pattern.test(value);
                if(!valiReg){
                  callback(new Error('密码不能为空,长度6-20位字母数字'));
                }else{
                  if (this.regForm.repassword !== '') {
                    // 对第二个密码框单独验证
                    this.$refs.regForm.validateField('repassword');
                  }
                  callback();
                }
              }
            };
            const validatePassCheck = (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入确认密码'));
              } else if (value !== this.regForm.password) {
                callback(new Error('两次输入密码不一致'));
              } else {
                callback();
              }
            };
            return {
              regForm:{
                username:"",
                email:"",
                password:"",
                repassword:"",
                invitationCode:"",
                realName:""
              },
              regFormRules: {
                username:[
                  { required: true,pattern:/^[a-z]\w{5,19}$/,message: '用户名为字母数字下划线组成，长度6-20位', trigger: 'blur' },
                ],
                password: [
                  { required: true, message: '密码不能为空', trigger: 'blur' },
                  { validator: validatePass, trigger: 'blur' }
                ],
                repassword: [
                  { required: true,pattern:/^[a-zA-Z0-9]+$/,min:6,max:20, message: '密码不能为空,长度6-20位字母数字', trigger: 'blur' },
                  { validator: validatePassCheck, trigger: 'blur' }
                ],
                invitationCode: [
                  { type:'string',pattern:/^[a-zA-Z0-9]+$/,required: true,len:8, message: '邀请码为8位数字字母无特殊字符', trigger: 'blur' },
                ],
                realName: [
                  { type:'string',required: true,max:10,min:2, message: '姓名不能为空，长度2-10个字符', trigger: 'blur' },
                ],
                email: [
                  { required: true, message: '不能为空', trigger: 'blur' },
                  { type: 'email', message: '请输入正确邮箱', trigger: 'blur' }
                ]
              }
            }
        },
        created(){
        },
        methods: {
          submit(){
            this.request.post({
              url:"/regUser",
              data:this.regForm
            }).then((response)=>{
              this.$Message.success("注册成功！即将跳转登陆页面");
              this.$router.push("/");
            });
          }
        }
    };
</script>
