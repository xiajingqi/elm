<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :selectType="selectType" :onlyContent="onlyContent" :desc="desc" 
                :ratings="ratings" @select="selectRating" @toggle="toggleContent"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="(rating,index) in ratings" :key="index" class="rating-item border-1px" 
          v-show="needShow(rating.rateType,rating.text)">
            <div class="avatar">
              <img :src="rating.avatar" alt="" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="iconfont icon-thumb_up"></span>
                <span v-for="(item,index) in rating.recommend" :key="index" class="item">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import star from '../star/star.vue'
import BScroll from 'better-scroll';
import split from '../split/split.vue'
import ratingselect from '../ratingselect/ratingselect.vue'
import {formatDate} from '../../common/js/date.js';
const POSITIVE=0;
const NEGATIVE=1;
const ALL=2;
const err_ok=0;
export default {
  props:{
    seller:{
      type:Object
    }
  },
  data(){
      return{
          ratings:[],
          selectType:ALL,
          onlyContent:true,
          desc:{
              all:'全部',
              positive:'推荐',
              negative:'吐槽'
          }
      }
  },
  components:{
    star,
    split,
    ratingselect
  },
  created(){
    this.$http.get('/api/ratings').then((res)=>{
      if(res.body.errno==err_ok){
        this.ratings=res.body.data;
        this.$nextTick(()=>{
          this.scroll= new BScroll(this.$refs.ratings,{
            click:true
          })
        })
      }
    },(res)=>{

    })
  },
  methods:{
    selectRating(type){
          this.selectType=type;
          this.$nextTick(()=>{
              this.scroll.refresh()
          })
      },
      toggleContent(type){
          this.onlyContent=!this.onlyContent;
          this.$nextTick(()=>{
              this.scroll.refresh()
          })
      },
      needShow(type,text){
          if(this.onlyContent && !text){
              return false
          }
          if(this.selectType===ALL){
              return true
          }else{
              return type==this.selectType
          }
      },
  },
  filters:{
      formatDate(time){
          let date= new Date(time);
          return formatDate(date,'yyyy-MM-dd hh:mm')
      }
  }
}
</script>
<style lang="stylus" scoped>
@import './rating.styl'
</style>


