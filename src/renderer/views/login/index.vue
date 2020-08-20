<template>
  <div class="login-container">
    <vue-canvas-nest :config="bgConfig" />
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
      <div class="title-container">
        <div class="title">
          {{ $t('login.title') }}
        </div>
        <!-- <lang-select class="set-language" /> -->
      </div>
      <!-- 用户名 -->
      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          name="username"
          tabindex="1"
          autocomplete="on"
          type="text"
          :placeholder="$t('login.username')"
          size="medium"
        >
          <template slot="prepend">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
          </template>
        </el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-tooltip v-model="capsTooltip" content="大写字母锁定键已开启" placement="right" manual>
        <el-form-item prop="password">
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            :placeholder="$t('login.password')"
            name="password"
            tabindex="2"
            autocomplete="on"
            size="medium"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          >
            <template slot="prepend">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
            </template>
            <template slot="append">
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </template>
          </el-input>
        </el-form-item>
      </el-tooltip>
      <!-- 验证码 -->
      <el-form-item prop="captchaCode">
        <el-input
          v-model="loginForm.captchaCode"
          class="codeInput"
          placeholder="验证码"
          tabindex="3"
          maxlength="10"
          size="medium"
          @keyup.enter.native="handleLogin"
        >
          <template slot="append">
            <img class="codeImg" :src="codeImg" alt="验证码" @click="getCode()">
          </template>
        </el-input>
      </el-form-item>
      <!-- 提交登录表单 -->
      <el-button :loading="loading" type="primary" style="width:100%;" size="medium" @click.native.prevent="handleLogin">
        {{ $t('login.logIn') }}
      </el-button>
    </el-form>
  </div>
</template>

<script>

// import { validUsername } from '@/utils/validate'
// import LangSelect from '@/components/LangSelect'
// import SocialSign from './components/SocialSignin'
import vueCanvasNest from 'vue-canvas-nest'

export default {
  name: 'Login',
  components: { vueCanvasNest },
  data() {
    return {
      bgConfig: {
        color: '0,0,255', // 线条颜色, 默认: '0,0,0' ；三个数字分别为(R,G,B)，注意用,分割
        pointColor: '0,0,0', // 交点颜色, 默认: '0,0,0' ；三个数字分别为(R,G,B)，注意用,分割
        opacity: 0.7, // 线条透明度（0~1）, 默认: 0.5
        zIndex: -2, // 背景的z-index属性，css属性用于控制所在层的位置, 默认: -1
        count: 99 // 线条的总数量, 默认: 150
      },
      loginForm: {
        username: '',
        password: '',
        captchaCode: '',
        captchaId: ''
      },
      loginRules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        captchaCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      codeImg: '',
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.getCode() // 获取图形验证码
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // 登录前判断用户有无权限
    checkRight() {
      const that = this
      this.protocol.param_findAllRightNew.data.firmId = this.$store.state.user.UserFirmId
      this.http.post(this.protocol.param_findAllRightNew).then(res => {
        const { code, message, value } = res.data
        if (code === 0 && value.length !== 0) {
          // if (code === 0) {
          this.loading = false
          // 有权限跳转页面
          that.$router.push('/')
        } else {
          this.loading = false
          // 无权限重新获取验证码 清空在 LoginByUsername方法中储存的数据 包括vuex数据与sessionStorage数据
          this.$store.commit('LOGIN_OUT')
          sessionStorage.clear()
          this.$message({ type: 'warning', message: message })
          this.getCode()
        }
      })
    },
    handleLogin() {
      const that = this
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('LoginByUsername', this.loginForm)
            .then(res => {
              const { code, message } = res
              if (code === 0) {
                that.checkRight()
              } else {
                this.loading = false
                that.getCode()
                this.$message({ type: 'warning', message: message })
              }
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    getCode() {
      this.http.getRes(this.protocol.param_getCatch).then(res => {
        const { code, message, value } = res.data
        if (code === 0) {
          this.codeImg = 'data:image/png;base64,' + value.data
          this.loginForm.captchaId = value.id
        } else {
          this.$message({ type: 'warning', message: message })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

// @keyframes bganimation {
//   0%{
//     background-position: 0% 50%;
//   }
//   50%{
//     background-position: 100% 50%;
//   }
//   100%{
//     background-position: 0% 50%;
//   }
// }

.login-container {
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
  // background-image: linear-gradient(125deg,#E4FFCD,#6DD5FA,#2980B9,#E4FFCD);  background-size: 400%;
  // animation: bganimation 15s infinite;
  overflow: hidden;
  padding-top: 200px;

  .login-form {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -230px;
    margin-top: -185px;
    width: 460px;
    height: 370px;
    max-width: 100%;
    padding: 40px 35px;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 6px;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .codeImg {
    height: 34px;
    margin: 0 -20px -4px -20px;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $dark_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      // font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  // .show-pwd {
  //   position: absolute;
  //   right: 10px;
  //   top: 7px;
  //   font-size: 16px;
  //   color: $dark_gray;
  //   cursor: pointer;
  //   user-select: none;
  // }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
