export default {
    methods: {
        copyPid(pid) {
            let aux = document.createElement("input"); // 创建元素用于复制
            // 获取复制内容
            let content = pid;
            // 设置元素内容
            aux.setAttribute("value", content);
            // 将元素插入页面进行调用
            document.body.appendChild(aux);
            // 复制内容
            aux.select();
            //aux.setSelectionRange(0, inputText.value.length);
            // 将内容复制到剪贴板
            document.execCommand("copy", true);
            // 删除创建元素
            document.body.removeChild(aux);
            this.$message({
                type: "success",
                message: "复制成功"
            });
        }
    }
}