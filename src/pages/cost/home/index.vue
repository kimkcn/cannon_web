<template>
  <d2-container>
    <template>
      <div>
        <h1>费用首页</h1>
      </div>
      <el-col>
        <el-tabs tab-position="top" style="height: 200px;">
          <el-row :gutter="20">
            <el-col :span="22">
              <el-card class="box-card" shadow="never">
                <div slot="header" class="clearfix">
                  <span>每月总消费</span>
                  <el-button style="float: right; padding: 3px 0" type="text" @click="fetchMonthCostListData">刷新</el-button>
                </div>
                <div id="main" style="width: 1000px;height: 500px;"></div>
              </el-card>
            </el-col>
          </el-row>
        </el-tabs>
      </el-col>
    </template>
  </d2-container>
</template>

<script>
  import echarts from 'echarts'
  import { queryMonthCostRange } from '@api/cost/bill.js'

  export default {
    name: '',
    data () {
      return {
        charts: '',
        option: {
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'line' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: [],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '总消费'
                }
            ],
            series: [
                {
                    name: '月度总消费',
                    type: 'bar',
                    barWidth: '40%',
                    label: {
                        show: true,
                        position: 'top'
                    },
                    data: []
                }
            ]
        }
      }
    },
    methods: {
      initEchart (id) {
        this.option.xAxis[0].data = this.monthList
        this.option.series[0].data = this.monthCostList
        this.charts = echarts.init(document.getElementById(id))
        this.charts.setOption(this.option)
      },
      fetchMonthCostListData () {
        queryMonthCostRange()
          .then(res => {
            console.log(res)
            this.monthCostList = res.body.month_cost_list
            this.monthList = res.body.month_list
            this.initEchart('main')
            console.log(this.monthCostList)
            console.log(this.monthList)
            console.log(this.option)
          })
      }
    },
    mounted () {
      this.fetchMonthCostListData()
    }
  }
</script>
<style scoped>
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }
</style>
