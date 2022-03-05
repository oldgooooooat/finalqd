<!--
 * @Author: your name
 * @Date: 2022-02-24 09:06:23
 * @LastEditTime: 2022-03-05 13:59:02
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \tesssst\src\views\goods\Questiondialog.vue
-->
<template>
    <div>
       <el-dialog title="问题详情" :visible.sync="questionVisible"  :before-close="close"
       :close-on-click-modal="false"
        >
                           <el-form ref="form" :model="form" label-width="80px">
                             <el-tag>问题名称</el-tag>
<el-input
  v-model="form.questiondetail1.questionName"
  :disabled="questiondisplay">
 </el-input>
        <el-tag>问题内容</el-tag>
<el-input
  type="textarea"
  v-model="form.questiondetail1.questionDescription"
  :disabled="questiondisplay">
 </el-input>
 <el-tag>问题图片</el-tag>
<el-input
  v-model="form.questiondetail1.questionPhotos"
  :disabled="questiondisplay">
 </el-input>
     <el-image v-if="form.questiondetail1.questionPhotos!='' "   :src="form.questiondetail1.questionPhotos"></el-image>


        <el-tag>问题类型</el-tag>
        <div>
    <el-select v-model="form.questiondetail1.questionTypeId"  :disabled="true" >
      <el-option label="单选题" :value="1"></el-option>
      <el-option label="多选题" :value="2"></el-option>
      <el-option label="判断题" :value="3"></el-option>
    </el-select>
    
      </div>
    
          <el-tag>问题科目</el-tag>
             <div>
    <el-select  v-model="form.questiondetail1.questionCategoryid" :disabled="questiondisplay" >
    <el-option
      v-for="item in category"
      :key="item.value"
      :label="item.questionCategoryName"
      :value="item.questionCategoryId">
    </el-option>
      </el-select>
      </div>
         <el-tag>问题难度</el-tag>
      <div>
       <el-select v-model="form.questiondetail1.questionLevelId" :disabled="questiondisplay" >
      <el-option label="易" :value="1"></el-option>
      <el-option label="中" :value="2"></el-option>
      <el-option label="难" :value="3"></el-option>
    </el-select>
      </div>
     
<div v-if="questiondetail.questionTypeId!=3">
<div v-for="(item,i) in form.rquestionoption" >
   <el-tag>正确答案{{i+1}}</el-tag>

  <el-input
  v-model="item.questionOptionContent"
  :disabled="questiondisplay">
 </el-input> 

   </div> 
    
   <div v-for="(item,i) in form.questionoptiondetail1" >
   <el-tag>错误答案{{i+1}}</el-tag>

  <el-input
  v-model="item.questionOptionContent"
  :disabled="questiondisplay">
 </el-input> 
   </div>
</div>
<div v-if="questiondetail.questionTypeId==3" v-for="(item,i) in form.rquestionoption" >
  
  <el-tag>正确答案</el-tag>
  <div>
  <el-select v-model="item.questionOptionContent" :disabled="questiondisplay" >
      <el-option label="对" value="对"></el-option>
      <el-option label="错" value="错"></el-option>

    </el-select>
  </div>
</div>
</el-form>



  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="close()">取 消</el-button>
    <el-button type="primary" @click="save()" :disabled="questiondisplay">保 存</el-button>
   
  </div>
</el-dialog>
    </div>
</template>
<script>
   export default {
       mounted(){
          // this.$set(this.questiondetail1,'questionTypeId',this.questiondetail.questionTypeId)
          // this.$set(this.questiondetail1,'questionLevelId',this.questiondetail.questionLevelId)
     this.postRequest('/api/question/selectquestionoption',this.questiondetail).then(resp=>{
        this.form.questionoptiondetail1=resp.obj
        this.split()
        
      })
      

       },
       data(){
           return {
     
 
        form: {
        questiondetail1:this.questiondetail,
        questionoptiondetail1:[],
        rquestionoption:[],
        wquestionoption:[],

          },
                  formLabelWidth: '120px'

           };
       },
       
        props: {
          questiondisplay:false,
            questionVisible: {
                type: Boolean,
                default: false
                // require: true // 必填
            },
            questiondetail:[],
            questionoptiondetail:[],
            category:[]
        },
      
        methods:{
            close(){
                      //  this.postRequest('/api/question/changequestion',this.form).then(resp=>{
                      //    console.log("111")
                      //    })

                this.$emit('update:questionVisible',false);
            },
            save()
            {
              
          this.$confirm('您确定要保存修改吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(this.form.questiondetail1.questionTypeId=="3")
          {
            if(this.form.rquestionoption[0].questionOptionContent=="对")
            {
              this.form.questionoptiondetail1[0].questionOptionContent="错"
            }
            else
            {
              this.form.questionoptiondetail1[0].questionOptionContent="对"
            }
          }
          this.postRequest('/api/question/changequestion',this.form ).then(resp=>{                           
                     location.reload();  
                this.$emit('update:questionVisible',false);

                         })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消保存'
          });          
        });
            },
            split(){
              let answer = this.form.questiondetail1.questionAnswerOptionIds.split('-');
              for(let i=0;i<answer.length;i++)
              {
                
                for(let j=0;j<this.form.questionoptiondetail1.length;j++)
                {
                  if(answer[i]===this.form.questionoptiondetail1[j].questionOptionId)
                  {
                    
                    this.form.rquestionoption.push(this.form.questionoptiondetail1[j]);
                    this.form.questionoptiondetail1.splice(j,1);
                  }
                }
              }

            }
          
        }
     
      
    }
  </script>