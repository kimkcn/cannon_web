<template>
  <d2-container>
    <template>
      <div>
        <h1>费用首页</h1>
      </div>
      <el-col>
        <el-tabs tab-position="top" style="height: 200px;">
          <el-tab-pane label="费用概览">
            <!--              页面布局-->
            <el-row :gutter="20">
              <el-col :span="8">
                <el-card class="box-card" shadow="never">
                  <div slot="header" class="clearfix">
                    <span>云平台账户余额</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="fetchAccountBalanceData">刷新</el-button>
                  </div>
                  <el-table :data="accountBalanceTableData" style="width: 100%" v-loading="balanceLoding">
                    <el-table-column prop="item_remark" label="云平台" width="120"></el-table-column>
                    <el-table-column prop="balance" label="余额" width="100"></el-table-column>
                    <el-table-column prop="record_time" label="更新时间" width="100"></el-table-column>
                  </el-table>
                </el-card>
              </el-col>
              <el-col :span="6">
                <el-card class="box-card" shadow="never">
                  <div slot="header" class="clearfix">
                    <span>每月总消费概览</span>
                  </div>
                  <div style="margin-bottom: 5px">
                    <el-row :gutter="24" style="margin-bottom: 5px">
                        <el-button @click="fetchMonthCostData" style="margin-left: 5px">刷新</el-button>
                    </el-row>
                  </div>
                  <el-table :data="monthCostTableData" style="width: 100%" v-loading="monthCostLoding">
                    <el-table-column prop="month" label="消费周期" width="100"></el-table-column>
                    <el-table-column prop="month_cost" label="消费总金额" width="100"></el-table-column>
                  </el-table>
                </el-card>
              </el-col>
              <el-col :span="9">
                <el-card class="box-card" shadow="never">
                  <div slot="header" class="clearfix">
                    <span>每月分类型消费概览</span>
                  </div>
                  <div style="margin-bottom: 5px">
                    <el-row :gutter="24" style="margin-bottom: 5px">
                      <el-select v-model="queryItemCostParam.costitemid" clearable placeholder="消费类型" :style="searchBarStyle">
                        <el-option
                          v-for="item in itemOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                        <el-input v-model="queryItemCostParam.month" placeholder="周期" style="display: inline-block; max-width:120px"/>
                        <el-button @click="fetchItemCostData" style="margin-left: 5px">查询</el-button>
                    </el-row>
                  </div>
                  <el-table :data="itemCostTableData" style="width: 100%" v-loading="itemCostLoding">
                    <el-table-column prop="item_remark" label="消费类型"></el-table-column>
                    <el-table-column prop="month" label="账单周期" width="100"></el-table-column>
                    <el-table-column prop="total_cost" label="消费金额" ></el-table-column>
                  </el-table>
                </el-card>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </template>
  </d2-container>
</template>

<script>
import { queryItemCost, queryMonthCost, queryAccountBalance } from '@api/cost/bill.js'

export default {
  data () {
    return {
      balanceLoding: false,
      accountBalanceTableData: [],
      itemCostLoding: false,
      itemCostTableData: [],
      monthCostLoding: false,
      monthCostTableData: [],
      searchBarStyle: {
        marginLeft: '5px'
      },
      options: {
        stripe: true
      },
      itemOptions: [{
        value: '1',
        label: '阿里云-主账号'
      }, {
        value: '2',
        label: '阿里云-买手账号'
      }, {
        value: '3',
        label: '腾讯云-主账号'
      }, {
        value: '4',
        label: 'AWS-主账号'
      }, {
        value: '7',
        label: '专线'
      }],
      queryItemCostParam: {
        costitemid: '',
        month: ''
      },
      queryBillOverviewParam: {
        costitemid: '',
        billingcycle: '',
        product: ''
      }
    }
  },
  name: 'xxxx',
  props: [],
  mounted () {
    this.fetchAccountBalanceData()
    this.fetchItemCostData()
    this.fetchMonthCostData()
  },
  methods: {
    fetchAccountBalanceData () {
      this.balanceLoding = true
      queryAccountBalance()
        .then(res => {
          console.log(res)
          this.accountBalanceTableData = res.body.data
          this.balanceLoding = false
        })
    },
    fetchMonthCostData () {
      this.monthCostLoding = true
      queryMonthCost()
        .then(res => {
          console.log(res)
          this.monthCostTableData = res.body.data
          this.monthCostLoding = false
        })
    },
    fetchItemCostData () {
      this.itemCostLoding = true
      queryItemCost(this.queryItemCostParam.costitemid, this.queryItemCostParam.month)
        .then(res => {
          console.log(res)
          this.itemCostTableData = res.body.data
          this.itemCostLoding = false
        })
    }
  }
}
</script>

<style>
  .table-expand {
    font-size: 0;
  }

  .table-expand label {
    width: 150px;
    color: #99a9bf;
  }

  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  /*.el-row {*/
  /*  margin-bottom: 20px;*/
  /*&*/
  /*:last-child {*/
  /*  margin-bottom: 0;*/
  /*}*/

  /*}*/

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
