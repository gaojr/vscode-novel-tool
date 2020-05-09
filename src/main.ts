import { commands, Disposable, ExtensionContext } from 'vscode';
import * as replace from './replace';

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
      replace.full2Half();
    })
  );

  disposables.push(
    commands.registerCommand('novel.tool.deleteBlankAfter', () => {
      replace.deleteBlankAfter();
    })
  );

  disposables.push(
    commands.registerCommand('novel.tool.deleteBlankBefore', () => {
      replace.deleteBlankBefore();
    })
  );

  disposables.push(
    commands.registerCommand('novel.tool.addEmpetyLine', () => {
      replace.addEmpetyLine();
    })
  );

  disposables.push(
    commands.registerCommand('novel.tool.deleteEmpetyLine', () => {
      replace.deleteEmpetyLine();
    })
  );

  disposables.push(
    commands.registerCommand('novel.tool.punctuationE2C', () => {
      replace.punctuationE2C();
    })
  );
}

/**
 * this method is called when your extension is deactivated
 */
export function deactivate(): void {
  if (disposables) {
    disposables.forEach((item) => item.dispose());
  }
  disposables = [];
}
