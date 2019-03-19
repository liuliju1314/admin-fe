<template>
    <el-card class="box-card operate-state-wrapper" shadow="never">
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="state-content">
                    <div class="state-name">
                        <span>充电电压</span>
                        <el-button type="text">查看数据</el-button>
                    </div>
                    <div class="state-num">30</div>
                    <div class="state-time">2019/03/18 16:00:28</div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="state-content">
                    <div class="state-name">
                        <span>充电电压</span>
                        <el-button type="text">查看数据</el-button>
                    </div>
                    <div class="state-num">30</div>
                    <div class="state-time">2019/03/18 16:00:28</div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="state-content">
                    <div class="state-name">
                        <span>充电电压</span>
                        <el-button type="text">查看数据</el-button>
                    </div>
                    <div class="state-num">30</div>
                    <div class="state-time">2019/03/18 16:00:28</div>
                </div>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
        return {};
    },
    watch: {},
    computed: {},
    methods: {},
    created() {},
    mounted() {}
};
</script>
<style lang="less" scoped>
.box-card {
    text-align: left;
    min-height: calc(100vh - 250px);
    border: 0px;
}
.state-content {
    padding: 20px;
    border: 1px solid #d7d8d9;
    .state-name {
        font-size: 14px;
        color: #333;
        text-align: left;
        display: flex;
        justify-content: space-between;
        align-items: center;
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
        font-size: 14px;
        line-height: 40px;
    }
}
</style>