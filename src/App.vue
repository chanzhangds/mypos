<template>
  <div id="app">
		<headerNav v-show="headerShow"></headerNav>
		<transition name="slide-down"></transition>
		<keep-alive> <!-- <keep-alive>是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM。 -->
			<router-view class="router-view"></router-view>
		</keep-alive>
	  </transition>
    <Footer v-show="footerShow"></Footer>
  </div>
</template>

<script>
	import headerNav from '@/components/Nav'//@代表SRC目录
	import Footer from '@/components/Footer'
	import Home from '@/components/Home'
	import {mapGetters} from 'vuex'
	
export default {
  name: 'App',
  components:{
		headerNav,
		Footer 
	},
	computed:mapGetters([
			'headerShow',
			'footerShow'
		]),
	mounted(){
			var path = this.$route.path.substring(1);//挂载时根据路由判定header是否显示
			this.headerChange(path)
			this.footerChange(path)
		

	},
	watch:{//检测路由变化，路由指向userinfo时header消失
		$route(to){
			var path = to.path.substring(1);//去掉路由名称中的‘/’
			this.headerChange(path)
			this.footerChange(path)
		}
	},
	methods:{
		headerChange(path){
			if(path=='userinfo'||path=='userreg'||path=='userlogin'||path.indexOf('article')!=-1||path=='talk'){//判定路由指向
				this.$store.dispatch('hideHeader')//调用action
			}else{
				this.$store.dispatch('showHeader')
			}
		},	
		footerChange(path){
			if(path.indexOf('article')==-1){//检索路由名称中没有article的页面，都显示footer。
				this.$store.dispatch('showFooter')
			}else{
				this.$store.dispatch('hideFooter')
			}
		}
	},

}

</script>

<style>
	@import './assets/css/index.css';
	.slide-up-enter-active, .slide-up-leave-active {
	  transition: all .4s cubic-bezier(0, 1.2, 1, 0.5);
	  opacity: .7;
	  transform: translate3d(0, 4em, 0);
	}
	.slide-up-enter, .slide-up-leave-active {
	  opacity: .3;
	  transform: translate3d(0, 4em, 0);
	}

	.slide-down-enter-active, .slide-down-leave-active {
	  transition: all .4s cubic-bezier(0, 1.2, 1, 0.5);
	  opacity: .7;
	  transform: translate3d(0, 6em, 0);
	}
	.slide-down-enter, .slide-down-leave-active {
	  opacity: .1;
	  transform: translate3d(0, 6em, 0);
	}

	.slide-left-enter-active, .slide-left-leave-active {
	  transition: all .2s cubic-bezier(0, 1.2, 1, 0.5);
	  opacity: .5;
	  transform: translate3d(2em, 0, 0);
	}

	.slide-left-enter, .slide-left-leave-active {
	  opacity: .3;
	  transform: translate3d(2em, 0, 0);
	}

	.slide-right-enter-active, .slide-right-leave-active {
	  transition: all .4s cubic-bezier(0, 1.2, 1, 0.5);
	  opacity: .5;
	  transform: translate3d(5em, 0, 0);
	}
	.slide-right-enter, .slide-right-leave-active {
	  opacity: .3;
	  transform: translate3d(5em, 0, 0);
	}

	.fade-enter-active, .fade-leave-active {
	  transition: opacity .4s
	}
	.fade-enter, .fade-leave-active {
	  opacity: 0
	}
</style>
