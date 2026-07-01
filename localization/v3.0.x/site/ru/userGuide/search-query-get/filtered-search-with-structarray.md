---
id: filtered-search-with-structarray.md
title: Фильтрованный поиск с использованием StructArray
summary: >-
  Используйте эту страницу для добавления скалярной фильтрации к векторному
  поиску по полям StructArray. Фильтрация StructArray имеет два уровня: фильтры
  на уровне строк выбирают родительские сущности, а фильтры на уровне элементов
  ограничивают набор элементов Struct, участвующих в векторном поиске на уровне
  элементов.
---
<h1 id="Filtered-Search-with-StructArray" class="common-anchor-header">Фильтрованный поиск с использованием StructArray<button data-href="#Filtered-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Используйте эту страницу, чтобы добавить скалярную фильтрацию к векторному поиску по полям StructArray. Фильтрация StructArray имеет два уровня: фильтры на уровне строк выбирают родительские сущности, а фильтры на уровне элементов ограничивают набор элементов Struct, участвующих в векторном поиске на уровне элементов.</p>
<p>На этой странице используется коллекция « <code translate="no">tech_articles</code> » из <a href="/docs/ru/create-structarray-field.md">раздела «Создание поля StructArray</a>». В коллекции имеется поле StructArray с именем « <code translate="no">chunks</code> », содержащее скалярные подполя, такие как « <code translate="no">section</code> », « <code translate="no">page</code> », « <code translate="no">quality_score</code> » и « <code translate="no">has_code</code> », а также векторные подполя для поиска.</p>
<h2 id="Choose-a-filter-type" class="common-anchor-header">Выберите тип фильтра<button data-href="#Choose-a-filter-type" class="anchor-icon" translate="no">
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
<tr><th>Цель</th><th>Использование</th><th>Поведение результата</th></tr>
</thead>
<tbody>
<tr><td>Фильтрация по скалярному полю верхнего уровня, например <code translate="no">category</code>.</td><td>Обычное выражение фильтра.</td><td>Выбирает родительские сущности до или во время поиска.</td></tr>
<tr><td>Ограничивает векторный поиск на уровне элементов элементами Struct, соответствующими скалярным условиям.</td><td><code translate="no">element_filter</code>.</td><td>Выполняет поиск только среди соответствующих элементов Struct и может возвращать смещения найденных элементов.</td></tr>
<tr><td>Выбор сущностей в зависимости от того, соответствуют ли предкату какие-либо, все или определённое количество элементов Struct.</td><td><code translate="no">MATCH_ANY</code>, <code translate="no">MATCH_ALL</code>, <code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> или <code translate="no">MATCH_EXACT</code>.</td><td>Фильтрация на уровне строк. Сами по себе эти операторы не возвращают смещения.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>На этой странице объясняется, как использовать фильтры StructArray в рабочих процессах поиска. Полные правила синтаксиса, поддерживаемые типы предикатов и матрица неподдерживаемых предикатов приведены в разделе <a href="/docs/ru/struct-array-operators.md">«Операторы StructArray</a>».</p>
</div>
<h2 id="Filter-by-top-level-fields" class="common-anchor-header">Фильтрация по полям верхнего уровня<button data-href="#Filter-by-top-level-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Используйте обычные выражения фильтрации, если условие относится к родительской сущности, а не к отдельному элементу Struct. Это работает как при поиске по EmbeddingList, так и при поиске на уровне элементов.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">from</span> pymilvus.client.embedding_list <span class="hljs-keyword">import</span> EmbeddingList

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query = EmbeddingList()
query.add([<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>])
query.add([<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>])

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;category == &quot;search&quot;&#x27;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>Приведенный выше фильтр выбирает только сущности, у которых поле верхнего уровня <code translate="no">category</code> имеет значение <code translate="no">&quot;search&quot;</code>. Он не выделяет один конкретный соответствующий элемент Struct.</p>
<h2 id="Filter-element-level-vector-search" class="common-anchor-header">Фильтрация векторного поиска на уровне элементов<button data-href="#Filter-element-level-vector-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Используйте <code translate="no">element_filter(structArrayField, predicate)</code>, когда скалярные условия должны применяться к тому же элементу Struct, который участвует в векторном поиске на уровне элементов. Внутри предиката используйте <code translate="no">$[subfield]</code> для ссылки на скалярные подполя текущего элемента Struct.</p>
<pre><code translate="no" class="language-python">query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

filter_expr = (
    <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;element_filter(chunks, &#x27;</span>
    <span class="hljs-string">&#x27;$[section] == &quot;index&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;$[quality_score] &gt; 0.9 &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;$[has_code] == true)&#x27;</span>
)

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">5</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[page]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
        <span class="hljs-string">&quot;chunks[has_code]&quot;</span>,
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
<p>В данном примере предикат верхнего уровня <code translate="no">category == &quot;search&quot;</code> выбирает кандидатов, а <code translate="no">element_filter</code> ограничивает векторный поиск на уровне элементов фрагментами, в которых <code translate="no">section</code>, <code translate="no">quality_score</code> и <code translate="no">has_code</code> совпадают в одном и том же элементе Struct.</p>
<div class="alert note">
<p>Предупреждение</p>
<p>При объединении предиката верхнего уровня с оператором <code translate="no">element_filter</code> помещайте оператор <code translate="no">element_filter</code> в конец выражения. Выражение фильтра может содержать только один оператор <code translate="no">element_filter</code>, и нельзя вкладывать операторы <code translate="no">element_filter</code> или <code translate="no">MATCH_*</code> внутрь другого оператора StructArray.</p>
</div>
<h2 id="Filter-entities-with-MATCH-operators" class="common-anchor-header">Фильтрация сущностей с помощью операторов MATCH<button data-href="#Filter-entities-with-MATCH-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Используйте операторы <code translate="no">MATCH_*</code>, когда фильтр должен определять, соответствует ли родительская сущность критериям на основе элементов Struct. Эти операторы являются фильтрами на уровне строк: они выбирают сущности, но сами по себе не возвращают смещения элементов.</p>
<table>
<thead>
<tr><th>Оператор</th><th>Используйте его, когда</th><th>Пример</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MATCH_ANY</code></td><td>По крайней мере один элемент Struct должен удовлетворять предикату.</td><td><code translate="no">MATCH_ANY(chunks, $[section] == &quot;index&quot;)</code></td></tr>
<tr><td><code translate="no">MATCH_ALL</code></td><td>Все элементы Struct должны удовлетворять предикату.</td><td><code translate="no">MATCH_ALL(chunks, $[quality_score] &gt; 0.5)</code></td></tr>
<tr><td><code translate="no">MATCH_LEAST</code></td><td>По крайней мере, <code translate="no">N</code> элементов структуры должны удовлетворять предикату.</td><td><code translate="no">MATCH_LEAST(chunks, $[has_code] == true, threshold=2)</code></td></tr>
<tr><td><code translate="no">MATCH_MOST</code></td><td>Не более чем <code translate="no">N</code> элементов структуры должны удовлетворять предикату.</td><td><code translate="no">MATCH_MOST(chunks, $[section] == &quot;appendix&quot;, threshold=1)</code></td></tr>
<tr><td><code translate="no">MATCH_EXACT</code></td><td>Ровно <code translate="no">N</code> элементов Struct должны удовлетворять предикату.</td><td><code translate="no">MATCH_EXACT(chunks, $[section] == &quot;summary&quot;, threshold=1)</code></td></tr>
</tbody>
</table>
<pre><code translate="no" class="language-python">filter_expr = (
    <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;MATCH_ANY(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)&#x27;</span>
)

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">3</span>,
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
<p>Здесь используется « <code translate="no">MATCH_ANY</code> », поскольку результат поиска EmbeddingList находится на уровне сущности. Фильтр требует, чтобы по крайней мере один фрагмент в сущности был фрагментом « <code translate="no">&quot;index&quot;</code> » с высоким качеством, но сам результат поиска по-прежнему представляет родительскую сущность.</p>
<h2 id="Use-filters-in-hybrid-search" class="common-anchor-header">Использование фильтров в гибридном поиске<button data-href="#Use-filters-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>В гибридном поиске применяйте фильтры StructArray там, где условие должно вступать в силу. Фильтр верхнего уровня может использоваться во всем гибридном поиске. Фильтр <code translate="no">element_filter</code> следует прикрепить к запросу на уровне элементов StructArray, который требует ограничений на уровне элементов.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest, RRFRanker

query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;category == &quot;search&quot;&#x27;</span>,
    limit=<span class="hljs-number">5</span>,
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
<p>Аргумент « <code translate="no">filter</code> » применяет условие сущности верхнего уровня, тогда как « <code translate="no">expr</code> » в « <code translate="no">chunk_req</code> » ограничивает только запрос вектора на уровне элементов StructArray. Поддерживаемые комбинации гибридного поиска и ограничения для конкретных версий см. в разделах <a href="/docs/ru/hybrid-search-with-structarray.md">«Гибридный поиск с StructArray</a> » и <a href="/docs/ru/structarray-limits.md">«Ограничения StructArray</a>».</p>
<h2 id="Predicate-support-summary" class="common-anchor-header">Сводка поддержки предикатов<button data-href="#Predicate-support-summary" class="anchor-icon" translate="no">
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
    </button></h2><p>Используйте скалярные подполя в предикатах StructArray. Векторные подполя не являются входными данными для скалярных предикатов.</p>
<table>
<thead>
<tr><th>Тип подполя</th><th>Типичные примеры предикатов</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">$[has_code] == true</code>, <code translate="no">!($[has_code] == true)</code></td></tr>
<tr><td>Целочисленные типы</td><td><code translate="no">$[page] &gt;= 2</code>, <code translate="no">$[page] in [1, 2, 3]</code></td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td><code translate="no">$[quality_score] &gt; 0.9</code>, <code translate="no">0.7 &lt; $[quality_score] &lt; 0.95</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">$[section] == &quot;index&quot;</code>, <code translate="no">$[text] like &quot;range%&quot;</code></td></tr>
<tr><td>Векторные подполя</td><td>Не поддерживаются в качестве входных данных для скалярных предикатов <code translate="no">$[...]</code>. Вместо этого используйте векторные подполя с помощью векторного поиска.</td></tr>
</tbody>
</table>
<p>Для неподдерживаемых случаев, таких как пути JSON, функции контейнеров массивов, функции сопоставления текста, предикаты null для <code translate="no">$[...]</code>, функции Geometry, выражения Timestamptz и вызовы обобщённых функций, см. раздел <a href="/docs/ru/struct-array-operators.md">«Операторы StructArray</a>».</p>
<h2 id="Common-mistakes" class="common-anchor-header">Распространённые ошибки<button data-href="#Common-mistakes" class="anchor-icon" translate="no">
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
<li><p>Использование ` <code translate="no">$[subfield]</code> ` вне контекста ` <code translate="no">element_filter</code> ` или ` <code translate="no">MATCH_*</code>`.</p></li>
<li><p>Использование <code translate="no">chunks.section</code> вместо синтаксиса операторов StructArray, например <code translate="no">element_filter(chunks, $[section] == &quot;index&quot;)</code>.</p></li>
<li><p>Использование <code translate="no">element_filter</code>, когда требуется только фильтрация на уровне строк. Вместо этого используйте <code translate="no">MATCH_ANY</code>, если вам нужно только выбрать сущности.</p></li>
<li><p>Ожидание того, что оператор ` <code translate="no">MATCH_*</code> ` вернет смещения элементов. Эти операторы выбирают сущности и сами по себе не идентифицируют один соответствующий элемент.</p></li>
<li><p>Написание простых булевых предикатов, таких как <code translate="no">$[has_code]</code>. Используйте явные сравнения, такие как <code translate="no">$[has_code] == true</code>.</p></li>
<li><p>Размещение <code translate="no">element_filter</code> перед предикатом верхнего уровня в одном и том же выражении фильтра.</p></li>
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
<li><p>Чтобы ознакомиться с полным синтаксисом фильтров StructArray, прочтите раздел <a href="/docs/ru/struct-array-operators.md">«Операторы StructArray</a>».</p></li>
<li><p>Чтобы сначала выполнить поиск по вектору без фильтрации, ознакомьтесь с разделом <a href="/docs/ru/basic-vector-search-with-structarray.md">«Базовый поиск по вектору с StructArray</a>».</p></li>
<li><p>Чтобы создать скалярные индексы для часто используемых фильтров StructArray, ознакомьтесь с разделом <a href="/docs/ru/index-structarray-fields.md">«Индексирование полей StructArray</a>».</p></li>
<li><p>Чтобы ознакомиться с ограничениями фильтрации и поиска для конкретных версий, ознакомьтесь с разделом <a href="/docs/ru/structarray-limits.md">«Ограничения StructArray</a>».</p></li>
</ol>
