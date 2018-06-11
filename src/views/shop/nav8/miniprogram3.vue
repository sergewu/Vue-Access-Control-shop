<template>
  <div>
    <el-form ref="form" :inline="true" :model="postForm" label-width="80px">
      <el-row>
          <el-form-item label="文章标题">
            <el-input v-model="postForm.title"></el-input>
          </el-form-item>
          <el-form-item label="创建日期">
            <el-date-picker
              v-model="postForm.date"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item style="float:right">
            <el-button type="success" @click="submitForm">发布</el-button>
          </el-form-item>
      </el-row>
      <Tinymce ref="editor" v-model="postForm.content"></Tinymce>
    </el-form>
  </div>
</template>

<script>
  import * as util from '../../../util/util.js'
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
          date:'',
          content: '你好'
        }
      }
    },
    methods: {
      submitForm() {
        console.log(this.postForm);
        console.log('123');
        
      }
    },
    mounted() {
      console.log(this.postForm);
    }
  }
</script>