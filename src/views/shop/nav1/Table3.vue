<template>
  <section>
    <!--工具条-->
    <el-row>
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-date-picker v-model="filters.startTime"  class="fixed_search_input_date" :editable="false" :clearable="false" type="date" placeholder="请选择开始时间" :picker-options="pickerOptions1">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="filters.endTime"  class="fixed_search_input_date" :editable="false" :clearable="false" type="date" placeholder="请选择结束时间" :picker-options="pickerOptions2">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="fixed_search_input">
          <el-select v-model="filters.state1" placeholder="门店名称" :multiple="false" filterable remote :remote-method="remoteShop"
            :loading="loading" clearable @visible-change="clickShop">
            <el-option v-for="item in optionsMers" :key="item.id" :value="item.id" :label="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="fixed_search_input">
          <el-select v-model="filters.payType" clearable placeholder="支付方式">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" @click="getUsers(true)" size="medium" round>查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <!--列表-->
    <div v-loading="listLoading">
      <el-table :data="users" border highlight-current-row style="width: 100%;">
        <el-table-column prop="settled_Time" label="统计日期" min-width="120">
        </el-table-column>
        <el-table-column prop="saccount" label="商户编号" min-width="120">
        </el-table-column>
        <el-table-column prop="sname" label="商户名称" min-width="120">
        </el-table-column>
        <el-table-column prop="pay_type" label="付款方式">
        </el-table-column>
        <el-table-column prop="amount" label="交易金额" :formatter="format_amount">
        </el-table-column>
        <el-table-column prop="discount" label="优惠金额" :formatter="format_discount">
        </el-table-column>
        <el-table-column prop="refund_amt" label="退款金额" :formatter="format_refund_amt">
        </el-table-column>
        <el-table-column prop="rate" label="费率‰">
        </el-table-column>
        <el-table-column prop="factorage" label="交易手续费" min-width="120" :formatter="format_factorage">
        </el-table-column>
        <el-table-column prop="surplus" label="划账金额" :formatter="format_surplus">
        </el-table-column>
      </el-table>
    </div>

    <!--工具条-->
    <el-row>
      <el-pagination layout="prev, pager, next" :current-page="page" @current-change="handleCurrentChange" :page-size="20" :total="total"
        background style="text-align:center;background:#fff;padding:15px;">
      </el-pagination>
    </el-row>

    <!--编辑界面-->
    <el-dialog title="门店详情" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="" ref="editForm">
        <el-form-item label="门店名称：">
          <span name="name">{{editForm.name}}</span>
        </el-form-item>
        <el-form-item label="门店ID：">
          <span name="name">{{editForm.id}}</span>
        </el-form-item>
        <el-form-item label="支付方式：">
          <span>{{editForm.mode}}</span>
        </el-form-item>
        <el-form-item label="交易状态：">
          <span>{{editForm.state}}</span>
        </el-form-item>
        <el-form-item label="交易日期：">
          <span>{{editForm.value}}</span>
        </el-form-item>
        <el-form-item label="交易金额（元）：">
          <span>{{editForm.money}}</span>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
  import * as util from '../../../assets/util.js'

  import {
    queryStrStatement,
    selectStoreList,
    downStrSumExcel
  } from '../../../api/shop';

  export default {
    data() {
      return {
        //时间控制
        pickerOptions1: {
          disabledDate: (time) => {
            let startTimeOne = Date.parse(new Date(util.formatDate.format(new Date(this.filters.endTime),
              'yyyy-MM-dd')));
            if (time.getTime() > startTimeOne || time.getTime() < startTimeOne - 3600 * 1000 * 24 * 90) {
              return true;
            }
          }
        },
        pickerOptions2: {
          disabledDate: (time) => {
            let startTimeOne = Date.parse(new Date(util.formatDate.format(new Date(this.filters.startTime),
              'yyyy-MM-dd')));
            if (time.getTime() > startTimeOne + 3600 * 1000 * 24 * 90 || time.getTime() < startTimeOne - 3600 * 1000 *
              24 * 1) {
              return true;
            }
          }
        },
        options: [{
          value: 'WX',
          label: '微信'
        }, {
          value: 'ALI',
          label: '支付宝'
        }, {
          value: 'DEBIT',
          label: '借记卡'
        }, {
          value: 'CREDIT',
          label: '贷记卡'
        }, {
          value: 'BEST',
          label: '翼支付'
        }],
        //商户查询
        optionsMers: [],
        //商户名
        filters: {
          state1: '',
          payType: '',
          startTime: new Date() - 24 * 60 * 60 * 1000,
          endTime: new Date() - 24 * 60 * 60 * 1000
        },
        loading: false,
        users: [],
        page: 1,
        total: null,
        listLoading: false,
        sels: [], //列表选中列

        editFormVisible: false, //编辑界面是否显示
        editLoading: false,
        //编辑界面数据
        editForm: {
          id: 0,
          name: '',
          mode: -1,
          state: 0,
          value: '',
          money: ''
        },

        addFormVisible: false, //新增界面是否显示
        addLoading: false,

      }
    },
    methods: {
      //格式化金额
      format_amount(row, column) {
        return util.number_format(row.amount, 2, ".", ",")
      },
      format_discount(row, column) {
        return util.number_format(row.discount, 2, ".", ",")
      },
      format_refund_amt(row, column) {
        return util.number_format(row.refund_amt, 2, ".", ",")
      },
      format_factorage(row, column) {
        return util.number_format(row.factorage, 2, ".", ",")
      },
      format_surplus(row, column) {
        return util.number_format(row.surplus, 2, ".", ",")
      },
      //门店远程搜索
      clickShop: function () {
        selectStoreList().then((res) => {
          let {
            status,
            data
          } = res
          this.optionsMers = data.storeList
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
              this.optionsMers = data.storeList
            })
          }, 200);
        } else {
          this.optionsMers = [];
        }
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getList()

      },
      getList() {
        let para = {
          pageNum: this.page,
          sid: String(this.filters.state1),
          payType: this.filters.payType,
          startTime: this.filters.startTime,
          endTime: this.filters.endTime,
        };
        para.startTime = (!para.startTime || para.startTime == '') ? '' : util.formatDate.format(new Date(para.startTime),
          'yyyy-MM-dd');
        para.endTime = (!para.endTime || para.endTime == '') ? '' : util.formatDate.format(new Date(para.endTime),
          'yyyy-MM-dd');
        this.listLoading = true;
        queryStrStatement(para).then((res) => {
          let {
            status,
            message
          } = res;
          if (status == 200) {
            this.total = res.data.totalCount;
            this.users = res.data.strStatementList;
            this.listLoading = false;
          }
        });
      },
      //获取用户列表
      getUsers() {
        this.page = 1
        this.getList()
      },
      //显示编辑界面
      handleEdit: function (index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      },
    },
    mounted() {
      this.getUsers();
    }
  }

</script>
