// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

async function processFile(workspaceEdit: vscode.WorkspaceEdit, file: vscode.TextDocument): Promise<void> {

	if (file.lineCount == 0) {
		return;
	}

	for (let lineNumber = 0; lineNumber < file.lineCount; lineNumber++) {
		const line = file.lineAt(lineNumber);
		
		if (line.isEmptyOrWhitespace) {
			continue;
		}

		const lineText = line.text;
		
		if (lineText.includes("breakpoint()")) {
			workspaceEdit.delete(file.uri, line.range);
		}
	}
}

async function handler() {
	vscode.window.showInformationMessage('Removing breakpoints...');

	const pythonFileUris = await vscode.workspace.findFiles('**/*.py');
	const workspaceEdit = new vscode.WorkspaceEdit();

	for (let UriIndex = 0; UriIndex < pythonFileUris.length; UriIndex++) {
		const file = await vscode.workspace.openTextDocument(pythonFileUris[UriIndex]);

		await processFile(workspaceEdit, file);
	}

	await vscode.workspace.applyEdit(workspaceEdit);

	vscode.window.showInformationMessage('Removed breakpoints');
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "python-remove-breakpoints" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('python-remove-breakpoints.removeBreakpoints', handler);

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
