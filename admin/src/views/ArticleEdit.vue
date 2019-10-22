<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- native表示原生表单；prevent阻止默认提交，不要跳转页�?-->
      <el-form-item label="所属分�?>
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor 
        v-model="model.body"
        useCustomImageHandler
        @image-added="handleImageAdded"
        ></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  props: {
    id: {}
  },
  components: { VueEditor },
  data() {
    return { 
      model: {},
      categories: [],
    }
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)
 
      const formData = new FormData();
      formData.append("file", file);
 
      const res = await this.$http.post('upload', formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },

    async save() {
      let res
      if(this.id) {
        res = await this.$http.put(`rest/articles/${this.id}`, this.model)
      } else {
        res = await this.$http.post('rest/articles', this.model)
      }
      this.$router.push('/articles/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`)
      this.model = res.data
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`)
      this.categories = res.data
    },
  },
  created() {
    this.fetchCategories()
    this.id && this.fetch() //有this.id才执行后面的fetch
  }
}
</script>

AAAAB3NzaC1yc2EAAAADAQABAAABAQC82dKdx+CULN9EJ8vO0pWncHnrnvGChm3wtbmG9OSmf9kzhywnMymJjjPzZE0eDATa4kSK2uCTgOmvJ6yqkrBmKX3gxSwphRTNWh9BFA6xujOUS2fqHpXFnOHrD5QB+J0cgpSbY+Lu9GSuZhNmNi8Mb420Tna65rQpNo6bNYl2XApDUZ61NHPragVg0LNdNFxJ97hleI6sgDYcXVPJjlOkf5klyM6wzWZfskTjjEHkQwj/q4bRwemUR2A5dUajdL7dGZo1KtBmRFZ52zzMH1o7ckLPuHQqaSXQtyVpvOrujISykmrBhG4P3IDBiSjR2mCwo5MI0M5xXB7NHxjX0YIv

wuwenwen@118.190.200.234