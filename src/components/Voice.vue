<template>
    <div class="content">
        <div class="onePage">
            <div class="g-fullPage">                   
                <div class="f-pageFirst page">
                        <div class="pageTitle">一周新鲜事</div class="pageTitle">
                   <div class="pageContent">
                       <div class="audio">
                           <audio src="../static/Sing.mp3" controls="controls"></audio>
                       </div>
                       <div class="word">
                           <p>1.押注IoT，京东推出“小京鱼”平台和五款智能新品</p> 
                           <p>2.传微软将“砍掉”Edge浏览器，研发基于谷歌Chrome引擎新品</p> 
                           <p>3.下个月开始，第三方支付机构备付金全部上交央行</p> 
                           <p>4.抢票软件要凉：12306即将上线“候补购票”功能</p>
                           <p>5.腾讯回应勒索病毒:微信用户财产和账户安全不受任何威胁</p>
                           <p>6.快手又做了一款新社区产品，取名叫“蹦迪”</p>                            
                       </div>                       
                   </div>
                   <div class="xiangxia">
                        <img src="../assets/img/xiangxia.png" alt="">
                </div>
            </div>

            <div class="page"> 
                <div class="pageTitle">一周新鲜事</div class="pageTitle">               
                <div class="pageContent">
                    
                    <div class="audio">
                        <audio src="../static/Sing.mp3" controls="controls"></audio>
                    </div>
                    <div class="word">
                        <p>1、押注IoT，京东推出“小京鱼”平台和五款智能新品</p> 
                        <p>2、传微软将“砍掉”Edge浏览器，研发基于谷歌Chrome引擎新品</p> 
                        <p>3、下个月开始，第三方支付机构备付金全部上交央行</p> 
                        <p>4、抢票软件要凉：12306即将上线“候补购票”功能</p>
                        <p>5、腾讯回应勒索病毒：微信用户财产和账户安全不受任何威胁</p>
                        <p>6、快手又做了一款新社区产品，取名叫“蹦迪”</p>                                 
                    </div>
                </div>
            </div>
                    <div class="page">3
                   <div class="pageContent">pageContent</div>

                    </div>
                    <div class="page">4
                   <div class="pageContent">pageContent</div>

                    </div>
                    <div class="page">5
                   <div class="pageContent">pageContent</div>

                    </div>
    
                </div>
        </div>
        
    </div>

</template>
<script>
export default{
    data(){
        return{
            i:0
        }
    },
    mounted(){
        this.aaa()
        this.fullPage("g-fullPage", "f-pageFirst",5)
        window.addEventListener('scroll', this.scroll)//挂载时写入事件监听，监听滚动条，滚动时
        
    },
    methods:{
        aaa(){
             var oLi = document.querySelector('.g-fullPage')            
                 oLi.style.height=document.body.clientHeight + 'px'                
                 },
        fullPage(mainClass, firstClass, num) {
            var startX = 0,                //初始横坐标
                startY = 0,                //初始纵坐标
                marginTop = 0,        //上下滑动变量
                touchNum = 0,            //上滑极限，是否可以上滑
                touchFlag = true, //可滑动标志 true 可滑动，false 不可滑
                bodyHeight = document.body.offsetHeight,
                page = document.getElementsByClassName(mainClass)[0],
                pageFirst = document.getElementsByClassName(firstClass)[0];
                
            //获取触摸的初识坐标
            page.addEventListener("touchstart",function(e){
                //  e.preventDefault();阻止冒泡事件的同时也使auido标签的开始点击失效了。
                startX = e.targetTouches[0].clientX;
                startY = e.targetTouches[0].clientY;
            })
            //重置触摸的坐标值
            page.addEventListener("touchend",function(e){
                //  e.preventDefault();
                startX = 0;
                startY = 0;
                touchFlag = true;
            })
            
               
            
            //监听并实现 上、下 滑动效果
            page.addEventListener("touchmove",function(e){
                 e.preventDefault();
                
                var newX = e.targetTouches[0].clientX,
                        newY = e.targetTouches[0].clientY;
                if (newY - startY > 50) {
                   
                    if (touchFlag == true && touchNum > 0) {
                        console.log("下滑");
                        touchFlag = false;
                        marginTop += 1;
                        touchNum -= 1;
                        pageFirst.style.marginTop = marginTop * bodyHeight+"px";
                    }
                } else if (newY - startY < -50) {
                    if (touchFlag == true && marginTop > -num+1) {
                        console.log("上滑");
                        touchFlag = false;
                        marginTop -= 1;
                        touchNum += 1;
                        pageFirst.style.marginTop = marginTop * bodyHeight+"px";
                    }
                }
            })
        },
        scroll(){
            
        }
    }
}
</script>
<style>

.onePage{
    width:6.4rem;
    margin:0 auto;
    margin-top:0.6rem;
}
.g-fullPage{            
    width: 100%;
    height: 100%;
    background-color: #fafbfc;
    overflow: hidden;
    }
.g-fullPage .page{
    width: 100%;
    height: 100%;
    padding-top:0.2rem;
    text-align: center;
    line-height: 100%;
    background-color: #f2f4f5;
    transition: 0.5s ease-in;
    }
.g-fullPage .page .pageTitle{
      font-size:0.4rem;
}
.pageContent{
    background:rgb(102, 102, 110);
    width:6rem;    
    margin:.3rem auto;
    padding:.2rem;    
    border-radius: .3rem;
}
.pageContent .word p{
    color:#fff;
    font-size:.2rem;
    margin:.3rem auto;
    line-height: .4rem;
}
.audio{
    margin-top:.2rem;
 }  
.xiangxia{
    /* margin-top:.1rem;    */
    padding:0;
    overflow: hidden;
 } 
.xiangxia img{
    width:0.95rem;
}  
</style>