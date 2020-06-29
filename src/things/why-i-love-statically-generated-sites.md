---
layout: "thing"
title: "Why I love statically generated websites"
excerpt: "During the minor I became to like statically generated websites more and more, here's why."
tags: post
---

{% from 'components/figure.html' import figure %}

<blockquote>
  The web as we know it today started out as completely static. Every website consisted of a folder of HTML files, users could navigate through them using hyperlinks (M. Biilmann, 2015)<sup>1</sup>
</blockquote>

So in a sense statically generated sites make the web move back to basics, which I think is a good thing.

## The downside of server-side rendering
The web currently mostly consists of server-side rendered websites which means that a client's computer constantly asks to a certain server "Hey, how does this page look?" and the server uses some kind of template language to generate the page on (server)**runtime**.

> To me that's a bit like asking me to fill your cup of coffee when it's already full... I mean it's nice to have more coffee but it's completely unnecessary.

### Unnecessary re-rendering of a page
This means that a user has to wait for the server to render the page before anything is shown. On a slow connection this can lead to a lot of latency because despite that the content of a page hasn't changed in the meantime, you still ask a server to re-render the page. To me that's a bit like asking me to fill your cup of coffee when it's already full... I mean it's nice to have more coffee but it's completely unnecessary.

### Managing multiple environments
If I build a server that means that I also have to manage it... As a Front-end Developer this is not necessarily something I want to do because it means another level of overhead to my project. Another downside is that my server also has some influence of the loading speed of my website.

### Loading speed also depends on your server
If my server get's overloaded, responses can become sluggish and slow. While on the front-end I might have optimized everything for performance, it is still slow due to the fact that my server can't cope with all the incoming requests.

This simply means that, should I want a better performance, I'd have to manage my server... as I said, that gives my project more overhead.

## What are statically generated sites?
Statically generated sites are not so different from server-side rendered websites. However where a server-side rendered webpage is rendered during **runtime** as I said before, a statically generated page is rendered during **buildtime**.

### Template & pre-generate
This usually means that you build your websites using templates (just like you'd do when building a server-side rendered website) and then use a [static site generator](https://www.staticgen.com/) (in this case [Eleventy](https://www.11ty.dev/)) to pre-generate all pages.

### Using external data in your templates
Most of the static site generators have some kind of flow built in for getting external data on buildtime. For example, when you use Eleventy you can use a __data_ folder, add a JS file that you name 'site' or something. In that JS file you can fetch data and return it, you then have access to a 'site' variable in your templates.

```js
// _data/site.js
module.exports = async () => {
  const response = await fetch('https://my-external-datasource.com/api/v1/users')
  const users = await response.json()

  return {
    users
  }
}
```

```html
<!-- some template -->
<section>
  <h2>Users:</h2>
  <ul>
     We can now access site.users here.
  </ul>
</section>
```

## Safely using 'server-side' functionality
Although it is called a 'statically generated site' you can still use server-side functionality like fetching data or handling forms by writing so-called [_serverless functions_](https://vercel.com/docs/v2/serverless-functions/introduction). How you write and deploy them depends on the platform you deploy your application. In my case this is either [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/). For this example I make use of the Vercel syntax since that is the closest to how ExpressJS routes are built, something I'm most comfortable with.

Let's say that we need some environment variables to fetch some data from some external source. If we would do this client-side, all secret keys are exposed in the network tab. However, this is where serverless functions come in, since you can do a request to your serverless function, which can do a safe request to an external source, like so:

```js
// /api/get-user-data.js (serverless function)
require('dotenv-safe').config()
const fetch = require('node-fetch')

const { APP_SECRET } = process.env

module.exports = async (request, response) => {
  const options = {
    headers: {
      'my-app-secret-not-shown-client-side': APP_SECRET
    }
  }

  try {
    const result = await fetch('https://www.my-external-source.com/api/v1/users', options)
    const data = await result.json()

    response.status(200)
    response.json({
      success: true,
      data
    })
  } catch(error) {
    const status = error.response.status || 500
    const message = error.response.message || 'Could not fetch users'

    response.status(status)
    response.json({
      success: false,
      message
    })
  }
}
```

```js
// /index.js (client-side)
fetch('/api/get-user-data')
  .then(response => response.json())
  .then(data => {
    console.log(data) // [{ name: 'First' }, { name: 'Second' }]
  })
  .catch(error => {
    console.error(error)
  })
```

## Why I love the statically generated setup
Although a statically generated setup can seem fairly complex at first I definately fell in love with it because of it's simplicity and how it brings a website pretty much back to basics, removing all unnecessary managing of things like servers and databases. I also love it for the next couple of reasons which I will dive into a bit more later:

<ol>
  <li>It is set up for performance</li>
  <li>It brings the web back to basics</li>
  <li>You don't have to compromise on your build process</li>
</ol>

### Set up for performance
{{ figure('/images/static-generation-1.png', 'The homepage get\'s a score of 100 in the Lighthouse performance test.') }}

A statically generated website is set up for performance by default. Since every page gets generated to a single HTML file during buildtime you can serve all static files to the user. This also means that you can serve your whole website from a CDN so a user gets all files from the most nearby server possible which in turn improves loading times even more.

### It brings the web back to basics
Personally I like to keep my solutions very simple and bound to basics as much as possible. This is what a statically generated site basically is, since we leverage a lot of the browsers capabilities without having to do magical things on a server or in client-side JavaScript. A statically generated site is also easily progressively enhanceable since you could make a form work even without JavaScript by making a serverless function respond with HTML instead of JSON:

```js
// /api/handle-form-submit.js
const render = require('../lib/render') // A render function that uses Nunjucks to render templates

module.exports = async (request, response) => {
  const { name } = request.body
  const html = await render('success', { message: `Thanks ${name}!` })

  response.send(html)
}
```

We can make a url to our serverless function a bit prettier by adding a rewrite in _vercel.json_:
```json
{
  "rewrites": [
    { "source": "/submit", "destination": "/api/handle-form-submit" }
  ]
}
```

We can now add an action attribute to the form that points to our serverless function:
```html
<!--
  /submit now points to our serverless function
  since we've added a rewrite
-->
<form action="/submit">
  <label for="name">Your name:</label>
  <input type="text" name="name" id="name">
</form>
```

The _/submit_ page will now serve a rendered template with a success message.

### You don't have to compromise on your build process
Most of the static site generators already have some kind of build process which you almost always can extend with your own functionality. For example, Eleventy makes it possible to add all kinds of (self made) plugins, filters and more. This way you can compress images and minify all outputted HTML while also being able to use some kind of JS bundler like Rollup or Webpack to bundle your JS assets on the side.

All this performance optimalization and being able to build everything in a progressively enhanced way by leveraging the browsers capabilities as much as possible makes my heart go boom boom ❤️.

## Sources
1. Biilmann, M. (2015, November 3). Why Static Site Generators Are The Next Big Thing. Retrieved June 26, 2020, from [Smashing Magazine](https://www.smashingmagazine.com/2015/11/modern-static-website-generators-next-big-thing/)
