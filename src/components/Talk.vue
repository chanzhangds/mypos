<template>
    <div class="content">
        <div class="talksList">          
                <div class="header"><p>分享你的想法</p></div>
                <div class="talksBox" v-for="(item,index) in arrList" v-show="item.categories==6"><!-- 只显示讨论（categories=6）分组的内容 -->
                    <router-link :to="'/article/'+item.id" >
                        <div class="author">
                            <a href="">
                                <img :src="item._embedded.author[0].avatar_urls['96']" alt="">
                            </a>
                            <p>{{item._embedded.author[0].name}}</p>
                        </div>
                        <div class='word'>
                            <h2>{{item.title.rendered}}</h2>                            
                            <p>{{item.excerpt.rendered.slice(3,80)}}</p>
                        </div>
                                
                                <img :src="item.content.rendered.match(/src\=\'(\S*)\'/)?item.content.rendered.match(/src\=\'(\S*)\'/)[1].replace('#038;',''):null" alt="">         
                            <!-- <img :src="item.hasOwnProperty('media_details')?item.better_featured_image.media_details.sizes.medium_large.source_url:null"  alt=""> -->
                        <!-- hasOwnProperty('media_details')判断 media_details字符是否存在item json数据中，存在说明有图片，不存在说明没有图片-->
                    </router-link>
                </div>
                <div class="postBoxMin" v-show="isShow" @click="showBox()">
                   <img src="../assets/img/add.png" alt="">
                </div>
                <div class="postBoxMax" v-show="!isShow">
                    <div class="closeButton" @click="showBox()">
                        <img src="../assets/img/close.png" alt="">
                    </div>
                    <div class="postTitle">                  
                       <span> 标题：</span><input type="text" v-model="postTitle">
                    </div> 
                    <div class="postContent">
				        <span> 内容：</span><textarea name="" id="" cols="6" rows="15" v-model="postContent"  placeholder=" 说点什么吧。。。"></textarea>
                    </div>
                    <div class="postButton">
                        <div><span>输入图片地址：</span>
                             <input type="text" v-model="postSrc">
                            <input class="button" type="button" value="插入图片" @click="insertImg()">
                        </div>
                        <div>                                                  
                            <input class="button" type="button" value="换行" @click="insertHang()">
                        </div>
                        <input class="button" type="button" value="提交" @click="postData()">
                    </div>  
                                      
                </div>                    
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import axios from "axios"
export default {
    data(){
        return{                
            activeDate:1,
            i:0,
            arrList:"",
            isShow:true,
            postTitle:"",
            postSrc:"",
            postContent:"",
        }
     },       
    computed:mapGetters([
        'headerShow',
        // 'arrList'
    ]),
    
    created() {
        this.getData()
    },
    mounted(){            
       
    },
    
    methods:{
        getData(){
            // this.$store.dispatch('hideHeader')
            axios.get('http://127.0.0.1:8081/wordpress/wp-json/wp/v2/posts?_embed&fields=id,date,title.rendered,excerpt,better_featured_image.media_details.sizes,content.rendered,categories,_embedded.author&categories[0]=6')
        .then(response=>{
                console.log(response);
                this.arrList=response.data;
})
        .catch(error=>{
        console.log("getData error");
       
})
        },
        showBox(){
            this.isShow = !this.isShow        
        },
        insertImg(){
            this.postContent = this.postContent +"<img width='480px' height='270px'  src='"+this.postSrc+"'>"
            this.postSrc = ""
        },
        insertHang(){
            this.postContent = "<p>"+this.postContent +"</p>"
        },
        postData(){
            const headers = {
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')//构建请求体，将身份信息token加入，进行身份的验证。
            }
            let form = {
                "title":this.postTitle,
                "categories":[6],
	            // "featured_media":35,
	            "status": "publish",
                "content":this.postContent
            }
            axios({
                method:"post",
                url:"http://127.0.0.1:8081/wordpress/wp-json/wp/v2/posts",
                data:form,
                headers:headers
            })
            .then(response=>{
                if(response.status==201){
                    console.log(response)
                    this.getData()
                    this.showBox()
                }
            })
            .catch(error=>{
                console.log("post error")
            })
        },
        
    },
}           
</script>
<style scoped>
.content .header{
    font-size: 0.4rem;
    height:1rem;
    background: #fafbfc;
    padding:0.2rem 0.2rem; 
    border: 0.013rem solid #dbe2e8;
    border-radius: 0.03px;
    margin-bottom: 0.2rem;
    box-shadow: 0 15px 15px 0 rgba(15, 37, 64, 0.10);

    display: flex;
    align-items: center;
}    
.content .talksList{
    width: 6.4rem;
    margin:0 auto;
}

.talksList .talksBox{    
    font-size:0.23rem;
    background: #707070;
    padding:0.2rem auto;
    border: 0.013rem solid #dbe2e8;
    border-radius: 0.03px;
    margin: 0.1rem 0.15rem;
    box-shadow:0.5px 1px 2px #4F4F4F ;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.talksList .talksBox a{
    color:#fff;
}
.talksList .talksBox .author{    
    padding: 0.14rem ; 
    display: flex;
    flex-direction: row;
    align-content: center;
    border-bottom:1px solid #494d4d;
} 
.talksList .talksBox .author img{
    width:0.6rem;
    height:0.6rem;
    border-radius:50%;    
    display:inline-block;
    
}
.talksList .talksBox .author p{
    display:inline-block;
    margin-left:0.2rem;
    margin-top:0.1rem;
    font-weight: 800;
    color:#fff;
    font-size:0.25rem 
}
.talksList .talksBox img{
    display:block;
    width:100%;
    max-width:6.8rem;
}
.talksList .talksBox .word{
    padding:0.2rem 0.2rem;
}
.talksList .talksBox h2{
    color:#fff;
    max-height:0.9rem;
    font-size:0.32rem;    
    margin-bottom: 0.2rem;
    overflow:hidden;}
.talksList .talksBox p{max-height:1.8rem;
    margin-top:0.05rem;    
    overflow:hidden;}
.postBoxMin{
    width:0.9rem;
    height:0.9rem;
    border-radius: 50%;
    box-shadow:0px 1px 2px #404040 ;
    position:fixed;
    right:0.2rem;
    bottom:0.9rem;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    }
.postBoxMin img{
    width:90%;
    height:90%;
}
.postBoxMax{
    width:6.4rem;
    height:84%;
    position:fixed;
    padding:0.1rem;    
    bottom:0.8rem;
    background: #707070;
    display: flex;
    flex-direction: column;
    justify-content:space-between; 
}
.postBoxMax .closeButton{
    width:0.7rem;
    height:0.7rem;
    background: #CCCCCC;
    border-radius: 50%;
    box-shadow:0px 1px 2px #404040 ;
    align-self: flex-end;
    display: flex;
    justify-content: center;
    align-items: center;
}
.postBoxMax .closeButton img{
    width:90%;
    height:90%;
}
.postBoxMax .closeButton:active{
		background: red;
	}
.postTitle span{
    width:100%;
    font-size: 0.3rem;
    color: #fff;
}
.postTitle input{
    background: #fff;
    width:80%;
    height:0.6rem;
}
.postContent textarea{
    width:100%;

}
.postContent span{
    color:#fff;
    font-size: 0.3rem;

}
/* .postButton{
    padding-bottom:0.2rem;
    display:flex;
    flex-direction: column;
    justify-content: center;
} */
.postButton{
    display:flex;
    flex-direction: column;
}
.postButton input{
    background: #fff;
    width:1rem;
    height:0.6rem;
}
.postButton span{
    color:#fff;
    font-size: 0.3rem;
}
.postButton .button{
    background: #CCCCCC;
    border-radius: 10%;
    box-shadow:0px 1px 1px #404040 ;

}
.postButton .button:nth-child(3){
    background:red;
    align-self: flex-end;
}
</style>