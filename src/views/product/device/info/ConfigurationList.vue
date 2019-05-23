<template>
    <el-main>
        <el-table
            :data="configurationList"
            style="width: 100%; margin-top: 12px"
            border
            size="small"
        >
            <el-table-column prop="name" label="配置名称"></el-table-column>
            <el-table-column prop="label" label="标识符"></el-table-column>
            <el-table-column prop="dataType.type" label="配置类型"></el-table-column>
            <el-table-column prop="permission" label="属性读写"></el-table-column>
            <el-table-column label="配置值">
                <template slot-scope="scope">{{ scope.row.dataType.specs }}</template>
            </el-table-column>
            <el-table-column prop="desc" label="配置描述"></el-table-column>
        </el-table>

        <!-- 分页逻辑 -->
        <div class="pagination-box" v-if="form.pageSize < count">
            <el-pagination
                :page-size="form.pageSize"
                :page="form.page"
                layout="prev, pager, next"
                :total="count"
                @current-change="handlePage"
            ></el-pagination>
        </div>
    </el-main>
</template>

<script>
import { devConfigDetail } from "@/api/configuration/configuration";

export default {
    name: "configurationList",
    data() {
        return {
            form: {
                pid: "",
                did: "",
                page: 1,
                pageSize: 10,
                isPage: false
            },
            configurationList: [],
            count: "",
            title: "添加配置"
        };
    },
    created() {
        this.form.did = this.$route.params.did;
        this.form.pid = this.$route.params.id;
        this.getConfiguration();
    },
    watch: {
        $route() {
            this.form.did = this.$route.params.did;
            if (
                this.$route.params.did &&
                this.$route.path.indexOf("configuration") >= 0
            ) {
                this.form.did = this.$route.params.did;
                this.getConfiguration();
            }
        }
    },
    methods: {
        // 获取配置列表
        getConfiguration() {
            devConfigDetail({ ...this.form }).then(res => {
                this.configurationList = res.payload;
            });
        }
    }
};
</script>
<style lang="less" scoped>
.el-main {
    background-color: #fff;
}
.el-dialog__wrapper {
    position: fixed;
    top: -50px;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
}
</style>