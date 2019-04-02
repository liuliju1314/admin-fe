<template>
    <el-card class="box-card device-detail-wrapper" shadow="never">
        <div slot="header" class="clearfix">
            <div class="card-breadcrumb">
                <router-link to="/product" style="color: rgba(0,0,0,.45);text-decoration: none;">产品管理</router-link>
                <span style="padding: 0 8px;color: rgba(0,0,0,.45);">/</span>
                设备详情
            </div>
            <div class="card-title">{{deviceID}}</div>
            <router-link
                class="link-item"
                active-class="active"
                :to="'/device/'+deviceID+'/detail'"
            >设备信息</router-link>
            <router-link
                class="link-item"
                active-class="active"
                :to="'/device/'+deviceID+'/state'"
            >运行状态</router-link>
        </div>
        <router-view></router-view>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            deviceID: ""
        };
    },
    created() {
        this.deviceID = this.$route.params.did;
    },
    components: {}
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
}
</style>
