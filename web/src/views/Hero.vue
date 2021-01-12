<template>
  <div class="page-hero" v-if="model">
    <div class="topBar bg-black py-2 px-3 d-flex ai-center text-white">
        <router-link tag="div" :to="`/`"><img src="../assets/logo.png" alt="" height="30"></router-link>
        <div class="px-2 flex-1">
            <span class="text-white">王者荣耀</span>
            <span class="ml-2">攻略战</span>
        </div>
        <router-link to="/" tag="div">更多英雄 &gt;</router-link>
     </div>
     <div class="top" :style="{'background-image': `url(${model.banner})`}">
        <div class="info text-white p-3 d-flex flex-column jc-end h-100">
            <div class="alias fs-sm">{{model.title}}</div>
            <h2 class="name my-2">{{model.name}}</h2>
            <div class="category fs-sm">{{model.categories.map(v => v.name).join('/')}}</div>
            <div class="d-flex jc-between pt-2">
              <div class="scores d-flex ai-center" v-if="model.scores">
                <div class="score-item">
                    <span>难度</span>
                    <span class="badge bg-primary">{{model.scores.difficult}}</span>
                </div>
                <div class="score-item">
                    <span>技能</span>
                    <span class="badge bg-blue-1">{{model.scores.skills}}</span>
                </div>
                <div class="score-item">
                    <span>攻击</span>
                    <span class="badge bg-danger">{{model.scores.attack}}</span>
                </div>
                <div class="score-item">
                    <span>生存</span>
                    <span class="badge bg-dark">{{model.scores.survive}}</span>
                </div>
              </div>
              <router-link tag="span" :to="``" class="text-grey fs-sm">
                  皮肤：8 &gt;
              </router-link>
            </div>
        </div>
     </div>
     <div>
         <div class="px-3 bg-white">
             <div class="nav d-flex py-2 jc-around border-bottom pt-3 pb-2">
                 <div class="nav-item" @click="btn(0),$refs.list.$swiper.slideTo(0)" :class="Index==0?'active':''">
                     <router-link :to="``" tag="div" class="nav-link">英雄初识</router-link>
                 </div>
                 <div class="nav-item" @click="btn(1),$refs.list.$swiper.slideTo(1)" :class="Index==1?'active':''">
                     <router-link :to="``" tag="div" class="nav-link">进阶攻略</router-link>
                 </div>
             </div>
         </div>
         <swiper ref="list"  @slide-change="() => Index = $refs.list.$swiper.realIndex" :options="{autoHeight: true}">
             <swiper-slide>
                 <div>
                     <div class="p-3 bg-white border-bottom">
                       <div class="d-flex">
                           <router-link tag="button" to="/" class="btn btn-lg flex-1">
                            <i class="iconfont icon-caidan1"></i>
                             英雄介绍视频
                           </router-link>
                           <router-link tag="button" to="/" class="btn btn-lg flex-1 ml-2">
                            <i class="iconfont icon-caidan1"></i>
                             英雄介绍视频
                           </router-link>
                       </div>
                       <div class="skills bg-white mt-4">
                        <div class="d-flex jc-around">
                          <img @click="currentSkillIndex = i" :class="{active: currentSkillIndex === i}" class="icon" :src="item.icon" v-for="(item, i) in model.skills" :key="item.name" width="60" height="60">
                        </div>
                        <div v-if="currentSkill">
                            <div class="d-flex pt-4 pb-3">
                                <h3 class="m-0">{{currentSkill.name}}</h3>
                                <span class="text-grey-1 ml-4">
                                    (冷却值：{{currentSkill.delay}}
                                     消耗：{{currentSkill.cost}}
                                    )
                                </span>
                            </div>
                            <p>{{currentSkill.description}}</p>
                            <div class="border-bottom">
                                <p class="text-grey-1">小提示：{{currentSkill.tips}}</p>
                            </div>
                        </div>
                       </div> 
                     </div>
                     
                     <m-card plain icon="caidan1" title="出装推荐" class="hero-items">
                      <div class="fs-xl">顺风出装</div>
                      <div class="d-flex jc-around text-center mt-3">
                          <div v-for="item in model.items1" :key="item.name">
                              <img :src="item.icon" class="icon" alt="">
                              <div class="fs-sm">{{item.name}}</div>
                          </div>
                      </div>
                      <div class="border-bottom mt-3"></div>
                      <div class="fs-xl mt-3">逆风风出装</div>
                      <div class="d-flex jc-around text-center mt-3">
                          <div v-for="item in model.items2" :key="item.name">
                              <img :src="item.icon" class="icon" alt="">
                              <div class="fs-sm">{{item.name}}</div>
                          </div>
                      </div>                   
                     </m-card>
                     <m-card plain icon="caidan1" title="使用技巧">
                      <p class="m-0">{{model.usageTips}}</p>  
                     </m-card>
                     <m-card plain icon="caidan1" title="对抗技巧">
                      <p class="m-0">{{model.battleTips}}</p>  
                     </m-card>
                     <m-card plain icon="caidan1" title="团战思路">
                      <p class="m-0">{{model.teamTips}}</p>  
                     </m-card>
                     <m-card plain icon="caidan1" title="英雄关系">
                      <div class="fs-xl">最佳搭档</div> 
                      <div v-for="item in model.partners" :key="item.name" class="d-flex pt-3">
                        <img :src="item.hero.avatar" alt="" height="50">
                        <p class="flex-1 ml-3 m-0">{{item.description}}</p>
                      </div>
                      <div class="border-bottom mt-3"></div>
                     </m-card>
                 </div>
             </swiper-slide>
             <swiper-slide class="w-100" style="height: 300px;">进阶攻略</swiper-slide>
         </swiper>
     </div>
  </div>
</template>

<script>
export default {
   props: {
     id: { required: true }
   },
   data() {
       return {
         model: null,
         currentSkillIndex: 0,
         Index: 0
       }
   },
   methods: {
       async fetch() {
          const res = await this.$http.get(`heroes/${this.id}`)
          this.model = res.data
       },
       btn(index) {
          this.Index = index;
       } 
   },
   created() {
       this.fetch()
   },
   computed: {
       currentSkill() {
           return this.model.skills[this.currentSkillIndex]
       }
   }
}
</script>

<style lang="scss">
@import '../assets/scss/_variables.scss';
  .page-hero {
    .top {
        height: 50vw;
        background: #fff no-repeat top center;
        background-size: auto 100%;
        
    }
    .info {
        background: linear-gardient(rgba(0,0,0,0,), rgba(0,0,0,1));
        .alias {
            animation: heroAlias 0.7s
        }
        .category {
            animation: heroCate 1s
        }
        .name {
            animation: heroName 1.2s
        }
        .scores {
            .score-item {
                 &:nth-child(1) {
                     animation: heroDiff 1.2s
                 }
                 &:nth-child(2) {
                     animation: heroSkill 1.5s 
                 }
                 &:nth-child(3) {
                     animation: heroAttack 1.9s 
                 }
                 &:nth-child(4) {
                     animation: heroSurvive 2.2s
                 }
            }
            .badge {
                margin: 0 0.25rem;
                display: inline-block;
                width: 1rem; 
                height: 1rem;
                line-height: 0.9rem;
                text-align: center;
                border-radius: 50%;
                font-size: 0.6rem;
                border: 1px solid rgba(255,255,255,.2);
                transform: scale(.66)
            }
        }
    }
    .skills {
        img.icon {
            width: 70px;
            height: 70px;
            border: 3px solid map-get($colors, 'white');
            &.active {
                border-color: map-get($colors, 'primary');
            }
            border-radius: 45%;
        }
    }
    .hero-items {
        img.icon {
            width: 45px;
            height: 45px;
            border-radius: 50%;
        }
    }  
  }

</style>