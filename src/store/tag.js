export default {
    namespaced: true,
    state:{
        currentMenu:null,
        tags:[{
            path: '/',
            name: 'home',
            label: '首页',
            icon: 's-home',
            url: 'Home/Home'
          }]
    },
    mutations:{
        selectMenu(state,val){
            if(val.name==='home'){
                state.currentMenu = null
            }else{
                state.currentMenu = val
                //查找之前是否有这个菜单，如果等于-1说明tabsList不存在那么插入，否则什么都不做
                let result = state.tags.findIndex(item => item.name === val.name)
                if(result === -1){
                    state.tags.push(val)
                }
            }
        },
        //删除tag
        deleteTag(state,[tag,index]){
            state.tags.splice(index,1)
        }
    }
}