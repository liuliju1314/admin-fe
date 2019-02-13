<template>
    <el-card class="box-card create-station-wrapper" shadow="never">
        <div slot="header" class="clearfix">
            <span class="card-title">已发布的产品</span>
        </div>
        <div class="product-wrapper">
            <el-form :inline="true" :model="form" size="small">
                <el-form-item label="产品名称">
                    <el-input v-model="form.productName"></el-input>
                </el-form-item>
                <el-form-item label="产品编码">
                    <el-input v-model="form.productCode"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="$router.push('/product/create')" size="small">+新建产品</el-button>
            <el-table :data="productList" style="width: 100%; margin-top: 12px">
                <el-table-column prop="pid" label="产品编码"></el-table-column>
                <el-table-column prop="model" label="产品型号"></el-table-column>
                <el-table-column prop="name" label="产品名称"></el-table-column>
                <el-table-column prop="category" label="产品分组"></el-table-column>
                <el-table-column label="创建时间">
                    <template slot-scope="scope">{{ changeTimeFormater(scope.row.createdAt) }}</template>
                </el-table-column>
                <el-table-column label="更新时间">
                    <template slot-scope="scope">{{ changeTimeFormater(scope.row.updatedAt) }}</template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button
                            @click.native.prevent="openDetails(scope.row)"
                            type="text"
                            size="small"
                        >产品详情</el-button>
                        <el-button
                            @click.native.prevent="openDetails(scope.row)"
                            type="text"
                            size="small"
                        >固件升级</el-button>
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
        <el-dialog title="添加产品" :visible.sync="dialogVisible" width="60%">
            <add-product ref="product"></add-product>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addProductFrom()">确 定</el-button>
            </span>
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
                productCode: "",
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

    computed: {},

    beforeMount() {},

    mounted() {},

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
        handleDeleteProduct() {
            console.log("删除产品");
        },
        openDetails(row) {
            // console.log(row.pid)
            this.$router.push({
                name: "/createProduct",
                params: { pid: row.pid }
            });
        },
        changeTimeFormater(cellvalue) {
            return formatDate(cellvalue, "y-m-d");
        }
    },

    watch: {}
};
</script>
<style lang='' scoped>
</style>