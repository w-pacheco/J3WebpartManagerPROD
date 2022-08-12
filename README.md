Home Page Repo Module
=====================

<!-- This solution is a custom Javascript interface that mimics the creation of web parts available on Microsoft SharePoint. When an out of the box wiki page is created, the custom web parts are dynmically created and controlled from the lists created by the custom interface. This platform provides some templates to choose from when creating a custom home page. Users are not limited to the three templates provided, the interface allows for changes to any of the templates when once installed.
select a template it filters the lists required for the selected template. -->

<!-- 
20220812 - Meeting Notes:
- 5 templates?
- Future
    - Color Palette
    - Seals
    - Expanability ? widgets?
- Do we need to deploy them to the other pages or will the other team take over? -->

<!-- https://info.health.mil/sites/dos/J3/HomePageRepo/Forms/AllItems.aspx -->


<!-- https://info.health.mil/sites/dos/J3/SitePages/Forms/AllPages.aspx -->
1. Create a wiki page in SitePages labeled: `HomePage`

2. Create a document library labeled `HomePageRepo` in the site collection

3. Copy and paste the source code
    - NOTE: The jQuery file may get flagged and may require a developer to submit a MHS Service Helpdesk ticket.

<!-- https://info.health.mil/sites/dos/J3/HomePageRepo/configure-page.aspx -->
4. Visit the configure-page.aspx
    - Change the Url String to : `SITECOLLECTION`/HomePageRepo/custom.js
    - Click `Install Current Web`

<!-- https://info.health.mil/sites/dos/J3/HomePageRepo/WebpartManager/index.aspx -->
5. Visit `SITECOLLECTION`/HomePageRepo/WebpartManager/index.aspx
    - Pick a template from the top navigation element
    - Install each individual filtered web part lists by clicking the install button.
    - NOTE: Page will refresh after the list is installed. Wait for page to refresh before installing the following list.

6. Create items for the new lists using out of the box Microsoft SharePoint GUI
7. Visit homepage and make it the default landing page.
8. The End.

Send an email with all the links