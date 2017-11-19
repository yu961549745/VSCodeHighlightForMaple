'use strict';
const vscode = require('vscode');
const mp = require('./MapleParser');


class ProcListProvider {
    constructor(context) {
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        vscode.window.onDidChangeActiveTextEditor(editor => {
            this.update();
            this.refrash();
        });
        this.refrash();
    }

    refrash() {
        this.tree = null;
        this.editor = vscode.window.activeTextEditor;
        if (this.editor && this.editor.document && this.editor.document.languageId === 'maple') {
            this.tree = mp.buildTree(mp.findTokens(this.editor.document.getText()));
            // mp.printTree(this.tree, 0);
        }
        return this.tree;
    }

    update() {
        this._onDidChangeTreeData.fire();
    }

    getChildren(node) {
        var ret;
        if (node) {
            ret = Promise.resolve(node.childs);
        } else {
            ret = Promise.resolve(this.tree ? this.tree.childs : []);
        }
        return ret;
    }

    getTreeItem(node) {
        var item = new vscode.TreeItem(node.getLable(), node.hasChild() ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None);
        item.command = {
            command: 'extension.selectMaple',
            title: '',
            arguments: [new vscode.Range(this.editor.document.positionAt(node.start), this.editor.document.positionAt(node.end))]
        };
        return item;
    }

    select(range) {
        var editor = this.editor;
        var selection = new vscode.Selection(range.start, range.end);
        editor.selection = selection;
        editor.revealRange(selection);
    }
}
exports.ProcListProvider = ProcListProvider;