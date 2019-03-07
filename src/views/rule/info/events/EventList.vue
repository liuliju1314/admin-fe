<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="20" :offset="2">
                <div>
                    <el-button
                        size="small"
                        @click="openDialog({name: 'condition', action: 'add'})"
                    >+ 添加条件</el-button>
                    <el-button
                        size="small"
                        @click="openDialog({name: 'logic', action: 'add'})"
                    >+ 添加逻辑</el-button>
                </div>
                <div class="rule-event-logic">
                    <rule-event :ruleEvent="ruleEvent"></rule-event>
                </div>
                <div v-if="isDrag" style="margin-top: 15px;">
                    <el-button @click="cancelDrag" size="small">取消</el-button>
                    <el-button type="primary" @click="updateEvent" size="small">保存编辑</el-button>
                </div>
            </el-col>
        </el-row>
        <op-rule :visible="visible" :action="action" @listenRuleOp="listenRuleOp" :conditionId="conditionId"></op-rule>
    </div>
</template>

<script>
import eventVue from "@/components/commonEvent";
import { updateRule, getRuleInfo } from "@/api/rule/rule";
export default {
    name: "RuleInfo",
    data() {
        return {
            ruleId: "",
            isDrag: false,
            base: "",
            ruleEvent: [],
            event: {
                rules: [],
                logic: ""
            },

            visible: false,
            action: "",
            conditionId: 0
        };
    },
    created() {
        this.ruleId = this.$route.params.id;
        this.handleRuleInfo();
    },
    mounted() {
        eventVue.$on("listenRuleChange", () => {
            this.isDrag = true;
        });
        eventVue.$on("listenEdit", data => {
            this.visible = true;
            this.action = data;
        });
    },
    components: {
        RuleEvent: () => import("./RuleEvent"),
        OpRule: () => import("./OpRule")
    },
    methods: {
        openDialog(action) {
            this.action = action;
            if(this.action.name === 'condition') {
                this.conditionId++;
            }
            this.visible = true;
        },
        replaceData(data, value) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id && data[i].id === value.id) {
                    data[i] = value;
                    return;
                } else {
                    if (data[i].children) {
                        this.replaceData(data[i].children, value);
                    }
                }
            }
        },
        listenRuleOp(value) {
            if (value) {
                if (value.action === "add") {
                    this.ruleEvent.push(value.logic);
                } else {
                    this.replaceData(this.ruleEvent, value.logic);
                    this.isDrag = true;
                }
            }
            this.action = "";
            this.visible = false;
        },
        // 获取Rule信息
        handleRuleInfo() {
            getRuleInfo({ tid: this.ruleId })
                .then(res => {
                    this.base = res.payload;
                    this.base.actions = JSON.parse(this.base.actions);
                    this.base.event = JSON.parse(this.base.event);
                    this.ruleEvent = this._deepClone(this.base).ruleEvent;
                    this.ruleEvent = this.ruleEvent ? this.ruleEvent: [];
                    this.conditionId = this.base.event.rules.length;
                })
                .catch(() => {});
        },
        // 取消event编辑
        cancelDrag() {
            this.isDrag = false;
            this.handleRuleInfo();
        },
        // 更新event编辑
        updateEvent() {
            this.event.logic = this.handleFormatToStr(this.ruleEvent).join(",");
            const event = {
                ...this.event
            };
            const data = {
                ...this.base,
                event: event,
                ruleEvent: this.ruleEvent,
            };
            updateRule(data).then(() => {
                this.$message({
                    type: "success",
                    message: "更新成功"
                });
                this.isDrag = false;
            });
        },
        // 将编辑数组转为后台所需格式
        handleFormatToStr(list) {
            let arr = [];
            list.forEach(item => {
                if (item.id) {
                    this.event.rules.push(item);
                    arr.push(item.id);
                } else if (item.logic && item.children) {
                    arr.push(
                        "( " +
                            this.handleFormatToStr(item.children).join(
                                " " + item.logic + " "
                            ) +
                            " )"
                    );
                }
            });
            return arr;
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
    .rule-detail-title {
        margin-top: 8px;
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
