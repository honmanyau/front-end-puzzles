# Puzzle 1—Blocked Blog

Nadeshiko is an aspiring front-end developer who loves tinkering with everything front-end. One day, while she is casually browsing the Internet for interesting front-end things, she comes across a very simple blog, with no images, that somehow takes forever and a half to load. The curious Nadeshiko is able to reproduce the inexplicably long loading time with various browsers, but she has not learnt enough to identify the problem. Can you help Nadeshiko figure out the cause of the problem and implement a solution?

## Instructions

1. Start the front-end puzzle server and check that it is listening on port 3001:

    ```sh
      npm run fpeserver
    ```
2. Open `index.html` and note/measure the Time to First Render (TTFR)

## Requirements

* Identify and describe the problem
* Reduce the TTFR to less than 3.5 seconds

## Constraints

* Do not inspect or modify the content of any JavaScript files in this puzzle
* Make sure that resources are not cached
