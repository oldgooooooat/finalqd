/*
 * @Author: your name
 * @Date: 2022-02-15 14:41:24
 * @LastEditTime: 2022-03-01 10:46:02
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \tesssst\src\api\userMG.js
 */
import axios from 'axios';
import { loginreq, req } from './axiosFun';

// 登录接口 
export const login = (params) => { return loginreq("post", "/api/doLogin", params) };
//
export const regist = (params) => { return loginreq("post", "/api/regist", params) };

