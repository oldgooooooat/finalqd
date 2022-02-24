<!--
 * @Author: your name
 * @Date: 2022-02-24 09:06:23
 * @LastEditTime: 2022-02-24 13:58:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \tesssst\src\views\goods\Questiondialog.vue
-->
<template>
    <div>
       <el-dialog title="收货地址" :visible.sync="questionVisible" :before-close="close" >
  <el-form :model="form">
    <el-form-item label="活动名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" :label-width="formLabelWidth">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>

  </el-form>
  
  <div slot="footer" class="dialog-footer">
    <el-button @click="close()">取消</el-button>
    <el-button type="primary" @click="close()">确 定</el-button>
  </div>
</el-dialog>
    </div>
</template>
<script>
   export default {
       
       data(){
           return {
        questiondetail1:this.questiondetail,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
          },
                  formLabelWidth: '120px'

           };
       },
       
        props: {
            questionVisible: {
                type: Boolean,
                default: false
                // require: true // 必填
            },
            questiondetail:[]
        },
      
        methods:{
            close(){
               console.log(this.questiondetail1)
               console.log(this.questiondetail1.createTime)
                this.$emit('update:questionVisible',false);
            }
        }
     
      
    }
  </script>