<template>
<div class="login">
  <div class="shell">
    <div class="container a-container" :class="{'is-txl': showLoginForm,'is-z': !transStyle}">
      <form class="form" id="a-form" @submit.prevent>
        <h2 class="form_title title">创建账号</h2>
        <!-- <span class="form_span">选择注册方式或电子邮箱注册</span> -->
        <input type="text" class="form_input" placeholder="Name">
        <input type="text" class="form_input" placeholder="Email">
        <input type="password" class="form_input" placeholder="Password">
        <button class="form_button button submit" @click="signup">注册</button>
      </form>
    </div>

    <div class="container b-container" :class="{'is-txl': showLoginForm,'is-z': transStyle}">
      <form class="form" id="b-form" @submit.prevent>
        <h2 class="form_title title">登入账号</h2>
        <!-- <span class="form_span">选择登录方式或电子邮箱登录</span> -->
        <input type="text" class="form_input" placeholder="Email" v-model="username">
        <input type="password" class="form_input" placeholder="Password" v-model="password">
        <a class="form_link">忘记密码？</a>
        <button class="form_button button submit" @click="login">登录</button>
      </form>
    </div>

    <div class="switch" id="switch-cnt" :class="{'is-gx': transStyle, 'is-txr': showLoginForm}">
      <div class="switch_circle" :class="{'is-txr': showLoginForm}"></div>
      <div class="switch_circle switch_circle-t" :class="{'is-txr': showLoginForm}"></div>
      <div class="switch_container" id="switch-c1" :class="{'is-hidden': showLoginForm}">
        <h2 class="switch_title title" style="letter-spacing: 0;">欢迎回来 ！</h2>
        <p class="switch_description description">已经有账号了嘛，去登入账号来进入奇妙世界吧！！！</p>
        <button class="switch_button button switch-btn" @click="changeStyle">登录</button>
      </div>

      <div class="switch_container" id="switch-c2" :class="{'is-hidden': !showLoginForm}">
        <h2 class="switch_title title" style="letter-spacing: 0;">你好，朋友 ！</h2>
        <p class="switch_description description">去注册一个账号，让我们踏入奇妙的旅途！</p>
        <button class="switch_button button switch-btn" @click="changeStyle">注册</button>
      </div>
    </div>
  </div>
</div>

</template>

<script setup>
import {ref} from "vue"
import { useRouter } from "vue-router";

// 跳转路由
const router = useRouter();

// 样式切换
let showLoginForm = ref(false);
let transStyle = ref(false);
const changeStyle = () => {
    showLoginForm.value = !showLoginForm.value;
    transStyle.value = !transStyle.value;
    // setTimeout(() => {
    //     transStyle.value = false;
    // }, 1500)
}

// 用户名和密码
const username = ref('')
const password = ref('')

// 注册
const signup = () => {
  console.log("Signing up...");

  //用户名正则，4到16位（字母，数字，下划线，减号）
  var uname = prompt("请出入用户名")
  var userNamePattern = /^[a-zA-Z0-9_-]{4,16}$/;
  if (userNamePattern.test(uname)) {
  	console.log("√");
  }else{
  	console.log("您的用户名格式有误")
  }

  //密码正则，至少8-16个字符，至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符
  var pwd = prompt("请出入密码")
  var pwdPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8,16}$/ ;
  if (pwdPattern.test(pwd)) {
  	console.log("√");
  }else{
  	console.log("您的密码格式有误");
  }

  // 验证邮箱
  // var reg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/
};

// 登录
const login = () => {
  console.log("Logging in...");
  // 获取用户输入的用户名和密码
  const eUsername = username.value;
  const ePassword = password.value;
  if (eUsername === 'manager' && ePassword == '123456')
    router.push('/map');
  else if (eUsername == 'user' && ePassword === '1234')
    router.push('/');
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* 字体无法选中 */
  user-select: none;
}

/* body {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  background-color: #ecf0f3;
  color: #a0a5a8;
} */
.login {
    width: 100%;
    /* margin: -20px; */
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    background-color: #ecf0f3;
    color: #a0a5a8;
}

.shell {
  position: relative;
  width: 1000px;
  min-width: 1000px;
  min-height: 600px;
  height: 600px;
  padding: 25px;
  background-color: #ecf0f3 !important;
  box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
  border-radius: 12px;
  overflow: hidden;
  margin: 100px auto;
}

/* 设置响应式 */
@media (max-width: 1200px) {
  .shell {
    transform: scale(0.7);
  }
}

@media (max-width: 1000px) {
  .shell {
    transform: scale(0.6);
  }
}

@media (max-width: 800px) {
  .shell {
    transform: scale(0.5);
  }
}

@media (max-width: 600px) {
  .shell {
    transform: scale(0.4);
  }
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  width: 600px;
  height: 100%;
  padding: 25px;
  background-color: #ecf0f3;
  transition: 1.25s
}
.form {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }
    .iconfont {
        margin: 0 5px;
        border: rgba(0, 0, 0, 0.5) 2px solid;
        border-radius: 50%;
        font-size: 25px;
        padding: 3px;
        opacity: 0.5;
        transition: 0.1s;
    }
    .iconfont:hover {
        opacity: 1;
        transition: 0.15s;
        cursor: pointer;
    }
    .form_input {
        width: 350px;
        height: 40px;
        margin: 4px 0;
        padding-left: 25px;
        font-size: 13px;
        letter-spacing: 0.15px;
        border: none;
        outline: none;
        background-color: #ecf0f3;
        transition: 0.25s ease;
        border-radius: 8px;
        box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
    }
    .form_input:focus {
        box-shadow: inset 4px 4px 4px #d1d9e6, inset -4px -4px 4px #f9f9f9;
    }
    .form_span {
        margin-top: 30px;
        margin-bottom: 12px;
    }
    .form_link {
        cursor: pointer;
        color: #181818;
        font-size: 15px;
        margin-top: 25px;
        border-bottom: 1px solid #a0a5a8;
        line-height: 2;
    }
    .title {
        font-size: 34px;
        font-weight: 700;
        line-height: 3;
        color: #181818;
        letter-spacing: 10px;
    }
    .description {
        font-size: 14px;
        letter-spacing: 0.25px;
        text-align: center;
        line-height: 1.6;
    }
    .button {
        cursor: pointer;
        width: 180px;
        height: 50px;
        border-radius: 25px;
        margin-top: 50px;
        font-weight: 700;
        font-size: 14px;
        letter-spacing: 1.15px;
        background-color: #4B70E2;
        color: #f9f9f9;
        box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;
        border: none;
        outline: none;
    }
    .a-container {
        z-index: 100;
        left: calc(100% - 600px);
    }
    .b-container {
        left: calc(100% - 600px);
        z-index: 0;
    }
    .switch {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 400px;
        padding: 50px;
        z-index: 200;
        transition: 1.25s;
        background-color: #ecf0f3;
        overflow: hidden;
        box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #d1d9e6;
    }
    .switch_circle {
        position: absolute;
        width: 500px;
        height: 500px;
        border-radius: 50%;
        background-color: #ecf0f3;
        box-shadow: inset 8px 8px 12px #b8bec7, inset -8px -8px 12px #fff;
        bottom: -60%;
        left: -60%;
        transition: 1.25s;
    }
    .switch_circle-t {
        top: -30%;
        left: 60%;
        width: 300px;
        height: 300px;
    }
    .switch_container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: absolute;
        width: 400px;
        padding: 50px 55px;
        transition: 1.25s;
    }
    .switch_button {
        cursor: pointer;
    }
    .switch_button:hover,
    .submit:hover {
        box-shadow: 6px 6px 10px #d1d9e6, -6px -6px 10px #f9f9f9;
        transform: scale(0.985);
        transition: 0.25s;
    }
    .switch_button:active,
    .switch_button:focus {
        box-shadow: 2px 2px 6px #d1d9e6, -2px -2px 6px #f9f9f9;
        transform: scale(0.97);
        transition: 0.25s;
    }
    .is-txr {
        left: calc(100% - 400px);
        transition: 1.25s;
        transform-origin: left;
    }
    .is-txl {
        left: 0;
        transition: 1.25s;
        transform-origin: right;
    }
    .is-z {
        z-index: 200;
        transition: 1.25s;
    }
    .is-hidden {
        visibility: hidden;
        opacity: 0;
        position: absolute;
        transition: 1.25s;
    }
    .is-gx {
        animation: is-gx 1.25s;
    }
    @keyframes is-gx {
        0%,
        10%,
        100% {
            width: 400px;
        }
        30%,
        50% {
            width: 500px;
        }
    }
</style>