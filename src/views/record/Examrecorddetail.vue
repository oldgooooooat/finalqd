<!--
 * @Author: your name
 * @Date: 2022-03-25 14:12:48
 * @LastEditTime: 2022-04-06 09:04:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \exam\src\views\record\Examrecorddetail.vue
-->
<template>
<div>
    <div style="font-size: 20px">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-if="this.model==0" :to="{ path: '/record/Examrecord' }">考试记录</el-breadcrumb-item>
        <el-breadcrumb-item v-if="this.model!=0" :to="{ path: '/record/Examrecord' }">分数记录</el-breadcrumb-item>
      <el-breadcrumb-item >考试详情</el-breadcrumb-item>
    </el-breadcrumb> -->
    <i class="el-icon-back" @click="back()">返回</i>
  </div>
  <div>
  <h2 style="text-align: center;">考试名字：{{this.examdetail.examName}}</h2>
  </div>

  <div v-for="(item, index) in alldetail">  
    <div  >
<h3>{{(index+1)+':'+item.question.questionName}}</h3>
<h4 >{{item.question.questionDescription}}</h4>
  <viewer   v-if="item.question.questionPhotos!='' "  :images="photos"
   >
         <img style="width: 150px;height: 150px; cursor:pointer" :src="item.question.questionPhotos" :key="item.question.questionPhotos">
   </viewer>
    </div>
 <el-radio-group  v-if="item.question.questionTypeId!=2"
       v-model="item.answer"  

      >
        <div       v-for="(item, indexa) in item.questionoptions"
         
         style="margin-top:30px"
        
          >
      <el-radio  :label="item.questionOptionId"
             :disabled="true"
              >{{item.questionOptionContent}}
              </el-radio>
        </div>
 </el-radio-group>       
  <el-checkbox-group  v-model="item.answer"  v-if="item.question.questionTypeId==2"  > 
     
    <div v-for="(item, indexb) in item.questionoptions" 
   
         style="margin-top:30px"
    >
<el-checkbox 
:disabled="true"
:label="item.questionOptionId"
:key="item.questionOptionId"

>{{item.questionOptionContent}}


</el-checkbox>
    </div>
         </el-checkbox-group>
<div class='background'>
<h4>正确答案：</h4>
       <div      v-for="(item, indexc) in item.questionrightoptions"
       
      
          >
              <h5 >{{item.questionOptionContent}}</h5>
                             
                      
              
              </div>
</div>
     <div> 
       <div style="display:inline-block">    
      <h4>你的答案：</h4>
       </div>
       <div style="display:inline-block" >
      <i class="el-icon-check" v-show="item.correct==1" style="color: rgb(20, 186, 0);"> </i>
      <i class="el-icon-close" v-show="item.correct!=1" style="color: rgb(248, 9, 9);" > </i>
        </div>
     </div>
        <div      v-for="(item2, indexd) in item.answer"
     
         style="margin-top:30px"
          >          
             <h5 style="color: rgb(20, 186, 0)"  v-show="item.correct==1">{{item2.questionOptionContent}}</h5>
             <h5 style="color: rgb(248, 9, 9);"  v-show="item.correct!=1"  >{{item2.questionOptionContent}}</h5>
              </div>
          </div>
  
    </div>

  </div >


</div>
</template>

<script>
export default {
    mounted(){

 this.recorddetail=JSON.parse(sessionStorage.getItem('recorddetail'))
  this.model=JSON.parse(sessionStorage.getItem('model'))
 console.log(this.model)
  this.postRequest("/api/exam-record/getrecorddetail",this.recorddetail).then(resp=>{
        this.alldetail=JSON.parse(resp.obj)
        console.log(this.alldetail)
      });

       this.postRequest("/api/exam-record/getexamdetail",this.recorddetail).then(resp=>{
        this.examdetail=resp.obj
        console.log(this.examdetail)
        
      });
     
    },

data(){
    return{
      model:0,
      photos:[],
        show:false,
        examdetail:{},
        alldetail:[],
        recorddetail:{}
    }
},
methods:{
  back()
  {
    this.$router.back()
  }
}
}
</script>

<style>
.background{
  border:1px solid #000;
  background:rgb(209, 209, 209)
}
</style>