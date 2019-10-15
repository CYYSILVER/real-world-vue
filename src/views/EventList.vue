<template>
  <div>
    <h1>Your Events</h1>
    <EventCard
      v-for="event in events"
      :key="event.id"
      :event="event"
      @deleteEvent="deleteEvent"
    />
    <div>
      <template v-if="page > 1">
        <router-link :to="{ name: 'event-list', query: { page: page - 1 } }"
          >上一页</router-link
        >
      </template>
      <span v-show="page != 1 && hasNextPage"> | </span>
      <template v-if="hasNextPage">
        <router-link :to="{ name: 'event-list', query: { page: page + 1 } }"
          >下一页</router-link
        >
      </template>
      <span class="-text-primary" style="float: right;">第 {{ page }} 页 </span>
    </div>
  </div>
</template>
<script>
import EventCard from '@/components/EventCard.vue'
import { mapState, mapActions } from 'vuex'
import store from '@/store/store'

function getPageEvents(to, next) {
  const currentPage = parseInt(to.query.page || 1)
  store
    .dispatch('event/fetchEvents', {
      page: currentPage
    })
    .then(() => {
      to.params.page = currentPage
      next()
    })
}

export default {
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    EventCard: EventCard
  },
  data() {
    return {
      // perPage: 5
    }
  },
  beforeRouteEnter(to, from, next) {
    getPageEvents(to, next)
  },
  beforeRouteUpdate(to, from, next) {
    getPageEvents(to, next)
  },
  created() {
    this.redirectIfOverLimitPage()
  },
  computed: {
    ...mapState({
      events: state => state.event.events,
      user: state => state.user,
      total: state => state.event.eventsTotal,
      perPage: state => state.event.perPage
    }),
    hasNextPage() {
      return this.total > this.page * this.perPage
    }
  },
  methods: {
    ...mapActions('event', {
      fetchEvents: 'fetchEvents'
    }),
    deleteEvent(id) {
      this.$store.dispatch('event/deleteEvent', id).then(() => {
        if (!this.redirectIfOverLimitPage()) {
          this.$store.dispatch('event/fetchEvents', {
            page: this.page
          })
        }
      })
    },
    redirectIfOverLimitPage() {
      if (this.total - 1 + this.perPage <= this.perPage * this.page) {
        this.$router.push({
          name: 'event-list',
          query: {
            page: Math.ceil(this.total / this.perPage) || 1
          }
        })
        return true
      }
      return false
    }
  }
}
</script>
