<template>
    <div class="device-wrapper">
        <el-form :inline="true" class="demo-form-inline" size="small">
            <el-form-item label="在线状态">
                <el-select v-model="form.status" placeholder="请选择在线状态" @change="handleeEquipment">
                    <el-option label="全部" value="0"></el-option>
                    <el-option label="在线" value="1"></el-option>
                    <el-option label="离线" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="设备编号">
                <el-input v-model="form.did"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleeEquipment">查询</el-button>
                <el-button @click="batchVisible=true">批量添加设备</el-button>
                <el-button @click="virtualVisible=true">添加虚拟设备</el-button>
                <el-button @click="switchVirtualDevice(true)">批量启动虚拟设备</el-button>
                <el-button @click="switchVirtualDevice(false)">批量关闭虚拟设备</el-button>
            </el-form-item>
        </el-form>
        <div
            class="device-log"
        >当前设备总数： {{deviceCount.total}}，其中在线：{{deviceCount.online}}，离线：{{deviceCount.offline}}.</div>
        <!-- 循环的设备列表 -->
        <el-table
            :data="deviceList.items"
            style="width: 100%; margin-top: 12px"
            border
            size="small"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" min-width="5%"></el-table-column>
            <el-table-column prop="did" label="设备编号" min-width="8%"></el-table-column>
            <el-table-column label="设备秘钥" min-width="14%">
                <template slot-scope="scope">
                    {{scope.row.deviceSecret}}
                    <el-button
                        class="copy-box"
                        size="mini"
                        @click="copyPid(scope.row.deviceSecret)"
                        round
                    >复制</el-button>
                </template>
            </el-table-column>
            <el-table-column
                min-width="8%"
                prop="deviceType"
                :filters="[{ text: '真实设备', value: 'true' }, { text: '虚拟设备', value: 'virtual' }]"
                :filter-method="filterDeviceType"
                label="设备类型"
            ></el-table-column>
            <el-table-column prop="group" label="设备分组" min-width="10%">
                <template slot-scope="scope">
                    <el-select
                        v-model="scope.row.group"
                        placeholder="请选择分组"
                        size="mini"
                        @change="updateGroup(scope.row)"
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
            <el-table-column label="软件版本号" min-width="8%">
                <template slot-scope="scope">
                    <div>{{ handleFormatter(scope.row, 'fwVersion', scope.row.fwVersion) }}</div>
                    <el-button
                        type="text"
                        size="small"
                        style="margin-left: 10px;"
                        @click="getOtaDetail(scope.row.did)"
                        v-if="scope.row.firmwareStatus === 1"
                    >升级进度</el-button>
                </template>
            </el-table-column>
            <el-table-column label="固件升级状态" min-width="10%">
                <template slot-scope="scope">
                    <span
                        :class="scope.row.firmwareStatus === 3?'blue':''"
                        @click="upgradeFailed(scope.row)"
                    >{{ handleFormatter(scope.row, 'firmwareStatus', scope.row.firmwareStatus) }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="hwVersion" label="硬件版本号" min-width="8%"></el-table-column>
            <el-table-column label="在线状态" min-width="8%">
                <template slot-scope="scope">
                    <span class="cell-item" :class="scope.row.status === 1? 'online': 'outline'"></span>
                    <span>{{ handleFormatter(scope.row, 'status', scope.row.status) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="8%">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="expandDetail(scope.row)">查看</el-button>
                    <el-button type="text" size="small" @click="handleUpgrade(scope.row)">升级</el-button>
                    <el-button type="text" size="small" @click="handleState(scope.row)">运行状态</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页逻辑 -->
        <div class="pagination-box" v-if="form.pageSize < total">
            <el-pagination
                :page-size="form.pageSize"
                :page="form.page"
                layout="prev, pager, next"
                :total="total"
                @current-change="handlePage"
            ></el-pagination>
        </div>
        <device-upgrade
            :device="upgradeDevice"
            @listenUpgrade="listenUpgrade"
            :visible="dialogVisible"
        ></device-upgrade>
        <!-- 升级详情对话框 -->
        <el-dialog title="升级详情" :visible.sync="upgradeVisible" :before-close="handleProgressClose">
            <el-button
                size="small"
                type="text"
                icon="el-icon-refresh"
                @click="RefreshProgress"
                style="margin: 10px 20px;font-size: 15px"
            >刷新</el-button>

            <el-row class="upgrade-wrapper">
                <el-col
                    :span="8"
                    class="progress-box"
                    v-for="(item, index) in progressList"
                    :key="index"
                >
                    <div>
                        <span class="title" style="height:80px">{{item.fwName}} - {{item.version}}</span>
                    </div>
                    <vue-progress :progress="item.progress"></vue-progress>
                </el-col>
            </el-row>
        </el-dialog>
        <el-dialog title="批量添加设备" :visible.sync="batchVisible" :before-close="handleClose" center>
            <el-form
                size="small"
                style="margin: auto;"
                ref="batchForm"
                :rules="rules"
                :model="batchForm"
            >
                <el-form-item label="添加方式：" prop="addMothod">
                    <el-radio-group v-model="batchForm.addMothod">
                        <el-radio label="auto">自动生成</el-radio>
                        <el-radio label="manual">批量上传</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="设备数量：" prop="deviceNum" v-if="batchForm.addMothod === 'auto'">
                    <el-input-number v-model="batchForm.deviceNum" :min="1" label="描述文字"></el-input-number>
                </el-form-item>
                <el-form-item label="上传设备文件：" prop="file" v-if="batchForm.addMothod === 'manual'">
                    <div class="upload-demo">
                        <div tabindex="0" class="el-upload el-upload--text">
                            <button
                                type="button"
                                class="el-button el-button--primary el-button--small"
                            >
                                <i class="el-icon-upload"></i>
                                <span>选择文件</span>
                            </button>
                            <input
                                type="file"
                                name="file"
                                class="el-upload__input"
                                @change="addFile($event)"
                            >
                        </div>
                        <span>{{this.fileName}}</span>
                        <el-button type="text" style="margin: 0 10px" @click="downloadTems">下载csv模板</el-button>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        v-if="batchForm.addMothod === 'auto'"
                        @click="autoAddDevs"
                    >确定并导出证书</el-button>
                    <el-button type="primary" v-else @click="uploadDevsFile">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="添加虚拟设备" :visible.sync="virtualVisible" :before-close="handleClose" center>
            <el-form
                size="small"
                style="margin: auto;"
                ref="virtualForm"
                :rules="rules"
                :model="virtualForm"
            >
                <el-form-item label="添加方式：" prop="addMothod">
                    <el-radio-group v-model="virtualForm.addMothod">
                        <el-radio label="manual">选择已有设备</el-radio>
                        <el-radio label="auto">自动生成</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item
                    prop="deviceName"
                    label="设备名称："
                    v-if="virtualForm.addMothod === 'manual'"
                >
                    <el-select v-model="virtualForm.deviceName" filterable>
                        <el-option
                            v-for="(device, index) in deviceList.items"
                            :key="index"
                            :label="device.did"
                            :value="device.did"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="设备数量："
                    prop="deviceNum"
                    v-if="virtualForm.addMothod === 'auto'"
                >
                    <el-input-number v-model="virtualForm.deviceNum" :min="1" label="描述文字"></el-input-number>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addVirtualDevs">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 升级失败 -->
        <el-dialog
            title="升级失败"
            :visible.sync="upgradeFailedVisible"
            top="15%"
            :before-close="upgradeFailedClose"
        >
            <el-row style="line-height: 50px">
                <div>
                    <span class="upgradeFailed">信息：</span>
                    <span>{{otaFailDetail.errMsg}}</span>
                </div>
                <div>
                    <span class="upgradeFailed">时间：</span>
                    <span>{{formatTime(otaFailDetail.time)}}</span>
                </div>
                <div>
                    <span class="upgradeFailed">固件ID：</span>
                    <span>{{otaFailDetail.fwID}}</span>
                </div>
                <div>
                    <span class="upgradeFailed">固件名称：</span>
                    <span>{{otaFailDetail.name}}</span>
                </div>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
import VueProgress from "./info/VueProgress";
import DeviceUpgrade from "./DeviceUpgrade";
import deviceList from "./mixins/deviceList";
import copy from "@/views/mixins/copy";
import { formatDate } from "@/utils/timeFormat";

import {
    addDeviceAuto,
    addDeviceUpload,
    addVirtual,
    getDevTemplates,
    getOTAFailDetail
} from "@/api/device/device";
import { startVirtualDevice, stopVirtualDevice } from "@/api/debug/debug";
import {
    updateDeviceGroup,
    getOTAProgress,
    getDeviceCount
} from "@/api/device/device";
export default {
    mixins: [deviceList, copy],
    data() {
        return {
            form: {
                did: "",
                status: "",
                page: 1,
                pageSize: 10
            },
            batchForm: {
                addMothod: "auto",
                deviceNum: "",
                file: ""
            },
            fileName: "",
            virtualForm: {
                addMothod: "auto",
                deviceNum: "",
                deviceName: ""
            },
            rules: {
                addMothod: {
                    required: true,
                    message: "请选择添加方式",
                    trigger: "blur"
                },
                file: {
                    required: true,
                    message: "请上传文件",
                    trigger: "blur"
                },
                deviceName: {
                    required: true,
                    message: "请选择设备",
                    trigger: "blur"
                },
                deviceNum: {
                    required: true,
                    message: "请输入设备数量",
                    trigger: "blur"
                }
            },
            upgradeDevice: "",
            dialogVisible: false,
            upgradeVisible: false,
            virtualVisible: false,
            batchVisible: false,
            upgradeFailedVisible: false,
            progressList: [],
            selectedDevice: "",
            deviceCount: "",
            refreshDid: "",
            otaFailDetail: []
        };
    },
    components: { DeviceUpgrade, VueProgress },
    watch: {
        $route() {
            if (
                this.$route.path.indexOf("device") >= 0 &&
                !this.$route.params.did
            ) {
                this.handleeEquipment();
            }
        }
    },
    created() {
        this.deviceCountMethod();
    },
    methods: {
        // 关闭表单
        handleClose() {
            if (this.batchVisible) {
                this.$refs.batchForm.resetFields();
                this.batchVisible = false;
            }
            if (this.virtualVisible) {
                this.$refs.virtualForm.resetFields();
                this.virtualVisible = false;
            }
        },
        // 点击跳路由
        expandDetail(row) {
            const pid = this.$route.params.id;
            this.$router.push({
                path: `/product/${pid}/device/${row.did}/detail`
            });
        },

        // 获取设备总数，在线，离线
        deviceCountMethod() {
            getDeviceCount({ pid: this.form.pid })
                .then(res => {
                    this.deviceCount = res.payload;
                })
                .catch(error => {
                    return error;
                });
        },
        // 获取设备升级进度
        getOtaDetail(device) {
            this.refreshDid = device;
            const data = {
                did: device,
                pid: this.$route.params.id
            };
            getOTAProgress(data).then(res => {
                this.progressList = res.payload;
                if (this.progressList.length > 0) {
                    this.upgradeVisible = true;
                } else {
                    this.$message({
                        message: "暂无正在升级的固件",
                        type: "warning"
                    });
                }
            });
        },
        // 刷新
        RefreshProgress() {
            this.getOtaDetail(this.refreshDid);
        },
        //更新设备分组
        updateGroup(device) {
            console.log(1);
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
            this.deviceCountMethod();
            this.getDevice();
        },
        handleUpgrade(device) {
            if (device.status !== 2) {
                this.upgradeDevice = {
                    ...device,
                    status: 1
                };
                this.dialogVisible = true;
            } else {
                this.$message({
                    message: "离线设备无法升级",
                    type: "warning"
                });
            }
        },
        listenUpgrade(value) {
            this.upgradeDevice = "";
            this.dialogVisible = value;
            this.getDevice();
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
                case "firmwareStatus":
                    if (cellValue === 0) {
                        result = "正常";
                    } else if (cellValue === 1) {
                        result = "正在升级";
                    } else if (cellValue === 2) {
                        result = "升级完成";
                    } else if (cellValue === 3) {
                        result = "升级失败";
                    }
                    break;
            }
            return result;
        },
        // 跳转至运行状态接口
        handleState(value) {
            console.log(JSON.stringify(value));
            this.$router.push({
                path: `/product/${value.pid}/device/${value.did}/state`
            });
        },
        // 关闭进度框
        handleProgressClose() {
            this.progressList = [];
            this.getDevice();
            this.upgradeVisible = false;
        },
        // 设备类型过滤
        filterDeviceType(value, row, column) {
            const property = column["property"];
            return row[property] === value;
        },
        // table选中状态
        handleSelectionChange(val) {
            this.selectedDevice = val;
        },
        // 批量自动添加设备
        autoAddDevs() {
            this.$refs.batchForm.validate(valid => {
                if (valid) {
                    const data = {
                        pid: this.$route.params.id,
                        num: this.batchForm.deviceNum
                    };
                    addDeviceAuto(data).then(res => {
                        this.$message({
                            message: "添加成功",
                            type: "success"
                        });
                        this.handleeEquipment();
                        this.handleClose();
                        window.location.href = res.payload.url;
                    });
                }
            });
        },
        // 批量上传设备
        addFile(event) {
            let files = event.target.files;
            if (files.length === 0) {
                return;
            }
            // 文件大小
            if (files[0].size > 10 * 1024 * 1024) {
                this.$message.error("文件太大了，请上传小于10M的文件");
                return;
            }
            let reader = new FileReader();
            reader.onerror = function() {
                this.$message.error("读取文件失败");
            };
            reader.onload = () => {
                this.fileName = files[0].name;
                this.batchForm.file = files[0];
            };
            reader.readAsArrayBuffer(files[0]);
        },
        // 批量上传设备
        uploadDevsFile() {
            this.$refs.batchForm.validate(valid => {
                if (valid) {
                    let formData = new FormData();
                    formData.append("file", this.batchForm.file);
                    formData.append("pid", this.$route.params.id);
                    addDeviceUpload(formData).then(() => {
                        this.$message({
                            message: "添加成功",
                            type: "success"
                        });
                        this.handleeEquipment();
                        this.handleClose();
                    });
                    this.handleClose();
                    this.handleeEquipment();
                }
            });
        },
        // 下载csv设备模板
        downloadTems() {
            getDevTemplates().then(res => {
                window.open(res.payload.url);
            });
        },
        // 添加虚拟设备
        addVirtualDevs() {
            this.$refs.virtualForm.validate(valid => {
                if (valid) {
                    let data = {
                        pid: this.$route.params.id
                    };
                    if (this.virtualForm.addMothod === "auto") {
                        data.num = this.virtualForm.deviceNum;
                    } else {
                        data.did = this.virtualForm.deviceName;
                    }
                    addVirtual(data).then(() => {
                        this.$message({
                            message: "添加成功",
                            type: "success"
                        });
                        this.handleeEquipment();
                        this.handleClose();
                    });
                }
            });
        },
        // 关闭或开启虚拟设备
        switchVirtualDevice(status) {
            if (this.selectedDevice) {
                const hasTrueDevice = this.selectedDevice.some(
                    item => item.deviceType === "true"
                );
                if (hasTrueDevice) {
                    this.$message({
                        message: "被选中设备中含有真实设备，不允许操作真实设备",
                        type: "warning"
                    });
                } else {
                    const list = [];
                    this.selectedDevice.map(item => {
                        list.push(item.did);
                    });
                    const data = {
                        pid: this.$route.params.id,
                        did: list
                    };
                    if (status) {
                        // 开启
                        startVirtualDevice(data).then(() => {
                            this.$message({
                                type: "success",
                                message: "启动成功"
                            });
                            this.deviceCountMethod();
                            this.getDevice();
                        });
                    } else {
                        // 关闭
                        stopVirtualDevice(data).then(() => {
                            this.$message({
                                type: "success",
                                message: "关闭成功"
                            });
                            this.deviceCountMethod();
                            this.getDevice();
                        });
                    }
                }
            }
        },
        // 升级失败详情
        upgradeFailed(value) {
            this.upgradeFailedVisible = true;
            if (value.firmwareStatus === 3) {
                const data = {
                    did: value.did,
                    pid: value.pid
                };
                getOTAFailDetail(data).then(res => {
                    this.otaFailDetail = res.payload;
                });
            }
        },
        // 格式化时间
        formatTime(value) {
            return formatDate(value, "y - m - d h : i : s");
        },
        upgradeFailedClose() {
            this.otaFailDetail = [];
            this.upgradeFailedVisible = false;
            this.getDevice();
        }
    }
};
</script>
<style lang='less' scoped>
.upgradeFailed {
    width: 80px;
    display: inline-block;
}
.blue {
    color: #409eff;
    cursor: pointer;
}
.copy-box {
    margin-left: 4px;
}
.el-upload {
    position: relative;
}
.el-upload__input {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100px;
    height: 100%;
    opacity: 0;
}
.el-upload-list {
    display: inline-block;
    margin-left: 10px;
    padding: 0px 14px;
    border: 1px dashed #ddd;
    box-sizing: border-box;
    border-radius: 4px;
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
    .warning-tips {
        margin: 20px auto;
        width: 100%;
        text-align: center;
    }
}
</style>