/*
 * @Author: your name
 * @Date: 2022-02-15 14:41:24
 * @LastEditTime: 2022-03-02 13:18:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \tesssst\src\router\index.js
 */
// 导入组件
import Vue from 'vue';
import Router from 'vue-router';
// 登录
import login from '@/views/login';
// 首页
import index from '@/views/index';
import regist from '@/views/regist'
/**
 * 基础菜单
 */
// 商品管理
import questions from '@/views/questions/Question';
import answer from '@/views/answer/Answer'


// 启用路由
Vue.use(Router);

// 导出路由 
export default new Router({
    routes: [{
        path: '/',
        name: '',
        component: login,
        hidden: true,
        meta: {
            requireAuth: false
        }
    }, {
        path: '/login',
        name: '登录',
        component: login,
        hidden: true,
        meta: {
            requireAuth: false
        }
    },{
        path: '/regist',
        name: '注册',
        component: regist,
        hidden: true,
        meta: {
            requireAuth: false
        }
    },
     {
        path: '/index',
        name: '首页',
        component: index,
        iconCls: 'el-icon-tickets',
        children: [{
            path: '/questions/Question',
            name: '问题管理',
            component: questions,
            meta: {
                requireAuth: true
            }
        },
         { 
             path: '/answer/Answer',
         name: '自由回答',
         component: answer,
         meta: {
             requireAuth: true
         }

         }
    
    ]
    }]
})