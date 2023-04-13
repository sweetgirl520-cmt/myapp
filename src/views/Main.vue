<template>
    <div>
        <el-container>
            <el-aside width=auto>
                <CommonAside/>
            </el-aside>
            <el-container>
                <el-header>
                    <CommonHeader/>
                </el-header>
                    <CommonTag/>
                <el-main>
                    <!-- 路由匹配到的组件将渲染在这里 -->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import CommonAside from '../components/CommonAside'
import CommonHeader from '../components/CommonHeader'
import CommonTag from '../components/CommonTag'

export default {
    name:"Home",
    components:{
        CommonAside,
        CommonHeader,
        CommonTag
    }
}
</script>

<style>
    .el-header {
        padding: 0px;
    }
</style>