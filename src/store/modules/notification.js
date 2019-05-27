let id = 0
export default {
  namespaced: true,
  state: {
    notifications: []
  },
  mutations: {
    PUSH(state, notification) {
      state.notifications.push(notification)
    },
    DELETE(state, notificationToRemove) {
      state.notifications = state.notifications.filter(
        not => not.id !== notificationToRemove.id
      )
    },
    POP(state) {
      state.notification.pop()
    }
  },
  actions: {
    add({ commit }, notification) {
      notification.id = id++
      commit('PUSH', notification)
    },
    remove({ commit }, notificationToRemove) {
      commit('DELETE', notificationToRemove)
    },
    pop({ commit }) {
      commit('POP')
    }
  }
}
