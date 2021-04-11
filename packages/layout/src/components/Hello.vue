<template>
  <div class="hello">
    <div class="h1">h1</div>
    <div class="h2">h2</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.hello {
  background-color: #f0f;
  border-radius: 4px;
  display: flex;
  .h1 {
    width: 200px;
  }
  .h2 {
    flex: 1;
    background-color: #f00;
  }
}
</style>