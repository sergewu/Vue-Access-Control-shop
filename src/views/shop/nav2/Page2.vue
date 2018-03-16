<template>
<section>
  <!--工具条-->
  <el-row :span="24" class="toolbar" style="padding-bottom: 0px;">
    <el-form :inline="true" :model="filters">
      <el-form-item>
        <el-input v-model="filters.username" placeholder="请输入款台名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="filters.account" placeholder="请输入款台帐号"></el-input>
      </el-form-item>
      <el-form-item style="float: right;">
        <el-button type="primary" v-on:click="getUsers" size="medium" round>查询</el-button>
        <el-button type="primary" @click="handleAdd" size="medium" round>新增</el-button>
      </el-form-item>
    </el-form>
  </el-row>

  <!--列表-->
  <el-table :data="users" border highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
    <el-table-column prop="username" label="款台名称" min-width="120">
    </el-table-column>
    <el-table-column prop="account" label="登录帐号" min-width="120">
    </el-table-column>
    <el-table-column label="款台状态" min-width="120">
      <template slot-scope="scope">
          <el-switch
            name="value"
            on-text="开启"
            off-text="关闭"
            @change.native="test(scope.$index, scope.row)"
            v-model="scope.row.status">
          </el-switch>
        </template>
    </el-table-column>
    <el-table-column label="二维码" width="100">
      <template slot-scope="scope">
          <el-button size="small" @click="handleCode(scope.$index, scope.row)">二维码</el-button>
        </template>
    </el-table-column>
    <el-table-column label="会员支付二维码" width="140" v-if="showVipCode">
      <template slot-scope="scope">
          <el-button size="small" @click="handleVipCode(scope.$index, scope.row)">会员支付二维码</el-button>
        </template>
    </el-table-column>
    <el-table-column label="密码重置" width="100">
      <template slot-scope="scope">
          <el-button size="small" @click="handleReset(scope.$index, scope.row)">密码重置</el-button>
        </template>
    </el-table-column>
    <el-table-column label="详情" width="90">
      <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
        </template>
    </el-table-column>
    <el-table-column label="操作" width="90">
      <template slot-scope="scope">
          <el-button size="small" @click="handleModify(scope.$index, scope.row)">修改</el-button>
          <!-- <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button> -->
        </template>
    </el-table-column>
  </el-table>

  <!--工具条-->
  <el-col :span="24" class="toolbar">
    <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
    </el-pagination>
  </el-col>
  <!--修改界面-->
  <el-dialog title="修改信息" :visible.sync="modFormVisible" :close-on-click-modal="false" size="tiny">
    <el-form :model="modForm" :rules="modFormRules" ref="editForm">
      <el-form-item label="款台名称" prop="username">
        <el-input v-model="modForm.username" auto-complete="off"></el-input>
      </el-form-item>
      <!-- <el-form-item label="支付宝操作员编号：" prop="ali_operation_id">
          <el-input v-model="modForm.ali_operation_id"></el-input>
        </el-form-item> -->
      <el-form-item label="电话" prop="phone">
        <el-input v-model="modForm.phone" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="modForm.email"></el-input>
      </el-form-item>
      <el-form-item label="富友终端ID" prop="terminal_id">
        <el-input v-model="modForm.terminal_id"></el-input>
      </el-form-item>
      <el-form-item label="微收银设备号" prop="wsy_num">
        <el-input v-model="modForm.wsy_num"></el-input>
      </el-form-item>
      <el-form-item label="选择门店">
        <template>
            <el-select v-model="modForm.value" placeholder="请选择门店名称" :multiple="false" filterable remote :remote-method="remoteShop" :loading="loading" clearable @visible-change="clickShop">
              <el-option v-for="item in options" :key="item.id" :value="item.id" :label="item.value">
              </el-option>
            </el-select>
        </template>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="modFormVisible = false">取消</el-button>
      <el-button type="primary" @click.native="editSubmit" :loading="modLoading">提交</el-button>
    </div>
  </el-dialog>
  <!-- 二维码 -->
  <el-dialog :visible.sync="editFormCode" :close-on-click-modal="true" size="tiny">
    <el-form :model="editCode" label-width="" ref="editCode" style="width:auto">
      <img :src="editCode.code" alt="二维码" width="100%">
      <el-button type="primary" @click="code" style="position:absolute;left:50%;margin-left:-44px;margin-top:-20px;">点击下载</el-button>
    </el-form>
  </el-dialog>
  <!-- 会员支付二维码 -->
  <el-dialog :visible.sync="editFormVipCode" :close-on-click-modal="true" size="tiny">
    <el-form :model="editVipCode" label-width="" ref="editVipCode" style="width:auto">
      <img :src="editVipCode.vipCode" alt="二维码" width="100%">
      <el-button type="primary" @click="vipCode" style="position:absolute;left:50%;margin-left:-44px;margin-top:-20px;">点击下载</el-button>
    </el-form>
  </el-dialog>
  <!--详情界面-->
  <el-dialog title="交易详情" :visible.sync="editFormVisible" :close-on-click-modal="false">
    <el-form :model="editForm" label-width="140px" ref="editForm" label-position="left">
      <el-form-item label="款台名称：">
        <span>{{editForm.username}}</span>
      </el-form-item>
      <el-form-item label="款台帐号：">
        <span>{{editForm.account}}</span>
      </el-form-item>
      <!-- <el-form-item label="支付宝操作员编号：">
          <span>{{editForm.ali_operation_id}}</span>
        </el-form-item> -->
      <el-form-item label="手机号：">
        <span>{{editForm.phone}}</span>
      </el-form-item>
      <el-form-item label="邮箱：">
        <span>{{editForm.email}}</span>
      </el-form-item>
      <el-form-item label="终端号：">
        <span>{{editForm.terminal_id}}</span>
      </el-form-item>
      <el-form-item label="所属门店：">
        <span>{{editForm.storeName}}</span>
      </el-form-item>
      <el-form-item label="万鼎终端：">
        <span>{{editForm.reverse1}}</span>
      </el-form-item>
      <el-form-item label="万鼎Token：">
        <span>{{editForm.etoken}}</span>
      </el-form-item>
    </el-form>
  </el-dialog>

  <!--新增界面-->
  <el-dialog title="新增款台" :visible.sync="addFormVisible" :close-on-click-modal="false" size="tiny">
    <el-form :model="addForm" :rules="addFormRules" ref="addForm">
      <el-form-item label="款台名称" prop="username">
        <el-input v-model="addForm.username" auto-complete="off"></el-input>
      </el-form-item>
      <!-- <el-form-item label="支付宝操作员编号" prop="ali_operation_id">
          <el-input v-model="addForm.ali_operation_id" auto-complete="off"></el-input>
        </el-form-item> -->
      <el-form-item label="电话" prop="phone">
        <el-input v-model="addForm.phone" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addForm.email" auto-complete="off" value="number"></el-input>
      </el-form-item>
      <el-form-item label="富有终端ID" prop="terminal_id">
        <el-input v-model="addForm.terminal_id" auto-complete="off" value="number"></el-input>
      </el-form-item>
      <el-form-item label="微收银设备号" prop="wsy_num">
        <el-input v-model="addForm.wsy_num"></el-input>
      </el-form-item>
      <el-form-item label="选择门店" prop="value">
        <template>
          <el-select v-model="addForm.value" placeholder="请选择门店名称" :multiple="false" filterable remote :remote-method="remoteShop" :loading="loading" clearable @visible-change="clickShop">
            <el-option v-for="item in options" :key="item.id" :value="item.id" :label="item.value">
            </el-option>
          </el-select>
        </template>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="addFormVisible = false">取消</el-button>
      <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
    </div>
  </el-dialog>
</section>
</template>

<script>
import * as util from '../../../assets/util.js'

import Md5 from 'md5'
import {
  queryEmployeeShop,
  queryEmployeeDetail,
  updateEmployeePwd,
  addEmployee,
  selectStoreList,
  updateEmployee,
  deleteEmployee,
  updateEmployeeStatus,
  getEmpTwoCode,
  getEmpMemCode
} from '../../../api/shop';

export default {
  data() {
    var phone = (rule, value, callback) => {
      if (value === '') {
        callback();
      } else if (!/^1(3|4|5|7|8)\d{9,10}$/.test(value)) {
        callback(new Error('请输入正确的联系人手机号'));
      } else {
        callback();
      }
    };
    return {
      querySource: [],
      source: [],
      filters: {
        username: '',
        account: ''
      },
      value: "",
      options: [],
      users: [],
      total: 1,
      page: 1,
      listLoading: false,

      stateFormVisible: false,
      stateLoading: false,

      editFormVisible: false, //编辑界面是否显示
      editLoading: false,

      editFormCode: false,
      editCode: {
        code: ''
      },
      editFormVipCode: false,
      editVipCode: {
        vipCode: ''
      },
      showVipCode: true,
      //编辑界面数据
      editForm: {},

      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        username: [{
            required: true,
            message: '请输入款台名称',
            trigger: 'blur'
          },
          {
            max: 20,
            message: '请输入正确的款台名称',
            trigger: 'blur'
          },
        ],
        phone: [{
          validator: phone,
          trigger: 'blur'
        }],
        email: [{
            message: '请输入邮箱',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: '请输入正确的邮箱',
            trigger: 'blur'
          }
        ],
        value: [{
          required: true,
          type: 'number',
          message: '请选择款台',
          trigger: 'change'
        }],

      },
      modFormVisible: false, //新增界面是否显示
      modLoading: false,
      modFormRules: {
        username: [{
            required: true,
            message: '请输入款台名称',
            trigger: 'blur'
          },
          {
            max: 20,
            message: '请输入正确的款台名称',
            trigger: 'blur'
          },
        ],
        phone: [{
          validator: phone,
          trigger: 'blur'
        }],
        email: [{
            message: '请输入邮箱',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: '请输入正确的邮箱',
            trigger: 'blur'
          }
        ],
        value: [{
          required: true,
          message: '请选择款台'
        }],
      },
      stateForm: {},
      modForm: {
        value: '',
        options: '',
        eid: '',
        wsy_num: ''
      },
      //新增界面数据
      loading: false,
      addForm: {
        value: '',
        username: '',
        ali_operation_id: '',
        phone: '',
        email: '',
        terminal_id: '',
        options: '',
        wsy_num: ''
      }

    }
  },
  methods: {
    //门店远程搜索
    clickShop: function() {
      selectStoreList().then((res) => {
        let {
          status,
          data
        } = res
        this.options = data.storeList
      })
    },
    remoteShop(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          selectStoreList({
            sname: query
          }).then((res) => {
            let {
              status,
              data
            } = res
            this.options = data.storeList
          })
        }, 200);
      } else {
        this.options = [];
      }
    },
    test: function(index, row) {
      this.$confirm('此操作将修改款台状态, 确定修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning'
      }).then(() => {
        let para = {
          eid: row.eid,
          status: row.status == true ? 1 : row.status == false ? 0 : "未知"
        }
        updateEmployeeStatus(para).then((res) => {
          let {
            status
          } = res
          if (status == 200) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          } else {
            this.$notify.error({
              title: '错误',
              message: message
            });
          }
        })
      }).catch(() => {
        this.getUsers();
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    //显示二维码
    handleCode: function(inde, row) {
      this.editFormCode = true;
      let para = {
        mid: row.mid,
        eid: row.eid,
        storeId: row.storeId
      }
      getEmpTwoCode(para).then((res) => {
        this.editCode.code = process.env.API_ROOT + "/pay/cashier/getEmpTwoCode" + "?" + "mid=" + para.mid + "&" + "eid=" + para.eid + "&" + "storeId=" + para.storeId
      })
    },
    code: function() {
      window.location.href = this.editCode.code
    },
    //显示会员支付二维码
    handleVipCode: function(inde, row) {
      this.editFormVipCode = true;
      let para = {
        mid: row.mid,
        eid: row.eid,
        storeId: row.storeId
      }
      getEmpMemCode(para).then((res) => {
        this.editVipCode.vipCode = process.env.API_ROOT + "/pay/emp/getEmpMemCode" + "?" + "mid=" + para.mid + "&" + "eid=" + para.eid + "&" + "storeId=" + para.storeId
      })
    },
    vipCode: function() {
      window.location.href = this.editVipCode.vipCode
    },
    //状态显示转换
    handleCurrentChange(val) {
      this.page = val;
      this.getUsers();
    },
    //获取用户列表
    getUsers() {
      let para = {
        pageNum: this.page,
        username: this.filters.username,
        account: this.filters.account
      };
      this.listLoading = true;
      
      queryEmployeeShop(para).then((res) => {
        var _this = this;
        let {
          status,
          message
        } = res;
        if (status == 200) {
          this.total = res.data.totalCount;
          this.users = res.data.employeeList;
          var sta;
          for (var i = 0; i < this.users.length; i++) {
            sta = this.users[i];
            if (sta.status == 1) {
              sta.status = true
            } else {
              sta.status = false
            }
          }
        } else if (status == 301 || status == 302) {
          sessionStorage.removeItem('user');
          _this.$router.push('/login');
          this.$notify.error({
            title: '错误',
            message: message
          });
        } else {
          this.$notify.error({
            title: '错误',
            message: message
          });
        }
        this.listLoading = false;
        
      });
    },
    //重置密码
    handleReset: function(index, row) {
      this.$prompt('请输入新密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '密码格式不正确',
        inputValue: '123456'
      }).then(({
        value
      }) => {
        let para = {
          password: Md5(value + row.account),
          eid: row.eid
        };
        updateEmployeePwd(para).then((res) => {
          var _this = this;
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
          } else if (status == 301 || status == 302) {
            sessionStorage.removeItem('user');
            _this.$router.push('/login');
            this.$notify.error({
              title: '错误',
              message: message
            });
          } else {
            this.$notify.error({
              title: '错误',
              message: message
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    //修改款台列表
    handleModify: function(index, row) {
      this.modFormVisible = true;
      this.modForm.username = row.username;
      this.modForm.phone = row.phone;
      this.modForm.email = row.email;
      this.modForm.terminal_id = row.terminal_id;
      this.modForm.eid = row.eid,
        this.modForm.ali_operation_id = row.ali_operation_id
      this.modForm.wsy_num = row.device_num
      let para = {
        eid: row.eid,
      }
      this.querySource = this.source.filter(() => {
        return true
      })
      this.clickShop();
      this.modForm.value = row.storeId;

    },
    //显示编辑界面
    handleEdit: function(index, row) {

      this.editFormVisible = true;
      let para = {
        eid: row.eid
      };
      queryEmployeeDetail(para).then((res) => {
        var _this = this;
        let {
          status,
          message
        } = res;
        if (status == 200) {
          this.editForm = res.data.employee;
          this.editForm.storeName = res.data.storeName
        } else if (status == 302 || status == 301) {
          sessionStorage.removeItem('user');
          _this.$router.push('/login');
          this.$notify.error({
            title: '错误',
            message: message
          });
        } else {
          this.$notify.error({
            title: '错误',
            message: message
          });
        }
      })
    },
    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;
      this.addForm = {
        value: '',
        storeId: '',
        username: '',
        ali_operation_id: '',
        phone: '',
        email: '',
        terminal_id: '',
        options: '',
      };
    },
    //编辑
    editSubmit: function() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true;
            
            let para = {
              eid: this.modForm.eid,
              username: this.modForm.username,
              phone: this.modForm.phone,
              email: this.modForm.email,
              terminal_id: this.modForm.terminal_id,
              storeId: this.modForm.value,
              ali_operation_id: this.modForm.ali_operation_id,
              wsy_num: this.modForm.wsy_num

            };
            //para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
            updateEmployee(para).then((res) => {
              var _this = this;
              this.editLoading = false;
              
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
              } else if (status == 301 || status == 302) {
                sessionStorage.removeItem('user');
                _this.$router.push('/login');
                this.$notify.error({
                  title: '错误',
                  message: message
                });
              } else {
                this.$notify.error({
                  title: '错误',
                  message: message
                });
              }
              this.modFormVisible = false;
              this.getUsers();
            });
          });
        }
      });
    },
    //删除
    // handleDel: function (index, row) {
    //     this.$confirm('确认删除该记录吗?', '提示', {
    //         type: 'warning'
    //     }).then(() => {
    //         this.listLoading = true;
    //         
    //         let para = { eid: row.eid };
    //         deleteEmployee(para).then((res) => {
    //             this.listLoading = false;
    //             
    //             let {status,message}=res;
    //             if(status==200){
    //                 this.$notify({
    //                     title: '成功',
    //                     message: message,
    //                     type: 'success'
    //                 });
    //             }else {
    //                 this.$notify({
    //                     title: '失败',
    //                     message: message,
    //                     type: 'success'
    //                 });
    //             }
    //             this.getUsers();
    //         });
    //     }).catch(() => {
    //
    //     });
    // },
    //新增
    addSubmit: function() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true;
            
            let para = {
              storeId: this.addForm.value,
              username: this.addForm.username,
              ali_operation_id: this.addForm.ali_operation_id,
              phone: this.addForm.phone,
              email: this.addForm.email,
              terminal_id: this.addForm.terminal_id,
              wsy_num: this.addForm.wsy_num
            };
            addEmployee(para).then((res) => {
              let {
                message,
                status
              } = res;
              this.addLoading = false;
              
              if (status == 200) {
                this.$notify({
                  title: '成功',
                  message: message,
                  type: 'success'
                });
              } else {
                this.$notify.error({
                  title: '错误',
                  message: message
                });
              }
              this.$refs['addForm'].resetFields();
              this.addFormVisible = false;
              this.getUsers();
            });
          });
        }
      });
    },
    selsChange: function(sels) {
      this.sels = sels;
    },
  },
  mounted() {
    this.getUsers();
    let isMember = JSON.parse(sessionStorage.getItem('isMember'));
    if (isMember == 'Y') {
      this.showVipCode = true;
    } else if (isMember == 'N') {
      this.showVipCode = false;
    }
  }
}
</script>

<style scoped>

</style>
