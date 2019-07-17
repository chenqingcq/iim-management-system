
<template>
  <div class="pagination-container">
    <div class="search">
      <Button
        type="error"
        style="width:auto;height:35px"
        @click="addVersion"
      >{{$t('Common.upload')}}</Button>
    </div>
    <div class="table">
      <Table border :columns="columns" :data="data" stripe></Table>
    </div>
    <Page
      class="pagination"
      :total="dataCount"
      :page-size="pageSize"
      show-total
      show-elevator
      @on-change="changepage"
    />
    <Modal
      v-model="modal"
      :title="$t('Main.VersionManagement.upk.uploadPkg')"
      :mask-closable="closable"
      footer-hide
    >
      <div class="edit-panel">
        <Form :rules="ruleInline" ref="formInline" :model="formInline">
          <FormItem prop="upgratePkg">
            <label for="upgratePkg">{{$t('Main.VersionManagement.upk.pkg')}}:</label>
            <Upload action="//jsonplaceholder.typicode.com/posts/" :before-upload="handleUpload">
              <Button
                icon="ios-cloud-upload-outline"
              >{{$t('Main.VersionManagement.version.select')}}</Button>
            </Upload>
          </FormItem>
          <FormItem prop="moduleName">
            <label for="moduleName">{{$t('Main.VersionManagement.robotModule.moduleName')}}:</label>
            <Select
              size="large"
              v-model="formInline.moduleName"
              :placeholder="$t('Main.VersionManagement.hint.plzSelectModuleName')"
              style="width:100%"
            >
              <Option
                v-for="item in authorities"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem prop="product">
            <label for="product">{{$t('Main.VersionManagement.upk.useProduct')}}:</label>
            <Select
              size="large"
              v-model="formInline.product"
              :placeholder="$t('Main.VersionManagement.hint.plzSelectProduct')"
              style="width:100%"
            >
              <Option
                v-for="item in authorities"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem prop="instruction">
            <label for="instruction">{{$t('Main.VersionManagement.upk.desc')}}：</label>
            <Input
              v-model.trim="formInline.instruction"
              type="textarea"
              :rows:="4"
              size="large"
              clearable
              style="width: 100%;height:80px"
            />
          </FormItem>
          <FormItem>
            <Button
              class="submit"
              type="error"
              size="large"
              @click="handleSubmit('formInline')"
              :loading="loading"
            >{{$t('Common.submit')}}</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: "PersonnelList",
  data() {
    const validateUpload = (rule, value, callback) => {
      console.log(rule, value, callback);
      if (this.formInline.upgratePkg === null) {
        callback(new Error("请选择要上传的文件"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      forceUpdated: "0",
      pageSize: 10,
      dataCount: 20,
      imageSize: 1024 * 5,
      modal: false,
      disabled: true,
      uploadList: [],
      visible: false,
      closable: true,
      preview: false,
      previewImageSrc: "",
      defaultList: [],
      ruleInline: {
        upgratePkg: [
          {
            required: true,
            message: this.$t("Main.VersionManagement.hint.plzUploadPkg"),
            trigger: "change",
            validator: validateUpload
          }
        ],
        product: [
          {
            required: true,
            message: this.$t("Main.VersionManagement.hint.plzSelectProduct"),
            trigger: "change"
          }
        ],
        moduleName: [
          {
            required: true,
            message: this.$t("Main.VersionManagement.hint.plzSelectModuleName"),
            trigger: "change"
          }
        ]
      },
      formInline: {
        upgratePkg: null,
        moduleName: "",
        product: "",
        instuctions: ""
      },
      authorities: [
        {
          value: "age-models",
          label: "age-models"
        },
        {
          value: "boost",
          label: "boost"
        }
      ],
      columns: [
        {
          title: "序号",
          key: "username"
        },
        {
          title: "升级包名称",
          key: "shenpistatus"
        },
        {
          title: "模块名称",
          key: "shenpicomments"
        },
        {
          title: "适用产品",
          key: "time"
        },
        {
          title: "大小",
          key: "size"
        },
        {
          title: "上传时间",
          key: "uploadTime"
        },
        {
          title: "版本",
          key: "version"
        },
        {
          title: "说明",
          key: "instruction"
        },
        {
          title: "操作",
          key: "action",
          render: (h, params) => {
            return h(
              "div",
              {
                style: {
                  display: "flex",
                  justifyContent: "center"
                }
              },
              [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary"
                    },
                    class: "edit",
                    style: {
                      marginRight: "10px",
                      width: "auto",
                      padding: " 0 15px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexDirection: "row-reverse"
                    },
                    on: {
                      click: () => {
                        console.log(params.row);
                        this.download(params.row);
                      }
                    }
                  },
                  this.$t("Common.download")
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "large"
                    },
                    on: {
                      click: () => {
                        this.deletePersonnel(params.row);
                      }
                    }
                  },
                  this.$t("Common.delete")
                )
              ]
            );
          }
        }
      ],
      data: [
        {
          username: "智能审批",
          shenpistatus: "审批已通过",
          shenpicomments: "自动审批通过",
          time: "2017-07-24 18:11"
        },
        {
          username: "智能审批",
          shenpistatus: "审批已通过",
          shenpicomments: "自动审批通过",
          time: "2017-07-24 18:11"
        },
        {
          username: "智能审批",
          shenpistatus: "审批已通过",
          shenpicomments: "自动审批通过",
          time: "2017-07-24 10:04"
        },
        {
          username: "智能审批",
          shenpistatus: "审批被拒绝",
          shenpicomments: "  收入 > 999 && 支出 < 201",
          time: "2017-07-24 10:03"
        },
        {
          username: "智能审批",
          shenpistatus: "审批被拒绝",
          shenpicomments: "  收入 > 999 && 支出 < 201",
          time: "2017-07-24 10:02"
        },
        {
          username: "智能审批",
          shenpistatus: "审批已通过",
          shenpicomments: "自动审批通过",
          time: "2017-07-24 10:02"
        },
        {
          username: "智能审批",
          shenpistatus: "审批被拒绝",
          shenpicomments: "自动审批通过",
          time: "2017-07-24 10:01"
        },
        {
          username: "智能审批",
          shenpistatus: "审批被拒绝",
          shenpicomments: "自动审批通过",
          time: "2017-07-24 09:56"
        },
        {
          username: "智能审批",
          shenpistatus: "审批被拒绝",
          shenpicomments: "自动审批通过",
          time: "2017-07-21 14:23"
        },
        {
          username: "智能审批",
          shenpistatus: "审批被拒绝",
          shenpicomments:
            "  收入 > 999 && 支出 < 201 && 所有项目的总净收入 > 5000",
          time: "2017-07-21 14:23"
        },
        {
          username: "智能审批",
          shenpistatus: "审批被拒绝",
          shenpicomments: "自动审批通过",
          time: "2017-07-21 14:23"
        },
        {
          username: "智能审批",
          shenpistatus: "审批被拒绝",
          shenpicomments:
            "  收入 > 999 && 支出 < 201 && 所有项目的总净收入 > 5000",
          time: "2017-07-21 14:23"
        },
        {
          username: "智能审批",
          shenpistatus: "审批被拒绝",
          shenpicomments:
            "  收入 > 999 && 支出 < 201 && 所有项目的总净收入 > 5000",
          time: "2017-07-21 14:23"
        },
        {
          username: "智能审批",
          shenpistatus: "审批被拒绝",
          shenpicomments:
            "  收入 > 999 && 支出 < 201 && 所有项目的总净收入 > 5000",
          time: "2017-07-21 14:21"
        },
        {
          username: "智能审批",
          shenpistatus: "审批被拒绝",
          shenpicomments: "自动审批通过",
          time: "2017-07-21 14:21"
        },
        {
          username: "智能审批",
          shenpistatus: "审批被拒绝",
          shenpicomments: "自动审批通过",
          time: "2017-07-21 14:20"
        },
        {
          username: "智能审批",
          shenpistatus: "审批被拒绝",
          shenpicomments:
            "  收入 > 999 && 支出 < 201 && 所有项目的总净收入 > 5000",
          time: "2017-07-21 14:20"
        },
        {
          username: "智能审批",
          shenpistatus: "审批被拒绝",
          shenpicomments: "自动审批通过",
          time: "2017-07-21 14:14"
        },
        {
          username: "智能审批",
          shenpistatus: "审批被拒绝",
          shenpicomments: "自动审批通过",
          time: "2017-07-21 14:13"
        },
        {
          username: "智能审批",
          shenpistatus: "审批被拒绝",
          shenpicomments: "自动审批通过",
          time: "2017-07-21 14:11"
        },
        {
          username: "智能审批",
          shenpistatus: "审批被拒绝",
          shenpicomments: "自动审批通过",
          time: "2017-07-21 14:10"
        },
        {
          username: "智能审批",
          shenpistatus: "审批被拒绝",
          shenpicomments:
            "  收入 > 999 && 支出 < 201 && 所有项目的总净收入 > 5000",
          time: "2017-07-20 18:09"
        },
        {
          username: "智能审批",
          shenpistatus: "审批被拒绝",
          shenpicomments:
            "  收入 > 999 && 支出 < 201 && 所有项目的总净收入 > 5000",
          time: "2017-07-20 18:08"
        },
        {
          username: "智能审批",
          shenpistatus: "审批被拒绝",
          shenpicomments:
            "  收入 > 999 && 支出 < 201 && 所有项目的总净收入 > 5000",
          time: "2017-07-20 18:08"
        },
        {
          username: "智能审批",
          shenpistatus: "审批被拒绝",
          shenpicomments: "自动审批通过",
          time: "2017-07-20 18:07"
        },
        {
          username: "智能审批",
          shenpistatus: "审批被拒绝",
          shenpicomments: "自动审批通过",
          time: "2017-07-20 18:05"
        },
        {
          username: "智能审批",
          shenpistatus: "审批已通过",
          shenpicomments: "wedfqw",
          time: "2017-07-20 15:50"
        },
        {
          username: "智能审批",
          shenpistatus: "审批已通过",
          shenpicomments: "wedfqw",
          time: "2017-07-20 15:20"
        },
        {
          username: "智能审批1",
          shenpistatus: "审批被拒绝",
          shenpicomments: "自动审批通过",
          time: "2017-07-19 18:27"
        }
      ]
    };
  },
  methods: {
    async deletePersonnel(row) {
      console.log(row);
      this.$toast.confirm({
        title: this.$t("Common.confirm"),
        content: `${this.$t("Common.deleteItem")} ${row.username}?`,
        onConcelText: this.$t("Common.concel"),
        onOkText: this.$t("Common.confirm"),
        onOk: () => {
          setTimeout(() => {
            this.$Message.info("Asynchronously close the dialog box");
          }, 2000);
        }
      });
    },
    /* 上传excal坐标文件 */
    handleUpload(file) {
      // 将获取到的文件流赋值给fromData
      this.formInline.upgratePkg = file;
      // 选择文件后触发验证关闭错误提示
      this.$refs["formInline"].validate(() => {});
    },
    download(file) {
      console.log(file);
      const file_target = document.createElement("a"); // 创建a标签
      file_target.setAttribute("download", ""); // download属性
      file_target.setAttribute(
        "href",
        "https://codeload.github.com/douban/douban-client/legacy.zip/master"
      ); // href链接
      file_target.click(); // 自执行点击事件
    },
    editPersonnel(row) {
      this.modal = true;
    },
    addVersion() {
      this.modal = true;
      this.loading = false;
    },
    changepage(page) {
      console.log(page);
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        console.log(valid);
        if (valid) {
          // this.loading = true;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
button.edit {
  font-size: 20px;
  span {
    margin-right: 5px; /*no*/
  }
}
.forceUpdated {
  margin-bottom: 10px;
  > div {
    > div {
      width: 200px; /*no*/
      display: flex;
    }
  }
}
.ivu-input {
  height: 100%;
}
.preview-dialog {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    display: block;
    width: 100%;
    height: 300px;
  }
}
.uploadedImage {
  width: 59px; /*no*/
  height: 59px; /*no*/
  margin-left: 40px;
  position: relative;
  display: inline-block;
  > img {
    display: inline-block;
    width: 100%;
    height: 100%;
    border: 1px dashed #dcdee2;
  }
  i {
    position: absolute;
    top: 50%;
    font-size: 30px;
    left: 50%;
    transform: translate(-50%, -50%);
    &.deleteAvator {
      color: #ed4014;
      font-weight: bold;
      left: 75%;
    }
    &.previewAvator {
      color: #333;
      left: 33%;
    }
    &:hover {
      cursor: pointer;
    }
  }
}
.pagination-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow-x: hidden;
  .search {
    height: 45px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    button {
      margin-right: 20px;
    }
  }
  .table {
    height: calc(100% - 50px - 45px);
    margin-top: 10px;
    overflow-y: auto;
    border-left: 1px solid #e8eaec; /*no*/
    border-top: 1px solid #e8eaec; /*no*/
    border-bottom: 1px solid #e8eaec; /*no*/
    box-sizing: border-box;
  }
  .pagination {
    width: 100%;
    height: 50px;
    background: #fff;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
}
</style>