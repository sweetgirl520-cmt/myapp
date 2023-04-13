import Cookie from "js-cookie"
export default {
    namespaced: true,
    state:{
        menu:[]
    },
    mutations:{
        setMenu(state,val){
            state.menu = val
            Cookie.set("menu",JSON.stringify(val))
        },
        //动态注册路由
        addMenu(state,router){
            //判断缓存中是否有数据
            if(!Cookie.get('menu')) return
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            //组装动态路由的数据
            const menuArray = []
            // menu.forEach(item => {
            //     if(item.children){
            //         item.children = item.children.map(item => {
            //             item.component = () => import(`../views/${item.url}`)
            //             return item
            //         })
            //     }else{
            //         item.component = () => import(`../views/${item.url}`)
            //         menuArray.push(item)
            //     }
            // })
            menu.forEach(item => {
                if(item.children){
                    const r = {
                        path: item.path,
                        name: item.name,
                        component: () => import(`@/views/${item.url}.vue`),
                        meta: item.meta,
                      }
                      router.addRoute('main',r)
                    item.children = item.children.map(item => {
                        item.component = () => import(`../views/${item.url}`)
                        router.addRoute(r.name,item)
                        return item
                    })
                }else{
                    item.component = () => import(`../views/${item.url}`)
                    router.addRoute('main',item)
                }

            })
            // //路由的动态添加
            // menuArray.forEach(item => {
            //     router.addRoute('main',item)
            // })
            console.log(router.matcher.getRoutes())
        }
    }
}