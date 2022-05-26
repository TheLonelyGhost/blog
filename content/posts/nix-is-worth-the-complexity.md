---
title: Nix Is Worth the Complexity
date: 2021-07-04T01:11:27-04:00
---

Recently I've gotten fed up with the breaking changes in [Homebrew package manager](https://brew.sh/). After some research, using [Nixpkgs][nix] seemed like a far more stable option for GNU/Linux tooling on MacOS, albeit with a decent learning curve for configuration.

Without going too much further into it [Nix is pretty cool][nix-how-it-works].

[nix]: https://nixos.org/
[nix-how-it-works]: https://nixos.org/guides/how-nix-works.html

Over the following months, I'd been spending what free time I had tinkering with Nix on MacOS, specifically with [Home Manager][home-manager] and [nix-darwin][nix-darwin]. Nix is cross-platform between Linux and MacOS, and, frankly, I found myself maintaining an increasing number of shell scripts for installing important tools I use. I got _really_ good at writing bash scripts. :rofl:

Bash scripts are really handy, but there are limits. There is no clean state with them, there's only whatever you're working with right then. You try your best to make them idempotent, but there's no reasonable way to test that they meet that expectation. It can only be reliably tested from a clean state once. On the other hand, Nix builds in a clean room every time.

[nix-darwin]: https://daiderd.com/nix-darwin/

## Don't pollute the global state

Nix is a clean state, it's purpose-built for isolation between each program, allowing me to better follow the adage "don't mutate global state" and sandbox each tool I needed. Then I could selectively upgrade and, if the upgrade broke something, roll back to previous state easily.

It has happened more times than I can count, I help my coworkers through a borked python setup when the underlying python version gets upgraded in-place. Thanks `brew upgrade`... :expressionless:

Instead of digging through all of the virtualenvs out there, and rummaging through whether pyenv was setup right for that shell, or any number of other issues, why not decouple it?

Nix offers the best of both [dynamic and static linking][static-vs-dynamic-link] when building an application. It allows for multiple versions of python 3 at the same time. Or Java. Or Haskell. Or Go. Or glibc. Upgrade one library and it doesn't need to update them all. Similarly if 5 applications all use the same library, there's no reason to duplicate it 5 times on the disk.

[static-vs-dynamic-link]: https://kb.iu.edu/d/akqn

## Keep project-specific tools with the project

I tend to use [direnv][direnv] in my workflow for exactly this purpose: I can keep project-specific settings (e.g., tool selection) specific to that base directory. Unfortunately this is typically limited to _versions_ of known programs (e.g., python 3.7.3 instead of python 3.9.1) and workstation-specific environment variables (e.g., path to secret files).

Introducing Nix, this changes my workflow. By using `nixify` (roughly inspired by [this bash function][nixify-script]) I am able to install and use postgres, limiting it only to being used in this one project directory. Maybe I'll (re)use postgres in another project. Do I need it installed globally? Absolutely not. This is a development machine, not an application server.

[direnv]: https://direnv.net/
[nixify-script]: https://github.com/ejpcmac/config/blob/bc9ee4e7363e4e0ca97f4addbdd9370b83048d3c/zsh/direnv.zsh#L33-L138

## Current state of integration

I've been working with [Home Manager][home-manager] for managing my dotfiles and (user-scoped) system configuration. So far it has been difficult translating certain parts of [RCM][rcm]'s framework, such as its overlay approach (having both `~/.dotfiles` and `~/.dotfiles-local` repos cloned with the latter containing higher priority config files).

Instead of symlinking files into place, thereby ensuring any changes to them in-place are reflected back in the git repo, they're made immutable and the _only_ way to change them is from the git repo.

I've begun ripping out the version managers like pyenv, asdf, chruby, and others to completely replace it with project-specific Nix expressions.

[home-manager]: https://github.com/nix-community/home-manager
[rcm]: https://github.com/thoughtbot/rcm
