<template>
    <el-main>
        <!-- 循环的固件列表 -->
        <div class="btn-box">
            <div style=" display: flex;justify-content: space-between;">
                <el-input
                    placeholder="请输入固件ID或版本"
                    v-model="firewareSearch"
                    class="input-with-select"
                    size="small"
                >
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <el-button type="primary" size="small" @click="addFireware()">+ 添加固件</el-button>
            </div>
        </div>
        <el-table :data="firewareList" style="width: 100%; margin-top: 12px">
            <el-table-column prop="fwID" label="固件ID"></el-table-column>
            <el-table-column prop="version" label="固件版本"></el-table-column>
            <el-table-column prop="group" label="固件分组"></el-table-column>
            <el-table-column prop="upgrade" label="升级方式"></el-table-column>
            <el-table-column prop="desc" label="描述" width="300"></el-table-column>
            <el-table-column label="操作" width="170">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="handleDeleteFireware(scope.row)" icon="el-icon-download">
                        下载</el-button>
                    <el-button type="text" size="small" @click="handleDeleteFireware(scope.row)" icon="el-icon-edit">编辑</el-button>
                    <el-button type="text" size="small" @click="handleDeleteFireware(scope.row)" icon="el-icon-delete">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div></div>
        <!-- 添加固件对话框 -->
        <el-dialog title="添加固件" :visible.sync="dialogVisible" width="60%" center>
            <add-fireware></add-fireware>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addFireware()">确 定</el-button>
            </span>
        </el-dialog>
    </el-main>
</template>

<script>
import AddFireware from "./AddFireware";

export default {
    components: {
        AddFireware
    },
    props: {},
    data() {
        return {
            firewareList: [
                {
                    fwID: "1q23440",
                    group: "测试组",
                    upgrade: "手动升级",    
                    version: "v1.0.0.1",
                    desc: "主要用于测试功能",
                    createdAt: "2018-03-04 11:11"
                }
            ],
            firewareSearch: "",
            dialogVisible: false
        };
    },
    watch: {},
    computed: {},
    methods: {
        addFireware() {
            this.dialogVisible = true;
        },
        handleDeleteFireware() {
            console.log("删除固件");
        }
    },
    created() {},
    mounted() {}
};
</script>
<style lang="less">
.el-button [class*=el-icon-]+span {
    margin-left: 2px;
}
.el-button+.el-button {
    margin-left: 10px;
}
</style>

<style lang="less" scoped>
.el-main {
    background-color: #fff;
}
.input-with-select {
    width: 320px;
}
</style>