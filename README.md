# corporate.prx.org

This is a [Squarespace](https://www.squarespace.com/) site template that is used for the public-facing website for PRX, which lives at [www.prx.org](https://www.prx.org/).

It is designed to allow non-technical staff the ability to manage nearly all aspects of the site; all future development should keep that in mind.

## Building pages

In general there are two generic layouts that can be used for creating new pages: `Default` and `Segmented`. The `Default` layout can be used with either simple pages or index pages, while the `Segmented` layout should generally only be used with index pages. The Services page is an example of what the `Segmented` layout on an index page will look like (it has a subnav based on the pages added to the index page). All other layouts (`Homepage`, `Exchange`, etc) are designed to be used only on the page they share a name with

When creating index pages, use only the `Index` type (i.e., not `News Index` or `About Index`).

## Modals & Pop-ups

Modals, for now, need to be added to the template code and cannot be added through the Squarespace CMS. Once a modal has been added, though, it can be triggered by a link that is added through the CMS. The developer who added the modal will provide you with an ID, such as `prx-exchange-donate-form`. In the CMS, if you make a link to `#prx-modal_prx-exchange-donate-form` (using the actual ID for the modal you care about), it will make the modal appear.

## Special Collections

There are a number of purpose-specific collections that are used throughout the site.

### Homepage Features

This collection must have a URL slug of `homepage-features`. It is used to populate the carousel at the top of the homepage. The main content of each post within the collection is what gets rendered in the carousel, and the thumbnail image, if provided, is used as the backdrop image of that slide in the carousel.

### Staff Bios & Board Member Bios

`staff-collection` and `board-collection`. The posts in these collections are used for the staff list and board members list on the About page. The thumbnail image is the person's photo, the title of the post should be the person's name, and the excerpt of the post should be the person's title or description. The excerpt should not include links or any text styling. The order of posts on the page reflects the order in the collections.

### Shows Collection

`shows-collection`. Each post represents a show that PRX works with. The title of the post is the name of the show, the show artwork goes in the thumbnail, and the excerpt (without links or text style) is a short description of the show. The shows are displayed as tiles on the homepage and Shows page (and perhaps other pages in the future). The order of posts on the page reflects the order in the collections. Categoies are used to group shows. For example, the `Radiotopia` category should be applied to all Radiotopia shows, as they are presented in their own spot on the Shows page.

### Press Highlights & Recent Press

`top-press-articles-collection and `recent-press-articles-collection`. These posts show up on the Pressroom page. Use the post title and source URL, as well as the custom post options.
