# Dev workflow
Creating this site is a bit of a dance between setting up structure and custom data types / layouts locally, then adding in content through the CMS in order to actually see your changes appear. E.g.: for the Services tab, we decided to create a Services [Index Page](https://developers.squarespace.com/folders-indexes/) so that we could add multiple individual "pages" to the Services tab through the CMS. In order to do that, the steps were:
*locally:*
  - create the services-index.conf file to determine allowed attributes of this index page
  - create the services-index.list file to determine how pages will be rendered onto the services index page
  - create the services.region [layout file](https://developers.squarespace.com/layouts-regions/) to determine the layout for each specific page to be included on the Services tab
  - add the layout that you just created to [template.conf](https://developers.squarespace.com/template-configuration/) to include it in the configuration options for this site
  - note: at this point, you still won't be able to see any changes or do anything locally
  - `git push` all these changes to squarespace
*in Squarespace UI:*
  - access the site editing UI via {siteUrl}/config and click the Pages link
  - click the + icon. A menu will pop up with a heading that says "Create new page", and the page type options should now include Services Index. 
  - select Services Index, give your new Services Index Page a name (like "Services"!)
  - click the gear icon next to your Services index page, and under the Page Layout drop-down menu select "Services". Now, the layout on this index page will be the layout that you defined in services.region.
  - add subpages in to your Services Index page by clicking the "Add Section" link underneath your Services header. As you add new subpages, be sure to make these subpages use the Services layout (same step as above) as well. (the layout of a new page will always default to "Default" layout).
  - thence, for styling or changing of rendering logic, go back to local dev.

Long example, but basically: create templates and data types and such locally, then put them on the page and render them by navigating around the SquareSpace UI, then style them by adding rules to stylesheets locally.


# HTML guidelines
Each content region (homepage, services, etc) should
- have a root div
- + with an id of `prx-region-{region name}` (e.g., `prx-region-homepage`)
- + and a class of `prx-region-root`

Use semantic HTML, and keep in mind: titles and alt refs for links / images; include aria roles where appropriate; run the site through website validators every so often.


# Debugging
Visit the Developer tab of the Squarespace CMS to see if there are any errors listed (e.g.: invalid JSON or html, etc) at {siteUrl}/config/settings/advanced/developer
