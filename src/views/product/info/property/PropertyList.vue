<template>
    <el-main>
        <div class="btn-box">
            <el-button type="primary" size="small" @click="addProperty">+ 添加属性</el-button>
        </div>
        <el-table :data="propertList" style="width: 100%; margin-top: 12px" border size="small">
            <el-table-column prop="name" label="属性名称"></el-table-column>
            <el-table-column prop="label" label="标识符"></el-table-column>
            <el-table-column prop="dataType.type" label="属性类型"></el-table-column>
            <el-table-column prop="permission" label="属性读写"></el-table-column>
            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="checkProperty(scope.row)">详情</el-button>
                    <el-button
                        type="text"
                        size="small"
                        @click="editProperty(scope.row)"
                        icon="el-icon-edit"
                    >编辑</el-button>
                    <el-button
                        type="text"
                        size="small"
                        @click="handleDeletePropert(scope.row)"
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

        <!-- 添加属性对话框 -->
        <el-dialog
            :title="title"
            center
            :visible.sync="dialogVisible"
            width="60%"
            :before-close="clearForm"
        >
            <add-property
                ref="propertyParam"
                @listenDialog="closeDialog"
                :property="property"
                :isEdit="isEdit"
            ></add-property>
        </el-dialog>

        <!-- 查看属性文件对话框 -->
        <el-dialog :title="title" center :visible.sync="dialogVisibleProperty" width="60%">
            <check-property :propertyJson="propertyJson"></check-property>
        </el-dialog>
    </el-main>
</template>

<script>
import AddProperty from "./AddProperty";
import CheckProperty from "./CheckProperty";
import { getPropertyList, deleteProduce } from "@/api/property/property";

export default {
    name: "PropertyList",
    data() {
        return {
            propertList: [],
            form: {
                page: 1,
                pageSize: 6,
                isPage: true
            },
            pid: "",
            count: "",
            isEdit: "",
            title: "添加属性",
            property: "",
            dialogVisible: false,
            dialogVisibleProperty: false,
            propertyJson: ""
        };
    },
    components: {
        AddProperty,
        CheckProperty
    },
    watch: {},
    computed: {},
    created() {
        this.pid = this.$route.params.id;
        this.getProperty();
    },
    methods: {
        // 获取属性列表
        getProperty() {
            const data = {
                ...this.form,
                pid: this.pid
            };
            getPropertyList(data)
                .then(res => {
                    this.propertList = res.payload;
                    this.count = res.payload.count;
                })
                .catch(error => {
                    return error;
                });
        },
        //分页
        handlePage(value) {
            this.form.page = value;
            this.getProperty();
        },
        //   添加属性
        addProperty() {
            this.isEdit = false;
            this.dialogVisible = true;
            this.title = "添加属性";
        },
        //   编辑属性
        editProperty(attr) {
            this.isEdit = true;
            this.dialogVisible = true;
            this.title = "属性编辑";
            this.$nextTick(() => {
                this.property = attr;
            });
        },
        // 关闭对话框
        closeDialog(value) {
            this.dialogVisible = value;
            this.getProperty();
        },
        //   查看属性
        checkProperty(value) {
            this.title = "查看属性文件";
            this.dialogVisibleProperty = true;
            this.propertyJson = value;
        },
        //   删除属性
        handleDeletePropert(value) {
            const data = {
                proId: value.id,
                pid: value.pid
            };
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    deleteProduce(data).then(() => {
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                        this.getProperty();
                    });
                })
                .catch(() => {});
        },
        // 清空表单元素
        clearForm() {
            this.$refs.propertyParam.handleClose();
        }
    },
    mounted() {}
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