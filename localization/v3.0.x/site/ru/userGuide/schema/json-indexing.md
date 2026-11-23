---
id: json-indexing.md
title: Индексирование JSON
summary: >-
  Выберите путь JSON и выполните преобразование, проверьте требования,
  специфичные для JSON, и создайте индексы по путям.
---
<h1 id="JSON-Indexing" class="common-anchor-header">Индексирование JSON<button data-href="#JSON-Indexing" class="anchor-icon" translate="no">
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
    </button></h1><p>Индексы JSON Path ускоряют фильтрацию по выбранным ключам в <a href="/docs/ru/json-field-overview.md">поле JSON</a>. В этом руководстве описаны настройки пути и преобразования, поддерживаемые комбинации, а также шаги по созданию, специфичные для JSON. Общие сведения о выборе индексов и правилах автоматического выбора см. в разделе <a href="/docs/ru/scalar_index.md">«Скалярный индекс</a>».</p>
<p>Для документов с разнообразными путями запросов рекомендуется использовать <a href="/docs/ru/json-shredding.md">фрагментацию JSON</a>.</p>
<p><a id="Index-type-overview"></a></p>
<h2 id="Before-you-create-an-index" class="common-anchor-header">Перед созданием индекса<button data-href="#Before-you-create-an-index" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Understand-cast-types" class="common-anchor-header">Ознакомьтесь с типами приведения<button data-href="#Understand-cast-types" class="anchor-icon" translate="no">
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
    </button></h3><p>Выберите ключ для индексирования с помощью « <code translate="no">json_path</code> », например <code translate="no">metadata[&quot;price&quot;]</code>. Укажите « <code translate="no">json_cast_type</code> » в соответствии с типом значений по данному пути; схема поля останется <code translate="no">JSON</code>. Преобразование требуется как для явных индексов, так и для автоматического преобразования ( <code translate="no">AUTOINDEX</code>). Если вы опустите « <code translate="no">json_path</code> », Milvus будет использовать имя поля, указанное в запросе.</p>
<p><a id="Choose-an-index-type"></a>
<a id="Compatibility-reference"></a>
<a id="How-do-I-choose-between-AUTOINDEX-and-an-explicit-index-type"></a>
<a id="INVERTED"></a>
<a id="STLSORT"></a>
<a id="BITMAP"></a>
<a id="NGRAM"></a></p>
<p>Выберите приведение типа и один из поддерживаемых типов индекса. В этой таблице перечислены комбинации путей JSON, поддерживаемые в Milvus 3.0.6 с автоматическим сопоставлением типов по умолчанию; варианты, отмеченные знаком *, требуют <a href="#Index-requirements">настройки с включением этой функции</a>:</p>
<table>
<thead>
<tr><th>Тип преобразования</th><th>Значения по пути</th><th>Поддерживаемые типы индексов</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>Булево значение, например <code translate="no">true</code></td><td><code translate="no">AUTOINDEX</code>, <code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>*</td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td>Число, например <code translate="no">99.99</code></td><td><code translate="no">AUTOINDEX</code>, <code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code>*</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>Строка, например <code translate="no">&quot;electronics&quot;</code></td><td><code translate="no">AUTOINDEX</code>, <code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code><em>, <code translate="no">BITMAP</code></em>, <code translate="no">NGRAM</code></td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td>массив логических значений, например <code translate="no">[true, false]</code></td><td><code translate="no">INVERTED</code></td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td>Массив чисел, например <code translate="no">[1.2, 3.14]</code></td><td><code translate="no">INVERTED</code></td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td>Массив строк, например <code translate="no">[&quot;tag1&quot;, &quot;tag2&quot;]</code></td><td><code translate="no">INVERTED</code></td></tr>
</tbody>
</table>
<p><a id="What-if-a-JSON-key-has-inconsistent-data-types-across-different-entities"></a></p>
<p>Индексируются только значения, соответствующие приведению типа. Например, приведение типа « <code translate="no">DOUBLE</code> » индексирует « <code translate="no">99.99</code> », но пропускает « <code translate="no">&quot;99.99&quot;</code> ». Чтобы преобразовать числовые строки во время индексирования, используйте функцию « <code translate="no">json_cast_function=&quot;STRING_TO_DOUBLE&quot;</code> » с приведением типа « <code translate="no">DOUBLE</code> », как показано в <a href="#Example-5-Convert-data-type-at-index-time">примере 5</a>. Эту функцию нельзя использовать с другими приведениями типа; значения, преобразование которых завершилось с ошибкой, пропускаются.</p>
<h3 id="Index-requirements" class="common-anchor-header">Требования к индексу<button data-href="#Index-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p><a id="Can-I-create-multiple-indexes-on-the-same-JSON-key"></a>
<a id="What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type"></a></p>
<p>Перед созданием индекса проверьте следующие условия:</p>
<ul>
<li><strong>Один индекс на каждый путь:</strong> каждая пара « <code translate="no">(field, json_path)</code> » поддерживает не более одного индекса для всех типов приведения и индексов.</li>
<li><strong>Соответствующие типы запросов:</strong> чтобы использовать индекс, запрос должен быть направлен на индексированный путь с совместимым типом значения. Несовместимые фильтры могут переключаться на сканирование.</li>
<li><strong>Преобразования массивов:</strong> явно укажите <code translate="no">INVERTED</code> для <code translate="no">ARRAY_BOOL</code>, <code translate="no">ARRAY_DOUBLE</code> и <code translate="no">ARRAY_VARCHAR</code>. Автоматическое сопоставление типов по умолчанию не поддерживает эти преобразования.</li>
<li><strong>Индексы на основе строковых шаблонов:</strong> для индекса <code translate="no">NGRAM</code> используйте приведение <code translate="no">VARCHAR</code> и укажите <code translate="no">min_gram</code> и <code translate="no">max_gram</code>. См. <a href="/docs/ru/ngram.md#Example-2-Create-on-a-JSON-path">раздел «NGRAM по пути JSON»</a> для ознакомления с параметрами и примерами создания.</li>
</ul>
<p><a id="AUTOINDEX"></a></p>
<p>Скалярные индексы JSON <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code> и автоматический выбор на основе кардинальности доступны начиная с Milvus 3.0.0. Перед использованием опций, помеченных *, или <code translate="no">AUTOINDEX</code> на основе кардинальности, попросите администратора выполнить <a href="/docs/ru/release_notes.md#Compatibility-and-behavior-notes">настройку включения индекса, описанную в примечаниях по совместимости</a>.</p>
<div class="alert note">
<blockquote>
<p>Без настройки включения индексации <code translate="no">AUTOINDEX</code> использует <code translate="no">INVERTED</code> для скалярных путей JSON, а явные запросы JSON <code translate="no">BITMAP</code> или <code translate="no">STL_SORT</code> завершаются с ошибкой. Для <code translate="no">INVERTED</code> и <code translate="no">NGRAM</code> такая настройка не требуется. Информацию о правилах автоматического выбора и переопределениях администратора см. в разделе <a href="/docs/ru/scalar_index.md#AUTOINDEX-behavior">«Поведение AUTOINDEX</a>».</p>
</blockquote>
</div>
<p><details id="Supported-filters">
<summary><strong>Подробности выполнения фильтров JSON</strong></summary></p>
<p>Для скалярных сравнений и строковых шаблонов следует руководствоваться <a href="/docs/ru/scalar_index.md#Index-types">возможностями фильтра</a> выбранного индекса. Синтаксис строковых фильтров и правила планирования описаны в разде <a href="/docs/ru/pattern-matching.md">ле «Сопоставление шаблонов</a>».</p>
<p>Операции, специфичные для JSON, имеют следующие дополнительные особенности поведения:</p>
<table>
<thead>
<tr><th>Фильтр</th><th>Поведение индекса JSON-path</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">JSON_CONTAINS</code>, <code translate="no">JSON_CONTAINS_ANY</code>, <code translate="no">JSON_CONTAINS_ALL</code></td><td>Индекс « <code translate="no">INVERTED</code> » в пути к типизированному массиву может выполнять поиск совместимых элементов. Операнды со смешанными типами или вложенными массивами могут переходить к сканированию.</td></tr>
<tr><td><code translate="no">exists</code>, например <code translate="no">exists metadata[&quot;price&quot;]</code></td><td>Можно использовать индексированный путь для проверки его наличия. Это отличается от сравнения значения или проверки того, является ли всё поле NULL.</td></tr>
</tbody>
</table>
<p>Синтаксис выражений см. в разделе <a href="/docs/ru/json-operators.md">«Операторы JSON</a>».</p>
<p></details></p>
<h2 id="Create-a-JSON-index" class="common-anchor-header">Создание индекса JSON<button data-href="#Create-a-JSON-index" class="anchor-icon" translate="no">
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
    </button></h2><p>В примерах используется подключенный клиент и коллекция с полем типа « <code translate="no">JSON</code> » под названием « <code translate="no">metadata</code> », содержащая данные следующего вида:</p>
<h3 id="Sample-JSON-structure" class="common-anchor-header">Пример структуры JSON<button data-href="#Sample-JSON-structure" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;electronics&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;BrandA&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">99.99</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;string_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;99.99&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;tags&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;clearance&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;summer_sale&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;supplier&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;SupplierX&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;country&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;USA&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;contact&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;email&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;support@supplierx.com&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;phone&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Basic-setup" class="common-anchor-header">Базовая настройка<button data-href="#Basic-setup" class="anchor-icon" translate="no">
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
    </button></h3><p>Для настройки подключения и коллекции разверните следующий блок:</p>
<p><details></p>
<p><summary><strong>Подключение и создание примерной коллекции</strong></summary></p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;root:Milvus&quot;</span>)

<span class="hljs-comment"># Define a schema with a JSON field</span>
schema = client.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;pk&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;vec&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>)
schema.add_field(<span class="hljs-string">&quot;metadata&quot;</span>, DataType.JSON, nullable=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Minimal vector index so the collection can be loaded</span>
vec_index = client.prepare_index_params()
vec_index.add_index(field_name=<span class="hljs-string">&quot;vec&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;L2&quot;</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    schema=schema,
    index_params=vec_index,
)

<span class="hljs-comment"># Insert one row that matches the sample JSON structure above</span>
client.insert(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    data=[{
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;vec&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>],
        <span class="hljs-string">&quot;metadata&quot;</span>: {
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;string_price&quot;</span>: <span class="hljs-string">&quot;99.99&quot;</span>,
            <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>],
            <span class="hljs-string">&quot;supplier&quot;</span>: {
                <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;SupplierX&quot;</span>,
                <span class="hljs-string">&quot;country&quot;</span>: <span class="hljs-string">&quot;USA&quot;</span>,
                <span class="hljs-string">&quot;contact&quot;</span>: {
                    <span class="hljs-string">&quot;email&quot;</span>: <span class="hljs-string">&quot;support@supplierx.com&quot;</span>,
                    <span class="hljs-string">&quot;phone&quot;</span>: <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
                }
            }
        }
    }],
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-comment">// Define a schema with a JSON field</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
schema.setEnableDynamicField(<span class="hljs-literal">false</span>);
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;pk&quot;</span>).dataType(DataType.Int64).isPrimaryKey(<span class="hljs-literal">true</span>).autoID(<span class="hljs-literal">false</span>).build());
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;vec&quot;</span>).dataType(DataType.FloatVector).dimension(<span class="hljs-number">4</span>).build());
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;metadata&quot;</span>).dataType(DataType.JSON).isNullable(<span class="hljs-literal">true</span>).build());

<span class="hljs-comment">// Minimal vector index so the collection can be loaded</span>
List&lt;IndexParam&gt; vecIndex = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
vecIndex.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;vec&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.L2)
        .build());

client.createCollection(CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;your_collection_name&quot;</span>)
        .collectionSchema(schema)
        .indexParams(vecIndex)
        .build());

<span class="hljs-comment">// Insert one row that matches the sample JSON structure above</span>
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">metadata</span> <span class="hljs-operator">=</span> gson.fromJson(<span class="hljs-string">&quot;{&quot;</span>
        + <span class="hljs-string">&quot;\&quot;category\&quot;: \&quot;electronics\&quot;,&quot;</span>
        + <span class="hljs-string">&quot;\&quot;brand\&quot;: \&quot;BrandA\&quot;,&quot;</span>
        + <span class="hljs-string">&quot;\&quot;in_stock\&quot;: true,&quot;</span>
        + <span class="hljs-string">&quot;\&quot;price\&quot;: 99.99,&quot;</span>
        + <span class="hljs-string">&quot;\&quot;string_price\&quot;: \&quot;99.99\&quot;,&quot;</span>
        + <span class="hljs-string">&quot;\&quot;tags\&quot;: [\&quot;clearance\&quot;, \&quot;summer_sale\&quot;],&quot;</span>
        + <span class="hljs-string">&quot;\&quot;supplier\&quot;: {&quot;</span>
        + <span class="hljs-string">&quot;    \&quot;name\&quot;: \&quot;SupplierX\&quot;,&quot;</span>
        + <span class="hljs-string">&quot;    \&quot;country\&quot;: \&quot;USA\&quot;,&quot;</span>
        + <span class="hljs-string">&quot;    \&quot;contact\&quot;: {&quot;</span>
        + <span class="hljs-string">&quot;        \&quot;email\&quot;: \&quot;support@supplierx.com\&quot;,&quot;</span>
        + <span class="hljs-string">&quot;        \&quot;phone\&quot;: \&quot;+1-800-555-0199\&quot;&quot;</span>
        + <span class="hljs-string">&quot;    }&quot;</span>
        + <span class="hljs-string">&quot;}&quot;</span>
        + <span class="hljs-string">&quot;}&quot;</span>, JsonObject.class);
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row.addProperty(<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-number">1L</span>);
row.add(<span class="hljs-string">&quot;vec&quot;</span>, gson.toJsonTree(Arrays.asList(<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>)));
row.add(<span class="hljs-string">&quot;metadata&quot;</span>, metadata);

client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;your_collection_name&quot;</span>)
        .data(Collections.singletonList(row))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">package</span> main

<span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}
<span class="hljs-keyword">defer</span> cli.Close(ctx)

<span class="hljs-comment">// Define a schema with a JSON field</span>
schema := entity.NewSchema().WithDynamicFieldEnabled(<span class="hljs-literal">false</span>).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;pk&quot;</span>).WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(<span class="hljs-literal">true</span>).WithIsAutoID(<span class="hljs-literal">false</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;vec&quot;</span>).WithDataType(entity.FieldTypeFloatVector).WithDim(<span class="hljs-number">4</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;metadata&quot;</span>).WithDataType(entity.FieldTypeJSON).WithNullable(<span class="hljs-literal">true</span>))

<span class="hljs-comment">// Minimal vector index so the collection can be loaded</span>
vecIndex := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-string">&quot;vec&quot;</span>, index.NewAutoIndex(entity.L2))

err = cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;your_collection_name&quot;</span>, schema).
    WithIndexOptions(vecIndex))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

<span class="hljs-comment">// Insert one row that matches the sample JSON structure above</span>
metadata := []<span class="hljs-type">byte</span>(<span class="hljs-string">`{
    &quot;category&quot;: &quot;electronics&quot;,
    &quot;brand&quot;: &quot;BrandA&quot;,
    &quot;in_stock&quot;: true,
    &quot;price&quot;: 99.99,
    &quot;string_price&quot;: &quot;99.99&quot;,
    &quot;tags&quot;: [&quot;clearance&quot;, &quot;summer_sale&quot;],
    &quot;supplier&quot;: {
        &quot;name&quot;: &quot;SupplierX&quot;,
        &quot;country&quot;: &quot;USA&quot;,
        &quot;contact&quot;: {
            &quot;email&quot;: &quot;support@supplierx.com&quot;,
            &quot;phone&quot;: &quot;+1-800-555-0199&quot;
        }
    }
}`</span>)
result, err := cli.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;your_collection_name&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;pk&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">1</span>}).
    WithFloatVectorColumn(<span class="hljs-string">&quot;vec&quot;</span>, <span class="hljs-number">4</span>, [][]<span class="hljs-type">float32</span>{{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>}}).
    WithColumns(column.NewColumnJSONBytes(<span class="hljs-string">&quot;metadata&quot;</span>, [][]<span class="hljs-type">byte</span>{metadata})))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}
log.Printf(<span class="hljs-string">&quot;inserted %d rows&quot;</span>, result.InsertCount)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-comment">// Define a schema with a JSON field</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">schema</span> = CollectionSchema::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;pk&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::Int64).<span class="hljs-title function_ invoke__">primary_key</span>(<span class="hljs-literal">true</span>).<span class="hljs-title function_ invoke__">auto_id</span>(<span class="hljs-literal">false</span>))
    .<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;vec&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector).<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">4</span>))
    .<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;metadata&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::Json).<span class="hljs-title function_ invoke__">nullable</span>(<span class="hljs-literal">true</span>));

client.<span class="hljs-title function_ invoke__">create_collection</span>(
    CreateCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;your_collection_name&quot;</span>)
        .<span class="hljs-title function_ invoke__">schema</span>(schema)
        .<span class="hljs-title function_ invoke__">build</span>()?,
)
.<span class="hljs-keyword">await</span>?;

<span class="hljs-comment">// Minimal vector index so the collection can be loaded</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">vec_index</span> = IndexParam::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;vec&quot;</span>)
    .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::AutoIndex)
    .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::L2);

client.<span class="hljs-title function_ invoke__">create_index</span>(
    CreateIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;your_collection_name&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_params</span>(<span class="hljs-built_in">vec!</span>[vec_index])
        .<span class="hljs-title function_ invoke__">build</span>()?,
)
.<span class="hljs-keyword">await</span>?;

<span class="hljs-comment">// Insert one row that matches the sample JSON structure above</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">row</span> = json!({
    <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
    <span class="hljs-string">&quot;vec&quot;</span>: [<span class="hljs-number">0.1f32</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>],
    <span class="hljs-string">&quot;metadata&quot;</span>: {
        <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>,
        <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>,
        <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
        <span class="hljs-string">&quot;string_price&quot;</span>: <span class="hljs-string">&quot;99.99&quot;</span>,
        <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>],
        <span class="hljs-string">&quot;supplier&quot;</span>: {
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;SupplierX&quot;</span>,
            <span class="hljs-string">&quot;country&quot;</span>: <span class="hljs-string">&quot;USA&quot;</span>,
            <span class="hljs-string">&quot;contact&quot;</span>: {
                <span class="hljs-string">&quot;email&quot;</span>: <span class="hljs-string">&quot;support@supplierx.com&quot;</span>,
                <span class="hljs-string">&quot;phone&quot;</span>: <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
            }
        }
    }
});
client.<span class="hljs-title function_ invoke__">insert</span>(
    InsertRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;your_collection_name&quot;</span>)
        .<span class="hljs-title function_ invoke__">rows</span>(<span class="hljs-built_in">vec!</span>[row])
        .<span class="hljs-title function_ invoke__">build</span>()?,
)
.<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-comment">// Define a schema with a JSON field</span>
<span class="hljs-function">milvus::CollectionSchema <span class="hljs-title">schema</span><span class="hljs-params">(<span class="hljs-string">&quot;your_collection_name&quot;</span>)</span></span>;
schema.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;pk&quot;</span>, milvus::DataType::INT64, <span class="hljs-string">&quot;&quot;</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>));
schema.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;vec&quot;</span>, milvus::DataType::FLOAT_VECTOR, <span class="hljs-string">&quot;&quot;</span>).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">4</span>));
schema.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;metadata&quot;</span>, milvus::DataType::JSON, <span class="hljs-string">&quot;&quot;</span>).<span class="hljs-built_in">WithNullable</span>(<span class="hljs-literal">true</span>));

<span class="hljs-comment">// Minimal vector index so the collection can be loaded</span>
<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">vec_index</span><span class="hljs-params">(<span class="hljs-string">&quot;vec&quot;</span>, <span class="hljs-string">&quot;vec_index&quot;</span>, milvus::IndexType::AUTOINDEX, milvus::MetricType::L2)</span></span>;

status = client-&gt;<span class="hljs-built_in">CreateCollection</span>(milvus::<span class="hljs-built_in">CreateCollectionRequest</span>()
    .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;your_collection_name&quot;</span>)
    .<span class="hljs-built_in">WithCollectionSchema</span>(std::<span class="hljs-built_in">make_shared</span>&lt;milvus::CollectionSchema&gt;(schema)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(milvus::<span class="hljs-built_in">CreateIndexRequest</span>()
    .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;your_collection_name&quot;</span>)
    .<span class="hljs-built_in">WithIndexes</span>({std::<span class="hljs-built_in">move</span>(vec_index)})
    .<span class="hljs-built_in">WithSync</span>(<span class="hljs-literal">true</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-comment">// Insert one row that matches the sample JSON structure above</span>
milvus::InsertRequest insert_req;
insert_req.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;your_collection_name&quot;</span>);
insert_req.<span class="hljs-built_in">AddRowData</span>({{<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-number">1</span>},
                       {<span class="hljs-string">&quot;vec&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>}},
                       {<span class="hljs-string">&quot;metadata&quot;</span>, nlohmann::json::<span class="hljs-built_in">parse</span>(<span class="hljs-string">R&quot;({
                            &quot;category&quot;: &quot;electronics&quot;,
                            &quot;brand&quot;: &quot;BrandA&quot;,
                            &quot;in_stock&quot;: true,
                            &quot;price&quot;: 99.99,
                            &quot;string_price&quot;: &quot;99.99&quot;,
                            &quot;tags&quot;: [&quot;clearance&quot;, &quot;summer_sale&quot;],
                            &quot;supplier&quot;: {
                                &quot;name&quot;: &quot;SupplierX&quot;,
                                &quot;country&quot;: &quot;USA&quot;,
                                &quot;contact&quot;: {
                                    &quot;email&quot;: &quot;support@supplierx.com&quot;,
                                    &quot;phone&quot;: &quot;+1-800-555-0199&quot;
                                }
                            }
                        })&quot;</span>)}});
milvus::InsertResponse insert_resp;
status = client-&gt;<span class="hljs-built_in">Insert</span>(insert_req, insert_resp);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span> });

<span class="hljs-comment">// Define a schema with a JSON field</span>
<span class="hljs-keyword">const</span> fields = [
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>, <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;vec&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>, <span class="hljs-attr">type_params</span>: { <span class="hljs-attr">dim</span>: <span class="hljs-string">&quot;4&quot;</span> } },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>, <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span> },
];

<span class="hljs-comment">// Minimal vector index so the collection can be loaded</span>
<span class="hljs-keyword">const</span> indexParams = [
  { <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;vec&quot;</span>, <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;vec_index&quot;</span>, <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;L2&quot;</span> },
];

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;your_collection_name&quot;</span>,
  fields,
  <span class="hljs-attr">index_params</span>: indexParams,
});

<span class="hljs-comment">// Insert one row that matches the sample JSON structure above</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;your_collection_name&quot;</span>,
  <span class="hljs-attr">data</span>: [
    {
      <span class="hljs-attr">pk</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">vec</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>],
      <span class="hljs-attr">metadata</span>: {
        <span class="hljs-attr">category</span>: <span class="hljs-string">&quot;electronics&quot;</span>,
        <span class="hljs-attr">brand</span>: <span class="hljs-string">&quot;BrandA&quot;</span>,
        <span class="hljs-attr">in_stock</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">price</span>: <span class="hljs-number">99.99</span>,
        <span class="hljs-attr">string_price</span>: <span class="hljs-string">&quot;99.99&quot;</span>,
        <span class="hljs-attr">tags</span>: [<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>],
        <span class="hljs-attr">supplier</span>: {
          <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;SupplierX&quot;</span>,
          <span class="hljs-attr">country</span>: <span class="hljs-string">&quot;USA&quot;</span>,
          <span class="hljs-attr">contact</span>: {
            <span class="hljs-attr">email</span>: <span class="hljs-string">&quot;support@supplierx.com&quot;</span>,
            <span class="hljs-attr">phone</span>: <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>,
          },
        },
      },
    },
  ],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig { Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span> });
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-comment">// Define a schema with a JSON field</span>
<span class="hljs-keyword">var</span> schema = <span class="hljs-keyword">new</span> CollectionSchema
{
    Fields =
    {
        <span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;pk&quot;</span>, DataType.Int64, isPrimaryKey: <span class="hljs-literal">true</span>, autoId: <span class="hljs-literal">false</span>),
        FieldSchema.CreateFloatVector(<span class="hljs-string">&quot;vec&quot;</span>, dimension: <span class="hljs-number">4</span>),
        <span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;metadata&quot;</span>, DataType.Json) { Nullable = <span class="hljs-literal">true</span> }
    }
};

<span class="hljs-comment">// Minimal vector index so the collection can be loaded</span>
<span class="hljs-keyword">await</span> client.CreateCollectionAsync(<span class="hljs-keyword">new</span> CreateCollectionReq
{
    CollectionName = <span class="hljs-string">&quot;your_collection_name&quot;</span>,
    Schema = schema,
    Indexes = <span class="hljs-keyword">new</span>[]
    {
        <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;vec&quot;</span>, <span class="hljs-string">&quot;vec_index&quot;</span>, IndexType.AutoIndex, MetricType.L2)
    }
});

<span class="hljs-comment">// Insert one row that matches the sample JSON structure above</span>
<span class="hljs-keyword">await</span> client.InsertAsync(<span class="hljs-keyword">new</span> InsertReq
{
    CollectionName = <span class="hljs-string">&quot;your_collection_name&quot;</span>,
    RowsData = <span class="hljs-keyword">new</span>[]
    {
        <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
        {
            [<span class="hljs-string">&quot;pk&quot;</span>] = <span class="hljs-number">1L</span>,
            [<span class="hljs-string">&quot;vec&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span> },
            [<span class="hljs-string">&quot;metadata&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
            {
                [<span class="hljs-string">&quot;category&quot;</span>] = <span class="hljs-string">&quot;electronics&quot;</span>,
                [<span class="hljs-string">&quot;brand&quot;</span>] = <span class="hljs-string">&quot;BrandA&quot;</span>,
                [<span class="hljs-string">&quot;in_stock&quot;</span>] = <span class="hljs-literal">true</span>,
                [<span class="hljs-string">&quot;price&quot;</span>] = <span class="hljs-number">99.99</span>,
                [<span class="hljs-string">&quot;string_price&quot;</span>] = <span class="hljs-string">&quot;99.99&quot;</span>,
                [<span class="hljs-string">&quot;tags&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span> },
                [<span class="hljs-string">&quot;supplier&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
                {
                    [<span class="hljs-string">&quot;name&quot;</span>] = <span class="hljs-string">&quot;SupplierX&quot;</span>,
                    [<span class="hljs-string">&quot;country&quot;</span>] = <span class="hljs-string">&quot;USA&quot;</span>,
                    [<span class="hljs-string">&quot;contact&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
                    {
                        [<span class="hljs-string">&quot;email&quot;</span>] = <span class="hljs-string">&quot;support@supplierx.com&quot;</span>,
                        [<span class="hljs-string">&quot;phone&quot;</span>] = <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
                    }
                }
            }
        }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;your_collection_name&quot;,
    &quot;schema&quot;: {
      &quot;autoID&quot;: false,
      &quot;enableDynamicField&quot;: false,
      &quot;fields&quot;: [
        {&quot;fieldName&quot;: &quot;pk&quot;, &quot;dataType&quot;: &quot;Int64&quot;, &quot;isPrimary&quot;: true},
        {&quot;fieldName&quot;: &quot;vec&quot;, &quot;dataType&quot;: &quot;FloatVector&quot;, &quot;elementTypeParams&quot;: {&quot;dim&quot;: 4}},
        {&quot;fieldName&quot;: &quot;metadata&quot;, &quot;dataType&quot;: &quot;JSON&quot;, &quot;nullable&quot;: true}
      ]
    },
    &quot;indexParams&quot;: [
      {&quot;fieldName&quot;: &quot;vec&quot;, &quot;indexName&quot;: &quot;vec_index&quot;, &quot;indexType&quot;: &quot;AUTOINDEX&quot;, &quot;metricType&quot;: &quot;L2&quot;}
    ]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Подготовьте объект index-params для сбора определений индексов, добавленных в примерах ниже:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">var</span> indexOpts []milvusclient.CreateIndexOption
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">index_params</span> = <span class="hljs-type">Vec</span>::<span class="hljs-title function_ invoke__">new</span>();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::vector&lt;milvus::IndexDesc&gt; index_params;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> indexParams = [];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> indexParams = <span class="hljs-keyword">new</span> List&lt;IndexParam&gt;();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># REST creates one index per request; collect the definitions below</span>
<span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&quot;[]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Добавьте определения, соответствующие вашим данным, в тот же объект `index-params`, а затем <a href="#Apply-the-index">примените индексы</a> одним запросом.</p>
<h3 id="Example-1-Index-a-top-level-key-with-AUTOINDEX" class="common-anchor-header">Пример 1: Индексирование ключа верхнего уровня с помощью AUTOINDEX<button data-href="#Example-1-Index-a-top-level-key-with-AUTOINDEX" class="anchor-icon" translate="no">
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
    </button></h3><p>Проиндексируйте ключ « <code translate="no">metadata[&quot;category&quot;]</code> » с помощью приведения типа « <code translate="no">VARCHAR</code> » и параметра « <code translate="no">AUTOINDEX</code> ». В <a href="#Index-requirements">требованиях к индексированию</a> объясняется, какой режим автоматического выбора используется в вашем развертывании.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,</span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

Map&lt;String, Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>);
extraParams.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;VARCHAR&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;metadata&quot;</span>)
        .indexName(<span class="hljs-string">&quot;category_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

jsonIndex1 := index.NewJSONPathIndex(index.AUTOINDEX, <span class="hljs-string">&quot;varchar&quot;</span>, <span class="hljs-string">`metadata[&quot;category&quot;]`</span>).
    WithIndexName(<span class="hljs-string">&quot;category_index&quot;</span>)
indexOpts = <span class="hljs-built_in">append</span>(indexOpts, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>, jsonIndex1).
    WithIndexName(<span class="hljs-string">&quot;category_index&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

index_params.<span class="hljs-title function_ invoke__">push</span>(
    IndexParam::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;metadata&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;category_index&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::AutoIndex)
        .<span class="hljs-title function_ invoke__">extra_params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([
            (<span class="hljs-string">&quot;json_path&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
            (<span class="hljs-string">&quot;json_cast_type&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;VARCHAR&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
        ])),
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">category_index</span><span class="hljs-params">(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;category_index&quot;</span>, milvus::IndexType::AUTOINDEX)</span></span>;
category_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>);
category_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;VARCHAR&quot;</span>);
index_params.<span class="hljs-built_in">push_back</span>(std::<span class="hljs-built_in">move</span>(category_index));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">indexParams.<span class="hljs-title function_">push</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;your_collection_name&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;metadata&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;category_index&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
  <span class="hljs-attr">extra_params</span>: {
    <span class="hljs-attr">json_path</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>,
    <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,
  },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

indexParams.Add(<span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;category_index&quot;</span>, IndexType.AutoIndex)
{
    ExtraParams =
    {
        [<span class="hljs-string">&quot;json_path&quot;</span>] = <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>,
        [<span class="hljs-string">&quot;json_cast_type&quot;</span>] = <span class="hljs-string">&quot;VARCHAR&quot;</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> categoryIndex=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;metadata&quot;,
  &quot;indexName&quot;: &quot;category_index&quot;,
  &quot;params&quot;: {
    &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
    &quot;json_path&quot;: &quot;metadata[\\\&quot;category\\\&quot;]&quot;,
    &quot;json_cast_type&quot;: &quot;VARCHAR&quot;
  }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Index-a-nested-key" class="common-anchor-header">Пример 2: Индексирование вложенного ключа<button data-href="#Example-2-Index-a-nested-key" class="anchor-icon" translate="no">
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
    </button></h3><p>Индексируйте глубоко вложенное поле <code translate="no">email</code> для поиска контактов поставщиков. Параметр <code translate="no">json_path</code> допускает использование скобочной нотации любой глубины.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;email_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;][&quot;contact&quot;][&quot;email&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,</span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

Map&lt;String, Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;supplier\&quot;][\&quot;contact\&quot;][\&quot;email\&quot;]&quot;</span>);
extraParams.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;VARCHAR&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;metadata&quot;</span>)
        .indexName(<span class="hljs-string">&quot;email_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

jsonIndex2 := index.NewJSONPathIndex(index.AUTOINDEX, <span class="hljs-string">&quot;varchar&quot;</span>, <span class="hljs-string">`metadata[&quot;supplier&quot;][&quot;contact&quot;][&quot;email&quot;]`</span>).
    WithIndexName(<span class="hljs-string">&quot;email_index&quot;</span>)
indexOpts = <span class="hljs-built_in">append</span>(indexOpts, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>, jsonIndex2).
    WithIndexName(<span class="hljs-string">&quot;email_index&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

index_params.<span class="hljs-title function_ invoke__">push</span>(
    IndexParam::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;metadata&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;email_index&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::AutoIndex)
        .<span class="hljs-title function_ invoke__">extra_params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([
            (<span class="hljs-string">&quot;json_path&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;metadata[\&quot;supplier\&quot;][\&quot;contact\&quot;][\&quot;email\&quot;]&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
            (<span class="hljs-string">&quot;json_cast_type&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;VARCHAR&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
        ])),
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">email_index</span><span class="hljs-params">(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;email_index&quot;</span>, milvus::IndexType::AUTOINDEX)</span></span>;
email_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;supplier\&quot;][\&quot;contact\&quot;][\&quot;email\&quot;]&quot;</span>);
email_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;VARCHAR&quot;</span>);
index_params.<span class="hljs-built_in">push_back</span>(std::<span class="hljs-built_in">move</span>(email_index));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">indexParams.<span class="hljs-title function_">push</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;your_collection_name&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;metadata&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;email_index&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
  <span class="hljs-attr">extra_params</span>: {
    <span class="hljs-attr">json_path</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;][&quot;contact&quot;][&quot;email&quot;]&#x27;</span>,
    <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,
  },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

indexParams.Add(<span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;email_index&quot;</span>, IndexType.AutoIndex)
{
    ExtraParams =
    {
        [<span class="hljs-string">&quot;json_path&quot;</span>] = <span class="hljs-string">&quot;metadata[\&quot;supplier\&quot;][\&quot;contact\&quot;][\&quot;email\&quot;]&quot;</span>,
        [<span class="hljs-string">&quot;json_cast_type&quot;</span>] = <span class="hljs-string">&quot;VARCHAR&quot;</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> emailIndex=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;metadata&quot;,
  &quot;indexName&quot;: &quot;email_index&quot;,
  &quot;params&quot;: {
    &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
    &quot;json_path&quot;: &quot;metadata[\\\&quot;supplier\\\&quot;][\\\&quot;contact\\\&quot;][\\\&quot;email\\\&quot;]&quot;,
    &quot;json_cast_type&quot;: &quot;VARCHAR&quot;
  }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Range-queries-with-STLSORT" class="common-anchor-header">Пример 3: Запросы по диапазону с использованием STL_SORT<button data-href="#Example-3-Range-queries-with-STLSORT" class="anchor-icon" translate="no">
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
    </button></h3><p>После завершения <a href="#Index-requirements">настройки включения</a> индексируйте <code translate="no">metadata[&quot;price&quot;]</code> с приведением типа с помощью <code translate="no">DOUBLE</code> и использованием <a href="/docs/ru/stl-sort.md">STL_SORT</a>.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;price_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;price&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;DOUBLE&quot;</span>,
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

Map&lt;String, Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;price\&quot;]&quot;</span>);
extraParams.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;DOUBLE&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;metadata&quot;</span>)
        .indexName(<span class="hljs-string">&quot;price_index&quot;</span>)
        .indexType(IndexParam.IndexType.STL_SORT)
        .extraParams(extraParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

jsonIndex3 := index.NewJSONPathIndex(index.Sorted, <span class="hljs-string">&quot;double&quot;</span>, <span class="hljs-string">`metadata[&quot;price&quot;]`</span>).
    WithIndexName(<span class="hljs-string">&quot;price_index&quot;</span>)
indexOpts = <span class="hljs-built_in">append</span>(indexOpts, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>, jsonIndex3).
    WithIndexName(<span class="hljs-string">&quot;price_index&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

index_params.<span class="hljs-title function_ invoke__">push</span>(
    IndexParam::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;metadata&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;price_index&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::StlSort)
        .<span class="hljs-title function_ invoke__">extra_params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([
            (<span class="hljs-string">&quot;json_path&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;metadata[\&quot;price\&quot;]&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
            (<span class="hljs-string">&quot;json_cast_type&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;DOUBLE&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
        ])),
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">price_index</span><span class="hljs-params">(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;price_index&quot;</span>, milvus::IndexType::STL_SORT)</span></span>;
price_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;price\&quot;]&quot;</span>);
price_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;DOUBLE&quot;</span>);
index_params.<span class="hljs-built_in">push_back</span>(std::<span class="hljs-built_in">move</span>(price_index));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">indexParams.<span class="hljs-title function_">push</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;your_collection_name&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;metadata&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;price_index&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;STL_SORT&quot;</span>,
  <span class="hljs-attr">extra_params</span>: {
    <span class="hljs-attr">json_path</span>: <span class="hljs-string">&#x27;metadata[&quot;price&quot;]&#x27;</span>,
    <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&quot;DOUBLE&quot;</span>,
  },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

indexParams.Add(<span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;price_index&quot;</span>, IndexType.StlSort)
{
    ExtraParams =
    {
        [<span class="hljs-string">&quot;json_path&quot;</span>] = <span class="hljs-string">&quot;metadata[\&quot;price\&quot;]&quot;</span>,
        [<span class="hljs-string">&quot;json_cast_type&quot;</span>] = <span class="hljs-string">&quot;DOUBLE&quot;</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> priceIndex=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;metadata&quot;,
  &quot;indexName&quot;: &quot;price_index&quot;,
  &quot;params&quot;: {
    &quot;index_type&quot;: &quot;STL_SORT&quot;,
    &quot;json_path&quot;: &quot;metadata[\\\&quot;price\\\&quot;]&quot;,
    &quot;json_cast_type&quot;: &quot;DOUBLE&quot;
  }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Это поддерживает поиск по диапазонам, например <code translate="no">metadata[&quot;price&quot;] &gt; 50 AND metadata[&quot;price&quot;] &lt; 100</code>.</p>
<h3 id="Example-4-Equality-queries-with-BITMAP" class="common-anchor-header">Пример 4: Запросы на равенство с использованием BITMAP<button data-href="#Example-4-Equality-queries-with-BITMAP" class="anchor-icon" translate="no">
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
    </button></h3><p>После завершения <a href="#Index-requirements">настройки включения</a> индексируйте <code translate="no">metadata[&quot;in_stock&quot;]</code> с приведением типа к <code translate="no">BOOL</code> и <a href="/docs/ru/bitmap.md">использованием BITMAP</a>.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;BITMAP&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;in_stock_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;in_stock&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;BOOL&quot;</span>,
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

Map&lt;String, Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;in_stock\&quot;]&quot;</span>);
extraParams.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;BOOL&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;metadata&quot;</span>)
        .indexName(<span class="hljs-string">&quot;in_stock_index&quot;</span>)
        .indexType(IndexParam.IndexType.BITMAP)
        .extraParams(extraParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

jsonIndex4 := index.NewJSONPathIndex(index.BITMAP, <span class="hljs-string">&quot;bool&quot;</span>, <span class="hljs-string">`metadata[&quot;in_stock&quot;]`</span>).
    WithIndexName(<span class="hljs-string">&quot;in_stock_index&quot;</span>)
indexOpts = <span class="hljs-built_in">append</span>(indexOpts, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>, jsonIndex4).
    WithIndexName(<span class="hljs-string">&quot;in_stock_index&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

index_params.<span class="hljs-title function_ invoke__">push</span>(
    IndexParam::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;metadata&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;in_stock_index&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::Bitmap)
        .<span class="hljs-title function_ invoke__">extra_params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([
            (<span class="hljs-string">&quot;json_path&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;metadata[\&quot;in_stock\&quot;]&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
            (<span class="hljs-string">&quot;json_cast_type&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;BOOL&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
        ])),
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">in_stock_index</span><span class="hljs-params">(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;in_stock_index&quot;</span>, milvus::IndexType::BITMAP)</span></span>;
in_stock_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;in_stock\&quot;]&quot;</span>);
in_stock_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;BOOL&quot;</span>);
index_params.<span class="hljs-built_in">push_back</span>(std::<span class="hljs-built_in">move</span>(in_stock_index));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">indexParams.<span class="hljs-title function_">push</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;your_collection_name&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;metadata&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;in_stock_index&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;BITMAP&quot;</span>,
  <span class="hljs-attr">extra_params</span>: {
    <span class="hljs-attr">json_path</span>: <span class="hljs-string">&#x27;metadata[&quot;in_stock&quot;]&#x27;</span>,
    <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&quot;BOOL&quot;</span>,
  },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

indexParams.Add(<span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;in_stock_index&quot;</span>, IndexType.Bitmap)
{
    ExtraParams =
    {
        [<span class="hljs-string">&quot;json_path&quot;</span>] = <span class="hljs-string">&quot;metadata[\&quot;in_stock\&quot;]&quot;</span>,
        [<span class="hljs-string">&quot;json_cast_type&quot;</span>] = <span class="hljs-string">&quot;BOOL&quot;</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> inStockIndex=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;metadata&quot;,
  &quot;indexName&quot;: &quot;in_stock_index&quot;,
  &quot;params&quot;: {
    &quot;index_type&quot;: &quot;BITMAP&quot;,
    &quot;json_path&quot;: &quot;metadata[\\\&quot;in_stock\\\&quot;]&quot;,
    &quot;json_cast_type&quot;: &quot;BOOL&quot;
  }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-5-Convert-data-type-at-index-time" class="common-anchor-header">Пример 5: Преобразование типа данных при индексировании<button data-href="#Example-5-Convert-data-type-at-index-time" class="anchor-icon" translate="no">
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
    </button></h3><p>Если числовые значения хранятся в виде строк, используйте <code translate="no">STRING_TO_DOUBLE</code> с приведением типа к <code translate="no">DOUBLE</code> для их преобразования во время построения индекса.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;string_to_double_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;string_price&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;DOUBLE&quot;</span>,
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;json_cast_function&quot;</span>: <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

Map&lt;String, Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;string_price\&quot;]&quot;</span>);
extraParams.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;DOUBLE&quot;</span>);
extraParams.put(<span class="hljs-string">&quot;json_cast_function&quot;</span>, <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;metadata&quot;</span>)
        .indexName(<span class="hljs-string">&quot;string_to_double_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

jsonIndex5 := index.NewJSONPathIndex(index.AUTOINDEX, <span class="hljs-string">&quot;double&quot;</span>, <span class="hljs-string">`metadata[&quot;string_price&quot;]`</span>).
    WithIndexName(<span class="hljs-string">&quot;string_to_double_index&quot;</span>)
opt5 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>, jsonIndex5).
    WithIndexName(<span class="hljs-string">&quot;string_to_double_index&quot;</span>)
opt5.WithExtraParam(<span class="hljs-string">&quot;json_cast_function&quot;</span>, <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span>)
indexOpts = <span class="hljs-built_in">append</span>(indexOpts, opt5)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

index_params.<span class="hljs-title function_ invoke__">push</span>(
    IndexParam::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;metadata&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;string_to_double_index&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::AutoIndex)
        .<span class="hljs-title function_ invoke__">extra_params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([
            (<span class="hljs-string">&quot;json_path&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;metadata[\&quot;string_price\&quot;]&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
            (<span class="hljs-string">&quot;json_cast_type&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;DOUBLE&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
            (<span class="hljs-string">&quot;json_cast_function&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
        ])),
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">string_to_double_index</span><span class="hljs-params">(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;string_to_double_index&quot;</span>, milvus::IndexType::AUTOINDEX)</span></span>;
string_to_double_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;string_price\&quot;]&quot;</span>);
string_to_double_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;DOUBLE&quot;</span>);
string_to_double_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;json_cast_function&quot;</span>, <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span>);
index_params.<span class="hljs-built_in">push_back</span>(std::<span class="hljs-built_in">move</span>(string_to_double_index));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">indexParams.<span class="hljs-title function_">push</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;your_collection_name&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;metadata&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;string_to_double_index&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
  <span class="hljs-attr">extra_params</span>: {
    <span class="hljs-attr">json_path</span>: <span class="hljs-string">&#x27;metadata[&quot;string_price&quot;]&#x27;</span>,
    <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&quot;DOUBLE&quot;</span>,
    <span class="hljs-attr">json_cast_function</span>: <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span>,
  },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

indexParams.Add(<span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;string_to_double_index&quot;</span>, IndexType.AutoIndex)
{
    ExtraParams =
    {
        [<span class="hljs-string">&quot;json_path&quot;</span>] = <span class="hljs-string">&quot;metadata[\&quot;string_price\&quot;]&quot;</span>,
        [<span class="hljs-string">&quot;json_cast_type&quot;</span>] = <span class="hljs-string">&quot;DOUBLE&quot;</span>,
        [<span class="hljs-string">&quot;json_cast_function&quot;</span>] = <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> stringToDoubleIndex=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;metadata&quot;,
  &quot;indexName&quot;: &quot;string_to_double_index&quot;,
  &quot;params&quot;: {
    &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
    &quot;json_path&quot;: &quot;metadata[\\\&quot;string_price\\\&quot;]&quot;,
    &quot;json_cast_type&quot;: &quot;DOUBLE&quot;,
    &quot;json_cast_function&quot;: &quot;STRING_TO_DOUBLE&quot;
  }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Информацию о преобразовании и поведении при пропуске значений см. в разделе <a href="#Understand-cast-types">«Понимание типов при приведении</a>».</p>
<h3 id="Apply-the-index" class="common-anchor-header">Применение индекса<button data-href="#Apply-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>После добавления всех параметров индекса примените их к коллекции:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;your_collection_name&quot;</span>)
        .indexParams(indexParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;log&quot;</span>

<span class="hljs-keyword">for</span> _, opt := <span class="hljs-keyword">range</span> indexOpts {
    _, err := cli.CreateIndex(ctx, opt)
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatal(err)
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

client.<span class="hljs-title function_ invoke__">create_index</span>(
    CreateIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;your_collection_name&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_params</span>(index_params)
        .<span class="hljs-title function_ invoke__">build</span>()?,
)
.<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(milvus::<span class="hljs-built_in">CreateIndexRequest</span>()
    .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;your_collection_name&quot;</span>)
    .<span class="hljs-built_in">WithIndexes</span>(std::<span class="hljs-built_in">move</span>(index_params))
    .<span class="hljs-built_in">WithSync</span>(<span class="hljs-literal">true</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>(indexParams);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">await</span> client.CreateIndexAsync(<span class="hljs-keyword">new</span> CreateIndexReq
{
    CollectionName = <span class="hljs-string">&quot;your_collection_name&quot;</span>,
    Indexes = indexParams
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&quot;[
  <span class="hljs-variable">$categoryIndex</span>,
  <span class="hljs-variable">$emailIndex</span>,
  <span class="hljs-variable">$priceIndex</span>,
  <span class="hljs-variable">$inStockIndex</span>,
  <span class="hljs-variable">$stringToDoubleIndex</span>,
  <span class="hljs-variable">$metadataFullIndex</span>,
  <span class="hljs-variable">$supplierIndex</span>
]&quot;</span>
curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;your_collection_name\&quot;,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
  }&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>После отправки определений проверьте состояние сборки каждого индекса. Поле « <code translate="no">state</code> » (Статус сборки) отображает « <code translate="no">Finished</code> » (Сборка завершена), когда сборка завершена; « <code translate="no">total_rows</code> » (Сборка в процессе), « <code translate="no">indexed_rows</code> » (Сборка задерживается) и « <code translate="no">pending_index_rows</code> » (Сборка завершена) отображают ход сборки:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.describe_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.DescribeIndexReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.response.DescribeIndexResp;

<span class="hljs-type">DescribeIndexResp</span> <span class="hljs-variable">descResp</span> <span class="hljs-operator">=</span> client.describeIndex(DescribeIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;your_collection_name&quot;</span>)
        .indexName(<span class="hljs-string">&quot;category_index&quot;</span>)
        .build());
System.out.println(descResp);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

desc, err := cli.DescribeIndex(ctx, milvusclient.NewDescribeIndexOption(<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-string">&quot;category_index&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}
log.Printf(<span class="hljs-string">&quot;state=%s totalRows=%d indexedRows=%d&quot;</span>, desc.State, desc.TotalRows, desc.IndexedRows)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">desc</span> = client
    .<span class="hljs-title function_ invoke__">describe_index</span>(
        DescribeIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;your_collection_name&quot;</span>)
            .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;category_index&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, desc);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

milvus::DescribeIndexRequest describe_req;
describe_req.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;your_collection_name&quot;</span>);
describe_req.<span class="hljs-built_in">WithIndexName</span>(<span class="hljs-string">&quot;category_index&quot;</span>);
milvus::DescribeIndexResponse describe_resp;
status = client-&gt;<span class="hljs-built_in">DescribeIndex</span>(describe_req, describe_resp);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeIndex</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;category_index&quot;</span> });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;

<span class="hljs-keyword">var</span> describeResp = <span class="hljs-keyword">await</span> client.DescribeIndexAsync(<span class="hljs-keyword">new</span> DescribeIndexReq
{
    CollectionName = <span class="hljs-string">&quot;your_collection_name&quot;</span>,
    IndexName = <span class="hljs-string">&quot;category_index&quot;</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/describe&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;your_collection_name&quot;,
    &quot;indexName&quot;: &quot;category_index&quot;
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Пример ответа:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;json_path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;json_cast_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;VARCHAR&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;index_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AUTOINDEX&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;metadata&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;index_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;category_index&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;total_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;indexed_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;pending_index_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;state&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Finished&quot;</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Как только <code translate="no">state</code> сообщит о <code translate="no">Finished</code>, индекс станет доступен для запросов с совместимыми фильтрами.</p>
<p>Для записей <code translate="no">AUTOINDEX</code> поле <code translate="no">index_type</code> в этом ответе возвращается как <code translate="no">AUTOINDEX</code>. Ответ не указывает структуру базового индекса. Правила выбора см. в разделе <a href="/docs/ru/scalar_index.md#AUTOINDEX-behavior">«Поведение AUTOINDEX»</a>; <a href="#Index-requirements">требования к пути и преобразованию</a> по-прежнему действуют.</p>
<p><a id="FAQ"></a></p>
<p><details id="How-do-I-tune-AUTOINDEXs-BITMAP-vs-STLSORT-threshold">
<summary><strong>Для опытных пользователей: настройка автоматического выбора для пути JSON</strong></summary></p>
<p>В этом примере изменяется порог кардинальности для <code translate="no">metadata[&quot;category&quot;]</code>. Требуется <code translate="no">AUTOINDEX</code> на основе кардинальности; перед использованием проверьте <a href="#Index-requirements">требования к индексу</a>. Информацию о диапазоне параметров, вариантах структуры и поведении явного индекса см. в разделе <a href="/docs/ru/scalar_index.md#Cardinality-threshold">«Порог кардинальности</a>»:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;bitmap_cardinality_limit&quot;</span>: <span class="hljs-number">200</span>,  <span class="hljs-comment"># use BITMAP for fewer than 200 distinct values</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

Map&lt;String, Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>);
extraParams.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;VARCHAR&quot;</span>);
extraParams.put(<span class="hljs-string">&quot;bitmap_cardinality_limit&quot;</span>, <span class="hljs-number">200</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;metadata&quot;</span>)
        .indexName(<span class="hljs-string">&quot;category_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

jsonIndex8 := index.NewJSONPathIndex(index.AUTOINDEX, <span class="hljs-string">&quot;varchar&quot;</span>, <span class="hljs-string">`metadata[&quot;category&quot;]`</span>).
    WithIndexName(<span class="hljs-string">&quot;category_index&quot;</span>)
opt8 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>, jsonIndex8).
    WithIndexName(<span class="hljs-string">&quot;category_index&quot;</span>)
opt8.WithExtraParam(<span class="hljs-string">&quot;bitmap_cardinality_limit&quot;</span>, <span class="hljs-string">&quot;200&quot;</span>)
indexOpts = <span class="hljs-built_in">append</span>(indexOpts, opt8)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

index_params.<span class="hljs-title function_ invoke__">push</span>(
    IndexParam::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;metadata&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;category_index&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::AutoIndex)
        .<span class="hljs-title function_ invoke__">extra_params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([
            (<span class="hljs-string">&quot;json_path&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
            (<span class="hljs-string">&quot;json_cast_type&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;VARCHAR&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
            (<span class="hljs-string">&quot;bitmap_cardinality_limit&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;200&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
        ])),
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">category_limit_index</span><span class="hljs-params">(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;category_index&quot;</span>, milvus::IndexType::AUTOINDEX)</span></span>;
category_limit_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>);
category_limit_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;VARCHAR&quot;</span>);
category_limit_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;bitmap_cardinality_limit&quot;</span>, <span class="hljs-string">&quot;200&quot;</span>);
index_params.<span class="hljs-built_in">push_back</span>(std::<span class="hljs-built_in">move</span>(category_limit_index));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">indexParams.<span class="hljs-title function_">push</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;your_collection_name&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;metadata&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;category_index&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
  <span class="hljs-attr">extra_params</span>: {
    <span class="hljs-attr">json_path</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>,
    <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,
    <span class="hljs-attr">bitmap_cardinality_limit</span>: <span class="hljs-number">200</span>,
  },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

indexParams.Add(<span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;category_index&quot;</span>, IndexType.AutoIndex)
{
    ExtraParams =
    {
        [<span class="hljs-string">&quot;json_path&quot;</span>] = <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>,
        [<span class="hljs-string">&quot;json_cast_type&quot;</span>] = <span class="hljs-string">&quot;VARCHAR&quot;</span>,
        [<span class="hljs-string">&quot;bitmap_cardinality_limit&quot;</span>] = <span class="hljs-string">&quot;200&quot;</span> <span class="hljs-comment">// use BITMAP for fewer than 200 distinct values</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> categoryLimitIndex=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;metadata&quot;,
  &quot;indexName&quot;: &quot;category_index&quot;,
  &quot;params&quot;: {
    &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
    &quot;json_path&quot;: &quot;metadata[\\\&quot;category\\\&quot;]&quot;,
    &quot;json_cast_type&quot;: &quot;VARCHAR&quot;,
    &quot;bitmap_cardinality_limit&quot;: 200
  }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Примените это определение вместо Примера 1, а затем <a href="#Apply-the-index">примените индекс</a>.</p>
<p></details></p>
