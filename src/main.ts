import * as vscode from 'vscode';

/**
 * 缓存
 */
let disposables: vscode.Disposable[] = [];

/**
 * this method is called when your extension is activated\
 * your extension is activated the very first time the command is executed
 * @param {vscode.ExtensionContext} context
 */
export function activate(context: vscode.ExtensionContext): void {
  // This code will only be executed once when your extension is activated
}

/**
 * this method is called when your extension is deactivated
 */
export function deactivate(): void {
  if (!!disposables) {
    disposables.forEach((item) => item.dispose());
  }
  disposables = [];
}
