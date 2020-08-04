<template>
  <d2-container>
    <template>
      <div>
        <h1>专线可用性问题</h1>
      </div>
      <div style="margin-bottom: 5px">
        <el-row :gutter="24" style="margin-bottom: 5px">
            <el-button @click="fetchPnProblemData" style="margin-left: 5px">查询</el-button>
        </el-row>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="node" label="节点" width="160"></el-table-column>
        <el-table-column prop="problem_type" label="问题类型" width="100"></el-table-column>
        <el-table-column prop="duration" label="持续时间" width="80"></el-table-column>
        <el-table-column prop="clock" label="开始时间" width="160"></el-table-column>
        <el-table-column prop="r_clock" label="结束时间" width="160"></el-table-column>
      </el-table>
    </template>
  </d2-container>
</template>

<script>
import { queryPnProblem } from '@api/pn/problem.js'

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
      options: {
        stripe: true
      },
      queryPnProblemParam: {
        node: '',
        start_time: '2020-05-01 00:00:00',
        end_time: '2020-05-25 00:00:00',
        problem_type: '',
        duration: ''
      }
    }
  },
  name: 'xxxx',
  props: [],
  mounted () {
    this.fetchPnProblemData()
  },
  methods: {
    fetchPnProblemData () {
      this.loading = true
      var requestBody = {
        'node': this.queryPnProblemParam.node,
        'start_time': this.queryPnProblemParam.start_time,
        'end_time': this.queryPnProblemParam.end_time,
        'problem_type': this.queryPnProblemParam.problem_type,
        'duration': this.queryPnProblemParam.duration
      }
      queryPnProblem(requestBody)
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
