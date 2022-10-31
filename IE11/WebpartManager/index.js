"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InstallList = InstallList;
exports.RemoveList = RemoveList;

var _FactoryMin = require("./Factory.min.js");

var _FactoryMin2 = _interopRequireDefault(_FactoryMin);

var _Route = require("./Route.js");

var _Route2 = _interopRequireDefault(_Route);

var _WebpartsList = require("./Webparts.List.js");

var _WebpartsList2 = _interopRequireDefault(_WebpartsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function InstallList(event) {

    var isPointerEvent = event && event.constructor && event.constructor.name && event.constructor.name === 'PointerEvent';
    var Element = void 0,
        OriginalHTML = void 0;

    if (isPointerEvent) {
        Element = event.target.tagName === 'BUTTON' ? event.target : event.target.closest('button');

        OriginalHTML = Element.innerHTML;

        $(Element).attr('disabled', '') // Disable button;
        .html( /*html*/"\n        <span class=\"spinner-border spinner-border-sm\" \n            role=\"status\" \n            aria-hidden=\"true\">\n        </span> Installing...");
    }

    var _getWebpart = this.getWebpart();

    var schema = _getWebpart.schema;

    var Web = this.Web;
    var Callback = this.callback;
    var List = await _Route2.default.Get(Web.Url + "/_api/Web/Lists/getByTitle('" + schema.list.Title + "')");
    if (List) {
        alert('This list has already been created!');
        if (isPointerEvent) $(Element).html(OriginalHTML).removeAttr('disabled');
    } else {
        var ReqDigest = await _Route2.default.GetRequestDigest();
        var NewList = await (0, _FactoryMin2.default)({
            Route: _Route2.default,
            Web: Web
        }, {
            AddViewFieldTitle: false,
            AddViewFieldGUID: false,
            List: schema.list,
            Fields: schema.fields,
            PredefinedData: schema.predefinedData
        }, Callback);

        /** Clean up the Title field, change Title required to false; */
        return _Route2.default.Patch(NewList.__metadata.uri + "/Fields/getByTitle('Title')", {
            Required: false,
            Hidden: false,
            __metadata: {
                type: 'SP.FieldText'
            }
        }, ReqDigest).then(function (data) {
            return location.reload();
        });
    }
} /** 
   * index.js
   * @author Wilfredo Pacheco
   */

// import CreateList from "./Factory.List.Create.js";
async function RemoveList(event) {

    var isPointerEvent = event && event.constructor && event.constructor.name && event.constructor.name === 'PointerEvent';
    var Element = void 0,
        OriginalHTML = void 0;

    if (isPointerEvent) {
        Element = event.target.tagName === 'BUTTON' ? event.target : event.target.closest('button');

        OriginalHTML = Element.innerHTML;

        $(Element).attr('disabled', '') // Disable button;
        .html( /*html*/"\n        <span class=\"spinner-border spinner-border-sm\" \n            role=\"status\" \n            aria-hidden=\"true\">\n        </span> Removing...");
    }

    var _getWebpart2 = this.getWebpart();

    var schema = _getWebpart2.schema;

    var Web = this.Web;
    var List = await _Route2.default.Get(Web.Url + "/_api/Web/Lists/getByTitle('" + schema.list.Title + "')");
    var ReqDigest = await _Route2.default.GetRequestDigest();
    if (!List) {
        alert('This list has not been created!');
        if (isPointerEvent) $(Element).html(OriginalHTML).removeAttr('disabled');
    } else return _Route2.default.Delete(List.__metadata.uri, ReqDigest).then(function (data) {
        return location.reload();
    });
}

var xIcon = /*svg*/"\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-x-circle-fill text-danger\" viewBox=\"0 0 16 16\">\n    <path d=\"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z\"/>\n</svg>";

var checkIcon = /*svg*/"\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-check-circle-fill text-success\" viewBox=\"0 0 16 16\">\n    <path d=\"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z\"/>\n</svg>";

(function () {
    var WEBPARTS = arguments.length <= 0 || arguments[0] === undefined ? _WebpartsList2.default : arguments[0];


    var Container = document.createElement('div');
    var DisplayElement = document.createElement('div');
    var SharePointBlue = '#0072c6';

    /** DOMContentLoaded Event; */
    document.addEventListener('DOMContentLoaded', function RenderContent(event) {
        $(document.body).fadeOut().hide();
        $(document.head).append( /*html*/"\n        <link rel=\"shortcut icon\" \n              href=\"/_layouts/15/images/favicon.ico?rev=23\" \n              type=\"image/vnd.microsoft.icon\" \n              id=\"favicon\" \n        />");
        $(document.head).append( /*html*/"\n        <style>\n            :root { --SharePointBlue: " + SharePointBlue + "; }\n            .text-sp { color: var(--SharePointBlue) !important; }\n            .bg-sp { background-color: var(--SharePointBlue) !important; }\n            .f-12 { font-size: 12px !important }\n            footer {\n                bottom: 0;\n                height: 45px; /* Set the fixed height of the footer here */\n                line-height: 60px; /* Vertically center the text there */\n            }\n        </style>");
        document.title = 'Webpart Manager';
        $(document.body).append( /*html*/"<!-- Microsoft SharePoint Icon -->\n        <img class=\"ml-4\" src=\"_layouts/15/images/siteIcon.png?rev=40\" />");
        document.body.append(Container);
        document.body.classList.add('pt-3');
        document.body.classList.add('bg-sp');
        Container.classList = 'card-body col-xl-9 col-lg-11 shadow-lg mx-auto bg-light mt-4';
        Container.setAttribute('style', 'border-radius: 1.25rem!important;');
        Container.innerHTML = /*html*/"<!-- Form Container Content -->\n        <div class=\"p-4 text-center text-sp\">\n            <h1>" + document.title + "</h1>\n        </div>\n        <div class=\"my-3 pb-2\">\n            <nav class=\"nav nav-pills flex-column flex-sm-row\">\n                <a class=\"flex-sm-fill text-sm-center nav-link active\" href=\"#All\">All</a>\n                <a class=\"flex-sm-fill text-sm-center nav-link\" href=\"#template-1\">Template 1</a>\n                <a class=\"flex-sm-fill text-sm-center nav-link\" href=\"#template-2\">Template 2</a>\n                <a class=\"flex-sm-fill text-sm-center nav-link\" href=\"#template-3\">Template 3</a>\n            </nav>\n        </div>\n        <div id=\"settings-panel\"></div>\n        <table class=\"table table-sm table-hover text-sp\">\n            <thead>\n                <tr>\n                    <th>Title</th>\n                    <th>Description</th>\n                    <th class=\"text-center d-none\">Template</th>\n                    <th class=\"text-center\">Installed</th>\n                    <th class=\"text-center\">Actions</th>\n                </tr>\n            </thead>\n            <tbody></tbody>\n        </table>";
    });

    /** window.onload Event; */
    async function init() {

        var SettingsPanel = Container.querySelector('div#settings-panel');
        var TableBody = Container.querySelector('table tbody');

        /*JoePC*/console.info('jQuery:', $ && $.fn && $.fn.jquery);
        /*JoePC*/console.info('Bootstrap:', $ && $.f && $.fn.tooltip && $.fn.tooltip.Constructor && $.fn.tooltip.Constructor.VERSION);

        /** Call to get the Microsoft SharePoint Web Object; */
        var Web = await _Route2.default.init(_Route.SiteCollectionUrl + "/_api/Web", {
            $select: '*',
            $expand: 'Lists'
        });

        Object.assign(window, {
            Web: Web,
            Route: _Route2.default
        });

        SettingsPanel.classList = 'text-right mb-2';
        SettingsPanel.innerHTML = /*html*/"\n        <a class=\"m-1\" href=\"" + Web.Url + "\" target=\"_blank\">Home</a>\n        <a class=\"m-1\" href=\"" + Web.Url + "/_layouts/15/viewlsts.aspx\" target=\"_blank\">Site Contents</a>\n        <a class=\"m-1\" href=\"" + Web.Url + "/_layouts/15/Settings.aspx\" target=\"_blank\">Settings</a>";

        WEBPARTS.forEach(function (wp) {

            var IconContainer = document.createElement('span');
            var isFound = Web.getListDetails(wp.schema.list.Title);
            IconContainer.innerHTML = !!isFound ? checkIcon : xIcon;

            var title = wp.title;
            var id = wp.id;

            var tr = document.createElement('tr');
            tr.innerHTML = /*html*/"\n            <td>" + title + "</td>\n            <td class=\"f-12\">" + (wp.schema.list.Description || 'N/A') + "</td>\n            <td class=\"text-center d-none\">" + xIcon + "</td>\n            <td class=\"text-center\">" + IconContainer.outerHTML + "</td>\n            <td class=\"text-center\">\n                <div class=\"btn-group\" role=\"group\" aria-label=\"Basic example\">\n                    <button type=\"button\" id=\"install-" + id + "\" class=\"btn btn-outline-secondary btn-sm\">Install</button>\n                    <button type=\"button\" id=\"remove-" + id + "\" class=\"btn btn-outline-secondary btn-sm\">Remove</button>\n                    <a id=\"link-" + id + "\" href=\"" + (!!isFound ? Web.Url + "/Lists/" + wp.schema.list.Title + "/AllItems.aspx" : "javascript:alert('The list " + wp.schema.list.Title + " has not been created, please click the install button to create the list.');") + "\" class=\"btn btn-outline-secondary btn-sm\" " + (!!isFound ? "target=\"_blank\"" : '') + " >\n                        <img style=\"width: 16px;\" src=\"/_layouts/15/images/favicon.ico?rev=23\" /> Visit List</a>\n                </div>\n            </td>";

            var InstallButton = tr.querySelector("button#install-" + id);
            var RemoveButton = tr.querySelector("button#remove-" + id);
            InstallButton.addEventListener('click', InstallList);
            RemoveButton.addEventListener('click', RemoveList);
            wp.TR = tr;

            Object.assign(InstallButton, {
                Route: _Route2.default,
                Web: Web,
                getWebpart: function getWebpart() {
                    return wp;
                },
                callback: function callback(message) {
                    var div = document.createElement('div');
                    div.classList = 'text-primary';
                    div.setAttribute('style', 'font-size: 12px;');
                    div.innerText = message;
                    DisplayElement.append(div);
                    document.documentElement.scrollTop = document.body.scrollTop = document.body.scrollHeight;
                }
            });

            Object.assign(RemoveButton, {
                Route: _Route2.default,
                Web: Web,
                getWebpart: function getWebpart() {
                    return wp;
                }
            });

            TableBody.append(tr);
            return wp;
        });

        Container.append(DisplayElement);
        $(document.body).append( /*html*/"<!-- Footer Element -->\n        <footer class=\"m-4 text-center text-white f-12\">\n            <p class=\"text-SPFooter\">\n                <svg class=\"bi bi-building\" width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path fill-rule=\"evenodd\" d=\"M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694L1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z\"></path><path d=\"M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z\"></path>\n                </svg> Developed by <strong>DHA J-5 AED Knowledge Management</strong>\n            </p>\n            <p hidden>&copy; 2022 DHA J-5 AED Knowledge Management</p>\n        </footer>");

        var TemplateOptions = Array.from(Container.querySelectorAll('a.nav-link'));
        TemplateOptions.map(function (a) {
            a.addEventListener('click', function TemplateSelectEvent(event) {
                TemplateOptions.map(function (el) {
                    return el.classList.remove('active');
                });
                this.classList.add('active');
            });
        });

        window.addEventListener('popstate', function (event) {
            var _location = location;
            var hash = _location.hash;

            var Str = hash.replace('#', '');
            WEBPARTS.map(function (wp) {

                /** Only show the filtered webparts; */
                if (wp && wp.templates && wp.templates.includes(Str)) $(wp.TR).fadeIn();else $(wp.TR).fadeOut('fast', function () {
                    $(wp.TR).hide();
                });

                /** Assign the predefinedData if the element has it for the template; */
                if (wp[Str]) wp.schema.predefinedData = wp[Str];else wp.schema.predefinedData = [];
            });
        });

        if (location.hash) {
            (function () {
                var _location2 = location;
                var hash = _location2.hash;

                TemplateOptions.map(function (a) {
                    if (a.getAttribute('href') === hash) a.click();
                });
            })();
        }

        return $(document.body).fadeIn();
    }

    window.onload = init;
})();