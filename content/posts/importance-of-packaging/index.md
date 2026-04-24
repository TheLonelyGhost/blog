---
aliases: [/post/importance-of-packaging.html]
title: On the Importance of Packaging
date: 2017-06-06T10:18:53-04:00
---

You have an idea and want to turn it into a bit of code to carry it out. What do you do? You open up your IDE/Editor, perhaps you structure it inside of a folder with some default tooling for linting and (if necessary) compiling, and you get the code to work. It's hacky, it's ugly, but it works.

Now that you have something, you want to add one more feature to it or work out a bug. What do you do? You follow the same process. If you're feeling zesty, maybe you init a new git repository at the base of the project, but there's no real point to branching and merging back into master. Backing up the code? Might be an account on Bitbucket, or maybe something with GitLab. They both have free usage tiers with private repositories, and this definitely isn't good enough for the public to see.

This continues with more features hacked on, with no tests and zero documentation (except a comment here and there), all kept 100% private. Maybe you try to make it work on a Digital Ocean server you have stood up as a floating workspace with a persistent internet connection. It was difficult, but it works now. Kinda. Well, some of the time, anyway.

Your code portfolio is still missing a lot. Not a whole lot is visible because not a whole lot is in good enough condition to show anybody. You have a lot of these tiny projects that are riddled with what you know are bad practices, but were so much easier that figuring out the right way to do it. You treat your open source code contributions almost like a stage performance where you have everything perfectly thought out. First you have to write documentation, which means you have to clearly define that snowflake server you have setup to run your script. It also means you have to write usage documentation. Automated tests too, with varying importance depending on the community surrounding the language in which your project is implemented.

This has been my process for years with any number of once-off scripts. Projects that were intended for a recurring, minisculely scoped purpose I would have privately and, when I didn't have need for them anymore or they broke due to changes elsewhere (e.g., web scrapers breaking because website updates), I would just delete the project and call it done. Of course I would only be able to verbally mention "Yeah, I built something like that in my free time" during job interviews, but wouldn't be able to prove it because it was longer than a week ago and I didn't save the work.

What I've found, recently, is that there is a way to ease these growing pains.

# Packaging

Every (legitimate) language these days has a package management strategy. Not familiar with the concept of package management? Let's talk about that for a sec.

You have a new project, let's say it's written in Python for now. The standard package format is well defined for installing using `pip`. It includes dependencies, name of the package, author name and contact info, version constraints for dependencies... a lot of information that is--and should be--standardized. In python, that's consistently defined in `setup.py` at the base of the repository.

Consider the following repository structure:

```
├── LICENSE.md
├── README.md
├── setup.py
└── my_project
    ├── __init__.py
    ├── core
    │   ├── admin_commands.py
    │   ├── inbox.py
    │   ├── initialize.py
    │   ├── mentions.py
    │   ├── posts.py
    │   ├── user_interaction.py
    │   └── validation.py
    ├── helpers
    │   ├── misc.py
    │   └── wiki.py
    ├── main.py
    └── strings
        ├── debug.py
        ├── posts.py
        ├── responses.py
        └── urls.py
```

We have a project named `my_project`, which is should be the name of the package in `setup.py`. Python has the Java-esque convention of `import package.name.here` to map to `package/name/here.py` filesystem structure.

# Readme

Packages always have a README. If you use a package generator (like `bundle gem`) and it generates a README, _always_ remove the default generated description (and other TODO-lines) and insert your own. Not sure what your project is about? Note what it currently covers. You can update it later. That's the point of version control.

In the README, include installation instructions that are realistic to your situation. Are there native OS dependencies that you need installed too? Those might not fit well in the `setup.py` or `*.gemspec` files. In that case, put it in the README.

A lot of times the boilerplate includes a lot of noise that might not be necessary for publicly publishing a package. Here are the bare minimum requirements for any package I make, public or private. I'm a forgetful person so coming back to a project 2 months later will require some getting up-to-speed again anyway. I like to make it easier for myself with this list of requirements for a README:

- Usage
- Installation procedure (assume a freshly installed OS)
- Description
- (if applicable) Assumptions of native platform dependencies

# Dependencies

Packages provide a very clear definition of what it takes to run a piece of software that was written. I've been hearing for years that successful projects include a very narrowly defined scope and that the best way to do that is through narrowly defined interfaces.

In programming, you might see a junior dev hack away at a magic method that takes inputs in any variety of forms and is able to normalize it. Unless that is the primary function of the method/command/atomic unit they're creating, more experienced developers realize this very easily snowballs into a maintenance nightmare. The same might be said for dependency tracking. Having a clearly defined set of required dependencies (instead of the end user doing trial and error to install everything) will always be better.

# Overkill

Python, for example, involves some bootstrapping to setup a package. For me, it has involved looking up prior projects' `setup.py` file, modifying it to fit the new project, and creating some default structures like `my_project/__init__.py` containing variables for version (`__version__`) and author (`__author__`). It also involves setting up automated testing with unittest and shell scripts to make automated testing easy to execute.

Here's my heuristic when it comes to creating a package:

- Are there _any_ dependencies that require a package manager (e.g., `pip`, `npm`, `gem`)?
- Does the source code need to be split up into multiple files?
- Am I testing my work with any more granularity than full, end-to-end tests?
- Do I need to deploy this easily as, e.g., a command line tool?
- Do I need to version the releases and have stable, beta, and dev copies of the source code?
- Am I tracking code changes with git?

If I've answered yes to any _one_ of these questions, I know to create turn the project into a package.

This means I...

- create a new git repository (and private remote, for backup purposes)
- create a README (in markdown, preferably)
- track dependencies I install or remove, as I install or remove them
- formulate a testing strategy to make sure everything works as expected (either automated or manual)
- create a set of convenience scripts for running repeatable tasks scoped only to the current project (e.g., Makefile, Rakefile, bundler binstubs, shell script)
