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
      <el-table-column prop="name" label="姓名" width="80" />
      <el-table-column prop="phone" label="电话" width="180" />
      <el-table-column prop="rEye" label="右眼裸眼" width="180" />
      <el-table-column prop="lEye" label="左眼裸眼" width="180" />
      <el-table-column prop="rEyeRef" label="右眼屈光" width="180" />
      <el-table-column prop="lEyeRef" label="左眼屈光" width="180" />

      <el-table-column prop="address" label="地址" />
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="editItem(scope.row)"> 编辑 </el-button>
          <el-button type="danger" @click="deleteItem(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination class="pag" layout="prev, pager, next,jumper" :total="totalPage" :page-size="20" :current-page.sync="pageNum" @current-change="handleCurrentChange" />

    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="700px">
      <el-form :model="form">
        <el-col span="12">
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="是否到店" :label-width="formLabelWidth">
            <el-radio v-model="form.status"  :label="0">未到</el-radio>
            <el-radio v-model="form.status"  :label="1">已到</el-radio>
          </el-form-item>
        </el-col>
        <el-col span="24">
          <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="form.phone" autocomplete="off" />
          </el-form-item>
        </el-col>

        <el-col span="12">
          <el-form-item label="右眼裸眼" :label-width="formLabelWidth">
            <el-input v-model="form.rEye" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="左眼裸眼" :label-width="formLabelWidth">
            <el-input v-model="form.lEye" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="右眼屈光" :label-width="formLabelWidth">
            <el-input v-model="form.rEyeRef" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="左眼屈光" :span="24">
            <el-input v-model="form.lEyeRef" autocomplete="off" />
          </el-form-item>
        </el-col>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  // todo 在 src/api/table 里定义 getList 方法
  import {
    getList
  } from '@/api/table'

  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          "1": 'success',
          "0": 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        list: [],
        pageNum: 1,
        pageSize: 20,
        totalPage: 100,
        form: {},
        title: '',
        searchValue: '',
        formLabelWidth: 'px',
        dialogFormVisible: false
      }
    },
    created() {
      this.getList()
    },
    methods: {
      search() {
        this.getList()
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
        this.list = getList({
          page: this.pageNum,
          pageSize: this.pageSize,
          key: this.searchValue,
        }).then((list) => {
          this.list = list
        })
        // this.list = [
        //   {
        //     date: '2020-1014',
        //     name: 'test',
        //     address: '测试地址',
        //     status:"到店"
        //   },
        //   {
        //     date: '2020-1014',
        //     name: 'test',
        //     address: '测试地址',
        //     status:"未到"
        //   }
        // ]
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

  .el-form-item {
    display: flex;
    padding-right: 20px;

    ::v-deep .el-form-item__label {
      text-align: right;
    }

    ::v-deep .el-form-item__content {
      flex: 1;
    }
  }
</style>
