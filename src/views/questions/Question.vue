
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>问题管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- Form -->
    <div style="float:right">
   <el-button type="success" @click="questioncategoryVisible = true" plain>科目管理</el-button>
  <el-button type="success" @click="dialogFormVisible = true" plain>添加问题</el-button>
  <el-button type="danger" @click="del()" plain>删除问题</el-button>

    </div>
    
<el-dialog title="添加问题" :visible.sync="dialogFormVisible">
 <el-steps :active="active" finish-status="success">
  <el-step title="步骤 1"></el-step>
  <el-step title="步骤 2"></el-step>
</el-steps>

  <el-form :model="form" :rules="rules" ref="FormRef" label-position="top" >
   <el-form-item v-show="active2" label="问题名称" prop="questionname" >
    <el-input v-model="form.questionname"></el-input>
  </el-form-item>
  <el-form-item v-show="active2" label="问题描述">
    <el-input v-model="form.questioncontext"></el-input>
  </el-form-item>
   <el-form-item v-show="active2" label="问题图片（url）">
    <el-input v-model="form.photos"></el-input>
  </el-form-item>
  <el-form-item v-show="active2" label="问题分数" prop="score" style="width:230px">
    <el-input v-model="form.score" type="number"></el-input>
  </el-form-item>
  <el-form-item v-show="active2" label="问题难度">
    <el-select v-model="form.difficulty" placeholder="请选择问题难度">
      <el-option label="易" value="1"></el-option>
      <el-option label="中" value="2"></el-option>
      <el-option label="难" value="3"></el-option>
    </el-select>


  </el-form-item>
  <el-form-item v-show="active2" label="问题类型">
    <el-select v-model="form.option" placeholder="请选择问题类型">
      <el-option label="单选题" value="1"></el-option>
      <el-option label="多选题" value="2"></el-option>
      <el-option label="判断题" value="3"></el-option>
    </el-select>
     </el-form-item>

      <el-form-item v-show="active2" label="问题科目" prop="score">

     <el-select v-show="active2" v-model="form.category" placeholder="请选择" >
    <el-option
      v-for="item in category"
      :key="item.value"
      :label="item.questionCategoryName"
      :value="item.questionCategoryId">
    </el-option>
      </el-select>
    
  </el-form-item>


  <el-form-item v-show="dx" label="正确答案" >
    <el-input  v-model="form.answer"></el-input>


  </el-form-item>
  <el-form-item v-show="pd" label="正确答案" >
  
   <el-select   v-model="form.answer" placeholder="请选择正确答案">
      <el-option label="对" value="对"></el-option>
      <el-option label="错" value="错"></el-option>
    </el-select>
  </el-form-item>


   <el-form-item v-show="dx"
    v-for="(domain, index) in form.wanswer"
    :label="'错误答案'"
    :key="domain.key"
    :prop="'wanswer.' + index + '.value'"
    :rules="{
      required: true, message: '错误答案不能为空', trigger: 'blur'
    }"
  >
    <el-input v-model="domain.value"></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>
  </el-form-item>
  <el-form-item v-show="dx" >
    <el-button @click="addDomain">新增错误选项</el-button>
  </el-form-item> 

  <el-form-item v-show="ddx"
    v-for="(domain2, index) in form.ranswer"
    :label="'正确答案'"
    :key="domain2.key"
    :prop="'ranswer.' + index + '.value'"
    :rules="{
      required: true, message: '正确不能为空', trigger: 'blur'
    }"
  >
    <el-input v-model="domain2.value"></el-input><el-button @click.prevent="removeDomain2(domain2)">删除</el-button>
  </el-form-item>

   <el-form-item v-show="ddx"
    v-for="(domain, index) in form.wanswer"
    :label="'错误答案'"
    :key="domain.key"
    :prop="'wanswer.' + index + '.value'"
    :rules="{
      required: true, message: '错误答案不能为空', trigger: 'blur'
    }"
  >
    <el-input v-model="domain.value"></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>
  </el-form-item>
   
  <el-form-item v-show="ddx" >
    <el-button @click="addDomain">新增错误选项</el-button>
    <el-button @click="addDomain2">新增正确选项</el-button>

  </el-form-item> 



  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button v-show="active1"type="primary" @click="back">上一步</el-button>
    <el-button v-show="active2" type="primary" @click="next">下一步</el-button>
     <el-button v-show="active1"type="primary" @click="submitFrom()">提交</el-button>

  </div>
</el-dialog>
<div>
  <el-table
    ref="multipleTable"
    :data="tabledata.slice((currentPage-1)*pagesize,currentPage*pagesize)"
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
     v-if="this.userdetail.usertype==1"
        prop="createname"
        label="创造人"
        width="100">
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
        <el-button @click="selectquestion2(scope.$index, scope.row)" type="text" size="small">查看</el-button>
        <el-button @click="selectquestion1(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
      </template>
     
    </el-table-column>


  </el-table>
<div>
      <el-pagination  class="footer"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[5, 10, 20, 40]" 
                            :page-size="pagesize"         
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="tabledata.length">    
                    </el-pagination>
</div>
</div>

<div>
          <question-dialog :questionVisible.sync="questionVisible"
          v-if="questionVisible"
          :questiondetail="questiondetail"
          :questiondisplay="questiondisplay"
          :category="category"
         ></question-dialog>


</div>
  <div>
         <question-category :questioncategoryVisible.sync="questioncategoryVisible"
          v-if="questioncategoryVisible"
          >
         </question-category>
  </div>
  </div>
</template>

<script>
import Pagination from '../../components/Pagination';
import  { getCookie }from '../../utils/util.js';
import questiondialog from'./Questiondialog.vue'
import questioncategory from './Questioncategory.vue'
 export const type={'1':'单选题','2':'多选题','3':'判断题'}
  export const difficult={'1':'易','2':'中','3':'难'}

 export default {
   components:{
  'question-dialog':questiondialog,
  'question-category':questioncategory
   },
    data() {
      return {
              currentPage:1, //初始页
               pagesize:10,    //    每页的数据
        questiondisplay:true,
        questionoptiondetail:[],
        questiondetail:[],
        questionVisible:false,
        questioncategoryVisible:false,
        active: 0,
        active1:false,
        active2:true,
        dx:false,
        pd:false,
        ddx:false,
    tabledata:[{

    }],
        category:[],
        worry:1,
        right:1,
        dialogFormVisible: false,
         formLabelWidth: '120px',
        rules: {
        questionname: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        score: [{ required: true, message: '请输入分数', trigger: 'blur' }]
      },
      userdetail:{
        usertype:'',
        userid:''
      },
        form: {
          photos:"",
          category:"",
          score:"",
          userid:"",
          wanswer: [{
            value: ''
          }],
          wanswervalue:[],
          ranswervalue:[],
          ranswer: [{
            value: ''
          }],
          questionname:null,
          questioncontext: null,
          difficulty: "1",
          option:"1",
          pdanswer:null,
          answer:null,
          multipleSelection: []
      
        }
       
      };
     
    },
    mounted(){
      
      const user=JSON.parse(getCookie('user'));
      console.log(222222222)
      console.log(user)
      this.userdetail.userid=user.id
      this.userdetail.usertype=user.type
      this.postRequest("/api/question/selectallquestion",this.userdetail).then(resp=>{
        
          this.tabledata=resp.obj;
          console.log(this.tabledata)
      });
      this.getRequest("/api/question/getcategory").then(resp=>{
          this.category=resp.obj;
      });
    },
     methods: {
        handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
        },
       submitFrom()
       {
                const user=JSON.parse(localStorage.getItem("user"))

          // const user=JSON.parse(getCookie('user'));
        this.form.userid=user.id;
         var submit=true;
         var submit2=true;
         var submit3=true;
         if(this.form.option=="1")
         {
           if(this.form.answer.replace(/(^s*)|(s*$)/g, "").length !=0)
           { 
           
             for(let i=0; i<this.form.wanswer.length;i++ )
              {
                submit=true;
                if(this.form.wanswer[i].value.replace(/(^s*)|(s*$)/g, "").length ==0)
                {
                  this.$message.error('请输入所有错误答案内容');
                  submit=false;
                  this.form.wanswervalue.length=0;
                  break;
                }
                this.form.wanswervalue.push(this.form.wanswer[i].value);
                
                
              }
             if(submit==true){
               
              this.postRequest('/api/question/addquestion',this.form ).then(resp=>{            
                    this.form.wanswervalue.length=0;
                    this.form.wanswer.length=1;
                    this.form.wanswer[0].value="";
                    this.form.answer="";
                    this.form.questionname="";
                    this.form.questioncontext="";
                    this.dialogFormVisible = false
                    this.back();

                         })
             }
   
           }
           else{
             this.$message.error('请输入正确答案内容');
           }
         }
         if(this.form.option=="3")
         {
            if(this.form.answer=="对"){
              this.form.pdanswer="错";
            }
            else{
              this.form.pdanswer="对";
            }
            
             this.postRequest('/api/question/addquestion',this.form ).then(resp=>{            
                       this.form.questioncontext="";
                         this.form.questionname="";

                    this.dialogFormVisible = false
                    this.back();
                         })
         }
         if(this.form.option=="2")
         {
                      
                        for(let i=0; i<this.form.ranswer.length;i++ )
              {
                submit2=true;
                if(this.form.ranswer[i].value.replace(/(^s*)|(s*$)/g, "").length ==0)
                {
                  this.$message.error('请输入所有正确答案内容');
                  submit2=false;
                  this.form.ranswervalue.length=0;
                  break;
                }
                this.form.ranswervalue.push(this.form.ranswer[i].value);
                
                
              }
               for(let i=0; i<this.form.wanswer.length;i++ )
              {
                submit3=true;
                if(this.form.wanswer[i].value.replace(/(^s*)|(s*$)/g, "").length ==0)
                {
                  this.$message.error('请输入所有错误答案内容');
                  submit3=false;
                  this.form.wanswervalue.length=0;
                  break;
                }
                this.form.wanswervalue.push(this.form.wanswer[i].value);
              }
                if(submit2==true&&submit3==true){
               
              this.postRequest('/api/question/addquestion',this.form ).then(resp=>{            
                    this.form.wanswervalue.length=0;
                    this.form.ranswervalue.length=0;
                    this.form.wanswer.length=1;
                    this.form.wanswer[0].value="";
                    this.form.ranswer.length=1;
                    this.form.ranswer[0].value="";
                    this.form.questioncontext="";
                    this.form.questionname="";
                    this.dialogFormVisible = false
                    this.back();
                    
                         })
             }
            

         }
        location.reload();
       },

      next() { if(this.form.questionname.replace(/(^s*)|(s*$)/g, "").length !=0 &&
                  this.form.score.replace(/(^s*)|(s*$)/g, "").length !=0 &&
                  this.form.category.length !=0
                  
                  ){
        if(this.form.option=="1")
        {
          this.dx=true;
        }
        else if(this.form.option=="3")
        {
          this.pd=true;
        }
         else if(this.form.option=="2")
        {
          this.ddx=true;
        }
        this.active++
        this.active1=true
        this.active2=false
      }
        else{
                  this.$message.error('请输入带*的项目');
        }

      },
       back() {
        this.active--
         this.active1=false
        this.active2=true
        this.dx=false
        this.pd=false
        this.ddx=false
      },
        removeDomain(item) {
        var index = this.form.wanswer.indexOf(item)

        if (index >=-1 && this.worry>1) {
          this.form.wanswer.splice(index, 1)
          this.worry--;
        }
        else
        {
          this.$message.error('不能删除全部错误选项');      
        }
      },
      removeDomain2(item) {
        var index = this.form.ranswer.indexOf(item)

        if (index >=-1 && this.right>1) {
          this.form.ranswer.splice(index, 1)
          this.right--;
        }
        else
        {
          this.$message.error('不能删除全部正确选项');      
        }
      },
       removeDomain2(item) {
        var index = this.form.ranswer.indexOf(item)

        if (index >=-1 && this.right>1) {
          this.form.ranswer.splice(index, 1)
          this.right--;
        }
        else
        {
          this.$message.error('不能删除全部错误选项');      
        }
      },
      addDomain() {
        this.form.wanswer.push({
          value: '',
          key: Date.now()
        })
        this.worry++;
      },

      addDomain2() {
        this.form.ranswer.push({
          value: '',
          key: Date.now()
        })
        this.right++;
      },
          toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
     del(){


          this.$confirm('此操作将永久删除问题, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postRequest('/api/question/deletequestion',this.multipleSelection ).then(resp=>{                           
                      location.reload();  
                         })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
                         },
     gettype(row,column,cellValue){
          return type[cellValue]
     },
     getdiffcult(row,column,cellValue){
          return difficult[cellValue]
     },
     selectquestion1(index, row){
        this.questiondisplay=false
        this.questiondetail=(index,row);
        this.questionVisible=true;
       },
        selectquestion2(index, row){
        this.questiondisplay=true;
        this.questiondetail=(index,row);
        this.questionVisible=true;
       }
      
    }
  };
   
</script>

<style scoped>

.footer{

height: 100px;

width: 100%;

text-align: center;
position: fixed;

bottom: 0;

}
</style>

 
 