'use strict';

function findTokens(str) {
    // /*
    //     考虑一种分别检测不同类型的 Token 的方法, 防止同时检测造成正则表达式过于复杂的问题. 
    //     检测到之后再根据起始位置排序
    // */
    // var regexs = {
    //     // 不考虑嵌套
    //     "comments": /(\(\*(.|\s)*?\*\))|(#.*?$)/gm,
    //     // 考虑了 "...\"..." 的情况
    //     "string": /"(\\.|\s|.)*?"/gm,
    //     /*  
    //         结束标志允许  end proc/module 
    //         同时兼容老版本  proc/module ... end: 的写法
    //         但是不要使用 if/try/do ... end
    //     */
    //     "end_tokens": /(\bend\s+\b(proc|module)\b\s*[:;]*)|(\bend\b\s*[;:])/g,
    //     /*  变量名考虑 xxx `xxx` 'xxx' 三种形式
    //         考虑 [xxx] :-xxx 的后缀形式
    //         最后接 proc/module
    //     */
    //     "start_tokens": /((:-)*(\w+|(`.*?`)|('.*?'))(:-(\w+|(`.*?`)|('.*?')))*(\[.*?\])*\s*:=\s*\b(proc|module)\b)/gm,
    // }
    var b, r = /(\(\*(.|\s)*?\*\))|(#.*?$)|((:-)*(\w+|(`.*?`)|('.*?'))(:-(\w+|(`.*?`)|('.*?')))*(\[.*?\])*\s*:=\s*\b(proc|module)\b)|(\bend\s+\b(proc|module)\b\s*[:;]*)|(\bend\b\s*[;:])|(\b(proc|module)\b)|("(\\.|\s|.)*?")/gm;
    var arr = new Array();
    var k = 0;
    var procs = 0,
        modules = 0;
    while (true) {
        b = r.exec(str);
        if (!b) break;
        var sToken = b[0];
        var start = b.index;
        var end = start + sToken.length;
        var type, name;
        if (/(\(\*(.|\s)*?\*\))|(#.*?$)/gm.test(sToken)) {
            // 注释
            continue;
        } else if (/(\bend\s+\b(proc|module)\b\s*[:;]*)|(\bend\b\s*[;:])/g.test(sToken)) {
            // 结束标记
            name = undefined;
            type = sToken.replace(/\s+|[:;]/g, '');
        } else if (!/:=/g.test(sToken)) {
            // 匿名函数
            name = '<null>';
            type = sToken;
        } else if (/((:-)*(\w+|(`.*?`)|('.*?'))(:-(\w+|(`.*?`)|('.*?')))*(\[.*?\])*\s*:=\s*\b(proc|module)\b)/gm.test(sToken)) {
            // 非匿名函数
            var nt = sToken.split(/\s*:=\s*/);
            type = nt[1];
            name = nt[0];
        } else {
            // 字符串
            continue;
        }
        arr.push({
            'type': type,
            'name': name,
            'start': start,
            'end': end
        });
    }
    return arr;
}

class MapleNode {
    constructor(type, name, start) {
        this.type = type;
        this.name = name;
        this.start = start;
        this.end = undefined;
        this.childs = new Array();
        var mark = '';
        switch (type) {
            case 'root':
                mark = 'R';
                break;
            case 'proc':
                mark = 'P';
                break;
            case 'module':
                mark = 'M';
                break;
            default:
                break;
        }
        this.mark = mark;
    }
    append(node) {
        this.childs.push(node);
    }
    getLable() {
        return '{' + this.mark + '} ' + this.name;
    }
    hasChild() {
        return this.childs.length > 0;
    }
}

Array.prototype.peek = function() {
    return this[this.length - 1];
}

function buildTree(tokens) {
    var tree = new MapleNode('root', 'root', undefined);
    var stack = new Array();
    stack.push(tree);
    for (var k = 0; k < tokens.length; k++) {
        var token = tokens[k];
        switch (token.type) {
            case 'proc':
            case 'module':
                var node = new MapleNode(token.type, token.name, token.start);
                if (node.name != '<null>') {
                    stack.peek().append(node);
                }
                stack.push(node);
                break;
            case 'end':
                if (stack.peek().type == 'root') {
                    return null;
                }
                var node = stack.pop();
                node.end = token.end;
                break;
            case 'endproc':
                if (stack.peek().type != 'proc') {
                    return null;
                }
                var node = stack.pop();
                node.end = token.end;
                break;
            case 'endmodule':
                if (stack.peek().type != 'module') {
                    return null;
                }
                var node = stack.pop();
                node.end = token.end;
                break;
            default:
                break;
        }
    }
    return tree;
}

function printTree(node, depth) {
    if (!node) {
        console.log(null);
        return;
    }
    var pre = '';
    for (var k = 0; k < depth; k++) pre += '  ';
    console.log(pre + node.getLable() + '(' + node.start + ',' + node.end + ')');
    for (var k = 0; k < node.childs.length; k++)
        printTree(node.childs[k], depth + 1);
}

exports.findTokens = findTokens;
exports.buildTree = buildTree;
exports.printTree = printTree;