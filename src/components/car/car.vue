<template>
    <div class="car">
        <div class="content" @click="toggleList">
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
            <div class="cont-right" @click.stop="pay">
                <div class="pay" :class="payClass">
                    {{payDesc}}
                </div>
            </div>
            <div class="ball-container">
                <div v-for='(ball,index) in balls' :key="index">
                    <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
                        <div class="ball" v-show="ball.show">
                            <div class="inner"></div>
                        </div>
                    </transition>
                </div>
            </div>
            <transition name="fold">
                <div class="car-list" v-show="listShow">
                    <div class="list-header">
                        <div class="title">购物车</div>
                        <div class="empty" @click="empty">清空</div>
                    </div>
                    <div class="list-content" ref="listContent">
                        <ul>
                            <li class="food border-1px" v-for="(food,index) in selectFoods" :key="index">
                                <span class="name">{{food.name}}</span>
                                <div class="price">
                                    <span>￥{{food.price*food.count}}</span>
                                </div>
                                <div class="carcontrol-wrapper">
                                    <carcontrol :food="food" @add="addFood"></carcontrol>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
        <transition name="fade">
            <div class="list-mask" v-show="listShow" @click="hideList"></div>
        </transition>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
import carcontrol from '../carcontrol/carcontrol.vue'
export default {
    data(){
        return{
            balls:[
                {
                    show:false
                },
                {
                    show:false
                },
                {
                    show:false
                },
                {
                    show:false
                },
                {
                    show:false
                }
            ],
            dropBalls:[],
            fold:true
        }
    },
    // 父传子的两种方式
    // props:['seller'],
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
                            // price:10,
                            // count:1
                        }
                    ]
                }
            }
    },
    components:{
        carcontrol
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
        },
        listShow(){
            if(!this.totalCount){
                this.fold=true;
                return false;
            }
            let show =!this.fold;
            if(show){
                if(!this.scroll){
                        this.$nextTick(()=>{
                        this.scroll=new BScroll(this.$refs.listContent,{
                            click:true
                        })
                    })
                }else{
                    this.scroll.refresh()
                }
            }
            return show;
        }
    },
    methods:{
        toggleList(){
            if(!this.totalCount){
                return;
            }
            this.fold=!this.fold;
        },
        drop(el){
            // el 与下面的 el不是同一个el
            for(let i=0;i<this.balls.length;i++){
                let ball =this.balls[i]
                if(!ball.show){
                    ball.show=true
                    ball.el=el
                    this.dropBalls.push(ball)
                    return
                }
            }
        },
        beforeDrop(el){
            let count =this.balls.length;
            while(count--){
                let ball =this.balls[count];
                if(ball.show){
                    // 内置API getBoundingClientRect()
                    let rect =ball.el.getBoundingClientRect();
                    let x=rect.left-32;
                    let y=-(window.innerHeight-rect.top-22);
                    el.style.display="";
                    // 相对于原来初始位置的偏移量
                    el.style.webkitTransform=`translate3d(0,${y}px,0)`;
                    el.style.tansform=`translate3d(0,${y}px,0)`;
                    let inner = el.getElementsByClassName('inner')[0];
                    inner.style.webkitTransform=`translate3d(${x}px,0,0)`;
                    inner.style.transform=`translate3d(${x}px,0,0)`;
                }
            }
        },
        dropping(el,done){          
            /* eslint-disable no-unused-vars */  
            let rf =el.offsetHeight;
            this.$nextTick(()=>{
                // 回到原来初始位置
                el.style.webkitTransform='translate3d(0,0,0)'
                el.style.transform='translate3d(0,0,0)'
                let inner =el.getElementsByClassName('inner')[0]
                inner.style.webkitTransform='translate3d(0,0,0)'
                inner.style.transform='translate3d(0,0,0)'
                // 用js过度 el.addEventListener('transitionend',done) 是必须的
                el.addEventListener('transitionend',done)
            })
        },
        afterDrop(el){
            let ball =this.dropBalls.shift();
            if(ball){
                ball.show=false;
                el.style.display='none'
            }
        },
        empty(){
            this.selectFoods.forEach((food)=>{
                food.count=0;
            })
        },
        hideList(){
            this.fold=true;
        },
        pay(){
            if(this.totalPrice<this.minPrice){
                return
            }
            window.alert (`支付${this.totalPrice}元`)           
        },
        addFood(target) {
            console.log(target)
            this.drop(target);
        },
    }
}
</script>
<style lang="stylus" scoped>
@import './car.styl'
</style>
