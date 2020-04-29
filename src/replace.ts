import { window, TextEditor, Range } from 'vscode';

/**
 * 文字単位の変換
 * @param {TextEditor} editor 编辑器
 * @param {RegExp} regEx
 * @param {number} offset
 */
function offsetCharCode(
  editor: TextEditor,
  regEx: RegExp,
  offset: number
): void {
  editor.edit((editBuilder) => {
    const document = editor.document;
    const text = document.getText();
    let match;
    while ((match = regEx.exec(text))) {
      editBuilder.replace(
        new Range(
          document.positionAt(match.index),
          document.positionAt(match.index + 1)
        ),
        String.fromCharCode(match[0].charCodeAt(0) + offset)
      );
    }
  });
}

/**
 *全角英文转换为半角
 */
export function full2Half(): void {
  if (window.activeTextEditor) {
    offsetCharCode(window.activeTextEditor, /[０-９Ａ-Ｚａ-ｚ＆．]/g, -65248);
  }
}
