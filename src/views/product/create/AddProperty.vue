<template>
    <el-form ref="propertForm" :model="propertForm" label-width="100px" :rules="formRules" v-model="labelPosition" class="form-box" size="mini">
      <el-form-item label="属性名称" prop="name">
        <el-input v-model="propertForm.name"></el-input>
      </el-form-item>
      <el-form-item label="标识符" prop="label">
        <el-input v-model="propertForm.label"></el-input>
      </el-form-item>
      <el-form-item label="属性类型" prop="propType">
        <el-select v-model="propertForm.propType" placeholder="请选择类型">
          <el-option label="布尔型" value="BOOL"></el-option>
          <el-option label="数值型" value="NUMBER"></el-option>
          <el-option label="字符型" value="STRING"></el-option>
          <el-option label="枚举型" value="ENUM"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="读写属性" prop="permission">
        <el-radio-group v-model="propertForm.permission">
          <el-radio label="RW">RW</el-radio>
          <el-radio label="RO">RO</el-radio>
          <el-radio label="WO">WO</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="历史数据" prop="history" >
        <el-radio-group v-model="propertForm.history"> 
          <el-radio :label="true">保存</el-radio>
          <el-radio :label="false">丢弃</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="采样值" prop="instant">
        <el-radio-group v-model="propertForm.instant">
          <el-radio :label="true">瞬时采样</el-radio>
          <el-radio :label="false">时间段累积采样</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="默认值">
        <el-input v-model="propertForm.default"></el-input>
      </el-form-item>
      <div class="rain-box">
          <el-form-item label="枚举项：">
              <div>
                <span style="display: inline-block; width: 43%">属性值: </span>
                <span style="display: inline-block; width: 40%">属性描述:</span>
              </div>
              <div class="rain-item" v-for="(item,index) in propertForm.metadata" :key="index" style="margin: 0px 0px 10px 0px;">
                  <el-input v-model.number="item.propertyValue" class="small-width"></el-input>
                  <span class="span" style="display: inline-block;width: 3%;text-align: center">~</span>
                  <el-input v-model.number="item.propertyDesc" class="small-width"></el-input>
                  <el-button type="text" @click="deleteEnumerate(index)" style="display: inline-block;margin-left: 10px">删除</el-button>
              </div>
              <el-button type="text" @click="addEnumerate">+ 添加枚举</el-button>
          </el-form-item>
      </div>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="propertForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
          <el-button size="small" plain @click="handleNext(false)">上一步</el-button>
          <el-button type="primary" size="small" @click="handleNext(true)">下一步</el-button>
      </el-form-item>

    </el-form>
    <!-- <el-form
        ref="baseInfoForm"
        :model="baseInfoForm"
        label-width="90px"
        size="small"
        :rules="formRules"
    >
        <el-form-item label="产品型号" prop="model">
            <el-input v-model="baseInfoForm.model"></el-input>
        </el-form-item>
        <el-form-item label="产品名称" prop="name">
            <el-input v-model="baseInfoForm.name"></el-input>
        </el-form-item>
        <el-form-item label="产品类型" prop="category">
            <el-input v-model="baseInfoForm.category"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="baseInfoForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button size="small" plain @click="handleNext(false)">上一步</el-button>
            <el-button type="primary" size="small" @click="handleNext(true)">下一步</el-button>
        </el-form-item>
    </el-form> -->
</template>

<script>
import { addProperty } from "@/api/property/property";

export default {
  components: {},
  props: {},
  data() {
      return {
        labelPosition: 'right',
        propertForm: {
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
  watch: {},
  computed: {},
  methods: {
    handleNext(value) {
      this.$emit("listenNext", value);
    },
            addEnumerate() {
            this.propertForm.metadata.push({ propertyValue: "", propertyDesc: "" });
        },
        deleteEnumerate(index) {
            this.propertForm.metadata.splice(index, 1);
        },
        //验证表单信息是否为空
        submitForm() {
          this.$refs.propertForm.validate(valid => {
                if (valid) {
                    addProperty(this.propertForm)
                      .then(() => {
                      })
                      .catch(() => {
                      });
                } else {
                    return false;
                }
            });
        },
        resetForm() {
          this.$refs.propertForm.resetFields();
        } 
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
  .form-box {
        // width: 60%;
        margin: auto;
  }
  .small-width {
      width: 40%;
  }
</style>