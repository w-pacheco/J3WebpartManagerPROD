/** 
 * index.js
 * @author Wilfredo Pacheco
 */

// import CreateList from "./Factory.List.Create.js";
import CreateList from "./Factory.min.js";
import Route, { SiteCollectionUrl } from "./Route.js";
import webparts from "./Webparts.List.js";

export async function InstallList(event){

    const isPointerEvent = event?.constructor?.name === 'PointerEvent';
    let Element, OriginalHTML;

    if (isPointerEvent)
    {
        Element = event.target.tagName === 'BUTTON' ? 
        event.target : 
        event.target.closest('button');

        OriginalHTML = Element.innerHTML;

        $(Element)
        .attr('disabled', '') // Disable button;
        .html(/*html*/`
        <span class="spinner-border spinner-border-sm" 
            role="status" 
            aria-hidden="true">
        </span> Installing...`);
    }
    
    const { schema } = this.getWebpart();
    const Web = this.Web;
    const Callback = this.callback;
    const List = await Route.Get(`${Web.Url}/_api/Web/Lists/getByTitle('${schema.list.Title}')`);
    if (List)
    {
        alert('This list has already been created!');
        if (isPointerEvent) $(Element).html(OriginalHTML)
        .removeAttr('disabled');
    }
    else
    {
        const ReqDigest = await Route.GetRequestDigest();
        const NewList = await CreateList({
            Route, 
            Web,
        },{ 
            AddViewFieldTitle: false,
            AddViewFieldGUID: false,
            List: schema.list,
            Fields: schema.fields,
            PredefinedData: schema.predefinedData, 
        }, Callback);

        /** Clean up the Title field, change Title required to false; */
        return Route.Patch(`${NewList.__metadata.uri}/Fields/getByTitle('Title')`,{
            Required: false,
            Hidden: false,
            __metadata: {
                type: 'SP.FieldText'
            }
        }, ReqDigest)
        .then(data => location.reload());
    }
}

export async function RemoveList(event){

    const isPointerEvent = event?.constructor?.name === 'PointerEvent';
    let Element, OriginalHTML;

    if (isPointerEvent)
    {
        Element = event.target.tagName === 'BUTTON' ? 
        event.target : 
        event.target.closest('button');

        OriginalHTML = Element.innerHTML;

        $(Element)
        .attr('disabled', '') // Disable button;
        .html(/*html*/`
        <span class="spinner-border spinner-border-sm" 
            role="status" 
            aria-hidden="true">
        </span> Removing...`);
    }

    const { schema } = this.getWebpart();
    const Web = this.Web;
    const List = await Route.Get(`${Web.Url}/_api/Web/Lists/getByTitle('${schema.list.Title}')`);
    const ReqDigest = await Route.GetRequestDigest();
    if (!List)
    {
        alert('This list has not been created!');
        if (isPointerEvent) $(Element).html(OriginalHTML)
        .removeAttr('disabled');
    }
    else return Route.Delete(List.__metadata.uri, ReqDigest)
    .then(data => location.reload());
}

const xIcon = /*svg*/`
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill text-danger" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
</svg>`;

const checkIcon = /*svg*/`
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill text-success" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
</svg>`;

(function(WEBPARTS = webparts){

    const Container = document.createElement('div');
    const DisplayElement = document.createElement('div');
    const SharePointBlue = '#0072c6';

    /** DOMContentLoaded Event; */
    document.addEventListener('DOMContentLoaded', function RenderContent(event){
        $(document.body).fadeOut().hide();
        $(document.head).append(/*html*/`
        <link rel="shortcut icon" 
              href="/_layouts/15/images/favicon.ico?rev=23" 
              type="image/vnd.microsoft.icon" 
              id="favicon" 
        />`);
        $(document.head).append(/*html*/`
        <style>
            :root { --SharePointBlue: ${SharePointBlue}; }
            .text-sp { color: var(--SharePointBlue) !important; }
            .bg-sp { background-color: var(--SharePointBlue) !important; }
            .f-12 { font-size: 12px !important }
            footer {
                bottom: 0;
                height: 45px; /* Set the fixed height of the footer here */
                line-height: 60px; /* Vertically center the text there */
            }
        </style>`);
        document.title = 'Webpart Manager';
        $(document.body).append(/*html*/`<!-- Microsoft SharePoint Icon -->
        <img class="ml-4" src="_layouts/15/images/siteIcon.png?rev=40" />`);
        document.body.append(Container);
        document.body.classList.add('pt-3');
        document.body.classList.add('bg-sp');
        Container.classList = 'card-body col-xl-9 col-lg-11 shadow-lg mx-auto bg-light mt-4';
        Container.setAttribute('style', 'border-radius: 1.25rem!important;');
        Container.innerHTML = /*html*/`<!-- Form Container Content -->
        <div class="p-4 text-center text-sp">
            <h1>${document.title}</h1>
        </div>
        <div class="my-3 pb-2">
            <nav class="nav nav-pills flex-column flex-sm-row">
                <a class="flex-sm-fill text-sm-center nav-link active" href="#All">All</a>
                <a class="flex-sm-fill text-sm-center nav-link" href="#template-1">Template 1</a>
                <a class="flex-sm-fill text-sm-center nav-link" href="#template-2">Template 2</a>
                <a class="flex-sm-fill text-sm-center nav-link" href="#template-3">Template 3</a>
            </nav>
        </div>
        <div id="settings-panel"></div>
        <table class="table table-sm table-hover text-sp">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th class="text-center d-none">Template</th>
                    <th class="text-center">Installed</th>
                    <th class="text-center">Actions</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>`
    });
    
    /** window.onload Event; */
    async function init(){

        const SettingsPanel = Container.querySelector('div#settings-panel');
        const TableBody = Container.querySelector('table tbody');

        console.info('jQuery:', $?.fn?.jquery);
        console.info('Bootstrap:', $?.fn?.tooltip?.Constructor?.VERSION);

        /** Call to get the Microsoft SharePoint Web Object; */
        const Web = await Route.init(`${SiteCollectionUrl}/_api/Web`, {
            $select: '*',
            $expand: 'Lists',
        });

        Object.assign(window,{
            Web,
            Route,
        })

        SettingsPanel.classList = 'text-right mb-2';
        SettingsPanel.innerHTML = /*html*/`
        <a class="m-1" href="${Web.Url}" target="_blank">Home</a>
        <a class="m-1" href="${Web.Url}/_layouts/15/viewlsts.aspx" target="_blank">Site Contents</a>
        <a class="m-1" href="${Web.Url}/_layouts/15/Settings.aspx" target="_blank">Settings</a>`;

        WEBPARTS.forEach(wp => {

            const IconContainer = document.createElement('span');
            const isFound = Web.getListDetails(wp.schema.list.Title);
            IconContainer.innerHTML = !!isFound ?
            checkIcon : 
            xIcon;

            const { title, id } = wp;
            const tr = document.createElement('tr');
            tr.innerHTML = /*html*/`
            <td>${title}</td>
            <td class="f-12">${wp.schema.list.Description || 'N/A'}</td>
            <td class="text-center d-none">${xIcon}</td>
            <td class="text-center">${IconContainer.outerHTML}</td>
            <td class="text-center">
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" id="install-${id}" class="btn btn-outline-secondary btn-sm">Install</button>
                    <button type="button" id="remove-${id}" class="btn btn-outline-secondary btn-sm">Remove</button>
                    <a id="link-${id}" href="${
                        !!isFound ? 
                        `${Web.Url}/Lists/${wp.schema.list.Title}/AllItems.aspx` :
                        `javascript:alert('The list ${wp.schema.list.Title} has not been created, please click the install button to create the list.');`
                    }" class="btn btn-outline-secondary btn-sm" ${
                        !!isFound ? 
                        `target="_blank"` :
                        ''
                    } >
                        <img style="width: 16px;" src="/_layouts/15/images/favicon.ico?rev=23" /> Visit List</a>
                </div>
            </td>`;

            const InstallButton = tr.querySelector(`button#install-${id}`);
            const RemoveButton = tr.querySelector(`button#remove-${id}`);
            InstallButton.addEventListener('click', InstallList);
            RemoveButton.addEventListener('click', RemoveList);
            wp.TR = tr;

            Object.assign(InstallButton, {
                Route,
                Web,
                getWebpart(){
                    return wp;
                },
                callback(message){
                    const div = document.createElement('div');
                    div.classList = 'text-primary';
                    div.setAttribute('style', 'font-size: 12px;');
                    div.innerText = message;
                    DisplayElement.append(div);
                    document.documentElement.scrollTop = document.body.scrollTop = document.body.scrollHeight;
                }
            });

            Object.assign(RemoveButton, {
                Route,
                Web,
                getWebpart(){
                    return wp;
                },
            });

            TableBody.append(tr);
            return wp;
        });

        Container.append(DisplayElement);
        $(document.body).append(/*html*/`<!-- Footer Element -->
        <footer class="m-4 text-center text-white f-12">
            <p class="text-SPFooter">
                <svg class="bi bi-building" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694L1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"></path><path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z"></path>
                </svg> Developed by <strong>DHA J-5 AED Knowledge Management</strong>
            </p>
            <p hidden>&copy; 2022 DHA J-5 AED Knowledge Management</p>
        </footer>`);

        const TemplateOptions = Array.from(Container.querySelectorAll('a.nav-link'));
        TemplateOptions.map(a => {
            a.addEventListener('click', function TemplateSelectEvent(event){
                TemplateOptions.map(el => el.classList.remove('active'));
                this.classList.add('active');
            });
        });

        window.addEventListener('popstate', function(event){
            const { hash } = location;
            const Str = hash.replace('#', '');
            WEBPARTS.map(wp => {

                /** Only show the filtered webparts; */
                if (wp?.templates?.includes(Str)) $(wp.TR).fadeIn();
                else $(wp.TR).fadeOut('fast', function(){
                    $(wp.TR).hide();
                });

                /** Assign the predefinedData if the element has it for the template; */
                if (wp[Str]) wp.schema.predefinedData = wp[Str];
                else wp.schema.predefinedData = [];
            });
        });

        if (location.hash)
        {
            const { hash } = location;
            TemplateOptions.map(a => {
                if (a.getAttribute('href') === hash) a.click();
            });
        }
        
        return $(document.body).fadeIn();
    }
    
    window.onload = init;

})();