---
aliases:
  - /post/blogging-made-easy.html
title: 'Blogging made easy'
date: 2018-01-28T23:10:31
tags: ['workflow']
---

Since starting this blog, I've encountered any number of topics where I've literally said, "Maybe I'll write a blog post about that..." The biggest hinderance has always been thus:

When I'm at my computer, I want to code. When I'm away from my computer, I'm typically on my phone scrolling through twitter or reddit, wishing I would blog more like the posts I end up reading.

## Netlify

I typically use Netlify for deploying any static sites these days, if only because I can easily hook it up to github and auto-deploy using more than just Jekyll, even going so far as to have a custom domain with LetsEncrypt TLS certs. [And I have done that before](https://www.grafeas.org/). It only makes sense that I would investigate what else they have to offer.

Netlify offers a [full-on CMS][netlify-cms] in the form of for managing your static site. It claims to work with any static site generator with a little configuration and requires the use of Github for hosting the source code of the site.

Behind the scenes, [Netlify CMS][netlify-cms] creates a new branch off of `master` or `gh-pages` (whichever you configure is the main site) and creates a new commit on that branch every time you save with its built-in editor. It opens a pull request so it might be picked up later by the CMS. It does this all through the Github API.

### My issues with Netify CMS

First off, the drafts of your blog posts will always be publicly available. Something so public so early on is not conducive to stress-free brainstorming or just getting started with writing. I get it though, it's super intelligent to store the data on Github's side instead of committing to any data storage by Netlify. It also makes it so you have one less dependency for storing drafts. This is a trade-off they have clearly considered and I just have to deal with the consequences.

My second issue is that, when I last tinkered with it, [Netlify CMS][netlify-cms] had some show-stopping issues in integrating it with a Middleman site. The biggest one had to do with file extensions not being honored in the expected manner. It seems Jekyll was the favored child.

Thirdly, if you prefer Gitlab for source code storage, you're SOL--and reasonably so, given Gitlab was never intended as a drop-in replacement for Github. Again, this is an obvious trade-off that has been considered already and means I fall outside of the target audience.

There is nothing inherently wrong with [Netlify CMS][netlify-cms], in fact I applaud its existence and would love to see it grow. It just isn't the right tool for my situation.

[netlify-cms]: https://www.netlifycms.org/

## Evernote

After Netlify's solution not working out, I considered using a proprietary option that I already use to store a metric crap-ton of my data: [Evernote][evernote]. I have a mobile app for it, it has an unofficial Linux client called [Nixnote][nixnote] (formerly Nevernote), and I'm already paying for a premium account. Why not?

### My issues with Evernote

Okay so [Evernote][evernote] has a much nicer solution than Netlify's web interface that may or may not work based on my internet connectivity. I can just pop open my Blog Posts notebook and go to town, right?

That works up until it comes to transposing them into Jekyll. [Evernote][evernote] does the [WYSIWYG][wysiwyg] approach, which is great when composing but not too great when copying it into a markup language like Markdown or even HTML. Underneath the covers, [Evernote][evernote] notes use a form of XML with a proprietary schema for certain things like TODOs and inter-note linking. This means building a tool to work with [Evernote][evernote]’s APIs is that much more difficult and I would have to build Markdown pages from XML. No way.

What's the other option? Well, I would have to rewrite every single blog post by hand, reading from [Evernote][evernote] and writing into vim in Markdown. The only way I'd be able to preview it with any certainty is to run the Jekyll server locally.

Writing using a [WYSIWYG][wysiwyg] editor is enough of a hinderance, but having to transpose manually afterwards? That's a hard no. Too much overhead to write a simple blog post.

[evernote]: https://www.evernote.com/
[nixnote]: http://www.nixnote.org/
[wysiwyg]: https://en.wikipedia.org/wiki/WYSIWYG

## SimpleNote

This brings me to a solution made by WordPress' parent company, [Automattic][automattic]. Yes, the company behind the blogging engine I set out to avoid at all costs could actually help me with blogging. Automattic [bought the company][symperium] behind a note syncing application called [SimpleNote][simplenote], with renowned client applications such as [Notational Velocity][notational-velocity] and the fork, [nvAlt][nvalt]. Before acquisition, [SimpleNote][simplenote] had been touted as a no-frills note-taking application with _incredibly fast_, near-instant syncing of plaintext notes to Dropbox and other select cloud storage providers. Various clients, such as [nvAlt][nvalt], supported previewing of markdown in its richer formatting.

By the time I got to [SimpleNote][simplenote], [Automattic][automattic] had long-since bought it and made its own improvements. It removed the ability to send to Dropbox (et. al) and, for a time, broke compatibility with some of the third party clients. What it brought to the table were:

- [_even_][simplenote-automattic-syncing] [_faster_][symperium-syncing] syncing
- creating native clients for Linux, Windows, and Android
- adding a web app option
- making all of the official clients open source
- nixing all paid plans

### My issues with SimpleNote

As stated previously, it almost feels like I'm working with WordPress again. That leaves me feeling a bit slimy due to my own biases.

Honestly, that’s about it. [SimpleNote][simplenote] allows me to seamlessly write from my desktop, my phone, or some random computer with an internet connection and a web browser.

[simplenote]: https://simplenote.com/
[notational-velocity]: https://en.wikipedia.org/wiki/Notational_Velocity
[nvalt]: https://brettterpstra.com/projects/nvalt/
[automattic]: https://automattic.com/
[simplenote-automattic-syncing]: https://simplenote.com/2014/02/24/syncing-improvements-features/
[symperium-syncing]: https://simplenote.com/2013/08/22/simplenote-relaunch/
[symperium]: https://techcrunch.com/2013/01/24/wordpress-simperium-simplenote/
[wordpress]: https://www.wordpress.org/

---

Next up, what does my blogging workflow look like with SimpleNote? That’s where you’ll have to wait for part 2.
