<template>
    <el-card class="box-card create-station-wrapper" shadow="never">
        <div slot="header" class="clearfix">
            <span class="card-title">产品列表</span>
        </div>
        <div class="product-wrapper">
            <el-form :inline="true" :model="form" size="small">
                <el-form-item label="产品名称">
                    <el-input v-model="form.productName"></el-input>
                </el-form-item>
                <el-form-item label="产品状态">
                    <el-select v-model="form.productStatus">
                        <el-option label="开发中" value="0"></el-option>
                        <el-option label="已发布" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="dialogVisible=true" size="small">+新建产品</el-button>
            <!-- 开发中的产品 -->
            <el-table :data="productList" style="width: 100%; margin-top: 12px" border size="small">
                <el-table-column prop="pid" label="产品ID"></el-table-column>
                <el-table-column prop="name" label="产品名称"></el-table-column>
                <el-table-column prop="category" label="产品分类"></el-table-column>
                <el-table-column prop="group" label="产品分组"></el-table-column>
                <el-table-column label="创建时间">
                    <template slot-scope="scope">{{ changeTimeFormater(scope.row.createdAt) }}</template>
                </el-table-column>
                <el-table-column label="更新时间">
                    <template slot-scope="scope">{{ changeTimeFormater(scope.row.updatedAt) }}</template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <div>
                            <el-button @click="releaseProduct(scope.row)" type="text" size="small" v-if="!scope.row.productStatus">
                                <svg-icon icon-class="release"></svg-icon>发布
                            </el-button>
                            <el-button
                                @click="openDetails(scope.row)"
                                type="text"
                                size="small"
                                icon="el-icon-edit"
                            >详情</el-button>
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
        <el-dialog title="添加产品" :visible.sync="dialogVisible" center>
            <product-create></product-create>
        </el-dialog>
    </el-card>
</template>

<script>
import { getProductList } from "@/api/product/product";
import { formatDate } from "@/utils/format";

export default {
    name: "ProductDeveloping",
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
            count: "",
            productList: [],
            dialogVisible: false
        };
    },

    created() {
        this.getProductList();
    },

    components: {
        ProductCreate: () => import("@/views/product/ProductCreate")
    },

    methods: {
        addProductFrom() {
            this.$refs.product.$refs.addProductForm.validate(valid => {
                if (valid) {
                    this.dialogVisible = false;
                } else {
                    return false;
                }
            });
        },
        getProductList() {
            getProductList(this.form)
                .then(res => {
                    this.productList = res.payload.result;
                    this.count = res.payload.count;
                })
                .catch(error => {
                    return error;
                });
        },
        //分页
        handlePage(value) {
            this.form.page = value;
            this.getProductList();
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
        // 产品固件升级
        upgradeFireware() {},
        openDetails(row) {
            this.$router.push({ path: `/product/${row.pid}/detail` });
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