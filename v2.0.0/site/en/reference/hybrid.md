---
id: hybrid.md
title: Hybrid Search
---

# Hybrid Search 

## Introduction
In addition to vectors, Milvus supports data types such as boolean, integers, floating-point numbers, and more. A collection in Milvus can hold multiple fields for accommodating different data features or properties. Milvus pairs scalar filtering with powerful vector similarity search to offer a modern, flexible platform for analyzing unstructured data. 

A hybrid search is a vector similarity search, during which you can filter the scalar data by specifying a boolean expression.

This article begins with a sample code, and then moves on to introduce the boolean expression rules.

## Sample code
Use the sample code of a hybrid search below to carry out vector similarity search on entities whose `film_id` is in  [2,4,6,8].

```Python
from pymilvus_orm import connections, Collection, FieldSchema, CollectionSchema, DataType
>>> import random
>>> connections.connect()
>>> schema = CollectionSchema([
...     FieldSchema("film_id", DataType.INT64, is_primary=True),
...     FieldSchema("films", dtype=DataType.FLOAT_VECTOR, dim=2)
... ])
>>> collection = Collection("test_collection_search", schema)
>>> # insert
>>> data = [
...     [i for i in range(10)],
...     [[random.random() for _ in range(2)] for _ in range(10)],
... ]
>>> collection.insert(data)
>>> collection.num_entities
10
>>> collection.load()
>>> # search
>>> search_param = {
...     "data": [[1.0, 1.0]],
...     "anns_field": "films",
...     "param": {"metric_type": "L2"},
...     "limit": 2,
...     "expr": "film_id in [2,4,6,8]",
... }
>>> res = collection.search(**search_param)
>>> assert len(res) == 1
>>> hits = res[0]
>>> assert len(hits) == 2
>>> print(f"- Total hits: {len(hits)}, hits ids: {hits.ids} ")
- Total hits: 2, hits ids: [2, 4]
>>> print(f"- Top1 hit id: {hits[0].id}, distance: {hits[0].distance}, score: {hits[0].score} ")
- Top1 hit id: 2, distance: 0.10143111646175385, score: 0.101431116461
```

## Boolean Expression Rules
[EBNF](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form) grammar rules describes boolean expressions rules. Boolean expression rules are as follows:

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

The following table lists the description of each symbol in the above Boolean expression rules.


| **Notation**      | **Description** |
| ----------- | ----------- |
| ,      | Concatenation       |
| ;      | Termination        |
| |      | Alternation       |
| {...}   | Repetition        |
| (...)      | Grouping       |
| NIL   | Empty. The expression can be an empty string.        |
| INTEGER      | Intergers such as 1, 2, 3.       |
| FLOAT   | Float nubmers such as 1.0, 2.0.        |
| CONST      | Intergers or float numbers.       |
| IDENTIFIER   | Identifier. In Milvus, this represents the field name.        |
| LogicalOp      | Logical operators allow the combining of more than one relational test in one comparison. Logical operators return a TRUE (1) or FALSE (0) value. LogicalOp include BinaryLogicalOp and UnaryLogicalOp.       |
| UnaryLogicalOp   | Unary logical operator, "not".        |
| BinaryLogicalOp   | Text        |
| Header      | Binary logical operators that perform actions with two operands. In a complex expression, (two or more operands) the order of evaluation depends on precedence rules.       |
| ArithmeticOp   | Arithmetic operators perform mathematical operations such as addition and subtraction with operands.         |
| UnaryArithOp      | Unary operators are arithmetic operators that perform an action on a single operand.The negative unary operator reverses the sign of an expression from positive to negative or vice versa.       |
| BinaryArithOp   | Binary operators perform actions with two operands. In a complex expression, (two or more operands) the order of evaluation depends on precedence rules.        |
| CmpOp   | Relational operators perform actions with two operands.        |
| CmpOpRestricted      |  Restricted to "Less than" and "Equal".       |
| ConstantExpr   | ConstantExpr can be a Constant or a BinaryArithop on two ConstExpr or an UnaryArithOp on a single ConstantExpr. It is defined recursively.        |
| ConstantArray      | ConstantArray is wrapped with a pair of square brackets, and ConstantExpr can be repeated in the square brackets. ConstArray must include at least 1 ConstantExpr.       |
| TermExpr   | TermExpr is used to check whether the value of an Identifier appears in a ConstantArray. TermExpr is represented by "in".        |
| CompareExpr      | Abbreviation of comparison expression. CompareExpr can be relational operations on two indeifiers, or relational operations on one identifier and one ConstantExpr, or ternary operation performed on two ConstantExprs and one identifier.       |
| SingleExpr   | Single expression. SingleExpr can be TermExpr or CompareExpr.        |
| LogicalExpr      | Logical expression. LogicalExpr can be a BinaryLogicalOp on two LogicalExprs, or an UnaryLogicalOp on a single LogicalExpr or a grouped LogicalExpr or a SingleExpr. It is defined recursively.       |
| Expr   | Abbreviation of expression. Expr can be LogicalExpr or NIL.        |

### Operators

**Logical operators:** 

<table>
    <tr>
        <td><b>Symbol</b></td>
        <td><b>Operation</b></td>
        <td><b>Example</b></td>
        <td><b>Description</b></td>
    </tr>
    <tr>
        <td>'and' &amp;&amp;</td>
        <td>and</td>
        <td>expr1 &amp;&amp; expr2</td>
        <td>True if both expr1 and expr2 are true.</td>
    </tr>
    <tr>
        <td>'or' ||</td>
        <td>or</td>
        <td>expr1 || expr2</td>
        <td>True if either expr1 or expr2 are true. </td>
    </tr>
</table>

**Binary arithmetic operators:** 

| **Symbol**| **Operation** | **Example** | **Description**           |
| ----------| ------------- | ----------- | ------------------------- |
| +         | Addition      | a + b       | Add the two operands.     |
| -         | Subtraction   | a - b       | Subtract the second operand from the first operand.  |
| *         | Multiplication| a * b       | Multiply the two operands.     |
| /         | Division      | a / b       | Divide the first operand by the second operand.     |
| **        | Power         | a ** b      | Raise the first operand to the power of the second operand.     |
| %         | Modulo        | a % b       | Divide the first operand by the second operand and yield the remainder portion.    |


**Relational operators:**

| **Symbol**| **Operation** | **Example** | **Description**           |
| ----------| ------------- | ----------- | ------------------------- |
| <         | Less than      | a < b      | True if a is less than b.     |
| >         | Greater than   | a > b       | True if a is greater than b.  |
| ==        | Equal          | a == b      | True if a is equal to b.    |
| !=        | Not equal       | a != b     | True if a is not equal to b.     |
| <=        | Less than or equal          | a <= b     | True if a is less than or equal to b.     |
| >=        | Greater than or equal         | a >= b      | True if a is greater than or equal to b.    |


### Operator precedence and associativity

The following table lists the precedence and associativity of operators. Operators are listed top to bottom, in descending precedence.

<table>
    <tr>
        <td><b>Precedence</b></td>
        <td><b>Operator</b></td>
        <td><b>Description</b></td>
        <td><b>Associativity</b></td>
    </tr>
    <tr>
        <td>1</td>
        <td>+ -  </td>
        <td>UnaryArithOp</td>
        <td>Left-to-right</td>
    </tr>
    <tr>
        <td>2</td>
        <td>not</td>
        <td>UnaryLogicOp</td>
        <td>Right-to-left</td>
    </tr>
    <tr>
        <td>3</td>
        <td>**</td>
        <td>BinaryArithOp</td>
        <td>Left-to-right</td>
    </tr>
    <tr>
        <td>4</td>
        <td>* / %</td>
        <td>BinaryArithOp</td>
        <td>Left-to-right</td>
    </tr>
    <tr>
        <td>5</td>
        <td>+ -</td>
        <td>BinaryArithOp</td>
        <td>Left-to-right</td>
    </tr>
    <tr>
        <td>6</td>
        <td>&lt; &lt;= &gt; &gt;= </td>
        <td>CmpOp</td>
        <td>Left-to-right</td>
    </tr>
    <tr>
        <td>7</td>
        <td>== != </td>
        <td>CmpOp</td>
        <td>Left-to-right</td>
    </tr>
    <tr>
        <td>8</td>
        <td>&amp;&amp; and </td>
        <td>BinaryLogicOp</td>
        <td>Left-to-right</td>
    </tr>
    <tr>
        <td>9</td>
        <td>|| or  </td>
        <td>BinaryLogicOp</td>
        <td>Left-to-right</td>
    </tr>
</table>

Expressions are normally evaluated from left to right. Complex expressions are evaluated one at a time. The order in which the expressions are evaluated is determined by the precedence of the operators used. 

If an expression contains two or more operators with the same precedence, the operator to the left is evaluated first. 

<div class="alert note">
For example, 10 / 2 * 5 will be evaluated as (10 / 2) and the result multiplied by 5. 
</div>

When a lower precedence operation should be processed first, it should be enclosed within parentheses. 

<div class="alert note">
For example, 30 / 2 + 8. This is normally evaluated as 30 divided by 2 then 8 added to the result. If you want to divide by 2 + 8, it should be written as 30 / (2 + 8). 
</div>


Parentheses can be nested within expressions. Innermost parenthetical expressions are evaluated first.