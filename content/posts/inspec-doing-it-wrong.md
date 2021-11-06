---
aliases: [/post/inspec-doing-it-wrong.html]
title: 'InSpec: You''re Doing It Wrong'
created: 2019-03-05T23:10:31-05:00
tags: [devops, inspec]
modified: 2021-11-05T20:52:46-04:00
---

I've been using [InSpec](https://community.chef.io/tools/chef-inspec) for over 2 years now and have been writing automated tests for longer than that. What's the one thing that I've seen trip up the most people? Useless tests.

InSpec as a project is based off of RSpec, a behavior driven testing framework. That isn't to say Gherkin like "Given _X_, When _Y_, I should see _Z_", but rather a more generic definition. RSpec promotes writing tests in a feature-oriented manner:

```ruby
describe MyClass do
  it 'can instantiate with no arguments' do
    expect { MyClass.new }.not_to raise_error
  end

  it 'has an attribute for its name' do
    obj = MyClass.new

    expect(obj.name).to eq 'MyClass'
  end
end
```

The net benefit with RSpec comes from the reporting format:

```
 ✅ MyClass can instantiate with no arguments
 ⛔ MyClass has an attribute for its name

       expected: 'MyClass'
       actual: 'Lol, just kidding'
```

Instead of testing each unit like `1 + 2 = 3`, we can have a very tightly scoped integration test that gives us enough info to figure out _that_ something is wrong. The frist battle is figuring out _that_ something is wrong, then you need to know _how_ it's wrong.

Back to the core of the matter, what do I mean by useless tests? As stated earlier, `1 + 2 = 3` sorts of tests are useless. We don't care about the unit as much as we care about the gestalt. It doesn't matter if the calculator widget works flawlessly if the entire page doesn't render!

What if, instead of `1 + 2 = 3`, we tested some small specific things:

- Does the login page present a button to login?
- When I send invalid credentials, does the backend refuse to authorize me to act as the given user?
- When I send correct credentials, does the backend allow me to act as the given user?
- Are there any links on any of the pages that result in a 404 or 500 HTTP status code?

Any of these tests would be relatively low effort to implement, but provide much better feedback as to the overall state of the web application. Just like these real life examples from my career as a web developer writing automated tests, the same principals apply to testing infrastructure: we should test the gestalt. Let's consider something basic.

I want to confirm that my web service is operating correctly on my EC2 instance in AWS. How might I be doing that currently?

```ruby
describe service('httpd') do
  it { should be_running }
end

describe service('mariadb') do
  it { should be_running }
end

describe port(80) do
  it { should be_listening }
end

describe port(443) do
  it { should be_listening }
end

describe port(3306) do
  it { should be_listening }
end

# My application's deployment artifacts exist in their proper locations
describe file('/var/www/public_html/index.php') do
  it { should exist }
end

# I have an Apache configuration entry for my service
describe file('/etc/httpd/sites-available/my-site.conf') do
  it { should exist }
end

# The prior Apache configuration is currently active
describe file('/etc/httpd/sites-enabled/my-site.conf') do
  it { should exist }
end

# I have the correct database credentials written to the necessary configuration files
describe file('/var/www/config.php') do
  it { should exist }
  its('content') { should match(/db_username="#{Regexp.escape('1337h4x0r')}"$/) }
  its('content') { should match(/db_password="#{Regexp.escape('hunter2')}"$/) }
end
```

This is the thought process one might go through. I'm not willing to go so far as to say these tests are useless, per se, but they certainly miss the forest for the trees if you still get an angry tweet from an end user including a picture of a severely broken page.

Because we're Agile, Lean, or whatever other trendy buzz-words that can be thrown at the problem, we're going to make small, incremental changes. To figure out what changes to make to fix a bug, I ask the following questions in the given order:

1. How is it broken?
2. What indicates it is broken?
3. How can I automate checking if it is broken?

The answers may surprise you. From that hypothetical tweet we just got, we might decide that a working definition for "broken" in this context means anything from "I see a blank white screen when the page loads" to "Firefox warns me that something related to the SSL certificate is weird", or even "I found the rainbow unicorn when I tried to load GitHub.com." How can we test these indicators, then?

```ruby
describe http('https://svc.example.com/my-page') do
  its('body') { should match(/You're visitor number \d+ today/) }
end

describe ssl(port: 443).protocols('ssl3') do
  it { should_not be_enabled }
end
```

Okay, pause. What functionality does that first test actually check?

- The httpd service is running (or else would have I/O failure establishing connection)
- The machine is serving HTTP requests over port 443 (or else would have I/O failure establishing connection)
- We have TLS certs installed to the proper spot (or else would have a TLS failure)
- There aren't any syntax or compile errors in the server-side code (or else would be HTTP status code 500)
- The httpd service is configured to serve requests according to the server-side code you deployed (instead of the default Hello World site or a completely different project)

Assuming the content you're checking on the page is derived from data gathered from the database (e.g., "You're the 394th visitor today!"), this might also check the following:

- Our connection to the database is allowed through the firewall
- Our database credentials are up to date
- The database schema is setup in the expected format (at least in part)

Is this an all-encompassing test? No, but it does test a helluva lot of moving parts and, if any one of them is broken, we'll know because the test will fail. That's one useful canary in this here coal mine!

Now, we find that the test is failing. What now? Here's where the initial set of tests might help. They check the known hiding spots for some of these types of errors. Maybe the source of the problem is in one of these spots, maybe not. At least we can go through by process of elimination. Even better if the tests were already written too!

The moral of this story is that the initial tests on the application server aren't wrong, but they don't have a broad enough scope to determine _if_ there's a problem. You want to be hyper sensitive to _if_ there's a problem, then hone in _when_ there's a problem using investigative tests, helping us diagnose the problem if the canary test is failing.

There are any number of known or unknown reasons why a problem may exist. The most effective way to be successful is to know as early as possible _that_ a problem exists so you can start looking for the source of it.

---

Let's examine one more concept, best embodied by InSpec's cloud provider resources.

Why would you need to test that a cloud provider's setting has a certain value? Are you testing that Terraform did its job? Are you testing that a bit of automation for building up and tearing down cloud resources is working? Great, but something tells me you're not telling the whole story.

Consider the following InSpec tests:

```ruby

ec2_sg = 'sg-asdlkjasdflkj321iu21340' # some security group id
rds_sg = 'sg-23oiwqoj23lqwedasdlkj2' # some other security group id

describe aws_ec2_instance(name: 'web-server') do
  it { should exist }
  its('security_group_ids') { should include ec2_sg }
end

describe aws_security_group(rds_sg) do
  it { should exist }
  it { should allow_in(to_port: 3306, security_group: ec2_sg, protocol: 'tcp') }
  it { should allow_in(to_port: 3306, security_group: ec2_sg, protocol: 'udp') }
end
```

In case you aren't fluent in AWS jargon, this means my virtual machine running my web service is whitelisted in the firewall to allow communication with my database over TCP or UDP on the database's port 3306.

Instead of testing that the firewall rule, what if we just tested that we're functionally able to connect from one host to the other?

```ruby
db_username = 'root'
db_password = 'hunter2'
db_host = 'mariadb.example.com'
db_port = 3306

sql = mysql_session(db_username, db_password, db_host, db_port)

describe sql.query('SELECT 1;') do
  it { should_not match(/Can't connect to .* MySQL server/i) }
  it { should_not match(/^error /i) }
end
```

What does this change really accomplish?

Let's say some poor engineer working for Amazon pushes some bad code. This bad code disregards your settings and changes the actual port for a few RDS instances to be listening from 9999 instead. What happens with our tests from earlier? All green! Why? Because we're testing the settings, not the functionality.

The same goes for if AWS has an unexpected outage. Why is my web service suddenly failing, despite all of my infrastructure being configured correctly? Oh because I'm only checking that I've told it the right thing, not that it's doing the right thing.

Not to rip on cloud providers, but the same concept is found in testing, say, an IOS router by Cisco. I might write a test that confirms its config commands output something in particular. Is checking the output helpful? Maybe, but we're not actually testing that packets get routed to their proper destination.

Let's focus on the end goal instead of being so myopic to how we arrive at that goal.
