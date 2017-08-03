<template>
    <div class="car">
        <div class="content">
            <div class="cont-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlight':totalCount>0}">
                        <span class="iconfont icon-shopping_cart" :class="{'highlight':totalCount>0}"></span>
                    </div>
                    <div class="num">{{totalCount}}</div>
                </div>
                <div class="price" :class="{'highlight':totalPrice>0}" v-show="totalCount>0">￥{{totalPrice}}元</div>
                <div class="desc">另需配送费￥{{deliveryPrice}}</div>
            </div>
            <div class="cont-right">
                <div class="pay" :class="payClass">
                    {{payDesc}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
            deliveryPrice:{
                type:Number,
            },
            minPrice:{
                type:Number,
            },
            selectFoods:{
                type:Array,
                default(){
                    return[
                        {
                            price:10,
                            count:1
                        }
                    ]
                }
            }
        },
    computed:{
        totalPrice(){
            let total=0;
            this.selectFoods.forEach((food)=>{
                total+=food.price*food.count;
            })
            return total;
        },
        totalCount(){
            let count=0;
            this.selectFoods.forEach((food)=>{
                count+=food.count
            })
            return count
        },
        payDesc(){
            if(this.totalPrice===0){
                return `￥${this.minPrice}元起送`
            }else if(this.totalPrice<this.minPrice){
                let diff = this.minPrice -this.totalPrice;
                return `还差￥${diff}元起送`
            }else{
                return `去结算`
            }
        },
        payClass(){
            if(this.totalPrice<this.minPrice){
                return 'not-enough'
            }else{
                return 'enough'
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
@import './car.styl'
</style>
