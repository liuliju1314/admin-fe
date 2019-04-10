<template>
    <el-card class="box-card debug-wrapper" shadow="never">
        <div slot="header" class="clearfix">
            <span class="card-title">在线调试</span>
        </div>
        <div class="text-wrapper">
            <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small">
                <el-form-item class="form-item" filterable>
                    <el-select placeholder="请选择产品" v-model="form.pid">
                        <el-option
                            v-for="product in productList"
                            :label="product.name"
                            :value="product.pid"
                            :key="product.pid"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="form-item">
                    <el-select
                        placeholder="请选择设备"
                        v-model="form.did"
                        @focus="getDevice(form)"
                        @change="doDeviceSearch(form)"
                        filterable
                    >
                        <el-option
                            v-for="device in deviceList"
                            :label="device.did"
                            :value="device.did"
                            :key="device.did"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-row :gutter="12">
                <el-col :span="8">
                    <div class="left">
                        <div>
                            <h3>设备编辑</h3>
                        </div>
                        <div style="margin-bottom: 10px;display: flex;">
                            <el-select
                                v-model="propId"
                                placeholder="请选择功能"
                                size="small"
                                style="margin-right: 10px"
                                @change="setProp"
                            >
                                <el-option
                                    v-for="prop in propList"
                                    :label="prop.name"
                                    :value="prop.label"
                                    :key="prop.id"
                                ></el-option>
                            </el-select>
                            <el-select v-model="method" placeholder="请选择方法" size="small">
                                <el-option label="设置" value="1"></el-option>
                                <el-option label="获取" value="2"></el-option>
                            </el-select>
                        </div>

                        <div ref="editor" id="editor" style="height: 43vh"></div>
                        <el-button
                            size="small"
                            type="primary"
                            style="margin-top: 20px"
                            @click="sendData"
                        >发送</el-button>
                        <el-button
                            size="small"
                            type="primary"
                            style="margin-top: 20px"
                            @click="closeLink"
                        >关闭长连接</el-button>
                    </div>
                </el-col>
                <el-col :span="16">
                    <div class="right">
                        <div>
                            <h3>实时</h3>
                        </div>

                        <el-table :data="wsData" stripe style="width: 100%" size="small">
                            <el-table-column prop="date" label="类型/时间" width="180"></el-table-column>
                            <el-table-column prop="name" label="内容"></el-table-column>
                        </el-table>
                    </div>
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>

<script>
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.min.css";
import { getProductList } from "@/api/product/product";
import { getDeviceList } from "@/api/device/device";
import { getDeviceProps } from "@/api/device/device";
export default {
    components: {},
    props: {},
    data() {
        return {
            form: {
                pid: "",
                did: ""
            },
            propId: "",
            method: "",
            rules: {
                pid: [
                    { required: true, message: "请选择产品", trigger: "blur" }
                ],
                did: [
                    { required: true, message: "请选择设备", trigger: "blur" }
                ]
            },
            ws: "",
            wsData: [],
            // 富文本
            editor: "",
            content: {},
            editorOption: {
                mode: "code",
                modes: ["text", "code"]
            },
            productList: [],
            deviceList: [],
            propList: []
        };
    },
    created() {
        this.getProduct();
    },
    mounted() {
        this.$nextTick(() => {
            this.editor = new JSONEditor(this.$refs.editor, this.editorOption);
            this.editor.set(this.content);
        });
    },
    beforeDestroy() {
        this.closeLink();
    },
    methods: {
        // 发送数据
        sendData() {
            this.WebSocketLink();
        },
        doDeviceSearch() {
            getDeviceProps(this.form).then(res => {
                this.propList = res.payload;
            });
        },
        closeLink() {
            this.ws.close();
        },
        WebSocketLink() {
            if ("WebSocket" in window) {
                // 打开一个 web socket
                this.ws = new WebSocket("ws://47.107.91.58:9090/ws_message");

                this.ws.onopen = () => {
                    this.ws.send("1611812280002337");
                };

                this.ws.onmessage = evt => {
                    this.wsData = evt.data;
                };

                this.ws.onclose = () => {};
            } else {
                // 浏览器不支持 WebSocket
                alert("您的浏览器不支持 WebSocket!");
            }
        },
        getProduct() {
            if (this.productList.length === 0) {
                getProductList({ isPage: false })
                    .then(res => {
                        this.productList = res.payload.result;
                    })
                    .catch(error => {
                        return error;
                    });
            }
        },
        getDevice(data) {
            this.deviceList = [];
            if (data.pid) {
                getDeviceList({ isPage: false, pid: data.pid })
                    .then(res => {
                        this.deviceList = res.payload.items;
                    })
                    .catch(error => {
                        return error;
                    });
            }
        },
        setProp(value) {
            this.content = {};
            const prop = this.propList.find(item => item.label === value);
            this.content = Object.assign({}, { [prop.label]: prop.value });
            this.editor.set(this.content);
        }
    }
};
</script>
<style lang="less">
.debug-wrapper {
    .el-card__body {
        padding-bottom: 0px;
    }
    div.jsoneditor-menu > button,
    div.jsoneditor-menu > div.jsoneditor-modes > button {
        display: none;
    }
    div.jsoneditor {
        border: 1px solid #efefef;
    }
    div.jsoneditor-menu {
        background: #efefef;
        border: 1px solid #efefef;
    }
    div.jsoneditor-statusbar {
        display: none;
    }
    div.jsoneditor-outer.has-status-bar {
        margin-bottom: 0;
        padding-bottom: 0;
    }
}
</style>

<style lang="less" scoped>
.left,
.right {
    border: 1px solid #ddd;
    padding: 10px 18px;
    font-size: 14px;
    height: 63vh;
    td {
        padding: 4px;
        margin: 4px;
    }
}
</style>