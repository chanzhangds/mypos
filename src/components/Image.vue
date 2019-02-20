<template>
    <div class="content">
        <div class="imageList">
            <div class="image" >
                <div class="img" v-for="(item,index) in arrList" v-if="index%2==1" @click="getTable(index,item)">
                    <img :src='item.content.rendered.match(/src\=\"(\S*)\"/)[1]' alt="">
                    <div>{{item.title.rendered}}</div>
                </div>              
            </div>
            <div class="image" >
                <div class="img" v-for="(item,index) in arrList" v-if="index%2==0" @click="getTable(index,item)">                    
                    <img :src='item.content.rendered.match(/src\=\"(\S*)\"/)[1]' alt="">
                    <div>{{item.title.rendered}}</div>
                </div>                
            </div>
            
            <div class="imageTable"  v-if="showTable">
                <div class="closeButton" @click="closeTable">
                    <img src="../assets/img/close.png" alt="">
                </div>
                <div class="img2">
                    <img :src='src' alt="">
                </div>                
                <p class="title">{{title}}</p> 
                <p class="sentence" v-html="content"></p>
            </div>
        </div>
        <div class="botton">
            <div class="add" @click="addImage()"><p>{{warn}}</p></div>
        </div>
    </div>
</template>
<script>
    import axios from'axios'
    export default{
        data() {
            return {
                arrList:[],
                tableData:"",
                showTable:false,
                src:"",
                content:"",
                title:"",
                num:1,
                showReduce:"",
                warn:"加载更多"
            }
        },
        mounted() {
            this.getImage()
        },
        methods: {
            getImage(){//利用axios获得数据 ,且数据类别categories[0]=7                            
                axios.get('http://127.0.0.1:8081/wordpress/wp-json/wp/v2/posts?categories[0]=7&page='+this.num)
                .then(response=>{
                    console.log(response);
                    this.arrList.push(...response.data);//es6写法，扩展运算符，扩展数组,将新获取到的数据压入数组。
                    console.log(this.arrList)
                })
                .catch(error=>{
                    console.log("getData error");
                    this.warn="到底了"
                })
            },
            // reduceImage(){
            //     this.num -= 1
            //     this.getImage()
            //     if(this.num==1){
            //     this.showReduce=false
            //     }
            // },
            addImage(){
                this.num += 1
                this.getImage()
                this.showReduce=true
            },
            getTable(index,item){
                this.showTable = true
                this.src = item.content.rendered.match(/src\=\"(\S*)\"/)[1]
                this.title = item.title.rendered
                this.content = item.content.rendered.match(/<p>(([\s\S])*?)<\/p>/g).join("")              
            },
            closeTable(){
                this.showTable = false

            }
        },
    }
</script>
<style>
    .imageList{
        display: flex;
        flex-direction:row;
        margin-top:0.6rem;
    }
    .image{
        display:flex;
        width:3.2rem;
        flex-direction: column; 
    }
    .img{
        width:3.1rem;
        padding:0.1rem;
        background: #fff;
        box-shadow: 0 15px 15px 0 rgba(15, 37, 64, 0.10);
        margin-top:0.2rem;
    }
    .img img{
        width:100%;
        height:100%;
    }
    .botton{
        margin-top:0.1rem;
        display:flex;
        flex-direction:row;
        justify-content:space-around;
    }
    .add{
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
    
    .imageTable{
        width:6.4rem;
        height:86%;
        position:fixed;
        padding:0.15rem;    
        bottom:0.75rem;
        background: #C1C1C1;
        display: flex;
        flex-direction: column;
        justify-content:space-between; 
        align-items: center;
    }
    .imageTable .title{
        font-size: 0.3rem;
    }
    .imageTable .sentence{
        /* width:6.4rem; */
        padding:0.1rem;
        background: #CDB38B;
        box-shadow: 0 15px 15px 0 rgba(15, 37, 64, 0.10);
        
        /* overflow: scroll */
    }
    .imageTable .img2{
        background: #fff;
        padding:0.1rem;
        box-shadow: 0 15px 15px 0 rgba(15, 37, 64, 0.10);
    }
    .imageTable img{
        width:100%;
        height:100%;
    }
    .closeButton{
        width:0.7rem;
        height:0.7rem;
        background: #CDB38B;
        border-radius: 50%;
        box-shadow: 0 15px 15px 0 rgba(15, 37, 64, 0.10);
        align-self: flex-end;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .closeButton img{
        width:80%;
        height: 80%;
    }
</style>