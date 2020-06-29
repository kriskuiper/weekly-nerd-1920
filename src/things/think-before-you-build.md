---
layout: "thing"
title: "Think before you build"
excerpt: "You should always think before you start coding on a feature. It will help you on the long run."
tags: post
---

Most of the time you as a developer have to build some complex things that involve a lot of logic. Often I find myself stuck in the end because I didn't 'prepare' beforehand. However, during the minor I learned that preparing for building complex features will often help you in the long run. In this article I'll take you through my process of building complex features and web thingies.

## Starting with acceptance criteria
Every task I add to a project board has some **acceptance criteria** defined in the description. It's simply a checklist to define when a task or feature can be considered as _done_.

Adding acceptance criteria already help me to pick the task apart in minor tasks that have to be done for the greater task to be finished. You can read more about how I set up a (team) project in [this article](/things/using-github-as-a-scrum-team/).

Let's say we have to build a checkout flow for some e-commerce website, the acceptance criteria could then look something like this:
- A product can be added to the cart
- A product can be removed from the cart
- A user should be able to look at his cart
- A user should be able to order the products in a cart
- A user should get feedback that their order is being processed

## Setting up the needed functionality with pseudo-code
From the acceptance criteria I've defined I start to set up the needed functionality in pseudo code. This is where I start creating the components needed to finish the task. In this case we pretend the user always has access to JavaScript and we already have some product component that looks like this:

```html
<article>
  <figure>
    <img src="images/product-image.jpg">
    <figcaption>A black shirt on a white background</figcaption>
  </figure>

  <div>
    <h3>My awesome T-shirt</h3>
    <p>This is an awesome T-shirt you can wear in the summer.</p>
  </div>

  <form action="/add-to-cart" data-product-id="1">
    <!-- If a user submits this form, the product will be added to the cart -->
    <input type="hidden" name="product_id" value="1">
    <button type="submit">Add to cart</button>
    <p id="user-feedback"></p>
  </form>
</article>
```

From here on I want to write some pseudo code for every task in the acceptance criteria. Because in the end we have to finish all tasks to finish the feature, right? The pseudo code for adding a product to the cart could look something like this:

```js
// We always need all form elements with action="/add-to-cart"

// We want to add the product to the cart if the form is submitted
```

We know that we need some function that adds a product to the cart. Let's also write that and fill it with pseudo code:

```js
async function addProductToCart() {
  // Prevent the form from submitting

  // Give the user feedback that the product is being added

  // Use a serverless function to add the product to the card

  // Give the user feedback if adding was success or failed
}
```

> **note:** If you don't know what serverless functions are or how they work, I suggest you take a look at [this article](/things/why-i-love-statically-generated-sites) where I cover why I love statically generated sites and talk about serverless functions.

Even though we haven't created the real functionality in _addProductToCart_ yet I like to implement the names upfront because it helps me with thinking about naming functions and variables. Also, again, it leaves some minor task in your mind like _"this function specifically has to add a product to the card"_.


## Filling in the blanks
The neat thing about the comments we've just written is that we even can abstract that functionality out in other functions so our code in the end reads like a book. This comes in handy, specifically in our _addProductToCart_ function since we also have to do some other things.

```js
// We always need all form elements with action="/add-to-cart"
const $forms = document.querySelectorAll('form[action="/add-to-cart"]')

// We want to add the product to the cart if a form is submitted,
// we also want to be a bit defensive so our code doesn't break if
// there are no forms on a page.
if (forms) {
  $forms.forEach($form => $form.addEventListener('submit', addProductToCart))
}
```

Now we also have to do this for our _addProductToCart_ function, notice how I implement the naming first before even really creating the minor functions:

```js
function addProductToCart({ preventDefault, target }) {
  const { productId } = target.dataset
  const $button = target.querySelector('button')
  const $userFeedback = target.getElementById('user-feedback')

  const options = {
    body: JSON.stringify({ productId })
  }

  // Prevent the form from submitting
  preventDefault()

  // Give the user feedback that the product is being added
  setLoading($button, true)

  // Use a serverless function to add the product to the card
  fetch('/api/add-to-cart', options)
    .then(() => giveUserFeedback($userFeedback, 'Your product is added to the cart'))
    .catch(() => giveUserFeedback($userFeedback, 'Something went wrong'))
    .finally(() => setLoading($button, false))
}
```

We obviously need the _setLoading_ and _giveUserFeedback_ functions:

```js
function setLoading($button, isLoading) {
  if (isLoading) {
    $button.setAttribute('disabled', true)
    $button.textContent = 'Adding to cart...'

    return
  }

  $button.setAttribute('disabled', '')
  $button.textContent = 'Add to cart'
}

function giveUserFeedback($feedbackElement, message) {
  $feedbackElement.textContent = message
}
```

## Concluding
Writing clear acceptance criteria beforehand and writing pseudo code before starting to code helps me a lot when I need to break a problem up in smaller pieces. It also lets me think about the bigger picture, for example if I need a small overview of some data structure I will just take the time to sketch it out a bit instead of diving into the code directly. Just to clear my mind up.

I hope this article helps you with solving code-related problems in the future, it certainly helps me to adhere to this way of working when I tackle code-related problems. It also helps me to stay calm since this way of working gives me the feeling that everything that needs to happen is clear to me.

If you want to get in contact about my way of working you can always reach out ot me on [LinkedIn](https://www.linkedin.com/in/kris-kuiper-0b6897a2/).
