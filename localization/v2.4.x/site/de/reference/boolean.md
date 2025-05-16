---
id: boolean.md
summary: Lernen Sie die Regeln für boolesche Ausdrücke in Milvus kennen.
title: Skalare Filterregeln
---
<h1 id="Scalar-Filtering-Rules" class="common-anchor-header">Skalare Filterregeln<button data-href="#Scalar-Filtering-Rules" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">Übersicht<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Ein Prädikatsausdruck gibt einen booleschen Wert aus. Milvus führt eine skalare Filterung durch, indem es mit Prädikaten sucht. Ein Prädikatsausdruck gibt, wenn er ausgewertet wird, entweder TRUE oder FALSE zurück. Eine Anleitung zur Verwendung von Prädikatsausdrücken finden Sie in der <a href="/api-reference/pymilvus/v2.4.x/About.md">Python SDK API-Referenz</a>.</p>
<p>Die Regeln der<a href="https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form">EBNF-Grammatik</a> beschreiben die Regeln für boolesche Ausdrücke:</p>
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
<p>Die folgende Tabelle enthält die Beschreibung jedes Symbols, das in den obigen Regeln für boolesche Ausdrücke erwähnt wird.</p>
<table>
<thead>
<tr><th>Notation</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td>=</td><td>Definition.</td></tr>
<tr><td>,</td><td>Verkettung.</td></tr>
<tr><td>;</td><td>Beendigung.</td></tr>
<tr><td>|</td><td>Abwechslung.</td></tr>
<tr><td>{...}</td><td>Wiederholung.</td></tr>
<tr><td>(...)</td><td>Gruppierung.</td></tr>
<tr><td>NIL</td><td>Leer. Der Ausdruck kann eine leere Zeichenkette sein.</td></tr>
<tr><td>INTEGER</td><td>Ganzzahlen wie z. B. 1, 2, 3.</td></tr>
<tr><td>FLOAT</td><td>Fließkommazahlen wie 1.0, 2.0.</td></tr>
<tr><td>CONST</td><td>Ganzzahlen oder Gleitkommazahlen.</td></tr>
<tr><td>IDENTIFIER</td><td>Bezeichner. In Milvus stellt der IDENTIFIER den Feldnamen dar.</td></tr>
<tr><td>LogicalOp</td><td>Ein LogicalOp ist ein logischer Operator, der die Kombination von mehr als einer relationalen Operation in einem Vergleich unterstützt. Der Rückgabewert eines LogicalOp ist entweder TRUE (1) oder FALSE (0). Es gibt zwei Arten von LogicalOps, einschließlich BinaryLogicalOps und UnaryLogicalOps.</td></tr>
<tr><td>UnaryLogicalOp</td><td>UnaryLogicalOp bezieht sich auf den unären logischen Operator &quot;not&quot;.</td></tr>
<tr><td>BinaryLogicalOp</td><td>Binäre logische Operatoren, die Aktionen auf zwei Operanden ausführen. In einem komplexen Ausdruck mit zwei oder mehr Operanden hängt die Reihenfolge der Auswertung von Vorrangregeln ab.</td></tr>
<tr><td>ArithmeticOp</td><td>Ein ArithmeticOp, d. h. ein arithmetischer Operator, führt mathematische Operationen wie Addition und Subtraktion an Operanden durch.</td></tr>
<tr><td>UnaryArithOp</td><td>Ein UnaryArithOp ist ein arithmetischer Operator, der eine Operation mit einem einzigen Operanden durchführt. Der negative UnaryArithOp wandelt einen positiven Ausdruck in einen negativen um oder andersherum.</td></tr>
<tr><td>BinaryArithOp</td><td>Ein BinaryArithOp, also ein binärer Operator, führt Operationen mit zwei Operanden durch. Bei einem komplexen Ausdruck mit zwei oder mehr Operanden hängt die Reihenfolge der Auswertung von den Vorrangregeln ab.</td></tr>
<tr><td>CmpOp</td><td>CmpOp ist ein relationaler Operator, der Aktionen mit zwei Operanden durchführt.</td></tr>
<tr><td>CmpOpRestricted</td><td>CmpOpRestricted ist auf &quot;Kleiner als&quot; und &quot;Gleich&quot; beschränkt.</td></tr>
<tr><td>KonstanteExpr</td><td>ConstantExpr kann eine Konstante oder ein BinaryArithOp auf zwei ConstExprs oder ein UnaryArithOp auf einen einzelnen ConstantExpr sein. Er wird rekursiv definiert.</td></tr>
<tr><td>ConstantArray</td><td>ConstantArray wird von eckigen Klammern umschlossen, und ConstantExpr kann in den eckigen Klammern wiederholt werden. ConstArray muss mindestens einen ConstantExpr enthalten.</td></tr>
<tr><td>TermExpr</td><td>TermExpr wird verwendet, um zu prüfen, ob der Wert eines IDENTIFIER in einem ConstantArray vorkommt. TermExpr wird durch &quot;in&quot; dargestellt.</td></tr>
<tr><td>CompareExpr</td><td>Ein CompareExpr, d. h. ein Vergleichsausdruck, kann eine relationale Operation auf zwei IDENTIFIERs, eine relationale Operation auf einen IDENTIFIER und einen ConstantExpr oder eine ternäre Operation auf zwei ConstantExprs und einen IDENTIFIER sein.</td></tr>
<tr><td>EinzelExpr</td><td>SingleExpr, also ein einzelner Ausdruck, kann entweder ein TermExpr oder ein CompareExpr sein.</td></tr>
<tr><td>LogicalExpr</td><td>Ein LogicalExpr kann ein BinaryLogicalOp auf zwei LogicalExprs sein, oder ein UnaryLogicalOp auf einen einzelnen LogicalExpr, oder ein LogicalExpr, der in Klammern gruppiert ist, oder ein SingleExpr. Der LogicalExpr wird rekursiv definiert.</td></tr>
<tr><td>Expr</td><td>Expr, eine Abkürzung für Ausdruck, kann LogicalExpr oder NIL sein.</td></tr>
<tr><td>MatchOp</td><td>Ein MatchOp, d.h. ein Übereinstimmungsoperator, vergleicht eine Zeichenkette mit einer Zeichenkettenkonstante oder einer Präfix-, Infix- oder Suffixkonstante.</td></tr>
<tr><td>JsonArrayOp</td><td>Ein JsonOp, d. h. ein JSON-Operator, prüft, ob der angegebene Bezeichner die angegebenen Elemente enthält.</td></tr>
<tr><td>ArrayOp</td><td>Ein ArrayOp, d. h. ein Array-Operator, prüft, ob der angegebene Bezeichner die angegebenen Elemente enthält.</td></tr>
</tbody>
</table>
<h2 id="Operators" class="common-anchor-header">Operatoren<button data-href="#Operators" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Logical-operators" class="common-anchor-header">Logische Operatoren</h3><p>Logische Operatoren führen einen Vergleich zwischen zwei Ausdrücken durch.</p>
<table>
<thead>
<tr><th>Symbol</th><th>Operation</th><th>Beispiel</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td>'und' &amp;&amp;</td><td>und</td><td>expr1 &amp;&amp; expr2</td><td>Wahr, wenn sowohl expr1 als auch expr2 wahr sind.</td></tr>
<tr><td>'oder' ||</td><td>oder</td><td>expr1 || expr2</td><td>Wahr, wenn entweder expr1 oder expr2 wahr sind.</td></tr>
</tbody>
</table>
<h3 id="Binary-arithmetic-operators" class="common-anchor-header">Binäre arithmetische Operatoren</h3><p>Binäre arithmetische Operatoren enthalten zwei Operanden und können grundlegende arithmetische Operationen durchführen und das entsprechende Ergebnis zurückgeben.</p>
<table>
<thead>
<tr><th>Symbol</th><th>Operation</th><th>Beispiel</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td>+</td><td>Addition</td><td>a + b</td><td>Addiert die beiden Operanden.</td></tr>
<tr><td>-</td><td>Subtraktion</td><td>a - b</td><td>Subtraktion des zweiten Operanden vom ersten Operanden.</td></tr>
<tr><td>*</td><td>Multiplikation</td><td>a * b</td><td>Multiplikation der beiden Operanden.</td></tr>
<tr><td>/</td><td>Division</td><td>a / b</td><td>Teilt den ersten Operanden durch den zweiten Operanden.</td></tr>
<tr><td>**</td><td>Potenz</td><td>a ** b</td><td>Erhöhen des ersten Operanden mit der Potenz des zweiten Operanden.</td></tr>
<tr><td>%</td><td>Modulo</td><td>a % b</td><td>Teilt den ersten Operanden durch den zweiten Operanden und liefert den Rest.</td></tr>
</tbody>
</table>
<h3 id="Relational-operators" class="common-anchor-header">Relationale Operatoren</h3><p>Relationale Operatoren verwenden Symbole, um die Gleichheit, Ungleichheit oder relative Reihenfolge zwischen zwei Ausdrücken zu prüfen.</p>
<table>
<thead>
<tr><th>Symbol</th><th>Operation</th><th>Beispiel</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td>&lt;</td><td>Kleiner als</td><td>a &lt; b</td><td>Wahr, wenn a kleiner als b ist.</td></tr>
<tr><td>&gt;</td><td>Größer als</td><td>a &gt; b</td><td>Wahr, wenn a größer ist als b.</td></tr>
<tr><td>==</td><td>Gleich</td><td>a == b</td><td>Wahr, wenn a gleich b ist.</td></tr>
<tr><td>!=</td><td>Nicht gleich</td><td>a != b</td><td>Wahr, wenn a nicht gleich b ist.</td></tr>
<tr><td>&lt;=</td><td>Kleiner als oder gleich</td><td>a &lt;= b</td><td>Wahr, wenn a kleiner als oder gleich b ist.</td></tr>
<tr><td>&gt;=</td><td>Größer als oder gleich</td><td>a &gt;= b</td><td>Wahr, wenn a größer als oder gleich b ist.</td></tr>
</tbody>
</table>
<h2 id="Operator-precedence-and-associativity" class="common-anchor-header">Vorrangigkeit und Assoziativität von Operatoren<button data-href="#Operator-precedence-and-associativity" class="anchor-icon" translate="no">
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
    </button></h2><p>In der folgenden Tabelle sind die Rangfolge und die Assoziativität der Operatoren aufgeführt. Die Operatoren sind von oben nach unten in absteigender Reihenfolge aufgeführt.</p>
<table>
<thead>
<tr><th>Vorrangigkeit</th><th>Operator</th><th>Beschreibung</th><th>Assoziativität</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>+ -</td><td>UnaryArithOp</td><td>Links-nach-Rechts</td></tr>
<tr><td>2</td><td>nicht</td><td>UnaryLogicOp</td><td>Rechts-nach-links</td></tr>
<tr><td>3</td><td>**</td><td>BinärArithOp</td><td>Links-nach-Rechts</td></tr>
<tr><td>4</td><td>* / %</td><td>BinärArithOp</td><td>Links-nach-Rechts</td></tr>
<tr><td>5</td><td>+ -</td><td>BinärArithOp</td><td>Links-nach-Rechts</td></tr>
<tr><td>6</td><td>&lt; &lt;= &gt; &gt;=</td><td>CmpOp</td><td>Links-nach-Rechts</td></tr>
<tr><td>7</td><td>== !=</td><td>CmpOp</td><td>Links-nach-Rechts</td></tr>
<tr><td>8</td><td>wie LIKE</td><td>MatchOp</td><td>Links-nach-Rechts</td></tr>
<tr><td>9</td><td>json_contains JSON_CONTAINS</td><td>JsonArrayOp</td><td>Links-nach-Rechts</td></tr>
<tr><td>9</td><td>array_beinhaltet ARRAY_CONTAINS</td><td>ArrayOp</td><td>Links-nach-Rechts</td></tr>
<tr><td>10</td><td>json_contains_all JSON_CONTAINS_ALL</td><td>JsonArrayOp</td><td>Links-nach-Rechts</td></tr>
<tr><td>10</td><td>array_beinhaltet_alle ARRAY_CONTAINS_ALL</td><td>ArrayOp</td><td>Links-nach-Rechts</td></tr>
<tr><td>11</td><td>json_contains_any JSON_CONTAINS_ANY</td><td>JsonArrayOp</td><td>Links-nach-Rechts</td></tr>
<tr><td>11</td><td>array_beinhaltet_alle ARRAY_CONTAINS_ANY</td><td>ArrayOp</td><td>Links-nach-Rechts</td></tr>
<tr><td>12</td><td>array_Länge ARRAY_LENGTH</td><td>ArrayOp</td><td>Links-nach-Rechts</td></tr>
<tr><td>13</td><td>&amp;&amp; und</td><td>BinaryLogicOp</td><td>Links-nach-Rechts</td></tr>
<tr><td>14</td><td>|| oder</td><td>BinaryLogicOp</td><td>Links-nach-Rechts</td></tr>
</tbody>
</table>
<p>Ausdrücke werden normalerweise von links nach rechts ausgewertet. Komplexe Ausdrücke werden der Reihe nach ausgewertet. Die Reihenfolge, in der die Ausdrücke ausgewertet werden, wird durch den Vorrang der verwendeten Operatoren bestimmt.</p>
<p>Enthält ein Ausdruck zwei oder mehr Operatoren mit demselben Vorrang, wird der Operator auf der linken Seite zuerst ausgewertet.</p>
<div class="alert note">
<p>Zum Beispiel wird 10 / 2 * 5 als (10 / 2) ausgewertet und das Ergebnis mit 5 multipliziert.</p>
</div>
<p>Wenn eine Operation mit niedrigerem Vorrang zuerst verarbeitet werden soll, muss sie in Klammern gesetzt werden.</p>
<div class="alert note">
<p>Zum Beispiel: 30 / 2 + 8. Dies wird normalerweise als 30 geteilt durch 2 ausgewertet und dann 8 zum Ergebnis addiert. Wenn Sie durch 2 + 8 dividieren wollen, sollte es als 30 / (2 + 8) geschrieben werden.</p>
</div>
<p>Klammern können innerhalb von Ausdrücken verschachtelt werden. Die innersten Klammerausdrücke werden zuerst ausgewertet.</p>
<h2 id="Usage" class="common-anchor-header">Verwendung<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>Beispiele für die Verwendung aller verfügbaren booleschen Ausdrücke in Milvus sind im Folgenden aufgeführt (<code translate="no">int64</code> steht für das Skalarfeld, das Daten vom Typ INT64 enthält, <code translate="no">float</code> steht für das Skalarfeld, das Daten vom Typ Fließkomma enthält, und <code translate="no">VARCHAR</code> steht für das Skalarfeld, das Daten vom Typ VARCHAR enthält):</p>
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
<li>BinaryLogicalOp und Klammern</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;(int64 &gt; 0 &amp;&amp; int64 &lt; 400) or (int64 &gt; 500 &amp;&amp; int64 &lt; 1000)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>TermExpr und UnaryLogicOp</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 not in [1, 2, 3]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"><span class="hljs-variable constant_">VARCHAR</span> not <span class="hljs-keyword">in</span> [<span class="hljs-string">&quot;str1&quot;</span>, <span class="hljs-string">&quot;str2&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<ol start="4">
<li>TermExpr, BinaryLogicalOp und CmpOp (für verschiedene Felder)</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 in [1, 2, 3] and float != 2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="5">
<li>BinaryLogicalOp und CmpOp</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 == 0 || int64 == 1 || int64 == 2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="6">
<li>CmpOp und UnaryArithOp oder BinaryArithOp</li>
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
<p>Wenn der JSON-Ausdruck einer <code translate="no">JSON_CONTAINS</code> -Anweisung (das zweite Argument) eine Liste ist, sollte der Bezeichner (das erste Argument) list of list sein. Andernfalls wird die Anweisung immer zu False ausgewertet.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># {&quot;x&quot;: [1,2,3]}</span>
json_contains(x, <span class="hljs-number">1</span>) <span class="hljs-comment"># ==&gt; true</span>
json_contains(x, <span class="hljs-string">&quot;a&quot;</span>) <span class="hljs-comment"># ==&gt; false</span>
    
<span class="hljs-comment"># {&quot;x&quot;: [[1,2,3], [4,5,6], [7,8,9]]}</span>
json_contains(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains(x, [<span class="hljs-number">3</span>,<span class="hljs-number">2</span>,<span class="hljs-number">1</span>]) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">JSON_CONTAINS_ALL(identifier, JsonExpr)</code></p>
<p>Der JSON-Ausdruck in einer <code translate="no">JSON_CONTAINS_ALL</code> -Anweisung sollte immer eine Liste sein.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># {&quot;x&quot;: [1,2,3,4,5,7,8]}</span>
json_contains_all(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains_all(x, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; false 6 is not exists</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">JSON_CONTAINS_ANY(identifier, JsonExpr)</code></p>
<p>Der JSON-Ausdruck in einer <code translate="no">JSON_CONTAINS_ANY</code> -Anweisung sollte immer eine Liste sein. Andernfalls verhält sich die Anweisung genauso wie <code translate="no">JSON_CONTAINS</code>.</p>
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
<p>Wenn der Array-Ausdruck einer <code translate="no">ARRAY_CONTAINS</code> -Anweisung (das zweite Argument) eine Liste ist, sollte der Bezeichner (das erste Argument) list of list sein. Andernfalls wird die Anweisung immer zu False ausgewertet.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &#x27;int_array&#x27;: [1,2,3]</span>
array_contains(int_array, <span class="hljs-number">1</span>) <span class="hljs-comment"># ==&gt; true</span>
array_contains(int_array, <span class="hljs-string">&quot;a&quot;</span>) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_CONTAINS_ALL(identifier, ArrayExpr)</code></p>
<p>Der Array-Ausdruck in einer <code translate="no">ARRAY_CONTAINS_ALL</code> -Anweisung sollte immer eine Liste sein.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_contains_all(int_array, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_all(int_array, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; false 6 is not exists</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_CONTAINS_ANY(identifier, ArrayExpr)</code></p>
<p>Der Array-Ausdruck in einer <code translate="no">ARRAY_CONTAINS_ANY</code> -Anweisung sollte immer eine Liste sein. Andernfalls verhält sich die Anweisung genauso wie <code translate="no">ARRAY_CONTAINS</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_contains_any(int_array, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_any(int_array, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_any(int_array, [<span class="hljs-number">6</span>,<span class="hljs-number">9</span>]) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_LENGTH(identifier)</code></p>
<p>Überprüfen Sie die Anzahl der Elemente in einem Array.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_length(int_array) <span class="hljs-comment"># ==&gt; 7</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">Was kommt als Nächstes?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Jetzt, wo Sie wissen, wie Bitsets in Milvus funktionieren, möchten Sie vielleicht auch:</p>
<ul>
<li>Lernen Sie, wie man eine <a href="/docs/de/v2.4.x/multi-vector-search.md">Hybrid-Suche</a> durchführt.</li>
<li>Lernen Sie, wie Sie <a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">Strings zum Filtern</a> Ihrer Suchergebnisse <a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">verwenden</a> können.</li>
<li>Lernen Sie, wie man <a href="/docs/de/v2.4.x/enable-dynamic-field.md">dynamische Felder bei der Erstellung boolescher Ausdrücke verwendet</a>.</li>
</ul>
