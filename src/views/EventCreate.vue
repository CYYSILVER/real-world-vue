<template>
  <form @submit.prevent="createEvent">
    <BaseSelect
      v-model="event.category"
      label="选择一项类别"
      :options="categories"
      :class="{ error: $v.event.category.$error }"
      @blur="$v.event.category.$touch()"
    />
    <template v-if="$v.event.category.$error">
      <P v-if="!$v.event.category.required" class="errorMessage">请选择类别</P>
    </template>

    <h3>名称和描述</h3>
    <BaseInput
      label="标题"
      v-model.trim="event.title"
      type="text"
      placeholder="在此添加标题"
      class="field"
      :class="{ error: $v.event.title.$error }"
      @blur="$v.event.title.$touch()"
    />
    <template v-if="$v.event.title.$error">
      <p v-if="!$v.event.title.required" class="errorMessage">
        请添加标题
      </p>
    </template>
    <BaseInput
      label="描述"
      type="text"
      v-model.trim="event.description"
      placeholder="在此添加描述"
      class="field"
      :class="{ error: $v.event.description.$error }"
      @blur="$v.event.description.$touch()"
    />
    <template v-if="$v.event.description.$error">
      <p v-if="!$v.event.description.required" class="errorMessage">
        请添加描述
      </p>
    </template>
    <h3>在什么地方</h3>
    <BaseInput
      label="地点"
      v-model.trim="event.location"
      type="text"
      placeholder="请输入事件发生地点"
      class="field"
      :class="{ error: $v.event.location.$error }"
      @blur="$v.event.location.$touch()"
    />
    <template v-if="$v.event.location.$error">
      <p v-if="!$v.event.location.required" class="errorMessage">
        请输入地点
      </p>
    </template>
    <h3>什么时候开始</h3>
    <div class="field">
      <label>日期</label>
      <datepicker
        :language="zh"
        placeholder="选择日期"
        v-model="event.date"
        @closed="$v.event.date.$touch()"
        @opened="$v.event.date.$touch()"
        :input-class="{ error: $v.event.date.$error }"
      />
    </div>
    <template v-if="$v.event.date.$error">
      <p v-if="!$v.event.date.required" class="errorMessage">
        请选择日期
      </p>
    </template>
    <BaseSelect
      v-model="event.time"
      :options="times"
      label="时间"
      class="field"
      :class="{ error: $v.event.time.$error }"
      @blur="$v.event.time.$touch()"
    />
    <template v-if="$v.event.time.$error">
      <p v-if="!$v.event.time.required" class="errorMessage">
        请选择时间
      </p>
    </template>
    <BaseButton
      buttonClass="button -fill-gradient"
      type="submit"
      :disabled="$v.$anyError"
      >Submit</BaseButton
    >
    <p v-if="$v.$anyError" class="errorMessage">
      请将表格填写完整
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
