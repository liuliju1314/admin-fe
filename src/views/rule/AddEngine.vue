<template>
    <el-dialog :title="title" :visible.sync="visible" center>
        <div class="create-product-wrapper">
            <el-form
                ref="form"
                :model="form"
                label-width="90px"
                :rules="formRules"
                class="form-box"
                size="small"
            >
                <el-form-item label="规则名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="属性名称" prop="taskKey">
                    <el-input v-model="form.taskKey"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="beforeClose" style="padding: 10px 22px">取消</el-button>
                    <el-button type="primary" @click="createRule" style="padding: 10px 22px">确定</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
</template>

<script>
import { addRule, updateRule } from "@/api/rule/rule";
export default {
    name: "AddEngine",
    props: ["rule", "visible"],
    data() {
        return {
            categoryOptions: [{ value: "100", label: "智能家居" }],
            form: {
                name: "",
                taskKey: "",
                desc: ""
            },
            isEdit: false,
            title: "",
            formRules: {
                name: [
                    {
                        required: true,
                        message: "请输入规则名称",
                        trigger: "blur"
                    }
                ],
                taskKey: [
                    {
                        required: true,
                        message: "请输入属性名称",
                        trigger: "blur"
                    }
                ]
            },
            dialogVisible: false
        };
    },
    created() {
        this.handleOp();
    },
    watch: {
        rule() {
            this.handleOp();
        }
    },
    methods: {
        beforeClose() {
            this.$refs.form.resetFields();
            this.$emit("listenAdd", false);
        },
        handleOp() {
            if (this.rule) {
                this.title = "信息编辑";
                this.isEdit = true;
                this.form = {
                    ...this.form,
                    ...{
                        name: this.rule.name,
                        taskKey: this.rule.taskKey,
                        desc: this.rule.desc
                    }
                };
            } else {
                this.isEdit = false;
                this.title = "规则创建";
            }
        },
        createRule() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    if (!this.isEdit) {
                        addRule(this.form)
                            .then(() => {
                                this.$message({
                                    type: "success",
                                    message: "创建成功",
                                    duration: 500
                                });
                                this.beforeClose();
                            })
                            .catch(() => {});
                    } else {
                        let actions = this.rule.actions,
                            event = this.rule.action;
                        if (!actions || typeof actions !== "object") {
                            actions = [
                            ];
                        }
                        if (!event || typeof event !== "object") {
                            event = {
                                rules: [],
                                logic: ""
                            };
                        }
                        const data = {
                            ...this.rule,
                            actions: actions,
                            event: event,
                            ...this.form
                        };
                        updateRule(data).then(() => {
                            this.$message({
                                type: "success",
                                message: "更新成功"
                            });
                             this.beforeClose();
                        });
                    }
                }
            });
        },
        deleteFw(index) {
            this.form.fw.splice(index, 1);
        }
    }
};
</script>

<style lang='less' scoped>
.create-product-wrapper {
    .form-box {
        width: 80%;
        margin: 20px auto;
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
    .small-width {
        width: 40%;
    }
}
</style>