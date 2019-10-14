import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = { //  。                                                                                          存值
  state: 0,
  title: '关于',
  ruleForm: {},
  ruleForm2: {},
  ruleForm3: []
}

const getters = { // 实时监听state值的变化(最新状态)                                                               监听
  isTitle () {
    return state.title
  }
}

const mutations = { // 改变值的方法
  change (state, index) { // 自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);    改变
    if (index === 1) {
      state.title = '股东人数、出资信息输入（步骤1/4）'
    } else if (index === 2) {
      state.title = '公司、项目估值（步骤2/4）'
    } else if (index === 3) {
      state.title = '股权分配要素评估（步骤3/4）'
    } else if (index === 4) {
      state.title = '股权分配报告（步骤4/4）'
    } else {
      state.title = '关于'
    }
  },
  firstSub (state, data) {
    state.ruleForm = data
  },
  secondSub (state, data) {
    state.ruleForm2 = data
  },
  thirdSub (state, data) {
    state.ruleForm3 = data
  }
}

const actions = {
  changeTitle (context, index) { // 自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性              触发
    context.commit('change', index)
  },
  Submit (context, data) {
    context.commit('firstSub', data)
  },
  Submit2 (context, data) {
    context.commit('secondSub', data)
  },
  Submit3 (context, data) {
    context.commit('thirdSub', data)
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
