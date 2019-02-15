<template>
    <div class="login">
        <el-form class="login-form" :label-position="labelPosition" label-width="80px">
            <h2>用户登录</h2>
            <el-form-item label="名字">
                <el-input v-model="formdata.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formdata.password"></el-input>
            </el-form-item>
            <el-button class="login-sub" type="primary" @click="submit">登录</el-button>
        </el-form>

    </div>
</template>

<script>
export default {
  data () {
    return {
      labelPosition: 'top',
      formdata: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async submit () {
      let res = await this.$axios.post('login', this.formdata)
      console.log(res)
      const {data: {meta: {status, msg}}} = res
      if (status === 200) {
        const token = res.data.data.token
        console.log(token)
        localStorage.setItem('token', token)
        this.$router.push({path: '/'})
      } else {
        this.$message.error(msg)
      }
    }

  }
}
</script>

<style>
html,
body {
  height: 100%;
}
.login {
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  border-radius: 5px;
  padding: 30px;
  width: 400px;
  background-color: #fff;
}
.login-form .login-sub {
  width: 100%;
}
</style>
