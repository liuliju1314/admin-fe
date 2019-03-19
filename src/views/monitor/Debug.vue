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
                        <div ref="editor" id="editor" style="height: 48vh"></div>
                        <el-button
                            size="small"
                            type="primary"
                            style="margin-top: 20px"
                            @click="sendData"
                        >发送</el-button>
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
    // beforeDestroy() {
    //     this.ws.close();
    // },
    methods: {
        // 发送数据
        sendData() {
            console.log(this.editor.get());
            this.WebSocketLink();
        },
        doDeviceSearch() {
            this.$refs.form.validate(valid => {
                if (valid) {
                }
            });
        },
        WebSocketLink() {
            if ("WebSocket" in window) {
                // 打开一个 web socket
                this.ws = new WebSocket("ws://localhost:9998/echo");

                this.ws.onopen = function() {
                    // Web Socket 已连接上，使用 send() 方法发送数据
                    //   this.ws.send("发送数据");
                    alert("数据发送中...");
                };

                this.ws.onmessage = function(evt) {
                    this.wsData = evt.data;
                    alert("数据已接收...");
                };

                this.ws.onclose = function() {
                    // 关闭 websocket
                    alert("连接已关闭...");
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