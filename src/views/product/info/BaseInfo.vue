<template>
    <div class="base-info-box">
        <table>
            <tr>
                <td class="label">产品名称:</td>
                <td class="value">智能遥感水位传感器</td>
            </tr>
            <tr>
                <td class="label">产品型号:</td>
                <td class="value">Y2435464g</td>
            </tr>
            <tr>
                <td class="label">产品分类:</td>
                <td class="value">水利 / 图像水位传感器</td>
            </tr>
            <tr>
                <td class="label">产品分组:</td>
                <td class="value">测试组</td>
            </tr>
            <tr>
                <td class="label">产品描述:</td>
                <td class="value">该产品主要用于水利方向的图像检测和水位检测</td>
            </tr>
            <tr>
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
            </tr>
        </table>
        <el-button @click="createProduct" style="padding: 10px 22px; margin: 30px 0 0 100px;">编辑</el-button>
    </div>
</template>

<script>
import VePie from "v-charts/lib/pie.common";
export default {
    name: "ProductCreate",
    data() {
        return {
            categoryOptions: [{ value: "100", label: "智能家居" }],
            form: {
                productName: "",
                category: [],
                group: "",
                desc: "",
                productID: ""
            },
            formRules: {
                productName: [
                    {
                        required: true,
                        message: "请输入产品名称",
                        trigger: "blur"
                    }
                ],
                category: [
                    {
                        required: true,
                        message: "请添加或选择产品分类",
                        trigger: "blur"
                    }
                ]
            },
            deviceData: {
                columns: ["label", "num"],
                rows: [{ label: "发布版", num: 0 }, { label: "测试版", num: 0 }]
            },
            dialogVisible: false
        };
    },
    components: {
        VePie
    },
    created() {
        console.log("this.$router: " + JSON.stringify(this.$route.params.pid));
    },
    methods: {
        createProduct() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.$message({
                        type: "success",
                        message: "更新成功",
                        duration: 500
                    });
                }
            });
        }
    }
};
</script>

<style lang='less' scoped>
.form-box {
    width: 60%;
    // margin: 20px auto;
}
.ve-pie {
    height: 190px !important;
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
    .label {
        vertical-align: top;
        width: 100px;
        color: #797979;
        padding: 12px 10px;
        box-sizing: border-box;
    }
    .value {
        padding: 12px 10px;
        vertical-align: top;
        padding-left: 10px;
    }
}
</style>