---
id: hnsw-pq.md
title: HNSW_PQ
summary: >-
  HNSW_PQ использует графы Hierarchical Navigable Small World (HNSW) с Product
  Quantization (PQ), создавая передовой метод векторного индексирования, который
  предлагает контролируемый компромисс между размером и точностью. По сравнению
  с HNSW_SQ, этот тип индекса обеспечивает более высокий коэффициент запоминания
  при том же уровне сжатия, хотя при этом снижается скорость обработки запросов
  и увеличивается время построения индекса.
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
    </button></h1><p><strong>HNSW_PQ</strong> использует графы Hierarchical Navigable Small World (HNSW) с Product Quantization (PQ), создавая передовой метод векторного индексирования, который предлагает контролируемый компромисс между размером и точностью. По сравнению с <a href="/docs/ru/hnsw-sq.md">HNSW_SQ</a>, этот тип индекса обеспечивает более высокий коэффициент запоминания при том же уровне сжатия, хотя при этом снижается скорость обработки запросов и увеличивается время построения индекса.</p>
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
    </button></h2><p>HNSW_PQ сочетает в себе две техники индексирования: <strong>HNSW</strong> для быстрой навигации по графам и <strong>PQ</strong> для эффективного сжатия векторов.</p>
<h3 id="HNSW" class="common-anchor-header">HNSW</h3><p>HNSW строит многослойный граф, в котором каждый узел соответствует вектору в наборе данных. В этом графе узлы соединяются на основе их сходства, что позволяет быстро перемещаться по пространству данных. Иерархическая структура позволяет алгоритму поиска сузить круг соседей-кандидатов, что значительно ускоряет процесс поиска в высокоразмерных пространствах.</p>
<p>Дополнительную информацию см. на <a href="/docs/ru/hnsw.md">сайте HNSW</a>.</p>
<h3 id="PQ" class="common-anchor-header">PQ</h3><p>PQ - это техника сжатия векторов, которая разбивает высокоразмерные векторы на более мелкие подвекторы, которые затем квантуются и сжимаются. Сжатие значительно снижает требования к памяти и ускоряет вычисления расстояний.</p>
<p>Дополнительную информацию см. в разделе <a href="/docs/ru/ivf-pq.md#PQ">IVF_PQ</a>.</p>
<h3 id="HNSW-+-PQ" class="common-anchor-header">HNSW + PQ</h3><p>HNSW_PQ объединяет сильные стороны HNSW и PQ для эффективного приближенного поиска ближайших соседей. Алгоритм использует PQ для сжатия данных (что уменьшает расход памяти), а затем строит граф HNSW на этих сжатых векторах, чтобы обеспечить быстрый поиск кандидатов. В процессе поиска алгоритм может уточнять результаты поиска, используя более точные данные для повышения точности. Вот как работает этот процесс:</p>
<ol>
<li><p><strong>Сжатие данных</strong>: PQ разбивает каждый вектор на несколько подвекторов и квантует их с помощью кодовой книги центроидов, управляемой такими параметрами, как <code translate="no">m</code> (количество подвекторов) и <code translate="no">nbits</code> (биты на подвектор).</p></li>
<li><p><strong>Построение графа</strong>: Сжатые векторы затем используются для построения графа HNSW. Поскольку векторы хранятся в сжатом виде, результирующий граф обычно меньше, требует меньше памяти и может быть пройден быстрее, что значительно ускоряет этап поиска кандидатов.</p></li>
<li><p><strong>Поиск кандидатов</strong>: Когда выполняется запрос, алгоритм использует сжатые данные в графе HNSW для эффективного определения пула соседей-кандидатов. Такой поиск на основе графа значительно сокращает количество векторов, которые необходимо учитывать, что улучшает задержку запроса по сравнению с поиском методом "грубой силы".</p></li>
<li><p><strong>(Необязательно) Уточнение результатов</strong>: Первоначальные результаты поиска кандидатов могут быть уточнены для повышения точности на основе следующих параметров:</p>
<ul>
<li><p><code translate="no">refine</code>: Управляет тем, активирован ли этот шаг уточнения. Если установлено значение <code translate="no">true</code>, система пересчитывает расстояния, используя более точные или несжатые представления.</p></li>
<li><p><code translate="no">refine_type</code>: Определяет уровень точности данных, используемых при уточнении (например, SQ6, SQ8, BF16). Выбор более высокой точности, например <code translate="no">FP32</code>, может дать более точные результаты, но требует больше памяти. Эта точность должна превышать точность исходного набора сжатых данных на <code translate="no">sq_type</code>.</p></li>
<li><p><code translate="no">refine_k</code>: Действует как коэффициент увеличения. Например, если ваш топ <em>k</em> равен 100, а <code translate="no">refine_k</code> - 2, система переранжирует 200 лучших кандидатов и возвращает 100 лучших, повышая общую точность.</p></li>
</ul></li>
</ol>
<p>Полный список параметров и допустимых значений см. в разделе <a href="/docs/ru/hnsw-sq.md#Index-params">Index params</a>.</p>
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
    </button></h2><p>Чтобы построить индекс <code translate="no">HNSW_PQ</code> по векторному полю в Milvus, используйте метод <code translate="no">add_index()</code>, указав <code translate="no">index_type</code>, <code translate="no">metric_type</code> и дополнительные параметры для индекса.</p>
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
<li><p><code translate="no">index_type</code>: Тип индекса, который будет построен. В этом примере задайте значение <code translate="no">HNSW_PQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Метод, используемый для вычисления расстояния между векторами. Поддерживаются следующие значения: <code translate="no">COSINE</code>, <code translate="no">L2</code> и <code translate="no">IP</code>. Подробнее см. в разделе <a href="/docs/ru/metric.md">Типы метрик</a>.</p></li>
<li><p><code translate="no">params</code>: Дополнительные параметры конфигурации для построения индекса. Подробнее см. в разделе <a href="/docs/ru/hnsw-pq.md#Index-building-params">Параметры построения индекса</a>.</p></li>
</ul>
<p>После настройки параметров индекса вы можете создать индекс, используя метод <code translate="no">create_index()</code> напрямую или передавая параметры индекса в метод <code translate="no">create_collection</code>. Подробнее см. в разделе <a href="/docs/ru/create-collection.md">Создание коллекции</a>.</p>
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
    </button></h2><p>После того как индекс создан и сущности вставлены, можно выполнять поиск по сходству в индексе.</p>
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
<p>В этой конфигурации:</p>
<ul>
<li><code translate="no">params</code>: Дополнительные параметры конфигурации для поиска по индексу. Подробнее см. в разделе <a href="/docs/ru/hnsw-pq.md#Index-specific-search-params">Параметры поиска по индексу</a>.</li>
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
<h3 id="Index-building-params" class="common-anchor-header">Параметры построения индекса</h3><p>В следующей таблице перечислены параметры, которые можно настроить в <code translate="no">params</code> при <a href="/docs/ru/hnsw-pq.md#Build-index">построении индекса</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Параметр</p></th>
     <th><p>Описание</p></th>
     <th><p>Диапазон значений</p></th>
     <th><p>Предложение по настройке</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">M</code></p></td>
     <td><p>Максимальное количество связей （или ребер), которое может иметь каждый узел в графе, включая исходящие и входящие ребра. Этот параметр напрямую влияет как на построение индекса, так и на поиск.</p></td>
     <td><p><strong>Тип</strong>: Integer <strong>Диапазон</strong>: [2, 2048]</p>
<p><strong>Значение по умолчанию</strong>: <code translate="no">30</code> (до 30 исходящих и 30 входящих ребер на узел).</p></td>
     <td><p>Большее значение <code translate="no">M</code> обычно приводит к <strong>повышению точности</strong>, но <strong>увеличивает объем памяти</strong> и <strong>замедляет построение индекса и поиск</strong>. Рассмотрите возможность увеличения <code translate="no">M</code> для наборов данных с высокой размерностью или когда высокая запоминаемость имеет решающее значение.</p>
<p>Уменьшайте <code translate="no">M</code>, если важны расход памяти и скорость поиска.</p>
<p>В большинстве случаев мы рекомендуем устанавливать значение в этом диапазоне: [5, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>Количество соседей-кандидатов, рассматриваемых для соединения при построении индекса. Для каждого нового элемента оценивается больший пул кандидатов, но максимальное количество фактически установленных соединений по-прежнему ограничено <code translate="no">M</code>.</p></td>
     <td><p><strong>Тип</strong>: Integer <strong>Диапазон</strong>: [1, <em>int_max</em>].</p>
<p><strong>Значение по умолчанию</strong>: <code translate="no">360</code></p></td>
     <td><p>Более высокое значение <code translate="no">efConstruction</code> обычно приводит к <strong>более точному индексу</strong>, поскольку исследуется больше потенциальных соединений. Однако это также приводит к <strong>увеличению времени индексирования и потреблению памяти</strong> при построении индекса. Рассмотрите возможность увеличения <code translate="no">efConstruction</code> для повышения точности, особенно в сценариях, где время индексирования менее критично.</p>
<p>Уменьшите <code translate="no">efConstruction</code>, чтобы ускорить построение индекса, если ограничены ресурсы.</p>
<p>В большинстве случаев мы рекомендуем устанавливать значение в этом диапазоне: [50, 500].</p></td>
   </tr>
   <tr>
     <td><p>PQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>Количество подвекторов (используемых для квантования), на которые нужно разделить каждый высокоразмерный вектор в процессе квантования.</p></td>
     <td><p><strong>Тип</strong>: Целое число <strong>Диапазон</strong>: [1, 65536]</p>
<p><strong>Значение по умолчанию</strong>: Нет</p></td>
     <td><p>Большее значение <code translate="no">m</code> может повысить точность, но также увеличивает сложность вычислений и потребление памяти. <code translate="no">m</code> должно быть делителем размерности вектора<em>(D</em>), чтобы обеспечить правильное разложение. Обычно рекомендуемое значение <em>m = D/2</em>.</p>
<p>В большинстве случаев мы рекомендуем задавать значение в этом диапазоне: [D/8, D].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>Количество битов, используемых для представления индекса центроида каждого субвектора в сжатом виде. Оно напрямую определяет размер каждой кодовой книги. Каждая кодовая книга будет содержать $2^{\textit{nbits}}$ центроидов. Например, если <code translate="no">nbits</code> имеет значение 8, то каждый субвектор будет представлен 8-битным индексом центроида. Это позволяет иметь $2^8$ (256) возможных центроидов в кодовой книге для данного субвектора.</p></td>
     <td><p><strong>Тип</strong>: Целое число <strong>Диапазон</strong>: [1, 64]</p>
<p><strong>Значение по умолчанию</strong>: <code translate="no">8</code></p></td>
     <td><p>Большее значение <code translate="no">nbits</code> позволяет использовать большие кодовые книги, что потенциально приводит к более точному представлению исходных векторов. Однако это также означает использование большего количества битов для хранения каждого индекса, что приводит к меньшему сжатию. В большинстве случаев мы рекомендуем устанавливать значение в этом диапазоне: [1, 16].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>Булевский флаг, определяющий, будет ли применяться шаг уточнения при поиске. Уточнение заключается в повторном ранжировании исходных результатов путем вычисления точных расстояний между вектором запроса и кандидатами.</p></td>
     <td><p><strong>Тип</strong>: Boolean <strong>Диапазон</strong>: [<code translate="no">true</code>, <code translate="no">false</code>].</p>
<p><strong>Значение по умолчанию</strong>: <code translate="no">false</code></p></td>
     <td><p>Установите значение <code translate="no">true</code>, если важна высокая точность и вы можете смириться с небольшим замедлением времени поиска. Используйте <code translate="no">false</code>, если скорость является приоритетом, а незначительный компромисс в точности допустим.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>Определяет точность данных, используемых в процессе уточнения. Эта точность должна быть выше, чем точность сжатых векторов (заданная параметрами <code translate="no">m</code> и <code translate="no">nbits</code> ).</p></td>
     <td><p><strong>Тип</strong>: String <strong>Диапазон</strong>:[ <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code> ].</p>
<p><strong>Значение по умолчанию</strong>: None</p></td>
     <td><p>Используйте <code translate="no">FP32</code> для максимальной точности при больших затратах памяти или <code translate="no">SQ6</code>/<code translate="no">SQ8</code> для лучшего сжатия. <code translate="no">BF16</code> и <code translate="no">FP16</code> предлагают сбалансированную альтернативу.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Параметры поиска, специфичные для индекса</h3><p>В следующей таблице перечислены параметры, которые могут быть настроены в <code translate="no">search_params.params</code> при <a href="/docs/ru/hnsw-pq.md#Search-on-index">поиске по индексу</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Параметр</p></th>
     <th><p>Описание</p></th>
     <th><p>Диапазон значений</p></th>
     <th><p>Предложение по настройке</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>Управляет широтой поиска при поиске ближайших соседей. Он определяет, сколько вершин будет посещено и оценено как потенциальные ближайшие соседи. 
 Этот параметр влияет только на процесс поиска и применяется исключительно к нижнему слою графа.</p></td>
     <td><p><strong>Тип</strong>: Integer <strong>Диапазон</strong>: [1, <em>int_max</em>].</p>
<p><strong>Значение по умолчанию</strong>: <em>limit</em> (TopK ближайших соседей для возврата).</p></td>
     <td><p>Большее значение <code translate="no">ef</code> обычно приводит к <strong>повышению точности поиска</strong>, так как учитывается большее количество потенциальных соседей. Однако это также <strong>увеличивает время поиска</strong>. Рассматривайте возможность увеличения <code translate="no">ef</code>, когда достижение высокого показателя запоминания является критическим, а скорость поиска не так важна.</p>
<p>Рассмотрите возможность уменьшения <code translate="no">ef</code>, чтобы отдать предпочтение более быстрому поиску, особенно в сценариях, где небольшое снижение точности допустимо.</p>
<p>В большинстве случаев мы рекомендуем устанавливать значение в этом диапазоне: [K, 10K].</p></td>
   </tr>
   <tr>
     <td><p>PQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Коэффициент увеличения, который контролирует, сколько дополнительных кандидатов будет рассмотрено на этапе уточнения (реранжирования) по отношению к запрашиваемому топ K результатов.</p></td>
     <td><p><strong>Тип</strong>: Float <strong>Диапазон</strong>: [1, <em>float_max</em>].</p>
<p><strong>Значение по умолчанию</strong>: 1</p></td>
     <td><p>Более высокие значения <code translate="no">refine_k</code> могут улучшить отзыв и точность, но также увеличат время поиска и потребление ресурсов. Значение 1 означает, что в процессе уточнения учитываются только первые K результатов.</p></td>
   </tr>
</table>
