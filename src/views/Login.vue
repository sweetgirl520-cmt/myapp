<template>
    <el-form ref="form" :inline="true" :model="form" :rules="rules" class="login-container" label-width="70px">
        <h3 class="login_title">登录系统</h3>
        <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit" style="margin-left: 105px;margin-top: 10px;">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import Mock from "mockjs"
import Cookie from "js-cookie"
import {getMenu} from "../api"
export default {
    data(){
        return {
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, trigger: 'blur', message: '请输入用户名' }
                ],
                password: [
                    { required: true, trigger: 'blur', message: '请输入密码' }
                ]
            }
        }
    },
    methods:{
        submit(){
            // const token = Mock.Random.guid()
            // Cookie.set("token",token)
            this.$refs.form.validate((valid)=>{
                //校验通过
                if(valid){
                    getMenu(this.form).then(({data})=>{
                        if(data.code === 20000){
                            Cookie.set("token",data.data.token)
                            this.$store.commit('menu/setMenu',data.data.menu)
                            this.$store.commit("menu/addMenu",this.$router)
                            this.$router.push({name:'home'})
                        }else{
                            this.$message.error(data.data.message)
                        }
                    })
                }
            })
            
        }
    }
}
</script>

<style lang="less" scoped>
.login-container{
    width: 350px;
    border: 1px solid #eaeaea;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
    box-sizing: border-box;
    .login_title {
        text-align: center;
        margin-bottom: 40px;
        color: #505458;
    }
    .el-input {
        width: 198px;
    }    
}
</style>