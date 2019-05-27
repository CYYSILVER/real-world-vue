<template>
  <form @submit.prevent="createEvent">
    <BaseSelect
      v-model="event.category"
      label="Select a category"
      :options="categories"
      :class="{ error: $v.event.category.$error }"
      @blur="$v.event.category.$touch()"
    />
    <template v-if="$v.event.category.$error">
      <P v-if="!$v.event.category.required" class="errorMessage"
        >Category is required</P
      >
    </template>

    <h3>Name & describe your event</h3>
    <BaseInput
      label="Title"
      v-model.trim="event.title"
      type="text"
      placeholder="Add a title"
      class="field"
      :class="{ error: $v.event.title.$error }"
      @blur="$v.event.title.$touch()"
    />
    <template v-if="$v.event.title.$error">
      <p v-if="!$v.event.title.required" class="errorMessage">
        Title is required.
      </p>
    </template>
    <BaseInput
      label="Description"
      type="text"
      v-model.trim="event.description"
      placeholder="Add a description"
      class="field"
      :class="{ error: $v.event.description.$error }"
      @blur="$v.event.description.$touch()"
    />
    <template v-if="$v.event.description.$error">
      <p v-if="!$v.event.description.required" class="errorMessage">
        Description is required.
      </p>
    </template>
    <h3>Where is your event?</h3>
    <BaseInput
      label="Location"
      v-model.trim="event.location"
      type="text"
      placeholder="Location"
      class="field"
      :class="{ error: $v.event.location.$error }"
      @blur="$v.event.location.$touch()"
    />
    <template v-if="$v.event.location.$error">
      <p v-if="!$v.event.location.required" class="errorMessage">
        Location is required.
      </p>
    </template>
    <h3>When is your event?</h3>
    <div class="field">
      <label>Date</label>
      <datepicker
        placeholder="Select a date"
        v-model="event.date"
        @closed="$v.event.date.$touch()"
        @opened="$v.event.date.$touch()"
        :input-class="{ error: $v.event.date.$error }"
      />
    </div>
    <template v-if="$v.event.date.$error">
      <p v-if="!$v.event.date.required" class="errorMessage">
        Date is required.
      </p>
    </template>
    <BaseSelect
      v-model="event.time"
      :options="times"
      label="Time"
      class="field"
      :class="{ error: $v.event.time.$error }"
      @blur="$v.event.time.$touch()"
    />
    <template v-if="$v.event.time.$error">
      <p v-if="!$v.event.time.required" class="errorMessage">
        Time is required.
      </p>
    </template>
    <BaseButton
      buttonClass="button -fill-gradient"
      type="submit"
      :disabled="$v.$anyError"
      >Submit</BaseButton
    >
    <p v-if="$v.$anyError" class="errorMessage">
      Please fill out the required field(s).
    </p>
  </form>
</template>
<script>
import { mapState } from 'vuex'
import datepicker from 'vuejs-datepicker'
import { zh } from 'vuejs-datepicker/dist/locale'
import NProgress from 'nprogress'
import { required } from 'vuelidate/lib/validators'

export default {
  components: {
    datepicker
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      times,
      event: this.createFreshEvent(),
      zh,
      formatter: 'yyyy 年 MM 月 dd 日 星期D'
    }
  },
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required }
    }
  },
  computed: {
    ...mapState({
      user: state => {
        return state.user.user
      },
      categories: 'categories'
    })
  },
  methods: {
    createFreshEvent() {
      const user = this.user
      const id = Math.floor(Math.random() * 10000000)
      return {
        id: id,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: null,
        time: '',
        attendees: []
      }
    },
    createEvent() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        NProgress.start()
        this.$store
          .dispatch('event/createEvent', this.event)
          .then(() => {
            this.$router.push({
              name: 'event-show',
              params: { id: this.event.id }
            })
            this.event = this.createFreshEvent()
          })
          .catch(() => {
            NProgress.done()
          })
      }
    }
  }
}
</script>

<style scoped>
.filed {
  margin-bottom: 24px;
}
</style>
