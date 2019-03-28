<template>
    <div class="base-info-box">
        <table class="table-box">
            <tr>
                <td class="label">产品名称:</td>
                <td class="value">{{productInfo.name}}</td>
            </tr>
            <tr>
                <td class="label">产品型号:</td>
                <td class="value">{{productInfo.model}}</td>
            </tr>
            <tr>
                <td class="label">升级方式:</td>
                <td class="value">{{productInfo.upMethod}}</td>
            </tr>
            <tr>
                <td class="label">产品分类:</td>
                <td class="value">{{productInfo.category}}</td>
            </tr>
            <tr>
                <td class="label">
                    <span style="letter-space: 16px;"></span> 固&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件:
                </td>
                <td class="value">
                    <div
                        class="fwname-box"
                        v-for="(item,index) in productInfo.fwGroup"
                        :key="index"
                    >{{item.name}} - {{item.desc}}</div>
                </td>
            </tr>
            <tr>
                <td class="label">产品描述:</td>
                <td class="value">{{productInfo.desc}}</td>
            </tr>
            <!-- <tr>
                <td class="label">设备数量:</td>
                <td class="value">
                    <ve-pie
                        :data="deviceData"
                        :tooltip-visible="false"
                        :legend-visible="false"
                        :colors="['#49f','#999']"
                        :extend="{
                            series: {
                                label: {
                                    position: 'inner',
                                    formatter: '{b}: {@c}'
                                },     
                                radius : '50%',
                                center: ['25%', '25%']               
                            },

                        }"
                    ></ve-pie>
                </td>
            </tr>-->
        </table>
        <el-button @click="editProduct" style="padding: 10px 22px; margin: 30px 0 0 100px;">编辑</el-button>
        <product-create :product="product" :visible="visible" @listenOp="closeDialog"></product-create>
    </div>
</template>

<script>
import { getProductInfo } from "@/api/product/product";
import ProductCreate from "@/views/product/ProductCreate";
export default {
    name: "BaseInfo",
    data() {
        return {
            pid: "",
            productInfo: [],
            visible: false,
            product: "",
            i: 0
        };
    },
    components: {
        ProductCreate
    },

    created() {
        this.init();
    },
    watch: {
        $route() {
            this.init();
        }
    },
    methods: {
        init() {
            this.pid = this.$route.params.id ;
            if (this.pid) {
                this.handleProductInfo();
            }
        },
        handleProductInfo() {
            getProductInfo({pid: this.pid})
                .then(res => {
                    this.productInfo = res.payload;
                })
                .catch(err => {
                    this.$message({
                        message: err.msg
                    });
                });
        },
        //更新产品信息
        editProduct() {
            this.visible = true;
            this.product = this.productInfo;
        },
        //关闭更新产品信息对话框
        closeDialog(value) {
            this.product = "";
            this.visible = value;
            this.handleProductInfo();
        }
    }
};
</script>
<style lang="less">
// .base-info-box {
//     .notEdit {
//         input {
//             border: 0;
//             padding: 0;
//             height: 30px;
//             font-size: 16px;
//             color: #333;
//         }
//     }
// }
</style>
<style lang='less' scoped>
.fwname-box {
    display: inline-block;
    margin-right: 10px;
}
.add-category {
    margin-left: 90px;
    padding-top: 0 !important;
    padding-bottom: 22px !important;
}
.link-item {
    text-decoration: none;
    padding-right: 22px;
}
.base-info-box {
    width: 60%;
    margin: 20px auto;
    .label {
        width: 100px;
        color: #797979;
        padding: 12px 10px;
        box-sizing: border-box;
    }
    .value {
        padding: 12px 0;
    }
}
</style>