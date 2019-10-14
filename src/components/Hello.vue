<template>
  <div>
    <div>很多公司或项目在成立之初，对于股权的分配比较迷茫，一个好的股权结构、机制对于公司未来融资、人才吸引、资源整合，甚至于业务成功都起着至关重要的作用。51方案网根据多年的股权领域咨询服务经验，开发了《智能股权分配计算器》，以进一步帮助初创公司或中小企业科学、合理、规范分配股权，避开股权管理那些坑！</div>
    <div class="zero_title">应用智能股权分配计算器，解决股权分配的两个重大核心问题：</div>
    <div>问题1：在所有股东中，有的股东只出资、有的股东只出力，有的股东既出资又出力，如何进行股权分配？</div>
    <div>解决：将出资与出力进行分割，出资股权根据公司估值及各股东投资额解决；出力股权通过贡献要素模型量化评估解决。先分后合，公平而清晰解决股东持股比例问题。</div>
    <div>问题2：如何进行公司估值，股东各方均比较信服？</div>
    <div>解决：预测未来三年公司或项目的销售收入及净利润，并根据当前市场的投资回报率、市盈率、市销率、市净率及用户数，推算公司估值，进而根据投资人投资总额，计算出资股权及出力股权的总体比例。</div>
    <div class="zero_title">操作步骤</div>
    <div>通过以下步骤，即可完成股权分配计算。您可以免费下载计算结果报告，方便您和合伙人随时查阅。<a href="https://www.91fangan.com/example.html" class="baogao">点击查看示例报告</a></div>
    <el-row :gutter="30" class="step">
        <el-col :span="12"><div class="grid-content bg-purple-first">
            <p>Step 1</p>
            <p>股东人数、出资信息输入</p>
        </div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-second">
            <p>Step 2</p>
            <p>公司、项目估值</p>
        </div></el-col>
    </el-row>
     <el-row :gutter="30" class="step">
        <el-col :span="12"><div class="grid-content bg-purple-third">
            <p>Step 3</p>
            <p>股权分配要素评估</p>
        </div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-last">
            <p>Step 4</p>
            <p>股权分配建议报告</p>
        </div></el-col>
    </el-row>
    <div class="form_button">
      <router-link to="first">
        <el-button type="primary" class="calculator">开始新的计算</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hello',
  data () {
    return {
      msg: '股权计算器'
    }
  },
  mounted () {
    this.$store.dispatch('changeTitle', 0)
    console.log()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .baogao{
    color:#eb922e;
    text-decoration: underline;
  }
  .form_button{
      width:160px;
      margin:30px auto 20px auto;
      div{
          width:100% !important;
      }
      button{
          width:100% !important;
      }
  }
  .zero_title{
      margin:15px 0;
      font-size:15px;
      color:#666;
  }
  .el-row {
      margin-bottom: 20px;
  }
  .el-col {
      border-radius: 4px;
  }
  .bg-purple-first {
      background: #B9EBFD;
  }
  .bg-purple-second {
      background: #95E0FB;
  }
  .bg-purple-third {
      background: #6DD5FA;
  }
  .bg-purple-last {
      background: #2980B9;
  }
  .grid-content {
      border-radius: 4px;
      min-height:100px;
  }
  .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
  }
  .step{
      margin-top:20px;
      i{
        display:block;
        text-align:center;
        font-size: 35px;
        line-height: 100px;
        font-weight: bold;
        color:#ccc;
      }
      .grid-content p:nth-child(1){
        padding-top:25px;
      }
      .grid-content p:nth-child(2){
        font-size:12px;
      }
      .grid-content p{
        margin-top:10px;
        color:#fff;
        font-size:16px;
        text-align:center;
      }
  }
</style>
