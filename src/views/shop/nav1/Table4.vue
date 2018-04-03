<template>
<section>
  <!--工具条-->
  <el-row class="toolbar">
    <el-form :inline="true" :model="whole">
        <el-tag type="primary"  style="margin:10px 10px 20px 0;">交易总金额（元）：{{whole.sumAmt}}元</el-tag>
        <el-tag type="primary" style="">交易总笔数（笔）：{{whole.countRow}}笔</el-tag>
    </el-form>
  </el-row>
  <el-row>
    <el-form :inline="true" :model="filters">
      <el-form-item>
        <el-date-picker
          v-model="filters.startTime"
          :editable="false"
          :clearable="false"
          type="date"
          placeholder="请选择开始时间"
          :picker-options="pickerOptions1">
        </el-date-picker>
        <el-date-picker
          v-model="filters.endTime"
          :editable="false"
          :clearable="false"
          type="date"
          placeholder="请选择结束时间"
          :picker-options="pickerOptions2">
        </el-date-picker>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button type="primary" @click="getUsers(true)" size="medium" round>查询</el-button>
      </el-form-item>
    </el-form>
  </el-row>
  <!--列表-->
  <div v-loading="listLoading">
    <el-table :data="users" border highlight-current-row style="width: 100%;">
      <el-table-column prop="mname" label="商户名称" min-width="100">
      </el-table-column>
      <el-table-column prop="settled_date" label="统计日期" min-width="130" :formatter="settled_date">
      </el-table-column>
      <el-table-column prop="trans_amt" label="交易金额" min-width="100">
      </el-table-column>
      <el-table-column prop="amount" label="有效金额" min-width="100">
      </el-table-column>
      <el-table-column prop="sum_total" label="交易笔数">
      </el-table-column>
      <el-table-column prop="refund_amt" label="退款金额">
      </el-table-column>
      <el-table-column prop="factorage" label="手续费">
      </el-table-column>
      <el-table-column prop="avg_amt" label="平均每笔交易额" min-width="120">
      </el-table-column>
    </el-table>
  </div>

  <!--工具条-->
  <el-row>
    <el-pagination layout="prev, pager, next" :current-page="page" @current-change="handleCurrentChange" :page-size="20" :total="total" background style="text-align:center;background:#fff;padding:15px;">
    </el-pagination>
  </el-row>
</section>
</template>

<script>
import * as util from '../../../assets/util.js'

import {
  queryMerDaySum
} from '../../../api/shop';

export default {
  data() {
    return {
      //时间控制
      pickerOptions1: {
        disabledDate: (time) => {
          let startTimeOne = Date.parse(new Date(util.formatDate.format(new Date(this.filters.endTime), 'yyyy-MM-dd')));
          if (time.getTime() > startTimeOne || time.getTime() < startTimeOne - 3600 * 1000 * 24 * 90 ) {
            return true;
          }
        }
      },
      pickerOptions2: {
        disabledDate: (time) => {
          let startTimeOne = Date.parse(new Date(util.formatDate.format(new Date(this.filters.startTime), 'yyyy-MM-dd')));
          if (time.getTime() > startTimeOne + 3600 * 1000 * 24 * 90 || time.getTime() < startTimeOne - 3600 * 1000 * 24 * 1 ) {
            return true;
          }
        }
      },
      //商户名
      filters: {
        startTime:new Date()-24*60*60*1000,
        endTime:new Date()-24*60*60*1000
      },
      users: [],
      page: 1,
      total: null,
      listLoading: false,
      whole: {
        sumAmt: "",
        countRow: ""
      }
    }
  },
  methods: {
    settled_date: function(row, column) {
      return row.settled_date = util.formatDate.format(new Date(row.settled_date), 'yyyy/MM/dd');
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getList()
    },
    getList(){
      let para = {
        pageNum: this.page,
        startTime:this.filters.startTime,
        endTime:this.filters.endTime,
      };
      para.startTime = (!para.startTime || para.startTime == '') ? '' : util.formatDate.format(new Date(para.startTime), 'yyyy/MM/dd');
      para.endTime = (!para.endTime || para.endTime == '') ? '' : util.formatDate.format(new Date(para.endTime), 'yyyy/MM/dd');
      this.listLoading = true;
      queryMerDaySum(para).then((res) => {
        this.listLoading = false;
        let {
          status,
          message
        } = res;
        if (status == 200) {
          this.total = res.data.totalCount;
          this.users = res.data.merDaySumList;
          this.whole.countRow = res.data.sumTotal;
          this.whole.sumAmt = res.data.sumAmt;
        }
      });
    },
    //获取用户列表
    getUsers() {
      this.page = 1
      this.getList()
    },
  },
  mounted() {
    this.getUsers();
  }
}
</script>
