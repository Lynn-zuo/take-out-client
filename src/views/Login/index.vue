<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
          <h2 class="login_logo">开心外卖</h2>
          <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay=false">密码登录</a>
          </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on: loginWay}">
              <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!isrightPhone" class="get_verification" :class="{right_phone: isrightPhone}"
                @click.prevent="getCode">{{computerTime>0 ? `已发送(${computerTime})s` : '获取验证码'}}</button>
              </section>
              <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
              </section>
              <section class="login_hint">
              温馨提示：未注册好吃外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
              </section>
          </div>
          <div :class="{on: !loginWay}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="密码" v-model="pwd" v-if="showPwd">
                <input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-else>
                  <div class="switch_button" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
                    <div class="switch_circle" :class="{right: showPwd}"></div>
                  <span class="switch_text">{{showPwd?'abc':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://140.143.133.253:4000/captcha" alt="captcha"
                  @click="getCaptcha" ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-arrow_left"></i>
      </a>
    </div>
    <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"/>
  </section>
</template>

<script>
import AlertTip from '@/components/AlertTip'
import {reqSendCode, reqSmsLogin, reqPwdLogin} from '../../api'
export default {
  name:'',
  data () {
    return {
      loginWay: false, // true代表短信登录，false代表密码登录
      computerTime: 0, // 计时的时间
      showPwd: false, // 是否显示密码
      phone: '', // 手机号
      code: '', // 短信验证码
      name: '', // 用户名
      pwd: '', // 密码
      captcha: '', // 一次性图形验证码
      alertText: '', // 提示文本
      alertShow: false // 是否显示提示框
    }
  },
  computed:{
    isrightPhone () {
      return /^1\d{10}$/.test(this.phone)
    }
  },
  methods:{
    // 异步获取短信验证码
    async getCode () {
      // 如果当前没有计时
      if(!this.computerTime){
        // 启动倒计时
        this.computerTime = 30
        this.intervalId = setInterval(() => {
          this.computerTime--
          if(this.computerTime <=0){
            // 停止计时
            clearInterval(this.intervalId)
          }
        }, 1000)
        // 发送ajax请求 (向指定手机号发送验证码短信)
        const smsCode = await reqSendCode(this.phone)
        // console.log(smsCode.code)
        if(smsCode.code === 1){
          // 显示提示
          // console.log(smsCode.msg)
          this.showAlert (smsCode.msg)
          // 停止计时
          if(this.computerTime>0) {
            this.computerTime=0
            clearInterval(this.intervalId)
            // this.intervalId=undefined
          }
        }
      }
    },
    showAlert (alertText) {
      this.alertShow = true
      this.alertText = alertText
    },
    closeTip () {
      this.alertShow = false
      this.alertText = ''
    },
    // 获取一个新的图形验证码
    getCaptcha () {
      // 每次指定的src值要不一样
      // 此处没有ajax请求，所以不涉及我们要考虑的ajax跨域问题
      this.$refs.captcha.src = 'http://140.143.133.253:4000/captcha?time=' + Date.now()
    },
    // 异步登录
    async login () {
      let result_login
      // 前台表单验证
      if(this.loginWay) { // 短信登陆
        const {isrightPhone, phone, code} = this
        if(!this.isrightPhone) {
          // 手机号不正确
          this.showAlert('手机号不正确')
          return
        } else if(!/^\d{6}$/.test(code)) {
          // 验证码必须是6位数字
          this.showAlert('验证码必须是6位数字')
          return
        } else {
          // 发送ajax请求短信登录
          result_login = await reqSmsLogin (phone, code)
        }
      } else { // 用户名密码登录
        const {name, pwd, captcha} = this
        if(!this.name) {
          // 用户名必须指定
          this.showAlert('用户名必须指定')
          return
        } else if (!this.pwd) {
          // 密码错误
          this.showAlert('密码错误')
          return
        } else if (!captcha) {
          // 图形验证码错误
          this.showAlert('图形验证码错误')
          return
        } else {
          // 发送ajax请求短信登录
          result_login = await reqPwdLogin ({name, pwd, captcha})
        }
      }
      // 停止计时
      if(this.computerTime>0) {
        this.computerTime=0
        clearInterval(this.intervalId)
        // this.intervalId=undefined
      }
      console.log(result_login)
      // 根据结果处理数据
      if(result_login.code === 0) {
        const user = result_login.data
        // console.log(user)
        // 将user保存到vuex的state
        this.$store.dispatch('savaUserInfo', user)
        // 登录路由跳转界面去个人中心界面
        this.$router.replace('/profile')
      } else {
        // 显示新的图形验证码
        this.getCaptcha ()
        // 显示警告信息
        const msg = result_login.msg
        this.showAlert(msg)
        // 清空图形验证码输入框框
        this.captcha = ''
      }
    }
  },
  components: {
    AlertTip
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #3399FF
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #3399FF
            font-weight 700
            border-bottom 2px solid #3399FF
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #3399FF
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.right_phone
                color black
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color .3s,border-color .3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #3399FF
              >.switch_circle
                //transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                transition transform .3s
                &.right
                  transform translate(30px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #3399FF
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #3399FF
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 28px
        color #999
</style>
