<template>
  <section>
    <!--工具条-->
    <el-row>
      <el-col>
        <el-form :inline="true" :model="whole">
          <el-tag type="primary" style="margin:10px 10px 20px 0;">交易总金额（元）：{{whole.sumAmt}}元</el-tag>
          <el-tag type="primary" style="margin:10px 10px 20px 0;">交易总笔数（笔）：{{whole.countRow}}笔</el-tag>
          <el-tag type="primary" style="margin:10px 10px 20px 0;">会员卡消费总金额（元）：{{whole.memAmt}}元</el-tag>
          <el-tag type="primary" style="">会员卡消费总笔数（笔）：{{whole.memCount}}笔</el-tag>
        </el-form>
      </el-col>
    </el-row>
    <el-form :inline="true" :model="filters" ref="filters" :rules="filtersRules" class="top_input">
      <el-row>
        <el-col>
          <el-form-item prop="startTime">
            <el-date-picker v-model="filters.startTime" @change="changTime" type="datetime" placeholder="选择开始日期" :picker-options="pickerOptions1" :clearable="false"
              :editable='false'>
            </el-date-picker>
          </el-form-item>
             至
          <el-form-item prop="endTime">
            <el-date-picker v-model="filters.endTime" type="datetime" placeholder="选择结束日期" :picker-options="pickerOptions2" :clearable="false"
              :editable='false'>
            </el-date-picker>
          </el-form-item>
          <el-tag type="success">可查询30天之前的交易，每次查询区间做多为3个月</el-tag>
        </el-col>
        <!-- <el-col :span="4">
          <el-form-item style="float:right">
            <el-button type="text" @click="downExcel()">
            <i class="el-icon-date"></i>导出Excel</el-button>
          </el-form-item>
        </el-col> -->
      </el-row>
      <el-row>
        <el-form-item>
          <el-select v-model="filters.parag" placeholder="请选择门店名称" :multiple="false" filterable remote :remote-method="remoteShop"
            :loading="loading" clearable @visible-change="clickShop">
            <el-option v-for="item in options" :key="item.id" :value="item.id" :label="item.value">
            </el-option>
          </el-select>
          <el-select v-model="filters.play" clearable placeholder="请选择支付类型">
            <el-option v-for="item in optionsScene" :label="item.labelScene" :value="item.valueScene" :key="item.valueScene">
            </el-option>
          </el-select>
          <el-select v-model="filters.state" clearable placeholder="请选择支付状态">
            <el-option v-for="item in optionsState" :label="item.labelState" :value="item.valueState" :key="item.valueState">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button type="primary" @click="getUsers('filters')" size="medium" round>查询</el-button>
          <el-button @click="resetForm('filters')" size="medium" round>重置</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <!--列表-->
    <div v-loading="listLoading">
      <el-table :data="users" border highlight-current-row>
        <el-table-column prop="payTime" label="付款时间" min-width="145">
        </el-table-column>
        <el-table-column prop="orderId" label="订单号" min-width="195">
        </el-table-column>
        <el-table-column prop="goodsPrice" label="交易金额" width="120">
        </el-table-column>
        <el-table-column prop="discount" label="优惠金额" width="120">
        </el-table-column>
        <el-table-column prop="status" label="交易状态" width="150" :formatter="formatPay2">
        </el-table-column>
        <el-table-column prop="storeName" label="收款门店" width="120">
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">交易详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--工具条-->
    <el-col>
      <el-pagination layout="prev, pager, next" :current-page="page" @current-change="handleCurrentChange" :page-size="20" :total="total" background style="text-align:center;background:#fff;padding:15px;">
      </el-pagination>
    </el-col>

    <!--详情界面-->
    <el-dialog title="交易详情" :visible.sync="editFormVisible" :close-on-click-modal="false" width="600px">
      <el-form :model="editForm" label-width="160px" ref="editForm" label-position="left">
        <el-form-item label="订单号：">
          <span>{{editForm.orderId}}</span>
        </el-form-item>
        <el-form-item label="第三方订单号：">
          <span>{{editForm.transactionId}}</span>
        </el-form-item>
        <el-form-item label="交易金额（元）：">
          <span>{{editForm.goodsPrice}}</span>
        </el-form-item>
        <el-form-item label="付款时间：">
          <span>{{editForm.payTime}}</span>
        </el-form-item>
        <el-form-item label="交易状态：">
          <span>{{editForm.status}}</span>
        </el-form-item>
        <el-form-item label="退款金额（元）：">
          <span>{{editForm.refundAmount}}</span>
        </el-form-item>
        <el-form-item label="收款门店：">
          <span>{{editForm.storeName}}</span>
        </el-form-item>
        <el-form-item label="款台：">
          <span>{{editForm.username}}</span>
        </el-form-item>
        <el-form-item label="支付方式：">
          <span>{{formatPay1(editForm.payWay)}}</span>
        </el-form-item>
        <el-form-item label="备注：">
          <span>{{editForm.goodsDesc}}</span>
        </el-form-item>
        <el-button type="primary" @click="Print" style="margin-left:45%;">补发打印</el-button>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
  import * as util from '../../../assets/util.js'
  import {
    downloadQueryOrderShop,
    lookupUser,
    downOrderExcel,
    merRefund,
    supplyPrint,
    selectStoreList,
    checkdownOrderExcelNew
  } from '../../../api/shop';

  export default {
    data() {
      var myDate = new Date();
      return {
        //支付方式
        optionsScene: [{
          valueScene: 'WX',
          labelScene: '微信'
        }, {
          valueScene: 'ALI',
          labelScene: '支付宝'
        }, {
          valueScene: 'DEBIT',
          labelScene: '借记卡'
        }, {
          valueScene: 'CREDIT',
          labelScene: '贷记卡'
        }],
        //支付状态
        optionsState: [{
          valueState: '1',
          labelState: '已支付'
        }, {
          valueState: '3',
          labelState: '已支付（有退款）'
        }, {
          valueState: '5',
          labelState: '未知'
        }],
        //选择款台
        options: [],
        //时间控制
        pickerOptions1: {
          disabledDate: (time) => {
            if (time.getTime() > Date.now()) {
              return true;
            }
            // let startTimeOne = Date.parse(new Date(util.formatDate.format(new Date(this.filters.endTime), 'yyyy-MM-dd')));
            // if (time.getTime() > startTimeOne || time.getTime() < startTimeOne - 3600 * 1000 * 24 * 90) {
            //   return true;
            // }
          }
        },
        pickerOptions2: {
          disabledDate: (time) => {
            let startTimeOne = Date.parse(new Date(util.formatDate.format(new Date(this.filters.startTime), 'yyyy-MM-dd')));
            if (time.getTime() > startTimeOne + 3600 * 1000 * 24 * 90 || time.getTime() < startTimeOne - 3600 * 1000 * 24 * 1) {
              return true;
            }
          }
        },
        loading: false,
        //商户名
        filters: {
          startTime: new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate()-1),
          endTime: new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate()-1, 23,59,59),
          play: '',
          state: '',
          parag: ''
        },
        whole: {
          sumAmt: "",
          countRow: ""
        },
        total: 0,
        page: 1,
        users: [],
        listLoading: false,
        sels: [], //列表选中列

        editFormVisible: false, //编辑界面是否显示
        editLoading: false,
        //编辑界面数据
        editForm: {
          orderId: '',
          transactionId: '',
          goodsPrice: '',
          payTime: '',
          status: '',
          storeName: '',
          refundAmount: '',
          payWay: ''
        },
        filtersRules: {
          endTime: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      changTime(date){
        let end_time = Date.parse(new Date(util.formatDate.format(new Date(this.filters.endTime), 'yyyy-MM-dd'))) 
        let date_time = Date.parse(new Date(util.formatDate.format(new Date(date), 'yyyy-MM-dd'))) 
        if (date_time < end_time - 3600 * 1000 * 24 * 90) {
          this.filters.endTime = ''
        }
      },
      formatPay2: function (row, column) {
        return row.status == 1 ? '已支付' : row.status == 3 ? '已支付（有退款）' : '未知';
      },
      formatPay1: function (row) {
        return row == 'WX' ? '微信' : row == 'ALI' ? '支付宝' : row == 'DEBIT' ? '借记卡' : row == 'CREDIT' ? '贷记卡' : '未知';
      },
      //门店远程搜索
      clickShop: function () {
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
      //补发打印
      Print: function () {
        let para = {
          orderId: this.editForm.orderId
        }
        supplyPrint(para).then((res) => {
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
          } else {
            this.$notify.error({
              title: '错误',
              message: message
            });
          }
        })
      },
      //导出Excel
      downExcel () {
        let para = {
          mid:sessionStorage.getItem('mid'),
          storeId: this.filters.parag,
          endTime: this.filters.endTime,
          startTime: this.filters.startTime,
          payWay: this.filters.play,
          status: this.filters.state,
        };
        para.startTime = (!para.startTime || para.startTime == '') ? '' : String(Date.parse(util.formatDate.format(new Date(para.startTime), 'yyyy-MM-dd hh:mm:ss'))); //开始时间
        para.endTime = (!para.endTime || para.endTime == '') ? '' : String(Date.parse(util.formatDate.format(new Date(para.endTime), 'yyyy-MM-dd hh:mm:ss'))); //开始时间

        checkdownOrderExcelNew(para).then(res=>{
          if (res.data.status === 200) {
            window.location.href = res.data.data
          }
        })
       // window.location.href = `http://download.weupay.com/download/mer/checkdownOrderExcelNew?storeId=${para.storeId}&endTime=${para.endTime}&startTime=${para.startTime}&payWay=${para.payWay}&status=${para.status}`;

      },
      handleCurrentChange(val) {
        this.page = val;
        this.getList()
      },
      //获取用户列表
      getList() {
        this.listLoading = true;
        let para = {
          mid:sessionStorage.getItem('mid'),
          pageNum: this.page,
          payWay: this.filters.play,
          status: this.filters.state,
          storeId: String(this.filters.parag),
          startTime: this.filters.startTime,
          endTime: this.filters.endTime
        };
        para.startTime = (!para.startTime || para.startTime == '') ? '' : String(Date.parse(util.formatDate.format(new Date(
          para.startTime), 'yyyy/MM/dd hh:mm:ss'))); //开始时间
        para.endTime = (!para.endTime || para.endTime == '') ? '' : String(Date.parse(util.formatDate.format(new Date(
          para.endTime), 'yyyy/MM/dd hh:mm:ss'))); //开始时间
        downloadQueryOrderShop(para).then((res) => {
          var _this = this;
          let {
            data,
            message,
            status
          } = res;
          if (status == 200) {
            this.total = res.data.totalCount;
            this.whole.countRow = res.data.countRow;
            this.whole.sumAmt = res.data.sumAmt;
            this.whole.memAmt = res.data.memAmt;
            this.whole.memCount = res.data.memCount;
            this.users = res.data.summaryCopyList;
          }
          this.listLoading = false;
        });
      },
      getUsers(formName){
        console.log(formName);
        
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.page = 1
            this.getList()
          }
        })
      },
      //显示编辑界面
      handleEdit: function (index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
        var pay = this.editForm.payWay;
        var state = this.editForm.status;
        if (state == 1) {
          this.editForm.status = "已支付"
        } else if (state == 3) {
          this.editForm.status = "已支付（有退款）"
        } else {
          this.editForm.status = "未知"
        }
      },
      //查询重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
    mounted() {
      this.getUsers('filters');
      lookupUser().then((res) => {
        var _this = this;
        let {
          status,
          message
        } = res;
        if (status == 200) {
          this.options = res.data.storeList;
        }
      });
    }
  }

</script>

<style scoped>


</style>
