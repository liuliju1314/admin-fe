<template>
    <div class="create-product-wrapper">
        <el-form
            ref="form"
            :model="form"
            label-width="90px"
            :rules="formRules"
            class="form-box"
            size="small"
        >
            <el-form-item label="规则名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="标志符" prop="value">
                <el-input v-model="form.value"></el-input>
            </el-form-item>
            <el-form-item label="描述">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="cancelAdd" style="padding: 10px 22px">取消</el-button>
                <el-button type="primary" @click="createRule" style="padding: 10px 22px">确定</el-button>
            </el-form-item>
        </el-form>
        
    </div>
</template>

<script>
export default {
    name: "AddEngine",
    data() {
        return {
            categoryOptions: [{ value: "100", label: "智能家居" }],
            form: {
                name: "",
                value: "",
                desc: ""
            },
            formRules: {
                name: [
                    {
                        required: true,
                        message: "请输入规则名称",
                        trigger: "blur"
                    }
                ],
                value: [
                    {
                        required: true,
                        message: "请输入标志符",
                        trigger: "blur"
                    }
                ]
            },
            dialogVisible: false
        };
    },
    methods: {
        createRule() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.$message({
                        type: "success",
                        message: "产品创建成功",
                        duration: 500
                    });
                    this.$router.push("/rule/1z0zbfe0db5");
                }
            });
        },
        deleteFw(index) {
            this.form.fw.splice(index, 1);
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