<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="food">
        <div class="food-content">
            <div class="image-header">
                <img :src="food.image" alt="">
                <div class="back" @click="hide">
                    <i class="iconfont icon-arrow_lift"></i>
                </div>
            </div>
            <div class="content">
                <h1 class="title">{{food.name}}</h1>
                <div class="detail">
                    <span class="sell-count">月售{{food.sellCount}}份</span>
                    <span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                    <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="carcontronl-wrapper">
                    <carcontrol :food="food" @add="addFood"></carcontrol>
                </div>
                <transition name="fade">
                    <div class="buy" v-show="!food.count||food.count===0" @click="addFirst($event)">加入购物车</div>
                </transition>
            </div>
            <split v-show="food.info"></split>
            <div class="info">
                <h1 class="title">商品介绍</h1>
                <p class="text">{{food.info}}</p>
            </div>
            <split></split>
            <div class="rating">
                <h1 class="title">商品评价</h1>
                <ratingselect :selectType="selectType" :onlyContent="onlyContent" :desc="desc" 
                :ratings="food.ratings" @select="selectRating" @toggle="toggleContent"></ratingselect>
                <div class="rating-wrapper">
                    <ul v-show="food.ratings&&food.ratings.length">
                        <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating,index) in food.ratings" :key="index" class="rating-item border-1px">
                            <div class="user">
                                <span class="name">{{rating.username}}</span>
                                <img :src="rating.avatar" alt="" class="avatar" width="12" height="12">
                            </div>
                            <div class="time">{{rating.rateTime | formatDate}}</div>
                            <p class="text">
                                <span :class="{'icon-thumb_up':rating.rateType===0,
                                'icon-thumb_down':rating.rateType===1}" class="iconfont">{{rating.text}}</span>
                            </p>
                        </li>
                    </ul>
                    <div class="no-ratings" v-show="!food.ratings||!food.ratings.length">暂无评价</div>
                </div>
            </div>
        </div>
    </div>
  </transition>
</template>

<script>
import Vue from 'vue'
import BScroll from 'better-scroll';
import {formatDate} from '../../common/js/date.js';
import carcontrol from '../carcontrol/carcontrol.vue'
import split from '../split/split.vue'
import ratingselect from '../ratingselect/ratingselect.vue'
const POSITIVE=0;
const NEGATIVE=1;
const ALL=2;
export default {
  props:{
      food:{
        type:Object
      },
  },
  data(){
      return{
          showFlag:false,
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
    carcontrol,
    split,
    ratingselect
  },
  methods:{
      show(){
          this.showFlag=true;
          this.selectType=ALL;
          this.onlyContent=true;
          this.$nextTick(()=>{
              if(!this.scroll){
                  this.scroll=new BScroll(this.$refs.food,{
                      click:true
                  })
              }else{
                  this.scroll.refresh();
              }
          })
      },
      hide(){
          this.showFlag=false
      },
      addFirst(event){
        if(!event._constructed){
            return;
        }
        this.$emit('add',event.target);
        Vue.set(this.food,'count',1);
      },
      addFood(target){
          console.log(target)
          this.$emit('add', target);
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
      }
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
@import './food.styl'
</style>

