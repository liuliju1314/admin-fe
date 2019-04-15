<template>
    <div class="operate-state-wrapper">
        <el-row :gutter="20">
            <el-col
                :span="6"
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
            <ve-line :data="chartData"></ve-line>
        </el-dialog>
    </div>
</template>

<script>
import VeLine from "v-charts/lib/line.common";
import { getDeviceProps, getPropsChart } from "@/api/device/device";
import { formatDate } from "@/utils/format";
export default {
    props: {},
    data() {
        return {
            did: "",
            pid: "",
            label: "",
            time: "",
            chartTitle: "",
            propList: [],
            dialogVisible: false,
            chartData: {
                columns: [],
                rows: []
            }
        };
    },
    components: {
        VeLine
    },
    created() {
        this.did = this.$route.params.did;
        this.pid = this.$route.params.id;
        getDeviceProps({ did: this.did, pid: this.pid }).then(res => {
            this.propList = res.payload;
        });
    },
    methods: {
        showChart(value) {
            this.label = value.label;
            this.chartTitle = value.name;
            this.dialogVisible = true;
            this.propsChart();
        },
        propsChart() {
            const data = {
                pid: this.pid,
                did: this.did,
                label: this.label
            };
            getPropsChart(data).then(res => {
                this.chartData.rows = res.payload.rows.map(item => {
                    item.time = this.formatTime(item.time);
                });
                this.chartData.rows = res.payload.rows;
                this.chartData.columns = res.payload.columns;
            });
        },
        formatTime(data) {
            return formatDate(data * 1000);
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