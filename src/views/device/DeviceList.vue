<template>
    <el-card class="box-card create-station-wrapper" shadow="never">
        <div slot="header" class="clearfix">
            <span class="card-title">设备管理</span>
        </div>
        <div class="device-wrapper">       
            <el-form :inline="true" class="demo-form-inline">         
                <!-- 测站类型框 -->
                <el-form-item label="设备类型">
                    <el-select
                        v-model="form.stationType"
                        placeholder="请选择设备类型"
                        size="small"
                    >
                        <el-option label="全部" :value="1"></el-option>
                        <el-option label="遥测雨量计" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="绑定状态">
                    <el-select
                        v-model="form.binded"
                        placeholder="请选择绑定状态"
                        size="small"
                    >
                        <el-option label="全部" :value="1"></el-option>
                        <el-option label="在线" :value="2"></el-option>
                        <el-option label="离线" :value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="primary" @click="handlePage()">查询</el-button>
                </el-form-item>
            </el-form>   
            <!-- 循环的设备列表 -->
            <el-table :data="deviceList" style="width: 100%; margin-top: 12px">
                <el-table-column type="index" :index="indexMethod"></el-table-column>
                <el-table-column prop="model" label="产品型号"></el-table-column>
                <el-table-column prop="name" label="产品名字"></el-table-column>
                <el-table-column prop="hwID" label="设备编号"></el-table-column>
                <el-table-column prop="props.batVolt" label="电池电压"></el-table-column>
                <el-table-column prop="props.chgVolt" label="充电电压"></el-table-column>
                <el-table-column prop="props.rssi" label="信号强度"></el-table-column>
                <el-table-column prop="props.count" label="计数传感器"></el-table-column>
                <el-table-column label="软件版本号">
                    <template slot-scope="scope">
                      <span>{{scope.row.fwVersion}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="hwVersion" label="硬件版本号"></el-table-column>
                <el-table-column prop="online" label="在线状态" :formatter="isOnline"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="handleUpgrade(scope.row)"
                        >升级</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页逻辑 -->
            <div class="pagination-box" v-if="form.pageSize < deviceList.length">
                <el-pagination
                    :page-size="form.pageSize"
                    :page="form.page"
                    layout="prev, pager, next"
                    :total="deviceList.length"
                    @current-change="handlePage"
                ></el-pagination>
            </div>
            <el-dialog title="设备升级" :visible.sync="dialogVisible" width="80%">
                <device-upgrade></device-upgrade>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                </span>
            </el-dialog>
        </div>
    </el-card>
</template>

<script>
import DeviceUpgrade from "./DeviceUpgrade";

  export default {
    name:'',
    props:[''],
    data () {
      return {
            form: {
                page: 1,
                pageSize: 10,
                stationType: "",
                binded: "",
                isPage: true
            },
            deviceList: [{
                broken: false,
                brokenAt: "0001-01-01T00:00:00Z",
                createdAt: "2019-01-05T04:37:26.457Z",
                did: "460045357201156",
                fwVersion: {default: "0.0.2"},
                group: "release",
                hwID: "460045357201156",
                hwVersion: "",
                model: "YL3800",
                name: "遥测雨量计",
                online: true,
                pid: "1z0zbfe0db5",
                props: {batVolt: 10.746, chgVolt: 12.6445, count: 0, rssi: 12},
                updatedAt: "2019-01-08T07:11:38.644Z"
            },
            {
                broken: false,
                brokenAt: "0001-01-01T00:00:00Z",
                createdAt: "2019-01-05T04:37:26.457Z",
                did: "460045357201156",
                fwVersion: {default: "0.0.2"},
                group: "release",
                hwID: "460045357201156",
                hwVersion: "",
                model: "YL3800",
                name: "遥测雨量计",
                online: true,
                pid: "1z0zbfe0db5",
                props: {batVolt: 10.746, chgVolt: 12.6445, count: 0, rssi: 12},
                updatedAt: "2019-01-08T07:11:38.644Z"
            },
            {
                broken: false,
                brokenAt: "0001-01-01T00:00:00Z",
                createdAt: "2019-01-05T04:37:26.457Z",
                did: "460045357201156",
                fwVersion: {default: "0.0.2"},
                group: "release",
                hwID: "460045357201156",
                hwVersion: "",
                model: "YL3800",
                name: "遥测雨量计",
                online: false,
                pid: "1z0zbfe0db5",
                props: {batVolt: 10.746, chgVolt: 12.6445, count: 0, rssi: 12},
                updatedAt: "2019-01-08T07:11:38.644Z"
            }
            ],
            dialogVisible: false,
            title: "",
            value: "",
        };
    },

    components: { DeviceUpgrade },

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
      handlePage() {
        console.log("查询")
      },
      indexMethod(index) {
        return index + 1;
      },
      handleUpgrade() {
        this.dialogVisible = true
        console.log("升级")
      },
      isOnline(val) {
        if(val.online == true)
          {return "在线"}
        else if (val.online == false)
          {return "离线"}
      }
    },

    watch: {}

  }

</script>
<style lang='less' scoped>

</style>