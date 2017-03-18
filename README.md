# Feedback Widget

Built using HTML5 Boilerplate, gulp and Sass.

## Requirements

| Prerequisite    | How to check | How to install
| --------------- | ------------ | ------------- |
| Node.js 0.12.x  | `node -v`    | [nodejs.org](http://nodejs.org/) |
| gulp >= 3.8.10  | `gulp -v`    | `npm install -g gulp` |

For more installation notes, refer to the [Install gulp](#install-gulp) section in this document.

## Features

* [gulp](http://gulpjs.com/) build script that compiles both Sass, checks for JavaScript errors, optimizes images, and concatenates and minifies files
* [BrowserSync](http://www.browsersync.io/) for keeping multiple browsers and devices synchronized while testing, along with injecting updated CSS and JS into your browser while you're developing

### Install gulp

Building the assets requires [node.js](http://nodejs.org/download/). It's recommended that you update to the latest version of npm: `npm install -g npm@latest`.

From the command line:

1. Install [gulp](http://gulpjs.com) globally with `npm install -g gulp`
2. Navigate to your directory, then run `npm install`

You now have all the necessary dependencies to run the build process.

### Available gulp commands

* `gulp` — Compile and optimize the files in your assets directory
* `gulp watch` — Compile assets when file changes are made
* `gulp --production` — Compile assets for production (no source maps).

### Using BrowserSync

To use BrowserSync during `gulp watch` you need to update `devUrl` in `gulpfile.js` to reflect your local development hostname.

For example, if your local development URL is `http://feedback-widget.dev` you would update the file to read:
```json
...
  "config": {
    "devUrl": "http://feedback-widget.dev"
  }
...
```
If your local development URL looks like `http://localhost:8888/feedback-widget/` you would update the file to read:
```json
...
  "config": {
    "devUrl": "http://localhost:8888/feedback-widget/"
  }
...
```
