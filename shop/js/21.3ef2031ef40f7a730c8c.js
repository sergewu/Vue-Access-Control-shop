webpackJsonp([21],{bMmF:function(i,e,t){var a=t("rU+s");"string"==typeof a&&(a=[[i.i,a,""]]),a.locals&&(i.exports=a.locals);t("rjj0")("13a7937a",a,!0,{})},hO3n:function(i,e,t){"use strict";function a(i){t("bMmF")}Object.defineProperty(e,"__esModule",{value:!0});var r=t("yt7g"),l=t("S49b"),o={data:function(){return{uploadImage:l._79,minifrom:{appid:"",appname:"",imageCarouselUrl_01:"",imageCarouselUrl_02:"",imageCarouselUrl_03:"",imageCarouselUrl_04:"",imageCarouselUrl_05:"",input_01:"",input_02:"",input_03:"",input_04:"",input_05:""},addLoading:!1,listLoading:!1,users:[],page:1,total:0,carouselDialogVisible:!1,submitType:!0,dialogTitle:"新增小程序轮播图"}},methods:{formatter_time:function(i,e){return r.f.format(new Date(i.gmt_modified),"yyyy-MM-dd hh:mm:ss")},handleEdit:function(i,e){this.carouselDialogVisible=!0,this.submitType=!1,this.dialogTitle="修改小程序轮播图",this.minifrom.id=e.id,this.minifrom.appid=e.appid,this.minifrom.appname=e.appname,this.minifrom.imageCarouselUrl_01=e.image1,this.minifrom.imageCarouselUrl_02=e.image2,this.minifrom.imageCarouselUrl_03=e.image3,this.minifrom.imageCarouselUrl_04=e.image4,this.minifrom.imageCarouselUrl_05=e.image5,this.minifrom.input_01=e.imageUrl1,this.minifrom.input_02=e.imageUrl2,this.minifrom.input_03=e.imageUrl3,this.minifrom.input_04=e.imageUrl4,this.minifrom.input_05=e.imageUrl5},handleDelete:function(i,e){var t=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var i={id:e.id};Object(l.s)(i).then(function(i){200===i.status&&(t.getUsers(),t.$message({message:i.message,type:"success"}))})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},miniinfoEdit:function(i){var e=this;this.$refs[i].validate(function(t){if(!t)return console.log("error submit!!"),!1;var a={id:e.minifrom.id,appid:e.minifrom.appid,appname:e.minifrom.appname,image1:e.minifrom.imageCarouselUrl_01,image2:e.minifrom.imageCarouselUrl_02,image3:e.minifrom.imageCarouselUrl_03,image4:e.minifrom.imageCarouselUrl_04,image5:e.minifrom.imageCarouselUrl_05,imageUrl1:e.minifrom.input_01,imageUrl2:e.minifrom.input_02,imageUrl3:e.minifrom.input_03,imageUrl4:e.minifrom.input_04,imageUrl5:e.minifrom.input_05};Object(l._61)(a).then(function(t){200===t.status&&(e.carouselDialogVisible=!1,e.$refs[i].resetFields(),e.getUsers(),e.$message({message:t.message,type:"success"}))})})},miniinfoSubmission:function(i){var e=this;this.$refs[i].validate(function(t){if(!t)return console.log("error submit!!"),!1;var a={appid:e.minifrom.appid,appname:e.minifrom.appname,image1:e.minifrom.imageCarouselUrl_01,image2:e.minifrom.imageCarouselUrl_02,image3:e.minifrom.imageCarouselUrl_03,image4:e.minifrom.imageCarouselUrl_04,image5:e.minifrom.imageCarouselUrl_05,imageUrl1:e.minifrom.input_01,imageUrl2:e.minifrom.input_02,imageUrl3:e.minifrom.input_03,imageUrl4:e.minifrom.input_04,imageUrl5:e.minifrom.input_05};Object(l.h)(a).then(function(t){200===t.status&&(e.carouselDialogVisible=!1,e.$refs[i].resetFields(),e.getUsers(),e.$message({message:t.message,type:"success"}))})})},handleCurrentChange:function(i){this.page=i,this.getList()},getUsers:function(){this.page=1,this.getList()},getList:function(){var i=this,e={page:this.page};this.listLoading=!0,Object(l._40)(e).then(function(e){i.listLoading=!1,200===e.status&&(i.users=e.data.miniInfoList,i.total=e.data.totalCount)})},addCarousel:function(){this.carouselDialogVisible=!0,this.submitType=!0,this.dialogTitle="新增小程序轮播图",this.minifrom={appid:"",appname:"",imageCarouselUrl_01:"",imageCarouselUrl_02:"",imageCarouselUrl_03:"",imageCarouselUrl_04:"",imageCarouselUrl_05:"",input_01:"",input_02:"",input_03:"",input_04:"",input_05:""}},handleAvatarSuccess_01:function(i,e){this.minifrom.imageCarouselUrl_01=i.data.locationPath},handleAvatarSuccess_02:function(i,e){this.minifrom.imageCarouselUrl_02=i.data.locationPath},handleAvatarSuccess_03:function(i,e){this.minifrom.imageCarouselUrl_03=i.data.locationPath},handleAvatarSuccess_04:function(i,e){this.minifrom.imageCarouselUrl_04=i.data.locationPath},handleAvatarSuccess_05:function(i,e){this.minifrom.imageCarouselUrl_05=i.data.locationPath},deleteImg01:function(){this.minifrom.imageCarouselUrl_01=""},deleteImg02:function(){this.minifrom.imageCarouselUrl_02=""},deleteImg03:function(){this.minifrom.imageCarouselUrl_03=""},deleteImg04:function(){this.minifrom.imageCarouselUrl_04=""},deleteImg05:function(){this.minifrom.imageCarouselUrl_05=""},beforeAvatarUpload:function(i){var e="image/jpeg"===i.type,t=i.size/1024/1024<2;return e||this.$message.error("上传头像图片只能是 JPG 格式!"),t||this.$message.error("上传头像图片大小不能超过 2MB!"),e&&t}},mounted:function(){this.getUsers()}},s=function(){var i=this,e=i.$createElement,t=i._self._c||e;return t("section",[t("el-row",[t("el-form",{attrs:{inline:!0,model:i.filters}},[t("el-form-item",{staticStyle:{float:"right"}},[t("el-button",{attrs:{type:"primary",size:"medium",round:""},on:{click:i.getUsers}},[i._v("刷新")]),i._v(" "),t("el-button",{attrs:{type:"primary",size:"medium",round:""},on:{click:i.addCarousel}},[i._v("新增轮播图")])],1)],1)],1),i._v(" "),t("div",{directives:[{name:"loading",rawName:"v-loading",value:i.listLoading,expression:"listLoading"}]},[t("el-table",{staticStyle:{width:"100%"},attrs:{data:i.users,border:"","row-key":"id"}},[t("el-table-column",{attrs:{prop:"appid",label:"APPID（小程序ID）",width:"180"}}),i._v(" "),t("el-table-column",{attrs:{prop:"appname",label:"小程序名称"}}),i._v(" "),t("el-table-column",{attrs:{prop:"gmt_modified",label:"创建时间",formatter:i.formatter_time}}),i._v(" "),t("el-table-column",{attrs:{align:"center",label:"操作",width:"165"},scopedSlots:i._u([{key:"default",fn:function(e){return[t("el-button",{attrs:{size:"mini",type:"warning"},on:{click:function(t){i.handleEdit(e.$index,e.row)}}},[i._v("修改")]),i._v(" "),t("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(t){i.handleDelete(e.$index,e.row)}}},[i._v("删除")])]}}])})],1)],1),i._v(" "),t("el-row",[t("el-pagination",{staticStyle:{"text-align":"center",background:"#fff",padding:"15px"},attrs:{layout:"prev, pager, next","current-page":i.page,"page-size":20,total:i.total,background:""},on:{"current-change":i.handleCurrentChange}})],1),i._v(" "),t("el-dialog",{attrs:{title:i.dialogTitle,visible:i.carouselDialogVisible,width:"420px"},on:{"update:visible":function(e){i.carouselDialogVisible=e}}},[t("el-form",{ref:"minifrom",attrs:{inline:!0,model:i.minifrom,"label-position":"top"}},[t("el-form-item",{attrs:{label:"APPID（小程序ID）",prop:"appid",rules:[{required:!0,message:"请输入APPID",trigger:"blur"}]}},[t("el-input",{attrs:{placeholder:"请输入APPID"},model:{value:i.minifrom.appid,callback:function(e){i.$set(i.minifrom,"appid","string"==typeof e?e.trim():e)},expression:"minifrom.appid"}})],1),i._v(" "),t("el-form-item",{attrs:{label:"小程序名称",prop:"appname",rules:[{required:!0,message:"请输入小程序名称",trigger:"blur"}]}},[t("el-input",{attrs:{placeholder:"请输入小程序名称"},model:{value:i.minifrom.appname,callback:function(e){i.$set(i.minifrom,"appname","string"==typeof e?e.trim():e)},expression:"minifrom.appname"}})],1),i._v(" "),t("el-form-item",{attrs:{label:"轮播图",prop:"imageCarouselUrl_01",rules:[{required:!0,message:"请上传图片",trigger:"blur"}]}},[t("el-upload",{staticClass:"avatar-uploader",attrs:{action:i.uploadImage,"show-file-list":!1,"on-success":i.handleAvatarSuccess_01,"before-upload":i.beforeAvatarUpload}},[i.minifrom.imageCarouselUrl_01?t("img",{staticClass:"avatar",attrs:{src:i.minifrom.imageCarouselUrl_01}}):t("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),i._v(" "),t("el-form-item",{staticStyle:{width:"100%"},attrs:{prop:"input_01",rules:[{type:"url",message:"请填写正确的URL",trigger:"blur"}]}},[t("el-input",{staticStyle:{width:"240px"},attrs:{placeholder:"请输入链接地址"},model:{value:i.minifrom.input_01,callback:function(e){i.$set(i.minifrom,"input_01",e)},expression:"minifrom.input_01"}}),i._v(" "),t("el-button",{staticStyle:{float:"right"},attrs:{type:"text"},on:{click:i.deleteImg01}},[i._v("删除图片")])],1),i._v(" "),t("el-form-item",[t("el-upload",{staticClass:"avatar-uploader",attrs:{action:i.uploadImage,"show-file-list":!1,"on-success":i.handleAvatarSuccess_02,"before-upload":i.beforeAvatarUpload}},[i.minifrom.imageCarouselUrl_02?t("img",{staticClass:"avatar",attrs:{src:i.minifrom.imageCarouselUrl_02}}):t("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),i._v(" "),t("el-form-item",{staticStyle:{width:"100%"},attrs:{prop:"input_02",rules:[{type:"url",message:"请填写正确的URL",trigger:"blur"}]}},[t("el-input",{staticStyle:{width:"240px"},attrs:{placeholder:"请输入链接地址"},model:{value:i.minifrom.input_02,callback:function(e){i.$set(i.minifrom,"input_02",e)},expression:"minifrom.input_02"}}),i._v(" "),t("el-button",{staticStyle:{float:"right"},attrs:{type:"text"},on:{click:i.deleteImg02}},[i._v("删除图片")])],1),i._v(" "),t("el-form-item",[t("el-upload",{staticClass:"avatar-uploader",attrs:{action:i.uploadImage,"show-file-list":!1,"on-success":i.handleAvatarSuccess_03,"before-upload":i.beforeAvatarUpload}},[i.minifrom.imageCarouselUrl_03?t("img",{staticClass:"avatar",attrs:{src:i.minifrom.imageCarouselUrl_03}}):t("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),i._v(" "),t("el-form-item",{staticStyle:{width:"100%"},attrs:{prop:"input_03",rules:[{type:"url",message:"请填写正确的URL",trigger:"blur"}]}},[t("el-input",{staticStyle:{width:"240px"},attrs:{placeholder:"请输入链接地址"},model:{value:i.minifrom.input_03,callback:function(e){i.$set(i.minifrom,"input_03",e)},expression:"minifrom.input_03"}}),i._v(" "),t("el-button",{staticStyle:{float:"right"},attrs:{type:"text"},on:{click:i.deleteImg03}},[i._v("删除图片")])],1),i._v(" "),t("el-form-item",[t("el-upload",{staticClass:"avatar-uploader",attrs:{action:i.uploadImage,"show-file-list":!1,"on-success":i.handleAvatarSuccess_04,"before-upload":i.beforeAvatarUpload}},[i.minifrom.imageCarouselUrl_04?t("img",{staticClass:"avatar",attrs:{src:i.minifrom.imageCarouselUrl_04}}):t("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),i._v(" "),t("el-form-item",{staticStyle:{width:"100%"},attrs:{prop:"input_04",rules:[{type:"url",message:"请填写正确的URL",trigger:"blur"}]}},[t("el-input",{staticStyle:{width:"240px"},attrs:{placeholder:"请输入链接地址"},model:{value:i.minifrom.input_04,callback:function(e){i.$set(i.minifrom,"input_04",e)},expression:"minifrom.input_04"}}),i._v(" "),t("el-button",{staticStyle:{float:"right"},attrs:{type:"text"},on:{click:i.deleteImg04}},[i._v("删除图片")])],1),i._v(" "),t("el-form-item",[t("el-upload",{staticClass:"avatar-uploader",attrs:{action:i.uploadImage,"show-file-list":!1,"on-success":i.handleAvatarSuccess_05,"before-upload":i.beforeAvatarUpload}},[i.minifrom.imageCarouselUrl_05?t("img",{staticClass:"avatar",attrs:{src:i.minifrom.imageCarouselUrl_05}}):t("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),i._v(" "),t("el-form-item",{staticStyle:{width:"100%"},attrs:{prop:"input_05",rules:[{type:"url",message:"请填写正确的URL",trigger:"blur"}]}},[t("el-input",{staticStyle:{width:"240px"},attrs:{placeholder:"请输入链接地址"},model:{value:i.minifrom.input_05,callback:function(e){i.$set(i.minifrom,"input_05",e)},expression:"minifrom.input_05"}}),i._v(" "),t("el-button",{staticStyle:{float:"right"},attrs:{type:"text"},on:{click:i.deleteImg05}},[i._v("删除图片")])],1)],1),i._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(e){i.carouselDialogVisible=!1}}},[i._v("取 消")]),i._v(" "),i.submitType?t("el-button",{attrs:{type:"primary"},on:{click:function(e){i.miniinfoSubmission("minifrom")}}},[i._v("确 定")]):t("el-button",{attrs:{type:"primary"},on:{click:function(e){i.miniinfoEdit("minifrom")}}},[i._v("修 改")])],1)],1)],1)},n=[],m={render:s,staticRenderFns:n},u=m,p=t("VU/8"),c=a,f=p(o,u,!1,c,"data-v-6ac631c4",null);e.default=f.exports},"rU+s":function(i,e,t){e=i.exports=t("FZ+f")(!1),e.push([i.i,"\n.avatar-uploader[data-v-6ac631c4] {\n  border: 1px dashed #d9d9d9;\n  cursor: pointer;\n  position: relative;\n  overflow: hidden;\n  width: 375px;\n  height: 150px;\n  margin: 0 auto;\n}\n.avatar-uploader[data-v-6ac631c4]:hover {\n  border-color: #409EFF;\n}\n.avatar-uploader-icon[data-v-6ac631c4] {\n  font-size: 28px;\n  color: #8c939d;\n  width: 375px;\n  line-height: 150px;\n  text-align: center;\n}\n.avatar[data-v-6ac631c4] {\n  width: 375px;\n  height: 150px;\n}\n\n",""])}});