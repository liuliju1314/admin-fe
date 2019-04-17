<template>
    <el-card class="box-card manage-wrapper" shadow="never">
        <div slot="header" class="clearfix">
            <span class="card-title">日志服务</span>
        </div>
        <div class="log-wrapper">
            <el-form :inline="true" :model="form" ref="form" size="small" :rules="rules">
                <!-- 产品信息框 -->
                <el-form-item label="产品名称" prop="pid">
                    <el-select
                        v-model="form.pid"
                        placeholder="请选择产品名称"
                        clearable
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
                <el-form-item label="设备名称" prop="did">
                    <el-select
                        v-model="form.did"
                        filterable
                        placeholder="请选择设备名称"
                        clearable
                        @click.native="getDeviceModel()"
                    >
                        <el-option
                            v-for="item in deviceModel"
                            :key="item.did"
                            :label="item.did"
                            :value="item.did"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="消息类型" prop="linkType">
                    <el-select v-model="form.linkType" placeholder="请选择日志等级" clearable>
                        <el-option label="全部消息分析" value="all"></el-option>
                        <el-option label="上行消息分析" value="up"></el-option>
                        <el-option label="下行消息分析" value="down"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="日志等级" prop="level">
                    <el-select v-model="form.level" placeholder="请选择日志等级" clearable>
                        <el-option label="调试" value="debug"></el-option>
                        <el-option label="消息" value="info"></el-option>
                        <el-option label="预警" value="warning"></el-option>
                        <el-option label="错误" value="error"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间范围">
                    <el-date-picker
                        v-model="timeRange"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="timestamp"
                    ></el-date-picker>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>

            <el-table
                :data="deviceLogList"
                style="width: 100%; margin-top: 12px"
                border
                size="small"
            >
                <el-table-column label="时间" min-width="20%">
                    <template slot-scope="scope">{{ changeTimeFormater(scope.row.time) }}</template>
                </el-table-column>
                <el-table-column prop="did" label="DeviceName" min-width="20%"></el-table-column>
                <el-table-column label="内容(全部)" min-width="40%">
                    <template slot-scope="scope">{{ scope.row.msg}}</template>
                </el-table-column>
                <el-table-column prop="level" label="状态以及原因分析" min-width="20%"></el-table-column>
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
        </div>
    </el-card>
</template>

<script>
import { getProductList } from "@/api/product/product";
import { getDeviceLog } from "@/api/log/log";
import { formatDate } from "@/utils/format";
import { getDeviceList } from "@/api/device/device";

export default {
    data() {
        return {
            rules: {
                pid: [
                    {
                        required: true,
                        message: "请选择产品名称",
                        trigger: "blur"
                    }
                ],
                did: [
                    {
                        required: true,
                        message: "请输入设备名称",
                        trigger: "blur"
                    }
                ]
            },
            form: {
                pid: "",
                did: "",
                linkType: "all",
                level: "",
                page: 1,
                pageSize: 10,
                isPage: true
            },
            timeRange: "",
            total: "",
            deviceLogList: [],
            isPage: false, //获取所有产品名称以及产品Id,不分页
            productModel: [], //存放所有产品名称以及产品Id
            deviceModel: [] //存放所有产品名称以及产品Id
        };
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
        // 获取产品下的设备名称
        getDeviceModel() {
            this.deviceModel = [];
            const data = {
                pid: this.form.pid,
                ...this.isPage
            };
            getDeviceList(data)
                .then(res => {
                    res.payload.items.map(item => {
                        const obj = {
                            did: ""
                        };
                        obj.did = item.did;
                        this.deviceModel.push(obj);
                    });
                })
                .catch(error => {
                    return error;
                });
        },
        // 获取设备日志列表
        DeviceLogList() {
            const data = {
                ...this.form,
                start: this.timeRange[0] ? this.timeRange[0] : "",
                end: this.timeRange[1] ? this.timeRange[1] : ""
            };
            getDeviceLog(data)
                .then(res => {
                    this.deviceLogList = res.payload.items;
                    this.total = res.payload.total;
                })
                .catch(error => {
                    return error;
                });
        },
        //查询不同的请求
        onSubmit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.DeviceLogList();
                } else {
                    return false;
                }
            });
        },
        //分页
        handlePage(value) {
            this.form.page = value;
            this.DeviceLogList();
        },
        // 时间格式更改
        changeTimeFormater(cellvalue) {
            return formatDate(cellvalue, "y-m-d h:i:s");
        }
    }
};
</script>
<style lang="less" scoped>
</style>