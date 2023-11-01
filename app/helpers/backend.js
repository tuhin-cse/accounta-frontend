import {del, get, patch, post} from "./api";

export const postRegister = data => post('/user/register', data)
export const postLogin = data => post('/user/login', data)

export const fetchUser = data => get('/user', data)



export const fetchAccounts = data => get('/account/list', data)
export const fetchAccount = data => get('/account/:uid', data)
export const postAccount = data => post('/account', data)
export const patchAccount = data => patch('/account/:uid', data)
export const delAccount = data => del('/account/:uid', data)


export const getCurrencies = data => get('/currency/list', data)
export const getCurrency = data => get('/currency/:uid', data)
export const postCurrency = data => post('/currency', data)
export const patchCurrency = data => patch('/currency/:uid', data)
export const delCurrency = data => del('/currency/:uid', data)