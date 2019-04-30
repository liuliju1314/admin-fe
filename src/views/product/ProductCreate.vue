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
                    <el-select v-model="form.category" placeholder="请选择方法" size="small">
                        <el-option label="雨情" value="雨情"></el-option>
                        <el-option label="水位" value="水位"></el-option>
                        <el-option label="图像" value="图像"></el-option>
                        <el-option label="测试" value="测试"></el-option>
                        <el-option label="其他" value="其他"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="升级方式" prop="upMethod">
                    <el-radio-group v-model="form.upMethod">
                        <el-radio label="manual">手动升级</el-radio>
                        <el-radio label="auto">静默升级</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="节点类型" prop="nodeType">
                    <!-- <el-radio-group v-model="form.nodeType" :disabled="isEdit"> -->
                    <el-radio-group v-model="form.nodeType">
                        <el-radio label="device">设备</el-radio>
                        <el-radio label="gateWay">网关</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="连网方式" prop="netMode">
                    <el-select v-model="form.netMode" placeholder="请选择连网方式" size="small">
                        <el-option label="WIFI" value="wifi"></el-option>
                        <el-option label="蜂窝 (2G / 3G / 4G) " value="cellularNet"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="协议类型" prop="protocolType">
                    <el-select v-model="form.protocolType" placeholder="请选择协议类型" size="small">
                        <el-option label="TCP " value="TCP"></el-option>
                        <el-option label="MQTT" value="MQTT"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="编码格式" prop="codeFormat">
                    <el-select v-model="form.codeFormat" placeholder="请选择编码格式" size="small">
                        <el-option label="JSON " value="JSON"></el-option>
                    </el-select>
                </el-form-item>

                <div class="el-form-item el-form-item--small">
                    <div
                        style="width: 90px;float: left;font-size: 14px;color: #606266;line-height: 40px;text-align: right;padding: 0 12px 0 0;-webkit-box-sizing: border-box;box-sizing: border-box;vertical-align: middle;cursor: default;"
                    >固件名称</div>
                    <div class="el-form-item__content" style="margin:4px 0 0 90px;">
                        <div
                            class="rain-item"
                            v-for="(item,index) in form.fwGroup"
                            :key="index"
                            style="margin: 0px 0px 10px 0px;"
                        >
                            <div v-if="index === 0">
                                <span style="display: inline-block; width: 43%">标识符:</span>
                                <span style="display: inline-block; width: 40%">描述:</span>
                            </div>
                            <el-form-item
                                :prop="'fwGroup.' + index + '.name'"
                                :rules="{
                            required: true, message: '请输入标识符', trigger: 'blur'
                            }"
                                style="display: inline-block;width: 33%;"
                            >
                                <el-input v-model="item.name"></el-input>
                            </el-form-item>
                            <span
                                class="span"
                                style="display: inline-block;width: 3%;margin:0 3%;text-align: center"
                            >~</span>
                            <el-form-item
                                :prop="'fwGroup.' + index + '.desc'"
                                style="    display: inline-block;width: 33%;"
                                :rules="{
                            required: true, message: '请输入描述', trigger: 'blur'
                        }"
                            >
                                <el-input v-model="item.desc"></el-input>
                            </el-form-item>

                            <el-button
                                type="text"
                                @click="deleteFw(index)"
                                style="display: inline-block;margin-left: 10px"
                            >删除</el-button>
                        </div>
                        <el-button
                            type="text"
                            @click="form.fwGroup.push({name: '', desc: ''})"
                        >+ 添加固件名称</el-button>
                    </div>
                </div>
                <el-form-item label="产品描述" prop="desc">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        @click="beforeClose"
                        style="padding: 10px 22px"
                        :disabled="isCreating"
                    >取消</el-button>
                    <el-button
                        type="primary"
                        @click="isCreatOrEdit"
                        style="padding: 10px 22px"
                        :disabled="isCreating"
                    >确定</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
</template>

<script>
import { addProduct } from "@/api/product/product";
export default {
    name: "ProductCreate",
    props: ["product", "visible"],
    data() {
        return {
            form: {
                name: "",
                model: "",
                category: "",
                desc: "",
                upMethod: "",
                nodeType: "",
                netMode: "",
                protocolType: "",
                fwGroup: []
            },
            title: "",
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
                upMethod: [
                    {
                        required: true,
                        message: "请选择升级方式",
                        trigger: "blur"
                    }
                ],
                category: [
                    {
                        required: true,
                        message: "请添加产品分类",
                        trigger: "blur"
                    }
                ],
                nodeType: [
                    {
                        required: true,
                        message: "请选择节点类型",
                        trigger: "blur"
                    }
                ],
                netMode: [
                    {
                        required: true,
                        message: "请选择连网方式",
                        trigger: "blur"
                    }
                ],
                protocolType: [
                    {
                        required: true,
                        message: "请选择协议类型",
                        trigger: "blur"
                    }
                ],
                codeFormat: [
                    {
                        required: true,
                        message: "请选择编码格式",
                        trigger: "blur"
                    }
                ]
            },
            isCreating: false
        };
    },
    watch: {
        visible() {
            this.$nextTick(() => {
                if (this.product && this.visible) {
                    this.form = Object.assign({}, this.form, this.product);
                    this.title = "产品编辑";
                } else {
                    this.title = "添加产品";
                }
            });
        }
    },
    methods: {
        beforeClose() {
            this.$refs.form.resetFields();
            this.isCreating = false;
            setTimeout(() => {
                this.$emit("listenOp", false);
            }, 0);
        },
        // 点击确定时判断是添加还是更新
        isCreatOrEdit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.isCreating = true;
                    if (this.product) {
                        this.$store
                            .dispatch("BaseInfoSet", this.form)
                            .then(() => {
                                this.$message({
                                    type: "success",
                                    message: "更新成功",
                                    duration: 500
                                });
                                this.$store.dispatch(
                                    "updateVisitedView",
                                    this.$route
                                );
                                this.beforeClose();
                            })
                            .catch(() => {
                                this.$message({
                                    message: "更新失败",
                                    duration: 500
                                });
                                this.isCreating = false;
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
                                this.isCreating = false;
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
<style>
.create-product-wrapper .rain-item .el-form-item__content {
    margin-left: 0px !important;
}
</style>

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
    .rain-item {
        .el-form-item__content {
            margin-left: 0px !important;
        }
    }
}
</style>