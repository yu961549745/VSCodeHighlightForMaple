'use strict';
const fs = require('fs');
const mp = require('./MapleParser');

var str = fs.readFileSync('D:/Desktop/IntSimplify/src/IntFunc.mpl', 'utf8');
var tokens = mp.findTokens(str);
console.log(tokens);
var tree = mp.buildTree(tokens);
mp.printTree(tree, 0);