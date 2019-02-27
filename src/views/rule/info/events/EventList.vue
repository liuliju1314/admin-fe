<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="20" :offset="2">
                <div>
                    <el-button
                        size="small"
                        @click="openDialog({name: 'condition',action: 'add'})"
                    >+ 添加条件</el-button>
                    <el-button
                        size="small"
                        @click="openDialog({name: 'logic',action: 'add'})"
                    >+ 添加逻辑</el-button>
                </div>
                <div class="rule-event-logic">
                    <rule-event :ruleEvent="ruleEvent"></rule-event>
                </div>
            </el-col>
        </el-row>
        <el-dialog :title="title" :visible.sync="dialogVisible" center>
            <el-form class="form" ref="logicForm" :model="logicForm" v-if="isLogic" size="small">
                <el-form-item label="逻辑">
                    <el-select v-model="logicForm.logic">
                        <el-option label="and" value="and"></el-option>
                        <el-option label="or" value="or"></el-option>
                        <el-option label="not" value="not"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" @click="cancelOp">取消</el-button>
                    <el-button type="primary" size="small" @click="handleLogicOp">确定</el-button>
                </el-form-item>
            </el-form>
            <el-form
                class="form"
                ref="conditionForm"
                :model="conditionForm"
                v-else
                size="small"
                label-width="120px"
            >
                <el-form-item label="ID">
                    <el-input v-model="conditionForm.id" placeholder="由数字组成,不可重复"></el-input>
                </el-form-item>
                <el-form-item label="KEY">
                    <el-input v-model="conditionForm.key"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="conditionForm.msg"></el-input>
                </el-form-item>
                <el-form-item label="操作">
                    <el-input v-model="conditionForm.op"></el-input>
                </el-form-item>
                <el-form-item label="条件值">
                    <el-input v-model="conditionForm.value"></el-input>
                </el-form-item>
                <el-form-item label="设备ID">
                    <el-input v-model="conditionForm.did"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" @click="cancelOp">取消</el-button>
                    <el-button type="primary" size="small" @click="handleConditionOp">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import eventVue from '@/components/commonEvent'
export default {
    name: "RuleInfo",
    data() {
        return {
            ruleID: "",
            ruleEvent: [
                {
                    logic: "or",
                    children: [
                        {
                            logic: "and",
                            children: [{ id: 16 }, { id: 17 }]
                        },
                        { id: 18 }
                    ]
                },
                {
                    logic: "and",
                    children: [{ id: 19 }, { id: 20 }]
                },
                {
                    id: 21
                }
            ],
            logicForm: {
                logic: ""
            },
            event: {
                conArray: [],
                logic: "(16 and 17) or 18, 19 and 20, 21"
            },
            conditionForm: {
                id: "",
                msg: "",
                value: "",
                op: "",
                did: "",
                key: ""
            },
            isChange: false,
            title: "",
            isLogic: false,
            isEdit: false,
            dialogVisible: false,
            i:0
        };
    },
    created() {
        this.ruleID = this.$route.params.id;
    },
    mounted() {
        eventVue.$on("listenRuleChange",() => {
                this.handleEventFormat(this.ruleEvent);     
            })
    },
    watch: {
        ruleEvent() {
            this.event.logic = this.handleEventFormat(this.ruleEvent).join(",");
        }
    },
    components: {
        RuleEvent: () => import("./RuleEvent")
    },
    methods: {
        handleEventFormat(list) {
            let arr = [];
            list.forEach(item => {
                if (item.id) {
                    this.event.conArray.push(item);
                    arr.push(item.id);
                } else if (item.logic && item.children) {
                    arr.push( "(" + this.handleEventFormat(item.children).join( item.logic ) + ")" );
                }
            });
            return arr;
        },
        openDialog(value) {
            this.isEdit = value.action === "add" ? false : true;
            this.dialogVisible = true;
            if (value.name === "logic") {
                this.isLogic = true;
                this.title = value.action === "add" ? "添加逻辑" : "逻辑编辑";
            } else {
                this.title = value.action === "add" ? "添加条件" : "条件编辑";
                this.isLogic = false;
            }
        },
        cancelOp() {
            this.dialogVisible = false;
        },
        handleLogicOp() {
            if (this.isEdit) {
            } else {
                this.ruleEvent.push({ logic: this.logicForm.logic });
                console.log(this.ruleEvent);
                this.beforeClose();
            }
        },
        beforeClose() {
            this.$refs.logicForm.resetFields();
            this.dialogVisible = false;
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
    .form {
        width: 60%;
        margin: auto;
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
