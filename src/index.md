---
layout: "default"
title: "Home page"
---

# My weekly nerd website
This weekly nerd website is a statically generated website where I've collected all my articles and lecture notes.

## Things
<ul>
{%- for post in collections.post -%}
  <li><a href="{{ post.url }}">{{ post.data.title }}</a></li>
{%- endfor -%}
</ul>

## Notes
<ul>
{%- for note in collections.note -%}
  <li><a href="{{ note.url }}">{{ note.data.title }}</a></li>
{%- endfor -%}
</ul>
