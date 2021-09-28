---
id: boolean.md
---
# 布尔表达式语法规则

[扩展巴科斯范式（EBNF）](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form)语法规则中定义了 布尔表达式的语法规则。布尔表达式的语法规则如下所示：

```
Expr = LogicalExpr | NIL

LogicalExpr = LogicalExpr BinaryLogicalOp LogicalExpr 
              | UnaryLogicalOp LogicalExpr
              | "(" LogicalExpr ")"
              | SingleExpr;

BinaryLogicalOp = "&&" | "and" | "||" | "or";

UnaryLogicalOp = "not";

SingleExpr = TermExpr | CompareExpr;

TermExpr = IDENTIFIER "in" ConstantArray;

Constant = INTERGER | FLOAT

ConstantExpr = Constant
               | ConstantExpr BinaryArithOp ConstantExpr
               | UnaryArithOp ConstantExpr;
                                                          
ConstantArray = "[" ConstantExpr { "," ConstantExpr } "]";

UnaryArithOp = "+" | "-"

BinaryArithOp = "+" | "-" | "*" | "/" | "%" | "**";

CompareExpr = IDENTIFIER CmpOp IDENTIFIER
              | IDENTIFIER CmpOp ConstantExpr
              | ConstantExpr CmpOp IDENTIFIER
              | ConstantExpr CmpOpRestricted IDENTIFIER CmpOpRestricted ConstantExpr;

CmpOpRestricted = "<" | "<=";

CmpOp = ">" | ">=" | "<" | "<=" | "=="| "!=";
```

上述布尔表达式规则中提及的符号及其含义请见下表。

| 表达式      | 含义 |
| ----------- | ----------- |
| =      | 定义。       |
| ,      | 串联。    |
| ;      | 终止。        |
| |      | 交替。       |
| {...}   | 重复。       |
| (...)      | 分组。       |
| NIL   | 空值。表达式可以为空字符串。     |
| INTEGER      | 整数，如 1、2、3 等。       |
| FLOAT   | 浮点数，如 1.0、2.0。       |
| CONST      | 整数或浮点数。      |
| IDENTIFIER   | 标识符。在 Milvus 用来表示 Field 名称。  |
| LogicalOp      | LogicalOp 包括 BinaryLogicalOp 及 UnaryLogicalOp，支持在一次比较运算中包含多种逻辑关系。LogicalOp 返回结果为 TRUE (1) 或 FALSE (0)。   |
| UnaryLogicalOp   | 一元逻辑运算符 '否'。  |
| BinaryLogicalOp   |  在运算元数量大于等于 2 的复杂表达式中，运算先后顺序由运算符的优先级决定。      |
| ArithmeticOp   | ArithmeticOp 计算数学关系，如加法、减法等。  |
| UnaryArithOp      | UnaryArithOp 表达式中仅包含 1 个运算元。一元否定运算符会将表达式中符号的含义从肯定变为否定，或从否定变为肯定。     |
| BinaryArithOp   | 在运算元数量大于等于 2 的复杂表达式中，运算先后顺序由运算符的优先级决定。      |
| CmpOp   | 关系运算符。    |
| CmpOpRestricted      |   仅指代 "小于" 以及 "小于或等于"。   |
| ConstantExpr   | ConstantExpr 可用于面向 2 个 ConstantExpr 的常量的BinaryArithOp，或面向 1 个 ConstantExpr 的 UnaryArithOp。ConstantExpr 的定义方式为递归定义。       |
| ConstantArray      | 使用方括号来表示 ConstantArray。ConstantExpr 可在方括号内重复。ConstantArray 必须包含至少 1 个ConstantExpr。      |
| TermExpr   | TermExpr 用于检查 IDENTIFIER 的值是否出现在 ConstantArray 中。TermExpr 由 "in" 来表示。   |
| CompareExpr      | CompareExpr 可用于面向 2 个 IDENTIFIER 或面向 1 个 IDENTIFIER 和 1 个 ConstantExpr 的关系运算。CompareExpr 还可以运用于面向 2 个 ConstantExpr 和 1 个 IDENTIFIER 的三元运算。     |
| SingleExpr   |  SingleExpr 可以是 TermExpr 或 CompareExpr。     |
| LogicalExpr      | LogicalExpr 可以是面向 2 个 LogicalExpr 的 BinaryLogicalOp，或面向 1 个 LogicalExpr 的 UnaryLogicalOp，或是1 个按括号分组的 LogicalExpr、或是1 个 SingleExpr。LogicalExpr 的定义方式为递归定义。 |
| Expr   | Expr 可以是 LogicalExpr 或 NIL。 |

## 运算符

### 逻辑运算


| 符号| 运算 | 示例 | 规则    |
| ----------| ------------- | ----------- | ------------------------- |
| 且运算符（&&） | and           | expr1 && expr2   | 若 expr1 和 expr2 两个均为 true，则结果为 true。 |
| 或运算符（\|\|）  | or           | expr1 \|\| expr2     | 若 expr1 或 expr2 中任意一个为 true，则结果为 true。  |




### 二元算数运算符

| 符号 | 运算 | 示例 | 规则     |
| ----------| ------------- | ----------- | ------------------------- |
| +         | 加      | a + b       | 计算 a 与 b 的和。     |
| -         | 减   | a - b       | 计算 a 与 b 的差。 |
| *         | 乘| a * b       | 计算 a 与 b 的乘积。    |
| /         | 除      | a / b       | 计算 a 除以 b 的商。    |
| **        | 幂         | a ** b      | 计算 a 的 b 次方。    |
| %         | 取模        | a % b       | 计算 a 除以 b 得到的余数。    |


### 关系运算符

| 符号 |  运算  |  示例 | 规则    |
| ----------| ------------- | ----------- | ------------------------- |
| <         | 小于     | a < b      | 若 a 小于 b，则结果为 true。    |
| >         | 大于   | a > b       | 若 a 大于 b，则结果为 true。  |
| ==        |等于     | a == b      | 若 a 等于 b，则结果为 true。   |
| !=        | 不等于   | a != b     | 若 a 不等于 b，则结果为 true。    |
| <=        | 小于等于    | a <= b   | 若 a 小于等于 b，则结果为 true。   |
| >=        | 大于等于   | a >= b     | 若 a 大于等于 b，则结果为 true。  |


## 运算符优先级及关联性

下表为运算符的优先级及关联性。表中运算符优先级按照从高到低排序。


| 优先级 | 符号  | 运算符   | 关联性 |
|------------|-----------|---------------|---------------|
| 1          | + -       | 一元算数运算符（UnaryArithOp）  | 从左到右 |
| 2          | not       | 一元逻辑运算符（UnaryLogicalOp）  | 从右到左 |
| 3          | **        | 二元算数运算符（BinaryArithOp） | 从左到右 |
| 4          | * / %     | 二元算数运算符（BinaryArithOp） | 从左到右 |
| 5          | + -       | 二元算数运算符（BinaryArithOp） | 从左到右 |
| 6          | < <= > >= | 二元算数运算符（BinaryArithOp） | 从左到右 |
| 7          | == !=     | 比较运算符（CmpOp）| 从左到右 |
| 8          | && and    | 二元逻辑运算符（BinaryLogicalOp） | 从左到右 |
| 9          | \|\| or     | 二元逻辑运算符（BinaryLogicalOp） | 从左到右|


表达式运算通常遵循从左到右的计算规则。一次只能计算一种复杂表达式。运算先后顺序由运算符的优先级决定。

如果表达式中包含两个或以上同等优先级的运算符，运算时从左到右进行。

<div class="alert note">
例如，10 / 2 * 5 的运算过程为 (10 / 2) 的商乘以 5。
</div>

若需要先处理低优先级的运算，请使用括号。

<div class="alert note">
例如，30 / 2 + 8 的运算过程为 30 除以 2 的商加 8。若你想计算 30 除以 2 加 8 的和 10，则应将表达式写作 30 / (2 + 8). 
</div>


你可以在表达式中使用括号。运算时先计算最内层括号内的表达式。


