<template>
    <el-container>
        <el-aside>
            <sidebar-nav :isCollapse="isCollapse"></sidebar-nav>
        </el-aside>
        <el-container class="main-box">
            <el-header class="header-box">
                <header-nav @listenCollapse="handleCollapse"></header-nav>
            </el-header>
            <tags-view></tags-view>
            <el-main>
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import SidebarNav from "@/components/sidebar/Index";
import HeaderNav from "@/components/header/HeaderNav";
import TagsView from "@/components/tagsView/TagsView";
export default {
    name: "",
    data() {
        return {
            isCollapse: true
        };
    },
    components: {
        SidebarNav,
        HeaderNav,
        TagsView
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
    width: auto !important;
    overflow: hidden;
    text-align: left;
    & > .el-menu {
        height: 100%;
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
    min-height: calc(100vh - 76px);
}
.el-dialog__body {
    padding: 20px;
}
.el-card__header {
    box-sizing: border-box;
    padding: 18px 20px;
    border-bottom: 1px solid rgb(235, 238, 245);
}
.el-button [class*="el-icon-"] + span {
    margin-left: 2px;
}
.el-button + .el-button {
    margin-left: 10px;
}
.pagination-box {
    display: block;
    text-align: right;
}
.el-card__body {
    padding: 20px 20px 40px 20px;
}
.el-form-item__label {
    color: #333;
}
.el-progress__text {
    font-size: 12px !important;
}
.el-icon-refresh:hover {
    color: @baseColor;
}
</style>

<style lang="less" scoped>
.header-box {
    height: @menuHeight!important;
    overflow: hidden !important;
}
.clearfix {
    overflow: hidden;
}
</style>

