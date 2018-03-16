<style scoped lang="scss">
.navmenu{
  background-color: #DCDFE6
}
.navmenu_vertical{
  height: 100%;
  background-color: #DCDFE6;
  float: left;
}
.el_menu_vertical{
  margin-top: -35px;
}
.el_menu_vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  margin-top: -35px;
}
.template_tabs{
  float: right
}
.top_logo{
  width: 180px;
  float: left;
}
.top_logo img{
  width: 30%;
  margin-top: 17px;
  float: left;
}
.top_logo span{
  font-size: 18px;
  font-weight: bolder;
  color: #284890;
  line-height: 60px;
}
.menu_icon{
  line-height: 32px;
}
.menu_icon span i{
  font-size: 24px;
}
.route_icon{
  color: #fff;
}
.el_menu_horizontal{
  border: none;
  float: right;
}
</style>
<template>
  <div>
    <el-container style="height:100%">
      <el-header style="background: #fff;height:96px;">
        <el-row>
          <el-col :span="6">
            <div class="top_logo">
              <img src="../assets/images/logo4.png" /> 
              <span>万 鼎 科 技</span>
            </div>
            <el-button type="text" @click="isCollapse=!isCollapse" class="menu_icon">
              <i class="iconfont icon-caidan"></i>
            </el-button>
          </el-col>
          <el-col :span="9">
            <div class="navmenu_horizontal">
              <el-menu default-active="1" class="el_menu_horizontal" mode="horizontal" @select="handleSelect" background-color="#fff">
                <el-menu-item index="1">首页</el-menu-item>
                <el-menu-item index="2">收款明细</el-menu-item>
                <el-menu-item index="3">消息中心</el-menu-item>
                <el-menu-item index="4">帮助中心</el-menu-item>
              </el-menu>
            </div>
          </el-col>
          <el-col :span="9" style="line-height: 60px;text-align: right;">
            <span >{{sysUserName}} 您好！欢迎登录商户平台 </span>
            <el-dropdown split-button size="small" type="danger" @click="logout">
              退出登录
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handleEdit">修改密码</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- <el-button type="info" class="el-favorites" @click="handleEdit"> 修改密码</el-button>
            <el-button type="danger" class="el-help" @click="logout">退出登录</el-button> -->
            <!--修改密码-->
            <el-dialog :visible.sync="editFormVisible" :close-on-click-modal="false" width="600px">
              <span style="font-size:10px;color:#20a0ff;float:left;line-height: 1;width: 100%;">提示：密码修改成功后需重新登录</span>
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item label="旧密码" prop="usedPass">
                  <el-input type="password" v-model="ruleForm.usedPass"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="pass">
                  <el-input type="password" v-model="ruleForm.pass"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="checkPass">
                  <el-input type="password" v-model="ruleForm.checkPass"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click="editFormVisible=false">取消</el-button>
                  <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </el-col>
        </el-row>
        <TagsView v-bind:style="{ marginLeft: isCollapseSty }"></TagsView>
      </el-header>
      <el-container style="border: 1px solid #eee;">
            <el-menu :default-active="activeMenu" class="el_menu_vertical" unique-opened :collapse="isCollapse" router background-color="#545c64" text-color="#fff" active-text-color="#409EFF">
              <template v-for="(route, index) in menus">
                <template v-if="route.children">
                  <el-submenu :key="index" :index="route.name">
                    <template slot="title">
                      <i class="iconfont route_icon" v-bind:class="[route.meta.icon]"></i>
                      <span slot="title">{{route.meta.name || route.name}}</span>
                    </template>
                    <el-menu-item v-for="(cRoute, cIndex) in route.children" :key="cIndex" :index="cRoute.name" :route="cRoute" v-if="!cRoute.meta.hidden">
                      {{cRoute.meta.name || cRoute.name}}
                    </el-menu-item>
                  </el-submenu>
                </template>
                <template v-else>
                  <el-menu-item :key="index" :route="route" :index="route.name"><i class="iconfont route_icon" v-bind:class="[route.meta.icon]"></i><span slot="title">{{route.meta.name || route.name}}</span></el-menu-item>
                </template>
              </template>
            </el-menu>
        <el-main>
          <template>
            <transition name="fade" mode="out-in">
              <keep-alive :include="cachedViews">
                <ErrorPage v-if="accessPerMission"></ErrorPage>
                <router-view v-else id="main"></router-view>
              </keep-alive>
            </transition>
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { TagsView, ErrorPage } from '../components'
import instance from "../api";
import CryptoJS from "crypto-js";
import {
  modifyPassword,
  batchRemoveUser
} from '../api/shop';

export default {
  components: {
    TagsView,
    ErrorPage
  },
  data() {
    //  修改密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error('旧密码不能为空'));
      } else {
        callback()
      }
    };
    var validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      }else if (!/^[a-zA-Z0-9]{6,18}$/.test(value)) {
        callback(new Error('请输入不含汉字和空格的6到18位密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      user: {},
      menus: [],
      isCollapse:false,
      sysUserName: '',
      accessPerMission:false,
      editFormVisible: false, //修改密码弹窗是否显示
      editLoading: false,
      logining:false,
      isCollapseSty:'182px',
      //修改密码弹窗数据
      ruleForm: {
        pass: '',
        checkPass: '',
        usedPass: ''
      },
      rules: {
        usedPass: [{
          required: true,
          validator: validatePass,
          trigger: 'blur'
        },
        {
					min: 6,
					max: 18,
					message: '密码为6到18位数字或字母',
					trigger: 'blur'
				}
        ],
        pass: [{
            required: true,
            validator: validatePass1,
            trigger: 'blur'
          },
          {
  					min: 6,
  					max: 18,
  					message: '密码为6到18位数字或字母',
  					trigger: 'blur'
  				}
        ],
        checkPass: [{
            required: true,
            validator: validatePass2,
            trigger: 'blur'
          },
          {
  					min: 6,
  					max: 18,
  					message: '密码为6到18位数字或字母',
  					trigger: 'blur'
  				}
        ]
      }
    };
  },
  computed: {
    activeMenu: function(){
      return this.$route.name
    },
    breadcrumbs: function(){
      return (this.$route && this.$route.matched) || []
    },
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    // accessPerMission() {
    //   return this.$store.state.perMission.accessPerMission
    // }
  },
  watch: {
    $route() {
      this.isTab()
    },
    isCollapse(curVal,oldVal){
      if (curVal) {
        this.isCollapseSty='45px'
      } else {
        this.isCollapseSty='182px'
      }
      
    }
  },
  methods: {
    isTab(){
      instance.post(`/pay1/syscore/checkPermission`, {
        code:this.$route.meta.code
      }).then((res) => {        
        if (res.data.status===200) {
          this.accessPerMission=false
        }else{
          this.accessPerMission=true
        }
      })
    },
        //修改密码提交按钮
    submitForm() {
      let name = sessionStorage.getItem('name');
      if (name) {
        name = JSON.parse(name);
        this.maccount = name || '';
      }
      var _this = this;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.logining = false;
          var oldPwd = CryptoJS.MD5(this.ruleForm.usedPass + this.maccount).toString(CryptoJS.enc.Hex);
          var mpwd = CryptoJS.MD5(this.ruleForm.pass + this.maccount).toString(CryptoJS.enc.Hex);
          var mpwd2 = CryptoJS.MD5(this.ruleForm.checkPass + this.maccount).toString(CryptoJS.enc.Hex);
          var modifypass = {
            oldPwd,
            mpwd,
            mpwd2
          };
          //console.log(modifypass);
          modifyPassword(modifypass).then(res => {
            let {
              status,
              message
            } = res;
            if (status == 200) {
              this.$notify({
			          title: '成功',
			          message: message,
			          type: 'success'
			        });
            _this.$emit("logout");
            } else if (status == 301) {
              this.$notify({
			          title: '警告',
			          message: message,
			          type: 'warning'
			        });
              _this.$emit("logout");
            }else {
              this.$notify.error({
			          title: '错误',
			          message: message
			        });
            }
          });
        } else {
          return false;
        }
      });
    },
    //修改密码弹框是否弹出
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    //退出登录
    logout: function() {
      this.$confirm("确定退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      }).then(() => {
        this.$emit("logout");
      }).catch(() => {});
    },
    //切换顶部导航
    handleSelect(change){
      console.log(typeof change);
      if (change==='1') {
        this.$router.push({ path: "/" });
      } else if(change==='2'){
        this.$router.push({ path: "index/table" });
      }
    },
  },
  created: function() {
    let user = this.$parent.userData;
    if (user) {
      this.user = user;
    } else {
      this.$router.push({ path: "/login" });
    }
    let menus = this.$parent.menuData;
    if (menus) {
      this.menus = menus;
    }
  },
  mounted () {
    this.isTab()
        //用户名
    let user = sessionStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      this.sysUserName = user || '';
      //				this.sysUserAvatar = user.avatar || '';
    }
  }
};
</script>
