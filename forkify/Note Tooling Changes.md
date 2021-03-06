Note: Tooling Changes

**[PLEASE READ BEFORE YOU MOVE ON!]**

Modern tools like Webpack and Babel change all the time, which is great for the development community, but difficult for course creators.

**1. If you just want it to work, follow this (RECOMMENDED) 👇**

Tools don't add *that* much functionality in new versions, so you're just fine using this method.

You will have to install the same package versions that I install in my videos. So instead of the npm install commands I use in the videos, use the following (we use `@` to specify the version number)

- **For webpack:**

```
npm install --save-dev webpack@4 webpack-cli@2 webpack-dev-server@3
```

- **For babel:**

```
npm install --save-dev babel-core@6 babel-preset-env@1 babel-loader@7npm install --save babel-polyfill@6
```

**2. If you want the latest versions, follow this 👇**

This method requires a little more work, as babel has recently changed how the configuration works.

- For webpack, just follow the videos.

- For babel, **instead** of installing `babel-core`, `babel-preset-env`and `babel-polyfill` in the babel lecture, please install `@babel/core`, `@babel/preset-env` and `@babel/polyfill` like this:

```
npm install --save-dev @babel/core @babel/preset-env babel-loadernpm install --save @babel/polyfill
```

You will also need to change the `entry` in `webpack.config.js` (a file we create during the video) from this:

```
entry: ['babel-polyfill', './src/js/index.js'],
```

to this:

```
entry: ['@babel/polyfill', './src/js/index.js'],
```

and the the code in `.babelrc` (also created during the video) from this:

```
{    "presets": [        ["env", {            "targets": {                "browsers": [                    "last 5 versions",                    "ie >= 8"                ]            }        }]    ]}
```

to this:

```
{    "presets": [        ["@babel/env", {            "targets": {                "browsers": [                    "last 5 versions",                    "ie >= 8"                ]            }        }]    ]}
```

 