<style scoped lang="scss">
  .el_menu_vertical {
    margin-top: -35px;
  }

  .el_menu_vertical:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    margin-top: -35px;
  }

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

  .el_menu_horizontal {
    border: none;
    float: right;
  }

  .grid-content {
    min-height: 36px;
    background: #fff;
    border: 1px solid #DCDFE6;
    padding: 15px;
    height: 613px;
    ;
    .grid_content_left_top {
      margin-bottom: 10px;
      border-bottom: 1px solid #DCDFE6;
      height: 100px;
      div {
        height: 80px;
        line-height: 80px;
      }
      i {
        font-size: 36px;
        color: #C0C4CC
      }
      img {
        width: 80px;
      }
    }
    .grid_content_left_main {
      margin: 35px 0;
      div {
        height: 60px;
        text-align: center;
        span {
          color: #909399;
        }
      }
      .grid_line {
        border-left: solid 1px #DCDFE6;
        // border-right: solid 1px #DCDFE6;
      }
    }
    .grid_content_right_top {
      p {
        color: #909399;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .grid_content_right_bottom {
      a {
        color: #333;
      }
      // margin-top: 55px;
      h3 {
        border-bottom: 1px solid #DCDFE6;
        padding-bottom: 15px;
        i {
          width: 10px;
          height: 20px;
          display: block;
          background-color: #409EFF;
          float: left;
          margin: 2px 10px 0 0;
        }
      }
      div {
        line-height: 2.8;
        font-size: 16px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        border-bottom: 1px #DCDFE6 dashed;
      }
      .grid_content_right_bottom_gengduo{
        border: none;
        text-align: right;
      }
    }

  }
  .element_footer{
    font-size: 14px;
    text-align: center;
    line-height: 60px;
  }

</style>
<template>
  <div>
    <el-container style="height:100%">
      <el-header style="background: #fff;">
        <el-row>
          <el-col :span="6">
            <div class="top_logo">
              <img src="../../assets/images/logo4.png" />
              <span>万 鼎 科 技</span>
            </div>
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
            <span>{{sysUserName}} 您好！欢迎登录商户平台 </span>
            <el-dropdown split-button size="small" type="danger" @click="logout">
              退出登录
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handleEdit">修改密码</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="18">
            <div class="grid-content">
              <div class="grid_content_left_top">
                <el-row>
                  <el-col :span="20">
                    <div>
                      <i class="iconfont icon-tianjia"></i>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <el-popover
                      ref="popover"
                      placement="bottom"
                      width="200"
                      trigger="hover">
                      <div>
                        <img src="../../assets/images/weixiner.jpg" alt="二维码" width="100%">
                        <p style="text-align: center;">扫描二维码加入微信群<br>及时关注微信支付通知</p>
                      </div>
                    </el-popover>
                    <div v-popover:popover>
                      <img src="../../assets/images/weixiner.jpg" alt="二维码">
                    </div>
                  </el-col>
                </el-row>
              </div>
              <el-alert
                title="本页面数据仅供经营状况参考，不代表账单信息，请勿用作对账"
                type="warning"
                :closable="false"
                show-icon>
              </el-alert>
              <div class="grid_content_left_main">
                <el-row>
                  <el-col :span="12">
                    <div>
                      <span>最近一周销售金额(元)</span>
                      <h2>{{format_amount(lineChartSummaryData.sumAmt)}}</h2>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid_line">
                      <span>最近一周销售笔数(笔)</span>
                      <h2>{{format_amount(lineChartSummaryData.sumTotal)}}</h2>
                    </div>
                  </el-col>
                  <!-- <el-col :span="8">
                    <div>
                      <span>人均金额(元)</span>
                      <h2>555,100.98</h2>
                    </div>
                  </el-col> -->
                </el-row>
              </div>
              <div class="grid_content_left_bottom">
                <LineChart :chart-data="lineChartData"></LineChart>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <!-- <div class="grid_content_right_top">
                <p>预留信息：</p>
                <p>商户简称：西安万鼎网络科技有限公司</p>
                <p>企业名称：西安万鼎网络科技有限公司</p>
                <p>企业类目：微信支付服务商</p>
              </div> -->
              <div class="grid_content_right_bottom">
                <h3>
                  <i></i>平台公告</h3>
                <div v-for="item in noticeList" :key="item.id">
                  <router-link :to="{ path: '/noticeDetails', query: { id: item.id }}" target="_blank">
                    <span>{{ item.title }}</span>
                  </router-link>
                </div>
                <div class="grid_content_right_bottom_gengduo">
                  <router-link :to="{ path: '/noticeList' }" target="_blank">
                  更多
                  </router-link>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-main>
      <el-footer class="element_footer">版权所有：西安万鼎网络科技有限公司 | ICP备 陕17002918号</el-footer>
    </el-container>
    <!--修改密码-->
    <el-dialog :visible.sync="editFormVisible" :close-on-click-modal="false" width="400px">
      <span style="font-size:10px;color:#20a0ff;line-height: 1;width: 100%;">提示：密码修改成功后需重新登录</span>
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
  import instance from "../../api";
  import CryptoJS from "crypto-js";
  import * as util from '../../assets/util'
  import {
    modifyPassword,
    batchRemoveUser,
    merDataSumShow,
    getNotices
  } from '../../api/shop';
  import {
    LineChart
  } from '../../components'

  export default {
    components: {
      LineChart
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
        noticeList:[],
        lineChartData: {},
        lineChartSummaryData: {},
        user: {},
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
      };
    },
    computed: {

    },
    watch: {

    },
    methods: {
      getUsers(){
        let para = {
          pageNum:'1',
          numPerPage: '7'
        }
        getNotices(para).then(res=>{
          this.noticeList = res.data.noticeList;
        })
      },
      //格式化金额
      format_amount(val){
        return util.number_format( val, 2, ".", "," )
      },
      //获取首页折线图数据
      lineCharIndex(){
        let myDate = Date.now();
        let para = {
          startTime: util.dateFormat((myDate - 3600 * 1000 * 24 * 7), 'yyyy/MM/dd'),
          endTime: util.dateFormat((myDate - 3600 * 1000 * 24 * 1), 'yyyy/MM/dd')
        }
        merDataSumShow(para).then(res=>{
          this.lineChartSummaryData=res.data
          let expectedData = res.data.amtList
          this.lineChartData = {expectedData}          
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
              } else {
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
      handleEdit: function (index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      },
      //退出登录
      logout: function () {
        this.$confirm("确定退出?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info"
        }).then(() => {
          this.$emit("logout");
        }).catch(() => {});
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
          this.$router.push({
            path: "/home"
          });
        } else if (change === '2') {
          this.$router.push({
            path: "/index/table"
          });
        }
      },
    },
    created: function () {
      let user = this.$parent.userData;
      if (user) {
        this.user = user;
      } else {
        this.$router.push({
          path: "/login"
        });
      }
    },
    mounted() {
      //用户名
      let user = sessionStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        this.sysUserName = user || '';
      }
      this.lineCharIndex()
      this.getUsers()
    }
  };

</script>
