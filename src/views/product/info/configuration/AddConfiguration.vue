<template>
    <el-main>
        <el-form
            ref="configurationFrom"
            :model="configurationFrom"
            label-width="100px"
            :rules="formRules"
            v-model="labelPosition"
            class="form-box"
            size="small"
        >
            <el-form-item label="配置名称" prop="name">
                <el-input v-model="configurationFrom.name"></el-input>
            </el-form-item>

            <el-form-item label="标识符" prop="label">
                <el-input
                    v-model="configurationFrom.label"
                    placeholder="支持字母、数字，首单词不支持数字，同产品下不可重复，多个单词请使用小驼峰命名"
                ></el-input>
            </el-form-item>
            <el-form-item label="配置类型" prop="dataType.type">
                <el-select v-model="configurationFrom.dataType.type" placeholder="请选择类型">
                    <el-option label="bool (布尔型)" value="bool"></el-option>
                    <el-option label="string (字符型)" value="text"></el-option>
                    <el-option label="enum (枚举型)" value="enum"></el-option>
                    <el-option label="float (浮点型)" value="float"></el-option>
                    <el-option label="int (整数型)" value="int"></el-option>
                    <el-option label="data (时间型)" value="data"></el-option>
                    <el-option label="array (数组型)" value="array"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="布尔值" v-if="configurationFrom.dataType.type === 'bool'">
                <div>
                    <span style="display: inline-block; width: 43%">0:</span>
                    <span style="display: inline-block; width: 40%">1:</span>
                </div>
                <div class="rain-item" style="margin: 0px 0px 10px 0px;">
                    <el-input
                        v-model.number="configurationFrom.dataType.specs['0']"
                        class="small-width"
                    ></el-input>
                    <span class="span" style="display: inline-block;width: 3%;text-align: center">~</span>
                    <el-input
                        v-model.number="configurationFrom.dataType.specs['1']"
                        class="small-width"
                    ></el-input>
                </div>
            </el-form-item>
            <el-form-item label="数据长度" v-if="configurationFrom.dataType.type === 'text'">
                <el-input v-model="configurationFrom.dataType.specs.length" style="width:80%"></el-input>
                <span>&nbsp;字节</span>
            </el-form-item>
            <el-form-item label="时间格式" v-if="configurationFrom.dataType.type === 'data'">
                <span>String类型的UTC时间戳（秒）</span>
            </el-form-item>
            <el-form-item label="元素类型" v-if="configurationFrom.dataType.type === 'array'">
                <el-radio-group v-model="configurationFrom.dataType.specs.type">
                    <el-radio label="int">int</el-radio>
                    <el-radio label="float">float</el-radio>
                    <el-radio label="text">string</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item
                label="数组长度"
                prop="arraySize"
                v-if="configurationFrom.dataType.type === 'array'"
            >
                <el-input v-model="configurationFrom.dataType.specs.size"></el-input>
            </el-form-item>
            <el-form-item label="枚举项" v-if="configurationFrom.dataType.type === 'enum'">
                <div>
                    <span style="display: inline-block; width: 43%">配置值:</span>
                    <span style="display: inline-block; width: 40%">配置描述:</span>
                </div>
                <div
                    class="rain-item"
                    v-for="(item,index) in enumList"
                    :key="index"
                    style="margin: 0px 0px 10px 0px;"
                >
                    <el-input v-model.number="item.configurationValue" class="small-width"></el-input>
                    <span class="span" style="display: inline-block;width: 3%;text-align: center">~</span>
                    <el-input v-model.number="item.configurationDesc" class="small-width"></el-input>
                    <el-button
                        type="text"
                        @click="deleteEnumerate(index)"
                        style="display: inline-block;margin-left: 10px"
                    >删除</el-button>
                </div>
                <el-button type="text" @click="addEnumerate">+ 添加枚举</el-button>
            </el-form-item>
            <el-form-item
                label="小数点位数"
                prop="arraySize"
                v-if="configurationFrom.dataType.type === 'float'"
            >
                <el-input v-model="configurationFrom.dataType.specs.places"></el-input>
            </el-form-item>
            <el-form-item label="读写配置" prop="permission">
                <el-radio-group v-model="configurationFrom.permission">
                    <el-radio label="RW">读写</el-radio>
                    <el-radio label="RO">只读</el-radio>
                    <el-radio label="WO">只写</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="默认值" prop="default">
                <el-input v-model="configurationFrom.default"></el-input>
            </el-form-item>

            <el-form-item label="描述" prop="desc">
                <el-input type="textarea" v-model="configurationFrom.desc"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button @click="handleClose" :disabled="isCreating">取消</el-button>
                <el-button type="primary" @click="submitConfiguration" :disabled="isCreating">确定</el-button>
            </el-form-item>
        </el-form>
    </el-main>
</template>

<script>
import { addDevConfig, editDevConfig } from "@/api/configuration/configuration";

export default {
    props: ["configuration", "isEdit"],
    data() {
        return {
            isCreating: false,
            labelPosition: "right",
            enumList: [{ configurationValue: "", configurationDesc: "" }],
            configurationFrom: {
                pid: "",
                label: "",
                name: "",
                permission: "",
                desc: "",
                default: "",
                dataType: {
                    specs: {},
                    type: ""
                },
                arraySize: ""
            },
            formRules: {
                label: [
                    {
                        pattern: /^[^\d]+[a-zA-Z\d]+$/,
                        required: true,
                        message: "请输入正确的格式",
                        trigger: "blur"
                    }
                ],
                name: [
                    {
                        required: true,
                        message: "请输入配置名称",
                        trigger: "blur"
                    }
                ],
                "dataType.type": [
                    {
                        required: true,
                        message: "请选择配置类型",
                        trigger: "blur"
                    }
                ],
                permission: [
                    {
                        required: true,
                        message: "请选择读写权限",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {
        this.configurationFrom.pid = this.$route.params.id;
    },
    watch: {
        configuration(newValue) {
            this.configurationFrom = newValue;
            if (newValue.dataType.type === "enum") {
                this.enumList = newValue.dataType.specs;
            }
        },
        $route() {
            this.init();
        }
    },
    methods: {
        init() {
            this.configurationFrom.pid = this.$route.params.id;
        },
        // 点击确定按钮
        submitConfiguration() {
            if (this.isEdit === false) {
                this.changeMetadata();
                this.$refs.configurationFrom.validate(valid => {
                    if (valid) {
                        this.isCreating = true;
                        addDevConfig({ ...this.configurationFrom })
                            .then(() => {
                                this.$message({
                                    type: "success",
                                    message: "添加成功!"
                                });
                                this.handleClose();
                            })
                            .catch(error => {
                                this.isCreating = false;
                                return error;
                            });
                    }
                });
            } else if (this.isEdit === true) {
                this.$refs.configurationFrom.validate(valid => {
                    if (valid) {
                        this.isCreating = true;
                        editDevConfig(this.configurationFrom)
                            .then(() => {
                                this.$message({
                                    type: "success",
                                    message: "修改成功!"
                                });
                                this.handleClose();
                            })
                            .catch(() => {
                                this.$message.error("修改失败!");
                            });
                    }
                });
            }
        },
        // 枚举类型的数据，需要先转换metedata数据结构
        changeMetadata() {
            if (this.configurationFrom.dataType.type === "enum") {
                this.configurationFrom.dataType.specs = this.enumList;
            }
        },
        // 关闭表单，清空内容
        handleClose() {
            this.isCreating = false;
            this.$refs.configurationFrom.resetFields();
            this.configurationFrom.dataType.specs = {};
            this.enumList = [{ configurationValue: "", configurationDesc: "" }];
            setTimeout(() => {
                this.$emit("listenDialog", this.dialogVisible);
            }, 0);
        },
        // 添加枚举
        addEnumerate() {
            this.enumList.push({
                configurationValue: "",
                configurationDesc: ""
            });
        },
        // 删除枚举项
        deleteEnumerate(index) {
            this.enumList.splice(index, 1);
        }
    }
};
</script>
<style lang="less" scoped>
.form-box {
    width: 90%;
    margin: auto;
}
.small-width {
    width: 40%;
}
</style>