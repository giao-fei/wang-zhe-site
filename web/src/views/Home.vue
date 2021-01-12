<template>
  <div class="home">
     <!-- 轮播图 -->
     <swiper :options="swiperOptions">
      <swiper-slide v-for="item in AdBanner" :key="item._id">
        <img class="w-100" :src="item.image" height="176">
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
     </swiper>
     <!-- 爆料站 -->
     <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="icon d-flex flex-wrap" :class="{ 'down': !foldIcon }">
         <div class="nav-item mb-3">
           <i class="sprite sprite-one"></i>
           <div class="py-2">爆料站</div>
         </div>
         <div class="nav-item mb-3">
           <i class="sprite sprite-two"></i>
           <div class="py-2">故事站</div>
         </div>
         <div class="nav-item mb-3">
           <i class="sprite sprite-three"></i>
           <div class="py-2">周边商场</div>
         </div>
         <div class="nav-item mb-3">
           <i class="sprite sprite-four"></i>
           <div class="py-2">体验服</div>
         </div>
         <div class="nav-item mb-3">
           <i class="sprite sprite-five"></i>
           <div class="py-2">新人专区</div>
         </div>
         <div class="nav-item mb-3">
           <i class="sprite sprite-six"></i>
           <div class="py-2">荣耀·传承</div>
         </div>
         <div class="nav-item mb-3">
           <i class="sprite sprite-server"></i>
           <div class="py-2">王者营地</div>
         </div>
         <div class="nav-item mb-3">
           <i class="sprite sprite-eight"></i>
           <div class="py-2">公众号</div>
         </div>
         <div class="nav-item mb-3">
           <i class="sprite sprite-nine"></i>
           <div class="py-2">版本介绍</div>
         </div>
         <div class="nav-item mb-3">
           <i class="sprite sprite-ten"></i>
           <div class="py-2">对局环境</div>
         </div>
         <div class="nav-item mb-3">
           <i class="sprite sprite-eleven mt-2"></i>
           <div class="py-2">无限王者图</div>
         </div>
         <div class="nav-item mb-3">
           <i class="sprite sprite-twelve"></i>
           <div class="py-2">创意互动营</div>
         </div>
      </div>
      <div class="fold bg-light py-2 fs-sm" @click="foldIcon=!foldIcon">
         <i class="sprite sprite-arrow mr-1" :class="{ 'down': !foldIcon }"></i>
         <span class="fold-txt">{{ foldIcon ? '收起' : '展开' }}</span>
      </div>   
     </div>
     <!-- 新闻资讯 -->
     <m-list-card icon="caidan1" title="新闻资讯" :categories="newsCats">
        <template #items="{category}">
          <router-link tag="div" :to="`/articles/${news._id}`" class="py-2 fs-lg d-flex" v-for="(news,i) in category.newsList" :key="i">
              <span class="text-info">[{{news.categoryName}}]</span>
              <span class="px-2">|</span>
              <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
              <span class="text-grey-1 fs-sm">{{news.createdAt | date}}</span>
          </router-link>
        </template>
     </m-list-card>
     <!-- 英雄列表 -->
     <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
        <template v-slot:banner>
          <div class="banner pt-3 pb-2">
            <img :src="newHero" style="width: 100%; height: auto;" class="news-hero" alt="new_hero">
          </div>
        </template>
        <template #items="{category}">
          <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
            <router-link tag="div" :to="`/heroes/${hero._id}`" class="p-2 text-center" style="width: 20%;" v-for="(hero,i) in category.heroList" :key="i">
             <img :src="hero.avatar" class="w-100">
             <div>{{hero.name}}</div>
            </router-link>
          </div>
        </template>
     </m-list-card>
     <!-- 精彩视频 -->
     <m-card icon="card-shipin" title="精彩视频">

     </m-card>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  filters: {
    date(val) {
      return dayjs(val).format('MM/DD')
    }
  },
  name: 'Home',
  data() {
    return {
       swiperOptions: {
          pagination: {
            el: '.pagination-home',
            clickable: true
          },
          loop: true,
          autoplay: {
            delay: 2000,
            disableOnInteraction: false
          }
        },
       foldIcon: false, // 控制图标区域的展开
       newsCats: [],
       heroCats: [],
       AdBanner: [],
       newHero: ''
    }
  },
  created() {
    // 轮播图
    this.banner()
    // 新闻数据
    this.fetchNewsCats()
    // 英雄数据
    this.fetchHeroCats()   
    // 最新英雄
    this.fetchNewHero()  
  },
  methods: {
    // 轮播图
    async banner() {
      const res = await this.$http.get('adBanner/list')
      this.AdBanner = res.data.items
    },
    // 新闻数据
    async fetchNewsCats() {
      const res = await this.$http.get('news/list')
      this.newsCats = res.data
    },
    // 英雄数据
    async fetchHeroCats() {
      const res = await this.$http.get('heroes/list')
      this.heroCats = res.data
    },
    // 最新英雄
    async fetchNewHero() {
      const res = await this.$http.get('newHero')
      this.newHero = res.data.newHero[0].icon
      console.log(this.newHero)
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variables';

  .pagination-home {
    .swiper-pagination-bullet {
      opacity: 1;
      border-radius: 0.1538rem;
      background-color: map-get($colors, 'white');
      &.swiper-pagination-bullet-active {
        background-color: map-get($colors, 'info');
      }
    }
  }
  // 爆料站
  .nav-icons {
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
     .nav-item {
       width: 25%;
       border-right: 1px solid $border-color;
       &:nth-child(4n) {
         border-right: none;
       }
     }
  }
</style>