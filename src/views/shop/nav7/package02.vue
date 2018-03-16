<template>
<section>
  <!--工具条-->
  <el-row :span="24" class="toolbar" style="padding-bottom: 0px;">
    <el-form :inline="true" :model="filters">
      <!-- <el-form-item prop="time1">
        <el-date-picker v-model="filters.startTime" type="datetime" placeholder="选择开始日期" :picker-options="pickerOptions1" :clearable="false" :editable='false'>
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="time2">
        <el-date-picker v-model="filters.endTime" type="datetime" placeholder="选择结束日期" :picker-options="pickerOptions2" :clearable="false" :editable='false'>
        </el-date-picker>
      </el-form-item> -->
      <el-form-item prop="name">
        <el-input v-model="filters.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input v-model="filters.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="cardnum">
        <el-input v-model="filters.cardnum" placeholder="请输入会员卡号"></el-input>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button type="primary" v-on:click="getUsers">查询</el-button>
        <el-button type="text" @click="downExcel()"><i class="el-icon-date"></i>导出Excel</el-button>
      </el-form-item>
    </el-form>
  </el-row>

  <!--列表-->
  <el-table :data="users" border highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
    <el-table-column prop="inviter_name" label="邀请人">
    </el-table-column>
    <el-table-column prop="phone" label="电话">
    </el-table-column>
    <el-table-column prop="inviter_code" label="邀请码" width="95">
    </el-table-column>
    <el-table-column prop="card_num" label="会员卡号">
    </el-table-column>
    <el-table-column prop="commission" label="提成金额" width="95" :formatter="commission">
    </el-table-column>
    <el-table-column prop="dividend" label="分红金额">
      <template slot-scope="scope">
        <span>{{scope.row.dividend}}</span>
        <el-button type="warning" size="small" @click="dividendClick(scope.$index, scope.row)">修改</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="sum_invitee" label="邀请成功" width="100">
    </el-table-column>
    <el-table-column prop="intentSum" label="意向客户" width="100">
    </el-table-column>
    <el-table-column prop="store_name" label="操作" width="100">
      <template slot-scope="scope">
          <el-button type="info" size="small" @click="seeClick(scope.$index, scope.row)">邀请详情</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!--工具条-->
  <el-col :span="24" class="toolbar">
    <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
    </el-pagination>
  </el-col>
<el-dialog title="已邀请人" :visible.sync="dialogTableVisible" :close-on-click-modal="false">
  <el-form :inline="true" :model="dialog">
    <el-form-item prop="status">
      <template>
      <el-select v-model="dialog.status" placeholder="请选择" @change="getDialogChange">
        <el-option
          v-for="item in dialogOptions"
          :key="item.id"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      </template>
    </el-form-item>
    <el-form-item style="float:right">
      <el-button type="primary" v-on:click="getDialogUsers">查询</el-button>
    </el-form-item>
  </el-form>
  <el-table border :data="gridData">
    <el-table-column property="gmt_create" label="日期" :formatter="gmt_create"></el-table-column>
    <el-table-column property="name" label="姓名"></el-table-column>
    <el-table-column property="pkg_name" label="套餐" v-if="dialog.status=='2'"></el-table-column>
  </el-table>
  <el-col :span="24" class="toolbar">
    <el-pagination layout="prev, pager, next" @current-change="dialogHandleCurrentChange" :page-size="20" :total="dialogTotal" style="float:right;">
    </el-pagination>
  </el-col>
</el-dialog>
</section>
</template>

<script>
import * as util from '../../../assets/util.js'
// import currency from 'currency'
//
import {
  queryPkgInviterByCondition,
  getPkgProductList,
  queryIntention,
  updatePkgInviterById,
  downPkgInviterExcel
} from '../../../api/shop';
export default {
  data() {
    var myDate = new Date();
    return {
      //时间控制
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now() || time.getTime() < Date.now() - 3600 * 1000 * 24 * 90;
        }
      },
      pickerOptions2: {
        disabledDate(time) {
          return time.getTime() > Date.now() || time.getTime() < Date.now() - 3600 * 1000 * 24 * 90;
        }
      },
      filters: {
        // pkg_id: '',
        // startTime: [new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate())],
        // endTime: [new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate(), 23, 59, 59)]
        name:'',
        phone:'',
        cardnum:''
      },
      dialog: {
        status:'2'
      },
      dialogOptions:[{
          value: '2',
          label: '邀请成功'
        }, {
          value: '1',
          label: '意向客户'
        }],
      users: [],
      total: 0,
      page: 1,
      dialogpage:1,
      listLoading: false,
      dialogTableVisible:false,
      gridData: [],
      dialogTotal:0,
      id:''
    }
  },
  methods: {
    commission:function (row,column) {
      return String(row.commission)
    },
    //订单状态
    status: function(row, column) {
      return row.status == 3 ? '退款成功' : row.status == 1 ? '支付成功' : row.status == 2 ? '支付失败' : '未知';
    },
    //时间转化
    gmt_create: function(row, column) {
      return row.gmt_create = util.formatDate.format(new Date(row.gmt_create), 'yyyy/MM/dd hh:mm:ss');
    },
    dividendClick(index, row){
      console.log(row)
      this.$prompt('请输入分红（单位元）', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
        inputErrorMessage: '金额格式不正确'
      }).then(({ value }) => {
        let para = {
          inviter_id:String(row.id),
          dividend:value
        }
        updatePkgInviterById(para).then((res)=>{
          if (res.status==200) {
            this.$message({
              type: 'success',
              message: '修改分红金额为: ' + value
            });
            this.getUsers()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    getDialogChange(row){
      let para = {
        pagNum: String(this.dialogpage),
        inviterid:String(this.id),
        status:this.dialog.status
      }
      queryIntention(para).then((res)=>{
        this.dialogTotal = res.data.totalCount;
        this.gridData=res.data.inviteeList
      })
    },
    getDialogUsers(){
      let para = {
        pagNum: String(this.dialogpage),
        inviterid:String(this.id),
        status:this.dialog.status
      }
      queryIntention(para).then((res)=>{
        this.dialogTotal = res.data.totalCount;
        this.gridData=res.data.inviteeList
      })
    },
    seeClick(index, row){
      this.dialogTableVisible=true
      this.id = row.id
      let para = {
        pagNum: String(this.dialogpage),
        inviterid:String(this.id),
        status:this.dialog.status
      }
      queryIntention(para).then((res)=>{
        this.dialogTotal = res.data.totalCount;
        this.gridData=res.data.inviteeList
      })
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getUsers();
    },
    dialogHandleCurrentChange(val){
      this.dialogpage=val
    },
    //导出Excel
    downExcel(){
      let para={
        name:this.filters.name,
        phone:this.filters.phone,
        card_num:this.filters.cardnum
      }

      window.location.href=process.env.API_ROOT+"/pay/weixin/activity/downPkgInviterExcel?name="+para.name+'&phone='+para.phone+'&card_num='+para.card_num;
    },
    //获取用户列表
    getUsers() {
      let para = {
        pagNum: String(this.page),
        name:this.filters.name,
        phone:this.filters.phone,
        card_num:this.filters.cardnum
      };
      this.listLoading = true;
      queryPkgInviterByCondition(para).then((res) => {
        this.total = res.data.totalCount;
        this.users = res.data.pkgInviterList;
        this.listLoading = false;
      });
    },
    selsChange: function(sels) {
      this.sels = sels;
    },
  },
  mounted() {
    this.getUsers();
  }
}
</script>

<style scoped>
</style>
