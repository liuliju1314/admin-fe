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
                <el-input v-model="propertForm.label"></el-input>
            </el-form-item>
            <el-form-item label="属性类型" prop="propType">
                <el-select v-model="propertForm.propType" placeholder="请选择类型">
                    <el-option label="bool (布尔型)" value="BOOL"></el-option>
                    <el-option label="string (字符型)" value="STRING"></el-option>
                    <el-option label="enum (枚举型)" value="ENUM"></el-option>
                    <el-option label="float (浮点型)" value="FLOAT"></el-option>
                    <el-option label="int (整数型)" value="INT"></el-option>
                    <el-option label="data (时间型)" value="DATA"></el-option>
                    <el-option label="array (数组型)" value="ARRAY"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="布尔值" v-if="propertForm.propType === 'BOOL'">
                <div>
                    <span style="display: inline-block; width: 43%">0:</span>
                    <span style="display: inline-block; width: 40%">1:</span>
                </div>
                <div
                    class="rain-item"
                    v-for="(item,index) in propertForm.bool"
                    :key="index"
                    style="margin: 0px 0px 10px 0px;"
                >
                    <el-input v-model.number="item.true" class="small-width"></el-input>
                    <span class="span" style="display: inline-block;width: 3%;text-align: center">~</span>
                    <el-input v-model.number="item.false" class="small-width"></el-input>
                </div>
            </el-form-item>
            <el-form-item label="数据长度" v-if="propertForm.propType === 'STRING'">
                <el-input v-model="propertForm.bytes" style="width:80%"></el-input>
                <span>&nbsp;字节</span>
            </el-form-item>
            <el-form-item label="时间格式" v-if="propertForm.propType === 'DATA'">
                <span>String类型的UTC时间戳（秒）</span>
            </el-form-item>
            <el-form-item label="元素类型" v-if="propertForm.propType === 'ARRAY'">
                <el-radio-group v-model="propertForm.elemenType">
                    <el-radio label="int">int</el-radio>
                    <el-radio label="float">float</el-radio>
                    <el-radio label="string">string</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="枚举项" v-if="propertForm.propType === 'ENUM'">
                <div>
                    <span style="display: inline-block; width: 43%">属性值:</span>
                    <span style="display: inline-block; width: 40%">属性描述:</span>
                </div>
                <div
                    class="rain-item"
                    v-for="(item,index) in propertForm.metadata"
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
            <el-form-item label="读写属性" prop="permission">
                <el-radio-group v-model="propertForm.permission">
                    <el-radio label="RW">可读写</el-radio>
                    <el-radio label="RO">可读</el-radio>
                    <el-radio label="WO">可写</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="历史数据" prop="history">
                <el-radio-group v-model="propertForm.history">
                    <el-radio :label="true">保存</el-radio>
                    <el-radio :label="false">丢弃</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="采样值" prop="instant">
                <el-radio-group v-model="propertForm.instant">
                    <el-radio :label="true">瞬时采样</el-radio>
                    <el-radio :label="false">时间段累积采样</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="默认值">
                <el-input v-model="propertForm.default"></el-input>
            </el-form-item>

            <el-form-item label="描述">
                <el-input type="textarea" v-model="propertForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="addfirmware" size="small">确 定</el-button>
            </el-form-item>
        </el-form>
    </el-main>
</template>

<script>
import { addProperty } from "@/api/property/property";

export default {
    props: ["property", "isEdit"],
    data() {
        return {
            labelPosition: "right",
            propertForm: {
                pid: "",
                name: "",
                label: "",
                propType: "",
                permission: "",
                history: "",
                instant: "",
                desc: "",
                bytes: "",
                default: "",
                elemenType: "",
                metadata: [{ propertyValue: "", propertyDesc: "" }],
                bool: [{ true: "", false: "" }]
            },
            formRules: {
                name: [
                    {
                        required: true,
                        message: "请输入属性名称",
                        trigger: "blur"
                    }
                ],
                label: [
                    {
                        required: true,
                        message: "请输入属性标识符",
                        trigger: "blur"
                    }
                ],
                propType: [
                    {
                        required: true,
                        message: "请输入属性名称",
                        trigger: "blur"
                    }
                ],
                permission: [
                    {
                        required: true,
                        message: "请输入属性名称",
                        trigger: "blur"
                    }
                ],
                history: [
                    {
                        required: true,
                        message: "请输入属性名称",
                        trigger: "blur"
                    }
                ],
                instant: [
                    {
                        required: true,
                        message: "请输入属性名称",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {
        this.propertForm.pid = this.$route.params.pid;
    },
    methods: {
        handleNext(value) {
            this.$emit("listenNext", value);
        },
        addEnumerate() {
            this.propertForm.metadata.push({
                propertyValue: "",
                propertyDesc: ""
            });
        },
        deleteEnumerate(index) {
            this.propertForm.metadata.splice(index, 1);
        },
        //验证表单信息是否为空
        submitForm() {
            this.$refs.propertForm.validate(valid => {
                if (valid) {
                    addProperty(this.propertForm)
                        .then(() => {})
                        .catch(() => {});
                } else {
                    return false;
                }
            });
        },
        // 添加属性
        addProperty() {
            this.$refs.addPropertyFrom.validate(valid => {
                if (valid) {
                    this.cancelAddfirmware();
                    this.$message({
                        type: "success",
                        message: "添加成功!"
                    });
                }
            });
        },
        resetForm() {
            this.$refs.propertForm.resetFields();
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