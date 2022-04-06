/*
 * @Author: your name
 * @Date: 2022-02-15 14:41:24
 * @LastEditTime: 2022-04-02 09:41:26
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
import answer from '@/views/answer/Answer';
import exam from '@/views/exam/Exam';
import examanswer from '@/views/answer/examanswer'
import examcontext from '@/views/answer/examcontext'
import examrecord from '@/views/record/Examrecord'
import examrecorddetail from '@/views/record/Examrecorddetail'
import randomexam from '@/views/exam/Randomexam'
import examresult from '@/views/exam/examresult'
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

         },
         { 
            path: '/exam/Exam',
        name: '考试管理',
        component: exam,
        meta: {
            requireAuth: true
        }

        },
        { 
            path: '/answer/Examanswer',
        name: '在线考试',
        component: examanswer,
        meta: {
            requireAuth: true
        }

        }
        ,     { 
            path: '/exam/Randomexam',
        name: '随机考试',
        component: randomexam,
        meta: {
            requireAuth: true
        }

        },
        { 
            path: '/answer/Examcontext',
        name: '考试页面',
        component: examcontext,
        meta: {
            requireAuth: true
        }
        }
        ,
        { 
            path: '/record/Examrecord',
        name: '考试详情列表',
        component: examrecord,
        meta: {
            requireAuth: true
        }
        }
        ,
        { 
            path: '/record/Examrecorddetail',
        name: '考试详情',
        component: examrecorddetail,
        meta: {
            requireAuth: true
        }
        },
        { 
            path: '/record/Exanresult',
        name: '考试分数',
        component: examresult,
        meta: {
            requireAuth: true
        }
        }

 
    
    
    ]
    }]
})