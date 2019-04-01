<template>
    <div class="operate-state-wrapper">
        <el-row :gutter="20">
            <el-col :span="6">
                <el-card shadow="hover">
                    <div class="state-content">
                        <div class="state-name">
                            <span>实时充电电压</span>
                            <el-button @click="showChart" type="text" size="small">查看历史数据</el-button>
                        </div>
                        <div class="state-num">30</div>
                        <div class="state-time">2019/03/18 16:00:28</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover">
                    <div class="state-content">
                        <div class="state-name">
                            <span>实时充电电压</span>
                            <el-button @click="showChart" type="text" size="small">查看历史数据</el-button>
                        </div>
                        <div class="state-num">30</div>
                        <div class="state-time">2019/03/18 16:00:28</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover">
                    <div class="state-content">
                        <div class="state-name">
                            <span>实时充电电压</span>
                            <el-button @click="showChart" type="text" size="small">查看历史数据</el-button>
                        </div>
                        <div class="state-num">30</div>
                        <div class="state-time">2019/03/18 16:00:28</div>
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
export default {
    props: {},
    data() {
        return {
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

    methods: {
        showChart() {
            this.dialogVisible = true;
        }
    }
};
</script>
<style lang="less" scoped>
.state-content {
    padding: 20px;
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
</style>