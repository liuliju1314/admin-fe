<template>
    <el-main>
        <div class="btn-box">
            <div style=" display: flex;justify-content: space-between;">
                <el-button type="primary" size="small" @click="openDialog('add')">+ 添加Action</el-button>
            </div>
        </div>
        <el-table :data="actionList" style="width: 100%; margin-top: 12px" border size="small">
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="did" label="设备ID"></el-table-column>
            <el-table-column prop="value" label="需执行的参数列表"></el-table-column>
            <el-table-column label="操作" width="170">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        size="small"
                        @click="editFw(scope.row)"
                        icon="el-icon-edit"
                    >编辑</el-button>
                    <el-button
                        type="text"
                        size="small"
                        @click="deleteAction(scope.row)"
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
                    <el-button type="primary" @click="submitForm" size="small">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </el-main>
</template>

<script>
export default {
    name: "ActionList",
    data() {
        return {
            actionList: [
                {
                    name: "",
                    did: "",
                    value: ""
                }
            ],
            isEdit: '',
            dialogVisible: false,
            form: {
                name: "",
                did: "",
                value: ''
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请选择固件分组",
                        trigger: "blur"
                    }
                ],
                value: [
                    {
                        required: true,
                        message: "请选择升级方式",
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
            this.isEdir = value === 'add' ? false: true;
            this.title = value === 'add' ? '添加Action': 'Action编辑';
            this.dialogVisible = true;
        },
        deleteAction(fw) {
            this.$confirm(`该固件已升级，无法删除！`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            });
            // this.$confirm(
            //     `是否确认删除该固件?`,
            //     "提示",
            //     {
            //         confirmButtonText: "确定",
            //         cancelButtonText: "取消",
            //         type: "warning"
            //     }
            // ).then(() => {
            //     this.$message({
            //         type: "success",
            //         message: "升级成功!"
            //     });
            // });
        },
        upgradeAction(fw) {
            this.$confirm(
                `此操作将升级该产品下所有设备固件版本，是否确认升级?`,
                "提示",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }
            ).then(() => {
                this.$message({
                    type: "success",
                    message: "升级成功!"
                });
            });
        },
        editFw(fw) {
            this.editVisible = true;
            this.editFwForm = {
                ...this.editFwForm,
                ...fw
            };
        },
        // 提交固件编辑
        submitEidtFw() {
            this.$refs.editFwForm.validate(valid => {
                if (valid) {
                    this.$message({
                        type: "success",
                        message: "固件更新成功!"
                    });
                    this.editVisible = false;
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