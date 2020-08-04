<template>
  <d2-container>
    <template>
      <div>
        <h1>费用账单</h1>
      </div>
      <div style="margin-bottom: 5px">
        <el-row :gutter="24" style="margin-bottom: 5px">
            <el-input v-model="queryParam.accountname" placeholder="账户名" style="display: inline-block; max-width:200px"/>
            <el-input v-model="queryParam.billingcycle" placeholder="账期" style="display: inline-block; max-width:200px"/>
            <el-input v-model="queryParam.product" placeholder="产品" style="display: inline-block; max-width:200px"/>
            <el-button @click="fetchData" style="margin-left: 5px">查询</el-button>
        </el-row>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="account_name" label="账户名"></el-table-column>
        <el-table-column prop="billing_cycle" label="账单周期" ></el-table-column>
        <el-table-column prop="product" label="产品" ></el-table-column>
        <el-table-column prop="pretax_amount" label="账单金额" ></el-table-column>
      </el-table>
    </template>
  </d2-container>
</template>

<script>
import { QueryBillOverview } from '@api/cloud/bill.js'

export default {
  data () {
    return {
      loading: false,
      tableData: [],
      options: {
        stripe: true
      },
      queryParam: {
        accountname: '',
        billingcycle: '',
        product: ''
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
      QueryBillOverview(this.queryParam.accountname, this.queryParam.billingcycle, this.queryParam.product)
        .then(res => {
          console.log(res)
          this.tableData = res.body.data
          this.loading = false
        })
    }
  }
}
</script>
