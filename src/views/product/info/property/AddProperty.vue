<template>
    <el-main>
        <el-form
            ref="propertForm"
            :model="propertForm"
            label-width="100px"
            :rules="formRules"
            v-model="labelPosition"
            class="form-box"
            size="small"
        >
            <el-form-item label="属性名称" prop="name">
                <el-input v-model="propertForm.name"></el-input>
            </el-form-item>

            <el-form-item label="标识符" prop="label">
                <el-input
                    v-model="propertForm.label"
                    placeholder="支持字母、数字，首单词不支持数字，同产品下不可重复，多个单词请使用小驼峰命名"
                ></el-input>
            </el-form-item>
            <el-form-item label="属性类型" prop="dataType.type">
                <el-select v-model="propertForm.dataType.type" placeholder="请选择类型">
                    <el-option label="bool (布尔型)" value="bool"></el-option>
                    <el-option label="string (字符型)" value="text"></el-option>
                    <el-option label="enum (枚举型)" value="enum"></el-option>
                    <el-option label="float (浮点型)" value="float"></el-option>
                    <el-option label="int (整数型)" value="int"></el-option>
                    <el-option label="data (时间型)" value="data"></el-option>
                    <el-option label="array (数组型)" value="array"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="布尔值" v-if="propertForm.dataType.type === 'bool'">
                <div>
                    <span style="display: inline-block; width: 43%">0:</span>
                    <span style="display: inline-block; width: 40%">1:</span>
                </div>
                <div class="rain-item" style="margin: 0px 0px 10px 0px;">
                    <el-input v-model.number="propertForm.dataType.specs['0']" class="small-width"></el-input>
                    <span class="span" style="display: inline-block;width: 3%;text-align: center">~</span>
                    <el-input v-model.number="propertForm.dataType.specs['1']" class="small-width"></el-input>
                </div>
            </el-form-item>
            <el-form-item label="数据长度" v-if="propertForm.dataType.type === 'text'">
                <el-input v-model="propertForm.dataType.specs.length" style="width:80%"></el-input>
                <span>&nbsp;字节</span>
            </el-form-item>
            <el-form-item label="时间格式" v-if="propertForm.dataType.type === 'data'">
                <span>String类型的UTC时间戳（秒）</span>
            </el-form-item>
            <el-form-item label="元素类型" v-if="propertForm.dataType.type === 'array'">
                <el-radio-group v-model="propertForm.dataType.specs.type">
                    <el-radio label="int">int</el-radio>
                    <el-radio label="float">float</el-radio>
                    <el-radio label="text">string</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item
                label="数组长度"
                prop="arraySize"
                v-if="propertForm.dataType.type === 'array'"
            >
                <el-input v-model="propertForm.dataType.specs.size"></el-input>
            </el-form-item>
            <el-form-item label="枚举项" v-if="propertForm.dataType.type === 'enum'">
                <div>
                    <span style="display: inline-block; width: 43%">属性值:</span>
                    <span style="display: inline-block; width: 40%">属性描述:</span>
                </div>
                <div
                    class="rain-item"
                    v-for="(item,index) in enumList"
                    :key="index"
                    style="margin: 0px 0px 10px 0px;"
                >
                    <el-input v-model.number="item.propertyValue" class="small-width"></el-input>
                    <span class="span" style="display: inline-block;width: 3%;text-align: center">~</span>
                    <el-input v-model.number="item.propertyDesc" class="small-width"></el-input>
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
                v-if="propertForm.dataType.type === 'float'"
            >
                <el-input v-model="propertForm.dataType.specs.places"></el-input>
            </el-form-item>
            <el-form-item label="读写属性" prop="permission">
                <el-radio-group v-model="propertForm.permission">
                    <el-radio label="RW">读写</el-radio>
                    <el-radio label="RO">只读</el-radio>
                    <el-radio label="WO">只写</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="历史数据" prop="history">
                <el-radio-group v-model="propertForm.history">
                    <el-radio :label="true">保存</el-radio>
                    <el-radio :label="false">丢弃</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="属性类别" prop="businessType">
                <el-radio-group v-model.number="propertForm.businessType">
                    <el-radio :label="1">业务</el-radio>
                    <el-radio :label="2">非业务</el-radio>
                    <el-radio :label="3">不区分类别</el-radio>
                </el-radio-group>
            </el-form-item>
            <!-- 目前系统暂时不需要 -->
            <!-- <el-form-item label="采样值" prop="instant">
                <el-radio-group v-model="propertForm.instant">
                    <el-radio :label="true">瞬时采样</el-radio>
                    <el-radio :label="false">时间段累积采样</el-radio>
                </el-radio-group>
            </el-form-item>-->
            <el-form-item label="默认值" prop="default">
                <el-input v-model="propertForm.default"></el-input>
            </el-form-item>

            <el-form-item label="描述" prop="desc">
                <el-input type="textarea" v-model="propertForm.desc"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button @click="handleClose" :disabled="isCreating">取消</el-button>
                <el-button type="primary" @click="submitProperty" :disabled="isCreating">确定</el-button>
            </el-form-item>
        </el-form>
    </el-main>
</template>

<script>
import { addProperty, editProperty } from "@/api/property/property";

export default {
    props: ["property", "isEdit"],
    data() {
        return {
            isCreating: false,
            labelPosition: "right",
            enumList: [{ propertyValue: "", propertyDesc: "" }],
            propertForm: {
                pid: "",
                label: "",
                name: "",
                permission: "",
                // history: "",
                // businessType: "",
                // instant: "",
                desc: "",
                default: "",
                dataType: {
                    specs: {},
                    type: ""
                },
                arraySize: "",
                dialogVisible: ""
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
                        message: "请输入属性名称",
                        trigger: "blur"
                    }
                ],
                "dataType.type": [
                    {
                        required: true,
                        message: "请选择属性类型",
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
                // history: [
                //     {
                //         required: true,
                //         message: "请选择历史数据",
                //         trigger: "blur"
                //     }
                // ],
                // businessType: [
                //     {
                //         required: true,
                //         message: "请选择属性类别",
                //         trigger: "blur"
                //     }
                // ]
            }
        };
    },
    created() {
        this.propertForm.pid = this.$route.params.id;
    },
    watch: {
        property(newValue) {
            this.propertForm = newValue;
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
            this.propertForm.pid = this.$route.params.id;
        },
        // 点击确定按钮
        submitProperty() {
            if (this.isEdit === false) {
                this.changeMetadata();
                this.$refs.propertForm.validate(valid => {
                    if (valid) {
                        this.isCreating = true;
                        addProperty(this.propertForm)
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
                this.$refs.propertForm.validate(valid => {
                    if (valid) {
                        this.isCreating = true;
                        editProperty(this.propertForm)
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
            if (this.propertForm.dataType.type === "enum") {
                this.propertForm.dataType.specs = this.enumList;
            }
        },
        // 关闭表单，清空内容
        handleClose() {
            this.isCreating = false;
            this.$refs.propertForm.resetFields();
            this.propertForm.dataType.specs = {};
            this.enumList = [{ propertyValue: "", propertyDesc: "" }];
            setTimeout(() => {
                this.$emit("listenDialog", this.dialogVisible);
            }, 0);
        },
        // 添加枚举
        addEnumerate() {
            this.enumList.push({
                propertyValue: "",
                propertyDesc: ""
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