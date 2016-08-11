# Maple support for Visual Studio Code

## Syntaxes Highlight & Theme
The highlight theme `Dark+ for maple` is based on the vscode default `Drak+` theme, added some color settings for the maple elements.

<img src="https://github.com/yu961549745/VSCodeHighlightForMaple/blob/master/img/theme.png?raw=true">

Support elements include:
+ line comment: `#`
+ block comment: `(**)`
+ keywords
+ string: surround with `""`, and handled escaping but ignore its correctness.
+ quoted names: surround with ` `` `, and handled escaping but ignore its correctness.
+ unevaluated expressions: the `''` can be used as `()` for expressions, so it's diffiicult to match these expressions,
    this extension just support mult-quoted unevaluated expressions such as `'x'` and `''x''`, expressions like `''x'+y'` can not be highlighted correctly.
+ preprocessor: such as `$include`. *Notice*: In Maple, the introducer `$` must appear as the first character of a line to be recognized as a preprocessor directive.
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
