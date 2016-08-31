# Maple support for Visual Studio Code

## Syntaxes Highlight & Theme
The highlight theme `Dark+ for maple` is based on the vscode default `Dark+` theme, added some color settings for the maple elements.

To change the theme, you can press `ctrl+shift+P` and search `Theme`, click `Preference: Color Theme`, and select the `Dark+ for maple`.

If you don't like the color, you can change it in `./themes/maple.json`.

<img src="https://github.com/yu961549745/VSCodeHighlightForMaple/blob/master/img/theme.png?raw=true">

Support elements include:
+ line comment: `#`
+ block comment: `(**)`
+ keywords
+ string: surround with `""`, and handled escaping but ignore its correctness.
+ quoted names: surround with ` `` `, and handled escaping but ignore its correctness.
+ unevaluated expressions: the `''` can be used as `()` for expressions, so it's difficult to match these expressions,
    this extension just support mult-quoted unevaluated expressions such as `'x'` and `''x''`, expressions like `''x'+y'` can not be highlighted correctly.
+ preprocessor: such as `$include`. *Notice*: In Maple, the introducer `$` must appear as the first character of a line to be recognized as a preprocessor directive.
+ proc and module options. But deleted `trace` option, because it is rarely used, and can be instead of the `trace` function. 
+ support extensions: mpl,mm,mi .

## Snippets

<img src="https://github.com/yu961549745/VSCodeHighlightForMaple/blob/master/img/snippets.gif?raw=true">

Simple snippets including:
+ if
+ elif
+ else
+ proc
+ module
+ for
+ while
+ do
+ use
+ try
+ ifndef - define - endif
