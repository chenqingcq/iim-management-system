
<template>
  <div class="pagination-container">
    <div class="search">
      <Button
        type="error"
        style="width:auto;height:40px"
        @click="addVersion"
      >{{$t('Main.VersionManagement.upp.create')}}</Button>
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
      :title="$t('Main.VersionManagement.upp.title')"
      :mask-closable="closable"
      footer-hide
    >
      <div class="edit-panel">
        <Form :rules="ruleInline" ref="formInline" :model="formInline">
          <FormItem prop="planName">
            <label for="planName">{{$t('Main.VersionManagement.upp.plan')}}：</label>
            <Input
              v-model.trim="formInline.planName"
              :rows:="4"
              size="large"
              clearable
              :placeholder="$t('Main.VersionManagement.hint.plzInputPlanName')"
              style="width: 100%;"
            />
          </FormItem>
          <FormItem prop="planContent">
            <label for="planContent">{{$t('Main.VersionManagement.upp.content')}}：</label>
            <Input
              v-model.trim="formInline.planContent"
              type="textarea"
              :rows:="4"
              size="large"
              clearable
              style="width: 100%;height:60px"
            />
          </FormItem>
          <FormItem prop="upgratePkg">
            <label for="personnelName">{{$t('Main.VersionManagement.upp.selectPkg')}}：</label>
            <span
              class="select-upgrate-param"
              @click="handleSelectPkg"
            >{{$t('Main.VersionManagement.upp.tapSelectPkg')}}</span>
          </FormItem>
          <FormItem prop="upgrateRage">
            <label for="personnelName">{{$t('Main.VersionManagement.upp.selectRange')}}：</label>
            <span
              class="select-upgrate-param"
              @click="handleSelectRange"
            >{{$t('Main.VersionManagement.upp.tapSelectRange')}}</span>
          </FormItem>
          <FormItem prop="upgrateTime">
            <label for="personnelName">{{$t('Main.VersionManagement.upp.time')}}：</label>
            <div>
              <RadioGroup v-model="upgrateTime" size="large">
                <Radio label="0">
                  <span>{{$t('Main.VersionManagement.upp.immiedate')}}</span>
                </Radio>
                <Radio label="1">
                  <span>{{$t('Main.VersionManagement.upp.appointTime')}}</span>
                  <DatePicker
                    type="date"
                    v-model="date"
                    :placeholder="$t('Main.VersionManagement.upp.selectDate')"
                    style="width: 200px;marginLeft:20px"
                    :confirm="true"
                  ></DatePicker>
                </Radio>
              </RadioGroup>
            </div>
          </FormItem>
          <FormItem prop="illustration">
            <label for="illustration">{{$t('Main.VersionManagement.upk.desc')}}:</label>
            <Input
              clear
              v-model.trim="formInline.illustration"
              type="textarea"
              :rows:="4"
              size="large"
              clearable
              style="width: 100%;height:60px"
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
    <select-pkg
      :show="showSelectPkg"
      @confirm="hangdleSelectPkgConfirm"
      @concel="handleSelectPkgConcel"
    ></select-pkg>
    <select-range
      :show="showSelectRange"
      @confirm="hangdleSelectRangeConfirm"
      @concel="hangdleSelectRangeConcel"
    ></select-range>
  </div>
</template>
<script>
import selectPkg from "./SelectPkg/SelectPkg";
import selectRange from "./SelectPkg/SelectRange";
export default {
  name: "PersonnelList",
  data() {
    return {
      showSelectPkg: false, //选择升级包弹框
      showSelectRange: false, //选择升级包范围
      upgrateTime: +new Date(),
      date: "",
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
        planName: [
          {
            required: true,
            message: this.$t("Main.VersionManagement.hint.plzInputPlanName"),
            trigger: "blur"
          }
        ],
        planContent: [
          {
            required: true,
            message: this.$t("Main.VersionManagement.hint.plzInputPlanContent"),
            trigger: "blur"
          }
        ],
        illustration: [
          {
            required: true,
            message: this.$t("Main.VersionManagement.hint.plzInputPlanDesc"),
            trigger: "blur"
          }
        ]
      },
      formInline: {
        planName: "",
        planContent: "",
        stripValue: "",
        illustration: ""
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
          title: "序号",
          key: "username"
        },
        {
          title: "计划名称",
          key: "shenpistatus"
        },
        {
          title: "升级内容",
          key: "shenpicomments"
        },
        {
          title: "升级包",
          key: "time"
        },
        {
          title: "状态",
          key: "status"
        },
        {
          title: "创建时间",
          key: "createTime"
        },
        {
          title: "升级时间",
          key: "upgrateTime"
        },
        {
          title: "升级范围",
          key: "range"
        },
        {
          title: "操作",
          key: "action",
          width: this.$i18n.locale == "ru" ? "250px" : "200px",
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
    hangdleSelectPkgConfirm(val) {
      console.log(val);
      this.showSelectPkg = false;
    },
    handleSelectPkgConcel() {
      this.showSelectPkg = false;
    },
    hangdleSelectRangeConfirm(val) {
      console.log(val);
      this.showSelectRange = false;
    },
    hangdleSelectRangeConcel() {
      this.showSelectRange = false;
    },
    handleSelectPkg() {
      this.showSelectPkg = true;
    },
    handleSelectRange() {
      this.showSelectRange = true;
    },
    editPersonnel(row) {
      this.modal = true;
    },
    addVersion() {
      this.modal = true;
    },
    changepage(page) {
      console.log(page);
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        console.log(valid);
      });
    }
  },
  components: {
    selectPkg,
    selectRange
  }
};
</script>
<style lang="less" scoped>
.ivu-form-item {
  margin-bottom: 10px;
}
.select-upgrate-param {
  color: #2db7f5;
  &:hover {
    cursor: pointer;
    color: #2d8cf0;
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