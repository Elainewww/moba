<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- native表示原生表单；prevent阻止默认提交，不要跳转页面 -->
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return { 
      model: {}
    }
  },
  methods: {
    async save() {
      let res
      if(this.id) {
        res = await this.$http.put(`categories/${this.id}`, this.model)
      } else {
        res = await this.$http.post('categories', this.model)
      }
      this.$router.push('/categories/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch() {
      const res = await this.$http.get(`categories/${this.id}`)
      this.model = res.data
    }
  },
  created() {
    this.id && this.fetch() //有this.id才执行后面的fetch
  }
}
</script>
