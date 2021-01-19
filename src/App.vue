<template>

  <div id="app">
    <div>
      <router-link to="/link1">path1</router-link>
      <router-link to="/link2">path2</router-link>
      <router-link to="/index">index</router-link>
      <router-link to="/login">login</router-link>
      <router-link to="/link3">link3</router-link>
    </div>
    <router-view />

  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
