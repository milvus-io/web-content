---
id: range-search-with-structarray.md
title: Поиск по диапазону с использованием StructArray
summary: >-
  Используйте эту страницу для выполнения поиска по диапазону в подполях вектора
  StructArray. Поиск по диапазону возвращает векторные совпадения, оценка или
  расстояние которых находятся в пределах указанного диапазона. Для полей
  StructArray используйте поиск по диапазону в сочетании с векторным поиском на
  уровне элементов, при котором каждый элемент Struct просматривается
  независимо.
---
<h1 id="Range-Search-with-StructArray" class="common-anchor-header">Поиск по диапазону с использованием StructArray<button data-href="#Range-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Используйте эту страницу для выполнения поиска по диапазону в подполях вектора StructArray. Поиск по диапазону возвращает векторные совпадения, оценка или расстояние которых находятся в пределах указанного диапазона. Для полей StructArray используйте поиск по диапазону с векторным поиском на уровне элементов, при котором каждый элемент Struct просматривается независимо.</p>
<p>На этой странице используется коллекция « <code translate="no">tech_articles</code> » из <a href="/docs/ru/create-structarray-field.md">раздела «Создание поля StructArray</a>». В коллекции имеется поле StructArray с именем « <code translate="no">chunks</code> ». Подполе вектора « <code translate="no">chunks[emb]</code> » индексировано для поиска на уровне элементов с использованием стандартной векторной метрики, такой как « <code translate="no">COSINE</code> », « <code translate="no">IP</code> » или « <code translate="no">L2</code> ».</p>
<h2 id="How-range-search-applies-to-StructArray" class="common-anchor-header">Как поиск по диапазону применяется к StructArray<button data-href="#How-range-search-applies-to-StructArray" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Режим поиска</th><th>Поведение поиска по диапазону</th><th>Детализация результатов</th></tr>
</thead>
<tbody>
<tr><td>Поиск по EmbeddingList</td><td>Не поддерживается.</td><td>Не применимо.</td></tr>
<tr><td>Поиск на уровне элементов</td><td>Используйте обычный векторный запрос с параметром « <code translate="no">radius</code> » и, при необходимости, « <code translate="no">range_filter</code> ».</td><td>Уровень элементов структуры.</td></tr>
<tr><td>Гибридный поиск</td><td>Поддерживается, если запрос StructArray направлен на векторное поле на уровне элементов. Запросы на уровне EmbeddingList не поддерживают поиск по диапазону.</td><td>Внутренний поиск на уровне элементов, затем гибридное переранжирование.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Если вам нужны только ближайшие элементы Struct, начните с <a href="/docs/ru/basic-vector-search-with-structarray.md">базового векторного поиска с StructArray</a>. Используйте поиск по диапазону, когда результат должен удовлетворять границе оценки или расстояния, а не только рейтингу top-K.</p>
</div>
<h2 id="Before-you-begin" class="common-anchor-header">Перед началом<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Перед запуском поиска по диапазону подготовьте коллекцию, данные и индексы.</p>
<table>
<thead>
<tr><th>Требования</th><th>Подробности</th></tr>
</thead>
<tbody>
<tr><td>Поле StructArray</td><td>Коллекция содержит поле StructArray, например <code translate="no">chunks</code>.</td></tr>
<tr><td>Подполе вектора на уровне элементов</td><td>Целевым подполем вектора является <code translate="no">chunks[emb]</code>, а не <code translate="no">chunks[emb_list_vector]</code>.</td></tr>
<tr><td>Метрика индексации</td><td>Векторное подполе индексируется с помощью обычной векторной метрики, например <code translate="no">COSINE</code>, <code translate="no">IP</code> или <code translate="no">L2</code>.</td></tr>
<tr><td>Данные запроса</td><td>Запрос представляет собой обычный вектор, а не <code translate="no">EmbeddingList</code>.</td></tr>
</tbody>
</table>
<p>Информацию о настройке индекса см. в разделе <a href="/docs/ru/index-structarray-fields.md">«Индексирование полей StructArray</a>».</p>
<h2 id="Use-radius-and-rangefilter" class="common-anchor-header">Используйте параметры radius и range_filter<button data-href="#Use-radius-and-rangefilter" class="anchor-icon" translate="no">
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
    </button></h2><p>Установите параметр « <code translate="no">radius</code> », чтобы определить границы поиска. Установите параметр « <code translate="no">range_filter</code> », если вам также требуется внутренняя граница. Выбор направления зависит от того, что является более предпочтительным: меньшее расстояние или более высокий показатель схожести.</p>
<table>
<thead>
<tr><th>Тип метрики</th><th>Чем выше оценка, тем лучше?</th><th>Условие диапазона при использовании параметра « <code translate="no">range_filter</code> »</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">L2</code></td><td>Нет. Чем меньше расстояние, тем лучше.</td><td><code translate="no">range_filter &lt;= distance &lt; radius</code></td></tr>
<tr><td><code translate="no">IP</code>, <code translate="no">COSINE</code></td><td>Да. Чем выше оценка, тем лучше.</td><td><code translate="no">radius &lt; distance &lt;= range_filter</code></td></tr>
</tbody>
</table>
<p>Если задан только параметр « <code translate="no">radius</code> », поиск по диапазону возвращает результаты, удовлетворяющие внешней границе метрики. Выбирайте значения в соответствии со шкалой оценок или расстояний ваших вложений.</p>
<h2 id="Run-element-level-range-search" class="common-anchor-header">Выполнение поиска по диапазону на уровне элементов<button data-href="#Run-element-level-range-search" class="anchor-icon" translate="no">
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
    </button></h2><p>В следующем примере выполняется поиск отдельных фрагментов, векторы <code translate="no">chunks[emb]</code> которых достаточно схожи с вектором запроса. Каждое совпадение представляет собой соответствующий элемент Struct.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    search_params={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.80</span>,
            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.95</span>,
        },
    },
    limit=<span class="hljs-number">10</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[page]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(
            <span class="hljs-string">&quot;doc_id:&quot;</span>, hit[<span class="hljs-string">&quot;id&quot;</span>],
            <span class="hljs-string">&quot;distance:&quot;</span>, hit[<span class="hljs-string">&quot;distance&quot;</span>],
            <span class="hljs-string">&quot;offset:&quot;</span>, hit.get(<span class="hljs-string">&quot;offset&quot;</span>),
            <span class="hljs-string">&quot;entity:&quot;</span>, hit[<span class="hljs-string">&quot;entity&quot;</span>],
        )
<button class="copy-code-btn"></button></code></pre>
<p>В данном примере <code translate="no">COSINE</code> является метрикой типа «похожесть», поэтому диапазон результатов больше <code translate="no">radius</code> и меньше или равен <code translate="no">range_filter</code>. Значение <code translate="no">offset</code> при возвращении идентифицирует совпадающий элемент Struct в массиве <code translate="no">chunks</code>.</p>
<h2 id="Add-scalar-filters" class="common-anchor-header">Добавление скалярных фильтров<button data-href="#Add-scalar-filters" class="anchor-icon" translate="no">
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
    </button></h2><p>Вы можете комбинировать поиск по диапазону на уровне элементов со скалярной фильтрацией StructArray. Используйте предикат верхнего уровня для полей родительского объекта и <code translate="no">element_filter</code>, чтобы ограничить, какие элементы Struct участвуют в векторном поиске по диапазону.</p>
<pre><code translate="no" class="language-python">filter_expr = (
    <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;element_filter(chunks, &#x27;</span>
    <span class="hljs-string">&#x27;$[section] == &quot;index&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;$[quality_score] &gt; 0.9)&#x27;</span>
)

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    search_params={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.80</span>,
            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.95</span>,
        },
    },
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">10</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>Предикат верхнего уровня выбирает сущности-кандидаты. Предикат « <code translate="no">element_filter</code> » ограничивает векторный поиск по диапазону только соответствующими элементами Struct. Дополнительные примеры фильтрации см. в разделе <a href="/docs/ru/filtered-search-with-structarray.md">«Фильтрованный поиск с использованием StructArray</a>».</p>
<h2 id="Use-range-search-in-hybrid-search" class="common-anchor-header">Использование поиска по диапазону в гибридном поиске<button data-href="#Use-range-search-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Векторные поля на уровне элементов StructArray поддерживают поиск по диапазону в гибридном поиске. Добавьте <code translate="no">radius</code> и, при необходимости, <code translate="no">range_filter</code> в запрос <code translate="no">AnnSearchRequest</code>, нацеленный на векторное поле на уровне элементов StructArray.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest, RRFRanker

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    param={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.80</span>,
            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.95</span>,
        },
    },
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    limit=<span class="hljs-number">5</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>В данном примере только подзапрос <code translate="no">chunks[emb]</code> использует параметры поиска по диапазону. Запрос StructArray по-прежнему следует семантике на уровне элементов: границы диапазона применяются к результатам, соответствующим элементам Struct, до того как гибридный поиск объединяет и переранжирует результаты.</p>
<h2 id="Interpret-range-results" class="common-anchor-header">Интерпретация результатов поиска по диапазону<button data-href="#Interpret-range-results" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Элемент результата</th><th>Значение</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">id</code></td><td>Первичный ключ сущности, содержащей найденный элемент Struct.</td></tr>
<tr><td><code translate="no">distance</code> или оценка</td><td>Оценка или расстояние между вектором запроса и вектором сопоставленного элемента Struct.</td></tr>
<tr><td><code translate="no">offset</code></td><td>Позиция найденного элемента Struct в поле StructArray (с нулевой базой) при возвращении.</td></tr>
<tr><td>Повторяющиеся первичные ключи</td><td>Возможны. В пределах указанного диапазона может находиться более одного элемента Struct в одной и той же сущности.</td></tr>
<tr><td><code translate="no">limit</code></td><td>Применимо к совпадениям элементов, а не к уникальным родительским сущностям.</td></tr>
</tbody>
</table>
<h2 id="Limitations" class="common-anchor-header">Ограничения<button data-href="#Limitations" class="anchor-icon" translate="no">
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
<li><p>Не используйте запрос « <code translate="no">EmbeddingList</code> » или метрику « <code translate="no">MAX_SIM*</code> » для поиска по диапазону в подполях вектора StructArray. Поиск на уровне EmbeddingList не поддерживает поиск по диапазону.</p></li>
<li><p>Не сочетайте поиск по диапазону с поиском по группировке. Если вам требуется по одному результату на родительскую сущность, запустите поиск на уровне элементов без параметров диапазона и используйте группировку там, где она поддерживается.</p></li>
<li><p>Гибридный поиск по диапазону поддерживается для векторных полей на уровне элементов StructArray. Он не поддерживается для запросов StructArray на уровне EmbeddingList.</p></li>
</ul>
<h2 id="Common-mistakes" class="common-anchor-header">Распространенные ошибки<button data-href="#Common-mistakes" class="anchor-icon" translate="no">
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
<li><p>Выполнение поиска по диапазону по метрике « <code translate="no">chunks[emb_list_vector]</code> », которая предназначена для поиска на уровне EmbeddingList.</p></li>
<li><p>Использование запроса « <code translate="no">MAX_SIM_COSINE</code> » вместо обычной метрики, такой как « <code translate="no">COSINE</code> », для поиска по диапазону на уровне элементов.</p></li>
<li><p>Использование запроса <code translate="no">EmbeddingList</code> вместо обычного векторного запроса.</p></li>
<li><p>Предположение, что результаты поиска по диапазону будут уникальными для родительского объекта. Поиск по диапазону возвращает совпадающие элементы структуры.</p></li>
<li><p>Использование <code translate="no">chunks.emb</code> вместо требуемого синтаксиса пути к подполю <code translate="no">chunks[emb]</code>.</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">Следующие шаги<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>Чтобы узнать о двух основных режимах векторного поиска StructArray, прочтите раздел <a href="/docs/ru/basic-vector-search-with-structarray.md">«Базовый векторный поиск с StructArray</a>».</p></li>
<li><p>Чтобы добавить скалярные фильтры к поиску по диапазону, ознакомьтесь со статьёй <a href="/docs/ru/filtered-search-with-structarray.md">«Фильтрованный поиск с StructArray</a>».</p></li>
<li><p>Чтобы возвращать не более одного результата на родительский объект там, где это поддерживается, ознакомьтесь со статьёй <a href="/docs/ru/grouping-search-with-structarray.md">«Групповой поиск с StructArray</a>».</p></li>
<li><p>Чтобы ознакомиться с ограничениями поиска для конкретных версий, ознакомьтесь с разделом <a href="/docs/ru/structarray-limits.md">«Ограничения StructArray</a>».</p></li>
</ol>
