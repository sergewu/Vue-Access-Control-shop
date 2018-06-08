<template lang="html">
  <div class="">
    <div class="bill1-top">
      <h3>交易账单</h3>
    </div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-form-item label="账单类型">
          <el-radio-group v-model="ruleForm.excel_type">
            <el-radio v-for="recson in optionsExcel" :label="recson.value" :key="recson.value">{{recson.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="交易类型">
          <el-radio-group v-model="ruleForm.accountType" :disabled="ruleForm.excel_type!=='od'">
            <el-radio :label="0">支付</el-radio>
            <el-radio :label="1">退款</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="支付方式">
          <el-radio-group v-model="ruleForm.recsonId">
            <el-radio v-for="recson in optionsScene" :label="recson.value" :key="recson.value">{{recson.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="选择门店">
          <el-select v-model="ruleForm.storeId" placeholder="请选择门店名称" :multiple="false" filterable remote :remote-method="remoteShop"
            :loading="selectLoading" clearable @visible-change="clickShop">
            <el-option v-for="item in storeOptions" :key="item.id" :value="item.id" :label="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="选择时间" prop="resource">
            <el-date-picker
              v-model="ruleForm.startTime"
              :editable="false"
              :clearable="false"
              :type="dateType"
              @change="changTime"
              :picker-options="pickerOptions1"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="1">
          <el-form-item label-width="0">
             至
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="" prop="endTime" label-width="0px">
            <el-date-picker
              v-model="ruleForm.endTime"
              :editable="false"
              :clearable="false"
              :type="dateType"
              :picker-options="pickerOptions2"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item  label="注：">
          <span style="color:#999;">每次下载区间最多为3个月。如果下载出现乱码，请选择office2003打开</span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即下载</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import * as util from '../../../util/util.js'
	import { downOrderExcelNew, checkdownOrderExcelNew, selectStoreList, checkDataExcel } from '../../../api/shop';
  export default {
    data() {
      var myDate = new Date();
      return {
        //时间控制
        pickerOptions1: {
          disabledDate: (time) => {
            // let startTimeOne = Date.parse(new Date(util.formatDate.format(new Date(this.ruleForm.endTime), 'yyyy-MM-dd')));
            if (time.getTime() > Date.now()) {
              return true;
            }
          }
        },
        pickerOptions2: {
          disabledDate: (time) => {
            let startTimeOne = Date.parse(new Date(util.formatDate.format(new Date(this.ruleForm.startTime), 'yyyy-MM-dd')));
            if (time.getTime() > startTimeOne + 3600 * 1000 * 24 * 90 || time.getTime() < startTimeOne - 3600 * 1000 * 24 * 1) {
              return true;
            }
          }
        },
        selectLoading:false,
        dateType:'datetime',
        //选择门店
        storeOptions: [],
        ruleForm: {
          parag:'',
          excel_type:'od',
          accountType:0,
          recsonId:'',
          storeId:'',
          startTime: new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate()-1),
          endTime: new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate()-1, 23,59,59),
        },
        rules: {
          endTime: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ]
        },
        //账单类型
        optionsExcel: [{
          value: 'od',
          label: '交易明细'
        }, {
          value: 'sd',
          label: '门店日汇总'
        }, {
          value: 'ss',
          label: '门店汇总'
        }],
        //支付方式
        optionsScene: [{
          value: '',
          label: '所有'
        }, {
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
        }]
      };
    },
  computed: {
    excel_type() {
  　　return this.ruleForm.excel_type
  　}
  },
  watch: {
    excel_type(curVal,oldVal) {
      // return curVal !== 'od' ? this.ruleForm.accountType = 0 : this.ruleForm.accountType
      if (curVal !== 'od') {
        this.ruleForm.accountType = 0
        this.dateType = 'date'
      }else{
        this.dateType = 'datetime'
      }
    }
  },
    methods: {
      changTime(date){
        let end_time = Date.parse(new Date(util.formatDate.format(new Date(this.ruleForm.endTime), 'yyyy-MM-dd'))) 
        let date_time = Date.parse(new Date(util.formatDate.format(new Date(date), 'yyyy-MM-dd'))) 
        if (date_time < end_time - 3600 * 1000 * 24 * 90) {
          this.ruleForm.endTime = ''
        }
      },
      //门店远程搜索
      clickShop: function () {
        selectStoreList().then((res) => {
          let {
            status,
            data
          } = res
          this.storeOptions = data.storeList
        })
      },
      remoteShop(query) {
        if (query !== '') {
          this.selectLoading = true;
          setTimeout(() => {
            this.selectLoading = false;
            selectStoreList({
              sname: query
            }).then((res) => {
              let {
                status,
                data
              } = res
              this.storeOptions = data.storeList
            })
          }, 200);
        } else {
          this.storeOptions = [];
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let para={
              mid:sessionStorage.getItem('mid'),
              order_type:String(this.ruleForm.accountType),
              payWay:this.ruleForm.recsonId,
              startTime:this.ruleForm.startTime,
              endTime:this.ruleForm.endTime,
              storeId:this.ruleForm.storeId,
              excel_type:this.ruleForm.excel_type
            }
            para.startTime = (!para.startTime || para.startTime == '') ? '' : String(Date.parse(util.formatDate.format(new Date(para.startTime), 'yyyy-MM-dd hh:mm:ss')));
            para.endTime = (!para.endTime || para.endTime == '') ? '' : String(Date.parse(util.formatDate.format(new Date(para.endTime), 'yyyy-MM-dd hh:mm:ss')));
            checkDataExcel(para).then(res=>{
              if (res.data.status === 200) {
                window.location.href = res.data.data
              }
            })
          }
        });
      },
    }
  }
</script>
<style media="screen">
  .bill1-top{
    padding: 0 25px;
    border-bottom: 1px solid #eee;
    margin-bottom: 15px;
  }
  .demo-ruleForm{
    padding: 0 25px;
    width: 650px;
    margin: auto;
  }
</style>
