<template>
    <el-main>
        <el-table
            :data="configurationList"
            style="width: 100%; margin-top: 12px"
            border
            size="small"
        >
            <el-table-column prop="name" label="配置名称"></el-table-column>
            <el-table-column prop="type" label="配置类型"></el-table-column>
            <el-table-column prop="configurationValue" label="配置值"></el-table-column>
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
            title: "添加配置"
        };
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