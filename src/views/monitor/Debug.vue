<template>
    <el-card class="box-card manage-wrapper" shadow="never">
        <div slot="header" class="clearfix">
            <span class="card-title">在线调试</span>
        </div>
        <div class="text-wrapper">
            <el-form :inline="true" :model="form" size="small">
                <el-form-item label="产品名称">
                    <el-select v-model="form.productName" placeholder="请选择产品">
                        <el-option label="智能电灯"></el-option>
                        <el-option label="智能水位计"></el-option>
                        <el-option label="智能雨量计"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备名称">
                    <el-select v-model="form.deviceName" placeholder="请选择设备">
                        <el-option label="设备1"></el-option>
                        <el-option label="设备2"></el-option>
                        <el-option label="设备3"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
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
                deviceName: ""
            }
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