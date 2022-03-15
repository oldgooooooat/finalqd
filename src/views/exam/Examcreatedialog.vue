<!--
 * @Author: your name
 * @Date: 2022-03-07 09:55:31
 * @LastEditTime: 2022-03-14 13:23:46
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \exam\src\views\exam\Examcreate.vue
-->
<template>
  <el-dialog
  title="提示"
  :visible.sync="examcreatedisplay"
  width="50%"
  :before-close="close"
  >
<el-steps :active="active" finish-status="success">
  <el-step title="步骤 1"></el-step>
 
  <el-step title="步骤 2"></el-step>
</el-steps>

<el-form :model="Form" :rules="rules" ref="Form" label-width="100px">
  
  <el-form-item label="考试名称" prop="name" v-show="activedisplay" >
    <el-input v-model="Form.name"></el-input>
  </el-form-item>

    <el-form-item label="考试描述" prop="context" v-show="activedisplay">
    <el-input v-model="Form.context"></el-input>
  </el-form-item>
   <el-form-item label="考试时间" prop="time" style="width:200px" v-show="activedisplay">
    <el-input v-model="Form.time" type="number"></el-input>
  </el-form-item>

     <el-form-item label="有效时间"  v-show="activedisplay" >
    <el-date-picker
      v-model="Form.examtime"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="timestamp">
    </el-date-picker>
  
  </el-form-item>
   <el-transfer
    filterable
    filter-placeholder="请输入题目"
    v-show="actived1isplay"
    v-model="Form.answer"
    :data="data"
    :titles="['题库', '考试']"
    >
  </el-transfer>


  

</el-form>

  <div slot="footer" class="dialog-footer">
    <el-button @click="close()">取 消</el-button>
    <el-button v-show="actived1isplay"type="primary" @click="back">上一步</el-button>
    <el-button v-show="activedisplay" type="primary" @click="next">下一步</el-button>
     <el-button v-show="actived1isplay"type="primary" @click="submit()">提交</el-button>

  </div>
  

</el-dialog>

</template>

<script>
export default {
    mounted(){
        console.log(111);
        this.question=this.questionlist;
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
                active: 0,
                activedisplay:true,
                actived1isplay:false,
            data:generateData(),
        
        Form: {
          name: '',
          context:'',
          time:'',
          examtime:'',
          answer:[],
        },
          rules: {
          name: [
            { required: true, message: '请输入考试名称', trigger: 'blur' },
          ],
           context: [
            { required: true, message: '请输入考试描述', trigger: 'blur' },
          ],
           time: [
            { required: true, message: '请输入考试时间', trigger: 'blur' },
          ],
        
          }
          
        
    }
},


  methods:{

         back()
         {
          this.active--;
          this.activedisplay=true;
          this.actived1isplay=false;
         },
         next(){
           if(this.Form.name.replace(/(^s*)|(s*$)/g, "").length !=0 &&
                  this.Form.context.replace(/(^s*)|(s*$)/g, "").length !=0 &&
                 this.Form.time.replace(/(^s*)|(s*$)/g, "").length !=0 &&
                  this.Form.examtime.length!=0
                  
                  ){
           console.log(this.questionlist)
           this.active++;
           this.activedisplay=false;
           this.actived1isplay=true;
                  }
                  else
                  {
                    this.$message.error('请输入所有项目');
                  }
         },
         submit(){
this.postRequest("/api/exam/addexam",this.Form).then(resp=>{
        this.active--
        this.activedisplay=true;
        this.actived1isplay=false;
        this.Form.name='';
        this.Form.context='';
        this.Form.time='';
        this.Form.examtime='';
        this.Form.answer=[];
        location.reload();
         
      })
      this.$emit('update:examcreatedisplay',false);
         },
            close(){
              
                console.log(this.Form);
                      //  this.postRequest('/api/question/changequestion',this.form).then(resp=>{
                      //    console.log("111")
                      //    })
                location.reload();
                this.$emit('update:examcreatedisplay',false);
            },
},
 props: {
            questionlist:[],
            examcreatedisplay: {
                type: Boolean,
                default: false
            },

        },

}
</script>

<style>
.el-transfer{
    width: 100%
}
.el-transfer-panel{
    width: 35%;
    height: 500px;
}
</style>