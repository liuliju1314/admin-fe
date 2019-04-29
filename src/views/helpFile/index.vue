<template>
    <el-card class="box-card help-box" shadow="never">
        <el-tabs tab-position="left">
            <el-tab-pane label="创建产品">
                <product-file></product-file>
            </el-tab-pane>
            <el-tab-pane label="添加属性">
                <property-file></property-file>
            </el-tab-pane>
            <el-tab-pane label="固件升级">
                <fir-update></fir-update>
            </el-tab-pane>
            <el-tab-pane label="硬件调试">
                <debug-online></debug-online>
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<script>
import ProductFile from "./ProductFile";
import PropertyFile from "./PropertyFile";
import FirUpdate from "./FirUpdate";
import DebugOnline from "./DebugOnline";

export default {
    name: "HelpFile",
    data() {
        return {};
    },
    components: {
        ProductFile,
        PropertyFile,
        FirUpdate,
        DebugOnline
    }
};
</script>

<style lang='less'>
.help-box {
    .title {
        font-weight: normal;
        margin: 0;
        height: 40px;
        line-height: 40px;
    }
    .list-item {
        color: rgba(0, 0, 0, 0.7);
    }
    img {
        width: 80%;
    }
}
</style>
