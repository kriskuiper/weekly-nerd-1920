---
layout: "default"
title: "My weekly nerd website"
---

This weekly nerd website is a statically generated website where I've collected all my articles and lecture notes.

## Things
<ul class="unstyled-list">
{%- for post in collections.post -%}
  <li>
    <a href="{{ post.url }}">
      <h3 class="title">{{ post.data.title }}</h3>
    </a>
    <p class="excerpt">{{ post.data.excerpt }}</p>
  </li>
{%- endfor -%}
</ul>

## Notes
<ul class="unstyled-list">
{%- for note in collections.note -%}
  <li>
    <a href="{{ note.url }}">
      <h3 class="title">{{ note.data.title }}</h3>
    </a>
    <p class="excerpt">{{ note.data.excerpt }}</p>
  </li>
{%- endfor -%}
</ul>
