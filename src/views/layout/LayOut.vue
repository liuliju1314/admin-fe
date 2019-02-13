<template>
    <el-container>
        <el-aside>
            <sidebar-nav :isCollapse="isCollapse"></sidebar-nav>
        </el-aside>
        <el-container class="main-box">
            <el-header  class="header-box">
                <header-nav @listenCollapse="handleCollapse"></header-nav>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import SidebarNav from "@/components/sidebar/Index";
import HeaderNav from "@/components/header/HeaderNav";
export default {
    name: "",
    data() {
        return {
            isCollapse: false
        };
    },
    components: {
        SidebarNav,
        HeaderNav
    },
    methods: {
        handleCollapse(value) {
            this.isCollapse = value;
        }
    }
};
</script>
<style lang="less">
.el-aside {
    max-width: 200px !important;
    width: auto!important;
    text-align: left;
    &>.el-menu {
        height: 100vh;
    }
}
.el-container > .el-header {
    padding: 0;
}
.el-main {
    padding: 10px;
    background-color: #f0f2f5;
}
.box-card {
    text-align: left;
    min-height: 85vh;
}
.el-card__header {
    box-sizing: border-box;
    padding: 18px 20px;
    border-bottom: 1px solid rgb(235, 238, 245);
}
.el-table th {
    font-weight: normal;
    color: rgba(0, 0, 0, 0.85);
    background: rgb(250, 250, 250);
}
.pagination-box {
    display: block;
    text-align: right;
}
.el-card__body {
    padding: 20px 20px 40px 20px;
}
</style>

<style lang="less" scoped>
.header-box {
    height: @menuHeight!important;
}
</style>

