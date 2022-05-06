<!--
 * @Author: your name
 * @Date: 2022-04-11 10:52:57
 * @LastEditTime: 2022-05-06 10:53:35
 * @LastEditors: oldgooooooat 2697055747@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \exam\src\views\record\Questioncollection.vue
-->
<template>
<div>
 <div>
       <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的收藏</el-breadcrumb-item>
    </el-breadcrumb>
        <div style="float:right">
          <el-button type="danger" @click="del()" plain>删除问题</el-button>
        </div>
 </div>
 <div>
 <div>
  <el-table
    ref="multipleTable"
        :data="collectionlist.slice((currentPage-1)*pagesize,currentPage*pagesize)"
    tooltip-effect="dark"
    style="width: 100%"
        @selection-change="handleSelectionChange"

    >
    <el-table-column
      type="selection"
      width="55"
      align="center">
    </el-table-column>

  <el-table-column
      prop="questionName"
      label="问题名称"
      width="200"
      align="center">
    </el-table-column>

    
    <el-table-column
      prop="questionCategoryName"
      label="问题科目"
      width="120"
      align="center">
    </el-table-column>
    <el-table-column
      prop="questionScore"
      label="问题分数"
      width="120"
      align="center">
    </el-table-column>
   
<el-table-column
      prop="questionLevelId"
      label="问题难度"
      width="120"
      align="center"
      :formatter="getdiffcult">
    </el-table-column>
     <el-table-column
      prop="questionTypeId"
      label="问题类型"
      width="120"
      align="center"
      :formatter="gettype">
    </el-table-column>
  <el-table-column
      prop="questionDescription"
      label="问题简介"
      width="500"
      align="center"
      :show-overflow-tooltip="true">
    </el-table-column>
        <el-table-column
      fixed="right"
      label="操作"
      width="100"
      align="center">
      <template slot-scope="scope">
        <el-button  type="text" @click="pushcontext(scope.$index, scope.row)" size="small">查看</el-button>
      </template>
     
    </el-table-column>


  </el-table>
 </div>
</div>
 <div>
               <el-pagination  class="footer"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[5, 10, 20, 40]" 
                            :page-size="pagesize"         
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="collectionlist.length">    
                    </el-pagination>
     </div>
</div>
</template>

<script>
 export const type={'1':'单选题','2':'多选题','3':'判断题'}
  export const difficult={'1':'易','2':'中','3':'难'}

export default {
    mounted(){
         const user=JSON.parse(localStorage.getItem("user"))

      //  const user=JSON.parse(getCookie('user'));

      this.userdetail.userid=user.id
      this.userdetail.usertype=user.type
       this.postRequest("/api/exam-record/getallcollectionquestion",this.userdetail).then(resp=>{
             
            this.collectionlist=resp.obj
      });
    },
data(){
    return{
          currentPage:1, //初始页
               pagesize:5,    //    每页的数据
        collectionlist:[],

            userdetail:{
        usertype:'',
        userid:''
      },
       multipleSelection: []
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
          handleSelectionChange(val) {
        this.multipleSelection = val;
      },
          gettype(row,column,cellValue){
          return type[cellValue]
     },
     getdiffcult(row,column,cellValue){
          return difficult[cellValue]
     },
     pushcontext(index, row){
       const param=JSON.stringify((index, row))
       console.log(param)
       sessionStorage.setItem("question",param)
                  this.$router.push({name:'题目详细'});
     },
     del(){
                this.$confirm('此操作将删除收藏问题, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            const param={}
            param.userid=this.userdetail.userid;
            param.questions=JSON.stringify(this.multipleSelection)
            
          this.postRequest('/api/exam-record/deletecollection',param ).then(resp=>{                           
                      location.reload();  
                         })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

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