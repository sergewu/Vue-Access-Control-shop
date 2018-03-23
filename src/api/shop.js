import instance from './index';
const preUrlPath = '';
//登录
export const loginShopVerify = {
  p:['post,/login'],
  r: params => { 
    return instance.post(`${preUrlPath}/pay1/mer/loginShopVerify`, params).then(res => res.data); 
  }
};
//获取验证码
export const getCode = {
  p: ['get,/login'],
  r: process.env.API_ROOT+"/pay1/getCode"
};
//门店汇总
export const getUserList = params => { return instance.post(`${preUrlPath}/pay1/mer/querySummary`, params).then(res => res.data);};
//收款记录
 export const getUserListPage = params => { return instance.post(`${preUrlPath}/pay1/mer/queryOrderShop`,params).then(res => res.data); };
//修改密码
 export const modifyPassword= params => { return instance.post(`${preUrlPath}/pay1/mer/updateMerMpwd`, params).then(res => res.data); };
//退出登录
 export const batchRemoveUser = params => { return instance.post(`${preUrlPath}/pay1/mer/loginMerOut`, params).then(res => res.data); };
//模糊查询
 export const lookupUser = params => { return instance.post(`${preUrlPath}/pay1/comm/selectStoreList`,params).then(res => res.data); };
//门店管理
 export const queryStoresShop = params => { return instance.post(`${preUrlPath}/pay1/store/queryStoresShop`,params).then(res => res.data); };
//列表修改
export const updateStore = params => { return instance.post(`${preUrlPath}/pay1/store/updateStore`,params).then(res => res.data); };
//门店删除
export const deleteStore = params => { return instance.post(`${preUrlPath}/pay1/store/deleteStore`,params).then(res => res.data); };
//门店新增
export const addStore = params => { return instance.post(`${preUrlPath}/pay1/store/addStore`,params).then(res => res.data); };
//门店状态
export const updateStoreState = params => { return instance.post(`${preUrlPath}/pay1/store/updateStoreState`,params).then(res => res.data); };
//重置密码
export const updateStorePwd = params => { return instance.post(`${preUrlPath}/pay1/store/updateStorePwd`,params).then(res => res.data); };
//款台查询
export const queryEmployeeShop = params => { return instance.post(`${preUrlPath}/pay1/emp/queryEmployeeShop`,params).then(res => res.data); };
//款台详情
export const queryEmployeeDetail = params => { return instance.post(`${preUrlPath}/pay1/emp/queryEmployeeDetail`,params).then(res => res.data); };
//款台密码重置
export const updateEmployeePwd = params => { return instance.post(`${preUrlPath}/pay1/emp/updateEmployeePwd`,params).then(res => res.data); };
//款台增加
export const addEmployee = params => { return instance.post(`${preUrlPath}/pay1/emp/addEmployee`,params).then(res => res.data); };
//款台修改
export const updateEmployee = params => { return instance.post(`${preUrlPath}/pay1/emp/updateEmployee`,params).then(res => res.data); };
//款台删除
export const deleteEmployee = params => { return instance.post(`${preUrlPath}/pay1/emp/deleteEmployee`,params).then(res => res.data); };
//打印列表
export const queryPrintShopNew = params => { return instance.post(`${preUrlPath}/pay1/prints/queryPrintShopNew`,params).then(res => res.data); };
//删除列表
export const deletePrintNew = params => { return instance.post(`${preUrlPath}/pay1/prints/deletePrintNew`,params).then(res => res.data); };
//添加打印配置
export const addPrintNew = params => { return instance.post(`${preUrlPath}/pay1/prints/addPrintNew`,params).then(res => res.data); };
//添加打印配置
export const addAudio = params => { return instance.post(`${preUrlPath}/pay1/sound/addAudio`,params).then(res => res.data); };
export const queryAudio = params => { return instance.post(`${preUrlPath}/pay1/sound/queryAudio`,params).then(res => res.data); };
export const updateAudio = params => { return instance.post(`${preUrlPath}/pay1/sound/updateAudio`,params).then(res => res.data); };
export const bindAudio = params => { return instance.post(`${preUrlPath}/pay1/sound/bindAudio`,params).then(res => res.data); };
export const volAudio = params => { return instance.post(`${preUrlPath}/pay1/sound/volAudio`,params).then(res => res.data); };
export const selectEmpsBySid = params => { return instance.post(`${preUrlPath}/pay1/comm/selectEmpsBySid`,params).then(res => res.data); };
//款台状态
export const updateEmployeeStatus = params => { return instance.post(`${preUrlPath}/pay1/emp/updateEmployeeStatus`,params).then(res => res.data); };
//修改打印配置
export const updatePrintNew = params => { return instance.post(`${preUrlPath}/pay1/prints/updatePrintNew`,params).then(res => res.data); };
//款台状态修改
export const queryPrintDetailNew = params => { return instance.post(`${preUrlPath}/pay1/prints/queryPrintDetailNew`,params).then(res => res.data); };
//打印状态修改
export const updatePStatusNew = params => { return instance.post(`${preUrlPath}/pay1/prints/updatePStatusNew`,params).then(res => res.data); };
//导出Excel(收款)
export const downOrderExcel = params => { return instance.get(`${preUrlPath}/pay1/mer/downOrderExcel`,{ params: params }); };
//导出Excel(汇总)
export const downOrderSumExcel = params => { return instance.get(`${preUrlPath}/pay1/mer/downOrderSumExcel`,{ params: params }); };
//二维码
export const getEmpTwoCode = params => { return instance.get(`${preUrlPath}/pay1/cashier/getEmpTwoCode`,{ params: params }); };
//会员卡支付二维码
export const getEmpMemCode = params => { return instance.get(`${preUrlPath}/pay1/emp/getEmpMemCode`,{ params: params }); };
//打印增加款台
export const selectEmpListByMid = params => { return instance.post(`${preUrlPath}/pay1/comm/selectEmpListByMid`,params).then(res => res.data); };
//退款
export const merRefund = params => { return instance.post(`${preUrlPath}/pay1/mer/merRefund`,params).then(res => res.data); };
//补发打印
export const supplyPrint = params => { return instance.post(`${preUrlPath}/pay1/mer/supplyPrint`,params).then(res => res.data); };
//门店汇总
export const queryStrStatement = params => { return instance.post(`${preUrlPath}/pay1/mer/queryStrStatement`,params).then(res => res.data); };
//门店汇总
export const selectStoreList = params => { return instance.post(`${preUrlPath}/pay1/comm/selectStoreList`,params).then(res => res.data); };

export const downStrSumExcel = params => { return instance.get(`${preUrlPath}/pay1/mer/downStrSumExcel`,{ params: params }); };

//会员日设置
export const addMemDay = params => { return instance.post(`${preUrlPath}/pay1/wxmember/addMemDay`,params).then(res => res.data); };
//会员日查询
export const queryMemDay = params => { return instance.post(`${preUrlPath}/pay1/wxmember/queryMemDay`,params).then(res => res.data); };
//同步会员卡
export const sysMemberInsert = params => { return instance.post(`${preUrlPath}/pay1/wxmember/sysMemberInsert`,params).then(res => res.data); };
//获取验证码
export const sendVerCode = params => { return instance.post(`${preUrlPath}/pay1/mer/sendVerCode`,params).then(res => res.data); };
//确认退款
export const checkVerCode = params => { return instance.post(`${preUrlPath}/pay1/mer/checkVerCode`,params).then(res => res.data); };
//卡劵投放
// export const getUrlCode = params => { return instance.post(`${preUrlPath}/pay1/person/getUrlCode`,params).then(res => res.data); };
export const getUrlCode = params => { return instance.get(`${preUrlPath}/pay1/person/getUrlCode`,{ params: params }); };




//同步门店接口
export const synStoreList = params => { return instance.post(`${preUrlPath}/pay1/wxcard/synStoreList`,params).then(res => res.data); };
//查询门店接口
export const queryStoreList = params => { return instance.post(`${preUrlPath}/pay1/wxcard/queryStoreList`,params).then(res => res.data); };
//会员卡列表
export const queryMemCardList = params => { return instance.post(`${preUrlPath}/pay1/wxcard/queryMemCardList`,params).then(res => res.data); };
//微信会员卡创建
export const insertMenCard = params => { return instance.post(`${preUrlPath}/pay1/wxcard/insertMenCard`,params).then(res => res.data); };
//微信上传
export const uploadCreatCard = params => { return instance.post(`${preUrlPath}/pay1/wxcard/uploadCreatCard`,params).then(res => res.data); };
//会员信息
export const queryMemberList = params => { return instance.post(`${preUrlPath}/pay1/wxmember/queryMemberList`,params).then(res => res.data); };
//消费记录
export const queryAccTransList = params => { return instance.post(`${preUrlPath}/pay1/wxmember/queryAccTransList`,params).then(res => res.data); };
//订单管理
export const queryShopOrderList = params => { return instance.post(`${preUrlPath}/pay1/bounsShop/queryShopOrderList`,params).then(res => res.data); };
//卡卷列表
export const queryCouponList = params => { return instance.post(`${preUrlPath}/pay1/wxcard/queryCouponList`,params).then(res => res.data); };
//卡卷上传
export const uploadCoupon = params => { return instance.post(`${preUrlPath}/pay1/wxcard/uploadCoupon`,params).then(res => res.data); };
//核销卡卷查询
export const queryCode = params => { return instance.post(`${preUrlPath}/pay1/wxcard/queryCode`,params).then(res => res.data); };
//确认核销
export const consumeCode = params => { return instance.post(`${preUrlPath}/pay1/wxcard/consumeCode`,params).then(res => res.data); };
//卡卷核销列表
export const queryConsumeList = params => { return instance.post(`${preUrlPath}/pay1/wxcard/queryConsumeList`,params).then(res => res.data); };
//公司账户=>添加母户
export const insertCompany = params => { return instance.post(`${preUrlPath}/pay1/wxmember/insertCompany`,params).then(res => res.data); };
//公司账户列表
export const queryCompany = params => { return instance.post(`${preUrlPath}/pay1/wxmember/queryCompany`,params).then(res => res.data); };
//绑定子户
export const insertBindAcc = params => { return instance.post(`${preUrlPath}/pay1/wxmember/insertBindAcc`,params).then(res => res.data); };
//绑定页面查询会员卡号
export const checkAccountByNum = params => { return instance.post(`${preUrlPath}/pay1/wxmember/checkAccountByNum`,params).then(res => res.data); };
//查看已绑定会员
export const queryBindAcc = params => { return instance.post(`${preUrlPath}/pay1/wxmember/queryBindAcc`,params).then(res => res.data); };
//副卡充值
export const bindDeposit = params => { return instance.post(`${preUrlPath}/pay1/wxmember/bindDeposit`,params).then(res => res.data); };
//副卡解绑
export const unBind = params => { return instance.post(`${preUrlPath}/pay1/wxmember/unBind`,params).then(res => res.data); };
//公司账户交易明细
export const companyTrans = params => { return instance.post(`${preUrlPath}/pay1/wxmember/companyTrans`,params).then(res => res.data); };
//重置密码
export const resetMemPwd = params => { return instance.post(`${preUrlPath}/pay1/wxmember/resetMemPwd`,params).then(res => res.data); };
//公司账户充值
export const depositCompany = params => { return instance.post(`${preUrlPath}/pay1/wxmember/depositCompany`,params).then(res => res.data); };
//修改库存
export const modifyStock = params => { return instance.post(`${preUrlPath}/pay1/wxcard/modifyStock`,params).then(res => res.data); };
//交易账单
export const downTransExcel = params => { return instance.get(`${preUrlPath}/pay1/wxmember/downTransExcel`,{ params: params }); };
//会员交易查询
export const queryMemTrans = params => { return instance.post(`${preUrlPath}/pay1/store/queryMemTrans`,params).then(res => res.data); };
//添加充值规则
export const insertDepositRule = params => { return instance.post(`${preUrlPath}/pay1/wxcard/insertDepositRule`,params).then(res => res.data); };
//查询充值规则
export const getDepositRule = params => { return instance.post(`${preUrlPath}/pay1/wxcard/getDepositRule`,params).then(res => res.data); };
//修改充值规则状态
export const updateDepositStatus = params => { return instance.post(`${preUrlPath}/pay1/wxcard/updateDepositStatus`,params).then(res => res.data); };
//编辑充值规则
export const updateDepositRule = params => { return instance.post(`${preUrlPath}/pay1/wxcard/updateDepositRule`,params).then(res => res.data); };
//会员卡修改回显
export const queryCardByKey = params => { return instance.post(`${preUrlPath}/pay1/wxcard/queryCardByKey`,params).then(res => res.data); };
//会员卡修改提交
export const updateMenCard = params => { return instance.post(`${preUrlPath}/pay1/wxcard/updateMenCard`,params).then(res => res.data); };

export const queryLevel = params => { return instance.post(`${preUrlPath}/pay1/wxcard/queryLevel`,params).then(res => res.data); };


export const selectEmpList = params => { return instance.post(`${preUrlPath}/pay1/comm/selectEmpList`,params).then(res => res.data); };
//余额统计
export const queryBalance = params => { return instance.post(`${preUrlPath}/pay1/mer/queryBalance`,params).then(res => res.data); };
//余额统计
export const downOrderExcelNew = params => { return instance.get(`${preUrlPath}/pay1/mer/downOrderExcelNew`,{ params: params }); };

//购买记录
export const queryPkgPurchaseByCondition = params => { return instance.post(`${preUrlPath}/pay1/weixin/activity/queryPkgPurchaseByConditionPc`,params).then(res => res.data); };
//套餐列表
export const getPkgProductList = params => { return instance.post(`${preUrlPath}/pay1/weixin/activity/getPkgProductListPc`,params).then(res => res.data); };
//邀请人
export const queryPkgInviterByCondition = params => { return instance.post(`${preUrlPath}/pay1/weixin/activity/queryPkgInviterByCondition`,params).then(res => res.data); };

export const queryIntention = params => { return instance.post(`${preUrlPath}/pay1/weixin/activity/queryIntentionPc`,params).then(res => res.data); };

export const queryActivePur = params => { return instance.post(`${preUrlPath}/pay1/weixin/activity/queryActivePur`,params).then(res => res.data); };

export const updateRedStatus = params => { return instance.post(`${preUrlPath}/pay1/activity/updateRedStatus`,params).then(res => res.data); };

export const qRCode = params => { return instance.get(`${preUrlPath}/pay1/wxcard/qRCode`,{ params: params }); };

export const updatePkgInviterById = params => { return instance.post(`${preUrlPath}/pay1/weixin/activity/updatePkgInviterById`,params).then(res => res.data); };

export const getPkgProductListPc = params => { return instance.post(`${preUrlPath}/pay1/weixin/activity/getPkgProductListPc`,params).then(res => res.data); };

export const getCardLevelListPc = params => { return instance.post(`${preUrlPath}/pay1/weixin/activity/getCardLevelListPc`,params).then(res => res.data); };

export const insertPkgProduct = params => { return instance.post(`${preUrlPath}/pay1/weixin/activity/insertPkgProduct`,params).then(res => res.data); };

export const getPkgProductById = params => { return instance.post(`${preUrlPath}/pay1/weixin/activity/getPkgProductById`,params).then(res => res.data); };

export const updatePkgProduct = params => { return instance.post(`${preUrlPath}/pay1/weixin/activity/updatePkgProduct`,params).then(res => res.data); };

export const updateProdStauts = params => { return instance.post(`${preUrlPath}/pay1/weixin/activity/updateProdStauts`,params).then(res => res.data); };

export const downPkgPurchaseExcel = params => { return instance.get(`${preUrlPath}/pay1/weixin/activity/downPkgPurchaseExcel`,{ params: params }); };

export const downPkgInviterExcel = params => { return instance.get(`${preUrlPath}/pay1/weixin/activity/downPkgInviterExcel`,{ params: params }); };




//积分商城列表
export const queryProductList = params => { return instance.post(`${preUrlPath}/pay1/bounsShop/queryProductList`,params).then(res => res.data); };
//新增商品
export const insertProduct = params => { return instance.post(`${preUrlPath}/pay1/bounsShop/insertProduct`,params).then(res => res.data); };
//商品状态
export const updateStatus = params => { return instance.post(`${preUrlPath}/pay1/bounsShop/updateStatus`,params).then(res => res.data); };
//修改商品信息
export const updateProduct = params => { return instance.post(`${preUrlPath}/pay1/bounsShop/updateProduct`,params).then(res => res.data); };
//添加商品优惠卷查询
export const getCouponByInPro = params => { return instance.post(`${preUrlPath}/pay1/wxcard/getCouponByInPro`,params).then(res => res.data); };
//线下消费补录
export const inputMemTrans = params => { return instance.post(`${preUrlPath}/pay1/person/inputMemTrans`,params).then(res => res.data); };


//首页
export const merDataSumShow = params => { return instance.post(`${preUrlPath}/pay/mer/merDataSumShow`,params).then(res => res.data); };