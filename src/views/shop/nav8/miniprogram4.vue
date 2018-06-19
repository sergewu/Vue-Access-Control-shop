<template>
  <section>
    <!--工具条-->
    <el-row>
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="请输入资讯名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="filters.newsType" placeholder="请选择文章类型">
            <el-option v-for="item in newsOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="filters.startTime" type="datetime" placeholder="选择开始日期" :picker-options="pickerOptions1" :clearable="false"
            :editable='false'>
          </el-date-picker>
        </el-form-item>
        <el-form-item>至</el-form-item>
        <el-form-item prop="endTime">
          <el-date-picker v-model="filters.endTime" type="datetime" placeholder="选择结束日期" :picker-options="pickerOptions2" :clearable="false"
            :editable='false'>
          </el-date-picker>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" v-on:click="getUsers" size="medium" round>查询</el-button>
          <el-button type="primary" @click="addCarousel" size="medium" round>新增资讯</el-button>
        </el-form-item>
      </el-form>
    </el-row>

    <!--列表-->
    <div v-loading="listLoading">
      <el-table :data="users" border row-key="id" style="width: 100%">
        <el-table-column prop="appid" label="appid" width="180">
        </el-table-column>
        <el-table-column prop="title" label="资讯名称">
        </el-table-column>
        <el-table-column prop="gmt_create" label="创建时间" :formatter="formatter_time">
        </el-table-column>
        <el-table-column prop="title_type" label="咨询类型" :formatter="formatter_title_type">
        </el-table-column>
        <el-table-column align="center" label="操作" width="165">
          <template slot-scope="scope">
            <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--工具条-->
    <el-row>
      <el-pagination layout="prev, pager, next" :current-page="page" @current-change="handleCurrentChange" :page-size="10" :total="total"
        background style="text-align:center;background:#fff;padding:15px;">
      </el-pagination>
    </el-row>
  </section>
</template>
<script>
  import * as util from '../../../util/util.js'
  import {
    queryWdMiniNews,
    deleteMiniNews
  } from '../../../api/shop';
  export default {
    data() {
      var myDate = new Date();
      return {
        //时间控制
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        pickerOptions2: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        newsOptions: [{
          value: '1',
          label: '新闻'
        }, {
          value: '2',
          label: '公告'
        }],
        addLoading: false,
        listLoading: false,
        users: [],
        page: 1,
        total: 0,
        filters: {
          startTime: new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate()),
          endTime: new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate(), 23, 59, 59),
          newsType: '',
          name: ''
        }
      }
    },
    methods: {
      formatter_title_type(row, column) {
        return row.title_type === 1 ? '新闻' : row.title_type === 2 ? '公告' : '未知'
      },
      formatter_time(row, column) {
        return util.formatDate.format(new Date(row.gmt_create), 'yyyy-MM-dd hh:mm:ss')
      },
      addCarousel() {
        this.$router.push({
          path: '/index4/miniprogram3'
        });
      },
      handleEdit(index, row) {
        this.$router.push({
          path: '/index4/miniprogram5',
          query: {
            id: row.id
          }
        });
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let para = {
            id: row.id
          }
          deleteMiniNews(para).then(res => {
            if (res.status === 200) {
              this.getUsers()
              this.$message({
                message: res.message,
                type: 'success'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleCurrentChange(val) {
        this.page = val
        this.getList()
      },
      getUsers() {
        this.page = 1
        this.getList()
      },
      getList() {
        let para = {
          page: this.page,
          title: this.filters.name,
          title_type: this.filters.newsType,
          startTime: this.filters.startTime,
          endTime: this.filters.endTime
        }
        this.listLoading = true
        para.startTime = (!para.startTime || para.startTime == '') ? '' : String(Date.parse(util.formatDate.format(new Date(
          para.startTime), 'yyyy/MM/dd hh:mm:ss'))); //开始时间
        para.endTime = (!para.endTime || para.endTime == '') ? '' : String(Date.parse(util.formatDate.format(new Date(
          para.endTime), 'yyyy/MM/dd hh:mm:ss'))); //开始时间
        queryWdMiniNews(para).then(res => {
          this.listLoading = false
          if (res.status === 200) {
            this.users = res.data.miniNewsList
            this.total = res.data.totalCount
          }
        })
      },
    },
    mounted() {
      this.getUsers()
    }
  }

</script>

<style scoped>
  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 375px;
    height: 150px;
    margin: 0 auto;
  }

  .avatar-uploader:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 375px;
    line-height: 150px;
    text-align: center;
  }

  .avatar {
    width: 375px;
    height: 150px;
  }

</style>
