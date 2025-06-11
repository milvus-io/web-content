---
id: inverted.md
title: ИНВЕРТИРОВАННЫЙ
summary: >-
  Индекс INVERTED в Milvus предназначен для ускорения запросов к фильтрам как по
  скалярным полям, так и по структурированным полям JSON. Сопоставляя термины с
  документами или записями, которые их содержат, инвертированные индексы
  значительно повышают производительность запросов по сравнению с поиском
  методом "грубой силы".
---
<h1 id="INVERTED" class="common-anchor-header">ИНВЕРТИРОВАННЫЙ<button data-href="#INVERTED" class="anchor-icon" translate="no">
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
    </button></h1><p>Индекс <code translate="no">INVERTED</code> в Milvus предназначен для ускорения запросов к фильтрам как по скалярным полям, так и по структурированным полям JSON. Сопоставляя термины с документами или записями, которые их содержат, инвертированные индексы значительно повышают производительность запросов по сравнению с поиском методом "грубой силы".</p>
<h2 id="Overview" class="common-anchor-header">Обзор<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus, работающий на базе <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, реализует инвертированное индексирование для ускорения запросов к фильтрам, особенно для текстовых данных. Вот как это работает:</p>
<ol>
<li><p><strong>Токенизация данных</strong>: Milvus берет ваши исходные данные - в нашем примере это два предложения:</p>
<ul>
<li><p><strong>"Milvus - это облачная нативная векторная база данных".</strong></p></li>
<li><p><strong>"Milvus очень хорош в производительности".</strong></p></li>
</ul>
<p>и разбивает их на уникальные слова (например, <em>Milvus</em>, <em>is</em>, <em>cloud-native</em>, <em>vector</em>, <em>database</em>, <em>very</em>, <em>good</em>, <em>at</em>, <em>performance</em>).</p></li>
<li><p><strong>Построение словаря терминов</strong>: Эти уникальные слова хранятся в отсортированном списке, называемом словарем <strong>терминов</strong>. Этот словарь позволяет Milvus быстро проверить, существует ли слово, и найти его позицию в индексе.</p></li>
<li><p><strong>Создание инвертированного списка</strong>: Для каждого слова в словаре терминов Milvus ведет <strong>инвертированный список</strong>, показывающий, какие документы содержат это слово. Например, слово <strong>"Milvus"</strong> встречается в обоих предложениях, поэтому его инвертированный список указывает на идентификаторы обоих документов.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/inverted.png" alt="Inverted" class="doc-image" id="inverted" />
   </span> <span class="img-wrapper"> <span>Инвертированный</span>список </span></p>
<p>Поскольку словарь отсортирован, фильтрация по терминам может быть эффективной. Вместо того чтобы сканировать все документы, Milvus просто ищет термин в словаре и извлекает его инвертированный список - это значительно ускоряет поиск и фильтрацию в больших массивах данных.</p>
<h2 id="Index-a-regular-scalar-field" class="common-anchor-header">Индексирование обычного скалярного поля<button data-href="#Index-a-regular-scalar-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Для таких скалярных полей, как <strong>BOOL</strong>, <strong>INT8</strong>, <strong>INT16</strong>, <strong>INT32</strong>, <strong>INT64</strong>, <strong>FLOAT</strong>, <strong>DOUBLE</strong>, <strong>VARCHAR</strong> и <strong>ARRAY</strong>, создание инвертированного индекса не представляет сложности. Используйте метод <code translate="no">create_index()</code> с параметром <code translate="no">index_type</code>, установленным на <code translate="no">&quot;INVERTED&quot;</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
)

index_params = client.create_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;scalar_field_1&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>, <span class="hljs-comment"># Type of index to be created</span>
    index_name=<span class="hljs-string">&quot;inverted_index&quot;</span> <span class="hljs-comment"># Name of the index to be created</span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Specify the collection name</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-a-JSON-field" class="common-anchor-header">Индексирование поля JSON<button data-href="#Index-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus расширяет возможности индексирования на поля JSON, позволяя эффективно фильтровать вложенные или структурированные данные, хранящиеся в одном столбце. В отличие от скалярных полей, при индексировании JSON-поля необходимо указать два дополнительных параметра:</p>
<ul>
<li><p><code translate="no">json_path</code><strong>:</strong>: Указывает вложенный ключ для индексации.</p></li>
<li><p><code translate="no">json_cast_type</code><strong>:</strong> Определяет тип данных (например, <code translate="no">&quot;varchar&quot;</code>, <code translate="no">&quot;double&quot;</code> или <code translate="no">&quot;bool&quot;</code>), к которому будет приведено извлеченное JSON-значение.</p></li>
</ul>
<p>Например, рассмотрим поле JSON с именем <code translate="no">metadata</code> со следующей структурой:</p>
<pre><code translate="no" class="language-plaintext">{
  &quot;metadata&quot;: {
    &quot;product_info&quot;: {
      &quot;category&quot;: &quot;electronics&quot;,
      &quot;brand&quot;: &quot;BrandA&quot;
    },
    &quot;price&quot;: 99.99,
    &quot;in_stock&quot;: true,
    &quot;tags&quot;: [&quot;summer_sale&quot;, &quot;clearance&quot;]
  }
}
<button class="copy-code-btn"></button></code></pre>
<p>Для создания инвертированных индексов по определенным путям JSON можно использовать следующий подход:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

<span class="hljs-comment"># Example 1: Index the &#x27;category&#x27; key inside &#x27;product_info&#x27; as a string.</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,         <span class="hljs-comment"># JSON field name</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,         <span class="hljs-comment"># Specify the inverted index type</span>
    index_name=<span class="hljs-string">&quot;json_index_1&quot;</span>,      <span class="hljs-comment"># Custom name for this JSON index</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;product_info\&quot;][\&quot;category\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the &#x27;category&#x27; key</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>   <span class="hljs-comment"># Cast the value as a string</span>
    }
)

<span class="hljs-comment"># Example 2: Index the &#x27;price&#x27; key as a numeric type (double).</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,         <span class="hljs-comment"># JSON field name</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
    index_name=<span class="hljs-string">&quot;json_index_2&quot;</span>,      <span class="hljs-comment"># Custom name for this JSON index</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;price\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the &#x27;price&#x27; key</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;double&quot;</span>           <span class="hljs-comment"># Cast the value as a double</span>
    }
)

<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Параметр</p></th>
     <th><p>Описание</p></th>
     <th><p>Пример Значение</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">field_name</code></p></td>
     <td><p>Имя JSON-поля в вашей схеме.</p></td>
     <td><p><code translate="no">"metadata"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_type</code></p></td>
     <td><p>Тип индекса для создания; в настоящее время для индексирования путей JSON поддерживается только <code translate="no">INVERTED</code>.</p></td>
     <td><p><code translate="no">"INVERTED"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_name</code></p></td>
     <td><p>(Необязательно) Пользовательское имя индекса. Укажите разные имена, если вы создаете несколько индексов для одного и того же поля JSON.</p></td>
     <td><p><code translate="no">"json_index_1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.json_path</code></p></td>
     <td><p>Указывает, какой путь JSON индексировать. Можно указать вложенные ключи, позиции массива или и то, и другое (например, <code translate="no">metadata["product_info"]["category"]</code> или <code translate="no">metadata["tags"][0]</code>). Если путь отсутствует или элемент массива не существует для определенной строки, эта строка просто пропускается при индексировании, и ошибка не возникает.</p></td>
     <td><p><code translate="no">"metadata[\"product_info\"][\"category\"]"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.json_cast_type</code></p></td>
     <td><p>Тип данных, к которому Milvus будет приводить извлеченные JSON-значения при построении индекса. Допустимые значения:</p>
<ul>
<li><p><code translate="no">"bool"</code> или <code translate="no">"BOOL"</code></p></li>
<li><p><code translate="no">"double"</code> или <code translate="no">"DOUBLE"</code></p></li>
<li><p><code translate="no">"varchar"</code> или <code translate="no">"VARCHAR"</code></p>
<p><strong>Примечание</strong>: Для целочисленных значений Milvus внутренне использует double для индекса. Большие целые числа больше 2^53 теряют точность. Если приведение не удается (из-за несоответствия типов), ошибка не возникает, и значение строки не индексируется.</p></li>
</ul></td>
     <td><p><code translate="no">"varchar"</code></p></td>
   </tr>
</table>
<h2 id="Considerations-on-JSON-indexing" class="common-anchor-header">Соображения по поводу индексирования JSON<button data-href="#Considerations-on-JSON-indexing" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p><strong>Логика фильтрации</strong>:</p>
<ul>
<li><p>Если вы <strong>создаете индекс двойного типа</strong> (<code translate="no">json_cast_type=&quot;double&quot;</code>), только условия фильтра числового типа могут использовать этот индекс. Если фильтр сравнивает двойной индекс с нечисловым условием, Milvus возвращается к поиску методом грубой силы.</p></li>
<li><p>Если вы <strong>создадите индекс типа varchar</strong> (<code translate="no">json_cast_type=&quot;varchar&quot;</code>), только условия фильтра строкового типа могут использовать этот индекс. В противном случае Milvus возвращается к грубой силе.</p></li>
<li><p><strong>Булевое</strong> индексирование ведет себя аналогично varchar-типу.</p></li>
</ul></li>
<li><p><strong>Выражения терминов</strong>:</p>
<ul>
<li>Вы можете использовать <code translate="no">json[&quot;field&quot;] in [value1, value2, …]</code>. Однако индекс работает только для скалярных значений, хранящихся по этому пути. Если <code translate="no">json[&quot;field&quot;]</code> является массивом, запрос возвращается к перебору (индексирование типа массива пока не поддерживается).</li>
</ul></li>
<li><p><strong>Числовая точность</strong>:</p>
<ul>
<li>Внутри Milvus индексирует все числовые поля как двойные. Если числовое значение превышает <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2532^{53}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span></span></span></span> 2 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">53</span></span></span></span></span></span></span></span></span></span></span></span>, оно теряет точность, и запросы на значения, выходящие за пределы диапазона, могут не совпадать.</li>
</ul></li>
<li><p><strong>Целостность данных</strong>:</p>
<ul>
<li>Milvus не разбирает и не преобразует ключи JSON за пределами указанного вами кастинга. Если исходные данные непоследовательны (например, в одних строках хранится строка для ключа <code translate="no">&quot;k&quot;</code>, а в других - число), некоторые строки не будут проиндексированы.</li>
</ul></li>
</ul>
