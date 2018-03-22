# Best Practices

## Version Control

Code changes are deployed to Squarespace by pushing to a Git repository that Squarespace provides. When possible, only push changes to Squarespace once they have been merged to `master` in the GitHub repository. Because there are times when changes need to be pushed to Squarespace before they can fully tested or even developed locally, this is not always possible. Use discretion and proceed with caution.

## Squarespace Data & Metadata

The local development server does not host any data; it always pulls from squarespace.com. That means anything managed through the CMS (pages, collections, posts, CMS content of specific pages, the organization of pages into navs/folders/index, etc), or other site-wide settings must be managed through squarespace.com in order to be reflected and available in development.

As an example, if you are changing a custom query to filter on `category`, you must add the category metadata to posts on squarespace.com before you'll be able to test the filtering locally.

## Squarespace Configuration & Code

Changes to configuration or code that impact _what_ is managed through the Squarespace CMS need to get pushed to Squarespace before the can be managed, and thus before the local development server can pull the data back down for testing.

As an example, in order to develop a new navigation it must first be added to the `template.conf`, then pushed to the Squarespace remote so that it will appear in the CMS, then content can be added to the navigation, and then the local server will pull the populated navigation data and code that implements HTML for the navigation can be tested.

A similar workflow would be followed for anything that can only be managed through the CMS: open block field content, pages and page content, the posts in a collection and their content, page settings, and a number of other aspects of the things that make up the site.

## HTML structure

Every `.region` file should have a single root element with the following attributes:

- an `id` of `prx-id-{collection.urlId}`
- a class of `prx-region-root`
- a `class` of `prx-id-{collection.urlId}`
- a `class` of `prx-region-{region name}`

This will allow styling for entire layouts and for specific top-level content in the CMS. Be aware that the `collection.urlId` will change if the **URL Slug** for the content changes in the CMS, so there is some fragility in styling specific webpages in this way, but it is easy and flexible.

Every `.list` file for index pages should an element that wraps all the constituent pages with the following attributes:

- an `id` of `prx-index-list-{index name}`
- a `class` of `prx-index-list`

Within a `.list` file, each the `mainContent` for the constituent pages should, individually, be wrapped by an element with the following properties:

- an `id` of `prx-id-{urlId}`
- a `class` of `prx-id-{urlId}`
- a class of prx-index-list-section

Within that element, the `mainContent` should be wrapped directly by a `<section>` element.

# Squarespace Fundamentals

Before starting to work on any Squarespace-specific aspects of the site, you should read through most of the developer guide so you have a good understanding of all the components that make up a Squarespace page.

- [Squarespace Developer documentation](https://developers.squarespace.com/quick-start)

Because some parts of the documentation seem incomplete, inaccurate, or confusing, here's a primer for how we've made use of the platform.

# Templates

We have created a custom **template** for the PRX site. This largely works the same way any native or third-party Squarespace template works, except we have customized it specifically for our site. The [template](https://developers.squarespace.com/template-configuration/) is defined in `template.conf`, which includes the following:

## Stylesheets

Any stylesheets you list explicitly in the template will get compiled into a stylesheet that gets included on pages (when the `{squarespace-headers}` system variable is included on the page). These stylesheets must live in the `/styles` directory, and support [Less](http://lesscss.org/).

It's possible to include Squarespace-specific metadata in stylesheets (they call them [_tweaks_](https://developers.squarespace.com/style-editor/)), so that CSS properties can be presented and controlled through the CMS (under `Design > Style Editor`). We haven't done that for this site.

## Custom Types

Custom types (also called [custom post types](https://developers.squarespace.com/custom-post-types/), and not to be confused with _custom collections_) allow you to define data classes. These posts (it can helpful to think of them as objects, but I'll call them posts) can be added to a collection (custom or otherwise).

An example of a native post type is `text`, which is what Squarespace uses for its blogging feature. An example of a custom type we have defined is `prxPerson`, which we use for the staff list.

A custom type always inherits from a native type (`text`, `image`, or `video`), and you can define additional properties to customize the type. For example, you may add a `phoneNumber` field to the `prxPerson` type to capture staff phone numbers as structured data (though, we don't actually do that).

The names of the base types and the fields can be confusing. A `text` base type is a blog post; it has many default properties and fields (an author, excerpt, URL, publication date, geo data, tags, content, etc). A `text` field is a string property that you can add to a custom type, in addition to all the properties inherited from the base type.

## Navigations

Unless you define them, a Squarespace template won't have any [navigations](https://developers.squarespace.com/menus-navigation/). Navigations are simply a named grouping of top-level content (`Page`, `Link`, etc) that get created in the Squarespace CMS. How navigations are displayed is entirely dependant on how the site is coded. There is no inherent display or on-screen place where navigations end up just by virtue of the navigation being created and things being put into it.

The standard use of a navigation is to loop through all the items that have been added to it, and spit out an `<a>` or `<li>` tag for each one.

The things that belong to a navigation are managed through the CMS, not the template config; only the fact that the navigation exists is defined in the config. Once the navigation is defined, it will appear in the CMS.

**NOTE:** It's not really possible to rename a navigation that has any members. If for some reason you need the name of a navigation to change, create a new one and move all the content from the old one to the new one before removing the old one from the config. Don't remove a navigation from the template config if it still has content in it; the content could be lost.

## Layouts

In the hierarchy of a Squarespace site and its pages, the template is at the top, and [layouts](https://developers.squarespace.com/layouts-regions/) are one step below that. Nearly all top-level content that gets added to the site through the CMS (a basic page, a complex index `Page`, a collection like a `Blog`, etc) will use a layout. The layout is partly (but not entirely) responsible for how the HTML for the content gets generated.

In the template config, you define layouts with a name and a list of `regions`. Each region correspond to `.region` files that must exist in the root of the template directory. Regions can be included in multiple layouts, which helps with code reuse. There is no intrinsic difference between the regions in a layout, and different layouts in a single template can have vastly different region configurations.

When a the HTML is generated for a page, everything that is generated is represented in some way by regions in the layout. If something doesn't exist in the regions in a layout's definition, pages that use that layout won't include it.

When some page uses a given layout, the resulting HTML for that page is simply the rendered HTML for each of the layout's individual regions concatenated.

# Building a webpage

### Preface

This is my best attempt as explaining how all the different pieces (layouts, regions, blocks, content, etc) come together to turn into some HTML. Some of this will be conceptual, some of it will be a guide to buttons and menus.

**NOTE:** Squarespace has a built in content type called a `Page`. Other types of content (`Gallery`, `Blog`, `Album`, etc) also turn into _webpages_ on the site, even though they aren't of the `Page` type. I'll use this nomenclature (`Page` vs webpage) to try and keep things straight.

If you look in the Squarespace CMS, all content exists in either: a navigation, or **Not Linked**. There's no difference (other than how things may eventually show up when navigations are rendered). You can move content whenever and wherever you'd like between navigations and **Not Linked**.

When you click the ➕ at the top of a navigation or **Not Linked**, you'll be choosing what _type_ of content you want to create. This includes the default simple types (`Page`, `Link`, etc), default collection types (`Album`, `Blog`, etc), as well as any custom collections that exist in the template.

**NOTE:** At the time I'm writing this, we don't actually have any of the default collection types enabled (which would be done in the template config).

**NOTE:** Custom collections **are not** defined in the template config. Any collections defined by a `.conf` file added to the `/collections` directory will automatically become available as a custom collection.

You can see the content type of anything in the CMS by going to it's settings (the gear icon) and looking at what it says at the top. Aside from some edge cases (like `Link`), the follow description applies to any type of content that we deal with.

## Partials (blocks)

Squarespace [partials](https://developers.squarespace.com/template-partials/) are mostly straight forward. They are some reusable code that you've put into a `.block` file (in `/blocks`), that you can insert into other places. The partial inherits the context from wherever it is inserted.

Generally you can't do anything in a block that renders more external (to the block) content. For example, you can't include a block in a block, or use custom queries. You can use navigation tags.

There are some cases where Squarespace lets you pass in a block as a template for some native function.

```
<squarespace:navigation navigationId="mainNav" template="main-navigation" />
```

The `template` in that example is just the `main-navigation.block` file; the context will be scoped to the navigation automatically.

The normal way of including a partial is: `{@|apply some-block.block}`;

You can include partials in regions and collection views (more on those later).

## Open Block Fields

When you include [open block field](https://developers.squarespace.com/open-block-field/) in a layout, it provides an area where content on a page can
be created and managed through the CMS. This is similar to editing the **main content** of a `Page` or `Blog` post. We use it as a mechanism to create several, distinct WYSIWYG editable areas on a page, especially when we have content that needs to be editable through the CMS on the same page as content that is hard coded into the template.

```
<squarespace:block-field id="blockField1" columns="12"/>
```

Any content added to the open block field essentially lives under the given `id`. If `block-field` tags on different pages shared the same `id` they would also have the same content.

It is possible to generate the `id` for the tag dynamically. This allows you to define an open block field on a view that gets reused (for example, a `Blog` post view), and each instance of the view would have unique content in the open block field. (e.g., `id="blog-post-{the_blog_post_id}")

## Layout + Region + Content

This is now getting into the meat of how webpages are formed.

### Layout

As discussed earlier, a layout has no code itself; it simply defines a set of **regions** that get rendered together for any page using that layout.

Changing the layout of any `Page`/etc is (generally) a non-destructive operation. The actual content for the `Page` belongs to the page; the layout just determines what code should exist around that content. Take some care when changing the layout of content, though.

### Region

A region is the outer-most layer where HTML can actually be written. Regions have access to the Squarespace context for whatever content is currently being rendered (you can always view this context by appending `?format=json-pretty` to the URL for the content).

Most of the layouts that are defined in our template include three regions. They tend to share the `head` and `tail` region, with some other region between those.

Looking at `tail.region` is an example of an extremely simple region. It has a bit of [JSON-T](https://developers.squarespace.com/what-is-json-t/) to include the `main-footer` partial, and the `squarespace-footers`.

Looking at the `head.region`, we again see some basic JSON-T for partials and Squarespace-provided variables. There is also some context-specific logic:

```
<title>PRX{.equal?:collection.urlId:"home"}{.or} – {collection.navigationTitle}{.end}</title>
```

Notice the references to `collection.urlId` and `collection.navigationTitle`. `urlId` and `navigationTitle` are properties of the `Page`, `Blog` post, etc that the layout and region are currently being applied to. (This object is always called `collection`, even when the content is not a collection type). Here we're doing a bit of equality checking to see if we're currently on the home page and deciding what the value of the `<title>` tag should be.

The third region that each layout includes is the one that we use to make different webpages on the site different.

Start by looking at the `sparse.region`, which is very minimal and used when we need to create more-or-less generic pages.

The first bit of JSON-T you'll see is `{.section collection}`. The `.section` directive allows you to navigate down the context object (i.e, _zoom in_). Everything between `{.section}` and `{.end}` will be scoped into whatever was passed into `section`.

This is apparent when looking at the line: `<img {mainImage|image-meta} class=prx-backdrop>`. `mainImage` is (possibly) a property of `collection`. Since we're already scoped into `collection`, we can reference `mainImage` directly (rather than, say, `collection.mainImage`).

**NOTE:** `mainImage` corresponds to the **banner/thumbnail image** that you can add to many types of content in the CMS. When it's missing, the `mainImage` property doesn't exist; `main-image?` fails gracefully, so this is effectively `if (mainImage exists)…`

The **_really interesting_** part of this region is the key to connecting the region (and, thus, layout) to the per-webpage content. `{squarespace.main-content}`. Read on to see what main content is.

### Main Content

Main content (which is sometimes referenced as `main-content` and sometimes `mainContent`) is a proxy for **the actual content** of the webpage being rendered. Anywhere `mainContent` is injected, the content will be inserted. It can even be referenced multiple times in a region or layout (though that would be odd).

In the case of a `Page`, `main-content` is a string of HTML. You can look at the `?format-json-pretty` for somethign like the **Technology** page to see that; on the context object there is a property called `mainContent` that is just a bunch of HTML. When `{squarespace.main-content}` gets called in the context of rendering the Technology page, it just sticks that HTML right in.

**NOTE:** The distinction between `squarespace.main-content` and `mainContent` is that the former usually always refers to the top-level content, and `mainContent` can refer to content that lives under top-level content (like posts or other pages).

For other types of content, like collection types, there's no `mainContent` for the context itself, but each member of the collection does have its own `mainContent`. Generally you'll loop through the members and do something to display their `mainContent` (in a grid, list, etc).

### Collections

Collections are groups of things. Those things can be posts (like images, blog posts, or a custom type like `prxPerson`), as is the case for a `Blog` or `Gallery`. Those things can also be top-level content (like `Page` or `Link`), as is the case for a `Folder` or `Index Page`.

Custom collections let us create collections with specific parameters, like which types of content can be added to the collection. Default collection types will never allow custom post types, so any time you want a collection with custom posts you'll need to make a custom collection.

Along with the `.conf` file that you use to define it, a collection can also have a `.list` and/or `.item` file. The `.list` file is used when rendering the collection itself (e.g., `/blog`), and the `.item` file is used when rendering a member of the collection (`/blog/first-post`). The `.list` and `.item` files are only needed if the collection or posts are being displayed directly (i.e., visitors will be going to the URL's for those webpages directly).

All the other rules we've covered still apply here. Within the `.list` or `.item` file there's a context (including either the collection, or the member of the collection), and you can access the properties of that context.

#### Folders

Folders are a collection type with the `"folder": true` flag. When a collection is a folder, it allows top-level content (`Page`, `Link`, etc) to be added, rather than posts (images, blog posts, etc).

#### Index Pages

Index pages are folders in disguise. In addition to the `folder: true` flag, they also have an `indexType` property on the collection definition. We only use the `stacked` index type, but the value is largely irrelevant when building custom pages.

Since the members of an index page collection are other pages, this gives us a way of building more complex webpages from smaller parts.

If you look at `generic-index.list`, you'll see that the `collection` object on the context has a `collections` property. Each member of `collections` is another `Page` that was added to that index page collection. When we loop through them, we use the `{mainContent}` variable to insert the main content HTML of each sub-page. The result is a single page of HTML that includes content from many different `Pages` in the Squarespace CMS.

**NOTE:** You may be thinking, won't we end up with a header and footer for each sub-page? No. Since we are inlcuding only the `mainContent` of each sub-page, there won't be anything wrapping the content, other than what we include in the `.list` file. The layout that is selected for a sub-page (and, thus, the regions that that layout includes, and the code in the regions) are irrelevant.

One (perhaps unintended) benefit of index pages is that they offer an additional layer where custom code can be included around CMS content. If you think about a `Page`, from the inside out we have: the CMS content associated with the `Page`, and the regions that are include in the layout that the `Page` is using (where `main-content` gets called at some point). That's really only one opportunity to add code around the content, and any pages that use the layout will share all that code. This works in a lot of cases, but…

If you think about webpages on the site like those in the **Company** section (About, Partners, etc), the individual pages are quite different, but they do share a good amount of code. For example, they all use the Company section sub-nav. It makes sense for them to all share a single layout that includes the sub-nav.

Not every page in the Company section, though, needs a nav like the one found on the About page. Since that would be impractical to add through the CMS, we need another layer between the layout and the CMS content to add some HTML. The index page `.list` file gives that ability.

Using index pages also allows us to take advantage of the `mainImage` property of many content types (which we saw in an example earlier). It can be challenging to put images behind text or other content using content blocks in CMS; index pages let us build pages using a number of sub-pages, each with it's own `mainImage` which gets rendered as a backdrop. The result is background images that can be managed entirely through the CMS.
