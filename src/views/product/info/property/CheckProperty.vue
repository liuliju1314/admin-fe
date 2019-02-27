<template>
    <el-main>
        <pre class="jsonData">{{data}}</pre>
    </el-main>
</template>

<script>
import { getPropertyList, deleteProduce } from "@/api/property/property";

export default {
    props: ["propertyJson"],
    data() {
        return {
            data: {}
        };
    },
    created() {
        this.data = this.propertyJson;
    },
    methods: {}
};
</script>
<style lang="less" scoped>
.jsonData {
    margin: 0 auto;
}
</style>