<template>
    <ul class="nav-container">
        <li class="icon-box nav-item" @click="triggerCollapse">
            <svg-icon v-if="!isCollapse" icon-class="takeup"></svg-icon>
            <svg-icon v-else icon-class="open"></svg-icon>
        </li>
        <li class="nav-item right-menu">
            <el-dropdown @command="handleCommand">
                <div class="el-dropdown-link">
                    <span>user</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="logout">
                        退出系统
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </li>
        <li class="nav-item right-menu">
            <el-badge :value="100" :max="99">
                <i class="el-icon-bell"></i>
            </el-badge>
        </li>
    </ul>
</template>

<script>
export default {
    name: "HeaderNav",
    data() {
        return {
            isCollapse: false
        };
    },
    methods: {
        triggerCollapse() {
            this.isCollapse = !this.isCollapse;
            console.log(this.isCollapse);
            this.$emit("listenCollapse", this.isCollapse);
        },
        handleCommand(command) {
            if(command == 'logout'){
                this.$store.dispatch("UserLogout").then(() => {
                    this.$router.push("/login");
                });
            }
        }
    }
};
</script>
<style>
.el-badge__content.is-fixed {
    right: 8px;
    top: 18px;
}
</style>

<style lang="less" scoped>
.nav-container {
    .nav-item {
        float: left;
        padding: 0 20px;
        height: @menuHeight;
        line-height: @menuHeight;
    }
    .right-menu {
        float: right;
    }
}
</style>

