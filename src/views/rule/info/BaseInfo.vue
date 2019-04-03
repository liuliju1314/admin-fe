<template>
    <div class="base-info-box">
        <table class="table-box">
            <tr>
                <td class="label">规则名称:</td>
                <td class="value">{{ruleInfo.name}}</td>
            </tr>
            <tr>
                <td class="label">属性名称:</td>
                <td class="value">{{ruleInfo.taskKey}}</td>
            </tr>
            <tr>
                <td class="label">规则描述:</td>
                <td class="value">{{ruleInfo.desc}}</td>
            </tr>
        </table>
        <el-button @click="doEdit" style="padding: 10px 22px; margin: 30px 0 0 100px;">编辑</el-button>
        <add-engine :rule="rule" :visible="dialogVisible" @listenAdd="listenAdd"></add-engine>
    </div>
</template>

<script>
import AddEngine from "@/views/rule/AddEngine";
import { mapGetters } from "vuex";
export default {
    name: "BaseInfo",
    data() {
        return {
            rule: "",
            ruleId: "",
            base: "",
            baseInfo: "",
            dialogVisible: false
        };
    },
    components: {
        AddEngine
    },
    created() {
        this.init();
    },
    computed: {
        ...mapGetters(["ruleInfo"])
    },
    watch: {
        $route() {
            this.init();
        }
    },
    methods: {
        init() {
            this.ruleId = this.$route.params.id;
            if (this.ruleId && this.$route.path.indexOf("rule") >= 0) {
                this.$store
                    .dispatch("RuleInfoGet", { tid: this.ruleId })
                    .then(() => {
                        this.$store.dispatch("updateVisitedView", this.$route);
                    });
            }
        },
        doEdit() {
            this.rule = this.ruleInfo;
            this.dialogVisible = true;
        },
        listenAdd(value) {
            this.dialogVisible = value;
            // this.handleRuleInfo();
        }
    }
};
</script>
<style lang='less' scoped>
.ve-pie {
    height: 190px !important;
}
.add-category {
    margin-left: 90px;
    padding-top: 0 !important;
    padding-bottom: 22px !important;
}
.link-item {
    text-decoration: none;
    padding-right: 22px;
}
.base-info-box {
    width: 60%;
    margin: 20px auto;
    .label {
        width: 100px;
        color: #797979;
        padding: 12px 10px;
        box-sizing: border-box;
    }
    .value {
        padding: 12px 0;
    }
}
</style>