<template>
  <div>
    <el-card>
      <h1>文章列表</h1>
      <el-table :data="items.slice((currentPage - 1) * pagesize, currentPage * pagesize)" border stripe> 
       <el-table-column prop="_id" label="ID" type="index" width="230"></el-table-column>
       <el-table-column prop="title" label="标题"></el-table-column>
       <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="remove(scope.row)" type="danger" icon="el-icon-delete" size="small">删除</el-button>
          <el-button type="primary" size="small" icon="el-icon-edit" @click="$router.push(`/articles/edit/${scope.row._id}`)">编辑</el-button>
        </template>
       </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="items.length" style="margin-top: 1.5rem;"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'CategoryList',
  data() {
    return {
        items: [],
        currentPage: 1,
        pagesize: 5,
    }
  }, 
  methods: {
    // 显示分类列表详情
    async fetch() {
      const res = await this.$http.get('rest/articles')
      this.items = res.data  
    },
    // 删除
    async remove(row) {
       this.$confirm(`是否确定要删除文章 "${row.title}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http.delete(`rest/articles/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch();
        });
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (newSize) {
      this.pagesize = newSize;
      this.fetch();
      // console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function (newPage) {
      this.currentPage = newPage;
      this.fetch();
      // console.log(this.currentPage); //点击第几页
    },
  },
  created() {
    this.fetch();
  }
}
</script>

<style>

</style>