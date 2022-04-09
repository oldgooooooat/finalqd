<!--
 * @Author: your name
 * @Date: 2022-04-09 08:55:06
 * @LastEditTime: 2022-04-09 10:57:34
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \exam\src\components\personcenter.vue
-->
<template>
<div>
    <i class="el-icon-back" @click="back()">返回</i>

<h1 style="text-align: center;font  -size:30px">个人中心</h1>  
<div style="text-align: center">
  <el-form :model="user" class="demo-ruleForm login-container" ref="user">
           <!-- <h3 class="title">用户注册</h3> -->
            <!--表单里面的每一项叫做<el-form-item></el-form-item,要加个prop属性，本来是不用加的，但是我们这个使用了字段校验，这种情况家就一定要加prop属性-->
            <el-form-item >
                <!--auto-complete:是否自动补全-->
            <el-tag>昵称</el-tag>
                <el-input type="text" v-model="user.nickname"  
></el-input>
            </el-form-item>
                 <el-form-item >
                <!--auto-complete:是否自动补全-->
            <el-tag>密码</el-tag>
                <el-input type="password" v-model="user.password"  
></el-input>
            </el-form-item>
              <el-form-item >
                <!--auto-complete:是否自动补全-->
            <el-tag>班级</el-tag>
                <el-input type="text" v-model="user.classname"  
></el-input>
            </el-form-item>
              <el-form-item >
                <!--auto-complete:是否自动补全-->
            <el-tag>邮箱</el-tag>
                <el-input type="text" v-model="user.email"  
></el-input>
            </el-form-item>
                        <el-button type="primary" style="width: 100%" @click="submit">修改</el-button>

        </el-form>

</div>
</div>
</template>

<script>
export default {
    mounted(){
           const user=JSON.parse(localStorage.getItem("user"))
           this.userdetail.userid=user.id;
            this.userdetail.usertype=user.type

             this.postRequest("/api/t-user/getoneuser",this.userdetail).then(resp=>{
        this.user=resp.obj
            // this.user.password='******'
      });
    },
data(){
    return{
        user:{},
 userdetail:{
        usertype:'',
        userid:''
      },
    }
},
methods:{
    submit(){
   this.$confirm('你确定要修改资料吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postRequest('/api/t-user/changeuser',this.user).then(resp=>{                           
                                     const newuser=JSON.stringify(this.user);
                         localStorage.setItem("user",newuser);
                   location.reload();  
                         })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });          
        });
    },
      back()
  {
    this.$router.back()
  }

}
}
</script>

<style>
.login-container {
  border-radius: 10px;
  margin: 0px auto;
  width: 350px;
  padding: 30px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  text-align: left;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}
</style>