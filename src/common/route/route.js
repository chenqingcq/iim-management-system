export default [{
        label: "人员管理",
        path: "PersonnelManagement",
        name: "PersonnelManagement",
        i18n: "Main.PersonnelManagement.title",
        children: [{
                label: "员工列表",
                path: "PersonnelList",
                name: 'PersonnelList',
                i18n: "Main.PersonnelManagement.PersonnelList",
            },
            {
                label: "访客列表",
                path: "VisitorList",
                name: "VisitorList",
                i18n: "Main.PersonnelManagement.VisitorList",
            },
            {
                label: "人员进出记录",
                path: "PersonnelHistory",
                name: 'PersonnelHistory',
                i18n: "Main.PersonnelManagement.PersonnelHistory",

            }
        ]
    },
    {
        label: "版本管理",
        path: "VersionManagement",
        name: "VersionManagement",
        i18n: "Main.VersionManagement.title",
        children: [{
                label: "App版本列表",
                path: "AppList",
                name: "AppList",
                i18n: "Main.VersionManagement.AppList",
            },
            {
                label: "机器人软件模块管理",
                path: "RobotModuleManagement",
                name: "RobotModuleManagement",
                i18n: "Main.VersionManagement.RobotModuleManagement",
            },
            {
                label: "升级包管理",
                path: "UpgratePkgManagement",
                name: "UpgratePkgManagement",
                i18n: "Main.VersionManagement.UpgratePkgManagement",
            },
            {
                label: "升级包计划管理",
                path: "UpgratePlanManagement",
                name: "UpgratePlanManagement",
                i18n: "Main.VersionManagement.UpgratePlanManagement",
            }
        ]
    },
    {
        label: "机器人管理",
        path: "RobotsManagement",
        name: "RobotsManagement",
        i18n: "Main.RobotsManagement.title",
        children: [{
                label: "机器人列表",
                path: "RobotList",
                name: "RobotList",
                i18n: "Main.RobotsManagement.RobotList",
            },
            {
                label: "产品类型管理",
                path: "ProductsTypeManagement",
                name: "ProductsTypeManagement",
                i18n: "Main.RobotsManagement.ProductsTypeManagement",
            },
            {
                label: "广告屏管理",
                path: "AdvertisingScreenManagement",
                name: "AdvertisingScreenManagement",
                i18n: "Main.RobotsManagement.AdvertisingScreenManagement",
            },
        ]
    },
    {
        label: "单位管理",
        path: "UnitManagement",
        name: "UnitManagement",
        i18n: "Main.UnitManagement.title",
        children: [{
                label: "物业管理",
                path: "PropertyManagement",
                name: "PropertyManagement",
                i18n: "Main.UnitManagement.PropertyManagement",
            },
            {
                label: "物业管理员列表",
                path: "PropertyManagerList",
                name: "PropertyManagerList",
                i18n: "Main.UnitManagement.PropertyManagerList",
            },
            {
                label: "公司管理",
                path: "CompanyManagement",
                name: "CompanyManagement",
                i18n: "Main.UnitManagement.CompanyManagement",
            },
            {
                label: "公司管理员列表",
                path: "CompanyManagerList",
                name: "CompanyManagerList",
                i18n: "Main.UnitManagement.CompanyManagerList",
            },
        ]
    },
    {
        label: "API管理",
        path: "ApiManagement",
        name: "ApiManagement",
        i18n: "Main.ApiManagement.title",
        children: [{
            label: "API列表",
            path: "ApiList",
            name: "ApiList",
            i18n: "Main.ApiManagement.ApiList",
        }]
    }
]