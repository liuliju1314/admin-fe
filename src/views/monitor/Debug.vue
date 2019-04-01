<template>
    <el-card class="box-card debug-wrapper" shadow="never">
        <div slot="header" class="clearfix">
            <span class="card-title">在线调试</span>
        </div>
        <div class="text-wrapper">
            <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small">
                <el-form-item label="产品名称" prop="productName">
                    <el-select v-model="form.productName" placeholder="请选择产品">
                        <el-option label="智能电灯" value="1"></el-option>
                        <el-option label="智能水位计" value="2"></el-option>
                        <el-option label="智能雨量计" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备名称" prop="deviceName">
                    <el-select v-model="form.deviceName" placeholder="请选择设备">
                        <el-option label="设备1" value="4"></el-option>
                        <el-option label="设备2" value="5"></el-option>
                        <el-option label="设备3" value="6"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="doDeviceSearch">确定</el-button>
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
                                v-model="form.productName"
                                placeholder="请选择功能"
                                size="small"
                                style="margin-right: 10px"
                            >
                                <el-option label="开关" value="1"></el-option>
                                <el-option label="温度" value="2"></el-option>
                            </el-select>
                            <el-select v-model="form.deviceName" placeholder="请选择方法" size="small">
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
export default {
    components: {},
    props: {},
    data() {
        return {
            form: {
                productName: "",
                deviceName: ""
            },
            rules: {
                productName: [
                    { required: true, message: "请选择产品", trigger: "blur" }
                ],
                deviceName: [
                    { required: true, message: "请选择设备", trigger: "blur" }
                ]
            },
            ws: "",
            wsData: [],
            // 富文本
            editor: "",
            content: "",
            editorOption: {
                mode: "code",
                modes: ["text", "code"]
            }
        };
    },
    created() {
        this.content = {
            content: "1",
            content2: "1",
            a: {
                b: {
                    c: {
                        d: {
                            e: 1,
                            f: {
                                r: {
                                    3: 2
                                }
                            }
                        }
                    }
                }
            }
        };
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
            this.$refs.form.validate(valid => {
                if (valid) {
                }
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

                this.ws.onclose = () => {
                };
            } else {
                // 浏览器不支持 WebSocket
                alert("您的浏览器不支持 WebSocket!");
            }
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