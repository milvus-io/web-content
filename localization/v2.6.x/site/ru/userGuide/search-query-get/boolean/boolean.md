---
id: boolean.md
title: Объяснение фильтрации
summary: >-
  Milvus предоставляет мощные возможности фильтрации, которые позволяют
  выполнять точные запросы к вашим данным. Выражения фильтрации позволяют
  нацеливаться на определенные скалярные поля и уточнять результаты поиска с
  помощью различных условий. В этом руководстве объясняется, как использовать
  выражения фильтрации в Milvus, и приводятся примеры, ориентированные на
  операции запроса. Вы также можете применять эти фильтры в запросах на поиск и
  удаление.
---
<h1 id="Filtering-Explained" class="common-anchor-header">Объяснение фильтрации<button data-href="#Filtering-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus предоставляет мощные возможности фильтрации, которые позволяют выполнять точные запросы к вашим данным. Выражения фильтрации позволяют нацеливаться на определенные скалярные поля и уточнять результаты поиска с помощью различных условий. В этом руководстве объясняется, как использовать выражения фильтрации в Milvus, а примеры посвящены операциям запроса. Вы также можете применять эти фильтры в запросах на поиск и удаление.</p>
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
    </button></h2><p>Milvus поддерживает несколько основных операторов для фильтрации данных:</p>
<ul>
<li><p><strong>Операторы сравнения</strong>: <code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code> и <code translate="no">&lt;=</code> позволяют фильтровать данные на основе числовых или текстовых полей.</p></li>
<li><p><strong>Фильтры диапазонов</strong>: <code translate="no">IN</code> и <code translate="no">LIKE</code> помогают найти определенные диапазоны или наборы значений.</p></li>
<li><p><strong>Арифметические операторы</strong>: <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code>, <code translate="no">/</code>, <code translate="no">%</code> и <code translate="no">**</code> используются для вычислений с числовыми полями.</p></li>
<li><p><strong>Логические операторы</strong>: <code translate="no">AND</code>, <code translate="no">OR</code> и <code translate="no">NOT</code> объединяют несколько условий в сложные выражения.</p></li>
</ul>
<h3 id="Example-Filtering-by-Color" class="common-anchor-header">Пример: Фильтрация по цвету</h3><p>Чтобы найти сущности с первичными цветами (красным, зеленым или синим) в скалярном поле <code translate="no">color</code>, используйте следующее выражение фильтра:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-JSON-Fields" class="common-anchor-header">Пример: Фильтрация полей JSON</h3><p>Milvus позволяет ссылаться на ключи в полях JSON. Например, если у вас есть JSON-поле <code translate="no">product</code> с ключами <code translate="no">price</code> и <code translate="no">model</code>, и вы хотите найти товары с определенной моделью и ценой ниже 1 850, используйте следующее выражение фильтра:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;product[&quot;model&quot;] == &quot;JSN-087&quot; AND product[&quot;price&quot;] &lt; 1850&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-Array-Fields" class="common-anchor-header">Пример: Фильтрация полей массива</h3><p>Если у вас есть поле массива <code translate="no">history_temperatures</code>, содержащее записи о средних температурах, зарегистрированных обсерваториями с 2000 года, и вы хотите найти обсерватории, в которых температура в 2009 году (10-я запись) превысила 23 °C, используйте это выражение:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;history_temperatures[10] &gt; 23&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Дополнительные сведения об этих базовых операторах см. в разделе <a href="/docs/ru/basic-operators.md">Базовые операторы</a>.</p>
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
    </button></h2><p>При фильтрации с использованием символов CJK обработка может быть более сложной из-за большего набора символов и различий в кодировке. Это может привести к снижению производительности, особенно при использовании оператора <code translate="no">IN</code>.</p>
<p>Milvus вводит шаблонизацию выражений фильтрации для оптимизации производительности при работе с символами CJK. Отделяя динамические значения от выражения фильтра, механизм запросов более эффективно обрабатывает вставку параметров.</p>
<h3 id="Example" class="common-anchor-header">Пример</h3><p>Чтобы найти людей старше 25 лет, проживающих в "北京" (Пекин) или "上海" (Шанхай), используйте следующее шаблонное выражение:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; 25 AND city IN [&#x27;北京&#x27;, &#x27;上海&#x27;]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Чтобы повысить производительность, используйте эту вариацию с параметрами:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city in {city}&quot;</span>,
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
<button class="copy-code-btn"></button></code></pre>
<p>Такой подход снижает накладные расходы на синтаксический разбор и повышает скорость выполнения запросов. Дополнительные сведения см. в разделе <a href="/docs/ru/filtering-templating.md">Шаблонизация фильтров</a>.</p>
<h2 id="Data-type-specific-operators" class="common-anchor-header">Операторы, специфичные для типов данных<button data-href="#Data-type-specific-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus предоставляет расширенные операторы фильтрации для определенных типов данных, таких как поля JSON, ARRAY и VARCHAR.</p>
<h3 id="JSON-field-specific-operators" class="common-anchor-header">Операторы, специфичные для полей JSON</h3><p>Milvus предлагает расширенные операторы для запросов к полям JSON, обеспечивая точную фильтрацию в сложных структурах JSON:</p>
<p><code translate="no">JSON_CONTAINS(identifier, jsonExpr)</code>: Проверяет, существует ли выражение JSON в поле.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains(tags, &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ALL(identifier, jsonExpr)</code>: : Проверяет наличие всех элементов JSON-выражения.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_all(tags, [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ANY(identifier, jsonExpr)</code>: : Фильтрует сущности, для которых в выражении JSON существует хотя бы один элемент.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_any(tags, [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Более подробную информацию об операторах JSON см. в разделе <a href="/docs/ru/json-operators.md">Операторы JSON</a>.</p>
<h3 id="ARRAY-field-specific-operators" class="common-anchor-header">Операторы, специфичные для полей ARRAY</h3><p>Milvus предоставляет расширенные операторы фильтрации для полей массивов, таких как <code translate="no">ARRAY_CONTAINS</code>, <code translate="no">ARRAY_CONTAINS_ALL</code>, <code translate="no">ARRAY_CONTAINS_ANY</code>, и <code translate="no">ARRAY_LENGTH</code>, которые позволяют осуществлять тонкий контроль над данными массива:</p>
<p><code translate="no">ARRAY_CONTAINS</code>: : Фильтрует сущности, содержащие определенный элемент.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ALL</code>: : Фильтрует сущности, в которых присутствуют все элементы списка.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ANY</code>: : Фильтрует сущности, содержащие любой элемент из списка.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_LENGTH</code>: Фильтрует на основе длины массива.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Более подробную информацию об операторах массивов см. в разделе <a href="/docs/ru/array-operators.md">Операторы ARRAY</a>.</p>
<h3 id="VARCHAR-field-specific-operators" class="common-anchor-header">Операторы, специфичные для полей VARCHAR</h3><p>Milvus предоставляет специализированные операторы для точного текстового поиска по полям VARCHAR:</p>
<h4 id="TEXTMATCH-operator" class="common-anchor-header"><code translate="no">TEXT_MATCH</code> оператор</h4><p>Оператор <code translate="no">TEXT_MATCH</code> позволяет осуществлять точный поиск документов на основе определенных терминов запроса. Он особенно полезен для фильтрованного поиска, сочетающего скалярные фильтры с поиском по векторному сходству. В отличие от семантического поиска, Text Match фокусируется на точных вхождениях терминов.</p>
<p>Milvus использует Tantivy для поддержки инвертированного индексирования и текстового поиска по терминам. Процесс включает в себя:</p>
<ol>
<li><p><strong>Анализатор</strong>: Токенизирует и обрабатывает входной текст.</p></li>
<li><p><strong>Индексирование</strong>: Создает инвертированный индекс, сопоставляющий уникальные лексемы с документами.</p></li>
</ol>
<p>Более подробную информацию см. в разделе <a href="/docs/ru/keyword-match.md">"Сопоставление текста"</a>.</p>
<h4 id="PHRASEMATCH-operator--Milvus-26x" class="common-anchor-header"><code translate="no">PHRASE_MATCH</code> оператор<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span></h4><p>Оператор <strong>PHRASE_MATCH</strong> обеспечивает точный поиск документов на основе точного совпадения фраз, учитывая порядок и смежность терминов запроса.</p>
<p>Более подробную информацию см. в разделе <a href="/docs/ru/phrase-match.md">"Фразовое соответствие"</a>.</p>
<h2 id="Random-sampling-operator--Milvus-26x" class="common-anchor-header">Оператор случайной выборки<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Random-sampling-operator--Milvus-26x" class="anchor-icon" translate="no">
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
    </button></h2><p>Случайная выборка позволяет извлекать подмножество образцов данных из коллекции на уровне сегмента, что делает ее идеальной для изучения и обработки массивных наборов данных. Эта функция ценна для таких случаев использования:</p>
<ul>
<li><p><strong>Быстрый предварительный просмотр данных</strong>: Возвращает репрезентативные образцы данных с минимальным использованием ресурсов, что позволяет быстро понять общую структуру и содержание больших векторных наборов данных.</p></li>
<li><p><strong>Комбинированная фильтрация</strong>: При выполнении многокритериальной фильтрации (например, отбор документов по атрибутам) сочетание ее со случайной выборкой позволяет быстро получить статистические сводки и предварительный просмотр отфильтрованных результатов.</p></li>
<li><p><strong>Экономия ресурсов при обработке крупномасштабных данных</strong>: Для очень больших наборов данных агрегирование и анализ полных данных может быть ресурсоемким. Случайная выборка снижает нагрузку на обработку за счет уменьшения объема обрабатываемых данных.</p></li>
</ul>
<p>Для случайной выборки используйте следующий синтаксис:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = RANDOM_SAMPLE(<span class="hljs-built_in">float</span>)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">float</code><strong>:</strong> Коэффициент выборки в диапазоне (0, 1), исключая границы. Например, <code translate="no">RANDOM_SAMPLE(0.001)</code> выбирает примерно 0,1 % результатов.</li>
</ul>
<div class="alert note">
<p>Выражение <code translate="no">RANDOM_SAMPLE</code> не зависит от регистра. Вы можете использовать либо <code translate="no">RANDOM_SAMPLE</code>, либо <code translate="no">random_sample</code>.</p>
</div>
<h3 id="Combine-with-other-filters" class="common-anchor-header">Сочетание с другими фильтрами</h3><p>Оператор случайной выборки необходимо комбинировать с другими выражениями фильтрации с помощью логического <code translate="no">AND</code>. Например:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;color = &#x27;red&#x27; and RANDOM_SAMPLE(0.001)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Здесь Milvus сначала применяет условие <code translate="no">color = 'red'</code>, а затем выполняет случайную выборку в наборе результатов.</p>
<h3 id="Example-Random-sampling-without-an-additional-filter" class="common-anchor-header">Пример: Случайная выборка без дополнительного фильтра</h3><p>В этом примере запрос выбирает случайное подмножество (примерно 1 %) всех данных в указанной коллекции:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;RANDOM_SAMPLE(0.01)&quot;</span>

result = MilvusClient.query(
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>, 
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Combined-filtering-with-random-sampling" class="common-anchor-header">Пример: Комбинированная фильтрация и случайная выборка</h3><p>В этом примере запрос сначала фильтрует документы на основе определенного атрибута (в данном случае документы, в которых <code translate="no">color</code> равен <code translate="no">'red'</code>). После фильтрации применяется оператор случайной выборки, чтобы вернуть примерно 0,1 % отфильтрованных результатов:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;color = &#x27;red&#x27; and RANDOM_SAMPLE(0.001)&quot;</span>

result = MilvusClient.query(
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>, 
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
