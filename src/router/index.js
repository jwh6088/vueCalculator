import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import First from '@/components/First'
import Second from '@/components/Second'
import Third from '@/components/Third'
import Four from '@/components/Four'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/first',
      name: 'first',
      component: First
    },
    {
      path: '/second',
      name: 'second',
      component: Second
    },
    {
      path: '/third',
      name: 'third',
      component: Third
    },
    {
      path: '/four',
      name: 'four',
      component: Four
    }
  ]
})
