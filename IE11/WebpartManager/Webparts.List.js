'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Webparts.List.js
 * @author Wilfredo Pacheco
 */

exports.default = [{
    title: 'Layout',
    id: 'layout',
    schema: {
        list: {
            Title: 'Layout',
            Description: 'Used to manage the custom webpart element, this list is required to add weparts.',
            BaseTemplate: 100
        },
        fields: [{
            Title: 'LayoutTitle',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        }, {
            Title: 'WebpartType',
            FieldTypeKind: 6,
            DefaultView: true,
            Choices: ['WebpartContent', 'Carousel', 'ContentElement', 'Staff', 'Announcements', 'Events', 'MainLinks', 'BranchLinks', 'ContactInfo', 'Clocks'],
            Order: 1
        }, {
            Title: 'WebpartSide',
            FieldTypeKind: 6,
            DefaultView: true,
            Choices: ['LeftSide', 'RightSide'],
            Order: 1
        }, {
            Title: 'WebpartOrder',
            FieldTypeKind: 9,
            DefaultView: true,
            Order: 1
        }],
        predefinedData: []
    },
    templates: ['All', 'template-1', 'template-2', 'template-3'],
    'template-1': [{
        "WebpartType": "WebpartContent",
        "WebpartSide": "LeftSide",
        "WebpartOrder": 1
    }, {
        "WebpartType": "Carousel",
        "WebpartSide": "LeftSide",
        "WebpartOrder": 2
    }, {
        "WebpartType": "ContentElement",
        "WebpartSide": "LeftSide",
        "WebpartOrder": 3
    }, {
        "WebpartType": "Staff",
        "WebpartSide": "RightSide",
        "WebpartOrder": 1
    }, {
        "WebpartType": "MainLinks",
        "WebpartSide": "RightSide",
        "WebpartOrder": 2
    }],
    'template-2': [{
        "WebpartType": "WebpartContent",
        "WebpartSide": "LeftSide",
        "WebpartOrder": 1
    }, {
        "WebpartType": "Carousel",
        "WebpartSide": "LeftSide",
        "WebpartOrder": 2
    }, {
        "WebpartType": "ContentElement",
        "WebpartSide": "LeftSide",
        "WebpartOrder": 3
    }, {
        "WebpartType": "Staff",
        "WebpartSide": "RightSide",
        "WebpartOrder": 1
    }, {
        "WebpartType": "MainLinks",
        "WebpartSide": "RightSide",
        "WebpartOrder": 2
    }, {
        "WebpartType": "Announcements",
        "WebpartSide": "RightSide",
        "WebpartOrder": 3
    }],
    'template-3': [{
        "WebpartType": "BranchLinks",
        "WebpartSide": "LeftSide",
        "WebpartOrder": 1
    }, {
        "WebpartType": "Announcements",
        "WebpartSide": "LeftSide",
        "WebpartOrder": 2
    }, {
        "WebpartType": "Events",
        "WebpartSide": "LeftSide",
        "WebpartOrder": 3
    }, {
        "WebpartType": "Staff",
        "WebpartSide": "RightSide",
        "WebpartOrder": 1
    }, {
        "WebpartType": "MainLinks",
        "WebpartSide": "RightSide",
        "WebpartOrder": 2
    }]

}, {
    title: 'Webpart Content',
    id: 'webpart-content',
    schema: {
        list: {
            Title: 'WebpartContent',
            Description: 'This will be used to render the title and/or the sub title for the page.',
            BaseTemplate: 100
        },
        fields: [{
            Title: 'ContentTitle',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        }, {
            Title: 'SubTitle',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        }],
        predefinedData: []
    },
    templates: ['All', 'template-1', 'template-2', 'template-3']
}, {
    title: 'Carousel',
    id: 'carousel',
    schema: {
        list: {
            Title: 'Carousel',
            Description: 'Used to manage Carousel images and text.',
            BaseTemplate: 100
        },
        fields: [{
            Title: 'ImageURL',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        }, {
            Title: 'LinkURL',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        }, {
            Title: 'LinkText',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        }],
        predefinedData: []
    },
    templates: ['All', 'template-1']
}, {
    title: 'Content Element',
    id: 'content-element',
    schema: {
        list: {
            Title: 'ContentElement',
            Description: 'Used to manage Mission/Vision list content images and text.',
            BaseTemplate: 100
        },
        fields: [{
            Title: 'ContentCategory', // Should be either Mission or Vision;
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        }, {
            Title: 'ContentTitle',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        }, {
            Title: 'Description',
            FieldTypeKind: 3,
            DefaultView: true,
            Order: 1
        }],
        predefinedData: []
    },
    templates: ['All', 'template-1']
}, {
    title: 'Staff',
    id: 'staff',
    schema: {
        list: {
            Title: 'Staff',
            Description: 'Used to manage Staff members for the POC wepart, including the main POC.',
            BaseTemplate: 100
        },
        fields: [{
            Title: 'UserTitle',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        }, {
            Title: 'UserEmail',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        }, {
            Title: 'Phone',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        }, {
            Title: 'JobTitle',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        }, {
            Title: 'MainPOC',
            FieldTypeKind: 8,
            DefaultView: true,
            Order: 1
        }, {
            Title: 'SortOrder',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        }, {
            Title: 'ImageURL',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        }, {
            Title: 'ImageDescription',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        }, {
            Title: 'LeadershipBioURL',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        }, {
            Title: 'LeadershipBioDescription',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        }],
        predefinedData: []
    },
    templates: ['All', 'template-1', 'template-2']
}, {
    title: 'Announcements',
    id: 'announcements',
    schema: {
        list: {
            Title: 'Announcements',
            Description: 'Used to manage announcements for the custom webpart.',
            BaseTemplate: 100
        },
        fields: [{
            Title: 'AnnouncementTitle',
            FieldTypeKind: 2, // SLOT;
            DefaultView: true,
            Order: 1
        }, {
            Title: 'Body',
            FieldTypeKind: 3, // MLOT;
            DefaultView: true,
            Order: 1
        }, {
            Title: 'EventDate',
            FieldTypeKind: 4, // Date;
            DefaultView: true,
            Order: 1
        }, {
            Title: 'Expires',
            FieldTypeKind: 4, // Date;
            DefaultView: true,
            Order: 1
        }],
        predefinedData: []
    },
    templates: ['All', 'template-2', 'template-3']
}, {
    title: 'Events',
    id: 'events',
    schema: {
        list: {
            Title: 'Events',
            Description: 'Used to manage events for the custom webpart.',
            BaseTemplate: 100
        },
        fields: [{
            Title: 'EventTitle',
            FieldTypeKind: 2, // SLOT;
            DefaultView: true,
            Order: 1
        }, {
            Title: 'Body',
            FieldTypeKind: 3, // MLOT;
            DefaultView: true,
            Order: 1
        }, {
            Title: 'EventDate',
            FieldTypeKind: 4, // Date;
            DefaultView: true,
            Order: 1
        }, {
            Title: 'Expires',
            FieldTypeKind: 4, // Date;
            DefaultView: true,
            Order: 1
        }],
        predefinedData: []
    },
    templates: ['All', 'template-2', 'template-3']
}, {
    title: 'Main Links',
    id: 'main-links',
    schema: {
        list: {
            Title: 'MainLinks',
            Description: 'Used to create main link for the all templates.',
            BaseTemplate: 100
        },
        fields: [{
            Title: 'MainLinkTitle',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        }, {
            Title: 'LinkURL',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        }],
        predefinedData: []
    },
    templates: ['All', 'template-1', 'template-2', 'template-3']
}, {
    title: 'Branch Links',
    id: 'branch-links',
    schema: {
        list: {
            Title: 'BranchLinks',
            Description: 'Used to create branch link for the branch template.',
            BaseTemplate: 100
        },
        fields: [{
            Title: 'BranchLinkTitle',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        }, {
            Title: 'LinkURL',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        }, {
            Title: 'BranchIcon',
            FieldTypeKind: 6,
            Choices: ['File', 'Folder', 'MapMarker', 'Binoculars', 'OrgChart', 'ClipBoard'],
            DefaultView: true,
            Order: 1
        }],
        predefinedData: []
    },
    templates: ['All', 'template-3']

}, {
    title: 'Contact Info',
    id: 'contact-info',
    schema: {
        list: {
            Title: 'ContactInfo',
            Description: 'Used to manage the contact info widget.',
            BaseTemplate: 100
        },
        fields: [{
            Title: 'ContactTitle',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        }, {
            Title: 'ContactInfo',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        }, {
            Title: 'ContactIcon',
            FieldTypeKind: 6,
            Choices: ['Phone', 'Email'],
            DefaultView: true,
            Order: 1
        }],
        predefinedData: []
    },
    templates: ['All', 'template-3']

}, {
    title: 'Clocks',
    id: 'clock-container',
    schema: {
        list: {
            Title: 'Clocks',
            Description: 'Used to manage the clock widget.',
            BaseTemplate: 100
        },
        fields: [{
            Title: 'DisplayTitle',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        }, {
            Title: 'TimeZone',
            FieldTypeKind: 6,
            Choices: ["Africa/Abidjan", "Africa/Accra", "Africa/Algiers", "Africa/Bissau", "Africa/Cairo", "Africa/Casablanca", "Africa/Ceuta", "Africa/El_Aaiun", "Africa/Johannesburg", "Africa/Juba", "Africa/Khartoum", "Africa/Lagos", "Africa/Maputo", "Africa/Monrovia", "Africa/Nairobi", "Africa/Ndjamena", "Africa/Sao_Tome", "Africa/Tripoli", "Africa/Tunis", "Africa/Windhoek", "America/Adak", "America/Anchorage", "America/Araguaina", "America/Argentina/Buenos_Aires", "America/Argentina/Catamarca", "America/Argentina/Cordoba", "America/Argentina/Jujuy", "America/Argentina/La_Rioja", "America/Argentina/Mendoza", "America/Argentina/Rio_Gallegos", "America/Argentina/Salta", "America/Argentina/San_Juan", "America/Argentina/San_Luis", "America/Argentina/Tucuman", "America/Argentina/Ushuaia", "America/Asuncion", "America/Atikokan", "America/Bahia", "America/Bahia_Banderas", "America/Barbados", "America/Belem", "America/Belize", "America/Blanc-Sablon", "America/Boa_Vista", "America/Bogota", "America/Boise", "America/Cambridge_Bay", "America/Campo_Grande", "America/Cancun", "America/Caracas", "America/Cayenne", "America/Chicago", "America/Chihuahua", "America/Costa_Rica", "America/Creston", "America/Cuiaba", "America/Curacao", "America/Danmarkshavn", "America/Dawson", "America/Dawson_Creek", "America/Denver", "America/Detroit", "America/Edmonton", "America/Eirunepe", "America/El_Salvador", "America/Fort_Nelson", "America/Fortaleza", "America/Glace_Bay", "America/Godthab", "America/Goose_Bay", "America/Grand_Turk", "America/Guatemala", "America/Guayaquil", "America/Guyana", "America/Halifax", "America/Havana", "America/Hermosillo", "America/Indiana/Indianapolis", "America/Indiana/Knox", "America/Indiana/Marengo", "America/Indiana/Petersburg", "America/Indiana/Tell_City", "America/Indiana/Vevay", "America/Indiana/Vincennes", "America/Indiana/Winamac", "America/Inuvik", "America/Iqaluit", "America/Jamaica", "America/Juneau", "America/Kentucky/Louisville", "America/Kentucky/Monticello", "America/La_Paz", "America/Lima", "America/Los_Angeles", "America/Maceio", "America/Managua", "America/Manaus", "America/Martinique", "America/Matamoros", "America/Mazatlan", "America/Menominee", "America/Merida", "America/Metlakatla", "America/Mexico_City", "America/Miquelon", "America/Moncton", "America/Monterrey", "America/Montevideo", "America/Nassau", "America/New_York", "America/Nipigon", "America/Nome", "America/Noronha", "America/North_Dakota/Beulah", "America/North_Dakota/Center", "America/North_Dakota/New_Salem", "America/Ojinaga", "America/Panama", "America/Pangnirtung", "America/Paramaribo", "America/Phoenix", "America/Port-au-Prince", "America/Port_of_Spain", "America/Porto_Velho", "America/Puerto_Rico", "America/Punta_Arenas", "America/Rainy_River", "America/Rankin_Inlet", "America/Recife", "America/Regina", "America/Resolute", "America/Rio_Branco", "America/Santarem", "America/Santiago", "America/Santo_Domingo", "America/Sao_Paulo", "America/Scoresbysund", "America/Sitka", "America/St_Johns", "America/Swift_Current", "America/Tegucigalpa", "America/Thule", "America/Thunder_Bay", "America/Tijuana", "America/Toronto", "America/Vancouver", "America/Whitehorse", "America/Winnipeg", "America/Yakutat", "America/Yellowknife", "Antarctica/Casey", "Antarctica/Davis", "Antarctica/DumontDUrville", "Antarctica/Macquarie", "Antarctica/Mawson", "Antarctica/Palmer", "Antarctica/Rothera", "Antarctica/Syowa", "Antarctica/Troll", "Antarctica/Vostok", "Asia/Almaty", "Asia/Amman", "Asia/Anadyr", "Asia/Aqtau", "Asia/Aqtobe", "Asia/Ashgabat", "Asia/Atyrau", "Asia/Baghdad", "Asia/Baku", "Asia/Bangkok", "Asia/Barnaul", "Asia/Beirut", "Asia/Bishkek", "Asia/Brunei", "Asia/Chita", "Asia/Choibalsan", "Asia/Colombo", "Asia/Damascus", "Asia/Dhaka", "Asia/Dili", "Asia/Dubai", "Asia/Dushanbe", "Asia/Famagusta", "Asia/Gaza", "Asia/Hebron", "Asia/Ho_Chi_Minh", "Asia/Hong_Kong", "Asia/Hovd", "Asia/Irkutsk", "Asia/Jakarta", "Asia/Jayapura", "Asia/Jerusalem", "Asia/Kabul", "Asia/Kamchatka", "Asia/Karachi", "Asia/Kathmandu", "Asia/Khandyga", "Asia/Kolkata", "Asia/Krasnoyarsk", "Asia/Kuala_Lumpur", "Asia/Kuching", "Asia/Macau", "Asia/Magadan", "Asia/Makassar", "Asia/Manila", "Asia/Nicosia", "Asia/Novokuznetsk", "Asia/Novosibirsk", "Asia/Omsk", "Asia/Oral", "Asia/Pontianak", "Asia/Pyongyang", "Asia/Qatar", "Asia/Qostanay", "Asia/Qyzylorda", "Asia/Riyadh", "Asia/Sakhalin", "Asia/Samarkand", "Asia/Seoul", "Asia/Shanghai", "Asia/Singapore", "Asia/Srednekolymsk", "Asia/Taipei", "Asia/Tashkent", "Asia/Tbilisi", "Asia/Tehran", "Asia/Thimphu", "Asia/Tokyo", "Asia/Tomsk", "Asia/Ulaanbaatar", "Asia/Urumqi", "Asia/Ust-Nera", "Asia/Vladivostok", "Asia/Yakutsk", "Asia/Yangon", "Asia/Yekaterinburg", "Asia/Yerevan", "Atlantic/Azores", "Atlantic/Bermuda", "Atlantic/Canary", "Atlantic/Cape_Verde", "Atlantic/Faroe", "Atlantic/Madeira", "Atlantic/Reykjavik", "Atlantic/South_Georgia", "Atlantic/Stanley", "Australia/Adelaide", "Australia/Brisbane", "Australia/Broken_Hill", "Australia/Currie", "Australia/Darwin", "Australia/Eucla", "Australia/Hobart", "Australia/Lindeman", "Australia/Lord_Howe", "Australia/Melbourne", "Australia/Perth", "Australia/Sydney", "Europe/Amsterdam", "Europe/Andorra", "Europe/Astrakhan", "Europe/Athens", "Europe/Belgrade", "Europe/Berlin", "Europe/Brussels", "Europe/Bucharest", "Europe/Budapest", "Europe/Chisinau", "Europe/Copenhagen", "Europe/Dublin", "Europe/Gibraltar", "Europe/Helsinki", "Europe/Istanbul", "Europe/Kaliningrad", "Europe/Kiev", "Europe/Kirov", "Europe/Lisbon", "Europe/London", "Europe/Luxembourg", "Europe/Madrid", "Europe/Malta", "Europe/Minsk", "Europe/Monaco", "Europe/Moscow", "Europe/Oslo", "Europe/Paris", "Europe/Prague", "Europe/Riga", "Europe/Rome", "Europe/Samara", "Europe/Saratov", "Europe/Simferopol", "Europe/Sofia", "Europe/Stockholm", "Europe/Tallinn", "Europe/Tirane", "Europe/Ulyanovsk", "Europe/Uzhgorod", "Europe/Vienna", "Europe/Vilnius", "Europe/Volgograd", "Europe/Warsaw", "Europe/Zaporozhye", "Europe/Zurich", "Indian/Chagos", "Indian/Christmas", "Indian/Cocos", "Indian/Kerguelen", "Indian/Mahe", "Indian/Maldives", "Indian/Mauritius", "Indian/Reunion", "Pacific/Apia", "Pacific/Auckland", "Pacific/Bougainville", "Pacific/Chatham", "Pacific/Chuuk", "Pacific/Easter", "Pacific/Efate", "Pacific/Enderbury", "Pacific/Fakaofo", "Pacific/Fiji", "Pacific/Funafuti", "Pacific/Galapagos", "Pacific/Gambier", "Pacific/Guadalcanal", "Pacific/Guam", "Pacific/Honolulu", "Pacific/Kiritimati", "Pacific/Kosrae", "Pacific/Kwajalein", "Pacific/Majuro", "Pacific/Marquesas", "Pacific/Nauru", "Pacific/Niue", "Pacific/Norfolk", "Pacific/Noumea", "Pacific/Pago_Pago", "Pacific/Palau", "Pacific/Pitcairn", "Pacific/Pohnpei", "Pacific/Port_Moresby", "Pacific/Rarotonga", "Pacific/Tahiti", "Pacific/Tarawa", "Pacific/Tongatapu", "Pacific/Wake", "Pacific/Wallis"],
            DefaultView: true,
            Order: 1
        }, {
            Title: 'CustomTheme',
            FieldTypeKind: 6,
            Choices: ['blue', 'indigo', 'purple', 'pink', 'red', 'orange', 'yellow', 'green', 'teal', 'cyan'],
            DefaultView: true,
            Order: 1
        }, {
            Title: 'CustomShape',
            FieldTypeKind: 6,
            Choices: ['circle', 'square'],
            DefaultView: true,
            Order: 1
        }],
        predefinedData: []
    },
    templates: ['All']

}];