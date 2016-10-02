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
var exec = require('child_process').exec;
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
    var printOption = config.get("isPrettyPrint") ? " -c interface(prettyprint=1) " : " -c interface(prettyprint=0) ";
    var dirOption = " -c \"currentdir(`" + fpath + "`)\" ";
    var options = dirOption + printOption;
    // check cmaple.exe is exists
    if (!fs.existsSync(cmaplePath)) {
        vscode.window.showInformationMessage('Please set path of cmaple.exe');
        return;
    }
    // run maple codes
    var selection = editor.selection;
    var text = selection.isEmpty ? editor.document.getText() : editor.document.getText(selection);
    var rndStr = Math.random().toString();
    var tmpFile = path.join(tmpFilePath, 'tmp0.mpl'.replace(/\d+/g, rndStr));
    var outFile = path.join(tmpFilePath, 'out0.mpl'.replace(/\d+/g, rndStr));
    fs.writeFileSync(tmpFile, text, { encoding: "utf8" });
    var process = exec('"' + cmaplePath + '"' + " " + options + '"' + tmpFile + '"' + " >" + '"' + outFile + '"');
    process.on('close', function() {
        outputChannel.show();
        outputChannel.appendLine('[Maple Running : ' + fname + ']');
        var output = fs.readFileSync(outFile, "utf8");
        var lines = output.split(/[\r\n]+/g);
        for (var i = 5; i < lines.length - 3; i++) {
            if (!lines[i].match(/memory used=.*?MB, alloc=.*?MB, time=.*?/)) {
                outputChannel.appendLine(lines[i]);
            }
        }
        fs.unlinkSync(tmpFile);
        fs.unlinkSync(outFile);
    });
}