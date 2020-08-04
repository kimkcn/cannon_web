<template>
  <el-dialog :title="formStatus.operationType ? formStatus.addTitle : formStatus.updateTitle"
             :visible.sync="formStatus.visible">
    <el-form :model="formData">
      <el-form-item label="规则名" :label-width="formStatus.labelWidth" :required="true">
        <el-input v-model="formData.ruleName" placeholder="规则名称,可以是中文"></el-input>
      </el-form-item>
    </el-form>
    <el-form :model="formData">
      <el-form-item label="任务名" :label-width="formStatus.labelWidth" :required="true">
        <el-select v-model="formData.taskId" filterable clearable
        remote reserve-keyword placeholder="输入搜索任务名" @change="initObjectInfo" :remote-method="getTaskConfig" :loading="loading" style="width:250px">
          <el-option
            v-for="item in taskIdOptions"
            :key="item.taskId"
            :label="item.jobId"
            :value="item.taskId">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-form :model="formData">
      <el-form-item label="对象" :label-width="formStatus.labelWidth" :required="true">
        <el-select v-model="formData.objectType" clearable placeholder="选择对象类型" :style="searchBarStyle">
          <el-option
            v-for="item in ObjectTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="formData.objectId" filterable clearable placeholder="选择对象名" :style="searchBarStyle" :disabled="formData.objectType === ''">
          <el-option
            v-for="item in ObjectOptions"
            :key="item.task_id"
            :label="item.object_remark_name"
            :value="item.task_id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template>
      <el-form :model="formData" :inline="true">
        <el-form-item label="表达式" :label-width="formStatus.labelWidth" :required="true">
          <el-input v-model="formData.metricFiled" placeholder="字段名称" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="" :label-width="formStatus.labelWidth" :required="true">
          <el-select v-model="formData.compare" clearable placeholder="运算符" :style="searchBarStyle">
            <el-option
              v-for="item in CompareOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" :label-width="formStatus.labelWidth" :required="true">
          <el-input v-model="formData.referenceValue" placeholder="阈值" style="width:150px"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <el-form :model="formData">
      <el-form-item label="级别" :label-width="formStatus.labelWidth" :required="true">
        <el-select v-model="formData.ruleLevel" clearable placeholder="请选择" :style="searchBarStyle">
          <el-option
            v-for="item in LevelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-form :model="formData">
      <el-form-item label="任务状态" :label-width="formStatus.labelWidth" :required="true">
        <el-radio-group v-model="formData.status">
          <el-radio-button label=1>启用</el-radio-button>
          <el-radio-button label=0>禁用</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="formStatus.visible = false">取消</el-button>
      <el-button type="primary" @click="saveInfo">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  // API
  import { addRule, updateRule, queryObjectInfoPage } from '@api/gps/rule.js'
  import { queryTaskConfigPage } from '@api/task/task.js'

  export default {
    data () {
      return {
        searchBarStyle: {
          marginLeft: '5px',
          width: '150px'
        },
        taskIdOptions: [],
        ObjectOptions: [],
        LevelOptions: [{
          value: 1,
          label: '灾难'
        }, {
          value: 2,
          label: '严重'
        }, {
          value: 3,
          label: '警告'
        }, {
          value: 4,
          label: '信息'
        }],
        ObjectTypeOptions: [{
          value: 'all',
          label: '所有对象'
        }, {
          value: 'single',
          label: '选择对象'
        }],
        CompareOptions: [{
          value: '='
        }, {
          value: '>'
        }, {
          value: '<'
        }, {
          value: '!='
        }]
      }
    },
    name: 'rule-dialog',
    props: ['formStatus', 'formData'],
    mounted () {
    },
    methods: {
      handleClick () {
        this.$emit('input', !this.value)
      },
      getTaskConfig (jobId) {
        queryTaskConfigPage('', jobId, '', 1, 10)
          .then(res => {
            this.taskIdOptions = res.body.data
          })
      },
      getObject () {
        queryObjectInfoPage(this.formData.taskId, 1, 10)
          .then(res => {
            this.ObjectOptions = res.body.data
          })
      },
      initObjectInfo () {
        this.formData.objectId = ''
        this.getObject()
      },
      saveInfo () {
        setTimeout(() => {
          var requestBody = Object.assign({}, this.formData)
          if (this.formStatus.operationType) {
            addRule(requestBody)
              .then(res => {
                // 返回数据
                this.$message({
                  message: '成功',
                  type: 'success'
                })
                this.formStatus.visible = false
                this.$emit('closeRuleDialog')
              })
          } else {
            updateRule(requestBody)
              .then(res => {
                // 返回数据
                this.$message({
                  message: '成功',
                  type: 'success'
                })
                this.formStatus.visible = false
                this.$emit('closeRuleDialog')
              })
          }
        }, 600)
      }
    }
  }
</script>
