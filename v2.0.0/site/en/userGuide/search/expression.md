---
id: expression.md
summary: learn about predicate expression rules in Milvus.
---

# Predicate Expressions
A predicate is an expression outputs a boolean value. Milvus conducts scalar filtering by searching with predicates. A predicate expression, when evaluated, returns either TRUE or FALSE.
View [Python SDK API Reference](/api-reference/pymilvus/2.0.0rc8/api/collection.html) for instruction on using predicate expressions.
## Predicate Syntax
An expression can be either NONE or a logical expression.

```
Expr := LogicalExpr | NIL
```

### Types of predicate operators

| Operator     | Description                                | Examples                                   |
| ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Relational operators | Relational operators use symbols to check for equality, inequality, or relative order between two expressions. Relational operators include `>`, `>=`, `<`, `<=`, `==`, and `!=` | <ul><li>A > 1</li><li>B >= 2</li><li>C < 3</li><li>D <= 4</li><li>E == 5</li><li>F != 6</li></ul> |
| Logical operators | Logical operators perform a comparison between two expressions. The supported logical operators are: AND, && OR, ||, and NOT | <ul><li>A > 3 && A < 4</li><li>NOT (A == 1)</li></ul>        |
| IN operator  | The IN condition is satisfied when the expression to the left of the keyword IN is included in the list of items | <ul><li>FloatCol in [1.0, 2, 3.0]</li><li>Int64Col in [1, 2, 3]</li></ul> |

## Relational Operators

Relational operators are symbols that compare one expression with another expression. Data types between left and right side of the operator must match.
The supported operators are:
- equals(==)
- not equals(!=)
- is greater than (>)
- is greater than or equal to (>=)
- is less than (<)
- is less than or equal to (<=)

## Logical Operators
There are two types of logical operators, unary and binray. UnaryLogicalOp acts on only one logical expression, while BinaryLogicalOp compares one logic expression with another logic expression.
The supported operators are:
- NOT !
- AND &&
- OR ||

### Syntax

```
LogicalExpr := LogicalExpr BinaryLogicalOp LogicalExpr
  | UnaryLogicalOp LogicalExpr
  | "(" LogicalExpr ")"
  | RelationalExpr
  | InExpr
```

## IN Operator

The IN operator matches values in a field to any of the items in the constant array, which must be a comma-separated list of items. Data types between left and right side of the operator must match.

### Syntax

```
InExpr := IDENTIFIER "in" ConstantArray
ConstantArray := "[" Constant+, "]"
```

## Order of Evaluation

The order in which the Milvus evaluates predicate expressions follows the table below:
1. Expressions inside parentheses
2. Not operators
3. Or operators
4. And Operators


Learn more about [Boolean Expression Rules](boolean.md).
