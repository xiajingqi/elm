<template>
  <div class="star" :class="starType">
        <span v-for="(item,index) in itemClasses" :class="item" :key="index" class="star-item"></span>
  </div>
</template>
<script>
let count=5;
let on =on;
let half=half;
let off=off;
export default {
    props:['size','score'],
    computed:{       
        starType(){
            return 'star-'+this.size;
        },
        itemClasses(){
            let result=[];
            let score = Math.floor(this.score*2)/2;
            let has =score %1!==0;
            let integer=Math.floor(score);
            for(let i=0;i<integer;i++){
                result.push('on')
            }
            if(has){
                result.push('half')
            }
            while(result.length<count){
                result.push('off')
            }
            return result;
        }
    }
}
</script>
<style lang="stylus">
    @import '../../common/stylus/mixin.styl'
    .star
        // width 100%
        // height 50px
        // span
        //     display inline-block
        //     width 20px
        //     height 20px
        .star-item
            display inline-block
            background-repeat no-repeat
        &.star-48
            .star-item
                width 20px
                height 20px
                margin-right 22px
                background-size 20px 20px
                &:last-child
                    margin-right 0
                &.on
                    bg('star48_on')
                &.half
                    bg('star48_half')
                &.off
                    bg('star48_off')

        &.star-36
            .star-item
                width 15px
                height 15px
                margin-right 6px
                background-size 15px 15px
                &:last-child
                    margin-right 0
                &.on
                    bg('star36_on')
                &.half
                    bg('star36_half')
                &.off
                    bg('star36_off')
        &.star-24
            .star-item
                width 10px
                height 10px
                margin-right 3px
                background-size 10px 10px
                &:last-child
                    margin-right 0
                &.on
                    bg('star24_on')
                &.half
                    bg('star24_half')
                &.off
                    bg('star24_off')

</style>
