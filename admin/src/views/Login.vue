<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login">
      <!-- native表示监听el-form里原生表单事件,prevent表示阻止表单默认提交,不要跳转页面  -->
        <el-form-item label="用户名">
          <el-input v-model="model.username">
          </el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {} //习惯性对表单都定义model
    }
  },
  methods: {
    async login() {
      const res = await this.$http.post('login', this.model)
      localStorage.token = res.data.token //关掉还有
      //sessionStorage.token = res.data.token 当前浏览器关掉后没有记录了
      this.$router.push('/') //跳转到首页
      this.$message({
        type: 'success',
        message: '登陆成功'
      })
    }
  }
}
</script>

<style>
.login-card{
  width: 25rem;
  margin: 5rem auto;
}
</style>