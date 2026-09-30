---
id: sparse-inverted-index.md
title: SPARSE_INVERTED_INDEX
summary: >-
  Индекс SPARSE_INVERTED_INDEX — это тип индекса, используемый Milvus для
  эффективного хранения и поиска разреженных векторов. Данный тип индекса
  основан на принципах инвертированного индексирования, что позволяет создать
  высокоэффективную структуру поиска для разреженных данных.
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
    </button></h1><p>Индекс « <code translate="no">SPARSE_INVERTED_INDEX</code> » — это тип индекса, используемый Milvus для эффективного хранения и поиска разреженных векторов. Он создает инвертированную структуру на основе ненулевых компонент разреженных векторов. Этот индекс можно использовать для полнотекстового поиска по алгоритму BM25, а также для поиска по разреженным вложениям на основе внутреннего произведения.</p>
<p>Дополнительную информацию о полях разреженных векторов, типах метрик и полнотекстовом поиске см. в разделах <a href="/docs/ru/sparse_vector.md">«Разреженные векторы</a>», <a href="/docs/ru/metric.md">«Типы метрик</a>» и <a href="/docs/ru/full-text-search.md">«Полнотекстовый поиск</a>».</p>
<h2 id="Build-index" class="common-anchor-header">Создание индекса<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы создать индекс « <code translate="no">SPARSE_INVERTED_INDEX</code> » для поля разреженных векторов в Milvus, воспользуйтесь методом ` <code translate="no">add_index()</code> ` и укажите параметры ` <code translate="no">index_type</code>`, ` <code translate="no">metric_type</code>` и `index`.</p>
<p>Для полнотекстового поиска по алгоритму BM25 создайте индекс на поле разреженных векторов, сгенерированном функцией BM25. Установите для параметра ` <code translate="no">metric_type</code> ` значение ` <code translate="no">BM25</code>`.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>, <span class="hljs-comment"># Name of the sparse vector field to index</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_bm25_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>, <span class="hljs-comment"># Metric type used for full text search</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>},
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>Для поиска по разреженным вложениям создайте индекс на основе поля разреженных векторов, в котором хранятся разреженные векторы, сгенерированные внешними средствами. Установите значение параметра ` <code translate="no">metric_type</code> ` равным ` <code translate="no">IP</code>`.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, <span class="hljs-comment"># Name of the sparse vector field to index</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_ip_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;SINDI&quot;</span>},
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>В приведенных выше конфигурациях:</p>
<ul>
<li><p><code translate="no">index_type</code>: Тип создаваемого индекса. Установите для этого параметра значение « <code translate="no">SPARSE_INVERTED_INDEX</code> ».</p></li>
<li><p><code translate="no">metric_type</code>: Метрика, используемая для вычисления сходства между разреженными векторами. Допустимые значения:</p>
<ul>
<li><p><code translate="no">BM25</code>: Использует оценку релевантности BM25 для полнотекстового поиска.</p></li>
<li><p><code translate="no">IP</code> (Внутреннее произведение): измеряет сходство разреженных векторов с помощью скалярного произведения.</p></li>
</ul>
<p>Подробности см. в разделах <a href="/docs/ru/metric.md">«Типы метрик</a> » и <a href="/docs/ru/full-text-search.md">«Полнотекстовый поиск</a>».</p></li>
<li><p><code translate="no">params.inverted_index_algo</code>: Алгоритм, используемый для построения индекса и выполнения запросов. Допустимые значения:</p>
<ul>
<li><p><code translate="no">&quot;DAAT_MAXSCORE&quot;</code>: Обработка запросов по методу «Document-at-a-Time MaxScore». Это значение является значением по умолчанию для параметра « <code translate="no">BM25</code> ». Дополнительную информацию см. в разделе <a href="https://dl.acm.org/doi/10.1016/0306-4573%2895%2900020-H">«Оценка запросов: стратегии и оптимизации</a>».</p></li>
<li><p><code translate="no">&quot;DAAT_WAND&quot;</code>: Обработка запросов по методу «Document-at-a-Time WAND». Этот алгоритм подходит для небольших значений topK или более коротких запросов. Дополнительную информацию см. в разделе <a href="https://dl.acm.org/doi/10.1145/956863.956944">«Эффективная оценка запросов с использованием двухуровневого процесса поиска</a>».</p></li>
<li><p><code translate="no">&quot;TAAT_NAIVE&quot;</code>: Базовая обработка запросов по принципу «Term-at-a-Time». Используйте этот вариант в качестве базового или когда требуется, чтобы оценка динамически адаптировалась к глобальной статистике коллекции, такой как средняя длина документа.</p></li>
<li><p><code translate="no">&quot;BLOCK_MAX_MAXSCORE&quot;</code>: Обработка запросов по методу MaxScore с использованием метаданных максимального балла на уровне блоков. Дополнительную информацию см. в разделе <a href="https://dl.acm.org/doi/10.1145/2009916.2010048">«Ускоренный поиск Top-k документов с использованием индексов Block-Max</a>».</p></li>
<li><p><code translate="no">&quot;BLOCK_MAX_WAND&quot;</code>: Обработка запросов по методу WAND с метаданными максимального балла на уровне блоков. Дополнительную информацию см. в статье <a href="https://dl.acm.org/doi/10.1145/2009916.2010048">«Ускоренный поиск Top-k документов с использованием индексов Block-Max</a>».</p></li>
<li><p><code translate="no">&quot;SINDI&quot;</code>: Редкий инвертированный индекс, основанный на фиксированных окнах по идентификаторам документов, с ускорением поиска с помощью SIMD. Это значение является значением по умолчанию для параметра ` <code translate="no">IP</code>`. Подробности см. в <a href="https://arxiv.org/abs/2509.08395">статье о SINDI</a>.</p></li>
</ul>
<p>Если вы не укажете <code translate="no">inverted_index_algo</code>, Milvus выберет алгоритм по умолчанию на основе <code translate="no">metric_type</code>: <code translate="no">DAAT_MAXSCORE</code> для <code translate="no">BM25</code> и <code translate="no">SINDI</code> для <code translate="no">IP</code>.</p>
<p>Чтобы узнать больше о параметрах построения, доступных для индекса <code translate="no">SPARSE_INVERTED_INDEX</code>, см. раздел <a href="/docs/ru/sparse-inverted-index.md#Index-building-params">«Параметры построения индекса</a>».</p></li>
</ul>
<p>После настройки параметров индекса вы можете создать индекс, используя метод ` <code translate="no">create_index()</code> ` напрямую или передавая параметры индекса в методе ` <code translate="no">create_collection</code> `. Подробности см. в разделе <a href="/docs/ru/create-collection.md">«Создание коллекции</a>».</p>
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
    </button></h2><p>После создания индекса и добавления сущностей можно выполнять поиск по схожести в индексе.</p>
<p>Для полнотекстового поиска BM25 в качестве запроса используйте необработанный текст. Milvus преобразует текст запроса в разреженный вектор с помощью функции BM25.</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    data=[<span class="hljs-string">&quot;what is information retrieval?&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
    limit=<span class="hljs-number">3</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Для поиска по разреженным вложениям в качестве вектора запроса используйте словарь разреженных векторов.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare the query vector</span>
query_vector = [{<span class="hljs-number">1</span>: <span class="hljs-number">0.2</span>, <span class="hljs-number">50</span>: <span class="hljs-number">0.4</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.7</span>}]

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    data=query_vector,
    limit=<span class="hljs-number">3</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>},
)
<button class="copy-code-btn"></button></code></pre>
<p>По умолчанию Milvus использует алгоритм поиска, настроенный для данного индекса.</p>
<p>Чтобы узнать больше о параметрах поиска, доступных для индекса « <code translate="no">SPARSE_INVERTED_INDEX</code> », см. раздел <a href="/docs/ru/sparse-inverted-index.md#Index-specific-search-params">«Параметры поиска для конкретного индекса</a>».</p>
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
    </button></h2><p>В этом разделе представлен обзор параметров, используемых для построения индекса и выполнения поиска по нему.</p>
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
    </button></h3><p>В следующей таблице перечислены параметры, которые можно настроить в <code translate="no">params</code> при <a href="/docs/ru/sparse-inverted-index.md#Build-index">построении индекса</a>.</p>
<table>
   <tr>
     <th><p>Параметр</p></th>
     <th><p>Описание</p></th>
     <th><p>Диапазон значений</p></th>
     <th><p>Рекомендации по настройке</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inverted_index_algo</code></p></td>
     <td><p>Алгоритм, используемый для построения и выполнения запросов по индексу. Он определяет, как индекс обрабатывает запросы.</p></td>
     <td><p><code translate="no">"DAAT_MAXSCORE"</code>, <code translate="no">"DAAT_WAND"</code>, <code translate="no">"TAAT_NAIVE"</code>, <code translate="no">"BLOCK_MAX_MAXSCORE"</code>, <code translate="no">"BLOCK_MAX_WAND"</code>, <code translate="no">"SINDI"</code></p><p>Значение по умолчанию: <code translate="no">"DAAT_MAXSCORE"</code> для <code translate="no">BM25</code>; <code translate="no">"SINDI"</code> для <code translate="no">IP</code>.</p></td>
     <td><p>Используйте <code translate="no">"DAAT_MAXSCORE"</code> для рабочих нагрузок полнотекстового поиска BM25 с высокими значениями k или запросов, содержащих много терминов.</p><p>Используйте <code translate="no">"DAAT_WAND"</code> для рабочих нагрузок BM25 с небольшими значениями k или короткими запросами.</p><p>Используйте <code translate="no">"TAAT_NAIVE"</code> в качестве базового варианта или когда требуется динамическая адаптация оценки к глобальной статистике коллекции, такой как средняя длина документа.</p><p>Используйте <code translate="no">"BLOCK_MAX_MAXSCORE"</code> или <code translate="no">"BLOCK_MAX_WAND"</code>, чтобы использовать метаданные максимального балла на уровне блоков для обрезки запросов.</p><p>Используйте <code translate="no">"SINDI"</code> для поиска по разреженным вложениям с <code translate="no">IP</code>.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">bm25_k1</code></p></td>
     <td><p>Регулирует насыщенность частоты терминов при подсчёте оценки по алгоритму BM25. Этот параметр применяется только в том случае, если <code translate="no">metric_type</code> равен <code translate="no">BM25</code>.</p></td>
     <td><p>Рекомендуемый диапазон: [1,2; 2,0]</p><p>Значение по умолчанию: 1,2</p></td>
     <td><p>Увеличьте это значение, чтобы придать частоте термина больший вес при ранжировании документов.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">bm25_b</code></p></td>
     <td><p>Регулирует степень нормализации длины документа при подсчете оценки по алгоритму BM25. Этот параметр применяется только в том случае, если для параметра « <code translate="no">metric_type</code> » установлено значение « <code translate="no">BM25</code> ».</p></td>
     <td><p>Диапазон: [0, 1]</p><p>Значение по умолчанию: 0,75</p></td>
     <td><p>Используйте более высокое значение, чтобы применить более сильную нормализацию длины. Используйте более низкое значение, чтобы уменьшить влияние длины документа на ранжирование.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Параметры поиска, специфичные для индекса<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>В следующей таблице перечислены параметры, которые можно настроить в <code translate="no">search_params.params</code> при <a href="/docs/ru/sparse-inverted-index.md#Search-on-index">поиске по индексу</a>.</p>
<table>
   <tr>
     <th><p>Параметр</p></th>
     <th><p>Описание</p></th>
     <th><p>Диапазон значений</p></th>
     <th><p>Рекомендации по настройке</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">drop_ratio_search</code></p></td>
     <td><p>Доля наименьших значений, которые следует игнорировать при поиске, что помогает уменьшить шум.</p></td>
     <td><p>Диапазон: [0,0; 1,0) (например, значение 0,2 игнорирует 20 % наименьших значений)</p></td>
     <td><p>Настройте этот параметр с учетом степени разреженности и уровня шума ваших векторов запроса.</p><p>Этот параметр контролирует долю значений с низкой величиной, отбрасываемых во время поиска. Увеличение этого значения (например, до <code translate="no">0.2</code>) может уменьшить шум и сфокусировать поиск на более значимых компонентах, что может повысить точность и эффективность. Однако отбрасывание большего количества значений также может снизить полноту охватывания за счет исключения потенциально релевантных сигналов. Выберите значение, обеспечивающее баланс между полнотой охватывания и точностью для вашей рабочей нагрузки.</p></td>
   </tr>
</table>
