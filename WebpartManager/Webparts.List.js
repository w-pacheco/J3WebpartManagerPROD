/**
 * Webparts.List.js
 * @author Wilfredo Pacheco
 */

export default [{
    title: 'Layout',
    id: 'layout',
    schema: {
        list: {
            Title: 'Layout',
            Description: 'Used to manage the custom webpart element, this list is required to add weparts.',
            BaseTemplate: 100,
        },
        fields: [{
            Title: 'LayoutTitle',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        },{
            Title: 'WebpartType',
            FieldTypeKind: 6,
            DefaultView: true,
            Choices: [
                'WebpartContent',
                'Carousel',
                'ContentElement',
                'Staff',
                'Announcements',
                'Events',
                'MainLinks',
                'BranchLinks',
                'ContactInfo',
            ],
            Order: 1
        },{
            Title: 'WebpartSide',
            FieldTypeKind: 6,
            DefaultView: true,
            Choices: [
                'LeftSide',
                'RightSide',
            ],
            Order: 1
        },{
            Title: 'WebpartOrder',
            FieldTypeKind: 9,
            DefaultView: true,
            Order: 1
        }],
        predefinedData: []
    },
    templates: [
        'All',
        'template-1',
        'template-2',
        'template-3',
    ],
    'template-1': [{ 
        "WebpartType": "WebpartContent", 
        "WebpartSide": "LeftSide", 
        "WebpartOrder": 1 
    },{ 
        "WebpartType": "Carousel", 
        "WebpartSide": "LeftSide", 
        "WebpartOrder": 2 
    },{ 
        "WebpartType": "ContentElement", 
        "WebpartSide": "LeftSide", 
        "WebpartOrder": 3 
    },{ 
        "WebpartType": "Staff", 
        "WebpartSide": "RightSide", 
        "WebpartOrder": 1 
    },{ 
        "WebpartType": "MainLinks", 
        "WebpartSide": "RightSide", 
        "WebpartOrder": 2 
    }],
    'template-2': [{
        "WebpartType":"WebpartContent",
        "WebpartSide":"LeftSide",
        "WebpartOrder":1
    },{
        "WebpartType":"Carousel",
        "WebpartSide":"LeftSide",
        "WebpartOrder":2
    },{
        "WebpartType":"ContentElement",
        "WebpartSide":"LeftSide",
        "WebpartOrder":3
    },{
        "WebpartType":"Staff",
        "WebpartSide":"RightSide",
        "WebpartOrder":1
    },{
        "WebpartType":"MainLinks",
        "WebpartSide":"RightSide",
        "WebpartOrder":2
    },{
        "WebpartType":"Announcements",
        "WebpartSide":"RightSide",
        "WebpartOrder":3
    }],
    'template-3': [{
        "WebpartType":"BranchLinks",
        "WebpartSide":"LeftSide",
        "WebpartOrder":1
    },{
        "WebpartType":"Announcements",
        "WebpartSide":"LeftSide",
        "WebpartOrder":2
    },{
        "WebpartType":"Events",
        "WebpartSide":"LeftSide",
        "WebpartOrder":3
    },{
        "WebpartType":"Staff",
        "WebpartSide":"RightSide",
        "WebpartOrder":1
    },{
        "WebpartType":"MainLinks",
        "WebpartSide":"RightSide",
        "WebpartOrder":2
    }]
    
},{
    title: 'Webpart Content',
    id: 'webpart-content',
    schema: {
        list: {
            Title: 'WebpartContent',
            Description: 'This will be used to render the title and/or the sub title for the page.',
            BaseTemplate: 100,
        },
        fields: [{
            Title: 'ContentTitle',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        },{
            Title: 'SubTitle',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        }],
        predefinedData: []
    },
    templates: [
        'All',
        'template-1',
        'template-2',
        'template-3',
    ]
},{
    title: 'Carousel',
    id: 'carousel',
    schema: {
        list: {
            Title: 'Carousel',
            Description: 'Used to manage Carousel images and text.',
            BaseTemplate: 100,
        },
        fields: [{
            Title: 'ImageURL',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        },{
            Title: 'LinkURL',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        },{
            Title: 'LinkText',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        }],
        predefinedData: []
    },
    templates: [
        'All',
        'template-1',
    ]
},{
    title: 'Content Element',
    id: 'content-element',
    schema: {
        list: {
            Title: 'ContentElement',
            Description: 'Used to manage Mission/Vision list content images and text.',
            BaseTemplate: 100,
        },
        fields: [{
            Title: 'ContentCategory', // Currently not in use;
            FieldTypeKind: 2,
            DefaultView: false,
            Order: 1
        },{
            Title: 'ContentTitle',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        },{
            Title: 'Description',
            FieldTypeKind: 3,
            DefaultView: true,
            Order: 1
        }],
        predefinedData: []
    },
    templates: [
        'All',
        'template-1',
    ]
},{
    title: 'Staff',
    id: 'staff',
    schema: {
        list: {
            Title: 'Staff',
            Description: 'Used to manage Staff members for the POC wepart, including the main POC.',
            BaseTemplate: 100,
        },
        fields: [{
            Title: 'UserTitle',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        },{
            Title: 'UserEmail',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        },{
            Title: 'Phone',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        },{
            Title: 'JobTitle',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        },{
            Title: 'MainPOC',
            FieldTypeKind: 8,
            DefaultView: true,
            Order: 1
        },{
            Title: 'SortOrder',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        },{
            Title: 'ImageURL',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        },{
            Title: 'ImageDescription', // Currently not in use;
            FieldTypeKind: 2,
            DefaultView: false,
            Order: 1
        },{
            Title: 'LeadershipBioURL',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        },{
            Title: 'LeadershipBioDescription', // Currently not in use;
            FieldTypeKind: 2,
            DefaultView: false,
            Order: 1
        }],
        predefinedData: []
    },
    templates: [
        'All',
        'template-1',
        'template-2',
    ]
},{
    title: 'Announcements',
    id: 'announcements',
    schema: {
        list: {
            Title: 'Announcements',
            Description: 'Used to manage announcements for the custom webpart.',
            BaseTemplate: 100,
        },
        fields: [{
            Title: 'AnnouncementTitle',
            FieldTypeKind: 2, // SLOT;
            DefaultView: true,
            Order: 1
        },{
            Title: 'Body',
            FieldTypeKind: 3, // MLOT;
            DefaultView: true,
            Order: 1
        },{
            Title: 'EventDate',
            FieldTypeKind: 4, // Date;
            DefaultView: true,
            Order: 1
        },{
            Title: 'Expires',
            FieldTypeKind: 4, // Date;
            DefaultView: true,
            Order: 1
        }],
        predefinedData: []
    },
    templates: [
        'All',
        'template-2',
        'template-3',
    ]
},{
    title: 'Events',
    id: 'events',
    schema: {
        list: {
            Title: 'Events',
            Description: 'Used to manage events for the custom webpart.',
            BaseTemplate: 100,
        },
        fields: [{
            Title: 'EventTitle',
            FieldTypeKind: 2, // SLOT;
            DefaultView: true,
            Order: 1
        },{
            Title: 'Body',
            FieldTypeKind: 3, // MLOT;
            DefaultView: true,
            Order: 1
        },{
            Title: 'EventDate',
            FieldTypeKind: 4, // Date;
            DefaultView: true,
            Order: 1
        },{
            Title: 'Expires',
            FieldTypeKind: 4, // Date;
            DefaultView: true,
            Order: 1
        }],
        predefinedData: []
    },
    templates: [
        'All',
        'template-2',
        'template-3',
    ]
},{
    title: 'Main Links',
    id: 'main-links',
    schema: {
        list: {
            Title: 'MainLinks',
            Description: 'Used to create main link for the all templates.',
            BaseTemplate: 100,
        },
        fields: [{
            Title: 'MainLinkTitle',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        },{
            Title: 'LinkURL',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        }],
        predefinedData: []
    },
    templates: [
        'All',
        'template-1',
        'template-2',
        'template-3',
    ]
},{
    title: 'Branch Links',
    id: 'branch-links',
    schema: {
        list: {
            Title: 'BranchLinks',
            Description: 'Used to create branch link for the branch template.',
            BaseTemplate: 100,
        },
        fields: [{
            Title: 'BranchLinkTitle',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        },{
            Title: 'LinkURL',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        },{
            Title: 'BranchIcon',
            FieldTypeKind: 6,
            Choices: [
                'File', 
                'Folder', 
                'MapMarker', 
                'Binoculars', 
                'OrgChart', 
                'ClipBoard',
            ],
            DefaultView: true,
            Order: 1
        }],
        predefinedData: []
    },
    templates: [
        'All',
        'template-3',
    ]

},{
    title: 'Contact Info',
    id: 'contact-info',
    schema: {
        list: {
            Title: 'ContactInfo',
            Description: 'Used to manage the contact info widget.',
            BaseTemplate: 100,
        },
        fields: [{
            Title: 'ContactTitle',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        },{
            Title: 'ContactInfo',
            FieldTypeKind: 2,
            DefaultView: true,
            Order: 1
        },{
            Title: 'ContactIcon',
            FieldTypeKind: 6,
            Choices: [
                'Phone', 
                'Email', 
            ],
            DefaultView: true,
            Order: 1
        }],
        predefinedData: []
    },
    templates: [
        'All',
        'template-3',
    ]

}];