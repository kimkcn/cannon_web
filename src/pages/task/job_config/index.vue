<template>
  <d2-container>
    <template>
      <div>
        <h1>任务配置中心</h1>
      </div>
      <div style="margin-bottom: 5px">
        <el-row :gutter="24" style="margin-bottom: 5px">
            <el-input v-model="queryTaskParam.taskId" placeholder="任务id" style="display: inline-block; max-width:200px"/>
            <el-input v-model="queryTaskParam.jobId" placeholder="任务名称" style="display: inline-block; max-width:200px"/>
            <el-select v-model="queryTaskParam.status" clearable placeholder="任务状态" :style="searchBarStyle">
              <el-option
                v-for="item in StatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button @click="fetchData" style="margin-left: 5px">查询</el-button>
            <el-button @click="addItem" style="margin-left: 5px">新增</el-button>
        </el-row>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="taskId" label="任务id" width="80"></el-table-column>
        <el-table-column prop="jobId" label="任务名" width="220"></el-table-column>
        <el-table-column prop="modulePath" label="模块路径" width="220"></el-table-column>
        <el-table-column prop="className" label="类名" width="150"></el-table-column>
        <el-table-column prop="functionName" label="函数名" width="150"></el-table-column>
        <el-table-column prop="trigger" label="触发器类型" width="100"></el-table-column>
        <el-table-column prop="triggerArgs" label="触发器配置" width="150"></el-table-column>

        <el-table-column prop="status" label="任务状态" width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'info'" disable-transitions>{{scope.row.status
            === 1 ? '启用' : '禁用'}}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="runAtStartup" label="立即执行" width="100">
          <template slot-scope="scope">
            {{scope.row.runAtStartup === 1 ? '是' : '否'}}
          </template>
        </el-table-column>

        <el-table-column prop="jitter" label="偏振范围" width="100"></el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button type="warning" plain size="mini" @click="updateItem(scope.row)">编辑</el-button>
            <el-button type="danger" plain size="mini" @click="delItem(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <TaskDialog :formStatus="formTaskStatus" :formData="task" @closeTaskDialog="fetchData"></TaskDialog>
      <el-pagination background @current-change="paginationCurrentChange"
                     layout="prev, pager, next" :total="pagination.total" :current-page="pagination.currentPage" :page-size="pagination.pageSize">
      </el-pagination>
    </template>
  </d2-container>
</template>

<script>
import TaskDialog from '@/components/cannon/dialog/TaskDialog'
import { queryTaskConfigPage, deleteTaskById } from '@api/task/task.js'

export default {
  data () {
    return {
      task: {},
      formTaskStatus: {
        visible: false,
        labelWidth: '100px',
        addTitle: '新增任务配置',
        updateTitle: '更新任务配置',
        operationType: true
      },
      searchBarHeadStyle: {
        display: 'inline-block',
        maxWidth: '200px'
      },
      searchBarStyle: {
        marginLeft: '5px',
        width: '150px'
      },
      loading: false,
      tableData: [],
      pagination: {
        currentPage: 1,
        pageSize: 20,
        total: 0
      },
      StatusOptions: [{
        value: 1,
        label: '启用'
      }, {
        value: 0,
        label: '禁用'
      }],
      options: {
        stripe: true
      },
      queryTaskParam: {
        taskId: '',
        jobId: '',
        status: ''
      }
    }
  },
  name: 'xxxx',
  props: [],
  mounted () {
    this.fetchData()
  },
  components: {
    TaskDialog
  },
  methods: {
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData()
    },
    handleClick () {
      this.$emit('input', !this.value)
    },
    delItem (row) {
      this.$confirm('确认删除' + row.jobId + '的配置么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(() => {
        deleteTaskById(row.taskId).then(res => {
          this.fetchData()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    addItem () {
      this.formTaskStatus.operationType = true
      this.formTaskStatus.visible = true
      this.task = {
        taskId: '',
        jobId: '',
        modulePath: '',
        className: '',
        functionName: '',
        trigger: 'crontab',
        triggerArgs: '',
        runAtStartup: 0,
        jitter: 0,
        status: 0
      }
    },
    updateItem (row) {
      console.log(row)
      this.task = Object.assign({}, row)
      this.formTaskStatus.operationType = false
      this.formTaskStatus.visible = true
    },
    fetchData () {
      this.loading = true
      queryTaskConfigPage(this.queryTaskParam.taskId, this.queryTaskParam.jobId, this.queryTaskParam.status, this.pagination.currentPage, this.pagination.pageSize)
        .then(res => {
          console.log(res)
          this.tableData = res.body.data
          this.loading = false
        })
    }
  }
}
</script>
