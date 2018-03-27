<style scoped lang="scss">
  .top_logo {
    width: 180px;
    float: left;
  }

  .top_logo img {
    width: 30%;
    margin-top: 17px;
    float: left;
  }

  .top_logo span {
    font-size: 18px;
    font-weight: bolder;
    color: #284890;
    line-height: 60px;
  }

  .menu_icon {
    line-height: 32px;
  }

  .menu_icon span i {
    font-size: 24px;
  }

</style>
<template>
  <div>
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
          <el-menu :default-active="activeIndex" class="el_menu_horizontal" mode="horizontal" @select="handleSelect" background-color="#fff">
            <el-menu-item index="1">首页</el-menu-item>
            <el-menu-item index="2">收款明细</el-menu-item>
            <el-menu-item index="3">消息中心</el-menu-item>
            <el-menu-item index="4">帮助中心</el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="9" style="line-height: 60px;text-align: right;">
        <span>{{sysUserName}} 您好！欢迎登录商户平台 </span>
        <el-dropdown split-button size="small" type="danger" @click="logout">
          退出登录
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleEdit">修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <!--修改密码-->
    <el-dialog :visible.sync="editFormVisible" :close-on-click-modal="false" width="400px">
      <el-alert title="提示：密码修改成功后需重新登录" type="warning" center show-icon :closable="false"></el-alert>
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
  </div>
</template>
<script>
  import CryptoJS from "crypto-js";
  import errGif from '../assets/images/401.gif'
  import {
  batchRemoveUser,
  modifyPassword
} from '../api/shop';
  export default {
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
        } else if (!/^[a-zA-Z0-9]{6,18}$/.test(value)) {
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
        sysUserName: '',
        editFormVisible: false, //修改密码弹窗是否显示
        editLoading: false,
        logining: false,
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
      }
    },
    computed: {
      activeIndex() {
        return this.$store.state.perMission.activeIndex
      }
    },
    methods: {
      //修改密码弹框是否弹出
      handleEdit: function (index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
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
            modifyPassword(modifypass).then(res => {  
              let {
                status,
                message
              } = res;
              if (status == 200) {
                this.$message({
                  message: message,
                  type: 'success'
                });
                //清除菜单权限
                this.$root.hashMenus = {};
                //回到登录页
                this.$router.replace({path: '/login'});
                //清除动态标签
                this.$store.dispatch('delAllViews')
              }
            });
          } else {
            return false;
          }
        });
      },
      //退出登录
      logout: function () {
        this.$confirm("确定退出?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info"
        }).then(() => {
          //清除菜单权限
          this.$root.hashMenus = {};
          //回到登录页
          this.$router.replace({path: '/login'});
          //清除动态标签
          this.$store.dispatch('delAllViews')
          batchRemoveUser()
        }).catch(() => {
          this.$message('退出失败');
        });
      },
      //切换顶部导航
      handleSelect(change) {
        const loading = this.$loading({
          lock: true,
          text: '请稍候,正在加载',
          background: '#fff'
        });
        setTimeout(() => {
          loading.close();
        }, 500);
        if (change === '1') {
          this.$store.dispatch('top_nav', '1')
          this.$router.push({
            path: "/home"
          });
        } else if (change === '2') {
          this.$store.dispatch('top_nav', '2')
          this.$router.push({
            path: "/index/table"
          });
        }
      },
    },
    mounted() {
      //用户名
      let user = sessionStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        this.sysUserName = user || '';
      }
    }
  }

</script>
