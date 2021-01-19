<template>
  <div class="hello">
    <router-view></router-view>
  </div>
</template>

<script>
// import axios from 'axios';
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  mounted() {
    // axios.get('/admin/users', { daya: '112' }).then(function (res) {
    //   console.log(res);
    // });
    // axios.get('/admin/users').then(function (res) {
    //   console.log(res);
    // });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
