<template>
    <el-card class="box-card device-station-wrapper" shadow="never">
        <div slot="header" class="clearfix">
            <span class="card-title">设备管理</span>
        </div>
        <div class="device-wrapper">
            <el-form :inline="true" class="demo-form-inline" size="small">
                <!-- 测站类型框 -->
                <el-form-item label="设备类型">
                    <el-select
                        v-model="form.pid"
                        placeholder="请选择设备类型"
                        @click.native="getProductModel()"
                    >
                        <el-option
                            v-for="item in productModel"
                            :key="item.pid"
                            :label="item.name"
                            :value="item.pid"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="在线状态">
                    <el-select v-model="form.status" placeholder="请选择在线状态">
                        <el-option label="全部" value="0"></el-option>
                        <el-option label="在线" value="1"></el-option>
                        <el-option label="离线" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备编号">
                    <el-input v-model="form.did"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleeEquipment()">查询</el-button>
                </el-form-item>
            </el-form>
            <!-- 循环的设备列表 -->
            <el-table
                :data="deviceList"
                style="width: 100%; margin-top: 12px"
                border
                size="small"
                @row-click="expandDetail"
            >
                <el-table-column prop="did" label="设备编号" width="125"></el-table-column>
                <el-table-column prop="group" label="设备分组" width="110">
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
                <el-table-column label="固件版本号">
                    <template slot-scope="scope">{{scope.row.fwVersion.app}}</template>
                </el-table-column>
                <el-table-column prop="hwVersion" label="硬件版本号"></el-table-column>
                <el-table-column label="在线状态">
                    <template slot-scope="scope">
                        <span
                            class="cell-item"
                            :class="scope.row.status === 1? 'online': 'outline'"
                        ></span>
                        <span>{{ isOnline(scope.row.status) }}</span>
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
        </div>
    </el-card>
</template>

<script>
import VueProgress from "../product/info/device/VueProgress";
import DeviceUpgrade from "./DeviceUpgrade";
import {
    getDeviceList,
    updateDeviceGroup,
    getOTAProgress
} from "@/api/device/device";
import { getProductList } from "@/api/product/product";
export default {
    name: "",
    props: [""],
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
            groupVisible: false,
            title: "",
            value: "",
            count: "",
            btnShow: false,
            progressList: []
        };
    },

    components: { DeviceUpgrade, VueProgress },

    computed: {},

    beforeMount() {},

    mounted() {},

    created() {
        this.getDevice();
    },
    methods: {
        expandDetail(row) {
            // localStorage.setItem("deviceName", row.name);
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
                this.upgradeVisible = true;
            });
        },
        //获取设备列表
        getDevice() {
            getDeviceList(this.form)
                .then(res => {
                    this.deviceList = res.payload.items;
                    this.count = res.payload.total;
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
            this.upgradeDevice = {
                ...device,
                status: 1
            };
            this.dialogVisible = true;
        },
        listenUpgrade(value) {
            this.upgradeDevice = "";
            this.dialogVisible = value;
        },
        // 更改名称
        isOnline(val) {
            if (val === 0) {
                return "未知状态";
            } else if (val === 1) {
                return "在线";
            } else if (val === 2) {
                return "离线";
            }
        },
        //去除大括号
        removeBlock(str) {
            if (str) {
                var reg = /\{|\}/g;
                str = JSON.stringify(str).replace(reg, "");
                return str;
            }
            return str;
        }
    },

    watch: {}
};
</script>
<style lang='less' scoped>
.morebox {
    position: absolute;
    text-align: left;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    top: 51px;
    left: 82px;
}
.morebox .moreitem {
    padding: 5px 12px;
    margin: 0;
    clear: both;
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
    white-space: nowrap;
    cursor: pointer;
}
.morebox .moreitem:hover {
    background-color: #e6f7ff;
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