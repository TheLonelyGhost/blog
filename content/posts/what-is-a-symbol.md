---
aliases: [/post/what-is-a-symbol.html]
title: What is a Symbol?
date: 2017-10-09T23:02:00-04:00
tags: [computer-science]
---

As I was browsing twitter this evening, I came across [a tweet by @searls asking newer rubyists (&lt;5 years) what some still confusing concepts are in Ruby](https://twitter.com/searls/status/917392217140072449). The most common concept that remained confusing was symbols, so here’s my explanation of it.

In order to explain symbols, I must first explain datatypes.

## Datatypes

Do you know the difference between datatypes?

### Primitives

There’s a `string` (e.g., `"Lorem ipsum dolor"`), which is a set of characters (`char`s). There are various numbers ranging from an integer (e.g., `1` but not `1.4`), a double (a really large integer), a float (e.g., `1.4` or `1.0`), and any of those can be signed (including negative numbers) or unsigned (absolute values, positive numbers only). There are super simple concepts like booleans, which can be exactly “yes” or “no”.

Why are there all these variations? Isn’t it all just text? Think about this:

### Binary

A computer thinks in binary, ones and zeros. Binary can represent any number, such as `000000` represents zero and `000001` represents one, as one might imagine. The tricky part is `000010` represents two. How’s that? Let’s continue.

- `000011` &rarr; three
- `000100` &rarr; four
- `000101` &rarr; five
- `000110` &rarr; six
- `000111` &rarr; seven
- `001000` &rarr; eight

Get the idea? If we continue with this pattern, we’ll see that we eventually hit `111111` (sixty-three), but that’s not the last number there exists, is it? We need another digit to hold a zero or one and it represents all the way up to one-hundred twenty-seven. Wow, that’s quite a jump, right? How does all of this have anything to do with data types?

### Datatypes in binary

A computer has to store a representation of data in memory. But wait, didn’t we just cover that a computer thinks in binary? Well that’s still true. We have to come up with a shorthand for storing things like `1.3` in binary.

Let’s tear this apart. This is a float datatype. We have to come up with some shorthand for noting what is before the decimal point and what is after. How about we say the first four digits are the number before the decimal point and the last four are the number after. We can extend this beyond eight digits later.

In this case the binary representation of `1.3` might be `00010011`. What’s the difference between this and the integer `19`? Both are represented by the same binary, right? We’ll need to come up with some universal shorthand to note the difference.

In an integer, we know the same value `010011` (19) might also be positive or negative. This is called a “signed” integer. Other numeric datatypes can be signed as well, but we’ll keep it simple with integers for now. We’ll keep our shorthand of splitting up the digits, but whether it’s positive or negative is just 2 choices. We can probably keep to the first digit where `1` means negative and `0` means positive. Therefore `19` means `0010011` and `-19` means `1010011`.

### Data headers

We have all these shorthand tricks we have to remember, but at the end of the day it’s just 1’s and 0’s. How will we differentiate between an unsigned `19` and `1.3` from before? Let’s come up with one, universal shorthand to determine which data type we will be storing for the next few digits. Three digits should cover it for now. We’ll remember some datatypes by this mapping for now:

- `001` &rarr; char
- `010` &rarr; unsigned integer
- `011` &rarr; signed integer
- `100` &rarr; float
- `110` &rarr; double
- `111` &rarr; boolean

To integrate this we’ll tack this onto the starting of each value and just remember to interpret the first 3 digits as the datatype indicators.

### Data maximums/minimums

In order to have all of these shorthands, we have to agree on the next _X_ number of digits which will signify the value of the datatype. A boolean, true and false, only needs one digit (plus the header) while an unsigned integer can only count between 0 and 127 with 3 digits, which might not be enough for fun things like counting the number of seats in a stadium.

We’ll come up with some arbitrary lengths of digits for these datatypes. Here are some examples:

- `0000000000` &rarr; char (10 digits)
- `0000000000000` &rarr; float (13 digits)
- `000000000` &rarr; unsigned integer (9 digits)
- `0000000000` &rarr; signed integer (10 digits)
- `0` &rarr; boolean (1 digit)

All together, a float will take up 13 digits for the value + 3 digits for the header indicating that it’s a float. 16 digits. If we take a multiple instances of data (datatype header + value in binary), we can string them together.

- `1000000000010011` &rarr; float datatype of value `1.3`
- `1110` &rarr; boolean datatype of value `false`

Let’s take these two example data instances and put them together like a computer might keep it in memory: `11101000000000010011`

What?

Okay, let's tear it apart again.

If we saw just this binary without any other context, we can remember our shorthand for the headers by reading left to right. The first 3 digits signify it’s a boolean, which we know has a value length of 1 digit. We read it as boolean `false` and we’ve parsed the first 4 digits in the example data.

Since we're done with the first 4, we'll start at digit 5, follow along the same pattern with interpreting the first 3 digits as the datatype (`100` = float), and parse the next _X_ digits (float value &rarr; 13 digits) as the value. The next 13 digits amount to `0000000010011`, which we’ll pretend like we already established a new shorthand where floats have the last 3 digits reserved for the decimal number. This makes it easier since we remember this was `1.3`.

Doing this again with another example value: `01100000111010010001011100`

Reading the first 3 digits (`011`) we see it’s a signed integer. This means we read the next 10 digits (`0000011101`) as the value. Knowing our shorthand for signed integers, we recall the first digit of the value (`0`) tells us whether it’s positive or negative, and the remaining digits (`000011101`) are the number itself. We can then tell it’s `+29`.

The next three digits after that’s done is `001`, which means a character. You know from before that a character datatype reserves the next 10 digits for its value, but we don’t know how to decode it. We haven’t established that shorthand. The important part here, though, is that we can differentiate between the different datatypes when they’re thrown together in one, long, unbreaking string of 1’s and 0’s.

## Characters versus Strings

In case you weren’t already aware, a character might represent any one key on your keyboard, including letters, numbers, punctuation (like `?` and `!`), or other bits of written language (like `{` or `)`). A character can make up individual letters you might not see on your keyboard, like “é” or “→”. The point is, a character can be a large number of possible values taking up the same physical space on your screen as a 1 or 0.

Going back to what was said before, computers think in binary. We could come up with a way to store every character, mapping to a numerical value. These are called character encodings. Like other datatypes this tells us how many digits each character will take up. A character might be ASCII and be only what you might see on a QWERTY keyboard, or it might be UTF-8 and include emoji and other richer styles of a character. For the sake of simplicity, we’ll stick with ASCII.

There are 26 letters in the english alphabet, plus 11 special symbol keys (upper- and lowercase for each, so 22 characters), plus the number key line of 10 keys (so +20 characters), plus the spacebar, which brings us to 69 possible characters. We need enough binary digits, or bits, to handle a maximum number of 69. By my calculations, that’s 7 bits. Not too far off from our 10 bits we reserved earlier for holding character data, right?

To make a string like `"Hello world!"`, we need to disect it. It’s the character `H`, then the character `e`, then the character `l`, and so on for the word “Hello”.

Wait a second, we have capital letters here too?! Shoot. Let’s amend our count of 69 characters to add in 26 more, 1 more for each letter of the alphabet in its capital form. That’s a total of 95 possible characters. Good thing our 7 bits are able to store a representation of any number between 0 and 127.

So we have “Hello” and “world!” separated by a space character, which amounts to 12 characters. Since each character takes up 10 bits (3 header + 7 value), we’re looking at 120 bits to render `"Hello world!"` as binary data. Here’s where I’m going to stop while you to ponder that for a minute.

## Symbol datatype

Let’s assume you have a mapping of characters to bit values and the maximum bits mapped out perfectly. You have that string that takes up 12 characters for 120 bits just to say hello to the world. What if there’s something you only want to reference internally for your own purposes? We don’t care about the actual value, we just care that the value happens to be unique from any other value. It has semantic meaning only. You know how we have those mappings of letters, base10 numbers, etc. to binary? Those are the same concept of a symbol. That’s part of the `char` shorthand. What if we took it a step further?

First, after all that binary-talk, I need to take my head out of the theoretical for a moment. I need to go back to the programming I know: Ruby, Python, etc.

Ruby and Python are dynamic languages where you rarely have to know how many bits in memory a variable, holding a particular datatype, will take up. The way I operate, I care about how easily I can keep the inner workings of a program in my head at any one time. I need cues that won’t matter to the computer, but do only to me as the programmer. Take a logging class (in most any language), for example.

We have the concept of a logger which takes an enum of various error levels: `ERROR`, `WARN`, `INFO`, `DEBUG`, and possibly more. Do we care about storing the string of characters to represent it? No. We just need some internal representation to reference. Let’s choose a datatype that has a really small memory footprint here.

Representing `"ERROR"` (as a string) would be 5 characters × 10 bits per character = 50 bits. Other logging levels might be greater or fewer characters in number, so we just need to have a datatype less than 50 bits, or binary digits long to stand in for the one other, more memory intensive value. Let’s choose the unsigned integer `4`, and the other logging levels as unsigned integers as well. We don’t care about the value `4`, only what it represents, so it could just as easily be `986` or a poop emoji. It is meant to differentiate `ERROR` from `WARN` and the others.

So the unsigned integer `4` is represented with `010000000100` in binary. That’s 12 bits long when the string version could be 50 bits. That’s quite the savings! Only 25% of the original memory footprint!

In a language like ruby, a small savings like that might not make too big of a difference, but say it could encode it in binary instead of unsigned integer, with all the wasted space up front reclaimed. We only need the first 3 bits for the header and the 3 bits following for the value of `4`. What if our compiler was smart enough to see we only needed a maximum value of `4`?

In that case, we could remember a new datatype that says the following _X_ digits represent a symbol, where _X_ is determined once the entire program is analyzed to figure out the max value one might ever see. In our case, it’s 4 so we downsize the number of bits used from 12 to 6. What once was `010000000100` is now `010100`.

But wait, we still have the datatype header for an unsigned integer! That’ll screw everything up! That’s very true. We can't keep breaking our own shorthand conventions with encoding/decode binary, so we’ll have to come up with a new, on-the-fly datatype which we’ll refer to as a symbol. It’ll go by the header `101`, since it hasn’t been used yet.

From the original 50 bits, to `010000000100` (12 bits), to `101100` (6 bits), that’s quite a bit of downsizing for the exact same functionality as far as both the programmer and the end user are concerned.

## Recap

Symbols are just what they sound like: an in-memory stand-in value for something else. Their function is to save on memory usage when you don’t need to allocate a ton of bits in order to have a label that only needs to represent that it's different from other labels. The values don't actually matter. They are a handy representation which shifts work onto the compiler initially, but nets less memory (and equal computation power) at runtime.

## Moving forward

These optimizations occur not only for storing data, but referencing binary chunk of data representing logic the computer is supposed to follow. Do you really think your computer remembers to look in that file for the string `my_main_function()` in order call the logic defined therein? Do you feel the computer cares how you name things? No! It reads the logic into binary and determines a symbol only it remembers in order for it to easily call the functionality. These are more compilation optimizations that happen automatically in the programming languages you use.

Languages like C and Ruby allow you direct access to symbols as a datatype, but languages like PHP and earlier versions of Java require you to declare your preferred datatype and value, leaving the memory optimization to the programmer when defining that a symbol exists.

Are symbols helpful? Sure. How often? That depends on what and how you’re coding the task at hand. Hopefully this will serve as an introduction for what circumstances would be best to use symbols versus other datatypes.
