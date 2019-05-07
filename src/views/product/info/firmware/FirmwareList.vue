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
            <el-table-column label="固件分组">
                <template slot-scope="scope">{{ fwGroup[scope.row.group] }}</template>
            </el-table-column>
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
            <el-table-column label="操作" width="150">
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

                    <!-- <el-button
                        type="text"
                        size="small"
                        @click="upgradeFw = scope.row"
                        v-if="scope.row.status !== 2"
                        icon="el-icon-menu"
                    >升级详情</el-button>-->
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

        <!-- 固件升级详情 -->
        <upgrade-detail :fw="upgradeFw" @listenClose="handleClose"></upgrade-detail>
    </el-main>
</template>

<script>
import AddFirmware from "./AddFirmware";
import UpgradeDetail from "./UpgradeDetail";
import { getfirmwareList, reviewFirmware } from "@/api/firmware/firmware";
export default {
    components: {
        AddFirmware,
        UpgradeDetail
    },
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
            fwGroup: {
                release: "正式版",
                develop: "开发版",
                debug: "测试版"
            },
            upgradeFw: ""
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
            if (this.form.pid && this.$route.path.indexOf("firmware") >= 0) {
                this.handlefirmwareList(1);
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
            // console.log(JSON.stringify(fw));
            reviewFirmware(fw)
                .then(() => {
                    this.handlefirmwareList();
                    if (fw.status === 1) {
                        this.$message.success("验证成功!");
                    }
                })
                .catch(err => {
                    return err;
                });
        },
        //添加或者编辑固件对话框
        showFwDialog(fw) {
            this.visible = true;
            this.opFw = fw;
        },
        handleClose(value) {
            if (!value) {
                this.upgradeFw = "";
            }
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