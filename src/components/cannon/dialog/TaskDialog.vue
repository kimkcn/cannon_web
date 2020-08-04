<template>
  <el-dialog :title="formStatus.operationType ? formStatus.addTitle : formStatus.updateTitle"
             :visible.sync="formStatus.visible">
    <el-form :model="formData">
      <el-form-item label="任务名" :label-width="formStatus.labelWidth" :required="true">
        <el-input v-model="formData.jobId" placeholder="非中文, 请注意全局唯一, 有效标识任务作用"></el-input>
      </el-form-item>
    </el-form>
    <el-form :model="formData">
      <el-form-item label="模块路径" :label-width="formStatus.labelWidth" :required="true">
        <el-input v-model="formData.modulePath" placeholder="模块文件的路径, 以src开始, 例如src.task.cost.query_account_balance"></el-input>
      </el-form-item>
    </el-form>
    <el-form :model="formData">
      <el-form-item label="类名" :label-width="formStatus.labelWidth">
        <el-input v-model="formData.className" placeholder="所调用代码类的名称(如果有), 不带括号, 例如ZabbixApi"></el-input>
      </el-form-item>
    </el-form>
    <el-form :model="formData">
      <el-form-item label="函数名" :label-width="formStatus.labelWidth" :required="true">
        <el-input v-model="formData.functionName" placeholder="所调用函数的名称, 不带括号, 例如query_aliyun_product_renew"></el-input>
      </el-form-item>
    </el-form>
    <el-form :model="formData">
      <el-form-item label="调度方式" :label-width="formStatus.labelWidth" :required="true">
        <el-select v-model="formData.trigger" clearable placeholder="请选择" :style="searchBarStyle">
          <el-option
            v-for="item in TriggerOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-form :model="formData">
      <el-form-item label="调度参数" :label-width="formStatus.labelWidth" :required="true">
        <el-input v-model="formData.triggerArgs" placeholder="crontab格式, 例如1 * * * *" style="width:350px"></el-input>
      </el-form-item>
    </el-form>
    <el-form :model="formData">
      <el-form-item label="立即执行" :label-width="formStatus.labelWidth" :required="true">
        <el-radio-group v-model="formData.runAtStartup">
          <el-radio-button label=1>是</el-radio-button>
          <el-radio-button label=0>否</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <el-form :model="formData">
      <el-form-item label="偏振范围" :label-width="formStatus.labelWidth">
        <el-input v-model="formData.jitter" placeholder="输入秒数" style="width:120px"></el-input> 秒
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
  import { addTask, updateTask } from '@api/task/task.js'

  export default {
    data () {
      return {
        searchBarStyle: {
          marginLeft: '5px',
          width: '150px'
        },
        TriggerOptions: [{
          value: 'cron',
          label: 'cron'
        }, {
          value: 'crontab',
          label: 'crontab'
        }]
      }
    },
    name: 'task-dialog',
    props: ['formStatus', 'formData'],
    mounted () {
    },
    methods: {
      handleClick () {
        this.$emit('input', !this.value)
      },
      saveInfo () {
        setTimeout(() => {
          var requestBody = Object.assign({}, this.formData)
          if (this.formStatus.operationType) {
            addTask(requestBody)
              .then(res => {
                // 返回数据
                this.$message({
                  message: '成功',
                  type: 'success'
                })
                this.formStatus.visible = false
                this.$emit('closeTaskDialog')
              })
          } else {
            updateTask(requestBody)
              .then(res => {
                // 返回数据
                this.$message({
                  message: '成功',
                  type: 'success'
                })
                this.formStatus.visible = false
                this.$emit('closeTaskDialog')
              })
          }
        }, 600)
      }
    }
  }
</script>
