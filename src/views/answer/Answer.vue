<!--
 * @Author: your name
 * @Date: 2022-03-02 13:14:23
 * @LastEditTime: 2022-03-03 15:14:55
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \exam\src\views\answer\answer.vue
-->
<template>
<div>
    
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>自由回答</el-breadcrumb-item>
    </el-breadcrumb>
<div style="float:right">
    <el-tag>科目选择</el-tag>

  <el-select  v-model="form.category" placeholder="请选择" >
    <el-option
      v-for="item in category"
      :key="item.value"
      :label="item.questionCategoryName"
      :value="item.questionCategoryId">
    </el-option>
      </el-select>
  <el-button type="primary" plain @click="choosequestion(1)">单选题</el-button>
  <el-button type="primary" plain>主要按钮</el-button>
  <el-button type="primary" plain>主要按钮</el-button>

</div>

<div class="text" v-show="display">
      <!-- <h1>请点击右上角按钮开始答题</h1> -->

</div>
<div class="text">
   <h1>{{this.questiondeteil.questionDescription}}</h1>
</div>
<div  class="options" v-if="this.form.questiontype!=3">
  <el-radio-group
       v-model="chooseoptions"
   
      >
      <div       v-for="(item, index) in options"
         :key="index"
         style="margin-top:30px"
         
          >
      
              <el-radio :label="optionname[index]+'     '+item.questionOptionContent"
                        :value="item.questionOptionId"
              ></el-radio>
              </div>
       </el-radio-group>
       <hr />
       <div >
               <h1>正确答案</h1>
    <el-radio-group
     
      >
      <div      v-show="answerdisplay" v-for="(item, index) in answeroptions"
         :key="index"
         style="margin-top:30px"
         
          >
              
              <el-radio :label="optionname[index]+'     '+item.questionOptionContent"
                        :value="item.questionOptionId"
                        style="color: rgb(248, 9, 9);
"
              ></el-radio>
              
              </div>
              
       </el-radio-group>
</div>
</div>


</div>
</template>

<script>
export default {
   mounted(){
   this.getRequest("/api/question/getcategory").then(resp=>{
          this.category=resp.obj;
      });
   },
   data(){
       return{
          answerdisplay:false,
          display:true,
          optionname:["A","B","C","D","E","F","G","H","I","J","K"],
           category:[],
           chooseoptions:'',
           form:{
               category:'',
               questiontype:''
           },
           questiondeteil:[],
           options:[],
           answeroptions:[]
       }
   },
   watch: {
    chooseoptions(value)
    {
      this.answerdisplay=true;      
    }
 } ,
   methods:{
     
       choosequestion(index)
       {     
         if(this.form.category!='')
         {
         this.form.questiontype=index; 

         this.postRequest('/api/answer/randomquestion',this.form).then(resp=>{   
           if(resp!=null)
           {
           this.options=resp.obj[1];
            this.questiondeteil=resp.obj[0];
            this.answeroptions=resp.obj[2];
            this.answerdisplay=false
            console.log(this.answeroptions)
           }
           else{
             this.$message.error('该科目没有此类问题');
           }
       });
         }
         else{
                        this.$message.error('请选择科目');
         }
          
       }
   }
   
}
</script>

<style>
.text {
  width: 100%;
     height: 200px;
    position: absolute;
    left: 20%;
    top: 25%;
         margin: -50px 0 0 -50px;
}
.options {
  width: 100%;
     height: 200px;
    position: absolute;
    left: 20%;
    top: 40%;
         margin: -50px 0 0 -50px;
}
.answeroptions {
  width: 100%;
     height: 200px;
    position: absolute;
    left: 20%;
    top: 70%;
         margin: -50px 0 0 -50px;
}

</style>