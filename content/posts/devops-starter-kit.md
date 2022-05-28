---
title: DevOps Starter Kit
date: 2022-02-23T23:46:19Z
draft: true
tags:
  - devops
  - humans
---

Recently I started building a DevOps team, basically from scratch. There are plenty of people on the team who are motivated to automate, have the technical skill to use git more than just `git commit -am "my commit"` and `git push`, and have a whole lot of tasks that are ripe for automating away. So what's next?

Basic tooling to get started would be as follows:

1. A git-based version control system that supports a pull request type of workflow
2. A CI/CD solution triggered by commits being pushed to a git repository, hosted in the aforementioned system
3. An artifact storage system (e.g., artifactory, S3 bucket)
4. An execution environment where arbitrary code, written by the team, may be run safely (ie. cloud host)

Where does this leave our tools?

In this specific environment there are a few hoops to jump through:

1. Enterprise lockdown
2. Bureaucracy
3. Corporate bloatware

## Enterprise Lockdown

At most companies, this encompasses everything from "company policy says" to actual barriers put in place. I see ill-informed policies put in place because "that one time when so-and-so did $BadThing with $UnfamiliarTechnology" and got a useful tool banned. Like SSH. Or having local admin on your workstation. Or any sort of cryptographic anything that cannot be inspected by the corporate watchers, in case they might want to look at it.

This may extend to access management 

More than likely, few people have admin control over their own workstations.



## Access Management

Every single permission or IAM policy (AWS or otherwise) is scrutinized. Anything we don't explicitly ask for is declined. Anything that doesn't sound like a standard set of permissions is scrutinized, but may still be approved.

All of this may sound like a well-oiled security organization. The problem is that every approval and implementation of the request is crafted and triggered manually, by a human, not automation with some bounds checks for sanity. This means a request could take 2 hours or 2 months to complete. How do we work within this framework?

## Building trust

When the framework for security is so thick with bureaucracy that it discourages actual work from being done, a task that should take an afternoon might take 2 weeks, 2 months, or be put indefinitely on hold. It's stifling. How does one handle that?

Politics. Not the backstabbing kind, the "mutually beneficial" alliance kind. What I had to do in similar circumstances is start knocking on doors. Evangelize what I'm trying to do in the long-run and how it helps them. Sell it. Sell it so I can do my friggin job.

