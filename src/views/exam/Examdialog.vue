<!--
 * @Author: your name
 * @Date: 2022-03-11 13:28:15
 * @LastEditTime: 2022-03-11 15:20:12
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \exam\src\views\exam\Examdialog.vue
-->
<template>
<el-dialog
  title="提示"
  :visible.sync="examdialogdisplay"
  width="30%"
  :before-close="close"
 >
                            <el-form ref="form" :model="form" label-width="80px">

  <el-tag>考试名称</el-tag>
<el-input
  v-model="form.examdetail.examName"
>
 </el-input>
 <el-tag>考试描述</el-tag>
<el-input
  v-model="form.examdetail.examDescription"
>
 </el-input>
  <el-tag>考试持续时间</el-tag>
<el-input
  v-model="form.examdetail.examTimeLimit"
>
 </el-input>
  <el-tag>考试起始结束时间</el-tag>
   <el-date-picker
      v-model="form.examtime"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="timestamp">
    </el-date-picker>
  

                            </el-form>
  </el-dialog>

</template>

<script>
export default {
    mounted(){
        this.form.examdetail=this.examdialoglist
        this.form.examtime.push(this.getTimestamp(this.form.examdetail.examStartDate))
        this.form.examtime.push(this.getTimestamp(this.form.examdetail.examEndDate))

         this.postRequest("/api/exam/getexamquestion",this.form.examdetail).then(resp=>{
      
         console.log(resp.obj)
          
      });
    },
    data(){
        return{
            form:{
            examdetail:[],
            examtime:[]
            }
        }
    },
    methods:{
        getTimestamp(time){
            
          return (new Date(time).getTime())
        },
   close(){
            console.log(this.examdetail)
            console.log(this.form.examtime)
                this.$emit('update:examdialogdisplay',false);
            },
    },
 props: {
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
