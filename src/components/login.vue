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
            <el-button class="login-sub" type="primary">登录</el-button>
        </el-form>
        
    </div>
</template>

<script>
export default {
  data () {
    return {
      labelPosition: 'top',
      formdata: {
        name: '',
        password: ''
      }
    }
  }
}
</script>

<style>
html,body{
    height: 100%;
}
.login{
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
