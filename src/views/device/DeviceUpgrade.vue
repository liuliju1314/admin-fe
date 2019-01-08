<template>
    <div class="deviceUpgrade">
        <div>
            <span>设备DID：{{did}}</span>
        </div>
        <div>
            <span>设备固件版本：{{fwVersion}}</span>
        </div>

        <!-- 循环的设备列表 -->
        <el-table :data="firmwareList" style="width: 100%; margin-top: 12px">
            <el-table-column prop="fwID" label="固件ID"></el-table-column>
            <el-table-column prop="version" label="版本"></el-table-column>
            <el-table-column prop="name" label="名字"></el-table-column>
            <el-table-column prop="desc" label="正式版"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">升级</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

</template>

<script>

  export default {
    name:'',
    props:[''],
    data () {
      return {
          did: 1,
          fwVersion: {default: "0.0.2"},
          firmwareList: [{
            createdAt: "2019-01-06T11:01:06.935Z",
            desc: "正式版",
            fwID: "6pxrqh8njsw",
            group: "release",
            name: "app",
            pid: "1z0zbfe0db5",
            updatedAt: "2019-01-06T11:01:06.935Z",
            version: "0.1.2"
          },
          {
            createdAt: "2019-01-06T11:01:06.935Z",
            desc: "正式版",
            fwID: "6pxrqh8njsw",
            group: "release",
            name: "app",
            pid: "1z0zbfe0db5",
            updatedAt: "2019-01-06T11:01:06.935Z",
            version: "0.1.2"
          },
          {
            createdAt: "2019-01-06T11:01:06.935Z",
            desc: "正式版",
            fwID: "6pxrqh8njsw",
            group: "release",
            name: "app",
            pid: "1z0zbfe0db5",
            updatedAt: "2019-01-06T11:01:06.935Z",
            version: "0.1.2"
          },
          ]
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
        handleUpgrade() {
            console.log("升级")
        }
    },

    watch: {}

  }

</script>
<style lang='less' scoped>

</style>