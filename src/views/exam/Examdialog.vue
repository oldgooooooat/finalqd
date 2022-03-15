<!--
 * @Author: your name
 * @Date: 2022-03-11 13:28:15
 * @LastEditTime: 2022-03-14 13:38:38
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \exam\src\views\exam\Examdialog.vue
-->
<template>
<el-dialog
  title="考试详情"
  :visible.sync="examdialogdisplay"
  width="40%"
  :before-close="close"
  :close-on-click-modal="false"
 >
                            <el-form ref="form" :model="form" label-width="80px">

  <el-tag
  v-show="putdisplay"
  >考试名称</el-tag>
<el-input
v-show="putdisplay"
  v-model="form.examdetail.examName"
  :disabled="disabled"
>
 </el-input>
 <el-tag
 v-show="putdisplay"
 >考试描述</el-tag>
<el-input
v-show="putdisplay"
  v-model="form.examdetail.examDescription"
  :disabled="disabled"
>
 </el-input>
  <el-tag
  v-show="putdisplay"
  >考试持续时间</el-tag>
<el-input
v-show="putdisplay"
  v-model="form.examdetail.examTimeLimit"
  :disabled="disabled"
>
 </el-input>
  <el-tag
  v-show="putdisplay"
  >考试起始结束时间</el-tag>
  <div>
   <el-date-picker
   v-show="putdisplay"
      v-model="form.examtime"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="timestamp"
      :disabled="disabled">
    </el-date-picker>
  </div>
     <el-transfer
    filterable
    filter-placeholder="请输入题目"
    v-model="form.answer"
    v-show="choosedisplay"
    :data="data"
    :titles="['题库', '考试']"
    >
  </el-transfer>

    <div v-for="(item,i) in question"  v-show="questiondisplay">
   <el-tag>问题标题{{i+1}}</el-tag>

  <el-input
  v-model="item.questionName"
  :disabled="disabled"
  >
 </el-input> 
<el-tag>问题描述{{i+1}}</el-tag>
  <el-input
  type="textarea"
  v-model="item.questionDescription"
  :disabled="disabled"
 >
 </el-input> 
   </div>
  

                            </el-form>
                            <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="close()">关  闭</el-button>
    <el-button @click="next()" v-show="button1" >下一步</el-button>
    <el-button @click="back()"v-show="button2">上一步</el-button>
     <el-button type="primary" @click="submit()" v-show="button2">提交</el-button>

    <el-button type="primary" v-show="!this.bianji"  @click="showquestion">题目详情</el-button>
  

  </div>
  </el-dialog>
 
</template>

<script>
export default {
    mounted(){
      if(this.bianji==true){
        this.disabled=false 
        this.button1=true
      }
      
     
      console.log(this.bianji)
        this.form.examdetail=this.examdialoglist
        this.form.examtime.push(this.getTimestamp(this.form.examdetail.examStartDate))
        this.form.examtime.push(this.getTimestamp(this.form.examdetail.examEndDate))
         this.postRequest("/api/exam/getexamquestion",this.form.examdetail).then(resp=>{
    
         this.question=resp.obj
          for(let i=0;i<this.question.length;i++)
          {
            this.form.answer.push(this.question[i].questionId);
          }
      });
 
    },
    data(){
       const generateData = _ => {
        const data = [];
        for (let i = 1; i <= this.questionlist.length; i++) {
          data.push({
            key: this.questionlist[i-1].questionId,
            label: `${ this.questionlist[i-1].questionName}（${this.questionlist[i-1].questionCategoryName}）`,
            
          });
        }
        return data;
      };
        return{
          button1:false,
          button2:false,
          putdisplay:true,
          choosedisplay:false,
          questiondisplay:false,
          disabled:true,
          question:[],
           data:generateData(),
            form:{
            answer:[],
            examdetail:[],
            examtime:[]
            }
        }
    },
    methods:{
      submit(){
        
     

         this.$confirm('您确定要保存修改吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postRequest("/api/exam/changeexam",this.form).then(resp=>{
                this.$emit('update:examdialogdisplay',false);
                location.reload();
      })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消保存'
          });          
        });
            
      },
      next(){
        console.log(this.form.examdetail)
       if( this.form.examdetail.examName.replace(/(^s*)|(s*$)/g, "").length !=0 &&
                  this.form.examdetail.examDescription.replace(/(^s*)|(s*$)/g, "").length !=0 &&
                 this.form.examdetail.examTimeLimit!=0 &&
                  this.form.examtime.length!=0)
                  {
                
       this.button1=false
       this.button2=true
       this.putdisplay=false
       this.choosedisplay=true;
                  }
                     else
                  {
                    this.$message.error('请输入所有项目');
                  }
      },
        back(){
       this.button1=true
       this.button2=false
       this.putdisplay=true
       this.choosedisplay=false;
      },
        getTimestamp(time){
            
          return (new Date(time).getTime())
        },
        showquestion(){
this.questiondisplay=!this.questiondisplay
        },
   close(){
     console.log(this.questionlist)
     console.log(this.examdialoglist)
                this.$emit('update:examdialogdisplay',false);
                // location.reload();
            },
    },
 props: {
             bianji:false,
            questionlist:[],
           examdialoglist:[],
          
            examdialogdisplay: {
                type: Boolean,
                default: false
            },

        },
}
</script>

<style>

</style>
