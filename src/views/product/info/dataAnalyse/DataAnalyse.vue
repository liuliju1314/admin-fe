<template>
    <el-main>
        <div class="data-analyse">
            <div class="data-analyse-item">
                <p>在线设备</p>
                <span>0</span>
            </div>

            <div class="data-analyse-item">
                <p>离线设备</p>
                <span>0</span>
            </div>

            <div class="data-analyse-item">
                <p>今日新增上线</p>
                <span>0</span>
            </div>

            <div class="data-analyse-item">
                <p>故障设备</p>
                <span>89</span>
            </div>
        </div>
    </el-main>
</template>

<script>
export default {
    name: "DataAnalyse",
    components: {},
    props: {},
    data() {
        return {};
    },
    created() {},
    methods: {}
};
</script>


<style lang="less" scoped>
.el-main {
    background-color: #fff;
    box-sizing: border-box;
    .data-analyse {
        border: 1px solid #f5f5f5;
        border-radius: 4px;
        width: 100%;
        margin-bottom: 20px;
        .data-analyse-item {
            width: 25%;
            display: inline-block;
            padding: 30px;
            border-left: 1px solid #f5f5f5;
            span {
                display: block;
                font-size: 40px;
                text-align: center;
            }
        }
    }
}
</style>