<template>
<el-main>
    <!-- 循环的固件列表 -->
    <div class="btn-box">
        <el-button type="primary" size="small" @click="addFireware()">+ 添加固件</el-button>
    </div>
    <el-table :data="firewareList" style="width: 100%; margin-top: 12px">
        <el-table-column prop="fwID" label="固件ID"></el-table-column>
        <el-table-column prop="name" label="产品型号"></el-table-column>
        <el-table-column prop="group" label="固件分组"></el-table-column>
        <el-table-column prop="fwname" label="固件名字"></el-table-column>
        <el-table-column prop="version" label="固件版本"></el-table-column>
        <el-table-column prop="desc" label="升级描述"></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                    type="text"
                    size="small"
                    @click="handleDeleteFireware(scope.row)"
                >删除</el-button>
            </template>
        </el-table-column>
    </el-table>
        <!-- 添加固件对话框 -->
    <el-dialog title="添加固件" :visible.sync="dialogVisible" width="60%">
        <add-fireware></add-fireware>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addFireware()">确 定</el-button>
        </span>
    </el-dialog>
</el-main>
</template>

<script>
import AddFireware from "./AddFireware"

export default {
  components:{
      AddFireware
  },
  props:{},
  data(){
    return {
        firewareList: [{
            fwID: "",
            name: "",
            group: "",
            fwname: "",
            version: "",
            desc: "",
            createdAt: ""
        }],
        dialogVisible: false
    }
  },
  watch:{},
  computed:{},
  methods:{
      addFireware() {
        this.dialogVisible = true
      },
      handleDeleteFireware() {
          console.log("删除固件")
      }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
.el-main {
    background-color: #fff;
}
</style>