
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
            <el-table :data="deviceList" style="width: 100%; margin-top: 12px" border size="small">
                <el-table-column prop="did" label="设备编号" width="125"></el-table-column>
                <el-table-column prop="group" label="设备分组" width="120">
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
                <el-table-column label="软件版本号">
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
    </div>
</template>

<script>
import VueProgress from "./VueProgress";
import DeviceUpgrade from "@/views/device/DeviceUpgrade";
import { getDeviceList, updateDeviceGroup } from "@/api/device/device";
export default {
    name: "",
    props: [""],
    data() {
        return {
            form: {
                page: 1,
                pageSize: 6,
                model: "",
                code: "",
                online: "",
                isPage: true,
                did: ""
            },
            group: "",
            deviceList: [],
            dialogVisible: false,
            upgradeVisible: false,
            title: "",
            count: 0,
            online: 0,
            offline: 0,
            btnShow: false
        };
    },

    components: {
        DeviceUpgrade,
        VueProgress
    },

    computed: {},

    beforeMount() {},

    mounted() {},

    created() {
        this.getDevice();
    },

    methods: {
        //获取设备列表
        getDevice() {
            getDeviceList(this.form)
                .then(res => {
                    this.deviceList = res.payload.items;
                    this.count = res.payload.count;
                    this.online = res.payload.online;
                    this.offline = res.payload.offline;
                })
                .catch(error => {
                    return error;
                });
        },
        // 通过设备编号查询设备
        searchDevice() {
            this.getDevice();
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
            console.log("升级");
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
.input-with-select {
    width: 320px;
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