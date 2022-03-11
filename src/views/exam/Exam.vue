<!--
 * @Author: your name
 * @Date: 2022-03-07 09:19:44
 * @LastEditTime: 2022-03-11 13:59:35
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \exam\src\views\exam\exam.vue
-->
<template>
  <div>
   <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>考试管理</el-breadcrumb-item>
    </el-breadcrumb>
        <el-button type="primary" plain style="float:right" @click="examcreatedisplay=true">添加考试</el-button>
        <div>
   <Examcreate-dialog :examcreatedisplay.sync="examcreatedisplay"
          v-if="examcreatedisplay"
          :questionlist="questionlist"
   >
   </Examcreate-dialog>
   <Exam-dialog
   :examdialogdisplay.sync="examdialogdisplay"
          v-if="examdialogdisplay"
          :examdialoglist="examdialoglist"
   >
   </Exam-dialog>
  
        </div>
        <div>
           <el-table
      :data="examlist"
      style="width: 100%">
      <el-table-column
        prop="examName"
        label="考试名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="examScore"
        label="考试总分"
        width="180">
      </el-table-column>
      <el-table-column
        prop="examTimeLimit"
        label="考试持续时间">
      </el-table-column>
      <el-table-column
        prop="examStartDate"
        label="考试起始时间" >
      </el-table-column>
          <el-table-column
        prop="examEndDate"
        label="考试结束时间" >
      </el-table-column>
        <el-table-column
      fixed="right"
      label="操作"
      width="100"
      align="center">
      <template slot-scope="scope">
        <el-button  type="text" @click="selectquestion1(scope.$index, scope.row)" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
          </el-table-column>

    </el-table>
        </div>
  </div>


</template>

<script>
import Examcreate from'./Examcreatedialog.vue'
import Examdialog from'./Examdialog.vue'

export default {
   components:{
  'Examcreate-dialog':Examcreate,
  'Exam-dialog':Examdialog,
   },
   mounted(){
     
 this.getRequest("/api/question/selectallquestion").then(resp=>{
      
          this.questionlist=resp.obj;
          
      });
 this.getRequest("/api/exam/getallexam").then(resp=>{
     this.examlist=resp.obj;
     for(let i=0;i<this.examlist.length;i++)
     {
     this.examlist[i].examStartDate=this.$moment(this.examlist[i].examStartDate).format("YYYY-MM-DD HH:mm:ss")
     this.examlist[i].examEndDate=this.$moment(this.examlist[i].examEndDate).format("YYYY-MM-DD HH:mm:ss")

     }
     console.log(this.examlist[0].examEndDate)
 });
   },
   data(){
       return{
           examlist:[],
           examdialoglist:[],
           questionlist:[],
           examcreatedisplay:false,
           examdialogdisplay:false
       }
   },
   methods:{
           selectquestion1(index, row){
             this.examdialogdisplay=true;
        console.log((index,row));
        this.examdialoglist=(index,row);
       },
 dateFormat:function(date){
        return this.$moment(date).format("YYYY-MM-DD HH:mm:ss")
      }
   }
}
</script>

<style>

</style>