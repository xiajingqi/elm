<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img :src="seller.avatar" alt="" width="62" height="64">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="des">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class="support">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="support-count" @click="showDetail">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="iconfont icon-keyboard_arrow_right"></i>
            </div>      
        </div>
        <div class="bulletin-wrapper" @click="showDetail">
            <span class="title"></span><span class="text">{{seller.bulletin}}</span>
            <i class="iconfont icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" alt="">
        </div>
        <!--sticky footer 布局-->
        <transition name="fade">
            <!--sticky footer 布局-->
            <!--最外层盒子-->
            <div class="detail" v-show="detailShow">
                <!--同级盒子-->
                <div class="wrapper clearfix">
                    <!--子盒子 设置padding-bottom-->
                    <div class="main">
                        <h1 class="name">{{seller.name}}</h1>
                        <div class="star-wrapper">
                            <star :size="48" :score="seller.score"></star>
                        </div>
                        <!--display flex 实现标题效果-->
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>       
                        <ul v-if="seller.supports" class="supports">
                            <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
                                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                                <span class="text">{{seller.supports[index].description}}</span>
                            </li>
                        </ul>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <div class="bulletin">
                            <p class="content">{{seller.bulletin}}</p>
                        </div>
                    </div>
                </div>
                <!--同级盒子-->
                <div class="close" @click="hideDetail">
                    <i class="iconfont icon-close"></i>
                </div>
            </div>
            <!--sticky footer 布局-->
        </transition>
    </div>
</template>
<script>
import star from "../star/star.vue"
export default {
    props:['seller'],
    data(){
        return{
            classMap:['decrease','discount','special','invoice','guarantee'],
            detailShow:false
        }
    },
    created(){
        // this.classMap=['decrease','discount','special','invoice','guarantee']
    },
    methods:{
        showDetail(){
            this.detailShow=true
        },
        hideDetail(){
            this.detailShow=false
        }
    },
    components:{
        star
    }
    
}
</script>
<style lang="stylus" scoped>
    @import '../../common/stylus/mixin.styl'
    .header
        position relative
        overflow hidden
        color #fff
        background rgba(7,17,27,.5)
        .content-wrapper
            position relative          
            padding 24px 12px 18px 24px
            font-size 0px;
            .avatar
                display inline-block
                vertical-align top
                img
                    border-radius 2px
            .content
                display inline-block
                margin-left 16px
                .title
                    margin 2px 0 8px 0
                    .brand
                        display inline-block
                        vertical-align top
                        width 30px
                        height 18px
                        bg('brand')
                        background-size 30px 18px
                        background-repeat no-repeat
                    .name
                        margin-left 6px
                        font-size 16px
                        line-height 18px
                        font-weight bold
                .des
                    margin-bottom 10px
                    line-height 12px
                    font-size 12px
                .support
                    .icon
                        display inline-block
                        vertical-align top
                        width 12px
                        height 12px
                        margin-right 4px
                        background-size 12px 12px
                        background-repeat no-repeat
                        &.decrease
                            bg('decrease_1')
                        &.discount
                            bg('discount_1')
                        &.guarantee
                            bg('discount_1')
                        &.invoice
                            bg('invoice_1')
                        &.special
                            bg('special_1')
                    .text
                        line-height 12px
                        font-size 10px
            .support-count
                position absolute
                right 12px
                bottom 18px
                padding 0 8px
                height 24px
                line-height 24px
                border-radius 14px
                background #999
                text-align center     
                .count
                    vertical-align top
                    font-size 10px
                .icon-keyboard_arrow_right
                    color #fff
        .bulletin-wrapper
            position relative
            height 28px
            line-height 28px
            padding 0 22px 0 12px
            white-space nowrap
            overflow hidden
            text-overflow ellipsis
            background: rgba(7,17,27,0.2);
            .title
                display inline-block
                margin-top 7px
                margin 0 4px
                width 22px
                height 12px
                bg('bulletin')
                background-size 22px 12px
                background-repeat no-repeat
            .text
                vertical-align top
                font-size 10px
            .icon-keyboard_arrow_right
                position absolute
                right 8px
                top 6px
        .background
            position absolute
            top 0
            left 0
            width 100%
            height 100%
            z-index -1
            filter blur(10px)
            img
                width 100%
                height 100%
        .detail
            position fixed
            z-index 10
            top 0
            left 0
            width 100%
            height 100%
            overflow auto
            background rgba(7,17,27,.8)  
            transition all 0.5s
            &.fade-enter-active,&.fade-leave-active
                opacity 1
                background rgba(7,17,27,.8)        
            &.fade-enter,&.fade-leave-to
                opacity 0
                background rgba(7,17,27,0)  
            .wrapper
                min-height 100%
                width 100%
                .main
                    margin-top 64px
                    padding-bottom 64px
                    .name
                        line-height 16px
                        text-align center
                        font-size 16px
                        font-weight 60
                    .star-wrapper
                        margin-top 18px
                        padding 2px 0
                        text-align center
                    .title
                        display flex
                        width 80%
                        margin 28px auto 24px auto
                        .line
                            flex 1
                            position relative
                            top -6px
                            border-bottom 1px solid rgba(255,255,255,.2)
                        .text
                            padding 0 12px
                            font-size 14px
                            font-weight 700
                    .supports
                        width 80%
                        margin 0 auto
                        .support-item
                            padding 0 12px
                            margin-bottom 12px
                            font-size 0
                            &:last-child
                                margin-bottom 0
                            .icon
                                display inline-block
                                width 16px
                                height 16px
                                vertical-align top
                                background-size 16px 16px 
                                background-repeat no-repeat
                                margin-right 6px
                                &.decrease
                                    bg('decrease_2')
                                &.discount
                                    bg('discount_2')
                                &.guarantee
                                    bg('discount_2')
                                &.invoice
                                    bg('invoice_2')
                                &.special
                                    bg('special_2')
                            .text
                                font-size 12px
                                line-height 12px
                    .bulletin
                        width 80%
                        margin 0 auto
                        .content
                            padding 0 12px
                            line-height 24px
                            font-size 12px
            .close
                position relative
                width 32px
                height 32px
                margin -64px auto 0 auto
                // clear both
                text-align center
                    // font-size 32px


</style>

