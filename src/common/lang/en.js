export default {
    Common: {
        welcome: "Welcome",
        copySuccess: "copy success",
        copyFailed: "copy failed",
        copy: "copy",
        NFound: "The Page Not Found",
        open: "open",
        close: "close",
        yes: "Yes",
        no: "No",
        confirm: "confirm",
        confirmPsw: "confirm password",
        concel: "concel",
        edit: "edit",
        delete: "delete",
        deleteItem: "Are you sure delete",
        operate: "Operation",
        search: "search",
        upload: "upload",
        download: "download",
        addItem: "add",
        config: "config",
        submit: "submit",
        remark: "remarks",
        remarks: "information of version ",
        networkError: "Network Connection Error",
        file: "file",
        preview: "preview",
        fileError: "file uploaded error!",
        formateError: "file formate error!",
        overSize: "file size exceeds limit",
        limit: "should not more than 5M",
        require: "please select pictures in .jpg .png or .jpeg formats",
    },
    Login: {
        loging: "Logging...",
        Logining: "Logging in...",
        system: 'IIM Management System',
        login: "Login",
        hint: {
            loging: "Loging...",
            repeat: "please enter your account or password",
            error: "Account or password  error!",
            account: "please enter your account",
            psw: "please enter your password",
            limit: "password's length cant no less than 4"
        }
    },
    Logout: {
        hint: "Are you sure logout the management system?",
        logout: "Logout",
        logouting: "Logout..."
    },
    Main: {
        PersonnelManagement: {
            title: "Management of Personnel ",
            PersonnelList: 'Staff List',
            VisitorList: "Visitor List",
            PersonnelHistory: "Personnel Access History",
            hint: {
                plzInputStaff: "please input staff's name ",
                plzInputVisitor: "please input visitor's name ",
                plzInputTelephone: "please input telephone",
                plzInputThrotle: 'please input threshold',
                plzInputAuthority: "please input robot's authority"
            },
            staff: {
                companyName: "company ",
                staffName: "staff",
                eidtStaff: "Edit staff",
                upload: "upload the avatar",
                preview: "preview",
                deleteAvatar: "delete",
                telephone: "telephone",
                throtle: "threshold",
                authority: "authority of robot",
                talk: "notice when entering",
                NTalk: "won't notice when entering"
            },
            visitor: {
                visitorName: "visitor",
                editVisitor: "Edit visitor"
            },
            access: {
                selectOrganization: "please select company",
                selectDate: "date of access"
            }
        },
        VersionManagement: {
            title: "Management of Version ",
            AppList: "App Version List",
            RobotModuleManagement: "Management of Robot-module",
            UpgratePkgManagement: " Management of Upgrate-package",
            UpgratePlanManagement: " Management of Upgrate-plan",
            hint: {
                plzSelectAppType: 'please select type of app',
                plzInputVersion: "please input number of version",
                plzSelectType: "please select type of version",
                plzInputRemarks: 'please input infomation of version',
                plzSelectFile: "please select file",
                plzInputModuleName: "please input the name of module",
                plzSelectModuleName: "please select the name of module",
                plzSelectProduct: "please select the product",
                plzUploadPkg: "please upload the package of upgration",
                plzInputPlanName: "please input the name of plan",
                plzInputPlanContent: "please input the content of plan",
                plzInputPlanDesc: "please input the illusion of plan",
                plzSelectPkg: "package / module's name",
                plzInputRange: "SN / product's type / robot's name / organization"
            },
            version: {
                upgrate: "version of upgrate",
                edit: "Edit version",
                forceUpdate: 'whether updates mandatorlly',
                select: "select file",
                type: "type of version"
            },
            robotModule: {
                addModule: "Add the software module of robots",
                editModule: "Edit the software module of robots",
                moduleName: "name of module",
                notice: "Require ：( no more than 200 letters)"
            },
            upk: {
                uploadPkg: "Upload the package of upgration",
                pkg: "package of upgration",
                useProduct: "select product",
                desc: "Illusion",
                limit: "no more than 200 letters"
            },
            upp: {
                create: "create",
                title: "Management of upgration plan",
                plan: "Name of upgration plan",
                content: "description of upgration",
                selectPkg: "Select the package of upgration",
                tapSelectPkg: "click here to select th package of upgration",
                selectRange: "Select the range of upgration",
                tapSelectRange: "click here to select the range of upgration",
                time: "Time of upgration",
                immiedate: "now",
                appointTime: "appoint time",
                selectDate: "select date",
            }
        },
        RobotsManagement: {
            title: "Management of Robots",
            RobotList: "Robots List",
            ProductsTypeManagement: " Management of Products-type",
            AdvertisingScreenManagement: " Management of Ads-screen",
            hint: {
                plzIptOrg: "MAC address / companyName / robotName",
                plzIptMac: "please input the address of MAC",
                plzIptRobotName: "please input the name of robot",
                plzIptRobotVersion: "please input the version of robot",
                plzIptRobotType: "please input the type of robot",
                plzIptProType: "please input the type of product",
                plzIptBelonged: "please input the organization belonged of robot",
                plzIptPort: "please input the port",
                plzIptProductType: "please input the type of product",
                plzIptProName: "please input the name of product"
            },
            robotList: {
                edit: "Edit robot",
                mac: "MAC address",
                name: "Name of robot",
                version: "Version of robot",
                type: "Type of robot",
                productType: "Type of product",
                belong: "Organization belonged",
                port: "Config port",
                cloud: "Synchronized with the Cloud Data",
                synchronize: "One click sync",
                feature: "Feature synchronize",
                select: "Select company",
                import: "Import robots in batch "
            },
            productType: {
                add: "Add new type of product",
                type: "Product's type :( no more than 50 letters)",
                name: "Product's name ：( no more than 50 letters)",
                require: "Illusion：(no more than 200 letters)"
            },
            adsScreen: {
                title: {
                    screen: "Screen",
                    one: "Material I",
                    two: "Material II",
                    three: "Material III",
                    four: "Material IV",
                },
                main: "Main",
                front: "Front ",
                left: "Left",
                right: "Right",
            }
        },
        UnitManagement: {
            title: 'Management of Organization',
            PropertyManagement: " Management of Property",
            PropertyManagerList: "Property-Administrators List",
            CompanyManagement: "Management of Company",
            CompanyManagerList: "Company-Administrators List",
            hint: {
                plzIptProperty: "please input the name of property",
                plzIptCompany: "please input the name of company",
                plzIptPropertyAccount: "please input the account of property administrator",
                plzIptCompanyAccount: "please input the account of administrator",
                plzIptAdmin: "please input the name of administrator",
                plzIptPsw: "please input the password of administrator",
                plzSelectOrg: "please select the organization",
                plzConfirmPsw: "please confirm the password",
                plzIptVersion: "please input the version of model",
                plzSelectScan: "please choose whether support qr-code to enter or not",
                plzIptThrotle: 'please input threshold',
                plzIptAddress: "please input the adderss & floor of company",
                plzSelectVersion: "please select version of model",
                plzSelectIsAuth: "please select whether is authorized or not",
                plzIptVbook: "please input the effective time of v-book",
                plzIptWorkonTime: 'please input the work-on time',
                plzIptWorkoffTime: "please input the work-off time",
                plzIptStartTime: "please input the start time ",
                plzIptEndTime: "please input the end time",
                plzSelectType: "please select type of feature extraction",
                plzSelectDate: "please select date of feature extraction"
            },
            property: {
                edit: "Edit property",
                add: "Add property",
                logo: "Property's logo",
                name: "property's name",
                account: "Account of administrator",
                username: "Name of administrator",
                psw: "Password of administrator",
            },
            propertyAdmins: {
                add: "Add administrator",
                edit: "Edit administrator",
                belong: "Select the property",
            },
            company: {
                add: "Add company",
                logo: "Company's logo",
                name: "Company's name",
                address: "address & floor",
                belong: "property of company",
                version: "Model type",
                scan: "whether support in qr-code ",
                threshold: "Threshold",
                edit: "Edit company",
                time: "work time",
                on: "work-on time",
                off: "work-off time",
                warn: "warning time",
                start: "start time",
                end: "end time",
                vbook: "v-book effective time",
                auth: "authorization",
                dataopt: "Data operation",
                clearMan: 'Clear personnel',
                clearAct: "Clear activity history",
                export: "Export activity history",
                modelOpt: "Model operation",
                reset: "Reset model",
                getDate: "Date of feature extraction",
                getType: "Type of feature extraction",
                exportXsl: "Export report",
                downloadQrcode: "Download qrcode to register",
                regPersonnel: "Register for permanent personnel",
                regVisitor: "Register for visitor"
            },
            companyAdmins: {
                add: "Add administrators",
                edit: "Edit administrators",
                belong: "Company belonged",
            }
        },
        ApiManagement: {
            title: "Management of Api ",
            ApiList: "Api List",
            hint: {
                iptAccount: "please input the account of user",
                iptApk: "please input AppKey",
                iptSrt: "please input Master secret",
                iptOrg: "please input the name of organization",
                iptUrl: "please input URL",
                iptEmail: "please input the e-mail for contact",
                iptTel: "please input the telephone ",
                iptBelong: "please input the organization of api",
                iptNewPsw: "please input the new password of user",
                iptConfirm: "please confirm the password "
            },
            api: {
                edit: "Edit Api",
                account: "Account",
                AppKey: "AppKey",
                secret: "Master secret",
                org: "Organization",
                url: "URL",
                email: "E-mail",
                tel: "Telephone",
                belong: "Organization of api ",
                newPsw: "New password",
                confirmPsw: "Confirm",
            }
        }
    }
}