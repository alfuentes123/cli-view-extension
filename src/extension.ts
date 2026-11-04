import * as vscode from 'vscode';

function showAlert() {
	let saved: { name: string; command: string }[] | undefined = vscode.workspace.getConfiguration('cli-view-extension').get('savedCli');
	const names = saved?.map((cli) => cli.name) ?? [];
	const commands = saved?.map((cli) => cli.command) ?? [];
	const buttons = [...names, 'Manage CLIs'];
	const selected = vscode.window.showInformationMessage("Select CLI", ...buttons ).then((value) => {
		for (let i = 0; i < buttons.length; i++) {
				if (value === names[i]) {
					launchTerminal(commands[i]);
				}
				else if (value === 'Manage CLIs') {
					vscode.commands.executeCommand('workbench.action.openSettings', 'cli-view-extension.savedCli');
				}
				else if (value === undefined) {
					return;
				}
		};
	});
}


function launchTerminal(command: string) {
	const terminal = vscode.window.createTerminal(
		{
			location: {
				viewColumn: vscode.ViewColumn.Beside,
				preserveFocus: true
			},
		});
	terminal.show();
	if (command) {
		terminal.sendText(command);
	}
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
