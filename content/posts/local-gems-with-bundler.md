---
aliases:
  - /note/local-gems-with-bundler.html
title: Local gems with Bundler
date: 2016-12-28T17:27:06
tags: ['note-to-self', 'ruby']
---

Testing an unreleased version of a gem? Want to develop 2 unreleased projects
that are based on each other and not have to worry about the following?

```ruby
gem 'some_gem', path: '../my-dev-snapshot'
```

Leaving the `Gemfile` as such will screw with your project history, so we want
the version of `Gemfile` as it will be when the gem is released, keeping that
version in our "git memory". See the following:

```shell
bundle config local.some_gem "$(realpath ../my-dev-snapshot)"
```

This will allow your `Gemfile` to remain pristine without the `path: '../foo'`
hacks so others can set their own path to the gem source directory.

## Caveats:

The gem, in this case `some_gem`, must be pointed at a git repository. In this
case, it would need to be:

```ruby
gem 'some_gem', github: 'foo/bar', branch: 'master'
```

This would allow us not only to optimize network traffic so we don't make calls
out to the git repository all the time, but also point it toward a local working
copy.

There is an additional caveat, though. The given branch -- in the example,
`master` -- must match the branch of the current working copy at the path
specified with `bundle config` from earlier.
