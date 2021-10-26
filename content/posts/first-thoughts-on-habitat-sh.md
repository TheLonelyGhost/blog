---
aliases:
  - /post/first-thoughts-on-habitat.html
title: First thoughts on Habitat
date: 2017-05-25 13:46:21
type: snippet
---

This past week I was at ChefConf going to various panels, intent on learning about Inspec and the best practices therein. While there, half of the panels were on this thing called Habitat, which I originally thought to be Yet Another Docker Alternative &reg;. First of all, it's not. Like Vagrant's relationship with Virtualbox, it tends to pair nicely with it and use it by default, but it is not the only way to use it by a long shot.

During the first keynote at ChefConf, I was exposed to some of the features of Chef Automate. I had seen a lot of these features a few weeks prior when some Chef people came to my office to demo Automate and some of the features (e.g., Compliance, Delivery), but one thing stood out that I hadn't noticed before: it looked like there was a dependency handling system that, if a dependent package had a version bump or new release, all packages that depend on it are rebuilt with that new version and packages that depend on those newly rebuilt ones are too, rippling through until all dependencies are resolved. This was especially resonant when I was dealing with Apache's mod_ssl and Heartbleed a few years back. You mean if I use this software and a CVE comes out for a low-level dependency, I can patch it and redeploy same day? Easily? Yes.

Wait a second. This isn't what Chef does. Chef is about configuration management, not application dependency resolution nor, hopefully, application deployment. What's this doing in Chef's Automate software then?

I dug in a little more and found out that build system I saw was actually hooked into a project name that tickled at the back of my brain a little bit, like I had seen it before. Its name was Habitat.

I met up with some of my colleagues so we could divvy up this 6-track conference among the three of us, which we would then collaborate on what we learned and report back to our respective teams with this information. I wanted to go to the Habitat sessions, which appeared to be a track all its own. _We could really use some better dependency rebuilding triggers_, I thought, _and I'm not sure how we're going to do it with our Jenkins setup quite yet_.

## Session 1: Getting Started with Habitat

This first session was lead by the lead engineer of Habitat, Jamie Winsor, and here's where things got a little fuzzy. I hopped into this session, barely making it 2 minutes after it started (thanks to delays surrounding lunch), and Jamie was already on-stage talking about what Habitat actually is. A few weeks prior to this, I had seen some material on the Habitat homepage and it seemed to indicate to my ADHD-ridden mind that it was Yet Another Docker Alternative &reg;, putting a slightly different interface onto it. The difference was that, in the keynote, it was mentioned it could export to Docker, VM, or bare metal, so that didn't quite fit with my existing mental model.

Jamie carried on about what was involved with habitat while I struggled to piece together what was going on. It was one of those classic moments of an engineer being to deep in the subject to explain things at the level of the audience. That said, the rest of the audience members appeared to be following along just fine, so maybe it was just me.

Here's what I gathered from his talk:

- Habitat is written in Rust, in a way that is intended to be entirely self-contained
- The intention of Habitat is for sandboxing applications
- A prime focus when creating a new bit of software like this was to make it super easy to learn ("Measured in terms of lunch breaks, not weeks to learn")
- Habitat is supposed to be 100% platform agnostic
- There's this thing called habitat studio (`hab studio enter`) where you can hop into that super sandboxed environment from your terminal
- This supervisor thing appears to aggregate logs and make sure application packages are running correctly (similar to [Foreman](https://rubygems.org/gems/foreman) and its Procfile?)
- Somehow, an application package can be scaled up from the supervisor, grouped using a naming convention of `[package].[group]`
- Application packages can be started without a supervisor and assigned to an already running one ad-hoc. Why might this be useful? No idea
- Building and installing your application's components are done using some hooks, like `plan.sh` in a specific file in a specific directory

This left me with a bunch of questions:

- What did I just watch?
- What is the purpose of the Habitat Studio?
- How is this different from creating a Docker container with the base being Alpine Linux?
- Does this run on Windows at all, or are all the hooks built for a Unix-based system?
- What would it look like if I switched some of the legacy projects we run over to this orchestration(???) framework today?
