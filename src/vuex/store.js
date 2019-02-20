import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'//引入axios

Vue.use(Vuex)

const state ={
    header:true,
    footer:true,
    arrList:[],
    token:"",
    userID:"",
    username: '',
    password: '',
    warn1:"",
    warn2:"加载更多"
}

const mutations = {
    showHeader(state){
        state.header = true
    },
    hideHeader(state){
        state.header = false
    },
    showFooter(state){
        state.footer = true
    },
    hideFooter(state){
        state.footer = false
    },
    getData(state,num){//利用axios获得数据 ,且数据类别categories[0]=2                       
        axios.get('http://127.0.0.1:8081/wordpress/wp-json/wp/v2/posts?_embed&fields=id,date,title.rendered,excerpt,better_featured_image.media_details.sizes,categories,_embedded.author&categories[0]=2'+num)
        .then(response=>{
        console.log(response);
        state.arrList.push(...response.data);
})
        .catch(error=>{
            console.log('网络错误，不能访问');
            state.warn2="到底了"
})
    },
   
}

const actions = {
    showHeader : ({commit}) => {
        commit('showHeader')
    },
    hideHeader : ({commit}) => {
        commit('hideHeader')
    },
    showFooter : ({commit}) => {
        commit('showFooter')
    },
    hideFooter : ({commit}) => {
        commit('hideFooter')
    },
    getData : ({commit,state},num) => {
        commit('getData',num)
    },
    loginToken:({commit,state},form)=>{
        return new Promise((resolve,reject) => {//通过promise做一些异步操作
            axios({
                method:'post',
                url:"http://127.0.0.1:8081/wordpress/wp-json/jwt-auth/v1/token",
                data:form            
                })
                    .then(response => {
                        console.log(response)
                        if(response.status==200){
                            state.token=response.data.token
                            state.username=response.data.user_display_name
                            localStorage.setItem("token",state.token);//将请求到的token存入localStorage中
                            state.warn1="登录成功"                            
                            // localStorage.setItem("username",state.username)//将用户名存入                            
                            resolve(response)//当axios请求到数据时结束本函数，进入下一语句（token判定，路由跳转）
                        }else{
                            state.warn1="登录错误"
                        }									
                    })
                    .catch(error=>{
                        console.log("登录错误");
                        state.warn1="登录错误"
                    })			        
     });
    },
}

const getters = {
    headerShow:(state) => {
       return state.header;
    },
    footerShow:(state) => {
        return state.footer;
    },
    arrList: (state) => {
        return state.arrList
    },
    token:(state) => {
        return state.token
    },
    warn1:(state) => {
        return state.warn1
    },
    warn2:(state)=>{
        return state.warn2
    }

}
export default  new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})