<template>
  <d2-container>
    <template>
      <div>
        <h1>专线延迟分布统计</h1>
      </div>
      <div style="margin-bottom: 5px">
        <el-row :gutter="24" style="margin-bottom: 5px">
            <span class="demonstration">日期范围</span>
            <el-date-picker
              v-model="queryParam.dateTime"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions">
            </el-date-picker>
            <el-select v-model="queryParam.sourceNode" clearable placeholder="源节点" :style="searchBarStyle">
              <el-option
                v-for="item in sourceNodeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="queryParam.destNode" clearable placeholder="目标节点" :style="searchBarStyle">
              <el-option
                v-for="item in destNodeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button @click="fetchPnProblemListData" style="margin-left: 5px">查询</el-button>
        </el-row>
      </div>
      <div id="main" style="width: 1000px;height: 500px;"></div>
    </template>
  </d2-container>
</template>

<script>
  import echarts from 'echarts'
  import { queryPnProblemRange } from '@api/alert/pn.js'

  export default {
    name: '',
    data () {
      return {
        charts: '',
        searchBarHeadStyle: {
          display: 'inline-block',
          maxWidth: '200px'
        },
        searchBarStyle: {
          marginLeft: '5px'
        },
        sourceNodeOptions: [{
          value: 'aliyun',
          label: 'aliyun'
        }, {
          value: 'aws',
          label: 'aws'
        }],
        pickerOptions: {
          shortcuts: [{
            text: '最近7天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近15天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 15)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近30天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近60天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 60)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        destNodeOptions: [{
          value: 'VBR-backup',
          label: 'VBR-backup'
        }, {
          value: 'VBR-master',
          label: 'VBR-master'
        }, {
          value: 'ali-Z1-master',
          label: 'ali-Z1-master'
        }, {
          value: 'ali-Z2-backup',
          label: 'ali-Z2-backup'
        }, {
          value: 'aws-A1-master',
          label: 'aws-A1-master'
        }, {
          value: 'aws-A2-backup',
          label: 'aws-A2-backup'
        }, {
          value: 'aws-DX-backup',
          label: 'aws-DX-backup'
        }, {
          value: 'aws-DX-master',
          label: 'aws-DX-master'
        }, {
          value: 'aliyun',
          label: 'aliyun'
        }, {
          value: 'aws',
          label: 'aws'
        }],
        queryParam: {
          dateTime: '',
          sourceNode: '',
          destNode: ''
        },
        option: {
            title: {
                text: '专线延迟分布统计'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['平均', '100%', '99.99%', '99.95%', '99.9%', '99%', '98%']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                name: '日期',
                data: []
            },
            yAxis: {
                type: 'value',
                name: '延迟(s)'
            },
            series: [
                {
                    name: '平均',
                    type: 'line',
                    data: []
                },
                {
                    name: '100%',
                    type: 'line',
                    data: []
                },
                {
                    name: '99.99%',
                    type: 'line',
                    data: []
                },
                {
                    name: '99.95%',
                    type: 'line',
                    data: []
                },
                {
                    name: '99.9%',
                    type: 'line',
                    data: []
                },
                {
                    name: '99%',
                    type: 'line',
                    data: []
                },
                {
                    name: '98%',
                    type: 'line',
                    data: []
                }
            ]
        }
      }
    },
    mounted () {
      // this.fetchPnProblemListData()
    },
    methods: {
      initEchart (id) {
        this.option.xAxis.data = this.daylist
        this.option.series[0].data = this.valueAvg
        this.option.series[1].data = this.valueMax
        this.option.series[2].data = this.value9999Percent
        this.option.series[3].data = this.value9995Percent
        this.option.series[4].data = this.value999Percent
        this.option.series[5].data = this.value99Percent
        this.option.series[6].data = this.value98Percent
        this.charts = echarts.init(document.getElementById(id))
        this.charts.setOption(this.option)
      },
      fetchPnProblemListData () {
        this.loading = true
        let requestBody = {
          'start_time': this.queryParam.dateTime[0],
          'end_time': this.queryParam.dateTime[1],
          'source_node': this.queryParam.sourceNode,
          'node': this.queryParam.destNode
        }
        queryPnProblemRange(requestBody)
          .then(res => {
            console.log(res)
            this.daylist = res.body.LineChartData.date
            this.valueAvg = res.body.LineChartData.valueAvg
            this.valueMax = res.body.LineChartData.valueMax
            this.value9999Percent = res.body.LineChartData.value9999
            this.value9995Percent = res.body.LineChartData.value9995
            this.value999Percent = res.body.LineChartData.value999
            this.value99Percent = res.body.LineChartData.value99
            this.value98Percent = res.body.LineChartData.value98
            this.initEchart('main')
            console.log(this.daylist)
            console.log(this.valueAvg)
            console.log(this.option)
          })
      }
    }
  }
</script>
