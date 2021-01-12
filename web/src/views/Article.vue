<template>
   <div class="page-article" v-if="model">
     <div class="d-flex py-3 px-2 border-bottom">
      <div class="iconfont icon-fanhui text-blue"></div>
      <strong class="flex-1 text-blue pl-2 text">
          {{model.title}}
      </strong>
      <div class="text-grey fs-md">
          2021-12-31
      </div>
     </div>
     <div class="px-3 body fs-lg" v-html="model.body"></div>
     <div class="px-3 border-top py-3">
      <div class="d-flex ai-center">
         <i class="iconfont icon-lianjie"></i>
         <strong class="text-blue fs-lg ml-1">相关资讯</strong>
      </div>
     </div>
     <div>
         <router-link class="py-2 pl-3" tag="div" :to="`/articles/${item._id}`" v-for="item in model.related" :key="item._id">
             {{item.title}}
         </router-link>
     </div>
   </div>
</template>

<script>
export default {
  data(){
      return {
          model: null
      }
  },
  props: {
      id: { required: true }
  },
  watch: {
      id: 'fetch',

  },
  methods: {
      async fetch() {
          const res = await this.$http.get(`articles/${this.id}`)
          this.model = res.data
      }
  },
  created() {
      this.fetch()
  }
}
</script>

<style lang="scss">
  .page-article {
     .icon-fanhui {
         font-size: 1.0rem;
     }
     .icon-lianjie {
         font-size: 1.9rem;
     }
     width: 100%;
     overflow: hidden;
     .text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        letter-spacing: .1em;
        font-size: 1.1rem;
     }
     .body {
       img {
           max-width: 100%;
           height: auto;
       }
     }
  }
</style>