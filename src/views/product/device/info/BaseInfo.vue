<template>
    <div class="device-station-wrapper">
        <table class="device-info-table">
            <tr>
                <th>产品名称:</th>
                <td>
                    <span>{{deviceInfo.name}}</span>
                </td>
                <th>产品型号:</th>
                <td>{{deviceInfo.model}}</td>
                <th>设备编号:</th>
                <td>{{deviceInfo.did}}</td>
            </tr>
            <tr>
                <th>设备分组:</th>
                <td>
                    <span>{{formatterGroup(deviceInfo.group)}}</span>
                </td>
                <th>固件版本号:</th>
                <td>{{deviceInfo.fwVersion === null? " " :formatterFwVersion(deviceInfo.fwVersion)}}</td>
                <th>硬件版本号:</th>
                <td>{{deviceInfo.hwVersion}}</td>
            </tr>
            <tr>
                <th>在线状态:</th>
                <td>
                    <span>{{isOnline(deviceInfo.status)}}</span>
                </td>

                <th>设备秘钥:</th>
                <td colspan="3">
                    <span>{{deviceInfo.deviceSecret}}</span>
                    <el-button
                        class="copy-box"
                        size="mini"
                        @click.stop="copyPid(deviceInfo.deviceSecret)"
                        round
                    >复制</el-button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import deviceList from "../mixins/deviceList";
import copy from "@/views/mixins/copy";

export default {
    mixins: [deviceList, copy],
    components: {},
    props: {},
    data() {
        return {
            form: {
                did: "",
                isPage: false
            },
            deviceInfo: ""
        };
    },
    created() {
        this.form.did = this.$route.params.did;
    },
    watch: {
        $route() {
            this.form.did = this.$route.params.did;
            if (this.$route.params.did) {
                this.form.did = this.$route.params.did;
                this.getDevice();
            }
        },
        deviceList() {
            if (this.$route.params.did) {
                this.deviceInfo = this.deviceList.items[0];
                console.log(this.deviceInfo);
            }
        }
    },
    methods: {
        formatterFwVersion(value) {
            if (typeof value === "object") {
                const keys = Object.keys(value);
                return keys.reduce(
                    (total, key) => value[key] + " " + total,
                    ""
                );
            } else {
                return value;
            }
        },
        formatterGroup(value) {
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
    }
};
</script>
<style lang="less" scoped>
.device-info-table {
    width: 100%;
    border: 0;
    border-left: 1px solid #ebecec;
    border-top: 1px solid;
    border-color: #ebecec;
    margin-top: 20px;
    margin-bottom: 18px;
    font-size: 14px;
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
    .copy-box {
        margin-left: 4px;
    }
}
</style>