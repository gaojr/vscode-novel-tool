import { commands, Disposable, ExtensionContext } from 'vscode';
import { full2Half } from './replace';

/**
 * 缓存
 */
let disposables: Disposable[] = [];

/**
 * this method is called when your extension is activated\
 * your extension is activated the very first time the command is executed
 * @param {ExtensionContext} context
 */
export function activate(context: ExtensionContext): void {
  // This code will only be executed once when your extension is activated
  disposables.push(
    commands.registerCommand('novel.tool.narrow', () => {
      full2Half();
    })
  );
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
