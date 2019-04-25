<template>
    <el-card class="box-card create-station-wrapper" shadow="never">
        <div slot="header" class="clearfix">
            <span class="card-title">规则引擎</span>
        </div>
        <div class="product-wrapper">
            <el-form :inline="true" :model="form" size="small">
                <el-form-item label="规则名称">
                    <el-input v-model="form.productName"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleRuleList(1)">查询</el-button>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="dialogVisible=true" size="small">+新建规则</el-button>
            <!-- 开发中的产品 -->
            <el-table
                :data="ruleList"
                style="width: 100%; margin-top: 12px"
                border
                size="small"
            >
                <el-table-column prop="name" label="规则名称"></el-table-column>
                <el-table-column prop="taskKey" label="规则标识符"></el-table-column>
                <el-table-column prop="desc" label="规则描述"></el-table-column>
                <el-table-column label="创建时间">
                    <template slot-scope="scope">{{ changeTimeFormater(scope.row.createdTime) }}</template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button
                            @click.stop="expandDetail(scope.row)"
                            type="text"
                            size="small"
                            icon="el-icon-edit"
                        >查看</el-button>
                        <el-button
                            @click.stop="startUpRule(scope.row)"
                            type="text"
                            size="small"
                            icon="el-icon-setting"
                        >{{scope.row.enable === 1 ? '关闭': '启动'}}</el-button>
                        <el-button
                            @click.stop="deleteRule(scope.row)"
                            type="text"
                            size="small"
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
        </div>

        <!-- 添加产品对话框 -->
        <add-engine :visible="dialogVisible" @listenAdd="listenAdd"></add-engine>
    </el-card>
</template>

<script>
import { deleRule, getRuleList, updateRule } from "@/api/rule/rule";
import { formatDate } from "@/utils/format";
export default {
    name: "RuleEngine",
    data() {
        return {
            form: {
                productName: "",
                productID: "",
                productStatus: "1",
                page: 1,
                pageSize: 10,
                isPage: true
            },
            ruleList: [],
            count: 0,
            dialogVisible: false,
            loading: false
        };
    },

    created() {
        this.handleRuleList(1);
    },

    components: {
        AddEngine: () => import("@/views/rule/AddEngine")
    },

    methods: {
        listenAdd(value) {
            this.dialogVisible = value;
            this.handleRuleList(1);
        },
        expandDetail(row) {
            this.$router.push({ path: `/rule/${row.tid}/detail` });
        },
        handleRuleList(value) {
            this.form.page = value;
            getRuleList(this.form)
                .then(res => {
                    this.ruleList = res.payload.items;
                    this.count = res.payload.total;
                })
                .catch(error => {
                    return error;
                });
        },
        //分页
        handlePage(value) {
            this.handleRuleList(value);
        },
        deleteRule(rule) {
            this.$confirm("此操作将删除该规则, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    deleRule(rule).then(() => {
                        this.$message({
                            type: "success",
                            message: "删除成功"
                        });
                        this.handleRuleList(this.form.page);
                    });
                })
                .catch(() => {});
        },
        startUpRule(data) {
            const rule = this._deepClone(data);
            const isStart = rule.enable === 1 ? "关闭" : "启动";
            this.$confirm(`是否确认${isStart}规则?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            })
                .then(() => {
                    (rule.actions = JSON.parse(rule.actions)),
                        (rule.event = JSON.parse(rule.event));
                    rule.enable = rule.enable ? 0 : 1;
                    updateRule(rule).then(() => {
                        this.$message({
                            type: "success",
                            message: `${isStart}成功`
                        });
                        this.handleRuleList(this.form.page);
                    });
                })
                .catch(() => {});
        },
        changeTimeFormater(cellvalue) {
            cellvalue = cellvalue * 1000;
            return formatDate(cellvalue, "y-m-d");
        }
    },

    watch: {}
};
</script>
<style lang='less' scoped>
.svg-icon {
    width: 14px;
    height: 13px;
}
</style>