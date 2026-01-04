---
id: sparse-inverted-index.md
title: SPARSE_INVERTED_INDEX
summary: >-
  Индекс SPARSE_INVERTED_INDEX - это тип индекса, используемый Milvus для
  эффективного хранения и поиска разреженных векторов. Этот тип индекса
  использует принципы инвертированного индексирования для создания
  высокоэффективной структуры поиска для разреженных данных.
---
<h1 id="SPARSEINVERTEDINDEX" class="common-anchor-header">SPARSE_INVERTED_INDEX<button data-href="#SPARSEINVERTEDINDEX" class="anchor-icon" translate="no">
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
    </button></h1><p>Индекс <code translate="no">SPARSE_INVERTED_INDEX</code> - это тип индекса, используемый Milvus для эффективного хранения и поиска разреженных векторов. Этот тип индекса использует принципы инвертированного индексирования для создания высокоэффективной структуры поиска для разреженных данных. Для получения дополнительной информации см. раздел <a href="/docs/ru/inverted.md">ИНВЕРТИРОВАННЫЙ</a>.</p>
<h2 id="Build-index" class="common-anchor-header">Построение индекса<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы построить индекс <code translate="no">SPARSE_INVERTED_INDEX</code> на разреженном векторном поле в Milvus, используйте метод <code translate="no">add_index()</code>, указав <code translate="no">index_type</code>, <code translate="no">metric_type</code> и дополнительные параметры для индекса.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_sparse_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>}, <span class="hljs-comment"># Algorithm used for building and querying the index</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>В данной конфигурации:</p>
<ul>
<li><p><code translate="no">index_type</code>: Тип индекса, который будет построен. В этом примере задайте значение <code translate="no">SPARSE_INVERTED_INDEX</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Метрика, используемая для расчета сходства между разреженными векторами. Допустимые значения:</p>
<ul>
<li><p><code translate="no">IP</code> (Внутреннее произведение): Измеряет сходство с помощью точечного произведения.</p></li>
<li><p><code translate="no">BM25</code>: Обычно используется для полнотекстового поиска, фокусируясь на текстовом сходстве.</p>
<p>Более подробную информацию см. в разделе <a href="/docs/ru/metric.md">Типы метрик</a> и <a href="/docs/ru/full-text-search.md">полнотекстовый поиск</a>.</p></li>
</ul></li>
<li><p><code translate="no">params.inverted_index_algo</code>: Алгоритм, используемый для построения и запроса индекса. Допустимые значения:</p>
<ul>
<li><p><code translate="no">&quot;DAAT_MAXSCORE&quot;</code> (по умолчанию): Оптимизированная обработка запросов Document-at-a-Time (DAAT) с использованием алгоритма MaxScore. MaxScore обеспечивает лучшую производительность при больших значениях <em>k</em> или запросах с большим количеством терминов, пропуская термины и документы, которые, вероятно, будут иметь минимальное влияние. Это достигается путем разделения терминов на существенные и несущественные группы на основе их максимальных баллов влияния, фокусируясь на терминах, которые могут внести вклад в результаты top-k.</p></li>
<li><p><code translate="no">&quot;DAAT_WAND&quot;</code>: Оптимизированная обработка запросов DAAT с помощью алгоритма WAND. WAND оценивает меньше документов, попавших в запрос, за счет использования максимальных баллов влияния для пропуска неконкурентных документов, но при этом имеет более высокие накладные расходы на каждый запрос. Это делает WAND более эффективным для запросов с небольшими значениями <em>k</em> или коротких запросов, где пропуск документов более целесообразен.</p></li>
<li><p><code translate="no">&quot;TAAT_NAIVE&quot;</code>: Обработка запросов с использованием базового термина (TAAT). Хотя он медленнее, чем <code translate="no">DAAT_MAXSCORE</code> и <code translate="no">DAAT_WAND</code>, <code translate="no">TAAT_NAIVE</code> обладает уникальным преимуществом. В отличие от алгоритмов DAAT, использующих кэшированные оценки максимального воздействия, которые остаются статичными независимо от изменений глобального параметра коллекции (avgdl), <code translate="no">TAAT_NAIVE</code> динамически адаптируется к таким изменениям.</p></li>
</ul>
<p>Чтобы узнать больше о параметрах построения, доступных для индекса <code translate="no">SPARSE_INVERTED_INDEX</code>, обратитесь к разделу <a href="/docs/ru/sparse-inverted-index.md#Index-building-params">Параметры построения индекса</a>.</p></li>
</ul>
<p>После настройки параметров индекса вы можете создать индекс, используя метод <code translate="no">create_index()</code> напрямую или передавая параметры индекса в метод <code translate="no">create_collection</code>. Подробности см. в разделе <a href="/docs/ru/create-collection.md">Создание коллекции</a>.</p>
<h2 id="Search-on-index" class="common-anchor-header">Поиск по индексу<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>После создания индекса и вставки сущностей можно выполнять поиск по сходству в индексе.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare the query vector</span>
query_vector = [{<span class="hljs-number">1</span>: <span class="hljs-number">0.2</span>, <span class="hljs-number">50</span>: <span class="hljs-number">0.4</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.7</span>}]

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,  <span class="hljs-comment"># Vector field name</span>
    data=query_vector,  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Чтобы узнать о параметрах поиска, доступных для индекса <code translate="no">SPARSE_INVERTED_INDEX</code>, обратитесь к разделу <a href="/docs/ru/ivf-flat.md#share-KDWodFEx6oCm2yxgEUAcXaUDnwg">Параметры поиска по индексу</a>.</p>
<h2 id="Index-params" class="common-anchor-header">Параметры индекса<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>В этом разделе представлен обзор параметров, используемых для построения индекса и выполнения поиска по индексу.</p>
<h3 id="Index-building-params" class="common-anchor-header">Параметры построения индекса<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>В следующей таблице перечислены параметры, которые могут быть настроены в <code translate="no">params</code> при <a href="/docs/ru/sparse-inverted-index.md#Build-index">построении индекса</a>.</p>
<table>
   <tr>
     <th><p>Параметр</p></th>
     <th><p>Описание</p></th>
     <th><p>Диапазон значений</p></th>
     <th><p>Предложение по настройке</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inverted_index_algo</code></p></td>
     <td><p>Алгоритм, используемый при построении индекса и запросов к нему. Он определяет, как индекс обрабатывает запросы.</p></td>
     <td><p><code translate="no">"DAAT_MAXSCORE"</code> (по умолчанию), <code translate="no">"DAAT_WAND"</code>, <code translate="no">"TAAT_NAIVE"</code></p></td>
     <td><p>Используйте <code translate="no">"DAAT_MAXSCORE"</code> для сценариев с большими значениями k или запросов с большим количеством терминов, которые могут выиграть от пропуска неконкурентных документов. </p><p>Выберите <code translate="no">"DAAT_WAND"</code> для запросов с небольшими значениями k или коротких запросов, чтобы использовать более эффективный пропуск документов.</p><p>Используйте <code translate="no">"TAAT_NAIVE"</code>, если требуется динамическая подстройка к изменениям коллекции (например, avgdl).</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Специфические для индекса параметры поиска<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>В следующей таблице перечислены параметры, которые могут быть настроены в <code translate="no">search_params.params</code> при <a href="/docs/ru/sparse-inverted-index.md#Search-on-index">поиске по индексу</a>.</p>
<table>
   <tr>
     <th><p>Параметр</p></th>
     <th><p>Описание</p></th>
     <th><p>Диапазон значений</p></th>
     <th><p>Tuning Suggestion</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">drop_ratio_search</code></p></td>
     <td><p>Доля наименьших значений, которые следует игнорировать при поиске, что помогает уменьшить шум.</p></td>
     <td><p>Фракция от 0,0 до 1,0 (например, 0,2 игнорирует 20 % наименьших значений).</p></td>
     <td><p>Настройте этот параметр в зависимости от разреженности и уровня шума векторов запроса.</p><p>Этот параметр управляет долей значений малой величины, отбрасываемых при поиске. Увеличение этого значения (например, до <code translate="no">0.2</code>) может уменьшить шум и сфокусировать поиск на более значимых компонентах, что может повысить точность и эффективность. Однако отбрасывание большего количества значений может также снизить запоминаемость за счет исключения потенциально значимых сигналов. Выберите значение, которое сбалансирует запоминание и точность для вашей рабочей нагрузки.</p></td>
   </tr>
</table>
