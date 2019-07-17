<template>
  <Modal
    @on-ok="confirm"
    @on-concel="concel"
    :cancel-text="concelText"
    :closable="false"
    :value="show"
    :footer-hide="true"
    fullscreen
    :title="$t('Main.VersionManagement.upp.selectPkg')"
  >
    <div class="content">
      <Input
        class="search"
        search
        enter-button
        :placeholder="placeholder"
        size="large"
        style="width:400px;height:30px;margin:0 auto 15px"
      />
      <div class="table">
        <Table
          border
          ref="selection"
          @on-selection-change="handleSelect"
          :columns="columns4"
          :data="data1"
          size="large"
        ></Table>
      </div>
      <Form class="btns">
        <Form-Item class="operate">
          <Button @click="concel" style="margin-right:15px;width:70px">{{$t('Common.close')}}</Button>
          <Button
            type="primary"
            @click="confirm"
            style="margin-right:15px;width:70px"
          >{{$t('Common.confirm')}}</Button>
        </Form-Item>
      </Form>
    </div>
  </Modal>
</template>
<script>
export default {
  data() {
    return {
      concelText: "关闭",
      selection: null, //选择的包
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "升级包名称",
          key: "name"
        },
        {
          title: "模块名称",
          key: "module"
        },
        {
          title: "适用产品",
          key: "used"
        },
        {
          title: "大小",
          key: "size"
        },
        {
          title: "版本",
          key: "version"
        },
        {
          title: "说明",
          key: "instruction"
        }
      ],
      data1: [
        {
          name: "ego-java-server_2.3.37_all.deb",
          module: "ego-java-server",
          used:
            "IIM-SE-020,IIM-SE-030,IIM-SE-040,IIM-Ik-010,IIM-Ik-020,IIM-SO-020,IIM-EG-030,IIM-EG-020A,IIM-EG-020",
          size: "3m",
          version: "1.0",
          instruction: "age包"
        },
        {
          name: "ego-java-server_2.3.37_all.deb2",
          module: "ego-java-server2",
          used:
            "IIM-SE-020,IIM-SE-030,IIM-SE-040,IIM-Ik-010,IIM-Ik-020,IIM-SO-020,IIM-EG-030,IIM-EG-020A,IIM-EG-020",
          size: "3m",
          version: "1.0",
          instruction: "age包"
        },
        {
          name: "ego-java-server_2.3.37_all.deb",
          module: "ego-java-server",
          used:
            "IIM-SE-020,IIM-SE-030,IIM-SE-040,IIM-Ik-010,IIM-Ik-020,IIM-SO-020,IIM-EG-030,IIM-EG-020A,IIM-EG-020",
          size: "3m",
          version: "1.0",
          instruction: "age包"
        },
        {
          name: "ego-java-server_2.3.37_all.deb",
          module: "ego-java-server",
          used:
            "IIM-SE-020,IIM-SE-030,IIM-SE-040,IIM-Ik-010,IIM-Ik-020,IIM-SO-020,IIM-EG-030,IIM-EG-020A,IIM-EG-020",
          size: "3m",
          version: "1.0",
          instruction: "age包"
        },
        {
          name: "ego-java-server_2.3.37_all.deb",
          module: "ego-java-server",
          used:
            "IIM-SE-020,IIM-SE-030,IIM-SE-040,IIM-Ik-010,IIM-Ik-020,IIM-SO-020,IIM-EG-030,IIM-EG-020A,IIM-EG-020",
          size: "3m",
          version: "1.0",
          instruction: "age包"
        },
        {
          name: "ego-java-server_2.3.37_all.deb",
          module: "ego-java-server",
          used:
            "IIM-SE-020,IIM-SE-030,IIM-SE-040,IIM-Ik-010,IIM-Ik-020,IIM-SO-020,IIM-EG-030,IIM-EG-020A,IIM-EG-020",
          size: "3m",
          version: "1.0",
          instruction: "age包"
        },
        {
          name: "ego-java-server_2.3.37_all.deb",
          module: "ego-java-server",
          used:
            "IIM-SE-020,IIM-SE-030,IIM-SE-040,IIM-Ik-010,IIM-Ik-020,IIM-SO-020,IIM-EG-030,IIM-EG-020A,IIM-EG-020",
          size: "3m",
          version: "1.0",
          instruction: "age包"
        },
        {
          name: "ego-java-server_2.3.37_all.deb",
          module: "ego-java-server",
          used:
            "IIM-SE-020,IIM-SE-030,IIM-SE-040,IIM-Ik-010,IIM-Ik-020,IIM-SO-020,IIM-EG-030,IIM-EG-020A,IIM-EG-020",
          size: "3m",
          version: "1.0",
          instruction: "age包"
        },
        {
          name: "ego-java-server_2.3.37_all.deb",
          module: "ego-java-server",
          used:
            "IIM-SE-020,IIM-SE-030,IIM-SE-040,IIM-Ik-010,IIM-Ik-020,IIM-SO-020,IIM-EG-030,IIM-EG-020A,IIM-EG-020",
          size: "3m",
          version: "1.0",
          instruction: "age包"
        },
        {
          name: "ego-java-server_2.3.37_all.deb",
          module: "ego-java-server",
          used:
            "IIM-SE-020,IIM-SE-030,IIM-SE-040,IIM-Ik-010,IIM-Ik-020,IIM-SO-020,IIM-EG-030,IIM-EG-020A,IIM-EG-020",
          size: "3m",
          version: "1.0",
          instruction: "age包"
        }
      ]
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    placeholder() {
      return `${this.$t("Main.VersionManagement.hint.plzSelectPkg")}`;
    }
  },
  methods: {
    handleSelect(selection) {
      this.selection = selection;
    },
    confirm() {
      this.$emit("confirm", this.selection);
    },
    concel() {
      this.$emit("concel");
    }
  },
  mounted() {
    window.addEventListener("keydown", e => {
      if (e.keyCode == 27) {
        this.concel();
      }
    });
  }
};
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  > div {
    width: 100%;
    &.table {
      flex: 1;
      overflow-y: auto;
    }
  }
  form {
    height: 35px; /*no*/
    border-top: 1px solid #e8eaec;
    padding-top: 10px;
    &.btns {
      .operate {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }
  }
}
</style>
