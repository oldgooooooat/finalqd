<!--
 * @Author: your name
 * @Date: 2022-03-07 09:19:44
 * @LastEditTime: 2022-03-07 10:45:24
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \exam\src\views\exam\exam.vue
-->
<template>
  <div>
        <el-button type="primary" plain style="float:right" @click="examcreatedisplay=true">主要按钮</el-button>
        <div>
   <Examcreate-dialog :examcreatedisplay.sync="examcreatedisplay"
          v-if="examcreatedisplay"
   >
   </Examcreate-dialog>
        </div>
  </div>

</template>

<script>
import Examcreate from'./Examcreatedialog.vue'
export default {
   components:{
  'Examcreate-dialog':Examcreate,
   },
   data(){
       return{
           examcreatedisplay:false,
       }
   }
}
</script>

<style>

</style>