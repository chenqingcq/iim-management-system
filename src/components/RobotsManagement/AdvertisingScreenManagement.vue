
<template>
  <div class="pagination-container advertising-container">
    <div class="table">
      <Table border :columns="columns" :data="data" size="large" stripe></Table>
    </div>
    <Modal v-model="modal" title="新增产品类型" :mask-closable="closable" footer-hide>
      <div class="edit-panel">
        <Form :rules="ruleInline" ref="formInline" :model="formInline">
          <FormItem prop="productType">
            <label for="productType">产品型号:(50字内)：</label>
            <Input
              id="personnelName"
              v-model.trim="formInline.productType"
              size="large"
              :maxlength="50"
              clearable
              placeholder="请输入产品型号"
              style="width: 100%"
            />
          </FormItem>
          <FormItem prop="productName">
            <label for="productName">产品名称：(50字内)</label>
            <Input
              v-model.trim="formInline.productName"
              size="large"
              clearable
              :maxlength="50"
              placeholder="请输入产品名称"
              style="width: 100%"
            />
          </FormItem>
          <FormItem prop="stripValue">
            <label for="personnelName">说明：(200字以内)</label>
            <Input
              v-model.trim="formInline.stripValue"
              type="textarea"
              :rows:="4"
              :maxlength="200"
              size="large"
              clearable
              style="width: 100%;height:80px"
            />
          </FormItem>
          <FormItem>
            <Button class="submit" type="error" size="large" @click="handleSubmit('formInline')">提交</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>
    <Modal v-model="visible" title="查看头像">
      <div class="preview-dialog" v-for="(item,index) in uploadList" :key="index">
        <img :src="item.src" alt />
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
        productType: [
          {
            required: true,
            message: "请输入产品型号",
            trigger: "blur"
          }
        ],
        productName: [
          {
            required: true,
            message: "请输入产品名称",
            trigger: "blur"
          }
        ]
      },
      formInline: {
        productType: "",
        productName: ""
      },
      columns: [
        {
          title: this.$t("Main.RobotsManagement.adsScreen.title.screen"),
          key: "screen"
        },
        {
          title: this.$t("Main.RobotsManagement.adsScreen.title.one"),
          key: "screen-1",
          render: (h, params) => {
            console.log(params);
            return h("div", [
              h(
                "img",
                {
                  attrs: {
                    src: require("../../assets/images/robot.png")
                  },
                  class: "screen",
                  on: {
                    click(e) {
                      console.log(params, e);
                      if (!e.target.classList.contains("active")) {
                        e.target.classList.add("active");
                      } else {
                        e.target.classList.remove("active");
                      }
                    }
                  }
                },
                ""
              )
            ]);
          }
        },
        {
          title: this.$t("Main.RobotsManagement.adsScreen.title.two"),
          key: "screen-2",
          render: (h, params) => {
            console.log(params);
            return h("div", [
              h(
                "img",
                {
                  attrs: {
                    src: require("../../assets/images/robot.png")
                  },
                  class: "screen",
                  on: {
                    click(e) {
                      console.log(params, e);
                      if (!e.target.classList.contains("active")) {
                        e.target.classList.add("active");
                      } else {
                        e.target.classList.remove("active");
                      }
                    }
                  }
                },
                ""
              )
            ]);
          }
        },
        {
          title: this.$t("Main.RobotsManagement.adsScreen.title.three"),
          key: "screen-3",
          render: (h, params) => {
            console.log(params);
            return h("div", [
              h(
                "img",
                {
                  attrs: {
                    src: require("../../assets/images/robot.png")
                  },
                  class: "screen",
                  on: {
                    click(e) {
                      console.log(params, e);
                      if (!e.target.classList.contains("active")) {
                        e.target.classList.add("active");
                      } else {
                        e.target.classList.remove("active");
                      }
                    }
                  }
                },
                ""
              )
            ]);
          }
        },
        {
          title: this.$t("Main.RobotsManagement.adsScreen.title.four"),
          key: "screen-4",
          render: (h, params) => {
            return h("div", [
              h(
                "img",
                {
                  attrs: {
                    src: require("../../assets/images/robot.png")
                  },
                  class: "screen",
                  on: {
                    click(e) {
                      console.log(params, e);
                      if (!e.target.classList.contains("active")) {
                        e.target.classList.add("active");
                      } else {
                        e.target.classList.remove("active");
                      }
                    }
                  }
                },
                ""
              )
            ]);
          }
        }
      ],
      data: [
        {
          screen: this.$t("Main.RobotsManagement.adsScreen.main"),
          ["screen-1"]: "../../assets/images/robot.png",
          ["screen-2"]: "../../assets/images/robot.png",
          ["screen-3"]: "../../assets/images/robot.png",
          ["screen-4"]: "../../assets/images/robot.png"
        },
        {
          screen: this.$t("Main.RobotsManagement.adsScreen.front"),
          ["screen-1"]: "../../assets/images/robot.png",
          ["screen-2"]: "../../assets/images/robot.png",
          ["screen-3"]: "../../assets/images/robot.png",
          ["screen-4"]: "../../assets/images/robot.png"
        },
        {
          screen: this.$t("Main.RobotsManagement.adsScreen.left"),
          ["screen-1"]: "../../assets/images/robot.png",
          ["screen-2"]: "../../assets/images/robot.png",
          ["screen-3"]: "../../assets/images/robot.png",
          ["screen-4"]: "../../assets/images/robot.png"
        },
        {
          screen: this.$t("Main.RobotsManagement.adsScreen.right"),
          ["screen-1"]: "../../assets/images/robot.png",
          ["screen-2"]: "../../assets/images/robot.png",
          ["screen-3"]: "../../assets/images/robot.png",
          ["screen-4"]: "../../assets/images/robot.png"
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
  // height: calc(100% + 50px + 45px);
  position: relative;
  overflow: hidden;
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
    height: calc(100%);
    margin-top: 10px;
    overflow-y: auto;
    overflow-x: hidden;
    border-left: 1px solid #e8eaec; /*no*/
    border-top: 1px solid #e8eaec; /*no*/
    border-bottom: 1px solid #e8eaec; /*no*/
    box-sizing: border-box;
  }
}
</style>