<!--
 * @Author: your name
 * @Date: 2022-03-07 09:19:44
 * @LastEditTime: 2022-03-14 10:29:22
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
          <el-button type="danger" style="float:right" @click="del()" plain>删除问题</el-button>

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
          :questionlist="questionlist"
          :bianji="bianji"
   >
   </Exam-dialog>
  
        </div>
        <div>
           <el-table
              ref="multipleTable"
    tooltip-effect="dark"
    @selection-change="handleSelectionChange"
      :data="examlist"
      style="width: 100%">
       <el-table-column
      type="selection"
      width="55"
      align="center">
    </el-table-column>

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
        <el-button type="text"  @click="selectquestion2(scope.$index, scope.row)"size="small">编辑</el-button>
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
           bianji:false,
           examcreatedisplay:false,
           examdialogdisplay:false,
                     multipleSelection:[]

       }
   },
   methods:{
           handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      del(){
   this.$confirm('此操作将永久删除考试, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postRequest('/api/exam/deleteexam',this.multipleSelection).then(resp=>{                           
                      // location.reload();  
                         })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
           selectquestion1(index, row){
             this.bianji=false
             this.examdialogdisplay=true;
        console.log((index,row));
        this.examdialoglist=(index,row);
       },
         selectquestion2(index, row){
           this.bianji=true
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