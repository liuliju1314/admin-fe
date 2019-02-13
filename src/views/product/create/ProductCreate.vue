<template>
    <el-card class="box-card create-product-wrapper" shadow="never">
        <div slot="header" class="clearfix">
            <span class="card-title">创建产品</span>
        </div>
        <router-link class="link-item" active-class="active" to="product/create/info">产品信息</router-link>
        <router-link class="link-item" active-class="active" to="product/create/property">产品属性</router-link>
        <router-link class="link-item" active-class="active" to="product/create/fireware">固件</router-link>
        <router-view></router-view>
    </el-card>
</template>

<script>
export default {
    name: "",
    props: [""],
    data() {
        return {};
    },
    methods: {},
    created() {
        console.log("this.$router: " + JSON.stringify(this.$route.params.pid));
    }
};
</script>
<style lang="less">
.create-product-wrapper {
    .el-step__title.is-process {
        color: #1890ff;
    }
    .el-step {
        width: auto;
        flex-basis: 25% !important;
    }
    .el-step__title,
    .el-form-item__label {
        font-size: #1890ff;
        font-size: 13px;
    }
    .el-main {
        padding: 10px;
    }
    .el-step__head.is-process {
        color: #1890ff;
        border-color: #1890ff;
    }
    .el-step.is-horizontal .el-step__line {
        height: 1px;
        left: 35px;
        right: 8px;
    }
    .el-step__icon {
        width: 28px;
        height: 28px;
    }
    .el-step__icon.is-text {
        border: 1px solid !important;
    }
    .el-step__line-inner {
        border-style: none;
    }
    .title {
        font-size: 15px;
        padding: 6px 0;
        margin-bottom: 24px;
        border-bottom: 1px solid #ddd;
    }
    .el-row {
        margin-bottom: 20px;
    }
}
</style>
<style lang='less' scoped>
.create-product-wrapper {
    background-color: #fff;
    .product-form-box {
        margin: 0 auto;
        width: 80%;
        .form-box {
            padding: 24px 30px;
        }
    }
    .link-item {
        color: #333;
        text-decoration: none;
        padding: 5px;
        margin-right: 20px;
    }
    .link-item.active {
        color: @baseColor;
        border-bottom: 2px solid @baseColor;
    }
}
.box-card {
    text-align: left;
}
</style>