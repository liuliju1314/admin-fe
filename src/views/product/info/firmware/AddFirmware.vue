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
                                    accept=".js"
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

            <el-form-item label="固件名称" prop="name">
                <el-select
                    v-model="form.fwName"
                    filterable
                    default-first-option
                    placeholder="请选择固件名称"
                >
                    <el-option label="正式版" value="0"></el-option>
                    <el-option label="测试版" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="固件分组" prop="group">
                <el-radio-group v-model="form.group" placeholder="请选择">
                    <el-radio label="0">正式版</el-radio>
                    <el-radio label="1">测试版</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="升级方式" prop="upMethod">
                <el-radio-group v-model="form.upMethod">
                    <el-radio label="3">手动升级</el-radio>
                    <el-radio label="6">静默升级</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="固件版本" prop="version">
                <el-input v-model="form.version" placeholder="建议采用版本递增进行管理"></el-input>
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
import { updateFirmware, addFirmware } from "@/api/firmware/firmware";
export default {
    name: "Addfirmware",
    props: ["visible", "fw"],
    data() {
        return {
            upload: [{ index: "" }],
            form: {
                pid: "",
                upMethod: "",
                group: "",
                fwName: "",
                version: "",
                desc: ""
            },
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
                    {
                        required: true,
                        message: "请填写固件版本",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {
        this.form.pid = this.$route.params.id ;
        this.handleOp();
    },
    watch: {
        fw() {
            this.handleOp();
        }
    },
    methods: {
        handleOp() {
            if (this.fw) {
                this.isEdit = true;
                this.$nextTick(() => {
                    this.form = { ...this.form, ...this.fw };
                });
            } else {
                this.isEdit = false;
            }
        },
        beforeClose() {
            this.files = this.fileList = [];
            this.$refs.form.resetFields();
            this.$emit("listenAdd", false);
        },
        clearFile(index) {
            this.fileList.splice(index, 1, "");
            this.files.splice(index, 1, "");
        },
        deleteUpload(index) {
            this.upload.splice(index, 1);
            this.fileList.splice(index, 1);
            this.files.splice(index, 1);
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
                console.error("Could not read the file");
                this.$message.error("读取文件失败");
            };
            reader.onload = event => {
                if (this.files.length > 0 && index < this.files.length) {
                    this.files[index].zoom = index + 1;
                    this.files[index].size = files[0].size;
                    this.files[index].filename = files[0].name;
                    
                    this.fileList[index] = event.target.result;
                } else {
                    this.files.push({
                        zoom: index + 1,
                        size: files[0].size,
                        filename: files[0].name
                    });
                    this.fileList.push(event.target.result);
                }
            };
            reader.readAsArrayBuffer(files[0]);
        },
        addfirmware() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    if (!this.isEdit) {
                        const files = {};
                        this.fileList.forEach((item, index) => {
                            files["file" + (index + 1)] = item;
                        });

                        const data = {
                            ...this.form,  files: this.files,
                            ...files
                        };
                        console.log(data);
                        addFirmware(data)
                            .then(() => {
                                this.$message({
                                    type: "success",
                                    message: "添加成功"
                                });
                                this.beforClose();
                            })
                            .catch(() => {
                                console.log("添加失败");
                            });
                    } else {
                        updateFirmware().then(() => {
                            this.$message({
                                type: "success",
                                message: "更新成功"
                            });
                            this.beforClose();
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