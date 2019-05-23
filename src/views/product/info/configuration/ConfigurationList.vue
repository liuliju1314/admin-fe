<template>
    <el-main>
        <div class="btn-box">
            <el-button type="primary" size="small" @click="addConfiguration">+ 添加配置</el-button>
        </div>
        <el-table
            :data="configurationList"
            style="width: 100%; margin-top: 13px"
            border
            size="small"
        >
            <el-table-column prop="name" label="配置名称"></el-table-column>
            <el-table-column prop="label" label="标识符"></el-table-column>
            <el-table-column prop="dataType.type" label="配置类型"></el-table-column>
            <el-table-column prop="permission" label="属性读写"></el-table-column>
            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        size="small"
                        @click="editConfiguration(scope.row)"
                        icon="el-icon-edit"
                    >编辑</el-button>
                    <el-button
                        type="text"
                        size="small"
                        @click="handleDeleteConfiguration(scope.row)"
                        icon="el-icon-delete"
                    >删除</el-button>
                </template>
            </el-table-column>
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

        <!-- 添加配置对话框 -->
        <el-dialog
            :title="title"
            center
            :visible.sync="dialogVisible"
            width="60%"
            :before-close="clearForm"
        >
            <add-configuration
                ref="configurationParam"
                @listenDialog="closeDialog"
                :configuration="configuration"
                :isEdit="isEdit"
            ></add-configuration>
        </el-dialog>
    </el-main>
</template>

<script>
import AddConfiguration from "./AddConfiguration";
import {
    devConfigList,
    deleteDevConfig
} from "@/api/configuration/configuration";

export default {
    name: "configuration_list",
    data() {
        return {
            form: {
                page: 1,
                pageSize: 10,
                isPage: true
            },
            configurationList: [],
            count: "",
            title: "添加配置",
            dialogVisible: false,
            pid: "",
            isEdit: "",
            configuration: "" //配置编辑时的传输字段
        };
    },
    created() {
        this.init();
    },
    watch: {
        $route() {
            this.init();
        }
    },
    components: {
        AddConfiguration
    },
    methods: {
        // 初始化
        init() {
            this.pid = this.$route.params.id;
            if (this.pid && this.$route.path.indexOf("configuration") >= 0) {
                this.getConfiguration();
            }
        },
        //   添加属性
        addConfiguration() {
            this.isEdit = false;
            this.dialogVisible = true;
            this.title = "添加配置";
        },
        //   编辑属性
        editConfiguration(attr) {
            this.isEdit = true;
            this.dialogVisible = true;
            this.title = "配置编辑";
            this.$nextTick(() => {
                this.configuration = attr;
            });
        },
        // 获取配置列表
        getConfiguration() {
            const data = {
                ...this.form,
                pid: this.pid
            };
            devConfigList(data)
                .then(res => {
                    this.configurationList = res.payload;
                    this.count = res.payload.count;
                })
                .catch(error => {
                    return error;
                });
        },
        // 关闭对话框
        closeDialog(value) {
            this.dialogVisible = value;
            this.getConfiguration();
        },
        // 清空表单元素
        clearForm() {
            this.$refs.configurationParam.handleClose();
        },
        //   删除配置
        handleDeleteConfiguration(value) {
            const data = {
                proId: value.id,
                pid: value.pid
            };
            this.$confirm("此操作将永久删除该配置, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    deleteDevConfig(data).then(() => {
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                        this.getConfiguration();
                    });
                })
                .catch(() => {});
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