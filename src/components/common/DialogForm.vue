<template>
  <el-form
    size="medium"
    :model="Form"
    :rules="DialogFormConfig.rulesForm"
    ref="ruleForm"
    :class="isHome == true ? 'HomeForm' : ''"
    :label-width="formLabelWidth ? formLabelWidth : 'auto'"
    :disabled="formDisabled ? formDisabled : false"
  >
    <el-row :gutter="20">
      <el-col
        :span="col.span ? col.span : 12"
        v-for="col in DialogFormConfigColumns"
        :key="col.prop"
      >
        <el-form-item
          :label="`${col.label ? col.label + ':' : ''}`"
          :prop="col.prop"
          v-if="!col.hide"
        >
          <el-input
            class="colHeigt"
            v-if="col.type == 'input'"
            v-model="Form[col.prop]"
            :placeholder="`${
              col.placeholder ? col.placeholder : '请输入' + col.label
            }`"
            @focus="() => col.focus && col.focus()"
            :maxlength="col.maxlength"
            :show-word-limit="col.maxlength ? true : false"
            :disabled="col.disabled ? col.disabled : false"
            clearable
          ></el-input>
          <el-button
            type="primary"
            v-if="col.type == 'btn'"
            @click="() => col.click && col.click()"
            >{{ col.text }}</el-button
          >
          <el-input
            class="colHeigt"
            v-if="col.type === 'inputPwd'"
            v-model="Form[col.prop]"
            type="password"
            :placeholder="col.placeholder || col.label"
            :disabled="col.disabled ? col.disabled : false"
            clearable
          ></el-input>

          <el-input
            v-if="col.type === 'textarea'"
            type="textarea"
            v-model="Form[col.prop]"
            :autosize="{ minRows: 4, maxRows: 6 }"
            :maxlength="col.maxlength"
            :show-word-limit="col.maxlength ? true : false"
            :placeholder="`${
              col.placeholder ? col.placeholder : '请输入' + col.label
            }`"
            :disabled="col.disabled ? col.disabled : false"
            clearable
          ></el-input>

          <el-input-number
            class="colHeigt"
            v-if="col.type === 'number'"
            v-model="Form[col.prop]"
            :precision="0"
            :min="col.min ? col.min : 0"
            :max="col.max ? col.max : Infinity"
            style="width: 100%"
            clearable
            :placeholder="`请输入${col.label}`"
            oninput="value=value.replace(/[^\d]/g,'')"
            controls-position="right"
          >
          </el-input-number>

          <el-select
            class="colHeigt"
            v-if="col.type === 'select'"
            v-model="Form[col.prop]"
            :placeholder="`${
              col.label ? '请选择' + col.label : col.placeholder
            }`"
            style="width: 100%; height: 36px"
            :multiple="col.multiple"
            clearable
            @change="(val) => (col.onChange ? col.onChange(val) : '')"
            :filterable="col.filterable"
            :disabled="col.disabled ? col.disabled : false"
          >
            <el-option
              class="colHeigt"
              v-for="option in col.option"
              :key="option.id"
              :label="option.text"
              :value="option.id"
            ></el-option>
          </el-select>

          <el-radio-group
            v-if="col.type === 'radio'"
            v-model="Form[col.prop]"
            :disabled="col.disabled ? true : false"
          >
            <el-radio
              v-for="radio in col.radioList"
              :label="radio.value"
              :key="radio.value"
            >
              {{ radio.text }}
            </el-radio>
          </el-radio-group>
          <el-switch v-if="col.type === 'switch'" v-model="Form[col.prop]">
            :disabled="col.disabled ? true : false"
          </el-switch>

          <el-transfer
            v-if="col.type === 'transfer'"
            v-model="deptListVisible"
            :disabled="col.disabled ? true : false"
            filterable
            :filter-method="filterMethod"
            filter-placeholder="请输入搜索内容"
            :data="col.transferList"
            :titles="col.titleList"
          >
          </el-transfer>

          <quill-editor
            v-if="col.type === 'quill'"
            v-model="Form[col.prop]"
            ref="text"
            class="editor"
            :options="col.editorOption"
          />

          <tree-select
            v-if="col.type === 'popover'"
            @handleGetValue="(e) => col.handleGetValue && col.handleGetValue(e)"
            :width="100"
            :data="col.partyList"
            :defaultProps="col.defaultProps"
            v-model="Form[col.prop]"
          />
          <el-input
            class="colHeigt"
            v-if="col.type === 'selectDialog'"
            :placeholder="`请选择${col.label}`"
            readonly
            :disabled="col.disabled ? col.disabled : false"
            v-model="Form[col.prop]"
          >
            <el-button
              slot="append"
              :disabled="col.disabled ? col.disabled : false"
              type="primary"
              icon="el-icon-search"
              @click="col.click"
              >{{ col.btnText }}</el-button
            >
          </el-input>
          <el-input
            v-if="col.type === 'uploadInput'"
            :placeholder="col.label"
            v-model="Form[col.prop]"
            readonly
            class="input-with-select colHeigt"
            :disabled="col.disabled ? true : false"
          >
            <el-upload
              slot="append"
              action=""
              :auto-upload="false"
              :show-file-list="false"
              :ref="'formUploadInput' + col.prop"
              :accept="col.accept ? col.accept : 'image/*'"
              :multiple="col.multiple ? col.multiple : false"
              :disabled="col.disabled ? true : false"
              :limit="col.limit ? col.limit : false"
              :on-change="
                (file, fileList) => {
                  col.onChange ? col.onChange(file, fileList) : null;
                }
              "
            >
              <el-button
                icon="el-icon-upload"
                :disabled="col.disabled ? true : false"
              ></el-button>
            </el-upload>
          </el-input>

          <div v-if="col.type === 'uploadFile'">
            <el-input
              :placeholder="
                col.fileList.length ? col.fileListName : '请选择文件'
              "
              readonly
              :disabled="col.disabled ? col.disabled : false"
              class="input-with-select"
            >
              <!-- :headers="col.headerObj?col.headerObj:''" -->
              <el-upload
                :disabled="col.disabled ? col.disabled : false"
                slot="append"
                action=""
                :accept="col.format"
                :multiple="col.multiple ? col.multiple : false"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="
                  (file, fileList) => {
                    col.onChange(file, fileList);
                  }
                "
              >
                <el-button
                  icon="el-icon-upload"
                  :disabled="col.disabled ? col.disabled : false"
                ></el-button>
              </el-upload>
            </el-input>

            <div class="FileListup">
              <div class="content">
                <div
                  class="FileItem"
                  v-for="item in col.fileList"
                  :key="item.uid"
                >
                  <img src="@/assets/img/icon.png" />
                  <span>
                    {{ item.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div v-if="col.type === 'addinput'">
            <div
              v-for="(item, index) in col.addarray"
              :key="index"
              style="display: flex; margin-bottom: 20px"
            >
              <el-input
                v-model="Form[col.prop]"
                :placeholder="`请输入${col.label}`"
              ></el-input>
              <el-button
                style="margin-left: 20px"
                size="small"
                icon="el-icon-plus"
                @click="() => col.addClick && col.addClick()"
              ></el-button>
              <el-button
                v-show="col.addarray.length > 1"
                type="danger"
                size="small"
                icon="el-icon-delete"
                circle
                @click="() => col.delClick && col.delClick(index)"
              ></el-button>
            </div>
          </div>

          <div v-if="col.type === 'addlist'">
            <div
              class="adddatalist"
              v-for="(item, index) in col.adddatalist"
              :key="index"
            >
              <ul>
                <li>
                  <el-button
                    style="
                      background: #4d7bdf;
                      color: #fff;
                      font-size: 25px;
                      border-radius: 50%;
                    "
                    size="small"
                    icon="el-icon-plus"
                    @click="() => col.addClick && col.addClick()"
                  ></el-button>
                </li>
              </ul>
            </div>
          </div>
          <div v-if="col.type === 'uploadfm'">
            <el-upload
              class="upload-demo"
              action=""
              multiple
              :limit="1"
              :http-request="col.handleUploadOss"
              :before-upload="col.beforeUploadOss"
              :on-remove="col.handleRemove"
              :before-remove="col.beforeRemove"
              :file-list="Form.fileList"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </div>

          <div v-if="col.type === 'uploadtz'">
            <el-upload
              class="upload-demo"
              :file-list="col.fileList"
              :show-file-list="true"
              action=""
              drag
              :http-request="col.handleUploadOss"
              :before-upload="col.beforeUploadOss"
              :multiple="true"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">
                支持格式:doc(x)、xls(x)、ppt(x)、pdf、jpg、jpeg、png、mp3、mp4、rar、zip...，单个文件不能超过500MB
              </div>
            </el-upload>
          </div>
          <div v-if="col.type === 'uploadBtn'" class="uploadBtn">
            <el-upload
              class="upload"
              ref="uploadBtn"
              :style="col.style"
              action=""
              :auto-upload="false"
              :show-file-list="col.showFile ? col.showFile : false"
              :ref="'formUploadBtn' + col.prop"
              :accept="col.accept ? col.accept : 'image/*'"
              :multiple="col.multiple ? col.multiple : false"
              :disabled="col.disabled ? true : false"
              :on-change="
                (file, fileList) => {
                  col.onChange ? col.onChange(file, fileList) : null;
                }
              "
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <!-- <el-button type="primary" plain :loading="col.loading">{{
                col.buttonText
              }}</el-button> -->
            </el-upload>
            <el-button
              type="primary"
              class="assistant"
              v-preventReClick
              @click="() => col.onClick && col.onClick()"
              v-if="col.formwork"
              plain
              >{{ col.formwork }}</el-button
            >
            <!--            ? col.src : require(`@/assets/icon/zw.png`)-->
            <!--            图片预览-->
            <img
              class="prevImg"
              @mousedown.prevent
              v-if="col.prevSrc"
              :src="col.prevSrc"
            />
          </div>

          <el-date-picker
            class="colHeigt"
            v-if="col.type === 'dateTime'"
            v-model="Form[col.prop]"
            :type="col.dType ? col.dType : 'date'"
            clearable
            :disabled="col.disabled ? col.disabled() : false"
            value-format="yyyy-MM-dd"
            style="width: 100%"
            placeholder="选择日期"
            @change="(e) => col.change && col.change(e)"
          >
          </el-date-picker>
          <el-date-picker
            class="colHeigt"
            v-if="col.type === 'dateTimeRange'"
            v-model="Form[col.prop]"
            :type="col.dType ? col.dType : 'datetimerange'"
            clearable
            :value-format="col.format ? col.format : 'yyyy-MM-dd HH:mm:ss'"
            style="width: 100%"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="col.pickerOption ? col.pickerOption : true"
          >
          </el-date-picker>
          <el-button
            v-if="col.type === 'button'"
            :type="col.typelx"
            @click="
              () => {
                col.onClick ? col.onClick() : '';
              }
            "
          >
            {{ col.title }}
          </el-button>
          <el-cascader
            v-if="col.type === 'cascader'"
            :options="col.options"
            :props="col.props"
            :disabled="col.disabled ? col.disabled : false"
            clearable
            v-model="Form[col.prop]"
            @change="(val) => col.onChange && col.onChange(val)"
          ></el-cascader>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import treeSelect from "./treeSelect.vue";
export default {
  components: {
    treeSelect,
  },
  name: "DialogForm",
  props: [
    "Form",
    "DialogFormConfig",
    "formLabelWidth",
    "formDisabled",
    "isHome",
  ],
  computed: {
    DialogFormConfigColumns() {
      return this.DialogFormConfig.columns.filter((item) => item);
    },
  },
  methods: {
    fromClearFile() {
      if (this.$refs.uploadBtn) {
        this.$refs.uploadBtn.clearFiles();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.el-row {
  display: flex;
  /* flex-direction: column; */
  flex-wrap: wrap;
}
.FileListup {
  width: 100%;
  height: 160px;
  border: 1px solid #21a099;
  border-radius: 4px;
  padding: 10px 0;
  margin-top: 8px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    /* 对应纵向滚动条的宽度 */
    // width: 10px !important;
    // /* 对应横向滚动条的宽度 */
    // height: 10px !important;
    height: 6px !important;
    display: block !important;
    // border-radius: 4px !important;
    // background: #e2e6f0;
  }
  .content {
    width: 100%;
    display: flex;
    flex-direction: column;

    .FileItem {
      width: 100%;
      display: flex;

      padding: 0 10px;
      align-items: center;
      height: 28px;
      overflow: hidden;

      img {
        width: 18px;
        height: 20px;
        margin-right: 6px;
      }

      span {
        width: 300px;
        font-size: 12px;
        line-height: normal;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}
.assistant {
  position: absolute;
  right: 38%;
}
.uploadBtn {
  // position: relative;
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  .upload {
    width: 100%;
  }
}
.FileList {
  width: 100%;
  border: 1px solid #21a099;
  border-radius: 4px;
  padding: 0 10px;
  display: flex;
  flex-direction: column;

  .list {
    width: 100%;
    height: 160px;
    border-top: 1px dashed #b4d0cf;

    .content {
      width: 100%;

      .el-checkbox-group {
        display: flex;
        flex-direction: column;
      }
    }
  }
}

::v-deep .el-input__inner {
  border: 1px solid #cccaca;
}

::v-deep .el-select .el-input .el-select__caret {
  color: #21a099;
}

::v-deep .el-input-group__append,
.el-input-group__prepend {
  border: 1px solid #cccaca;
  border-left: none;
}

::v-deep .el-input.is-disabled .el-input__inner {
  border-color: rgba(33, 160, 153, 0.5);
}

::v-deep .el-input-group__append {
  .el-button {
    color: #21a099;
  }
}

.colHeigt {
  height: 36px;
}
.prevImg {
  width: 100%;
  margin: 0.5rem 0;
}
.HomeForm {
  ::v-deep .el-input__inner {
    background-color: transparent !important;
  }
  ::v-deep .el-input .el-input__inner {
    border: 1px solid rgba(1, 198, 150, 0.8);
    color: rgba(255, 255, 255, 0.8);
    &::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }
  }
  ::v-deep .el-form-item__label {
    color: rgba(255, 255, 255, 0.8);
  }
}
::v-deep .el-form-item--mini .el-form-item__label {
  white-space: nowrap !important;
}
::v-deep .ql-toolbar.ql-snow + .ql-container.ql-snow {
  height: 150px;
}
li {
  list-style: none;
}
.adddatalist {
  width: 100%;

  ul {
    width: 100%;
    display: flex;
  }
  li {
    width: 282px;
    height: 241px;
    border: 2px solid #ececec;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
