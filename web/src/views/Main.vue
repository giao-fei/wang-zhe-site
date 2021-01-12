<template>
  <div>
      <div class="topBar bg-black py-2 px-3 d-flex ai-center">
        <router-link tag="div" :to="`/`"><img src="../assets/logo.png" alt="" height="30"></router-link>
        <div class="px-2 flex-1">
            <div class="text-white">王者荣耀</div>
            <div class="text-grey-1 fs-xxs">团队成就更多</div>
        </div>
        <button type="button" class="btn bg-primary">立即下载</button>
     </div>
     <div class="bg-primary pt-3 pb-2">
        <div class="nav nav-inverse pb-1 jc-around">
           <div class="nav-item" @click="btn(0)" :class="Index==0?'active':''">
            <router-link clas="nav-link" tag="div" to="/">首页</router-link>
           </div>
           <div class="nav-item" @click="btn(1)" :class="Index==1?'active':''">
            <router-link clas="nav-link" tag="div" to="/">攻略中心</router-link>
           </div>
           <div class="nav-item" @click="btn(2)" :class="Index==2?'active':''">
            <router-link clas="nav-link" tag="div" to="/">赛事中心</router-link>
           </div>
           <div class="nav-item" @click="btn(3)" :class="Index==3?'active':''">
            <router-link clas="nav-link" tag="div" to="/">IP新游</router-link>
           </div>
        </div>
     </div>


     <router-view />
  </div>
</template>

<script>
export default {
  name: 'Main',
  data() {
      return {
        Index: 0
      }
  },
  methods: {
      btn(index) {
        this.Index = index;
      }

  }
}
</script>

<style lang="scss">
  .topBar {
     position: sticky;
     top: 0;
     z-index: 999;
  }
</style>