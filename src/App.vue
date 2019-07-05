<template>
  <div id="app">
    <div v-if="!network">
        <h3>网络中断</h3>
        <div @click="onRefresh">刷新</div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'App',
  created() {
    //在页面加载时读取localStorage里的状态信息
    localStorage.getItem("userMsg") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("userMsg"))));
    //在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener("beforeunload",()=>{
        localStorage.setItem("userMsg",JSON.stringify(this.$store.state))
    })
  },
  computed: {
    ...mapState([
      'network'            // 映射 this.network 为 store.state.network
    ])
  },
  methods: {
    onRefresh () {
      this.$router.replace('/refresh')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
		
}
</style>
