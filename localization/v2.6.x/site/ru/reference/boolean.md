---
id: boolean.md
summary: Узнайте о правилах булевых выражений в Milvus.
title: Правила скалярной фильтрации
---
<h1 id="Scalar-Filtering-Rules" class="common-anchor-header">Правила скалярной фильтрации<button data-href="#Scalar-Filtering-Rules" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">Обзор<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Выражение предиката выводит булево значение. Milvus осуществляет скалярную фильтрацию путем поиска с помощью предикатов. Выражение с предикатом, когда оно оценивается, возвращает либо TRUE, либо FALSE. Ознакомьтесь с <a href="/api-reference/pymilvus/v2.4.x/About.md">Python SDK API Reference</a> для получения инструкций по использованию предикатных выражений.</p>
<p>Правила грамматики<a href="https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form">EBNF</a> описывают правила булевых выражений:</p>
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
<p>В следующей таблице приведено описание каждого символа, упомянутого в приведенных выше правилах булевых выражений.</p>
<table>
<thead>
<tr><th>Условное обозначение</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td>=</td><td>Определение.</td></tr>
<tr><td>,</td><td>Конкатенация.</td></tr>
<tr><td>;</td><td>Окончание.</td></tr>
<tr><td>|</td><td>Альтернация.</td></tr>
<tr><td>{...}</td><td>Повторение.</td></tr>
<tr><td>(...)</td><td>Группировка.</td></tr>
<tr><td>NIL</td><td>Пустой. Выражение может быть пустой строкой.</td></tr>
<tr><td>INTEGER</td><td>Целые числа, такие как 1, 2, 3.</td></tr>
<tr><td>FLOAT</td><td>Плавающие числа, такие как 1.0, 2.0.</td></tr>
<tr><td>CONST</td><td>Целочисленные или плавающие числа.</td></tr>
<tr><td>ИДЕНТИФИКАТОР</td><td>Идентификатор. В Milvus IDENTIFIER представляет собой имя поля.</td></tr>
<tr><td>LogicalOp</td><td>LogicalOp - это логический оператор, который поддерживает объединение более одной реляционной операции в одном сравнении. Возвращаемое значение LogicalOp - TRUE (1) или FALSE (0). Существует два типа логических операторов, включая BinaryLogicalOps и UnaryLogicalOps.</td></tr>
<tr><td>UnaryLogicalOp</td><td>UnaryLogicalOp обозначает унарный логический оператор "не".</td></tr>
<tr><td>BinaryLogicalOp</td><td>Бинарные логические операторы, выполняющие действия над двумя операндами. В сложных выражениях с двумя и более операндами порядок оценки зависит от правил старшинства.</td></tr>
<tr><td>ArithmeticOp</td><td>ArithmeticOp, а именно арифметический оператор, выполняет над операндами такие математические операции, как сложение и вычитание.</td></tr>
<tr><td>UnaryArithOp</td><td>UnaryArithOp - это арифметический оператор, выполняющий операцию над одним операндом. Отрицательный UnaryArithOp меняет положительное выражение на отрицательное, или наоборот.</td></tr>
<tr><td>BinaryArithOp</td><td>BinaryArithOp, а именно бинарный оператор, выполняет операции над двумя операндами. В сложных выражениях с двумя и более операндами порядок оценки зависит от правил старшинства.</td></tr>
<tr><td>CmpOp</td><td>CmpOp - это реляционный оператор, выполняющий действия над двумя операндами.</td></tr>
<tr><td>CmpOpRestricted</td><td>CmpOpRestricted ограничивается операторами "Меньше чем" и "Равно".</td></tr>
<tr><td>ConstantExpr</td><td>ConstantExpr может быть константой или двоичнымArithOp на двух ConstExpr или унарнымArithOp на одном ConstantExpr. Он определяется рекурсивно.</td></tr>
<tr><td>ConstantArray</td><td>ConstantArray заключен в квадратные скобки, а ConstantExpr может повторяться в квадратных скобках. ConstArray должен включать хотя бы один ConstantExpr.</td></tr>
<tr><td>TermExpr</td><td>TermExpr используется для проверки наличия значения ИДЕНТИФИКАТОРА в массиве ConstantArray. TermExpr обозначается символом "in".</td></tr>
<tr><td>CompareExpr</td><td>CompareExpr, то есть выражение сравнения, может быть реляционной операцией над двумя IDENTIFIER, или реляционной операцией над одним IDENTIFIER и одним ConstantExpr, или тернарной операцией над двумя ConstantExpr и одним IDENTIFIER.</td></tr>
<tr><td>SingleExpr</td><td>SingleExpr, а именно одно выражение, может быть либо TermExpr, либо CompareExpr.</td></tr>
<tr><td>LogicalExpr</td><td>LogicalExpr может быть двоичным LogicalOp над двумя LogicalExpr, или унарным LogicalOp над одним LogicalExpr, или LogicalExpr, сгруппированным в круглых скобках, или SingleExpr. LogicalExpr определяется рекурсивно.</td></tr>
<tr><td>Expr</td><td>Expr, аббревиатура, означающая выражение, может быть LogicalExpr или NIL.</td></tr>
<tr><td>MatchOp</td><td>MatchOp, а именно оператор соответствия, сравнивает строку со строковой константой или строковой префиксной, инфиксной или суффиксной константой.</td></tr>
<tr><td>JsonArrayOp</td><td>JsonOp, а именно оператор JSON, проверяет, содержит ли указанный идентификатор указанные элементы.</td></tr>
<tr><td>ArrayOp</td><td>ArrayOp, а именно оператор массива, проверяет, содержит ли указанный идентификатор указанные элементы.</td></tr>
</tbody>
</table>
<h2 id="Operators" class="common-anchor-header">Операторы<button data-href="#Operators" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Logical-operators" class="common-anchor-header">Логические операторы<button data-href="#Logical-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>Логические операторы выполняют сравнение между двумя выражениями.</p>
<table>
<thead>
<tr><th>Символ</th><th>Операция</th><th>Пример</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td>'и' &amp;&amp;</td><td>и</td><td>expr1 &amp;&amp; expr2</td><td>Истинно, если оба expr1 и expr2 истинны.</td></tr>
<tr><td>'or' ||</td><td>или</td><td>expr1 || expr2</td><td>Истинно, если истинно либо expr1, либо expr2.</td></tr>
</tbody>
</table>
<h3 id="Binary-arithmetic-operators" class="common-anchor-header">Двоичные арифметические операторы<button data-href="#Binary-arithmetic-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>Двоичные арифметические операторы содержат два операнда и могут выполнять основные арифметические операции и возвращать соответствующий результат.</p>
<table>
<thead>
<tr><th>Символ</th><th>Операция</th><th>Пример</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td>+</td><td>Сложение</td><td>a + b</td><td>Сложение двух операндов.</td></tr>
<tr><td>-</td><td>Вычитание</td><td>a - b</td><td>Вычитание второго операнда из первого.</td></tr>
<tr><td>*</td><td>Умножение</td><td>a * b</td><td>Умножение двух операндов.</td></tr>
<tr><td>/</td><td>Деление</td><td>a / b</td><td>Разделите первый операнд на второй операнд.</td></tr>
<tr><td>**</td><td>Мощность</td><td>a ** b</td><td>Возведите первый операнд в степень второго операнда.</td></tr>
<tr><td>%</td><td>Modulo</td><td>a % b</td><td>Делит первый операнд на второй операнд и выдает остаток.</td></tr>
</tbody>
</table>
<h3 id="Relational-operators" class="common-anchor-header">Реляционные операторы<button data-href="#Relational-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>Реляционные операторы используют символы для проверки равенства, неравенства или относительного порядка между двумя выражениями.</p>
<table>
<thead>
<tr><th>Символ</th><th>Операция</th><th>Пример</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td>&lt;</td><td>Меньше, чем</td><td>a &lt; b</td><td>Истина, если a меньше b.</td></tr>
<tr><td>&gt;</td><td>Больше, чем</td><td>a &gt; b</td><td>Верно, если a больше b.</td></tr>
<tr><td>==</td><td>Равно</td><td>a == b</td><td>Истинно, если a равно b.</td></tr>
<tr><td>!=</td><td>Не равно</td><td>a != b</td><td>Истинно, если a не равно b.</td></tr>
<tr><td>&lt;=</td><td>Меньше или равно</td><td>a &lt;= b</td><td>Верно, если a меньше или равно b.</td></tr>
<tr><td>&gt;=</td><td>Больше или равно</td><td>a &gt;= b</td><td>Истинно, если a больше или равно b.</td></tr>
</tbody>
</table>
<h2 id="Operator-precedence-and-associativity" class="common-anchor-header">Старшинство и ассоциативность операторов<button data-href="#Operator-precedence-and-associativity" class="anchor-icon" translate="no">
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
    </button></h2><p>В следующей таблице перечислены старшинство и ассоциативность операторов. Операторы перечислены сверху вниз, в порядке убывания старшинства.</p>
<table>
<thead>
<tr><th>Приоритет</th><th>Оператор</th><th>Описание</th><th>Ассоциативность</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>+ -</td><td>UnaryArithOp</td><td>Слева направо</td></tr>
<tr><td>2</td><td>не</td><td>UnaryLogicOp</td><td>Справа налево</td></tr>
<tr><td>3</td><td>**</td><td>BinaryArithOp</td><td>Слева направо</td></tr>
<tr><td>4</td><td>* / %</td><td>BinaryArithOp</td><td>Слева направо</td></tr>
<tr><td>5</td><td>+ -</td><td>BinaryArithOp</td><td>Слева направо</td></tr>
<tr><td>6</td><td>&lt; <= > &gt;=</td><td>CmpOp</td><td>Слева направо</td></tr>
<tr><td>7</td><td>== !=</td><td>CmpOp</td><td>Слева направо</td></tr>
<tr><td>8</td><td>как LIKE</td><td>MatchOp</td><td>Слева направо</td></tr>
<tr><td>9</td><td>json_contains JSON_CONTAINS</td><td>JsonArrayOp</td><td>Слева направо</td></tr>
<tr><td>9</td><td>array_contains ARRAY_CONTAINS</td><td>ArrayOp</td><td>Слева направо</td></tr>
<tr><td>10</td><td>json_contains_all JSON_CONTAINS_ALL</td><td>JsonArrayOp</td><td>Слева направо</td></tr>
<tr><td>10</td><td>array_contains_all ARRAY_CONTAINS_ALL</td><td>ArrayOp</td><td>Слева направо</td></tr>
<tr><td>11</td><td>json_contains_any JSON_CONTAINS_ANY</td><td>JsonArrayOp</td><td>Слева направо</td></tr>
<tr><td>11</td><td>array_contains_any ARRAY_CONTAINS_ANY</td><td>ArrayOp</td><td>Слева направо</td></tr>
<tr><td>12</td><td>array_length ARRAY_LENGTH</td><td>ArrayOp</td><td>Слева направо</td></tr>
<tr><td>13</td><td>&amp;&amp; и</td><td>BinaryLogicOp</td><td>Слева направо</td></tr>
<tr><td>14</td><td>|| или</td><td>BinaryLogicOp</td><td>Слева направо</td></tr>
</tbody>
</table>
<p>Выражения обычно оцениваются слева направо. Сложные выражения оцениваются по очереди. Порядок, в котором оцениваются выражения, определяется старшинством используемых операторов.</p>
<p>Если выражение содержит два или более операторов с одинаковым старшинством, первым оценивается оператор, стоящий слева.</p>
<div class="alert note">
<p>Например, 10 / 2 * 5 будет оценено как (10 / 2), а результат умножен на 5.</p>
</div>
<p>Когда операция с меньшим старшинством должна обрабатываться первой, ее следует заключить в круглые скобки.</p>
<div class="alert note">
<p>Например, 30 / 2 + 8. Это обычно оценивается как 30, деленное на 2, а затем к результату прибавляется 8. Если вы хотите разделить на 2 + 8, это должно быть записано как 30 / (2 + 8).</p>
</div>
<p>Скобки могут быть вложены в выражения. Самые внутренние выражения со скобками оцениваются первыми.</p>
<h2 id="Usage" class="common-anchor-header">Использование<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>Примеры использования всех доступных булевых выражений в Milvus приведены ниже (<code translate="no">int64</code> представляет скалярное поле, содержащее данные типа INT64, <code translate="no">float</code> представляет скалярное поле, содержащее данные типа с плавающей точкой, и <code translate="no">VARCHAR</code> представляет скалярное поле, содержащее данные типа VARCHAR):</p>
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
<li>BinaryLogicalOp и круглые скобки</li>
</ol>
<pre><code translate="no">&quot;(int64 &gt; <span class="hljs-number">0</span> &amp;&amp; int64 &lt; <span class="hljs-number">400</span>) or (int64 &gt; <span class="hljs-number">500</span> &amp;&amp; int64 &lt; <span class="hljs-number">1000</span>)&quot;
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>TermExpr и UnaryLogicOp</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 not in [1, 2, 3]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">VARCHAR not in <span class="hljs-selector-attr">[<span class="hljs-string">&quot;str1&quot;</span>, <span class="hljs-string">&quot;str2&quot;</span>]</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="4">
<li>TermExpr, BinaryLogicalOp и CmpOp (для разных полей)</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 in [1, 2, 3] and float != 2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="5">
<li>BinaryLogicalOp и CmpOp</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 == 0 || int64 == 1 || int64 == 2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="6">
<li>CmpOp и UnaryArithOp или BinaryArithOp</li>
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
<p>Если JSON-выражение оператора <code translate="no">JSON_CONTAINS</code> (второй аргумент) представляет собой список, то идентификатор (первый аргумент) должен быть списком списка. В противном случае оператор всегда оценивается как False.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># {&quot;x&quot;: [1,2,3]}</span>
json_contains(x, <span class="hljs-number">1</span>) <span class="hljs-comment"># ==&gt; true</span>
json_contains(x, <span class="hljs-string">&quot;a&quot;</span>) <span class="hljs-comment"># ==&gt; false</span>
    
<span class="hljs-comment"># {&quot;x&quot;: [[1,2,3], [4,5,6], [7,8,9]]}</span>
json_contains(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains(x, [<span class="hljs-number">3</span>,<span class="hljs-number">2</span>,<span class="hljs-number">1</span>]) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">JSON_CONTAINS_ALL(identifier, JsonExpr)</code></p>
<p>Выражение JSON в утверждении <code translate="no">JSON_CONTAINS_ALL</code> всегда должно быть списком.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># {&quot;x&quot;: [1,2,3,4,5,7,8]}</span>
json_contains_all(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains_all(x, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; false 6 is not exists</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">JSON_CONTAINS_ANY(identifier, JsonExpr)</code></p>
<p>Выражение JSON в утверждении <code translate="no">JSON_CONTAINS_ANY</code> всегда должно быть списком. В противном случае оно действует так же, как и <code translate="no">JSON_CONTAINS</code>.</p>
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
<p>Если выражение массива в утверждении <code translate="no">ARRAY_CONTAINS</code> (второй аргумент) является списком, то идентификатор (первый аргумент) должен быть списком списка. В противном случае оператор всегда оценивается как False.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &#x27;int_array&#x27;: [1,2,3]</span>
array_contains(int_array, <span class="hljs-number">1</span>) <span class="hljs-comment"># ==&gt; true</span>
array_contains(int_array, <span class="hljs-string">&quot;a&quot;</span>) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_CONTAINS_ALL(identifier, ArrayExpr)</code></p>
<p>Выражение массива в утверждении <code translate="no">ARRAY_CONTAINS_ALL</code> всегда должно быть списком.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_contains_all(int_array, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_all(int_array, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; false 6 is not exists</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_CONTAINS_ANY(identifier, ArrayExpr)</code></p>
<p>Выражение массива в операторе <code translate="no">ARRAY_CONTAINS_ANY</code> всегда должно быть списком. В противном случае оно действует так же, как и <code translate="no">ARRAY_CONTAINS</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_contains_any(int_array, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_any(int_array, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_any(int_array, [<span class="hljs-number">6</span>,<span class="hljs-number">9</span>]) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_LENGTH(identifier)</code></p>
<p>Проверьте количество элементов в массиве.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_length(int_array) <span class="hljs-comment"># ==&gt; 7</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">Что дальше<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Теперь, когда вы знаете, как работают битовые наборы в Milvus, вам также может быть интересно:</p>
<ul>
<li>Узнать, как проводить <a href="/docs/ru/multi-vector-search.md">гибридный поиск</a>.</li>
<li>Узнайте, как <a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">использовать строки для фильтрации</a> результатов поиска.</li>
<li>Узнайте, как <a href="/docs/ru/enable-dynamic-field.md">использовать динамические поля при построении булевых выражений</a>.</li>
</ul>
