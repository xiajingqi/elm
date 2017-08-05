<template>
  <div id="goods">
      <div class="menu-wrapper" ref="menuwrapper">
        <ul>
          <li v-for="(item,index) in goods" :key="index" class="menu-item" :class="{'current':currentIndex==index}" 
          @click="selectMenu(index,$event)">
            <span class="text border-1px">
              <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
            </span>
          </li>
        </ul>       
      </div>
      <div class="foods-wrapper" ref="foodwrapper">
        <ul>
          <li v-for="(item,index) in goods" :key="index" class="food-list">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li @click="selectedFood(food,$event)" v-for="(food,index) in item.foods" :key="index" class="food-item border-1px">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" alt="">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span>月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="carcontrol-wrapper">
                    <!--接受子组件传递过来的事件以及参数-->
                    <carcontrol :food="food" @add="addFood"></carcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <car :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" 
      :minPrice="seller.minPrice" ref="car"></car>
      <!--父调用子组件方法 ref="food"  this.$refs.food.show()-->
      <food :food="selectFood" ref="food" @add="addFood"></food>
  </div>
</template>
<script>
import BScroll from 'better-scroll';
import car from '../car/car.vue'
import carcontrol from '../carcontrol/carcontrol.vue'
import food from '../food/food.vue'
const err_ok=0;
export default {
  props:['seller'],
  components:{
    car,
    carcontrol,
    food
  },
  data(){
    return{
      goods:[],
      classMap:['decrease','discount','special','invoice','guarantee'],
      listHeight:[],
      scrollY:0,
      selectFood:{}
    }
  },
  computed:{
    currentIndex(){
      for(let j=0;j<this.listHeight.length;j++){
          let height1 =this.listHeight[j];
          let height2 =this.listHeight[j+1];
        if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
          return j;
        }
      }
      return 0;
    },
    selectFoods(){
      let foods =[];
      this.goods.forEach((good)=>{
        good.foods.forEach((food)=>{
          if(food.count){
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  created(){
    this.$http.get('/api/goods').then((res)=>{
      if(res.body.errno==err_ok){
        this.goods=res.body.data;
        this.$nextTick(()=>{
          this.initScroll();
          this.calculateHeight();
        })
      }
    },(res)=>{

    })
  },
  methods:{
    selectMenu(index,event){
      if(!event._constructed){
        return;
      }
      let foodList=document.querySelectorAll('.food-list');
      let el=foodList[index];
      this.foodScroll.scrollToElement(el,300)
    },
    initScroll(){
      this.menuScroll=new BScroll(this.$refs.menuwrapper,{
        click:true
      })
      this.foodScroll=new BScroll(this.$refs.foodwrapper,{
        click:true,
        probeType: 3
      })
      this.foodScroll.on('scroll',(pos)=>{
        this.scrollY=Math.abs(Math.round(pos.y));
      })
    },
    calculateHeight(){
      let foodList=document.querySelectorAll('.food-list');
      let height=0;
      this.listHeight.push(height);
      for(let i=0;i<foodList.length;i++){
        let item= foodList[i];
        height+=item.clientHeight;
        this.listHeight.push(height);
      }
    },
    addFood(target){
      this._drop(target);
    },
    _drop(target){
      this.$nextTick(()=>{
        // 调用car子组件的方法
        this.$refs.car.drop(target)
      })
    },
    selectedFood(food,event){
      if(!event._constructed){
            return;
        }
      this.selectFood=food;
      this.$refs.food.show()
    }
  }
}
</script>
<style lang="stylus" scoped>
@import './goods.styl'
</style>


