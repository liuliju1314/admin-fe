<template>
    <el-main>
        <div class="data-analyse">
            <div class="data-analyse-item">
                <p>实时在线设备</p>
                <span>{{statisticNumber.online}}</span>
            </div>

            <div class="data-analyse-item">
                <p>离线设备</p>
                <span>{{statisticNumber.offline}}</span>
            </div>

            <div class="data-analyse-item">
                <p>今日新增上线</p>
                <span>{{statisticNumber.todayAdd}}</span>
            </div>
            <div class="data-analyse-item">
                <p>故障设备</p>
                <span>{{statisticNumber.broken}}</span>
            </div>
        </div>
    </el-main>
</template>

<script>
import { getStatistic } from "@/api/statistic/statistic";
export default {
    name: "DataAnalyse",
    components: {},
    props: {},
    data() {
        return {
            pid: "",
            statisticNumber: ""
        };
    },
    created() {
        this.init();
        this.statisticNum();
    },
    watch: {
        $route() {
            this.init();
        }
    },
    methods: {
        init() {
            this.pid = this.$route.params.id;
            if (this.pid && this.$route.path.indexOf("analyse") >= 0) {
                this.statisticNum();
            }
        },
        statisticNum() {
            getStatistic({ pid: this.pid })
                .then(res => {
                    this.statisticNumber = res.payload;
                })
                .catch(() => {
                    this.$message.error("获取失败");
                });
        }
    }
};
</script>


<style lang="less" scoped>
.el-main {
    background-color: #fff;
    box-sizing: border-box;
    .data-analyse {
        border: 1px solid #ebeef5;
        border-radius: 4px;
        width: 100%;
        margin-bottom: 20px;
        .data-analyse-item {
            width: 25%;
            display: inline-block;
            padding: 30px;
            border-left: 1px solid #ebeef5;
            box-sizing: border-box;
            span {
                display: block;
                font-size: 40px;
                text-align: center;
            }
        }
    }
}
</style>