---
id: hybrid-search-with-structarray.md
title: Гибридный поиск с использованием StructArray
summary: >-
  Используйте эту страницу, чтобы объединить векторный поиск StructArray с
  другими видами векторного поиска в один гибридный поисковый запрос. Гибридный
  поиск StructArray может выдавать результаты как на уровне сущностей, так и на
  уровне элементов, в зависимости от объектов AnnSearchRequest, которые вы
  объединяете.
---
<h1 id="Hybrid-Search-with-StructArray" class="common-anchor-header">Гибридный поиск с использованием StructArray<button data-href="#Hybrid-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Используйте эту страницу, чтобы объединить векторный поиск StructArray с другими видами векторного поиска в одном гибридном запросе. Гибридный поиск StructArray может выдавать результаты как на уровне сущностей, так и на уровне элементов, в зависимости от объектов коллекции « <code translate="no">AnnSearchRequest</code> », которые вы объединяете.</p>
<p>На этой странице используется коллекция <code translate="no">tech_articles</code> из раздела <a href="/docs/ru/create-structarray-field.md">«Создание поля StructArray</a>». Коллекция содержит векторное поле верхнего уровня с именем <code translate="no">title_vector</code> и поле StructArray с именем <code translate="no">chunks</code>. Поле <code translate="no">chunks[emb_list_vector]</code> индексируется для поиска по EmbeddingList, а поле <code translate="no">chunks[emb]</code> — для поиска на уровне элементов.</p>
<h2 id="How-hybrid-search-applies-to-StructArray" class="common-anchor-header">Как гибридный поиск применяется к StructArray<button data-href="#How-hybrid-search-applies-to-StructArray" class="anchor-icon" translate="no">
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
<tr><th><code translate="no">AnnSearchRequest</code> комбинации</th><th>Окончательная область кандидатов</th><th>Поведение результата</th><th><code translate="no">element_scope</code></th></tr>
</thead>
<tbody>
<tr><td>Векторное поле на уровне коллекции + подполе EmbeddingList структуры StructArray</td><td>Уровень сущности</td><td>Окончательные кандидаты индексируются по первичному ключу.</td><td>Не использовать.</td></tr>
<tr><td>Векторное поле на уровне коллекции + подполе на уровне элемента StructArray</td><td>Уровень сущности</td><td>Соответствия на уровне элементов сворачиваются в кандидаты на уровне сущностей перед гибридным переранжированием.</td><td>Дополнительная настройка сворачивания на уровне элементов StructArray <code translate="no">AnnSearchRequest</code>.</td></tr>
<tr><td>Несколько подполей на уровне элементов в рамках одного поля StructArray</td><td>Уровень элемента</td><td>Окончательные кандидаты индексируются по первичному ключу плюс смещению элемента Struct.</td><td>Не использовать.</td></tr>
<tr><td>Полеуровневые подполя в разных полях StructArray</td><td>Уровень сущности</td><td>Смещения элементов не имеют общей идентичности, поэтому каждый подполе на уровне элемента StructArray <code translate="no">AnnSearchRequest</code> сворачивается перед переранжированием.</td><td>Дополнительная настройка сворачивания для каждого « <code translate="no">AnnSearchRequest</code> » на уровне элементов StructArray.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Предупреждение</p>
<p>Используйте параметр ` <code translate="no">element_scope</code> ` только для настройки сворачивания объектов ` <code translate="no">AnnSearchRequest</code> ` на уровне элементов StructArray при гибридном поиске на уровне элементов с разными структурами. Не используйте его для запросов EmbeddingList, векторных запросов на уровне коллекций или гибридного поиска на уровне элементов с одинаковыми StructArray.</p>
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
    </button></h2><p>Перед запуском гибридного поиска подготовьте коллекцию, данные и индексы.</p>
<table>
<thead>
<tr><th>Требования</th><th>Подробности</th></tr>
</thead>
<tbody>
<tr><td>Поле StructArray</td><td>Коллекция содержит поле StructArray, например <code translate="no">chunks</code>.</td></tr>
<tr><td>По podpola вектора</td><td>Используйте отдельные подполя вектора для поиска по EmbeddingList и поиска на уровне элементов.</td></tr>
<tr><td>Индексы</td><td><code translate="no">chunks[emb_list_vector]</code> использует метрику <code translate="no">MAX_SIM*</code>. <code translate="no">chunks[emb]</code> использует обычную векторную метрику, такую как <code translate="no">COSINE</code>, <code translate="no">IP</code> или <code translate="no">L2</code>.</td></tr>
<tr><td>Реранкер</td><td>Выберите гибридный реранкер, например <code translate="no">RRFRanker</code> или другой реранкер, поддерживаемый вашим приложением.</td></tr>
</tbody>
</table>
<p>Информацию о настройке индекса см. в разделе <a href="/docs/ru/index-structarray-fields.md">«Поля StructArray индекса</a>».</p>
<h2 id="Run-hybrid-search-with-an-EmbeddingList-request" class="common-anchor-header">Запуск гибридного поиска с помощью запроса EmbeddingList<button data-href="#Run-hybrid-search-with-an-EmbeddingList-request" class="anchor-icon" translate="no">
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
    </button></h2><p>Поиск EmbeddingList по подполю вектора StructArray в гибридном поиске осуществляется на уровне сущностей. Он ведет себя как запрос векторного поиска на уровне сущностей и не возвращает один смещение совпадающего элемента Struct.</p>
<pre><code translate="no">from pymilvus import AnnSearchRequest, MilvusClient, RRFRanker
from pymilvus.client.embedding_list import EmbeddingList

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query_vector = [0.19, 0.24, 0.30, 0.37]

query_list = EmbeddingList()
query_list.add([0.12, 0.21, 0.32, 0.44])
query_list.add([0.18, 0.23, 0.29, 0.36])

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    limit=10,
)

chunk_list_req = AnnSearchRequest(
    data=[query_list],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    limit=10,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_list_req],
    ranker=RRFRanker(),
    limit=5,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>В данном примере оба объекта <code translate="no">AnnSearchRequest</code> генерируют кандидаты на уровне сущности. Конечный результат индексируется по первичному ключу родительской сущности. Не добавляйте <code translate="no">element_scope</code> в запрос EmbeddingList.</p>
<h2 id="Run-same-StructArray-element-level-hybrid-search" class="common-anchor-header">Запуск гибридного поиска на уровне элементов одного и того же StructArray<button data-href="#Run-same-StructArray-element-level-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Когда все объекты ` <code translate="no">AnnSearchRequest</code> ` нацелены на подполя векторного поиска на уровне элементов в рамках одного и того же поля `StructArray`, гибридный поиск может сохранить кандидаты на уровне элементов посредством переранжирования. Это единственный гибридный режим для `StructArray`, при котором итоговые результаты остаются на уровне элементов.</p>
<p>В следующем примере предполагается, что поле StructArray типа <code translate="no">chunks</code> имеет два векторных подполя на уровне элементов: <code translate="no">chunks[emb]</code> и <code translate="no">chunks[code_emb]</code>, и оба используют обычные векторные метрики.</p>
<pre><code translate="no">index_chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
    <span class="hljs-built_in">expr</span>=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
)

code_chunk_req = AnnSearchRequest(
    data=[code_query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[code_emb]&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
    <span class="hljs-built_in">expr</span>=<span class="hljs-string">&#x27;element_filter(chunks, $[has_code] == true)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[index_chunk_req, code_chunk_req],
    ranker=RRFRanker(),
    <span class="hljs-built_in">limit</span>=5,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
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
<p>Оба объекта <code translate="no">AnnSearchRequest</code> выполняют поиск по векторным подполям в рамках <code translate="no">chunks</code>. Одно и то же смещение с нулевой базой относится к одному и тому же элементу Struct, поэтому гибридный реранкер может напрямую ранжировать кандидаты на уровне элементов. Не устанавливайте <code translate="no">element_scope</code> в этом режиме, поскольку сворачивание на уровне сущностей не выполняется.</p>
<h2 id="Collapse-element-level-hits-for-entity-level-hybrid-search" class="common-anchor-header">Сворачивание совпадений на уровне элементов для гибридного поиска на уровне сущностей<button data-href="#Collapse-element-level-hits-for-entity-level-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Если гибридный поиск сочетает запрос на уровне элементов StructArray <code translate="no">AnnSearchRequest</code> с векторным запросом на уровне коллекции, запросом EmbeddingList или запросом на уровне элементов в рамках другого поля StructArray, окончательная область кандидатов находится на уровне сущностей. В этом случае каждый запрос на уровне элементов StructArray <code translate="no">AnnSearchRequest</code> сводится к кандидатам на уровне сущностей перед гибридным переранжированием.</p>
<p>Используйте <code translate="no">element_scope</code> внутри <code translate="no">params</code> элемента StructArray уровня <code translate="no">AnnSearchRequest</code>, когда необходимо контролировать, как сворачиваются несколько совпавших элементов из одного и того же объекта.</p>
<pre><code translate="no">title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    param={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;element_scope&quot;</span>: {
                <span class="hljs-string">&quot;collapse&quot;</span>: {
                    <span class="hljs-string">&quot;strategy&quot;</span>: <span class="hljs-string">&quot;topk_sum&quot;</span>,
                    <span class="hljs-string">&quot;topk&quot;</span>: 3,
                },
            },
        },
    },
    <span class="hljs-built_in">limit</span>=30,
    <span class="hljs-built_in">expr</span>=<span class="hljs-string">&#x27;element_filter(chunks, $[quality_score] &gt; 0.8)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    <span class="hljs-built_in">limit</span>=5,
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
<p>В данном примере параметр ` <code translate="no">title_req</code> ` имеет значение «entity-level», поэтому итоговый гибридный результат также относится к уровню сущности. Запрос ` <code translate="no">chunk_req</code> ` сначала возвращает совпадения элементов из ` <code translate="no">chunks[emb]</code>`, а затем сворачивает возвращенные элементы, относящиеся к одной и той же сущности, путем суммирования трех лучших оценок элементов. Если параметр ` <code translate="no">element_scope</code> ` опущен при необходимости сворачивания на уровне сущности, по умолчанию используется стратегия сворачивания ` <code translate="no">max</code>`.</p>
<h2 id="Choose-a-collapse-strategy" class="common-anchor-header">Выберите стратегию объединения<button data-href="#Choose-a-collapse-strategy" class="anchor-icon" translate="no">
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
<tr><th>Стратегия</th><th>Поведение</th><th><code translate="no">topk</code></th><th>Требования к метрике</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max</code></td><td>Сохранить лучший балл возвращённого элемента для сущности.</td><td>Не допускается.</td><td>Любая поддерживаемая метрика векторного типа.</td></tr>
<tr><td><code translate="no">sum</code></td><td>Суммировать оценки всех возвращаемых элементов для сущности.</td><td>Не допускается.</td><td>Только метрики с положительной корреляцией, такие как <code translate="no">IP</code> или <code translate="no">COSINE</code>.</td></tr>
<tr><td><code translate="no">avg</code></td><td>Среднее значение всех возвращаемых оценок элементов для сущности.</td><td>Не допускается.</td><td>Любая поддерживаемая метрика регулярного вектора.</td></tr>
<tr><td><code translate="no">topk_sum</code></td><td>Суммируйте лучшие оценки возвращённых элементов по <code translate="no">K</code> для сущности.</td><td>Обязательно и должно быть положительным.</td><td>Только метрики с положительной корреляцией, такие как « <code translate="no">IP</code> » или « <code translate="no">COSINE</code> ».</td></tr>
<tr><td><code translate="no">topk_avg</code></td><td>Среднее значение лучших оценок элементов, возвращаемых по алгоритму « <code translate="no">K</code> » для данного объекта.</td><td>Обязательный параметр, значение должно быть положительным.</td><td>Любая поддерживаемая метрика регулярного вектора.</td></tr>
</tbody>
</table>
<p>Функция «Сворачивание» использует только совпадения элементов, возвращаемые этой метрикой на уровне элементов StructArray ( <code translate="no">AnnSearchRequest</code>). Она не сканирует каждый элемент Struct в сущности после поиска ANN. Установите значение параметра запроса <code translate="no">limit</code> достаточно высоким, чтобы обеспечить доступность нужных элементов для сворачивания.</p>
<h2 id="Add-filters-range-search-and-grouping" class="common-anchor-header">Добавление фильтров, поиска по диапазону и группировки<button data-href="#Add-filters-range-search-and-grouping" class="anchor-icon" translate="no">
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
    </button></h2><p>Вы можете привязать <code translate="no">element_filter</code> к <code translate="no">AnnSearchRequest</code> на уровне элементов StructArray, когда скалярные условия должны применяться к тем же элементам Struct, которые участвуют в векторном поиске. Вы также можете использовать <code translate="no">filter</code> верхнего уровня на <code translate="no">hybrid_search()</code> для условий, относящихся к родительскому объекту.</p>
<p>Векторные поля на уровне элементов StructArray поддерживают поиск по диапазону в гибридном поиске. Добавьте <code translate="no">radius</code> и, опционально, <code translate="no">range_filter</code> к <code translate="no">AnnSearchRequest</code> на уровне элементов. Запросы StructArray на уровне EmbeddingList не поддерживают поиск по диапазону.</p>
<p>Гибридная группировка на уровне элементов поддерживается только в том случае, если все объекты <code translate="no">AnnSearchRequest</code> нацелены на векторные поля на уровне элементов в рамках одного и того же поля StructArray, а <code translate="no">group_by_field</code> должен быть первичным ключом. Гибридная группировка не поддерживается, если запрос сочетает векторные поля на уровне коллекций, различные поля StructArray или запросы на уровне EmbeddingList. Не следует сочетать поиск по диапазону с группировкой.</p>
<h2 id="Interpret-hybrid-results" class="common-anchor-header">Интерпретация гибридных результатов<button data-href="#Interpret-hybrid-results" class="anchor-icon" translate="no">
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
<tr><th>Окончательная область кандидатов</th><th>Ключ результата</th><th>Поведение смещения</th><th>Когда это происходит</th></tr>
</thead>
<tbody>
<tr><td>Уровень сущности</td><td>Первичный ключ.</td><td>В окончательном результате смещение элементов отсутствует.</td><td>Гибридный запрос включает векторное поле на уровне коллекции, запрос EmbeddingList или запросы на уровне элементов в рамках различных полей StructArray.</td></tr>
<tr><td>Уровень элемента</td><td>Первичный ключ плюс родительское поле StructArray плюс смещение элемента.</td><td>Смещение выбранного элемента может быть возвращено при предоставлении доступа через API или SDK.</td><td>Все объекты <code translate="no">AnnSearchRequest</code> относятся к уровню элементов и находятся в одном поле StructArray.</td></tr>
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
<li><p>Используйте <code translate="no">element_scope</code> только для объектов <code translate="no">AnnSearchRequest</code> на уровне элементов StructArray, которые должны быть сведены к кандидатам на уровне сущностей при гибридном поиске.</p></li>
<li><p>Не используйте <code translate="no">element_scope</code> для запросов EmbeddingList, векторных запросов на уровне коллекции или гибридного поиска на уровне элементов одного и того же StructArray.</p></li>
<li><p><code translate="no">sum</code> Стратегии сворачивания « <code translate="no">topk_sum</code> » и «and» требуют метрик положительной корреляции, таких как <code translate="no">IP</code> или <code translate="no">COSINE</code>. Не используйте их с <code translate="no">L2</code>.</p></li>
<li><p><code translate="no">topk_sum</code> а также <code translate="no">topk_avg</code> требуют положительного значения <code translate="no">topk</code>. Другие стратегии сворачивания не должны включать <code translate="no">topk</code>.</p></li>
<li><p>Запросы StructArray на уровне EmbeddingList не поддерживают поиск по диапазону или группировку.</p></li>
<li><p>Гибридное группирование поддерживается только для гибридного поиска на уровне элементов одного и того же StructArray и только по первичному ключу.</p></li>
<li><p>Не следует сочетать поиск по диапазону с группировкой.</p></li>
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
<li><p>Добавление параметра <code translate="no">element_scope</code> к гибридному запросу на уровне элементов одного и того же StructArray. Такой запрос остаётся на уровне элементов и не выполняет сворачивание на уровне сущностей.</p></li>
<li><p>Добавление параметра « <code translate="no">element_scope</code> » к запросу « <code translate="no">chunks[emb_list_vector]</code> ». Поиск по EmbeddingList уже осуществляется на уровне сущностей.</p></li>
<li><p>Предположение о том, что два поля StructArray имеют общие смещения элементов. Элемент с офсетом <code translate="no">3</code> в поле <code translate="no">chunks</code> и элемент с офсетом <code translate="no">3</code> в другом поле StructArray относятся к разным элементам, поэтому гибридный запрос становится запросом на уровне сущностей.</p></li>
<li><p>Используйте <code translate="no">topk_sum</code> с <code translate="no">L2</code>. Для отрицательных метрик расстояния используйте <code translate="no">max</code>, <code translate="no">avg</code> или <code translate="no">topk_avg</code>.</p></li>
<li><p>Ожидается, что гибридные результаты на уровне сущностей будут включать выбранное смещение элемента Struct после сворачивания.</p></li>
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
<li><p>Чтобы узнать о двух основных режимах векторного поиска <a href="/docs/ru/basic-vector-search-with-structarray.md">с</a> использованием StructArray, ознакомьтесь с разделом <a href="/docs/ru/basic-vector-search-with-structarray.md">«Базовый векторный поиск с использованием StructArray</a>».</p></li>
<li><p>Чтобы добавить скалярные фильтры в гибридный поиск, ознакомьтесь со статьёй <a href="/docs/ru/filtered-search-with-structarray.md">«Фильтрованный поиск с использованием StructArray</a>».</p></li>
<li><p>Чтобы использовать границы оценки или расстояния в гибридном поиске, ознакомьтесь с разделом <a href="/docs/ru/range-search-with-structarray.md">«Поиск по диапазону с использованием StructArray</a>».</p></li>
<li><p>Чтобы сгруппировать гибридные результаты на уровне элементов по родительскому объекту, ознакомьтесь со статьей <a href="/docs/ru/grouping-search-with-structarray.md">«Групповой поиск с помощью StructArray</a>».</p></li>
<li><p>Чтобы ознакомиться с ограничениями поиска с помощью StructArray, прочитайте раздел <a href="/docs/ru/structarray-limits.md">«Ограничения StructArray</a>».</p></li>
</ol>
