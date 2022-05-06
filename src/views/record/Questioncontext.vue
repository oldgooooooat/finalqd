<!--
 * @Author: your name
 * @Date: 2022-04-11 14:30:52
 * @LastEditTime: 2022-05-05 09:24:39
 * @LastEditors: oldgooooooat 2697055747@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \exam\src\views\record\Questioncontext.vue
-->
<template>
<div>
 <div style="font-size: 20px">

    <i class="el-icon-back" @click="back()">返回</i>
  </div>
 <div style="margin-top:50px">
  
  <div>
          <div style="display: inline-block;">

   <h3>{{this.questiondeteil.questionName}}</h3>
          </div>
         <div style="display: inline-block;">

         <i style="font-size:20px"  v-show="this.collection==1" @click="Collectionoff" class="el-icon-star-on" ></i> 
          <i id="index" v-show="this.collection==0"  @click="Collection" class="el-icon-star-off"   ></i>
         </div>
  </div>
    <h4>{{this.questiondeteil.questionDescription}}</h4>

      <viewer   v-if="this.questiondeteil.questionPhotos!='' "  :images="photos"
   >
         <img style="width: 150px;height: 150px; cursor:pointer" :src="this.questiondeteil.questionPhotos" :key="this.questiondeteil.questionPhotos">
   </viewer>
    <el-radio-group  v-if="this.questiondeteil.questionTypeId!=2"
       v-model=" this.options"  
      >

        <div       v-for="(item, index) in  this.options"
         
         style="margin-top:30px"
        
          >
      <el-radio  :label="item.questionOptionId"
             :disabled="true"
              >{{item.questionOptionContent}}
              </el-radio>
        </div>
 </el-radio-group>       
  <el-checkbox-group  v-model="this.options"  v-if="this.questiondeteil.questionTypeId==2"  > 
     
    <div v-for="(item, indexb) in this.options" 
   
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
                <hr />
                <div>
                           <h1>正确答案</h1>
         <div      v-for="(item2, indexd) in this.answeroptions"
     
         style="margin-top:30px"
          >          
             <h5 style="color: rgb(20, 186, 0)"  >{{item2.questionOptionContent}}</h5>
              </div>
                </div>
 </div>
</div>
</template>

<script>
export default {
  mounted(){
const params=JSON.parse(sessionStorage.getItem("question"))
  const user=JSON.parse(localStorage.getItem("user"))
      //  const user=JSON.parse(getCookie('user'));
      this.userid=user.id
      params.userid=this.userid
console.log(params)

  this.postRequest("/api/exam-record/getcollectionquestion",params).then(resp=>{
     this.collection=resp.obj
     console.log(resp.obj)
      });

       this.postRequest("/api/exam-record/getquestioncontext",params).then(resp=>{
            this.options=resp.obj[1];
            this.questiondeteil=resp.obj[0];
            this.answeroptions=resp.obj[2];
      });


  },
data(){
    return{
      userid:'',
        collection:'',
      photos:[],
            questiondeteil:[],
           options:[],
           answeroptions:[]
    }
},
methods:{
  Collection(){
    const params={};
    params.questionid=this.questiondeteil.questionId;
    params.userid=this.userid;
       this.postRequest("/api/exam-record/addcollectionquestion",params).then(resp=>{
     
            this.collection++;
      });

  },
    Collectionoff(){
    const params={};
     params.questionid=this.questiondeteil.questionId;
    params.userid=this.userid;
       this.postRequest("/api/exam-record/deletecollectionquestion",params).then(resp=>{
     
            this.collection--;
      });

  },

    back()
  {
    this.$router.back()
  }
}
}

</script>

<style>

</style>
