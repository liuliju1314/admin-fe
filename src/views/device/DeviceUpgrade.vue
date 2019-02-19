<template>
    <div class="deviceUpgrade">
        <div>
            <span>设备ID：{{did}}</span>
        </div>
        <div>
            <span>设备当前固件版本：v1.0.0.3</span>
        </div>

        <!-- 循环的设备列表 -->
        <el-table :data="firmwareList" style="width: 100%; margin-top: 12px">
            <el-table-column prop="fwID" label="固件ID"></el-table-column>
            <el-table-column prop="version" label="版本"></el-table-column>
            <el-table-column prop="desc" label="分组"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleUpgrade(scope.row)" type="text" size="small" v-if="!(scope.row.fwID == UpgradeFw)">升级</el-button>
                    <div v-else>
                        <i
                            class="el-icon-refresh"
                            style="margin-left: 10px"
                            @click="updateFwProgress(scope.row)"
                        ></i>
                        <div>
                            <el-progress :percentage="70"></el-progress>
                        </div>                        
                    </div>

                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: "",
    props: [""],
    data() {
        return {
            did: 1,
            UpgradeFw: '',
            fwVersion: [
                { default: "0.0.2" },
                { default: "0.0.3" },
                { default: "0.0.2" }
            ],
            firmwareList: [
                {
                    createdAt: "2019-01-06T11:01:06.935Z",
                    desc: "正式版",
                    fwID: "6pxrqh8njsw",
                    group: "release",
                    name: "app",
                    pid: "1z0zbfe0db5",
                    updatedAt: "2019-01-06T11:01:06.935Z",
                    version: "0.1.2"
                },
                {
                    createdAt: "2019-01-06T11:01:06.935Z",
                    desc: "正式版",
                    fwID: "6pxrqh8njsS",
                    group: "release",
                    name: "app",
                    pid: "1z0zbfe0db5",
                    updatedAt: "2019-01-06T11:01:06.935Z",
                    version: "0.1.2"
                },
                {
                    createdAt: "2019-01-06T11:01:06.935Z",
                    desc: "正式版",
                    fwID: "6pxrqh8njsZ",
                    group: "release",
                    name: "app",
                    pid: "1z0zbfe0db5",
                    updatedAt: "2019-01-06T11:01:06.935Z",
                    version: "0.1.2"
                }
            ]
        };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
        handleUpgrade(fw) {
            this.UpgradeFw = fw.fwID
        }
    },

    watch: {}
};
</script>
<style lang='less' scoped>
</style>