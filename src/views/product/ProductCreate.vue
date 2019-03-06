<template>
    <el-dialog :title="title" :visible.sync="visible" center :before-close="beforeClose">
        <div class="create-product-wrapper">
            <el-form
                ref="form"
                :model="form"
                label-width="90px"
                :rules="formRules"
                class="form-box"
                size="small"
            >
                <el-form-item label="产品名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="产品型号" prop="model">
                    <el-input v-model="form.model"></el-input>
                </el-form-item>
                <el-form-item label="产品分类" prop="category">
                    <el-input v-model="form.category"></el-input>
                </el-form-item>
                <el-form-item label="固件名称">
                    <div>
                        <span style="display: inline-block; width: 43%">标识符:</span>
                        <span style="display: inline-block; width: 40%">描述:</span>
                    </div>
                    <div
                        class="rain-item"
                        v-for="(item,index) in form.fwGroup"
                        :key="index"
                        style="margin: 0px 0px 10px 0px;"
                    >
                        <el-input v-model="item.name" class="small-width"></el-input>
                        <span
                            class="span"
                            style="display: inline-block;width: 3%;text-align: center"
                        >~</span>
                        <el-input v-model="item.desc" class="small-width"></el-input>
                        <el-button
                            type="text"
                            @click="deleteFw(index)"
                            style="display: inline-block;margin-left: 10px"
                            v-if="index > 0"
                        >删除</el-button>
                    </div>
                    <el-button type="text" @click="form.fwGroup.push({name: '', desc: ''})">+ 添加固件名称</el-button>
                </el-form-item>
                <el-form-item label="产品描述">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="beforeClose" style="padding: 10px 22px">取消</el-button>
                    <el-button type="primary" @click="createProduct" style="padding: 10px 22px">确定</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
</template>

<script>
import { addProduct, editProduct } from "@/api/product/product";
export default {
    name: "ProductCreate",
    props: ["product", "visible"],
    data() {
        return {
            categoryOptions: [{ value: "100", label: "智能家居" }],
            form: {
                name: "",
                model: "",
                category: "",
                desc: "",
                fwGroup: [{ name: "", desc: "" }]
            },
            title: '',
            formRules: {
                name: [
                    {
                        required: true,
                        message: "请输入产品名称",
                        trigger: "blur"
                    }
                ],
                model: [
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
    watch: {
        visible() {
            this.$nextTick(() => {
                if (this.product && this.visible) {
                    if(!this.product.fwGroup || this.product.fwGroup.length === 0) {
                        this.product.fwGroup = [{ name: "", desc: "" }]
                    }
                    this.form = { ...this.form, ...this.product };
                    this.title="产品编辑"
                } else {
                     this.title="添加产品";
                }
            });
        }
    },
    methods: {
        beforeClose() {
            this.$refs.form.resetFields();
            this.$emit("listenOp", false);
        },

        createProduct() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    if (this.product) {
                        editProduct(this.form)
                            .then(() => {
                                this.$message({
                                    type: "success",
                                    message: "更新成功",
                                    duration: 500
                                });
                                this.beforeClose();
                            })
                            .catch(() => {
                                this.$message({
                                    message: "更新失败",
                                    duration: 500
                                });
                            });
                    } else {
                        addProduct(this.form)
                            .then(() => {
                                this.$message({
                                    type: "success",
                                    message: "产品创建成功",
                                    duration: 500
                                });
                                this.beforeClose();
                            })
                            .catch(() => {
                                this.$message({
                                    message: "产品创建失败",
                                    duration: 500
                                });
                            });
                    }
                }
            });
        },
        deleteFw(index) {
            this.form.fwGroup.splice(index, 1);
        }
    }
};
</script>

<style lang='less' scoped>
.create-product-wrapper {
    .form-box {
        width: 80%;
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