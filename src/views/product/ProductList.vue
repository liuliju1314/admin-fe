<template>
      <el-card class="box-card create-station-wrapper" shadow="never">
        <div slot="header" class="clearfix">
            <span class="card-title">产品列表</span>
        </div>
        <div class="product-wrapper">       
            <!-- 循环的产品列表 -->
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
            <div class="pagination-box" v-if="form.pageSize < deviceList.count">
                <el-pagination
                    :page-size="form.pageSize"
                    :page="form.page"
                    layout="prev, pager, next"
                    :total="deviceList.count"
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

  export default {
    name:'',
    props:[''],
    data () {
      return {
          form: {            
          },
          deviceList: []
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style lang='' scoped>

</style>