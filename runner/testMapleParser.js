'use strict';
const fs = require('fs');
const mp = require('./MapleParser');

var str = fs.readFileSync('D:/__study/CodeLib/VSCodeHighlightForMaple/test/testProcList.mpl', 'utf8');
var tokens = mp.findTokens(str);
console.log(tokens);
var tree = mp.buildTree(tokens);
mp.printTree(tree, 0);