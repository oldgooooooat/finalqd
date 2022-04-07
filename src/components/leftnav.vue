/**
* 左边菜单
*/ 
<template>
  <el-menu default-active="2" :collapse="collapsed" collapse-transition router :default-active="$route.path" unique-opened class="el-menu-vertical-demo" background-color="#334157" text-color="#fff" active-text-color="#ffd04b">
    <div class="logobox">
      <img class="logoimg" src="../assets/img/logo.png" alt="">
    </div>
    <el-submenu v-for="menu in allmenu" :key="menu.menuid" :index="menu.menuname">
      <template slot="title">
        <i class="iconfont" :class="menu.icon"></i>
        <span>{{menu.menuname}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item v-for="chmenu in menu.menus" :index="'/'+chmenu.url" :key="chmenu.menuid">
          <i class="iconfont" :class="chmenu.icon"></i>
          <span>{{chmenu.menuname}}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
import { menu } from '../api/userMG'
import  { getCookie }from '../utils/util.js';

export default {
  name: 'leftnav',
  data() {
    return {
      collapsed: false,
      allmenu: [],
          userdetail:{
        usertype:'',
        userid:''
      },
    }
  },
  // 创建完毕状态(里面是操作)
  created() {
           const user=JSON.parse(localStorage.getItem("user"))

    // const user=JSON.parse(getCookie('user'));
      this.userdetail.userid=user.id
      this.userdetail.usertype=user.type
      console.log(this.userdetail)
        this.postRequest("/api/t-menu/getmenu",this.userdetail).then(resp=>{
           this.allmenu=resp.obj
        console.log(resp.obj)
            
      });
     
    // 获取图形验证码
    // let res = {
    //   success: true,
    //   data: [
    //     {
    //       menuid: 1,
    //       icon: 'li-icon-xiangmuguanli',
    //       menuname: '基础管理',
    //       hasThird: null,
    //       url: null,
    //       menus: [
    //         {
    //           menuid: 2,
    //           icon: 'icon-cat-skuQuery',
    //           menuname: '问题管理',
    //           hasThird: 'N',
    //           url: 'questions/Question',
    //           menus: null
    //         }
    //       ]
    //     },
    //     { menuid:3,
          
    //       icon: 'li-icon-xiangmuguanli',
    //       menuname: '答题',
    //       hasThird: null,
    //       url: null,
    //       menus:[
    //           {
    //           menuid: 4,
    //           icon: 'icon-cat-skuQuery',
    //           menuname: '自由回答',
    //           hasThird: 'N',
    //           url: 'answer/Answer',
    //           menus: null
    //         }
    //       ]

    //     },
    //     { menuid:5,
          
    //       icon: 'li-icon-xiangmuguanli',
    //       menuname: '在线考试',
    //       hasThird: null,
    //       url: null,
    //       menus:[
    //           {
    //           menuid: 6,
    //           icon: 'icon-cat-skuQuery',
    //           menuname: '在线考试',
    //           hasThird: 'N',
    //           url: 'answer/Examanswer',
    //           menus: null
    //         },
    //          {
    //           menuid: 7,
    //           icon: 'icon-cat-skuQuery',
    //           menuname: '随机考试',
    //           hasThird: 'N',
    //           url: 'exam/Randomexam',
    //           menus: null
    //         }
    //       ]

    //     },
    //     { menuid:8,
          
    //       icon: 'li-icon-xiangmuguanli',
    //       menuname: '考试管理',
    //       hasThird: null,
    //       url: null,
    //       menus:[
    //           {
    //           menuid: 9,
    //           icon: 'icon-cat-skuQuery',
    //           menuname: '考试管理',
    //           hasThird: 'N',
    //           url: 'exam/Exam',
    //           menus: null
    //         }
    //       ]

    //     },
    //       { menuid:10,
          
    //       icon: 'li-icon-xiangmuguanli',
    //       menuname: '考试记录',
    //       hasThird: null,
    //       url: null,
    //       menus:[
    //           {
    //           menuid: 11,
    //           icon: 'icon-cat-skuQuery',
    //           menuname: '考试记录',
    //           hasThird: 'N',
    //           url: 'record/Examrecord',
    //           menus: null
    //         }
    //       ]

    //     }
        
       
       
     
    //   ],
    //   msg: 'success'
    // }
          // this.allmenu = res.data
    
    // menu(localStorage.getItem('logintoken'))
    //   .then(res => {
    //     console.log(JSON.stringify(res))
    //     if (res.success) {
    //       this.allmenu = res.data
    //     } else {
    //       this.$message.error(res.msg)
    //       return false
    //     }
    //   })
    //   .catch(err => {
    //     this.$message.error('菜单加载失败，请稍后再试！')
    //   })
    // 监听
    this.$root.Bus.$on('toggle', value => {
      this.collapsed = !value
    })
  }
}
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 400px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
  text-align: left;
}
.el-menu-item-group__title {
  padding: 0px;
}
.el-menu-bg {
  background-color: #1f2d3d !important;
}
.el-menu {
  border: none;
}
.logobox {
  height: 40px;
  line-height: 40px;
  color: #9d9d9d;
  font-size: 20px;
  text-align: center;
  padding: 20px 0px;
}
.logoimg {
  height: 40px;
}
</style>