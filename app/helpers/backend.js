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

export const postCategoryGenerate = data => post('/category/generate', data)
export const patchCategory = data => patch('/category/:uid', data)
export const delCategory = data => del('/category/:uid', data)


export const fetchProducts = data => get('/product/list', data)
export const fetchProduct = data => get('/product/:uid', data)
export const postProduct = data => post('/product', data)
export const patchProduct = data => patch('/product/:uid', data)
export const delProduct = data => del('/product/:uid', data)


export const fetchSales = data => get('/sale/list', data)
export const fetchSaleElements = data => get('/sale/elements', data)
export const fetchSale = data => get('/sale/:uid', data)
export const postSale = data => post('/sale', data)
export const patchSale = data => patch('/sale/:uid', data)
export const delSale = data => del('/sale/:uid', data)


export const fetchCustomers = data => get('/customer/list', data)
export const fetchCustomer = data => get('/customer/:uid', data)
export const postCustomer = data => post('/customer', data)
export const patchCustomer = data => patch('/customer/:uid', data)
export const delCustomer = data => del('/customer/:uid', data)

export const fetchPurchases = data => get('/purchase/list', data)
export const fetchPurchaseElements = data => get('/purchase/elements', data)
export const fetchPurchase = data => get('/purchase/:uid', data)
export const postPurchase = data => post('/purchase', data)
export const patchPurchase = data => patch('/purchase/:uid', data)
export const delPurchase = data => del('/purchase/:uid', data)

export const fetchVendors = data => get('/vendor/list', data)
export const fetchVendor = data => get('/vendor/:uid', data)
export const postVendor = data => post('/vendor', data)
export const patchVendor = data => patch('/vendor/:uid', data)
export const delVendor = data => del('/vendor/:uid', data)