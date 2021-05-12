<template>
  <div>
    login
  </div>
</template>

<script>
import $ from 'axios';
export default {
  mounted() {
    $({
      methods: 'get',
      url: 'admin/getList',
    }).then((res) => {
      console.log(res);
    });
  },
};
</script>

<style>
</style>