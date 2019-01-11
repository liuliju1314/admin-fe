<template>
  <el-card class="box-card create-station-wrapper" shadow="never">
    <div slot="header" class="clearfix">
      <span class="card-title">固件管理</span>
    </div>
    <div class="content">
        <div class="table-wrapper">
            <div class="btn-box">
                <el-button type="primary" size="small" @click="handleShowDialog(0)">+ 添加固件</el-button>
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
        <el-table-column label="创建时间">
            <template slot-scope="scope">{{ changeTimeFormater(scope.row.createdAt) }}</template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                    type="text"
                    size="small"
                    @click="handleShowDialog(1,scope.row,)"
                >修改</el-button>
                <el-button
                    type="text"
                    size="small"
                    @click="deleteFireware(scope.row)"
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
    <el-dialog
        class="dialogList"
        :title="title"
        :visible.sync="dialogVisible"
        width="50%"
        center
        top="15vh"
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
import { getFirewareList } from "@/api/fireware/fireware";
import { formatDate } from "@/utils/format";



  export default {
    name:'',
    props:[''],
    data () {
      return {
          dialogVisible: false,
          form: {
            page: 1,
            pageSize: 6,
            isPage: true      
          },
          count: '',
          firewareList: [],
          componentList: [AddFireware, EditFireware],
          componentId: "",
          title: "",
          firewareInformation:""
      };
    },

    computed: {},

    created() {
        this.getFireware();
    },

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
        getFireware() {       
            getFirewareList(this.form)
            .then(res => {
                this.firewareList = res.payload.result;
                this.count = res.payload.count;
            })
            .catch(error => {
                return error;
            });
        },
        //分页
        handlePage(value) {
            this.form.page = value;
            this.getFireware();
        },
        // 点击显示不同对话框
        handleShowDialog(value,firewareManger) {
            this.dialogVisible = true;
            this.firewareInformation = firewareManger;
            // console.log(firewareManger)
            this.componentId = this.componentList[value];
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