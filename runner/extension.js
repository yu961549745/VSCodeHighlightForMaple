'use strict';
const vscode = require('vscode');
const proclist = require('./proclist');
const runner = require('./runner').getSelectedCodeAndRun;

function activate(context) {
    vscode.commands.registerCommand('maple.run', runner);
    var ProcListProvider = new proclist.ProcListProvider(context);
    vscode.window.registerTreeDataProvider('maple-outline', ProcListProvider);
    vscode.commands.registerCommand('extension.selectMaple', range => { ProcListProvider.select(range) });
    context.subscriptions.push(vscode.workspace.onDidSaveTextDocument((e) => {
        var editor = vscode.window.activeTextEditor;
        if (editor.document.languageId === 'maple') {
            ProcListProvider.refrash();
            ProcListProvider.update();
        }
    }));
}

exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;