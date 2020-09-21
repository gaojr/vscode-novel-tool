import { commands, window, TextEditor, Range } from 'vscode';

/**
 * 替换
 * @param {TextEditor} editor 编辑器
 * @param {RegExp} regEx 正则表达式
 * @param {string} value 替换文字
 */
function addByLine(editor: TextEditor, value: string): void {
  editor.edit((editBuilder) => {
    const document = editor.document;
    const lastLine = document.lineCount;
    for (let line = 0; line < lastLine; line++) {
      const textLine = document.lineAt(line);
      editBuilder.replace(textLine.range, textLine.text + value);
    }
  });
}

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
  const editor = window.activeTextEditor;
  if (editor) {
    // 逗号、感叹号、问号、分号、冒号外的全角字符
    offsetCharCode(editor, /[\uff02-\uff0b\uff0d-\uff19\uff1c-\uff1e\uff20-\uff5e]/g, -65248);
    // 全角空格
    offsetCharCode(editor, /[\u3000]/g, -12256);
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
  const editor = window.activeTextEditor;
  if (editor) {
    replaceByLine(editor, /^\s+/gm, '');
  }
}

/**
 * 增加空行
 */
export function addEmpetyLine(): void {
  const editor = window.activeTextEditor;
  if (editor) {
    const eol = editor.document.eol.valueOf();
    const val = eol === 2 ? '\r\n' : '\n';
    addByLine(editor, val);
  }
}

/**
 * 删除空行
 */
export function deleteEmpetyLine(): void {
  const editor = window.activeTextEditor;
  if (editor) {
    editor.edit((editBuilder) => {
      const document = editor.document;
      const lastLine = document.lineCount;
      for (let line = 0; line < lastLine; line++) {
        const textLine = document.lineAt(line);
        if (textLine.isEmptyOrWhitespace) {
          editBuilder.delete(textLine.rangeIncludingLineBreak);
        }
      }
    });
  }
}

/**
 * 英文标点转换为中文
 */
export function punctuationE2C(): void {
  const editor = window.activeTextEditor;
  if (editor) {
    const document = editor.document;
    const lastLine = document.lineCount;
    const range = new Range(0, 0, lastLine, 0);
    let text = document.getText();
    text = text
      // 所有英文逗号改中文逗号
      .replace(/\s*,\s*/g, '，')
      // 把两个数字间的逗号改为英文逗号
      .replace(/(?<=\d)，(?=\d)/g, ',')
      .replace(/\s*!\s*/g, '！')
      .replace(/\s*\?\s*/g, '？')
      .replace(/\s*;\s*/g, '；')
      .replace(/\s*:\s*/g, '：');

    editor.edit((editBuilder) => {
      editBuilder.replace(range, text);
    });
  }
}

/**
 * 英文、数字跟中文之间加空格
 */
export function addWhitespace(): void {
  const editor = window.activeTextEditor;
  if (editor) {
    const document = editor.document;
    const lastLine = document.lineCount;
    const range = new Range(0, 0, lastLine, 0);
    let text = document.getText();
    text = text.replace(/([\u4e00-\u9fa5])([a-zA-Z0-9])/g, '$1 $2').replace(/([a-zA-Z0-9])([\u4e00-\u9fa5])/g, '$1 $2');

    editor.edit((editBuilder) => {
      editBuilder.replace(range, text);
    });
  }
}
