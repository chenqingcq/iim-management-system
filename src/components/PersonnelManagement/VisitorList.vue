
<template>
  <div class="pagination-container">
    <div class="search">
      <div class="search-panel">
        <Input
          style="height:35px;width:400px"
          size="large"
          v-model.trim="keyWords"
          @on-search="search"
          search
          enter-button
          :placeholder="placeholder"
        />
      </div>
    </div>
    <div class="table">
      <Table border :columns="columns" :data="data" size="large" stripe></Table>
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
      :title="$t('Main.PersonnelManagement.visitor.editVisitor')"
      :mask-closable="closable"
      footer-hide
    >
      <div class="edit-panel">
        <Form :rules="ruleInline" ref="formInline" :model="formInline">
          <FormItem>
            <label for="avator">{{$t('Main.PersonnelManagement.staff.upload')}}:</label>
            <Upload
              ref="upload"
              :show-upload-list="false"
              :default-file-list="defaultList"
              :on-success="handleSuccess"
              :format="['jpg','jpeg','png']"
              :max-size="imageSize"
              :disable="disabled"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :before-upload="handleBeforeUpload"
              type="drag"
              :on-error="handleError"
              :action="imageUploadUrl"
              style="display: inline-block;width:58px;"
            >
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="ios-person-outline" size="20"></Icon>
              </div>
            </Upload>
            <template>
              <div
                class="uploadedImage"
                v-for="(item,index) in uploadList"
                :key="index"
                @mouseenter="showPreview"
                @mouseleave="hidePreview"
              >
                <img :src="item.src" alt />
                <Icon
                  class="previewAvator"
                  v-show="preview"
                  :title="$t('Main.PersonnelManagement.staff.preview')"
                  type="ios-eye-outline"
                  @click.native="handleView(item)"
                ></Icon>
                <Icon
                  :title="$t('Main.PersonnelManagement.staff.deleteAvatar')"
                  v-show="preview"
                  class="deleteAvator"
                  type="ios-trash-outline"
                  @click.native="handleRemove(item)"
                ></Icon>
              </div>
            </template>
          </FormItem>
          <FormItem prop="personnelName">
            <label for="personnelName">{{this.$t('Main.PersonnelManagement.visitor.visitorName')}}：</label>
            <Input
              id="personnelName"
              v-model.trim="formInline.personnelName"
              size="large"
              clearable
              :placeholder="$t('Main.PersonnelManagement.hint.plzInputVisitor')"
              style="width: 100%"
            />
          </FormItem>
          <FormItem prop="phoneNumber">
            <label for="personnelName">{{this.$t('Main.PersonnelManagement.staff.telephone')}}：</label>
            <Input
              v-model.number="formInline.phoneNumber"
              size="large"
              clearable
              :placeholder="$t('Main.PersonnelManagement.hint.plzInputTelephone')"
              style="width: 100%"
            />
          </FormItem>
          <FormItem prop="stripValue">
            <label for="personnelName">{{this.$t('Main.PersonnelManagement.staff.throtle')}}:</label>
            <Input
              v-model.number.trim="formInline.stripValue"
              size="large"
              clearable
              :placeholder="$t('Main.PersonnelManagement.hint.plzInputThrotle')"
              style="width: 100%"
            />
          </FormItem>
          <FormItem prop="authority">
            <label for="personnelName">{{this.$t('Main.PersonnelManagement.staff.authority')}}:</label>
            <Select
              size="large"
              v-model="formInline.authority"
              :placeholder="$t('Main.PersonnelManagement.staff.authority')"
              style="width:100%"
            >
              <Option
                v-for="item in authorities"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button
              class="submit"
              type="error"
              size="large"
              @click="handleSubmit('formInline')"
            >{{this.$t('Common.submit')}}</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>
    <Modal v-model="visible" :title="$t('Main.PersonnelManagement.staff.preview')">
      <div class="preview-dialog" v-for="(item,index) in uploadList" :key="index">
        <img :src="item.src" alt />
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: "VisitorList",
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
        personnelName: [
          {
            required: true,
            message: this.$t("Main.PersonnelManagement.hint.plzInputVisitor"),
            trigger: "blur"
          }
        ],
        phoneNumber: [
          {
            required: true,
            message: this.$t("Main.PersonnelManagement.hint.plzInputTelephone"),
            trigger: "blur"
          }
        ],
        stripValue: [
          {
            required: true,
            message: this.$t("Main.PersonnelManagement.hint.plzInputThrotle"),
            trigger: "blur"
          }
        ]
      },
      formInline: {
        personnelName: "",
        phoneNumber: "",
        stripValue: "",
        authority: ""
      },
      authorities: [
        {
          value: 0,
          label: this.$t("Main.PersonnelManagement.staff.talk")
        },
        {
          value: 1,
          label: this.$t("Main.PersonnelManagement.staff.NTalk")
        }
      ],
      columns: [
        {
          title: "头像",
          key: "username"
        },
        {
          title: "名称",
          key: "shenpistatus"
        },
        {
          title: "有效日期",
          key: "shenpicomments"
        },
        {
          title: "电话号码",
          key: "time"
        },
        {
          title: "所属物业",
          key: "property"
        },
        {
          title: "所属分组",
          key: "group"
        },
        {
          title: "权重",
          key: "level"
        },
        {
          title: "机器权限",
          key: "authority"
        },
        {
          title: "是否授权",
          key: "priority"
        },
        {
          title: "注册类型",
          key: "type"
        },
        {
          title: "到访提醒",
          key: "notice"
        },
        {
          title: "创建时间",
          key: "createTime"
        },
        {
          title: "备注",
          key: "remark"
        },
        {
          title: "操作",
          key: "action",
          width: this.$i18n.locale == "ru" ? "250px" : "200px",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "large"
                  },
                  class: "edit",
                  style: {
                    marginRight: "20px"
                  },
                  on: {
                    click: () => {
                      console.log(params.row);
                      this.editPersonnel(params.row);
                    }
                  }
                },
                this.$t("Common.edit")
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
  computed: {
    imageUploadUrl() {
      return `${process.env.BASE_API}/app/2.0.0/register/picture`;
    },
    placeholder() {
      return `${this.$t(
        "Main.PersonnelManagement.staff.companyName"
      )} / ${this.$t("Main.PersonnelManagement.visitor.visitorName")} `;
    }
  },
  watch: {
    $route(val, oldval) {
      if (val.query) {
        this.query = val.query.path;
      }
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
        loading: true,
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
.edit {
  margin-right: 20px;
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
    width: 300px;
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
  overflow-y: auto;
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