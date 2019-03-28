<template>
    <el-main>
        <div class="data-analyse">
            <div class="data-analyse-item">
                <p>在线设备</p>
                <span>1</span>
            </div>

            <div class="data-analyse-item">
                <p>离线设备</p>
                <span>3</span>
            </div>

            <div class="data-analyse-item">
                <p>今日新增上线</p>
                <span>4</span>
            </div>

            <div class="data-analyse-item">
                <p>故障设备</p>
                <span>6</span>
            </div>
        </div>
    </el-main>
</template>

<script>
export default {
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