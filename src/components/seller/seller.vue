<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active':favorite}"></span>
          <span class="text" :class="{'active':favorite}">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公共与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item border-1px" v-for="(item,index) in seller.supports" :key="index">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="picker-item" v-for="(pic,index) in seller.pics" :key="index">
              <img :src="pic" alt="" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-1px"></h1>
        <ul>
          <li class="info-item border-1px" v-for="(info,index) in seller.infos" :key="index">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll';
import split from '../split/split.vue'
import star from '../star/star.vue'
import {saveToLocal,loadFromLocal} from "../../common/js/date.js"
export default {
  data(){
    return{
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      favorite:(()=>{
        return loadFromLocal(this.seller.id, 'favorite', false);
      })
    }
  },
  props:{
    seller:{
      type:Object
    }
  },
  components:{
    star,
    split
  },
  watch:{
    'seller'(){
      this.$nextTick(()=>{
        this._initScroll();
        this._initPics();
      })
    }
  },
  computed:{
    favoriteText(){
      return this.favorite?'已收藏':'收藏';
    }
  },
  mounted(){
    this.$nextTick(()=>{
        this._initScroll();
        this._initPics();
    });
  },
  methods:{
    toggleFavorite(event){
      if(!event._constructed){
        return
      }
      this.favorite=!this.favorite
      console.log(this.seller.id)
      saveToLocal(this.seller.id, 'favorite', this.favorite);
    },
    _initScroll(){
      if(!this.scroll){
          this.scroll =new BScroll(this.$refs.seller,{
          click:true
        })
      }else{
        this.scroll.refresh()
      }
    },
    _initPics(){
        if(this.seller.pics){
          let picWidth=120;
          let margin =6;
          let width =(picWidth+margin)*this.seller.pics.length-margin
          this.$refs.picList.style.width=width+'px'
          this.$nextTick(()=>{
            if(!this.picScroll){
              this.picScroll=new BScroll(this.$refs.picWrapper,{
                scrollX:true,
                eventPassthrough:'vertical'
              })
            }else{
              this.picScroll.refresh();
            }
          })
        }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import './seller.styl'
</style>


