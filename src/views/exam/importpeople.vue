<!--
 * @Author: your name
 * @Date: 2022-04-22 09:26:53
 * @LastEditTime: 2022-04-22 13:49:39
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \exam\src\views\exam\importpeople.vue
-->
<template>
  <div>
      <el-dialog

        :visible.sync="peopleimportdisplay"
    :before-close="close"
    title="导入人员"
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
      </div>

    <div>
        <el-table
    :data="tabledata"
    height="250"
    style="width: 100%">
    <el-table-column
      prop="nickName"
      label="名称"
      width="200">
    </el-table-column>
    <el-table-column
      prop="username"
      label="账号"
      width="200">
    </el-table-column>
    <el-table-column
      prop="ClassName"
      label="班级"
      width="218">

    </el-table-column>
     <el-table-column
      prop="email"
      label="邮箱"
      width="300">
      
    </el-table-column>
  </el-table>
    </div>
         <el-table
         v-show="show"
    :data="mobandata"
    height="250"
    border
    style="width: 100%">
    <el-table-column
      prop="nickName"
      label="名称"
      width="200">
    </el-table-column>
    <el-table-column
      prop="username"
      label="账号"
      width="200">
    </el-table-column>
    <el-table-column
      prop="ClassName"
      label="班级"
      width="218">

    </el-table-column>
     <el-table-column
      prop="email"
      label="邮箱"
      width="300">
      
    </el-table-column>
      
         </el-table>
           <div slot="footer" class="dialog-footer">
    <el-button @click="submit()">提 交</el-button>
 
  </div>
  
      </el-dialog>

  </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
    mounted(){
console.log(1111)
    },
data(){
    return{
        show:false,
        mobandata:[{}],
  tabledata:[{
        nickName:"",
        username:"",
        ClassName:"",
        email:""


  }]
    }
},
methods:{
          // 文件选择回调
          submit(){
              this.postRequest("/api/exam/importpeople",this.tabledata).then(resp=>{
                
               this.$message({  
              message: "成功导入"+resp.obj+"个人员",
               showClose: true,
               type: "success"
            });
                this.$emit('update:peopleimportdisplay',false);
         
      })
     console.log(this.tabledata)

          },
      onChange(file, fileList) {
        console.log(fileList);
        this.fileData = file; // 保存当前选择文件
        this.readExcel(); // 调用读取数据的方法
      },
     exportTable(){
         require.ensure([],()=>{
           const { export_json_to_excel} =require("@/excel/Export2Excel");
           const filedName =["名称","账号","班级","邮箱"];
           const filterVal =["nickName","username","ClassName","邮箱"];
           const data=this.mobandata.map(v=>filterVal.map(j=>v[j]));
           export_json_to_excel(filedName,data,"人员模板");
         })
      },
       close(){
     console.log(this.questionlist)
     console.log(this.examdialoglist)
                this.$emit('update:peopleimportdisplay',false);
                // location.reload();
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
          console.log(111)
          console.log(ws);
           that.outputs = []; //清空接收数据
           this.tabledata=[];
           for (var i = 0; i < ws.length; i++) {
             var sheetData = {
               // 键名为绑定 el 表格的关键字，值则是 ws[i][对应表头名]
              nickName: ws[i]["名称"],
               username: ws[i]["账号"],
              ClassName: ws[i]["班级"],
               email: ws[i]["邮箱"],
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

},
props:{
 peopleimportdisplay: {
                type: Boolean,
                default: false
            },
}
}
</script>

<style>

</style>