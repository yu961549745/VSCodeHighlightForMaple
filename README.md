# Maple Highlight files for Visual Studio Code
## English
Simple Highlight Settings For VSCode. Include:
+ line comment: #
+ block comment: (**)
+ keywords: but not include reverse keywords such as od,fi,etc.
+ string: surround with "", and handled escaping but ignore its correctness.
+ variable: surround with ``, and handled escaping but ignore its correctness.
+ support extensions: mpl,mph.
+ see "/syntaxes/maple.json" for detail.
+ not support highlight for unevaluate expressions, because paired math for '' is too difficult.

Push this folder to "%VS Code Install Path%\resources\app\extensions" and restart VS Code.

## 中文
Maple语法高亮的简单设置。包括：
+ 行注释：#
+ 块注释：(**)
+ 关键字：但是不包括od,fi这些旧版本的的逆向关键字。
+ 字符串：用""包围，处理了转义字符的情况，但是不检查转义是否有意义。
+ 变量名：用``包围，处理了转义字符的情况，但是不检查转义是否有意义。
+ 支持文件后缀名：mpl,mph。
+ 其它特性详见"/syntaxes/maple.json"。
+ 没有对未求值表达式进行高亮，因为''的配对匹配太困难了。

将此文件夹放在 "%VS Code 安装目录%\resources\app\extensions" 下，重启VS Code即可。