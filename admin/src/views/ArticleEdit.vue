<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
        <el-form-item label="所属分类">
          <el-select v-model="model.categories" multiple>
            <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="model.title"></el-input>
        </el-form-item>
        <el-form-item label="详情">
          <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 富文本编辑器
import { VueEditor } from 'vue2-editor';

export default {
   name: 'CategoryEdit',
   props: {
     id: {}
   },
   data() {
       return {
          model: {},
          categories: []
       }
   },
   methods: {
     // 新建分类保存
     async save() {
         let res;
         if (this.id) {
           res = await this.$http.put(`rest/articles/${this.id}`, this.model); 
         } else {
           res = await this.$http.post('rest/articles', this.model); 
         }
         this.$message({
             type: 'success',
             message: '保存成功',
             center: true
         });
         this.$router.push('/articles/list');
         console.log(res); 
    },
    // 分类列表显示
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
    // 富文本编辑器图片上传
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append('file', file);
      const res = await this.$http.post('/upload', formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    }
   },
   created() {
     this.fetchCategories();
     this.id && this.fetch();
   },
   components: {
     VueEditor
   }
}
</script>

<style lang="less">

</style>