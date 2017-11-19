'use strict';
class ProcListProvider {
    constructor(context) {
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        vscode.window.onDidChangeActiveTextEditor(editor => {
            this.parseTree();
            this._onDidChangeTreeData.fire();
        });
        vscode.workspace.onDidChangeTextDocument(e => {});
        this.parseTree();
    }
    onDocumentChanged(changeEvent) {
        if (changeEvent.document.uri.toString() === this.editor.document.uri.toString()) {
            for (const change of changeEvent.contentChanges) {}
        }
    }
    parseTree() {
        this.tree = null;
        this.editor = vscode.window.activeTextEditor;
        if (this.editor && this.editor.document && this.editor.document.languageId === 'json') {
            this.tree = json.parseTree(this.editor.document.getText());
        }
    }
    getChildren(node) {
        if (node) {
            return Promise.resolve(this._getChildren(node));
        } else {
            return Promise.resolve(this.tree ? this.tree.children : []);
        }
    }
    _getChildren(node) {
        return node.parent.type === 'array' ? this.toArrayValueNode(node) : (node.type === 'array' ? node.children[0].children : node.children[1].children);
    }
}
exports.ProcListProvider = ProcListProvider;