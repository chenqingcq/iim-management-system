
<template>
  <div class="pagination-container">
    <div class="search">
      <div class="addRobot">
        <Button type="error" @click="editRobot">{{$t("Common.addItem")}}</Button>
      </div>
      <div class="search-panel">
        <Input
          size="large"
          v-model.trim="keyWords"
          @on-search="search"
          search
          enter-button
          :placeholder="$t('Main.RobotsManagement.hint.plzIptOrg')"
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
      :title="$t('Main.RobotsManagement.robotList.edit')"
      :mask-closable="closable"
      footer-hide
    >
      <div class="edit-panel">
        <Form :rules="ruleInline" ref="formInline" :model="formInline">
          <FormItem prop="MacAddress">
            <label for="MacAddress">{{$t('Main.RobotsManagement.robotList.mac')}} :</label>
            <Input
              id="personnelName"
              v-model.trim="formInline.MacAddress"
              size="large"
              clearable
              :placeholder="$t('Main.RobotsManagement.hint.plzIptMac')"
              style="width: 100%"
            />
          </FormItem>
          <FormItem prop="robotName">
            <label for="robotName">{{$t('Main.RobotsManagement.robotList.name')}} :</label>
            <Input
              v-model.trim="formInline.robotName"
              size="large"
              clearable
              :placeholder="$t('Main.RobotsManagement.hint.plzIptRobotName')"
              style="width: 100%"
            />
          </FormItem>
          <FormItem prop="robotVersion">
            <label for="robotVersion">{{$t('Main.RobotsManagement.robotList.version')}} ：</label>
            <Input
              v-model.trim="formInline.robotVersion"
              size="large"
              clearable
              :placeholder="$t('Main.RobotsManagement.hint.plzIptRobotVersion')"
              style="width: 100%"
            />
          </FormItem>
          <FormItem prop="robotType">
            <label for="robotType">{{$t('Main.RobotsManagement.robotList.type')}}:</label>
            <Select
              size="large"
              v-model="formInline.robotType"
              :placeholder="$t('Main.RobotsManagement.hint.plzIptRobotType')"
              style="width:100%"
            >
              <Option
                v-for="item in robotTypes"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem prop="productType">
            <label for="productType">{{$t('Main.RobotsManagement.robotList.productType')}}:</label>
            <Select
              size="large"
              v-model="formInline.productType"
              :placeholder="$t('Main.RobotsManagement.hint.plzIptProType')"
              style="width:100%"
            >
              <Option
                v-for="item in productTypes"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem prop="unitBelonged">
            <label for="unitBelonged">{{$t('Main.RobotsManagement.robotList.belong')}}:</label>
            <Input
              v-model.trim="formInline.unitBelonged"
              size="large"
              clearable
              :placeholder="$t('Main.RobotsManagement.hint.plzIptBelonged')"
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
      v-model="showConfigModal"
      :title="$t('Main.RobotsManagement.robotList.port')"
      :mask-closable="closable"
      footer-hide
    >
      <div class="edit-panel">
        <Form :rules="ruleInline_config" ref="formInline_config" :model="formInline_config">
          <FormItem prop="port">
            <label for="port">{{$t('Main.RobotsManagement.robotList.port')}} ：</label>
            <Input
              v-model.trim="formInline_config.port"
              size="large"
              clearable
              :placeholder="$t('Main.RobotsManagement.hint.plzIptPort')"
              style="width: 100%"
            />
          </FormItem>
          <FormItem>
            <Button
              class="submit"
              type="error"
              size="large"
              @click="handleSubmitConfig('formInline_config')"
            >{{$t('Common.submit')}}</Button>
            <Button
              class="submit"
              style="margin-right:15px"
              size="large"
              @click="handleConcel"
            >{{$t('Common.concel')}}</Button>
          </FormItem>
        </Form>
      </div>
      <div class="edit-panel">
        <Form :rules="ruleInline_feature" ref="formInline_feature" :model="formInline_feature">
          <FormItem>
            <label>{{$t('Main.RobotsManagement.robotList.synchronize')}}:</label>
            <Button
              type="error"
              style="margin:15px 15px 0 0;width:auto"
              size="large"
              @click="handleCloudData"
            >{{$t('Main.RobotsManagement.robotList.synchronize')}}</Button>
          </FormItem>
          <FormItem prop="feature">
            <label for="feature">{{$t('Main.RobotsManagement.robotList.feature')}}</label>
            <Select
              size="large"
              v-model="formInline_feature.feature"
              :placeholder="$t('Main.RobotsManagement.robotList.select')"
              style="width:100%"
            >
              <Option v-for="item in company" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Button
              type="error"
              style="margin:15px 15px 0 0 ;width:auto"
              size="large"
              @click="handleFeature('formInline_feature')"
            >{{$t('Main.RobotsManagement.robotList.feature')}}</Button>
          </FormItem>
        </Form>
      </div>
      <div class="edit-panel import-robot">
        <Form>
          <FormItem prop="port">
            <label for="avator">{{$t('Main.RobotsManagement.robotList.import')}}:</label>
            <Upload
              ref="upload"
              type="drag"
              :action="imageUploadUrl"
              style="display: inline-block;width:58px;"
            >
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="ios-person-outline" size="20"></Icon>
              </div>
            </Upload>
          </FormItem>
          <FormItem>
            <Button
              class="submit"
              type="error"
              size="large"
              @click="handleSubmitImport"
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
      showConfigModal: false,
      disabled: true,
      uploadList: [],
      visible: false,
      closable: true,
      preview: false,
      previewImageSrc: "",
      defaultList: [],
      ruleInline: {
        MacAddress: [
          {
            required: true,
            message: this.$t("Main.RobotsManagement.hint.plzIptMac"),
            trigger: "blur"
          }
        ],
        robotName: [
          {
            required: true,
            message: this.$t("Main.RobotsManagement.hint.plzIptRobotName"),
            trigger: "blur"
          }
        ],
        robotVersion: [
          {
            required: true,
            message: this.$t("Main.RobotsManagement.hint.plzIptRobotVersion"),
            trigger: "blur"
          }
        ],
        unitBelonged: [
          {
            required: true,
            message: this.$t("Main.RobotsManagement.hint.plzIptBelonged"),
            trigger: "blur"
          }
        ]
      },
      ruleInline_config: {
        port: [
          {
            required: true,
            message: this.$t("Main.RobotsManagement.hint.plzIptPort"),
            trigger: "blur"
          }
        ]
      },
      ruleInline_feature: {
        featrue: [
          {
            required: true,
            message: this.$t(
              "Main.PersonnelManagement.access.selectOrganization"
            ),
            trigger: "change"
          }
        ]
      },
      formInline: {
        MacAddress: "",
        robotName: "",
        robotVersion: "",
        robotType: "",
        unitBelonged: ""
      },
      formInline_config: {
        port: ""
      },
      formInline_feature: {
        featrue: ""
      },
      robotTypes: [
        {
          value: 0,
          label: "Solary"
        },
        {
          value: 1,
          label: "Ego"
        }
      ],
      productTypes: [
        {
          value: "IIM-SE-020",
          label: "IIM-SE-020"
        },
        {
          value: "IIM-SE-030",
          label: "IIM-SE-030"
        }
      ],
      company: [
        {
          value: "Micro-soft",
          label: "Micro-soft"
        },
        {
          value: "Apple",
          label: "Apple"
        }
      ],
      columns: [
        {
          title: "机器人类型",
          key: "username"
        },
        {
          title: "SN序列号",
          key: "shenpistatus"
        },
        {
          title: "机器人名称",
          key: "shenpicomments"
        },
        {
          title: "机器人版本",
          key: "time"
        },
        {
          title: "机器人版本",
          key: "robotVersion"
        },
        {
          title: "产品类型",
          key: "product"
        },
        {
          title: "所属物业/单位",
          key: "unit"
        },
        {
          title: "物业/单位ID",
          key: "id"
        },
        {
          title: "是否在线",
          key: "online"
        },
        {
          title: "操作",
          key: "action",
          width: this.$i18n.locale == "ru" ? "360px" : "250px",
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
                    type: "warning",
                    size: "large"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.configRobot(params.row);
                    }
                  }
                },
                this.$t("Common.config")
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
  computed: {
    imageUploadUrl() {
      return `${process.env.BASE_API}/app/2.0.0/register/picture`;
    }
  },
  methods: {
    handleCloudData() {
      console.log("一键同步");
    },
    handleConcel() {
      this.showConfigModal = false;
    },
    editRobot() {
      this.modal = true;
    },
    configRobot(row) {
      console.log(row);
      this.showConfigModal = true;
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
      this.modal = true;
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        console.log(valid);
      });
    },
    handleSubmitConfig(name) {
      this.$refs[name].validate(valid => {
        console.log(valid);
      });
    },
    handleFeature(name) {
      console.log(this.formInline_feature.feature, name);
      this.$refs[name].validate(valid => {
        console.log(valid);
      });
    },
    handleSubmitImport() {
      console.log("批量导入");
    }
  }
};
</script>
<style lang="less" scoped>
.edit-panel {
  border-bottom: 1px solid #e8eaec;
  &.import-robot {
    border: none;
  }
}
.edit-panel form button.submit {
  float: right;
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