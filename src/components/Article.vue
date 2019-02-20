<template>
	<div class="article">
		<div class="nav">
			<ul>
		    	<li class="l-btn" @click="goback"></li>
		    </ul>
		</div>
		<div class="content">
			<div class="header clear" :style="{backgroundImage:'url('+imgUrl+')', backgroundSize:'cover'}">				
				<div class="loginImg"><img :src="loginImg" alt=""/></div>
				<div class="author">{{authorName}}</div>
				<div class="title">{{title}}</div>
			</div>
			<div class="cont">		    	
				<div class="time"><p>{{date}}<span><img src="../assets/img/zan.png" alt=""/></span></p></div>
				<div class="text-box" v-html="content"></div>
			</div>
		</div>
		<div class="comments">
			<div class="box" v-for="(item,index) in comments">
				<div class="author"><img :src="item.author_avatar_urls['96']" alt=""><span>{{item.author_name}}&nbsp说：</span></div>
				<div class="main" v-html="item.content.rendered"></div>
				<div class="date">{{item.date.slice(5,-3).replace("T","&nbsp")}}</div>
			</div>
		</div>
		<div class="foot-btn" v-show="isInput">	
			<div class="warn" v-show="inputWarn">
				<p>{{inputWarn}}</p>
			</div>	
			<div class="input" >
				<textarea name="" id="" cols="6" rows="6" v-model="postContent"  placeholder=" 说点什么吧。。。"></textarea>
				<div class="allButton">			
					
					<div class="closeButton" @click="showInput">
						<img src="../assets/img/close.png" alt="">
					</div>
					<input class="inputButton" type="button" value="评论" @click="postComments(id)">
				</div>	
			</div>

		</div>
		<div class="mini-foot" v-show="!isInput" @click="showInput()">
			<img src="../assets/img/message.png" alt="">
		</div>
	</div>
</template>

<script>
    import axios from 'axios'
    export default{
        data(){
            return{
				articleData:{},
				item:"",//便利评论使用。
				title:"",
				date:"",
				imgUrl:"",//背景图片
				authorName:"",//zh作者姓名
				loginImg:"",//作者头像
				content:"",//上面的定义作用于文章主题内容的获取与过滤
				comments:{},//将获得的评论存入其中
				postContent:"",//定义需要评论的内容
				id:"",//定义路由id
				isInput:false,//评论框的显示
				inputWarn:"",//评论框内的警告
            }
		},
		created(){
			this.id = this.$route.params.id		
			console.log(this.$route.params.id)
            this.getArticleData(this.$route.params.id);//创建时获取文章数据
			this.getComments(this.$route.params.id);//创建时获取评论数据
        },
		
		watch: {//由于router-view是复用的，单纯的改变id号并不会刷新router-view,watch监控路由变换，解决组件复用问题。当id发生变化时，'$route'也会相应地发生变化，因此可以通过watch的方法来进行操作。
    		'$route' (to, from) {
        		if(to.name =='article'){//每次进入一篇新文章时，监测id变化，并改变，重新加载内容和评论
				this.id=to.params.id
				console.log(this.id)
            	this.getArticleData(to.params.id);
            	this.getComments(to.params.id);
        		}
    		}
			},
        methods:{
			goback(){//返回上一层
				this.$router.go(-1);
			},
			
            getArticleData(id){ //根据id匹配并获取文章及内容               
                axios.get('http://127.0.0.1:8081/wordpress/wp-json/wp/v2/posts/'+id+"?_embed&fields=id,date,title.rendered,excerpt,categories,_embedded.author,content.rendered,better_featured_image.media_details.sizes")//api加上指定文章id，获取指定文章
                .then(response=>{
					console.log(response);				
					this.articleData=response.data
					console.log(this.articleData)						
					try{
						if(this.articleData.hasOwnProperty('better_featured_image')){//判断 better_featured_image字符是否存,不存在的话，下面附值语句报错
						this.imgUrl = this.articleData.better_featured_image.media_details.sizes.medium_large.source_url						
						}else{
							this.imgUrl=""

						}
						this.title = this.articleData.title.rendered//rendered有可能不存在，造成警告
						this.content = this.articleData.content.rendered
						this.date = this.articleData.date.slice(0,-3).replace("T"," ")
						this.authorName= this.articleData._embedded.author[0].name
						this.loginImg = this.articleData._embedded.author[0].avatar_urls['96']												
					}catch(e){
							   console.log("数据可能不存在方面的错误",e)
							   
					}		
									
        		})
                .catch(error=>{
                	console.log(error);
               		 alert('加载出现错误！');
        		})
			},
			
			getComments(id){
				axios.get('http://127.0.0.1:8081/wordpress/wp-json/wp/v2/comments?post='+id)
				.then(response=>{
					if(response.status==200){
						this.comments=response.data
						console.log(response)
					}					
				})
			},
			postComments(id){
				console.log(id)
				const headers = {
        			// 'Accept': 'application/json',
       				'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + localStorage.getItem('token')//构建请求体，将身份信息token加入，进行身份的验证。
				}
				let form = {					
					"post":id,//所评论文章的id
					"content":this.postContent//评论内容
				}
				axios({
                	method:'post',
                	url:"http://127.0.0.1:8081/wordpress/wp-json/wp/v2/comments",
					data:form,//需要post的内容
					headers:headers //请求头，内含代表用户信息的token令牌。           
                })
				.then(response=>{
					if(response.status==201){//返回数据中status为201时，代表post成功
						console.log(response)
						this.getComments(id)//发表新评论，刷新评论列表，全页面不刷新，只是评论组件刷新。
						this.postContent=""//评论成功，评论框清空
						this.showInput()
					 }
				})
				.catch(error=>{
					console.log("评论提交失败");
					this.inputWarn="评论提交太快，等一会再试！"                   
                })	
			},
			showInput(){//用于评论框形态的转换
				this.isInput=!this.isInput
				this.inputWarn=""//关闭评论框，警告消失
			}
		},
			
    }

</script>
<style scoped>
	@import '../assets/css/article.css';
	@import '../assets/css/index.css';
</style>
