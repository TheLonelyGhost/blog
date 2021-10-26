---
aliases:
  - /post/chef-goes-redhat.html
title: Chef goes RedHat
date: 2019-04-04T23:19:01
tags: ['chef', 'devops', 'inspec', 'habitat']
---

Given the [recent news][news-story] that broke about Chef's changes to their licensing model (and the associated [FAQ][license-faq]), a lot of chaos has ensued and I feel the need to straighten out a few things since I've been present for most every public development so far.

Here's a quick overview:

- Rebranding of products
- Open source release of Chef Automate
- Change in licensing, affecting monetization
- Price increase for commercial licenses

Let's break these down into more consumable pieces.

[news-story]: https://blog.chef.io/chef-software-announces-the-enterprise-automation-stack
[license-faq]: https://www.chef.io/pricing/subscription-model-faq

## Rebranding of products

This part is a relatively minor, semantics change for clarity and consistent brand. Here's a quick guide:

- `Chef` (config management tool) -> `Chef Infra`
- `Habitat` -> `Chef Habitat`
- `InSpec` -> `Chef InSpec`
- `Automate` -> `Chef Automate`

As part of this rebranding, Chef (hereafter a term used solely to refer to the company) will be bundling their individual products as part of an "Effortless Infrastructure" and "Enterprise Automation" stack. This becomes important later.

## Emphasis on open source

Per their announcement, Chef will be licensing the source code for Chef Automate under the same Apache 2.0 license as the rest of Chef's intellectual property. The release of this source code is to take place on April 16, 2019.

Shocking, right? My immediate question was, "How will they make money? All support contracts and professional services?" That's where the licensing change comes in.

## License change

Here's where things get a little dicey. All of the official statements from Chef have indicated the following:

1. The source code for all Chef products (listed above) are to have their source code released under the Apache 2.0 license.
2. Binary distributions of the Chef products are to be provided under [a different license][chef-commercial-license] than the source, specifically targetting commercial use.
3. Commercial license fees for the previously free products have been updated on their [pricing page][chef-pricing] (more on pricing change below)
4. Change in licensing is inspired by RedHat's business model

A quick list of reported exceptions to the license requirements for binaries, the details of which are to be reported by Chef at some undisclosed, later date:

- Personal use
- Experimentation for proving viability in a commercial setting (a.k.a., proof-of-concept work)
- Non-profit organizations
- Open source contributors to the products that meet certain criteria

[chef-commercial-license]: #
[chef-pricing]: https://www.chef.io/pricing

Starting with the following versions, the new EULA for this commercial license will be included:

- Chef Habitat -- (version not yet disclosed)
- Chef Infra -- v15.0
- Chef InSpec -- v4.0
- Chef Automate -- (first publicly available version)

Development of the products is still to take place in the open. In fact, Adam Jacob made a call to the open source community to [continue to collaborate][adam-jacob-blog-post] on the products and take advantage of the fact that it is still open source. He also made generalizations that this is entirely intentional so Chef can rely less on the "heroes" and "martyrs" who work on the previously closed source applications, inevitably burning themselves out. Instead, that burden can shift to anyone from the community who wishes to undertake contributing to the previously proprietary software in as big or small of a way as they wish.

It is important to emphasize that the _source code_ will be under Apache 2.0 license and the "_binaries_" (a term Chef has chosen to indicate the result of packaging with Omnibus and Habitat) will have the new commercial EULA.

In other words, it's as if Chef is saying "You can either pay us for this PPA, Yum repo, etc. that makes it super easy to install and update our software, or you can take this tar.gz file and compile the same software yourself with quite a bit of trouble for free."

[adam-jacob-blog-post]: https://medium.com/@adamhjk/goodbye-open-core-good-riddance-to-bad-rubbish-ae3355316494

## Price increase

Per the previous licensing change, several products have since changed from their \$0 price tag to... well, other non-zero prices. While it's interesting how they've decided to measure units for increasing the price tag (e.g., InSpec is based on number of scan targets), the most interesting part here is for existing customers.

The price tag for Chef Automate seems to have increased from $75/node previously to $150/node currently, according to some community members. That increase is difficult to verify since the pricing is no longer just for Chef Automate, but rather the entire Enterprise Automation stack. (Did I tell you their organizing their products into bundles?)

## Conclusion

What does this mean? I'll tell you later, in a separate post. Right now I'm going to keep this page updated with as many facts as I can find as the story unfolds.
