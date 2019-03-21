<template>
    <el-card class="box-card manage-wrapper" shadow="never">
        <div slot="header" class="clearfix">
            <span class="card-title">日志服务</span>
        </div>
        <div class="log-wrapper">
            <el-form :inline="true" :model="form" size="small">
                <!-- 产品信息框 -->
                <el-form-item label="产品名称">
                    <el-select
                        v-model="form.productName"
                        placeholder="请选择产品名称"
                        clearable
                        @click.native="getProductModel()"
                    >
                        <el-option
                            v-for="item in productModel"
                            :key="item.pid"
                            :label="item.name"
                            :value="item.name"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备名称">
                    <el-input v-model="form.deviceName"></el-input>
                </el-form-item>
                <el-form-item label="全部状态">
                    <el-select v-model="form.state" placeholder="请选择消息状态">
                        <el-option label="全部状态" value="0"></el-option>
                        <el-option label="成功" value="1"></el-option>
                        <el-option label="失败" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间范围">
                    <el-select v-model="form.time" placeholder="请选择时间范围">
                        <el-option label="1小时" value="1"></el-option>
                        <el-option label="4小时" value="4"></el-option>
                        <el-option label="24小时" value="24"></el-option>
                        <el-option label="自定义" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="form.time === '0'">
                    <el-date-picker
                        v-model="form.timeRange"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <el-tabs type="card" @tab-click="handleClick" v-model="activeName">
                <el-tab-pane label="上行消息分析" name="0" key="0">
                    <el-table
                        :data="LogList"
                        style="width: 100%; margin-top: 12px"
                        border
                        size="small"
                    >
                        <el-table-column prop="time" label="时间"></el-table-column>
                        <el-table-column prop="deviceName" label="DeviceName"></el-table-column>
                        <el-table-column prop="content" label="内容(全部)"></el-table-column>
                        <el-table-column prop="stateAnalyze" label="状态以及原因分析"></el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="下行消息分析" name="1" key="1">
                    <el-table
                        :data="LogList"
                        style="width: 100%; margin-top: 12px"
                        border
                        size="small"
                    >
                        <el-table-column prop="time" label="时间"></el-table-column>
                        <el-table-column prop="deviceName" label="DeviceName"></el-table-column>
                        <el-table-column prop="content" label="内容(全部)"></el-table-column>
                        <el-table-column prop="stateAnalyze" label="状态以及原因分析"></el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="设备行为分析" name="2" key="2">
                    <el-table
                        :data="LogList"
                        style="width: 100%; margin-top: 12px"
                        border
                        size="small"
                    >
                        <el-table-column prop="time" label="时间"></el-table-column>
                        <el-table-column prop="deviceName" label="DeviceName"></el-table-column>
                        <el-table-column prop="content" label="内容(全部)"></el-table-column>
                        <el-table-column prop="stateAnalyze" label="状态以及原因分析"></el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </div>
    </el-card>
</template>

<script>
import { getProductList } from "@/api/product/product";
export default {
    components: {},
    props: {},
    data() {
        return {
            form: {
                productName: "",
                deviceName: "",
                time: "",
                timeRange: "",
                state: ""
            },
            activeName: "2",
            LogList: [],
            isPage: false, //获取所有产品名称以及产品Id,不分页
            productModel: [] //存放所有产品名称以及产品Id
        };
    },
    watch: {},
    computed: {},
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
        // 点击tab标签页
        handleClick(tab) {
            console.log(tab.name);
        },
        //查询不同的请求
        onSubmit() {}
    },
    created() {},
    mounted() {}
};
</script>
<style lang="less" scoped>
</style>