# 席替えWebアプリ

クラスの席替えを行うときに使える？Webアプリです。

## 詳しい使い方とか
Qiitaの記事にまとめてみたので、そちらをご覧ください。

[席替え用のWebアプリ作ってみたよ](https://qiita.com/SuzuTomo2001/items/1f93f1765ca4f5c35d57)

## JSONデータ作成方法

生徒・座席情報のJSONデータ構造

- `width` : 教室の座席の列数
- `height` : 教室の座席の行数
- `students` : 生徒情報の配列
    - `number` : 出席番号
    - `name` : 名前
    - `furigana` : フリガナ
    - `sex` : 性別（男は0、女は1）
- `seats` : 座席情報の配列
    - `number` : 座席の場所
        - 行・列ともに左上を0とし、3行3列の教室の場合、下表のように場所と数字が対応している。
        
        ||教卓||
        :--:|:--:|:--:
        0|1|2
        3|4|5
        6|7|8

    - `student` : 席に座る生徒の出席番号
    - `isStatic` : 席を固定するか（固定すると席替えしても変わらない。）

実際の例は下のようになる。

[sample.json](./sample.json)

```JSON
{
    "width": 2,
    "height": 3,
    "students": [
        {
            "number": 1,
            "name": "生徒 1",
            "furigana": "せいと 1",
            "sex": 0
        },
        {
            "number": 2,
            "name": "生徒 2",
            "furigana": "せいと 2",
            "sex": 1
        },
        {
            "number": 3,
            "name": "生徒 3",
            "furigana": "せいと 3",
            "sex": 0
        },
        {
            "number": 4,
            "name": "生徒 4",
            "furigana": "せいと 4",
            "sex": 1
        },
        {
            "number": 5,
            "name": "生徒 5",
            "furigana": "せいと 5",
            "sex": 0
        },
        {
            "number": 6,
            "name": "生徒 6",
            "furigana": "せいと 6",
            "sex": 1
        }
    ],
    "seats": [
        {
            "number": 0,
            "student": 4
        },
        {
            "number": 1,
            "student": 1
        },
        {
            "number": 2,
            "student": 5
        },
        {
            "number": 3,
            "student": 2
        },
        {
            "number": 4,
            "student": 6
        },
        {
            "number": 5,
            "student": 3
        }
    ]
}
```
