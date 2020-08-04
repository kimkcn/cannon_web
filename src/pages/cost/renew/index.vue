<template>
  <d2-container>
    <template>
      <div>
        <h1>产品续费</h1>
      </div>
      <div style="margin-bottom: 5px">
        <el-row :gutter="24" style="margin-bottom: 5px">
            <el-select v-model="queryProductRenewParam.costitemid" clearable placeholder="云账号" :style="searchBarStyle">
              <el-option
                v-for="item in itemOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-input v-model="queryProductRenewParam.instanceid" placeholder="实例id" style="display: inline-block; max-width:200px"/>
            <el-input v-model="queryProductRenewParam.productcode" placeholder="产品" style="display: inline-block; max-width:200px"/>
            <el-select v-model="queryProductRenewParam.status" clearable placeholder="续费类型" :style="searchBarStyle">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button @click="fetchData" style="margin-left: 5px">查询</el-button>
        </el-row>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="cost_item_id" label="云账号" width="150">
          <template slot-scope="scope">
              {{scope.row.cost_item_id | getCostItemIdText}}
          </template>
        </el-table-column>
        <el-table-column prop="instance_id" label="实例id" width="200"></el-table-column>
        <el-table-column prop="instance_name" label="实例名" width="100"></el-table-column>
        <el-table-column prop="product_code" label="产品名" width="150"></el-table-column>

        <el-table-column prop="status" label="实例状态" width="100">
          <template slot-scope="scope">
            <el-tag disable-transitions :type="scope.row.status | getRenewInstanceStatusType ">{{
              scope.row.status | getRenewInstanceStatusText}}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="count_down" label="倒计时" width="100">
          <template slot-scope="scope">
              {{scope.row.count_down}} 天
          </template>
        </el-table-column>
        <el-table-column prop="end_time" label="到期时间" width="160"></el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="160"></el-table-column>
        <el-table-column prop="subscription_type" label="付费类型" width="100">
          <template slot-scope="scope">
                {{scope.row.subscription_type | getSubscriptionTypeText}}
            </template>
          </el-table-column>
        <el-table-column prop="renew_status" label="续费类型" width="100">
          <template slot-scope="scope">
              {{scope.row.renew_status | getRenewStatusText}}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @current-change="paginationCurrentChange"
                     layout="prev, pager, next" :total="pagination.total" :current-page="pagination.currentPage" :page-size="pagination.pageSize">
      </el-pagination>
    </template>
  </d2-container>
</template>

<script>
import { QueryProductRenew } from '@api/cost/renew.js'
import { getCostItemIdText } from '@/filters/cost.js'
import { getRenewInstanceStatusType, getRenewInstanceStatusText, getRenewStatusText, getSubscriptionTypeText } from '@/filters/renew.js'


export default {
  data () {
    return {
      loading: false,
      tableData: [],
      options: {
        stripe: true
      },
      pagination: {
        currentPage: 1,
        pageSize: 20,
        total: 0
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
      statusOptions: [{
        value: 'Normal',
        label: '正常'
      }, {
        value: 'Expired',
        label: '已过期'
      }, {
        value: 'Creating',
        label: '创建中'
      }],
      queryProductRenewParam: {
        costitemid: '',
        instanceid: '',
        productcode: '',
        status: ''
      }
    }
  },
  name: 'xxxx',
  props: [],
  mounted () {
    this.fetchData()
  },
  filters: {
    getRenewInstanceStatusType,
    getRenewInstanceStatusText,
    getCostItemIdText,
    getRenewStatusText,
    getSubscriptionTypeText
  },
  methods: {
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData()
    },
    fetchData () {
      this.loading = true
      QueryProductRenew(this.queryProductRenewParam.costitemid, this.queryProductRenewParam.instanceid, this.queryProductRenewParam.productcode, this.queryProductRenewParam.status, this.pagination.currentPage, this.pagination.pageSize)
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
