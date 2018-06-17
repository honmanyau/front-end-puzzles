# Contributing

This is much of a personal project at the moment and depends entirely on the direction of my learning and interests; for this reason, I am currently inclined to not accept puzzle submissions and most of the information included is for documentation purposes.

Having said that, contributions in terms of correcting typos, grammar, inconsistencies and/or ambiguous/misleading/incorrect content will be very much appreciated. In these cases, please open an Issue to discuss the problem identified before submitting a pull request. I will not participate in discussions that are not based on evidence and facts, and Issues of that type will simply be politely ignored.

Puzzle suggestion is also welcomed and due attributions will be made if accepted; however, and as mentioned above, it depends on whether or not it is something I am interested in and have the time to implement a puzzle. Please note that by suggesting an idea you are also giving me the rights to use and implement that idea it however I want on a non-exclusive basis and license the resultant content under the same license for all other puzzles in this repository. Bottom line, please do not suggest an idea to me if you are not a reasonable person.

## Tabel of Contents

* [Creating Puzzles](#creating-puzzles)
  * [Directory Naming Convention](#directory-naming-convention)
  * [Templates](#templates)
  * [Simulating Network Requests](#simulating-network-requests)

## Creating Puzzles

### Directory Naming Convention

Each puzzle is stored in the `src/puzzle` directory as a subdirectory that contains all the required files. The subdirectory of a puzzle should be named as follows:

1. Convert the name of the puzzle to lower case and replace space with hyphens (slug)
2. Prefix the the string from Step 1 with a three-digit number, which represents the chronological order that the puzzle is created, and a hyphen

For example, the name of Puzzle 1 is Blocked Blog, and the corresponding directory name is `001-blocked-blog`.

### Templates

Templates for creating puzzles can be found in the `src/templates` directory. A Node.js script in the `scripts` directory, `copy-template.js` can be used to automate the initial copying of files in `src/templates`. For example:

```sh
node ./scripts/copy-templates.js "Amazing Puzzle"
```

It can also be run with the following silly shortcut:

```sh
npm run nyanpasu "Amazing Puzzle"
```

Suppose there are already 10 puzzles before the script above is run, the directory created for the new puzzle will have a name of `011-amazing-puzzle`.

### Simulating Network Requests

Simulated network requests are handled by a local Node.js server as defined in `./src/server/server.js`. In order to keep files organised and all contained in a puzzle's directory, the server is designed to serve files from the `server` directory for a given puzzle. For example, consider the following `<script>` element in Puzzle 1:

```html
<script src="http://localhost:3001/puzzle/001-blocked-blog/analytics.js"></script>
```

That steps involved to make the Node.js server serve this particular file are:

1. Create `analytics.ts` in the `001-blocked-blog/server` directory
2. Transpile `analytics.ts` to give `analytics.js`
3. That's it!

The general URL format for accessing a file is:

```
http://localhost:3001/puzzle/:id/:filename
```

Where `id` and `filename` correspond to the directory name and filename, respectively, of a given puzzle.

When a file is requested, the server first check `fepconfig.json` in the puzzle's `server` directory to see if a delay is specified for a given file. For example, in Puzzle 1 a delay of 4000 ms and 2000 ms are specified for `analytics.js` and `spiffyicons.js`, respectively, as follows:


```json
{
  "analytics.js": {
    "delay": 4000
  },
  "spiffyicons.js": {
    "delay": 2000
  }
}
```

If a delayed is not set, then the default of `0` is used.
