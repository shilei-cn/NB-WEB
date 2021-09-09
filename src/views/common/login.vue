<template>
  <div>
  <div class="g-logo limit-container">
    <div class="g-logo-center">
    <p class="m-logo-p">NB GateWay</p>
    </div>
  </div>
  <div id="global-bg">
    <div class="login-main" align="center" width="400px" id="login-container">
      <h2 class="login-title">用户登录</h2>
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" status-icon>
        <el-form-item prop="userName" style="width: 270px; height: 34px;">
          <el-input v-model="dataForm.userName" placeholder="帐号"></el-input>
        </el-form-item>
        <el-form-item prop="password" style="width: 270px; height: 34px;">
          <el-input
            v-model="dataForm.password"
            type="text"
            autocomplete="new-password"
            ref="confirmPassword"
            v-if="hackConfirmPassword"
            :showPassword="showConfirmPassword"
            @input="(value) => {showPassword(value, 'confirmPassword')}"
            placeholder="密码">
          </el-input>
        </el-form-item>
        <el-form-item prop="captcha" style="width: 270px; height: 34px;">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-input v-model="dataForm.captcha" placeholder="验证码">
              </el-input>
            </el-col>
            <el-col :span="10" class="login-captcha">
              <img :src="captchaPath" @click="getCaptcha()" alt="" style="width: 132px; height: 36px">
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn-submit" type="primary" @click="dataFormSubmit()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  </div>
</template>

<script>
  import { getUUID } from '@/utils'
  export default {
    data () {
      return {
        showConfirmPassword: false,
        hackConfirmPassword: true,
        dataForm: {
          userName: '',
          password: '',
          uuid: '',
          captcha: ''
        },
        dataRule: {
          userName: [
            { required: true, message: '帐号不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ],
          captcha: [
            { required: true, message: '验证码不能为空', trigger: 'blur' }
          ]
        },
        captchaPath: ''
      }
    },
    created () {
      this.getCaptcha()
    },
    methods: {
      // 提交表单
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl('/sys/login'),
              method: 'post',
              data: this.$http.adornData({
                'username': this.dataForm.userName,
                'password': this.dataForm.password,
                'uuid': this.dataForm.uuid,
                'captcha': this.dataForm.captcha
              })
            }).then(({data}) => {
              if (data && data.retCode === 0) {
                this.$cookie.set('token', data.token)
                this.$router.replace({ name: 'home' })
              } else {
                this.getCaptcha()
                this.$message.error(data.retMsg)
              }
            })
          }
        })
      },
      // 获取验证码
      getCaptcha () {
        this.dataForm.uuid = getUUID()
        this.captchaPath = this.$http.adornUrl(`/captcha.jpg?uuid=${this.dataForm.uuid}`)
      },
      showPassword (value, type) {
        if (value !== '' && !this.showConfirmPassword) {
          // type 为 password
          this.showConfirmPassword = true
        } else if (value === '' && this.showConfirmPassword) {
          // 重建并获取焦点
          this.hackConfirmPassword = false
          this.$nextTick(() => {
            this.hackConfirmPassword = true
            setTimeout(() => {
              this.$refs.confirmPassword.$el.children[0].focus()
            }, 5)
          })
          // type 为 text
          this.showConfirmPassword = false
        }
      }
    }
  }
</script>

<style lang="scss">
  .site-wrapper.site-page--login {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    // background-color: rgba(38, 50, 56, .6);
    overflow: hidden;

    .login-main {
      position: absolute;
      top: 0;
      right: 0;
      padding: 150px 60px 180px;
      width: 470px;
      min-height: 100%;
      background-color: #fff;
    }
    .login-title {
      font-size: 30px !important;
      line-height: 45px;
      font-weight: bold;
      font-weight: 300;
    }
    .login-captcha {
      overflow: hidden;
      > img {
        width: 100%;
        cursor: pointer;
      }
    }
    .login-btn-submit {
      width: 100%;
      margin-top: 38px;
    }
    #login-brand-info {
      margin: 200px 0px 0 90px;
      color: rgb(0, 0, 0);
    }
    #login-brand-info__text {
      margin:  0 0 22px 0;
      font-size: 33px;
      font-weight: 400;
      text-transform : uppercase;
    }
    #login-brand-info__intro {
      margin: 10px 0;
      font-size: 16px;
      line-height: 1.58;
      opacity: .6;
    }
  }
  #login-container {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -150px 0 0 -175px;
    width: 350px;
    height: 310px;
    border-radius: 5px;
    background: #fdfdfd;
  }
  #global-bg {
   
    position: relative;
    width: 100%;
    height: 420px;
  }
  .g-logo{
    height: 81px;
    margin: 10px auto;
    margin-left: 15px;
  }
  .g-logo-center{
    position: relative;
    width: 100%;
    height: 81px;
    margin: 0 auto;
  }
  .g-logo-bottom{
    margin-bottom: 45px;
  }
  .m-logo{
    position: absolute;
    left: 0;
    top: 20px;
    width: 198px;
    height: 40px;
  }
  .m-logo-line{
    position: absolute;
    left: 221px;
    top: 27px;
    width: 1px;
    height: 28px;
    border-right: 1px solid #b7b7b7;
  }
  .m-logo-p{
    position: absolute;
    left: 240px;
    top: 0;
    height: 81px !important;
    font-size: 22px !important;
    line-height: 45px;
    // color: #595959;
    color:darkslategrey;
  }
  .m-land{
    position:relative;
    width: 100%;
    height: 420px;
    /*background: url(../../img/login/banner.png) no-repeat center;*/
  }
  .img-box-pos {
    position:absolute;
    left:50%;
    top:0;
  }
  .img-box {
    display:inline;
    position:relative;
  }
  .login-bg {
    margin-left:-50%;
    display:none;
  }
  .m-land-center{
    position: absolute;
    left:50%;
    top:0;
    width:992px;
    height: 420px;
    z-index:2;
    margin-left:-496px;
  }
  .login-box {
    position:absolute;
    top:40px;
    right:0;
    width:312px;
    height:350px;
  }
  /* .m-pointer{
    position: absolute;
    right: 334px;
    top: 435px;
    width: 150px;
    height: 61px;
    background: url(../../img/login/integration.png) -883px -11px;
    z-index: 1000000;
  } */
</style>
