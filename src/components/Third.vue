/* eslint-disable camelcase */
<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm form_third">
    <div class="third_div">股权分配取决于两大要素，一个是“出资”，即总出资金额和各个股东出资金额；一个是“出力”，即人力资源贡献。据此，分别对“出资”股权及“出力”股权进行核算，并先根据出资金额及公司估值拆分出“出资”股权，进而确定“出力”股权比例。</div>
    <div class="third_div">(1)初步划分“出资”和“出力”两大要素的股权比例</div>
    <div class="percentage">按股东各方实际出资，分配总股权的{{ruleForm.adjustVal}}%，
        调整为
        <el-form-item prop="addBution">
            <el-input-number v-model="ruleForm.addBution" :precision="2" :step="0.1" :max="100" @input="estichange"></el-input-number>
        </el-form-item> %
        <div>剩余 {{addBution2}}% 按贡献要素分配。</div>
    </div>
    <div class="third_div">按股东各方出资，每个出资股东可分得股权：</div>
    <div class="third_div">
        <el-table :data="ruleForm.contriBution" show-summary :summary-method="getSummaries" style="width: 100%">
            <el-table-column fixed prop="name" label="股东" style="width:33%">
            </el-table-column>
            <el-table-column prop="payv" label="出资额(元)" style="width:33%">
            </el-table-column>
            <el-table-column prop="valua" label="估值(元)" style="width:33%">
            </el-table-column>
            <el-table-column prop="original" label="出资额/估值(原值)(%)" style="width:33%">
            </el-table-column>
            <el-table-column prop="adjust" label="调整值(%)" style="width:33%">
            </el-table-column>
        </el-table>
    </div>
    <div class="third_div">(2)确定各个股东在“出力要素”上的贡献</div>
    <div class="estimate third_div">
        <el-table :data="ruleForm.estiMate" style="width: 100%">
            <el-table-column fixed prop="name" label="股东" style="width:33%">
            </el-table-column>
            <el-table-column prop="idea" icon="el-icon-edit">
            <template slot="header">
                创业点子
                <el-tooltip class="item" effect="dark" content="谁对创业点子贡献越大，分值越接近于5，反之分值越接近于0。" placement="top" width="100%">
                    <i class="el-icon-question"></i>
                </el-tooltip>
            </template>
            <template slot-scope="scope">
                <el-form-item :prop="'estiMate.' + scope.$index + '.idea'" :rules="{required: true, message:'不能为空', trigger:'change'}">
                    <el-select v-model="scope.row.idea" class="standard" @change="estichange">
                        <el-option label="0" value="0"></el-option>
                        <el-option label="1" value="1"></el-option>
                        <el-option label="2" value="2"></el-option>
                        <el-option label="3" value="3"></el-option>
                        <el-option label="4" value="4"></el-option>
                        <el-option label="5" value="5"></el-option>
                    </el-select>
                </el-form-item>
            </template>
            </el-table-column>
            <el-table-column prop="scheme">
            <template slot="header">
                商业计划书
                <el-tooltip class="item" effect="dark" placement="top">
                    <div slot="content">谁更多参与商业计划书的整理和撰写<br>分值越接近于5，反之分值越接近于0。</div>
                    <i class="el-icon-question"></i>
                </el-tooltip>
            </template>
            <template slot-scope="scope">
                <el-form-item :prop="'estiMate.' + scope.$index + '.scheme'" :rules="{required: true, message:'不能为空', trigger:'change'}">
                    <el-select v-model="scope.row.scheme" class="standard" @change="estichange">
                        <el-option label="0" value="0"></el-option>
                        <el-option label="1" value="1"></el-option>
                        <el-option label="2" value="2"></el-option>
                        <el-option label="3" value="3"></el-option>
                        <el-option label="4" value="4"></el-option>
                        <el-option label="5" value="5"></el-option>
                    </el-select>
                </el-form-item>
            </template>
            </el-table-column>
            <el-table-column prop="field">
            <template slot="header">
                领域专业性
                <el-tooltip class="item" effect="dark" placement="top">
                    <div slot="content">谁在领域内经验、知识、人脉越多<br>分值越接近于5，反之分值越接近于0。</div>
                    <i class="el-icon-question"></i>
                </el-tooltip>
            </template>
            <template slot-scope="scope">
                <el-form-item :prop="'estiMate.' + scope.$index + '.field'" :rules="{required: true, message:'不能为空', trigger:'change'}">
                    <el-select v-model="scope.row.field" class="standard" @change="estichange">
                        <el-option label="0" value="0"></el-option>
                        <el-option label="1" value="1"></el-option>
                        <el-option label="2" value="2"></el-option>
                        <el-option label="3" value="3"></el-option>
                        <el-option label="4" value="4"></el-option>
                        <el-option label="5" value="5"></el-option>
                    </el-select>
                </el-form-item>
            </template>
            </el-table-column>
            <el-table-column prop="risk">
            <template slot="header">
                担当及风险
                <el-tooltip class="item" effect="dark" content="谁全职创业，分值越接近于5，反之分值越接近于0。" placement="top">
                    <i class="el-icon-question"></i>
                </el-tooltip>
            </template>
            <template slot-scope="scope">
                <el-form-item :prop="'estiMate.' + scope.$index + '.risk'" :rules="{required: true, message:'不能为空', trigger:'change'}">
                    <el-select v-model="scope.row.risk" class="standard" @change="estichange">
                        <el-option label="0" value="0"></el-option>
                        <el-option label="1" value="1"></el-option>
                        <el-option label="2" value="2"></el-option>
                        <el-option label="3" value="3"></el-option>
                        <el-option label="4" value="4"></el-option>
                        <el-option label="5" value="5"></el-option>
                    </el-select>
                </el-form-item>
            </template>
            </el-table-column>
            <el-table-column prop="duty">
            <template slot="header">
                创始人责任
                <el-tooltip class="item" effect="dark" content="谁承担的职责越多，分值越接近于5，反之分值越接近于0。" placement="top">
                    <i class="el-icon-question"></i>
                </el-tooltip>
            </template>
            <template slot-scope="scope">
                <el-form-item :prop="'estiMate.' + scope.$index + '.duty'" :rules="{required: true, message:'不能为空', trigger:'change'}">
                    <el-select v-model="scope.row.duty" class="standard" @change="estichange">
                        <el-option label="0" value="0"></el-option>
                        <el-option label="1" value="1"></el-option>
                        <el-option label="2" value="2"></el-option>
                        <el-option label="3" value="3"></el-option>
                        <el-option label="4" value="4"></el-option>
                        <el-option label="5" value="5"></el-option>
                    </el-select>
                </el-form-item>
            </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="third_div">按股东各方“出力”，每个出力股东可分得股权：</div>
    <div class="third_div">
        <el-table :data="ruleForm.outPut" show-summary style="width: 100%">
            <el-table-column prop="name" label="股东" style="width:50%">
            </el-table-column>
            <el-table-column prop="ratio" label="出力股权比例(%)" style="width:50%">
            </el-table-column>
        </el-table>
    </div>
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
  name: 'third',
  data () {
    return {
      childValue: 4,
      ruleForm: {
        addBution: '',
        adjustVal: '',
        addBution2: '',
        contriBution: [
          // {name: '',pay: '',valua: '',original: '',adjust: ''},
        ],
        estiMate: [
          // {name: '股东1',idea: '0',scheme: '0',field: '0',risk: '0',duty:'0'}
        ],
        outPut: [
          // {name: '股东1',ratio: 60},
        ]
      },
      rules: {

      }
    }
  },
  created () {
    // 页面加载时
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    // 页面刷新时
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },
  mounted () {
    this.$store.dispatch('changeTitle', 3)
    // 获取数据
    var holderName = this.$store.state.ruleForm.holderName
    console.log(holderName)
    var arrholderName = []
    var valuation = this.$store.state.ruleForm2.valuation
    console.log(valuation)

    for (var a = 0; a < holderName.length; a++) {
      var thirdValue = {
        name: '', payv: '', valua: '', original: '', adjust: 0
      }
      this.ruleForm.contriBution.push(thirdValue)
      this.ruleForm.contriBution[a].name = holderName[a].name
      this.ruleForm.contriBution[a].payv = holderName[a].pay
      this.ruleForm.contriBution[a].valua = valuation
      this.ruleForm.contriBution[a].original = this.keepTwoDecimalFull(holderName[a].pay / valuation * 100)
      arrholderName.push(holderName[a].pay)
    };
    for (var c = 0; c < holderName.length; c++) {
      var thirdValue2 = {
        name: '', idea: 3, scheme: 3, field: 3, risk: 3, duty: 3
      }
      this.ruleForm.estiMate.push(thirdValue2)
      this.ruleForm.estiMate[c].name = holderName[c].name
    }
    // console.log(this.ruleForm.estiMate);
    for (var d = 0; d < holderName.length; d++) {
      var thirdValue3 = {
        name: '', ratio: 0
      }
      this.ruleForm.outPut.push(thirdValue3)
      this.ruleForm.outPut[d].name = holderName[d].name
    }
    var arrholderName2 = JSON.parse('[' + String(arrholderName) + ']')
    var sumpay = this.sum(arrholderName2)
    this.ruleForm.addBution = this.keepTwoDecimalFull(sumpay / valuation * 100)

    this.ruleForm.adjustVal = this.ruleForm.addBution

    this.estichange()
  },
  methods: {
    goback () {
      this.$router.push({path: '/second'})
    },
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
        } else if (index === 2) {
          sums[index] = '--'
        } else {
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
          };
          sums[index] = sums[index].toFixed(2)
        }
      })

      return sums
    },
    estichange () {
      // var adjust = this.ruleForm.addBution;
      // var adjust_val =
      for (var f = 0; f < this.ruleForm.contriBution.length; f++) {
        this.ruleForm.contriBution[f].adjust = this.keepTwoDecimalFull(this.ruleForm.contriBution[f].original * (this.ruleForm.addBution / this.ruleForm.adjustVal))
      }

      this.ruleForm.addBution2 = this.keepTwoDecimalFull(100 - this.ruleForm.addBution)

      var ratiosum = 0
      for (var e = 0; e < this.ruleForm.estiMate.length; e++) {
        var estisum = parseInt(this.ruleForm.estiMate[e].idea) + parseInt(this.ruleForm.estiMate[e].scheme) + parseInt(this.ruleForm.estiMate[e].field) + parseInt(this.ruleForm.estiMate[e].risk) + parseInt(this.ruleForm.estiMate[e].duty)
        ratiosum += estisum
      }
      // console.log(ratiosum)
      for (var es = 0; es < this.ruleForm.estiMate.length; es++) {
        var estisum0s = parseInt(this.ruleForm.estiMate[0].idea) + parseInt(this.ruleForm.estiMate[0].scheme) + parseInt(this.ruleForm.estiMate[0].field) + parseInt(this.ruleForm.estiMate[0].risk) + parseInt(this.ruleForm.estiMate[0].duty)
        var estisums = parseInt(this.ruleForm.estiMate[es].idea) + parseInt(this.ruleForm.estiMate[es].scheme) + parseInt(this.ruleForm.estiMate[es].field) + parseInt(this.ruleForm.estiMate[es].risk) + parseInt(this.ruleForm.estiMate[es].duty)
        this.ruleForm.outPut[0].ratio = this.keepTwoDecimalFull(estisum0s / ratiosum * this.ruleForm.addBution2)
        this.ruleForm.outPut[es].ratio = this.keepTwoDecimalFull(estisums / ratiosum * this.ruleForm.addBution2)
        // console.log('个人：'+estisum+' 出力：'+this.ruleForm.addBution2);
      }
    },
    sum (arr) {
      var s = 0
      for (var i = arr.length - 1; i >= 0; i--) {
        s += arr[i]
      }
      return s
    },
    keepTwoDecimalFull (num) {
      var result = parseFloat(num)
      if (isNaN(result)) {
        console.log('传递参数错误')
        return false
      }
      result = Math.round(num * 100) / 100
      var sx = result.toString() // 将数字转换为字符串
      var posdecimal = sx.indexOf('.') // 小数点的索引值
      if (posdecimal < 0) {
        posdecimal = sx.length
        sx += '.'
      }
      // 当数字的长度< 小数点索引+2时，补0
      while (sx.length <= posdecimal + 2) {
        sx += '0'
      }
      return sx
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = this.ruleForm
          this.$store.dispatch('Submit3', data)
          this.$router.push({path: '/four'})
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  computed: {
    addBution2 () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.ruleForm.addBution2 = this.keepTwoDecimalFull(100 - this.ruleForm.addBution)
      return this.ruleForm.addBution2
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .form_third {
    .third_div{
        margin-bottom:15px;
    }
    /deep/ .el-form-item__content{
      margin-left:0 !important;
    }
    /deep/ .el-table__header{
      width:100% !important;
    }
    /deep/ .el-table__body{
      width:100% !important;
    }
    /deep/ .el-table .cell, .el-table th div{
        padding-right:0;
    }
    /deep/ .el-input__inner{
      padding:0 8px;
    }
    /deep/ .el-form-item{
      margin:10px 0;
    }
  }
  .percentage {
    /deep/ .el-form-item{
      display:inline-block;
    }
    /deep/ .el-form-item__content{
        margin-left:0 !important;
    }
    /deep/ .el-select{
        width:90px;
    }
  }
  .estimate{
    /deep/ .el-form-item{
        width:70px;
    }
    /deep/ .el-form-item__content{
        margin-left:0 !important;
    }
  }
</style>
