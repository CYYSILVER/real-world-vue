<template>
  <div>
    <h1>Oops !</h1>
    <h3>The {{ resource }} you're looking for doesn't exists</h3>
    <router-link :to="{ name: 'event-list' }">Home Page</router-link>
  </div>
</template>

<script>
export default {
  props: ['resource']
}
</script>

<style></style>
