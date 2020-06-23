---
layout: "note"
title: "Working with multiple teams @Funda"
lecturer: "Lars Douwe Schuitema"
excerpt: "Funda invited us to come work in multidisciplinary teams, building several features."
tags: note
---

Funda invited us to a workshop where we had to work in multidisciplinary teams on one site. Every team worked on one specific feature, in the end we had to combine all different features (that didn't really work out...).

## About my team
Our task was to build a filter function for the houses. A user should be able to filter the houses on type. For instance one advertisement could be an appartment while the other is a huge house or something. It was our task to create the functionality and do a little bit of design.

## Having a scrum master
Every team had it's own scrum master who would hand out tasks to every team member after he discussed it with them. I started out building the functionality together with Sjors and Giovanni.

## Building the simple version first
We decided to build out a simple version first. This meant that we should be able to at least log out the new results to the console so we can make sure that we were manipulating the data in the right way. After that we could change the results in view.

## Connecting the logic to the view
The workshop's codebase consisted of a Vue application so mounting the filtering logic to the view was pretty simple by just using a data hook. However, when combining this with other team's solutions this would make data flow everywhere and it would make the whole application difficult to reason about. Therefore we chose to use Vuex (an app state manager for Vue) and manage app state from there.

## Fitting it with other teams
In the end we unfortunately did not have the time to actually combine our solution with that of the other teams. However, we did discuss our solution with the other teams and in the end presented it in a way that if you want to combine all solutions you would have to use some state manager and run all data through all different filters and sortings that all teams built so the front-end could be updated in a right way.
