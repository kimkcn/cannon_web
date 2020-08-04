<template>
  <d2-container>
    <template>
      <div>
        <h1>产品消费详单</h1>
      </div>
      <el-col>
        <el-tabs tab-position="top" style="height: 200px;">
          <el-tab-pane label="消费详情">
            <!--              页面布局-->
            <el-row :gutter="20">
              <el-col :span="14">
                <el-card class="box-card" shadow="never">
                  <div style="margin-bottom: 5px">
                    <el-row :gutter="24" style="margin-bottom: 5px">
                        <el-select v-model="queryProductBillParam.costitemid" clearable placeholder="账号" :style="searchBarStyle">
                          <el-option
                            v-for="item in itemOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                        <el-input v-model="queryProductBillParam.billingcycle" placeholder="账单周期" style="display: inline-block; max-width:150px"/>
                        <el-input v-model="queryProductBillParam.product" placeholder="产品" style="display: inline-block; max-width:150px"/>
                        <el-button @click="fetchProductBillData" style="margin-left: 5px">查询</el-button>
                    </el-row>
                  </div>
                  <el-table :data="productBillTableData" style="width: 100%" v-loading="billLoading">
                    <el-table-column prop="item_remark" label="账号"></el-table-column>
                    <el-table-column prop="billing_cycle" label="账单周期" ></el-table-column>
                    <el-table-column prop="product" label="产品" ></el-table-column>
                    <el-table-column prop="pretax_amount" label="账单金额" ></el-table-column>
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
import { queryBillOverview } from '@api/cost/bill.js'

export default {
  data () {
    return {
      billLoading: false,
      productBillTableData: [],
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
      }],
      queryProductBillParam: {
        costitemid: '',
        billingcycle: '',
        product: ''
      }
    }
  },
  name: 'xxxx',
  props: [],
  mounted () {
    this.fetchProductBillData()
  },
  methods: {
    fetchProductBillData () {
      this.billLoading = true
      queryBillOverview(this.queryProductBillParam.costitemid, this.queryProductBillParam.billingcycle, this.queryProductBillParam.product)
        .then(res => {
          console.log(res)
          this.productBillTableData = res.body.data
          this.billLoading = false
        })
    }
  }
}
</script>
