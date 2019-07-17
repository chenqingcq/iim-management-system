
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
          :placeholder="placeholder"
        />
      </div>
    </div>
    <div class="table">
      <Table border :columns="columns" :data="data" size="large" ref="table" stripe></Table>
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
      :title="$t('Main.UnitManagement.company.add')"
      :mask-closable="closable"
      footer-hide
    >
      <div class="edit-panel edit-company-panel">
        <Form :rules="ruleInline" ref="formInline" :model="formInline">
          <FormItem>
            <label for="avator">{{$t('Main.UnitManagement.company.logo')}}:</label>
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
            <label for="propertyName">{{$t('Main.UnitManagement.company.name')}}:</label>
            <Input
              id="propertyName"
              v-model.trim="formInline.propertyName"
              size="large"
              clearable
              :placeholder="$t('Main.UnitManagement.hint.plzIptCompany')"
              style="width: 100%"
            />
          </FormItem>
          <FormItem prop="address">
            <label for="address">{{$t('Main.UnitManagement.company.address')}}:</label>
            <Input
              id="propertyName"
              v-model.trim="formInline.address"
              size="large"
              clearable
              :placeholder="$t('Main.UnitManagement.hint.plzIptAddress')"
              style="width: 100%"
            />
          </FormItem>
          <FormItem prop="account">
            <label for="account">{{$t('Main.UnitManagement.property.account')}}:</label>
            <Input
              v-model.trim.number="formInline.account"
              size="large"
              clearable
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
              :placeholder="$t('Main.UnitManagement.hint.plzIptAdmin')"
              style="width: 100%"
            />
          </FormItem>
          <FormItem prop="unitBelonged">
            <label for="unitBelonged">{{$t('Main.UnitManagement.company.belong')}}:</label>
            <Input
              v-model.trim="formInline.unitBelonged"
              size="large"
              clearable
              :placeholder="$t('Main.UnitManagement.hint.plzSelectOrg')"
              style="width: 100%"
            />
          </FormItem>
          <FormItem prop="modelVersion">
            <label for="modelVersion">{{$t('Main.UnitManagement.company.version')}}:</label>
            <Select
              size="large"
              v-model="formInline.modelVersion"
              :placeholder="$t('Main.UnitManagement.hint.plzSelectVersion')"
              style="width:100%"
            >
              <Option
                v-for="item in modelVersions"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem prop="scanable">
            <label for="scanable">{{$t('Main.UnitManagement.company.scan')}}:</label>
            <Select
              size="large"
              v-model="formInline.scanable"
              :placeholder="$t('Main.UnitManagement.hint.plzSelectScan')"
              style="width:100%"
            >
              <Option
                v-for="item in scanability"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem prop="level">
            <label for="level">{{$t('Main.UnitManagement.company.threshold')}}:</label>
            <Input
              v-model.trim="formInline.level"
              size="large"
              clearable
              :placeholder="$t('Main.UnitManagement.hint.plzIptThrotle')"
              style="width: 100%"
            />
          </FormItem>
        </Form>
        <Button
          class="submit"
          type="error"
          size="large"
          @click="handleSubmit('formInline')"
        >{{$t("Common.submit")}}</Button>
      </div>
    </Modal>
    <Modal v-model="visible" :title="$t('Common.preview')">
      <div class="preview-dialog" v-for="(item,index) in uploadList" :key="index">
        <img :src="item.src" alt />
      </div>
    </Modal>
    <Modal v-model="showEditModal" :title="$t('Main.UnitManagement.company.edit')" footer-hide>
      <div class="edit-panel edit-company-panel">
        <Form :rules="ruleOnline" ref="formOnline" :model="formOnline">
          <FormItem>
            <label for="avator">{{$t('Main.UnitManagement.company.logo')}}:</label>
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
            <label for="propertyNameEdit">{{$t('Main.UnitManagement.company.name')}}:</label>
            <Input
              id="propertyName"
              v-model.trim="formOnline.propertyNameEdit"
              size="large"
              clearable
              :placeholder="$t('Main.UnitManagement.hint.plzIptCompany')"
              style="width: 100%"
            />
          </FormItem>
          <FormItem prop="workHours">
            <label for="workHours">{{$t('Main.UnitManagement.company.time')}}:</label>
            <TimePicker
              confirm
              placement="bottom-end"
              v-model="formOnline.workHours"
              :placeholder="$t('Main.UnitManagement.company.on')"
              style="width: 50%"
            ></TimePicker>
          </FormItem>
          <FormItem prop="offWork">
            <TimePicker
              confirm
              placement="bottom-end"
              v-model="formOnline.offWork"
              :placeholder="$t('Main.UnitManagement.company.off')"
              style="width: 50%"
            ></TimePicker>
          </FormItem>
          <FormItem prop="startTime">
            <label for="startTime">{{$t('Main.UnitManagement.company.warn')}}：</label>
            <DatePicker
              confirm
              type="date"
              v-model="formOnline.startTime"
              :placeholder="$t('Main.UnitManagement.company.start')"
              style="width: 50%"
            ></DatePicker>
          </FormItem>
          <FormItem prop="endTime">
            <DatePicker
              confirm
              type="date"
              v-model="formOnline.endTime"
              :placeholder="$t('Main.UnitManagement.company.end')"
              style="width: 50%"
            ></DatePicker>
          </FormItem>
          <FormItem prop="vbook">
            <label for="vbook">{{$t('Main.UnitManagement.company.vbook')}}：</label>
            <Input
              id="propertyName"
              v-model.trim="formOnline.vbook"
              size="large"
              clearable
              :placeholder="$t('Main.UnitManagement.hint.plzIptVbook')"
              style="width: 100%"
            />
          </FormItem>
          <FormItem prop="authority">
            <label for="authority">{{$t('Main.UnitManagement.company.auth')}}:</label>
            <Select
              size="large"
              v-model="formOnline.authority"
              :placeholder="$t('Main.UnitManagement.hint.plzSelectIsAuth')"
              style="width:100%"
            >
              <Option
                v-for="item in authorities"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem prop="scanable">
            <label for="scanable">{{$t('Main.UnitManagement.company.scan')}}:</label>
            <Select
              size="large"
              v-model="formOnline.scanable"
              :placeholder="$t('Main.UnitManagement.hint.plzSelectScan')"
              style="width:100%"
            >
              <Option
                v-for="item in scanability"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem prop="address">
            <label for="address">{{$t('Main.UnitManagement.company.address')}}:</label>
            <Input
              id="propertyName"
              v-model.trim="formOnline.address"
              size="large"
              clearable
              :placeholder="$t('Main.UnitManagement.hint.plzIptAddress')"
              style="width: 100%"
            />
          </FormItem>
        </Form>
        <Button
          class="submit"
          type="error"
          size="large"
          @click="handleEditSubmit('formOnline')"
        >{{$t('Common.submit')}}</Button>
      </div>
    </Modal>
    <Modal v-model="showOperateModal" :title="$t('Common.operate')" footer-hide width="600">
      <div class="operate-content">
        <div class="edit-panel edit-company-panel operate-conpany">
          <Form>
            <FormItem>
              <label for="avator">{{$t('Main.UnitManagement.company.dataopt')}}:</label>
              <Button
                type="error"
                style="margin-right:10px;margin-bottom:10px"
                size="large"
                @click="handleClearPersonnel"
              >{{$t('Main.UnitManagement.company.clearMan')}}</Button>
              <Button
                type="error"
                style="margin-right:10px;margin-bottom:10px"
                size="large"
                @click="handleClearHistory"
              >{{$t('Main.UnitManagement.company.clearAct')}}</Button>
              <Button
                type="error"
                size="large"
                style="margin-bottom:10px"
                @click="handleExportExcel"
              >{{$t('Main.UnitManagement.company.export')}}</Button>
            </FormItem>
          </Form>
        </div>
        <div class="edit-panel edit-company-panel operate-conpany">
          <Form>
            <FormItem>
              <label for="avator">{{$t('Main.UnitManagement.company.modelOpt')}}:</label>
              <Button
                type="error"
                style="margin-right:10px"
                size="large"
                @click="handleResetModel"
              >{{$t('Main.UnitManagement.company.reset')}}</Button>
            </FormItem>
            <FormItem prop="modelVersion">
              <label for="modelVersion">{{$t('Main.UnitManagement.company.version')}}:</label>
              <Select
                size="large"
                v-model="formInline.modelVersion"
                :placeholder="$t('Main.UnitManagement.hint.plzSelectVersion')"
                style="width:60%;margin-right:15px"
              >
                <Option
                  v-for="item in modelVersions"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
              <Button type="error">{{$t('Common.submit')}}</Button>
            </FormItem>
            <FormItem prop="level">
              <label for="level">{{$t('Main.UnitManagement.company.threshold')}}:</label>
              <Input
                v-model.trim="formInline.level"
                size="large"
                clearable
                :placeholder="$t('Main.UnitManagement.hint.plzIptThrotle')"
                style="width: 60%;margin-right:15px"
              />
              <Button type="error">{{$t('Common.submit')}}</Button>
            </FormItem>
          </Form>
        </div>
        <div class="edit-panel edit-company-panel operate-conpany">
          <Form>
            <FormItem prop="modelVersion">
              <label for="modelVersion">{{$t('Main.UnitManagement.company.getType')}}:</label>
              <Select
                size="large"
                v-model="formInline.modelVersion"
                :placeholder="$t('Main.UnitManagement.hint.plzSelectType')"
                style="width:270px"
              >
                <Option
                  v-for="item in modelVersions"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem prop="date">
              <label for="date">{{$t('Main.UnitManagement.company.getDate')}}:</label>
              <DatePicker
                confirm
                type="date"
                v-model="formInline.date"
                :placeholder="$t('Main.UnitManagement.hint.plzSelectDate')"
                style="width: 50%"
              ></DatePicker>
            </FormItem>
            <FormItem>
              <Button
                type="error"
                size="large"
                @click="handleEditSubmit('formOnline')"
              >{{$t('Main.UnitManagement.company.exportXsl')}}</Button>
            </FormItem>
          </Form>
        </div>
        <div class="edit-panel edit-company-panel operate-conpany">
          <Form>
            <FormItem>
              <label for="avator">{{$t('Main.UnitManagement.company.downloadQrcode')}}:</label>
              <Button
                type="error"
                style="margin-right:10px;margin-bottom:10px"
                size="large"
                @click="handlePersonnelRegister"
              >{{$t('Main.UnitManagement.company.regPersonnel')}}</Button>
              <Button
                type="error"
                style="margin-right:10px;margin-bottom:10px"
                size="large"
                @click="handleVisitorRegister"
              >{{$t('Main.UnitManagement.company.regVisitor')}}</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import Qrcode from "qrcode";
export default {
  name: "PersonnelList",
  data() {
    return {
      value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      showEditModal: false,
      modal: false,
      showOperateModal: false,
      keyWords: "",
      pageSize: 10,
      dataCount: 20,
      imageSize: 1024 * 5,
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
            message: this.$t("Main.UnitManagement.hint.plzIptCompany"),
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: this.$t("Main.UnitManagement.hint.plzIptAddress"),
            trigger: "blur"
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
        unitBelonged: [
          {
            required: true,
            message: this.$t("Main.UnitManagement.hint.plzSelectOrg"),
            trigger: "blur"
          }
        ],
        modelVersion: [
          {
            required: true,
            message: this.$t("Main.UnitManagement.hint.plzIptVersion"),
            trigger: "change"
          }
        ],
        scanable: [
          {
            required: true,
            message: this.$t("Main.UnitManagement.hint.plzSelectScan"),
            trigger: "change"
          }
        ],
        level: [
          {
            required: true,
            message: this.$t("Main.UnitManagement.hint.plzIptThrotle"),
            trigger: "blur"
          }
        ]
      },
      formInline: {
        propertyName: "",
        address: "",
        account: "",
        username: "",
        password: "",
        unitBelonged: "",
        modelVersion: "",
        scanable: "",
        level: "",
        date: "",
        scanable: ""
      },
      ruleOnline: {
        propertyNameEdit: [
          {
            required: true,
            message: this.$t("Main.UnitManagement.hint.plzIptCompany"),
            trigger: "blur"
          }
        ],
        workHours: [
          {
            required: true,
            message: this.$t("Main.UnitManagement.hint.plzIptWorkonTime"),
            trigger: "change"
          }
        ],
        offWork: [
          {
            required: true,
            message: this.$t("Main.UnitManagement.hint.plzIptWorkoffTime"),
            trigger: "change"
          }
        ],
        startTime: [
          {
            required: true,
            message: this.$t("Main.UnitManagement.hint.plzIptStartTime"),
            trigger: "change"
          }
        ],
        endTime: [
          {
            required: true,
            message: this.$t("Main.UnitManagement.hint.plzIptEndTime"),
            trigger: "change"
          }
        ]
      },
      formOnline: {
        propertyNameEdit: "",
        workHours: "",
        offWork: "",
        startTime: "",
        endTime: "",
        address: "",
        authority: "",
        vbook: ""
      },
      modelVersions: [
        {
          value: "0",
          label: "0"
        },
        {
          value: "1",
          label: "1"
        },
        {
          value: "2",
          label: "2"
        },
        {
          value: "3",
          label: "3"
        }
      ],
      scanability: [
        {
          value: "0",
          label: this.$t("Common.no")
        },
        {
          value: "1",
          label: this.$t("Common.yes")
        }
      ],
      authorities: [
        {
          value: "0",
          label: this.$t("Common.close")
        },
        {
          value: "1",
          label: this.$t("Common.open")
        }
      ],
      columns: [
        {
          title: "公司logo",
          key: "username"
        },
        {
          title: "公司名称",
          key: "shenpistatus"
        },
        {
          title: "公司ID",
          key: "shenpicomments"
        },
        {
          title: "所属物业",
          key: "time"
        },
        {
          title: "机器人数目",
          key: "robots"
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
          title: "模型版本",
          key: "model"
        },
        {
          title: "是否支持扫码进出",
          key: "scan"
        },
        {
          title: "操作",
          key: "action",
          width: this.$i18n.locale == "ru" ? "360px" : "300px",
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
                      this.operate(params.row);
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
    placeholder() {
      return `${this.$t(
        "Main.PersonnelManagement.staff.companyName"
      )} / ${this.$t("Main.UnitManagement.property.name")}`;
    }
  },
  methods: {
    handleCreateQrcode(link, text) {
      Qrcode.toCanvas(link, (err, canvas) => {
        if (!err) {
          let url = canvas.toDataURL("image/png");
          if (url) {
            let download = document.createElement("a");
            download.setAttribute("download", text);
            download.setAttribute("href", url);
            download.click();
          }
        }
      });
    },
    handlePersonnelRegister() {
      this.handleCreateQrcode(
        `http://47.91.129.200:8989/vue/iim/web-staff-register/index.html#/register?companyId=14748f5c3de2428d877a7913c25d172f&companyName`,
        "员工注册二维码"
      );
    },
    handleVisitorRegister() {
      this.handleCreateQrcode(
        `http://47.91.129.200:8989/vue/iim/web-staff-register/index.html#/register?companyId=14748f5c3de2428d877a7913c25d172f&companyName`,
        "访客注册二维码"
      );
    },
    handleClearPersonnel() {
      console.log("清空人员");
    },
    handleResetModel() {
      console.log("重置模型");
    },
    handleClearHistory() {
      console.log("清空活动记录");
    },
    handleExportExcel() {
      console.log("导出人员表");
      this.$refs.table.exportCsv({
        filename: "导出人员表"
      });
    },
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
    operate(row) {
      console.log(row);
      this.showOperateModal = true;
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
div {
  &.operate-content {
    max-height: 500px;
    overflow-y: auto;
    form {
      overflow: inherit !important;
    }
  }
  &.edit-company-panel {
    margin-top: 10px; /*no*/
    position: relative;
    height: auto;
    padding-bottom: 50px; /*no*/
    &.operate-conpany {
      border-bottom: 1px solid #e8eaec;
      padding-bottom: 20px; /*no*/
    }
    form {
      width: 80%;
      max-height: 450px; /*no*/
      padding: 0 30px 0 10px; /*no*/
      overflow-y: auto;
      box-sizing: content-box;
    }
    .submit {
      position: absolute;
      bottom: 0;
      right: calc(10% + 10px); /*no*/
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