<!--
 * @Author: your name
 * @Date: 2022-03-07 09:19:44
 * @LastEditTime: 2022-05-04 15:01:21
 * @LastEditors: oldgooooooat 2697055747@qq.com
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
            <el-button type="primary" plain style="float:right" @click="peopleimportdisplay=true">导入人员</el-button>
        <el-button type="primary" plain style="float:right" @click="examcreatedisplay=true">添加考试</el-button>
          <el-button type="danger" style="float:right" @click="del()" plain>删除考试</el-button>

        <div>
      <Peopleimport-dialog :peopleimportdisplay.sync="peopleimportdisplay"
          v-if="peopleimportdisplay"
          
          >

      </Peopleimport-dialog>
   <Examcreate-dialog :examcreatedisplay.sync="examcreatedisplay"
          v-if="examcreatedisplay"
          :questionlist="questionlist"
          :userlist="userlist"
   >
   </Examcreate-dialog>
 
   <Exam-dialog
   :examdialogdisplay.sync="examdialogdisplay"
          v-if="examdialogdisplay"
          :examdialoglist="examdialoglist"
          :questionlist="questionlist"
          :bianji="bianji"
          :fenpei="fenpei"
          :userlist="userlist"
   >
   </Exam-dialog>
  
        </div>
        <div>
           <el-table

              ref="multipleTable"
    tooltip-effect="dark"
    @selection-change="handleSelectionChange"
      :data="examlist.slice((currentPage-1)*pagesize,currentPage*pagesize)"
 
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
      v-if="this.userdetail.usertype==1"
        prop="createname"
        label="创造人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="examScore"
        label="考试总分"
        width="180">
      </el-table-column>
      <el-table-column
        prop="examSwitch"
        label="考试状态"
        :formatter="getswitch">
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
        <el-button  type="text"v-if="(scope.$index, scope.row).examSwitch!=1" @click="selectquestion1(scope.$index, scope.row)" size="small">查看</el-button>
        <el-button type="text" v-if="(scope.$index, scope.row).examSwitch==1" @click="selectquestion2(scope.$index, scope.row)"size="small">编辑</el-button>
                          <el-button type="text" v-if="(scope.$index, scope.row).examSwitch!=3" @click="closeexam(scope.$index, scope.row)"size="small">关闭</el-button>

        <el-button type="text" v-if="(scope.$index, scope.row).examSwitch!=3" @click="selectquestion3(scope.$index, scope.row)"size="small">分配</el-button>

   <el-button type="text"  @click="result(scope.$index, scope.row)"size="small">分数</el-button>
      </template>
          </el-table-column>

    </el-table>
        </div>
  <div>
               <el-pagination  class="footer"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[5, 10, 20, 40]" 
                            :page-size="pagesize"         
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="examlist.length">    
                    </el-pagination>
     </div>
  </div>


</template>

<script>
import  { getCookie }from '../../utils/util.js';
import peopleimport from'./importpeople.vue'
import Examcreate from'./Examcreatedialog.vue'
import Examdialog from'./Examdialog.vue'
 export const examswitch={'1':'未开启','2':'持续中','3':'已结束'}

export default {
   components:{
  'Examcreate-dialog':Examcreate,
  'Exam-dialog':Examdialog,
  'Peopleimport-dialog':peopleimport
   },
   mounted(){
            const user=JSON.parse(localStorage.getItem("user"))

      //  const user=JSON.parse(getCookie('user'));

      this.userdetail.userid=user.id
      this.userdetail.usertype=user.type

        this.getRequest("/api/t-user/getalluser").then(resp=>{
          this.userlist=resp.obj;
          console.log(this.userlist)
      });
 this.postRequest("/api/question/selectallquestion",this.userdetail).then(resp=>{
      
          this.questionlist=resp.obj;
          
      });
 this.postRequest("/api/exam/getallexam",this.userdetail).then(resp=>{
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

            currentPage:1, //初始页
               pagesize:10,    //    每页的数据
      userdetail:{
        usertype:'',
        userid:''
      },
           userlist:[],
           examlist:[],
           examdialoglist:[],
           questionlist:[],
           bianji:false,
           fenpei:false,
           examcreatedisplay:false,
           examdialogdisplay:false,
           peopleimportdisplay:false,
                     multipleSelection:[]

       }
   },
   methods:{
           // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
        },
        getswitch(row,column,cellValue){
          return examswitch[cellValue]
     },
           handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      result(index, row){
        let examresult=(index,row);
        sessionStorage.setItem('examresult',JSON.stringify(examresult));
        this.$router.push({name:'考试分数'});

      },
      del(){
   this.$confirm('此操作将永久删除考试, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postRequest('/api/exam/deleteexam',this.multipleSelection).then(resp=>{                           
                     location.reload();  
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
                this.fenpei=false
             this.examdialogdisplay=true;
        console.log((index,row));
        this.examdialoglist=(index,row);
       },
         selectquestion2(index, row){
           this.bianji=true
           this.fenpei=false
             this.examdialogdisplay=true;
        console.log((index,row));
        this.examdialoglist=(index,row);
       },
        selectquestion3(index, row){
           this.bianji=false
           this.fenpei=true
             this.examdialogdisplay=true;
        console.log((index,row));
        this.examdialoglist=(index,row);
       },
       closeexam(index, row){
        this.examdialoglist=(index,row);
         this.$confirm('此操作将关闭考试, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postRequest('/api/exam/closeexam',this.examdialoglist).then(resp=>{                           
                    location.reload(); 
                         })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消关闭'
          });          
        });
       },
 dateFormat:function(date){
        return this.$moment(date).format("YYYY-MM-DD HH:mm:ss")
      }
   }
}
</script>

<style>
.footer{

height: 100px;

width: 100%;

text-align: center;
position: fixed;

bottom: 0;

}
</style>