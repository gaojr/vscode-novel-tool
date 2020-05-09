import { commands, window, TextEditor, Range } from 'vscode';

/**
 * 替换
 * @param {TextEditor} editor 编辑器
 * @param {RegExp} regEx 正则表达式
 * @param {string} value 替换文字
 */
function replaceByLine(editor: TextEditor, regEx: RegExp, value: string): void {
  editor.edit((editBuilder) => {
    const document = editor.document;
    const lastLine = document.lineCount;
    for (let line = 0; line < lastLine; line++) {
      const textLine = document.lineAt(line);
      const range = textLine.range;
      const text = textLine.text;
      editBuilder.replace(range, text.replace(regEx, value));
    }
  });
}

/**
 * 变换字符
 * @param {TextEditor} editor 编辑器
 * @param {RegExp} regEx 正则表达式
 * @param {number} offset 偏移量
 */
function offsetCharCode(editor: TextEditor, regEx: RegExp, offset: number): void {
  editor.edit((editBuilder) => {
    const document = editor.document;
    const text = document.getText();
    let match;
    while ((match = regEx.exec(text))) {
      editBuilder.replace(
        new Range(document.positionAt(match.index), document.positionAt(match.index + 1)),
        String.fromCharCode(match[0].charCodeAt(0) + offset)
      );
    }
  });
}

/**
 * 全角转换为半角
 */
export function full2Half(): void {
  if (window.activeTextEditor) {
    offsetCharCode(window.activeTextEditor, /[０-９Ａ-Ｚａ-ｚ＆．]/g, -65248);
  }
}

/**
 * 删除行末空白
 */
export function deleteBlankAfter(): void {
  commands.executeCommand('editor.action.trimTrailingWhitespace');
}

/**
 * 删除行首空白
 */
export function deleteBlankBefore(): void {
  if (window.activeTextEditor) {
    replaceByLine(window.activeTextEditor, /^\s+/gm, '');
  }
}
