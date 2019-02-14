<template>
    <el-card class="box-card create-product-wrapper" shadow="never" size="small">
        <div slot="header" class="clearfix">
            <span class="card-title">创建产品</span>
        </div>
        <el-form ref="form" :model="form" label-width="90px" :rules="formRules" class="form-box">
            <el-form-item label="产品名称" prop="productName">
                <el-input v-model="form.productName"></el-input>
            </el-form-item>
            <el-form-item label="产品型号" prop="productModel">
                <el-input v-model="form.productModel"></el-input>
            </el-form-item>
            <el-form-item label="产品分组" prop="category">
                <el-select
                    v-model="form.category"
                    filterable
                    allow-create
                    default-first-option
                    placeholder="请输入或选择分组"
                >
                    <el-option label="智能家居" value="电冰箱"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="产品描述">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="createProduct" style="padding: 10px 22px">确定</el-button>
            </el-form-item>
        </el-form>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <div class="next-box">
                <div>产品创建成功，您可以选择为产品</div>
                <div style="margin-top: 12px;">
                    <el-button round size="small">添加属性</el-button>
                    <el-button round size="small">管理固件</el-button>
                </div>
                <div style="margin-top: 12px;">或者</div>
                <div style="margin: 12px 0;">
                    <el-button round size="small">继续创建产品</el-button>
                    <el-button round size="small">返回产品列表</el-button>
                </div>
            </div>
        </el-dialog>
    </el-card>
</template>

<script>
export default {
    name: "ProductCreate",
    data() {
        return {
            categoryOptions: [{ value: "100", label: "智能家居" }],
            form: {
                productName: "",
                productModel: "",
                category: [],
                desc: ""
            },
            formRules: {
                productName: [
                    {
                        required: true,
                        message: "请输入产品名称",
                        trigger: "blur"
                    }
                ],
                productModel: [
                    {
                        required: true,
                        message: "请输入产品型号",
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
            dialogVisible: false
        };
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
                        message: "产品创建成功",
                        duration: 500
                    });
                    // this.$router.push({'/'})
                }
            });
        }
    }
};
</script>

<style lang='less' scoped>
.create-product-wrapper {
    .form-box {
        width: 60%;
        margin: 20px auto;
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
}
</style>