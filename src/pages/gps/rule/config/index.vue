<template>
  <d2-container>
    <template>
      <div>
        <h1>巡检规则配置中心</h1>
      </div>
      <div style="margin-bottom: 5px">
        <el-row :gutter="24" style="margin-bottom: 5px">
            <el-input v-model="queryParam.jobId" placeholder="任务名称" style="display: inline-block; max-width:200px"/>
            <el-button @click="fetchData" style="margin-left: 5px">查询</el-button>
            <el-button @click="addItem" style="margin-left: 5px">新增</el-button>
        </el-row>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="规则id" width="80"></el-table-column>
        <el-table-column prop="ruleName" label="规则名" width="200"></el-table-column>
        <el-table-column prop="taskInfo" label="任务" width="200">
          <template slot-scope="scope">
            <el-tag disable-transitions>{{scope.row.taskInfo.jobId}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="objectInfo" label="监控对象" width="200">
          <template slot-scope="scope">
            <el-tag disable-transitions>{{scope.row.objectInfo.objectRemarkName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="expression" label="表达式" width="200"></el-table-column>
        <el-table-column prop="level" label="级别" width="80">
          <template slot-scope="scope">
            <el-tag disable-transitions :type="scope.row.level | getLevelType ">{{
              scope.row.level | getLevelText}}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'info'" disable-transitions>{{scope.row.status
            === 1 ? '启用' : '禁用'}}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button type="warning" plain size="mini" @click="updateItem(scope.row)">编辑</el-button>
            <el-button type="danger" plain size="mini" @click="delItem(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <RuleDialog :formStatus="formStatus" ref="ruleDialog" :formData="rule" @closeRuleDialog="fetchData"></RuleDialog>
      <el-pagination background @current-change="paginationCurrentChange"
                     layout="prev, pager, next" :total="pagination.total" :current-page="pagination.currentPage" :page-size="pagination.pageSize">
      </el-pagination>
    </template>
  </d2-container>
</template>

<script>
import RuleDialog from '@/components/cannon/dialog/RuleDialog'
import { getLevelType, getLevelText } from '@/filters/gps_rule.js'
import { queryRule } from '@api/gps/rule.js'

export default {
  data () {
    return {
      rule: {},
      formStatus: {
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
      options: {
        stripe: true
      },
      queryParam: {
        jobId: ''
      }
    }
  },
  name: 'xxxx',
  props: [],
  mounted () {
    this.fetchData()
  },
  filters: {
    getLevelType,
    getLevelText
  },
  components: {
    RuleDialog
  },
  methods: {
    handleClick () {
      this.$emit('input', !this.value)
    },
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData()
    },
    delItem (row) {
      this.$confirm('确认删除规则名： ' + row.ruleName + ' 的配置么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(() => {
        deleteRuleById(row.id).then(res => {
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
      this.formStatus.operationType = true
      this.formStatus.visible = true
      this.rule = {
        ruleName: '',
        taskId: '',
        objectId: '',
        metricField: '',
        compare: '',
        referenceValue: '',
        level: '',
        status: 0
      }
    },
    updateItem (row) {
      console.log(row)
      let ruleRow = Object.assign({}, row)
      console.log(ruleRow)
      this.$refs.ruleDialog.initData(ruleRow)
      this.formStatus.operationType = false
      this.formStatus.visible = true
    },
    fetchData () {
      this.loading = true
      queryRule(this.queryParam.jobId, this.pagination.currentPage, this.pagination.pageSize)
        .then(res => {
          this.tableData = res.body.data
          this.loading = false
          console.log(this.tableData)
        })
    }
  }
}
</script>
