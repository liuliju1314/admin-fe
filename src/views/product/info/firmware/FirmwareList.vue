<template>
    <el-main>
        <!-- 循环的固件列表 -->
        <div class="btn-box">
            <div style=" display: flex;justify-content: space-between;">
                <el-button type="primary" size="small" @click="showFwDialog('')">+ 添加固件</el-button>
                <el-input
                    placeholder="请输入固件版本"
                    v-model="form.version"
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
            <el-table-column prop="fwName" label="固件名称"></el-table-column>
            <el-table-column prop="version" label="固件版本"></el-table-column>
            <el-table-column prop="group" label="固件分组" :formatter="handleGroupFormat"></el-table-column>
            <el-table-column prop="desc" label="描述" width="300"></el-table-column>
            <el-table-column prop="version" label="固件验证" width="100">
                <template slot-scope="scope">
                    <div v-if="scope.row.status !== 2">
                        <el-switch
                            v-model="scope.row.status"
                            :active-value="1"
                            :inactive-value="3"
                            :content="scope.status !== 3? '已验证' : '未验证'"
                            @change="FwDisable({fwID: scope.row.fwID, status:scope.row.status})"
                        ></el-switch>
                    </div>
                    <div style="font-size: 12px;" v-else>
                        <span style="color: #ddd;">固件不可用</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="170">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        size="small"
                        @click="showFwDialog(scope.row)"
                        v-if="scope.row.status !== 2"
                        icon="el-icon-edit"
                    >编辑</el-button>
                    <el-button
                        type="text"
                        size="small"
                        v-if="scope.row.status !== 2"
                        @click="FwDisable({fwID: scope.row.fwID, status: 2})"
                        icon="el-icon-setting"
                    >禁用</el-button>
                    <el-button
                        type="text"
                        size="small"
                        v-if="scope.row.status===2"
                        @click="FwDisable({fwID: scope.row.fwID, status: 3})"
                        icon="el-icon-setting"
                    >取消禁用</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 固件列表分页 -->
        <div class="pagination-box" v-if="form.pageSize < firmwareList.total">
            <el-pagination
                :page-size="form.pageSize"
                :page="form.page"
                layout="prev, pager, next"
                :total="firmwareList.total"
                @current-change="handlePage"
            ></el-pagination>
        </div>
        <!-- 添加固件对话框 -->
        <add-firmware @listenAdd="listenAdd" :visible="visible" :fwInfo="opFw"></add-firmware>
    </el-main>
</template>

<script>
import AddFirmware from "./AddFirmware";
import { getfirmwareList, reviewFirmware } from "@/api/firmware/firmware";
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
                version: "",
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
    watch: {
        $route() {
            this.init();
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.form.pid = this.$route.params.id;
            this.handlefirmwareList(1);
        },
        handleGroupFormat(row) {
            if (row.group === "release") {
                return "正式版";
            } else if (row.group === "develop") {
                return "开发版";
            } else if (row.group === "debug") {
                return "测试版";
            }
        },
        //监听表单关闭
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
                this.firmwareList = res.payload;
            });
        },
        //固件验证
        FwDisable(fw) {
            reviewFirmware(fw)
                .then(() => {
                    this.handlefirmwareList();
                })
                .catch(err => {
                    return err;
                });
        },
        //添加或者编辑固件对话框
        showFwDialog(fw) {
            this.visible = true;
            this.opFw = fw;
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