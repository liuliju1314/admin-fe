<template>
  <div>
    <el-form ref="firewareForm" :model="firewareForm" label-width="80px">
    <el-form-item label="UID">
        <el-input v-model="firewareForm.fwID" disabled="disabled"></el-input>
    </el-form-item>
    <el-form-item label="固件版本">
        <el-input v-model="firewareForm.version"></el-input>
    </el-form-item>
    <el-form-item label="固件分组">
        <el-select v-model="firewareForm.group">
            <el-option label="正式版" value="release"></el-option>
            <el-option label="测试版" value="develop"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="升级描述">
        <el-input type="textarea" v-model="firewareForm.desc"></el-input>
    </el-form-item>
    </el-form>
  </div>
</template>

<script>

  export default {
    name:'',
    props:['firewareForm'],
    data () {
      return {

      };
    },

    components: {},

    computed: {},

    created() {
        this.firewareForm.group = this.firewareForm.group;
    },

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style lang='' scoped>

</style>