<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm form_second">
    <div class="second_div">公司/项目估值是进行股权分配的前提，请选择并确认公司估值情况，若有估值，则填写具体估值数额，若无估值，则可按下述公司/项目估值方法进行估值：</div>
    <el-radio-group label="有无估值" v-model="ruleForm.radio" @change="source">
        <el-radio label="1">无估值</el-radio>
        <el-radio label="2">有估值</el-radio>
    </el-radio-group>
    <div v-if="isval">
      <div>无估值，按如下方式进行估值：</div>
      <div class="second_div">早期企业的典型特征，是公司成立和开业时间通常不到3年，营业收入达不到一定规模，现金流很不稳定，报表制度尚不健全，会计数据不全面不规范，无法利用折现方法预测收益和计算估值。在此阶段，比较实用的估值方法有五种。请根据公司/项目的实际情况选择其中一种方法进行估值：</div>
      <el-radio-group label="有无估值" v-model="ruleForm.radio2" @change="source2" class="radioFive">
          <el-radio label="1">A.投资回报法</el-radio>
          <el-radio label="2">B.市盈率法</el-radio>
          <el-radio label="3">C.市销率法</el-radio>
          <el-radio label="4">D.市净率法</el-radio>
          <el-radio label="5">E.用户数估值法</el-radio>
      </el-radio-group>
      <div>
          <div v-if="ruleForm.istab == 1" class="second_content">
              <div class="second_div">投资回报法【适用于项目投资周期相对较短，投资人依靠每年分红获取回报的项目】，即通过预期的投资收益，推算公司/项目的估值及投资所占股权比例。</div>
              <div class="second_div">
              公司估值（元）：<span class="valuation">{{valuation}}</span>
                <div>=
                <el-form-item prop="annualProfit">
                  <el-input v-model="ruleForm.annualProfit" placeholder="平均年利润额（未来3年平均值）" @keyup.native="proving" class="annualProfit"></el-input>
                </el-form-item>
                </div>
                <div>×
              <el-form-item prop="region">
                  <el-input-number v-model="ruleForm.region" :precision="2" :step="0.1"></el-input-number>
              </el-form-item>
              </div>
                <div>(收回本金的年限，标准值为3，即3年回本。可在1-10之间选择)</div>
                </div>
                <div>
                  <div>投资人或股东在投资项目的过程中，很多投资人更加最看重短期的投资回报，特别是该项目未来没有IPO上市计划的情况下，投资人通过定期分红，获取收益。根据实践经验，平均三年投资回报率（平均每年分红收益/投资总额）达到30%，那么该项目对投资人比较有吸引力了。</div>
                  <div>举例：投资人投入100万元，预测平均年利润额（未来3年平均值）为100万元，若投资人要求收回本金的年限为3年，则平均每年分红收益为投资总额的1/3，即三年的平均年投资回报率为33.33%。此时，公司估值为：1,000,000×3=3,000,000元。所以投资100万后，公司出让的股份即为100万/300万=33.33%。</div>
                </div>
          </div>
          <div v-else-if="ruleForm.istab == 2" class="second_content">
              <div class="second_div">市盈率法【适用于投资当年或次年即能产生利润的公司/项目】，即一家公司的利润乘以盈利倍数得到这家公司的估值。</div>
              <div class="second_div">
              公司估值（元）：<span class="valuation">{{valuation}}</span>
                <div>=
                <el-form-item prop="annualProfit">
                  <el-input v-model="ruleForm.annualProfit" placeholder="未来一个财务年度利润额" @keyup.native="proving" class="annualProfit"></el-input>
                </el-form-item>
                </div>
                <div>×
                <el-form-item prop="region">
                  <el-input-number v-model="ruleForm.region" :precision="2" :step="0.1"></el-input-number>
              </el-form-item>
              </div>
                <div>(标准值为7，可在3-10之间选择)</div>
                </div>
                <div>
                  <div>市盈率估值法：对于上市公司来说，市盈率有两种，一种是历史市盈率，它等于当前市值除以公司上一个财务年度的利润，另一种是预测市盈率，也就是用当前市值除以公司未来一个财务年度的利润。</div>
                  <div>当然，对于早期投资来说，投资人看重的是一个公司的未来，他们需要评估一家公司未来的经营能力，所以他们用市盈率估值法就是：</div>
                  <div>公司价值 = 预测市盈率 × 未来一个财务年度利润额</div>
                  <div>公司未来12个月利润额可以通过公司的财务预测进行估算，那么估值的最大问题在于如何确定预测市盈率了。一般说来，预测市盈率是历史市盈率的一个折扣，比如说NASDAQ某个行业的平均历史市盈率是40倍，那预测市盈率大概是30倍左右，对于同行业、同等规模的非上市公司，参考的预测市盈率需要再打个折扣，15-20倍左右，对于同行业且规模较小的初创企业，参考的预测市盈率需要在再打个折扣，就成了7-10倍了。这也就目前国内主流的外资VC投资是对企业估值的大致P/E（市盈率）倍数。举例：如果某公司预测中小企业融资后3年平均年利润是100万元，公司的估值大致就是700-1000万元，如果投资人投资200万元，公司出让的股份大约是20%-35%。</div>
                  <div>当然在预测市盈率的时候，可查询同类上市公司的市盈率数据，在此基础上，结合项目的预期利润水平、成长性等因素，综合确定P/E（市盈率）倍数。</div>
                </div>
          </div>
          <div v-else-if="ruleForm.istab == 3" class="second_content">
          <div class="second_div">市销率法【适用于投资周期长、潜能巨大或轻资产的项目】，是按照一个公司的现在的营业额乘以倍数来估计公司价值。一般来说，倍数在一倍左右。</div>
              <div class="second_div">
              公司估值（元）：<span class="valuation">{{valuation}}</span>
                <div>=
                <el-form-item prop="annualProfit">
                  <el-input type="text" v-model="ruleForm.annualProfit" placeholder="平均年销售额（未来3年平均值）" class="annualProfit"></el-input>
                </el-form-item>
                </div>
                <div>×
                <el-form-item prop="region">
                  <el-input-number v-model="ruleForm.region" :precision="2" :step="0.1"></el-input-number>
              </el-form-item>
              </div>
                <div>(标准值为1，可在1-5之间选择)</div>
                </div>
                <div>
                  <div>市销率(Price-to-sales,PS) =总市值/主营业务收入或者PS=股价除以每股销售额，收入分析是评估企业经营前景至关重要的一步。没有销售，就不可能有收益。这也是最近两年在国际资本市场新兴起来的市场比率，主要用于创业板的企业或高科技企业。在NASDAQ市场上市的公司不要求有盈利业绩，因此无法用市盈率对股票投资的价值或风险进行判断，而用该指标进行评判。同时，在国内证券市场运用这一指标来选股可以剔除那些市盈率很低但主营又没有核心竞争力而主要是依靠非经常性损益而增加利润的股票（上市公司）。对于初创及非上市公司，往往存在有收入但是没有利润的情况，那么可以用P/S法来进行估值因此该项指标既有助于考察公司收益基础的稳定性和可靠性，又能有效把握其收益的质量水平。</div>
                  <div>该项指标最适用于一些毛利率比较稳定的行业，如公用事业、商品零售业。国外大多数价值导向型的基金经理选择的范围都是“每股价格/每股收入小于1”之类的股票。若这一比例超过10时，认为风险过大。如今，标准普尔500这一比例的平均值为1.7左右。这一比率也随着行业的不同而不同，软件公司由于其利润率相对较高，他们这一比例为10左右；而食品零售商则仅为0.5左右。而目前我国商品零售业类上市公司市销率约为2.13。</div>
                  <div>无论是风险投资没有上市的，还是已经上市的，电商行业的平均PS值在1-1.5之间，亚马逊在1.8，唯品会5，聚美优品6.6，京东如果按17美元上市，PS值2.2左右，当当的市销率是0.5。</div>
              </div>
          </div>
          <div v-else-if="ruleForm.istab == 4"  class="second_content">
              <div class="second_div">市净率法【适用于重资产项目】，即按照企业净资产总额确定公司估值</div>
              <div class="second_div">公司估值（元）：<span class="valuation">{{valuation}}</span>
                <div> =
                <el-form-item prop="annualProfit">
                  <el-input type="text" v-model="ruleForm.annualProfit" placeholder="公司净资产或总投资额" class="annualProfit"></el-input>
                </el-form-item>
                </div>
                <div>×
                <el-form-item prop="region">
                  <el-input-number v-model="ruleForm.region" :precision="2" :step="0.1"></el-input-number>
                </el-form-item>
                </div>
                <div>(标准值为1，即公司估值等于企业净资产。可在1-5之间选择)</div>
              </div>
              <div>资产法是假设一个谨慎的投资者不会支付超过与目标公司同样效用的资产的收购成本。比如中海油竞购尤尼科，根据其石油储量对公司进行估值。这个方法给出了最现实的数据，通常是以公司发展所支出的资金为基础。其不足之处在于假定价值等同于使用的资金，投资者没有考虑与公司运营相关的所有无形价值。另外，资产法没有考虑到未来预测经济收益的价值。所以，资产法对公司估值，结果是最低的。</div>
          </div>
        <div v-else  class="second_content">
            <div class="second_div">用户数估值法【适用于基于用户数量形成商业模式的公司】</div>
            <div class="second_div">公司估值（元）：<span class="valuation">{{valuation}}</span>
              <div> =
              <el-form-item prop="annualProfit">
                <el-input type="text" v-model="ruleForm.annualProfit" placeholder="用户数量" class="annualProfit"></el-input>
              </el-form-item>
              </div>
              <div>×
              <el-form-item prop="region">
                <el-input type="text" v-model.number="ruleForm.region" class="annualProfit"></el-input>
              </el-form-item>
              </div>
              <div>(标准值为200，可在1-1000之间自定义)</div>
            </div>
            <div>当用户足够多的时候，客户将不是问题，为什么360免费做杀毒软件？国际上的标准是一个用户值四十美金，约合两百块人民币。那大众点评，他有一千万个用户，就值二十亿人民币，当然，也有一个用户值五百乃至一千块钱的，比如说像小米之类的。用户数是商业模式的核心。</div>
        </div>
    </div>
    </div>
    <div v-if="isval2">
        已有确定数额估值（元）：
        <el-form-item prop="valuation">
            <el-input v-model="ruleForm.valuation" placeholder="公司估值" @keyup.native="proving2"></el-input>
        </el-form-item>
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
  name: 'second',
  data () {
    return {
      childValue: 3,
      isval: true,
      isval2: false,
      ruleForm: {
        istab: 1,
        radio: '1',
        radio2: '1',
        annualProfit: '',
        region: 3,
        valuation: ''
      },
      rules: {
        annualProfit: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '不能为空', trigger: 'change' },
          {type: 'number', message: '必须为数字'}
        ],
        valuation: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.$store.dispatch('changeTitle', 2)
  },
  methods: {
    goback () {
      this.$router.push({path: '/first'})
    },
    proving () {
      this.ruleForm.annualProfit = this.ruleForm.annualProfit.replace(/[^.\d]/g, '')
    },
    proving2 () {
      this.ruleForm.valuation = this.ruleForm.valuation.replace(/[^.\d]/g, '')
    },
    source () {
      if (this.ruleForm.radio === '2') {
        this.isval = false
        this.isval2 = true
        this.ruleForm.istab = null
      } else {
        this.isval = true
        this.isval2 = false
        this.ruleForm.istab = 1
        this.ruleForm.radio2 = '1'
      }
    },
    source2 () {
      this.ruleForm.annualProfit = null
      // this.ruleForm.region = null;
      this.ruleForm.valuation = null

      if (this.ruleForm.radio2 === '1') {
        this.ruleForm.istab = 1
        this.ruleForm.region = 3
      } else if (this.ruleForm.radio2 === '2') {
        this.ruleForm.istab = 2
        this.ruleForm.region = 7
      } else if (this.ruleForm.radio2 === '3') {
        this.ruleForm.istab = 3
        this.ruleForm.region = 1
      } else if (this.ruleForm.radio2 === '4') {
        this.ruleForm.istab = 4
        this.ruleForm.region = 1
      } else {
        this.ruleForm.istab = 5
        this.ruleForm.region = 200
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = this.ruleForm
          this.$store.dispatch('Submit2', data)
          this.$router.push({path: '/third'})
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
    valuation () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.ruleForm.valuation = this.ruleForm.annualProfit * this.ruleForm.region
      return this.ruleForm.valuation
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .form_second .radioFive{
    /deep/ .el-radio{
      width:40%;
      margin-top:10px;
    }
  }
  .form_second .el-radio-group{
      margin-bottom:15px;
  }
  .form_second .second_div{
      margin-bottom:15px;
      line-height:25px;
      padding:10px 0;
  }
  .form_second .second_content{
      background:#F5F7FA;
      color:#666;
      margin-bottom:15px;
      padding:20px;
      line-height:25px;
  }
  .form_second /deep/ .el-form-item__label{
      text-align:center;
  }
  .form_second .annualProfit{
      width:230px;
  }
  .form_second .standard{
      width:100px;
  }
  .form_second /deep/ .el-form-item{
      display:inline-block;
  }
  .form_second /deep/ .el-form-item__content{
      margin-left:0 !important;
  }
  .form_second .valuation{
      font-weight:bold;
      font-style:italic;
  }
</style>
