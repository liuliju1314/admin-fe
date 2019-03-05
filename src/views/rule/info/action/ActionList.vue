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
            :data="actionList"
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
                    <el-button @click="beforeClose" size="small">取 消</el-button>
                    <el-button type="primary" @click="addAction" size="small">确 定</el-button>
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
            title: '',
            base: '',
            ruleId: '',
            actions: [],
            actionList: [],
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
    created() {
        this.ruleId = this.$route.params.id;
        this.handleRuleInfo();
    },
    methods: {
        beforeClose() {
            this.$refs.form.resetFields();
            this.dialogVisible = false;
            this.handleRuleInfo();
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
            this.isEdit = value.action === "add" ? false : true;
            this.title = value.action === "add" ? "添加Action" : "Action编辑";

            this.dialogVisible = true;
        },
        handleRuleInfo() {
            getRuleInfo({ tid: this.ruleId })
                .then(res => {
                    this.base = res.payload;
                    this.base.actions = JSON.parse(this.base.actions);
                    this.base.event = JSON.parse(this.base.event);
                    this.actionList = this._deepClone(this.base.actions);
                    this.actions = this._deepClone(this.base.actions);
                })
                .catch(() => {});
        },
        deleteAction(index) {
            this.$confirm(`是否确认删除该Action?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.actions.splice(this.index, 1);
                this.updateAction("删除");
            });
        },
        addAction() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    if (this.isEdit) {
                        this.actions.splice(this.index, 1, this.form)
                        this.updateAction("更新");
                    } else {
                        this.actions.push(this.form);
                        this.updateAction("添加");
                    }
                }
            });
        },
        // 更新Action编辑
        updateAction(event) {

            const data = {
                ...this.base,
                actions: this.actions
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