<template>
    <div class="operate-state-wrapper">
        <el-row :gutter="20">
            <el-col
                :xs="24"
                :sm="12"
                :md="8"
                :lg="6"
                :xl="6"
                v-for="(prop, index) in propList"
                :key="index"
                style="margin-bottom: 20px;"
            >
                <el-card shadow="hover">
                    <div class="state-content">
                        <div class="state-name">
                            <span>{{prop.name}}</span>
                            <el-button
                                @click="showChart(prop)"
                                type="text"
                                size="small"
                                v-if="prop.history"
                            >查看历史数据</el-button>
                        </div>
                        <div
                            :class="prop.value ? 'state-num': 'not-state-num'"
                        >{{prop.value ? prop.value: '暂无数据'}}</div>
                        <div
                            class="state-time"
                        >{{prop.timestamp === 0 ? "年-月-日 时:分:秒" : formatTime(prop.timestamp)}}</div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog :title="chartTitle" :visible.sync="dialogVisible" class="header">
            <div style="margin-bottom: 20px;text-align: left">
                <span style="margin-right: 3%;">时间范围：</span>
                <el-date-picker
                    v-model="timeRange"
                    size="small"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['00:00:00', '23:59:59']"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                ></el-date-picker>
                <el-button size="small" type="primary" @click="handleChart()">查询</el-button>
            </div>

            <div style="text-align: left">
                <el-button-group>
                    <el-button size="small" @click="changeChartType(1)">折线图</el-button>
                    <el-button size="small" @click="changeChartType(2)">柱状图</el-button>
                </el-button-group>
            </div>
            <ve-line v-if="veLine" :data="chartData"></ve-line>
            <ve-histogram v-else :data="chartData"></ve-histogram>
        </el-dialog>
    </div>
</template>

<script>
import VeLine from "v-charts/lib/line.common";
import VeHistogram from "v-charts/lib/histogram.common";
import { getDeviceProps, getPropsChart } from "@/api/device/device";
import { formatDate, setTimeFormat } from "@/utils/timeFormat";

export default {
    props: {},
    data() {
        return {
            did: "",
            pid: "",
            label: "",
            timeRange: [],
            propList: [], //运行状态列表
            chartTitle: "", //图表对话框的title
            veLine: true, //图表切换
            dialogVisible: false,
            chartData: {
                columns: [],
                rows: []
            }
        };
    },
    components: {
        VeLine,
        VeHistogram
    },
    created() {
        this.did = this.$route.params.did;
        this.pid = this.$route.params.id;
        getDeviceProps({
            did: this.did,
            pid: this.pid,
            businessType: [2, 3]
        }).then(res => {
            this.propList = res.payload;
        });
    },
    methods: {
        // 设置默认日期格式
        handleDefaultformat() {
            let curDate = new Date(),
                lastDate = new Date();
            curDate = new Date();
            lastDate = new Date().getTime() - 3600 * 1000 * 24;
            this.timeRange = [];
            this.timeRange.push(
                formatDate(lastDate, "y-m-d"),
                formatDate(curDate, "y-m-d")
            );
        },
        // 点击查看历史数据图表
        showChart(value) {
            this.label = value.label;
            this.chartTitle = value.name;
            this.dialogVisible = true;
            this.veLine = true;
            this.handleDefaultformat();
            this.propsChart();
        },
        // 查询时间图表
        handleChart() {
            this.propsChart();
        },
        // 获取图表数据接口
        propsChart() {
            let timeRange = setTimeFormat(this.timeRange);
            const data = {
                pid: this.pid,
                did: this.did,
                label: this.label,
                start: timeRange[0],
                end: timeRange[1]
            };
            getPropsChart(data).then(res => {
                this.chartData.rows = res.payload.rows.map(item => {
                    item.time = this.formatTime(item.time);
                });
                this.chartData.rows = res.payload.rows;
                this.chartData.columns = res.payload.columns;
            });
        },
        // 格式化时间戳
        formatTime(data) {
            return formatDate(data * 1000);
        },
        // 点击按钮切换不同图表
        changeChartType(value) {
            if (value === 1) {
                this.veLine = true;
            } else {
                this.veLine = false;
            }
        }
    }
};
</script>
<style lang="less">
.header {
    text-align: center;
}
</style>
<style lang="less" scoped>
.state-content {
    padding: 20px;
    height: 100px;
    .state-name {
        text-align: left;
        display: flex;
        height: 32px;
        justify-content: space-between;
        align-items: center;
        span {
            font-size: 16px;
            color: #333;
        }
    }
    .state-num {
        overflow: hidden;
        height: 35px;
        line-height: 35px;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 85%;
        font-size: 28px;
    }
    .not-state-num {
        height: 35px;
        line-height: 35px;
        font-size: 13px;
        color: #999;
    }
    .state-time {
        color: #999;
        font-size: 13px;
        line-height: 40px;
    }
}
</style>