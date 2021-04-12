<template>
  <div class="main">
    <p>
      <img :src="src" />
    </p>
    <hello />
  </div>
</template>

<script>
import Hello from './components/Hello'
export default {
  components: {
    Hello,
  },
  data() {
    return {
      src: require('./assets/images/baby.jpg'),
    }
  },
}
</script>

<style lang="scss" scoped>
.main {
  background-color: #f00;
  border: 1px solid #0094ff;
}
</style>
