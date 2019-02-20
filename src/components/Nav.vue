<template>        
        <div class="nav"> 
            <ul>     
                <router-link to="/home" tag="li" active-class="active">
                    <a href="javascript:;">热门</a>
                </router-link>
                <router-link to="/Image" tag="li" active-class="active">
                    <a href="javascript:;">image</a>
                </router-link>
                <router-link to="/column" tag="li" active-class="active">
                    <a href="javascript:;">栏目</a>
                </router-link>
                
            </ul>
        </div>
    </template>
    <style scoped>

    </style>
    <script>
        export default{
            name:'headernav',
            data(){
        return{

        }
    }
        }
    </script>