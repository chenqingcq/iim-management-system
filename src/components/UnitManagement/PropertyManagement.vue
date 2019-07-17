
<template>
  <div class="pagination-container">
    <div class="search">
      <Button
        type="error"
        size="large"
        class="addproperty"
        @click="addproperty"
      >{{$t('Common.addItem')}}</Button>
      <div class="search-panel">
        <Input
          size="large"
          v-model.trim="keyWords"
          @on-search="search"
          search
          enter-button
          :placeholder="$t('Main.UnitManagement.property.name')"
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
      :title="$t('Main.UnitManagement.property.add')"
      :mask-closable="closable"
      footer-hide
    >
      <div class="edit-panel">
        <Form :rules="ruleInline" ref="formInline" :model="formInline">
          <FormItem>
            <label for="avator">{{$t('Main.UnitManagement.property.logo')}}:</label>
            <Upload
              :title="$t('Common.upload')"
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
              action="http://hk.iimiim.cn:7099/app/2.0.0/register/picture"
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
                  :title="$t('Common.preview')"
                  type="ios-eye-outline"
                  @click.native="handleView(item)"
                ></Icon>
                <Icon
                  :title="$t('Common.delete')"
                  v-show="preview"
                  class="deleteAvator"
                  type="ios-trash-outline"
                  @click.native="handleRemove(item)"
                ></Icon>
              </div>
            </template>
          </FormItem>
          <FormItem prop="propertyName">
            <label for="propertyName">{{$t('Main.UnitManagement.property.name')}}:</label>
            <Input
              id="propertyName"
              v-model.trim="formInline.propertyName"
              size="large"
              clearable
              :placeholder="$t('Main.UnitManagement.hint.plzIptProperty')"
              style="width: 100%"
            />
          </FormItem>
          <FormItem prop="account">
            <label for="account">{{$t('Main.UnitManagement.property.account')}}：</label>
            <Input
              v-model.trim.number="formInline.account"
              size="large"
              clearable
              :placeholder="$t('Main.UnitManagement.hint.plzIptpropertyAccount')"
              style="width: 100%"
            />
          </FormItem>
          <FormItem prop="username">
            <label for="username">{{$t('Main.UnitManagement.property.username')}}：</label>
            <Input
              v-model.trim="formInline.username"
              size="large"
              clearable
              :placeholder="$t('Main.UnitManagement.hint.plzIptAdmin')"
              style="width: 100%"
            />
          </FormItem>
          <FormItem prop="password">
            <label for="password">{{$t('Main.UnitManagement.property.psw')}}:</label>
            <Input
              v-model.trim="formInline.password"
              size="large"
              type="password"
              clearable
              :placeholder="$t('Main.UnitManagement.hint.plzIptPsw')"
              style="width: 100%"
            />
          </FormItem>
          <FormItem>
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
    <Modal v-model="visible" :title="$t('Common.preview')">
      <div class="preview-dialog" v-for="(item,index) in uploadList" :key="index">
        <img :src="item.src" alt />
      </div>
    </Modal>
    <Modal v-model="showEditModal" :title="$t('Main.UnitManagement.property.edit')" footer-hide>
      <div class="edit-panel">
        <Form :rules="ruleOnline" ref="formOnline" :model="formOnline">
          <FormItem>
            <label for="avator">{{$t('Main.UnitManagement.property.logo')}}:</label>
            <Upload
              :title="$t('Common.upload')"
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
              action="http://hk.iimiim.cn:7099/app/2.0.0/register/picture"
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
                  :title="$t('Common.preview')"
                  type="ios-eye-outline"
                  @click.native="handleView(item)"
                ></Icon>
                <Icon
                  :title="$t('Common.delete')"
                  v-show="preview"
                  class="deleteAvator"
                  type="ios-trash-outline"
                  @click.native="handleRemove(item)"
                ></Icon>
              </div>
            </template>
          </FormItem>
          <FormItem prop="propertyNameEdit">
            <label for="propertyNameEdit">{{$t('Main.UnitManagement.property.name')}}：</label>
            <Input
              id="propertyName"
              v-model.trim="formOnline.propertyNameEdit"
              size="large"
              clearable
              :placeholder="$t('Main.UnitManagement.hint.plzIptProperty')"
              style="width: 100%"
            />
          </FormItem>
          <FormItem>
            <Button
              class="submit"
              type="error"
              size="large"
              @click="handleEditSubmit('formOnline')"
            >{{$t("Common.submit")}}</Button>
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
      showEditModal: false,
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
        propertyName: [
          {
            required: true,
            message: this.$t("Main.UnitManagement.hint.plzIptProperty"),
            trigger: "blur"
          }
        ],
        account: [
          {
            required: true,
            message: this.$t("Main.UnitManagement.hint.plzIptpropertyAccount"),
            trigger: "blur"
          }
        ],
        username: [
          {
            required: true,
            message: this.$t("Main.UnitManagement.hint.plzIptAdmin"),
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: this.$t("Main.UnitManagement.hint.plzIptPsw"),
            trigger: "blur"
          }
        ]
      },
      formInline: {
        propertyName: "",
        phoneNumber: "",
        stripValue: "",
        authority: ""
      },
      ruleOnline: {
        propertyNameEdit: [
          {
            required: true,
            message: this.$t("Main.UnitManagement.hint.plzIptProperty"),
            trigger: "blur"
          }
        ]
      },
      formOnline: {
        propertyNameEdit: ""
      },
      authorities: [
        {
          value: 0,
          label: "开门说话"
        },
        {
          value: 1,
          label: "开门不说话"
        }
      ],
      columns: [
        {
          title: "物业logo",
          key: "username"
        },
        {
          title: "物业名称",
          key: "shenpistatus"
        },
        {
          title: "公司数目",
          key: "shenpicomments"
        },
        {
          title: "机器人数目",
          key: "time"
        },
        {
          title: "主账号",
          key: "account"
        },
        {
          title: "子管理员数目",
          key: "manager"
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
                  style: {
                    marginRight: "10px"
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
  methods: {
    addproperty() {
      this.modal = true;
    },
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
      this.showEditModal = true;
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        console.log(valid);
      });
    },
    handleEditSubmit(name) {
      this.$refs[name].validate(valid => {
        console.log(valid);
      });
    }
  }
};
</script>
<style lang="less" scoped>
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
    align-items: center;
    position: relative;
    .search-panel {
      position: absolute;
      right: 0;
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