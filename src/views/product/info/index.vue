<template>
    <el-card class="box-card product-detail-wrapper" shadow="never">
        <div slot="header" class="clearfix">
            <div class="card-breadcrumb">
                <router-link
                    to="/product"
                    style="color: rgba(0,0,0,.45);text-decoration: none;"
                >产品管理</router-link>
                <span style="padding: 0 8px;color: rgba(0,0,0,.45);">/</span>
                {{pid}}
            </div>
            <div class="card-title">{{productName}}</div>
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
                :to="'/product/'+pid+'/data'"
            >数据分析</router-link>
        </div>

        <router-view></router-view>
    </el-card>
</template>

<script>
import { getProductInfo } from "@/api/product/product";
export default {
    data() {
        return {
            pid: "",
            productName: ""
        };
    },
    created() {
        this.pid = this.$route.params.id;
        this.handleProductInfo();
    },
    watch: {
        $route() {
            this.pid = this.$route.params.id;
            if (this.pid) {
                this.handleProductInfo();
            }
        }
    },
    methods: {
        handleProductInfo() {
            getProductInfo({ pid: this.pid })
                .then(res => {
                    this.productName = res.payload.name;
                })
                .catch(err => {
                    this.$message({
                        message: err.msg
                    });
                });
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
