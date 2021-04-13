<template>
  <div class="chart">
    <h1>Number of order count for each dish</h1>
    <chart></chart>
  </div>
</template>

<script>
import Chart from "./Barchart.js";
export default {
  components: {
    Chart
  }
};
</script>

<style scoped>
h1 {
  background-color: #a8c9d5;
  font-size:40px;
  color: white;
  text-align: center;
  height:40px;
}
</style>