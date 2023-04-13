<template>
    <div class="tabs">
        <el-tag
            v-for="(tag,index) in tags"
            :key="tag.name"
            :closable="tag.name !== 'home'"
            :type="tag.type"
            :effect="$route.name === tag.name ? 'dark' : 'plain'"
            @click="clickMenu(tag)"
            @close="handleClose(tag,index)"
            size="small"
        >
            {{tag.label}}
        </el-tag>
    </div>
</template>

<script>
import {mapState,mapMutations} from "vuex"
export default {
    computed:{
        ...mapState("tag",["tags"])
    },
    methods:{
        ...mapMutations('tag',{deleteTag:'deleteTag'}),
        clickMenu(item){
            this.$router.push({name:item.name})
            console.log(this.$route.path)
        },
        handleClose(tag,index){
            this.deleteTag([tag,index])
            if(this.$route.name === tag.name){
                this.$router.push(this.tags[index-1].path)
            }
        }
    }
}

</script>

<style lang='less'>
.tabs {
    padding: 20px;
    .el-tag {
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>