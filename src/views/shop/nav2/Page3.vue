<template>
  <div>
    <el-card class="box_card">
      <div slot="header" class="clearfix">
        <span>商户简介</span>
      </div>
      <div class="main_form">
        <el-row :gutter="20">
          <el-col :span="8">
            <p>
              <span>商户信息：</span>{{profilesForm.name1}}</p>
          </el-col>
          <el-col :span="8">
            <p>
              <span>商户信息：</span>{{profilesForm.name2}}</p>
          </el-col>
          <el-col :span="8">
            <p>
              <span>商户信息：</span>{{profilesForm.name3}}</p>
          </el-col>
        </el-row>
        <div class="main_title"><span>商户费率</span></div>
        <el-row :gutter="20">
          <el-col :span="8">
            <p>
              <i class="iconfont icon-weixin"></i>
              <span>微信：</span>
              {{profilesForm.name1}}
            </p>
          </el-col>
          <el-col :span="8">
            <p>
              <span>商户信息：</span>{{profilesForm.name2}}</p>
          </el-col>
          <el-col :span="8">
            <p>
              <span>商户信息：</span>{{profilesForm.name3}}</p>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
  import * as util from '../../../util/util.js'
  // import {
  //   mermerInfoShow
  // } from '../../../api/shop';
  export default {
    data() {
      return {
        profilesForm: {
          name1: '0.01',
          name2: '西安万鼎网络西安万鼎网络西安',
          name3: '西安万鼎网络西安万鼎网络西安万鼎网络西安万鼎'
        }
      }
    },
    methods: {
      getUsers(){
        // mermerInfoShow().then((res)=>{
          
        // })
      }
    },
    mounted() {
      this.getUsers();
    }
  }

</script>
<style scoped>
  .clearfix {
    font-size: 20px;
  }
  .main_form p span {
    color: #99a9bf;
  }
  .main_title{
    border-top: 1px solid #ebeef5;
    line-height: 2.5;
    font-size: 18px;
  }
  .iconfont{
    color: #3DA53C;
    font-size: 32px;
    vertical-align:middle;
    margin:  0 10px;
  }
</style>
