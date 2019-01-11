<template>
    <el-form ref="form" :model="form" label-width="100px" :rules="formRules" v-model="labelPosition" class="form-box" size="mini">
      <el-form-item label="属性名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="标识符" prop="label">
        <el-input v-model="form.label"></el-input>
      </el-form-item>
      <el-form-item label="属性类型" prop="propType">
        <el-select v-model="form.propType" placeholder="请选择类型">
          <el-option label="布尔型" value="BOOL"></el-option>
          <el-option label="数值型" value="NUMBER"></el-option>
          <el-option label="字符型" value="STRING"></el-option>
          <el-option label="枚举型" value="ENUM"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="读写属性" prop="permission">
        <el-radio-group v-model="form.permission">
          <el-radio label="RW">RW</el-radio>
          <el-radio label="RO">RO</el-radio>
          <el-radio label="WO">WO</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="历史数据" prop="history">
        <el-radio-group v-model="form.history">
          <el-radio label="true">保存</el-radio>
          <el-radio label="false">丢弃</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="采样值" prop="instant">
        <el-radio-group v-model="form.instant">
          <el-radio label="true">瞬时采样</el-radio>
          <el-radio label="false">时间段累积采样</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="默认值">
        <el-input v-model="form.default"></el-input>
      </el-form-item>
      <div class="rain-box">
          <el-form-item label="枚举项：">
              <div>
                <span style="display: inline-block; width: 43%">属性值: </span>
                <span style="display: inline-block; width: 40%">属性描述:</span>
              </div>
              <div class="rain-item" v-for="(item,index) in form.metadata" :key="index" style="margin: 0px 0px 10px 0px;">
                  <el-input v-model.number="item.propertyValue" class="small-width"></el-input>
                  <span class="span" style="display: inline-block;width: 3%;text-align: center">~</span>
                  <el-input v-model.number="item.propertyDesc" class="small-width"></el-input>
                  <el-button type="text" @click="deleteProperty(index)" style="display: inline-block;margin-left: 10px">删除</el-button>
              </div>
              <el-button type="text" @click="addProperty">+ 添加枚举</el-button>
          </el-form-item>
      </div>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>

    </el-form>
</template>

<script>

  export default {
    data () {
      return {
        labelPosition: 'right',
        form: {
          name: '',
          label: '',
          propType: '',
          permission: '',
          history: '',
          instant: '',
          desc: '',
          default: '',  
          metadata: [{ propertyValue: "", propertyDesc: "" }]
        },
        formRules: {
          name: [
            { required: true, message: '请输入属性名称', trigger: 'blur' },
          ],
          label: [
            { required: true, message: '请输入属性标识符', trigger: 'blur' },
          ],
          propType: [
            { required: true, message: '请输入属性名称', trigger: 'blur' },
          ],
          permission: [
            { required: true, message: '请输入属性名称', trigger: 'blur' },
          ],
          history: [
            { required: true, message: '请输入属性名称', trigger: 'blur' },
          ],
          instant: [
            { required: true, message: '请输入属性名称', trigger: 'blur' },
          ],
        }
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
        addProperty() {
            this.form.metadata.push({ propertyValue: "", propertyDesc: "" });
        },
        deleteProperty(index) {
            this.form.metadata.splice(index, 1);
        },
        //验证表单信息是否为空
        submitForm() {
          this.$refs.form.validate(valid => {
                if (valid) {
                    alert('submit!');
                } else {
                    return false;
                }
            });
        },
        resetForm() {
          this.$refs.form.resetFields();
        }
        
    },

    watch: {}

  }

</script>
<style lang='less' scoped>
  .form-box {
        width: 60%;
        margin: auto;
  }
  .small-width {
      width: 40%;
  }
</style>