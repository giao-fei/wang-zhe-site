<template>
  <div class="login-container">
    <el-card header="王者荣耀后台管理系统" class="login-card">
      <el-form @submit.native.prevent="login" style=" width: 100%; height: 35vh; display: flex; flex-wrap: wrap; align-content: space-around;">
          <el-form-item style="width:100%">
              <el-input v-model.trim="model.username" placeholder="用户名">
                <i slot="prefix" class="el-input__icon el-icon-user"></i>
              </el-input>
          </el-form-item>
          <el-form-item style="width: 100%;">
              <el-input type="password" v-model.trim="model.password" placeholder="密码">
                 <i slot="prefix" class="el-input__icon el-icon-lock"></i>
              </el-input>
          </el-form-item>
          <el-form-item style="width: 100%;">
              <el-button type="primary" class="btn" native-type="submit" v-loading.fullscreen.lock="fullscreenLoading">登录</el-button>
          </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
   name: 'Login',
   data() {
       return {
          model: {},
          fullscreenLoading: false,
       }
   },
   methods: {
       async login() {
          const res = await this.$http.post('/login', this.model)
          this.fullscreenLoading = true;
          setTimeout(() => {
            this.fullscreenLoading = false;
            this.$message({
              message: "登录成功",
              type: "success",
              center: true,
              duration: 1400,
            });
            // 将获取到的token存到本地浏览器中
            // localStorage.setItem('token', res.data.token);
            sessionStorage.token = res.data.token;
            // 将账号名称存到浏览器中
            sessionStorage.username = res.data.username;
            this.$router.replace('/categories/create')
          },1200)
         // console.log(res.data)
         
       }
   }
}
</script>

<style lang="less">
  .login-card {
      text-align: center;
      letter-spacing: 0.5rem;
      width: 30rem;
      margin: 7rem auto;
      height: 45vh;
  }
  .btn {
      width: 100%;  
  }
</style>