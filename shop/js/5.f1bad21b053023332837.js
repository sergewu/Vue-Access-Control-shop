webpackJsonp([5],{"9bBU":function(e,t,a){a("mClu");var i=a("FeBl").Object;e.exports=function(e,t,a){return i.defineProperty(e,t,a)}},C4MV:function(e,t,a){e.exports={default:a("9bBU"),__esModule:!0}},bOdI:function(e,t,a){"use strict";t.__esModule=!0;var i=a("C4MV"),r=function(e){return e&&e.__esModule?e:{default:e}}(i);t.default=function(e,t,a){return t in e?(0,r.default)(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}},mClu:function(e,t,a){var i=a("kM2E");i(i.S+i.F*!a("+E39"),"Object",{defineProperty:a("evD5").f})},pAR5:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("bOdI"),r=a.n(i),s=a("yt7g"),o=a("KpZF"),l=a("S49b"),n={data:function(){var e,t=this,a=new Date;return{optionsScene:o.d,optionsBank:o.a,optionsPayState:o.b,optionsStore:[],optionsEmp:[],pickerOptions1:{disabledDate:function(e){if(e.getTime()>Date.now())return!0}},pickerOptions2:{disabledDate:function(e){var a=Date.parse(new Date(s.f.format(new Date(t.filters.startTime),"yyyy-MM-dd")));if(e.getTime()>a+7776e6||e.getTime()<a-864e5)return!0}},searchLoading:!1,empSearchLoading:!1,filters:(e={startTime:new Date(a.getFullYear(),a.getMonth(),a.getDate()-1),endTime:new Date(a.getFullYear(),a.getMonth(),a.getDate()-1,23,59,59),play:"",state:"SUCCESS",storeName:"",empName:"",goodsprice:"",transaction_id:""},r()(e,"goodsprice",""),r()(e,"cardType",""),r()(e,"isOnly",!1),e),whole:{sumAmt:"",countRow:""},total:0,page:1,users:[],listLoading:!1,advancedOptions:!1,editFormVisible:!1,editLoading:!1,editForm:{orderId:"",transactionId:"",goodsPrice:"",payTime:"",status:"",storeName:"",refundAmount:"",payWay:""},filtersRules:{endTime:[{type:"date",required:!0,message:"请选择日期",trigger:"change"}]}}},methods:{changTime:function(e){var t=Date.parse(new Date(s.f.format(new Date(this.filters.endTime),"yyyy-MM-dd")));Date.parse(new Date(s.f.format(new Date(e),"yyyy-MM-dd")))<t-7776e6&&(this.filters.endTime="")},formatPay2:function(e,t){return s.g(e.status,e.orderType)},formatPay1:function(e){return s.h(e)},format_payWay:function(e,t){return s.h(e.payWay)},format_payTime:function(e){return s.f.format(new Date(e),"yyyy-MM-dd hh:mm:ss")},format_amount:function(e,t){return s.i(e.goodsPrice,2,".",",")},clickEmp:function(){var e=this;this.empSearchLoading=!0;var t={mid:sessionStorage.getItem("mid"),storeId:String(this.filters.storeName),ename:""};Object(l._46)(t).then(function(t){e.empSearchLoading=!1;var a=(t.status,t.data);e.optionsEmp=a.emplyeeList})},remoteEmp:function(e){var t=this;""!==e?(this.empSearchLoading=!0,setTimeout(function(){t.empSearchLoading=!1;var a={mid:sessionStorage.getItem("mid"),storeId:String(t.filters.storeName),ename:e};Object(l._46)(a).then(function(e){var a=(e.status,e.data);t.optionsEmp=a.emplyeeList})},200)):this.optionsEmp=[]},selectStoreChange:function(){this.filters.empName=""},clickShop:function(){var e=this;this.searchLoading=!0,Object(l._48)().then(function(t){e.searchLoading=!1;var a=(t.status,t.data);e.optionsStore=a.storeList})},remoteShop:function(e){var t=this;""!==e?(this.searchLoading=!0,setTimeout(function(){t.searchLoading=!1,Object(l._48)({sname:e}).then(function(e){var a=(e.status,e.data);t.optionsStore=a.storeList})},200)):this.optionsStore=[]},handleCurrentChange:function(e){this.page=e,this.getList()},getList:function(){var e=this;this.listLoading=!0;var t={mid:sessionStorage.getItem("mid"),pageNum:this.page,payWay:this.filters.play,status:this.filters.state,storeId:String(this.filters.storeName),startTime:this.filters.startTime,endTime:this.filters.endTime,orderId:this.filters.orderId,transactionId:this.filters.transaction_id,goodsPrice:this.filters.goodsprice,cardType:this.filters.cardType,eid:String(this.filters.empName),isOnly:this.filters.isOnly};t.startTime=t.startTime&&""!=t.startTime?String(Date.parse(s.f.format(new Date(t.startTime),"yyyy/MM/dd hh:mm:ss"))):"",t.endTime=t.endTime&&""!=t.endTime?String(Date.parse(s.f.format(new Date(t.endTime),"yyyy/MM/dd hh:mm:ss"))):"",t.isOnly=!0===t.isOnly?"Y":"N",Object(l.A)(t).then(function(t){t.data,t.message;200==t.status&&(e.total=t.data.totalCount,e.whole.countRow=t.data.countRow,e.whole.sumAmt=t.data.sumAmt,e.users=t.data.summaryCopyList),e.listLoading=!1})},getUsers:function(e){var t=this;this.$refs[e].validate(function(e){e&&(t.page=1,t.getList())})},handleEdit:function(e,t){var a=this;this.editFormVisible=!0,Object(l.z)({id:t.id}).then(function(e){200===e.status&&(a.editForm=e.data.order)})},resetForm:function(e){this.$refs[e].resetFields()}},mounted:function(){var e=this;this.getUsers("filters"),Object(l._0)().then(function(t){var a=t.status;t.message;200==a&&(e.options=t.data.storeList)})}},m=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",[a("el-row",[a("el-col",[a("el-form",{attrs:{inline:!0,model:e.whole}},[a("el-tag",{staticStyle:{margin:"10px 10px 20px 0"},attrs:{type:"primary"}},[e._v("交易总金额（元）："+e._s(e.whole.sumAmt)+"元")]),e._v(" "),a("el-tag",{staticStyle:{margin:"10px 10px 20px 0"},attrs:{type:"primary"}},[e._v("交易总笔数（笔）："+e._s(e.whole.countRow)+"笔")])],1)],1)],1),e._v(" "),a("el-form",{ref:"filters",staticClass:"top_input",attrs:{inline:!0,model:e.filters,rules:e.filtersRules}},[a("el-row",[a("el-form-item",{attrs:{prop:"startTime"}},[a("el-date-picker",{staticClass:"fixed_search_input_datetime",attrs:{type:"datetime",placeholder:"选择开始日期","picker-options":e.pickerOptions1,clearable:!1,editable:!1},on:{change:e.changTime},model:{value:e.filters.startTime,callback:function(t){e.$set(e.filters,"startTime",t)},expression:"filters.startTime"}})],1),e._v(" "),a("el-form-item",[e._v("\n        至\n      ")]),e._v(" "),a("el-form-item",{attrs:{prop:"endTime"}},[a("el-date-picker",{staticClass:"fixed_search_input_datetime",attrs:{type:"datetime",placeholder:"选择结束日期","picker-options":e.pickerOptions2,clearable:!1,editable:!1},model:{value:e.filters.endTime,callback:function(t){e.$set(e.filters,"endTime",t)},expression:"filters.endTime"}})],1),e._v(" "),a("el-form-item",{staticClass:"fixed_search_input",attrs:{prop:"storeName"}},[a("el-select",{attrs:{placeholder:"门店名称",multiple:!1,filterable:"",remote:"","remote-method":e.remoteShop,loading:e.searchLoading,clearable:""},on:{focus:e.clickShop,change:e.selectStoreChange},model:{value:e.filters.storeName,callback:function(t){e.$set(e.filters,"storeName",t)},expression:"filters.storeName"}},e._l(e.optionsStore,function(e){return a("el-option",{key:e.id,attrs:{value:e.id,label:e.value}})}))],1),e._v(" "),a("el-form-item",{staticClass:"fixed_search_input",attrs:{prop:"empName"}},[a("el-select",{attrs:{placeholder:"款台名称",multiple:!1,filterable:"",remote:"","remote-method":e.remoteEmp,loading:e.empSearchLoading,clearable:""},on:{focus:e.clickEmp},model:{value:e.filters.empName,callback:function(t){e.$set(e.filters,"empName",t)},expression:"filters.empName"}},e._l(e.optionsEmp,function(e){return a("el-option",{key:e.eid,attrs:{value:e.eid,label:e.value}})}))],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"text"},on:{click:function(t){e.advancedOptions=!e.advancedOptions}}},[e._v(e._s(e.advancedOptions?"隐藏":"显示")+"高级选项")])],1),e._v(" "),a("el-form-item",{staticStyle:{float:"right"}},[a("el-button",{attrs:{type:"primary",size:"medium",round:""},on:{click:function(t){e.getUsers("filters")}}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{size:"medium",round:""},on:{click:function(t){e.resetForm("filters")}}},[e._v("重置")])],1)],1),e._v(" "),a("el-collapse-transition",[a("div",{directives:[{name:"show",rawName:"v-show",value:e.advancedOptions,expression:"advancedOptions"}]},[a("el-row",[a("el-form-item",{staticClass:"fixed_search_input",attrs:{prop:"play"}},[a("el-select",{attrs:{clearable:"",placeholder:"支付方式"},model:{value:e.filters.play,callback:function(t){e.$set(e.filters,"play",t)},expression:"filters.play"}},e._l(e.optionsScene,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-form-item",{staticClass:"fixed_search_input",attrs:{prop:"cardType"}},[a("el-select",{attrs:{clearable:"",placeholder:"银行卡类型"},model:{value:e.filters.cardType,callback:function(t){e.$set(e.filters,"cardType",t)},expression:"filters.cardType"}},e._l(e.optionsBank,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-form-item",{staticClass:"fixed_search_input",attrs:{prop:"state"}},[a("el-select",{attrs:{clearable:"",placeholder:"支付状态"},model:{value:e.filters.state,callback:function(t){e.$set(e.filters,"state",t)},expression:"filters.state"}},e._l(e.optionsPayState,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-form-item",{staticClass:"fixed_search_input",attrs:{prop:"goodsprice"}},[a("el-input",{attrs:{placeholder:"交易金额"},model:{value:e.filters.goodsprice,callback:function(t){e.$set(e.filters,"goodsprice","string"==typeof t?t.trim():t)},expression:"filters.goodsprice"}},[a("i",{staticClass:"iconfont icon-50",attrs:{slot:"prefix"},slot:"prefix"})])],1),e._v(" "),a("el-form-item",{staticClass:"fixed_search_input",attrs:{prop:"orderId"}},[a("el-input",{attrs:{placeholder:"订单号"},model:{value:e.filters.orderId,callback:function(t){e.$set(e.filters,"orderId","string"==typeof t?t.trim():t)},expression:"filters.orderId"}})],1),e._v(" "),a("el-form-item",{staticClass:"fixed_search_input",attrs:{prop:"transaction_id"}},[a("el-input",{attrs:{placeholder:"第三方订单号"},model:{value:e.filters.transaction_id,callback:function(t){e.$set(e.filters,"transaction_id","string"==typeof t?t.trim():t)},expression:"filters.transaction_id"}})],1)],1)],1)]),e._v(" "),a("el-row",[a("el-alert",{attrs:{title:"可查询30天之前的交易，每次查询区间最多为3个月",type:"warning",center:"","close-text":"知道了","show-icon":""}})],1)],1),e._v(" "),a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}]},[a("el-table",{attrs:{data:e.users,border:"","highlight-current-row":""}},[a("el-table-column",{attrs:{prop:"payTime",label:"付款时间","min-width":"165"}}),e._v(" "),a("el-table-column",{attrs:{prop:"orderId",label:"订单号","min-width":"285"}}),e._v(" "),a("el-table-column",{attrs:{prop:"goodsPrice",label:"交易金额",width:"120",formatter:e.format_amount}}),e._v(" "),a("el-table-column",{attrs:{prop:"payWay",label:"支付方式",width:"120",formatter:e.format_payWay}}),e._v(" "),a("el-table-column",{attrs:{prop:"status",label:"交易状态",width:"150",formatter:e.formatPay2}}),e._v(" "),a("el-table-column",{attrs:{prop:"storeName",label:"收款门店",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){e.handleEdit(t.$index,t.row)}}},[e._v("交易详情")])]}}])})],1)],1),e._v(" "),a("el-row",[a("el-pagination",{staticStyle:{"text-align":"center",background:"#fff",padding:"15px"},attrs:{layout:"prev, pager, next","current-page":e.page,"page-size":20,total:e.total,background:""},on:{"current-change":e.handleCurrentChange}})],1),e._v(" "),a("el-dialog",{attrs:{title:"交易详情",visible:e.editFormVisible,"close-on-click-modal":!1,width:"600px"},on:{"update:visible":function(t){e.editFormVisible=t}}},[a("el-form",{ref:"editForm",attrs:{model:e.editForm,"label-width":"160px","label-position":"left"}},[a("el-form-item",{attrs:{label:"订单号："}},[a("span",[e._v(e._s(e.editForm.orderId))])]),e._v(" "),a("el-form-item",{attrs:{label:"第三方订单号："}},[a("span",[e._v(e._s(e.editForm.transactionId))])]),e._v(" "),a("el-form-item",{attrs:{label:"交易金额（元）："}},[a("span",[e._v(e._s(e.editForm.goodsPrice))])]),e._v(" "),a("el-form-item",{attrs:{label:"付款时间："}},[a("span",[e._v(e._s(e.format_payTime(e.editForm.payTime)))])]),e._v(" "),a("el-form-item",{attrs:{label:"交易状态："}},[a("span",[e._v(e._s(e.formatPay2(e.editForm)))])]),e._v(" "),a("el-form-item",{attrs:{label:"退款金额（元）："}},[a("span",[e._v(e._s(e.editForm.refundAmount))])]),e._v(" "),a("el-form-item",{attrs:{label:"收款门店："}},[a("span",[e._v(e._s(e.editForm.storeName))])]),e._v(" "),a("el-form-item",{attrs:{label:"款台："}},[a("span",[e._v(e._s(e.editForm.username))])]),e._v(" "),a("el-form-item",{attrs:{label:"支付方式："}},[a("span",[e._v(e._s(e.formatPay1(e.editForm.payWay)))])]),e._v(" "),a("el-form-item",{attrs:{label:"备注："}},[a("span",[e._v(e._s(e.editForm.goodsDesc))])])],1)],1)],1)},d=[],c={render:m,staticRenderFns:d},p=c,f=a("VU/8"),u=f(n,p,!1,null,null,null);t.default=u.exports}});