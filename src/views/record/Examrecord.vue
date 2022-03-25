<!--
 * @Author: your name
 * @Date: 2022-03-25 10:42:43
 * @LastEditTime: 2022-03-25 14:26:53
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \exam\src\views\record\Examrecord.vue
-->
<template>
<div>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>考试记录</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
    <div style="margin-top:40px">
         <el-table
      :data="recordlist"
          tooltip-effect="dark"

      style="width: 100%">
      <el-table-column
        prop="ExamName"
        label="考试名称"
        width="300">
      </el-table-column>
      <el-table-column
        prop="AnswerScore"
        label="考试分数"
        width="300">
      </el-table-column>
   <el-table-column
        prop="ExamMaxScore"
        label="考试总分"
        width="300">
      </el-table-column>
        
      <el-table-column
        prop="CreateTime"
        label="考试时间"
        width="350" >
      </el-table-column>

         <el-table-column
      fixed="right"
      label="操作"
      width="100"
      align="center">
         <template slot-scope="scope">

        
        <el-button type="text"   @click="pushdetail(scope.$index, scope.row)"    size="small">详情</el-button>

         </template>
          </el-table-column>
         </el-table>
    </div>
</div>
</template>

<script>
import  { getCookie }from '../../utils/util.js';
export default {

     mounted(){
      const user=JSON.parse(getCookie('user'));
      this.userdetail.userid=user.id
      this.userdetail.usertype=user.type
       this.postRequest("/api/exam-record/getrecord",this.userdetail).then(resp=>{
           
          this.recordlist=resp.obj
                 for(let i=0;i<this.recordlist.length;i++)
     {
     this.recordlist[i].CreateTime=this.$moment(this.recordlist[i].CreateTime).format("YYYY-MM-DD HH:mm:ss")
     }
      });
     },
data(){
    return{
        recordlist:[],
        userdetail:{
        usertype:'',
        userid:''
      },
    }
},
methods:{
 pushdetail(index, row)
       {
         let recorddetail=(index,row)
         console.log(recorddetail)
         this.$router.push({name:'考试详情',params:{recorddetail:recorddetail}});

//  this.$router.replace('/answer/Examcontext').catch(err => {
//    console.log(err)
// })
       },
}

}
</script>

<style>

</style>
