<!--
 * @Author: your name
 * @Date: 2022-03-25 10:42:43
 * @LastEditTime: 2022-04-11 14:37:53
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
         <el-button type="primary" style="float:right" @click="exportTable()">导出表格</el-button>

  </div>
    <div style="margin-top:40px">
         <el-table
   
              :data="recordlist.slice((currentPage-1)*pagesize,currentPage*pagesize)"

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
      <div>
               <el-pagination  class="footer"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[5, 10, 20, 40]" 
                            :page-size="pagesize"         
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="recordlist.length">    
                    </el-pagination>
     </div>
</div>
</template>

<script>
import  { getCookie }from '../../utils/util.js';
export default {

     mounted(){
       const user=JSON.parse(localStorage.getItem("user"))
      // const user=JSON.parse(getCookie('user'));
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
       currentPage:1, //初始页
               pagesize:10,    //    每页的数据
        recordlist:[],
        userdetail:{
        usertype:'',
        userid:''
      },
    }
},
methods:{
    exportTable(){
         require.ensure([],()=>{
           const { export_json_to_excel} =require("@/excel/Export2Excel");
           const filedName =["考试名称","考试分数","考试总分","考试时间"];
           const filterVal =["ExamName","AnswerScore","ExamMaxScore","CreateTime"];
           const data=this.recordlist.map(v=>filterVal.map(j=>v[j]));
           export_json_to_excel(filedName,data,"考试记录");
         })
      },
       handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
        },
 pushdetail(index, row)
       {
            let recorddetail=(index,row)
         if(recorddetail.Examswitch==3 || recorddetail.Examtype==1){
  
        //  console.log(recorddetail)

        sessionStorage.setItem('recorddetail',JSON.stringify(recorddetail));
         this.$router.push({name:'考试详情'});
         }
         else{
                  this.$message.error('考试还未结束哦');
         }

//  this.$router.replace('/answer/Examcontext').catch(err => {
//    console.log(err)
// })
       },
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
