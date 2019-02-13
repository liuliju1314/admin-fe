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
                    <template slot-scope="scope">{{ changeTimeFormater(scope.row.activatedAt) }}</template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="handleEditManage(scope.row)"
                        >编辑</el-button>
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
          <el-form ref="form" :model="addManageForm" label-width="100px"  class="form-box">
              <el-form-item label="电话" prop="phone">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="权限" prop="role">
                  <el-select v-model="form.role">
                      <el-option label="super" value="super">super</el-option>
                      <el-option label="super" value="0">系统管理员</el-option>
                      <el-option label="super" value="1">区域管理员</el-option>
                  </el-select>
              </el-form-item>
              <el-form-item>
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="addManage()">确 定</el-button>
              </el-form-item>
          </el-form>
        </el-dialog>


        <!-- 编辑管理员对话框 -->
        <el-dialog title="编辑管理员" :visible.sync="editManage" width="60%">
          <el-form ref="editManageForm" :model="editManageForm" label-width="100px"  class="form-box">
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
                      <el-option  value="0">super</el-option>
                      <el-option  value="1">系统管理员</el-option>
                      <el-option  value="2">区域管理员</el-option>
                  </el-select>
              </el-form-item>
              <el-form-item>
                  <el-button @click="editManage = false">取 消</el-button>
                  <el-button type="primary" @click="iseditManage()">确 定</el-button>
              </el-form-item>
          </el-form>
        </el-dialog>

  </el-card>
</template>

<script>
import { getManagerList } from "@/api/user/user";
import { formatDate } from "@/utils/format";


  export default {
    name:'',
    data () {
        return {
            form: {
                page: 1,
                pageSize: 6,
                isPage: true      
            },
            manageList: [],
            addManageForm: {
                name: '',
                phone: '',
                role: ''
            },
            editManageForm: {
                uid: '',
                phone: '',
                name: '',
                password: '',
                role: ''
            },
            dialogVisible: false,
            editManage: false,
            count: ''
        };
    },
    created() {
        this.getManager();
    },
    methods: {
        handleShowManage() {
            this.dialogVisible = true;
            console.log("添加新管理员")
        },
        //分页
        handlePage(value) {
            this.form.page = value;
            this.getManager();
        },
        getManager() {
            getManagerList()
            .then(res => {
                this.manageList = res.payload.result;
                this.count = res.payload.count;
            })
            .catch(error => {
                return error;
            });
        },
        handleEditManage(value) {
            this.editManageForm = value,
            this.editManage = true,
            console.log("编辑管理员")
        },
        iseditManage() {
            console.log("编辑成功")
            this.editManage = false
        },
        handleDeleteManage() {
            console.log("删除管理员")
        },
        isRole(val) {
            if(val.role == "super")
            {return "超级管理员"}
        },
        addManage() {
            console.log("添加成功")
            this.dialogVisible = false;
        },
        changeTimeFormater(cellvalue) {
            return formatDate(cellvalue, "y-m-d");
        },
    },

    watch: {}

  }

</script>
<style lang='less' scoped>

</style>