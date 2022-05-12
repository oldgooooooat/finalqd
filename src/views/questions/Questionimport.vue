<!--
 * @Author: oldgooooooat 2697055747@qq.com
 * @Date: 2022-05-11 13:28:40
 * @LastEditors: oldgooooooat 2697055747@qq.com
 * @LastEditTime: 2022-05-12 14:23:23
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
   <el-button type="warning" icon="el-icon-folder-add">导入题目</el-button>
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
      width="200"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="questiondescription"
      label="问题描述"
      width="200"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="questionphotos"
      label="问题图片"
      width="218"
      show-overflow-tooltip>

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
      width="300"
      show-overflow-tooltip>
    </el-table-column>
         <el-table-column
      prop="questionwrong"
      label="错误答案"
      width="300"
      show-overflow-tooltip>
    </el-table-column>
      
      
      
      
         </el-table>
      </div>

       <div>
        <el-table
    :data="tabledata"
    height="250"
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
      width="200">

    </el-table-column>
     <el-table-column
      prop="questionscore"
      label="问题分数"
      width="150">
      
    </el-table-column>

     <el-table-column
      prop="questionlevel"
      label="问题难度"
      width="150">
    </el-table-column>
    <el-table-column
      prop="questiontype"
      label="问题类型"
      width="150">
    </el-table-column>
         <el-table-column
      prop="questioncategory"
      label="问题科目"
      width="150">
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
      <div slot="footer" class="dialog-footer">
    <el-button @click="submit()">提 交</el-button>
 
  </div>
      
      </el-dialog>

  </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
    data(){
        return{
          tabledata:[{}],
            mobandata:[{
questionname:'问题名称',
questiondescription:'问题描述',
questionphotos:'url地址 没有则填“无”',
questionscore:'问题分数',
questionlevel:'问题难度："易","中","难"',
questioncategory:'问题科目',
questiontype:'问题类型：“单选题”,“多选题”,“判断题”',
answeroption:'正确答案格式:xxxx-xxxx-xxxx-xxxx(判断题填“是”或“否”)',
questionwrong:'错误答案格式：xxxx-xxxx-xxxx-xxxx(判断题不填)',

            }],
    show:false
        }
    },
methods:{
  submit(){
            const user=JSON.parse(localStorage.getItem("user"))

    const params={};
   params.tabledata=this.tabledata;
   params.userid=user.id

              this.postRequest("/api/question/importquestion",params).then(resp=>{
               this.$message({  
              message: "成功导入"+resp.obj+"个问题",
               showClose: true,
               type: "success"
            });
                this.$emit('update:questionimportdisplay  ',false);
                                 location.reload();

         
      })
     console.log(this.tabledata)

          },

     exportTable(){
         require.ensure([],()=>{
           const { export_json_to_excel} =require("@/excel/Export2Excel");
           const filedName =["问题名称","问题描述","问题图片","问题分数","问题难度","问题科目","问题类型","正确答案","错误答案"];
           const filterVal =["questionname","questiondescription","questionphotos","questionscore","questionlevel","questioncategory","questiontype","answeroption","questionwrong"];
           const data=this.mobandata.map(v=>filterVal.map(j=>v[j]));
           export_json_to_excel(filedName,data,"导入题目模板");
         })
      },
       onChange(file, fileList) {
        console.log(fileList);
        this.fileData = file; // 保存当前选择文件
        this.readExcel(); // 调用读取数据的方法
      },

        readExcel(e) {
       console.log(e);
       let that = this;
       const files = that.fileData;
       console.log(files);
      if (!files) {
                   //如果没有文件
         return false;
       } else if (!/.(xls|xlsx)$/.test(files.name.toLowerCase())) {
         this.$message.error("上传格式不正确，请上传xlsx格式");
         return false;
       }
       const fileReader = new FileReader();
       fileReader.onload = ev => {
        try {
         const data = ev.target.result;
          // console.log(data)
           const workbook = XLSX.read(data, {
             type: "binary"
          });
           console.log(workbook.SheetNames);
          if (workbook.SheetNames.length >= 1) {
            this.$message({
              message: "导入数据表格成功",
               showClose: true,
               type: "success"
            });
           }
           const wsname = workbook.SheetNames[0]; //取第一张表
           const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //生成json表格内容
    
           that.outputs = []; //清空接收数据
           this.tabledata=[];
           for (var i = 0; i < ws.length; i++) {
             var sheetData = {
               // 键名为绑定 el 表格的关键字，值则是 ws[i][对应表头名]

              questionname: ws[i]["问题名称"],
               questiondescription: ws[i]["问题描述"],
              questionphotos: ws[i]["问题图片"],
               questionscore: ws[i]["问题分数"],
                 questionlevel: ws[i]["问题难度"],
                   questioncategory: ws[i]["问题科目"],
                     questiontype: ws[i]["问题类型"],
                       answeroption: ws[i]["正确答案"],
                       questionwrong:ws[i]["错误答案"]
            };
            this.tabledata.push(sheetData)
          }
          console.log(ws.length)
          console.log(sheetData)
        //               for( i=0;i<ws.length;i++)
        //     {
        //         console.log("222")
        //         console.log(sheetData[i])
        //    this.tabledata.push(sheetData[i])
        // // console.log(sheetData[i])
        //     }
            //  that.studentlist.unshift(sheetData);
        //    this.$refs.upload.value = "";
        } catch (e) {
            console.log(e)
           return false;
         }
       };
       // 如果为原生 input 则应是 files[0]
       fileReader.readAsBinaryString(files.raw);
     },
            close(){
  
                this.$emit('update:questionimportdisplay',false);
                // location.reload();
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