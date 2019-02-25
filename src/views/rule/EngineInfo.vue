<template>
    <el-card class="box-card rule-detail-wrapper" shadow="never">
        <div slot="header" class="clearfix">
            <div class="card-breadcrumb">
                <router-link to="/rule" style="color: rgba(0,0,0,.45);text-decoration: none;">规则引擎</router-link>
                <span style="padding: 0 8px;color: rgba(0,0,0,.45);">/</span>{{ruleID}}
            </div>
            <div class="card-title">
                智能遥感水位传感器
            </div>
        </div>

        <router-view></router-view>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            ruleID: ""
        };
    },
    created() {
        this.ruleID = this.$route.params.id;
    },
    components: {}
};
</script>
<style lang="less">
.rule-detail-wrapper {
    .el-card__header {
        padding-bottom: 0 !important;
    }
}
</style>
<style lang='less' scoped>
.rule-detail-wrapper {
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
