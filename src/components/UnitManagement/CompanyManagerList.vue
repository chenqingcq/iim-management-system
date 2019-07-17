
<template>
  <div class="pagination-container">
    <div class="search">
      <div class="addRobot">
        <Button type="error" @click="editRobot">{{$t('Common.addItem')}}</Button>
      </div>
      <div class="search-panel">
        <Input
          size="large"
          v-model.trim="keyWords"
          @on-search="search"
          search
          enter-button
          :placeholder="$t('Main.PersonnelManagement.staff.companyName')"
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
      :title="$t('Main.UnitManagement.companyAdmins.add')"
      :mask-closable="closable"
      footer-hide
    >
      <div class="edit-panel">
        <Form :rules="ruleInline" ref="formInline" :model="formInline">
          <FormItem prop="propertyBelonged">
            <label for="propertyBelonged">{{$t('Main.UnitManagement.companyAdmins.belong')}}</label>
            <Select
              size="large"
              v-model="formInline.propertyBelonged"
              :placeholder="$t('Main.UnitManagement.hint.plzSelectOrg')"
              style="width:100%"
            >
              <Option
                v-for="item in robotTypes"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem prop="account">
            <label for="account">{{$t('Main.UnitManagement.property.account')}}：</label>
            <Input
              v-model.trim="formInline.account"
              size="large"
              clearable
              :maxlength="50"
              :placeholder="$t('Main.UnitManagement.hint.plzIptCompanyAccount')"
              style="width: 100%"
            />
          </FormItem>
          <FormItem prop="username">
            <label for="username">{{$t('Main.UnitManagement.property.username')}}:</label>
            <Input
              v-model.trim="formInline.username"
              size="large"
              clearable
              :maxlength="50"
              :placeholder="$t('Main.UnitManagement.hint.plzIptAdmin')"
              style="width: 100%"
            />
          </FormItem>
          <FormItem prop="password">
            <label for="password">{{$t('Main.UnitManagement.property.psw')}}：</label>
            <Input
              v-model.trim="formInline.password"
              type="password"
              size="large"
              clearable
              :maxlength="50"
              :placeholder="$t('Main.UnitManagement.hint.plzIptPsw')"
              style="width: 100%"
            />
          </FormItem>
          <FormItem prop="repassword">
            <label for="repassword">{{$t('Main.ApiManagement.api.confirmPsw')}}:</label>
            <Input
              v-model.trim="formInline.repassword"
              type="password"
              size="large"
              clearable
              :maxlength="50"
              :placeholder="$t('Main.ApiManagement.hint.iptConfirm')"
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
    <Modal
      v-model="showEditModal"
      :title="$t('Main.UnitManagement.companyAdmins.edit')"
      :mask-closable="closable"
      footer-hide
    >
      <div class="edit-panel">
        <Form :rules="ruleOnline" ref="formOnline" :model="formOnline">
          <FormItem prop="account">
            <label for="account">{{$t('Main.UnitManagement.property.account')}}：</label>
            <Input
              v-model.trim="formOnline.account"
              size="large"
              clearable
              :maxlength="50"
              :placeholder="$t('Main.UnitManagement.hint.plzIptCompanyAccount')"
              style="width: 100%"
            />
          </FormItem>
          <FormItem prop="username">
            <label for="username">{{$t('Main.UnitManagement.property.username')}}:</label>
            <Input
              v-model.trim="formOnline.username"
              size="large"
              clearable
              :maxlength="50"
              :placeholder="$t('Main.UnitManagement.hint.plzIptAdmin')"
              style="width: 100%"
            />
          </FormItem>
          <FormItem prop="password">
            <label for="password">{{$t('Main.UnitManagement.property.psw')}}：</label>
            <Input
              v-model.trim="formOnline.password"
              type="password"
              size="large"
              clearable
              :maxlength="50"
              :placeholder="$t('Main.UnitManagement.hint.plzIptPsw')"
              style="width: 100%"
            />
          </FormItem>
          <FormItem prop="repassword">
            <label for="repassword">{{$t('Main.ApiManagement.api.confirmPsw')}}：</label>
            <Input
              v-model.trim="formOnline.repassword"
              type="password"
              size="large"
              clearable
              :placeholder="$t('Main.ApiManagement.hint.iptConfirm')"
              :maxlength="50"
              style="width: 100%"
            />
          </FormItem>
          <FormItem>
            <Button
              class="submit"
              type="error"
              size="large"
              @click="handleSubmit('formOnline')"
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
      showEditModal: false,
      disabled: true,
      uploadList: [],
      visible: false,
      closable: true,
      preview: false,
      previewImageSrc: "",
      defaultList: [],
      robotTypes: [
        {
          value: "ICBC-property",
          label: "招商公司"
        },
        {
          value: "iim-property",
          label: "中新公司"
        }
      ],
      ruleInline: {
        propertyBelonged: [
          {
            required: true,
            message: this.$t("Main.UnitManagement.hint.plzSelectOrg"),
            trigger: "change"
          }
        ],
        account: [
          {
            required: true,
            message: this.$t("Main.UnitManagement.hint.plzIptCompanyAccount"),
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
        ],
        repassword: [
          {
            required: true,
            message: this.$t("Main.ApiManagement.hint.iptConfirm"),
            trigger: "blur"
          }
        ]
      },
      ruleOnline: {
        propertyBelonged: [
          {
            required: true,
            message: this.$t("Main.UnitManagement.hint.plzSelectOrg"),
            trigger: "change"
          }
        ],
        account: [
          {
            required: true,
            message: this.$t("Main.UnitManagement.hint.plzIptCompanyAccount"),
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
        ],
        repassword: [
          {
            required: true,
            message: this.$t("Main.ApiManagement.hint.iptConfirm"),
            trigger: "blur"
          }
        ]
      },
      formInline: {
        propertyBelonged: "",
        productName: ""
      },
      formOnline: {
        propertyBelonged: "",
        productName: ""
      },
      columns: [
        {
          title: "管理员账户",
          key: "username"
        },
        {
          title: "管理员名称",
          key: "shenpistatus"
        },
        {
          title: "所属公司",
          key: "shenpicomments"
        },
        {
          title: "创建时间",
          key: "time"
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
                  style: {
                    marginRight: "10px"
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
    editRobot() {
      this.modal = true;
    },
    configRobot(row) {
      console.log(row);
    },
    search() {
      console.log(this.keyWords);
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
    justify-content: flex-end;
    .addRobot {
      flex: 1;
    }
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