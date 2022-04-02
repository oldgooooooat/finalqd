<!--
 * @Author: your name
 * @Date: 2022-03-31 09:09:31
 * @LastEditTime: 2022-04-01 13:55:07
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \exam\src\views\exam\Randomexam.vue
-->
<template>
   <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>随机考试</el-breadcrumb-item>
    </el-breadcrumb>
       <el-button type="primary"   @click="dialogVisible = true" plain style="float:right" >添加考试</el-button>
         <el-button type="danger" style="float:right" @click="del()" plain>删除考试</el-button>
           <el-table

              ref="multipleTable"
    tooltip-effect="dark"
    @selection-change="handleSelectionChange"
      :data="randomexamlist.slice((currentPage-1)*pagesize,currentPage*pagesize)"
 
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
      fixed="right"
      label="操作"
      width="100"
      align="center">
      <template slot-scope="scope">
        <el-button  type="text"  @click="pushcontext(scope.$index, scope.row)"  size="small">考试</el-button>


      </template>
          </el-table-column>

    </el-table>
    
    <div>

      <el-dialog
  title="添加考试"
  :visible.sync="dialogVisible"
  width="30%"
  >
  <el-form  label-width="80px" :model="Form">
  <el-form-item label="考试名称">
    <el-input v-model="Form.examname"></el-input>
  </el-form-item>
  <el-form-item label="考试描述">
    <el-input v-model="Form.context"></el-input>
  </el-form-item>

  <el-form-item label="考试时间">
    <el-input type="number"  v-model="Form.examtime"></el-input>
  </el-form-item>
  
  <el-form-item label="题目数量">
    <el-input type="number"  v-model="Form.questions"></el-input>
  </el-form-item>
  
    <el-form-item  label="问题科目" >

     <el-select  v-model="Form.category" placeholder="请选择" >
    <el-option
      v-for="item in category"
      :key="item.value"
      :label="item.questionCategoryName"
      :value="item.questionCategoryId">
    </el-option>
      </el-select>
      
    
  </el-form-item>
   <el-form-item label="问题难度">
    <el-select v-model="Form.difficulty" placeholder="请选择问题难度">
      <el-option label="易" value="1"></el-option>
      <el-option label="中" value="2"></el-option>
      <el-option label="难" value="3"></el-option>
    </el-select>


  </el-form-item>

</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </span>
</el-dialog>


    </div>
      <div>
               <el-pagination  class="footer"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[5, 10, 20, 40]" 
                            :page-size="pagesize"         
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="randomexamlist.length">    
                    </el-pagination>
     </div>
        </div>
</template>

<script>
import  { getCookie }from '../../utils/util.js';
 export const examswitch={'1':'未开启','2':'持续中','3':'已结束'}

export default {


mounted(){
  const user=JSON.parse(getCookie('user'));

      this.userdetail.userid=user.id
      this.userdetail.usertype=user.type
      this.Form.userid=this.userdetail.userid
 this.postRequest("/api/exam/getrandomexam",this.userdetail).then(resp=>{
          this.randomexamlist=resp.obj;
      });
   this.getRequest("/api/question/getcategory").then(resp=>{
          this.category=resp.obj;
      });

},
data(){
    return{
          currentPage:1, //初始页
               pagesize:10,    //    每页的数据
        Form:{
          examname:'',
           context:'',
           category:'',
           difficulty:'',
           userid:'',
          examtime:'',
          questions:'',

        },
        dialogVisible:false,
              currentPage:1, //初始页
               pagesize:10,    //    每页的数据
      userdetail:{},
      randomexamlist:[],
      category:[],
      multipleSelection:[]

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
       pushcontext(index, row)
       {
         
         let params=(index, row);
         console.log(params)
         let endtime=(new Date().getTime()+1000*60*params.examTimeLimit)
         sessionStorage.setItem('params',JSON.stringify(params));
         sessionStorage.setItem('endtime',endtime)
            this.examdetaillist=JSON.parse(sessionStorage.getItem('params'))
                 this.postRequest('/api/answer/selectexamquestion',this.examdetaillist).then(resp=>{   
             sessionStorage.setItem('questions',resp.obj)
});
   

         this.$router.push("/answer/Examcontext");

                

       },
    submit(){
        if( 
                  this.Form.examname.replace(/(^s*)|(s*$)/g, "").length !=0 &&
                  this.Form.context.replace(/(^s*)|(s*$)/g, "").length !=0 &&
                  this.Form.category.length !=0 &&
                  this.Form.difficulty.length !=0&&
                  this.Form.questions.length!=0&&
                    this.Form.examtime.length!=0
                  ){

 this.$confirm('此操作将创建考试, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.postRequest('/api/exam/addrandomexam',this.Form).then(resp=>{                           
                   
                         })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消创建'
          });          
        });
        }
        else{
              this.$message.error("请设置所有参数")
        }
    },

    handleSelectionChange(val) {
        this.multipleSelection = val;
      },
        getswitch(row,column,cellValue){
          return examswitch[cellValue]
     },
}

}
</script>

<style>

</style>