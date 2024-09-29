---
aliases: [/post/iron-crystals.html]
title: Iron Crystals
date: 2017-01-07T21:30:00-05:00
---

Today, I've begun looking into compiling the Crystal compiler from another
direction, possibly opening up the cross-platform capability of Crystal to all
of the operating systems certain other popular languages already support.

In past weeks, I'd begun digging into porting crystal to run under Alpine Linux,
that way I can have a very small, very specialized docker container to compile
Crystal projects, or even run their binaries. The problems I ran into were that
Crystal is a garbage-collected language. Why is that? Why not make it have zero
garbage collection, if at all possible, similar to how C, C++, or Rust have it?

Crystal has boasted that it is completely self-hosted, meaning it can be
compiled, contributed to, and more using the Crystal language itself. This comes
as a liability when trying to port it to another platform because, in order to
compile crystal for that platform, you must already have a Crystal compiler for
it. See the dilemma? Chicken and the egg.

It's okay though, according to the docs, there is a way to port it to other
platforms by using the `--cross-compile` and `--target` compile-time flags. I
recently tried this in my endeavor to get it to work with Crystal, but failed in
that there were segfaults all along the way. The most cryptic? Something about
`sh` and not being able to access a value since it was out of bounds. In `sh`.
Yeah.

Okay, I've followed every documented piece of evidence in order to cross-compile
the Crystal compiler using `--cross-compile`, now what? The docs support the
alternative of stepping through since v0.0.1, when the compiler was written in
Ruby, to create a crystal compiler that works on the other platform. Given the
number of released versions since then, and how many more there will likely be
in the future, this doesn't seem very future-proof either. What else can we do?

Here's a thought:

Crystal has boasted since day zero (day one?) that it is inspired by the Ruby
programming language. Why wouldn't that inspire alternate implementations too?
why can't we create a JRuby or Rubinius or even Opal of Crystal? That might
satisfy some of the pre-requisite of porting the official Crystal compiler to
another platform by using the cross-platform traits of the other language. How
should we proceed?

That's the ultimate question. Over the coming weeks, I'm going to be digging
into Rust, Crystal, and basic, lower-level concepts involved in constructing a
programming language.
