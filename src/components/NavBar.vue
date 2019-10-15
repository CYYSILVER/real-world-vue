<template>
  <div id="nav" class="nav">
    <router-link to="/" class="brand">Events</router-link>
    <nav>
      <router-link :to="{ name: 'event-list' }" class="nav-item"
        >列表</router-link
      >
      |
      <router-link :to="{ name: 'event-create' }" class="nav-item"
        >创建</router-link
      >
    </nav>
  </div>
</template>
<script>
export default {}
</script>
<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  border: 1px solid #a9d1ce;
  border-radius: 5px;
  padding: 5px 20px;
  margin: 10px -10px;
  transition: 0.2s;
}
.nav > .brand {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.5em;
  color: #39b982;
  text-decoration: none;
  transition: 0.2s;
}
.nav .nav-item {
  box-sizing: border-box;
  margin: 0 5px;
  color: rgba(0, 0, 0, 0.5);
  text-decoration: none;
}
.nav .nav-item.router-link-exact-active {
  color: #39b982;
  border-bottom: solid 2px #39b982;
}
</style>
