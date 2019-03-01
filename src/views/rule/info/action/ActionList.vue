<template>
    <el-main>
        <div class="btn-box">
            <div style=" display: flex;justify-content: space-between;">
                <el-button
                    type="primary"
                    size="small"
                    @click="openDialog({action:'add', data: ''})"
                >+ 添加Action</el-button>
            </div>
        </div>
        <el-table
            :row-class-name="tableRowClassName"
            :data="action"
            style="width: 100%; margin-top: 12px"
            border
            size="small"
        >
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="did" label="设备ID"></el-table-column>
            <el-table-column prop="value" label="需执行的参数列表"></el-table-column>
            <el-table-column label="操作" width="170">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        size="small"
                        @click="openDialog({action:'edit', data: scope})"
                        icon="el-icon-edit"
                    >编辑</el-button>
                    <el-button
                        type="text"
                        size="small"
                        @click="deleteAction(index)"
                        icon="el-icon-delete"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="title" :visible.sync="dialogVisible" center>
            <el-form
                :model="form"
                ref="form"
                label-width="100px"
                class="form-box"
                :rules="rules"
                size="small"
            >
                <el-form-item label="Action名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="执行参数" prop="value">
                    <el-input v-model="form.value"></el-input>
                </el-form-item>
                <el-form-item label="设备ID">
                    <el-input v-model="form.did"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="beforClose" size="small">取 消</el-button>
                    <el-button type="primary" @click="AddAction" size="small">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </el-main>
</template>

<script>
import { updateRule, getRuleInfo } from "@/api/rule/rule";
export default {
    name: "ActionList",
    data() {
        return {
            action: [
                {
                    name: "1",
                    did: "1",
                    value: "1"
                }
            ],
            isEdit: "",
            index: 0,  //用于存放当前编辑行
            dialogVisible: false,
            form: {
                name: "",
                did: "",
                value: ""
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入Action名称",
                        trigger: "blur"
                    }
                ],
                value: [
                    {
                        required: true,
                        message: "请输入执行参数",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    watch: {},
    computed: {},
    methods: {
        beforClose() {
            this.$refs.form.resetFields();
            this.dialogVisible = false;
        },
        openDialog(value) {
            if (value.action === "edit") {
                this.index = value.data.$index;
                this.$nextTick(() => {
                    this.form = {
                        ...this.form,
                        ...value.data.row
                    };
                });
            }
            this.isEdit = value === "add" ? false : true;
            this.title = value === "add" ? "添加Action" : "Action编辑";

            this.dialogVisible = true;
        },
        handleRuleInfo() {
            getRuleInfo({ id: this.ruleId })
                .then(res => {
                    this.base = res.payload.items;
                    this.action = this._deepClone(this.base.action);
                })
                .catch(() => {});
        },
        deleteAction(index) {
            this.$confirm(`是否确认删除该Action?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.action.splice(index, 1);
                this.updateAction("删除");
            });
        },
        AddAction() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    if (this.isEdit) {
                        this.action.forEach((item,index) => {
                            if (index === this.index) {
                                item = {
                                    ...item,
                                    ...this.form
                                };
                            }
                        });
                        this.updateAction("更新");
                    } else {
                        this.action.push(this.form);
                        this.updateAction("添加");
                    }
                }
            });
        },
        // 更新Action编辑
        updateAction(event) {
            const data = {
                ...this.base,
                action: this.action
            };
            updateRule(data).then(() => {
                this.$message({
                    type: "success",
                    message: event + "成功"
                });
                if(this.dialogVisible) {
                    this.beforeClose();                    
                }

            });
        }
    }
};
</script>

<style lang="less" scoped>
.el-main {
    background-color: #fff;
}
.input-with-select {
    width: 320px;
}
</style>