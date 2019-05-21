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
            <el-table-column prop="type" label="配置类型"></el-table-column>
            <el-table-column prop="configurationValue" label="配置值"></el-table-column>
            <el-table-column prop="desc" label="配置描述"></el-table-column>
            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="checkConfiguration(scope.row)">详情</el-button>
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
        ></el-dialog>
    </el-main>
</template>

<script>
export default {
    name: "configurationList",
    data() {
        return {
            form: {
                page: 1,
                pageSize: 6,
                isPage: true
            },
            configurationList: [
                {
                    name: "光照"
                }
            ],
            count: "",
            title: "添加配置",
            dialogVisible: false
        };
    },
    methods: {
        addConfiguration() {
            console.log("添加配置");
        },
        clearForm() {
            console.log("清除表单");
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