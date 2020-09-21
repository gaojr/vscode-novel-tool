# vscode-novel-tool

![Version](https://img.shields.io/badge/version-0.0.7-orange.svg?cacheSeconds=3600)

[![License: MPL-2.0](https://img.shields.io/github/license/gaojr/vscode-novel-tool?cacheSeconds=3600)](https://github.com/gaojr/vscode-novel-tool/blob/master/LICENSE)

## Features

- 全角转半角功能 `novel.tool.narrow`
  - 以下全角字符会被转换为半角字符:
  ```
  　＂＃＄％＆＇（）＊＋，－．／０１２３４５６７８９＜＝＞＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［＼］＾＿｀ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ｛｜｝～
  ```
- 删除行末空白 `novel.tool.deleteBlankAfter`
- 删除行首空白 `novel.tool.deleteBlankBefore`
- 增加空行 `novel.tool.addEmpetyLine`
- 删除空行 `novel.tool.deleteEmpetyLine`
- 英文标点转换为中文 `novel.tool.punctuationE2C`
  - 以下英文标点会被转换为中文字符:
  ```
  ,!?;:
  ```
- 英文、数字跟中文之间加空格 `novel.tool.addWhitespace`

## Extension Settings

## Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/gaojr/vscode-novel-tool/issues/new)~

## Show your support

Give a ⭐️ if this project helped you!
