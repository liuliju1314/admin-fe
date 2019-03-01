<template>
    <el-dialog :title="title" :visible.sync="visible" center :before-close="beforeClose">
        <el-form
            class="form"
            :rules="logicRule"
            ref="logicForm"
            :model="logicForm"
            v-if="isLogic"
            size="small"
        >
            <el-form-item label="逻辑" prop="logic">
                <el-select v-model="logicForm.logic">
                    <el-option label="and" value="and"></el-option>
                    <el-option label="or" value="or"></el-option>
                    <el-option label="not" value="not"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button size="small" @click="beforeClose">取消</el-button>
                <el-button type="primary" size="small" @click="handleLogicOp">确定</el-button>
            </el-form-item>
        </el-form>
        <el-form
            class="form"
            ref="conditionForm"
            :rules="conditionRule"
            :model="conditionForm"
            v-else
            size="small"
            label-width="120px"
        >
            <el-form-item label="ID" prop="id">
                <el-input v-model="conditionForm.id" placeholder="由数字组成,不可重复" :disabled="isEdit"></el-input>
            </el-form-item>
            <el-form-item label="KEY" prop="key">
                <el-input v-model="conditionForm.key" :disabled="isEdit"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="msg">
                <el-input v-model="conditionForm.msg"></el-input>
            </el-form-item>
            <el-form-item label="操作" prop="op">
                <el-input v-model="conditionForm.op"></el-input>
            </el-form-item>
            <el-form-item label="条件值" prop="value">
                <el-input v-model="conditionForm.value"></el-input>
            </el-form-item>
            <el-form-item label="设备ID">
                <el-input v-model="conditionForm.did"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="small" @click="beforeClose">取消</el-button>
                <el-button type="primary" size="small" @click="handleConditionOp">确定</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
export default {
    props: ["visible", "action"],
    data() {
        return {
            title: "",
            isLogic: false,
            isEdit: false,
            conditionForm: {
                id: "",
                msg: "",
                value: "",
                op: "",
                did: "",
                key: ""
            },
            conditionRule: {
                id: [
                    {
                        required: true,
                        message: "请输入ID",
                        trigger: "blur"
                    }
                ],
                msg: [
                    {
                        required: true,
                        message: "请输入msg",
                        trigger: "blur"
                    }
                ],
                value: [
                    {
                        required: true,
                        message: "请输入value",
                        trigger: "blur"
                    }
                ],
                op: [
                    {
                        required: true,
                        message: "请输入op",
                        trigger: "blur"
                    }
                ],
                key: [
                    {
                        required: true,
                        message: "请输入key",
                        trigger: "blur"
                    }
                ]
            },
            logicForm: {
                logic: ""
            },
            logicRule: {
                logic: [
                    {
                        required: true,
                        message: "请选择逻辑",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    watch: {
        visible() {
            if (this.visible) {
                this.openDialog(this.action);
            }
        }
    },
    methods: {
        // 打开对话框，并且处理是编辑对话框还是添加对话框
        openDialog(value) {
            console.log(value)
            this.isEdit = value.action === "add" ? false : true;
            this.title = value.action === "add" ? "添加" : "编辑";
            this.isLogic = value.name === "logic" ? true : false;
            if(value.data) {
                if (value.name === "logic") {
                    this.logicForm = {...this.logicForm, ...value.data}
                } else {
                    this.conditionForm = {...this.conditionForm, ...value.data}
                    this.isLogic = false;
                }                
            }

        },
        // 编辑与添加逻辑
        handleLogicOp() {
            this.$refs.logicForm.validate(valid => {
                if (valid) {
                    const action = !this.isEdit ? "add" : "edit";
                    this.$emit("listenRuleOp", {
                        logic: this.logicForm,
                        action: action
                    });
                    this.beforeClose();
                }
            });
        },
        // 编辑与添加条件
        handleConditionOp() {
            this.$refs.conditionForm.validate(valid => {
                if (valid) {
                    console.log(this.conditionForm)
                    const action = !this.isEdit ? "add" : "edit";
                    this.$emit("listenRuleOp", {
                        logic: this.conditionForm,
                        action: action
                    });
                    this.beforeClose();
                }
            });
        },
        // 关闭对话框
        beforeClose() {
            this.$nextTick(() => {
                if (this.isLogic) {
                    this.$refs.logicForm.resetFields();
                } else {
                    this.$refs.conditionForm.resetFields();
                }                
            })

            this.$emit("listenRuleOp", false);
        }
    }
};
</script>

<style lang='less' scoped>
.form {
    width: 60%;
    margin: auto;
}
</style>
