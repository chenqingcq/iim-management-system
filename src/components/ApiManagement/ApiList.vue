
<template>
  <div class="pagination-container">
    <div class="table">
      <Table border :columns="columns" :data="data" size="large"></Table>
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
      class="modal"
      :title="$t('Main.ApiManagement.api.edit')"
      :mask-closable="closable"
      footer-hide
    >
      <div class="edit-panel">
        <Form :rules="ruleInline" ref="formInline" :model="formInline">
          <FormItem prop="userAccount">
            <label for="userAccount">{{$t('Main.ApiManagement.api.account')}}:</label>
            <Input
              id="personnelName"
              v-model.trim="formInline.userAccount"
              size="large"
              clearable
              :placeholder="$t('Main.ApiManagement.hint.iptAccount')"
              style="width: 100%"
            />
          </FormItem>
          <FormItem prop="appKey">
            <label for="appKey">{{$t('Main.ApiManagement.api.AppKey')}}:</label>
            <Input
              v-model.trim="formInline.appKey"
              size="large"
              clearable
              :placeholder="$t('Main.ApiManagement.hint.iptApk')"
              style="width: 100%"
            />
          </FormItem>
          <FormItem prop="MasterSecret">
            <label for="personnelName">Master secret：</label>
            <Input
              v-model.trim="formInline.MasterSecret"
              size="large"
              clearable
              :placeholder="$t('Main.ApiManagement.hint.iptSrt')"
              style="width: 100%"
            />
          </FormItem>
          <FormItem prop="organization">
            <label for="organization">{{$t('Main.ApiManagement.api.org')}}:</label>
            <Input
              v-model.trim="formInline.organization"
              size="large"
              clearable
              :placeholder="$t('Main.ApiManagement.hint.iptOrg')"
              style="width: 100%"
            />
          </FormItem>
          <FormItem prop="netUrl">
            <label for="netUrl">{{$t('Main.ApiManagement.api.url')}}:</label>
            <Input
              v-model.trim="formInline.netUrl"
              size="large"
              clearable
              :placeholder="$t('Main.ApiManagement.hint.iptUrl')"
              style="width: 100%"
            />
          </FormItem>
          <FormItem prop="email">
            <label for="email">{{$t('Main.ApiManagement.api.email')}}:</label>
            <Input
              v-model.trim="formInline.email"
              size="large"
              clearable
              :placeholder="$t('Main.ApiManagement.hint.iptEmail')"
              style="width: 100%"
            />
          </FormItem>
          <FormItem prop="telephone">
            <label for="telephone">{{$t('Main.ApiManagement.api.tel')}}:</label>
            <Input
              v-model.trim.number="formInline.telephone"
              size="large"
              clearable
              :placeholder="$t('Main.ApiManagement.hint.iptTel')"
              style="width: 100%"
            />
          </FormItem>
          <FormItem prop="unitBelonged">
            <label for="unitBelonged">{{$t('Main.ApiManagement.api.belong')}}:</label>
            <Select
              size="large"
              v-model="formInline.unitBelonged"
              :placeholder="$t('Main.ApiManagement.hint.iptBelong')"
              style="width:100%"
            >
              <Option
                v-for="item in authorities"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem prop="password">
            <label for="password">{{$t('Main.ApiManagement.api.newPsw')}}:</label>
            <Input
              type="password"
              v-model.trim="formInline.password"
              size="large"
              clearable
              :placeholder="$t('Main.ApiManagement.hint.iptNewPsw')"
              style="width: 100%"
            />
          </FormItem>
          <FormItem prop="confirmPwd">
            <label for="confirmPwd">{{$t('Main.ApiManagement.api.confirmPsw')}}:</label>
            <Input
              v-model.trim="formInline.confirmPwd"
              type="password"
              size="large"
              clearable
              :placeholder="$t('Main.ApiManagement.hint.iptConfirm')"
              style="width: 100%"
            />
          </FormItem>
          <FormItem class="submit">
            <Button
              class="submit"
              type="error"
              size="large"
              @click="handleSubmit('formInline')"
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
    return {
      keyWords: "",
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
        userAccount: [
          {
            required: true,
            message: this.$t("Main.ApiManagement.hint.iptAccount"),
            trigger: "blur"
          }
        ],
        MasterSecret: [
          {
            required: true,
            message: this.$t("Main.ApiManagement.hint.iptSrt"),
            trigger: "blur"
          }
        ],
        organization: [
          {
            required: true,
            message: this.$t("Main.ApiManagement.hint.iptOrg"),
            trigger: "blur"
          }
        ],
        netUrl: [
          {
            required: true,
            message: this.$t("Main.ApiManagement.hint.iptUrl"),
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: this.$t("Main.ApiManagement.hint.iptEmail"),
            trigger: "blur"
          }
        ],
        appKey: [
          {
            required: true,
            message: this.$t("Main.ApiManagement.hint.iptApk"),
            trigger: "blur"
          }
        ],
        telephone: [
          {
            required: true,
            message: this.$t("Main.ApiManagement.hint.iptTel"),
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: this.$t("Main.ApiManagement.hint.iptNewPsw"),
            trigger: "blur"
          }
        ],
        confirmPwd: [
          {
            required: true,
            message: this.$t("Main.ApiManagement.hint.iptConfirm"),
            trigger: "blur"
          }
        ],
        unitBelonged: [
          {
            required: true,
            message: this.$t("Main.ApiManagement.hint.iptBelong"),
            trigger: "change",
            type: "string"
          }
        ]
      },
      formInline: {
        userAccount: "",
        MasterSecret: "",
        organization: "",
        netUrl: "",
        email: "",
        appKey: "",
        telephone: "",
        password: "",
        confirmPwd: "",
        unitBelonged: ""
      },
      authorities: [
        {
          value: "xiaoweifeng112",
          label: "小微蜂"
        },
        {
          value: "modernX",
          label: "摩登克斯"
        }
      ],
      columns: [
        {
          title: "用户账户",
          key: "username"
        },
        {
          title: "组织名称",
          key: "shenpistatus"
        },
        {
          title: "AppKey",
          key: "AppKey"
        },
        {
          title: "Master Secret",
          key: "secret"
        },
        {
          title: "所属单位",
          key: "unit"
        },
        {
          title: "URL",
          key: "URL"
        },
        {
          title: "联系邮箱",
          key: "email"
        },
        {
          title: "联系电话",
          key: "phone"
        },
        {
          title: "创建时间",
          key: "createTime"
        },
        {
          title: "操作",
          key: "action",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "large"
                  },
                  on: {
                    click: () => {
                      console.log(params.row);
                      this.editPersonnel(params.row);
                    }
                  }
                },
                this.$t("Common.edit")
              )
            ]);
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
  watch: {
    $route(val, oldval) {
      if (val.query) {
        this.query = val.query.path;
      }
    }
  },
  computed: {
    uploadUrl() {
      return `${process.env.BASE_IMG_URL}/app/2.0.0/register/picture`;
    }
  },
  methods: {
    search() {
      console.log(this.keyWords);
    },
    hidePreview() {
      this.preview = false;
    },
    showPreview() {
      this.preview = true;
    },
    handleRemove() {
      this.uploadList = [];
    },
    handleView(file) {
      this.visible = true;
    },
    handleProgress(event, file, fileList) {
      console.log(event, file, fileList);
    },
    handleError(error, file, fileList) {
      this.$Message.error("文件上传失败。");
    },
    handleSuccess(response, file, fileList) {
      console.log(response, file, fileList);
      if (response.code === 1) {
        this.uploadList = [
          {
            src: `${BASE_IMG_URL}${response.data.url}`
          }
        ];
      } else {
        this.uploadList = [];
      }
    },
    handleBeforeUpload() {
      this.previewImageSrc = "";
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: "Up to five pictures can be uploaded."
        });
      }
      return check;
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: this.$t("Common.overSize"),
        desc: `${this.$t("Common.file")} ${file.name} ${this.$t(
          "Common.limit"
        )}`
      });
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: this.$t("Common.formateError"),
        desc: `${this.$t("Common.file")} ${file.name} ${this.$t(
          "Common.formateError"
        )} , ${this.$t("Common.require")}`
      });
    },
    changepage(page) {
      console.log(page);
    },
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
    editPersonnel(row) {
      this.modal = true;
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        console.log(valid);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.edit-panel {
  height: 500px; /*no*/
  padding-bottom: 35px; /*no*/
  position: relative;
  form {
    width: 80%;
    height: 100%;
    padding: 0 30px;
    overflow-y: auto;
    .submit {
      position: absolute;
      bottom: -10px; /*no*/
      right: 30px; /*no*/
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
    width: 100%;
    display: block;
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
    justify-content: flex-end;
    .search-panel {
      width: 500px;
      height: 100%;
      > div {
        height: 100%;
        input {
          height: 100% !important;
        }
      }
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