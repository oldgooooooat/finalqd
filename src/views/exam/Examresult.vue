<!--
 * @Author: your name
 * @Date: 2022-04-02 09:21:19
 * @LastEditTime: 2022-04-11 14:38:25
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \exam\src\views\exam\Examresult.vue
-->
<template>
<div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/exam/Exam' }">考试管理</el-breadcrumb-item>
      <el-breadcrumb-item>考试分数</el-breadcrumb-item>
    </el-breadcrumb>
     <el-button type="primary" style="float:right" @click="exportTable()">导出表格</el-button>
  <div style="margin-top:40px">
         <el-table
         id="result-list"
                 :data="resultlist.slice((currentPage-1)*pagesize,currentPage*pagesize)"

   
          tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        prop="NickName"
        label="考生姓名"
        width="300">
      </el-table-column>
      <el-table-column
        prop="ClassName"
        label="班级"
        width="300">
      </el-table-column>
   <el-table-column
        prop="AnswerScore"
        label="考试分数"
        width="300" :formatter="returnscore">
        
      </el-table-column>
        
      <el-table-column
        prop="CreateTime"
        label="考试时间"
        width="350"  :formatter="returntime">
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
      <div>
               <el-pagination  class="footer"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[5, 10, 20, 40]" 
                            :page-size="pagesize"         
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="resultlist.length">    
                    </el-pagination>
     </div>
</div>
</template>

<script>
import fileSaver from 'file-saver'
import xlsx from 'xlsx'
export default {
    mounted(){
       this.examdetail=JSON.parse(sessionStorage.getItem('examresult'))
      console.log(this.examdetail);
       this.postRequest('/api/exam-record/getexamresult',this.examdetail).then(resp=>{                           
                   this.resultlist=resp.obj
                           for(let i=0;i<this.resultlist.length;i++)
             {
                            
                            
     this.resultlist[i].CreateTime=this.$moment(this.resultlist[i].CreateTime).format("YYYY-MM-DD HH:mm:ss")
                               
     }
                   console.log(resp.obj)
                         })
    },
    data(){
        return{
              currentPage:1, //初始页
               pagesize:10,    //    每页的数据
           examdetail:[],
           resultlist:[]
        }
    },
    methods:{
         handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
        },
      exportTable(){
         require.ensure([],()=>{
           const { export_json_to_excel} =require("@/excel/Export2Excel");
           const filedName =["考生姓名","班级","考试分数","考试时间"];
           const filterVal =["NickName","ClassName","AnswerScore","CreateTime"];
           const data=this.resultlist.map(v=>filterVal.map(j=>v[j]));
           export_json_to_excel(filedName,data,"考试分数");
         })
      },
     pushdetail(index, row)
       {
            let recorddetail=(index,row)

        //  console.log(recorddetail)
        sessionStorage.setItem('model',JSON.stringify(1));
        sessionStorage.setItem('recorddetail',JSON.stringify(recorddetail));
         this.$router.push({name:'考试详情'});
         
    

//  this.$router.replace('/answer/Examcontext').catch(err => {
//    console.log(err)
// })
       },
returnscore(row){
  if(row.RecordId==null)
  {
      return "未参加"
  }
  else
  {
      return row.AnswerScore
  }
},
returntime(row){
  if(row.RecordId==null)
  {
      return "未参加"
  }
  else
  {
      return row.CreateTime
  }

}
    },
    props:{

    }

}
</script>

<style>

</style>