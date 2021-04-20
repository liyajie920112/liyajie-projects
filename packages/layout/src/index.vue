<template>
  <div class="lyj-main">
    <div class="lyj-header">11123</div>
    <div class="lyj-container">
      <div class="lyj-side"></div>
      <div class="lyj-content"></div>
    </div>
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
.lyj-main {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .lyj-header {
    height: 50px;
    background-color: $liyajie-primary-color;
  }
  .lyj-container {
    flex: 1;
    background-color: #f00;
    display: flex;
    .lyj-side {
      width: 200px;
      background-color: #ff0;
    }
    .lyj-content {
      flex: 1;
    }
  }
}
</style>
