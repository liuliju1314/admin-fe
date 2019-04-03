<template>
    <el-card class="box-card rule-detail-wrapper" shadow="never">
        <div slot="header" class="clearfix">
            <div class="card-breadcrumb">
                <router-link to="/rule" style="color: rgba(0,0,0,.45);text-decoration: none;">规则引擎</router-link>
                <span style="padding: 0 8px;color: rgba(0,0,0,.45);">/</span>
                规则详情
            </div>
            <div class="card-title">{{ruleInfo.name}}</div>
            <router-link
                class="link-item"
                active-class="active"
                :to="'/rule/'+ruleId+'/detail'"
            >基本信息</router-link>
            <router-link
                class="link-item"
                active-class="active"
                :to="'/rule/'+ruleId+'/event'"
            >Events</router-link>
            <router-link
                class="link-item"
                active-class="active"
                :to="'/rule/'+ruleId+'/action'"
            >Action</router-link>
        </div>
        <div class="rule-detail-box">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </el-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "RuleInfo",
    data() {
        return {
            activeName: "first",
            ruleId: ""
        };
    },
    computed: {
        ...mapGetters(["ruleInfo"])
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
                if ( this.$route.path.indexOf("rule") >= 0) {
                    this.ruleId = this.$route.params.id;
                    this.$store
                        .dispatch("RuleInfoGet", { tid: this.ruleId })
                        .then(() => {
                            this.$store.dispatch(
                                "updateVisitedView",
                                this.$route
                            );
                        });
                }
        }
    }
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
        font-size: 13px;
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
        font-size: 13px;
        margin-right: 32px;
        padding: 24px 10px 8px 10px;
    }
    .link-item.active {
        color: @baseColor;
        border-bottom: 2px solid @baseColor;
    }
}
</style>
