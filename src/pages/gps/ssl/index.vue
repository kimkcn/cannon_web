<template>
  <d2-container>
    <template>
      <div>
        <h1>域名SSL证书有效期</h1>
      </div>
      <div style="margin-bottom: 5px">
        <el-row :gutter="24" style="margin-bottom: 5px">
            <el-input v-model="querySslParam.domainname" placeholder="子域名" style="display: inline-block; max-width:200px"/>
            <el-select v-model="querySslParam.ismatch" clearable placeholder="是否匹配" :style="searchBarStyle">
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
        <el-table-column prop="domain" label="主域名" width="200"></el-table-column>
        <el-table-column prop="domain_name" label="子域名" width="250"></el-table-column>
        <el-table-column prop="expire_date" label="到期时间" width="200"></el-table-column>
        <el-table-column prop="ssl_cn" label="证书" width="200"></el-table-column>
        <el-table-column prop="match_status" label="证书和域名是否匹配" width="150"></el-table-column>
      </el-table>
      <el-pagination background @current-change="paginationCurrentChange"
                     layout="prev, pager, next" :total="pagination.total" :current-page="pagination.currentPage" :page-size="pagination.pageSize">
      </el-pagination>
    </template>
  </d2-container>
</template>

<script>
import { QuerySslExpireDate } from '@api/gps/ssl.js'

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
        value: 'True',
        label: '匹配'
      }, {
        value: 'False',
        label: '不匹配'
      }],
      options: {
        stripe: true
      },
      pagination: {
        currentPage: 1,
        pageSize: 20,
        total: 0
      },
      querySslParam: {
        domainname: '',
        ismatch: ''
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
      QuerySslExpireDate(this.querySslParam.domainname, this.querySslParam.ismatch, this.pagination.currentPage, this.pagination.pageSize)
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
