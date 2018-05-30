<template>
  <section>
    <!--工具条-->
    <el-row>
      <el-form :inline="true" :model="filters">
        <el-form-item style="float:right">
          <el-button type="primary" v-on:click="getUsers" size="medium" round>查询</el-button>
          <el-button type="primary" @click="addCarousel" size="medium" round>新增轮播图</el-button>
        </el-form-item>
      </el-form>
    </el-row>

    <!--列表-->
    <div v-loading="listLoading">
      <el-table :data="users" row-key="id" border style="width: 100%">
        <el-table-column align="center" prop="id" label="ID" width="165">
        </el-table-column>
        <el-table-column align="center" prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column align="center" prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column align="center" prop="address" label="地址">
        </el-table-column>
        <el-table-column align="center"  label="拖拽" width="80">
          <template slot-scope="scope">
            <i class="icon_rank el-icon-rank"></i>
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
    <el-dialog title="新增小程序轮播图" :visible.sync="carouselDialogVisible" width="420px">
      <el-upload class="avatar-uploader" :action="uploadImage" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
        <img v-if="imageCarouselUrl" :src="imageCarouselUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="carouselDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="carouselDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
  import * as util from '../../../assets/util.js'
  import Sortable from 'sortablejs'
  import {} from '../../../api/shop';
  export default {
    data() {
      return {
        uploadImage: process.env.API_ROOT + '/pay/wxcard/uploadimg', //上传图片变量
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
          address: '上海市普陀区金沙江路 1519 弄'
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
        newList: []
      }
    },
    methods: {
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
        this.imageCarouselUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      setSort() {
        const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
        console.log(el);

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
