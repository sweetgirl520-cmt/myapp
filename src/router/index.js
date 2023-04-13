import VueRouter from "vue-router"
import Home from "../views/Home"
import User from "../views/User"
import Main from "../views/Main"
import Mall from "../views/Mall"
import Other from "../views/Other"
import Login from "../views/Login"

import Page1 from "../views/Page1"
import Page2 from "../views/Page2"

import Cookie from "js-cookie"
const router = new VueRouter({
    routes:[
        {
            path:"/",
            redirect:"/home",  //重定向
            name:'main',
            component:Main,
            children:[
                // {path:"/home",name:'home',component:Home,meta:{title:"首页"}},
                // {path:"/user",name:'user',component:User,meta:{title:"用户管理"}},
                // {path:"/mall",name:'mall',component:Mall,meta:{title:"商品管理"}},
                // {
                //     path:"/other",
                //     component:Other,
                //     meta:{title:"其他"},
                //     children:[
                //         {path:"page1",name:'page1',component:Page1,meta:{title:"页面1"}},
                //         {path:"page2",name:'page2',component:Page2,meta:{title:"页面2"}}
                //     ]
                // }
                
            ]
        },
        {
            path:"/login",
            name:"login",
            component:Login
        }
    ]
})

router.beforeEach((to,from,next)=>{
    //判断token存不存在
    const token = Cookie.get("token")
    // token不存在，说明当前用户是未登录T应该跳转至登录页
    if(!token && to.name !== "login"){
        next({name:'login'})
    }else if(token && to.name === 'login'){// token存在，说明用户登录，此时跳转至首页
        next({name:'home'})
    }else{
        next()
    }
})

export default router