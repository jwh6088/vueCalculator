<template>
  <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm temFirst">
    <el-button type="primary" @click="addLine" class="button_first" icon="el-icon-circle-plus" :disabled="add">添加股东</el-button>
    <el-table :data="ruleForm.holderName" class="table_first">
        <el-table-column prop="date" label="股东">
        <template slot-scope="scope">
            <span>股东{{scope.$index+1}}</span>
        </template>
        </el-table-column>

        <el-table-column prop="name" label="股东姓名">
        <template slot-scope="scope">
            <el-form-item :prop="'holderName.' + scope.$index + '.name'" :rules="{required: true, message:'名称不能为空', trigger:'blur'}">
                <el-input class="edit-input" size="small" v-model="scope.row.name"></el-input>
            </el-form-item>
        </template>
        </el-table-column>

        <el-table-column prop="pay" label="实际出资(元)">
        <template slot-scope="scope">
            <el-form-item :prop="'holderName.' + scope.$index + '.pay'" :rules="[{required: true, message:'出资不能为空', trigger:'blur'},{ type: 'number', message: '必须为数字'}]">
                <el-input class="edit-input" size="small" v-model.number="scope.row.pay"></el-input>
            </el-form-item>
        </template>
        </el-table-column>

        <el-table-column label="操作">
        <template slot-scope="scope">
        <el-button type="danger" @click="handleDelete(scope.$index, scope.row)" :disabled="delte">删除</el-button>
        </template>
        </el-table-column>
    </el-table>
    <div class="form_button">
      <el-row :gutter="30">
        <el-col :span="12"><el-button type="primary" @click="goback" class="prevbutton">上一步</el-button></el-col>
        <el-col :span="12"><el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button></el-col>
      </el-row>
    </div>
  </el-form>
</template>

<script>
export default {
  name: 'first',
  data () {
    return {
      test: 0,
      childValue: 2,
      delte: true,
      add: false,
      ruleForm: {
        holderName: [
          {name: '', pay: ''},
          {name: '', pay: ''}
        ]
      }
    }
  },
  mounted () {
    this.$store.dispatch('changeTitle', 1)
  },
  methods: {
    goback () {
      this.$router.push({path: '/'})
    },
    addLine () { // 添加
      if (this.ruleForm.holderName.length >= 8) {
        this.add = true
      } else {
        this.add = false
        this.delte = false
        var newValue = {
          name: '',
          pay: ''
        }
        this.ruleForm.holderName.push(newValue)
      }
    },
    handleDelete (index) { // 删除
      this.add = false
      if (this.ruleForm.holderName.length <= 2) {
        this.delte = true
      } else {
        this.delte = false
        this.ruleForm.holderName.splice(index, 1)
      }
    },

    submitForm (formName) {
      // var that = this
      this.$axios.get('/guquanjisuanqi/getmaxcash')
        .then((response) => {
          if (response.data) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                var data = this.ruleForm
                this.$store.dispatch('Submit', data)
                this.$router.push({path: '/second'})
              } else {
                console.log('error submit!!')
                return false
              }
            })
          } else {
            this.$confirm('非本站会员没有使用智能股权计算器的权限，是否注册会员？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              location.href = '/center/glodpay.html'
            }).catch(() => {
            })
          }
        }).catch(() => {
        })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .table_first /deep/ {
      margin-bottom:50px;
      .el-form-item__error{
          left:8px;
      }
      td, th{
          text-align:center !important;
      }
  }
  .temFirst {
    /deep/ .el-form-item__content{
      margin-left:0 !important;
    }
    /deep/ .el-table__header{
      width:100% !important;
    }
    /deep/ .el-table__body{
      width:100% !important;
    }
    /deep/ .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cellP{
        padding-left:0;
    }
    /deep/ .el-table .cell, .el-table th div{
        padding-right:0;
    }
    /deep/ .el-input__inner{
      padding:0 8px;
    }
  }
  .el-form-item{
      margin-top:22px;
  }
  .el-input{
      width:80%;
  }
  .button_first{
      margin-bottom:30px;
  }
</style>
