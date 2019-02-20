<template>
        <div class="content">
            <div class="header">
                <div class="loginImg"><img :src="loginImg" alt=""/></div>
                <div class="username" v-show="!logined">{{userInfo.name}}</div> 
                <div class="user-box" v-show="logined">
                    <router-link to="/userlogin">登录</router-link>
                    <router-link to="/userreg">注册</router-link>
                </div>
                <div class="user-box" v-show="!logined">
                        <div @click="removelogin">退出登录</div>
                </div>
            </div>
            <div class="docList">              
                <div class="text" @click="getData(nameId)">
                    <div class="left"> 
                        <img src="../assets/img/sc_text.png" alt="">
                        <p>我的帖子</p>
                    </div>
                    <div class="right">
                        <img src="../assets/img/next_img.png" alt="">
                        <span>{{arrList.length}}</span>
                    </div>
                </div>
                <div class="textList" v-for="(item,index) in arrList">
                    <router-link :to="'/article/'+item.id" >
                        <div class="title"><span>{{index+1}}</span>.  {{item.title.rendered}}</div>
                        <div class="date">{{item.date.replace(/-/g,"/").slice(0,9)}}</div>
                    </router-link>
                </div>                    
            </div>
        </div>
    </template>
    <script>
    import {mapGetters} from 'vuex'
    import axios from 'axios'
        export default{
            data() {
                return {
                    logined:true,
                    loginImg:"",
                    userInfo:"",
                    nameId:"",
                    arrList:""
                }
            },
            computed:mapGetters([			
                'warn1',               
		    ]),
            mounted() {    
                this.getUserData()
            },
            methods: {
                getUserData(){                    
                    const headers = {
        			'Accept': 'application/json',
       				'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + localStorage.getItem('token')//构建请求体，将身份信息token加入，进行身份的验证。
				}
                    axios.get("http://127.0.0.1:8081/wordpress/wp-json/wp/v2/users/me",{headers:headers})
                    .then(response=>{
                        console.log(response)
                        if(response.status==200){
                            this.userInfo = response.data
                            this.loginImg = this.userInfo.avatar_urls['96']
                            this.nameId = this.userInfo.id
                            this.logined=false
                            this.getData(this.nameId)
                        }else{
                            this.logined=true
                        }
                    })
                    .catch(error=>{
                        console.log("没有帖子")
                    })
                },
                // islogined(){ 
                //     setTimeout(() => {
                //         if(localStorage.getItem("token")){
                //             this.logined=false
                //             this.username=localStorage.getItem("username")
                //             console.log(this.username)
                //         }else{
                //             this.logined=true
                //         }
                //             },10);                   
                // },
                getData(nameID){//利用axios获得数据                
                    axios.get('http://127.0.0.1:8081/wordpress/wp-json/wp/v2/posts?author='+nameID+'&fields=id,date,title.rendered')//../static/index.data
                    .then(response=>{
                        console.log(response);
                        this.arrList=response.data;
                    })
                    .catch(error=>{
                        console.log("getData error");
                        alert('网络错误，不能访问');
                    })
                },
                removelogin(){                    
                    localStorage.removeItem('token');                 
                    this.logined=true
                }
            },
            watch:{//路由监测
		        $route(to,from){            
                    if(from.path=="/userlogin"){
                        this.getUserData()                
                    }
		        }
	        },
        //     methods:{
        //         beforeRouteLeave(to, from, next) {
        // // 设置下一个路由的 meta
        //     to.meta.keepAlive = false; // 让 A 不缓存，即刷新
        //     next();
        // }
        //    }
            // watch:{
            // 	$route(to){
            // 		//console.log(to.path);
            // 		if(to.path=='/user-info'){
            // 			//console.log(this.$store.state);
            // 			this.$store.dispatch('hideHeader');
            // 		}
            // 	}
            // }
        }	
    </script>
    <style scoped>
        @import '../assets/css/mydoc.css';
        @import '../assets/css/index.css';
    </style>