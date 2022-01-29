# Styling Options
:zap: [Visit Site](https://rojorevolution.github.io/instance-style-options/) - Use the password: *SEdemo*

![alt text](/img/instance-styler.png)

A project that I inherited while working at Bevy. This is an internal website that is used by the sales and the customer success teams to quickly display the different type of style options available on the Bevy White-labeled sites and virtual experience.

The functionality for the original three pages in the top left (Home, Chapter, Event) were previously created, and I was tasked with adding additional pages for the Bevy Virtual Experience which can be navigated to through the top right. The largest challenge here was that the Bevy Virtual experience has universal style options, so switches needed to affect different pages at the same time.

A simple password field was added through JS, it's not proper authentication, but there is no sensitive data available on the site either.

Over all the functionality is a simple use of JS and CSS attribute selectors. When I inherited the project I also spent some time cleaning up some of the JS code, especially updated an previous large if statement into a switch case.