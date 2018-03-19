<template>
	<section>
			<el-row :span="24" style="padding-left:10px;">
				<el-form :inline="true" :model="whole">
					<el-tag type="primary" style="margin:10px 10px 20px 0;">会员余额总计（元）：{{whole.countAmt}}元</el-tag>
					<el-tag type="primary" style="margin:10px 10px 20px 0;">会员数量：{{whole.countRow}}</el-tag>
				</el-form>
			</el-row>
		<!--工具条-->
		<el-row :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
          <el-date-picker
            v-model="filters.startTime"
            :editable="false"
            :clearable="false"
            popper-class="startTime"
						:picker-options="pickerOptions"
            placeholder="选择日期">
          </el-date-picker>
				</el-form-item>
				<el-tag type="gray">注：不能统计当天数据</el-tag>
				<el-form-item style="float:right">
					<el-button type="primary" v-on:click="getUsers" size="medium" round>查询</el-button>
				</el-form-item>
			</el-form>
		</el-row>

		<!--列表-->
		<el-table border :data="users" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="account_name" label="付款人">
			</el-table-column>
			<el-table-column prop="account_num" label="会员卡号">
			</el-table-column>
			<el-table-column prop="account_balance" label="账户余额">
			</el-table-column>
			<el-table-column prop="creat_time" label="统计时间" :formatter="creat_stamp">
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
	</section>
</template>

<script>
	import * as util from '../../../assets/util.js'
	//
	import { queryBalance } from '../../../api/shop';
	export default {
		data() {
      var myDate = new Date();
			return {
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now() - 8.64e7;
					}
				},
				filters: {
					startTime: myDate - 8.64e7,
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				//选择款台
				options: [],
				whole: {
					countAmt: "",
					countRow: ""
				},
			}
		},
		methods: {
			//时间显示转换
			creat_stamp: function (row, column) {
				return row.creat_time = util.formatDate.format(new Date(row.creat_time), 'yyyy-MM-dd');
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				let para = {
					pageNum: String(this.page),
					startTime:this.filters.startTime,
          endTime:this.filters.startTime,
				};
        para.startTime = (!para.startTime || para.startTime == '') ? '' : String(util.formatDate.format(new Date(para.startTime), 'yyyy-MM-dd'));//开始时间
        para.endTime = (!para.endTime || para.endTime == '') ? '' : String(util.formatDate.format(new Date(para.endTime), 'yyyy-MM-dd'));//开始时间
				this.listLoading = true;
				//
				queryBalance(para).then((res) => {
					this.total = res.data.totalCount;
					this.users = res.data.balanceList;
					this.whole.countRow = res.data.countRow;
					this.whole.countAmt = res.data.countAmt;
					this.listLoading = false;
					//
				});
			},
			selsChange: function (sels) {
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
