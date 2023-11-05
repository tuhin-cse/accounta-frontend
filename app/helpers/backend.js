import {del, get, patch, post} from "./api";

export const postRegister = data => post('/user/register', data)
export const postLogin = data => post('/user/login', data)

export const fetchUser = data => get('/user', data)



export const fetchAccounts = data => get('/account/list', data)
export const fetchAccount = data => get('/account/:uid', data)
export const fetchAccountElements = data => get('/account/elements', data)
export const postAccount = data => post('/account', data)
export const patchAccount = data => patch('/account/:uid', data)
export const delAccount = data => del('/account/:uid', data)


export const fetchCurrencies = data => get('/currency/list', data)
export const fetchCurrency = data => get('/currency/:uid', data)
export const postCurrency = data => post('/currency', data)
export const patchCurrency = data => patch('/currency/:uid', data)
export const delCurrency = data => del('/currency/:uid', data)


export const fetchCategories = data => get('/category/list', data)
export const fetchCategory = data => get('/category/:uid', data)
export const fetchCategoryElements = data => get('/category/elements', data)
export const postCategory = data => post('/category', data)
export const patchCategory = data => patch('/category/:uid', data)
export const delCategory = data => del('/category/:uid', data)


export const fetchProducts = data => get('/product/list', data)
export const fetchProduct = data => get('/product/:uid', data)
export const postProduct = data => post('/product', data)
export const patchProduct = data => patch('/product/:uid', data)
export const delProduct = data => del('/product/:uid', data)