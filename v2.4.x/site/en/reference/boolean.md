---
id: boolean.md
summary: Learn about boolean expression rules in Milvus.
title: Scalar Filtering Rules
---

# Scalar Filtering Rules

## Overview

A predicate expression outputs a boolean value. Milvus conducts scalar filtering by searching with predicates. A predicate expression, when evaluated, returns either TRUE or FALSE. View [Python SDK API Reference](/api-reference/pymilvus/v2.4.x/About.md) for instruction on using predicate expressions.

[EBNF](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form) grammar rules describe boolean expressions rules:

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
Constant = INTEGER | FLOAT
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
MatchOp = "like" | "LIKE";
JsonArrayOps = JsonDefs "(" IDENTIFIER "," JsonExpr | JsonArray ")";
JsonArrayDefs = "json_contains" | "JSON_CONTAINS" 
           | "json_contains_all" | "JSON_CONTAINS_ALL" 
           | "json_contains_any" | "JSON_CONTAINS_ANY";
JsonExpr =  Constant | ConstantArray | STRING | BOOLEAN;
JsonArray = "[" JsonExpr { "," JsonExpr } "]";
ArrayOps = ArrayDefs "(" IDENTIFIER "," ArrayExpr | Array ")";
ArrayDefs = "array_contains" | "ARRAY_CONTAINS" 
           | "array_contains_all" | "ARRAY_CONTAINS_ALL" 
           | "array_contains_any" | "ARRAY_CONTAINS_ANY"
           | "array_length"       | "ARRAY_LENGTH";
ArrayExpr =  Constant | ConstantArray | STRING | BOOLEAN;
Array = "[" ArrayExpr { "," ArrayExpr } "]";
```

The following table lists the description of each symbol mentioned in the above Boolean expression rules.


| Notation      | Description |
| ----------- | ----------- |
| =      | Definition.       |
| ,      | Concatenation.       |
| ;      | Termination.        |
| &#124;      | Alternation.       |
| {...}   | Repetition.        |
| (...)      | Grouping.       |
| NIL   | Empty. The expression can be an empty string.        |
| INTEGER      | Integers such as 1, 2, 3.       |
| FLOAT   | Float numbers such as 1.0, 2.0.        |
| CONST      | Integers or float numbers.       |
| IDENTIFIER   | Identifier. In Milvus, the IDENTIFIER represents the field name.        |
| LogicalOp      | A LogicalOp is a logical operator that supports combining more than one relational operation in one comparison. Returned value of a LogicalOp is either TRUE (1) or FALSE (0). There are two types of LogicalOps, including BinaryLogicalOps and UnaryLogicalOps.    |
| UnaryLogicalOp   | UnaryLogicalOp refers to the unary logical operator "not".        |
| BinaryLogicalOp   |  Binary logical operators that perform actions on two operands. In a complex expression with two or more operands, the order of evaluation depends on precedence rules.       |
| ArithmeticOp   | An ArithmeticOp, namely an arithmetic operator, performs mathematical operations such as addition and subtraction on operands.         |
| UnaryArithOp      | A UnaryArithOp is an arithmetic operator that performs an operation on a single operand. The negative UnaryArithOp changes a positive expression into a negative one, or the other way round.      |
| BinaryArithOp   | A BinaryArithOp, namely a binary operator, performs operations on two operands. In a complex expression with two or more operands, the order of evaluation depends on precedence rules.        |
| CmpOp   | CmpOp is a relational operator that perform actions on two operands.        |
| CmpOpRestricted      |  CmpOpRestricted is restricted to "Less than" and "Equal".       |
| ConstantExpr   | ConstantExpr can be a Constant or a BinaryArithOp on two ConstExprs or a UnaryArithOp on a single ConstantExpr. It is defined recursively.        |
| ConstantArray      | ConstantArray is wrapped by square brackets, and ConstantExpr can be repeated in the square brackets. ConstArray must include at least one ConstantExpr.       |
| TermExpr   | TermExpr is used to check whether the value of an IDENTIFIER appears in a ConstantArray. TermExpr is represented by "in".        |
| CompareExpr      | A CompareExpr, namely comparison expression can be relational operations on two IDENTIFIERs, or relational operations on one IDENTIFIER and one ConstantExpr, or ternary operation on two ConstantExprs and one IDENTIFIER.       |
| SingleExpr   |  SingleExpr, namely single expression, can be either a TermExpr or a CompareExpr.      |
| LogicalExpr      | A LogicalExpr can be a BinaryLogicalOp on two LogicalExprs, or a UnaryLogicalOp on a single LogicalExpr, or a LogicalExpr grouped within parentheses, or a SingleExpr. The LogicalExpr is defined recursively.    |
| Expr   | Expr, an abbreviation meaning expression, can be LogicalExpr or NIL. |
| MatchOp   | A MatchOp, namely a match operator, compares a string to a string constant or a string prefix, infix, or suffix constant. |
| JsonArrayOp | A JsonOp, namely a JSON operator, checks whether the specified identifier contains the specified elements. |
| ArrayOp | An ArrayOp, namely an array operator, checks whether the specified identifier contains the specified elements. |

## Operators

### Logical operators

Logical operators perform a comparison between two expressions. 

| Symbol| Operation | Example | Description          |
| ----------| ------------- | ----------- | ------------------------- |
| 'and' &&  | and           | expr1 && expr2   | True if both expr1 and expr2 are true. |
| 'or' &#124;&#124;  | or           | expr1 &#124;&#124; expr2     | True if either expr1 or expr2 are true.  |

### Binary arithmetic operators

Binary arithmetic operators contain two operands and can perform basic arithmetic operations and return the corresponding result. 

| Symbol| Operation | Example | Description          |
| ----------| ------------- | ----------- | ------------------------- |
| +         | Addition      | a + b       | Add the two operands.     |
| -         | Subtraction   | a - b       | Subtract the second operand from the first operand.  |
| *         | Multiplication| a * b       | Multiply the two operands.     |
| /         | Division      | a / b       | Divide the first operand by the second operand.     |
| **        | Power         | a ** b      | Raise the first operand to the power of the second operand.     |
| %         | Modulo        | a % b       | Divide the first operand by the second operand and yield the remainder portion.    |

### Relational operators

Relational operators use symbols to check for equality, inequality, or relative order between two expressions. 

| Symbol| Operation | Example | Description         |
| ----------| ------------- | ----------- | ------------------------- |
| <         | Less than      | a < b      | True if a is less than b.     |
| >         | Greater than   | a > b       | True if a is greater than b.  |
| ==        | Equal          | a == b      | True if a is equal to b.    |
| !=        | Not equal       | a != b     | True if a is not equal to b.     |
| <=        | Less than or equal          | a <= b     | True if a is less than or equal to b.     |
| >=        | Greater than or equal         | a >= b      | True if a is greater than or equal to b.    |

## Operator precedence and associativity

The following table lists the precedence and associativity of operators. Operators are listed top to bottom, in descending precedence.

| Precedence | Operator                              | Description   | Associativity |
|------------|---------------------------------------|---------------|---------------|
| 1          | + -                                   | UnaryArithOp  | Left-to-right |
| 2          | not                                   | UnaryLogicOp  | Right-to-left |
| 3          | **                                    | BinaryArithOp | Left-to-right |
| 4          | * / %                                 | BinaryArithOp | Left-to-right |
| 5          | + -                                   | BinaryArithOp | Left-to-right |
| 6          | < <= > >=                             | CmpOp         | Left-to-right |
| 7          | == !=                                 | CmpOp         | Left-to-right |
| 8          | like LIKE                             | MatchOp       | Left-to-right |
| 9          | json_contains JSON_CONTAINS           | JsonArrayOp   | Left-to-right |
| 9          | array_contains ARRAY_CONTAINS         | ArrayOp       | Left-to-right |
| 10         | json_contains_all JSON_CONTAINS_ALL   | JsonArrayOp   | Left-to-right |
| 10         | array_contains_all ARRAY_CONTAINS_ALL | ArrayOp       | Left-to-right |
| 11         | json_contains_any JSON_CONTAINS_ANY   | JsonArrayOp   | Left-to-right |
| 11         | array_contains_any ARRAY_CONTAINS_ANY | ArrayOp       | Left-to-right |
| 12         | array_length  ARRAY_LENGTH            | ArrayOp       | Left-to-right |
| 13         | && and                                | BinaryLogicOp | Left-to-right |
| 14         | &#124;&#124; or                               | BinaryLogicOp | Left-to-right |

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

## Usage

Samples of all available boolean expression usage in Milvus are listed as follows (`int64` represents the scalar field that contains data of INT64 type,  `float` represents the scalar field that contains data of floating-point type, and `VARCHAR` represents the scalar field that contains data of VARCHAR  type):

1. CmpOp

```
"int64 > 0"
```

```
"0 < int64 < 400"
```

```
"500 <= int64 < 1000"
```

```
VARCHAR > "str1"
```

2. BinaryLogicalOp and parentheses

```
"(int64 > 0 && int64 < 400) or (int64 > 500 && int64 < 1000)"
```

3. TermExpr and UnaryLogicOp

```
"int64 not in [1, 2, 3]"
```

```
VARCHAR not in ["str1", "str2"]
```


4. TermExpr, BinaryLogicalOp, and CmpOp (on different fields)

```
"int64 in [1, 2, 3] and float != 2"
```

5. BinaryLogicalOp and CmpOp

```
"int64 == 0 || int64 == 1 || int64 == 2"
```

6. CmpOp and UnaryArithOp or BinaryArithOp

```
"200+300 < int64 <= 500+500"
```

7. MatchOp

```
VARCHAR like "prefix%"
VARCHAR like "%suffix"
VARCHAR like "%middle%"
VARCHAR like "_suffix"
```

8. JsonArrayOp

- `JSON_CONTAINS(identifier, JsonExpr)`

    If the JSON expression of a `JSON_CONTAINS` (the second argument) statement is a list, the identifier (the first argument) should be list of list. Otherwise, the statement always evaluates to False.

    ```python
    # {"x": [1,2,3]}
    json_contains(x, 1) # ==> true
    json_contains(x, "a") # ==> false
        
    # {"x": [[1,2,3], [4,5,6], [7,8,9]]}
    json_contains(x, [1,2,3]) # ==> true
    json_contains(x, [3,2,1]) # ==> false
    ```

- `JSON_CONTAINS_ALL(identifier, JsonExpr)`

    The JSON expression in a `JSON_CONTAINS_ALL` statement should always be a list.

    ```python
    # {"x": [1,2,3,4,5,7,8]}
    json_contains_all(x, [1,2,8]) # ==> true
    json_contains_all(x, [4,5,6]) # ==> false 6 is not exists
    ```

- `JSON_CONTAINS_ANY(identifier, JsonExpr)`

    The JSON expression in a `JSON_CONTAINS_ANY` statement should always be a list. Otherwise, it acts the same as `JSON_CONTAINS`.

    ```python
    # {"x": [1,2,3,4,5,7,8]}
    json_contains_any(x, [1,2,8]) # ==> true
    json_contains_any(x, [4,5,6]) # ==> true
    json_contains_any(x, [6,9]) # ==> false
    ```

9. ArrayOp

- `ARRAY_CONTAINS(identifier, ArrayExpr)`

    If the array expression of an `ARRAY_CONTAINS` (the second argument) statement is a list, the identifier (the first argument) should be list of list. Otherwise, the statement always evaluates to False.

    ```python
    # 'int_array': [1,2,3]
    array_contains(int_array, 1) # ==> true
    array_contains(int_array, "a") # ==> false
    ```

- `ARRAY_CONTAINS_ALL(identifier, ArrayExpr)`

    The array expression in an `ARRAY_CONTAINS_ALL` statement should always be a list.

    ```python
    # "int_array": [1,2,3,4,5,7,8]
    array_contains_all(int_array, [1,2,8]) # ==> true
    array_contains_all(int_array, [4,5,6]) # ==> false 6 is not exists
    ```

- `ARRAY_CONTAINS_ANY(identifier, ArrayExpr)`

    The array expression in an `ARRAY_CONTAINS_ANY` statement should always be a list. Otherwise, it acts the same as `ARRAY_CONTAINS`.

    ```python
    # "int_array": [1,2,3,4,5,7,8]
    array_contains_any(int_array, [1,2,8]) # ==> true
    array_contains_any(int_array, [4,5,6]) # ==> true
    array_contains_any(int_array, [6,9]) # ==> false
    ```

- `ARRAY_LENGTH(identifier)`

    Check the number of elements in an array.

    ```python
    # "int_array": [1,2,3,4,5,7,8]
    array_length(int_array) # ==> 7
    ```

## What's next

Now that you know how bitsets work in Milvus, you might also want to:

- Learn how to conduct a [Hybrid Search](multi-vector-search.md).
- Learn how to [use strings to filter](https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md) your search results.
- Learn how to [use dynamic fields in building boolean expressions](enable-dynamic-field.md).
