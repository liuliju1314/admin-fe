<template>
    <el-form ref="form" :model="form" label-width="100px"  v-model="labelPosition">
      <el-form-item label="属性名称">
        <el-input v-model="form.name" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="数据点名称">
        <el-input v-model="form.label" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="属性类型">
        <el-select v-model="form.propType" placeholder="请选择活动区域">
          <el-option label="布尔型" value="BOOL"></el-option>
          <el-option label="数值型" value="NUMBER"></el-option>
          <el-option label="字符型" value="STRING"></el-option>
          <el-option label="枚举型" value="ENUM"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="读写属性">
        <el-input v-model="form.permission" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="保存历史">
        <el-radio-group v-model="form.history">
          <el-radio label="yes">是</el-radio>
          <el-radio label="no">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="采样值">
        <el-radio-group v-model="form.instant">
          <el-radio label="瞬时采样"></el-radio>
          <el-radio label="时间段累积采样"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="默认值">
        <el-input v-model="form.default" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="描述" style="width: 400px">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      
      

      
    </el-form>
</template>

<script>

  export default {
    name:'',
    props:[''],
    data () {
      return {
        labelPosition: 'right',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style lang='' scoped>

</style>