---
id: boolean.md
summary: Learn about boolean expression rules in Milvus.
title: Scalar Filtering Rules
---
<h1 id="Scalar-Filtering-Rules" class="common-anchor-header">Scalar Filtering Rules<button data-href="#Scalar-Filtering-Rules" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><h2 id="Overview" class="common-anchor-header">Overview<button data-href="#Overview" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>A predicate expression outputs a boolean value. Milvus conducts scalar filtering by searching with predicates. A predicate expression, when evaluated, returns either TRUE or FALSE. View <a href="/api-reference/pymilvus/v2.4.x/About.md">Python SDK API Reference</a> for instruction on using predicate expressions.</p>
<p><a href="https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form">EBNF</a> grammar rules describe boolean expressions rules:</p>
<pre><code translate="no">Expr = LogicalExpr | NIL
LogicalExpr = LogicalExpr BinaryLogicalOp LogicalExpr 
              | UnaryLogicalOp LogicalExpr
              | <span class="hljs-string">&quot;(&quot;</span> LogicalExpr <span class="hljs-string">&quot;)&quot;</span>
              | SingleExpr;
BinaryLogicalOp = <span class="hljs-string">&quot;&amp;&amp;&quot;</span> | <span class="hljs-string">&quot;and&quot;</span> | <span class="hljs-string">&quot;||&quot;</span> | <span class="hljs-string">&quot;or&quot;</span>;
UnaryLogicalOp = <span class="hljs-string">&quot;not&quot;</span>;
SingleExpr = TermExpr | CompareExpr;
TermExpr = IDENTIFIER <span class="hljs-string">&quot;in&quot;</span> ConstantArray;
Constant = INTEGER | FLOAT
ConstantExpr = Constant
               | ConstantExpr BinaryArithOp ConstantExpr
               | UnaryArithOp ConstantExpr;
                                                          
ConstantArray = <span class="hljs-string">&quot;[&quot;</span> ConstantExpr { <span class="hljs-string">&quot;,&quot;</span> ConstantExpr } <span class="hljs-string">&quot;]&quot;</span>;
UnaryArithOp = <span class="hljs-string">&quot;+&quot;</span> | <span class="hljs-string">&quot;-&quot;</span>
BinaryArithOp = <span class="hljs-string">&quot;+&quot;</span> | <span class="hljs-string">&quot;-&quot;</span> | <span class="hljs-string">&quot;*&quot;</span> | <span class="hljs-string">&quot;/&quot;</span> | <span class="hljs-string">&quot;%&quot;</span> | <span class="hljs-string">&quot;**&quot;</span>;
CompareExpr = IDENTIFIER CmpOp IDENTIFIER
              | IDENTIFIER CmpOp ConstantExpr
              | ConstantExpr CmpOp IDENTIFIER
              | ConstantExpr CmpOpRestricted IDENTIFIER CmpOpRestricted ConstantExpr;
CmpOpRestricted = <span class="hljs-string">&quot;&lt;&quot;</span> | <span class="hljs-string">&quot;&lt;=&quot;</span>;
CmpOp = <span class="hljs-string">&quot;&gt;&quot;</span> | <span class="hljs-string">&quot;&gt;=&quot;</span> | <span class="hljs-string">&quot;&lt;&quot;</span> | <span class="hljs-string">&quot;&lt;=&quot;</span> | <span class="hljs-string">&quot;==&quot;</span>| <span class="hljs-string">&quot;!=&quot;</span>;
MatchOp = <span class="hljs-string">&quot;like&quot;</span> | <span class="hljs-string">&quot;LIKE&quot;</span>;
JsonArrayOps = JsonDefs <span class="hljs-string">&quot;(&quot;</span> IDENTIFIER <span class="hljs-string">&quot;,&quot;</span> JsonExpr | JsonArray <span class="hljs-string">&quot;)&quot;</span>;
JsonArrayDefs = <span class="hljs-string">&quot;json_contains&quot;</span> | <span class="hljs-string">&quot;JSON_CONTAINS&quot;</span> 
           | <span class="hljs-string">&quot;json_contains_all&quot;</span> | <span class="hljs-string">&quot;JSON_CONTAINS_ALL&quot;</span> 
           | <span class="hljs-string">&quot;json_contains_any&quot;</span> | <span class="hljs-string">&quot;JSON_CONTAINS_ANY&quot;</span>;
JsonExpr =  Constant | ConstantArray | STRING | BOOLEAN;
JsonArray = <span class="hljs-string">&quot;[&quot;</span> JsonExpr { <span class="hljs-string">&quot;,&quot;</span> JsonExpr } <span class="hljs-string">&quot;]&quot;</span>;
ArrayOps = ArrayDefs <span class="hljs-string">&quot;(&quot;</span> IDENTIFIER <span class="hljs-string">&quot;,&quot;</span> ArrayExpr | Array <span class="hljs-string">&quot;)&quot;</span>;
ArrayDefs = <span class="hljs-string">&quot;array_contains&quot;</span> | <span class="hljs-string">&quot;ARRAY_CONTAINS&quot;</span> 
           | <span class="hljs-string">&quot;array_contains_all&quot;</span> | <span class="hljs-string">&quot;ARRAY_CONTAINS_ALL&quot;</span> 
           | <span class="hljs-string">&quot;array_contains_any&quot;</span> | <span class="hljs-string">&quot;ARRAY_CONTAINS_ANY&quot;</span>
           | <span class="hljs-string">&quot;array_length&quot;</span>       | <span class="hljs-string">&quot;ARRAY_LENGTH&quot;</span>;
ArrayExpr =  Constant | ConstantArray | STRING | BOOLEAN;
Array = <span class="hljs-string">&quot;[&quot;</span> ArrayExpr { <span class="hljs-string">&quot;,&quot;</span> ArrayExpr } <span class="hljs-string">&quot;]&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<p>The following table lists the description of each symbol mentioned in the above Boolean expression rules.</p>
<table>
<thead>
<tr><th>Notation</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td>=</td><td>Definition.</td></tr>
<tr><td>,</td><td>Concatenation.</td></tr>
<tr><td>;</td><td>Termination.</td></tr>
<tr><td>|</td><td>Alternation.</td></tr>
<tr><td>{…}</td><td>Repetition.</td></tr>
<tr><td>(…)</td><td>Grouping.</td></tr>
<tr><td>NIL</td><td>Empty. The expression can be an empty string.</td></tr>
<tr><td>INTEGER</td><td>Integers such as 1, 2, 3.</td></tr>
<tr><td>FLOAT</td><td>Float numbers such as 1.0, 2.0.</td></tr>
<tr><td>CONST</td><td>Integers or float numbers.</td></tr>
<tr><td>IDENTIFIER</td><td>Identifier. In Milvus, the IDENTIFIER represents the field name.</td></tr>
<tr><td>LogicalOp</td><td>A LogicalOp is a logical operator that supports combining more than one relational operation in one comparison. Returned value of a LogicalOp is either TRUE (1) or FALSE (0). There are two types of LogicalOps, including BinaryLogicalOps and UnaryLogicalOps.</td></tr>
<tr><td>UnaryLogicalOp</td><td>UnaryLogicalOp refers to the unary logical operator "not".</td></tr>
<tr><td>BinaryLogicalOp</td><td>Binary logical operators that perform actions on two operands. In a complex expression with two or more operands, the order of evaluation depends on precedence rules.</td></tr>
<tr><td>ArithmeticOp</td><td>An ArithmeticOp, namely an arithmetic operator, performs mathematical operations such as addition and subtraction on operands.</td></tr>
<tr><td>UnaryArithOp</td><td>A UnaryArithOp is an arithmetic operator that performs an operation on a single operand. The negative UnaryArithOp changes a positive expression into a negative one, or the other way round.</td></tr>
<tr><td>BinaryArithOp</td><td>A BinaryArithOp, namely a binary operator, performs operations on two operands. In a complex expression with two or more operands, the order of evaluation depends on precedence rules.</td></tr>
<tr><td>CmpOp</td><td>CmpOp is a relational operator that perform actions on two operands.</td></tr>
<tr><td>CmpOpRestricted</td><td>CmpOpRestricted is restricted to “Less than” and "Equal".</td></tr>
<tr><td>ConstantExpr</td><td>ConstantExpr can be a Constant or a BinaryArithOp on two ConstExprs or a UnaryArithOp on a single ConstantExpr. It is defined recursively.</td></tr>
<tr><td>ConstantArray</td><td>ConstantArray is wrapped by square brackets, and ConstantExpr can be repeated in the square brackets. ConstArray must include at least one ConstantExpr.</td></tr>
<tr><td>TermExpr</td><td>TermExpr is used to check whether the value of an IDENTIFIER appears in a ConstantArray. TermExpr is represented by "in".</td></tr>
<tr><td>CompareExpr</td><td>A CompareExpr, namely comparison expression can be relational operations on two IDENTIFIERs, or relational operations on one IDENTIFIER and one ConstantExpr, or ternary operation on two ConstantExprs and one IDENTIFIER.</td></tr>
<tr><td>SingleExpr</td><td>SingleExpr, namely single expression, can be either a TermExpr or a CompareExpr.</td></tr>
<tr><td>LogicalExpr</td><td>A LogicalExpr can be a BinaryLogicalOp on two LogicalExprs, or a UnaryLogicalOp on a single LogicalExpr, or a LogicalExpr grouped within parentheses, or a SingleExpr. The LogicalExpr is defined recursively.</td></tr>
<tr><td>Expr</td><td>Expr, an abbreviation meaning expression, can be LogicalExpr or NIL.</td></tr>
<tr><td>MatchOp</td><td>A MatchOp, namely a match operator, compares a string to a string constant or a string prefix, infix, or suffix constant.</td></tr>
<tr><td>JsonArrayOp</td><td>A JsonOp, namely a JSON operator, checks whether the specified identifier contains the specified elements.</td></tr>
<tr><td>ArrayOp</td><td>An ArrayOp, namely an array operator, checks whether the specified identifier contains the specified elements.</td></tr>
</tbody>
</table>
<h2 id="Operators" class="common-anchor-header">Operators<button data-href="#Operators" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><h3 id="Logical-operators" class="common-anchor-header">Logical operators</h3><p>Logical operators perform a comparison between two expressions.</p>
<table>
<thead>
<tr><th>Symbol</th><th>Operation</th><th>Example</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td>‘and’ &&</td><td>and</td><td>expr1 && expr2</td><td>True if both expr1 and expr2 are true.</td></tr>
<tr><td>‘or’ ||</td><td>or</td><td>expr1 || expr2</td><td>True if either expr1 or expr2 are true.</td></tr>
</tbody>
</table>
<h3 id="Binary-arithmetic-operators" class="common-anchor-header">Binary arithmetic operators</h3><p>Binary arithmetic operators contain two operands and can perform basic arithmetic operations and return the corresponding result.</p>
<table>
<thead>
<tr><th>Symbol</th><th>Operation</th><th>Example</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td>+</td><td>Addition</td><td>a + b</td><td>Add the two operands.</td></tr>
<tr><td>-</td><td>Subtraction</td><td>a - b</td><td>Subtract the second operand from the first operand.</td></tr>
<tr><td>*</td><td>Multiplication</td><td>a * b</td><td>Multiply the two operands.</td></tr>
<tr><td>/</td><td>Division</td><td>a / b</td><td>Divide the first operand by the second operand.</td></tr>
<tr><td>**</td><td>Power</td><td>a ** b</td><td>Raise the first operand to the power of the second operand.</td></tr>
<tr><td>%</td><td>Modulo</td><td>a % b</td><td>Divide the first operand by the second operand and yield the remainder portion.</td></tr>
</tbody>
</table>
<h3 id="Relational-operators" class="common-anchor-header">Relational operators</h3><p>Relational operators use symbols to check for equality, inequality, or relative order between two expressions.</p>
<table>
<thead>
<tr><th>Symbol</th><th>Operation</th><th>Example</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><</td><td>Less than</td><td>a < b</td><td>True if a is less than b.</td></tr>
<tr><td>></td><td>Greater than</td><td>a > b</td><td>True if a is greater than b.</td></tr>
<tr><td>==</td><td>Equal</td><td>a == b</td><td>True if a is equal to b.</td></tr>
<tr><td>!=</td><td>Not equal</td><td>a != b</td><td>True if a is not equal to b.</td></tr>
<tr><td><=</td><td>Less than or equal</td><td>a <= b</td><td>True if a is less than or equal to b.</td></tr>
<tr><td>>=</td><td>Greater than or equal</td><td>a >= b</td><td>True if a is greater than or equal to b.</td></tr>
</tbody>
</table>
<h2 id="Operator-precedence-and-associativity" class="common-anchor-header">Operator precedence and associativity<button data-href="#Operator-precedence-and-associativity" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>The following table lists the precedence and associativity of operators. Operators are listed top to bottom, in descending precedence.</p>
<table>
<thead>
<tr><th>Precedence</th><th>Operator</th><th>Description</th><th>Associativity</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>+ -</td><td>UnaryArithOp</td><td>Left-to-right</td></tr>
<tr><td>2</td><td>not</td><td>UnaryLogicOp</td><td>Right-to-left</td></tr>
<tr><td>3</td><td>**</td><td>BinaryArithOp</td><td>Left-to-right</td></tr>
<tr><td>4</td><td>* / %</td><td>BinaryArithOp</td><td>Left-to-right</td></tr>
<tr><td>5</td><td>+ -</td><td>BinaryArithOp</td><td>Left-to-right</td></tr>
<tr><td>6</td><td>< <= > >=</td><td>CmpOp</td><td>Left-to-right</td></tr>
<tr><td>7</td><td>== !=</td><td>CmpOp</td><td>Left-to-right</td></tr>
<tr><td>8</td><td>like LIKE</td><td>MatchOp</td><td>Left-to-right</td></tr>
<tr><td>9</td><td>json_contains JSON_CONTAINS</td><td>JsonArrayOp</td><td>Left-to-right</td></tr>
<tr><td>9</td><td>array_contains ARRAY_CONTAINS</td><td>ArrayOp</td><td>Left-to-right</td></tr>
<tr><td>10</td><td>json_contains_all JSON_CONTAINS_ALL</td><td>JsonArrayOp</td><td>Left-to-right</td></tr>
<tr><td>10</td><td>array_contains_all ARRAY_CONTAINS_ALL</td><td>ArrayOp</td><td>Left-to-right</td></tr>
<tr><td>11</td><td>json_contains_any JSON_CONTAINS_ANY</td><td>JsonArrayOp</td><td>Left-to-right</td></tr>
<tr><td>11</td><td>array_contains_any ARRAY_CONTAINS_ANY</td><td>ArrayOp</td><td>Left-to-right</td></tr>
<tr><td>12</td><td>array_length  ARRAY_LENGTH</td><td>ArrayOp</td><td>Left-to-right</td></tr>
<tr><td>13</td><td>&& and</td><td>BinaryLogicOp</td><td>Left-to-right</td></tr>
<tr><td>14</td><td>|| or</td><td>BinaryLogicOp</td><td>Left-to-right</td></tr>
</tbody>
</table>
<p>Expressions are normally evaluated from left to right. Complex expressions are evaluated one at a time. The order in which the expressions are evaluated is determined by the precedence of the operators used.</p>
<p>If an expression contains two or more operators with the same precedence, the operator to the left is evaluated first.</p>
<div class="alert note">
<p>For example, 10 / 2 * 5 will be evaluated as (10 / 2) and the result multiplied by 5.</p>
</div>
<p>When a lower precedence operation should be processed first, it should be enclosed within parentheses.</p>
<div class="alert note">
<p>For example, 30 / 2 + 8. This is normally evaluated as 30 divided by 2 then 8 added to the result. If you want to divide by 2 + 8, it should be written as 30 / (2 + 8).</p>
</div>
<p>Parentheses can be nested within expressions. Innermost parenthetical expressions are evaluated first.</p>
<h2 id="Usage" class="common-anchor-header">Usage<button data-href="#Usage" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Samples of all available boolean expression usage in Milvus are listed as follows (<code translate="no">int64</code> represents the scalar field that contains data of INT64 type,  <code translate="no">float</code> represents the scalar field that contains data of floating-point type, and <code translate="no">VARCHAR</code> represents the scalar field that contains data of VARCHAR  type):</p>
<ol>
<li>CmpOp</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 &gt; 0&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"><span class="hljs-string">&quot;0 &lt; int64 &lt; 400&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"><span class="hljs-string">&quot;500 &lt;= int64 &lt; 1000&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"><span class="hljs-type">VARCHAR</span> <span class="hljs-operator">&gt;</span> &quot;str1&quot;
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>BinaryLogicalOp and parentheses</li>
</ol>
<pre><code translate="no">&quot;(int64 &gt; <span class="hljs-number">0</span> &amp;&amp; int64 &lt; <span class="hljs-number">400</span>) or (int64 &gt; <span class="hljs-number">500</span> &amp;&amp; int64 &lt; <span class="hljs-number">1000</span>)&quot;
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>TermExpr and UnaryLogicOp</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 not in [1, 2, 3]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">VARCHAR not in <span class="hljs-selector-attr">[<span class="hljs-string">&quot;str1&quot;</span>, <span class="hljs-string">&quot;str2&quot;</span>]</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="4">
<li>TermExpr, BinaryLogicalOp, and CmpOp (on different fields)</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 in [1, 2, 3] and float != 2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="5">
<li>BinaryLogicalOp and CmpOp</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 == 0 || int64 == 1 || int64 == 2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="6">
<li>CmpOp and UnaryArithOp or BinaryArithOp</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;200+300 &lt; int64 &lt;= 500+500&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="7">
<li>MatchOp</li>
</ol>
<pre><code translate="no"><span class="hljs-type">VARCHAR</span> <span class="hljs-keyword">like</span> &quot;prefix%&quot;
<span class="hljs-type">VARCHAR</span> <span class="hljs-keyword">like</span> &quot;%suffix&quot;
<span class="hljs-type">VARCHAR</span> <span class="hljs-keyword">like</span> &quot;%middle%&quot;
<span class="hljs-type">VARCHAR</span> <span class="hljs-keyword">like</span> &quot;_suffix&quot;
<button class="copy-code-btn"></button></code></pre>
<ol start="8">
<li>JsonArrayOp</li>
</ol>
<ul>
<li><p><code translate="no">JSON_CONTAINS(identifier, JsonExpr)</code></p>
<p>If the JSON expression of a <code translate="no">JSON_CONTAINS</code> (the second argument) statement is a list, the identifier (the first argument) should be list of list. Otherwise, the statement always evaluates to False.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># {&quot;x&quot;: [1,2,3]}</span>
json_contains(x, <span class="hljs-number">1</span>) <span class="hljs-comment"># ==&gt; true</span>
json_contains(x, <span class="hljs-string">&quot;a&quot;</span>) <span class="hljs-comment"># ==&gt; false</span>
    
<span class="hljs-comment"># {&quot;x&quot;: [[1,2,3], [4,5,6], [7,8,9]]}</span>
json_contains(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains(x, [<span class="hljs-number">3</span>,<span class="hljs-number">2</span>,<span class="hljs-number">1</span>]) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">JSON_CONTAINS_ALL(identifier, JsonExpr)</code></p>
<p>The JSON expression in a <code translate="no">JSON_CONTAINS_ALL</code> statement should always be a list.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># {&quot;x&quot;: [1,2,3,4,5,7,8]}</span>
json_contains_all(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains_all(x, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; false 6 is not exists</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">JSON_CONTAINS_ANY(identifier, JsonExpr)</code></p>
<p>The JSON expression in a <code translate="no">JSON_CONTAINS_ANY</code> statement should always be a list. Otherwise, it acts the same as <code translate="no">JSON_CONTAINS</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># {&quot;x&quot;: [1,2,3,4,5,7,8]}</span>
json_contains_any(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains_any(x, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains_any(x, [<span class="hljs-number">6</span>,<span class="hljs-number">9</span>]) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<ol start="9">
<li>ArrayOp</li>
</ol>
<ul>
<li><p><code translate="no">ARRAY_CONTAINS(identifier, ArrayExpr)</code></p>
<p>If the array expression of an <code translate="no">ARRAY_CONTAINS</code> (the second argument) statement is a list, the identifier (the first argument) should be list of list. Otherwise, the statement always evaluates to False.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &#x27;int_array&#x27;: [1,2,3]</span>
array_contains(int_array, <span class="hljs-number">1</span>) <span class="hljs-comment"># ==&gt; true</span>
array_contains(int_array, <span class="hljs-string">&quot;a&quot;</span>) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_CONTAINS_ALL(identifier, ArrayExpr)</code></p>
<p>The array expression in an <code translate="no">ARRAY_CONTAINS_ALL</code> statement should always be a list.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_contains_all(int_array, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_all(int_array, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; false 6 is not exists</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_CONTAINS_ANY(identifier, ArrayExpr)</code></p>
<p>The array expression in an <code translate="no">ARRAY_CONTAINS_ANY</code> statement should always be a list. Otherwise, it acts the same as <code translate="no">ARRAY_CONTAINS</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_contains_any(int_array, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_any(int_array, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_any(int_array, [<span class="hljs-number">6</span>,<span class="hljs-number">9</span>]) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_LENGTH(identifier)</code></p>
<p>Check the number of elements in an array.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_length(int_array) <span class="hljs-comment"># ==&gt; 7</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">What’s next<button data-href="#Whats-next" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Now that you know how bitsets work in Milvus, you might also want to:</p>
<ul>
<li>Learn how to conduct a <a href="/docs/v2.4.x/multi-vector-search.md">Hybrid Search</a>.</li>
<li>Learn how to <a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">use strings to filter</a> your search results.</li>
<li>Learn how to <a href="/docs/v2.4.x/enable-dynamic-field.md">use dynamic fields in building boolean expressions</a>.</li>
</ul>
