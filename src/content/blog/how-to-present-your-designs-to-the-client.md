---
title: "How to present your designs to the client"
description: "An archived guide from 2010 to presenting design work to clients, with advice on browser prototypes, mock-ups and feedback."
pubDate: '2010-02-24'
---

*Originally published in 2010. Restored from an archived copy. The tools and examples reflect that time. Some original images are no longer available.*


<p><img src="/images/archive/how-to-present-your-designs-to-the-client.jpg" alt="how-to-present-your-designs-to-the-client" width="520" height="282" loading="lazy" decoding="async" /></p>
<p>Over the many years I’ve been designing I’ve lost count of the number of times I’ve had to present my designs to a client. It is the one thing you’ll never be able to get away from.</p>
<p>Presenting your design to the client is always one of the most daunting parts of the design process. After all, design is so subjective it can leave the client thinking we were mad and our idea of perfect is like being poked in the eye, twice.</p>
<p>There are many different ways of presenting our designs. We all design differently, whether we design in the browser, sketch or design entirely in Photoshop. Below I take you through various ways of presenting your client designs.</p>
<h2>XHTML/CSS (Build it in browser)</h2>
<p>Building a design in the browser to deliver as a design presentation? Sounds quite mad doesn’t it? Let’s put it this way, how about designing in the browser? It still sounds just as dangerous… Well maybe not. A lot has changed in the past couple of months and with the improvements in many browsers including Safari, Firefox and Chrome with a little bit of IE7, IE8 and Opera we can achieve lots more with the likes of CSS3, webkit and jQuery.</p>
<p>Photoshop or Fireworks can leave a design looking so perfect that when you get to building the design it no longer looks like the original design. There is only so much a browser and code can do and some browsers do not display things in the same way.</p>
<p>If you were feeling extravagant, like <a href="http://www.twitter.com/malarkey">Andy Clarke</a>, you could present your web designs to clients in the browser. This allows them to see how the design will look normally as though they’re using it themselves. You can do all of the wireframes before the build phase and fingers crossed the client viewing it in the browser will see everything in the same light as you.</p>
<p>You could just present one template or you could choose to present many, however firstly look at your billing procedures to see if your first invoice (paid) covers the amount of time it’s taken to build your design in the browser. You certainly don’t want to be left high and dry if the client doesn’t like it and you’re then endlessly working backwards and forwards.</p>
<h2>Design Board (Visual)</h2>
<p>This method is very rare in web design and is mostly seen in the print design world. If you have to present a design to a committee or even large client you could print your web design on to an A3 sheet of paper and mount it against some board. This makes the design rigid so you can carry it into the presentation and even pass around A4 smaller versions to help the client see the design up close. You could add tags or mini-descriptions on to the design to aid in the explanations.</p>
<p><img src="/images/archive/designboard.jpg" alt="designboard" width="500" height="196" loading="lazy" decoding="async" /></p>
<h2>A flat image in the browser – View the Demo</h2>
<p>This is one of the easier ways of presenting a design in the browser. By setting the background as a flat jpeg with CSS and adding a png image into the html you can view the design within the browser. This eliminates any file sending issues with your client.</p>
<p>You can do this is in a sub-folder or sub-directory of your pleasing. For this demonstration I’ve simply created a sub-folder called ‘jpegbrowser’. If your design has a common place colour, set this with CSS so if there is over-scroll it won’t matter too much. Save your background whether it be tiled or flat as bg.jpg. Save your design without the background as a .png keeping all transparent aspects, transparent.</p>

<p>The code below shows that we’ve setup a .html page titled “Jpeg in the Browser Demo”. We’ve added the background colour, image and set it so it’s positioned to the center and top whilst making sure it doesn’t repeat.</p>
<p>We’ve then created an ‘image’ div setting the width to the width of your image. I chose 1440px as any ‘normal’ client user should have a screen size of at least 1440px even if they’re using a laptop. I’ve added the margin: auto line to make sure the image sits in the middle of the page if the client happens to have a larger monitor. You could go as far to pre-check what resolution your client is using and setting everything up for their screen size.</p>
<pre>&lt;html&gt;
   &lt;head&gt;
      &lt;title&gt;Jpeg in the Browser Demo&lt;/title&gt;
      &lt;style type=&quot;text/css&quot;&gt;
         body {
         background: #1a0f1f url(img/bg.jpg) no-repeat center top;
         }</pre>
<pre>         #image {
         margin: auto;
         width: 1440px;
         padding: 0;
         }
      &lt;/style&gt;
   &lt;/head&gt;
   &lt;body&gt;
      &lt;div id=&quot;image&quot;&gt;
         &lt;img src=&quot;img/image.png&quot; title=&quot;Presentation&quot; alt=&quot;Design Presentation&quot;/&gt;
      &lt;/div&gt;
   &lt;/body&gt;
&lt;/html&gt;</pre>
<p>This then allows the .png design to sit over the main bg.jpg thus making it look like their website to be is in the browser. A plus point to presenting your design this way is that the client will get an idea of size, a negative being an image is just that, it’s a graphical representation of how their design will look and not everything will be the same once built. Obox Themes have kindly donated their ‘DEPTH’ Theme design to be used as the example in the demo, you can purchase the <a href="http://www.obox-design.com">wordpress theme</a> DEPTH from Obox Design. View the Demo</p>
<h2>Flat JPEG sent via email</h2>
<p>The easiest presentation that you can do is the simple jpeg via email method. This doesn’t leave much to the imagination and can cause many problems for not tech-savvy clients. Trying to write an email in a way that they will understand what you are talking about is quite difficult. Nine times out of ten, they will attempt to print the design off, in ‘fit-to-page’ mode of course. This shrinks down a possible 2000px long design to an A4 sheet. Great news is they will need a magnifying glass to see what you’re talking about.</p>
<p>You could send the file and then immediately ring them to make sure they’re opening the file correctly. And then talk them through it on the phone however this can with some clients seem a little un-professional especially if you’re working with some very big clients.</p>
<h2>Use a Web App</h2>
<p>You can present, share and annotate your designs online with a web app like <a href="http://www.notableapp.com">Notable App</a>. Created by the guys over at <a href="http://www.zurb.com">Zurb</a>, Notable App takes the pain out of presenting a design and being able to describe it to a client. It also enables the client to provide feedback on your designs online. The app allows you to provide feedback directly on the web page, highlighting their own points exactly so nothing can get confused or miss-translated. With Notable App, feedback can be left over time, so if you’re a remote designers you do not have to be there exactly when your client is wanting to leave feedback.</p>
<p><a href="http://www.notableapp.com"><img src="/images/archive/notableapp.jpg" alt="notableapp" width="500" height="204" loading="lazy" decoding="async" /></a></p>
<p>The ability to make annotations within 60 seconds of receiving a link to your presentation can make the feedback process more streamlined than it has ever been before. Depending on who you client is could lead to feedback by committee and there may be more than one person involved with providing it. Notable App allows you to have multiple people accessing and leaving notes on the same design.</p>
<h2>Other point of views</h2>
<p>I was interested to hear other point of views on how to present design to a client. The designers below were kind enough to share their thoughts. (<em>Thanks to all</em>)</p>
<h2><img src="/images/archive/tim-van-damme.jpg" alt="tim-van-damme" width="80" height="80" loading="lazy" decoding="async" /><a href="http://maxvoltar.com/">Tim Van Damme</a></h2>
<p>I know there’s been a lot of discussions going on recently about how you shouldn’t present static designs to your clients, but it’s still my most preferred way. BUT… I only show them one page like this. I usually take the most complicated page of the entire website/-app and design that in Photoshop. After I showed them this page, I do most of the other pages straight in the browser (until there’s a complicated component, than I jump back in Photoshop).</p>
<h2><a href="http://sam.brown.tc">Sam Brown</a></h2>
<p>My clients are usually located overseas and communication is done remotely, so for me the best method to display static designs to a client is in the browser itself. I embed the design into the background of a blank page and with some simple CSS can control the format of the page, all I have to do then is send the client a link. This method has many benefits, not least of which is the client gets an accurate picture of how the design will look in the browser but it alleviates a whole host of other problems such as file formats and images not being viewed at 100% actual size.</p>
<p>The key however is always in the communication, I like to be ‘there’ when clients open design mockups so I can help explain the process, my choices and help answer any questions they may have. Lately however I have been doing a lot of design in the browser – sending links to static pages is also a common way I present designs to clients.</p>
<h2><a href="http://www.gracesmith.co.uk">Grace Smith</a></h2>
<p>Previously I used a subdomain to present designs to a client by creating a subdomain and a static HTML page which held links to the design and revisions (if required). This gave a good representation of how the design would look and feel like when viewed through a browser.</p>
<p>However at the start of the year I started using Notable and have been so impressed by it, I’ve now switched to using it to present designs (website and logo) to the client. It enables me to get instant feedback and allows the client to make notes on any piece of the design. Overall I’ve found it’s better empowered the client and made for more effective communication throughout the design process. Notable also allows you to create sets within a project workspace, thus allowing me to separate the project into discreet sections.</p>
<p>A recent client actually expressed to me how good the communication was throughout the project, I think a part of this is down to using a tool like Notable which allows for instant, open feedback.</p>
<h2><a href="http://www.obox-design.com">David Perel</a></h2>
<p>Once I made the mistake of sending a client, who was very much a layman, screenshots via email. We went through the whole design process via this method, everything from the home page to multiple sub pages. When the client finally signed everything off I got down to the CSS.</p>
<p>Once I had completed the CSS of the home page I sent them a link to preview it. Upon review they sent me back a message which said “Why is the site so big?”. This question blew up into a 2 day debate while I tried to understand why they didn’t like the design despite it being signed off.</p>
<p>I eventually figured out that they were infact viewing the emailed screenshots at about 70% magnification and were not viewing them in full size. The result is they perceived the site to be smaller than it actually was.</p>
<p>So my suggestion is that you never send your clients screenshots via email. Rather present it to them via a link in your browser, use CSS to size up the body and use the background-image property to display the design. This way the client can get a very clear idea of what the site will look like when live.</p>
<h2><a href="http://www.squaredeye.com">Matthew Smith</a></h2>
<p>I present my designs to the client on basecamp in jpg format. Its not ideal for all clients, but my clients tend to have a pretty high level of web savviness to accommodate for the difference between image and html. Ideally, a web image would be presented in an html page with the image centered and the background-image repeated horizontally behind the image. This would be the most “web like” experience for the user.</p>
<p>I always talk my clients through the entirety of the design making points about each design decision and how that decision effects their business goals. I try to use plain language that communicates more about business and the actual use of the website rather than the art of design. The design calls are the time where I really earn the trust of my clients. They get to see how invested in their success I am, and how driven I am to produce a product that promotes that success.</p>
<h2><a href="http://www.blog.spoongraphics.co.uk">Chris Spooner</a></h2>
<p>Presenting my designs to clients has actually been something I’ve experimented myself. Usually I’ll supply a JPEG graphic with the design mocked up, and write out an explanation of the design along with some thought processes behind each element in the subsequent email. This often helps show reasoning behind a design and can help avoid changes. Generally speaking for logos, I’ll supply a A4 sized graphic with the primary logo prominently in the top centre, followed by three smaller variations showing how the logo works in single colour, mono and reversed. I’ve also tested out the method of showing a design in situ, for instance a logo overlaid onto a business card or a product. This can sometimes give the client that extra aid to their imagination so that they can see how this logo could work for them.</p>
<h2><a href="http://spyrestudios.com/">Jon Phillips</a></h2>
<p>I usually ask as many questions as possible to get an idea of what the client wants and when I’m ready, I’ll either send mock-ups (in jpg format) to my client for review, or in some cases I’ll send a link to a test site with my mock-ups in HTML/CSS (pretty much like Meagan Fisher described in her <a href="http://24ways.org/2009/make-your-mockup-in-markup">24Ways article</a> and use things like border-radius and text-shadow to replicate the effects I would normally do in Photoshop. I think it depends on the project. Some clients prefer Photoshop mock-ups while others like to be able to interact with the site – which they can do if I send them a HTML/CSS mock-up on a test site.</p>
