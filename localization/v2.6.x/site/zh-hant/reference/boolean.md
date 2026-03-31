---
id: boolean.md
summary: 了解 Milvus 中的布林表達規則。
title: 標量篩選規則
---
<h1 id="Scalar-Filtering-Rules" class="common-anchor-header">標量篩選規則<button data-href="#Scalar-Filtering-Rules" class="anchor-icon" translate="no">
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
    </button></h2><p>謂語表達式輸出一個布林值。Milvus 透過謂語搜尋進行標量值篩選。謂語表達式在求值時會返回 TRUE 或 FALSE。請參閱<a href="/api-reference/pymilvus/v2.4.x/About.md">Python SDK API Reference</a>，以取得使用謂語表達式的說明。</p>
<p><a href="https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form">EBNF</a>語法規則描述布林表達式規則：</p>
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
<p>下表列出上述布林表達式規則中提到的每個符號的說明。</p>
<table>
<thead>
<tr><th>符號</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td>=</td><td>定義。</td></tr>
<tr><td>,</td><td>連接。</td></tr>
<tr><td>;</td><td>終止。</td></tr>
<tr><td>|</td><td>交替。</td></tr>
<tr><td>{...}</td><td>重複。</td></tr>
<tr><td>(...)</td><td>組合。</td></tr>
<tr><td>無</td><td>空。表達式可以是空字串。</td></tr>
<tr><td>INTEGER</td><td>整數，例如 1、2、3。</td></tr>
<tr><td>浮點數</td><td>浮點數，例如 1.0、2.0。</td></tr>
<tr><td>CONST</td><td>整數或浮點數。</td></tr>
<tr><td>IDENTIFIER</td><td>識別碼。在 Milvus 中，IDENTIFIER 代表欄位名稱。</td></tr>
<tr><td>邏輯運算</td><td>LogicalOp 是一個邏輯運算符號，支援在一次比較中結合多個關係運算。LogicalOp 的回傳值是 TRUE (1) 或 FALSE (0)。邏輯操作有兩種類型，包括二元邏輯操作 (BinaryLogicalOps) 和單元邏輯操作 (UnaryLogicalOps)。</td></tr>
<tr><td>單值邏輯操作</td><td>UnaryLogicalOp 指單元邏輯運算符號 "not"。</td></tr>
<tr><td>二進制邏輯運算符號</td><td>對兩個操作數執行動作的二進制邏輯運算符。在具有兩個或更多操作數的複雜表達式中，評估的順序取決於優先順序規則。</td></tr>
<tr><td>算術運算</td><td>ArithmeticOp 即算术运算符，对操作数执行加法和减法等数学运算。</td></tr>
<tr><td>單值運算符號</td><td>UnaryArithOp 是一種算術運算元，可在單一操作數上執行運算。負數 UnaryArithOp 會將正數表達式變為負數表達式，反之亦然。</td></tr>
<tr><td>二進制 ArithOp</td><td>BinaryArithOp 即二元運算符號，可在兩個操作數上執行運算。在具有兩個或更多操作數的複雜表達式中，運算順序取決於優先順序規則。</td></tr>
<tr><td>CmpOp</td><td>CmpOp 是對兩個操作數執行操作的關聯運算符。</td></tr>
<tr><td>CmpOpRestricted</td><td>CmpOpRestricted 限於 "Less than「 和 」Equal"。</td></tr>
<tr><td>常數Expr</td><td>ConstantExpr 可以是常量或兩個 ConstantExpr 上的 BinaryArithOp 或單一 ConstantExpr 上的 UnaryArithOp。它是遞迴定義的。</td></tr>
<tr><td>常數陣列</td><td>ConstantArray 由方括弧包圍，ConstantExpr 可以重複出現在方括弧中。ConstArray 必須包含至少一個 ConstantExpr。</td></tr>
<tr><td>TermExpr</td><td>TermExpr 用來檢查 IDENTIFIER 的值是否出現在 ConstantArray 中。TermExpr 用 "in" 表示。</td></tr>
<tr><td>CompareExpr</td><td>CompareExpr 即比較表達式，可以是兩個 IDENTIFIER 上的關聯操作，或一個 IDENTIFIER 和一個 ConstantExpr 上的關聯操作，或兩個 ConstantExpr 和一個 IDENTIFIER 上的三元操作。</td></tr>
<tr><td>單一表達式</td><td>SingleExpr 即單一表達式，可以是 TermExpr 或 CompareExpr。</td></tr>
<tr><td>邏輯表 達式</td><td>LogicalExpr 可以是兩個 LogicalExpr 上的 BinaryLogicalOp，或是單一 LogicalExpr 上的 UnaryLogicalOp，或是在括弧中組合的 LogicalExpr，或是 SingleExpr。LogicalExpr 是遞迴定義的。</td></tr>
<tr><td>Expr</td><td>Expr 是表示表達式的縮寫，可以是 LogicalExpr 或 NIL。</td></tr>
<tr><td>MatchOp</td><td>MatchOp 即匹配運算符號，用來比較字串與字串常數或字串前綴、後綴或後綴常數。</td></tr>
<tr><td>JsonArrayOp</td><td>一個 JsonOp，即 JSON 運算子，檢查指定的識別碼是否包含指定的元素。</td></tr>
<tr><td>ArrayOp</td><td>一個 ArrayOp，即一個陣列運算元，檢查指定的識別碼是否包含指定的元素。</td></tr>
</tbody>
</table>
<h2 id="Operators" class="common-anchor-header">運算符號<button data-href="#Operators" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Logical-operators" class="common-anchor-header">邏輯運算符號<button data-href="#Logical-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>邏輯運算符號執行兩個表達式之間的比較。</p>
<table>
<thead>
<tr><th>符號</th><th>運算符號</th><th>範例</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td>'and' &amp;&amp;</td><td>和</td><td>expr1 &amp;&amp; expr2</td><td>如果 expr1 和 expr2 都為真，則為真。</td></tr>
<tr><td>'or' ||</td><td>或</td><td>expr1 || expr2</td><td>如果 expr1 或 expr2 均為真，則為 True。</td></tr>
</tbody>
</table>
<h3 id="Binary-arithmetic-operators" class="common-anchor-header">二進位算術運算元<button data-href="#Binary-arithmetic-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>二進位算術運算元包含兩個操作數，可以執行基本算術運算並傳回相對應的結果。</p>
<table>
<thead>
<tr><th>符號</th><th>運算</th><th>範例</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td>+</td><td>加法</td><td>a + b</td><td>將兩個操作數相加。</td></tr>
<tr><td>-</td><td>減法</td><td>a - b</td><td>從第一個操作數減去第二個操作數。</td></tr>
<tr><td>*</td><td>乘法</td><td>a * b</td><td>將兩個操作數相乘</td></tr>
<tr><td>/</td><td>除法</td><td>a / b</td><td>用第一個操作數除以第二個操作數。</td></tr>
<tr><td>**</td><td>幂</td><td>a ** b</td><td>將第一個作業數提升為第二個作業數的幂。</td></tr>
<tr><td>%</td><td>模數</td><td>a % b</td><td>將第一個作業數除以第二個作業數，得出餘數部分。</td></tr>
</tbody>
</table>
<h3 id="Relational-operators" class="common-anchor-header">關係運算符號<button data-href="#Relational-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>關係運算符使用符號來檢查兩個表達式之間的相等、不等或相對順序。</p>
<table>
<thead>
<tr><th>符號</th><th>運算</th><th>範例</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td>&lt;</td><td>小於</td><td>a &lt; b</td><td>如果 a 小於 b，則為 True。</td></tr>
<tr><td>&gt;</td><td>大於</td><td>a &gt; b</td><td>True 如果 a 大於 b。</td></tr>
<tr><td>==</td><td>相等</td><td>a == b</td><td>如果 a 等於 b，則為 True。</td></tr>
<tr><td>!=</td><td>不相等</td><td>a != b</td><td>如果 a 不等於 b，則為 True。</td></tr>
<tr><td>&lt;=</td><td>小於或相等</td><td>a &lt;= b</td><td>True 如果 a 小於或等於 b。</td></tr>
<tr><td>&gt;=</td><td>大於或等於</td><td>a &gt;= b</td><td>如果 a 大於或等於 b，則為 True。</td></tr>
</tbody>
</table>
<h2 id="Operator-precedence-and-associativity" class="common-anchor-header">運算符號的先後次序和關聯性<button data-href="#Operator-precedence-and-associativity" class="anchor-icon" translate="no">
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
    </button></h2><p>下表列出運算符號的優先順序和關聯性。運算符號從上至下依序排列。</p>
<table>
<thead>
<tr><th>優先順序</th><th>運算符號</th><th>說明</th><th>關聯性</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>+ -</td><td>單值運算符號</td><td>從左至右</td></tr>
<tr><td>2</td><td>非</td><td>單元逻辑Op</td><td>從右至左</td></tr>
<tr><td>3</td><td>**</td><td>二進制 ArithOp</td><td>從左至右</td></tr>
<tr><td>4</td><td>* / %</td><td>二進位</td><td>從左至右</td></tr>
<tr><td>5</td><td>+ -</td><td>二進位</td><td>從左至右</td></tr>
<tr><td>6</td><td>&lt;<= > &gt;=</td><td>CmpOp</td><td>從左至右</td></tr>
<tr><td>7</td><td>== !=</td><td>CmpOp</td><td>從左至右</td></tr>
<tr><td>8</td><td>像 LIKE</td><td>MatchOp</td><td>從左至右</td></tr>
<tr><td>9</td><td>json_contains JSON_CONTAINS</td><td>JsonArrayOp</td><td>從左至右</td></tr>
<tr><td>9</td><td>array_contains ARRAY_CONTAINS</td><td>ArrayOp</td><td>從左至右</td></tr>
<tr><td>10</td><td>json_contains_all JSON_CONTAINS_ALL</td><td>JsonArrayOp</td><td>從左至右</td></tr>
<tr><td>10</td><td>array_contains_all ARRAY_CONTAINS_ALL</td><td>ArrayOp</td><td>從左至右</td></tr>
<tr><td>11</td><td>json_contains_any JSON_CONTAINS_ANY</td><td>JsonArrayOp</td><td>從左至右</td></tr>
<tr><td>11</td><td>array_contains_any ARRAY_CONTAINS_ANY</td><td>ArrayOp</td><td>從左至右</td></tr>
<tr><td>12</td><td>array_length ARRAY_LENGTH</td><td>陣列操作</td><td>從左至右</td></tr>
<tr><td>13</td><td>&amp;&amp; 和</td><td>BinaryLogicOp</td><td>從左至右</td></tr>
<tr><td>14</td><td>|| 或</td><td>二進制LogicOp</td><td>從左至右</td></tr>
</tbody>
</table>
<p>表達式通常從左至右求值。複雜的表達式會一次求值一個。表達式的求值順序由所用運算符的優先順序決定。</p>
<p>如果一個表達式包含兩個或兩個以上具有相同優先順序的運算符號，則會先對左側的運算符號進行求值。</p>
<div class="alert note">
<p>例如，10 / 2 * 5 將評估為 (10 / 2)，並將結果乘以 5。</p>
</div>
<p>當應先處理較低優先順序的運算符號時，應將其括在括號中。</p>
<div class="alert note">
<p>例如，30 / 2 + 8。這通常會被評估為 30 除以 2，然後在結果上加上 8。如果要除以 2 + 8，則應該寫成 30 / (2+8)。</p>
</div>
<p>括號可以嵌套在表達式中。最內層的括號表達式會先被求值。</p>
<h2 id="Usage" class="common-anchor-header">使用方式<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 中所有可用的布林表達式用法範例如下（<code translate="no">int64</code> 代表包含 INT64 類型資料的標量欄位，<code translate="no">float</code> 代表包含浮點型資料的標量欄位，<code translate="no">VARCHAR</code> 代表包含 VARCHAR 類型資料的標量欄位）：</p>
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
<li>BinaryLogicalOp 和括號</li>
</ol>
<pre><code translate="no">&quot;(int64 &gt; <span class="hljs-number">0</span> &amp;&amp; int64 &lt; <span class="hljs-number">400</span>) or (int64 &gt; <span class="hljs-number">500</span> &amp;&amp; int64 &lt; <span class="hljs-number">1000</span>)&quot;
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>TermExpr 和 UnaryLogicOp</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 not in [1, 2, 3]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">VARCHAR not in <span class="hljs-selector-attr">[<span class="hljs-string">&quot;str1&quot;</span>, <span class="hljs-string">&quot;str2&quot;</span>]</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="4">
<li>TermExpr、BinaryLogicalOp 和 CmpOp (在不同欄位上)</li>
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
<p>如果<code translate="no">JSON_CONTAINS</code> (第二個參數) 語句的 JSON 表達式是一個 list，則識別符 (第一個參數) 應該是 list 的 list。否則，語句的評估結果永遠為 False。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># {&quot;x&quot;: [1,2,3]}</span>
json_contains(x, <span class="hljs-number">1</span>) <span class="hljs-comment"># ==&gt; true</span>
json_contains(x, <span class="hljs-string">&quot;a&quot;</span>) <span class="hljs-comment"># ==&gt; false</span>
    
<span class="hljs-comment"># {&quot;x&quot;: [[1,2,3], [4,5,6], [7,8,9]]}</span>
json_contains(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains(x, [<span class="hljs-number">3</span>,<span class="hljs-number">2</span>,<span class="hljs-number">1</span>]) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">JSON_CONTAINS_ALL(identifier, JsonExpr)</code></p>
<p><code translate="no">JSON_CONTAINS_ALL</code> 語句中的 JSON 表達式應該永遠是一個 list。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># {&quot;x&quot;: [1,2,3,4,5,7,8]}</span>
json_contains_all(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains_all(x, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; false 6 is not exists</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">JSON_CONTAINS_ANY(identifier, JsonExpr)</code></p>
<p><code translate="no">JSON_CONTAINS_ANY</code> 語句中的 JSON 表達式應該永遠是一個 list。否則，其作用與<code translate="no">JSON_CONTAINS</code> 相同。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># {&quot;x&quot;: [1,2,3,4,5,7,8]}</span>
json_contains_any(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains_any(x, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains_any(x, [<span class="hljs-number">6</span>,<span class="hljs-number">9</span>]) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<ol start="9">
<li>陣列表達式</li>
</ol>
<ul>
<li><p><code translate="no">ARRAY_CONTAINS(identifier, ArrayExpr)</code></p>
<p>如果<code translate="no">ARRAY_CONTAINS</code> （第二個參數）語句的陣列表達式是一個 list，則識別符（第一個參數）應該是 list 的 list。否則，語句總是被評估為 False。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &#x27;int_array&#x27;: [1,2,3]</span>
array_contains(int_array, <span class="hljs-number">1</span>) <span class="hljs-comment"># ==&gt; true</span>
array_contains(int_array, <span class="hljs-string">&quot;a&quot;</span>) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_CONTAINS_ALL(identifier, ArrayExpr)</code></p>
<p><code translate="no">ARRAY_CONTAINS_ALL</code> 語句中的陣列表達式應該永遠是一個 list。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_contains_all(int_array, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_all(int_array, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; false 6 is not exists</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_CONTAINS_ANY(identifier, ArrayExpr)</code></p>
<p><code translate="no">ARRAY_CONTAINS_ANY</code> 語句中的陣列表達式應該永遠是一個 list。否則，其作用與<code translate="no">ARRAY_CONTAINS</code> 相同。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_contains_any(int_array, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_any(int_array, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_any(int_array, [<span class="hljs-number">6</span>,<span class="hljs-number">9</span>]) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_LENGTH(identifier)</code></p>
<p>檢查陣列中元素的數量。</p>
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
    </button></h2><p>現在您知道 bitsets 在 Milvus 中是如何工作的了，您可能還想</p>
<ul>
<li>學習如何進行<a href="/docs/zh-hant/multi-vector-search.md">混合搜尋</a>。</li>
<li>學習如何<a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">使用字串過濾</a>搜尋結果。</li>
<li>學習如何<a href="/docs/zh-hant/enable-dynamic-field.md">在建立布林表達式時使用動態欄位</a>。</li>
</ul>
