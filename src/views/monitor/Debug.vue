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
                <el-form-item>
                    <el-button type="primary">确定</el-button>
                </el-form-item>
            </el-form>
            <el-row :gutter="20">
                <el-col :span="8">
                    <div class="left">
                        <table>
                            <tr>
                                <td>设备编号：</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>设备编号：</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>设备分组：</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>电池电压：</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>充电电压：</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>信号强度：</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>软件版本号：</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>硬件版本号：</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>在线状态：</td>
                                <td></td>
                            </tr>
                        </table>
                    </div>
                </el-col>
                <el-col :span="16">
                    <div class="right"></div>
                </el-col>
            </el-row>
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
.left, .right {
    border: 1px dashed #ddd;
    border-radius: 4px;
    padding: 24px 18px;
    box-sizing: border-box;
    font-size: 14px;
    td {
        padding: 4px;
        margin: 4px;
    }
}
</style>