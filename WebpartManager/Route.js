/**
 * Route.js
 * @author Wilfredo Pacheco
 */

const { href } = location;
export const ParentFolderName = 'HomePageRepo';
export const SiteCollectionUrl = href.split(ParentFolderName)[0];

/** Error Messages; */
const MissingHeaders = 'SharepointApi | Headers are not defined!';
const MissingRequestDigest = 'SharepointApi | Request Digest is missing!'
const ErrorMessage = {
    MissingHeaders,
    MissingRequestDigest
}

export const HEADERS = { 
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
}

export const GetRequestDigest = function GetRequestDigest(Url){
    Url = Url || `${SiteCollectionUrl}/_api/contextinfo`;
    return fetch(Url, {
        method: 'POST',
        headers: HEADERS.REQUEST_DIGEST,
    })
    .then(data => data.json())
    .then(data => data.d.GetContextWebInformation.FormDigestValue);
}

export const Get = function Get(Url, Options){
    if (Options 
    && typeof Options === 'object')
    {
        Url = `${Url}?${
            Object.entries(Options)
            .map(e => `${e[0]}=${e[1]}`)
            .join('&')
        }`
    }

    return fetch(Url , {
        method: 'GET',
        headers: HEADERS.GET
    })
    .then(data => data.json())
    .then(data => data.d);
}

export const Post = function Post(Url, data, RequestDigest){

    data = typeof(data) === 'string' ? 
    data : 
    JSON.stringify(data);

    if (!RequestDigest) throw new Error(ErrorMessage.MissingRequestDigest);

    const HEADER = HEADERS.POST;
    HEADER["X-RequestDigest"] = RequestDigest;

    return fetch(Url, {
        method: 'POST',
        body: data,
        headers: HEADER
    }).then(data => data.json());
}

export const Patch = function Patch(Url, data, RequestDigest){

    if (!RequestDigest) throw new Error(ErrorMessage.MissingRequestDigest);

    data = typeof(data) === 'string' ? 
    data : 
    JSON.stringify(data);

    const HEADER = HEADERS.PATCH;
    HEADER["X-RequestDigest"] = RequestDigest;

    return fetch(Url, {
        method: 'POST',
        body: data, // body data type must match "Content-Type" header
        headers: HEADER
    });
}

export const Delete = function DELETE(Url, RequestDigest){
    
    if (!RequestDigest) throw new Error(ErrorMessage.MissingRequestDigest);

    const HEADER = HEADERS.DELETE;
    HEADER["X-RequestDigest"] = RequestDigest;
    
    return fetch(Url, {
        method: 'POST',
        headers: HEADER
    });
}

export default {
    Headers: HEADERS,
    GetRequestDigest,
    Get,
    Post,
    Patch,
    Delete,
    init(url, options = {}){
        if (!url) throw new Error('Missing URL!');
        return Get(url, options)
        .then(Web => {
            return Object.assign(Web, {

                /** Returns all lists available; */
                getAllLists: function getAllLists(){
                    return this.Lists.results;
                },
            
                /** Returns an array of list objects; */
                getAllListTitles: function getAllListTitles(){
                    return this.getAllLists().map(item => item.Title);
                },
                
                /** Returns list object by title; */
                // TODO: this would be cool if it took two variables, the property name, and the value in question;
                getListDetails: function getListDetails(listTitle){
                    return this.getAllLists().find(item => item.Title === listTitle);
                },
                
                /** Returns list count number value; */
                getListCount: function getListCount(listTitle){
                    return this.getListDetails(listTitle).ItemCount;
                },
                
                /** Returns all list items for requested listTitle; */
                getAllListItems: function getAllListItems(listTitle){
                    const results = this.getAllLists().find(list => list.Title === listTitle).Items.results;
                    return results ? results : new Array();
                },
                
                /** Returns list item object based on title and any key/value pair; */
                getListItem: function getListItem(listTitle, key, value){
                    return this.getListDetails(listTitle).Items.results.find(item => item[key] === value);
                },
                
                /** Returns array of list item objects; */
                /** This should define forms for editing/creating list items; */
                getListItemFields: function getListItemFields(listTitle){
                    return this.getListDetails(listTitle).Fields.results.filter(item => item.FromBaseType === false);
                },
                
                /** Returns the current user propery value from the web object if available; */
                getUser: function getUser(){
                    return this.CurrentUser;
                },
            });
        });
    }
}