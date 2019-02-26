<template>
    <el-card class="box-card rule-detail-wrapper" shadow="never">
        <div slot="header" class="clearfix">
            <div class="card-breadcrumb">
                <router-link to="/rule" style="color: rgba(0,0,0,.45);text-decoration: none;">规则引擎</router-link>
                <span style="padding: 0 8px;color: rgba(0,0,0,.45);">/</span>
                {{ruleID}}
            </div>
            <div class="card-title">智能遥感水位传感器</div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="基本信息" name="first">
                    <base-info></base-info>
                </el-tab-pane>
                <el-tab-pane label="Event" name="second">
                    <event-list></event-list>
                </el-tab-pane>
                <el-tab-pane label="Action" name="third">
                    <action-list></action-list>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!-- <div>
            <router-link
                class="link-item"
                active-class="active"
                :to="'/rule/'+ruleID+'/detail'"
            >基本信息</router-link>
            <router-link
                class="link-item"
                active-class="active"
                :to="'/rule/'+ruleID+'/event'"
            >Events</router-link>
            <router-link
                class="link-item"
                active-class="active"
                :to="'/rule/'+ruleID+'/action'"
            >Action</router-link>
        </div>-->
        <!-- <div class="rule-detail-box">
            <router-view></router-view>
        </div>-->
    </el-card>
</template>

<script>
export default {
    name: "RuleInfo",
    data() {
        return {
            activeName: "first",
            ruleID: ""
        };
    },
    components: {
        BaseInfo: () => import("./BaseInfo"),
        EventList: () => import("./events/EventList"),
        ActionList: () => import("./action/ActionList")
    },
    created() {
        this.ruleID = this.$route.params.id;
    }
};
</script>
<style lang="less">
.rule-detail-wrapper {
    .el-card__header {
        padding-bottom: 0 !important;
        border-bottom: 0;
    }
    .el-tabs__item {
        font-size: 16px;
        padding: 24px 20px 8px 20px;
        height: auto;
        line-height: 1.5;
        box-sizing: content-box;
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
