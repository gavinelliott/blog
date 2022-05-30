---
title: Gavin Elliott
subtitle: Head of UX and Design Leader at UK Health Security Agency.
layout: layouts/base.njk
---

<div class="intro">
A <span class="intro-highlight">design leader</span> and Senior UX Manager at Shopify who focuses on solving complex problems in simple ways. I spend the majority of my time <span class="intro-highlight">leading design teams</span>, <span class="intro-highlight">embedding good user-centred design</span> and <span class="intro-highlight">building the capability</span> of designers. On the side, I speak regularly about <a href="/imposter-syndrome/">impostor syndrome</a>, good design and building design teams.
</div>

## Latest writing...

I share articles about topics which I'm currently working through in my head.

<ul class="listing">
{%- for page in collections.post | reverse -%}
  <li>
    <a href="{{ page.url }}">{{ page.data.title }}</a> -
    <time datetime="{{ page.date }}">{{ page.date | dateDisplay("LLLL d, y") }}</time>
  </li>
{%- endfor -%}
</ul>
