<template>
  <div>
    <table>
      <tr>
        <td>
          王某某
        </td>
        <td>
          21
        </td>
        <td>
          137****2333
        </td>
        <td>
          {{$enum.getDescByValue('SOURCE_IN_TYPE', type)}}
        </td>
      </tr>
    </table>
    <h4>
      {{$enum.getValueDesc('SOURCE_IN_TYPE')}}
    </h4>
    this is page3
    <select>
      <option v-for="(item,index) in $enum.getValueDescList('SOURCE_IN_TYPE')" :value="item.value" :key="index">
        {{item.desc}}</option>
    </select>

    <router-view />

  </div>
</template>

<script>
export default {
  data() {
    return {
      //sourceTypeList:this.$enum.getValueDescList('SOURCE_IN_TYPE')
      type: 1,
    };
  },
  mounted() {
    //s console.log(this.$enum.getValueDescList('SOURCE_IN_TYPE') )
  },
};
</script>

<style>
</style>