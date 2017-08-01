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
        <div class="detail" v-show="detailShow">
            <div class="wrapper clearfix">
                <div class="main">
                    <h1 class="name">{{seller.name}}</h1>
                </div>
            </div>
            <div class="close">
                <i class="iconfont icon-close"></i>
            </div>
        </div>
    </div>
</template>
<script>
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
        }
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
                right 12px
                top 1px
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
                        font-weight 600
            .close
                position relative
                width 32px
                height 32px
                margin -64px auto 0 auto
                // clear both
                text-align center
                    // font-size 32px


</style>

