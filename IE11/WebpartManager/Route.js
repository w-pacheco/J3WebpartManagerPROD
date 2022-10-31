'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/**
 * Route.js
 * @author Wilfredo Pacheco
 */

var _location = location;
var href = _location.href;
var ParentFolderName = exports.ParentFolderName = 'HomePageRepo';
var SiteCollectionUrl = exports.SiteCollectionUrl = href.split(ParentFolderName)[0];

/** Error Messages; */
var MissingHeaders = 'SharepointApi | Headers are not defined!';
var MissingRequestDigest = 'SharepointApi | Request Digest is missing!';
var ErrorMessage = {
    MissingHeaders: MissingHeaders,
    MissingRequestDigest: MissingRequestDigest
};

var HEADERS = exports.HEADERS = {
    "GET": {
        "Content-Type": "application/json; charset=UTF-8",
        "Accept": "application/json; odata=verbose"
    },
    "POST": {
        "Content-Type": "application/json; odata=verbose",
        "Accept": "application/json; odata=verbose",
        "X-RequestDigest": null
    },
    "PATCH": {
        "Content-Type": "application/json; odata=verbose",
        "Accept": "application/json; odata=verbose",
        "X-HTTP-Method": "MERGE",
        "X-RequestDigest": null,
        "IF-MATCH": "*"
    },
    "DELETE": {
        "Content-Type": "application/json; odata=verbose",
        "Accept": "application/json; odata=verbose",
        "X-HTTP-Method": "DELETE",
        "X-RequestDigest": null,
        "IF-MATCH": "*"
    },
    "REQUEST_DIGEST": {
        "Accept": "application/json; odata=verbose"
    }
};

var GetRequestDigest = exports.GetRequestDigest = function GetRequestDigest(Url) {
    Url = Url || SiteCollectionUrl + '/_api/contextinfo';
    return fetch(Url, {
        method: 'POST',
        headers: HEADERS.REQUEST_DIGEST
    }).then(function (data) {
        return data.json();
    }).then(function (data) {
        return data.d.GetContextWebInformation.FormDigestValue;
    });
};

var Get = exports.Get = function Get(Url, Options) {
    if (Options && (typeof Options === 'undefined' ? 'undefined' : _typeof(Options)) === 'object') {
        Url = Url + '?' + Object.entries(Options).map(function (e) {
            return e[0] + '=' + e[1];
        }).join('&');
    }

    return fetch(Url, {
        method: 'GET',
        headers: HEADERS.GET
    }).then(function (data) {
        return data.json();
    }).then(function (data) {
        return data.d;
    });
};

var Post = exports.Post = function Post(Url, data, RequestDigest) {

    data = typeof data === 'string' ? data : JSON.stringify(data);

    if (!RequestDigest) throw new Error(ErrorMessage.MissingRequestDigest);

    var HEADER = HEADERS.POST;
    HEADER["X-RequestDigest"] = RequestDigest;

    return fetch(Url, {
        method: 'POST',
        body: data,
        headers: HEADER
    }).then(function (data) {
        return data.json();
    });
};

var Patch = exports.Patch = function Patch(Url, data, RequestDigest) {

    if (!RequestDigest) throw new Error(ErrorMessage.MissingRequestDigest);

    data = typeof data === 'string' ? data : JSON.stringify(data);

    var HEADER = HEADERS.PATCH;
    HEADER["X-RequestDigest"] = RequestDigest;

    return fetch(Url, {
        method: 'POST',
        body: data, // body data type must match "Content-Type" header
        headers: HEADER
    });
};

var Delete = exports.Delete = function DELETE(Url, RequestDigest) {

    if (!RequestDigest) throw new Error(ErrorMessage.MissingRequestDigest);

    var HEADER = HEADERS.DELETE;
    HEADER["X-RequestDigest"] = RequestDigest;

    return fetch(Url, {
        method: 'POST',
        headers: HEADER
    });
};

exports.default = {
    Headers: HEADERS,
    GetRequestDigest: GetRequestDigest,
    Get: Get,
    Post: Post,
    Patch: Patch,
    Delete: Delete,
    init: function init(url) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        if (!url) throw new Error('Missing URL!');
        return Get(url, options).then(function (Web) {
            return Object.assign(Web, {

                /** Returns all lists available; */
                getAllLists: function getAllLists() {
                    return this.Lists.results;
                },

                /** Returns an array of list objects; */
                getAllListTitles: function getAllListTitles() {
                    return this.getAllLists().map(function (item) {
                        return item.Title;
                    });
                },

                /** Returns list object by title; */
                // TODO: this would be cool if it took two variables, the property name, and the value in question;
                getListDetails: function getListDetails(listTitle) {
                    return this.getAllLists().find(function (item) {
                        return item.Title === listTitle;
                    });
                },

                /** Returns list count number value; */
                getListCount: function getListCount(listTitle) {
                    return this.getListDetails(listTitle).ItemCount;
                },

                /** Returns all list items for requested listTitle; */
                getAllListItems: function getAllListItems(listTitle) {
                    var results = this.getAllLists().find(function (list) {
                        return list.Title === listTitle;
                    }).Items.results;
                    return results ? results : new Array();
                },

                /** Returns list item object based on title and any key/value pair; */
                getListItem: function getListItem(listTitle, key, value) {
                    return this.getListDetails(listTitle).Items.results.find(function (item) {
                        return item[key] === value;
                    });
                },

                /** Returns array of list item objects; */
                /** This should define forms for editing/creating list items; */
                getListItemFields: function getListItemFields(listTitle) {
                    return this.getListDetails(listTitle).Fields.results.filter(function (item) {
                        return item.FromBaseType === false;
                    });
                },

                /** Returns the current user propery value from the web object if available; */
                getUser: function getUser() {
                    return this.CurrentUser;
                }
            });
        });
    }
};