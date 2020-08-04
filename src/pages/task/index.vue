<template>
  <d2-container>
    <template>
      <div>
        <h1>任务执行情况</h1>
      </div>
      <div style="margin-bottom: 5px">
        <el-row :gutter="24" style="margin-bottom: 5px">
            <el-input v-model="queryTaskParam.jobid" placeholder="任务id" style="display: inline-block; max-width:200px"/>
            <el-input v-model="queryTaskParam.jobname" placeholder="任务名称" style="display: inline-block; max-width:200px"/>
            <el-select v-model="queryTaskParam.jobstatus" clearable placeholder="任务状态" :style="searchBarStyle">
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
        <el-table-column prop="job_id" label="任务id" width="150"></el-table-column>
        <el-table-column prop="job_name" label="任务名" width="150"></el-table-column>
        <el-table-column prop="job_status" label="任务状态" width="80"></el-table-column>
        <el-table-column prop="job_trigger" label="触发器信息" width="150"></el-table-column>
        <el-table-column prop="last_schedule_starttime" label="最近开始时间" width="170"></el-table-column>
        <el-table-column prop="last_schedule_endtime" label="最近结束时间" width="170"></el-table-column>
        <el-table-column prop="last_schedule_status" label="最近执行状态" width="80"></el-table-column>
        <el-table-column prop="last_schedule_result" label="最近执行结果" width="100"></el-table-column>
      </el-table>
    </template>
  </d2-container>
</template>

<script>
import { QueryTaskSchedule } from '@api/task/task.js'

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
      StatusOptions: [{
        value: 'normal',
        label: '正常'
      }, {
        value: 'pause',
        label: '暂停'
      }],
      options: {
        stripe: true
      },
      queryTaskParam: {
        jobid: '',
        jobname: '',
        jobstatus: ''
      }
    }
  },
  name: 'xxxx',
  props: [],
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.loading = true
      QueryTaskSchedule(this.queryTaskParam.jobid, this.queryTaskParam.jobname, this.queryTaskParam.jobstatus)
        .then(res => {
          console.log(res)
          this.tableData = res.body.data
          this.loading = false
        })
    }
  }
}
</script>
