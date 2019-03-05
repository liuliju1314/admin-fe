<template>
    <el-card class="box-card create-station-wrapper" shadow="never">
        <div slot="header" class="clearfix">
            <span class="card-title">设备管理</span>
        </div>
        <div class="device-wrapper">
            <el-form :inline="true" class="demo-form-inline" size="small">
                <!-- 测站类型框 -->
                <el-form-item label="设备类型">
                    <el-select
                        v-model="form.model"
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
                    <el-select v-model="form.online" placeholder="请选择在线状态">
                        <el-option label="在线" value="true"></el-option>
                        <el-option label="离线" value="false"></el-option>
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
            <el-table :data="deviceList" style="width: 100%; margin-top: 12px" border size="small">
                <el-table-column prop="model" label="产品型号"></el-table-column>
                <el-table-column prop="name" label="产品名称"></el-table-column>
                <el-table-column prop="did" label="设备编号" width="125"></el-table-column>
                <el-table-column prop="group" label="设备分组" width="110">
                    <template slot-scope="scope">
                        <el-select
                            v-model="scope.row.group"
                            placeholder="请选择分组"
                            size="mini"
                            @change="updateGroup(scope.row)"
                        >
                            <el-option label="正式组" value="release"></el-option>
                            <el-option label="测试组" value="debug"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="props.batVolt" label="电池电压"></el-table-column>
                <el-table-column prop="props.chgVolt" label="充电电压"></el-table-column>
                <el-table-column prop="props.rssi" label="信号强度"></el-table-column>
                <el-table-column prop="props.count" label="计数传感器"></el-table-column>
                <el-table-column label="软件版本号" width="190">

                    <template slot-scope="scope">
                        <span>{{removeBlock(scope.row.fwVersion)}}</span>
                        <el-button type="text" @click.stop="upgradeVisible=true">升级详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="hwVersion" label="硬件版本号"></el-table-column>
                <el-table-column prop="online" label="在线状态" :formatter="isOnline"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="handleUpgrade(scope.row)">升级</el-button>
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
            <el-dialog title="设备升级" :visible.sync="dialogVisible">
                <device-upgrade></device-upgrade>
            </el-dialog>
            <el-dialog title="升级详情" :visible.sync="upgradeVisible">
                <div class="upgrade-wrapper">
                    <div class="progress-box">
                        <div>
                            <span class="title">v1.00</span>
                        </div>
                        <vue-progress :progress="60"></vue-progress>
                    </div>
                    <div class="progress-box">
                        <div>
                            <span class="title">v2.0.0</span>
                        </div>
                        <vue-progress :progress="40"></vue-progress>
                    </div>
                </div>
            </el-dialog>
        </div>
    </el-card>
</template>

<script>
import VueProgress from "../product/info/device/VueProgress";
import DeviceUpgrade from "./DeviceUpgrade";
import { getDeviceList, updateDeviceGroup } from "@/api/device/device";
import { getProductList } from "@/api/product/product";

export default {
    name: "",
    props: [""],
    data() {
        return {
            form: {
                page: 1,
                pageSize: 10,
                model: "",
                did: "",
                online: "",
                isPage: true
            },
            isPage: false,
            productModel: [],
            group: "",
            deviceList: [],
            dialogVisible: false,
            upgradeVisible: false,
            groupVisible: false,
            title: "",
            value: "",
            count: "",
            btnShow: false
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
            this.dialogVisible = true;
        },
        //更新设备分组
        updateDeviceGroup(device) {
            console.log(device);
        },
        isOnline(val) {
            if (val.online == true) {
                return "在线";
            } else if (val.online == false) {
                return "离线";
            }
        },
        //去除大括号
        removeBlock(str) {
            if (str) {
                console.log(JSON.stringify(str));
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