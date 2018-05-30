import instance from './index';
const preUrlPath = '';
//登录
export const loginShopVerify = {
  p:['post,/login'],
  r: params => { 
    return instance.post(`${preUrlPath}/pay/wp/mer/loginShopVerify`, params).then(res => res.data); 
  }
};
//获取验证码
export const getCode = {
  p: ['get,/login'],
  r: process.env.API_ROOT+"/pay/getCode"
};
//门店汇总
export const getUserList = params => { return instance.post(`${preUrlPath}/pay/wp/mer/querySummary`, params).then(res => res.data);};
//收款记录
 export const getUserListPage = params => { return instance.post(`${preUrlPath}/pay/wp/mer/queryOrderShop`,params).then(res => res.data); };
//修改密码
 export const modifyPassword= params => { return instance.post(`${preUrlPath}/pay/wp/mer/updateMerMpwd`, params).then(res => res.data); };
//退出登录
 export const batchRemoveUser = params => { return instance.post(`${preUrlPath}/pay/wp/mer/loginMerOut`, params).then(res => res.data); };
//模糊查询
 export const lookupUser = params => { return instance.post(`${preUrlPath}/pay/comm/selectStoreList`,params).then(res => res.data); };
//门店管理
 export const queryStoresShop = params => { return instance.post(`${preUrlPath}/pay/wp/mer/queryStoresShop`,params).then(res => res.data); };
//列表修改
export const updateStore = params => { return instance.post(`${preUrlPath}/pay/wp/mer/updateStore`,params).then(res => res.data); };
//门店删除
export const deleteStore = params => { return instance.post(`${preUrlPath}/pay/wp/mer/deleteStore`,params).then(res => res.data); };
//门店新增
export const addStore = params => { return instance.post(`${preUrlPath}/pay/wp/mer/addStore`,params).then(res => res.data); };
//门店状态
export const updateStoreState = params => { return instance.post(`${preUrlPath}/pay/wp/mer/updateStoreState`,params).then(res => res.data); };
//重置密码
export const updateStorePwd = params => { return instance.post(`${preUrlPath}/pay/wp/mer/updateStorePwd`,params).then(res => res.data); };
//款台查询
export const queryEmployeeShop = params => { return instance.post(`${preUrlPath}/pay/wp/mer/queryEmployeeShop`,params).then(res => res.data); };
//款台详情
export const queryEmployeeDetail = params => { return instance.post(`${preUrlPath}/pay/wp/mer/queryEmployeeDetail`,params).then(res => res.data); };
//款台密码重置
export const updateEmployeePwd = params => { return instance.post(`${preUrlPath}/pay/wp/mer/updateEmployeePwd`,params).then(res => res.data); };
//款台增加
export const addEmployee = params => { return instance.post(`${preUrlPath}/pay/wp/mer/addEmployee`,params).then(res => res.data); };
//款台修改
export const updateEmployee = params => { return instance.post(`${preUrlPath}/pay/wp/mer/updateEmployee`,params).then(res => res.data); };
//款台删除
export const deleteEmployee = params => { return instance.post(`${preUrlPath}/pay/wp/mer/deleteEmployee`,params).then(res => res.data); };
//打印列表
export const queryPrintShopNew = params => { return instance.post(`${preUrlPath}/pay/wp/mer/queryPrintShopNew`,params).then(res => res.data); };
//删除列表
export const deletePrintNew = params => { return instance.post(`${preUrlPath}/pay/wp/mer/deletePrintNew`,params).then(res => res.data); };
//添加打印配置
export const addPrintNew = params => { return instance.post(`${preUrlPath}/pay/wp/mer/addPrintNew`,params).then(res => res.data); };
//添加打印配置
export const addAudio = params => { return instance.post(`${preUrlPath}/pay/wp/mer/addAudio`,params).then(res => res.data); };

export const queryAudio = params => { return instance.post(`${preUrlPath}/pay/wp/mer/queryAudio`,params).then(res => res.data); };

export const updateAudio = params => { return instance.post(`${preUrlPath}/pay/wp/mer/updateAudio`,params).then(res => res.data); };

export const bindAudio = params => { return instance.post(`${preUrlPath}/pay/wp/mer/bindAudio`,params).then(res => res.data); };

export const volAudio = params => { return instance.post(`${preUrlPath}/pay/wp/mer/volAudio`,params).then(res => res.data); };

export const selectEmpsBySid = params => { return instance.post(`${preUrlPath}/pay/comm/selectEmpsBySid`,params).then(res => res.data); };
//款台状态
export const updateEmployeeStatus = params => { return instance.post(`${preUrlPath}/pay/wp/mer/updateEmployeeStatus`,params).then(res => res.data); };
//修改打印配置
export const updatePrintNew = params => { return instance.post(`${preUrlPath}/pay/wp/mer/updatePrintNew`,params).then(res => res.data); };
//款台状态修改
export const queryPrintDetailNew = params => { return instance.post(`${preUrlPath}/pay/wp/mer/queryPrintDetailNew`,params).then(res => res.data); };
//打印状态修改
export const updatePStatusNew = params => { return instance.post(`${preUrlPath}/pay/wp/mer/updatePStatusNew`,params).then(res => res.data); };
//导出Excel(收款)
export const downOrderExcel = params => { return instance.get(`${preUrlPath}/pay/wp/mer/downOrderExcel`,{ params: params }); };
//导出Excel(汇总)
export const downOrderSumExcel = params => { return instance.get(`${preUrlPath}/pay/wp/mer/downOrderSumExcel`,{ params: params }); };
//二维码
export const getEmpTwoCode = params => { return instance.get(`${preUrlPath}/pay/wp/mer/getEmpTwoCode`,{ params: params }); };
//会员卡支付二维码
export const getEmpMemCode = params => { return instance.get(`${preUrlPath}/pay/wp/mer/getEmpMemCode`,{ params: params }); };
//打印增加款台
export const selectEmpListByMid = params => { return instance.post(`${preUrlPath}/pay/comm/selectEmpListByMid`,params).then(res => res.data); };
//退款
export const merRefund = params => { return instance.post(`${preUrlPath}/pay/wp/mer/merRefund`,params).then(res => res.data); };
//补发打印
export const supplyPrint = params => { return instance.post(`${preUrlPath}/pay/wp/mer/supplyPrint`,params).then(res => res.data); };
//门店汇总
export const queryStrStatement = params => { return instance.post(`${preUrlPath}/pay/wp/mer/queryStrStatement`,params).then(res => res.data); };
//门店汇总
export const selectStoreList = params => { return instance.post(`${preUrlPath}/pay/comm/selectStoreList`,params).then(res => res.data); };

export const downStrSumExcel = params => { return instance.get(`${preUrlPath}/pay/wp/mer/downStrSumExcel`,{ params: params }); };

//会员日设置
export const addMemDay = params => { return instance.post(`${preUrlPath}/pay/wp/mer/addMemDay`,params).then(res => res.data); };
//会员日查询
export const queryMemDay = params => { return instance.post(`${preUrlPath}/pay/wp/mer/queryMemDay`,params).then(res => res.data); };
//同步会员卡
export const sysMemberInsert = params => { return instance.post(`${preUrlPath}/pay/wp/mer/sysMemberInsert`,params).then(res => res.data); };
//获取验证码
export const sendVerCode = params => { return instance.post(`${preUrlPath}/pay/wp/mer/sendVerCode`,params).then(res => res.data); };
//确认退款
export const checkVerCode = params => { return instance.post(`${preUrlPath}/pay/wp/mer/checkVerCode`,params).then(res => res.data); };
//卡劵投放
// export const getUrlCode = params => { return instance.post(`${preUrlPath}/pay/wp/mer/getUrlCode`,params).then(res => res.data); };
export const getUrlCode = params => { return instance.get(`${preUrlPath}/pay/wp/mer/getUrlCode`,{ params: params }); };
//订单详情
export const queryOrderDetail = params => { return instance.post(`${preUrlPath}/pay/wp/mer/queryOrderDetail`,params).then(res => res.data); };




//同步门店接口
export const synStoreList = params => { return instance.post(`${preUrlPath}/pay/wp/mer/synStoreList`,params).then(res => res.data); };
//查询门店接口
export const queryStoreList = params => { return instance.post(`${preUrlPath}/pay/wp/mer/queryStoreList`,params).then(res => res.data); };
//会员卡列表
export const queryMemCardList = params => { return instance.post(`${preUrlPath}/pay/wp/mer/queryMemCardList`,params).then(res => res.data); };
//微信会员卡创建
export const insertMenCard = params => { return instance.post(`${preUrlPath}/pay/wp/mer/insertMenCard`,params).then(res => res.data); };
//微信上传
export const uploadCreatCard = params => { return instance.post(`${preUrlPath}/pay/wp/mer/uploadCreatCard`,params).then(res => res.data); };
//会员信息
export const queryMemberList = params => { return instance.post(`${preUrlPath}/pay/wp/mer/queryMemberList`,params).then(res => res.data); };
//消费记录
export const queryAccTransList = params => { return instance.post(`${preUrlPath}/pay/wp/mer/queryAccTransList`,params).then(res => res.data); };
//订单管理
export const queryShopOrderList = params => { return instance.post(`${preUrlPath}/pay/wp/mer/queryShopOrderList`,params).then(res => res.data); };
//卡卷列表
export const queryCouponList = params => { return instance.post(`${preUrlPath}/pay/wp/mer/queryCouponList`,params).then(res => res.data); };
//卡卷上传
export const uploadCoupon = params => { return instance.post(`${preUrlPath}/pay/wp/mer/uploadCoupon`,params).then(res => res.data); };
//核销卡卷查询
export const queryCode = params => { return instance.post(`${preUrlPath}/pay/wp/mer/queryCode`,params).then(res => res.data); };
//确认核销
export const consumeCode = params => { return instance.post(`${preUrlPath}/pay/wp/mer/consumeCode`,params).then(res => res.data); };
//卡卷核销列表
export const queryConsumeList = params => { return instance.post(`${preUrlPath}/pay/wp/mer/queryConsumeList`,params).then(res => res.data); };
//公司账户=>添加母户
export const insertCompany = params => { return instance.post(`${preUrlPath}/pay/wp/mer/insertCompany`,params).then(res => res.data); };
//公司账户列表
export const queryCompany = params => { return instance.post(`${preUrlPath}/pay/wp/mer/queryCompany`,params).then(res => res.data); };
//绑定子户
export const insertBindAcc = params => { return instance.post(`${preUrlPath}/pay/wp/mer/insertBindAcc`,params).then(res => res.data); };
//绑定页面查询会员卡号
export const checkAccountByNum = params => { return instance.post(`${preUrlPath}/pay/wp/mer/checkAccountByNum`,params).then(res => res.data); };
//查看已绑定会员
export const queryBindAcc = params => { return instance.post(`${preUrlPath}/pay/wp/mer/queryBindAcc`,params).then(res => res.data); };
//副卡充值
export const bindDeposit = params => { return instance.post(`${preUrlPath}/pay/wp/mer/bindDeposit`,params).then(res => res.data); };
//副卡解绑
export const unBind = params => { return instance.post(`${preUrlPath}/pay/wp/mer/unBind`,params).then(res => res.data); };
//公司账户交易明细
export const companyTrans = params => { return instance.post(`${preUrlPath}/pay/wp/mer/companyTrans`,params).then(res => res.data); };
//重置密码
export const resetMemPwd = params => { return instance.post(`${preUrlPath}/pay/wp/mer/resetMemPwd`,params).then(res => res.data); };
//公司账户充值
export const depositCompany = params => { return instance.post(`${preUrlPath}/pay/wp/mer/depositCompany`,params).then(res => res.data); };
//修改库存
export const modifyStock = params => { return instance.post(`${preUrlPath}/pay/wp/mer/modifyStock`,params).then(res => res.data); };
//交易账单
export const downTransExcel = params => { return instance.get(`${preUrlPath}/pay/wp/mer/downTransExcel`,{ params: params }); };
//会员交易查询
export const queryMemTrans = params => { return instance.post(`${preUrlPath}/pay/wp/mer/queryMemTrans`,params).then(res => res.data); };
//添加充值规则
export const insertDepositRule = params => { return instance.post(`${preUrlPath}/pay/wp/mer/insertDepositRule`,params).then(res => res.data); };
//查询充值规则
export const getDepositRule = params => { return instance.post(`${preUrlPath}/pay/wp/mer/getDepositRule`,params).then(res => res.data); };
//修改充值规则状态
export const updateDepositStatus = params => { return instance.post(`${preUrlPath}/pay/wp/mer/updateDepositStatus`,params).then(res => res.data); };
//编辑充值规则
export const updateDepositRule = params => { return instance.post(`${preUrlPath}/pay/wp/mer/updateDepositRule`,params).then(res => res.data); };
//会员卡修改回显
export const queryCardByKey = params => { return instance.post(`${preUrlPath}/pay/wp/mer/queryCardByKey`,params).then(res => res.data); };
//会员卡修改提交
export const updateMenCard = params => { return instance.post(`${preUrlPath}/pay/wp/mer/updateMenCard`,params).then(res => res.data); };

export const queryLevel = params => { return instance.post(`${preUrlPath}/pay/wp/mer/queryLevel`,params).then(res => res.data); };


export const selectEmpList = params => { return instance.post(`${preUrlPath}/pay/comm/selectEmpList`,params).then(res => res.data); };
//余额统计
export const queryBalance = params => { return instance.post(`${preUrlPath}/pay/wp/mer/queryBalance`,params).then(res => res.data); };
//余额统计
export const downOrderExcelNew = params => { return instance.get(`${preUrlPath}/pay/wp/mer/downOrderExcelNew`,{ params: params }); };

//购买记录
export const queryPkgPurchaseByCondition = params => { return instance.post(`${preUrlPath}/pay/wp/mer/queryPkgPurchaseByConditionPc`,params).then(res => res.data); };
//套餐列表
export const getPkgProductList = params => { return instance.post(`${preUrlPath}/pay/wp/mer/getPkgProductListPc`,params).then(res => res.data); };
//邀请人
export const queryPkgInviterByCondition = params => { return instance.post(`${preUrlPath}/pay/wp/mer/queryPkgInviterByCondition`,params).then(res => res.data); };

export const queryIntention = params => { return instance.post(`${preUrlPath}/pay/wp/mer/queryIntentionPc`,params).then(res => res.data); };

export const queryActivePur = params => { return instance.post(`${preUrlPath}/pay/wp/mer/queryActivePur`,params).then(res => res.data); };

export const updateRedStatus = params => { return instance.post(`${preUrlPath}/pay/wp/mer/updateRedStatus`,params).then(res => res.data); };

export const qRCode = params => { return instance.get(`${preUrlPath}/pay/wp/mer/qRCode`,{ params: params }); };

export const updatePkgInviterById = params => { return instance.post(`${preUrlPath}/pay/wp/mer/updatePkgInviterById`,params).then(res => res.data); };

export const getPkgProductListPc = params => { return instance.post(`${preUrlPath}/pay/wp/mer/getPkgProductListPc`,params).then(res => res.data); };

export const getCardLevelListPc = params => { return instance.post(`${preUrlPath}/pay/wp/mer/getCardLevelListPc`,params).then(res => res.data); };

export const insertPkgProduct = params => { return instance.post(`${preUrlPath}/pay/wp/mer/insertPkgProduct`,params).then(res => res.data); };

export const getPkgProductById = params => { return instance.post(`${preUrlPath}/pay/wp/mer/getPkgProductById`,params).then(res => res.data); };

export const updatePkgProduct = params => { return instance.post(`${preUrlPath}/pay/wp/mer/updatePkgProduct`,params).then(res => res.data); };

export const updateProdStauts = params => { return instance.post(`${preUrlPath}/pay/wp/mer/updateProdStauts`,params).then(res => res.data); };

export const downPkgPurchaseExcel = params => { return instance.get(`${preUrlPath}/pay/wp/mer/downPkgPurchaseExcel`,{ params: params }); };

export const downPkgInviterExcel = params => { return instance.get(`${preUrlPath}/pay/wp/mer/downPkgInviterExcel`,{ params: params }); };




//积分商城列表
export const queryProductList = params => { return instance.post(`${preUrlPath}/pay/wp/mer/queryProductList`,params).then(res => res.data); };
//新增商品
export const insertProduct = params => { return instance.post(`${preUrlPath}/pay/wp/mer/insertProduct`,params).then(res => res.data); };
//商品状态
export const updateStatus = params => { return instance.post(`${preUrlPath}/pay/wp/mer/updateStatus`,params).then(res => res.data); };
//修改商品信息
export const updateProduct = params => { return instance.post(`${preUrlPath}/pay/wp/mer/updateProduct`,params).then(res => res.data); };
//添加商品优惠卷查询
export const getCouponByInPro = params => { return instance.post(`${preUrlPath}/pay/wp/mer/getCouponByInPro`,params).then(res => res.data); };
//线下消费补录
export const inputMemTrans = params => { return instance.post(`${preUrlPath}/pay/wp/mer/inputMemTrans`,params).then(res => res.data); };


//首页
export const merDataSumShow = params => { return instance.post(`${preUrlPath}/pay/wp/mer/merDataSumShow`,params).then(res => res.data); };
//公告列表
export const getNotices = params => { return instance.post(`${preUrlPath}/pay/wp/mer/getNotices`,params).then(res => res.data); };
//公告详情
export const getNoticeById = params => { return instance.post(`${preUrlPath}/pay/wp/mer/getNoticeById`,params).then(res => res.data); };
//人工补录
export const queryInviter = params => { return instance.post(`${preUrlPath}/pay/wp/mer/queryInviter`,params).then(res => res.data); };
//人工补录
export const queryMember = params => { return instance.post(`${preUrlPath}/pay/comm/queryMember`,params).then(res => res.data); };
//人工补录
export const makeUpPurchase = params => { return instance.post(`${preUrlPath}/pay/wp/mer/makeUpPurchase`,params).then(res => res.data); };
//商户交易日汇总
export const queryMerDaySum = params => { return instance.post(`${preUrlPath}/pay/wp/mer/queryMerDaySum`,params).then(res => res.data); };
//门店数据查询
export const queryStrStateCp = params => { return instance.post(`${preUrlPath}/pay/wp/mer/queryStrStateCp`,params).then(res => res.data); };




//下载ex
export const checkdownOrderExcelNew = params => { return instance.get('http://download.weupay.com/download/mer/checkdownOrderExcelNew',{ params: params }); };

export const checkDataExcel = params => { return instance.get('http://download.weupay.com/download/mer/checkDataExcel',{ params: params }); };

export const checkdownOrderExcel = params => { return instance.get('http://download.weupay.com/download/mer/checkdownOrderExcel',{ params: params }); };
//收款记录
export const downloadQueryOrderShop = params => { return instance.post('http://download.weupay.com/download/mer/queryOrderShop',params).then(res => res.data); };

export const downloadQueryOrderDetail = params => { return instance.post('http://download.weupay.com/download/mer/queryOrderDetail',params).then(res => res.data); };

