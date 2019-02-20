<template>
	<div class="content">
		<p class="fhbtn">
				<router-link to="/userinfo"><a class="aaa" href="javascript:;"></a></router-link>
		</p>
	    <h1></h1>
	    <div class="login-box">
	    	<p class="lsolid"></p>
	        <div class="login">
	        	<router-link to="/userlogin">登录</router-link>
	        	<span></span>
	        	<router-link to="/userreg">注册</router-link>
	        </div>
	        <p class="rsolid"></p>
		</div>
		<div class="warn">{{usernameErrorMsg}}{{passwordErrorMsg}}{{emailErrorMsg}}{{warn}}</div>
		<form action=""></form>
	    <ul>
	        <li class="lifirst">
	        	<input type="text" value="" v-model="username" />
	            <span>用户名</span>
			</li>
			<li class="lifirst">
				<input type="text" value="" v-model="email" />
	            <span>email</span>
			</li>
	        <li>
	        	<input type="password" value="" v-model="password"/>
	            <span>密码</span>
	        </li>
	    </ul>
	    <div class="footbox">
	        <input type="button" value="注 册" @click="checkForm" class="login-btn" />
	        <a href="javascript:;" class="tishi">忘记密码？</a>
	    </div>
	</div>
</template>
<script>
	import axios from 'axios'
	export default{
	data() {
		return {
			username: '',
            password: '',
			email:"",
			warn:"",
			usernameErrorMsg:'',   //当用户名出现错误的时候
			passwordErrorMsg:'',
			emailErrorMsg:''
		}
	},


	methods: {		
    	regUser(){
			console.log(this.username)
                axios.post("http://127.0.0.1:8081/wordpress/wp-json/wp/v2/users/register",{
                        username:this.username,
                        password:this.password,
						email:this.email,
						role : "author"                  
                })
                .then(response => {
					console.log(response)
					if(response.status==200){
						this.warn="注册成功"
						console.log("注册成功")
						this.$router.push('/userlogin');
					}else{
						this.warn="注册失败"
						console.log("注册失败")
					}					
				})
				.catch(error=>{
                    console.log("注册错误");
                    this.warn="注册错误"
                })	            			
		},
		checkForm(){                
            if(this.username.length<4){
                this.usernameErrorMsg="用户名不能小于4位"		              
            }else{
				this.usernameErrorMsg=''
				if(this.email.indexOf('@')==-1||this.email.indexOf('.')==-1){
					this.emailErrorMsg="邮箱格式不正确"						 
				}else{	
					this.emailErrorMsg=""
					if(this.password.length<6){
                   		this.passwordErrorMsg="密码不能少于6位"                   
                	}else{
						this.passwordErrorMsg=''
						console.log("输入格式正确")
						this.regUser()
                	}   
				}      
			}				       
        },               
	},
}
</script>
<style scoped>
	body{ background:#f2f4f5;}
	.content{max-width:6.4rem; margin:0 auto;}
	.content .fhbtn{ padding-top:0.27rem;}
	.content .fhbtn .aaa{ display:block;width:0.23rem;height:0.25rem; background:url(../assets/img/history1.png) no-repeat 0 0; background-size:100%; margin-left:0.3rem;}
	.content h1{width:2.18rem;height:1.38rem; background:url(../assets/img/logo.png) no-repeat 0 0; background-size:100%; margin:0 auto; margin-top:0.2rem;}
	.content .login{width:2.0rem;height:0.38rem; margin:0 auto; margin-top:0.85rem;}
	.login a{width:0.97rem;height:0.38rem; font-size:0.35rem; line-height:0.38rem; float:left; color:#4c4f50; text-align:center;}
	.login span{ float:left;height:0.38rem; border-left:1px solid #4c4f50;}
	.content .login-box{ position:relative;}
	.content .login-box .lsolid{width:1.96rem;height:0.18rem; border-bottom:1px solid #4c4f50; position:absolute;top:0;left:0.1rem;}
	.content .login-box .rsolid{width:1.96rem;height:0.18rem; border-bottom:1px solid #4c4f50; position:absolute;top:0;right:0.1rem;}
	.content ul{width:5.78rem;height:2.8rem; border:1px solid #e5e7e8; background:#fff; margin:0 auto; margin-top:0.68rem;}
	.content ul li{height:0.95rem; position:relative;}
	.content ul li.lifirst{border-bottom:1px solid #e5e7e8;}
	.content ul li input{ padding-left:1.24rem;width:4.54rem;height:100%; font-size:0.4rem;}
	.content ul li span{width:1.23rem;height:0.49rem; position:absolute;top:0.26rem;left:0; border-right:1px solid #676868; color:#676868; font-size:0.25rem; line-height:0.49rem; text-align:center;}
	.content .footbox{width:4.65rem;height:0.65rem;margin:0 auto; }
	.content .login-btn{width:4.65rem;height:0.65rem; background:#4c4f50; color:#fff; text-align:center; line-height:0.65rem; border-radius:8px; display:block; margin-top:0.62rem; font-size:0.28rem;}
	.content .login-btn:active{background:red;}
	.content .login-btn:visited{background:red;}
	.content .tishi{width:1.4rem; font-size:0.25rem; margin-top:0.28rem; display:block;}
	.warn{
		font-size: 0.3rem;
		text-align: center;
		height:0.4rem;
		margin:0.2rem 0.4rem 0 0.4rem;		
		color:red;
		
	}
</style>