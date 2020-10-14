<template>
  <div class="app-container">
    <div class="searchWrap">
      <el-input v-model="searchValue" placeholder="输入关键词即可搜索" />
      <el-button type="text" class="searchBtn" @click="search">
        搜索
      </el-button>
      <el-button type="text" class="searchBtn" @click="searchValue = ''">
        清空
      </el-button>
      <el-button type="text" class="searchBtn" @click="reset"> 重置 </el-button>
    </div>
    <el-button type="primary" class="addBtn" @click="addItem">
      添加数据
    </el-button>
    <el-table class="table" :data="list" border fit highlight-current-row>
      <el-table-column type="index" width="50" />
      <el-table-column prop="date" label="日期" width="180" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="address" label="地址" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="editItem(scope.row)"> 编辑 </el-button>
          <el-button type="danger" @click="deleteItem(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="pag"
      layout="prev, pager, next,jumper"
      :total="totalPage"
      :page-size="20"
      :current-page.sync="pageNum"
      @current-change="handleCurrentChange"
    />

    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="字段1" :label-width="formLabelWidth">
          <el-input v-model="form.filed1" autocomplete="off" />
        </el-form-item>
        <el-form-item label="字段2" :label-width="formLabelWidth">
          <el-input v-model="form.filed2" autocomplete="off" />
        </el-form-item>
        <el-form-item label="字段3" :label-width="formLabelWidth">
          <el-input v-model="form.filed3" autocomplete="off" />
        </el-form-item>
        <el-form-item label="字段4" :label-width="formLabelWidth">
          <el-input v-model="form.filed4" autocomplete="off" />
        </el-form-item>
        <el-form-item label="字段5" :label-width="formLabelWidth">
          <el-checkbox v-model="form.filed5">单选</el-checkbox>
        </el-form-item>
        <el-form-item label="字段6" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="字段5">
            <el-option label="字段5-1" value="5-1" />
            <el-option label="字段5-2" value="5-2" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogFormVisible = false"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// todo 在 src/api/table 里定义 getList 方法
// import { getList } from '@/api/table'

export default {
  data() {
    return {
      list: [],
      pageNum: 1,
      pageSize: 20,
      totalPage: 100,
      form: {},
      searchValue: '',
      formLabelWidth: '200',
      dialogFormVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    search() {
      // getList()
    },
    reset() {
      this.searchValue = ''
      // getList()
    },
    handleCurrentChange() {
      // 处理页码切换
    },
    deleteItem(row) {
      const res = this.$confirm('确认删除吗?')
      if (res) {
        // 在这里写删除的逻辑
        console.log(row)
      }
    },
    addItem() {
      this.title = '添加'
      this.dialogFormVisible = true
    },
    editItem(row) {
      this.title = '编辑'
      console.log(row)
      // 要请求一下接口回显数据

      this.dialogFormVisible = true
    },
    getList() {
      // this.list = getList().then((list) => {
      //   this.list = list
      // })
      this.list = [
        {
          date: '2020-1014',
          name: 'test',
          address: '测试地址'
        },
        {
          date: '2020-1014',
          name: 'test',
          address: '测试地址'
        },
        {
          date: '2020-1014',
          name: 'test',
          address: '测试地址'
        },
        {
          date: '2020-1014',
          name: 'test',
          address: '测试地址'
        },
        {
          date: '2020-1014',
          name: 'test',
          address: '测试地址'
        },
        {
          date: '2020-1014',
          name: 'test',
          address: '测试地址'
        },
        {
          date: '2020-1014',
          name: 'test',
          address: '测试地址'
        },
        {
          date: '2020-1014',
          name: 'test',
          address: '测试地址'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.addBtn {
  float: right;
}
.table {
  margin-top: 70px;
}
.pag {
  margin-top: 50px;
  text-align: center;
}

.searchWrap {
  .el-input {
    width: 250px;
    margin-right: 10px;
  }
  float: left;
  width: 400px;
}
</style>
