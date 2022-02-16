<!--
 * @Author: your name
 * @Date: 2022-02-10 10:10:14
 * @LastEditTime: 2022-02-15 16:18:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \finalqd\src\components\Login.vue
-->
<template>
    <div>
        <!--element ui的表单验证规则配置 用 :rules="rules"这是简写的，本来是v-model:rules="rules"-->
        <!--:model 表单里面的数据对象-->
        <!-- ref="loginForm" 绑定校验表单 -->
        <el-form :rules="rules" :model="registForm" class="loginContainer" ref="registForm">
            <h3 class="loginTitle">注册用户</h3>
            <!--表单里面的每一项叫做<el-form-item></el-form-item,要加个prop属性，本来是不用加的，但是我们这个使用了字段校验，这种情况家就一定要加prop属性-->
            <el-form-item prop="username">
                <!--auto-complete:是否自动补全-->
            <el-tag>用户名</el-tag>
                <el-input type="text" v-model="registForm.username" auto-complete="off" placeholder="请输入用户名"  @keydown.enter.native="submitRegist"
></el-input>
            </el-form-item>
            <el-tag>密码</el-tag>
            <el-form-item prop="password">
                <el-input type="password" v-model="registForm.password" auto-complete="off" placeholder="请输入密码"  @keydown.enter.native="submitRegist"
></el-input>
            </el-form-item>
            <el-tag>邮箱</el-tag>
            <el-form-item prop="email">
                <el-input type="text" v-model="registForm.email" auto-complete="off" placeholder="请输入邮箱"  @keydown.enter.native="submitRegist"
></el-input>
            </el-form-item>
            <el-tag>昵称</el-tag>
            <el-form-item prop="nickname">
                <el-input type="text" v-model="registForm.nickname" auto-complete="off" placeholder="请输入昵称"  @keydown.enter.native="submitRegist"
></el-input>
            </el-form-item>
            <el-button type="primary" style="width: 100%" @click="submitRegist">注册</el-button>
        </el-form>
    </div>
</template>
 
<script>
import { regist } from '../api/userMG'


    export default {
        name: "regist",
        data(){
            return{
                registForm:{
                  username:"",
                  password:"",
                  email:"",
                  nickname:""
                },
                checked:true,
                rules:{
                    //required:true:用户名必填  如果没填就弹出““””“"请输入用户名",trigger:blur 触发的方式是blur
                    username:[{required:true,message:"用户名不能为空",trigger:"blur"}],
                    password:[{required:true,message:"密码不能为空",trigger:"blur"}],
                    email:[{required:true,message:"邮箱不能为空",trigger:"blur"}],
                    nickname:[{required:true,message:"昵称不能为空",trigger:"blur"}],
                }
            }
        },
        methods:{
             submitRegist(){
                this.$refs.registForm.validate((validate) =>{  // Element自带的校验
                    if(validate){
                        //这是在api.js封装的请求
                        this.postRequest('/api/regist',this.registForm).then(resp=>{
                            if(resp){
                                                             //resp：从服务端拿到的数据  用户的数据要保存到哪里？ 保存在sessionStorage  关闭浏览器就没了
                                //页面跳转  replace：替换  用push的话，可以使用后退按钮回到登录页，用replace不可以回到登录页
                                this.$router.replace('/')
                            }
                        })
                    }else {
                        this.$message.error("请输入所有字段");
                        return false;
                    }
                })
            }
        }
 
    }
</script>
 
<style scoped>
    .loginContainer{
        border-radius: 15px;
        background-clip:padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 15px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .loginTitle{
        margin: 15px auto 20px auto;
        text-align: center;
        color: #505458;
    }
    .loginRember{
        text-align: left;
        margin: 0 0 25px 0;
    }
</style>
