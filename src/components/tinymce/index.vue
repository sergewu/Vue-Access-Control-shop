<template>
  <div>
    <textarea id="mytextarea">Hello, World!</textarea>
  </div>
</template>
<script>
import plugins from './plugins';
import toolbar from "./toolbar";
import images_upload_handler from "./images_upload_handler";
export default {
    name: 'tinymce',
    data() {
      return {

      }
    },
    methods: {
      initTinymce() {
        tinymce.init({
          selector: '#mytextarea',
          language: 'zh_CN',
          height: 450,
          fontsize_formats: '8pt 10pt 11pt 12pt 14pt 18pt 24pt 36pt',
          images_upload_handler: images_upload_handler,
          plugins: plugins,
          toolbar: toolbar
        });
      }
    },
    mounted() {
      this.initTinymce()
    }
}
</script>
