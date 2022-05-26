---
title: "Facets of a Good README"
date: 2022-01-25T22:11:01-04:00
---

I see a good project README answering the following 3 questions:

1. What does this do?
2. How do I install/use it?
3. What do I need to do/know to make changes?

I tend to answer this with a few key sections of a README with some self-evident headings. Doing so, in my case, generally looks something like this:

<pre arial-label="Markdown file contents">

# My Project

This is my project. It does cool things and talks to neat people.

## Requirements

- Python (>= 3.7.1)
- [Poetry](https://python-poetry.org/)
- Sanity

## Usage

```
user@localhost $ my-project --do-things fun --often
This is the output. Take actual output and put
it in here, then replace personal details like
usernames and IP addresses with generic placeholders
```

## Build

Run the following:

```
user@localhost $ poetry install
user@localhost $ poetry build
```

### Testing

```
user@localhost $ poetry run pytest
```

</pre>

Some key concepts to keep it brief:

- Prefer linking to other docs whenever possible. If you don't understand a thing that is a hyperlink, you're going to click through to find out more info about it. Make your life easy and rely on prior art
- Enumerate organization- or project-specific caveats or changes to what is posted in linked content in the README
- Show, don't describe. Give example and, where possible, include example output.
- Plaintext is better, where possible. For terminal output, paste the output itself instead of embedding a screenshot
 