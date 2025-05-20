---
id: boolean.md
summary: Milvusのブーリアン式ルールについて学ぶ。
title: スカラー・フィルタリング・ルール
---
<h1 id="Scalar-Filtering-Rules" class="common-anchor-header">スカラー・フィルタリング・ルール<button data-href="#Scalar-Filtering-Rules" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">概要<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>述語式はブール値を出力します。Milvusは述語で検索することによりスカラーフィルタリングを行います。述語式は評価されるとTRUEかFALSEのどちらかを返します。述語式の使い方については<a href="/api-reference/pymilvus/v2.4.x/About.md">Python SDK API Referenceを</a>参照してください。</p>
<p><a href="https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form">EBNF</a>文法規則はブール式の規則を記述します：</p>
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
<p>以下の表は、上記のブール式の規則で言及されている各シンボルの説明の一覧です。</p>
<table>
<thead>
<tr><th>記法</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td>=</td><td>定義。</td></tr>
<tr><td>,</td><td>連結。</td></tr>
<tr><td>;</td><td>終端。</td></tr>
<tr><td>|</td><td>交替。</td></tr>
<tr><td>{...}</td><td>繰り返し。</td></tr>
<tr><td>(...)</td><td>グループ化。</td></tr>
<tr><td>NIL</td><td>空。式は空文字列でもよい。</td></tr>
<tr><td>INTEGER</td><td>1、2、3などの整数。</td></tr>
<tr><td>FLOAT</td><td>1.0、2.0などの浮動小数点数。</td></tr>
<tr><td>CONST</td><td>整数または浮動小数点数。</td></tr>
<tr><td>IDENTIFIER</td><td>識別子。MilvusではIDENTIFIERはフィールド名を表す。</td></tr>
<tr><td>論理演算子</td><td>LogicalOp は論理演算子で、1回の比較で複数の関係演算を組み合わせることができます。LogicalOp の戻り値は TRUE (1) または FALSE (0) です。LogicalOp には、BinaryLogicalOp と UnaryLogicalOp の 2 つのタイプがあります。</td></tr>
<tr><td>UnaryLogicalOp</td><td>UnaryLogicalOp は、単項論理演算子 &quot;not&quot; を指します。</td></tr>
<tr><td>BinaryLogicalOp (バイナリ論理演算子)</td><td>2 つのオペランドに対してアクションを実行する二項論理演算子。2 つ以上のオペランドを持つ複雑な式では、評価の順序は優先順位ルールに依存します。</td></tr>
<tr><td>算術演算子</td><td>ArithmeticOp (算術演算子) は、オペランドに対して加算や減算などの数学演算を実行します。</td></tr>
<tr><td>UnaryArithOp</td><td>UnaryArithOp は、単一のオペランドに対して演算を実行する算術演算子です。負の UnaryArithOp は、正の式を負の式に変更します。</td></tr>
<tr><td>BinaryArithOp</td><td>BinaryArithOp は二項演算子で、2 つのオペランドに対して演算を行います。2つ以上のオペランドを持つ複雑な式では、評価の順序は優先順位規則に依存します。</td></tr>
<tr><td>CmpOp</td><td>CmpOp は、2 つのオペランドに対して処理を実行する関係演算子です。</td></tr>
<tr><td>CmpOpRestricted</td><td>CmpOpRestricted は、&quot;Less than&quot; および &quot;Equal&quot; に制限されています。</td></tr>
<tr><td>ConstantExpr</td><td>ConstantExprは、定数、2つのConstExpr上のBinaryArithOp、または1つのConstantExpr上のUnaryArithOpになります。再帰的に定義されます。</td></tr>
<tr><td>ConstantArray</td><td>ConstantArrayは角括弧で囲まれ、ConstantExprは角括弧の中で繰り返すことができます。ConstArrayは、少なくとも1つのConstantExprを含まなければなりません。</td></tr>
<tr><td>TermExpr</td><td>TermExprは、IDENTIFIERの値がConstantArrayに含まれるかどうかをチェックするために使用されます。TermExprは &quot;in &quot;で表されます。</td></tr>
<tr><td>CompareExpr</td><td>CompareExpr、つまり比較式は、2つのIDENTIFIERに対する関係演算、1つのIDENTIFIERと1つのConstantExprに対する関係演算、2つのConstantExprと1つのIDENTIFIERに対する3項演算になります。</td></tr>
<tr><td>SingleExpr</td><td>SingleExpr、つまり単一の式は、TermExprまたは CompareExprのいずれかになります。</td></tr>
<tr><td>LogicalExpr</td><td>LogicalExpr は、2 つの LogicalExpr 上の BinaryLogicalOp、1 つの LogicalExpr 上の UnaryLogicalOp、括弧内にグループ化された LogicalExpr、または SingleExpr のいずれかです。LogicalExpr は再帰的に定義されます。</td></tr>
<tr><td>Expr</td><td>Expr は式を意味する略語で、LogicalExpr または NIL を指定できます。</td></tr>
<tr><td>MatchOp</td><td>MatchOp、つまりマッチ演算子は、文字列と文字列定数、または文字列の接頭辞、接尾辞、接尾辞定数を比較します。</td></tr>
<tr><td>JsonArrayOp</td><td>JsonOp (JSON 演算子) は、指定された識別子が指定された要素を含むかどうかをチェックします。</td></tr>
<tr><td>ArrayOp</td><td>ArrayOp（配列演算子）は、指定された識別子が指定された要素を含むかどうかをチェックします。</td></tr>
</tbody>
</table>
<h2 id="Operators" class="common-anchor-header">演算子<button data-href="#Operators" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Logical-operators" class="common-anchor-header">論理演算子</h3><p>論理演算子は、2 つの式の比較を行います。</p>
<table>
<thead>
<tr><th>記号</th><th>演算子</th><th>例</th><th>論理演算子</th></tr>
</thead>
<tbody>
<tr><td>および</td><td>と</td><td>expr1 &amp;&amp; expr2</td><td>expr1 と expr2 の両方が真なら真。</td></tr>
<tr><td>または</td><td>または</td><td>expr1 || expr2</td><td>expr1 と expr2 のどちらかが真なら真。</td></tr>
</tbody>
</table>
<h3 id="Binary-arithmetic-operators" class="common-anchor-header">二項演算子</h3><p>二項演算子は 2 つのオペランドを含み、基本的な算術演算を実行し、対応する結果を返します。</p>
<table>
<thead>
<tr><th>記号</th><th>演算</th><th>例</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td>+</td><td>加算</td><td>a + b</td><td>2つのオペランドを加算します。</td></tr>
<tr><td>-</td><td>減算</td><td>a - b</td><td>最初のオペランドから2番目のオペランドを引く。</td></tr>
<tr><td>*</td><td>乗算</td><td>a * b</td><td>2つのオペランドを乗算する。</td></tr>
<tr><td>/</td><td>除算</td><td>a / b</td><td>最初のオペランドを2番目のオペランドで割る。</td></tr>
<tr><td>**</td><td>べき乗</td><td>a ** b</td><td>最初のオペランドを 2 番目のオペランドのべき乗にします。</td></tr>
<tr><td>%</td><td>モジュロ</td><td>a % b</td><td>第 1 オペランドを第 2 オペランドで割り、余り部分を返す。</td></tr>
</tbody>
</table>
<h3 id="Relational-operators" class="common-anchor-header">関係演算子</h3><p>関係演算子は記号を使用して、2 つの式の間の等式、不等式、相対順序をチェックします。</p>
<table>
<thead>
<tr><th>記号</th><th>演算</th><th>例</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td>&lt;</td><td>未満</td><td>a &lt; b</td><td>a が b より小さい場合に真。</td></tr>
<tr><td>&gt;</td><td>より大きい</td><td>a &gt; b</td><td>aがbより大きければ真。</td></tr>
<tr><td>==</td><td>等しい</td><td>a == b</td><td>a が b と等しければ真。</td></tr>
<tr><td>!=</td><td>等しくない</td><td>a != b</td><td>aがbと等しくない場合に真。</td></tr>
<tr><td>&lt;=</td><td>以下または等しい</td><td>a &lt;= b</td><td>aがb以下であれば真。</td></tr>
<tr><td>&gt;=</td><td>より大きいか等しい</td><td>a &gt;= b</td><td>a が b より大きいか等しい場合に真。</td></tr>
</tbody>
</table>
<h2 id="Operator-precedence-and-associativity" class="common-anchor-header">演算子の優先順位と連想度<button data-href="#Operator-precedence-and-associativity" class="anchor-icon" translate="no">
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
    </button></h2><p>次の表は、演算子の優先順位と連想度の一覧である。演算子は上から下へ、優先順位の高い順に並んでいます。</p>
<table>
<thead>
<tr><th>優先順位</th><th>演算子</th><th>説明</th><th>連想度</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>+ -</td><td>単項演算子</td><td>左から右</td></tr>
<tr><td>2</td><td>でない</td><td>ユナリオロジック</td><td>右から左</td></tr>
<tr><td>3</td><td>**</td><td>バイナリ</td><td>左から右</td></tr>
<tr><td>4</td><td>* / %</td><td>バイナリ</td><td>左から右</td></tr>
<tr><td>5</td><td>+ -</td><td>バイナリ</td><td>左から右</td></tr>
<tr><td>6</td><td>&lt; &lt;= &gt; &gt;=</td><td>CmpOp</td><td>左から右</td></tr>
<tr><td>7</td><td>== !=</td><td>CmpOp</td><td>左から右</td></tr>
<tr><td>8</td><td>LIKEのような</td><td>マッチオプ</td><td>左から右</td></tr>
<tr><td>9</td><td>JSON_CONTAINS JSON_CONTAINS</td><td>JsonArrayOp</td><td>左から右</td></tr>
<tr><td>9</td><td>array_containsはARRAY_CONTAINSを含みます。</td><td>ArrayOp</td><td>左から右</td></tr>
<tr><td>10</td><td>JSON_CONTAINS_ALL JSON_CONTAINS_ALL</td><td>JsonArrayOp。</td><td>左から右</td></tr>
<tr><td>10</td><td>配列をすべて含む ARRAY_CONTAINS_ALL</td><td>ArrayOp</td><td>左から右</td></tr>
<tr><td>11</td><td>JSON_CONTAINS_ANY JSON_CONTAINS_ANY</td><td>JsonArrayOp</td><td>左から右</td></tr>
<tr><td>11</td><td>array_contains_any ARRAY_CONTAINS_ANY</td><td>ArrayOp</td><td>左から右</td></tr>
<tr><td>12</td><td>配列の長さ ARRAY_LENGTH</td><td>配列オープン</td><td>左から右</td></tr>
<tr><td>13</td><td>と</td><td>バイナリロジック</td><td>左から右</td></tr>
<tr><td>14</td><td>|| または</td><td>バイナリロジック</td><td>左から右</td></tr>
</tbody>
</table>
<p>式は通常左から右に評価される。複雑な式は1つずつ評価される。式を評価する順序は、使用する演算子の優先順位によって決まります。</p>
<p>式に同じ優先順位の演算子が2つ以上含まれる場合は、左側の演算子が最初に評価されます。</p>
<div class="alert note">
<p>たとえば、10 / 2 * 5 は (10 / 2) と評価され、その結果に 5 が掛けられる。</p>
</div>
<p>優先順位の低い演算子を先に処理する場合は、括弧で囲む。</p>
<div class="alert note">
<p>例えば、30 / 2 + 8。これは通常、30を2で割った結果に8を足したものとして評価される。2 + 8で割りたい場合は、30 / (2 + 8)と記述します。</p>
</div>
<p>括弧は式の中に入れ子にすることができる。最も内側の括弧式が最初に評価されます。</p>
<h2 id="Usage" class="common-anchor-header">使用法<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusで使用可能な全てのブール式の使用例を以下に示す(<code translate="no">int64</code> は INT64型のデータを含むスカラーフィールド、<code translate="no">float</code> は浮動小数点型のデータを含むスカラーフィールド、<code translate="no">VARCHAR</code> は VARCHAR型のデータを含むスカラーフィールドを表す)：</p>
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
<li>BinaryLogicalOpと括弧</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;(int64 &gt; 0 &amp;&amp; int64 &lt; 400) or (int64 &gt; 500 &amp;&amp; int64 &lt; 1000)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>TermExpr および UnaryLogicOp</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 not in [1, 2, 3]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"><span class="hljs-variable constant_">VARCHAR</span> not <span class="hljs-keyword">in</span> [<span class="hljs-string">&quot;str1&quot;</span>, <span class="hljs-string">&quot;str2&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<ol start="4">
<li>TermExpr、BinaryLogicalOp、および CmpOp（異なるフィールド上）</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 in [1, 2, 3] and float != 2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="5">
<li>BinaryLogicalOp および CmpOp</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 == 0 || int64 == 1 || int64 == 2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="6">
<li>CmpOp および UnaryArithOp または BinaryArithOp</li>
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
<p><code translate="no">JSON_CONTAINS</code> （第2引数）ステートメントのJSON式がリストの場合、識別子（第1引数）はリストのリストでなければなりません。そうでない場合、ステートメントは常に False と評価されます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># {&quot;x&quot;: [1,2,3]}</span>
json_contains(x, <span class="hljs-number">1</span>) <span class="hljs-comment"># ==&gt; true</span>
json_contains(x, <span class="hljs-string">&quot;a&quot;</span>) <span class="hljs-comment"># ==&gt; false</span>
    
<span class="hljs-comment"># {&quot;x&quot;: [[1,2,3], [4,5,6], [7,8,9]]}</span>
json_contains(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains(x, [<span class="hljs-number">3</span>,<span class="hljs-number">2</span>,<span class="hljs-number">1</span>]) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">JSON_CONTAINS_ALL(identifier, JsonExpr)</code></p>
<p><code translate="no">JSON_CONTAINS_ALL</code> ステートメントの JSON 式は、常にリストでなければなりません。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># {&quot;x&quot;: [1,2,3,4,5,7,8]}</span>
json_contains_all(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains_all(x, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; false 6 is not exists</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">JSON_CONTAINS_ANY(identifier, JsonExpr)</code></p>
<p><code translate="no">JSON_CONTAINS_ANY</code> 、JSON式は常にリストでなければならない。そうでない場合は、<code translate="no">JSON_CONTAINS</code> と同じ動作をする。</p>
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
<p><code translate="no">ARRAY_CONTAINS</code> （第2引数）文の配列式がリストの場合、識別子（第1引数）はリストのリストでなければならない。そうでない場合、文は常に False と評価される。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &#x27;int_array&#x27;: [1,2,3]</span>
array_contains(int_array, <span class="hljs-number">1</span>) <span class="hljs-comment"># ==&gt; true</span>
array_contains(int_array, <span class="hljs-string">&quot;a&quot;</span>) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_CONTAINS_ALL(identifier, ArrayExpr)</code></p>
<p><code translate="no">ARRAY_CONTAINS_ALL</code> 文の配列式は常にリストでなければならない。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_contains_all(int_array, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_all(int_array, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; false 6 is not exists</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_CONTAINS_ANY(identifier, ArrayExpr)</code></p>
<p><code translate="no">ARRAY_CONTAINS_ANY</code> 文の配列式は常にリストでなければならない。そうでない場合は、<code translate="no">ARRAY_CONTAINS</code> と同じ動作をします。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_contains_any(int_array, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_any(int_array, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_any(int_array, [<span class="hljs-number">6</span>,<span class="hljs-number">9</span>]) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_LENGTH(identifier)</code></p>
<p>配列の要素数をチェックする。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_length(int_array) <span class="hljs-comment"># ==&gt; 7</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">次のステップ<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusでビットセットがどのように機能するかがわかったところで、次のこともやってみましょう：</p>
<ul>
<li><a href="/docs/ja/v2.4.x/multi-vector-search.md">ハイブリッド検索の</a>方法</li>
<li><a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">文字列を使って</a>検索結果を<a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">フィルタリング</a>する方法を学ぶ。</li>
<li><a href="/docs/ja/v2.4.x/enable-dynamic-field.md">ブーリアン式の構築におけるダイナミックフィールドの使用</a>方法を学ぶ。</li>
</ul>
