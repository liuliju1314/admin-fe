<template>
    <el-form
        ref="form"
        :model="form"
        label-width="90px"
        :rules="formRules"
        class="form-box"
        size="small"
    >
        <el-form-item label="产品名称" prop="productName">
            <el-input v-model="form.productName"></el-input>
        </el-form-item>
        <el-form-item label="产品型号" prop="productModel">
            <el-input v-model="form.productModel"></el-input>
        </el-form-item>
        <el-form-item label="产品分类" prop="category">
            <el-select
                v-model="form.category"
                filterable
                allow-create
                default-first-option
                placeholder="请输入或选择分类"
            >
                <el-option label="智能家居" value="电冰箱"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="产品分组" prop="group">
            <el-select v-model="form.group" filterable default-first-option placeholder="请选择分组">
                <el-option label="正式版" value="0"></el-option>
                <el-option label="测试版" value="1"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="固件名称">
            <div>
                <span style="display: inline-block; width: 43%">标识符:</span>
                <span style="display: inline-block; width: 40%">描述:</span>
            </div>
            <div
                class="rain-item"
                v-for="(item,index) in form.fw"
                :key="index"
                style="margin: 0px 0px 10px 0px;"
            >
                <el-input v-model.number="item.name" class="small-width"></el-input>
                <span class="span" style="display: inline-block;width: 3%;text-align: center">~</span>
                <el-input v-model.number="item.tag" class="small-width"></el-input>
                <el-button
                    type="text"
                    @click="deleteFw(index)"
                    style="display: inline-block;margin-left: 10px"
                    v-if="index > 0"
                >删除</el-button>
            </div>
            <el-button type="text" @click="form.fw.push({name: '', tag: ''})">+ 添加固件名称</el-button>
        </el-form-item>
        <el-form-item label="产品描述">
            <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="createProduct" style="padding: 10px 22px">确定</el-button>
        </el-form-item>
    </el-form>
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
                desc: "",
                fw: [{ name: "", tag: "" }]
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
                    this.$router.push("/product/1z0zbfe0db5/info");
                }
            });
        },
        deleteFw(index) {
            this.fw.splice(index, 1);
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
    .small-width {
        width: 40%;
    }
}
</style>