/**
 * custom.js
 * @desctipion Used to add custom webparts to an out of the box Microsoft SharePoint site.
 * @author Wilfredo Pacheco
 */

(function(){
    
    document.addEventListener('DOMContentLoaded', function init(event){

        // console.info('jQuery:', $?.fn?.jquery);
        // console.info('Bootstrap:', $?.fn?.tooltip?.Constructor?.VERSION);
    
        const { href } = location;
        const SP_HEADER = document.querySelector('#s4-bodyContainer > div.CompleteArea > header');
        const ContainerEl = document.body.querySelector('div.MainContentArea') || document.querySelector('div#contentBox');

        function ModifyHeader(HeaderEl){
            if (!HeaderEl) throw new Error('Missing container element!');
            $(HeaderEl)?.fadeOut()?.hide();
            SP_HEADER.setAttribute('style', 'padding-left: 20px !important;');
            const StyleEl = document.createElement('style');
            StyleEl.innerText = /*css*/`
            /* Header image elements */
            img {
                border: none;
                float: left;
            }
    
            /* Hides the links above the search bar */
            div#_hdrlinks,
            #s4-bodyContainer > div.CompleteArea > header > div.hdrimagesection,
            #s4-bodyContainer > div.CompleteArea > header > div.hdrmidoutersection { 
                display: none; 
            }
    
            /* Header Element */
            #s4-bodyContainer > div.CompleteArea > header {
                background: rgba(56, 65, 122, 1);
                background: linear-gradient(72deg, rgba(56, 65, 122, 1) 0%, rgb(30 30 30) 100%);
                border-radius: 0.25rem;
            }
    
            header {
                background-color: white;
                padding-left: 50px;
                line-height: 85px;
                min-height: 90px;
                position:relative;
                height: unset;
            }
            
            h1#doc-title {
                max-width: calc( 100vw - 581px);
                line-height: 50px;
                padding-top: 20px;
                position: inherit !important;
            }
            
            .hdrsearchsection {
                position: absolute;
                top: 0px;
                right: 0px;
                float: right;
                display: table-cell;
                padding-top: 15px;
                padding-right: 40px;
                line-height: 75px;
                width: 265px;
            }
    
            /* Search Box Container */
            [data-name="SearchBox"] {
                position: absolute;
                transform: translate(2%, -95%);
            }
            .ms-srch-sb-border {
                background-color: inherit;
                border: none;
                transition: 0.5s;
            }
            .ms-srch-sb-border:hover {
                border: none;
            }
    
            /* Search Input Element used on stg16.info.health.mil */
            input#ctl00_ctl53_csr_sbox{
                border-radius: 29.5px !important;
                background-color: #ffffff;
                padding: 12px;
            }

            /* Search Input Element used on info.health.mil */
            input#ctl00_ctl52_csr_sbox {
                border-radius: 29.5px !important;
                background-color: #ffffff;
                padding: 4px 12px;
            }`;
            
            // <h2 style="color: white;">document.title</h2>
            $(HeaderEl).prepend(/*html*/`<!-- seal & document title -->
            <div>
                <img src="/sites/dos/J3/Media/DHA%20SEAL%20SMALL.png" 
                        title="Defense Health Agency Seal" 
                        style="margin-top: 14px;" 
                        width="60" 
                />
                <img src="/sites/dos/J3/Media/DHA%20JOC%20seal%20111721.png" 
                        title="Defense Health Agency Seal" 
                        style="margin-top: 6px;margin-left: 6px;" 
                        width="75" 
                />
                <h1 id="doc-title" style="color: white;position: absolute;margin-left: 153px;">document.title</h1>
            </div>`);
            HeaderEl.parentNode.prepend(StyleEl);
            
            const H1ELEMENT = HeaderEl.querySelector('h1#doc-title');
            $(H1ELEMENT).hide();
            $(HeaderEl)?.fadeIn();
    
            /** updateText is a method used to update the innerText of this element with the required title; */
            HeaderEl.updateText = function updateText(headerStr){
                H1ELEMENT.innerText = headerStr;
                $(H1ELEMENT).fadeIn();
            }
    
            return HeaderEl;
        }

        const HOMEPAGEBODY = /*html*/`
        <body class="w-100 p-2" style="position: absolute;">
            <div>
                <div class="card border-0 main">
                    <div class="card-body row w-100 p-0">

                        <!-- Left Group -->
                        <div class="col-lg-7 p-2" data-side="left" id="left-group"></div>

                        <!-- Right Group -->
                        <div class="col-lg-5 p-2" data-side="right" id="right-group"></div>

                    </div>
                </div>

                <!-- Footer Element -->

                <div class="m-4 text-center f12">
                    <p class="text-SPFooter">
                        <svg class="bi bi-building" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694L1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z">
                            </path>
                            <path
                                d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z">
                            </path>
                        </svg> Developed by <strong>DHA J-5 AED Knowledge Management</strong>
                    </p>
                    <p hidden="">© 2022 DHA J-5 AED Knowledge Management</p>
                </div>
            </div>
        </body>`
    
        if (href.includes('HomePage.aspx'))
        {
            window.addEventListener('load', async function(event){

                /** Load jQuery; */
                const script = document.createElement('script');
                document.head.append(script);
                script.innerHTML = await fetch(`${_spPageContextInfo.webAbsoluteUrl}/HomePageRepo/jquery-3.4.1.js`)
                .then(content => content.text());

                /** Change the header & empty the container element; */
                try{
                    ModifyHeader(SP_HEADER); /** Update the header with the seals & background; */
                }catch(e){}
                $(ContainerEl).empty(); /** Remove any HTML in the container element; */

                const [
                    BootstrapJS,
                    homepageJS,
                ] = await Promise.all([
                    $.get(`${_spPageContextInfo.webAbsoluteUrl}/HomePageRepo/Bootstrap5/bootstrap.js`),
                    $.get(`${_spPageContextInfo.webAbsoluteUrl}/HomePageRepo/homepage.js`),
                ]);

                ContainerEl.innerHTML = /*html*/`
                <link rel="stylesheet" href="${_spPageContextInfo.webAbsoluteUrl}/HomePageRepo/Bootstrap5/bootstrap.min.css">
                <link rel="stylesheet" href="${_spPageContextInfo.webAbsoluteUrl}/HomePageRepo/homepage.css">
                <script type="text/javascript" data-bootstrap>${BootstrapJS}</script>
                ${HOMEPAGEBODY}
                <script type="text/javascript" data-custom-home>${homepageJS}</script>`
                console.info('custom.js | Content added.');
            });
        }
        else console.info('custom.js | No content added.');
    });

})();