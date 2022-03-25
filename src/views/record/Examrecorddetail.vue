<!--
 * @Author: your name
 * @Date: 2022-03-25 14:12:48
 * @LastEditTime: 2022-03-25 15:48:46
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \exam\src\views\record\Examrecorddetail.vue
-->
<template>
<div>
    <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/record/Examrecord' }">考试记录</el-breadcrumb-item>
      <el-breadcrumb-item >考试详情</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div>
  <h2 style="text-align: center;">考试名字：{{this.examdetail.examName}}</h2>
  </div>

  <div v-for="(item, index) in alldetail">  
<h3>{{(index+1)+':'+item.question.questionName}}</h3>
<h4>{{item.question.questionDescription}}</h4>

  
    </div>
         </el-checkbox-group>

  </div >


</div>
</template>

<script>
export default {
    mounted(){

console.log(this.$route.params)
this.recorddetail=this.$route.params.recorddetail;
  this.postRequest("/api/exam-record/getrecorddetail",this.recorddetail).then(resp=>{
        this.alldetail=JSON.parse(resp.obj);
        console.log(this.alldetail)
      });

       this.postRequest("/api/exam-record/getexamdetail",this.recorddetail).then(resp=>{
        this.examdetail=resp.obj
        console.log(this.examdetail)
        
      });
     
    },

data(){
    return{
        show:false,
        examdetail:{},
        alldetail:[],
        recorddetail:{}
    }
}
}
</script>

<style>

</style>