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
                        <el-option label="全部" value=""></el-option>
                        <el-option label="开发中" value="0"></el-option>
                        <el-option label="已发布" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleProductList(1)">查询</el-button>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="productOp" size="small">+新建产品</el-button>
            <!-- 开发中的产品 -->
            <el-table
                :data="productList"
                style="width: 100%; margin-top: 12px"
                border
                size="small"
                @row-click="expandDetail"
            >
                <el-table-column prop="pid" label="产品ID"></el-table-column>
                <el-table-column prop="name" label="产品名称"></el-table-column>
                <el-table-column prop="model" label="产品型号"></el-table-column>
                <el-table-column prop="category" label="产品分类"></el-table-column>
                <el-table-column label="创建时间">
                    <template slot-scope="scope">{{ changeTimeFormater(scope.row.createdAt) }}</template>
                </el-table-column>
                <!-- <el-table-column label="更新时间">
                    <template slot-scope="scope">{{ changeTimeFormater(scope.row.updatedAt) }}</template>
                </el-table-column>-->
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <div>
                            <el-button
                                @click.stop="releaseProduct(scope.row)"
                                type="text"
                                size="small"
                                v-if="scope.row.productStatus === '0' || !scope.row.productStatus"
                            >
                                <svg-icon icon-class="release"></svg-icon>发布
                            </el-button>
                            <!-- <el-button
                                @click="openDetails(scope.row)"
                                type="text"
                                size="small"
                                icon="el-icon-edit"
                            >详情</el-button>-->
                            <el-button
                                @click.stop="handleDeleProduct(scope.row)"
                                type="text"
                                size="small"
                                icon="el-icon-delete"
                                v-if="!scope.row.productStatus === '0'"   
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
        <product-create :visible="visible" :product="opProduct" @listenOp="listenOp"></product-create>
    </el-card>
</template>

<script>
import { getProductList, deleteProduct, editProduct } from "@/api/product/product";
import { formatDate } from "@/utils/format";

export default {
    name: "ProductDeveloping",
    data() {
        return {
            form: {
                productName: "",
                productStatus: "",
                page: 1,
                pageSize: 10,
                isPage: true
            },
            count: "",
            productList: [],
            visible: false,
            opProduct: ""
        };
    },

    created() {
        this.handleProductList();
    },

    components: {
        ProductCreate: () => import("@/views/product/ProductCreate")
    },

    methods: {
        // 进入产品详情
        expandDetail(row) {
            localStorage.setItem("productName", row.name);
            this.$router.push({ path: `/product/${row.pid}/detail` });
        },
        // 获取产品列表
        handleProductList(value) {
            this.form.page = value ? value : 1;
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
            this.handleProductList(value);
        },
        // 产品添加
        productOp() {
            this.opProduct = "";
            this.visible = true;
        },
        // 对话框关闭
        listenOp() {
            this.opProduct = "";
            this.visible = false;
            this.handleProductList(1);
        },
        // 删除产品
        handleDeleProduct(product) {
            this.$confirm(`是否确认删除产品  ${product.name} ?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            }).then(() => {
                deleteProduct({ pid: product.pid })
                    .then(() => {
                        console.log("删除成功");
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                        this.handleProductList();
                    })
                    .catch(error => {
                        console.log(error);
                        this.$message({
                            message: "删除失败!"
                        });
                    });
            });
        },
        // 发布产品
        releaseProduct(product) {
            this.$confirm(
                `此操作将发布产品 ${
                    product.name
                } , 产品发布后将不允许属性编辑，是否发布?`,
                "提示",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消"
                }
            ).then(() => {
                const data = {
                    ...product,
                    productStatus: 1
                }
                editProduct(data).then(() => {
                    this.$message({
                        type: "success",
                        message: "发布成功!"
                    });                    
                }).catch(() => {
                    this.$message({
                        type: "success",
                        message: "发布失败，请重试!"
                    });
                })

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