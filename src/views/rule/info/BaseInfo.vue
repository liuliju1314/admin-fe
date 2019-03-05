<template>
    <div class="base-info-box">
        <table class="table-box">
            <tr>
                <td class="label">规则名称:</td>
                <td class="value">{{baseInfo.name}}</td>
            </tr>
            <tr>
                <td class="label">属性名称:</td>
                <td class="value">{{baseInfo.taskKey}}</td>
            </tr>
            <tr>
                <td class="label">规则描述:</td>
                <td class="value">{{baseInfo.desc}}</td>
            </tr>
        </table>
        <el-button @click="doEdit" style="padding: 10px 22px; margin: 30px 0 0 100px;">编辑</el-button>
        <add-engine :rule="rule" :visible="dialogVisible" @listenAdd="listenAdd"></add-engine>
    </div>
</template>

<script>
import AddEngine from "@/views/rule/AddEngine";
import { getRuleInfo } from "@/api/rule/rule";
export default {
    name: "BaseInfo",
    data() {
        return {
            rule: "",
            ruleId: "",
            base: '',
            baseInfo: "",
            dialogVisible: false
        };
    },
    components: {
        AddEngine
    },
    created() {
        this.ruleId = this.$route.params.id;
        this.handleRuleInfo();
    },
    methods: {
        handleRuleInfo() {
            getRuleInfo({ tid: this.ruleId })
                .then(res => {
                    this.base = res.payload;
                    this.baseInfo = this._deepClone(this.base);
                })
                .catch(() => {});
        },
        doEdit() {
            this.rule = this.baseInfo;
            this.dialogVisible = true;
        },
        listenAdd(value) {
            this.dialogVisible = value;
            this.handleRuleInfo();
        }
    }
};
</script>
<style lang="less">
// .base-info-box {
//     .notEdit {
//         input {
//             border: 0;
//             padding: 0;
//             height: 30px;
//             font-size: 16px;
//             color: #333;
//         }
//     }
// }
</style>
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