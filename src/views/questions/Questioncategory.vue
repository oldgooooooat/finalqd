<!--
 * @Author: your name
 * @Date: 2022-03-01 13:22:48
 * @LastEditTime: 2022-03-01 15:09:14
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \exam\src\views\questions\Questioncategory.vue
-->
<template>
    <div>
       <el-dialog title="问题详情" :visible.sync="questioncategoryVisible"  :before-close="close"
       :close-on-click-modal="false"
        >
          <el-button type="success" @click="dialogVisible1 = true" plain>添加问题</el-button>
<el-dialog
  title="科目添加"
  :visible.sync="dialogVisible1"
  width="30%"
  append-to-body
  >

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
   <el-form-item label="科目名称" prop="questionCategoryName">
    <el-input v-model="ruleForm.questionCategoryName"></el-input>
  </el-form-item>
   <el-form-item label="科目描述" prop="questionCategoryDescription">
    <el-input v-model="ruleForm.questionCategoryDescription"></el-input>
  </el-form-item>
   </el-form>

<div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="close2()">取 消</el-button>
    <el-button type="primary" @click="save()">保 存</el-button>

  </div>

</el-dialog>
<el-dialog
  title="科目编辑"
  :visible.sync="dialogVisible2"
  width="30%"
  append-to-body
  >

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
   <el-form-item label="科目名称" prop="questionCategoryName">
    <el-input v-model="ruleForm.questionCategoryName"></el-input>
  </el-form-item>
   <el-form-item label="科目描述" prop="questionCategoryDescription">
    <el-input v-model="ruleForm.questionCategoryDescription"></el-input>
  </el-form-item>
   </el-form>

<div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="close3()">取 消</el-button>
    <el-button type="primary" @click="update()">保 存</el-button>

  </div>

</el-dialog>
        <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="questionCategoryName"
      label="科目"
      width="180">
    </el-table-column>
    <el-table-column
      prop="questionCategoryDescription"
      label="科目描述"
      width="250">
    </el-table-column>
    <el-table-column
      
      label="操作"
      align="center"
       width="120">
       <template slot-scope="scope">
        <el-button @click="choose(scope.$index, scope.row)" type="text" size="small">编辑</el-button>

      </template>
    </el-table-column>
  </el-table>


  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="close()">关 闭</el-button>
   
  </div>
</el-dialog>
    </div>
</template>
<script>
   export default {
       mounted(){
          this.select();
       },
       data(){
           return {
             dialogVisible1: false,
             dialogVisible2: false,

                 ruleForm:{
                  questionCategoryName:'',
                  questionCategoryDescription:''
                 },
                  rules: {
          questionCategoryName: [
            { required: true, message: '请输入科目名称', trigger: 'blur' },
          ],
          questionCategoryDescription: [
            { required: true, message: '请输入科目描述', trigger: 'blur' },
          ],
          },
            
        tableData: [
            ],
                  formLabelWidth: '120px'

           };
       },
        props: {
        //   questiondisplay:false,
            questioncategoryVisible: {
                type: Boolean,
                default: false
                // require: true // 必填
            },
            // questiondetail:[],
            // questionoptiondetail:[]
        },
      
        methods:{
            close(){
                      //  this.postRequest('/api/question/changequestion',this.form).then(resp=>{
                      //    console.log("111")
                      //    })

                this.$emit('update:questioncategoryVisible',false);
            },
            close2(){
             this.dialogVisible1=false
            },
             close3(){
             this.dialogVisible2=false
            },
            choose(index, row){
              this.dialogVisible2=true
              this.ruleForm=(index,row)
            },
            select(){
   this.getRequest('/api/question/getcategory').then(resp=>{
            
        this.tableData=resp.obj
      })
            },
            update()
            {
                if(this.ruleForm.questionCategoryName.replace(/(^s*)|(s*$)/g, "").length ==0 ||
                   this.ruleForm.questionCategoryDescription.replace(/(^s*)|(s*$)/g, "").length ==0)
                   {
                        this.$message.error('请输入科目名称和描述');
                   }
                else
                {
                            this.postRequest('/api/question/updatecategory',this.ruleForm).then(resp=>{
            this.dialogVisible2=false;
            this.ruleForm.questionCategoryName='';
            this.ruleForm.questionCategoryDescription='';
            this.select();
           
      })
                }

            },
            save(){
                if(this.ruleForm.questionCategoryName.replace(/(^s*)|(s*$)/g, "").length ==0 ||
                   this.ruleForm.questionCategoryDescription.replace(/(^s*)|(s*$)/g, "").length ==0)
                   {
                        this.$message.error('请输入科目名称和描述');
                   }
                else
                {
                            this.postRequest('/api/question/savecategory',this.ruleForm).then(resp=>{
            this.dialogVisible1=false;
            this.ruleForm.questionCategoryName='';
            this.ruleForm.questionCategoryDescription='';
            this.select();
           
      })
                }


            }
      
           
          
        }
     
      
    }
  </script>