<template>
  <el-card class="box-card create-station-wrapper" shadow="never">
    <div slot="header" class="clearfix">
      <span class="card-title">固件管理</span>
    </div>
    <div class="content">
        <div class="table-wrapper">
            <div class="btn-box">
                <el-button type="primary" size="small" @click="handleShowStation(0)">+ 添加固件</el-button>
            </div>
        </div>
    </div>
    <!-- 循环的设备列表 -->
    <el-table :data="firewareList" style="width: 100%; margin-top: 12px">
        <el-table-column prop="fwID" label="固件ID"></el-table-column>
        <el-table-column prop="name" label="产品型号"></el-table-column>
        <el-table-column prop="group" label="固件分组"></el-table-column>
        <el-table-column prop="name" label="固件名字"></el-table-column>
        <el-table-column prop="version" label="固件版本"></el-table-column>
        <el-table-column prop="desc" label="升级描述"></el-table-column>
        <el-table-column prop="updatedAt" label="上传时间"></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                    type="text"
                    size="small"
                    @click="handleShowStation(1,scope.row,)"
                >修改</el-button>
                <el-button
                    type="text"
                    size="small"
                    @click="deleteFireware(scope.row)"
                >删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 添加固件对话框 -->
    <!-- <el-dialog title="添加新固件" :visible.sync="dialogVisible" width="60%">
        <add-fireware></add-fireware>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addFireware()">确 定</el-button>
        </span>
    </el-dialog> -->
    <el-dialog
        class="dialogList"
        :title="title"
        :visible.sync="dialogVisible"
        width="80%"
        center
        top="5vh"
    >
        <component :is="componentId" :firewareForm="firewareInformation"></component>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addFireware()">确 定</el-button>
        </span>
    </el-dialog>
  </el-card>

</template>

<script>
import AddFireware from "./AddFireware";
import EditFireware from "./EditFireware";

  export default {
    name:'',
    props:[''],
    data () {
      return {
          dialogVisible: false,
          firewareList: [{
            createdAt: "2019-01-06T11:01:06.935Z",
            desc: "正式版",
            fwID: "6pxrqh8njsw",
            group: "release",
            name: "app",
            pid: "1z0zbfe0db5",
            updatedAt: "2019-01-06T11:01:06.935Z",
            version: "0.1.2"
          }],
          componentList: [AddFireware, EditFireware],
          componentId: "",
          title: "",
          firewareInformation:""
      };
    },

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
        handleForm() {
            this.dialogVisible = true;
            console.log("添加固件")
        },
        editFireware() {
            console.log("修改固件")
        },
        deleteFireware() {
            console.log("删除固件")
        },
        addFireware() {
            this.dialogVisible = false;
            console.log("添加成功")
        },
        // 点击显示不同对话框
        handleShowStation(value,firewareManger) {
            this.dialogVisible = true;
            this.firewareInformation = firewareManger;
            // console.log(firewareManger)
            this.componentId = this.componentList[value];
        },
    },

    watch: {}

  }

</script>
<style lang='less' scoped>

</style>