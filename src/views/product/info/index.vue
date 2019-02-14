<template>
    <el-card class="box-card product-detail-wrapper" shadow="never">
        <div slot="header" class="clearfix">
            <div class="card-title">
                <router-link to="/product" style="color: rgba(0,0,0,.45);text-decoration: none;">产品</router-link>
                <span style="padding: 0 8px;color: rgba(0,0,0,.45);">/</span>智能家居
            </div>
            <router-link class="link-item" active-class="active" :to="'/product/'+productID+'/detail'">基本信息</router-link>
            <router-link class="link-item" active-class="active" :to="'/product/'+productID+'/property'">属性</router-link>
            <router-link class="link-item" active-class="active" :to="'/product/'+productID+'/fireware'">固件</router-link>
        </div>

        <router-view></router-view>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            productID: '1z0zbfe0db5'
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
    .link-item {
        display: inline-block;
        text-decoration: none;
        color: #333;
        margin-right: 32px;
        padding: 24px 10px 5px 10px;
    }
    .link-item.active {
        color: @baseColor;
        border-bottom: 2px solid @baseColor;
    }
}
</style>
