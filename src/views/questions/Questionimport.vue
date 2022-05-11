<!--
 * @Author: oldgooooooat 2697055747@qq.com
 * @Date: 2022-05-11 13:28:40
 * @LastEditors: oldgooooooat 2697055747@qq.com
 * @LastEditTime: 2022-05-11 14:14:48
 * @FilePath: \exam\src\views\questions\Questionimport.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
      <el-dialog
         :visible.sync="questionimportdisplay"
    :before-close="close"
    title="导入题目"
    >
      <div>
          <el-button type="danger" style="float:right" @click="exportTable()" plain>导出模板</el-button>
          <el-upload
   action="/上传文件的接口"
   :on-change="onChange"
   :auto-upload="false"
   :show-file-list="false"
   accept=".xlsx" >
   <el-button type="warning" icon="el-icon-folder-add">导入人员</el-button>
</el-upload>
 <el-table
         v-show="show"
    :data="mobandata"
    height="250"
    border
    style="width: 100%">
    <el-table-column
      prop="questionname"
      label="问题名称"
      width="200">
    </el-table-column>
    <el-table-column
      prop="questiondescription"
      label="问题描述"
      width="200">
    </el-table-column>
    <el-table-column
      prop="questionphotos"
      label="问题图片"
      width="218">

    </el-table-column>
     <el-table-column
      prop="questionscore"
      label="问题分数"
      width="300">
      
    </el-table-column>

     <el-table-column
      prop="questionlevel"
      label="问题难度"
      width="300">
    </el-table-column>
    <el-table-column
      prop="questiontype"
      label="问题类型"
      width="300">
    </el-table-column>
         <el-table-column
      prop="questioncategory"
      label="问题科目"
      width="300">
    </el-table-column>
         <el-table-column
      prop="answeroption"
      label="正确答案"
      width="300">
    </el-table-column>
         <el-table-column
      prop="questionwrong"
      label="错误答案"
      width="300">
    </el-table-column>
      
      
      
      
         </el-table>
      </div>
      
      </el-dialog>

  </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
    data(){
        return{
            mobandata:[{
questionname:'问题名称',
questiondescription:'问题描述',
questionphotos:'问题图片（url)',
questionscore:'问题分数',
questionlevel:'问题难度："易","中","难"',
questioncategory:'问题科目',
questiontype:'问题类型：“单选题”,“多选题”,“判断题”',
answeroption:'正确答案格式:xxxx-xxxx-xxxx-xxxx',
questionwrong:'错误答案格式：xxxx-xxxx-xxxx-xxxx',

            }],
    show:false
        }
    },
methods:{
     exportTable(){
         require.ensure([],()=>{
           const { export_json_to_excel} =require("@/excel/Export2Excel");
           const filedName =["问题名称","问题描述","问题图片（url)","问题分数","问题难度","问题科目","问题类型","正确答案","错误答案"];
           const filterVal =["questionname","questiondescription","questionphotos","questionscore","questionlevel","questioncategory","questiontype","answeroption","questionwrong"];
           const data=this.mobandata.map(v=>filterVal.map(j=>v[j]));
           export_json_to_excel(filedName,data,"导入题目模板");
         })
      },
},
props:{
 questionimportdisplay: {
                type: Boolean,
                default: false
            },
}
}
</script>

<style>

</style>