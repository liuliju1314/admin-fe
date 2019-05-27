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
                <span>{{did}}</span>
                <span class="product-status" :class="devStatus === 1 ? 'online': 'outline'"></span>
                <span
                    class="product-status"
                    :class="devStatus === 1 ? '' : 'outlineText'"
                >{{devStatus === 1? '在线': '离线'}}</span>
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
            <router-link
                class="link-item"
                active-class="active"
                :to="'/product/'+pid+ '/device/'+did+'/configuration'"
            >配置详情</router-link>
        </div>
        <router-view></router-view>
    </el-card>
</template>

<script>
import { getDeviceList } from "@/api/device/device";
export default {
    data() {
        return {
            did: "",
            pid: "",
            devStatus: ""
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
                getDeviceList({ pid: this.pid, did: this.did }).then(res => {
                    this.devStatus = res.payload.items[0].status;
                });
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
    .outlineText {
        color: #74777a;
    }
}
</style>
