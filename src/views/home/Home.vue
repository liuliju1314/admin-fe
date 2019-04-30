<template>
    <div class="box-card" shadow="never">
        <el-row
            class="product-item"
            :gutter="10"
            v-for="(products,index) in productsList"
            :key="index"
        >
            <!-- 产品信息 -->
            <el-col :xs="24" :sm="24" :md="10" :lg="8" :xl="8">
                <div class="base-box">
                    <div class="product-content">
                        <div class="product-name">
                            <span
                                style="font-size: 22px; line-height: 32px;"
                            >{{products.product.name}}</span>
                            <span>
                                <span class="product-circle"></span>
                                <span
                                    style="font-size: 13px; color: #606266"
                                >{{products.product.productStatus === "0" ? "开发中" : "已发布"}}</span>
                            </span>

                            <span
                                style="float: right"
                                v-if="products.product.productStatus === '0'"
                            >
                                <el-button
                                    type="primary"
                                    size="small"
                                    @click="releaseProduct(products.product)"
                                >发布</el-button>
                            </span>
                            <span
                                style="float: right"
                                v-if="products.product.productStatus === '1'"
                            >
                                <el-button
                                    type="primary"
                                    size="small"
                                    @click="cancelReleaseProduct(products.product)"
                                >撤销发布</el-button>
                            </span>
                        </div>
                        <div class="product-info">
                            <div>
                                <span class="label">产品ID：</span>
                                <span class="text">
                                    {{products.product.pid}}
                                    <el-button
                                        class="copy-box"
                                        size="mini"
                                        @click="copyPid(products.product.pid)"
                                        round
                                    >复制</el-button>
                                </span>
                            </div>
                            <div>
                                <span class="label">创建时间：</span>
                                <span
                                    class="text"
                                >{{changeTimeFormater(products.product.createdAt)}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="button-box">
                        <div>
                            <el-button
                                type="primary"
                                round
                                class="button-details"
                                size="small"
                                @click="expandDetail(products.product)"
                            >查看产品详情</el-button>
                            <el-button
                                type="text"
                                style="float:right;"
                                size="small"
                                @click.stop="handleDeleProduct(products.product)"
                            >删除</el-button>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="16">
                <div class="base-box">
                    <div class="device-content">
                        <div>
                            <div class="label">当前设备总数：</div>
                            <div class="device-num">{{products.numberStatistics.total}}</div>
                        </div>
                        <div>
                            <div class="label">当前在线设备：</div>
                            <div class="device-num">{{products.numberStatistics.online}}</div>
                        </div>
                        <div>
                            <div class="label">当前离线设备：</div>
                            <div class="device-num">{{products.numberStatistics.offline}}</div>
                        </div>
                    </div>
                    <div>
                        <el-button
                            type="primary"
                            round
                            class="device-btn"
                            size="small"
                            @click="expandDetailDevice(products.product)"
                        >查看设备详情</el-button>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import copy from "@/views/mixins/copy";
import { getProducts } from "@/api/home/home";
import { formatDate } from "@/utils/timeFormat";

import {
    editProduct,
    deleteProduct,
    unReleaseProduct
} from "@/api/product/product";

export default {
    mixins: [copy],
    name: "Home",
    data() {
        return {
            productsList: []
        };
    },

    created() {
        this.productsListInfo();
    },

    watch: {
        $route() {
            if (this.$route.path.indexOf("home") >= 0) {
                this.productsListInfo();
            }
        }
    },
    components: {},

    computed: {},

    methods: {
        releaseProduct(product) {
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
                    this.productsListInfo();
                })
                .catch(err => {
                    return err;
                });
        },
        productsListInfo() {
            getProducts()
                .then(res => {
                    this.productsList = res.payload.item;
                })
                .catch(error => {
                    return error;
                });
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
                        this.productsListInfo();
                    })
                    .catch(err => {
                        return err;
                    });
            });
        },
        // 进入产品详情
        expandDetail(row) {
            this.$router.push({ path: `/product/${row.pid}/detail` });
        },
        // 撤销发布产品
        cancelReleaseProduct(product) {
            unReleaseProduct({ pid: product.pid })
                .then(() => {
                    this.$message({
                        type: "success",
                        message: "撤销成功!"
                    });
                    this.productsListInfo();
                })
                .catch(error => {
                    return error;
                });
        },
        // 进入设备详情
        expandDetailDevice(row) {
            this.$router.push({ path: `/product/${row.pid}/device` });
        },
        // 时间格式更改
        changeTimeFormater(cellvalue) {
            return formatDate(cellvalue, "y-m-d h:i:s");
        }
    }
};
</script>
<style lang="less">
.product-item {
    .el-button--mini,
    .el-button--mini.is-round {
        padding: 4px 12px;
    }
    .button-box {
        .el-button + .el-button {
            margin: 0 15px;
        }
    }
}
</style>

<style lang='less' scoped>
.product-item {
    box-sizing: border-box;
    margin-bottom: 16px;
    .base-box {
        background: #fff;
        padding: 20px;
    }
    .product-content {
        height: 120px;
        .product-name {
            margin-bottom: 12px;
            height: 32px;
            line-height: 32ppx;
        }
        .product-info {
            font-size: 13px;
            & > div {
                margin-bottom: 10px;
            }
            .copy-box {
                margin-left: 4px;
            }
            .label {
                font-size: 13px;
                display: inline-block;
                width: 70px;
                color: #909399;
            }
            .text {
                color: #606266;
            }
        }
        .product-circle {
            width: 6px;
            height: 6px;
            display: inline-block;
            vertical-align: middle;
            margin: 0 4px 0 10px;
            border-radius: 50%;
            background-color: #1890ff;
        }
        .productStatus {
            color: #74777a;
        }
    }

    .device-content {
        display: flex;
        align-items: center;
        height: 120px;
        & > div {
            margin-right: 20px;
        }
        .device-num {
            text-align: center;
            margin: 12px 0;
            font-size: 25px;
            color: #606266;
        }
        .label {
            color: #909399;
            font-size: 13px;
        }
    }
}
.firmware-info {
    padding: 20px;
    .firmware-content {
        min-height: 120px;
        .firmware-num {
            font-size: 25px;
        }
    }
    .firmware-btn {
        color: #999;
        background-color: #fff;
        border: 1px solid rgb(24, 144, 255);
    }
    .firmware-btn:hover {
        color: #fff;
        background-color: rgb(24, 144, 255);
        border: 1px solid rgb(24, 144, 255);
    }
}
</style>