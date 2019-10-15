import Vue from 'vue'
import Vuex from 'vuex'
import * as user from '@/store/modules/user'
import event from '@/store/modules/event'
import notification from '@/store/modules/notification'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    event,
    notification
  },
  state: {
    categories: ['学习', '工作', '娱乐', '社交', '食物', '自然', '其他']
  }
})
