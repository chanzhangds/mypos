<template>
	<div class="banner">
			<swipe class="my-swipe">
					<swipe-item class="slide1">						
						<div class="text">
							<h2>Google 音箱 深度体验</h2>
							<p>phone</p>
						</div>
					</swipe-item>
					<swipe-item class="slide2">						
							<div class="text">
								<h2>Google Pixel 3 XL 深度体验</h2>
								<p>smartphone</p>
						</div>
					</swipe-item>
					<swipe-item class="slide3">						
						<div class="text">
							<h2>#手机摄影# 杂乱的画风下，是这一年的挣扎</h2>
							<p>nomo</p>
						</div>
					</swipe-item>
					<swipe-item class="slide4">
						
						<div class="text">
							<h2>咖啡与生活</h2>
							<p>life</p>
						</div>
					</swipe-item>
			</swipe>
			<div class="mypic">				
			<a href=""><img src="../assets/images/img_2.jpeg" alt="" ></a>
			<a href=""><img src="../assets/images/my3.jpeg" alt="" ></a>
			</div>
			
    </div>
</template>
<style>
@import 'vue-swipe/dist/vue-swipe.css';
.mypic{
	display:flex; /* 切换flex布局 */
	flex-direction: row;/* 对齐方向为横向对齐 */
	justify-content: space-around;
}
.mypic a{
	width:2.8rem;
	margin:0.15rem;
	overflow: hidden;
}
.mypic img{ 	
	width:100%;	
}

.my-swipe {
  height: 4.2rem;
  color: #fff;
  font-size: 30px;
  text-align: center;
 
}

.slide1 {
  background-image: url(../assets/images/img_1.jpg); 
  background-repeat:no-repeat;
  background-size:100% 100%;
  color: #fff;
}

.slide2 {
  background-image: url(../assets/images/img_2.jpeg);
  background-repeat:no-repeat;
  background-size:100% 100%;
  color: #000;
}

.slide3 {
  background-image: url(../assets/images/img_3.jpg); 
  background-repeat:no-repeat;
  background-size:100% 100%; 
  color: #fff;
}

.slide4 {
  background-image: url(../assets/images/img_2.jpeg);
  background-repeat:no-repeat;
  background-size:100% 100%;
  color: #000;
}
/* .my-swipe img{
	width:370px;
} */
.my-swipe .text{
	font-size: 0.3rem;
	margin-top:3rem;
}
</style>
<script>
import axios from 'axios'
	export default {					
		watch:{
			// '$route':function(){
			// 	alert(1);
			// }
		},		
	}
</script>