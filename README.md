# sass-themer-loader

## About

Creates a list of scss @import statements prior to sass parsing.  Intended to be run prior to the sass-loader [link](https://github.com/webpack-contrib/sass-loader).

## Options & Defaults

### Folder Chain

The order of folders imported in each theme.  E.g. [theme]/[folder chain]/index.scss

Default Folder Chain:

```json
[
    "typeography",
    "variable",
    "mixin",
    "keyframe",
    "type",
    "site"
]
```

Folder chain option:

```javascript
    loader: 'sass-themer-loader',
    options: {
        modules: [
            'folder1',
            'folder2'
        ]
    }
```

### Verify

By default verify is false and will write @import statements for every folder in every theme path.

Setting verify to true will verify each folder chain exists with an index.scss file.  If it doesn't exist, it will skip writting the @import statement for that file.

```javascript
    loader: 'sass-themer-loader',
    options: {
        verify: true
    }
```


## Sample Of use

### webpack.config.js

Inside your webpack config (webpack.config.js). Add the loader and set your sass folder chain.  For example, let's setup three folders:

1. variables
We'll setup variables in all our "themes". Each theme can override the previous theme's variables.

2. mixins
Mixins will be processed second.  Since this comes after variables, we can use variables defined in any theme.

3. site
The site sass definitions can use all variables and mixins from all themes.

```javascript
export.default = {
    ...
    module: {
        ...
        {
            test: /scss\.thmr$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'style-loader',
                    options: {}
                },
                {
                    loader: 'css-loader',
                    options: {}
                },
                {
                    loader: 'postcss-loader',
                    options: {}
                },
                {
                    loader: 'sass-loader',
                    options: {}
                },
                {
                    loader: 'sass-themer-loader',
                    options: {
                        modules: [
                            'variables',
                            'mixins',
                            'site'
                        ]
                    }
                }
            ]
        }
    }
};
```

### sass.thmr

Inside your sass.thmr file (or whatever you want to name it).  Set the path to your sass theme folder.  This is the base folder containing your modules ([modules]/index.scss).  Generally included from your main .js file (require/import).

```javascript
[
    '~public/scss/themes/default',
    '~public/scss/themes/greyform',
    '~public/scss/themes/mysite'
]
```

### output

Here's an example of what the sass parser will receive.  All global variables and mix-ins will be shared/passed down.  All paths are mandatory, so just insert a blank index.scss if the path isn't used.

```scss
@import '~public/scss/themes/default/variables/index';
@import '~public/scss/themes/greyform/variables/index';
@import '~public/scss/themes/mysite/variables/index';

@import '~public/scss/themes/default/mixins/index';
@import '~public/scss/themes/greyform/mixins/index';
@import '~public/scss/themes/mysite/mixins/index';

@import '~public/scss/themes/default/site/index';
@import '~public/scss/themes/greyform/site/index';
@import '~public/scss/themes/mysite/site/index';
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
