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
                        <el-option label="遥测雨量计" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="绑定状态">
                    <el-select
                        v-model="form.binded"
                        placeholder="请选择绑定状态"
                        size="small"
                    >
                        <el-option label="在线" :value="0"></el-option>
                        <el-option label="离线" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="primary" @click="handlePage()">查询</el-button>
                </el-form-item>
            </el-form>   
            <!-- 循环的设备列表 -->
            <el-table :data="deviceList" style="width: 100%; margin-top: 12px">
                <el-table-column prop="model" label="产品型号"></el-table-column>
                <el-table-column prop="name" label="产品名字"></el-table-column>
                <el-table-column prop="hwID" label="设备编号"></el-table-column>
                <el-table-column prop="props.batVolt" label="电池电压"></el-table-column>
                <el-table-column prop="props.chgVolt" label="充电电压"></el-table-column>
                <el-table-column prop="props.rssi" label="信号强度"></el-table-column>
                <el-table-column prop="props.count" label="计数传感器"></el-table-column>
                <el-table-column label="软件版本号" :formatter="removeBlock">
                    <template slot-scope="scope">
                      <span>{{scope.row.fwVersion}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="hwVersion" label="硬件版本号"></el-table-column>
                <el-table-column prop="online" label="在线状态" :formatter="isOnline"></el-table-column>
                <el-table-column label="操作" width = 150>
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="handleTest(scope.row)"
                        >测试</el-button>
                        <el-button
                            type="text"
                            size="small"
                            @click="handleUpgrade(scope.row)"
                        >升级</el-button>  
                        <div
                            type="text"
                            style="display: inline-block;margin-left: 10px;font-size: 12px;"
                        >
                        <div @click="btnShow = scope.row.did" style="color: #409EFF;">更多</div> 
                        <div class="morebox" v-if="btnShow === scope.row.did">
                            <div type="text" size="small" @click="handleUpgrade(scope.row)" class="moreitem">第一个</div>
                            <div type="text" size="small" @click="handleUpgrade(scope.row)" class="moreitem">第二个</div>
                        </div>
                        </div>  
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
                did: "460045357201157",
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
                did: "460045357201106",
                fwVersion: {default: "0.0.2"},
                group: "release",
                hwID: "46004535720115",
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
            count: "",
            btnShow: false
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
      handleTest() {
        console.log("测试")
      },
      handleUpgrade() {
        this.dialogVisible = true
        console.log("升级")
      },
      handleMore() {
        console.log("更多")
      },
      isOnline(val) {
        if(val.online == true)
          {return "在线"}
        else if (val.online == false)
          {return "离线"}
      },
      //去除大括号
      removeBlock(str) {
        if (str) {
            var reg = /^\{/gi;
            var reg2 = /\}$/gi;
            str = str.replace(reg, '');
            str = str.replace(reg2, '');
        } 
        return str;
      },
    //   showMore() {
    //       this.btnShow = true
    //   }
    },

    watch: {}

  }

</script>
<style lang='less' scoped>
.morebox {
    position:absolute;
    text-align: left;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,.15);
    z-index: 1000;
    top: 51px;
    left: 82px;
}
.morebox .moreitem{
    padding: 5px 12px;
    margin: 0;
    clear: both;
    font-size: 14px;
    font-weight: 400;
    color: rgba(0,0,0,.65);
    white-space: nowrap;
    cursor: pointer;
}
.morebox .moreitem:hover{
    background-color: #e6f7ff;
}
</style>