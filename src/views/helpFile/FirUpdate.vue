<template>
    <div class="create-pro-help-box">
        <h3 class="title">固件升级</h3>
        <ul>
            <li>
                <h4
                    class="list-item"
                >固件的定义：固件就是写入EPROM（可擦写可编程只读存储器）或EEPROM(电可擦可编程只读存储器)中的程序。此平台支持通过OTA方式进行设备固件升级</h4>
                <p class="list-item">1. 在添加固件对话框中，输入固件信息，上传固件</p>
                <div>
                    <img src="/images/firmware-1.png" alt>
                </div>
            </li>
            <li>
                <p class="list-item">添加固件参数含义如下：</p>
                <table class="table">
                    <thead>
                        <tr>
                            <td width="20%">参数名称</td>
                            <td>描述</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>选择固件</td>
                            <td>上传固件文件。文件大小不能超过10M。最多同时上传两个文件</td>
                        </tr>
                        <tr>
                            <td>固件分组</td>
                            <td>为上传的固件选择分组</td>
                        </tr>
                        <tr>
                            <td>固件版本</td>
                            <td>同产品下具有唯一性。建议按照版本递增顺序命名</td>
                        </tr>
                        <tr>
                            <td>固件名称</td>
                            <td>选择所属产品下的固件名称。</td>
                        </tr>
                    </tbody>
                </table>
            </li>
            <li>
                <p class="list-item">2. 固件上传成功后，即在固件列表显示出来，可对固件进行相应操作</p>
            </li>
            <li>
                <p class="list-item">3. 固件列表如下：</p>
                <div>
                    <img src="/images/firmware-2.png" alt>
                </div>
                <p class="list-item">4. 固件列表各个操作含义如下：</p>
                <table class="table">
                    <thead>
                        <tr>
                            <td width="20%">参数名称</td>
                            <td>描述</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>固件验证</td>
                            <td>固件上传后，必须使用少量设备对固件进行验证。确认测试设备升级成功后，开启固件验证，才能批量升级。</td>
                        </tr>
                        <tr>
                            <td>编辑</td>
                            <td>可以修改固件的分组和描述</td>
                        </tr>
                        <tr>
                            <td>禁用</td>
                            <td>禁用的固件将不会被设备升级</td>
                        </tr>
                        <tr>
                            <td>升级详情</td>
                            <td>可查看升级至当前固件版本的设备状态。</td>
                        </tr>
                    </tbody>
                </table>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    components: {}
};
</script>

<style lang='less' scoped>
.table {
    width: 80%;
    font-size: 13px;
    min-height: 25px;
    line-height: 25px;
    border-collapse: collapse;
}
table,
table tr th,
table tr td {
    padding: 16px 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
}
.create-pro-help-box {
    margin-left: 30px;
}
</style>
