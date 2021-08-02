---
id: expression.md
title: Predicate Expressions
---

# Predicate Expressions
A predicate is an expression evaluated to a Boolean value. Milvus conducts scalar filtering by searching with predicates. A predicate expression, when evaluated, returns either TRUE or FALSE.

View <a href="/api-reference/pymilvus-orm/2.0.0rc2/api/collection.html">Python SDK API Reference</a> for information about how to use predicate expressions.

# Predicate Grammers
Expression can be either NONE or a logic expression.
```haskell
Expr := LogicalExpr | NIL
```

## Types of predicate operators
<table>
<thead>
  <tr>
    <th>operator type</th>
    <th>Description</th>
    <th>Examples</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Relational Expression</td>
    <td>Relational operators use symbols to check for equality, inequality, or relative order between two expressions. Relational operators include: >, >=, <, <=, ==, !=.</td>
    <td>
      <ul>
        <li>A > 1</li>
        <li>B >= 2</li>
        <li>C < 3</li>
        <li>D <= 4</li>
        <li>E == 5</li>
        <li>F != 6</li>
        </ul>
      </td>
  </tr>
  <tr>
    <td>Logical operators</td>
    <td>An operator that performs a comparison between two expression. The supported logical operators are: AND, && OR, ||, and NOT.</td>
    <td>   
    <ul>
       <li>A > 3 && A < 4</li>
       <li>NOT (A == 1)</li>
    </ul></td></td>
   </tr>
  <tr>
    <td>IN Expression</td>
    <td>The IN condition is satisfied when the expression to the left of the keyword IN is included in the list of items.</td>
    <td><ul>
        <li>FloatCol in [1.0, 2, 3.0]</li>
        <li>Int64Col in [1, 2, 3] </li>
        </ul></td>
  </tr>
</tbody>
</table>

# Relational operators
The relational operators are symbols that compare one expression with another expression. Data type between left and right side of the operator must match.

The supported operators are:

<ul>
<li>equals(==)
<li>not equals(!=)
<li>is greater than (>)
<li>is greater than or equal to (>=)
<li>is less than (<)
<li>is less than or equal to (<=)
</ul>

# IN Operator
The IN operator matches the values in a field to any of the items in the constant array. The items in the constant array must be a comma-separated list. Data type between left and right side of the operator must match.

## Syntax
```haskell
InExpr := IDENTIFIER "in" ConstantArray
ConstantArray := "[" Constant+, "]"
```

# Logical operators
There are two types of logical operators, unary and binray. UnaryLogicalOp act on another logical expression, while BinaryLogicalOp compare one logic expression with another logic expression.

The supported operators are:
<ul>
<li>NOT !
<li>AND &&
<li>OR ||
</ul>

## Syntax
```haskell
LogicalExpr := LogicalExpr BinaryLogicalOp LogicalExpr
  | UnaryLogicalOp LogicalExpr
  | "(" LogicalExpr ")"
  | RelationalExpr
  | InExpr
```

## Order of evaluation
The order in which the Milvus evaluates predicate expressions follows the table below:

1. Expressions inside parentheses
2. Not operators
3. Or operators
4. And Operators
