<!--
 * @Author: your name
 * @Date: 2022-03-02 13:14:23
 * @LastEditTime: 2022-05-04 14:25:42
 * @LastEditors: oldgooooooat 2697055747@qq.com
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
          <el-tag>考试难度</el-tag>

   <el-select v-model="form.difficulty" placeholder="请选择问题难度">
      <el-option label="易" value=1></el-option>
      <el-option label="中" value=2></el-option>
      <el-option label="难" value=3></el-option>
    </el-select>
  <el-button type="primary" plain @click="choosequestion(1)">单选题</el-button>
  <el-button type="primary" plain @click="choosequestion(2)">多选题</el-button>
  <el-button type="primary" plain @click="choosequestion(3)">判断题</el-button>

</div>

<div class="text" v-show="display">
    <h1>请选择科目然后点击右上角按钮开始答题</h1> 

</div>
<div class="text">
   <h1>{{this.questiondeteil.questionName}}</h1>
   <h2>{{this.questiondeteil.questionDescription}}</h2>
   <viewer  v-show="next" v-if="this.questiondeteil.questionPhotos!='' "  :images="photos"
   >
         <img style="width: 150px;height: 150px; cursor:pointer" :src="this.questiondeteil.questionPhotos" :key="this.questiondeteil.questionPhotos">
   </viewer>



  <el-radio-group v-if="this.form.questiontype!=2"
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
       
         <el-checkbox-group v-model="chooseoptions1" v-if="this.form.questiontype==2"  > 
       <div       v-for="(item, index) in options"
         :key="index"
         style="margin-top:30px"
         
          >
      
              <el-checkbox :label="optionname[index]+'     '+item.questionOptionContent"
                           :value="item.questionOptionId"
              ></el-checkbox>
              </div>
         </el-checkbox-group>
       <hr />
       <div  v-show="answerdisplay">
               <h1>正确答案</h1>
    <el-radio-group
     
      >
      <div      v-show="answerdisplay" v-for="(item, index) in answeroptions"
         :key="index"
         style="margin-top:30px"
         
          >
              
              <el-radio :label="item.questionOptionContent"
                        :value="item.questionOptionId"
                        style="color: rgb(248, 9, 9);
"
              ></el-radio>
              
              </div>
              
       </el-radio-group>
</div>
</div>

<div  class="next" v-show="next">
　　  <el-button type="primary" @click="nextquestion()">下一题</el-button>
</div>
</div>



</template>

<script>
import  { getCookie }from '../../utils/util.js';

export default {
  
   mounted(){
   this.getRequest("/api/question/getcategory").then(resp=>{
          this.category=resp.obj;
      });
   },
   data(){
       return{
         photos:[],
          answerdisplay:false,
          next:false,
          display:true,
          optionname:["A","B","C","D","E","F","G","H","I","J","K"],
           category:[],
           chooseoptions:'',
           chooseoptions1:[],
           form:{
             difficulty:'',
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
    },
    chooseoptions1(value)
    {
      this.answerdisplay=true;      
    },

 } ,
   methods:{
     
       nextquestion(){
            if(this.form.category!='')
         {
        //    var changetype=this.form.questiontype;
        //  this.form.questiontype=index; 
         this.postRequest('/api/answer/randomquestion',this.form).then(resp=>{   
           if(resp!=null)
           {
                          this.photos.push(resp.obj[1].questionPhotos);
           this.options=resp.obj[1];
            this.questiondeteil=resp.obj[0];
            this.answeroptions=resp.obj[2];
            this.answerdisplay=false
            this.next=true
            
            console.log(this.answeroptions)
           }
           else{
             
             this.$message.error('该科目没有此类问题');
             this.form.questiontype=changetype;
           }
       });
         }
       }
       ,

       choosequestion(index)
       {     
         console.log(this.photos)
         if(this.form.category!='')
         {
           this.display=false
           var changetype=this.form.questiontype;
         this.form.questiontype=index; 
         this.postRequest('/api/answer/randomquestion',this.form).then(resp=>{   
           if(resp!=null)
           {
             this.photos.push(resp.obj[1].questionPhotos);
           this.options=resp.obj[1];
            this.questiondeteil=resp.obj[0];
            this.answeroptions=resp.obj[2];
            this.answerdisplay=false
            this.next=true
            
           }
           else{
             
             this.$message.error('该科目没有此类问题');
             this.form.questiontype=changetype;
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
    position: fixed;
    left: 20%;
    top: 25%;
         margin: -50px 0 0 -50px;
}
.next {
 position:fixed	
;
 right:10px;
 bottom:0px;
 width:100px;
 border:10px;

}




</style>