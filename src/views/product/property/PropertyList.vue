<template>
  <el-card class="box-card create-station-wrapper" shadow="never">
        <div slot="header" class="clearfix">
            <span class="card-title">属性列表</span>
        </div>
        <div class="property-wrapper">
            <div class="content">
                <div class="table-wrapper">
                    <div class="btn-box">
                        <el-button type="primary" size="small" @click="showPropertyDialog()">+ 添加属性</el-button>
                    </div>
                    <!-- 循环的产品列表 -->
                    <el-table :data="propertyList" style="width: 100%; margin-top: 12px">
                        <el-table-column prop="name" label="属性名称"></el-table-column>
                        <el-table-column prop="label" label="数据点名称"></el-table-column>
                        <el-table-column prop="propType" label="属性类型"></el-table-column>
                        <el-table-column prop="permission" label="读写类型"></el-table-column>
                        <el-table-column prop="instant" label="采样值"></el-table-column>
                        <el-table-column prop="history" label="默认值"></el-table-column>
                        <el-table-column prop="desc" label="辅助信息"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                    type="text"
                                    size="small"
                                    @click="handleEditProperty(scope.row)"
                                >编辑</el-button>
                                <el-button
                                    type="text"
                                    size="small"
                                    @click="handleDeleteProperty(scope.row)"
                                >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>      
        </div>
        <!-- 显示添加属性属性对话框 -->
        <el-dialog title="添加属性" :visible.sync="dialogVisible" width="60%" margin-top="3vh" >
            <add-propert ref="addPropert"></add-propert>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetForm()">取 消</el-button>
                <el-button type="primary" @click="addPropert()">确 定</el-button>
            </span>
        </el-dialog>
  </el-card>
</template>

<script>
import AddPropert from "./AddPropert";


  export default {
    data () {
      return {
        dialogVisible: false,
        propertyList: [],
      };
    },

    components: { AddPropert },


    methods: {
        showPropertyDialog() {
            this.dialogVisible = true;
        },
        addPropert() {
            console.log(this.$refs.addPropert.form)
            this.$refs.addPropert.submitForm();
        },
        resetForm() {
            this.$refs.addPropert.resetForm();
            this.dialogVisible = false;
        }
    },

    watch: {}

  }

</script>
<style lang='' scoped>

</style>