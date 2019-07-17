export default {
    Common: {
        welcome: "приветствовать",
        copySuccess: "Подтверждаю.",
        copyFailed: "Дублирование не выполнено",
        copy: " воспроизвести",
        NFound: "Страницы, которые вы ищете, не существую",
        open: "откройте",
        close: "закрытие",
        yes: "Да",
        no: "Нет",
        confirm: "определение",
        concel: "отмена ",
        edit: " редактор ",
        delete: "Удалить ",
        deleteItem: "Подтверждение удаления ",
        confirmPsw: "подтвердить пароль ",
        operate: "операция",
        search: "поиск",
        upload: "загрузка",
        download: "загрузка",
        addItem: "Добавить ",
        config: "Настройка ",
        submit: "представление ",
        remark: "Примечание ",
        remarks: " Примечание сведения  ",
        networkError: " Ошибка подключения к сети ",
        file: "Документация",
        preview: " осмотр ",
        fileError: " Ошибка загрузки файла ",
        formateError: "ошибка формата файла !",
        overSize: " размер файла превышает ограничение ",
        limit: "не более 5 м ",
        require: " Выберите рисунок в формате jpg, png или jpeg. "
    },
    Login: {
        loging: "вход...",
        Logining: "регистрация...",
        system: ' IIM в система управления',
        login: " вход ",
        hint: {
            loging: "запись...",
            repeat: " Введите имя пользователя или пароль ",
            error: "ошибка по имени или паролю ",
            account: "Введите имя пользователя",
            psw: "Введите пароль ",
            limit: ' Пароль не должен быть меньше 4 битов '
        }
    },
    Logout: {
        hint: " установить выход из системы управления фоном ?",
        logout: "выход",
        logouting: " выход ..."
    },
    Main: {
        PersonnelManagement: {
            title: "управление кадрами ",
            PersonnelList: 'Список сотрудников',
            VisitorList: "список посетителей",
            PersonnelHistory: "запись личного состава",
            hint: {
                plzInputStaff: "Введите имя работника",
                plzInputVisitor: "Введите имя посетителя",
                plzInputTelephone: "Введите, пожалуйста, номер телефона",
                plzInputThrotle: 'Введите значение клапана',
                plzInputAuthority: "Введите права робота"
            },
            staff: {
                companyName: "название компании",
                staffName: "наименование персонала",
                eidtStaff: "редактировать персонал",
                upload: "загрузить изображение",
                preview: "вид на голову",
                deleteAvatar: "Удалить изображение головы",
                telephone: "телефонный номер",
                throtle: "величина клапана",
                authority: "права на машину",
                talk: "говорить в дверь",
                NTalk: "закрыть дверь"
            },
            visitor: {
                visitorName: "название посетителя",
                editVisitor: "редактировать посетителей"
            },
            access: {
                selectOrganization: "выберите название компании",
                selectDate: "дата ввода и вывода персонала"
            }
        },
        VersionManagement: {
            title: "управление версиями",
            AppList: "Список версий App",
            RobotModuleManagement: "управление модулем программного обеспечения роботов",
            UpgratePkgManagement: "Управление пакетами",
            UpgratePlanManagement: "планирование модернизации пакета",
            hint: {
                plzSelectAppType: 'Выберите тип app',
                plzInputVersion: "Введите номер версии",
                plzSelectType: "Выберите тип версии",
                plzInputRemarks: 'Введите сведения',
                plzSelectFile: "Выберите файл",
                plzInputModuleName: "Введите имя модуля",
                plzSelectModuleName: "выберите название модуля",
                plzSelectProduct: "Выберите продукт",
                plzUploadPkg: "загрузить пакет обновления",
                plzInputPlanName: "Введите имя программы",
                plzInputPlanContent: "Введите содержание программы",
                plzInputPlanDesc: "Введите описание плана",
                plzSelectPkg: "Обновить название пакета / модуля",
                plzInputRange: "SN серийный номер, тип продукции, наименование робота, принадлежность"
            },
            version: {
                upgrate: "Обновить версию",
                edit: "Изменить версию",
                forceUpdate: 'обязательное обновление',
                select: "Выбор файла",
                type: "тип версии"
            },
            robotModule: {
                editModule: "редактирование модулей программного обеспечения роботов",
                addModule: "новый модуль программного обеспечения роботов",
                moduleName: "Имя модуля",
                notice: "примечание (до 200 слов)"
            },
            upk: {
                uploadPkg: "Обновить пакет",
                pkg: "пакет модернизации",
                useProduct: "эксплуатационная продукция",
                desc: "Примечание",
                limit: "до 200 слов"
            },
            upp: {
                create: "создать план",
                title: "обновление планового управления",
                plan: "План модернизации",
                content: "Обновить содержимое",
                selectPkg: "выбор пакета",
                tapSelectPkg: "Выберите пакет",
                selectRange: "диапазон эскалации",
                tapSelectRange: "Нажмите для выбора диапазона",
                time: "время нарастания",
                immiedate: "немедленно",
                appointTime: "назначенное время",
                selectDate: "Выбор даты",
            }
        },
        RobotsManagement: {
            title: "управление роботами",
            RobotList: "Список роботов",
            ProductsTypeManagement: "Управление типами продукции",
            AdvertisingScreenManagement: "управление рекламным экраном",
            hint: {
                plzIptOrg: "MAC адрес / название компании / название робота",
                plzIptMac: "Введите адрес MAC",
                plzIptRobotName: "Введите имя робота",
                plzIptRobotVersion: "Введите номер версии робота",
                plzIptRobotType: "Выберите тип робота",
                plzIptProType: "Выберите тип",
                plzIptBelonged: "Введите единица робота",
                plzIptPort: "Введите номер порта",
                plzIptProductType: "Введите тип",
                plzIptProName: "Введите название"
            },
            robotList: {
                edit: "робот - редактор",
                mac: "MAC地址",
                name: "имя робота",
                version: "номер версии робота",
                type: "тип робота",
                productType: "тип продукции",
                belong: "робототехническая единица",
                port: "номер порта",
                cloud: "данные о синхронных облаках",
                synchronize: "одноклавишная синхронизация",
                feature: "Feature синхронизация",
                select: "Выбор компании",
                import: "робот для массового импорта"
            },
            productType: {
                add: "новый тип продукции",
                type: "тип продукции: (50 слов)",
                name: "название продукта: (50 слов)",
                require: "примечание (до 200 слов)"
            },
            adsScreen: {
                title: {
                    screen: "экран",
                    one: "материал один",
                    two: "материал два",
                    three: "материал три",
                    four: "материал четыре",
                },
                main: "Основной экран",
                front: "передний экран",
                left: "левый экран",
                right: "правый экран",
            }
        },
        UnitManagement: {
            title: 'управление единицами',
            PropertyManagement: "Управление имуществом",
            PropertyManagerList: "Список хозяйственных администраторов",
            CompanyManagement: "управление компанией",
            CompanyManagerList: "Список корпоративных администраторов",
            hint: {
                plzIptProperty: "Введите имя",
                plzIptCompany: "Введите название компании",
                plzIptPropertyAccount: "Введите счёт Администратора",
                plzIptCompanyAccount: "Введите счёт Администратора",
                plzIptAdmin: "Введите имя Администратора",
                plzIptPsw: "Введите пароль администратора",
                plzSelectOrg: "Выберите единицы",
                plzConfirmPsw: "Введите пароль подтверждения",
                plzIptVersion: "Выберите версию модели",
                plzSelectScan: "Укажите, поддерживает ли вход и выход",
                plzIptThrotle: 'порог входа',
                plzIptAddress: "Введите адрес компании",
                plzSelectVersion: "Выберите версию модели",
                plzSelectIsAuth: "Выберите разрешение",
                plzIptVbook: "Введите срок действия vbook",
                plzIptWorkonTime: 'Введите время работы',
                plzIptWorkoffTime: "Введите время работы",
                plzIptStartTime: "Введите время начала",
                plzIptEndTime: "Введите время окончания",
                plzSelectType: "Выберите тип извлечения",
                plzSelectDate: "Выберите дату извлечения"
            },
            property: {
                edit: "Изменить имущество",
                add: "новое имущество",
                logo: "имущество logo",
                name: "наименование имущества",
                account: "администратор",
                username: "имя Администратора",
                psw: "пароль администратора"
            },
            propertyAdmins: {
                add: "Новый администратор",
                edit: "редактор",
                belong: "подведомственное имущество",
            },
            company: {
                add: "новая компания",
                logo: "компания logo",
                name: '公司名称',
                address: "адрес этажа",
                belong: "собственность компании",
                version: "версия модели",
                scan: "Поддержка сканирования при входе и выходе",
                threshold: 'порог',
                edit: "редакционная компания",
                time: "рабочее время",
                on: "рабочее время",
                off: "время работы",
                warn: "время раннего предупреждения",
                start: "开始время начала时间",
                end: "время окончания",
                vbook: "срок действия vbook",
                auth: "Делегирование полномочий",
                dataopt: "операция данных",
                clearMan: 'Очистить территорию',
                clearAct: "Очистить журнал",
                export: "экспортировать запись",
                modelOpt: "модельная операция",
                reset: "сбросить модель",
                getDate: "дата экстракции",
                getType: "характеристический тип извлечения",
                exportXsl: "производный отчет",
                downloadQrcode: "зарегистрировать двухмерный код",
                regPersonnel: "регистрация постоянных сотрудников",
                regVisitor: "регистрация посетителей"
            },
            companyAdmins: {
                add: "Новый администратор",
                edit: "редактор",
                belong: "подведомственная компания",
            }
        },
        ApiManagement: {
            title: "управление API ",
            ApiList: "API список",
            hint: {
                iptAccount: "Введите номер счёта пользователя",
                iptApk: "Введите пожалуйста AppKey",
                iptSrt: "Введите пожалуйста Master secret",
                iptOrg: "Введите пожалуйста название организации",
                iptUrl: "Введите пожалуйста URL",
                iptEmail: "Введите почтовый ящик",
                iptTel: "Пожалуйста, введите телефон",
                iptBelong: "Выберите api подведомственная единица",
                iptNewPsw: "Введите новый пароль пользователя",
                iptConfirm: "Подтвердите пароль"
            },
            api: {
                edit: "редактор Api",
                account: "номер счета пользователя",
                AppKey: "AppKey",
                secret: "Master secret",
                org: "название организации",
                url: "URL",
                email: "почтовый ящик",
                tel: "контактный телефон",
                belong: "api подведомственная единица",
                newPsw: "новый пароль",
                confirmPsw: "подтвердить пароль ",
            }
        }
    }
}