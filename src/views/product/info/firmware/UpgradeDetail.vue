<template>
    <el-dialog :visible.sync="visible" title="升级详情" :before-close="handleClose">
        <el-form :inline="true" :model="form" size="small">
            <!-- 产品信息框 -->
            <el-form-item label="设备ID">
                <el-input v-model="form.did"></el-input>
            </el-form-item>
            <el-form-item label="升级状态">
                <el-select v-model="form.status">
                     <el-option label="全部" value=""></el-option>
                    <el-option label="正在升级" value="1"></el-option>
                    <el-option label="升级成功" value="2"></el-option>
                    <el-option label="升级失败" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleProductList(1)">查询</el-button>
                <el-button type="primary" @click="handleProductList(1)">刷新</el-button>
            </el-form-item>
        </el-form>
        <div>版本： V{{fw.version}}；目标设备数： 14；升级成功数：14；升级失败数：0.</div>
        <el-table :data="tableData" style="width: 100%" border size="small">
            <el-table-column prop="date" label="设备ID"></el-table-column>
            <el-table-column prop="date" label="当前版本号"></el-table-column>
            <el-table-column prop="date" label="升级进度"></el-table-column>
            <el-table-column prop="date" label="状态"></el-table-column>
        </el-table>
    </el-dialog>
</template>

<script>
export default {
    name: "UpgradeDetail",
    props: ["fw"],
    data() {
        return {
            form: {
                did: '',
                status: ''
            },
            visible: false
        };
    },
    watch: {
        fw() {
            if (this.fw) {
                this.visible = true;
            }
        }
    },
    components: {},
    methods: {
        handleClose() {
            this.visible = false;
            this.$emit("listenClose", false);
        }
    }
};
</script>

