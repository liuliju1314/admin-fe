<template>
    <el-card class="box-card create-station-wrapper" shadow="never">
        <div slot="header" class="clearfix">
            <span class="card-title">设备管理</span>
        </div>
        <div class="device-wrapper">
            <el-form :inline="true" class="demo-form-inline" size="small">
                <!-- 测站类型框 -->
                <el-form-item label="设备类型">
                    <el-select v-model="form.model" placeholder="请选择设备类型">
                        <el-option label="遥测雨量计" value="YL3800"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="绑定状态">
                    <el-select v-model="form.online" placeholder="请选择绑定状态">
                        <el-option label="在线" value="true"></el-option>
                        <el-option label="离线" value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备编号">
                    <el-input v-model="form.code"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleeEquipment()">查询</el-button>
                </el-form-item>
            </el-form>
            <!-- 循环的设备列表 -->
            <el-table :data="deviceList" style="width: 100%; margin-top: 12px" border size="small">
                <el-table-column prop="model" label="产品型号"></el-table-column>
                <el-table-column prop="name" label="产品名称"></el-table-column>
                <el-table-column prop="hwID" label="设备编号" width="125"></el-table-column>
                <el-table-column prop="props.batVolt" label="电池电压"></el-table-column>
                <el-table-column prop="props.chgVolt" label="充电电压"></el-table-column>
                <el-table-column prop="props.rssi" label="信号强度"></el-table-column>
                <el-table-column prop="props.count" label="计数传感器"></el-table-column>
                <el-table-column label="软件版本号" :formatter="removeBlock">
                    <template slot-scope="scope">
                        <span>v1.0.0.3</span>
                        <i
                            class="el-icon-refresh"
                            style="margin-left: 10px"
                            @click="updateFwProgress(scope.row)"
                        ></i>
                        <div>
                            <el-progress :percentage="70"></el-progress>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="hwVersion" label="硬件版本号"></el-table-column>
                <el-table-column prop="online" label="在线状态" :formatter="isOnline"></el-table-column>
                <el-table-column label="操作" width="160">
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
                <!-- <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                </span> -->
            </el-dialog>
        </div>
    </el-card>
</template>

<script>
import DeviceUpgrade from "./DeviceUpgrade";
import { getDeviceList } from "@/api/device/device";
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
                isPage: true
            },
            deviceList: [],
            dialogVisible: false,
            title: "",
            value: "",
            count: "",
            btnShow: false
        };
    },

    components: { DeviceUpgrade },

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
                    this.deviceList = res.payload.result;
                    this.count = res.payload.count;
                })
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
        handleUpgrade() {
            this.dialogVisible = true;
            console.log("升级");
        },
        handleMore() {
            console.log("更多");
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
                var reg = /^\{/gi;
                var reg2 = /\}$/gi;
                str = str.replace(reg, "");
                str = str.replace(reg2, "");
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
</style>