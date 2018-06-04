<template>
  <div>
    <el-form ref="form" :model="postForm" label-width="80px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="文章标题">
            <el-input v-model="postForm.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button type="success" @click="submitForm">发布</el-button>
        </el-col>
      </el-row>
      <Tinymce ref="editor" v-model="postForm.content"></Tinymce>
    </el-form>
  </div>
</template>

<script>
  import * as util from '../../../assets/util.js'
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
          content: ''
        }
      }
    },
    methods: {
      submitForm() {
        console.log(this.postForm);
        console.log(this.$refs);
        console.log('123');
        
      }
    },
    mounted() {
      console.log(this.postForm);

    }
  }

</script>
