<template>
    <el-card class="box-card product-detail-wrapper" shadow="never">
        <div slot="header" class="clearfix">
            <div class="card-breadcrumb">
                <router-link to="/product" style="color: rgba(0,0,0,.45);text-decoration: none;">产品管理</router-link>
                <span style="padding: 0 8px;color: rgba(0,0,0,.45);">/</span>1b38dfe343y
            </div>
            <div class="card-title">
                智能遥感水位传感器
            </div>
            <router-link
                class="link-item"
                active-class="active"
                :to="'/product/'+productID+'/detail'"
            >基本信息</router-link>
            <router-link
                class="link-item"
                active-class="active"
                :to="'/product/'+productID+'/property'"
            >属性管理</router-link>
            <router-link
                class="link-item"
                active-class="active"
                :to="'/product/'+productID+'/fireware'"
            >固件升级</router-link>
                        <router-link
                class="link-item"
                active-class="active"
                :to="'/product/'+productID+'/device'"
            >设备管理</router-link>
        </div>

        <router-view></router-view>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            productID: "1z0zbfe0db5"
        };
    },
    components: {}
};
</script>
<style lang="less">
.product-detail-wrapper {
    .el-card__header {
        padding-bottom: 0 !important;
    }
}
</style>
<style lang='less' scoped>
.product-detail-wrapper {
    .el-card__header {
        padding-bottom: 0 !important;
    }
    .card-breadcrumb {
        font-size: 14px;
        margin-bottom: 24px;
    }
    .card-title {
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
        font-size: 22px;
        line-height: 28px;
    }
    .link-item {
        display: inline-block;
        text-decoration: none;
        color: #333;
        margin-right: 32px;
        padding: 24px 10px 8px 10px;
    }
    .link-item.active {
        color: @baseColor;
        border-bottom: 2px solid @baseColor;
    }
}
</style>
