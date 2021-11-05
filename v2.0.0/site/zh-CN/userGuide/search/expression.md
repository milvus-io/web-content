---
id: expression.md
---


# 表达式

Milvus 通过表达式搜索实现标量过滤。表达式是一种布尔值函数，取值为 `true` 或 `false`。

查看 [Python SDK API Reference](/api-reference/pymilvus/2.0.0rc8/api/collection.html) 以了解表达式使用说明。

## 表达式语法

表达式可以为 NONE 或逻辑表达式。

```
Expr := LogicalExpr | NIL
```

### 表达式运算符种类

| 运算符     | 描述                                                         | 示例                                                         |
| ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 关系运算符 | 关系运算符使用符号检验两个表达式之间的相等、不相等或相对次序。Milvus 支持的关系运算符包括 `>`、`>=`、`<` 、`<=`、`==` 以及 `!=`。 | <ul><li>A > 1</li><li>B >= 2</li><li>C < 3</li><li>D <= 4</li><li>E == 5</li><li>F != 6</li></ul> |
| 逻辑运算符 | 逻辑运算符作用于一个或两个表达式。Milvus 支持的逻辑运算符包括：AND &&、OR \|\| 以及 NOT !。 | <ul><li>A > 3 && A < 4</li><li>NOT (A == 1)</li></ul>        |
| IN 运算符  | 当关键字 IN 左侧的表达式包含在右侧项目列表中时，满足 IN 条件。 | <ul><li>FloatCol in [1.0, 2, 3.0]</li><li>Int64Col in [1, 2, 3]</li></ul> |

## 关系运算符

关系运算符是比较两个表达式的符号。 运算符两边的数据类型必须保持一致。

Milvus 支持的关系运算符包括：

- 等于（==）
- 不等于（!=）
- 大于（>）
- 大于等于（>=）
- 小于（<）
- 小于等于（<=）

## 逻辑运算符

逻辑运算符分为一元运算符（UnaryLogicalOp）和二元运算符（BinaryLogicalOp）。一元运算符仅作用于一个逻辑表达式，而二元运算符将一个逻辑表达式与另一个逻辑表达式进行比较。

Milvus 支持的逻辑运算符包括：

- NOT !
- AND &&
- OR ||

### 语法

```
LogicalExpr := LogicalExpr BinaryLogicalOp LogicalExpr
  | UnaryLogicalOp LogicalExpr
  | "(" LogicalExpr ")"
  | RelationalExpr
  | InExpr
```

## IN 运算符
IN 运算符将 field 中的值与常量数组中的每一项进行比对，以判断该数组是否包含该值。数组内各项须用逗号分隔。运算符左侧和右侧数值的类型必须保持一致。

### 语法

```
InExpr := IDENTIFIER "in" ConstantArray
ConstantArray := "[" Constant+, "]"
```

## 评估顺序

Milvus 评估表达式的顺序如下表所示：

1. 括号内的表达式
2. NOT 运算符
3. OR 运算符
4. AND 运算符


详细了解 [布尔表达式语法规则](boolean.md)。
