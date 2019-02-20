<template>
    <div class="content">
        <div class="card">            
            
                <div class="title"  @click="show(0)">
                    <span>数码设备</span>
                </div>
                    <div class="cardContent" v-show="showCard[0]">
                        <div class="cardOne" v-for="(item,index) in arrList" v-show="item.categories[1]==3||item.categories[0]==3">                            
                                <router-link :to="'/article/'+item.id" >                                    
                             {{item.title.rendered}}
                        </router-link>
                    </div>
                </div> 
                            
                <div class="title" @click="show(1)">
                        <span>科技生活</span>
                </div>
                        <div class="cardContent" v-show="showCard[1]">
                        <div class="cardOne" v-for="(item,index) in arrList" v-show="item.categories[1]==5">
                                <router-link :to="'/article/'+item.id" >
                                    {{item.title.rendered}}
                                </router-link>
                            </div>
                        </div> 
                            
                <div class="title"  @click="show(2)">
                    <span>软件推荐</span>
                </div>
                    <div class="cardContent" v-show="showCard[2]">
                        <div class="cardOne" v-for="(item,index) in arrList" v-show="item.categories[1]==3">
                            <router-link :to="'/article/'+item.id" >
                                {{item.title.rendered}}
                            </router-link>
                        </div>
                    </div> 
                            
                <div class="title" @click="show(3)">
                    <span>科技常识</span>
                </div>
                    <div class="cardContent" v-show="showCard[3]">
                        <div class="cardOne" v-for="(item,index) in arrList" v-show="item.column=='wild'">
                            <router-link :to="'/article/'+item.id" >
                                {{item.title.rendered}}
                            </router-link>
                        </div>                                
                    </div>                 
        </div>
    </div>
</template>
<script>
   import {mapGetters} from 'vuex'
    import axios from 'axios'
    export default {
        data(){
            return{
                showCard:[false,false,false,false],//每一个列表的v-show，默认列表是不打开的状态。
                                        
            }
        },
        computed:mapGetters([
            'arrList'
		]),
        created() {
            this.getData()//挂载时运行，获取数据。
        },
        mounted(){
            
        },
        methods:{
            show(cardX){                
                this.$forceUpdate()//解决vue数组中对象属性变化页面不渲染问题，数据层次太多，没有触发render函数进行自动更新，需手动调用
                this.showCard[cardX]==false?this.$set(this.showCard,cardX,true):this.$set(this.showCard,cardX,false)                                    
                // if(cardX=="2"){setTimeout(() => {this.showCard2==false?this.showCard2=true:this.showCard2=false},100)}
                // if(cardX=="3"){setTimeout(() => {this.showCard3==false?this.showCard3=true:this.showCard3=false},100)}
                // if(cardX=="4"){setTimeout(() => {this.showCard4==false?this.showCard4=true:this.showCard4=false},100)}                   
            },
            getData(){//利用axios获得数据 
                let num ='&per_page=99'  //获取全部post信息          
                this.$store.dispatch('getData',num)//调用vuex内getData函数，并向函数传参               
                
                //利用axios获得数据                
            // axios.get('http://127.0.0.1:8081/wordpress/wp-json/wp/v2/posts')//../static/index.data
            // .then(response=>{
            //     console.log(response);
            //     this.arrList=response.data;
            //     for(let i=0;i<response.data.length;i++){
            //        console.log(response.data[i].categories)
            //          if(response.data[i].categories[0]==4) {
            //              console.log("ok")
            //          } else{
            //             console.log("okkk")

            //          }                    
            //     }
            // })
            // .catch(error=>{
            //     console.log(error);
            //     alert('网络错误，不能访问');
            // })
            },
        }
    }
    </script>
<style>

.card{    
    width:6.4rem;
    margin:0 auto;
    margin-top:0.7rem;
    padding:0 0.15rem;
    display:flex;
    flex-direction: column;
    justify-content: center;
}

.card .title{ 
    color:#494d4d;
    font-size:0.4rem;
    background: hsl(210, 25%, 98%);   
    padding:0.2rem auto;
    border: 0.013rem solid #dbe2e8;
    height:1.1rem;
    border-radius: 0.2rem;
    margin-bottom: 0.2rem;
    box-shadow: 0 1px 2px rgba(46,61,73,.08);
}
.card .title span{
    margin-left:0.4rem;
    margin-top:0.2rem;
    display:block;
}
.cardContent .cardOne{
    background: #808080;
    margin:0.1rem 0.06rem;
    height:1.4rem;   
    font-size: 0.3rem;
    padding:0.2rem;
    border-radius: 0.06rem;

}
.cardContent .cardOne a{
    color:hsl(210, 25%, 98%);

}
</style>