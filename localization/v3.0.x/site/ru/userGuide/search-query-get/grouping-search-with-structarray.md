---
id: grouping-search-with-structarray.md
title: Группировка результатов поиска с помощью StructArray
summary: >-
  Используйте эту страницу для группировки результатов поиска на уровне
  элементов StructArray по родительскому объекту. Поиск на уровне элементов
  может возвращать несколько результатов из одного и того же объекта, если
  несколько элементов Struct соответствуют запросу. Группировка сворачивает эти
  результаты на уровне элементов, так что каждый родительский объект
  отображается не более одного раза.
---
<h1 id="Grouping-Search-with-StructArray" class="common-anchor-header">Группировка результатов поиска с помощью StructArray<button data-href="#Grouping-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Используйте эту страницу для группировки результатов поиска на уровне элементов StructArray по родительскому объекту. Поиск на уровне элементов может возвращать несколько результатов из одного и того же объекта, если несколько элементов Struct соответствуют запросу. Группировка сворачивает эти результаты на уровне элементов, так что каждый родительский объект отображается не более одного раза.</p>
<p>На этой странице используется коллекция « <code translate="no">tech_articles</code> » из раздела <a href="/docs/ru/create-structarray-field.md">«Создание поля StructArray</a>». В коллекции имеется поле StructArray с именем « <code translate="no">chunks</code> ». Поле вектора « <code translate="no">chunks[emb]</code> » индексировано для поиска на уровне элементов с использованием стандартной векторной метрики.</p>
<h2 id="How-grouping-applies-to-StructArray" class="common-anchor-header">Как группировка применяется к StructArray<button data-href="#How-grouping-applies-to-StructArray" class="anchor-icon" translate="no">
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
<tr><th>Режим поиска</th><th>Поведение группировки</th><th>Поведение результатов</th></tr>
</thead>
<tbody>
<tr><td>Поиск в EmbeddingList</td><td>Не поддерживается.</td><td>Не применимо.</td></tr>
<tr><td>Поиск на уровне элементов</td><td>Поддерживается путем группировки по первичному ключу.</td><td>Возвращается не более одного результата на каждую родительскую сущность. Метаданные на уровне элементов сохраняются, поэтому индекс или смещение выбранного элемента могут быть возвращены при предоставлении доступа через API или SDK.</td></tr>
<tr><td>Гибридный поиск</td><td>Поддерживается только в том случае, если все подзапросы нацелены на векторные поля на уровне элементов в рамках одного и того же поля StructArray.</td><td>Подзапросы на уровне элементов группируются по первичному ключу перед обработкой окончательного результата.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Используйте группировку, если поиск на уровне элементов без группировки возвращает слишком много дубликатов родительских сущностей. Если вы хотите, чтобы каждый совпадающий элемент Struct рассматривался как отдельный результат, используйте <a href="/docs/ru/basic-vector-search-with-structarray.md">базовый векторный поиск с StructArray</a> без параметра ` <code translate="no">group_by_field</code>`.</p>
</div>
<h2 id="Before-you-begin" class="common-anchor-header">Прежде чем начать<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Перед запуском группированного поиска подготовьте коллекцию, данные и индексы.</p>
<table>
<thead>
<tr><th>Требования</th><th>Подробности</th></tr>
</thead>
<tbody>
<tr><td>Векторное подполе на уровне элементов</td><td>Используйте подполе вектора StructArray, например <code translate="no">chunks[emb]</code>, индексированное с помощью обычной векторной метрики.</td></tr>
<tr><td>Обычный векторный запрос</td><td>Используйте вектор обычного запроса, а не <code translate="no">EmbeddingList</code>.</td></tr>
<tr><td>Группировка по первичному ключу</td><td>Используйте первичный ключ коллекции в виде <code translate="no">group_by_field</code>, например <code translate="no">doc_id</code>.</td></tr>
<tr><td>Отсутствие параметров диапазона</td><td>Не сочетайте поиск с группировкой с параметрами поиска по диапазону, такими как <code translate="no">radius</code> или <code translate="no">range_filter</code>.</td></tr>
</tbody>
</table>
<p>Информацию о настройке индекса см. в разделе <a href="/docs/ru/index-structarray-fields.md">«Поля StructArray индекса</a>».</p>
<h2 id="Run-grouped-element-level-search" class="common-anchor-header">Выполнение группированного поиска на уровне элементов<button data-href="#Run-grouped-element-level-search" class="anchor-icon" translate="no">
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
    </button></h2><p>В приведенном ниже примере сначала выполняется поиск по отдельным фрагментам, а затем найденные элементы группируются по первичному ключу родительского объекта.</p>
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
    limit=<span class="hljs-number">5</span>,
    group_by_field=<span class="hljs-string">&quot;doc_id&quot;</span>,
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
<p>Без группировки один и тот же <code translate="no">doc_id</code> может появиться несколько раз, если запросу соответствуют несколько фрагментов. При использовании <code translate="no">group_by_field=&quot;doc_id&quot;</code> каждая родительская сущность появляется не более одного раза. Группировка сохраняет метаданные на уровне элементов, поэтому сгруппированный результат по-прежнему может включать выбранный индекс или смещение элемента Struct, если API или SDK предоставляют эту информацию.</p>
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
    </button></h2><p>Вы можете комбинировать поиск с группировкой со скалярной фильтрацией StructArray. Используйте « <code translate="no">element_filter</code> », когда скалярное условие должно ограничивать, какие элементы Struct участвуют в векторном поиске на уровне элементов.</p>
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
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">5</span>,
    group_by_field=<span class="hljs-string">&quot;doc_id&quot;</span>,
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
<p>Предикат верхнего уровня выбирает кандидатов-сущностей. Предикат ` <code translate="no">element_filter</code> ` ограничивает векторный поиск на уровне элементов только соответствующими элементами Struct. Затем группировка сворачивает совпадающие элементы по первичному ключу.</p>
<h2 id="Use-grouping-in-hybrid-search" class="common-anchor-header">Использование группировки в гибридном поиске<button data-href="#Use-grouping-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Гибридная группировка с StructArray является функцией на уровне элементов. Она поддерживается только в том случае, если все подпоиски нацелены на векторные поля на уровне элементов в рамках одного и того же поля StructArray. Не используйте запросы на уровне EmbeddingList в гибридном поиске по StructArray с группировкой.</p>
<p>В следующем примере предполагается, что поле StructArray « <code translate="no">chunks</code> » имеет два подполя векторного типа на уровне элементов: « <code translate="no">chunks[emb]</code> » и « <code translate="no">chunks[code_emb]</code> », и оба индексируются с помощью обычных векторных метрик.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest, RRFRanker

index_chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
)

code_chunk_req = AnnSearchRequest(
    data=[code_query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[code_emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[has_code] == true)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[index_chunk_req, code_chunk_req],
    ranker=RRFRanker(),
    limit=<span class="hljs-number">5</span>,
    group_by_field=<span class="hljs-string">&quot;doc_id&quot;</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>В данном примере оба подзапроса нацелены на векторные поля на уровне элементов в рамках одного и того же поля StructArray — <code translate="no">chunks</code>. Гибридный поиск не поддерживает группировку на уровне элементов, если в запросе смешаны обычные векторные поля, разные поля StructArray или запросы на уровне EmbeddingList.</p>
<h2 id="Interpret-grouped-results" class="common-anchor-header">Интерпретация сгруппированных результатов<button data-href="#Interpret-grouped-results" class="anchor-icon" translate="no">
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
<tr><td><code translate="no">id</code></td><td>Первичный ключ сгруппированной родительской сущности.</td></tr>
<tr><td><code translate="no">distance</code> или оценка</td><td>Оценка или расстояние выбранного элемента Struct для данной родительской сущности.</td></tr>
<tr><td><code translate="no">offset</code></td><td>Позиция выбранного элемента Struct с нулевой базой при возвращении.</td></tr>
<tr><td>Повторяющиеся первичные ключи</td><td>Не ожидаются при группировке по первичному ключу.</td></tr>
<tr><td><code translate="no">limit</code></td><td>Применимо к сгруппированным результатам родительских сущностей.</td></tr>
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
<li><p>Поиск с группировкой применяется только к векторному поиску StructArray на уровне элементов. Поиск EmbeddingList и гибридный поиск на уровне EmbeddingList не поддерживают группировку.</p></li>
<li><p>Используйте первичный ключ в виде <code translate="no">group_by_field</code>. Группировка на уровне элементов StructArray не является универсальной группировкой по произвольным скалярным полям.</p></li>
<li><p>Не сочетайте поиск с группировкой с поиском по диапазону.</p></li>
<li><p>Не используйте запрос « <code translate="no">EmbeddingList</code> » или метрику « <code translate="no">MAX_SIM*</code> » для группированного поиска.</p></li>
<li><p>Гибридная группировка поддерживается только в том случае, если все подзапросы нацелены на векторные поля на уровне элементов в рамках одного и того же поля StructArray.</p></li>
<li><p>Гибридная группировка не поддерживается, если гибридный поиск сочетает обычное векторное поле, другое поле StructArray или запрос на уровне EmbeddingList.</p></li>
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
<li><p>Использование группировки с <code translate="no">chunks[emb_list_vector]</code>, которая предназначена для поиска по EmbeddingList.</p></li>
<li><p>Группировка по скалярному полю, не являющемуся первичным ключом.</p></li>
<li><p>Группировка по нескольким полям. Группировка StructArray на уровне элементов поддерживает только группировку по первичному ключу.</p></li>
<li><p>Ожидание того, что сгруппированные результаты будут представлять каждый найденный элемент Struct. Группировка возвращает не более одного результата на каждую родительскую сущность.</p></li>
<li><p>Предположение, что группированный поиск на уровне элементов пересчитывает оценку <code translate="no">MAX_SIM*</code> в стиле EmbeddingList. Группировка сворачивает совпадения на уровне элементов; она не изменяет модель оценки.</p></li>
<li><p>Объединение <code translate="no">group_by_field</code> с <code translate="no">radius</code> или <code translate="no">range_filter</code>.</p></li>
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
<li><p>Чтобы сначала изучить поиск на уровне элементов без группировки, ознакомьтесь с разделом <a href="/docs/ru/basic-vector-search-with-structarray.md">«Базовый векторный поиск с использованием StructArray</a>».</p></li>
<li><p>Чтобы добавить скалярные фильтры к группированному поиску, ознакомьтесь с разделом <a href="/docs/ru/filtered-search-with-structarray.md">«Фильтрованный поиск с StructArray</a>».</p></li>
<li><p>Чтобы использовать границы оценки или расстояния вместо группировки, ознакомьтесь с разделом <a href="/docs/ru/range-search-with-structarray.md">«Поиск по диапазону с использованием StructArray</a>».</p></li>
<li><p>Чтобы ознакомиться с ограничениями поиска с использованием StructArray, прочтите раздел <a href="/docs/ru/structarray-limits.md">«Ограничения StructArray</a>».</p></li>
</ol>
