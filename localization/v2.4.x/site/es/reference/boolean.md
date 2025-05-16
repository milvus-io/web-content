---
id: boolean.md
summary: Conozca las reglas de expresión booleana en Milvus.
title: Reglas de filtrado escalar
---
<h1 id="Scalar-Filtering-Rules" class="common-anchor-header">Reglas de filtrado escalar<button data-href="#Scalar-Filtering-Rules" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">Resumen<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Una expresión de predicado produce un valor booleano. Milvus realiza el filtrado escalar buscando con predicados. Una expresión predicada, cuando se evalúa, devuelve TRUE o FALSE. Consulte <a href="/api-reference/pymilvus/v2.4.x/About.md">la Referencia de la API del SDK de Python</a> para obtener instrucciones sobre el uso de expresiones de predicado.</p>
<p>Las reglas de la gramática<a href="https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form">EBNF</a> describen las reglas de las expresiones booleanas:</p>
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
<p>La siguiente tabla muestra la descripción de cada símbolo mencionado en las reglas de expresiones booleanas anteriores.</p>
<table>
<thead>
<tr><th>Notación</th><th>Descripción</th></tr>
</thead>
<tbody>
<tr><td>=</td><td>Definición.</td></tr>
<tr><td>,</td><td>Concatenación.</td></tr>
<tr><td>;</td><td>Terminación.</td></tr>
<tr><td>|</td><td>Alternancia.</td></tr>
<tr><td>{...}</td><td>Repetición.</td></tr>
<tr><td>(...)</td><td>Agrupación.</td></tr>
<tr><td>NIL</td><td>Vacío. La expresión puede ser una cadena vacía.</td></tr>
<tr><td>INTEGER</td><td>Números enteros como 1, 2, 3.</td></tr>
<tr><td>FLOAT</td><td>Números flotantes como 1.0, 2.0.</td></tr>
<tr><td>CONST</td><td>Números enteros o flotantes.</td></tr>
<tr><td>IDENTIFICADOR</td><td>Identificador. En Milvus, el IDENTIFIER representa el nombre del campo.</td></tr>
<tr><td>LogicalOp</td><td>Una LogicalOp es un operador lógico que permite combinar más de una operación relacional en una comparación. El valor devuelto por una LogicalOp es TRUE (1) o FALSE (0). Existen dos tipos de LogicalOps: BinaryLogicalOps y UnaryLogicalOps.</td></tr>
<tr><td>UnaryLogicalOp</td><td>UnaryLogicalOp hace referencia al operador lógico unario &quot;not&quot;.</td></tr>
<tr><td>BinaryLogicalOp</td><td>Operadores lógicos binarios que realizan acciones sobre dos operandos. En una expresión compleja con dos o más operandos, el orden de evaluación depende de las reglas de precedencia.</td></tr>
<tr><td>ArithmeticOp</td><td>Un ArithmeticOp, es decir, un operador aritmético, realiza operaciones matemáticas como sumas y restas sobre operandos.</td></tr>
<tr><td>UnaryArithOp</td><td>Un UnaryArithOp es un operador aritmético que realiza una operación sobre un único operando. El UnaryArithOp negativo cambia una expresión positiva en negativa, o al revés.</td></tr>
<tr><td>BinaryArithOp</td><td>Un BinaryArithOp, es decir, un operador binario, realiza operaciones sobre dos operandos. En una expresión compleja con dos o más operandos, el orden de evaluación depende de las reglas de precedencia.</td></tr>
<tr><td>CmpOp</td><td>CmpOp es un operador relacional que realiza acciones sobre dos operandos.</td></tr>
<tr><td>CmpOpRestricted</td><td>CmpOpRestricted está restringido a &quot;Menor que&quot; e &quot;Igual a&quot;.</td></tr>
<tr><td>ConstantExpr</td><td>ConstantExpr puede ser una Constante o un BinaryArithOp sobre dos ConstExprs o un UnaryArithOp sobre una única ConstantExpr. Se define de forma recursiva.</td></tr>
<tr><td>ConstantArray</td><td>ConstantArray está envuelto por corchetes, y ConstantExpr puede repetirse en los corchetes. ConstArray debe incluir al menos una ConstantExpr.</td></tr>
<tr><td>TermExpr</td><td>TermExpr se utiliza para comprobar si el valor de un IDENTIFIER aparece en un ConstantArray. TermExpr se representa mediante &quot;in&quot;.</td></tr>
<tr><td>CompareExpr</td><td>Una CompareExpr, es decir, una expresión de comparación, puede ser una operación relacional sobre dos IDENTIFIERs, o una operación relacional sobre un IDENTIFIER y una ConstantExpr, o una operación ternaria sobre dos ConstantExprs y un IDENTIFIER.</td></tr>
<tr><td>SingleExpr</td><td>SingleExpr, es decir, una única expresión, puede ser un TermExpr o un CompareExpr.</td></tr>
<tr><td>LogicalExpr</td><td>Una LogicalExpr puede ser una BinaryLogicalOp sobre dos LogicalExprs, o una UnaryLogicalOp sobre una única LogicalExpr, o una LogicalExpr agrupada entre paréntesis, o una SingleExpr. La LogicalExpr se define de forma recursiva.</td></tr>
<tr><td>Expr</td><td>Expr, abreviatura que significa expresión, puede ser LogicalExpr o NIL.</td></tr>
<tr><td>MatchOp</td><td>Un MatchOp, es decir, un operador de coincidencia, compara una cadena con una constante de cadena o una constante prefija, infija o sufija de cadena.</td></tr>
<tr><td>JsonArrayOp</td><td>Un JsonOp, es decir, un operador JSON, comprueba si el identificador especificado contiene los elementos especificados.</td></tr>
<tr><td>ArrayOp</td><td>Un ArrayOp, es decir, un operador de matriz, comprueba si el identificador especificado contiene los elementos especificados.</td></tr>
</tbody>
</table>
<h2 id="Operators" class="common-anchor-header">Operadores<button data-href="#Operators" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Logical-operators" class="common-anchor-header">Operadores lógicos</h3><p>Los operadores lógicos comparan dos expresiones.</p>
<table>
<thead>
<tr><th>Símbolo</th><th>Operación</th><th>Ejemplo</th><th>Descripción</th></tr>
</thead>
<tbody>
<tr><td>y' &amp;&amp;</td><td>y</td><td>expr1 &amp;&amp; expr2</td><td>Verdadero si tanto expr1 como expr2 son verdaderos.</td></tr>
<tr><td>o' ||</td><td>o</td><td>expr1 || expr2</td><td>Verdadero si expr1 o expr2 son verdaderos.</td></tr>
</tbody>
</table>
<h3 id="Binary-arithmetic-operators" class="common-anchor-header">Operadores aritméticos binarios</h3><p>Los operadores aritméticos binarios contienen dos operandos y pueden realizar operaciones aritméticas básicas y devolver el resultado correspondiente.</p>
<table>
<thead>
<tr><th>Símbolo</th><th>Operación</th><th>Ejemplo</th><th>Descripción</th></tr>
</thead>
<tbody>
<tr><td>+</td><td>Suma</td><td>a + b</td><td>Suma los dos operandos.</td></tr>
<tr><td>-</td><td>Resta</td><td>a - b</td><td>Restar el segundo operando del primer operando.</td></tr>
<tr><td>*</td><td>Multiplicación</td><td>a * b</td><td>Multiplicar los dos operandos.</td></tr>
<tr><td>/</td><td>División</td><td>a / b</td><td>Divide el primer operando por el segundo operando.</td></tr>
<tr><td>**</td><td>Potencia</td><td>a ** b</td><td>Eleva el primer operando a la potencia del segundo operando.</td></tr>
<tr><td>%</td><td>Módulo</td><td>a % b</td><td>Divide el primer operando por el segundo y devuelve la parte del resto.</td></tr>
</tbody>
</table>
<h3 id="Relational-operators" class="common-anchor-header">Operadores relacionales</h3><p>Los operadores relacionales utilizan símbolos para comprobar la igualdad, desigualdad u orden relativo entre dos expresiones.</p>
<table>
<thead>
<tr><th>Símbolo</th><th>Operación</th><th>Ejemplo</th><th>Descripción</th></tr>
</thead>
<tbody>
<tr><td>&lt;</td><td>Menor que</td><td>a &lt; b</td><td>Verdadero si a es menor que b.</td></tr>
<tr><td>&gt;</td><td>Mayor que</td><td>a &gt; b</td><td>Verdadero si a es mayor que b.</td></tr>
<tr><td>==</td><td>Igual</td><td>a == b</td><td>Verdadero si a es igual a b.</td></tr>
<tr><td>!=</td><td>No es igual</td><td>a != b</td><td>Verdadero si a no es igual a b.</td></tr>
<tr><td>&lt;=</td><td>Menor o igual que</td><td>a &lt;= b</td><td>Verdadero si a es menor o igual que b.</td></tr>
<tr><td>&gt;=</td><td>Mayor o igual que</td><td>a &gt;= b</td><td>Verdadero si a es mayor o igual que b.</td></tr>
</tbody>
</table>
<h2 id="Operator-precedence-and-associativity" class="common-anchor-header">Precedencia y asociatividad de los operadores<button data-href="#Operator-precedence-and-associativity" class="anchor-icon" translate="no">
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
    </button></h2><p>La siguiente tabla muestra la precedencia y asociatividad de los operadores. Los operadores se enumeran de arriba a abajo, en orden descendente de precedencia.</p>
<table>
<thead>
<tr><th>Precedencia</th><th>Operador</th><th>Descripción</th><th>Asociatividad</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>+ -</td><td>UnaryArithOp</td><td>De izquierda a derecha</td></tr>
<tr><td>2</td><td>no</td><td>UnaryLogicOp</td><td>De derecha a izquierda</td></tr>
<tr><td>3</td><td>**</td><td>BinaryArithOp</td><td>De izquierda a derecha</td></tr>
<tr><td>4</td><td>* / %</td><td>BinaryArithOp</td><td>De izquierda a derecha</td></tr>
<tr><td>5</td><td>+ -</td><td>BinaryArithOp</td><td>De izquierda a derecha</td></tr>
<tr><td>6</td><td>&lt; &lt;= &gt; &gt;=</td><td>CmpOp</td><td>De izquierda a derecha</td></tr>
<tr><td>7</td><td>== !=</td><td>CmpOp</td><td>De izquierda a derecha</td></tr>
<tr><td>8</td><td>como LIKE</td><td>MatchOp</td><td>De izquierda a derecha</td></tr>
<tr><td>9</td><td>json_contains JSON_CONTAINS</td><td>JsonArrayOp</td><td>De izquierda a derecha</td></tr>
<tr><td>9</td><td>array_contains ARRAY_CONTAINS</td><td>ArrayOp</td><td>De izquierda a derecha</td></tr>
<tr><td>10</td><td>json_contains_all JSON_CONTAINS_ALL</td><td>JsonArrayOp</td><td>De izquierda a derecha</td></tr>
<tr><td>10</td><td>array_contains_all ARRAY_CONTAINS_ALL</td><td>ArrayOp</td><td>De izquierda a derecha</td></tr>
<tr><td>11</td><td>json_contains_any JSON_CONTAINS_ANY</td><td>JsonArrayOp</td><td>De izquierda a derecha</td></tr>
<tr><td>11</td><td>array_contains_any ARRAY_CONTAINS_ANY</td><td>ArrayOp</td><td>De izquierda a derecha</td></tr>
<tr><td>12</td><td>array_length ARRAY_LENGTH</td><td>ArrayOp</td><td>De izquierda a derecha</td></tr>
<tr><td>13</td><td>&amp;&amp; y</td><td>BinaryLogicOp</td><td>De izquierda a derecha</td></tr>
<tr><td>14</td><td>|| o</td><td>BinaryLogicOp</td><td>De izquierda a derecha</td></tr>
</tbody>
</table>
<p>Las expresiones se evalúan normalmente de izquierda a derecha. Las expresiones complejas se evalúan de una en una. El orden en que se evalúan las expresiones viene determinado por la precedencia de los operadores utilizados.</p>
<p>Si una expresión contiene dos o más operadores con la misma precedencia, se evalúa primero el operador de la izquierda.</p>
<div class="alert note">
<p>Por ejemplo, 10 / 2 * 5 se evaluará como (10 / 2) y el resultado se multiplicará por 5.</p>
</div>
<p>Cuando una operación de menor precedencia debe procesarse primero, debe ir entre paréntesis.</p>
<div class="alert note">
<p>Por ejemplo, 30 / 2 + 8. Esto se evalúa normalmente como 30 dividido por 2 y luego 8 añadido al resultado. Si desea dividir por 2 + 8, debe escribirse como 30 / (2 + 8).</p>
</div>
<p>Los paréntesis pueden anidarse dentro de expresiones. Las expresiones entre paréntesis más internas se evalúan primero.</p>
<h2 id="Usage" class="common-anchor-header">Utilización<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>A continuación se muestran ejemplos del uso de todas las expresiones booleanas disponibles en Milvus (<code translate="no">int64</code> representa el campo escalar que contiene datos de tipo INT64, <code translate="no">float</code> representa el campo escalar que contiene datos de tipo coma flotante, y <code translate="no">VARCHAR</code> representa el campo escalar que contiene datos de tipo VARCHAR):</p>
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
<li>BinaryLogicalOp y paréntesis</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;(int64 &gt; 0 &amp;&amp; int64 &lt; 400) or (int64 &gt; 500 &amp;&amp; int64 &lt; 1000)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>TermExpr y UnaryLogicOp</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 not in [1, 2, 3]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"><span class="hljs-variable constant_">VARCHAR</span> not <span class="hljs-keyword">in</span> [<span class="hljs-string">&quot;str1&quot;</span>, <span class="hljs-string">&quot;str2&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<ol start="4">
<li>TermExpr, BinaryLogicalOp y CmpOp (en campos diferentes)</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 in [1, 2, 3] and float != 2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="5">
<li>BinaryLogicalOp y CmpOp</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 == 0 || int64 == 1 || int64 == 2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="6">
<li>CmpOp y UnaryArithOp o BinaryArithOp</li>
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
<p>Si la expresión JSON de una sentencia <code translate="no">JSON_CONTAINS</code> (el segundo argumento) es una lista, el identificador (el primer argumento) debe ser list of list. En caso contrario, la sentencia siempre se evalúa como False.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># {&quot;x&quot;: [1,2,3]}</span>
json_contains(x, <span class="hljs-number">1</span>) <span class="hljs-comment"># ==&gt; true</span>
json_contains(x, <span class="hljs-string">&quot;a&quot;</span>) <span class="hljs-comment"># ==&gt; false</span>
    
<span class="hljs-comment"># {&quot;x&quot;: [[1,2,3], [4,5,6], [7,8,9]]}</span>
json_contains(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains(x, [<span class="hljs-number">3</span>,<span class="hljs-number">2</span>,<span class="hljs-number">1</span>]) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">JSON_CONTAINS_ALL(identifier, JsonExpr)</code></p>
<p>La expresión JSON de una sentencia <code translate="no">JSON_CONTAINS_ALL</code> debe ser siempre una lista.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># {&quot;x&quot;: [1,2,3,4,5,7,8]}</span>
json_contains_all(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains_all(x, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; false 6 is not exists</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">JSON_CONTAINS_ANY(identifier, JsonExpr)</code></p>
<p>La expresión JSON de una sentencia <code translate="no">JSON_CONTAINS_ANY</code> debe ser siempre una lista. De lo contrario, actúa igual que <code translate="no">JSON_CONTAINS</code>.</p>
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
<p>Si la expresión array de una sentencia <code translate="no">ARRAY_CONTAINS</code> (el segundo argumento) es una lista, el identificador (el primer argumento) debe ser list of list. En caso contrario, la sentencia siempre se evalúa como False.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &#x27;int_array&#x27;: [1,2,3]</span>
array_contains(int_array, <span class="hljs-number">1</span>) <span class="hljs-comment"># ==&gt; true</span>
array_contains(int_array, <span class="hljs-string">&quot;a&quot;</span>) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_CONTAINS_ALL(identifier, ArrayExpr)</code></p>
<p>La expresión de matriz de una sentencia <code translate="no">ARRAY_CONTAINS_ALL</code> debe ser siempre una lista.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_contains_all(int_array, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_all(int_array, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; false 6 is not exists</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_CONTAINS_ANY(identifier, ArrayExpr)</code></p>
<p>La expresión de matriz de una sentencia <code translate="no">ARRAY_CONTAINS_ANY</code> debe ser siempre una lista. En caso contrario, actúa igual que <code translate="no">ARRAY_CONTAINS</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_contains_any(int_array, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_any(int_array, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_any(int_array, [<span class="hljs-number">6</span>,<span class="hljs-number">9</span>]) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_LENGTH(identifier)</code></p>
<p>Comprueba el número de elementos de un array.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_length(int_array) <span class="hljs-comment"># ==&gt; 7</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">Lo que sigue<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Ahora que ya sabe cómo funcionan los conjuntos de bits en Milvus, puede que también quiera</p>
<ul>
<li>Aprender a realizar una <a href="/docs/es/v2.4.x/multi-vector-search.md">búsqueda híbrida</a>.</li>
<li>Aprender a <a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">utilizar cadenas para filtrar</a> los resultados de la búsqueda.</li>
<li>Aprender a <a href="/docs/es/v2.4.x/enable-dynamic-field.md">utilizar campos dinámicos en la construcción de expresiones booleanas</a>.</li>
</ul>
