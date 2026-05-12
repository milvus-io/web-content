---
id: stl-sort.md
title: STL_SORT
summary: >-
  Индекс STL_SORT - это тип индекса, специально разработанный для повышения
  производительности запросов к числовым полям (INT8, INT16 и т. д.), полям
  VARCHAR или полям TIMESTAMPTZ в Milvus путем организации данных в
  отсортированном порядке.
---
<h1 id="STLSORT" class="common-anchor-header">STL_SORT<button data-href="#STLSORT" class="anchor-icon" translate="no">
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
    </button></h1><p>Индекс <code translate="no">STL_SORT</code> - это тип индекса, специально разработанный для повышения производительности запросов к числовым полям (INT8, INT16 и т. д.), полям <code translate="no">VARCHAR</code> или <code translate="no">TIMESTAMPTZ</code> в Milvus путем организации данных в отсортированном порядке.</p>
<p>Используйте индекс <code translate="no">STL_SORT</code>, если вы часто выполняете запросы с:</p>
<ul>
<li><p>Сравнительная фильтрация с помощью операторов <code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code> и <code translate="no">&lt;=</code>.</p></li>
<li><p>Фильтрация диапазонов с помощью операторов <code translate="no">IN</code> и <code translate="no">LIKE</code>.</p></li>
</ul>
<h2 id="Supported-data-types" class="common-anchor-header">Поддерживаемые типы данных<button data-href="#Supported-data-types" class="anchor-icon" translate="no">
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
<li><p>Числовые поля (например, <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>). Подробнее см. в разделе <a href="/docs/ru/number.md">Булевые и числовые</a>.</p></li>
<li><p><code translate="no">VARCHAR</code> поля. Подробнее см. в разделе <a href="/docs/ru/string.md">Строковое поле</a>.</p></li>
<li><p><code translate="no">TIMESTAMPTZ</code> Поля. Дополнительные сведения см. в разделе <a href="/docs/ru/timestamptz-field.md">Поле TIMESTAMPTZ</a>.</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">Как это работает<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus реализует <code translate="no">STL_SORT</code> в два этапа:</p>
<ol>
<li><p><strong>Построение индекса</strong></p>
<ul>
<li><p>Во время индексации Milvus собирает все значения для индексируемого поля.</p></li>
<li><p>Значения сортируются в порядке возрастания с помощью <a href="https://en.cppreference.com/w/cpp/algorithm/sort.html">std::sort</a> из C++ STL.</p></li>
<li><p>Каждое значение сопоставляется с идентификатором сущности, и отсортированный массив сохраняется в качестве индекса.</p></li>
</ul></li>
<li><p><strong>Ускорение запросов</strong></p>
<ul>
<li><p>Во время запроса Milvus использует <strong>бинарный поиск</strong><a href="https://en.cppreference.com/w/cpp/algorithm/lower_bound.html">(std::lower_bound</a> и <a href="https://en.cppreference.com/w/cpp/algorithm/upper_bound.html">std::upper_bound</a>) в отсортированном массиве.</p></li>
<li><p>Для равенства Milvus быстро находит все совпадающие значения.</p></li>
<li><p>Для диапазонов Milvus находит начальную и конечную позиции и возвращает все значения между ними.</p></li>
<li><p>Идентификаторы совпадающих сущностей передаются исполнителю запроса для окончательной сборки результатов.</p></li>
</ul></li>
</ol>
<p>Это снижает сложность запроса с <strong>O(n)</strong> (полное сканирование) до <strong>O(log n + m)</strong>, где <em>m</em> - количество совпадений.</p>
<h2 id="Create-an-STLSORT-index" class="common-anchor-header">Создание индекса STL_SORT<button data-href="#Create-an-STLSORT-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Вы можете создать индекс <code translate="no">STL_SORT</code> на числовом поле или поле <code translate="no">TIMESTAMPTZ</code>. Никаких дополнительных параметров не требуется.</p>
<p>В примере ниже показано, как создать индекс <code translate="no">STL_SORT</code> на поле <code translate="no">TIMESTAMPTZ</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address</span>

<span class="hljs-comment"># Assume you have defined a TIMESTAMPTZ field named &quot;tsz&quot; in your collection schema</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add RTREE index on the &quot;tsz&quot; field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;tsz&quot;</span>,</span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>,   <span class="hljs-comment"># Index for TIMESTAMPTZ</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;tsz_index&quot;</span>,  <span class="hljs-comment"># Optional, name your index</span></span>
<span class="highlighted-comment-line">    params={}                <span class="hljs-comment"># No extra params needed</span></span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;tsz_demo&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Drop-an-index" class="common-anchor-header">Удаление индекса<button data-href="#Drop-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Используйте метод <code translate="no">drop_index()</code> для удаления существующего индекса из коллекции.</p>
<div class="alert note">
</div>
<pre><code translate="no" class="language-python">client.drop_index(
    collection_name=<span class="hljs-string">&quot;tsz_demo&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;tsz_index&quot;</span> <span class="hljs-comment"># Name of the index to drop</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Usage-notes" class="common-anchor-header">Указания по использованию<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>Типы полей:</strong> Работает с числовыми полями и полями <code translate="no">TIMESTAMPTZ</code>. Дополнительные сведения о типах данных см. в разделах <a href="/docs/ru/number.md">Булево и число</a> и <a href="/docs/ru/timestamptz-field.md">Поле TIMESTAMPTZ</a>.</p></li>
<li><p><strong>Параметры:</strong> Параметры индекса не требуются.</p></li>
<li><p><strong>Mmap не поддерживается:</strong> Режим отображения в памяти недоступен для <code translate="no">STL_SORT</code>.</p></li>
</ul>
