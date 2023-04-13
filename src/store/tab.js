export default {
    namespaced: true,
    state:{
        isCollapse:false  //控制是否展开
    },
    mutations:{
        isOpen(state){
            state.isCollapse = !state.isCollapse
            console.log("tab")
        }
    }
}