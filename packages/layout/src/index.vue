<template>
  <div class="main">
    <p>aaaa</p>
    <hello />
  </div>
</template>

<script>
import Hello from './components/Hello'
export default {
  components: {
    Hello
  },
}
</script>

<style lang="scss" scoped>
.main {
  background-color: #f00;
  border: 1px solid #0094ff;
}
</style>
