<template>
    <el-card class="box-card manage-wrapper" shadow="never">
        <div slot="header" class="clearfix">
            <span class="card-title">日志服务</span>
        </div>
        <div class="log-wrapper">
            <el-form :inline="true" :model="form" size="small">
                <el-form-item label="产品名称">
                    <el-select v-model="form.productName" placeholder="请选择产品">
                        <el-option label="智能电灯"></el-option>
                        <el-option label="智能水位计"></el-option>
                        <el-option label="智能雨量计"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-tabs type="card">
                <el-tab-pane label="设备行为分析">
                    <el-form :inline="true" :model="form" size="small">
                        <el-form-item label="设备名称">
                            <el-input v-model="form.deviceName"></el-input>
                        </el-form-item>
                        <el-form-item label="时间范围">
                            <el-select v-model="form.time" placeholder="请选择时间范围">
                                <el-option label="1小时" value="1"></el-option>
                                <el-option label="4小时" value="4"></el-option>
                                <el-option label="24小时" value="24"></el-option>
                                <el-option label="自定义" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">查询</el-button>
                        </el-form-item>
                    </el-form>
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
                <el-tab-pane label="上行消息分析">
                    <el-form :inline="true" :model="form" size="small">
                        <el-form-item label="设备名称">
                            <el-input v-model="form.deviceName"></el-input>
                        </el-form-item>
                        <el-form-item label="消息Id">
                            <el-input v-model="form.msgId"></el-input>
                        </el-form-item>
                        <el-form-item label="全部状态">
                            <el-select v-model="form.state" placeholder="请选择活动区域">
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
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">查询</el-button>
                        </el-form-item>
                    </el-form>
                    <el-table
                        :data="LogList"
                        style="width: 100%; margin-top: 12px"
                        border
                        size="small"
                    >
                        <el-table-column prop="time" label="时间"></el-table-column>
                        <el-table-column prop="msgID" label="MessageId"></el-table-column>
                        <el-table-column prop="deviceName" label="DeviceName"></el-table-column>
                        <el-table-column prop="content" label="内容(全部)"></el-table-column>
                        <el-table-column prop="stateAnalyze" label="状态以及原因分析"></el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="下行消息分析">
                    <el-form :inline="true" :model="form" size="small">
                        <el-form-item label="设备名称">
                            <el-input v-model="form.deviceName"></el-input>
                        </el-form-item>
                        <el-form-item label="消息Id">
                            <el-input v-model="form.msgId"></el-input>
                        </el-form-item>
                        <el-form-item label="全部状态">
                            <el-select v-model="form.state" placeholder="请选择活动区域">
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
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">查询</el-button>
                        </el-form-item>
                    </el-form>
                    <el-table
                        :data="LogList"
                        style="width: 100%; margin-top: 12px"
                        border
                        size="small"
                    >
                        <el-table-column prop="time" label="时间"></el-table-column>
                        <el-table-column prop="msgID" label="MessageId"></el-table-column>
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
export default {
    components: {},
    props: {},
    data() {
        return {
            form: {
                productName: "",
                deviceName: "",
                time: "",
                state: "",
                msgId: ""
            },
            LogList: []
        };
    },
    watch: {},
    computed: {},
    methods: {},
    created() {},
    mounted() {}
};
</script>
<style lang="less" scoped>
</style>