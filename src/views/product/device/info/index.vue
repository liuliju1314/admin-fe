<template>
    <el-card class="box-card device-detail-wrapper" shadow="never">
        <div slot="header" class="clearfix">
            <div class="card-breadcrumb">
                <router-link
                    to="/product"
                    style="color: rgba(0,0,0,.45);text-decoration: none;"
                >产品管理</router-link>
                <span style="padding: 0 8px;color: rgba(0,0,0,.45);">/</span>
                <router-link
                    :to="'/product/' + pid +'/device'"
                    style="color: rgba(0,0,0,.45);text-decoration: none;"
                >设备管理</router-link>
                <span style="padding: 0 8px;color: rgba(0,0,0,.45);">/</span>
                设备详情
            </div>
            <div class="card-title">
                <span> {{did}} </span>
            </div>
            <router-link
                class="link-item"
                active-class="active"
                :to="'/product/'+pid+'/device/'+did+'/detail'"
            >设备信息</router-link>
            <router-link
                class="link-item"
                active-class="active"
                :to="'/product/'+pid+ '/device/'+did+'/state'"
            >运行状态</router-link>
        </div>
        <router-view></router-view>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            did: "",
            pid: ""
        };
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
            if (this.$route.params.did) {
                this.pid = this.$route.params.id;
                this.did = this.$route.params.did;
                this.$store
                    .dispatch("DeviceInfoSet", { name: this.did })
                    .then(() => {
                        this.$store.dispatch("updateVisitedView", this.$route);
                    });
            }
        }
    }
};
</script>
<style lang="less">
.device-detail-wrapper {
    .el-card__header {
        padding-bottom: 0 !important;
    }
}
</style>
<style lang='less' scoped>
.device-detail-wrapper {
    .el-card__header {
        padding-bottom: 0 !important;
    }
    .card-title {
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
        font-size: 22px;
        line-height: 28px;
    }
    .card-breadcrumb {
        font-size: 12px;
        margin-bottom: 20px;
    }
    .link-item {
        font-size: 12px;
        display: inline-block;
        text-decoration: none;
        color: #333;
        margin-right: 32px;
        padding: 20px 10px 8px 10px;
    }
    .link-item.active {
        color: @baseColor;
        border-bottom: 2px solid @baseColor;
    }
    .device-status {
        font-size: 12px;
        color: #86dff9;
        .spot {
            display: inline-block;
            margin-right: 4px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #86dff9;
        }
    }
}
</style>
