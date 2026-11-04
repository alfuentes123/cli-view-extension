import * as vscode from 'vscode';


function showAlert() {
	
	const saved: { options: string[] } | undefined = vscode.workspace.getConfiguration('cli-view-extension').get('savedCli');
		const buttons = [...(saved?.options?.slice(0, 1) ?? []), 'Add a CLI'];


	const selected = vscode.window.showInformationMessage("Select CLI", ...buttons )

}


 function launchTerminal() {
	const terminal = vscode.window.createTerminal(
		{
			location: {
				viewColumn: vscode.ViewColumn.Beside,
				preserveFocus: true
			},
		});
	terminal.show();
}

function showButton() {
	const button = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	button.text = '$(terminal) Launch CLI';
	button.command = 'cli-view-extension.launchTerminal';
	button.show();
	return button;
}


export function activate(context: vscode.ExtensionContext) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('cli-view-extension.launchTerminal', showAlert);

	context.subscriptions.push(disposable);
	showButton();
}


export function deactivate() {}
