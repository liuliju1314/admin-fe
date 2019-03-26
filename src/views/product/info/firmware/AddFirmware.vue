<template>
    <el-dialog title="添加固件" :visible.sync="visible" center :before-close="beforeClose">
        <el-form
            :model="form"
            ref="form"
            label-width="100px"
            class="form-box"
            :rules="rules"
            size="small"
        >
            <div v-if="!isEdit">
                <div style="display: flex" v-for="(item,index) in upload" :key="index">
                    <el-form-item label="选择固件">
                        <div class="upload-demo">
                            <div tabindex="0" class="el-upload el-upload--text">
                                <button
                                    type="button"
                                    class="el-button el-button--primary el-button--small"
                                >
                                    <i class="el-icon-upload"></i>
                                    <span>选择文件</span>
                                </button>
                                <input
                                    type="file"
                                    name="file"
                                    class="el-upload__input"
                                    @change="addFile(index,$event)"
                                >
                            </div>
                            <span
                                class="el-upload-list el-upload-list--text"
                                v-if="files[index]"
                            >{{files[index].filename}}</span>
                        </div>
                    </el-form-item>
                    <div style="vertical-align: top; margin-left: 10px;">
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            size="small"
                            v-if="index > 0"
                            @click="deleteUpload(index)"
                        >删除</el-button>
                    </div>
                </div>

                <div style="margin-left: 100px">
                    <el-button
                        type="text"
                        size="small"
                        style="padding-top: 0"
                        @click="upload.push( { index: '' })"
                        v-if="upload.length <= 1"
                    >+ 新增固件</el-button>
                </div>
            </div>
            <el-form-item label="固件名称" prop="fwName" v-if="fwNameList && fwNameList !== []">
                <el-select
                    v-model="form.fwName"
                    filterable
                    default-first-option
                    placeholder="请选择固件名称"
                    :disabled="isEdit"
                >
                    <el-option
                        v-for="(item,index) in fwNameList"
                        :key="index"
                        :label="item.name"
                        :value="item.name"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="固件分组" prop="group">
                <el-radio-group v-model="form.group" placeholder="请选择">
                    <el-radio label="release">正式版</el-radio>
                    <el-radio label="debug">测试版</el-radio>
                    <el-radio label="develop">开发版</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="固件版本" prop="version">
                <el-input
                    :disabled="isEdit"
                    v-model="form.version"
                    placeholder="建议采用版本递增进行管理,如：1.0.0"
                ></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="desc">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="beforeClose" size="small">取 消</el-button>
                <el-button type="primary" @click="addfirmware" size="small">确 定</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import {
    editFirmware,
    addFirmware,
    getFirmwareName
} from "@/api/firmware/firmware";
export default {
    name: "Addfirmware",
    props: ["visible", "fwInfo"],
    data() {
        var checkVersion = (rule, value, callback) => {
            if (!value) {
                callback(new Error("请输入固件版本"));
            } else {
                if (!new RegExp(/^\d{1}.\d{1}.\d{1}$/g).test(value)) {
                    callback(new Error("请正确的版本号"));
                } else {
                    callback();
                }
            }
        };
        return {
            upload: [{ index: "" }],
            form: {
                pid: "",
                group: "",
                fwName: "",
                version: "",
                desc: ""
            },
            fwNameList: [],
            group: ["A", "B"],
            isEdit: false,
            files: [],
            fileList: [],
            rules: {
                group: [
                    {
                        required: true,
                        message: "请选择固件分组",
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
                version: [
                    { validator: checkVersion, trigger: "blur", required: true }
                ]
            }
        };
    },
    created() {
        this.form.pid = this.$route.params.id;
        this.isFwInfo();
        this.getFwName();
    },
    watch: {
        fwInfo() {
            this.isFwInfo();
        }
    },
    methods: {
        //判断是固件新增还是编辑
        isFwInfo() {
            if (this.fwInfo) {
                this.isEdit = true;
                this.$nextTick(() => {
                    this.form = { ...this.form, ...this.fwInfo };
                });
            } else {
                this.isEdit = false;
            }
        },
        beforeClose() {
            this.$nextTick(() => {
                this.files = [];
                this.fileList = [];
                this.$refs.form.resetFields();
            });
            this.$emit("listenAdd", false);
        },
        deleteUpload(index) {
            this.upload.splice(index, 1);
            this.fileList.splice(index, 1);
            this.files.splice(index, 1);
        },
        // 获取固件名称
        getFwName() {
            getFirmwareName({ pid: this.form.pid })
                .then(res => {
                    this.fwNameList = res.payload;
                })
                .catch(() => {
                    this.$message.error("获取失败!");
                });
        },
        // 文件上传成功后返回值
        addFile(index, event) {
            let files = event.target.files;
            if (files.length === 0) {
                return;
            }
            // 文件大小
            if (files[0].size > 10 * 1024 * 1024) {
                this.$message.error("文件太大了，请上传小于10M的文件");
                return;
            }
            let reader = new FileReader();
            reader.onerror = function() {
                this.$message.error("读取文件失败");
            };
            reader.onload = () => {
                this.files.length = this.upload.length;
                this.files.splice(index, 1, {
                    zone: this.group[index].charCodeAt(),
                    size: files[0].size,
                    filename: files[0].name
                });

                this.fileList.push(files[0]);
            };
            reader.readAsArrayBuffer(files[0]);
        },
        addfirmware() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    if (!this.isEdit) {
                        let formData = new FormData();
                        this.fileList.forEach((item, index) => {
                            formData.append(`file${this.group[index]}`, item);
                        });
                        const data = {
                            ...this.form,
                            files: this.files
                        };
                        formData.append("firmware", JSON.stringify(data));
                        addFirmware(formData)
                            .then(() => {
                                this.$message({
                                    type: "success",
                                    message: "添加成功"
                                });
                                this.beforeClose();
                            })
                            .catch(() => {
                                this.$message.error("添加失败!");
                            });
                    } else {
                        const data = {
                            fwID: this.fwInfo.fwID,
                            ...this.form
                        };
                        editFirmware(data).then(() => {
                            this.$message({
                                type: "success",
                                message: "更新成功"
                            });
                            this.beforeClose();
                        });
                    }
                } else {
                    return false;
                }
            });
        }
    }
};
</script>
<style lang='less' scoped>
.form-box {
    width: 80%;
    margin: auto;
}
.el-upload__input {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100px;
    height: 100%;
    opacity: 0;
}
.el-upload-list {
    display: inline-block;
    margin-left: 10px;
    padding: 0px 14px;
    border: 1px dashed #ddd;
    box-sizing: border-box;
    border-radius: 4px;
}
</style>