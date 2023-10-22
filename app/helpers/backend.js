import {post} from "./api";

export const postLogin = data => post('/user/login', data)