<template>
  <div class="app-container">
    <div class="searchWrap">
      <el-input v-model="searchValue.name" placeholder="请输入姓名或者电话" />
      <el-select v-model="searchValue.school" l placeholder="请选择" :label-width="formLabelWidth">
        <el-option v-for="item in school" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>

        <el-select l v-model="searchValue.sGroup" placeholder="请选择" :label-width="formLabelWidth" >
          <el-option v-for="item in sGroup" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-input type="number" v-model.number="searchValue.sClass"  />

        <el-select l v-model="searchValue.status" placeholder="请选择" :label-width="formLabelWidth" >
          <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>

      <el-button type="success" round class="searchBtn" @click="search" size="mini">
        搜索
      </el-button>
      <!-- <el-button type="text" class="searchBtn" @click="searchValue = ''">
        清空
      </el-button> -->
      <el-button type="info" round class="searchBtn" @click="reset" size="mini"> 重置 </el-button>
    </div>
    <el-button type="primary" class="addBtn" @click="addStudentItem" >
      添加学生
    </el-button>
    <el-table class="table" :data="list" border fit highlight-current-row>
      <el-table-column type="index" width="50" />
      <el-table-column prop="name" label="姓名" width="80" />
      <el-table-column prop="phone" label="电话" width="180" />
      <el-table-column prop="sex" label="性别" width="80">
        <template slot-scope="scope">
          <el-tag :type="scope.row.sex | sexFilter">{{ scope.row.sex==0?"男":"女" }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="school" label="学校" width="180" />
      <el-table-column prop="sGroup" label="年级" width="80" />
      <el-table-column prop="sClass" label="班级" width="80" />

      <el-table-column class-name="status-col" label="是否到店" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status==1?"是":"否" }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="goDetail(scope.row)">学生详情</el-button>
          <el-button size="mini" type="success" @click="editStudentItem(scope.row)">编辑用户</el-button>
          <el-button size="mini" type="warning" @click="addStudentVision(scope.row)">添加视力信息</el-button>
          <el-button size="mini" type="danger" @click="deleteItem(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination class="pag" layout="prev, pager, next,jumper" :total="totalPage" :page-size="20" :current-page.sync="pageNum" @current-change="handleCurrentChange" />

    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="700px" :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules">
        <el-col :span="8">
          <el-form-item label="姓名:" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-radio v-model="form.sex" :label="0">男</el-radio>
            <el-radio v-model="form.sex" :label="1">女</el-radio>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="是否到店" :label-width="formLabelWidth">
            <el-radio v-model="form.status" :label="0">否</el-radio>
            <el-radio v-model="form.status" :label="1">是</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="联系电话:" prop="phone">
            <el-input v-model="form.phone" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="学校:" prop="school">
            <el-select v-model="form.school" l placeholder="请选择" :label-width="formLabelWidth">
              <el-option v-for="item in school" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="年级:" prop="sGroup">
            <el-select v-model="form.sGroup" l placeholder="请选择" :label-width="formLabelWidth">
              <el-option v-for="item in sGroup" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="班级:" prop="sClass">
            <el-input type="number" v-model="form.sClass" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>



      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addStudentInfo">确 定</el-button>
      </div>
    </el-dialog>


    <!-- 视力信息表 -->
    <el-dialog :title="title" :visible.sync="visionFormVisible" width="700px" :close-on-click-modal="false">
      <el-form :model="form" :rules="rules" ref="form">
        <el-col span="8">
          <el-form-item label="姓名:" :label-width="formLabelWidth" disabled>
            <el-input v-model="form.name" autocomplete="off" disabled />
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="性别:" :label-width="formLabelWidth" disabled>
            <el-tag :type="form.sex | sexFilter">{{ form.sex==0?"男":"女" }}</el-tag>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="是否到店:" :label-width="formLabelWidth" disabled>
            <el-tag :type="form.status | statusFilter">{{ form.status==0?"否":"是" }}</el-tag>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="学校:" prop="school">
            <el-input v-model="form.school" autocomplete="off" disabled />
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="年级:" prop="sGroup">
            <el-select l v-model="form.sGroup" placeholder="请选择" :label-width="formLabelWidth" disabled>
              <el-option v-for="item in sGroup" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="班级:" prop="sClass">
            <el-input type="number" v-model.number="form.sClass" autocomplete="off" disabled />

          </el-form-item>
        </el-col>
        <el-col span="24">
          <el-form-item label="联系电话:" prop="phone">
            <el-input type="number" v-model="form.phone" autocomplete="off" disabled></el-input>
          </el-form-item>
        </el-col>

        <el-col span="12">
          <el-form-item label="右眼裸眼" :label-width="formLabelWidth">
            <el-input type="number" v-model.Number="vision.rEye" placeholder="请输入数字" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="左眼裸眼" :label-width="formLabelWidth">
            <el-input type="number" v-model.Number="vision.lEye" placeholder="请输入数字" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="右眼屈光" :label-width="formLabelWidth">
            <el-input type="number" v-model.Number="vision.rEyeRef" placeholder="请输入数字" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="左眼屈光" :label-width="formLabelWidth">
            <el-input type="number" v-model.Number="vision.lEyeRef" placeholder="请输入数字" autocomplete="off" />
        </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="左眼度数" :label-width="formLabelWidth">
            <el-input type="number" v-model.Number="vision.lGlass" placeholder="请输入数字" autocomplete="off" />
        </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="右眼度数" :label-width="formLabelWidth">
            <el-input type="number" v-model.Number="vision.rGlass" placeholder="请输入数字" autocomplete="off" />
        </el-form-item>


        </el-col>
        <el-col span="24">
          <el-form-item label="其他" :span="24">
            <el-input v-model="vision.content" autocomplete="off"></el-input>
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
    getStudentList,
    getStudentById,
    addStudent,
    deleteStudent,
    addVision
  } from '@/api/table'

  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          '1': 'success',
          '0': 'danger'
        }
        return statusMap[status]
      },
      sexFilter(status) {
        const statusMap = {
          '0': 'primary',
          '1': 'warning'
        }
        return statusMap[status]
      }
    },
    data() {
      var checkPhone = (rule, value, callback) => {
        const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
        if (!value) {
          return callback()
        }
        setTimeout(() => {
          // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
          // 所以我就在前面加了一个+实现隐式转换

          if (!Number.isInteger(+value)) {
            callback(new Error('请输入数字值'))
          } else {
            if (phoneReg.test(value)) {
              callback()
            } else {
              callback(new Error('电话号码格式不正确'))
            }
          }
        }, 100)
      }

      return {

        rules: {
          phone: [{
            validator: checkPhone,
            trigger: 'blur'
          }]
        },
        list: [],
        pageNum: 1,
        pageSize: 20,
        totalPage: 100,
        form: {
          'sex': 0,
          "status": 0
        },
        vision: {
          'rEye': '2.0',
          'lEye': '2.0',
          'rEyeRef': '2.0',
          'lEyeRef': '2.0'
        },
        school: [{
          value: '白沙中学',
          label: '白沙中学'
        }, {
          value: '双槐树',
          label: '双槐树'
        }],
        sGroup: [{
          value: 1,
          label: '1年级'
        }, {
          value: 2,
          label: '2年级'
        },{
          value: 3,
          label: '3年级'
        }, {
          value: 4,
          label: '4年级'
        },{
          value: 5,
          label: '5年级'
        }, {
          value: 6,
          label: '6年级'
        }],
        status: [{
          value: 0,
          label: '否'
        }, {
          value: 1,
          label: '是'
        }],
        title: '',
        searchValue: {},
        formLabelWidth: 'px',
        dialogFormVisible: false,
        visionFormVisible: false
      }
    },
    created() {
      this.getStudentList()
    },
    methods: {
      goDetail(row) {
        this.$router.push({
          name: 'detail',
          query: {
            id: row.id
          }
        })
      },
      statusFormat(row, column) {
        console.log(row)
        return row.status === 1 ? '是' : '否'
      },
      search() {
        if (this.searchValue.name === '' || !this.searchValue.name) {
          return this.$message.error('请输入搜索内容')
        }
        this.getStudentList()
      },
      reset() {
        this.searchValue = {}
        this.getStudentList()
      },
      handleCurrentChange() {
        // 处理页码切换
        this.getStudentList()
      },
      deleteItem(row) {
        this.$confirm('确认删除吗?').then(() => {
          deleteStudent({
            "id": row.id
          }).then((data) => {
            if (data.code == 200) {
              this.$message.success('删除成功')
              this.getStudentList()
            }else{
              this.$message.error(data.msg);
            }
          })
        })
      },

    addStudentItem() {
      this.title = '添加'
      this.form = {
        'sex': 0,
        "status":0,
      }
      this.dialogFormVisible = true
    },
    editStudentItem(row) {
      this.title = '编辑学生'
      // 要请求一下接口回显数据
      this.form = {
        "id": row.id,
        "name": row.name,
        "phone": row.phone,
        "school": row.school,
        "sGroup": row.sGroup,
        "sClass": row.sClass,
        "sex": row.sex,
        "status": row.status
      }
      this.dialogFormVisible = true
    },

    // 添加用户确定按钮
    addStudentInfo() {
      addStudent(this.form).then((data) => {
        if (data.code === 200) {
          this.$message.success('添加成功')
          this.dialogFormVisible = false
          this.getStudentList()
        }else{
          this.$message.error(data.msg);

        }
      })
    },

    addStudentVision(row) {
      this.title = '编辑'
      this.form = row
      this.vision.sId = row.id
      // 要请求一下接口回显数据
      this.visionFormVisible = true
    },
    // 添加用户确定按钮
    addVisionInfo() {
      addVision(this.vision).then((data) => {
        if (data.code === 200) {
          this.$message.success('添加成功')
          this.vision={
            'rEye': '2.0',
            'lEye': '2.0',
            'rEyeRef': '2.0',
            'lEyeRef': '2.0',
            'rGlass': null,
            'lGlass': null
          }
          this.visionFormVisible = false
        }else{
          this.$message.error(data.msg);
        }
      })
    },
    getStudentList() {
      getStudentList({
        page: this.pageNum,
        pageSize: this.pageSize,
        search: this.searchValue
      }).then((data) => {
        if (data.code === 200) {
          this.list = data.body
        }
      })
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
