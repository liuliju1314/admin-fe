<template>
    <el-submenu v-if="menu.children && menu.children.length > 0" :key="menu.id" :index="menu.children[0].path">
        <template slot="title">
            <svg-icon :icon-class="menu.icon"></svg-icon>
            <span>{{menu.name}}</span>
        </template>
        <template v-for="(menu, index) in menu.children">
            <menu-item class="menu-item-box" :menu="menu" :key="index"></menu-item>
        </template>
    </el-submenu>
    <el-menu-item v-else :key="menu.id" :index="menu.path">
        <svg-icon :icon-class="menu.icon"></svg-icon>
        <span>{{menu.name}}</span>
    </el-menu-item>
</template>

<script>
export default {
    name: "MenuItem",
    props: ['menu'],
    data() {
        return {
        };
    },
    components: {}
};
</script>

<style lang="less" scoped>
    .svg-icon {
        margin-right: 5px;
    }
</style>
