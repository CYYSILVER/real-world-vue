// import EventService from '@/services/EventServices'
import EventService from '@/services/DBServices'
export default {
  namespaced: true,
  state: {
    events: [],
    event: {},
    eventsTotal: 0,
    perPage: 3
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    DELETE_EVENT(state, id) {
      const deleteIndex = state.events.findIndex(function(event) {
        return event.id == id
      })
      state.eventsTotal--
      state.events.splice(deleteIndex, 1)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENT(state, event) {
      state.event = event
    },
    SET_EVENTS_TOTAL(state, total) {
      state.eventsTotal = total
    }
  },
  actions: {
    deleteEvent({ commit }, id) {
      return EventService.deleteEvent(id)
        .then(() => {
          commit('DELETE_EVENT', id)
        })
        .catch(error => {
          console.log(error)
        })
    },
    createEvent({ commit, dispatch }, event) {
      return EventService.postEvent(event)
        .then(() => {
          commit('ADD_EVENT', event)
          const notification = {
            type: 'success',
            message: 'Your event has been created'
          }
          dispatch('notification/add', notification, { root: true })
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: 'There was a problem creating your event: ' + error.message
          }
          dispatch('notification/add', notification, { root: true })
          throw error
        })
    },
    fetchEvents({ commit, dispatch, state }, { page }) {
      return EventService.getEvents(state.perPage, page)
        .then(response => {
          // console.log("Total evnets are" + response.headers["x-total-count"]);
          commit('SET_EVENTS', response.data)
          commit('SET_EVENTS_TOTAL', response.headers['x-total-count'])
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching events: ' + error.message
          }
          dispatch('notification/add', notification, { root: true })
        })
    },
    fetchEvent({ commit, getters }, id) {
      const event = getters.getEventById(id)
      if (event) {
        commit('SET_EVENT', event)
        return event
      } else {
        return EventService.getEvent(id).then(response => {
          commit('SET_EVENT', response.data)
          return response.data
        })
      }
    }
  },
  getters: {
    getEventById: state => id => {
      return state.events.find(event => {
        return event.id == id
      })
    }
  }
}
