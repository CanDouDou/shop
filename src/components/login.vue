<template>
    <div>
        <el-form :label-position="labelPosition" label-width="80px">
            <el-form-item label="名字">
                <el-input v-model="formdata.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formdata.password"></el-input>
            </el-form-item>
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
</style>
