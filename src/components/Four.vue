<template>
  <div>
    <div>(1) 股权分配结果</div>
    <div class="echarts">
        <div id="main" style="width:100%;height:300px;"></div>
        <div class="explain">
            <p v-for="(item,index) in ruleForm.data" :key="index">股东{{index+1}}：{{item.name}} -- {{item.value}}% </p>
            <div v-if="this.ruleForm.istabl == null">公司估值：{{ruleForm.valuation}} 元</div>
            <div v-else>公司估值({{ways}})：{{this.ruleForm.annualProfitl}}({{quota}}) × {{this.ruleForm.regionl}}({{company}}) = {{ruleForm.valuation}} 元</div>
        </div>
    </div>
    <div class="four_div">(2) 计算过程</div>
    <div class="four_div">
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
    <div class="four_div">
        <el-table :data="ruleForm.estiMate" style="width: 100%">
            <el-table-column fixed prop="name" label="股东">
            </el-table-column>
            <el-table-column prop="idea" label="创业点子">
            </el-table-column>
            <el-table-column prop="scheme" label="商业计划书">
            </el-table-column>
            <el-table-column prop="field" label="领域专业性">
            </el-table-column>
            <el-table-column prop="risk" label="担当及风险">
            </el-table-column>
            <el-table-column prop="duty" label="创始人责任">
            </el-table-column>
        </el-table>
    </div>
    <div class="four_div">
        <el-table :data="ruleForm.outPut" show-summary style="width: 100%">
            <el-table-column prop="name" label="股东" style="width:50%">
            </el-table-column>
            <el-table-column prop="ratio" label="出力股权比例(%)" style="width:50%">
            </el-table-column>
        </el-table>
    </div>
    <div class="four_div">(3) 股权分配建议</div>
    <div>建议您在制定股权分配方案的同时考虑以下几点：</div>
    <ul class="four_idea">
        <li>1）预留适当比例的股权及期权池，以供企业长期健康发展之需要</li>
        <li>2）建立股东退出及股权回购机制，便于管控股东离职引发的风险</li>
        <li>3）建立控制权集中的公司治理机制，以利于创业企业高效的决策</li>
        <li>4）对不同股东适用代持、直接持股、持股平台等不同的持股方式</li>
        <button class="reload" @click="reload"><i class="el-icon-refresh-right"></i> 重新开始计算</button>
    </ul>
</div>
</template>

<script>
export default {
  name: 'four',
  data () {
    return {
      orgOptions: {},
      ruleForm: {
        addBution: '',
        adjustVal: '',
        valuation: '',
        annualProfitl: '',
        istabl: '',
        ways: ['投资回报法', '市盈率法', '市销率法', '市净率法', '用户数估值法'],
        quota: ['平均年利润额(未来三年平均值)', '未来一个财务年度利润额', '平均年销售额(未来三年平均值)', '公司净资产或总投资额', '用户数量'],
        company: ['年', '倍', '倍', '倍', '个'],
        regionl: '',
        contriBution: [
          // {name: '',original: '',adjust: ''}
        ],
        estiMate: [
          // {name: '',idea: '0',scheme: '0',field: '0',risk: '0',duty:'0'}
        ],
        outPut: [
          // {name: '',ratio: ''}
        ],
        data: [

        ]
      }
    }
  },
  mounted () {
    this.$store.dispatch('changeTitle', 4)

    let valuation = this.$store.state.ruleForm2.valuation
    let annualProfitl = this.$store.state.ruleForm2.annualProfit
    let regionl = this.$store.state.ruleForm2.region
    let istabl = this.$store.state.ruleForm2.istab
    let fourdata = this.$store.state.ruleForm3
    console.log(istabl)

    this.ruleForm.valuation = valuation
    for (let h = 0; h < fourdata.contriBution.length; h++) {
      let fourValue = {value: '', name: ''}
      this.ruleForm.data.push(fourValue)
      this.ruleForm.data[h].name = fourdata.contriBution[h].name
      this.ruleForm.data[h].value = this.keepTwoDecimalFull(parseFloat(fourdata.contriBution[h].adjust) + parseFloat(fourdata.outPut[h].ratio))
    };
    this.ruleForm.annualProfitl = annualProfitl
    this.ruleForm.istabl = istabl
    this.ruleForm.regionl = regionl
    this.ruleForm.contriBution = fourdata.contriBution
    this.ruleForm.estiMate = fourdata.estiMate
    this.ruleForm.outPut = fourdata.outPut

    this.initChart()
  },
  methods: {
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
    print () {
      window.print()
    },
    reload () {
      sessionStorage.clear()
      this.$router.push({path: '/'})
    },
    keepTwoDecimalFull (num) {
      let result = parseFloat(num)
      if (isNaN(result)) {
        alert('传递参数错误，请检查！')
        return false
      }
      result = Math.round(num * 100) / 100
      let sx = result.toString() // 将数字转换为字符串
      let posdecimal = sx.indexOf('.') // 小数点的索引值
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
    initChart () {
      let that = this
      let myChart = this.$echarts.init(document.getElementById('main'))
      let option = {
        series: [
          {
            name: '股权比例',
            type: 'pie',
            radius: '50%',
            data: that.ruleForm.data,
            label: {
              normal: {
                show: true,
                formatter: '{b}: {d}%'
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    }
  },
  computed: {
    ways () {
      return this.ruleForm.ways[this.ruleForm.istabl - 1]
    },
    quota () {
      return this.ruleForm.quota[this.ruleForm.istabl - 1]
    },
    company () {
      return this.ruleForm.company[this.ruleForm.istabl - 1]
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .echarts{
      width:100%;
      height:300px;
      overflow:hidden;
      div{
        float:left;
      }
  }
  .explain{
      margin-top:100px;
      width:300px;
      p{
        line-height:25px;
      }
  }
  .four_div{
      margin-bottom:20px;
  }
  .four_idea{
      position:relative;
      li{
        list-style-type:none;
        color:#666;
        margin-top:5px;
      }
      .print,.reload{
        margin-top:15px;
        margin-right:10px;
        padding:8px 16px;
      }
  }
  @media print {
      .print,.reload{
          display: none;
      }
  }
</style>
