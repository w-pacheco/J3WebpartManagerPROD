/**
 * homepage.js
 * @author John W. Westhuis
 */

function ShowBody(el, selector) {
    let parent = el.parentElement
    let body = parent.querySelector(selector)
    if (body.style.display === "none") {
        body.style.display = "block";
        el.classList.add("active");
    } else {
        body.style.display = "none";
        el.classList.remove("active");
    }
}

(function(){

    const appWebUrl = _spPageContextInfo.webAbsoluteUrl + '/';

    console.info('Home Page | Start Creation.....');
    getListItem("Layout", "?$orderby=WebpartOrder").then(webparts => {
        // console.log("success", webparts);
        const leftGroup = document.getElementById("left-group")
        const rightGroup = document.getElementById("right-group")

        webparts.forEach(webpart => {
            let el = BuildWebPart(webpart.WebpartType);
            if (webpart.WebpartSide === "LeftSide") leftGroup.append(el);
            else rightGroup.append(el);
        })

    }).catch(e => {
        console.log("error", e)
    })

    function BuildWebPart(type) {

        let div = document.createElement("div");

        getListItem(type).then(webpartData => {

            if (!webpartData.length) {
                console.log("no data found for " + type)
                return div
            }

            if (type === "WebpartContent") {
                // console.log("Creating Title", webpartData)
                div.innerHTML =
                    `<div class="title-group component-group">
                        
                    </div>`
                webpartData.forEach(data => {

                    let {
                        // ContentCategory,
                        ContentTitle,
                        SubTitle
                    } = data

                    let el = div.querySelector(".title-group")
                    el.innerHTML = el.innerHTML +
                        `<div class="main-title mt-3 bold">${ContentTitle}</div>
                        <div class="sub-title">${SubTitle || ''}</div>
                        <hr>`
                })

            }

            else if (type === "Carousel") {
                // console.log("Creating Carousel", webpartData)
                div.innerHTML =
                    `<style>
                        .carousel-control-next-icon,
                        .carousel-control-prev-icon {
                            width: 7rem;
                            height: 7rem;
                        }
                    </style>
                    <div class="carousel-group component-group">
                        <div id="myCarousel" class="carousel slide pointer-event" data-bs-ride="carousel">

                            <!-- carousel-indicators -->
                            <div class="carousel-indicators">
                            </div>

                            <!-- carousel-inner -->
                            <div class="carousel-inner">
                                
                                
                            </div>
                        </div>
                    </div>`

                webpartData.forEach((data, index) => {

                    let {
                        ImageURL,
                        LinkURL,
                        LinkText
                    } = data

                    //carousel indicators
                    if (index == 0) {
                        let indicator = div.querySelector(".carousel-indicators")
                        indicator.innerHTML = indicator.innerHTML + `<button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" aria-label="Slide 1" class="active" aria-current="true"></button>`

                         //carousel slides
                        let carousel = div.querySelector(".carousel-inner")
                        carousel.innerHTML = carousel.innerHTML +
                            ` <div class="carousel-item active" data-bs-interval="4000">
                                <img src="${ImageURL}"
                                    width="100%" height="350">
                                ${LinkText ? 
                                    `<div class="container">
                                        ${LinkURL ? `<a href="${LinkURL}"><div class="carousel-caption text-start">${LinkText}</div> </a>` : `<div class="carousel-caption text-start">${LinkText}</div>`}
                                    </div>` : ""}
                            </div>`
                    }
                    else {
                        let indicator = div.querySelector(".carousel-indicators")
                        indicator.innerHTML = indicator.innerHTML + `<button type="button" data-bs-target="#myCarousel" data-bs-slide-to="${index}" aria-label="Slide ${index + 1}"></button>`

                         //carousel slides
                         let carousel = div.querySelector(".carousel-inner")
                         carousel.innerHTML = carousel.innerHTML +
                                ` <div class="carousel-item" data-bs-interval="4000">
                                    <img src="${ImageURL}"
                                        width="100%" height="350">
                                        ${LinkText ? 
                                            `<div class="container">
                                                ${LinkURL ? `<a href="${LinkURL}"><div class="carousel-caption text-start">${LinkText}</div> </a>` : `<div class="carousel-caption text-start">${LinkText}</div>`}
                                            </div>` : ""}
                                </div>`
                    }

                   
                })

                //add the buttons
                let el = div.querySelector(".carousel-inner")
                el.innerHTML = el.innerHTML +
                    `<button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>`

                    new bootstrap.Carousel(document.querySelector('#myCarousel'), {
                        interval: 2000,
                        wrap: true,
                    });

            }

            else if (type === "ContentElement") {

                // console.log("Creating Content", webpartData)
                div.innerHTML =
                    `<div class="text-group component-group">
                        
                    </div>`
                webpartData.forEach(data => {

                    let {
                        // ContentCategory,
                        ContentTitle,
                        Description,
                    } = data

                    let el = div.querySelector(".text-group")
                    el.innerHTML = el.innerHTML +
                        `<div class="text-header">${ContentTitle || ""}</div>
                        <div class="text-body container">${Description || ""}</div>`
                })

            }

            else if (type === "Staff") {

                //Leader
                // console.log("Creating Staff", webpartData)
                let MainPOC = webpartData.filter(data => !!data.MainPOC)
                if (!!MainPOC.length) {

                    div.innerHTML = div.innerHTML +
                        `<div class="director-group component-group"><!-- Director -->
    
                        </div>`

                    MainPOC.forEach(data => {

                        let {
                            UserTitle,
                            UserEmail,
                            Phone,
                            JobTitle,
                            // MainPOC,
                            // SortOrder,
                            ImageURL,
                            // ImageDescription,
                            LeadershipBioURL,
                            // LeadershipBioDescription,
                        } = data

                        let el = div.querySelector(".director-group")
                        el.innerHTML = el.innerHTML +
                            `<div class="director-text" style="border-radius: 1rem!important;">
                                <div class="director-image">
                                    <div class="director-image-circle float-start" style="background-color: white;background-image: url('${ImageURL ? ImageURL : appWebUrl + "_layouts/images/O14_person_placeHolder_192.png"}')"></div>
                                </div>
                                <div class="director-title component-title">${JobTitle || ""}</div>
                                <div class="director-name bold">${UserTitle || ""}
                                ${LeadershipBioURL? `<a class="badge rounded-pill text-bg-primary" style="margin-left: 8px;" href="${LeadershipBioURL}">View Bio</a>` : ""}
                                </div>
                                ${Phone? `<div class="director-phone">
                                <span class="" style="padding: 3px !important;border-radius: 50% !important;display: inline-flex;margin-right: 6px;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-outbound-fill poc" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zM11 .5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-4.146 4.147a.5.5 0 0 1-.708-.708L14.293 1H11.5a.5.5 0 0 1-.5-.5z"></path>
                                    </svg>
                                </span>
                                <span class="pb-1">${Phone}</span>
                            </div>` 
                            : ""}
                                ${UserEmail? ` <div class="director-email">
                                <span class="" style="padding: 3px !important;border-radius: 50% !important;display: inline-flex;margin-right: 6px;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-plus poc" viewBox="0 0 16 16">
                                            <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z"></path>
                                            <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5Z"></path>
                                        </svg>
                                </span>
                                <a class="pb-1" id="send-email-main" href="mailto:${UserEmail}">${UserEmail}</a>
                                <a class="pb-1" id="send-email-sub" href="mailto:${UserEmail}">Send Email</a>
                            </div>` : ""}
                               
                            </div>`
                    })
                }


                //Rest of Staff

                let Staff = webpartData.filter(data => !data.MainPOC)
                Staff.sort((a, b) => a.SortOrder - b.SortOrder)
                if (!!Staff.length) {

                    div.innerHTML = div.innerHTML +
                        `<div class="staff-group component-group"><!-- Director -->
                            <div class="poc-title component-title px-3" style="border-bottom-right-radius: 1rem !important;">Points of Contact</div>
                        </div>`



                    Staff.forEach(data => {

                        let {
                            UserTitle,
                            UserEmail,
                            Phone,
                            JobTitle,
                        } = data

                        let el = div.querySelector(".staff-group")
                        el.innerHTML = el.innerHTML +
                            `<div class="card card-body border-0 mb-1 text-left body-text" style="border-radius: 1.25rem!important;"><!-- Example POC -->
                                <!-- Title -->
                                <div class="text-j3blue text-start"><strong>${JobTitle || ""}</strong></div>
                                <!-- User Title -->
                                <div class="bold">${UserTitle || ""}</div>
                                <!-- User Phone -->

                                ${Phone? `<div>
                                <span class="" style="padding: 3px !important;border-radius: 50% !important;display: inline-flex;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-outbound-fill poc" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zM11 .5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-4.146 4.147a.5.5 0 0 1-.708-.708L14.293 1H11.5a.5.5 0 0 1-.5-.5z"></path>
                                    </svg>
                                </span>
                                <span class="pb-1">${Phone}</span>
                             </div>`: ""}
                               
                                <!-- User Email -->

                                ${UserEmail? `
                                <div>
                                    <span class="" style="padding: 3px !important;border-radius: 50% !important;display: inline-flex;">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-plus poc" viewBox="0 0 16 16">
                                            <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z"></path>
                                            <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5Z"></path>
                                        </svg>
                                    </span>
                                    <a class="pb-1" href="mailto:${UserEmail}">${UserEmail}</a>
                                </div>
                            ` : ""}


                                <div>
                                    
                                    
                                </div>
                            </div>`
                    })
                }
            }

            else if (type === "Announcements") {

                // console.log("Creating Announcements", webpartData)
                div.innerHTML =
                    `<div class="announcement-group component-group">
                        <div class="announcement-title component-title">Announcements</div>
                        <div class="announcement-body">

                            

                        </div>
                    </div>`
                webpartData.forEach(data => {

                    let {
                        AnnouncementTitle,
                        Body,
                        EventDate,
                        Expires,
                    } = data

                    if (!Expires || new Date() <= new Date(Expires)) {
                        let el = div.querySelector(".announcement-body")
                        el.innerHTML = el.innerHTML +
                            `<div class="announcement-item card card-body border-0 text-left body-text">
                                <div class="announcement-header component-title" onclick=ShowBody(this,'.announcement-text-body')>
                                    <div class="announcement-title">${AnnouncementTitle}</div>
                                    <div class="announcement-text">${EventDate ? new Date(EventDate).toDateString() : ""}</div>
                                </div>
                                <div class="announcement-text-body" style="display:none">${Body || ""}</div>
                            </div>`

                    }

                })

            }

            else if (type === "Events") {

                // console.log("Creating Events", webpartData)
                div.innerHTML =
                    `<div class="event-group component-group">
                        <div class="event-title component-title">Events</div>
                        <div class="event-body">

                            

                        </div>
                    </div>`
                webpartData.forEach(data => {

                    let {
                        EventTitle,
                        Body,
                        EventDate,
                        Expires,
                    } = data

                    if (!Expires || new Date() <= new Date(Expires)) {
                        let el = div.querySelector(".event-body")
                        el.innerHTML = el.innerHTML +
                            `<div class="event-item card card-body border-0 text-left body-text">
                                <div class="event-header component-title" onclick=ShowBody(this,'.event-text-body')>
                                    <div class="event-title">${EventTitle ? EventTitle : ""}</div>
                                    <div class="event-text">${EventDate ? new Date(EventDate).toDateString() : ""}</div>
                                </div>
                                <div class="event-text-body" style="display:none">${Body? Body : ""}</div>
                            </div>`

                    }

                })

            }

            else if (type === "MainLinks") {

                // console.log("Creating MainLinks", webpartData)
                div.innerHTML =
                    `<div class="buttons-group component-group mt-4 px-3 d-flex justify-content-center">
            
                    </div>`
                webpartData.forEach(data => {

                    let {
                        MainLinkTitle,
                        LinkURL,
                    } = data


                    let el = div.querySelector(".buttons-group")
                    el.innerHTML = el.innerHTML +
                        `<a class="btn btn-custom btn w-100" href="${LinkURL ? LinkURL : "#"}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-link-45deg" viewBox="0 0 16 16">
                                <path
                                    d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z">
                                </path>
                                <path
                                    d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z">
                                </path>
                            </svg>
                            ${MainLinkTitle}
                        </a>`



                })

            }

            else if (type === "BranchLinks") {

                // console.log("Creating BranchLinks", webpartData)
                div.innerHTML =
                    `<div class="BranchLinks-group component-group mt-4 px-3 d-flex">
            
                    </div>`
                webpartData.forEach(data => {

                    let {
                        BranchLinkTitle,
                        BranchIcon,
                        LinkURL,
                    } = data

                    let icon;
                    if (BranchIcon === "File")  icon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-file-earmark-text" viewBox="0 0 16 16">
                                                        <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"></path>
                                                        <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"></path>
                                                    </svg>`
                    else if (BranchIcon === "Folder") icon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-folder" viewBox="0 0 16 16">
                                                            <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"></path>
                                                        </svg>`
                    else if (BranchIcon === "MapMarker") icon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path>
                                                        </svg>`
                    else if (BranchIcon === "Binoculars") icon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-binoculars" viewBox="0 0 16 16">
                                                                <path d="M3 2.5A1.5 1.5 0 0 1 4.5 1h1A1.5 1.5 0 0 1 7 2.5V5h2V2.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5v2.382a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V14.5a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 14.5v-3a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5v3A1.5 1.5 0 0 1 5.5 16h-3A1.5 1.5 0 0 1 1 14.5V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V2.5zM4.5 2a.5.5 0 0 0-.5.5V3h2v-.5a.5.5 0 0 0-.5-.5h-1zM6 4H4v.882a1.5 1.5 0 0 1-.83 1.342l-.894.447A.5.5 0 0 0 2 7.118V13h4v-1.293l-.854-.853A.5.5 0 0 1 5 10.5v-1A1.5 1.5 0 0 1 6.5 8h3A1.5 1.5 0 0 1 11 9.5v1a.5.5 0 0 1-.146.354l-.854.853V13h4V7.118a.5.5 0 0 0-.276-.447l-.895-.447A1.5 1.5 0 0 1 12 4.882V4h-2v1.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V4zm4-1h2v-.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5V3zm4 11h-4v.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5V14zm-8 0H2v.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5V14z"></path>
                                                            </svg>`
                    else if (BranchIcon === "OrgChart") icon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-diagram-3" viewBox="0 0 16 16">
                                                            <path fill-rule="evenodd" d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5v-1zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1zM0 11.5A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"></path>
                                                        </svg>`
                    else if (BranchIcon === "ClipBoard") icon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-clipboard2-check" viewBox="0 0 16 16">
                                                                <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h3Z"></path>
                                                                <path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-12Z"></path>
                                                                <path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3Z"></path>
                                                            </svg>`
                    else icon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                                </svg>`

                    let el = div.querySelector(".BranchLinks-group")
                    el.innerHTML = el.innerHTML +
                        `<a class="branchLink" class="" href="${LinkURL? LinkURL : "#"}">
                            <div class="branchLinks-icon">${icon}</div>
                            <div class="branchLinks-text">${BranchLinkTitle || ""}</div>
                        </a>`

                })

            }

            else if (type === "ContactInfo") {

                // console.log("Creating Contact Info", webpartData)
                div.innerHTML =
                    `<div class="contact-info-group component-group">
                        <div class="contact-info-title component-title">Contact Information</div>
                        <div class="contact-info-body">
                        
                    </div>`
                webpartData.forEach(data => {

                    let {
                        ContactInfo,
                        ContactIcon,
                        ContactTitle
                    } = data
                    let icon
                    if (ContactIcon === "Phone") {
                        icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-outbound-fill poc" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zM11 .5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-4.146 4.147a.5.5 0 0 1-.708-.708L14.293 1H11.5a.5.5 0 0 1-.5-.5z"></path>
                                </svg>`
                    } 
                    else if (ContactIcon === "Email") {
                        icon = ` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-plus poc" viewBox="0 0 16 16">
                                    <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z"></path>
                                    <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5Z"></path>
                                </svg>`
                    }

                    let el = div.querySelector(".contact-info-body")
                    el.innerHTML = el.innerHTML +
                    
                        `
                        <div class="contact-info-item">
                        ${icon? `<span class="contact-icon" style="padding: 3px !important;border-radius: 50% !important;display: inline-flex;margin-right: 6px;">${icon}</span>` : ""}
                            
                            <span class="contact-title pb-1">${ContactTitle || ""}: </span>
                            <span class="contact-info pb-1">${ContactInfo || ""} </span>
                        </div>`


                })

            }

            else if (type === "Clocks") {

                console.log("Creating Clocks", webpartData)

                div.innerHTML =
                    `<div class="clock-group component-group">
                        <div class="clock-title component-title">Time Zones</div>
                        <div class="clock-body row"></div>
                    </div>`
                webpartData.forEach(data => {

                    let { TimeZone, DisplayTitle, CustomTheme, CustomShape } = data;
                    let NOW;
                    let clock = document.createElement("div");
                    clock.classList.add("clock");
                    clock.classList.add(`clock-theme-${CustomTheme}`);
                    clock.classList.add(`clock-${CustomShape}`);
                    if (CustomTheme) clock.classList.add(`clock-theme-${CustomTheme}`);
                    // else console.info(CustomTheme);
                    clock.innerHTML = `<div class="clock__second"></div>
                                        <div class="clock__minute"></div>
                                        <div class="clock__hour"></div>
                                        <div class="clock__axis"></div>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>
                                        <section class="clock__indicator"></section>`

                    var currentSec = getSecondsToday();
                    var seconds = (currentSec / 60) % 1;
                    var minutes = (currentSec / 3600) % 1;
                    var hours = (currentSec / 43200) % 1;
                    setTime(60 * seconds, "second");
                    setTime(3600 * minutes, "minute");
                    setTime(43200 * hours, "hour");

                    function setTime(left, hand) {
                        return clock.querySelector(".clock__" + hand)
                        .setAttribute("style", "animation-delay:" + left * -1 + "s" );
                    }

                    function getDateByTimeZone(TimeZone){
                        
                        const DateObject = new Date();
                        const DateString = DateObject.toLocaleDateString(undefined, {
                            timeZone: TimeZone
                        });

                        const TimeZoneString = DateObject.toLocaleTimeString(undefined, {
                            hour12: false,
                            timeZone: TimeZone
                        });

                        const getHoursMinSeconds = function getHoursMinSeconds(TimeStr){
                            const [ hours, min, seconds] = TimeStr.split(' ')[0].split(':');
                            return {
                                hours,
                                min,
                                seconds,
                            }
                        }
                        
                        const { hours, min, seconds } = getHoursMinSeconds(TimeZoneString);
                        const isAM = Number(hours) < 12;
                        const now = new Date(DateString);
                        now.setHours(Number(hours));
                        now.setMinutes(Number(min));
                        now.setSeconds(Number(seconds));

                        return {
                            now,
                            DateString,
                            TimeZoneString,
                            hours, 
                            min, 
                            seconds,
                            isAM,
                        };
                    }

                    function getSecondsToday(Timezone){

                        const DateObject = getDateByTimeZone(TimeZone);
                        const TimeZoneString = new Date().toLocaleTimeString(undefined, {
                            hour12: false,
                            timeZone: TimeZone,
                        });
                        
                        const { isAM } = DateObject;
                        let now = new Date();
                        NOW = DateObject.now; // Sets global variable since we need it in the div.clock-Title below;
                        clock.setAttribute('data-day', isAM ? 'AM' : 'PM');
                        clock.setAttribute('data-time-zone', TimeZone);
                        clock.setAttribute('data-time', TimeZoneString);
                        clock.StartDateObject = DateObject;
                        clock.getDateByTimeZone = getDateByTimeZone;

                        now = DateObject.now;

                        let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                        let diff = now - today;
                        return Math.round(diff / 1000);
                    }

                    let clockTitle = document.createElement('div');
                    clockTitle.classList = 'clock-Title text-center';
                    clockTitle.innerHTML = `
                    <div>${DisplayTitle}</div>
                    <div>${NOW.format('MM/dd/yyyy <br> hh:mm:ss')}</div>`                    

                    let el = div.querySelector(".clock-body");
                    const ClockOuterEl = document.createElement('div');
                    ClockOuterEl.classList = 'clock-outer col';
                    ClockOuterEl.append(clock);
                    ClockOuterEl.appendChild(clockTitle);
                    el.append(ClockOuterEl);

                    setInterval(function(){
                        const { now, isAM } = clock.getDateByTimeZone(clock.dataset.timeZone);
                        clock.setAttribute('data-day', isAM ? 'AM' : 'PM');
                        clockTitle.innerHTML = /*html*/`
                        <div>${DisplayTitle}</div>
                        <div>${now.format('MM/dd/yyyy <br> H:mm:ss')}</div>`
                    }, 1000);
                });
            }

        }).catch(e => {
            console.log("Error getting webpart list: \n", e)
        })

        return div

    }

    function getListItem(listName, filter) {
        return new Promise((resolve, reject) => {
            let url = appWebUrl + `_api/web/lists/getByTitle('${listName}')/items` + (filter ? filter : "")
            fetch(url, {
                method: 'GET',
                headers: { 
                    "Content-Type": "application/json; charset=UTF-8", 
                    "Accept": "application/json; odata=verbose" 
                }
            })
            .then(data => data.json())
            .then(data => resolve(data.d.results))
            .catch(e => reject(e))
        })
    }

})();