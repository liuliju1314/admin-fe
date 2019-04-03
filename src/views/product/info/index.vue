<template>
    <el-card class="box-card product-detail-wrapper" shadow="never">
        <div slot="header" class="clearfix">
            <div class="card-breadcrumb">
                <router-link
                    to="/product"
                    style="color: rgba(0,0,0,.45);text-decoration: none;"
                >产品管理</router-link>
                <span style="padding: 0 8px;color: rgba(0,0,0,.45);">/</span>
                产品详情
            </div>
            <div class="card-title">{{baseInfo.name}}</div>
            <router-link
                class="link-item"
                active-class="active"
                :to="'/product/'+pid+'/detail'"
            >基本信息</router-link>
            <router-link
                class="link-item"
                active-class="active"
                :to="'/product/'+pid+'/property'"
            >属性管理</router-link>
            <router-link
                class="link-item"
                active-class="active"
                :to="'/product/'+pid+'/firmware'"
            >固件升级</router-link>
            <router-link
                class="link-item"
                active-class="active"
                :to="'/product/'+pid+'/device'"
            >设备管理</router-link>
            <router-link
                class="link-item"
                active-class="active"
                :to="'/product/'+pid+'/analyse'"
            >数据分析</router-link>
        </div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </el-card>
</template>

<script>
import { mapGetters } from "vuex";
import proInfo from "./mixins/proInfo";
export default {
    mixins: [proInfo],
    data() {
        return {
            pid: ""
        };
    },
    computed: {
        ...mapGetters(["baseInfo"])
    },

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
        font-size: 13px;
        margin-bottom: 20px;
    }
    .card-title {
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
        font-size: 22px;
        line-height: 28px;
    }
    .link-item {
        display: inline-block;
        font-size: 13px;
        text-decoration: none;
        color: #333;
        margin-right: 32px;
        padding: 20px 10px 8px 10px;
    }
    .link-item.active {
        color: @baseColor;
        border-bottom: 2px solid @baseColor;
    }
}
</style>
