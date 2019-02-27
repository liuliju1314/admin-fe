<template>
    <el-form
        :model="form"
        ref="form"
        label-width="100px"
        class="form-box"
        :rules="rules"
        size="small"
    >
        <div style="display: flex" v-for="(item,index) in upload" :key="index">
            <el-form-item label="选择固件">
                <div class="upload-demo">
                    <div tabindex="0" class="el-upload el-upload--text">
                        <button type="button" class="el-button el-button--primary el-button--small">
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
                    <span class="el-upload-list el-upload-list--text" v-if="files[index]">
                        {{files[index].fileName}}
                        <i
                            class="el-icon-close"
                            style="margin-left: 10px"
                            @click="clearFile(index)"
                        ></i>
                    </span>
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
                v-if="upload.length <= 2"
            >+ 新增固件</el-button>
        </div>
        <el-form-item label="固件名称" prop="name">
            <el-select v-model="form.name" filterable default-first-option placeholder="请选择固件名称">
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

        <el-form-item label="升级方式" prop=" upMethod">
            <el-radio-group v-model="form. upMethod">
                <el-radio :label="3">手动升级</el-radio>
                <el-radio :label="6">静默升级</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="固件版本" prop="version">
            <el-input v-model="form.version" placeholder="建议采用版本递增进行管理"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
            <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="dialogVisible = false" size="small">取 消</el-button>
            <el-button type="primary" @click="addfirmware" size="small">确 定</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { getProductList } from "@/api/product/product";
import { updateFirmware } from "@/api/firmware/firmware";
export default {
    name: "Addfirmware",
    data() {
        return {
            upload: [{ index: "" }],
            form: {
                pid: "",
                upMethod: "",
                group: "",
                name: "",
                version: "",
                desc: ""
            },
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
        this.form.pid = { pid: this.$route.params.id };
    },
    methods: {
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
            const file = {
                size: files[0].size,
                fileName: files[0].name
            };
            if (index <= files.length) {
                this.files[index] = file;
                this.fileList[index] = files[0];
            } else {
                this.files.push({
                    size: files[0].size,
                    fileName: files[0].name
                });
                this.fileList.push(files[0]);
            }
            let reader = new FileReader();
            reader.onerror = function() {
                console.error("Could not read the file");
                this.$message.error("读取文件失败");
            };
            reader.onload = function(event) {
                console.log(event.target.result);
            };
            reader.readAsArrayBuffer(files[0]);
        },
        getProList() {
            getProductList(this.form)
                .then(res => {
                    this.productList = res.payload.result;
                })
                .catch(error => {
                    return error;
                });
        },
        handlerPid(value) {
            this.productList.find(item => {
                if (item.pid === value) {
                    console.log("item: " + JSON.stringify(item));
                    this.fwTypesList = item.fwTypes;
                    console.log(
                        "fwTypesList: " + JSON.stringify(this.fwTypesList)
                    );
                    return item;
                }
            });
        },
        addfirmware() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    const files = {};
                    this.fileList.forEach((item, index) => {
                        files["file" + (index + 1)] = item;
                    });
                    const data = {
                        fw: { ...this.form },
                        ...files
                    };
                    updateFirmware(data)
                        .then(() => {
                            console.log("添加成功");
                        })
                        .catch(() => {
                            console.log("添加失败");
                        });
                } else {
                    return false;
                }
            });
        }
    },

    watch: {}
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