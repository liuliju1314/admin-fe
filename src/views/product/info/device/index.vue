
<template>
    <div class="box-card create-station-wrapper" shadow="never">
        <div class="btn-box">
            <div style=" display: flex;justify-content: space-between;">
                <div class="device-log">当前设备总数： {{count}}，其中在线：{{online}}，离线：{{offline}}.</div>
                <el-input
                    placeholder="请输入设备编号"
                    v-model="form.did"
                    class="input-with-select"
                    size="small"
                >
                    <el-button slot="append" icon="el-icon-search" @click="searchDevice()"></el-button>
                </el-input>
            </div>
        </div>
        <div class="device-wrapper">
            <el-table
                :data="deviceList"
                style="width: 100%; margin-top: 12px"
                border
                size="small"
                @row-click="expandDetail"
            >
                <el-table-column prop="did" label="设备编号"></el-table-column>
                <el-table-column prop="group" label="设备分组" width="120">
                    <template slot-scope="scope">
                        <el-select
                            v-model="scope.row.group"
                            placeholder="请选择分组"
                            size="mini"
                            @click.stop="updateGroup(scope.row)"
                        >
                            <el-option label="正式组" value="release"></el-option>
                            <el-option label="开发组" value="develop"></el-option>
                            <el-option label="测试组" value="debug"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="固件版本号">
                    <template slot-scope="scope">{{scope.row.fwVersion.app}}</template>
                </el-table-column>-->
                <el-table-column label="软件版本号" width="200">
                    <template slot-scope="scope">
                        <span>{{ handleFormatter(scope.row, 'fwVersion', scope.row.fwVersion) }}</span>
                        <el-button
                            type="text"
                            size="small"
                            style="margin-left: 10px;"
                            @click.stop="getOtaDetail(scope.row)"
                        >升级详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="hwVersion" label="硬件版本号"></el-table-column>
                <el-table-column label="在线状态">
                    <template slot-scope="scope">
                        <span
                            class="cell-item"
                            :class="scope.row.status === 1? 'online': 'outline'"
                        ></span>
                        <span>{{ handleFormatter(scope.row, 'status', scope.row.status) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click.stop="handleUpgrade(scope.row)"
                        >升级</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页逻辑 -->
            <div class="pagination-box" v-if="form.pageSize < count">
                <el-pagination
                    :page-size="form.pageSize"
                    :page="form.page"
                    layout="prev, pager, next"
                    :total="count"
                    @current-change="handlePage"
                ></el-pagination>
            </div>
            <device-upgrade
                :device="upgradeDevice"
                @listenUpgrade="listenUpgrade"
                :visible="dialogVisible"
            ></device-upgrade>
            <el-dialog title="升级详情" :visible.sync="upgradeVisible">
                <div class="upgrade-wrapper">
                    <div class="progress-box" v-for="(item, index) in progressList" :key="index">
                        <div>
                            <span class="title">{{item.fwName}} - {{item.version}}</span>
                        </div>
                        <vue-progress :progress="item.progress"></vue-progress>
                    </div>
                </div>
            </el-dialog>
            <el-dialog title="提示" :visible.sync="chartVisible">
                <ve-line :data="echartData"></ve-line>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import VueProgress from "./VueProgress";
import DeviceUpgrade from "@/views/device/DeviceUpgrade";
import VeLine from "v-charts/lib/line.common";
import {
    getDeviceList,
    updateDeviceGroup,
    getOTAProgress
} from "@/api/device/device";
import { getProductList } from "@/api/product/product";
export default {
    data() {
        return {
            form: {
                page: 1,
                pageSize: 10,
                pid: "",
                did: "",
                status: "0",
                isPage: true
            },
            isPage: false,
            productModel: [],
            group: "",
            deviceList: [],
            upgradeDevice: "",
            dialogVisible: false,
            upgradeVisible: false,
            chartVisible: false,
            groupVisible: false,
            count: "",
            online: "",
            offline: "",
            btnShow: false,
            progressList: [],
            echartData: []
        };
    },

    components: { DeviceUpgrade, VueProgress, VeLine },

    created() {
        this.form.pid = this.$route.params.id;
        this.getDevice();
    },
    methods: {
        // 点击跳路由
        expandDetail(row) {
            this.$router.push({ path: `/device/${row.did}/detail` });
        },
        // 获取产品名称和产品id
        getProductModel() {
            this.productModel = [];
            getProductList(this.isPage)
                .then(res => {
                    res.payload.result.map(item => {
                        const obj = {
                            pid: "",
                            name: ""
                        };
                        obj.pid = item.pid;
                        obj.name = item.name;
                        this.productModel.push(obj);
                    });
                })
                .catch(error => {
                    return error;
                });
        },
        // 获取设备升级进度
        getOtaDetail(device) {
            const data = {
                did: device.did
            };
            getOTAProgress(data).then(res => {
                this.progressList = res.payload;
                if (this.progressList.length > 0) {
                    this.upgradeVisible = true;
                } else {
                    this.$message({
                        message: "暂无正在升级的固件"
                    });
                }
            });
        },
        //获取设备列表
        getDevice() {
            getDeviceList(this.form)
                .then(res => {
                    this.deviceList = res.payload.items;
                    this.count = res.payload.total;
                    this.online = res.payload.online;
                    this.offline = res.payload.offline;
                })
                .catch(error => {
                    return error;
                });
        },
        //更新设备分组
        updateGroup(device) {
            const data = {
                group: device.group,
                did: device.did
            };
            updateDeviceGroup(data)
                .then(() => {})
                .catch(error => {
                    return error;
                });
        },
        //分页
        handlePage(value) {
            this.form.page = value;
            this.getDevice();
        },
        handleeEquipment() {
            this.getDevice();
        },
        handleTest() {
            console.log("测试");
        },
        handleUpgrade(device) {
            this.upgradeDevice = device;
            this.dialogVisible = true;
        },
        listenUpgrade(value) {
            this.upgradeDevice = "";
            this.dialogVisible = value;
        },
        // 格式化表单显示
        handleFormatter(row, column, cellValue) {
            const prop = column.property || column;
            let result;
            switch (prop) {
                case "status":
                    if (cellValue === 0) {
                        result = "未知状态";
                    } else if (cellValue === 1) {
                        result = "在线";
                    } else if (cellValue === 2) {
                        result = "离线";
                    }
                    break;
                case "fwVersion":
                    if (cellValue) {
                        let reg = /\{|\}/g;
                        result = JSON.stringify(cellValue).replace(reg, "");
                    }
                    break;
            }
            return result;
        }
    },

    watch: {}
};
</script>
<style lang='less' scoped>
.input-with-select {
    width: 300px;
}
.device-log {
    font-size: 14px;
    margin-top: 20px;
}
.upgrade-wrapper {
    display: flex;
    text-align: center;
    line-height: 1.5;
    .progress-box {
        margin: 10px 20px;
        .title {
            display: block;
            margin-bottom: 10px;
            font-size: 18px;
        }
        .desc {
            color: #ddd;
        }
    }
}
</style>