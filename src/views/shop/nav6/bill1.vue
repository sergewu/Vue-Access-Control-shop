<template lang="html">
  <div class="">
    <div class="bill1-top">
      <h3>交易账单</h3>
    </div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-form-item label="交易类型" prop="accountType">
          <el-radio-group v-model="ruleForm.accountType">
            <el-radio :label="0">支付</el-radio>
            <el-radio :label="1">退款</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="支付方式" prop="recsonId">
          <el-radio-group v-model="ruleForm.recsonId">
            <el-radio :label="0">微信</el-radio>
            <el-radio :label="1">支付宝</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="14">
          <el-form-item label="对账单时间" prop="resource">
            <el-date-picker
              v-model="ruleForm.startTime"
              :editable="false"
              :clearable="false"
              type="datetime"
              @change="changTime"
              :picker-options="pickerOptions1"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="2">
           <p>至</p>
        </el-col>
        <el-col :span="8">
          <el-form-item label="" prop="endTime" label-width="0px">
            <el-date-picker
              v-model="ruleForm.endTime"
              :editable="false"
              :clearable="false"
              type="datetime"
              :picker-options="pickerOptions2"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item  label="注：">
          <span style="color:#999;">如果下载出现乱码，请选择office2003打开</span>
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
  import * as util from '../../../assets/util.js'
	import { downOrderExcelNew, checkdownOrderExcelNew } from '../../../api/shop';
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
        ruleForm: {
          accountType:0,
          recsonId:0,
          startTime: new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate()-1),
          endTime: new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate()-1, 23,59,59),
        },
        rules: {
          endTime: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      changTime(date){
        let end_time = Date.parse(new Date(util.formatDate.format(new Date(this.ruleForm.endTime), 'yyyy-MM-dd'))) 
        let date_time = Date.parse(new Date(util.formatDate.format(new Date(date), 'yyyy-MM-dd'))) 
        if (date_time < end_time - 3600 * 1000 * 24 * 90) {
          this.ruleForm.endTime = ''
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let para={
              mid:sessionStorage.getItem('mid'),
              order_type:String(this.ruleForm.accountType),
              payWay:String(this.ruleForm.recsonId),
              startTime:this.ruleForm.startTime,
              endTime:this.ruleForm.endTime,
              storeId:""
            }
            para.payWay = para.payWay == 0 ? 'WX' : 'ALI';
            para.startTime = (!para.startTime || para.startTime == '') ? '' : String(Date.parse(util.formatDate.format(new Date(para.startTime), 'yyyy-MM-dd hh:mm:ss')));
            para.endTime = (!para.endTime || para.endTime == '') ? '' : String(Date.parse(util.formatDate.format(new Date(para.endTime), 'yyyy-MM-dd hh:mm:ss')));
            checkdownOrderExcelNew(para).then(res=>{
              if (res.data.status === 200) {
                window.location.href = res.data.data
              }
            })
          }
         // window.location.href=process.env.API_ROOT+"/pay/mer/downOrderExcelNew"+"?"+"order_type="+para.order_type+"&"+"payWay="+para.payWay+"&"+"startTime="+para.startTime+"&"+"endTime="+para.endTime+"&"+"storeId="+para.storeId;
        });
      },
    }
  }
</script>
<style media="screen">
  .bill1-top{
    padding: 0 25px;
    border-bottom: 1px solid #eee;
  }
  .demo-ruleForm{
    padding: 0 25px;
    width: 600px;
    margin: auto;
  }
</style>
