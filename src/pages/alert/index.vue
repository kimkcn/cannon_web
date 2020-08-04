<template>
  <d2-container>
    <template>
      <div>
        <h1>告警详情</h1>
      </div>
      <div style="margin-bottom: 5px">
        <el-row :gutter="24" style="margin-bottom: 5px">
            <el-input v-model="queryAlertParam.alertfrom" placeholder="来源" style="display: inline-block; max-width:200px"/>
            <el-input v-model="queryAlertParam.product" placeholder="产品" style="display: inline-block; max-width:200px"/>
            <el-select v-model="queryAlertParam.level" clearable placeholder="级别" :style="searchBarStyle">
              <el-option
                v-for="item in LevelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="queryAlertParam.status" clearable placeholder="告警状态" :style="searchBarStyle">
              <el-option
                v-for="item in StatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button @click="fetchData" style="margin-left: 5px">查询</el-button>
        </el-row>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="alert_from" label="来源" width="60"></el-table-column>
        <el-table-column prop="production" label="产品" width="50"></el-table-column>
        <el-table-column prop="resource" label="资源信息" width="300"></el-table-column>
        <el-table-column prop="priority" label="级别" width="50"></el-table-column>
        <el-table-column prop="alert_state" label="当前状态" width="50"></el-table-column>
        <el-table-column prop="alert_detail" label="告警详情" width="250"></el-table-column>
        <el-table-column prop="expression" label="表达式" width="120"></el-table-column>
        <el-table-column prop="value" label="数值" width="50"></el-table-column>
        <el-table-column prop="start_time" label="开始时间" width="120"></el-table-column>
        <el-table-column prop="end_time" label="结束时间" width="120"></el-table-column>
      </el-table>
      <el-pagination background @current-change="paginationCurrentChange"
                     layout="prev, pager, next" :total="pagination.total" :current-page="pagination.currentPage" :page-size="pagination.pageSize">
      </el-pagination>
    </template>
  </d2-container>
</template>

<script>
import { QueryAlertDetail } from '@api/alert/alert.js'

export default {
  data () {
    return {
      searchBarHeadStyle: {
        display: 'inline-block',
        maxWidth: '200px'
      },
      searchBarStyle: {
        marginLeft: '5px'
      },
      loading: false,
      tableData: [],
      LevelOptions: [{
        value: 1,
        label: '灾难'
      }, {
        value: 2,
        label: '严重'
      }, {
        value: 3,
        label: '一般'
      }],
      StatusOptions: [{
        value: 'ALARM',
        label: '告警'
      }, {
        value: 'OK',
        label: '恢复'
      }],
      options: {
        stripe: true
      },
      pagination: {
        currentPage: 1,
        pageSize: 20,
        total: 0
      },
      queryAlertParam: {
        alertfrom: '',
        product: '',
        level: '',
        status: 'ALARM'
      }
    }
  },
  name: 'xxxx',
  props: [],
  mounted () {
    this.fetchData()
  },
  methods: {
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData()
    },
    fetchData () {
      this.loading = true
      QueryAlertDetail(this.queryAlertParam.alertfrom, this.queryAlertParam.product, this.queryAlertParam.level, this.queryAlertParam.status, this.pagination.currentPage, this.pagination.pageSize)
        .then(res => {
          console.log(res)
          this.tableData = res.body.data
          this.pagination.total = res.body.count
          this.loading = false
        })
    }
  }
}
</script>
