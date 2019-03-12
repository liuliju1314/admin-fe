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
                    <el-tree :data="ruleEvent" node-key="id" default-expand-all draggable>
                        <div class="custom-tree-node" slot-scope="{ node, data }">
                            <div class="item clearfix">
                                <div class="title">{{node.label}}</div>
                                <div class="desc">{{data.msg}}</div>
                                <div class="icon-box">
                                    <i class="el-icon-edit" v-if="!data.logic" @click="() => handleEdit(node, data)"></i>
                                    <i
                                        class="el-icon-delete"
                                        @click="() => deleteEvent(node, data)"
                                    ></i>
                                </div>
                            </div>
                        </div>
                    </el-tree>
                </div>
                <div style="margin-top: 15px;" v-if="isDrag">
                    <el-button @click="cancelDrag" size="small">取消</el-button>
                    <el-button type="primary" @click="updateEvent" size="small">保存编辑</el-button>
                </div>
            </el-col>
        </el-row>
        <op-rule
            :visible="visible"
            :action="action"
            @listenRuleOp="listenRuleOp"
            :conditionId="conditionId"
        ></op-rule>
    </div>
</template>

<script>
import { updateRule, getRuleInfo } from "@/api/rule/rule";
export default {
    name: "EventList",
    data() {
        return {
            ruleId: "",
            base: "",
            ruleEvent: [],
            event: {
                rules: [],
                logic: ""
            },
            isDrag: false,
            visible: false,
            action: "",
            conditionId: 0
        };
    },
    created() {
        this.ruleId = this.$route.params.id;
        this.handleRuleInfo();
    },
    components: {
        OpRule: () => import("./OpRule")
    },
    methods: {
        openDialog(action) {
            this.action = action;
            this.visible = true;
        },
        replaceData(data, value) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id && data[i].id === value.id) {
                    data.splice(i,1, value);
                    return;
                } else {
                    if (data[i].children) {
                        this.replaceData(data[i].children, value);
                    }
                }
            }
        },
        handleEdit(node, data) {
            const action = {
                data: data,
                action: "edit",
                name: data.logic ? "logic" : "condition"
            };
            this.openDialog(action);
        },
        deleteEvent(node, data) {
            this.isDrag = true;
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
        },
        listenRuleOp(value) {
            this.isDrag = true;
            if (value) {
                if (value.action === "add") {
                    this.ruleEvent.push(value.logic);
                    this.conditionId++;
                } else {
                    this.replaceData(this.ruleEvent, value.logic);
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
                    this.ruleEvent = this.ruleEvent ? this.ruleEvent : [];
                    this.conditionId = this.base.event.rules.length + 1;
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
                ruleEvent: this.ruleEvent
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
                if (!item.logic) {
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
    .el-tree-node__content {
        background: #f6fafe;
        margin-bottom: 6px;
    }
    .custom-tree-node {
        width: 100% !important;
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
    .rule-event-logic {
        border: 1px dashed #ddd;
        padding: 10px;
        margin-top: 10px;
    }
    .rule-logic-box:hover {
        cursor: move;
    }
    .rule-event-logic {
        .item {
            width: 100%;
            .title {
                color: #606266;
                float: left;
                padding: 9px 15px;
                box-sizing: content-box;
            }
            .desc {
                float: left;
                width: auto;
                padding: 9px 15px;
            }
            .icon-box {
                float: right;
                padding: 9px 15px;
                i {
                    cursor: pointer;
                    padding-left: 9px;
                }
            }
        }
    }
}
</style>
