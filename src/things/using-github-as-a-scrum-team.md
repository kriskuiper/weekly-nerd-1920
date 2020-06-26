---
layout: "thing"
title: "Using GitHub as a scrum team"
excerpt: "I'll explain how you can use GitHub to your advantage when working in a team so you'll never have to use other tools again."
tags: post
---

{% from 'components/figure.html' import figure %}

Didn't we all have that phase where you use GitHub only for co-creating a codebase and nothing else? You'd have something like Trello or Jira for project management, Travis CI for your continiuous integration and so on and so forth.

Well, did you know GitHub now has most of these things integrated into the platform? For example, during [this project](https://github.com/kriskuiper/cmd-digital-playground) we used a lot of GitHub's features to handle our project management.

We even used GitHub Actions as a CI to update our preview branch when our master branch was updated since these branches needed to stay in sync. In this article I'll go over the neat things that GitHub offers to scrum teams and how you can (almost) manage your entire project by just using all of GitHub's features.

## Your backlog is on GitHub Projects
Forget using Jira or Trello to manage your backlog, you can do that on GitHub Projects now. All you have to do is to create a project, add some columns and off you go. You can even automate GitHub in a way that it integrates with your project.

{{ figure('/images/gh-projects-1.png', 'You can manage your projects under the projects tab.') }}

{{ figure('/images/gh-projects-2.png', 'After you\'ve given your project a name and didn\'t choose any template this is the blank slate you\'ll start off with.') }}

From here on you can start by creating columns. I always like to have at least a _Backlog_, _Next Sprint_, _Current Sprint_, _In progress_ and a _Done_ column. However, when working in a team I would add an _In review_ column between _In progress_ and _Done_. A finished set up could look something like this:

{{ figure('/images/gh-projects-3.png', 'First half of the columns, including Backlog, Next sprint, Current sprint and In progress.') }}

{{ figure('/images/gh-projects-4.png', 'Second half of the columns, including In progress, In review and Done') }}

## Using issues as tickets
If you have columns you also need cards (the actual tasks) right? That's where we can use GitHub _issues_ to our advantage by coupling them to the project.

{{ figure('/images/gh-projects-5.png', 'When creating an issue you can assign it to a project in the Projects section in the sidebar.') }}

As you can see, the issue isn't directly put in a certain column inside the project. That's something we can automate (more on that later). However, for now, you could click on the dropdown and select 'Backlog'.

## Automating GitHub Projects
Like I said earlier. You can also automate things in GitHub Projects. For example, it would be nice if when we add an issue to the project, it would go straight in to the Backlog column so we don't have to fix that manually. Or if someone adds a PR that it would go straight into the 'In review' column. Fortunately we can do that with GitHub Projects. You should go to your project and click on the three dots of a column, after that click 'Manage automation'.

{{ figure('/images/gh-projects-6.png', 'You can use so-called presets and then choose which rules you want to apply to a certain column. We want to move issues to the backlog when they\'re newly added to the project or when a closed issue is reopened.') }}

Now when we add an issue to our project like we did before it will automatically move into our 'Backlog' column with all assignees and labels that you gave it.

## Link issues to PR's or vice versa
We can automate even more by using so called _linked issues_ or _linked PR's_ for that matter. You can link certain issues to a PR which in turn will close the issues if the PR is merged. I found this very helpful because it does not only give the closing ability, it will also just hint that there's a PR linked to a certain issue and that there's an issue linked to a certain PR. It makes it very easy to see what's being worked on and what may be fixed soon.

{{ figure('/images/gh-projects-7', 'You will see an exclamantion mark next to an issues\' description if it has a linked PR') }}

{{ figure('/images/gh-projects-8', 'You will also see it in your projects where a PR icon next to an issue makes it clear that this issue has a linked PR') }}

## Keep track of the progress by using milestones
If you really want to dive into the nitty gritty you could even use milestones to keep track of certain progress. I've not used it yet but I can assume that you would use it to couple certain issues to certain releases or sprints (whilst then removing the _Next Sprint_ and _Current Sprint_ columns).
