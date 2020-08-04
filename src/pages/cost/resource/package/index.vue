<template>
  <d2-container>
    <template>
      <div>
        <h1>资源包使用情况</h1>
      </div>
      <div style="margin-bottom: 5px">
        <el-row :gutter="24" style="margin-bottom: 5px">
            <el-input v-model="queryParam.packagename" placeholder="资源包名称" style="display: inline-block; max-width:200px"/>
            <el-input v-model="queryParam.packageid" placeholder="资源包id" style="display: inline-block; max-width:200px"/>
            <el-input v-model="queryParam.supportproduct" placeholder="支持的产品名" style="display: inline-block; max-width:200px"/>
            <el-select v-model="queryParam.status" clearable placeholder="资源包状态" :style="searchBarStyle">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="queryParam.deducttype" clearable placeholder="资源包类型" :style="searchBarStyle">
              <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
            <el-button @click="fetchData" style="margin-left: 5px">查询</el-button>
        </el-row>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="package_name" label="资源包名称" width="200"></el-table-column>
        <el-table-column prop="package_id" label="资源包ID" width="200"></el-table-column>
        <el-table-column prop="support_product" label="支持的产品" width="200"></el-table-column>

        <el-table-column prop="status" label="状态" width="80">
          <template slot-scope="scope">
            <el-tag disable-transitions :type="scope.row.status | getResourceStatusType ">{{
              scope.row.status | getResourceStatusText}}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="deduct_type" label="资源包类型" width="120">
          <template slot-scope="scope">
              <el-tag disable-transitions>{{scope.row.deduct_type | getResourceTypeText}}
              </el-tag>
            </template>
        </el-table-column>

        <el-table-column prop="total_amount" label="总量" width="120"></el-table-column>
        <el-table-column prop="remaining_amount" label="剩余量" width="120"></el-table-column>
        <el-table-column prop="effective_time" label="生效时间" width="160"></el-table-column>
        <el-table-column prop="expiry_time" label="失效时间" width="160"></el-table-column>
      </el-table>
    </template>
  </d2-container>
</template>

<script>
import { QueryResourcePackage } from '@api/cost/resource.js'
import { getResourceStatusType, getResourceStatusText, getResourceTypeText } from '@/filters/cost.js'

export default {
  data () {
    return {
      loading: false,
      tableData: [],
      options: {
        stripe: true
      },
      statusOptions: [{
        value: 'Available',
        label: '有效'
      }, {
        value: 'Expired',
        label: '已失效'
      }, {
        value: 'Useup',
        label: '已用尽'
      }],
      typeOptions: [{
        value: 'DeadlineAcc',
        label: '总量递减型'
      }, {
        value: 'PeriodMonthlyAcc',
        label: '包月周期型'
      }, {
        value: 'Absolute',
        label: '总量恒定型'
      }],
      queryParam: {
        packagename: '',
        packageid: '',
        status: 'Available',
        deducttype: '',
        supportproduct: ''
      }
    }
  },
  name: 'xxxx',
  props: [],
  mounted () {
    this.fetchData()
  },
  filters: {
    getResourceStatusType,
    getResourceStatusText,
    getResourceTypeText
  },
  methods: {
    fetchData () {
      this.loading = true
      QueryResourcePackage(this.queryParam.packagename, this.queryParam.packageid, this.queryParam.status, this.queryParam.deducttype, this.queryParam.supportproduct)
        .then(res => {
          console.log(res)
          this.tableData = res.body.data
          this.loading = false
        })
    }
  }
}
</script>
