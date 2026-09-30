---
id: boolean.md
title: Объяснение принципов фильтрации
summary: >-
  Milvus предоставляет мощные возможности фильтрации, которые позволяют
  выполнять точные запросы к вашим данным. Выражения фильтрации позволяют
  выбирать конкретные скалярные поля и уточнять результаты поиска с помощью
  различных условий. В данном руководстве объясняется, как использовать
  выражения фильтрации в Milvus, с примерами, посвящёнными операциям запросов.
  Вы также можете применять эти фильтры в запросах на поиск и удаление.
---
<h1 id="Filtering-Explained" class="common-anchor-header">Объяснение принципов фильтрации<button data-href="#Filtering-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus предоставляет мощные возможности фильтрации, которые позволяют выполнять точные запросы к вашим данным. Выражения фильтрации позволяют выбирать конкретные скалярные поля и уточнять результаты поиска с помощью различных условий. В этом руководстве объясняется, как использовать выражения фильтрации в Milvus, с примерами, посвященными операциям запросов. Вы также можете применять эти фильтры в запросах на поиск и удаление.</p>
<h2 id="Basic-operators" class="common-anchor-header">Основные операторы<button data-href="#Basic-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus поддерживает несколько базовых операторов для фильтрации данных:</p>
<ul>
<li><p><strong>Операторы сравнения</strong>: <code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code> и <code translate="no">&lt;=</code> позволяют осуществлять фильтрацию на основе числовых или текстовых полей.</p></li>
<li><p><strong>Фильтры диапазона и шаблонов</strong>: <code translate="no">IN</code>, <code translate="no">LIKE</code>, <code translate="no">=~</code> и <code translate="no">!~</code> сопоставляют значения, шаблоны с подстановочными знаками или шаблоны регулярных выражений. Подробнее о строковых шаблонах см. в разделе <a href="/docs/ru/pattern-matching.md">«Сопоставление шаблонов</a>».</p></li>
<li><p><strong>Арифметические операторы</strong>: <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code>, <code translate="no">/</code>, <code translate="no">%</code> и <code translate="no">**</code> используются для вычислений с числовыми полями.</p></li>
<li><p><strong>Побитовые операторы</strong>: в Milvus 3.0.0 и более поздних версиях операторы <code translate="no">&amp;</code>, <code translate="no">|</code> и <code translate="no">^</code> фильтруют целочисленные поля, в которых кодируются несколько флагов, таких как биты прав доступа или состояния. Подробности см. в разделе <a href="/docs/ru/basic-operators.md#Bitwise-operators">«Основные операторы</a>».</p></li>
<li><p><strong>Логические операторы</strong>: Операторы <code translate="no">AND</code>, <code translate="no">OR</code> и <code translate="no">NOT</code> объединяют несколько условий в сложные выражения.</p></li>
<li><p><strong>Операторы IS NULL и IS NOT NULL</strong>: Операторы <code translate="no">IS NULL</code> и <code translate="no">IS NOT NULL</code> используются для фильтрации полей в зависимости от того, содержат ли они значение null (отсутствие данных). Подробности см. в разделе <a href="/docs/ru/basic-operators.md#IS-NULL-and-IS-NOT-NULL-operators">«Основные операторы</a>».</p></li>
</ul>
<h3 id="Example-Filtering-by-Color" class="common-anchor-header">Пример: фильтрация по цвету<button data-href="#Example-Filtering-by-Color" class="anchor-icon" translate="no">
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
    </button></h3><p>Чтобы найти сущности с основными цветами (красный, зеленый или синий) в скалярном поле <code translate="no">color</code>, используйте следующее выражение фильтра:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-by-Permission-Bits" class="common-anchor-header">Пример: фильтрация по битам разрешений<button data-href="#Example-Filtering-by-Permission-Bits" class="anchor-icon" translate="no">
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
    </button></h3><p>Чтобы найти объекты, в целочисленном поле <code translate="no">permissions</code> которых установлен бит « <code translate="no">SHARE</code> », используйте побитовый оператор AND (<code translate="no">&amp;</code>):</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;(permissions &amp; 4) == 4&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-by-Regex-Pattern" class="common-anchor-header">Пример: Фильтрация по шаблону регулярного выражения<button data-href="#Example-Filtering-by-Regex-Pattern" class="anchor-icon" translate="no">
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
    </button></h3><p>Чтобы найти объекты, поле <code translate="no">message</code> которых содержит код ошибки, например <code translate="no">E1001</code>, используйте оператор сопоставления по регулярному выражению <code translate="no">=~</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Фильтры на основе регулярных выражений используют сопоставление подстрок. Чтобы требовать, чтобы всё значение поля соответствовало шаблону, добавьте якоря <code translate="no">^</code> и <code translate="no">$</code>. Подробности см. в разделе <a href="/docs/ru/pattern-matching.md">«Сопоставление шаблонов</a>».</p>
<h3 id="Example-Filtering-JSON-Fields" class="common-anchor-header">Пример: фильтрация полей JSON<button data-href="#Example-Filtering-JSON-Fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus позволяет ссылаться на ключи в полях JSON. Например, если у вас есть поле JSON <code translate="no">product</code> с ключами <code translate="no">price</code> и <code translate="no">model</code> и вы хотите найти товары с определённой моделью и ценой ниже 1 850, используйте следующее выражение фильтра:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;product[&quot;model&quot;] == &quot;JSN-087&quot; AND product[&quot;price&quot;] &lt; 1850&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-Array-Fields" class="common-anchor-header">Пример: Фильтрация массивов<button data-href="#Example-Filtering-Array-Fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Если у вас есть поле массива <code translate="no">history_temperatures</code>, содержащее записи о средних температурах, зарегистрированных метеостанциями с 2000 года, и вы хотите найти метеостанции, где температура в 2009 году (10-й год наблюдений) превышала 23 °C, используйте следующее выражение:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;history_temperatures[10] &gt; 23&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Дополнительную информацию об этих базовых операторах см. в разделе <a href="/docs/ru/basic-operators.md">«Базовые операторы</a>».</p>
<h2 id="Filter-expression-templates" class="common-anchor-header">Шаблоны выражений фильтрации<button data-href="#Filter-expression-templates" class="anchor-icon" translate="no">
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
    </button></h2><p>При фильтрации с использованием символов CJK обработка может быть более сложной из-за более обширных наборов символов и различий в кодировке. Это может привести к снижению производительности, особенно при использовании оператора <code translate="no">IN</code>.</p>
<p>В Milvus введена система шаблонов выражений фильтрации для оптимизации производительности при работе с символами CJK. Благодаря отделению динамических значений от выражения фильтра механизм запросов более эффективно обрабатывает вставку параметров.</p>
<h3 id="Example" class="common-anchor-header">Пример<button data-href="#Example" class="anchor-icon" translate="no">
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
    </button></h3><p>Чтобы найти людей старше 25 лет, проживающих либо в «北京» (Пекине), либо в «上海» (Шанхае), используйте следующий шаблон выражения:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; 25 AND city IN [&#x27;北京&#x27;, &#x27;上海&#x27;]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Для повышения производительности используйте следующий вариант с параметрами:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city in {city}&quot;</span>,
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
<button class="copy-code-btn"></button></code></pre>
<p>Такой подход снижает нагрузку на синтаксический анализ и повышает скорость выполнения запросов. Дополнительные сведения см. в разделе <a href="/docs/ru/filtering-templating.md">«Шаблоны фильтров</a>».</p>
<h2 id="Data-type-specific-operators" class="common-anchor-header">Операторы для конкретных типов данных<button data-href="#Data-type-specific-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus предоставляет расширенные операторы фильтрации для конкретных типов данных, таких как поля JSON, ARRAY и VARCHAR.</p>
<h3 id="JSON-field-specific-operators" class="common-anchor-header">Операторы для полей JSON<button data-href="#JSON-field-specific-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus предлагает расширенные операторы для запросов к полям JSON, позволяющие осуществлять точную фильтрацию в сложных структурах JSON:</p>
<p><code translate="no">JSON_CONTAINS(identifier, jsonExpr)</code>: Проверяет, присутствует ли выражение JSON в поле.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains(tags, &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ALL(identifier, jsonExpr)</code>: Гарантирует, что все элементы JSON-выражения присутствуют.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_all(tags, [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ANY(identifier, jsonExpr)</code>: Фильтрует сущности, в JSON-выражении которых присутствует хотя бы один элемент.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_any(tags, [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Более подробную информацию об операторах JSON см. в разделе <a href="/docs/ru/json-operators.md">«Операторы JSON</a>».</p>
<h3 id="ARRAY-field-specific-operators" class="common-anchor-header">Операторы, специфичные для полей ARRAY<button data-href="#ARRAY-field-specific-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus предоставляет расширенные операторы фильтрации для полей массива, такие как « <code translate="no">ARRAY_CONTAINS</code> », « <code translate="no">ARRAY_CONTAINS_ALL</code> », « <code translate="no">ARRAY_CONTAINS_ANY</code> » и « <code translate="no">ARRAY_LENGTH</code> », которые позволяют осуществлять тонкое управление данными массива:</p>
<p><code translate="no">ARRAY_CONTAINS</code>: Фильтрует объекты, содержащие конкретный элемент.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ALL</code>: Фильтрует сущности, в которых присутствуют все элементы из списка.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ANY</code>: Фильтрует объекты, содержащие любой элемент из списка.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_LENGTH</code>: Выполняет фильтрацию на основе длины массива.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Более подробную информацию об операторах массивов см. в разделе <a href="/docs/ru/array-operators.md">«Операторы ARRAY</a>».</p>
<h3 id="VARCHAR-field-specific-operators" class="common-anchor-header">Операторы, специфичные для полей VARCHAR<button data-href="#VARCHAR-field-specific-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus предоставляет специализированные операторы для точного текстового поиска в полях типа VARCHAR:</p>
<h4 id="Pattern-matching-operators" class="common-anchor-header">Операторы сопоставления шаблонов</h4><p>Операторы ` <code translate="no">LIKE</code>`, ` <code translate="no">=~</code>` и ` <code translate="no">!~</code> ` сопоставляют шаблоны строк в полях ` <code translate="no">VARCHAR</code> `, путях строк JSON и определённых элементах ` <code translate="no">ARRAY&lt;VARCHAR&gt;</code> `. Используйте ` <code translate="no">LIKE</code> ` для простых шаблонов с подстановочными знаками. Используйте ` <code translate="no">=~</code> ` и ` <code translate="no">!~</code> ` для регулярных выражений RE2.</p>
<p>Подробности см. в разделе <a href="/docs/ru/pattern-matching.md">«Сопоставление шаблонов</a>».</p>
<h4 id="TEXTMATCH-operator" class="common-anchor-header"><code translate="no">TEXT_MATCH</code> Оператор</h4><p>Оператор « <code translate="no">TEXT_MATCH</code> » позволяет точно находить документы на основе конкретных терминов запроса. Он особенно полезен для фильтрованного поиска, сочетающего скалярные фильтры с векторным поиском по схожести. В отличие от семантического поиска, «Text Match» ориентирован на точные вхождения терминов.</p>
<p>Milvus использует Tantivy для поддержки инвертированного индексирования и текстового поиска по терминам. Процесс включает:</p>
<ol>
<li><p><strong>Анализатор</strong>: разбивает входной текст на токены и обрабатывает его.</p></li>
<li><p><strong>Индексирование</strong>: создает инвертированный индекс, сопоставляющий уникальные токены с документами.</p></li>
</ol>
<p>Более подробную информацию см. в разделе <a href="/docs/ru/keyword-match.md">«Text Match</a>».</p>
<h4 id="PHRASEMATCH-operator--Milvus-26x" class="common-anchor-header"><code translate="no">PHRASE_MATCH</code> оператор<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span></h4><p>Оператор <strong>PHRASE_MATCH</strong> позволяет точно находить документы на основе точного совпадения фраз с учетом как порядка, так и смежности терминов запроса.</p>
<p>Подробнее см. в разделе <a href="/docs/ru/phrase-match.md">«Совпадение фраз</a>».</p>
