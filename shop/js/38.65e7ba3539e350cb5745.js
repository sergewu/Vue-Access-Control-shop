webpackJsonp([38],{"+ZfZ":function(n,t,e){t=n.exports=e("FZ+f")(!1),t.push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},nUbS:function(n,t,e){"use strict";function a(n){e("w9n9")}Object.defineProperty(t,"__esModule",{value:!0});var s=(e("yt7g"),e("S49b")),i={data:function(){return{users:[],total:0,page:1,listLoading:!1,sels:[]}},methods:{handleCurrentChange:function(n){var t=this;this.page=n;var e={pageNum:this.page};this.listLoading=!0,Object(s._36)(e).then(function(n){t.total=n.data.map.totalCount,t.users=n.data.map.storeList,t.listLoading=!1})},getUsers:function(){var n=this;Object(s._51)().then(function(t){var e=t.status,a=t.message;200==e?n.$notify({title:"成功",message:a,type:"success"}):n.$notify.error({title:"错误",message:a})}),this.page=1;var t={pageNum:this.page};this.listLoading=!0,Object(s._36)(t).then(function(t){n.total=t.data.map.totalCount,n.users=t.data.map.storeList,n.listLoading=!1})}},mounted:function(){this.getUsers()}},r=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("section",[e("el-row",[e("el-form",{attrs:{inline:!0}},[e("el-form-item",[e("el-button",{attrs:{type:"primary",size:"medium",round:""},on:{click:n.getUsers}},[e("i",{staticClass:"fa fa-refresh fa-fw"}),n._v("同步")])],1)],1)],1),n._v(" "),e("div",[e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:n.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:n.users,border:"","highlight-current-row":""}},[e("el-table-column",{attrs:{prop:"mname",label:"门店名称","min-width":"100"}}),n._v(" "),e("el-table-column",{attrs:{prop:"address",label:"门店地址","min-width":"100"}})],1)],1),n._v(" "),e("el-row",[e("el-pagination",{staticStyle:{"text-align":"center",background:"#fff",padding:"15px"},attrs:{layout:"prev, pager, next","current-page":n.page,"page-size":20,total:n.total,background:""},on:{"current-change":n.handleCurrentChange}})],1)],1)},o=[],l={render:r,staticRenderFns:o},u=l,c=e("VU/8"),d=a,g=c(i,u,!1,d,"data-v-2bd753a9",null);t.default=g.exports},w9n9:function(n,t,e){var a=e("+ZfZ");"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);e("rjj0")("7a3be15b",a,!0,{})}});