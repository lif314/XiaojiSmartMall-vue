// API接口统一管理
import requests from "./request";
import mockRequests from './mockAjax'

// 三级分类 /api/product/getBaseCategoryList GET
export const reqBaseCategoryList = () => {
    return requests({
        // 返回结果是Promise对象
        url: '/product/category/list/tree',
        method: 'get'
    })
}


// mock获取模拟数据 拦截ajax请求
export const reqGetBannerList = () => mockRequests.get('/banner')

// mock获取模拟数据 拦截ajax请求
export const reqGetFloorList = () => mockRequests.get('/floor')


// 获取搜索模块的数据 /api/list  POST
/*
参数:
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/
// params至少是一个空对象
export const reqGetSearchInfo = (params) => requests({
    url: '/search/list',
    method: 'post',
    data: params,
})


// 获取产品详细信息
// /api/item/{ skuId }   GET
export const reqGetSkuDetails = (skuId) => requests({
    url: '/product/item/' + skuId,
    method: 'get'
})

// 将产品添加到购物车中(获取更新某一产品的个数)
export const reqAddOrUpdateShopCart = (skuId, num) => requests({
    url: `/cart/addToCart/${skuId}/${num}`,
    method: 'get'
})


//获取购物车中列表数据
export const reqCartList = () => requests({
    url: '/cart/list',
    method: 'get'
})

// 删除购物车中的商品
// DETELE /api/cart/deleteCart/{skuId}
export const reqDeleteCartBySkuId = (skuId) => requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
})

// 修改商品的选中状态
// /api/cart/checkCart/{skuId}/{isChecked}  GET
export const reqUpdateCartCheckedById = (skuId, isChecked) => requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
})


// 获取验证码
export const reqGetCode = (phone) => requests({
    url: `/auth/sms/sendcode?phone=${phone}`,
    method: 'get'
})

// 提交注册
export const reqUserRegister = (regInfo) => requests({
    url: '/auth/register',
    data: regInfo,
    method: 'post'
})

// 登录
export const reqUserLogin = (loginInfo) => requests({
    url: '/auth/login',
    data: loginInfo,
    method: 'post'
})


// 使用token获取用户信息
export const reqUserInfo = ()=>requests({
    url: '/user/passport/auth/getUserInfo',
    method:'get'
})

// 退出登录
export const reqLogout = ()=>requests({
    url: '/user/passport/logout',
    method: 'get'
})


// 获取用户地址信息
export const reqAddressInfo = ()=>requests({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'get'
})


// 获取商品清单
export const reqOrderInfo = ()=>requests({
    url: '/order/auth/trade',
    method: 'get'
})

// 提交订单
export const reqSubmitOrder = (tradeNo, data)=>requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data: data,
    method: 'post'
})


// 获取订单支付信息
export const reqOrderPayInfo = (orderId)=>requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'get'
})

// 获取订单支付状态
export const reqPayStatus = ({orderId})=>requests({
    url:`/payment/weixin/queryPayStatus/${orderId}`,
    method: 'get'
})


// 获取订单的列表数据
export const reqOrderList = ({page, limit})=>requests({
    url: `/order/auth/${page}/${limit}`,
    method: 'get'
})


