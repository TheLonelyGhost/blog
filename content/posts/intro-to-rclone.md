---
aliases: [/post/intro-to-rclone.html]
title: Intro to rclone
date: 2017-04-19T14:23:19-04:00
---

The other day, as I was looking for a way to keep Vivaldi in sync across my devices, I stumbled onto a paid product which syncs a local directory with a remote one on one of a few cloud providers. My main ones I like to use are Dropbox, Google Drive, and MediaFire, but I would like to be able to use S3 and other more robust options for when I start scaling up in my storage needs. The problem was that this paid product had a high price tag, showed up in forum spam (and I don't want to encourage that method of marketing), and it only worked with a handful of providers. It did not support Google Drive, for instance.

"Boy, I wish they made something like rsync for these cloud providers...", I remarked.

The cloud storage providers I routinely use all have publicly available APIs, are all targeting the same problem space, and have very similar approaches to solving the problem at hand (albeit with differing free usage tiers). "That shouldn't be too difficult. A weekend hackfest to build a tool like rsync for them!"

I'm going to pause there and just mention that a "weekend hackfest" rarely produces the expected result, as many others have blogged to the same effect.

My first step before starting any project is to get a lay of the land. I googled for "rsync [cloud provider]" (e.g., dropbox) to see if there were any pre-existing solutions I had missed in the first round. If there were none, I could see what came close, figure out what worked for them, and possibly use it as a basis for a new open source tool. Luckily my search stopped there.

## Use case

Before we get too far into this, let's establish what I wanted to build (assuming I didn't find a pre-existing solution).

I love Dropbox, but I don't trust their agent if I can't audit their source code. I also don't like that it has sufficient permissions to read all files on my filesystem by default. Seems like a major security hole! I would like to copy individual files or recurse through a directory of files to transfer (a la `scp`).

I also love Google Drive because it'll follow me wherever my ever-persistent Google account follows me.

## Enter `rclone`

Rclone is an odd tool. Much the same as the first time I used `scp` and overthinking how to make good use of it, I was afraid of how to get started. Really it's very easy.

Step 1, install rclone per the documentation for your platform. I've got added an option in my dotfiles hooks to install it from homebrew (if I'm on my Mac) and Ubuntu (if I'm on my Chromebook). Mac allows for the super straightforward `brew install rclone`. Ubuntu is slightly less convenient, but very easily scriptable, so I'll refer you to [the installation docs][rclone-install] rather than dig any deeper here.

Step 2, run `rclone config` and follow the prompts. I set it up with my Dropbox (as `dropbox`) and my Google Drive (as `drive`) accounts.

Step 3, ???

Step 4, profit!

[rclone-install]: https://rclone.org/install/#linux-installation-from-precompiled-binary

## Examples

### Restoring GPG keys

I have my GPG signing keys (password protected, of course) backed up on Dropbox, for this example. I need to grab those locally and import them.

```shell
$ rclone copy dropbox:gpg_keys/opensource.secret.key ./personal.key
$ rclone copy dropbox:gpg_keys/opensource.public.key ./personal.pub
$ gpg2 --import --allow-secret-key-import ./personal.key
$ gpg2 --import ./personal.pub
$ rm ./personal.key ./personal.pub
```

If I wanted to be more security-conscious and do this in fewer steps, it looks like `gpg` allows streaming in the imports via STDIN. Let's try that route!

```shell
$ rclone cat dropbox:gpg_keys/opensource.secret.key | gpg2 --import --allow-secret-key-import
$ rclone cat dropbox:gpg_keys/opensource.public.key | gpg2 --import
```

### Syncing personal documents

Google Drive was originally intended for office-style documents, right? How about we sync it with our Documents directory?

```shell
$ rclone sync drive:local-documents/ ~/Documents/google-drive
```

In this case, any time there's a file or directory that exists solely on Google Drive in the `local-documents` directory, it syncs it to a subdirectory of our Documents directory called `google-drive`. If there's a file or directory that exists solely on the local filesystem, it'll do the opposite. When a file exists in both places and it differs, the local copy will overwrite the remote copy.

The bonus for using sync here is you can hook it up to cron for scheduled syncing with one or more of your cloud providers. No more separate Dropbox, Google Drive, and OneDrive agents! I can finally get rid of my Google Drive client on Linu--oh wait... :(

### Finding files

What if I don't recall what the directory structure is like on my cloud hosting provider? One of the nuances with `rclone ls` is that it's like the unix equivalent of `ls -R`, recursing through each subdirectory to list all files. Only care about going 1 level deep? There's `rclone lsd` for that.

Here's an example of how I essentially use `find` (by name) with a remote provider.

```shell
$ rclone ls drive: | grep 'some_file' | sed -e 's/^ *[0-9]* *//g'

MyFiles__local/some_file.notes.txt
derp.some_file/fizz_buzz.doc
```

Before you puke over resorting to `sed`, I only use it to trim some leading whitespace and numbers (indicating file size). You can leave that in if you prefer, but I like things that can be easily scripted out. This allows for straight-up copy and paste for later iteration in a shell script using a bash for-each loop.

## Suggested improvements

Rclone is far from a perfect tool. As a reasonably well-versed Linux CLI junkie, I am very used to traversing the filesystem, copying/moving/renaming files locally, and transferring them across the network via SSH, CIFS (Samba, a.k.a., Windows share), and SFTP. I would love it if it were just intuitive to use the unix-y commands `ls`, `rm`, `cp`, `mv`, and so on as a subcommand of rclone. I would also accept it being a mostly drop-in replacement for rsync.

That said, I understand that rclone is cross-platform and intended to have a unified interface for Windows and unix-y systems. Is there any reason we can't make use of command aliases here? Why not have `rclone copy` be the exact same interface as `rclone cp`? And for the Windows users, aliasing `rclone dir` to `rclone ls`?
