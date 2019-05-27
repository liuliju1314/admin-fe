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
            <div class="card-title">
                {{baseInfo.name}}
                <span class="product-circle"></span>
                <span class="product-status">{{baseInfo.productStatus === '1'? '已发布': '开发中'}}</span>
            </div>
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
                :to="'/product/'+pid+'/configuration'"
            >配置管理</router-link>
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
export default {
    data() {
        return {
            pid: ""
        };
    },
    computed: {
        ...mapGetters(["baseInfo"])
    },
    created() {
        this.init();
    },
    watch: {
        $route() {
            this.init();
        }
    },
    methods: {
        init() {
            this.pid = this.$route.params.id;
            if (
                this.pid &&
                this.$route.path.indexOf("product") >= 0 &&
                !this.$route.params.did
            ) {
                this.$store
                    .dispatch("BaseInfoGet", { pid: this.pid })
                    .then(() => {
                        this.$store.dispatch("updateVisitedView", this.$route);
                        // console.log(this.baseInfo);
                    });
            }
        }
    }
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
        .product-circle {
            width: 6px;
            height: 6px;
            display: inline-block;
            vertical-align: middle;
            margin: 0 4px 0 10px;
            border-radius: 50%;
            background-color: #1890ff;
        }
        .product-status {
            font-size: 13px;
            color: #1890ff;
        }
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
