'use strict';
var vscode = require('vscode');

function activate(context) {
    var run = vscode.commands.registerCommand('maple.run', getSelectedCodeAndRun);
    context.subscriptions.push(run);
}

exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;

var fs = require('fs');
var path = require('path');
var exec = require('child_process').execFile;
var outputChannel = vscode.window.createOutputChannel('Maple');
var tmpFilePath = require('os').tmpdir();

function getSelectedCodeAndRun() {
    // check editor is openning
    var editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showInformationMessage('No code found or selected.');
        return;
    }
    // get path of current file 
    var fname = editor.document.fileName;
    var fpath = path.resolve(fname, "..").replace(/\\/g, "/");
    // get configs
    var config = vscode.workspace.getConfiguration('maple');
    var cmaplePath = config.get("cmaplePath");
    // check cmaple.exe is exists
    if (!fs.existsSync(cmaplePath)) {
        vscode.window.showInformationMessage('cmaplePath "' + cmaplePath + '" not exists');
        return;
    }
    // run maple codes
    var selection = editor.selection;
    var text = selection.isEmpty ? editor.document.getText() : editor.document.getText(selection);
    var printOption = config.get("isPrettyPrint") ? "interface(prettyprint=1):\n" : "interface(prettyprint=0):\n";
    var dirOption = "currentdir(`" + fpath + "`):\n";
    var tmpFile = path.join(tmpFilePath, 'tmp0.mpl'.replace(/\d+/g, Math.random().toString()));
    fs.writeFileSync(tmpFile, printOption + dirOption + text, { encoding: "utf8" });
    outputChannel.show();
    outputChannel.appendLine('[Maple Running : ' + fname + ']');
    var p = exec(cmaplePath, ["-q", tmpFile], (error, stdout, stderr) => {
        outputChannel.appendLine(stdout);
    });
    p.on('close', function() {
        fs.unlinkSync(tmpFile);
    });
}