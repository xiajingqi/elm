<template>
  <div class="carcontrol">
    <div class="decrease iconfont icon-remove_circle_outline" v-show="food.count>0"></div>
    <div class="count" v-show="food.count>0">{{food.count}}</div>
    <div class="add iconfont icon-add_circle" @click="addCar($event)"></div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
    props:{
        food:{
            type:Object
        }
    },
    created(){
        // console.log(this.food)
    },
    methods:{
        addCar(event){
            if(!event._constructed){
                return;
            }
            console.log(111)
            if(!this.food.count){
                this.food.count=1;
            }else{
                this.food.count++;
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
@import './carcontrol.styl'
</style>
