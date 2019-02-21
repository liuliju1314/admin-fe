<template>
    <el-main>
        <!-- 循环的固件列表 -->
        <div class="btn-box">
            <div style=" display: flex;justify-content: space-between;">
                <el-button type="primary" size="small" @click="dialogVisible=true">+ 添加固件</el-button>
                <el-input
                    placeholder="请输入固件ID或版本"
                    v-model="firmwareSearch"
                    class="input-with-select"
                    size="small"
                >
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
        </div>
        <el-table :data="firmwareList" style="width: 100%; margin-top: 12px" border size="small">
            <el-table-column prop="fwID" label="固件ID"></el-table-column>
            <el-table-column prop="version" label="固件版本"></el-table-column>
            <el-table-column prop="group" label="固件分组"></el-table-column>
            <el-table-column prop="upgrade" label="升级方式"></el-table-column>
            <el-table-column prop="desc" label="描述" width="300"></el-table-column>
            <el-table-column label="操作" width="170">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        size="small"
                        @click="upgradefirmware(scope.row)"
                        icon="el-icon-upload"
                    >升级</el-button>
                    <el-button
                        type="text"
                        size="small"
                        @click="editFw(scope.row)"
                        icon="el-icon-edit"
                    >编辑</el-button>
                    <el-button
                        type="text"
                        size="small"
                        @click="deletefirmware(scope.row)"
                        icon="el-icon-delete"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div></div>
        <!-- 添加固件对话框 -->
        <el-dialog title="添加固件" :visible.sync="dialogVisible" center>
            <add-firmware ref="addForm"></add-firmware>
        </el-dialog>
        <el-dialog title="固件编辑" :visible.sync="editVisible" center>
            <el-form
                :model="editFwForm"
                ref="editFwForm"
                label-width="100px"
                class="form-box"
                :rules="rules"
                size="small"
            >
                <el-form-item label="固件ID" prop="version">
                    <el-input v-model="editFwForm.fwID" placeholder="建议采用版本递增进行管理" disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="固件分组" prop="group">
                    <el-radio-group v-model="editFwForm.group" placeholder="请选择">
                        <el-radio label="0">正式版</el-radio>
                        <el-radio label="1">测试版</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="升级方式" prop="upgrade">
                    <el-radio-group v-model="editFwForm.upgrade">
                        <el-radio :label="3">手动升级</el-radio>
                        <el-radio :label="6">静默升级</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="固件版本" prop="version">
                    <el-input v-model="editFwForm.version" placeholder="建议采用版本递增进行管理"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="desc">
                    <el-input type="textarea" v-model="editFwForm.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="editVisible = false" size="small">取 消</el-button>
                    <el-button type="primary" @click="submitEidtFw" size="small">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </el-main>
</template>

<script>
import AddFirmware from "./AddFirmware";
export default {
    components: {
        AddFirmware
    },
    props: {},
    data() {
        return {
            firmwareList: [
                {
                    fwID: "1q23440",
                    group: "测试组",
                    upgrade: "手动升级",
                    version: "v1.0.0.1",
                    desc: "主要用于测试功能",
                    createdAt: "2018-03-04 11:11"
                }
            ],
            firmwareSearch: "",
            dialogVisible: false,
            editVisible: false,
            editFwForm: {
                fwID: "",
                group: "",
                upgrade: "",
                version: "",
                desc: ""
            },
            rules: {
                group: [
                    {
                        required: true,
                        message: "请选择固件分组",
                        trigger: "blur"
                    }
                ],
                upgrade: [
                    {
                        required: true,
                        message: "请选择升级方式",
                        trigger: "blur"
                    }
                ],
                version: [
                    {
                        required: true,
                        message: "请填写固件版本",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    watch: {},
    computed: {},
    methods: {
        deletefirmware(fw) {
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
        upgradefirmware(fw) {
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