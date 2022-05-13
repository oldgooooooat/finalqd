<!--
 * @Author: your name
 * @Date: 2022-03-17 09:05:29
 * @LastEditTime: 2022-05-13 10:19:11
 * @LastEditors: oldgooooooat 2697055747@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \exam\src\views\answer\Examanswer.vue
-->
<template>
<div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>在线考试</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- <div style="float:right">
                  <el-button type="primary" plain>主要按钮</el-button>

        </div> -->

    <div style="margin-top:40px">
           <el-table
                            :data="examlist.slice((currentPage-1)*pagesize,currentPage*pagesize)"


          tooltip-effect="dark"

      style="width: 100%">
      <el-table-column
        prop="examName"
        label="考试名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="examDescription"
        label="考试描述"
        width="180">
      </el-table-column>
   <el-table-column
        prop="examScore"
        label="考试总分"
        width="180">
      </el-table-column>
      <el-table-column
        prop="category"
        label="考试科目"
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

        
        <el-button type="text"  v-if="(scope.$index, scope.row).times==0&&(scope.$index, scope.row).examSwitch==2" @click="pushcontext(scope.$index, scope.row)"   size="small">考试</el-button>
        <el-button type="text" v-if="(scope.$index, scope.row).examSwitch==1"  @click="alert1()"   size="small">未开始</el-button>
        <el-button type="text" v-if="(scope.$index, scope.row).times!=0&&(scope.$index, scope.row).examSwitch==2"  @click="alert()"   size="small">已考</el-button>
        <el-button type="text" v-if="(scope.$index, scope.row).examSwitch==3"  @click="alert2()"   size="small">已结束</el-button>

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

 export const examswitch={'1':'未开启','2':'持续中','3':'已结束'}

export default {

    mounted(){
             const user=JSON.parse(localStorage.getItem("user"))

      //  const user=JSON.parse(getCookie('user'));

      this.userdetail.userid=user.id
      this.userdetail.usertype=user.type
   this.postRequest("/api/answer/selectexamanswer",this.userdetail).then(resp=>{
         this.examlist=resp.obj
          for(let i=0;i<this.examlist.length;i++)
     {
     this.examlist[i].examStartDate=this.$moment(this.examlist[i].examStartDate).format("YYYY-MM-DD HH:mm:ss")
     this.examlist[i].examEndDate=this.$moment(this.examlist[i].examEndDate).format("YYYY-MM-DD HH:mm:ss")

     }
      });
   },
   data(){
       return{
         photos:[],
         userdetail:{},
          currentPage:1, //初始页
               pagesize:10,    //    每页的数据
          examlist:[],
          examdetaillist:[],
        
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
         alert() {
        this.$message({
          message: '这个考试你已经参加过了',
          type: 'warning'
        });
      },
       alert1() {
        this.$message({
          message: '这个考试暂未开始',
          type: 'warning'
        });
      },
       alert2() {
        this.$message({
          message: '这个考试已经结束',
          type: 'warning'
        });
      },
       pushcontext(index, row)
       {
         let params=(index, row);
         let endtime=(new Date().getTime()+1000*60*params.examTimeLimit)
         sessionStorage.setItem('params',JSON.stringify(params));
         sessionStorage.setItem('endtime',endtime)
            this.examdetaillist=JSON.parse(sessionStorage.getItem('params'))
                 this.postRequest('/api/answer/selectexamquestion',this.examdetaillist).then(resp=>{   
             sessionStorage.setItem('questions',resp.obj)
             this.$router.push("/answer/Examcontext");
});
   
//            let { href } = this.$router.resolve('/answer/Examcontext')
// window.open(href, '_blank')
   

                
//  this.$router.replace('/answer/Examcontext').catch(err => {
//    console.log(err)
// })
       },
    getswitch(row,column,cellValue){
          return examswitch[cellValue]
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