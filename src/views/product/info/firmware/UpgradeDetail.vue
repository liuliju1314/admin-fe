<template>
    <el-dialog
        class="upgrade-detail"
        :visible.sync="visible"
        title="升级详情"
        :before-close="handleClose"
        width="80%"
        top="10vh"
    >
        <div>
            <div style="font-size: 22px; margin-bottom: 10px; color: #49f"> V{{fw.version}}</div>
            <div style="margin-bottom: 12px;">目标设备数：14 ，升级成功数：14 ，升级失败数：0 .</div> 
        </div>
        <el-form :inline="true" :model="form" size="mini">
            <!-- 产品信息框 -->
            <el-form-item>
                <el-select v-model="form.status">
                    <el-option label="升级状态" value></el-option>
                    <el-option label="正在升级" value="1"></el-option>
                    <el-option label="升级成功" value="2"></el-option>
                    <el-option label="升级失败" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input placeholder="请输入设备编号" v-model="form.did" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="text" @click="handleProductList(1)" icon="el-icon-refresh">刷新</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="deviceList" style="width: 100%" border size="small">
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
                did: "",
                status: ""
            },
            visible: false,
            deviceList: []
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
<style lang="less">
.upgrade-detail {
    .el-dialog__body {
        padding-top: 10px; 
    }
    .el-form-item {
        margin-bottom: 8px;
    }
}
</style>

