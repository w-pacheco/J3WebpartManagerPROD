'use strict';

var _slicedToArray = function () {
    function sliceIterator(arr, i) {
        var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);if (i && _arr.length === i) break;
            }
        } catch (err) {
            _d = true;_e = err;
        } finally {
            try {
                if (!_n && _i["return"]) _i["return"]();
            } finally {
                if (_d) throw _e;
            }
        }return _arr;
    }return function (arr, i) {
        if (Array.isArray(arr)) {
            return arr;
        } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
        } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
    };
}();

/**
 * custom.js
 * @desctipion Used to add custom webparts to an out of the box Microsoft SharePoint site.
 * @author Wilfredo Pacheco
 */

(function () {

    document.addEventListener('DOMContentLoaded', function init(event) {

        /*JoePC*/console.info('jQuery:', $ && $.fn && $.fn.jquery);
        /*JoePC*/console.info('Bootstrap:', $ && $.f && $.fn.tooltip && $.fn.tooltip.Constructor && $.fn.tooltip.Constructor.VERSION);

        var _location = location;
        var href = _location.href;

        var SP_HEADER = document.querySelector('#s4-bodyContainer > div.CompleteArea > header');
        var ContainerEl = document.body.querySelector('div.MainContentArea') || document.querySelector('div#contentBox');

        function ModifyHeader(HeaderEl) {
            if (!HeaderEl) throw new Error('Missing container element!');
            /*JoePC*/ // $(HeaderEl)?.fadeOut()?.hide();
            SP_HEADER.setAttribute('style', 'padding-left: 20px !important;');
            var StyleEl = document.createElement('style');
            StyleEl.innerText = /*css*/'\n            /* Header image elements */\n            img {\n                border: none;\n                float: left;\n            }\n    \n            /* Hides the links above the search bar */\n            div#_hdrlinks,\n            #s4-bodyContainer > div.CompleteArea > header > div.hdrimagesection,\n            #s4-bodyContainer > div.CompleteArea > header > div.hdrmidoutersection { \n                display: none; \n            }\n    \n            /* Header Element */\n            #s4-bodyContainer > div.CompleteArea > header {\n                background: rgba(56, 65, 122, 1);\n                background: linear-gradient(72deg, rgba(56, 65, 122, 1) 0%, rgb(30 30 30) 100%);\n                border-radius: 0.25rem;\n            }\n    \n            header {\n                background-color: white;\n                padding-left: 50px;\n                line-height: 85px;\n                min-height: 90px;\n                position:relative;\n                height: unset;\n            }\n            \n            h1#doc-title {\n                max-width: calc( 100vw - 581px);\n                line-height: 50px;\n                padding-top: 20px;\n                position: inherit !important;\n            }\n            \n            .hdrsearchsection {\n                position: absolute;\n                top: 0px;\n                right: 0px;\n                float: right;\n                display: table-cell;\n                padding-top: 15px;\n                padding-right: 40px;\n                line-height: 75px;\n                width: 265px;\n            }\n    \n            /* Search Box Container */\n            [data-name="SearchBox"] {\n                position: absolute;\n                transform: translate(2%, -95%);\n            }\n            .ms-srch-sb-border {\n                background-color: inherit;\n                border: none;\n                transition: 0.5s;\n            }\n            .ms-srch-sb-border:hover {\n                border: none;\n            }\n    \n            /* Search Input Element used on stg16.info.health.mil */\n            input#ctl00_ctl53_csr_sbox{\n                border-radius: 29.5px !important;\n                background-color: #ffffff;\n                padding: 12px;\n            }\n\n            /* Search Input Element used on info.health.mil */\n            input#ctl00_ctl52_csr_sbox {\n                border-radius: 29.5px !important;\n                background-color: #ffffff;\n                padding: 4px 12px;\n            }';

            // <h2 style="color: white;">document.title</h2>
            $(HeaderEl).prepend( /*html*/'<!-- seal & document title -->\n            <div>\n                <img src="/sites/dos/J3/Media/DHA%20SEAL%20SMALL.png" \n                        title="Defense Health Agency Seal" \n                        style="margin-top: 14px;" \n                        width="60" \n                />\n                <img src="/sites/dos/J3/Media/DHA%20JOC%20seal%20111721.png" \n                        title="Defense Health Agency Seal" \n                        style="margin-top: 6px;margin-left: 6px;" \n                        width="75" \n                />\n                <h1 id="doc-title" style="color: white;position: absolute;margin-left: 153px;">document.title</h1>\n            </div>');
            HeaderEl.parentNode.prepend(StyleEl);

            var H1ELEMENT = HeaderEl.querySelector('h1#doc-title');
            $(H1ELEMENT).hide();
            /*JoePC*/ //           $(HeaderEl)?.fadeIn();

            /** updateText is a method used to update the innerText of this element with the required title; */
            HeaderEl.updateText = function updateText(headerStr) {
                H1ELEMENT.innerText = headerStr;
                $(H1ELEMENT).fadeIn();
            };

            return HeaderEl;
        }

        var HOMEPAGEBODY = /*html*/'\n        <body class="w-100 p-2" style="position: absolute;">\n            <div>\n                <div class="card border-0 main">\n                    <div class="card-body row w-100 p-0">\n\n                        <!-- Left Group -->\n                        <div class="col-lg-7 p-2" data-side="left" id="left-group"></div>\n\n                        <!-- Right Group -->\n                        <div class="col-lg-5 p-2" data-side="right" id="right-group"></div>\n\n                    </div>\n                </div>\n\n                <!-- Footer Element -->\n\n                <div class="m-4 text-center f12">\n                    <p class="text-SPFooter">\n                        <svg class="bi bi-building" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"\n                            xmlns="http://www.w3.org/2000/svg">\n                            <path fill-rule="evenodd"\n                                d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694L1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z">\n                            </path>\n                            <path\n                                d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z">\n                            </path>\n                        </svg> Developed by <strong>DHA J-5 AED Knowledge Management</strong>\n                    </p>\n                    <p hidden="">© 2022 DHA J-5 AED Knowledge Management</p>\n                </div>\n            </div>\n        </body>';

        if (href.includes('HomePage.aspx')) {
            window.addEventListener('load', async function (event) {

                /** Load jQuery; */
                var script = document.createElement('script');
                document.head.append(script);
                script.innerHTML = await fetch(_spPageContextInfo.webAbsoluteUrl + '/HomePageRepo/jquery-3.4.1.js').then(function (content) {
                    return content.text();
                });

                /** Change the header & empty the container element; */
                try {
                    ModifyHeader(SP_HEADER); /** Update the header with the seals & background; */
                } catch (e) {}
                $(ContainerEl).empty(); /** Remove any HTML in the container element; */

                var _ref = await Promise.all([$.get(_spPageContextInfo.webAbsoluteUrl + '/HomePageRepo/Bootstrap5/bootstrap.js'), $.get(_spPageContextInfo.webAbsoluteUrl + '/HomePageRepo/homepage.js')]);

                var _ref2 = _slicedToArray(_ref, 2);

                var BootstrapJS = _ref2[0];
                var homepageJS = _ref2[1];

                ContainerEl.innerHTML = /*html*/'\n                <link rel="stylesheet" href="' + _spPageContextInfo.webAbsoluteUrl + '/HomePageRepo/Bootstrap5/bootstrap.min.css">\n                <link rel="stylesheet" href="' + _spPageContextInfo.webAbsoluteUrl + '/HomePageRepo/homepage.css">\n                <script type="text/javascript" data-bootstrap>' + BootstrapJS + '</script>\n                ' + HOMEPAGEBODY + '\n                <script type="text/javascript" data-custom-home>' + homepageJS + '</script>';
                console.info('custom.js | Content added.');
            });
        } else console.info('custom.js | No content added.');
    });
})();