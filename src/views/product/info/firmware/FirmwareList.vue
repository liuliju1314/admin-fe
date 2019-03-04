<template>
    <el-main>
        <!-- 循环的固件列表 -->
        <div class="btn-box">
            <div style=" display: flex;justify-content: space-between;">
                <el-button type="primary" size="small" @click="showFwDialog('')">+ 添加固件</el-button>
                <el-input
                    placeholder="请输入固件版本"
                    v-model="form.fwVersion"
                    class="input-with-select"
                    size="small"
                >
                    <el-button slot="append" icon="el-icon-search" @click="handlefirmwareList(1)"></el-button>
                </el-input>
            </div>
        </div>
        <el-table
            :data="firmwareList.items"
            style="width: 100%; margin-top: 12px"
            border
            size="small"
        >
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
                        @click="showFwDialog(scope.row)"
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
        <div class="pagination-box" v-if="form.pageSize < firmwareList.count">
            <el-pagination
                :page-size="form.pageSize"
                :page="form.page"
                layout="prev, pager, next"
                :total="firmwareList.count"
                @current-change="handlePage"
            ></el-pagination>
        </div>
        <!-- 添加固件对话框 -->
        <add-firmware @listenAdd="listenAdd" :visible="visible" :fw="opFw"></add-firmware>
        <el-dialog title="固件升级" :visible.sync="upVisible" center :before-close="beforeCloseUp">
            <el-form
                :model="upForm"
                ref="upForm"
                label-width="180px"
                class="form-box"
                :rules="rules"
                size="small"
            >
                <el-form-item label="请选择需升级的设备分组" prop="group">
                    <el-radio-group v-model="upForm.deviceGroup" placeholder="请选择">
                        <el-radio label="0">正式版</el-radio>
                        <el-radio label="1">测试版</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button @click="beforeCloseUp" size="small">取 消</el-button>
                    <el-button type="primary" @click="submitUpFw" size="small">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </el-main>
</template>

<script>
import AddFirmware from "./AddFirmware";
import {
    getfirmwareList,
    upgradeFirmware,
    deleteFirmware
} from "@/api/firmware/firmware";
export default {
    components: {
        AddFirmware
    },
    props: {},
    data() {
        return {
            firmwareList: [],
            form: {
                page: 1,
                pageSize: 10,
                fwVersion: "",
                pid: ""
            },
            opFw: "",
            visible: false,
            upVisible: false,
            upForm: {
                fw: "",
                deviceGroup: ""
            },
            editFwForm: {
                fwID: "",
                group: "",
                upgrade: "",
                version: "",
                desc: "",
                fwName: ""
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
    created() {
        this.form.pid = { pid: this.$route.params.id };
        this.handlefirmwareList(1);
    },
    methods: {
        beforeCloseUp() {
            this.$refs.upForm.resetFields();
            this.upVisible = false;
        },
        listenAdd(value) {
            this.opFw = "";
            this.visible = value;
            this.handlefirmwareList();
        },
        handlePage(value) {
            this.handlefirmwareList(value);
        },
        // 获取固件列表
        handlefirmwareList(value) {
            this.form.page = value ? value : 1;
            getfirmwareList(this.form).then(res => {
                console.log(res);
                this.firmwareList = res.payload;
            });
        },
        deletefirmware(fw) {
            this.$confirm(`是否确认删除该固件?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                const data = {
                    pid: this.form.pid,
                    fwID: fw.fwID
                }
                deleteFirmware(data)
                    .then(() => {
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                    })
                    .catch(() => {
                        this.$confirm(`该固件已升级，无法删除！`, "提示", {
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            type: "warning"
                        });
                    });
            });
        },
        upgradefirmware(fw) {
            this.upVisible = true;
            this.upForm.fw = fw;
        },
        submitUpFw() {
            upgradeFirmware(this.upForm).then(() => {
                this.$message({
                    type: "success",
                    message: "升级成功"
                });
            });
        },
        showFwDialog(fw) {
            this.visible = true;
            this.opFw = fw;
        },
        // 提交固件编辑
        submitEidtFw() {
            this.$refs.editFwForm.validate(valid => {
                if (valid) {
                    this.$message({
                        type: "success",
                        message: "固件更新成功!"
                    });
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