<template>
  <div class="lyj-main">
    <div class="lyj-header">
      <span class="lyj-logo">LiYajie</span>
    </div>
    <div class="lyj-container">
      <div class="lyj-side">
        <ul>
          <li v-for="item in menus" :key="item.path">
            <router-link :to="item.path">{{
              item.meta ? item.meta.menuName : item.path
            }}</router-link>
          </li>
        </ul>
      </div>
      <div class="lyj-content">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
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
  computed: {
    menus() {
      return this.$root.menus
    },
  },
  mounted() {
    console.log('this', this.$root)
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
    border-bottom: 1px solid $lyj-layout-border-color;
    display: flex;
    align-items: center;
    padding: 0 20px;
    .lyj-logo {
    }
  }
  .lyj-container {
    flex: 1;
    display: flex;
    .lyj-side {
      width: 200px;
      border-right: 1px solid $lyj-layout-border-color;
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        li {
          cursor: pointer;
          a {
            display: block;
            padding: 8px 10px;
            color: rgb(214, 69, 58);
            text-decoration: none;
            font-size: 14px;
            &.router-link-active {
              color: #fff;
              background-color: $lyj-primary-color;
            }
          }
        }
      }
    }
    .lyj-content {
      flex: 1;
    }
  }
}
</style>
