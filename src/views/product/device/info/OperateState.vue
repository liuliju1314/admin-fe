<template>
    <div class="operate-state-wrapper">
        <el-row :gutter="20">
            <el-col :span="6" v-for="(prop, index) in propList" :key="index">
                <el-card shadow="hover" class="state">
                    <div class="state-content">
                        <div class="state-name">
                            <span>{{prop.name}}</span>
                            <el-button
                                @click="showChart"
                                type="text"
                                size="small"
                                v-if="prop.history"
                            >查看历史数据</el-button>
                        </div>
                        <div class="state-num">{{prop.value}}</div>
                        <div class="state-time">{{formatTime(prop.timestamp)}}</div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog title="提示" :visible.sync="dialogVisible">
            <ve-line :data="chartData"></ve-line>
        </el-dialog>
    </div>
</template>

<script>
import VeLine from "v-charts/lib/line.common";
import { getDeviceProps } from "@/api/device/device";
import { formatDate } from "@/utils/format";
export default {
    props: {},
    data() {
        return {
            propList: [],
            dialogVisible: false,
            chartData: {
                columns: ["date", "PV"],
                rows: [
                    { date: "01-01", PV: 1231 },
                    { date: "01-02", PV: 1223 },
                    { date: "01-03", PV: 2123 },
                    { date: "01-04", PV: 4123 },
                    { date: "01-05", PV: 3123 },
                    { date: "01-06", PV: 7123 }
                ]
            }
        };
    },
    components: {
        VeLine
    },
    created() {
        const data = {
            did: this.$route.params.did,
            pid: this.$route.params.id
        };
        getDeviceProps(data).then(res => {
            this.propList = res.payload;
        });
    },
    methods: {
        showChart() {
            this.dialogVisible = true;
        },
        formatTime(data) {
            return formatDate(data * 1000);
        }
    }
};
</script>
<style lang="less" scoped>
.state {
    margin: 10px 0;
    .state-content {
        padding: 20px 0 0;
        height: 100px;
        div {
            height: 30px;
            line-height: 30px;
        }
        .state-name {
            text-align: left;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
                font-size: 16px;
                color: #333;
            }
        }
        .state-num {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: 85%;
            font-size: 28px;
        }
        .state-time {
            color: #999;
            font-size: 13px;
            line-height: 40px;
        }
    }
}
</style>