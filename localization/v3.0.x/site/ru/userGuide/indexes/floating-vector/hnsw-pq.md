---
id: hnsw-pq.md
title: HNSW_PQ
summary: >-
  HNSW_PQ использует иерархические навигационные графы «малого мира» (HNSW) в
  сочетании с квантованием продуктов (PQ), создавая усовершенствованный метод
  векторной индексации, который обеспечивает контролируемый компромисс между
  размером и точностью. По сравнению с HNSW_SQ этот тип индекса обеспечивает
  более высокий коэффициент полноты при том же уровне сжатия, хотя и сопряжён с
  более низкой скоростью обработки запросов и более длительным временем
  построения индекса.
---
<h1 id="HNSWPQ" class="common-anchor-header">HNSW_PQ<button data-href="#HNSWPQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>HNSW_PQ</strong> использует иерархические навигационные графы «малого мира» (HNSW) в сочетании с квантованием продуктов (PQ), создавая усовершенствованный метод векторной индексации, который обеспечивает контролируемый компромисс между размером и точностью. По сравнению с <a href="/docs/ru/hnsw-sq.md">HNSW_SQ</a> этот тип индекса обеспечивает более высокий коэффициент полноты при том же уровне сжатия, хотя и со сниженной скоростью обработки запросов и более длительным временем построения индекса.</p>
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
    </button></h2><p>HNSW_PQ сочетает в себе две технологии индексирования: <strong>HNSW</strong> для быстрой навигации на основе графов и <strong>PQ</strong> для эффективного сжатия векторов.</p>
<h3 id="HNSW" class="common-anchor-header">HNSW<button data-href="#HNSW" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSW строит многоуровневый граф, в котором каждый узел соответствует вектору в наборе данных. В этом графе узлы соединены на основе их сходства, что обеспечивает быстрый обход пространства данных. Иерархическая структура позволяет алгоритму поиска сужать круг потенциальных соседей, что значительно ускоряет процесс поиска в высокомерных пространствах.</p>
<p>Дополнительную информацию см. в разделе <a href="/docs/ru/hnsw.md">HNSW</a>.</p>
<h3 id="PQ" class="common-anchor-header">PQ<button data-href="#PQ" class="anchor-icon" translate="no">
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
    </button></h3><p>PQ — это метод сжатия векторов, при котором высокоразмерные векторы разбиваются на более мелкие подвекторы, которые затем квантуются и сжимаются. Сжатие значительно снижает требования к памяти и ускоряет вычисления расстояний.</p>
<p>Дополнительную информацию см. в разделе <a href="/docs/ru/ivf-pq.md#PQ">IVF_PQ</a>.</p>
<h3 id="HNSW-+-PQ" class="common-anchor-header">HNSW + PQ<button data-href="#HNSW-+-PQ" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSW_PQ объединяет преимущества HNSW и PQ, обеспечивая эффективный приближенный поиск ближайших соседей. Он использует PQ для сжатия данных (что снижает потребление памяти), а затем строит граф HNSW на основе этих сжатых векторов, что позволяет быстро находить кандидатов. В ходе поиска алгоритм может по желанию уточнять результаты-кандидаты с помощью данных более высокой точности для повышения точности. Вот как работает этот процесс:</p>
<ol>
<li><p><strong>Сжатие данных</strong>: PQ разбивает каждый вектор на несколько подвекторов и квантует их с помощью кодовой книги центроидов, управляемой такими параметрами, как « <code translate="no">m</code> » (количество подвекторов) и « <code translate="no">nbits</code> » (количество битов на подвектор).</p></li>
<li><p><strong>Построение графа</strong>: Затем сжатые векторы используются для построения графа HNSW. Поскольку векторы хранятся в сжатом виде, результирующий граф, как правило, меньше по размеру, требует меньше памяти и может просматриваться быстрее, что значительно ускоряет этап поиска кандидатов.</p></li>
<li><p><strong>Поиск кандидатов</strong>: при выполнении запроса алгоритм использует сжатые данные в графе HNSW для эффективного определения набора соседей-кандидатов. Такой поиск на основе графа резко сокращает количество векторов, которые необходимо рассмотреть, что улучшает задержку запроса по сравнению с поиском методом перебора.</p></li>
<li><p><strong>(Необязательно) Уточнение результатов</strong>: первоначальные результаты-кандидаты можно уточнить для повышения точности на основе следующих параметров:</p>
<ul>
<li><p><code translate="no">refine</code>: Управляет включением данного этапа уточнения. При значении « <code translate="no">true</code> » система пересчитывает расстояния с использованием представлений с более высокой точностью или несжатых представлений.</p></li>
<li><p><code translate="no">refine_type</code>: Указывает уровень точности данных, используемых при уточнении (например, SQ6, SQ8, BF16). Выбор более высокой точности, такой как « <code translate="no">FP32</code> », может дать более точные результаты, но требует большего объёма памяти. Этот уровень точности должен превышать точность исходного сжатого набора данных на величину, заданную параметром « <code translate="no">sq_type</code> ».</p></li>
<li><p><code translate="no">refine_k</code>: Выступает в качестве коэффициента увеличения. Например, если значение top <em>k</em> равно 100, а <code translate="no">refine_k</code> равно 2, система заново ранжирует 200 лучших кандидатов и возвращает 100 лучших, повышая общую точность.</p></li>
</ul></li>
</ol>
<p>Полный список параметров и допустимых значений см. в разделе <a href="/docs/ru/hnsw-sq.md#Index-params">«Параметры индекса</a>».</p>
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
    </button></h2><p>Чтобы построить индекс <code translate="no">HNSW_PQ</code> для векторного поля в Milvus, используйте метод <code translate="no">add_index()</code>, указав <code translate="no">index_type</code>, <code translate="no">metric_type</code> и дополнительные параметры для индекса.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW_PQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">30</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">360</span>, <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">384</span>, 
        <span class="hljs-string">&quot;nbits&quot;</span>: <span class="hljs-number">8</span>,
        <span class="hljs-string">&quot;refine&quot;</span>: true, <span class="hljs-comment"># Whether to enable the refinement step</span>
        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;SQ8&quot;</span> <span class="hljs-comment"># Precision level of data used for refinement</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>В данной конфигурации:</p>
<ul>
<li><p><code translate="no">index_type</code>: Тип создаваемого индекса. В данном примере установите значение <code translate="no">HNSW_PQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Метод, используемый для вычисления расстояния между векторами. Поддерживаемые значения: <code translate="no">COSINE</code>, <code translate="no">L2</code> и <code translate="no">IP</code>. Подробности см. в разделе <a href="/docs/ru/metric.md">«Типы метрик</a>».</p></li>
<li><p><code translate="no">params</code>: Дополнительные параметры конфигурации для построения индекса. Подробности см. в разделе <a href="/docs/ru/hnsw-pq.md#Index-building-params">«Параметры построения индекса</a>».</p></li>
</ul>
<p>После настройки параметров индекса можно создать индекс, непосредственно воспользовавшись методом ` <code translate="no">create_index()</code> ` или передав параметры индекса в методе ` <code translate="no">create_collection</code> `. Подробности см. в разделе <a href="/docs/ru/create-collection.md">«Создание коллекции</a>».</p>
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
    </button></h2><p>После построения индекса и вставки сущностей можно выполнять поиск по схожести в индексе.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Parameter controlling query time/accuracy trade-off</span>
        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">1</span> <span class="hljs-comment"># The magnification factor</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,  <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>В данной конфигурации:</p>
<ul>
<li><code translate="no">params</code>: Дополнительные параметры настройки для поиска по индексу. Подробности см. в разделе <a href="/docs/ru/hnsw-pq.md#Index-specific-search-params">«Параметры поиска, специфичные для индекса</a>».</li>
</ul>
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
    </button></h3><p>В следующей таблице перечислены параметры, которые можно настроить в <code translate="no">params</code> при <a href="/docs/ru/hnsw-pq.md#Build-index">построении индекса</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Параметр</p></th>
     <th><p>Описание</p></th>
     <th><p>Диапазон значений</p></th>
     <th><p>Рекомендации по настройке</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">M</code></p></td>
     <td><p>Максимальное количество связей (или ребер), которые может иметь каждый узел в графе, включая как исходящие, так и входящие ребра.
Этот параметр напрямую влияет как на построение индекса, так и на поиск.</p></td>
     <td><p><strong>Тип</strong>: Целое число
 <strong>Диапазон</strong>: [2, 2048]</p>
<p><strong>Значение по умолчанию</strong>: <code translate="no">30</code> (до 30 исходящих и 30 входящих ребер на узел)</p></td>
     <td><p>Более высокое значение <code translate="no">M</code> обычно обеспечивает <strong>более высокую точность</strong>, но <strong>увеличивает нагрузку на память</strong> и <strong>замедляет как построение индекса, так и поиск</strong>.
 Рассмотрите возможность увеличения значения <code translate="no">M</code> для наборов данных с высокой размерностью или в тех случаях, когда крайне важен высокий показатель recall.</p>
<p>Рассмотрите возможность уменьшения значения <code translate="no">M</code>, если основными приоритетами являются объем используемой памяти и скорость поиска.</p>
<p>В большинстве случаев мы рекомендуем устанавливать значение в пределах следующего диапазона: [5, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>Количество соседей-кандидатов, рассматриваемых для соединения при построении индекса.
 Для каждого нового элемента оценивается более обширный набор кандидатов, однако максимальное количество фактически устанавливаемых соединений по-прежнему ограничивается значением <code translate="no">M</code>.</p></td>
     <td><p><strong>Тип</strong>: Целое число
 <strong>Диапазон</strong>: [1, <em>int_max</em>]</p>
<p><strong>Значение по умолчанию</strong>: <code translate="no">360</code></p></td>
     <td><p>Более высокое значение параметра « <code translate="no">efConstruction</code> » обычно приводит к <strong>повышению точности индекса</strong>, так как просматривается больше потенциальных связей. Однако это также приводит к <strong>увеличению времени индексирования и объёма используемой памяти</strong> во время построения.
Рассмотрите возможность увеличения значения параметра « <code translate="no">efConstruction</code> » для повышения точности, особенно в тех случаях, когда время индексирования не является критическим фактором.</p>
<p>Рассмотрите возможность уменьшения значения <code translate="no">efConstruction</code> для ускорения построения индекса, если имеются ограничения по ресурсам.</p>
<p>В большинстве случаев мы рекомендуем устанавливать значение в пределах диапазона [50, 500].</p></td>
   </tr>
   <tr>
     <td><p>PQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>Количество подвекторов (используемых для квантования), на которые делится каждый высокоразмерный вектор в процессе квантования.</p></td>
     <td><p><strong>Тип</strong>: Целое число
 <strong>Диапазон</strong>: [1, 65536]</p>
<p><strong>Значение по умолчанию</strong>: нет</p></td>
     <td><p>Более высокое значение <code translate="no">m</code> может повысить точность, но также увеличивает вычислительную сложность и потребление памяти.
  Для обеспечения правильного разложения <code translate="no">m</code> должно быть делителем размерности вектора (<em>D</em>). Обычно рекомендуется значение <em>m = D/2</em>.</p>
<p>В большинстве случаев рекомендуется задавать значение в пределах диапазона: [D/8, D].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>Количество битов, используемых для представления индекса центроида каждого подвектора в сжатом виде. Оно напрямую определяет размер каждой кодовой книги.
 Каждая кодовая книга будет содержать<sup>2nbits</sup> центроидов. Например, если для параметра « <code translate="no">nbits</code> » установлено значение 8, каждый подвектор будет представлен 8-битным индексом центроида. Это позволяет иметь<sup>2⁸</sup> (256) возможных центроидов в кодовой книге для данного подвектора.</p></td>
     <td><p><strong>Тип</strong>: Целое число
 <strong>Диапазон</strong>: [1, 24]</p>
<p><strong>Значение по умолчанию</strong>: <code translate="no">8</code></p></td>
     <td><p>Более высокое значение параметра « <code translate="no">nbits</code> » позволяет создавать более объёмные кодовые книги, что потенциально приводит к более точному представлению исходных векторов. Однако это также означает использование большего количества битов для хранения каждого индекса, что приводит к снижению степени сжатия.
В большинстве случаев мы рекомендуем устанавливать значение в пределах диапазона: [1, 16].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>Булевый флаг, определяющий, применяется ли этап уточнения во время поиска. Уточнение включает в себя переранжирование первоначальных результатов путем вычисления точных расстояний между вектором запроса и кандидатами.</p></td>
     <td><p><strong>Тип</strong>: Булево значение
 <strong>Диапазон</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]</p>
<p><strong>Значение по умолчанию</strong>: <code translate="no">false</code></p></td>
     <td><p>Установите значение <code translate="no">true</code>, если требуется высокая точность и вы готовы смириться с немного более длительным временем поиска. Используйте значение <code translate="no">false</code>, если приоритетом является скорость и допустим небольшой компромисс в точности.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>Определяет точность данных, используемых в процессе уточнения.
 Эта точность должна быть выше, чем у сжатых векторов (установленная параметрами <code translate="no">m</code> и <code translate="no">nbits</code> ).</p></td>
     <td><p><strong>Тип</strong>: Строка
 <strong>Диапазон</strong>: [ <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code> ]</p>
<p><strong>Значение по умолчанию</strong>: нет</p></td>
     <td><p>Используйте <code translate="no">FP32</code> для максимальной точности при более высоких затратах памяти или <code translate="no">SQ6</code>/<code translate="no">SQ8</code> для лучшего сжатия. <code translate="no">BF16</code> и <code translate="no">FP16</code> предлагают сбалансированную альтернативу.</p></td>
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
    </button></h3><p>В следующей таблице перечислены параметры, которые можно настроить в <code translate="no">search_params.params</code> при <a href="/docs/ru/hnsw-pq.md#Search-on-index">поиске по индексу</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Параметр</p></th>
     <th><p>Описание</p></th>
     <th><p>Диапазон значений</p></th>
     <th><p>Рекомендации по настройке</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>Управляет шириной поиска при поиске ближайших соседей. Определяет, сколько узлов будет посещено и оценено в качестве потенциальных ближайших соседей. 
 Этот параметр влияет только на процесс поиска и применяется исключительно к нижнему уровню графа.</p></td>
     <td><p><strong>Тип</strong>: Целое число
 <strong>Диапазон</strong>: [1, <em>int_max</em>]</p>
<p><strong>Значение по умолчанию</strong>: <em>limit</em> (TopK ближайших соседей для возврата)</p></td>
     <td><p>Более высокое значение параметра « <code translate="no">ef</code> » обычно приводит к <strong>повышению точности поиска</strong>, так как учитывается больше потенциальных соседей. Однако это также <strong>увеличивает время поиска</strong>.
 Рассмотрите возможность увеличения значения параметра « <code translate="no">ef</code> », если достижение высокого показателя recall является критически важным, а скорость поиска не столь важна.</p>
<p>Рассмотрите возможность уменьшения значения <code translate="no">ef</code>, чтобы уделить приоритет более быстрому поиску, особенно в тех случаях, когда допустимо небольшое снижение точности.</p>
<p>В большинстве случаев мы рекомендуем устанавливать значение в пределах следующего диапазона: [K, 10K].</p></td>
   </tr>
   <tr>
     <td><p>PQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Коэффициент увеличения, определяющий, сколько дополнительных кандидатов будет рассмотрено на этапе уточнения (переранжирования) по сравнению с запрашиваемыми K лучшими результатами.</p></td>
     <td><p><strong>Тип</strong>: Float
 <strong>Диапазон</strong>: [1, <em>float_max</em>)</p>
<p><strong>Значение по умолчанию</strong>: 1</p></td>
     <td><p>Более высокие значения параметра « <code translate="no">refine_k</code> » могут улучшить полноту и точность, но также увеличат время поиска и потребление ресурсов. Значение 1 означает, что в процессе уточнения учитываются только первоначальные K лучших результатов.</p></td>
   </tr>
</table>
