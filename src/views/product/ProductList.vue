<template>
      <el-card class="box-card create-station-wrapper" shadow="never">
        <div slot="header" class="clearfix">
            <span class="card-title">产品列表</span>
        </div>
        <div class="product-wrapper">
            <div class="btn-box">
                <el-button type="primary" size="small" @click="addProduct()">+ 添加产品</el-button>
            </div>
            <el-table 
                :data="productList" 
                @row-click="openDetails"
                style="width: 100%; margin-top: 12px"
            >
                <el-table-column prop="pid" label="产品编码"></el-table-column>
                <el-table-column prop="model" label="产品型号"></el-table-column>
                <el-table-column prop="name" label="产品名称"></el-table-column>
                <el-table-column prop="category" label="产品分组"></el-table-column>
                <!-- <el-table-column label="固件名称">
                    <template slot-scope="scope">
                        <div v-for="(item,index) in scope.row.fwTypes" :key="index">
                            <span class="span">{{item.name}}</span>
                        </div>
                    </template>
                </el-table-column> -->
                <el-table-column label="创建时间">
                    <template slot-scope="scope">{{ changeTimeFormater(scope.row.createdAt) }}</template>
                </el-table-column>
                <!-- <el-table-column label="更新时间">
                    <template slot-scope="scope">{{ changeTimeFormater(scope.row.updatedAt) }}</template>
                </el-table-column> -->
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
import AddProduct from "./AddProduct";

  export default {
    name:'',
    data () {
      return {
          form: {
            page: 1,
            pageSize: 6,
            isPage: true      
          },
          count: "",
          productList: [],
          dialogVisible: false,
      };
    },

    created() {
        this.getProductList();
    },

    components: {
        AddProduct
    },

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
        addProduct() {
            this.dialogVisible = true
        },
        addProductFrom() {
            this.$refs.product.$refs.addProductForm.validate(valid => {
                if (valid) {
                    this.dialogVisible = false
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
            console.log("编辑产品")
        },
        // 删除产品
        handleDeleteProduct() {
            console.log("删除产品")
        },
        openDetails(row) {
            // console.log(row.pid)
            this.$router.push({ name: '/createProduct', params: { pid: row.pid }});
        },
        changeTimeFormater(cellvalue) {
            return formatDate(cellvalue, "y-m-d");
        }
    },

    watch: {}

  }

</script>
<style lang='' scoped>

</style>