<!--
 * @Author: your name
 * @Date: 2022-03-17 13:43:16
 * @LastEditTime: 2022-03-19 14:41:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \exam\src\views\answer\Examcontext.vue
-->
<template>
<div>
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

  <el-radio-group v-if="item.question.questionTypeId!=2"
       v-model="item.answer"
      >
        <div       v-for="(item, index) in item.questionoptions"
         :key="index"
         style="margin-top:30px"
        
          >
      <el-radio  :label="item.questionOptionId"
              >{{item.questionOptionContent}}
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

>{{item.questionOptionContent}}


</el-checkbox>
    </div>
         </el-checkbox-group>

  </div>
               <el-button type="success" round @click="submit">成功按钮</el-button>

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
       const user=JSON.parse(getCookie('user'));

      this.userdetail.userid=user.id
      this.userdetail.usertype=user.type
   this.examlist=JSON.parse(sessionStorage.getItem('params'))
     this.postRequest('/api/answer/selectexamquestion',this.examlist).then(resp=>{   
        console.log(resp.obj);
        this.questions=JSON.parse(resp.obj);
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
       });
  },
data(){
    return{
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
  submit(){
// console.log(this.questions)
     this.params.examlist=this.examlist;
     this.params.questions=this.questions;
     this.params.userdetail=this.userdetail;
     console.log(this.params)
     this.postRequest('/api/answer/submitexam',this.params).then(resp=>{   
 
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