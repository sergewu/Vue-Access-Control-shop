<template>
  <section>
    <!--工具条-->
    <el-row>
      <el-form :inline="true" :model="filters">
        <el-form-item style="float:right">
          <el-button type="primary" v-on:click="getUsers" size="medium" round>查询</el-button>
          <el-button type="primary" @click="addCarousel" size="medium" round>新增导航</el-button>
        </el-form-item>
      </el-form>
    </el-row>

    <!--列表-->
    <div v-loading="listLoading">
      <el-table :data="users" row-key="id" border style="width: 100%">
        <el-table-column align="center" prop="id" label="ID" width="165">
        </el-table-column>
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
        <el-table-column align="center"  label="拖拽" width="80">
          <template slot-scope="scope">
            <i class="icon_rank el-icon-rank"></i>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="160">
          <template slot-scope="scope">
            <el-button type="primary" round size="mini">修改</el-button>
            <el-button type="danger" round size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class='show-d'>{{oldList}}</div>
      <div class='show-d'>{{newList}}</div>
    </div>
    <!--工具条-->
    <el-row>
      <el-pagination layout="prev, pager, next" :current-page="page" @current-change="handleCurrentChange" :page-size="20" :total="total"
        background style="text-align:center;background:#fff;padding:15px;">
      </el-pagination>
    </el-row>
    <el-dialog title="新增小程序导航" :visible.sync="carouselDialogVisible" width="650px">
      <el-form :model="carouseForm" ref="carouseForm" label-width="80px" label-position="left">
        <el-form-item label="导航Icon" prop="imageCarouselUrl" :rules="[
          { required: true, message: '导航Icon不能为空'}
        ]">
          <el-upload class="avatar-uploader" :action="uploadimg" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="carouseForm.imageCarouselUrl" :src="carouseForm.imageCarouselUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item> 
        <el-form-item label="导航Url" prop="url" :rules="[
          { required: true, message: '导航Url不能为空'}
        ]">
          <el-input placeholder="请输入导航超链接" v-model="carouseForm.url">
            <template slot="prepend">Https://</template>
          </el-input>
        </el-form-item>
        <el-form-item label="导航Title" prop="title" :rules="[
          { required: true, message: '导航标题不能为空'},
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]">
          <el-input placeholder="请输入导航标题" v-model="carouseForm.title"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="carouselDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="carouselSubmit('carouseForm')">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
  import * as util from '../../../assets/util.js'
  import Sortable from 'sortablejs'
  import { uploadimg } from '../../../api/shop';
  export default {
    data() {
      return {
        uploadimg: uploadimg,
        filters: {},
        addLoading: false,
        listLoading: false,
        users: [{
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄是的复苏的复苏的分'
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        page: 1,
        total: 0,
        carouselDialogVisible: false,
        imageCarouselUrl: '',
        oldList: [],
        newList: [],
        carouseForm: {
          imageCarouselUrl: '',
          url: '',
          title: ''
        }
      }
    },
    methods: {
      carouselSubmit(carouseForm) {
        this.$refs[carouseForm].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleCurrentChange() {

      },
      getUsers() {
        this.oldList = this.users.map(v => v.id)
        this.newList = this.oldList.slice()
        this.$nextTick(() => {
          this.setSort()
        })
      },
      addCarousel() {
        this.carouselDialogVisible = true
      },
      handleAvatarSuccess(res, file) {
        this.carouseForm.imageCarouselUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        console.log(file);
        
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt1M = file.size / 1024 / 1024 < 1;
        
        if (!isJPG) {
          this.$message.error('上传头像只能是 JPG 或 PNG 格式!');
        }
        if (!isLt1M) {
          this.$message.error('上传头像大小不能超过 1MB!');
        }
        return isJPG && isLt1M;
      },
      setSort() {
        const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
        this.sortable = Sortable.create(el, {
          ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
          setData: function (dataTransfer) {
            dataTransfer.setData('Text', '')
            // to avoid Firefox bug
            // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          },
          onEnd: evt => {
            const targetRow = this.users.splice(evt.oldIndex, 1)[0]
            this.users.splice(evt.newIndex, 0, targetRow)
            // for show the changes, you can delete in you code
            const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
            this.newList.splice(evt.newIndex, 0, tempIndex)
          }
        })
      }
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
    width: 55px;
    height: 55px;
  }

  .avatar-uploader:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 55px;
    line-height: 55px;
    text-align: center;
  }

  .avatar {
    width: 55px;
    height: 55px;
  }


  .icon-star {
    margin-right: 2px;
  }

  .drag-handler {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .show-d {
    margin-top: 15px;
  }
  .icon_rank{
    /* font-size: 20px; */
    font-weight: bold;
  }
</style>
<style>
  .sortable-ghost {
    opacity: .8;
    color: #fff !important;
    background: #409EFF !important;
  }

</style>
