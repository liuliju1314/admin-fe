<template>
    <div class="device-station-wrapper">
        <table class="device-info-table">
            <tr>
                <th>产品名称:</th>
                <td>
                    <span>{{deviceList[0].name}}</span>
                </td>
                <th>产品型号:</th>
                <td>{{deviceList[0].model}}</td>
                <th>设备编号:</th>
                <td>{{deviceList[0].did}}</td>
            </tr>
            <tr>
                <th>设备分组:</th>
                <td>
                    <span>{{formatter(deviceList[0].group)}}</span>
                </td>
                <th>固件版本号:</th>
                <td>{{deviceList[0].fwVersion}}</td>
                <th>硬件版本号:</th>
                <td>{{deviceList[0].hwVersion}}</td>
            </tr>
            <tr>
                <th>在线状态:</th>
                <td>
                    <span>{{isOnline(deviceList[0].status)}}</span>
                </td>
                <th></th>
                <td></td>
                <th></th>
                <td></td>
            </tr>
        </table>
    </div>
</template>

<script>
import { getDeviceList } from "@/api/device/device";
export default {
    components: {},
    props: {},
    data() {
        return {
            form: {
                page: 1,
                pageSize: 10,
                pid: "",
                did: "",
                status: "0",
                isPage: true
            },
            deviceList: [
                {
                    name: ""
                }
            ]
        };
    },
    watch: {},
    computed: {},
    methods: {
        //获取设备列表
        getDevice() {
            getDeviceList(this.form)
                .then(res => {
                    this.deviceList = res.payload.items;
                })
                .catch(error => {
                    return error;
                });
        },
        formatter(value) {
            if (value === "release") {
                return "正式组";
            } else if (value === "develop") {
                return "开发组";
            } else if (value === "debug") {
                return "测试组";
            }
        },
        isOnline(val) {
            if (val === 0) {
                return "未知状态";
            } else if (val === 1) {
                return "在线";
            } else if (val === 2) {
                return "离线";
            }
        }
    },
    created() {
        this.form.did = this.$route.params.id;
        this.getDevice();
    },
    mounted() {}
};
</script>
<style lang="less" scoped>
.device-info-table {
    width: 100%;
    border: 0;
    border-left: 1px solid #ebecec;
    border-top: 1px solid;
    border-color: #ebecec;
    margin-bottom: 18px;
    tr {
        height: 48px;
        box-sizing: border-box;
    }
    th {
        min-width: 120px;
        text-align: left;
        color: #74777a;
        font-weight: 400;
        background: #fafafc;
        padding: 0 8px;
        border-right: 1px solid #ebecec;
        border-bottom: 1px solid #ebecec;
    }
    td {
        width: 22%;
        word-break: break-all;
        padding: 0 8px;
        border-right: 1px solid #ebecec;
        border-bottom: 1px solid #ebecec;
    }
}
</style>