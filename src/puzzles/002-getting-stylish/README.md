# Puzzle 2—Getting Stylish

With **plenty** of help, Nadeshiko was finally able to figure out what was causing the long FTTR to a [deceptively simple blog](https://github.com/honmanyau/front-end-puzzles/tree/master/src/puzzles/001-blocked-blog). Rather than being relieved for having arrived at a solution, the new insights that she gained from the exercise has now sparked a series of questions regarding the order that resources are downloaded and applied/executed.

Being the inquisitive tinkerer she is, Nadeshiko devised a plan to use her artistic cells (pun intended) to figure out when and how CSS's are downloaded: loading external stylesheets to overwrite the styles of a CSS-grid-based, black and white pixel art.

Given that one can override styles in CSS, Nadeshiko's hypothesis is that by controlling and varying the loading times of the external stylesheets and monitoring network requests in the browser, she should be able to tell how external stylesheets are downloaded and applied. She just needs a bit of help because she has absolutely no clue how one could control the order in which the stylesheets are loaded. (◕︿◕✿)

## Instructions

1. Start the front-end puzzle server and check that it is listening on port 3001:

    ```sh
      npm run fpeserver
    ```

2. Under the "Network" tab of developer tool of the browser of your choice, observe how files are requested
3. If desire, modify `fepconfig.json` in the `server` subdirectory of this puzzle to change the `delay`, in milliseconds, that the server responds with a given file

## Challenges

* Identify whether stylesheets are loaded synchronously or asynchronously
* Confirm the order in which stylesheets are applied to a webpage—are they always applied according to the order they appear in the document?

## Constraints

* Do not inspect or modify the content of anything in the `server` subdirectory
