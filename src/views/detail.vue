<template>
  <div class="app-container">

    <div class="btns">
      <el-button type="success" plain @click="back"> 返回上一页 </el-button>

      <el-button type="primary" class="addBtn" @click="addVisionItem">
        添加记录
      </el-button>
      <el-button type="primary" class="export" @click="handleExport">
        导出
      </el-button>
    </div>

    <el-form ref="form" class="detail_form" :model="form">
      <el-col :span="6">
        <el-form-item label="姓名:" :label-width="formLabelWidth" disabled>
          {{
            form.name
          }}
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="性别" :label-width="formLabelWidth" disabled>
          <el-tag :type="form.sex | sexFilter">{{
            form.sex == 0 ? "男" : "女"
          }}</el-tag>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="联系电话:" prop="phone">
          {{
            form.phone
          }}
        </el-form-item>
      </el-col>
      <el-col :span="6" />
      <el-col :span="6">
        <el-form-item label="学校:" prop="school">
          {{
            form.school
          }}
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="年级:" prop="sGroup">
          {{
            form.sGroup
          }}
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="班级:" prop="sClass">
          {{
            form.sClass
          }}
        </el-form-item>
      </el-col>

      <el-col :span="6">
        <el-form-item
          label="是否到店:"
          :label-width="formLabelWidth"
          disabled
        >
          <el-tag :type="form.status | statusFilter">{{
            form.status == 0 ? "否" : "是"
          }}</el-tag>
        </el-form-item>
      </el-col>
    </el-form>

    <div class="table">
      <el-table class="table" :data="list" border fit highlight-current-row>
        <el-table-column type="index" width="50" />
        <el-table-column prop="rEye" label="右眼裸眼" width="80" />
        <el-table-column prop="lEye" label="左眼裸眼" width="80" />
        <el-table-column prop="rEyeRef" label="右眼屈光" width="80" />
        <el-table-column prop="lEyeRef" label="左眼屈光" width="80" />
        <el-table-column prop="rGlass" label="右眼度数" width="80" />
        <el-table-column prop="lGlass" label="左眼度数" width="80" />
        <el-table-column prop="content" label="其他" width="400" />
        <el-table-column
          prop="createTime"
          label="创建时间"
          :formatter="dateFormat"
          width="160"
        />
        <el-table-column
          prop="updateTime"
          label="更新时间"
          :formatter="dateFormat"
          width="160"
        />

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="editItem(scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteItem(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      class="pag"
      layout="prev, pager, next,jumper"
      :total="totalPage"
      :page-size="20"
      :current-page.sync="pageNum"
      @current-change="handleCurrentChange"
    />
    <!-- 视力信息表 -->
    <el-dialog
      :title="title"
      :visible.sync="visionFormVisible"
      width="700px"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form">
        <el-col :span="12">
          <el-form-item label="右眼裸眼" :label-width="formLabelWidth">
            <el-input
              v-model.Number="vision.rEye"
              type="number"
              placeholder="请输入数字"
              autocomplete="off"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="左眼裸眼" :label-width="formLabelWidth">
            <el-input
              v-model.Number="vision.lEye"
              type="number"
              placeholder="请输入数字"
              autocomplete="off"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="右眼屈光" :label-width="formLabelWidth">
            <el-input
              v-model.Number="vision.rEyeRef"
              type="number"
              placeholder="请输入数字"
              autocomplete="off"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="左眼屈光" :label-width="formLabelWidth">
            <el-input
              v-model.Number="vision.lEyeRef"
              type="number"
              placeholder="请输入数字"
              autocomplete="off"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="右眼度数" :label-width="formLabelWidth">
            <el-input
              v-model.Number="vision.rGlass"
              type="number"
              placeholder="请输入数字"
              autocomplete="off"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="左眼度数" :label-width="formLabelWidth">
            <el-input
              v-model.Number="vision.lGlass"
              type="number"
              placeholder="请输入数字"
              autocomplete="off"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="其他" ::span="24">
            <el-input v-model="vision.content" autocomplete="off" />
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visionFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addVisionInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// todo 在 src/api/table 里定义 getStudentList 方法
import {
  getVision,
  getStudentById,
  addVision,
  deleteVision
} from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        0: 'danger'
      }
      return statusMap[status]
    },
    sexFilter(status) {
      const statusMap = {
        0: 'primary',
        1: 'warning'
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
      vision: {
        rEye: '2.0',
        lEye: '2.0',
        rEyeRef: '2.0',
        lEyeRef: '2.0',
        rGlass: null,
        lGlass: null
      },
      school: [
        {
          value: '白沙中学',
          label: '白沙中学'
        },
        {
          value: '双槐树',
          label: '双槐树'
        }
      ],
      sGroup: [
        {
          value: 1,
          label: '1年级'
        },
        {
          value: 2,
          label: '2年级'
        }
      ],
      title: '',
      searchValue: {},
      formLabelWidth: 'px',
      visionFormVisible: false
    }
  },
  created() {
    this.getList()
    this.getStudentInfo()
  },
  methods: {
    back() {
      this.$router.go(-1) // 返回上一层
    },
    dateFormat: function(row, column) {
      const data = row[column.property]

      if (data == null) {
        return null
      }
      const dt = new Date(data)
      const yyyy = dt.getFullYear()
      const MM = (dt.getMonth() + 1).toString().padStart(2, '0')
      const dd = dt.getDate().toString().padStart(2, '0')
      const h = dt.getHours().toString().padStart(2, '0')
      const m = dt.getMinutes().toString().padStart(2, '0')
      const s = dt.getSeconds().toString().padStart(2, '0')
      return yyyy + '-' + MM + '-' + dd + ' ' + h + ':' + m + ':' + s
    },
    statusFormat(row, column) {
      return row.status === 1 ? '是' : '否'
    },
    handleCurrentChange() {
      // 处理页码切换
      this.getList()
    },
    deleteItem(row) {
      this.$confirm('确认删除吗?').then(() => {
        deleteVision({
          id: row.id
        }).then((data) => {
          if (data.code === 200) {
            this.$message.success('删除成功')
            this.getList()
          } else {
            this.$message.error(data.msg)
          }
        })
      })
    },

    editItem(row) {
      this.title = '编辑学生'
      // 要请求一下接口回显数据
      this.vision = {
        id: row.id,
        sId: row.sId,
        rEye: row.rEye,
        lEye: row.lEye,
        rEyeRef: row.rEyeRef,
        lEyeRef: row.lEyeRef,
        rGlass: row.rGlass,
        lGlass: row.lGlass,
        content: row.content
      }
      this.visionFormVisible = true
    },

    addVisionItem(row) {
      this.title = '编辑'
      this.vision.sId = this.$route.query.id
      // 要请求一下接口回显数据
      this.visionFormVisible = true
    },
    // 添加用户确定按钮
    addVisionInfo() {
      addVision(this.vision).then((data) => {
        if (data.code === 200) {
          this.$message.success('添加成功')

          this.vision = {
            rEye: '2.0',
            lEye: '2.0',
            rEyeRef: '2.0',
            lEyeRef: '2.0',
            rGlass: null,
            lGlass: null
          }
          this.visionFormVisible = false
          this.getList()
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    getList() {
      getVision({
        sId: this.$route.query.id,
        page: this.pageNum,
        pageSize: this.pageSize
      }).then((data) => {
        if (data.code === 200) {
          this.list = data.body
        }
      })
    },
    getStudentInfo() {
      getStudentById({
        id: this.$route.query.id
      }).then((data) => {
        if (data.code === 200) {
          this.form = data.body
        }
      })
    },
    handleExport() {
      // tode 导出
      // this.$store.commit('app/CLOSE_SIDEBAR', true)
      // setTimeout(() => {
      //   window.print()
      // }, 100)
    }
  }
}
</script>
<style lang="scss" scoped>
.detail_form {
  height: 100px;
}

.export,.addBtn {
  float: right;
}

.export {
  width: 100px;
}

.table {
  margin-top: 40px;
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

.btns {
  // display: flex;
  // width: 100%;
  // justify-content: space-between;
  margin-bottom: 20px;
}
</style>
