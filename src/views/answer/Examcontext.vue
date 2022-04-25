<!--
 * @Author: your name
 * @Date: 2022-03-17 13:43:16
 * @LastEditTime: 2022-04-25 15:12:33
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \exam\src\views\answer\Examcontext.vue
-->
<template>
<div v-visibility-change="pageHidden">
 
  <div>
  <h2 style="text-align: center;">考试名字：{{this.examlist.examName}}</h2>
  </div>
  <div>
    <h1 style="text-align: center;">考试时间：{{this.examlist.examTimeLimit}}分钟</h1>

<count-down 
style="text-align: center;"
v-on:end_callback="countDownE_cb()"
                :currentTime="currentTime"
                :startTime="startTime"
                :endTime="endTime"
                :tipTextEnd="'距离考试结束还剩'"
                :endText="'考试已结束'"
                :dayTxt="'天'"
                :hourTxt="'小时'"
                :minutesTxt="'分钟'"
                :secondsTxt="'秒'">
</count-down>
  </div>
  <div v-for="(item, index) in questions">  
<h3>{{(index+1)+':'+item.question.questionName}}</h3>
<h4>{{item.question.questionDescription}}</h4>
  <viewer   v-if="item.question.questionPhotos!='' "  :images="photos"
   >
         <img style="width: 150px;height: 150px; cursor:pointer" :src="item.question.questionPhotos" :key="item.question.questionPhotos">
   </viewer>
  <el-radio-group v-if="item.question.questionTypeId!=2"
       v-model="item.answer"
      >
        <div       v-for="(item, index) in item.questionoptions"
         :key="index"
         style="margin-top:30px"
        
          >
      <el-radio  :label="item.questionOptionId"
              >{{optionname[index]+'     '+item.questionOptionContent}}
              </el-radio>
        </div>
 </el-radio-group>       
  <el-checkbox-group  v-model="item.answer"  v-if="item.question.questionTypeId==2"  > 
     
    <div v-for="(item, index) in item.questionoptions" 
     :key="index"
         style="margin-top:30px"
    >
<el-checkbox 

:label="item.questionOptionId"
:key="item.questionOptionId"

>{{optionname[index]+'     '+item.questionOptionContent}}


</el-checkbox>
    </div>
         </el-checkbox-group>

  </div >
  <div style="text-align:center">
               <el-button   type="success" round @click="submit">提交</el-button>
</div>
  </div>
</template>

<script>
import  { getCookie }from '../../utils/util.js';
import CountDown from './count.vue'
export default {
   components: {
    CountDown
},

  mounted(){
    //防止切换页面
  this.times=0;
    //
    const testtype=sessionStorage.getItem("testtype")
    this.type=testtype;
           const user=JSON.parse(localStorage.getItem("user"))

      //  const user=JSON.parse(getCookie('user'));

      this.userdetail.userid=user.id
      this.userdetail.usertype=user.type
        this.examlist=JSON.parse(sessionStorage.getItem('params'))
    //  this.postRequest('/api/answer/selectexamquestion',this.examlist).then(resp=>{   
        // console.log(resp.obj);
        this.questions=JSON.parse(sessionStorage.getItem('questions'));
        for(let i=0;i<this.questions.length;i++)
        {
          if(this.questions[i].question.questionTypeId==2)

          {
          this.$set (this.questions[i],"answer",[]);
          }
          else
          {
         this.$set (this.questions[i],"answer",'');
          }
        }
        console.log(this.questions)
      //  });
  },
data(){
    return{
      type:0,
      times:0,
      photos:[],
        params:{},
        optionname:["A","B","C","D","E","F","G","H","I","J","K"],
        questions:'',
        examlist:[],
          userdetail:{
        usertype:'',
        userid:''
      },
        currentTime:new Date().getTime(),
        startTime:new Date().getTime(),
        endTime:JSON.parse(sessionStorage.getItem('endtime'))

    }
},
methods:{
  pageHidden(evt,hidden)
  {
    if(hidden === false)
  { 
  
if(this.times<5)
{
   this.$alert('请不要切换页面，这是第'+(this.times+1)+"次警告，五次后将自动提交考卷", '警告', {
          confirmButtonText: '确定',
          callback: action => {
              this.times++;

          }
        });
}
else{
  
    this.params.examlist=this.examlist;
     this.params.questions=this.questions;
     this.params.userdetail=this.userdetail;

  this.postRequest('/api/answer/submitexam',this.params).then(resp=>{   
  
  this.$router.push("/answer/Examanswer");

     
         })
}
}
  },
  submit(){
// console.log(this.questions)
 
     this.params.examlist=this.examlist;
     this.params.questions=this.questions;
     this.params.userdetail=this.userdetail;

         this.$confirm('此操作将提交试卷, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
      this.postRequest('/api/answer/submitexam',this.params).then(resp=>{   
  if(this.type==1)
  {
  this.$router.push("/exam/Randomexam");

  }
  else{
      this.$router.push("/answer/Examanswer");

  }

     
         });
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交'
          });          
        });


    
   
  },
  countDownS_cb: function (x) {
    console.log("1")
  },
  countDownE_cb: function (x) {
    console.log(this.currentTime)
  }
}
}
</script>

<style>

</style>