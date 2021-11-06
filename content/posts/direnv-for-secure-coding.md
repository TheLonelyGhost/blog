---
aliases: [/snip/direnv-for-secure-coding.html]
title: 'Direnv: for secure coding and kind documentation'
created: 2017-06-01T14:43:22-04:00
modified: 2021-11-05T20:47:43-04:00
---

## What environment variables are

### Introduction to `/usr/bin/env`

`/usr/bin/env` (or just `env`) echoes out all of the currently set environment variables.

Shebangs at the top of files in Unix-based OS's determine how to execute instead of by file extension.

Might see `#!/usr/bin/env python` or `#!/usr/bin/env ruby` as a nicer way of not hardcoding the path to `ruby` or `python` binary.

Why not `#!ruby` or `#!python`? Environment variables such as `GEM_HOME`.

Let's take a look into what is set in your terminal environment: (_Incoming!_)

```
# echoes out all current environment variables
/usr/bin/env
```

## Accessing from the language

Ruby:

```ruby
puts ENV['HOME']
# => '/home/myuser'
```

Python:

```python
print(os.environ.get('Home'))
# => '/home/myuser'
```

PowerShell:

```
Write-Host $env:HOME
# => 'C:\Users\MyUser'
```

## Following good practices

3 basic ways, depending on how framework-y you want to get:

1. Just-in-time environment variables
1. Shell script setting environment variables
1. `dotenv` / `direnv` frameworks

### Just-in-time

Setup: _N/a_

Invoke:

```
./some_command.sh

# vs

SOME_VAR="derp" ./some_command.sh
```

### Shell script

Setup:

```
# FILE: environment.sh

export SOME_VAR="derp"
```

Invoke:

```
source ./environment.sh
./some_command.sh
```

### Frameworks

Depending on the framework, it auto-loads (a la `source`) the file when entering the directory. It is hidden by default, hence filename starting with `.`, so it stays out of your way most times. The file evaluated depends on the framework (`.env` for `dotenv`, `.envrc` for `direnv`), and evaluates all other files by that name up the directory tree. Might have seen this approach already with other tools (rspec, git, etc.)

Setup:

```
# FILE: .env

export SOME_VAR="derp"
```

Invoke:

```
cd <project-directory>

# if dotenv and no language specific dotenv implementation is loaded program, uncomment the following line:
#dotenv

./some_command.sh
```

## Documentation

Document it.

No. Seriously.

### When

Always. As soon as it is introduced, even in a branch.

Make the code fail spectacularly (throw unhandled exception with explanation in message) if the environment varaible is not set.

### Where

Possible locations:

- `.env.example`
- `.envrc.example`
- within `README.md`
- within other file that is _versioned with the project_

### How (Development Practices)

Documenting environment variables can be done in a `README.md` (best), but the quickest notes for later reference can be as comments in a `.env.example` file itself.

## JIT environment variable setting

Document example usage in `README.md`, or other docs

**Benefits**

- Consistent -- Same approach as with `/etc/init.d/*` scripts
- Dependencies -- No additional tooling
- Power -- Access to everything the shell has to offer
- Transitive -- Switching projects? Variables do not persist to shell session

**Tradeoffs**

- Forgetting -- Must remember to include variables on _every_ invocation
- Human Error -- Grabbing what variables are needed requires parsing the docs intended for humans (which is less fault-tolerant)
- Complicated -- Must be a one-liner, or else it falls under the "sourced files" option by definition

## Source files manually

Center on the `.env` convention and include a file (committed to the repository) named `.env.example`, containing sample values _for all variables_.

This allows people to optionally use a framework like `dotenv`. Do not allow yourself to commit `.env` to the repo, so add it to global gitignore for your workstation.

**Benefits**

- Simplicity -- Includes example, machine-parseable values with the project source code
- Dependencies -- No additional tooling
- Power -- Access to everything the shell has to offer

**Tradeoffs**

- Forgetting -- Must remember to `source ./.env` in every terminal running the application
  - _Designed well:_ Blows up spectacularly at earliest possible phase
  - _Designed poorly:_ Partially executes, then bombs out
- Dirty Environment -- Must open new or restart terminal when switching projects

## Frameworks

I use `direnv` because I like the set-and-forget approach. For this section, I'm going to focus on `direnv` implementation.

1. Create a `.envrc` file
1. Globally gitignore `.envrc`
1. Create a `.envrc.example` file
1. Store sanitized, dummy examples in `.envrc.example`

Yes, I store credentials on local machine in plaintext. Shame me. If you can think of a way around this, I'm very open to improvement.

### Direnv

Found at https://direnv.net/

**Benefits**

- Secure -- Required to manually whitelist versions of `.envrc` every time it changes (`direnv allow`)
- Automatic -- Sets variables when `cd` into directory
- Self-Contained -- No hooks to additional libraries inside of program (like with `dotenv`)
- Inheiritance -- PWD containing `.envrc` overwrites ones in parent dirs, on up the chain

**Tradeoffs**

- Execution -- Execute from outside of project directory (`./project-dir/some_script.sh` will not automatically set environment variables in `./project-dir/.envrc`)
- Lag -- Additional program running on every `cd` in the shell
- Shell -- Limits to one of several popular shells
- Variables -- Only handles shell variables (e.g., `export SOME_VAR='foo'`, not `some_var() { echo 'foo' }`)
