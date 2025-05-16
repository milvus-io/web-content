---
id: boolean.md
summary: Saiba mais sobre as regras de expressão booleana no Milvus.
title: Regras de filtragem escalar
---
<h1 id="Scalar-Filtering-Rules" class="common-anchor-header">Regras de filtragem escalar<button data-href="#Scalar-Filtering-Rules" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">Síntese<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Uma expressão de predicado produz um valor booleano. Milvus conduz a filtragem escalar pesquisando com predicados. Uma expressão de predicado, quando avaliada, devolve TRUE (verdadeiro) ou FALSE (falso). Consulte a <a href="/api-reference/pymilvus/v2.4.x/About.md">Referência da API do Python SDK</a> para obter instruções sobre a utilização de expressões de predicado.</p>
<p>As regras da gramática<a href="https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form">EBNF</a> descrevem as regras das expressões booleanas:</p>
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
<p>A tabela seguinte lista a descrição de cada símbolo mencionado nas regras de expressão booleana acima.</p>
<table>
<thead>
<tr><th>Notação</th><th>Descrição</th></tr>
</thead>
<tbody>
<tr><td>=</td><td>Definição.</td></tr>
<tr><td>,</td><td>Concatenação.</td></tr>
<tr><td>;</td><td>Terminação.</td></tr>
<tr><td>|</td><td>Alternância.</td></tr>
<tr><td>{...}</td><td>Repetição.</td></tr>
<tr><td>(...)</td><td>Agrupamento.</td></tr>
<tr><td>NIL</td><td>Vazio. A expressão pode ser uma cadeia vazia.</td></tr>
<tr><td>INTEGER</td><td>Números inteiros como 1, 2, 3.</td></tr>
<tr><td>FLOAT</td><td>Números flutuantes, como 1,0, 2,0.</td></tr>
<tr><td>CONST</td><td>Números inteiros ou números flutuantes.</td></tr>
<tr><td>IDENTIFICADOR</td><td>Identificador. Em Milvus, o IDENTIFIER representa o nome do campo.</td></tr>
<tr><td>LogicalOp</td><td>Um LogicalOp é um operador lógico que permite combinar mais do que uma operação relacional numa única comparação. O valor devolvido de uma LogicalOp é VERDADEIRO (1) ou FALSO (0). Existem dois tipos de LogicalOps, incluindo BinaryLogicalOps e UnaryLogicalOps.</td></tr>
<tr><td>UnaryLogicalOp</td><td>UnaryLogicalOp refere-se ao operador lógico unário &quot;not&quot;.</td></tr>
<tr><td>BinaryLogicalOp</td><td>Operadores lógicos binários que executam acções em dois operandos. Numa expressão complexa com dois ou mais operandos, a ordem de avaliação depende das regras de precedência.</td></tr>
<tr><td>ArithmeticOp</td><td>Um ArithmeticOp, nomeadamente um operador aritmético, efectua operações matemáticas como a adição e a subtração de operandos.</td></tr>
<tr><td>UnaryArithOp</td><td>Um UnaryArithOp é um operador aritmético que efectua uma operação sobre um único operando. O UnaryArithOp negativo transforma uma expressão positiva numa negativa, ou o inverso.</td></tr>
<tr><td>BinaryArithOp</td><td>Um BinaryArithOp, nomeadamente um operador binário, efectua operações sobre dois operandos. Numa expressão complexa com dois ou mais operandos, a ordem de avaliação depende das regras de precedência.</td></tr>
<tr><td>CmpOp</td><td>CmpOp é um operador relacional que executa acções sobre dois operandos.</td></tr>
<tr><td>CmpOpRestricted</td><td>CmpOpRestricted é restrito a &quot;Menor que&quot; e &quot;Igual&quot;.</td></tr>
<tr><td>ConstantExpr</td><td>ConstantExpr pode ser uma constante ou um BinaryArithOp sobre duas ConstExprs ou um UnaryArithOp sobre uma única ConstantExpr. É definida recursivamente.</td></tr>
<tr><td>ConstantArray</td><td>ConstantArray é envolvida por parênteses rectos, e ConstantExpr pode ser repetida entre parênteses rectos. ConstArray deve incluir pelo menos um ConstantExpr.</td></tr>
<tr><td>TermExpr</td><td>TermExpr é utilizado para verificar se o valor de um IDENTIFIER aparece numa ConstantArray. TermExpr é representado por &quot;in&quot;.</td></tr>
<tr><td>CompareExpr</td><td>Uma CompareExpr, ou seja, uma expressão de comparação, pode ser uma operação relacional sobre dois IDENTIFIERs, ou uma operação relacional sobre um IDENTIFIER e uma ConstantExpr, ou uma operação ternária sobre duas ConstantExprs e um IDENTIFIER.</td></tr>
<tr><td>SingleExpr</td><td>SingleExpr, ou seja, uma única expressão, pode ser uma TermExpr ou uma CompareExpr.</td></tr>
<tr><td>LogicalExpr</td><td>Uma LogicalExpr pode ser uma BinaryLogicalOp sobre duas LogicalExprs, ou uma UnaryLogicalOp sobre uma única LogicalExpr, ou uma LogicalExpr agrupada entre parênteses, ou uma SingleExpr. O LogicalExpr é definido recursivamente.</td></tr>
<tr><td>Expr</td><td>Expr, uma abreviatura que significa expressão, pode ser LogicalExpr ou NIL.</td></tr>
<tr><td>MatchOp</td><td>Um MatchOp, nomeadamente um operador de correspondência, compara uma cadeia de caracteres com uma constante de cadeia de caracteres ou uma constante de prefixo, infixo ou sufixo de cadeia de caracteres.</td></tr>
<tr><td>JsonArrayOp</td><td>Um JsonOp, nomeadamente um operador JSON, verifica se o identificador especificado contém os elementos especificados.</td></tr>
<tr><td>ArrayOp</td><td>Um ArrayOp, ou seja, um operador de matriz, verifica se o identificador especificado contém os elementos especificados.</td></tr>
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
    </button></h2><h3 id="Logical-operators" class="common-anchor-header">Operadores lógicos</h3><p>Os operadores lógicos efectuam uma comparação entre duas expressões.</p>
<table>
<thead>
<tr><th>Símbolo</th><th>Operação</th><th>Exemplo de operação</th><th>Descrição</th></tr>
</thead>
<tbody>
<tr><td>'e' &amp;&amp;</td><td>e</td><td>expr1 &amp;&amp; expr2</td><td>Verdadeiro se ambas as expressões expr1 e expr2 forem verdadeiras.</td></tr>
<tr><td>'or' ||</td><td>ou</td><td>expr1 || expr2</td><td>Verdadeiro se expr1 ou expr2 forem verdadeiros.</td></tr>
</tbody>
</table>
<h3 id="Binary-arithmetic-operators" class="common-anchor-header">Operadores aritméticos binários</h3><p>Os operadores aritméticos binários contêm dois operandos e podem efetuar operações aritméticas básicas e devolver o resultado correspondente.</p>
<table>
<thead>
<tr><th>Símbolo</th><th>Operação</th><th>Exemplo de operação</th><th>Descrição</th></tr>
</thead>
<tbody>
<tr><td>+</td><td>Adição</td><td>a + b</td><td>Adiciona os dois operandos.</td></tr>
<tr><td>-</td><td>Subtração</td><td>a - b</td><td>Subtrair o segundo operando do primeiro operando.</td></tr>
<tr><td>*</td><td>Multiplicação</td><td>a * b</td><td>Multiplicar os dois operandos.</td></tr>
<tr><td>/</td><td>Divisão</td><td>a / b</td><td>Divide o primeiro operando pelo segundo operando.</td></tr>
<tr><td>**</td><td>Potência</td><td>a ** b</td><td>Elevar o primeiro operando à potência do segundo operando.</td></tr>
<tr><td>%</td><td>Módulo</td><td>a % b</td><td>Divide o primeiro operando pelo segundo operando e produz a parte restante.</td></tr>
</tbody>
</table>
<h3 id="Relational-operators" class="common-anchor-header">Operadores relacionais</h3><p>Os operadores relacionais utilizam símbolos para verificar a igualdade, desigualdade ou ordem relativa entre duas expressões.</p>
<table>
<thead>
<tr><th>Símbolo</th><th>Operação</th><th>Exemplo</th><th>Descrição</th></tr>
</thead>
<tbody>
<tr><td>&lt;</td><td>Menor que</td><td>a &lt; b</td><td>Verdadeiro se a for menor que b.</td></tr>
<tr><td>&gt;</td><td>Maior que</td><td>a &gt; b</td><td>Verdadeiro se a for maior do que b.</td></tr>
<tr><td>==</td><td>Igual</td><td>a == b</td><td>Verdadeiro se a for igual a b.</td></tr>
<tr><td>!=</td><td>Não é igual</td><td>a != b</td><td>Verdadeiro se a não for igual a b.</td></tr>
<tr><td>&lt;=</td><td>Menor que ou igual</td><td>a &lt;= b</td><td>Verdadeiro se a for menor ou igual a b.</td></tr>
<tr><td>&gt;=</td><td>Maior ou igual</td><td>a &gt;= b</td><td>Verdadeiro se a for maior ou igual a b.</td></tr>
</tbody>
</table>
<h2 id="Operator-precedence-and-associativity" class="common-anchor-header">Precedência e associatividade dos operadores<button data-href="#Operator-precedence-and-associativity" class="anchor-icon" translate="no">
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
    </button></h2><p>A tabela seguinte indica a precedência e a associatividade dos operadores. Os operadores são listados de cima para baixo, em precedência decrescente.</p>
<table>
<thead>
<tr><th>Precedência</th><th>Operador</th><th>Descrição</th><th>Associatividade</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>+ -</td><td>UnárioArithOp</td><td>Da esquerda para a direita</td></tr>
<tr><td>2</td><td>não</td><td>UnaryLogicOp</td><td>Da direita para a esquerda</td></tr>
<tr><td>3</td><td>**</td><td>BinaryArithOp</td><td>Da esquerda para a direita</td></tr>
<tr><td>4</td><td>* / %</td><td>BinárioArithOp</td><td>Da esquerda para a direita</td></tr>
<tr><td>5</td><td>+ -</td><td>BinárioArithOp</td><td>Da esquerda para a direita</td></tr>
<tr><td>6</td><td>&lt; &lt;= &gt; &gt;=</td><td>CmpOp</td><td>Da esquerda para a direita</td></tr>
<tr><td>7</td><td>== !=</td><td>CmpOp</td><td>Da esquerda para a direita</td></tr>
<tr><td>8</td><td>like LIKE</td><td>MatchOp</td><td>Da esquerda para a direita</td></tr>
<tr><td>9</td><td>json_contains JSON_CONTAINS</td><td>JsonArrayOp</td><td>Da esquerda para a direita</td></tr>
<tr><td>9</td><td>array_contains ARRAY_CONTAINS</td><td>ArrayOp</td><td>Da esquerda para a direita</td></tr>
<tr><td>10</td><td>json_contains_all JSON_CONTAINS_ALL</td><td>JsonArrayOp</td><td>Da esquerda para a direita</td></tr>
<tr><td>10</td><td>array_contains_all ARRAY_CONTAINS_ALL</td><td>ArrayOp</td><td>Da esquerda para a direita</td></tr>
<tr><td>11</td><td>json_contains_any JSON_CONTAINS_ANY</td><td>JsonArrayOp</td><td>Da esquerda para a direita</td></tr>
<tr><td>11</td><td>array_contains_any ARRAY_CONTAINS_ANY</td><td>ArrayOp</td><td>Da esquerda para a direita</td></tr>
<tr><td>12</td><td>array_length ARRAY_LENGTH</td><td>ArrayOp</td><td>Da esquerda para a direita</td></tr>
<tr><td>13</td><td>&amp;&amp; e</td><td>BinaryLogicOp</td><td>Da esquerda para a direita</td></tr>
<tr><td>14</td><td>|| ou</td><td>BinaryLogicOp</td><td>Da esquerda para a direita</td></tr>
</tbody>
</table>
<p>As expressões são normalmente avaliadas da esquerda para a direita. As expressões complexas são avaliadas uma de cada vez. A ordem pela qual as expressões são avaliadas é determinada pela precedência dos operadores utilizados.</p>
<p>Se uma expressão contiver dois ou mais operadores com a mesma precedência, o operador à esquerda é avaliado primeiro.</p>
<div class="alert note">
<p>Por exemplo, 10 / 2 * 5 será avaliado como (10 / 2) e o resultado multiplicado por 5.</p>
</div>
<p>Quando uma operação de precedência inferior deve ser processada em primeiro lugar, deve ser colocada entre parênteses.</p>
<div class="alert note">
<p>Por exemplo, 30 / 2 + 8. Isto é normalmente avaliado como 30 dividido por 2 e depois 8 adicionado ao resultado. Se quiser dividir por 2 + 8, deve ser escrito como 30 / (2 + 8).</p>
</div>
<p>Os parênteses podem ser aninhados dentro de expressões. As expressões parentéticas mais internas são avaliadas primeiro.</p>
<h2 id="Usage" class="common-anchor-header">Utilização<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>As amostras de todas as utilizações de expressões booleanas disponíveis no Milvus são apresentadas da seguinte forma (<code translate="no">int64</code> representa o campo escalar que contém dados do tipo INT64, <code translate="no">float</code> representa o campo escalar que contém dados do tipo vírgula flutuante e <code translate="no">VARCHAR</code> representa o campo escalar que contém dados do tipo VARCHAR):</p>
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
<li>BinaryLogicalOp e parênteses</li>
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
<li>TermExpr, BinaryLogicalOp e CmpOp (em campos diferentes)</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 in [1, 2, 3] and float != 2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="5">
<li>BinaryLogicalOp e CmpOp</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 == 0 || int64 == 1 || int64 == 2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="6">
<li>CmpOp e UnaryArithOp ou BinaryArithOp</li>
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
<p>Se a expressão JSON de uma instrução <code translate="no">JSON_CONTAINS</code> (o segundo argumento) for uma lista, o identificador (o primeiro argumento) deverá ser uma lista de listas. Caso contrário, a declaração é sempre avaliada como False.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># {&quot;x&quot;: [1,2,3]}</span>
json_contains(x, <span class="hljs-number">1</span>) <span class="hljs-comment"># ==&gt; true</span>
json_contains(x, <span class="hljs-string">&quot;a&quot;</span>) <span class="hljs-comment"># ==&gt; false</span>
    
<span class="hljs-comment"># {&quot;x&quot;: [[1,2,3], [4,5,6], [7,8,9]]}</span>
json_contains(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains(x, [<span class="hljs-number">3</span>,<span class="hljs-number">2</span>,<span class="hljs-number">1</span>]) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">JSON_CONTAINS_ALL(identifier, JsonExpr)</code></p>
<p>A expressão JSON numa declaração <code translate="no">JSON_CONTAINS_ALL</code> deve ser sempre uma lista.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># {&quot;x&quot;: [1,2,3,4,5,7,8]}</span>
json_contains_all(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains_all(x, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; false 6 is not exists</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">JSON_CONTAINS_ANY(identifier, JsonExpr)</code></p>
<p>A expressão JSON numa declaração <code translate="no">JSON_CONTAINS_ANY</code> deve ser sempre uma lista. Caso contrário, actua da mesma forma que <code translate="no">JSON_CONTAINS</code>.</p>
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
<p>Se a expressão de matriz de uma declaração <code translate="no">ARRAY_CONTAINS</code> (o segundo argumento) for uma lista, o identificador (o primeiro argumento) deverá ser uma lista de listas. Caso contrário, a declaração é sempre avaliada como False.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &#x27;int_array&#x27;: [1,2,3]</span>
array_contains(int_array, <span class="hljs-number">1</span>) <span class="hljs-comment"># ==&gt; true</span>
array_contains(int_array, <span class="hljs-string">&quot;a&quot;</span>) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_CONTAINS_ALL(identifier, ArrayExpr)</code></p>
<p>A expressão da matriz numa declaração <code translate="no">ARRAY_CONTAINS_ALL</code> deve ser sempre uma lista.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_contains_all(int_array, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_all(int_array, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; false 6 is not exists</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_CONTAINS_ANY(identifier, ArrayExpr)</code></p>
<p>A expressão de matriz numa declaração <code translate="no">ARRAY_CONTAINS_ANY</code> deve ser sempre uma lista. Caso contrário, actua da mesma forma que <code translate="no">ARRAY_CONTAINS</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_contains_any(int_array, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_any(int_array, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_any(int_array, [<span class="hljs-number">6</span>,<span class="hljs-number">9</span>]) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_LENGTH(identifier)</code></p>
<p>Verificar o número de elementos de uma matriz.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_length(int_array) <span class="hljs-comment"># ==&gt; 7</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">O que se segue<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Agora que já sabe como funcionam os conjuntos de bits no Milvus, também pode querer:</p>
<ul>
<li>Aprender a efetuar uma <a href="/docs/pt/v2.4.x/multi-vector-search.md">Pesquisa Híbrida</a>.</li>
<li>Aprender a <a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">utilizar cadeias de caracteres para filtrar</a> os resultados da pesquisa.</li>
<li>Aprender a <a href="/docs/pt/v2.4.x/enable-dynamic-field.md">utilizar campos dinâmicos na construção de expressões booleanas</a>.</li>
</ul>
