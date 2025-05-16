---
id: boolean.md
summary: Conoscere le regole delle espressioni booleane in Milvus.
title: Regole di filtraggio scalari
---
<h1 id="Scalar-Filtering-Rules" class="common-anchor-header">Regole di filtraggio scalari<button data-href="#Scalar-Filtering-Rules" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">Panoramica<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Un'espressione di predicato produce un valore booleano. Milvus esegue il filtraggio scalare cercando con i predicati. Un'espressione di predicato, quando viene valutata, restituisce VERO o FALSO. Per istruzioni sull'uso delle espressioni di predicato, consultare il <a href="/api-reference/pymilvus/v2.4.x/About.md">Python SDK API Reference</a>.</p>
<p>Le regole della grammatica<a href="https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form">EBNF</a> descrivono le regole delle espressioni booleane:</p>
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
<p>La tabella seguente elenca la descrizione di ogni simbolo citato nelle regole delle espressioni booleane.</p>
<table>
<thead>
<tr><th>Notazione</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td>=</td><td>Definizione.</td></tr>
<tr><td>,</td><td>Concatenazione.</td></tr>
<tr><td>;</td><td>Terminazione.</td></tr>
<tr><td>|</td><td>Alternanza.</td></tr>
<tr><td>{...}</td><td>Ripetizione.</td></tr>
<tr><td>(...)</td><td>Raggruppamento.</td></tr>
<tr><td>NULLA</td><td>Vuoto. L'espressione può essere una stringa vuota.</td></tr>
<tr><td>INTEGRO</td><td>Numeri interi come 1, 2, 3.</td></tr>
<tr><td>PIANO</td><td>Numeri a virgola mobile come 1.0, 2.0.</td></tr>
<tr><td>CONST</td><td>Numeri interi o numeri float.</td></tr>
<tr><td>IDENTIFICATORE</td><td>Identificatore. In Milvus, IDENTIFIER rappresenta il nome del campo.</td></tr>
<tr><td>LogicalOp</td><td>LogicalOp è un operatore logico che consente di combinare più operazioni relazionali in un unico confronto. Il valore restituito di un LogicalOp è TRUE (1) o FALSE (0). Esistono due tipi di LogicalOp: BinaryLogicalOp e UnaryLogicalOp.</td></tr>
<tr><td>UnaryLogicalOp</td><td>UnaryLogicalOp si riferisce all'operatore logico unario &quot;not&quot;.</td></tr>
<tr><td>Operatore logico binario</td><td>Operatori logici binari che eseguono azioni su due operandi. In un'espressione complessa con due o più operandi, l'ordine di valutazione dipende dalle regole di precedenza.</td></tr>
<tr><td>ArithmeticOp</td><td>Un ArithmeticOp, ossia un operatore aritmetico, esegue operazioni matematiche come addizione e sottrazione sugli operandi.</td></tr>
<tr><td>UnaryArithOp</td><td>Un UnaryArithOp è un operatore aritmetico che esegue un'operazione su un singolo operando. L'UnaryArithOp negativo trasforma un'espressione positiva in una negativa o viceversa.</td></tr>
<tr><td>ArithOp binario</td><td>Un BinaryArithOp, ossia un operatore binario, esegue operazioni su due operandi. In un'espressione complessa con due o più operandi, l'ordine di valutazione dipende dalle regole di precedenza.</td></tr>
<tr><td>CmpOp</td><td>CmpOp è un operatore relazionale che esegue azioni su due operandi.</td></tr>
<tr><td>CmpOpRestricted</td><td>CmpOpRestricted è limitato a &quot;Meno di&quot; e &quot;Uguale&quot;.</td></tr>
<tr><td>CostanteExpr</td><td>ConstantExpr può essere una costante o una BinaryArithOp su due ConstExpr o una UnaryArithOp su una singola ConstantExpr. È definita in modo ricorsivo.</td></tr>
<tr><td>Array di costanti</td><td>ConstantArray è racchiuso tra parentesi quadre e ConstantExpr può essere ripetuto tra le parentesi quadre. ConstArray deve includere almeno una ConstantExpr.</td></tr>
<tr><td>TermExpr</td><td>TermExpr viene utilizzato per verificare se il valore di un IDENTIFIER è presente in un ConstantArray. TermExpr è rappresentato da &quot;in&quot;.</td></tr>
<tr><td>ConfrontaExpr</td><td>Una CompareExpr, ovvero un'espressione di confronto, può essere costituita da operazioni relazionali su due IDENTIFIER, oppure da operazioni relazionali su un IDENTIFIER e una ConstantExpr, oppure da operazioni ternarie su due ConstantExpr e un IDENTIFIER.</td></tr>
<tr><td>Espressione singola</td><td>SingleExpr, cioè un'espressione singola, può essere una TermExpr o una CompareExpr.</td></tr>
<tr><td>Espressioni logiche</td><td>Una LogicalExpr può essere una BinaryLogicalOp su due LogicalExpr, o una UnaryLogicalOp su una singola LogicalExpr, o una LogicalExpr raggruppata tra parentesi, o una SingleExpr. La LogicalExpr è definita in modo ricorsivo.</td></tr>
<tr><td>Expr</td><td>Expr, un'abbreviazione che significa espressione, può essere LogicalExpr o NIL.</td></tr>
<tr><td>MatchOp</td><td>Un MatchOp, ossia un operatore di corrispondenza, confronta una stringa con una costante di stringa o una costante di prefisso, infisso o suffisso di stringa.</td></tr>
<tr><td>JsonArrayOp</td><td>Un JsonOp, cioè un operatore JSON, verifica se l'identificatore specificato contiene gli elementi specificati.</td></tr>
<tr><td>ArrayOp</td><td>Un ArrayOp, cioè un operatore di array, verifica se l'identificatore specificato contiene gli elementi specificati.</td></tr>
</tbody>
</table>
<h2 id="Operators" class="common-anchor-header">Operatori<button data-href="#Operators" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Logical-operators" class="common-anchor-header">Operatori logici</h3><p>Gli operatori logici eseguono un confronto tra due espressioni.</p>
<table>
<thead>
<tr><th>Simbolo</th><th>Operazione</th><th>Esempio</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td>'e' &amp;&amp;</td><td>e</td><td>expr1 &amp;&amp; expr2</td><td>È vero se sono vere sia expr1 che expr2.</td></tr>
<tr><td>'o' ||</td><td>o</td><td>expr1 || expr2</td><td>È vero se sono vere sia expr1 che expr2.</td></tr>
</tbody>
</table>
<h3 id="Binary-arithmetic-operators" class="common-anchor-header">Operatori aritmetici binari</h3><p>Gli operatori aritmetici binari contengono due operandi e possono eseguire operazioni aritmetiche di base e restituire il risultato corrispondente.</p>
<table>
<thead>
<tr><th>Simbolo</th><th>Operazione</th><th>Esempio</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td>+</td><td>Addizione</td><td>a + b</td><td>Aggiunge i due operandi.</td></tr>
<tr><td>-</td><td>Sottrazione</td><td>a - b</td><td>Sottrarre il secondo operando dal primo operando.</td></tr>
<tr><td>*</td><td>Moltiplicazione</td><td>a * b</td><td>Moltiplica i due operandi.</td></tr>
<tr><td>/</td><td>Divisione</td><td>a / b</td><td>Divide il primo operando per il secondo operando.</td></tr>
<tr><td>**</td><td>Potenza</td><td>a ** b</td><td>Eleva il primo operando alla potenza del secondo operando.</td></tr>
<tr><td>%</td><td>Modulo</td><td>a % b</td><td>Divide il primo operando per il secondo operando e restituisce la parte rimanente.</td></tr>
</tbody>
</table>
<h3 id="Relational-operators" class="common-anchor-header">Operatori relazionali</h3><p>Gli operatori relazionali utilizzano i simboli per verificare l'uguaglianza, la disuguaglianza o l'ordine relativo tra due espressioni.</p>
<table>
<thead>
<tr><th>Simbolo</th><th>Operazione</th><th>Esempio</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td>&lt;</td><td>Meno di</td><td>a &lt; b</td><td>Vero se a è minore di b.</td></tr>
<tr><td>&gt;</td><td>Maggiore di</td><td>a &gt; b</td><td>Vero se a è maggiore di b.</td></tr>
<tr><td>==</td><td>Uguale</td><td>a == b</td><td>Vero se a è uguale a b.</td></tr>
<tr><td>!=</td><td>Non uguale</td><td>a = b</td><td>Vero se a non è uguale a b.</td></tr>
<tr><td>&lt;=</td><td>Meno di o uguale</td><td>a &lt;= b</td><td>Vero se a è minore o uguale a b.</td></tr>
<tr><td>&gt;=</td><td>Maggiore o uguale a</td><td>a &gt;= b</td><td>Vero se a è maggiore o uguale a b.</td></tr>
</tbody>
</table>
<h2 id="Operator-precedence-and-associativity" class="common-anchor-header">Precedenza e associatività degli operatori<button data-href="#Operator-precedence-and-associativity" class="anchor-icon" translate="no">
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
    </button></h2><p>La tabella seguente elenca la precedenza e l'associatività degli operatori. Gli operatori sono elencati dall'alto verso il basso, con precedenza decrescente.</p>
<table>
<thead>
<tr><th>Precedenza</th><th>Operatore</th><th>Descrizione</th><th>Associatività</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>+ -</td><td>UnarioArithOp</td><td>Da sinistra a destra</td></tr>
<tr><td>2</td><td>non</td><td>UnarioLogicOp</td><td>Da destra a sinistra</td></tr>
<tr><td>3</td><td>**</td><td>BinaryArithOp</td><td>Da sinistra a destra</td></tr>
<tr><td>4</td><td>* / %</td><td>BinaryArithOp</td><td>Da sinistra a destra</td></tr>
<tr><td>5</td><td>+ -</td><td>BinaryArithOp</td><td>Da sinistra a destra</td></tr>
<tr><td>6</td><td>&lt; &lt;= &gt; &gt;=</td><td>CmpOp</td><td>Da sinistra a destra</td></tr>
<tr><td>7</td><td>== !=</td><td>CmpOp</td><td>Da sinistra a destra</td></tr>
<tr><td>8</td><td>come LIKE</td><td>MatchOp</td><td>Da sinistra a destra</td></tr>
<tr><td>9</td><td>json_contains JSON_CONTAINS</td><td>JsonArrayOp</td><td>Da sinistra a destra</td></tr>
<tr><td>9</td><td>array_contiene ARRAY_CONTAINS</td><td>ArrayOp</td><td>Da sinistra a destra</td></tr>
<tr><td>10</td><td>json_contains_all JSON_CONTAINS_ALL</td><td>JsonArrayOp</td><td>Da sinistra a destra</td></tr>
<tr><td>10</td><td>array_contains_all ARRAY_CONTAINS_ALL</td><td>ArrayOp</td><td>Da sinistra a destra</td></tr>
<tr><td>11</td><td>json_contains_any JSON_CONTAINS_ANY</td><td>JsonArrayOp</td><td>Da sinistra a destra</td></tr>
<tr><td>11</td><td>array_contains_any ARRAY_CONTAINS_ANY</td><td>ArrayOp</td><td>Da sinistra a destra</td></tr>
<tr><td>12</td><td>lunghezza_array ARRAY_LENGTH</td><td>ArrayOp</td><td>Da sinistra a destra</td></tr>
<tr><td>13</td><td>&amp;&amp; e</td><td>BinaryLogicOp</td><td>Da sinistra a destra</td></tr>
<tr><td>14</td><td>|| o</td><td>BinaryLogicOp</td><td>Da sinistra a destra</td></tr>
</tbody>
</table>
<p>Le espressioni vengono normalmente valutate da sinistra a destra. Le espressioni complesse vengono valutate una alla volta. L'ordine di valutazione delle espressioni è determinato dalla precedenza degli operatori utilizzati.</p>
<p>Se un'espressione contiene due o più operatori con la stessa precedenza, l'operatore più a sinistra viene valutato per primo.</p>
<div class="alert note">
<p>Ad esempio, 10 / 2 * 5 verrà valutato come (10 / 2) e il risultato verrà moltiplicato per 5.</p>
</div>
<p>Quando un'operazione con precedenza inferiore deve essere elaborata per prima, deve essere racchiusa tra parentesi.</p>
<div class="alert note">
<p>Ad esempio, 30 / 2 + 8. Questa operazione viene normalmente valutata come 30 diviso 2 e 8 aggiunto al risultato. Se si vuole dividere per 2 + 8, si deve scrivere 30 / (2 + 8).</p>
</div>
<p>Le parentesi possono essere annidate all'interno delle espressioni. Le espressioni parentetiche più interne vengono valutate per prime.</p>
<h2 id="Usage" class="common-anchor-header">Utilizzo<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>Di seguito sono elencati esempi di utilizzo di tutte le espressioni booleane disponibili in Milvus (<code translate="no">int64</code> rappresenta il campo scalare che contiene dati di tipo INT64, <code translate="no">float</code> rappresenta il campo scalare che contiene dati di tipo floating-point e <code translate="no">VARCHAR</code> rappresenta il campo scalare che contiene dati di tipo VARCHAR):</p>
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
<li>BinaryLogicalOp e parentesi</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;(int64 &gt; 0 &amp;&amp; int64 &lt; 400) or (int64 &gt; 500 &amp;&amp; int64 &lt; 1000)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>TermExpr e UnaryLogicOp</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 not in [1, 2, 3]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"><span class="hljs-variable constant_">VARCHAR</span> not <span class="hljs-keyword">in</span> [<span class="hljs-string">&quot;str1&quot;</span>, <span class="hljs-string">&quot;str2&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<ol start="4">
<li>TermExpr, BinaryLogicalOp e CmpOp (su campi diversi)</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 in [1, 2, 3] and float != 2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="5">
<li>BinaryLogicalOp e CmpOp</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 == 0 || int64 == 1 || int64 == 2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="6">
<li>CmpOp e UnaryArithOp o BinaryArithOp</li>
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
<p>Se l'espressione JSON di un'istruzione <code translate="no">JSON_CONTAINS</code> (il secondo argomento) è una lista, l'identificatore (il primo argomento) deve essere una lista di liste. Altrimenti, l'istruzione valuta sempre False.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># {&quot;x&quot;: [1,2,3]}</span>
json_contains(x, <span class="hljs-number">1</span>) <span class="hljs-comment"># ==&gt; true</span>
json_contains(x, <span class="hljs-string">&quot;a&quot;</span>) <span class="hljs-comment"># ==&gt; false</span>
    
<span class="hljs-comment"># {&quot;x&quot;: [[1,2,3], [4,5,6], [7,8,9]]}</span>
json_contains(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains(x, [<span class="hljs-number">3</span>,<span class="hljs-number">2</span>,<span class="hljs-number">1</span>]) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">JSON_CONTAINS_ALL(identifier, JsonExpr)</code></p>
<p>L'espressione JSON di un'istruzione <code translate="no">JSON_CONTAINS_ALL</code> deve sempre essere un elenco.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># {&quot;x&quot;: [1,2,3,4,5,7,8]}</span>
json_contains_all(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains_all(x, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; false 6 is not exists</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">JSON_CONTAINS_ANY(identifier, JsonExpr)</code></p>
<p>L'espressione JSON in un'istruzione <code translate="no">JSON_CONTAINS_ANY</code> deve essere sempre un elenco. Altrimenti, si comporta come <code translate="no">JSON_CONTAINS</code>.</p>
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
<p>Se l'espressione array di un'istruzione <code translate="no">ARRAY_CONTAINS</code> (il secondo argomento) è un elenco, l'identificatore (il primo argomento) deve essere elenco di elenco. Altrimenti, l'istruzione valuta sempre False.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &#x27;int_array&#x27;: [1,2,3]</span>
array_contains(int_array, <span class="hljs-number">1</span>) <span class="hljs-comment"># ==&gt; true</span>
array_contains(int_array, <span class="hljs-string">&quot;a&quot;</span>) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_CONTAINS_ALL(identifier, ArrayExpr)</code></p>
<p>L'espressione della matrice in un'istruzione <code translate="no">ARRAY_CONTAINS_ALL</code> deve sempre essere un elenco.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_contains_all(int_array, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_all(int_array, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; false 6 is not exists</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_CONTAINS_ANY(identifier, ArrayExpr)</code></p>
<p>L'espressione della matrice in un'istruzione <code translate="no">ARRAY_CONTAINS_ANY</code> deve essere sempre un elenco. Altrimenti, si comporta come <code translate="no">ARRAY_CONTAINS</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_contains_any(int_array, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_any(int_array, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_any(int_array, [<span class="hljs-number">6</span>,<span class="hljs-number">9</span>]) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_LENGTH(identifier)</code></p>
<p>Verificare il numero di elementi di una matrice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_length(int_array) <span class="hljs-comment"># ==&gt; 7</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">Cosa succede ora<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Ora che sapete come funzionano i bitset in Milvus, potreste anche voler</p>
<ul>
<li>Imparare a condurre una <a href="/docs/it/v2.4.x/multi-vector-search.md">ricerca ibrida</a>.</li>
<li>Imparare a <a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">usare le stringhe per filtrare i</a> risultati della ricerca.</li>
<li>Imparare a <a href="/docs/it/v2.4.x/enable-dynamic-field.md">utilizzare i campi dinamici nella costruzione di espressioni booleane</a>.</li>
</ul>
