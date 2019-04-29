<template>
    <div class="create-pro-help-box">
        <h3 class="title">创建产品</h3>
        <ul>
            <li>
                <h4>产品的定义：设备的集合，通常指一组具有相同功能的设备。每个产品下可以有成千上万的设备。</h4>
                <p class="list-item">1. 进入产品管理，点击添加产品,填写基本信息</p>
                <div>
                    <img src="/images/createPro-1.jpg" alt>
                </div>
            </li>
            <li>
                <p class="list-item">产品参数含义如下：</p>
                <table class="table">
                    <thead>
                        <tr>
                            <td width="20%">参数名称</td>
                            <td>描述</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>产品名称</td>
                            <td>为产品命名，不具有全局唯一性，支持中文、英文字母、数字和下划线。</td>
                        </tr>
                        <tr>
                            <td>产品型号</td>
                            <td>用来识别产品的编号，不具有全局唯一性，支持中文、英文字母、数字和下划线。</td>
                        </tr>
                        <tr>
                            <td>产品分类</td>
                            <td>产品所属类别。</td>
                        </tr>
                        <tr>
                            <td>升级方式</td>
                            <td>用于产品固件版本迭代，静默升级表示产品将会在指定时间对旗下指定设备进行自动升级，手动升级则需要人为操作指定设备版本升级。</td>
                        </tr>
                        <tr>
                            <td>联网方式</td>
                            <td>用来识别产品的编号，不具有全局唯一性，支持中文、英文字母、数字和下划线。</td>
                        </tr>
                        <tr>
                            <td>协议类型</td>
                            <td>用来识别产品的编号，不具有全局唯一性，支持中文、英文字母、数字和下划线。</td>
                        </tr>
                        <tr>
                            <td>编码格式</td>
                            <td>用来识别产品的编号，不具有全局唯一性，支持中文、英文字母、数字和下划线。</td>
                        </tr>
                        <tr>
                            <td>固件名称</td>
                            <td>用来识别产品的编号，不具有全局唯一性，支持中文、英文字母、数字和下划线。</td>
                        </tr>
                        <tr>
                            <td>产品描述</td>
                            <td>用于描述产品相关信息。</td>
                        </tr>
                    </tbody>
                </table>
            </li>
            <li>
                <p class="list-item">2. 产品创建成功后，点击查看，可以进入产品详情，对产品进行编辑、添加固件、添加设备等操作。</p>
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
