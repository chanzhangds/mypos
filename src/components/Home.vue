<template>
        <div class="content">
            <Slider></Slider>
            <div class="newsList">
                
                    <div class="newsBox" v-for="(item,index) in arrList">
                        <router-link :to="'/article/'+item.id" >
                            <div class="author">
                                <a href="">
                                    <img :src="item._embedded.author[0].avatar_urls['96']" alt="">
                                </a>
                                <p>{{item._embedded.author[0].name}}</p>
                            </div>
                            <a href="">                        
                                <img :src='item.better_featured_image.media_details.sizes.medium_large.source_url' alt="">
                                </a>
                            <div class='word'>
                                <h2>{{item.title.rendered}}</h2>                            
                                <p>{{item.excerpt.rendered.substring(3,80)}}</p>
                            </div>
                        </router-link>
                    </div> 
                    <div class="botton">
                            <div class="add" @click="addData()"><p>{{warn2}}</p></div>
                    </div>                                  
            </div>
        </div>
</template>
<style>

</style>
<script>
    import Slider from './Slider.vue'
    import {mapGetters} from 'vuex'
    
    export default {
        data(){
            return{                
                activeDate:1,               
                num2:1,
            }
         },       
        computed:mapGetters([
			'headerShow',
            'footerShow',
            'arrList',
            'warn2'
		]),
        components:{
			Slider
        },
        created() {
            this.getData()
        },
        mounted(){            
            window.addEventListener('scroll', this.handleScroll)//挂载时写入事件监听，监听滚动条，滚动时
            console.log("add scroll")
        },
        watch:{//检测路由变化，路由指向userinfo时header消失
		    $route(to){            
                if(to.path=="/userinfo"||to.path=="/talk"){
                window.removeEventListener('scroll', this.handleScroll)
                console.log("remove scroll")
                }else{
                    window.addEventListener('scroll', this.handleScroll)//挂载时写入事件监听，监听滚动条，滚动时
                }
		    }
	    },
        methods:{
            getData(){
                let num ='&page='+this.num2
                this.$store.commit('getData',num)               
            },
            // reduceData(){
            //     this.num2 -= 1
            //     this.getData()
            //     if(this.num2==1){
            //     this.showReduce=false
            //     }
            // },
            addData(){
                this.num2 += 1               
                this.getData()
            },
            handleScroll () {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop//测元素滚动高度
                var scroll = scrollTop - this.i;
                this.i = scrollTop;//判定是在上滑还是在下滑，scroll大于零上滑，小于零是下滑。
                //console.log(scroll)
                if(scroll>0){//判断为上滑时，利用Vuex中actions的hideHeader方法，隐藏顶栏。
                    setTimeout(() =>{this.$store.dispatch('hideHeader')},400)//设置延时
                }else{
                    setTimeout(() =>{this.$store.dispatch('showHeader')},400)
                }
            },
        }        
    }
    
                
    </script>
    <style>
    .content .newsList .botton{
        margin-top:0.1rem;
        display:flex;
        flex-direction:row;
        justify-content:space-around;
    }
    .content .newsList .botton .add{
        width:5rem;
        height:0.8rem;
        margin-bottom:0.1rem;
        font-size:0.3rem;
        color:#707070;
        background: #fff;
        box-shadow: 0 15px 15px 0 rgba(15, 37, 64, 0.10);
        display: flex;
        justify-content: center;
        align-items: center;
    }
   
    </style>