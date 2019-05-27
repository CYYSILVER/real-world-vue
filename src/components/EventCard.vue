<template>
  <div class="router" @click="routerLink">
    <!-- <router-link
      event="none"
      class="event-link"
      :to="{ name: 'event-show', params: { id: event.id } }"
      -->

    <div class="event-card -shadow">
      <div class="button" @click.stop="deleteEvent">×</div>
      <span class="eyebrow">@{{ event.time }} on {{ event.date | date }}</span>
      <h4 class="title">{{ event.title }}</h4>
      <BaseIcon name="users">{{ event.attendees.length }} attending</BaseIcon>
    </div>
    <!-- </router-link> -->
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: {
    event: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  methods: {
    ...mapActions('event', ['deleteEvent']),
    routerLink() {
      this.$router.push({ name: 'event-show', params: { id: this.event.id } })
    },
    deleteEvent() {
      this.$emit('deleteEvent', this.event.id)
      // .then(() => {
      //   if (this.total - 1 + this.perPage <= this.perPage * this.page) {
      //     this.$router.push({
      //       name: "event-list",
      //       query: {
      //         page: this.page
      //       }
      //     });
      //   } else {
      //     this.$store.dispatch("event/fetchEvents", {
      //       page: this.page,
      //       perPage: this.perPage
      //     });
      //   }
      // });
    }
  },
  computed: mapState({
    page: state => state.event.page,
    perPage: state => state.event.perPage,
    total: state => state.event.eventsTotal
  })
}
</script>

<style scoped>
.event-card {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.event-card > .title {
  margin: 0;
}

.event-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}

.router {
  position: relative;
}

div.button {
  position: absolute;
  right: 10px;
  top: 10px;
  outline: none;
  border: none;
  width: 30px;
  height: 30px;
  display: flex;
  /* background: #e4e4e4; */
  justify-content: center;
  align-items: center;
  color: rgb(44, 44, 44);
  /* border: 1px solid #c7c7c7;
  border-radius: 2px; */
  font-size: 2em;
}

div.button:hover {
  transform: scale(1.01);
  color: rgb(146, 146, 146);
}
</style>
