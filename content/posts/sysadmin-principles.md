---
date: 2021-04-12T12:35:00-04:00
title: 7 principles of a good sysadmin
---

This seems to be a common topic of conversation, so I figure I should put it on paper (so to speak) what I value as a systems administrator, or "sysadmin."

1. Keep it simple
2. Ensure it can be reproduced
3. Keep it close to stock
4. Magic is bad
5. No development tools on the server
6. Prefer complexity at compile time over runtime
7. Consume artifacts

What does this mean?

## The fewer moving parts, the easier to diagnose

By keeping things simple, reproduceable, and close to their defaults, this sets a sysadmin up for success _when_ things go wrong. More so, by keeping things close to the default settings you maximize the chance that your setup overlaps someone else's. Bonus to finding info on Stack Overflow or [that one forum post](https://xkcd.com/979/)!

{{% tip title="TIP: Script it out" href="tip-script-it" %}}

By scripting out everything you do, no matter how small, this ensures you can walk away mid-thought and pick up where you left off later.

- Keep scripts in some central location to share with your team of sysadmins
- Version control systems (VCS) are best for iterating on these scripts
- Make the VCS repo private, lest credentials are mistakenly hardcoded

Make your shell script _executable documentation_. Write it by defining your own shell functions describing each step you're taking.

{{% /tip %}}

## Know your tools

If you don't understand how a thing works, fix that. Learn about it. Pull back that abstraction layer and look under the hood.

Why is magic bad? When you're troubleshooting some error, how can you logically rule out the tool as a contributing factor?

This principle does not preclude you from using said magical tool, but it does mandate you dispel that magic by working to understand how it is implemented.

## Compile time vs. runtime

In a sysadmin context, compile time can mean "the stuff done to configure and setup a service, system, or application before it is immediately needed."

In contrast, runtime means "stuff being done as the application is being put into its 'running' state."

{{% example title="Docker" %}}

Some container images contain a shell script as an entrypoint (e.g., `entrypoint.sh`). These shift some compile time tasks to execute at runtime, then defer to running the underlying application.

Reasons for this design might be:

- More in-depth configuration changes required to pivot between environments
- Rapid action may be required to change credentials, so they're only passed at runtime

Actions taken in a `Dockerfile` when `docker build` is run are considered "compile time."

Actions taken when running `docker exec`/`docker run` are considered "runtime."

{{% /example %}}

Complexity costs at compile time need only be paid down once: when things are being setup.

If at runtime, cost of complexity is paid down every time the application is started.

Keep it simple. Pay down the cost as soon as possible.

## Artifacts are like gold

Whether the application uses an interpreted language (e.g., python) or is statically compiled (e.g., golang), an artifact can be built to make rolling forward and reverting simple.

In the case of python, a wheel (`my_pkg-0.1.0-py3-any.whl`) is a well-formed package holding the python source code. In a [venv], install it with `pip install ./my_pkg-0.1.1-py3-any.whl` to upgrade and `pip install ./my_pkg-0.1.0-py3-any.whl` to roll back.

With golang it's even easier. Just drop the new binary in place and, if it doesn't work, drop the old binary in that spot instead.

Some VCS providers, like GitHub.com, allow uploading binaries and other assets related to a release to a location that can be accessed later, perhaps even by shell scripts.

[venv]: https://docs.python.org/3/tutorial/venv.html
