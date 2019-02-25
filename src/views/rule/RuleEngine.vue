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
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="dialogVisible=true" size="small">+新建规则</el-button>
            <!-- 开发中的产品 -->
            <el-table :data="ruleList" style="width: 100%; margin-top: 12px" border size="small" @row-click="expandDetail">
                <el-table-column prop="deep" label="规则名称"></el-table-column>
                <el-table-column prop="desc" label="规则描述"></el-table-column>
                <el-table-column label="创建时间">
                    <template slot-scope="scope">{{ changeTimeFormater(scope.row.createdAt) }}</template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <div>
                            <el-button
                                @click="edit(scope.row)"
                                type="text"
                                size="small"
                            >
                                <svg-icon icon-class="edit"></svg-icon>编辑
                            </el-button>
                            <!-- <el-button
                                @click="openDetails(scope.row)"
                                type="text"
                                size="small"
                                icon="el-icon-edit"
                            >详情</el-button> -->
                            <el-button
                                @click="deleteProduct(scope.row)"
                                type="text"
                                size="small"
                                icon="el-icon-delete"
                            >删除</el-button>
                        </div>
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
        <el-dialog title="规则创建" :visible.sync="dialogVisible" center>
            <add-engine></add-engine>
        </el-dialog>
    </el-card>
</template>

<script>
import { addRule, deleRule, upadateRule, getRuleList } from "@/api/rule/rule";
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
            ruleList: [{
                deep: '1',
                desc: '2324'
            }],
            dialogVisible: false
        };
    },

    created() {
        this.handleRuleList();
    },

    components: {
        AddEngine: () => import("@/views/rule/AddEngine")
    },

    methods: {
        expandDetail(row) {
            this.$router.push({ path: `/product/${row.pid}/detail` });
        },
        addProductFrom() {
            this.$refs.product.$refs.addProductForm.validate(valid => {
                if (valid) {
                    this.dialogVisible = false;
                } else {
                    return false;
                }
            });
        },
        handleRuleList() {
            getRuleList(this.form)
                .then(res => {
                    console.log(res);
                    this.ruleList = res.payload.items;
                })
                .catch(error => {
                    return error;
                });
        },
        //分页
        handlePage(value) {
            this.form.page = value;
            this.handleRuleList();
        },
        // 编辑产品
        handleEditProduct() {
            console.log("编辑产品");
        },
        // 删除产品
        deleteProduct(product) {
            this.$confirm(`是否确认删除产品${product.productName}?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.$message({
                    type: "success",
                    message: "删除成功!"
                });
            });
        },
        // 发布产品
        releaseProduct(product) {
            this.$confirm(
                `此操作将发布产品${
                    product.productName
                }, 产品发布后将不允许属性编辑，是否发布?`,
                "提示",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消"
                }
            ).then(() => {
                this.$message({
                    type: "success",
                    message: "发布成功!"
                });
            });
        },
        changeTimeFormater(cellvalue) {
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