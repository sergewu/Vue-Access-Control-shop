webpackJsonp([27],{B9yZ:function(n,e,t){"use strict";function s(n){t("soFt")}Object.defineProperty(e,"__esModule",{value:!0});var r=t("woOf"),o=t.n(r),a=(t("yt7g"),t("Av7u")),i=t.n(a),l=t("S49b"),d={data:function(){var n=function(n,e,t){""===e?t(new Error("请输入联系人手机号")):/^1(3|4|5|7|8)\d{9,10}$/.test(e)?t():t(new Error("请输入正确的联系人手机号"))};return{filters:{storeName:""},value:"",startTime:"",endTime:"",users:[],total:1,page:1,listLoading:!1,detFormVisible:!1,detLoading:!1,stateFormVisible:!1,stateLoading:!1,editFormVisible:!1,editLoading:!1,editFormRules:{storeName:[{required:!0,message:"请输入门店名称",trigger:"blur"},{max:20,message:"请输入正确的门店名称",trigger:"blur"}],address:[{required:!0,message:"请输入门店地址",trigger:"blur"},{max:60,message:"请输入正确的门店地址",trigger:"blur"}],telephone:[{required:!0,message:"请输入联系人手机号",trigger:"blur"},{validator:n,trigger:"blur"}]},detForm:{},stateForm:{},editForm:{storeName:"",address:"",telephone:"",shopHours:"",startTime:"",endTime:""},addFormVisible:!1,addLoading:!1,addFormRules:{storeName:[{required:!0,message:"请输入门店名称",trigger:"blur"},{max:20,message:"请输入正确的门店名称",trigger:"blur"}],address:[{required:!0,message:"请输入门店地址",trigger:"blur"},{max:60,message:"请输入正确的门店地址",trigger:"blur"}],telephone:[{required:!0,message:"请输入联系人手机号",trigger:"blur"},{validator:n,trigger:"blur"}]},addForm:{mname:"",storeName:"",address:"",telephone:"",shopHours:"",startTime:"",endTime:""}}},methods:{test:function(n,e){var t=this;this.$confirm("此操作将修改门店状态, 确定修改?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",closeOnClickModal:!1,type:"warning"}).then(function(){var n={id:e.id,status:1==e.state?"Y":0==e.state?"N":"未知"};Object(l._75)(n).then(function(n){200==n.status?t.$message({type:"success",message:"修改成功!"}):t.$message({type:"success",message:"修改失败!"})})}).catch(function(){t.getUsers(),t.$message({type:"info",message:"取消修改"})})},handle:function(n,e){this.stateFormVisible=!0,this.stateForm=o()({},e),this.radio=this.stateForm.state},handleDet:function(n,e){this.detFormVisible=!0,this.detForm=o()({},e)},handleCurrentChange:function(n){this.page=n,this.getList()},getUsers:function(){this.page=1,this.getList()},getList:function(){var n=this,e={pageNum:this.page,storeName:this.filters.storeName};this.listLoading=!0,Object(l._37)(e).then(function(e){e.data,e.message;if(200==e.status){n.total=e.data.totalCount,n.users=e.data.storeList;for(var t,s=0;s<n.users.length;s++)t=n.users[s],"Y"==t.state?t.state=!0:t.state=!1}n.listLoading=!1})},handleReset:function(n,e){var t=this;this.$prompt("请输入新密码","提示",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/\S/,inputErrorMessage:"密码格式不正确",inputValue:"123456"}).then(function(n){var s=n.value,r={password:i.a.MD5(s+e.saccount).toString(i.a.enc.Hex),sid:e.id};Object(l._74)(r).then(function(n){var e=t,s=n.status,r=n.message;200==s?t.$notify({title:"成功",message:r,type:"success"}):301==s||302==s?(sessionStorage.removeItem("user"),e.$router.push("/login"),t.$notify.error({title:"错误",message:r})):t.$notify.error({title:"错误",message:r})})}).catch(function(){t.$message({type:"info",message:"取消输入"})})},handleEdit:function(n,e){this.editFormVisible=!0,this.editForm=o()({},e);var t=e.shopHours.slice(0,5);this.startTime=t;var s=e.shopHours.slice(6,11);this.endTime=s},handleAdd:function(){console.log("123"),this.addFormVisible=!0},editSubmit:function(){var n=this;this.$refs.editForm.validate(function(e){e&&n.$confirm("确认提交吗？","提示",{}).then(function(){n.editLoading=!0;var e={id:n.editForm.id,storeName:n.editForm.storeName,address:n.editForm.address,telephone:n.editForm.telephone,shopHours:n.startTime+"-"+n.endTime};Object(l._73)(e).then(function(e){n.editLoading=!1;var t=e.status,s=e.message;200==t?n.$notify({title:"成功",message:s,type:"success"}):n.$notify.error({title:"错误",message:s}),n.$refs.editForm.resetFields(),n.editFormVisible=!1,n.getUsers()})})})},addSubmit:function(){var n=this;this.$refs.addForm.validate(function(e){e&&n.$confirm("确认提交吗？","提示",{}).then(function(){n.addLoading=!0;var e={storeName:n.addForm.storeName,address:n.addForm.address,telephone:n.addForm.telephone,shopHours:n.addForm.startTime+"-"+n.addForm.endTime};Object(l.g)(e).then(function(e){n.addLoading=!1,n.$notify({title:"成功",message:"提交成功",type:"success"}),n.$refs.addForm.resetFields(),n.addFormVisible=!1,n.getUsers()})})})}},mounted:function(){this.getUsers()}},m=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("section",[t("el-row",[t("el-form",{ref:"filters",attrs:{inline:!0,model:n.filters}},[t("el-form-item",{attrs:{prop:"storeName"}},[t("el-input",{attrs:{placeholder:"请输入门店名称"},model:{value:n.filters.storeName,callback:function(e){n.$set(n.filters,"storeName",e)},expression:"filters.storeName"}})],1),n._v(" "),t("el-form-item",{staticStyle:{float:"right"}},[t("el-button",{attrs:{type:"primary",size:"medium",round:""},on:{click:n.getUsers}},[n._v("查询")]),n._v(" "),t("el-button",{attrs:{type:"primary",size:"medium",round:""},on:{click:n.handleAdd}},[n._v("新增")])],1)],1)],1),n._v(" "),t("div",{directives:[{name:"loading",rawName:"v-loading",value:n.listLoading,expression:"listLoading"}]},[t("el-table",{staticStyle:{width:"100%"},attrs:{data:n.users,border:"","highlight-current-row":""}},[t("el-table-column",{attrs:{prop:"storeName",label:"门店名称","min-width":"120"}}),n._v(" "),t("el-table-column",{attrs:{prop:"address",label:"门店地址","min-width":"180"}}),n._v(" "),t("el-table-column",{attrs:{prop:"telephone",label:"联系电话","min-width":"120"}}),n._v(" "),t("el-table-column",{attrs:{prop:"saccount",label:"登录帐号","min-width":"120"}}),n._v(" "),t("el-table-column",{attrs:{label:"门店状态"},scopedSlots:n._u([{key:"default",fn:function(e){return[t("el-switch",{attrs:{name:"value"},on:{change:function(t){n.test(e.$index,e.row)}},model:{value:e.row.state,callback:function(t){n.$set(e.row,"state",t)},expression:"scope.row.state"}})]}}])}),n._v(" "),t("el-table-column",{attrs:{label:"操作",width:"250"},scopedSlots:n._u([{key:"default",fn:function(e){return[t("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(t){n.handleReset(e.$index,e.row)}}},[n._v("密码重置")]),n._v(" "),t("el-button",{attrs:{type:"warning",size:"mini"},on:{click:function(t){n.handleEdit(e.$index,e.row)}}},[n._v("修改")]),n._v(" "),t("el-button",{attrs:{type:"info",size:"mini"},on:{click:function(t){n.handleDet(e.$index,e.row)}}},[n._v("详情")])]}}])})],1)],1),n._v(" "),t("el-row",[t("el-pagination",{staticStyle:{"text-align":"center",background:"#fff",padding:"15px"},attrs:{layout:"prev, pager, next","current-page":n.page,"page-size":20,total:n.total,background:""},on:{"current-change":n.handleCurrentChange}})],1),n._v(" "),t("el-dialog",{attrs:{title:"门店详情",visible:n.detFormVisible,"close-on-click-modal":!1,width:"600px"},on:{"update:visible":function(e){n.detFormVisible=e}}},[t("el-form",{ref:"detForm",attrs:{model:n.detForm,"label-width":"120px","label-position":"left"}},[t("el-form-item",{attrs:{label:"门店名称："}},[t("span",[n._v(n._s(n.detForm.storeName))])]),n._v(" "),t("el-form-item",{attrs:{label:"电话："}},[t("span",[n._v(n._s(n.detForm.telephone))])]),n._v(" "),t("el-form-item",{attrs:{label:"详细地址："}},[t("span",[n._v(n._s(n.detForm.address))])]),n._v(" "),t("el-form-item",{attrs:{label:"门店编号："}},[t("span",[n._v(n._s(n.detForm.storeName))])]),n._v(" "),t("el-form-item",{attrs:{label:"营业时间："}},[t("span",[n._v(n._s(n.detForm.shopHours))])])],1)],1),n._v(" "),t("el-dialog",{attrs:{title:"修改信息",visible:n.editFormVisible,"close-on-click-modal":!1,width:"600px"},on:{"update:visible":function(e){n.editFormVisible=e}}},[t("el-form",{ref:"editForm",attrs:{model:n.editForm,rules:n.editFormRules}},[t("el-form-item",{attrs:{label:"门店名称",prop:"storeName"}},[t("el-input",{attrs:{"auto-complete":"off"},model:{value:n.editForm.storeName,callback:function(e){n.$set(n.editForm,"storeName",e)},expression:"editForm.storeName"}})],1),n._v(" "),t("el-form-item",{attrs:{label:"门店地址",prop:"address"}},[t("el-input",{attrs:{"auto-complete":"off"},model:{value:n.editForm.address,callback:function(e){n.$set(n.editForm,"address",e)},expression:"editForm.address"}})],1),n._v(" "),t("el-form-item",{attrs:{label:"联系电话",prop:"telephone"}},[t("el-input",{model:{value:n.editForm.telephone,callback:function(e){n.$set(n.editForm,"telephone",e)},expression:"editForm.telephone"}})],1),n._v(" "),t("el-form-item",{attrs:{label:"营业时间",prop:"shopHours"}},[[t("el-time-select",{attrs:{placeholder:"起始时间","picker-options":{start:"08:30",step:"00:15",end:"18:30"}},model:{value:n.startTime,callback:function(e){n.startTime=e},expression:"startTime"}})]],2),n._v(" "),t("el-form-item",{staticStyle:{"margin-left":"68px"},attrs:{label:"",prop:"shopHours"}},[[t("el-time-select",{attrs:{placeholder:"结束时间","picker-options":{start:"00:00",step:"00:15",end:"24:00"}},model:{value:n.endTime,callback:function(e){n.endTime=e},expression:"endTime"}})]],2)],1),n._v(" "),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{nativeOn:{click:function(e){n.editFormVisible=!1}}},[n._v("取消")]),n._v(" "),t("el-button",{attrs:{type:"primary",loading:n.editLoading},nativeOn:{click:function(e){return n.editSubmit(e)}}},[n._v("提交")])],1)],1),n._v(" "),t("el-dialog",{attrs:{title:"新增门店",visible:n.addFormVisible,"close-on-click-modal":!1,width:"600px"},on:{"update:visible":function(e){n.addFormVisible=e}}},[t("el-form",{ref:"addForm",attrs:{model:n.addForm,rules:n.addFormRules}},[t("el-form-item",{attrs:{label:"门店名称",prop:"storeName"}},[t("el-input",{attrs:{"auto-complete":"off"},model:{value:n.addForm.storeName,callback:function(e){n.$set(n.addForm,"storeName",e)},expression:"addForm.storeName"}})],1),n._v(" "),t("el-form-item",{attrs:{label:"详细地址",prop:"address"}},[t("el-input",{attrs:{"auto-complete":"off"},model:{value:n.addForm.address,callback:function(e){n.$set(n.addForm,"address",e)},expression:"addForm.address"}})],1),n._v(" "),t("el-form-item",{attrs:{label:"电话",prop:"telephone"}},[t("el-input",{attrs:{"auto-complete":"off"},model:{value:n.addForm.telephone,callback:function(e){n.$set(n.addForm,"telephone",e)},expression:"addForm.telephone"}})],1),n._v(" "),t("el-form-item",{attrs:{label:"营业时间"}},[[t("el-time-select",{attrs:{placeholder:"起始时间","picker-options":{start:"00:00",step:"00:15",end:"24:00"}},model:{value:n.addForm.startTime,callback:function(e){n.$set(n.addForm,"startTime",e)},expression:"addForm.startTime"}})]],2),n._v(" "),t("el-form-item",{staticStyle:{"margin-left":"68px"},attrs:{label:""}},[[t("el-time-select",{attrs:{placeholder:"结束时间","picker-options":{start:"00:00",step:"00:15",end:"24:00",minTime:n.addForm.startTime}},model:{value:n.addForm.endTime,callback:function(e){n.$set(n.addForm,"endTime",e)},expression:"addForm.endTime"}})]],2)],1),n._v(" "),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{nativeOn:{click:function(e){n.addFormVisible=!1}}},[n._v("取消")]),n._v(" "),t("el-button",{attrs:{type:"primary",loading:n.addLoading},nativeOn:{click:function(e){return n.addSubmit(e)}}},[n._v("提交")])],1)],1)],1)},c=[],u={render:m,staticRenderFns:c},p=u,f=t("VU/8"),g=s,h=f(d,p,!1,g,"data-v-5ad87e19",null);e.default=h.exports},HNP1:function(n,e,t){e=n.exports=t("FZ+f")(!1),e.push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},soFt:function(n,e,t){var s=t("HNP1");"string"==typeof s&&(s=[[n.i,s,""]]),s.locals&&(n.exports=s.locals);t("rjj0")("95e8e36c",s,!0,{})}});