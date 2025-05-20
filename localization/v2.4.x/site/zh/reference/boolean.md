---
id: boolean.md
summary: 了解 Milvus 中的布尔表达规则。
title: 标量过滤规则
---

<h1 id="Scalar-Filtering-Rules" class="common-anchor-header">标量过滤规则<button data-href="#Scalar-Filtering-Rules" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>谓词表达式输出一个布尔值。Milvus 通过谓词搜索进行标量过滤。谓词表达式在求值时返回 TRUE 或 FALSE。有关使用谓词表达式的说明，请查看<a href="/api-reference/pymilvus/v2.4.x/About.md">Python SDK API 参考</a>。</p>
<p><a href="https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form">EBNF</a>语法规则描述了布尔表达式规则：</p>
<pre><code translate="no"><span class="hljs-title class_">Expr</span> = <span class="hljs-title class_">LogicalExpr</span> | <span class="hljs-variable constant_">NIL</span>
<span class="hljs-title class_">LogicalExpr</span> = <span class="hljs-title class_">LogicalExpr</span> <span class="hljs-title class_">BinaryLogicalOp</span> <span class="hljs-title class_">LogicalExpr</span> 
              | <span class="hljs-title class_">UnaryLogicalOp</span> <span class="hljs-title class_">LogicalExpr</span>
              | <span class="hljs-string">&quot;(&quot;</span> <span class="hljs-title class_">LogicalExpr</span> <span class="hljs-string">&quot;)&quot;</span>
              | <span class="hljs-title class_">SingleExpr</span>;
<span class="hljs-title class_">BinaryLogicalOp</span> = <span class="hljs-string">&quot;&amp;&amp;&quot;</span> | <span class="hljs-string">&quot;and&quot;</span> | <span class="hljs-string">&quot;||&quot;</span> | <span class="hljs-string">&quot;or&quot;</span>;
<span class="hljs-title class_">UnaryLogicalOp</span> = <span class="hljs-string">&quot;not&quot;</span>;
<span class="hljs-title class_">SingleExpr</span> = <span class="hljs-title class_">TermExpr</span> | <span class="hljs-title class_">CompareExpr</span>;
<span class="hljs-title class_">TermExpr</span> = <span class="hljs-variable constant_">IDENTIFIER</span> <span class="hljs-string">&quot;in&quot;</span> <span class="hljs-title class_">ConstantArray</span>;
<span class="hljs-title class_">Constant</span> = <span class="hljs-variable constant_">INTEGER</span> | <span class="hljs-variable constant_">FLOAT</span>
<span class="hljs-title class_">ConstantExpr</span> = <span class="hljs-title class_">Constant</span>
               | <span class="hljs-title class_">ConstantExpr</span> <span class="hljs-title class_">BinaryArithOp</span> <span class="hljs-title class_">ConstantExpr</span>
               | <span class="hljs-title class_">UnaryArithOp</span> <span class="hljs-title class_">ConstantExpr</span>;
                                                          
<span class="hljs-title class_">ConstantArray</span> = <span class="hljs-string">&quot;[&quot;</span> <span class="hljs-title class_">ConstantExpr</span> { <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-title class_">ConstantExpr</span> } <span class="hljs-string">&quot;]&quot;</span>;
<span class="hljs-title class_">UnaryArithOp</span> = <span class="hljs-string">&quot;+&quot;</span> | <span class="hljs-string">&quot;-&quot;</span>
<span class="hljs-title class_">BinaryArithOp</span> = <span class="hljs-string">&quot;+&quot;</span> | <span class="hljs-string">&quot;-&quot;</span> | <span class="hljs-string">&quot;*&quot;</span> | <span class="hljs-string">&quot;/&quot;</span> | <span class="hljs-string">&quot;%&quot;</span> | <span class="hljs-string">&quot;**&quot;</span>;
<span class="hljs-title class_">CompareExpr</span> = <span class="hljs-variable constant_">IDENTIFIER</span> <span class="hljs-title class_">CmpOp</span> <span class="hljs-variable constant_">IDENTIFIER</span>
              | <span class="hljs-variable constant_">IDENTIFIER</span> <span class="hljs-title class_">CmpOp</span> <span class="hljs-title class_">ConstantExpr</span>
              | <span class="hljs-title class_">ConstantExpr</span> <span class="hljs-title class_">CmpOp</span> <span class="hljs-variable constant_">IDENTIFIER</span>
              | <span class="hljs-title class_">ConstantExpr</span> <span class="hljs-title class_">CmpOpRestricted</span> <span class="hljs-variable constant_">IDENTIFIER</span> <span class="hljs-title class_">CmpOpRestricted</span> <span class="hljs-title class_">ConstantExpr</span>;
<span class="hljs-title class_">CmpOpRestricted</span> = <span class="hljs-string">&quot;&lt;&quot;</span> | <span class="hljs-string">&quot;&lt;=&quot;</span>;
<span class="hljs-title class_">CmpOp</span> = <span class="hljs-string">&quot;&gt;&quot;</span> | <span class="hljs-string">&quot;&gt;=&quot;</span> | <span class="hljs-string">&quot;&lt;&quot;</span> | <span class="hljs-string">&quot;&lt;=&quot;</span> | <span class="hljs-string">&quot;==&quot;</span>| <span class="hljs-string">&quot;!=&quot;</span>;
<span class="hljs-title class_">MatchOp</span> = <span class="hljs-string">&quot;like&quot;</span> | <span class="hljs-string">&quot;LIKE&quot;</span>;
<span class="hljs-title class_">JsonArrayOps</span> = <span class="hljs-title class_">JsonDefs</span> <span class="hljs-string">&quot;(&quot;</span> <span class="hljs-variable constant_">IDENTIFIER</span> <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-title class_">JsonExpr</span> | <span class="hljs-title class_">JsonArray</span> <span class="hljs-string">&quot;)&quot;</span>;
<span class="hljs-title class_">JsonArrayDefs</span> = <span class="hljs-string">&quot;json_contains&quot;</span> | <span class="hljs-string">&quot;JSON_CONTAINS&quot;</span> 
           | <span class="hljs-string">&quot;json_contains_all&quot;</span> | <span class="hljs-string">&quot;JSON_CONTAINS_ALL&quot;</span> 
           | <span class="hljs-string">&quot;json_contains_any&quot;</span> | <span class="hljs-string">&quot;JSON_CONTAINS_ANY&quot;</span>;
<span class="hljs-title class_">JsonExpr</span> =  <span class="hljs-title class_">Constant</span> | <span class="hljs-title class_">ConstantArray</span> | <span class="hljs-variable constant_">STRING</span> | <span class="hljs-variable constant_">BOOLEAN</span>;
<span class="hljs-title class_">JsonArray</span> = <span class="hljs-string">&quot;[&quot;</span> <span class="hljs-title class_">JsonExpr</span> { <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-title class_">JsonExpr</span> } <span class="hljs-string">&quot;]&quot;</span>;
<span class="hljs-title class_">ArrayOps</span> = <span class="hljs-title class_">ArrayDefs</span> <span class="hljs-string">&quot;(&quot;</span> <span class="hljs-variable constant_">IDENTIFIER</span> <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-title class_">ArrayExpr</span> | <span class="hljs-title class_">Array</span> <span class="hljs-string">&quot;)&quot;</span>;
<span class="hljs-title class_">ArrayDefs</span> = <span class="hljs-string">&quot;array_contains&quot;</span> | <span class="hljs-string">&quot;ARRAY_CONTAINS&quot;</span> 
           | <span class="hljs-string">&quot;array_contains_all&quot;</span> | <span class="hljs-string">&quot;ARRAY_CONTAINS_ALL&quot;</span> 
           | <span class="hljs-string">&quot;array_contains_any&quot;</span> | <span class="hljs-string">&quot;ARRAY_CONTAINS_ANY&quot;</span>
           | <span class="hljs-string">&quot;array_length&quot;</span>       | <span class="hljs-string">&quot;ARRAY_LENGTH&quot;</span>;
<span class="hljs-title class_">ArrayExpr</span> =  <span class="hljs-title class_">Constant</span> | <span class="hljs-title class_">ConstantArray</span> | <span class="hljs-variable constant_">STRING</span> | <span class="hljs-variable constant_">BOOLEAN</span>;
<span class="hljs-title class_">Array</span> = <span class="hljs-string">&quot;[&quot;</span> <span class="hljs-title class_">ArrayExpr</span> { <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-title class_">ArrayExpr</span> } <span class="hljs-string">&quot;]&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<p>下表列出了上述布尔表达式规则中提到的每个符号的说明。</p>
<table>
<thead>
<tr><th>符号</th><th>描述</th></tr>
</thead>
<tbody>
<tr><td>=</td><td>定义</td></tr>
<tr><td>,</td><td>连接。</td></tr>
<tr><td>;</td><td>终止。</td></tr>
<tr><td>|</td><td>交替。</td></tr>
<tr><td>{...}</td><td>重复。</td></tr>
<tr><td>(...)</td><td>分组。</td></tr>
<tr><td>无</td><td>空。表达式可以是空字符串。</td></tr>
<tr><td>整数</td><td>整数，如 1、2、3。</td></tr>
<tr><td>浮点数</td><td>浮点数，如 1.0、2.0。</td></tr>
<tr><td>CONST</td><td>整数或浮点数。</td></tr>
<tr><td>IDENTIFIER</td><td>标识符。在 Milvus 中，IDENTIFIER 表示字段名称。</td></tr>
<tr><td>逻辑运算符</td><td>LogicalOp 是一种逻辑操作符，支持在一次比较中结合多个关系操作。逻辑运算符的返回值为 TRUE (1) 或 FALSE (0)。逻辑运算符有两种类型，包括二元逻辑运算符（BinaryLogicalOps）和一元逻辑运算符（UnaryLogicalOps）。</td></tr>
<tr><td>单元逻辑操作</td><td>UnaryLogicalOp 指的是一元逻辑运算符 &quot;not&quot;。</td></tr>
<tr><td>二进制逻辑运算符</td><td>对两个操作数执行操作的二元逻辑运算符。在有两个或多个操作数的复杂表达式中，运算顺序取决于优先级规则。</td></tr>
<tr><td>算术运算符</td><td>算术运算符（ArithmeticOp），即算术运算符，对操作数执行加法和减法等数学运算。</td></tr>
<tr><td>单值运算符</td><td>一元算术运算符（UnaryArithOp）是对单一操作数进行运算的算术运算符。负的 UnaryArithOp 可以将正表达式变为负表达式，也可以反过来。</td></tr>
<tr><td>二进制算术运算</td><td>BinaryArithOp 即二进制运算符，对两个操作数进行运算。在有两个或多个操作数的复杂表达式中，运算顺序取决于优先级规则。</td></tr>
<tr><td>CmpOp</td><td>CmpOp 是对两个操作数执行操作的关系运算符。</td></tr>
<tr><td>CmpOpRestricted</td><td>CmpOpRestricted 仅限于 &quot;小于 &quot;和 &quot;等于&quot;。</td></tr>
<tr><td>常量表达式</td><td>ConstantExpr 可以是一个常量，也可以是两个 ConstantExpr 上的二元 ArithOp 或单个 ConstantExpr 上的一元 ArithOp。它是递归定义的。</td></tr>
<tr><td>常量数组</td><td>ConstantArray 由方括号封装，ConstantExpr 可以在方括号中重复。ConstArray 必须至少包含一个 ConstantExpr。</td></tr>
<tr><td>TermExpr</td><td>TermExpr 用于检查 IDENTIFIER 的值是否出现在 ConstantArray 中。TermExpr 用 &quot;in &quot;表示。</td></tr>
<tr><td>比较表达式</td><td>CompareExpr 即比较表达式，可以是对两个 IDENTIFIER 的关系操作，也可以是对一个 IDENTIFIER 和一个 ConstantExpr 的关系操作，还可以是对两个 ConstantExpr 和一个 IDENTIFIER 的三元操作。</td></tr>
<tr><td>单表达式</td><td>SingleExpr 即单一表达式，可以是 TermExpr 或 CompareExpr。</td></tr>
<tr><td>逻辑表达式</td><td>LogicalExpr 可以是两个 LogicalExpr 上的二进制逻辑操作（BinaryLogicalOp），也可以是单个 LogicalExpr 上的一元逻辑操作（UnaryLogicalOp），还可以是括号内分组的 LogicalExpr 或 SingleExpr。LogicalExpr 是递归定义的。</td></tr>
<tr><td>Expr</td><td>Expr 是表达式的缩写，可以是 LogicalExpr 或 NIL。</td></tr>
<tr><td>匹配运算符</td><td>MatchOp 即匹配运算符，用于将字符串与字符串常量或字符串前缀、后缀或后缀常量进行比较。</td></tr>
<tr><td>JsonArrayOp</td><td>JsonOp 即 JSON 运算符，用于检查指定标识符是否包含指定元素。</td></tr>
<tr><td>ArrayOp</td><td>ArrayOp 即数组运算符，用于检查指定标识符是否包含指定元素。</td></tr>
</tbody>
</table>
<h2 id="Operators" class="common-anchor-header">操作符<button data-href="#Operators" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Logical-operators" class="common-anchor-header">逻辑运算符</h3><p>逻辑运算符在两个表达式之间进行比较。</p>
<table>
<thead>
<tr><th>符号</th><th>操作</th><th>示例</th><th>说明</th></tr>
</thead>
<tbody>
<tr><td>和' &amp;&amp;</td><td>和</td><td>expr1 &amp;&amp; expr2</td><td>如果 expr1 和 expr2 均为真，则为真。</td></tr>
<tr><td>或</td><td>或</td><td>expr1 || expr2</td><td>如果 expr1 或 expr2 均为真，则为真。</td></tr>
</tbody>
</table>
<h3 id="Binary-arithmetic-operators" class="common-anchor-header">二进制算术运算符</h3><p>二进制算术运算符包含两个操作数，可以执行基本算术运算并返回相应的结果。</p>
<table>
<thead>
<tr><th>符号</th><th>运算</th><th>示例</th><th>说明</th></tr>
</thead>
<tbody>
<tr><td>+</td><td>加法</td><td>a + b</td><td>将两个操作数相加。</td></tr>
<tr><td>-</td><td>减法</td><td>a - b</td><td>用第一个操作数减去第二个操作数。</td></tr>
<tr><td>*</td><td>乘法</td><td>a * b</td><td>将两个操作数相乘。</td></tr>
<tr><td>/</td><td>除法</td><td>a / b</td><td>用第一个操作数除以第二个操作数。</td></tr>
<tr><td>**</td><td>幂</td><td>a ** b</td><td>将第一个操作数提高到第二个操作数的幂。</td></tr>
<tr><td>%</td><td>模数</td><td>a % b</td><td>用第一个操作数除以第二个操作数，得到余数部分。</td></tr>
</tbody>
</table>
<h3 id="Relational-operators" class="common-anchor-header">关系运算符</h3><p>关系运算符使用符号检查两个表达式之间的相等、不等或相对顺序。</p>
<table>
<thead>
<tr><th>符号</th><th>操作</th><th>示例</th><th>说明</th></tr>
</thead>
<tbody>
<tr><td>&lt;</td><td>小于</td><td>a &lt; b</td><td>如果 a 小于 b，则为 True。</td></tr>
<tr><td>&gt;</td><td>大于</td><td>a &gt; b</td><td>如果 a 大于 b，则为真。</td></tr>
<tr><td>==</td><td>相等</td><td>a == b</td><td>如果 a 等于 b，则为 True。</td></tr>
<tr><td>!=</td><td>不相等</td><td>a != b</td><td>如果 a 不等于 b，则为真。</td></tr>
<tr><td>&lt;=</td><td>小于或等于</td><td>a &lt;= b</td><td>如果 a 小于或等于 b，则为真。</td></tr>
<tr><td>&gt;=</td><td>大于或等于</td><td>a &gt;= b</td><td>如果 a 大于或等于 b，则为 True。</td></tr>
</tbody>
</table>
<h2 id="Operator-precedence-and-associativity" class="common-anchor-header">运算符的优先级和关联性<button data-href="#Operator-precedence-and-associativity" class="anchor-icon" translate="no">
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
    </button></h2><p>下表列出了运算符的优先级和关联性。操作符从上到下按优先级递减排列。</p>
<table>
<thead>
<tr><th>优先级</th><th>运算符</th><th>说明</th><th>关联性</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>+ -</td><td>一元运算符</td><td>从左至右</td></tr>
<tr><td>2</td><td>非</td><td>一元逻辑运算</td><td>从右到左</td></tr>
<tr><td>3</td><td>**</td><td>二进制逻辑运算</td><td>从左至右</td></tr>
<tr><td>4</td><td>* / %</td><td>二进制</td><td>从左至右</td></tr>
<tr><td>5</td><td>+ -</td><td>二进制</td><td>从左至右</td></tr>
<tr><td>6</td><td>&lt; &lt;= &gt; &gt;=</td><td>CmpOp</td><td>从左至右</td></tr>
<tr><td>7</td><td>== !=</td><td>CmpOp</td><td>从左至右</td></tr>
<tr><td>8</td><td>像 LIKE</td><td>MatchOp</td><td>从左至右</td></tr>
<tr><td>9</td><td>json_contains JSON_CONTAINS</td><td>JsonArrayOp</td><td>从左至右</td></tr>
<tr><td>9</td><td>array_contains ARRAY_CONTAINS</td><td>ArrayOp</td><td>从左至右</td></tr>
<tr><td>10</td><td>json_contains_all JSON_CONTAINS_ALL</td><td>JsonArrayOp</td><td>从左至右</td></tr>
<tr><td>10</td><td>array_contains_all ARRAY_CONTAINS_ALL</td><td>ArrayOp</td><td>从左至右</td></tr>
<tr><td>11</td><td>json_contains_any JSON_CONTAINS_ANY</td><td>JsonArrayOp</td><td>从左至右</td></tr>
<tr><td>11</td><td>array_contains_any ARRAY_CONTAINS_ANY</td><td>ArrayOp</td><td>从左至右</td></tr>
<tr><td>12</td><td>array_length ARRAY_LENGTH</td><td>数组操作</td><td>从左至右</td></tr>
<tr><td>13</td><td>&amp;&amp; 和</td><td>BinaryLogicOp</td><td>从左至右</td></tr>
<tr><td>14</td><td>|| 或</td><td>二进制逻辑操作</td><td>从左到右</td></tr>
</tbody>
</table>
<p>表达式通常从左到右求值。复杂表达式一次求值一个。表达式的求值顺序由所用运算符的优先级决定。</p>
<p>如果表达式包含两个或两个以上具有相同优先级的运算符，则先运算左边的运算符。</p>
<div class="alert note">
<p>例如，10 / 2 * 5 将被求值为 (10 / 2)，结果乘以 5。</p>
</div>
<p>如果先处理优先级较低的运算，则应将其置于括号内。</p>
<div class="alert note">
<p>例如，30 / 2 + 8。通常情况下，它的运算结果是 30 除以 2，然后在结果上加上 8。如果要除以 2 + 8，则应写成 30 / (2+8)。</p>
</div>
<p>括号可以嵌套在表达式中。最内层的括号表达式先被求值。</p>
<h2 id="Usage" class="common-anchor-header">使用方法<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 中所有可用布尔表达式的用法示例如下（<code translate="no">int64</code> 表示包含 INT64 类型数据的标量字段，<code translate="no">float</code> 表示包含浮点类型数据的标量字段，<code translate="no">VARCHAR</code> 表示包含 VARCHAR 类型数据的标量字段）：</p>
<ol>
<li>CmpOp</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 &gt; 0&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"><span class="hljs-string">&quot;0 &lt; int64 &lt; 400&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"><span class="hljs-string">&quot;500 &lt;= int64 &lt; 1000&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"><span class="hljs-variable constant_">VARCHAR</span> &gt; <span class="hljs-string">&quot;str1&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>BinaryLogicalOp 和括号</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;(int64 &gt; 0 &amp;&amp; int64 &lt; 400) or (int64 &gt; 500 &amp;&amp; int64 &lt; 1000)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>TermExpr 和 UnaryLogicOp</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 not in [1, 2, 3]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"><span class="hljs-variable constant_">VARCHAR</span> not <span class="hljs-keyword">in</span> [<span class="hljs-string">&quot;str1&quot;</span>, <span class="hljs-string">&quot;str2&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<ol start="4">
<li>TermExpr、BinaryLogicalOp 和 CmpOp（在不同字段上）</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 in [1, 2, 3] and float != 2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="5">
<li>BinaryLogicalOp 和 CmpOp</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 == 0 || int64 == 1 || int64 == 2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="6">
<li>CmpOp 和 UnaryArithOp 或 BinaryArithOp</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;200+300 &lt; int64 &lt;= 500+500&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="7">
<li>MatchOp</li>
</ol>
<pre><code translate="no"><span class="hljs-variable constant_">VARCHAR</span> like <span class="hljs-string">&quot;prefix%&quot;</span>
<span class="hljs-variable constant_">VARCHAR</span> like <span class="hljs-string">&quot;%suffix&quot;</span>
<span class="hljs-variable constant_">VARCHAR</span> like <span class="hljs-string">&quot;%middle%&quot;</span>
<span class="hljs-variable constant_">VARCHAR</span> like <span class="hljs-string">&quot;_suffix&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="8">
<li>JsonArrayOp</li>
</ol>
<ul>
<li><p><code translate="no">JSON_CONTAINS(identifier, JsonExpr)</code></p>
<p>如果<code translate="no">JSON_CONTAINS</code> （第二个参数）语句的 JSON 表达式是一个 list，则标识符（第一个参数）应是 list 的 list。否则，语句的值总是 False。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># {&quot;x&quot;: [1,2,3]}</span>
json_contains(x, <span class="hljs-number">1</span>) <span class="hljs-comment"># ==&gt; true</span>
json_contains(x, <span class="hljs-string">&quot;a&quot;</span>) <span class="hljs-comment"># ==&gt; false</span>
    
<span class="hljs-comment"># {&quot;x&quot;: [[1,2,3], [4,5,6], [7,8,9]]}</span>
json_contains(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains(x, [<span class="hljs-number">3</span>,<span class="hljs-number">2</span>,<span class="hljs-number">1</span>]) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">JSON_CONTAINS_ALL(identifier, JsonExpr)</code></p>
<p><code translate="no">JSON_CONTAINS_ALL</code> 语句中的 JSON 表达式应始终为 list。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># {&quot;x&quot;: [1,2,3,4,5,7,8]}</span>
json_contains_all(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains_all(x, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; false 6 is not exists</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">JSON_CONTAINS_ANY(identifier, JsonExpr)</code></p>
<p><code translate="no">JSON_CONTAINS_ANY</code> 语句中的 JSON 表达式应始终为 list。否则，其作用与<code translate="no">JSON_CONTAINS</code> 相同。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># {&quot;x&quot;: [1,2,3,4,5,7,8]}</span>
json_contains_any(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains_any(x, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains_any(x, [<span class="hljs-number">6</span>,<span class="hljs-number">9</span>]) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<ol start="9">
<li>数组表达式</li>
</ol>
<ul>
<li><p><code translate="no">ARRAY_CONTAINS(identifier, ArrayExpr)</code></p>
<p>如果<code translate="no">ARRAY_CONTAINS</code> （第二个参数）语句的数组表达式是一个 list，则标识符（第一个参数）应为 list 的 list。否则，语句的值总是 False。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &#x27;int_array&#x27;: [1,2,3]</span>
array_contains(int_array, <span class="hljs-number">1</span>) <span class="hljs-comment"># ==&gt; true</span>
array_contains(int_array, <span class="hljs-string">&quot;a&quot;</span>) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_CONTAINS_ALL(identifier, ArrayExpr)</code></p>
<p><code translate="no">ARRAY_CONTAINS_ALL</code> 语句中的数组表达式应始终为 list。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_contains_all(int_array, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_all(int_array, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; false 6 is not exists</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_CONTAINS_ANY(identifier, ArrayExpr)</code></p>
<p><code translate="no">ARRAY_CONTAINS_ANY</code> 语句中的数组表达式应始终为 list。否则，其作用与<code translate="no">ARRAY_CONTAINS</code> 相同。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_contains_any(int_array, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_any(int_array, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_any(int_array, [<span class="hljs-number">6</span>,<span class="hljs-number">9</span>]) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_LENGTH(identifier)</code></p>
<p>检查数组中的元素个数。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_length(int_array) <span class="hljs-comment"># ==&gt; 7</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">下一步<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>既然你已经知道比特集在 Milvus 中是如何工作的，你可能还想</p>
<ul>
<li>学习如何进行<a href="/docs/zh/v2.4.x/multi-vector-search.md">混合搜索</a>。</li>
<li>学习如何<a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">使用字符串过滤</a>搜索结果。</li>
<li>学习如何<a href="/docs/zh/v2.4.x/enable-dynamic-field.md">在构建布尔表达式时使用Dynamic Field</a>。</li>
</ul>
