<!--
 * @Author: your name
 * @Date: 2022-03-11 13:28:15
 * @LastEditTime: 2022-05-05 10:23:20
 * @LastEditors: oldgooooooat 2697055747@qq.com
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

<el-steps :active="active" finish-status="success" v-show="bianji&&fenpei">
  <el-step title="步骤 1"></el-step>
 
  <el-step title="步骤 2"></el-step>
  

</el-steps>
  <el-tag
  v-show="active==0&&fenpei==false"
  >考试名称</el-tag>
<el-input
v-show="active==0&&fenpei==false"
  v-model="form.examdetail.examName"
  :disabled="disabled"
>
 </el-input>
 <el-tag
 v-show="active==0&&fenpei==false"
 >考试描述</el-tag>
<el-input
v-show="active==0&&fenpei==false"
  v-model="form.examdetail.examDescription"
  :disabled="disabled"
>
 </el-input>
  <el-tag
  v-show="active==0&&fenpei==false"
  >考试持续时间</el-tag>
<el-input
v-show="active==0&&fenpei==false"
  v-model="form.examdetail.examTimeLimit"
  :disabled="disabled"
>
 </el-input>
   <el-tag
  v-show="active==0&&fenpei==false"
  >考试后立即回看</el-tag>
<div>
    <el-select v-model="form.examdetail.examReview" :disabled="disabled" >
      <el-option label="是" :value="1"></el-option>
      <el-option label="否" :value="0"></el-option>
    
    </el-select>
</div>
 
  <el-tag
  v-show="active==0&&fenpei==false"
  >考试起始结束时间</el-tag>
  <div>
   <el-date-picker
   v-show="active==0&&fenpei==false"
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
    v-show="active==1"
    :data="data"
    :titles="['题库', '考试']"
    >
  </el-transfer>
  <el-transfer
    filterable
    filter-placeholder="请输入题目"
    v-show="active==0&&fenpei==true"
    v-model="form.userlist"
    :data="userdata"
    :titles="['人员', '考试人员']"
    target-order="push"
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
    <el-button @click="next()" v-show="active<1&&bianji==true" >下一步</el-button>
    <el-button @click="back()"v-show="active>0">上一步</el-button>
     <el-button type="primary" @click="submit()" v-show="active==1 ">提交</el-button>
     <el-button type="primary" @click="submit()" v-show="active==0&&fenpei==true">提交</el-button>

    <el-button type="primary" v-show="!this.bianji&&fenpei==false"  @click="showquestion">题目详情</el-button>
  

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
     
     this.active==0
      console.log(this.fenpei)
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
 
       this.postRequest("/api/exam/getexamuser",this.form.examdetail).then(resp=>{
          this.user=resp.obj;
            for(let i=0;i<this.user.length;i++)
          {
            this.form.userlist.push(this.user[i].id);
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

          const generateuserData = _ => {
        const userdata = [];
        for (let i = 1; i <= this.userlist.length; i++) {
          userdata.push({
            key: this.userlist[i-1].id,
            label: `${ this.userlist[i-1].nickname}（${this.userlist[i-1].classname}）`,
            
          });
        }
        return userdata;
      };
      
        return{
          active:0,
          button1:false,
          button2:false,
          putdisplay:true,
          choosedisplay:false,
          questiondisplay:false,
          disabled:true,
          question:[],
          user:[],
           data:generateData(),
            userdata:generateuserData(),
            form:{
            userlist:[],
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
               this.active++;
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
          this.active--;
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
                     this.$emit('update:fenpei',false);

                this.$emit('update:examdialogdisplay',false);
                // location.reload();
            },
    },
 props: {
             userlist:[],
             bianji:false,
            questionlist:[],
           examdialoglist:[],
             fenpei:false,
            examdialogdisplay: {
                type: Boolean,
                default: false
            },

        },
}
</script>

<style>

</style>
