---
id: json-indexing.md
title: Индексирование JSON
summary: >-
  Поля JSON обеспечивают гибкий способ хранения структурированных метаданных в
  Milvus. Без индексации запросы к полям JSON требуют полного сканирования
  коллекции, которое становится медленным по мере роста набора данных.
  Индексирование JSON обеспечивает быстрый поиск путем создания индексов внутри
  данных JSON.
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
    </button></h1><p>Поля JSON обеспечивают гибкий способ хранения структурированных метаданных в Milvus. Без индексации запросы к полям JSON требуют полного сканирования коллекции, которое становится медленным по мере роста набора данных. Индексация JSON обеспечивает быстрый поиск путем создания индексов внутри ваших JSON-данных.</p>
<p>Индексирование JSON идеально подходит для:</p>
<ul>
<li><p>Структурированных схем с последовательными, известными ключами</p></li>
<li><p>Запросы на равенство и диапазон по определенным путям JSON</p></li>
<li><p>Сценарии, в которых требуется точный контроль над тем, какие ключи индексируются</p></li>
<li><p>Эффективное ускорение целевых запросов за счет хранения данных</p></li>
</ul>
<div class="alert note">
<p>Для сложных JSON-документов с разнообразными шаблонами запросов рассмотрите альтернативу - <a href="/docs/ru/json-shredding.md">JSON Shredding</a>.</p>
</div>
<h2 id="JSON-indexing-syntax" class="common-anchor-header">Синтаксис индексирования JSON<button data-href="#JSON-indexing-syntax" class="anchor-icon" translate="no">
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
    </button></h2><p>При создании индекса JSON вы указываете:</p>
<ul>
<li><p><strong>Путь JSON</strong>: Точное местоположение данных, которые вы хотите проиндексировать</p></li>
<li><p><strong>Тип приведения данных</strong>: Как интерпретировать и хранить индексируемые значения</p></li>
<li><p><strong>Необязательное преобразование типа</strong>: Преобразование данных во время индексирования, если это необходимо</p></li>
</ul>
<p>Вот синтаксис для индексирования поля JSON:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;&lt;json_field_name&gt;&quot;</span>,  <span class="hljs-comment"># Name of the JSON field</span>
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,  <span class="hljs-comment"># Must be AUTOINDEX or INVERTED</span>
    index_name=<span class="hljs-string">&quot;&lt;unique_index_name&gt;&quot;</span>,  <span class="hljs-comment"># Index name</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;&lt;path_to_json_key&gt;&quot;</span>,  <span class="hljs-comment"># Specific key to be indexed within JSON data</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;&lt;data_type&gt;&quot;</span>,  <span class="hljs-comment"># Data type to use when interpreting and indexing the value</span>
        <span class="hljs-comment"># &quot;json_cast_function&quot;: &quot;&lt;cast_function&gt;&quot;  # Optional: convert key values into a target type at index time</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Параметр</p></th>
     <th><p>Описание</p></th>
     <th><p>Значение / Пример</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">field_name</code></p></td>
     <td><p>Имя вашего JSON-поля в схеме коллекции.</p></td>
     <td><p><code translate="no">"metadata"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_type</code></p></td>
     <td><p>Для индексирования JSON должно быть <code translate="no">"AUTOINDEX"</code> или <code translate="no">"INVERTED"</code>.</p></td>
     <td><p><code translate="no">"AUTOINDEX"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_name</code></p></td>
     <td><p>Уникальный идентификатор для данного индекса.</p></td>
     <td><p><code translate="no">"category_index"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json_path</code></p></td>
     <td><p>Путь к ключу, который вы хотите проиндексировать в вашем JSON-объекте.</p></td>
     <td><ul><li><p>Ключ верхнего уровня: <code translate="no">'metadata["category"]'</code></p></li><li><p>Вложенный ключ: <code translate="no">'metadata["supplier"]["contact"]["email"]'</code></p></li><li><p>Весь JSON-объект: <code translate="no">"metadata"</code></p></li><li><p>Вложенный объект: <code translate="no">'metadata["supplier"]'</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">json_cast_type</code></p></td>
     <td><p>Тип данных, который будет использоваться при интерпретации и индексировании значения. Должен совпадать с фактическим типом данных ключа.</p><p>Список доступных типов приведения см. в разделе <a href="/docs/ru/json-indexing.md#Supported-cast-types">Поддерживаемые типы приведения</a><a href="/docs/ru/json-indexing.md#Supported-cast-types"> ниже</a>.</p></td>
     <td><p><code translate="no">"VARCHAR"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json_cast_function</code></p></td>
     <td><p><strong>(Необязательно)</strong> Преобразование исходных значений ключа в целевой тип во время индексации. Эта настройка требуется только в том случае, если значения ключей хранятся в неправильном формате и вы хотите преобразовать тип данных во время индексирования.</p><p>Список доступных функций приведения приведен <a href="/docs/ru/json-indexing.md#Supported-cast-functions">ниже</a> в разделе <a href="/docs/ru/json-indexing.md#Supported-cast-functions">Поддерживаемые функции приведения</a>.</p></td>
     <td><p><code translate="no">"STRING_TO_DOUBLE"</code></p></td>
   </tr>
</table>
<h3 id="Supported-cast-types" class="common-anchor-header">Поддерживаемые типы приведения<button data-href="#Supported-cast-types" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus поддерживает следующие типы данных для приведения во время индексирования. Эти типы обеспечивают правильную интерпретацию данных для эффективной фильтрации.</p>
<table>
   <tr>
     <th><p>Тип приведения</p></th>
     <th><p>Описание</p></th>
     <th><p>Пример JSON-значения</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">BOOL</code> / <code translate="no">bool</code></p></td>
     <td><p>Используется для индексации булевых значений, позволяя выполнять запросы, фильтрующие по условиям "истина/ложь".</p></td>
     <td><p><code translate="no">true</code>, <code translate="no">false</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">DOUBLE</code> / <code translate="no">double</code></p></td>
     <td><p>Используется для числовых значений, включая целые числа и числа с плавающей точкой. Позволяет фильтровать по диапазонам или равенствам (например, <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">==</code>).</p></td>
     <td><p><code translate="no">42</code>, <code translate="no">99.99</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">VARCHAR</code> / <code translate="no">varchar</code></p></td>
     <td><p>Используется для индексации строковых значений, что характерно для текстовых данных, таких как имена, категории или идентификаторы.</p></td>
     <td><p><code translate="no">"electronics"</code>, <code translate="no">"BrandA"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ARRAY_BOOL</code> / <code translate="no">array_bool</code></p></td>
     <td><p>Используется для индексации массива булевых значений.</p></td>
     <td><p><code translate="no">[true, false, true]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ARRAY_DOUBLE</code> / <code translate="no">array_double</code></p></td>
     <td><p>Используется для индексации массива числовых значений.</p></td>
     <td><p><code translate="no">[1.2, 3.14, 42]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ARRAY_VARCHAR</code> / <code translate="no">array_varchar</code></p></td>
     <td><p>Используется для индексации массива строк, что идеально подходит для списка тегов или ключевых слов.</p></td>
     <td><p><code translate="no">["tag1", "tag2", "tag3"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">JSON</code> / <code translate="no">json</code></p></td>
     <td><p>Целые JSON-объекты или подобъекты с автоматическим определением типа и сглаживанием.</p><p>Индексирование целых JSON-объектов увеличивает размер индекса. Для сценариев с большим количеством ключей рассмотрите вариант <a href="/docs/ru/json-shredding.md">измельчения JSON</a>.</p></td>
     <td><p>Любой объект JSON</p></td>
   </tr>
</table>
<div class="alert note">
<p>Массивы должны содержать элементы одного типа для оптимального индексирования. Дополнительную информацию см. в разделе <a href="/docs/ru/array_data_type.md">Поле массива</a>.</p>
</div>
<h3 id="Supported-cast-functions" class="common-anchor-header">Поддерживаемые функции приведения<button data-href="#Supported-cast-functions" class="anchor-icon" translate="no">
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
    </button></h3><p>Если ключ поля JSON содержит значения в неправильном формате (например, числа, хранящиеся в виде строк), вы можете передать функцию приведения в аргумент <code translate="no">json_cast_function</code>, чтобы преобразовать эти значения во время индексации.</p>
<p>Функции приведения не чувствительны к регистру. Поддерживаются следующие функции:</p>
<table>
   <tr>
     <th><p>Функция приведения</p></th>
     <th><p>Преобразовывает из → в</p></th>
     <th><p>Пример использования</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">STRING_TO_DOUBLE</code> / <code translate="no">string_to_double</code></p></td>
     <td><p>Строка → Число (двойное)</p></td>
     <td><p>Преобразовать <code translate="no">"99.99"</code> в <code translate="no">99.99</code></p></td>
   </tr>
</table>
<div class="alert note">
<p>Если преобразование не удается (например, нечисловая строка), значение пропускается и не индексируется.</p>
</div>
<h2 id="Create-JSON-indexes" class="common-anchor-header">Создание индексов JSON<button data-href="#Create-JSON-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>В этом разделе на практических примерах показано, как создавать индексы для различных типов данных JSON. Во всех примерах используется пример структуры JSON, показанный ниже, и предполагается, что вы уже установили соединение с <strong>MilvusClient</strong> с правильно определенной схемой коллекции.</p>
<h3 id="Sample-JSON-structure" class="common-anchor-header">Образец структуры JSON<button data-href="#Sample-JSON-structure" class="anchor-icon" translate="no">
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
    </button></h3><p>Прежде чем создавать индексы JSON, подготовьте параметры индекса:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index params</span>
index_params = MilvusClient.prepare_index_params()
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-1-Index-a-simple-JSON-key" class="common-anchor-header">Пример 1: Индексирование простого JSON-ключа<button data-href="#Example-1-Index-a-simple-JSON-key" class="anchor-icon" translate="no">
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
    </button></h3><p>Создайте индекс по полю <code translate="no">category</code>, чтобы обеспечить быструю фильтрацию по категориям товаров:</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTED for JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,  <span class="hljs-comment"># Unique index name</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>, <span class="hljs-comment"># Path to the JSON key</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span> <span class="hljs-comment"># Data cast type</span></span>
<span class="highlighted-comment-line">    }</span>
)
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
    </button></h3><p>Создайте индекс на глубоко вложенном поле <code translate="no">email</code> для поиска контактов поставщиков:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Index the nested key</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTED for JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;email_index&quot;</span>, <span class="hljs-comment"># Unique index name</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;][&quot;contact&quot;][&quot;email&quot;]&#x27;</span>, <span class="hljs-comment"># Path to the nested JSON key</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span> <span class="hljs-comment"># Data cast type</span></span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Convert-data-type-at-index-time" class="common-anchor-header">Пример 3: Преобразование типа данных во время индексирования<button data-href="#Example-3-Convert-data-type-at-index-time" class="anchor-icon" translate="no">
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
    </button></h3><p>Иногда числовые данные ошибочно хранятся как строки. Используйте функцию <code translate="no">STRING_TO_DOUBLE</code> cast, чтобы правильно преобразовать и проиндексировать их:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Convert string numbers to double for indexing</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTED for JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;string_to_double_index&quot;</span>, <span class="hljs-comment"># Unique index name</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;string_price&quot;]&#x27;</span>, <span class="hljs-comment"># Path to the JSON key to be indexed</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;double&quot;</span>, <span class="hljs-comment"># Data cast type</span>
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;json_cast_function&quot;</span>: <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span> <span class="hljs-comment"># Cast function; case insensitive</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Важно</strong>: Если преобразование не удается для какого-либо документа (например, нечисловой строки, такой как <code translate="no">&quot;invalid&quot;</code>), значение этого документа будет исключено из индекса и не появится в отфильтрованных результатах.</p>
<h3 id="Example-4-Index-entire-objects" class="common-anchor-header">Пример 4: Индексирование целых объектов<button data-href="#Example-4-Index-entire-objects" class="anchor-icon" translate="no">
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
    </button></h3><p>Индексирование всего JSON-объекта позволяет выполнять запросы по любому его полю. Когда вы используете <code translate="no">json_cast_type=&quot;JSON&quot;</code>, система автоматически:</p>
<ul>
<li><p><strong>Сплющивает структуру JSON</strong>: Вложенные объекты преобразуются в плоские пути для эффективного индексирования</p></li>
<li><p><strong>Определяет типы данных</strong>: Каждое значение автоматически классифицируется как числовое, строковое, булево или дата на основе его содержимого.</p></li>
<li><p><strong>Создает всестороннее покрытие</strong>: Все ключи и вложенные пути внутри объекта становятся доступными для поиска</p></li>
</ul>
<p>Для <a href="/docs/ru/json-indexing.md#Sample-JSON-structure">примера структуры JSON</a>, приведенного выше, проиндексируйте весь объект <code translate="no">metadata</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Index the entire JSON object</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;metadata_full_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Можно также проиндексировать только часть структуры JSON, например всю информацию <code translate="no">supplier</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Index a sub-object</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, 
    index_name=<span class="hljs-string">&quot;supplier_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-index-configuration" class="common-anchor-header">Применение конфигурации индекса<button data-href="#Apply-index-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>Определив все параметры индекса, примените их к коллекции:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Apply all index configurations to the collection</span>
MilvusClient.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>После завершения индексирования ваши запросы к полям JSON будут автоматически использовать эти индексы для повышения производительности.</p>
<h2 id="FAQ" class="common-anchor-header">ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="common-anchor-header">Что произойдет, если в выражении фильтра запроса используется тип, отличный от типа индексируемого каста?<button data-href="#What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="anchor-icon" translate="no">
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
    </button></h3><p>Если в выражении фильтра используется тип, отличный от типа индекса <code translate="no">json_cast_type</code>, Milvus не будет использовать индекс и может вернуться к более медленному грубому сканированию, если позволяют данные. Для достижения наилучшей производительности всегда согласовывайте выражение фильтра с типом индекса. Например, если числовой индекс создан с помощью <code translate="no">json_cast_type=&quot;double&quot;</code>, только числовые условия фильтра будут использовать индекс.</p>
<h3 id="When-creating-a-JSON-index-what-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="common-anchor-header">При создании индекса JSON что делать, если ключ JSON имеет несогласованные типы данных в разных сущностях?<button data-href="#When-creating-a-JSON-index-what-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="anchor-icon" translate="no">
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
    </button></h3><p>Несогласованные типы могут привести к <strong>частичному индексированию</strong>. Например, если поле <code translate="no">metadata[&quot;price&quot;]</code> хранится в виде числа (<code translate="no">99.99</code>) и строки (<code translate="no">&quot;99.99&quot;</code>) и вы создаете индекс с <code translate="no">json_cast_type=&quot;double&quot;</code>, то будут проиндексированы только числовые значения. Записи в строковой форме будут пропущены и не появятся в результатах фильтрации.</p>
<h3 id="Can-I-create-multiple-indexes-on-the-same-JSON-key" class="common-anchor-header">Можно ли создать несколько индексов для одного и того же ключа JSON?<button data-href="#Can-I-create-multiple-indexes-on-the-same-JSON-key" class="anchor-icon" translate="no">
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
    </button></h3><p>Нет, каждый JSON-ключ поддерживает только один индекс. Вы должны выбрать один <code translate="no">json_cast_type</code>, который соответствует вашим данным. Однако вы можете создать индекс для всего объекта JSON и индекс для вложенного ключа внутри этого объекта.</p>
<h3 id="Does-a-JSON-field-support-setting-a-default-value" class="common-anchor-header">Поддерживает ли поле JSON установку значения по умолчанию?<button data-href="#Does-a-JSON-field-support-setting-a-default-value" class="anchor-icon" translate="no">
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
    </button></h3><p>Нет, поля JSON не поддерживают значения по умолчанию. Однако при определении поля можно задать значение <code translate="no">nullable=True</code>, чтобы разрешить пустые записи. Дополнительные сведения см. в разделе <a href="/docs/ru/nullable-and-default.md">Nullable &amp; Default</a>.</p>
