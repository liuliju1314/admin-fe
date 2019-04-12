<template>
    <el-card class="box-card manage-wrapper" shadow="never">
        <div slot="header" class="clearfix">
            <span class="card-title">管理员列表</span>
        </div>
        <div class="manage-wrapper">
            <div class="content">
                <div class="table-wrapper">
                    <div class="btn-box">
                        <el-button type="primary" size="small" @click="handleShowManage()">+ 添加管理员</el-button>
                    </div>
                </div>
            </div>
            <!-- 循环的管理员列表 -->
            <el-table :data="manageList" style="width: 100%; margin-top: 12px">
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="phone" label="电话"></el-table-column>
                <el-table-column prop="role" label="权限" :formatter="isRole"></el-table-column>
                <el-table-column label="注册时间">
                    <template slot-scope="scope">{{ changeTimeFormater(scope.row.createdAt) }}</template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showEditManage(scope.row)">编辑</el-button>
                        <el-button
                            type="text"
                            size="small"
                            @click="handleDeleteManage(scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页逻辑 -->
            <div class="pagination-box" v-if="form.pageSize < count">
                <el-pagination
                    :page-size="form.pageSize"
                    :page="form.page"
                    layout="prev, pager, next"
                    :total="count"
                    @current-change="handlePage"
                ></el-pagination>
            </div>
        </div>

        <!-- 添加管理员对话框 -->
        <el-dialog title="添加管理员" :visible.sync="dialogVisible" width="60%">
            <el-form
                ref="addManageForm"
                :rules="addManageFormValid"
                :model="addManageForm"
                label-width="100px"
                class="form-box"
            >
                <el-form-item label="电话" prop="phone">
                    <el-input v-model="addManageForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="addManageForm.name"></el-input>
                </el-form-item>
                <el-form-item label="权限" prop="role">
                    <el-select v-model="addManageForm.role">
                        <el-option value="super">超级管理员</el-option>
                        <el-option value="user">普通用户</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleAddManage()">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 编辑管理员对话框 -->
        <el-dialog title="编辑管理员" :visible.sync="dialogeditManage" width="60%">
            <el-form
                ref="editManageForm"
                :model="editManageForm"
                label-width="100px"
                class="form-box"
                :rules="editManageFormValid"
            >
                <el-form-item label="UID" prop="uid">
                    <el-input v-model="editManageForm.uid" disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                    <el-input v-model="editManageForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="editManageForm.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="editManageForm.password"></el-input>
                </el-form-item>
                <el-form-item label="权限" prop="role">
                    <el-select v-model="editManageForm.role">
                        <el-option label="超级管理员" value="super"></el-option>
                        <el-option label="普通用户" value="user"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="dialogeditManage = false">取 消</el-button>
                    <el-button type="primary" @click="handleEditManage()">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </el-card>
</template>

<script>
import {
    getManagerList,
    addManager,
    deleteManager,
    updateManager
} from "@/api/user/user";
import { formatDate } from "@/utils/format";

export default {
    name: "",
    data() {
        const validatePhone = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入手机号码"));
            } else {
                if (!/^1[34578]\d{9}$/.test(value)) {
                    callback(new Error("请输入正确的手机号码"));
                }
                callback();
            }
        };
        return {
            form: {
                page: 1,
                pageSize: 6,
                isPage: true
            },
            count: "",
            manageList: [],
            addManageForm: {
                name: "",
                phone: "",
                role: "user"
            },
            editManageForm: {
                uid: "",
                phone: "",
                name: "",
                password: "",
                role: ""
            },
            dialogVisible: false,
            dialogeditManage: false,
            addManageFormValid: {
                phone: [
                    {
                        validator: validatePhone,
                        trigger: "blur",
                        required: true
                    }
                ]
            },
            editManageFormValid: {
                phone: [
                    {
                        validator: validatePhone,
                        trigger: "blur",
                        required: true
                    }
                ]
            }
        };
    },
    created() {
        this.getManager();
    },
    methods: {
        handleShowManage() {
            this.dialogVisible = true;
        },
        //分页
        handlePage(value) {
            this.form.page = value;
            this.getManager();
        },
        // 获取管理员列表
        getManager() {
            getManagerList()
                .then(res => {
                    this.manageList = res.payload.items;
                    this.count = res.payload.total;
                })
                .catch(error => {
                    return error;
                });
        },
        // 添加管理员
        handleAddManage() {
            this.$refs.addManageForm.validate(valid => {
                if (valid) {
                    addManager(this.addManageForm)
                        .then(() => {
                            this.$message({
                                type: "success",
                                message: "添加成功"
                            });
                            this.dialogVisible = false;
                            this.getManager();
                        })
                        .catch(error => {
                            return error;
                        });
                } else {
                    return false;
                }
            });
        },
        // 删除管理员
        handleDeleteManage(val) {
            this.$confirm(`此操作将删除 ${val.name} 用户, 是否继续?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    deleteManager({ uid: val.uid }).then(() => {
                        this.$message({
                            type: "success",
                            message: "删除成功"
                        });
                    });
                    this.getManager();
                })
                .catch(() => {});
        },
        // 显示更新信息对话框
        showEditManage(value) {
            this.editManageForm = value;
            this.dialogeditManage = true;
        },
        // 更新管理员信息
        handleEditManage() {
            this.$refs.editManageForm.validate(valid => {
                if (valid) {
                    updateManager(this.editManageForm)
                        .then(() => {
                            this.$message({
                                type: "success",
                                message: "更新成功"
                            });
                            this.dialogeditManage = false;
                            this.getManager();
                        })
                        .catch(error => {
                            return error;
                        });
                } else {
                    return false;
                }
            });
        },
        isRole(val) {
            if (val.role === "super") {
                return "超级管理员";
            } else if (val.role === "user") {
                return "普通用户";
            }
        },
        changeTimeFormater(cellvalue) {
            return formatDate(cellvalue, "y-m-d");
        }
    },

    watch: {}
};
</script>
<style lang='less' scoped>
</style>