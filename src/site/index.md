---
title: Gavin Elliott
subtitle: Design Lead at @DigitalDWP.
layout: layouts/base.njk
---

<div class="intro">
A <span class="intro-highlight">design leader</span> who focuses on solving complex problems in simple ways. I spend the majority of my time <span class="intro-highlight">embedding good user-centred design</span> and <span class="intro-highlight">building the capability</span> of our designers. On the side, I speak regularly about <a href="/imposter-syndrome/">impostor syndrome</a> and designing good services.
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
