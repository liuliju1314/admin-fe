<template>
    <el-card class="box-card create-station-wrapper" shadow="never">
        <div slot="header" class="clearfix">
            <span class="card-title">产品列表</span>
        </div>
        <div class="product-wrapper">
            <el-form :inline="true" :model="form" size="small">
                <!-- 产品信息框 -->
                <el-form-item label="产品名称">
                    <el-select
                        v-model="form.productName"
                        placeholder="请选择产品名称"
                        clearable
                        @click.native="getProductModel()"
                    >
                        <el-option
                            v-for="item in productModel"
                            :key="item.pid"
                            :label="item.name"
                            :value="item.name"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="产品状态">
                    <el-select v-model="form.productStatus">
                        <el-option label="全部" value></el-option>
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
            <el-table :data="productList" style="width: 100%; margin-top: 12px" border size="small">
                <el-table-column prop="pid" label="产品ID"></el-table-column>
                <el-table-column prop="name" label="产品名称"></el-table-column>
                <el-table-column prop="model" label="产品型号"></el-table-column>
                <el-table-column prop="category" label="产品分类"></el-table-column>
                <el-table-column label="创建时间">
                    <template slot-scope="scope">{{ changeTimeFormater(scope.row.createdAt) }}</template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <div>
                            <el-button
                                @click.stop="expandDetail(scope.row)"
                                type="text"
                                size="small"
                                icon="el-icon-edit"
                            >查看</el-button>
                            <el-button
                                @click.stop="releaseProduct(scope.row)"
                                type="text"
                                size="small"
                                v-if="scope.row.productStatus === '0' || !scope.row.productStatus"
                            >
                                <svg-icon icon-class="release"></svg-icon>发布
                            </el-button>
                            <el-button
                                @click.stop="handleDeleProduct(scope.row)"
                                type="text"
                                size="small"
                                icon="el-icon-delete"
                                v-if="scope.row.productStatus === '0'"
                            >删除</el-button>
                            <el-button
                                type="text"
                                size="small"
                                icon="el-icon-bell"
                                v-if="!(scope.row.productStatus === '0')"
                                disabled
                            >已发布</el-button>
                            <el-button
                                type="text"
                                size="small"
                                icon="el-icon-bell"
                                v-if="!(scope.row.productStatus === '0')"
                                disabled
                            >撤销发布</el-button>
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
        <product-create :visible="visible" @listenOp="closeDialog"></product-create>
    </el-card>
</template>

<script>
import {
    getProductList,
    deleteProduct,
    editProduct
} from "@/api/product/product";

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
            productModel: [], //存放所有产品名称以及产品Id
            count: "",
            productList: [],
            visible: false
        };
    },

    created() {
        this.handleProductList(1);
    },

    components: {
        ProductCreate: () => import("@/views/product/ProductCreate")
    },

    methods: {
        // 获取产品名称和产品id
        getProductModel() {
            this.productModel = [];
            getProductList({ isPage: false })
                .then(res => {
                    res.payload.result.map(item => {
                        const obj = {
                            pid: item.pid,
                            name: item.name
                        };
                        this.productModel.push(obj);
                    });
                })
                .catch(error => {
                    return error;
                });
        },
        // 进入产品详情
        expandDetail(row) {
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
            this.visible = true;
        },
        // 对话框关闭
        closeDialog(value) {
            console.log("value: " + value);
            this.visible = value;
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
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                        this.handleProductList();
                    })
                    .catch(() => {
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
                    productStatus: "1"
                };
                editProduct(data)
                    .then(() => {
                        this.$message({
                            type: "success",
                            message: "发布成功!"
                        });
                        this.handleProductList();
                    })
                    .catch(() => {
                        this.$message({
                            type: "success",
                            message: "发布失败，请重试!"
                        });
                    });
            });
        },
        // 更改时间格式
        changeTimeFormater(cellvalue) {
            return formatDate(cellvalue, "y-m-d");
        }
    }
};
</script>
<style lang='less' scoped>
.svg-icon {
    width: 14px;
    height: 13px;
}
</style>