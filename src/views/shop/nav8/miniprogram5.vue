<template>
  <div>
    <el-form ref="postForm" :inline="true" :model="postForm" label-width="95px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="文章标题" prop="title" :rules="[
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ]">
            <el-input v-model="postForm.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="文章类型" prop="newsType"  :rules="[
          { required: true, message: '请选择文章类型', trigger: 'change' }
        ]">
            <el-select v-model="postForm.newsType" placeholder="请选择文章类型">
              <el-option v-for="item in newsOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="小程序" prop="miniinfoType"  :rules="[
            { required: true, message: '请选择小程序', trigger: 'change' }
          ]">
            <el-select v-model="postForm.miniinfoType" placeholder="请选择小程序">
              <el-option v-for="item in miniinfoOptions" :key="item.appid" :label="item.appname" :value="item.appid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="公众号链接">
            <el-input v-model="postForm.url"></el-input>
          </el-form-item>
        </el-col>
        <el-form-item style="float:right">
          <el-button type="success" @click="submitForm('postForm')">发布</el-button>
        </el-form-item>
      </el-row>
      <Tinymce ref="editor" v-model="postForm.content"></Tinymce>
    </el-form>
  </div>
</template>

<script>
  import * as util from '../../../util/util.js'
  import {
    selectInfoByMid,
    addMiniNews,
    updateMiniNews,
    getNewDetail
  } from '../../../api/shop';
  import {
    Tinymce
  } from '../../../components'
  export default {
    components: {
      Tinymce
    },
    data() {
      return {
        postForm: {
          title: '',
          newsType: '',
          miniinfoType: '',
          url: '',
          content: 'Hello,word'
        },
        newsOptions: [{
          value: '1',
          label: '新闻'
        }, {
          value: '2',
          label: '公告'
        }],
        miniinfoOptions: []
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let para = {
              id: this.$route.query.id,
              appid: this.postForm.miniinfoType,
              title: this.postForm.title,
              title_url: this.postForm.url,
              title_contents: this.postForm.content,
              title_type: this.postForm.newsType
            }
            updateMiniNews(para).then(res => {
              if (res.status === 200) {
                this.$refs[formName].resetFields();
                this.$router.push({path: '/index4/miniprogram4'});
                this.$message({
                  message: res.message,
                  type: 'success'
                });
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getNewsDetail() {
        let para = {
          id: this.$route.query.id
        }
        getNewDetail(para).then(res => {
          if (res.status === 200) {
            this.postForm.title = res.data.title
            this.postForm.newsType = String(res.data.title_type)
            this.postForm.miniinfoType = res.data.appid
            if (res.data.title_url) {
              this.postForm.url = res.data.title_url
            }else{
              this.postForm.content = res.data.title_contents
            }
          }
        })
      },
      getMiniinfo() {
        selectInfoByMid().then(res => {
          if (res.status === 200) {
            this.miniinfoOptions = res.data.miniMenu
          }
        })
      }
    },
    mounted() {
      this.getMiniinfo()
      this.getNewsDetail()
    }
  }

</script>
