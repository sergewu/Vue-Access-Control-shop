webpackJsonp([30],{"78fl":function(n,t,e){var a=e("PfpI");"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);e("rjj0")("9312b4aa",a,!0,{})},PfpI:function(n,t,e){t=n.exports=e("FZ+f")(!1),t.push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},TW1k:function(n,t,e){"use strict";function a(n){e("78fl")}Object.defineProperty(t,"__esModule",{value:!0});var s=e("yt7g"),l=e("S49b"),r={data:function(){return{filters:{status:""},statusOptions:[{value:"1",label:"已兑换"},{value:"2",label:"已核销"}],users:[],total:0,page:1,listLoading:!1}},methods:{status:function(n,t){return 0==n.status?"创建":1==n.status?"已兑换":2==n.status?"已核销":"未知"},creat_time:function(n,t){return n.creat_time=s.f.format(new Date(n.creat_time),"yyyy-MM-dd hh:mm:ss")},handleCurrentChange:function(n){this.page=n,this.getList()},getUsers:function(){this.page=1,this.getList()},getList:function(){var n=this,t={pagNum:this.page,status:this.filters.status};this.listLoading=!0,Object(l._35)(t).then(function(t){n.total=t.data.total,n.users=t.data.shopOrderList,n.listLoading=!1})}},mounted:function(){this.getUsers()}},i=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("section",[e("el-row",[e("el-form",{attrs:{inline:!0,model:n.filters}},[e("el-form-item",[[e("el-select",{attrs:{clearable:"",placeholder:"请选择订单状态"},model:{value:n.filters.status,callback:function(t){n.$set(n.filters,"status",t)},expression:"filters.status"}},n._l(n.statusOptions,function(n){return e("el-option",{key:n.value,attrs:{label:n.label,value:n.value}})}))]],2),n._v(" "),e("el-form-item",{staticStyle:{float:"right"}},[e("el-button",{attrs:{type:"primary",size:"medium",round:""},on:{click:n.getUsers}},[n._v("查询")])],1)],1)],1),n._v(" "),e("div",{directives:[{name:"loading",rawName:"v-loading",value:n.listLoading,expression:"listLoading"}]},[e("el-table",{staticStyle:{width:"100%"},attrs:{data:n.users,border:"","highlight-current-row":""}},[e("el-table-column",{attrs:{prop:"name",label:"姓名","min-width":"120"}}),n._v(" "),e("el-table-column",{attrs:{prop:"phone",label:"电话","min-width":"140"}}),n._v(" "),e("el-table-column",{attrs:{prop:"product_name",label:"商品名称","min-width":"180"}}),n._v(" "),e("el-table-column",{attrs:{prop:"order_id",label:"订单号","min-width":"280"}}),n._v(" "),e("el-table-column",{attrs:{prop:"status",label:"状态","min-width":"100",formatter:n.status}}),n._v(" "),e("el-table-column",{attrs:{prop:"creat_time",label:"创建时间","min-width":"160",formatter:n.creat_time}})],1)],1),n._v(" "),e("el-row",[e("el-pagination",{staticStyle:{"text-align":"center",background:"#fff",padding:"15px"},attrs:{layout:"prev, pager, next","current-page":n.page,"page-size":20,total:n.total,background:""},on:{"current-change":n.handleCurrentChange}})],1)],1)},o=[],u={render:i,staticRenderFns:o},c=u,d=e("VU/8"),p=a,f=d(r,c,!1,p,"data-v-52d8e69c",null);t.default=f.exports}});