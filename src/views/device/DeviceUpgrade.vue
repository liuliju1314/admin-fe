<template>
    <el-dialog title="设备升级" :visible.sync="visible" :before-close="beforeClose">
        <div class="deviceUpgrade">
            <div>
                <span>设备ID：{{this.device.did}}</span>
            </div>
            <div>
                <span>设备当前固件版本：{{this.device.fwVersion}}</span>
            </div>

            <!-- 循环的设备列表 -->
            <el-table :data="firmwareList.items" style="width: 100%; margin-top: 12px" size="small">
                <el-table-column prop="fwID" label="固件ID"></el-table-column>
                <el-table-column prop="name" label="固件名称"></el-table-column>
                <el-table-column prop="version" label="版本"></el-table-column>
                <el-table-column prop="desc" label="分组"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click.stop="handleUpgrade(scope)" type="text" size="small">升级</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页逻辑 -->
            <div class="pagination-box" v-if="pageSize < firmwareList.total">
                <el-pagination
                    :page-size="pageSize"
                    :page="page"
                    layout="prev, pager, next"
                    :total="firmwareList.total"
                    @current-change="handlePage"
                ></el-pagination>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import { OTAForDevice } from "@/api/device/device";
import { getfirmwareList } from "@/api/firmware/firmware";
export default {
    name: "",
    props: ["device", "visible"],
    data() {
        return {
            UpgradeFw: "",
            firmwareList: [],
            page: 1,
            pageSize: 10
        };
    },
    watch: {
        visible() {
            if (this.visible && this.device) {
                this.handleFwList(1);
            }
        }
    },
    methods: {
        beforeClose() {
            this.$emit("listenUpgrade", false);
        },

        handlePage(value) {
            this.handleFwList(value);
        },
        handleUpgrade(fw) {
            console.log("fw: " + JSON.stringify(fw.row));
            const data = {
                fwID: fw.row.fwID,
                did: this.device.did
            };
            OTAForDevice(data).then(() => {
                this.$message({
                    type: "success",
                    message: "正在升级中"
                });
            });
        },
        handleFwList(value) {
            this.page = value;
            const data = {
                pid: this.device.pid,
                page: 1,
                pageSize: 10
            };
            getfirmwareList(data).then(res => {
                this.firmwareList = res.payload;
            });
        }
    }
};
</script>
<style lang='less' scoped>
</style>