<template>
  <div class="carcontrol">
    <transition name="move">
        <div class="decrease" v-show="food.count>0" @click="decreaseCar">
            <span class="inner iconfont icon-remove_circle_outline"></span>
        </div>
    </transition>  
    <div class="count" v-show="food.count>0">{{food.count}}</div>
    <div class="add iconfont icon-add_circle" @click="addCar($el,$event)"></div>
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
        addCar(el,event){
            if(!event._constructed){
                return;
            }
            if(!this.food.count){
                Vue.set(this.food,'count',1)
            }else{
                this.food.count++;
            }
            this.$emit('add',event.target);
        },
        decreaseCar(){
            if(!event._constructed){
                return;
            }
            if(this.food.count>0){
                this.food.count--;
            }

        }
    }
}
</script>
<style lang="stylus" scoped>
@import './carcontrol.styl'
</style>
