---
id: aisaq.md
title: AISAQCompatible with Milvus 2.6.4+
summary: >-
  AISAQ - это дисковый векторный индекс, который расширяет возможности DISKANN
  для работы с миллиардными массивами данных, не выходя за пределы оперативной
  памяти. В отличие от DISKANN, который хранит сжатые векторы в памяти, AISAQ
  хранит все данные на диске, предлагая два режима для баланса
  производительности и стоимости хранения.
beta: Milvus 2.6.4+
---
<h1 id="AISAQ" class="common-anchor-header">AISAQ<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#AISAQ" class="anchor-icon" translate="no">
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
    </button></h1><p>AISAQ - это дисковый векторный индекс, который расширяет возможности <a href="/docs/ru/diskann.md">DISKANN</a> для работы с миллиардными массивами данных при минимальной занимаемой площади DRAM.</p>
<p>В отличие от DISKANN, которая хранит сжатые векторы в памяти, AISAQ спроектирована с "почти нулевой архитектурой DRAM", что означает хранение всех структур данных на SSD.</p>
<p>AISAQ позволяет работать с базами данных сверхвысокого масштаба на стандартных серверах, предлагая режимы работы, позволяющие сбалансировать производительность и стоимость хранения данных.</p>
<h2 id="How-AISAQ-works" class="common-anchor-header">Принцип работы AISAQ<button data-href="#How-AISAQ-works" class="anchor-icon" translate="no">
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
    </button></h2><p>На диаграмме выше сравниваются схемы хранения данных <strong>DISKANN</strong>, <strong>AISAQ-Performance</strong> и <strong>AISAQ-Scale</strong>, показывающие, как данные (необработанные векторы, списки ребер и PQ-коды) распределяются между оперативной памятью и диском.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/aisaq-vs-diskann.png" alt="Aisaq Vs Diskann" class="doc-image" id="aisaq-vs-diskann" />
   </span> <span class="img-wrapper"> <span>Aisaq Vs Diskann</span> </span></p>
<h3 id="Foundation-DISKANN-recap" class="common-anchor-header">Основание: Обзор DISKANN<button data-href="#Foundation-DISKANN-recap" class="anchor-icon" translate="no">
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
    </button></h3><p>В DISKANN необработанные векторы и списки граней хранятся на диске, а векторы, сжатые в PQ-коды, - в памяти (DRAM).</p>
<p>Когда DISKANN переходит к узлу (например, <em>вектору 0</em>):</p>
<ul>
<li><p>Он загружает с диска необработанный вектор<strong>(raw_vector_0</strong>) и его список граней<strong>(edgelist_0</strong>).</p></li>
<li><p>Список ребер указывает, каких соседей следует посетить в следующий раз (узлы 2, 3 и 5 в данном примере).</p></li>
<li><p>Необработанный вектор используется для вычисления точного расстояния до вектора запроса для ранжирования.</p></li>
<li><p>Данные PQ в памяти используются для фильтрации приблизительного расстояния, чтобы направить следующий обход.</p></li>
</ul>
<p>Поскольку данные PQ уже кэшированы в DRAM, каждое посещение узла требует только одного дискового ввода-вывода, что обеспечивает высокую скорость выполнения запроса при умеренном использовании памяти.</p>
<p>Подробное описание этих компонентов и параметров см. в разделе <a href="/docs/ru/diskann.md">ДИСКАНН</a>.</p>
<h3 id="AISAQ-Operation-Modes" class="common-anchor-header">Режимы работы AISAQ<button data-href="#AISAQ-Operation-Modes" class="anchor-icon" translate="no">
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
    </button></h3><p>AISAQ предлагает два режима работы для решения двух различных задач:</p>
<p>Режим производительности: оптимизирован для приложений, которым требуется низкая задержка и высокая пропускная способность в масштабе, таких как онлайновый семантический поиск.</p>
<p>Режим масштабирования: оптимизирован для приложений с более мягкими ограничениями по задержкам, таких как RAG и автономный семантический поиск, и позволяет экономически эффективно расширять наборы данных до сверхвысоких масштабов.</p>
<h4 id="AISAQ-performance-mode" class="common-anchor-header">Режим AISAQ-performance</h4><p><strong>AISAQ-performance</strong> достигает "почти нулевого следа DRAM" за счет перемещения данных PQ из памяти на диск при сохранении низкого IOPS благодаря размещению данных и резервированию.</p>
<ul>
<li><p>Необработанный вектор каждого узла, список ребер и PQ-данные его соседей хранятся вместе на диске.</p></li>
<li><p>Такая компоновка гарантирует, что посещение узла (например, вектора 0) потребует только одного дискового ввода-вывода.</p></li>
<li><p>Поскольку данные PQ хранятся в избытке вблизи нескольких узлов, размер индексного файла значительно увеличивается, занимая больше места на диске.</p></li>
</ul>
<h4 id="AISAQ-scale-mode" class="common-anchor-header">Режим AISAQ-scale</h4><p><strong>AISAQ-scale</strong> нацелен на снижение использования дискового пространства при соблюдении требований к производительности целевых приложений.</p>
<p>В этом режиме:</p>
<ul>
<li><p>PQ-данные хранятся на диске отдельно, без избыточности.</p></li>
<li><p>Такая конструкция минимизирует размер индекса, но приводит к увеличению количества операций ввода-вывода при обходе графа.</p></li>
<li><p>Чтобы снизить нагрузку на IOPS, AISAQ использует две оптимизации:</p>
<ul>
<li><p>Алгоритм перестановки, который сортирует векторы PQ по приоритету для улучшения локальности данных.</p></li>
<li><p>Кэш PQ в DRAM (pq_read_page_cache_size), который кэширует часто используемые данные PQ.</p></li>
</ul></li>
</ul>
<h2 id="Example-configuration" class="common-anchor-header">Пример конфигурации<button data-href="#Example-configuration" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">AISAQ:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">max_degree:</span> <span class="hljs-number">56</span> <span class="hljs-comment"># Controls the maximum number of connections (edges) each data point can have in the Vamana graph</span>
      <span class="hljs-attr">search_list_size:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># During index construction, this parameter defines the size of the candidate pool used when searching for the nearest neighbors for each node. For every node being added to the graph, the algorithm maintains a list of the search_list_size best candidates found so far. The search for neighbors stops when this list can no longer be improved. From this final candidate pool, the top max_degree nodes are selected to form the final edges</span>
      <span class="hljs-attr">inline_pq:</span> <span class="hljs-number">-1</span> <span class="hljs-comment"># Number of PQ vectors stored inline per Index node (read when node is accessed, to reduce IO)</span>
      <span class="hljs-attr">rearrange:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Re-arrange the PQ vectors data structure to improve data locality and reduce disk accesses during search (ignored in performance mode)</span>
      <span class="hljs-attr">num_entry_points:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># Number of candidate entry points to optimize search entry-point selection</span>
      <span class="hljs-attr">pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.125</span> <span class="hljs-comment"># Controls the size of the PQ codes (compressed representations of data points) compared to the size of the uncompressed data</span>
      <span class="hljs-attr">disk_pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.25</span> <span class="hljs-comment"># Controls the size of the PQ codes of the high precision vectors stored in the index (used for re-ranking), compared to the size of the uncompressed data</span>
      <span class="hljs-attr">pq_cache_size:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># PQ vectors cache size in DRAM (bytes). The PQ vectors cache is loaded during Index load and used during search to reduce IOs (ignored in performance mode)</span>
      <span class="hljs-attr">search_cache_budget_gb_ratio:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># Controls the amount of DRAM to be used for caching frequently accessed index nodes. This cache is loaded during index load and used during search to reduce IOs</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">search_list:</span> <span class="hljs-number">16</span> <span class="hljs-comment"># During a search operation, this parameter determines the size of the candidate pool that the algorithm maintains as it traverses the graph. A larger value increases the chances of finding the true nearest neighbors (higher recall) but also increases search latency</span>
      <span class="hljs-attr">beamwidth:</span> <span class="hljs-number">8</span> <span class="hljs-comment"># Controls the degree of parallelism during search by determining the maximum number of parallel disk I/O requests to read the index nodes</span>
      <span class="hljs-attr">vectors_beamwidth:</span> <span class="hljs-number">1</span> <span class="hljs-comment"># Controls the degree of parallelism during search by determining the maximum number of parallel disk I/O requests to read groups of neighboring PQ vectors (ignored in performance mode)</span>
      <span class="hljs-attr">pq_read_page_cache_size:</span> <span class="hljs-number">5242880</span> <span class="hljs-string">(5MiB)</span> <span class="hljs-comment"># PQ read cache size in DRAM per search thread (bytes). It caches frequently accessed data pages containing PQ vectors (ignored in performance mode and applicable only when rearrange is true). The PQ read cache memory is reused across all AISAQ segments</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="AISAQ-parameters" class="common-anchor-header">Параметры AISAQ<button data-href="#AISAQ-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>AISAQ наследует некоторые параметры от DISKANN - <code translate="no">max_degree</code>, <code translate="no">search_list_size</code>, и <code translate="no">pq_code_budget_gb_ratio</code>.</p>
<h3 id="Index-building-params" class="common-anchor-header">Параметры построения индексов<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Эти параметры влияют на то, как строится индекс AISAQ. Их настройка может повлиять на размер индекса, время построения и качество поиска.</p>
<table>
   <tr>
     <th><p>Параметр</p></th>
     <th><p>Описание</p></th>
     <th><p>Диапазон значений</p></th>
     <th><p>Предложение по настройке</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">max_degree</code></p></td>
     <td><p>Управляет максимальным количеством связей (ребер), которое может иметь каждая точка данных в графе Vamana.</p></td>
     <td><p><strong>Тип</strong>: Целое число</p><p><strong>Диапазон</strong>: [1, 512]</p><p><strong>Значение по умолчанию</strong>: <code translate="no">56</code></p></td>
     <td><p>Более высокие значения создают более плотные графики, что потенциально повышает запоминаемость (поиск более релевантных результатов), но также увеличивает расход памяти и время построения. В большинстве случаев мы рекомендуем устанавливать значение в этом диапазоне: [10, 100].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_list_size</code></p></td>
     <td><p>При построении индекса этот параметр определяет размер пула кандидатов, используемого при поиске ближайших соседей для каждого узла. Для каждого узла, добавляемого в граф, алгоритм ведет список найденных на данный момент лучших кандидатов search_list_size. Поиск соседей прекращается, когда этот список больше не может быть улучшен. Из этого пула кандидатов выбираются узлы с максимальным числом градусов для формирования финальных ребер.</p></td>
     <td><p><strong>Тип</strong>: Целое число</p><p><strong>Диапазон</strong>: [1, 512]</p><p><strong>Значение по умолчанию</strong>: <code translate="no">100</code></p></td>
     <td><p>Больший размер search_list_size увеличивает вероятность нахождения истинных ближайших соседей для каждого узла, что может привести к получению более качественного графа и повышению эффективности поиска (recall). Однако за это приходится платить значительно большим временем построения индекса. Это значение всегда должно быть больше или равно max_degree.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">inline_pq</code></p></td>
     <td><p>Количество векторов PQ, хранящихся в строке для каждого узла индекса (считываются при обращении к узлу, чтобы сократить количество операций ввода-вывода)</p></td>
     <td><p><strong>Тип</strong>: Integer</p><p><strong>Диапазон</strong>: [0, <em>max_degree</em>].</p><p><strong>Значение по умолчанию</strong>: <code translate="no">-1</code></p></td>
     <td><p>Большие значения <code translate="no">inline_pq</code> повышают производительность, но увеличивают дисковое пространство.</p><p>Установите <code translate="no">inline_pq</code>=0 для работы AISAQ в режиме масштабирования.</p><p>Установите <code translate="no">inline_pq</code>=-1, чтобы автоматически заполнить все неиспользуемое пространство в индексе векторами PQ для дальнейшей оптимизации AISAQ в режиме масштабирования.</p><p>Установите <code translate="no">inline_pq</code><em>=max_degree</em> для AISAQ в режиме производительности.</p><p><code translate="no">inline_pq</code> Настройки в диапазоне от 0 до <em>max_degree</em> позволяют регулировать баланс между производительностью и потреблением дискового пространства.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rearrange</code></p></td>
     <td><p>Переупорядочить структуру данных векторов PQ для улучшения локальности данных и уменьшения обращений к диску во время поиска (игнорируется в режиме производительности).</p></td>
     <td><p><strong>Тип</strong>: Булево</p><p><strong>Диапазон</strong>: [true, false].</p><p><strong>Значение по умолчанию</strong>: <code translate="no">true</code></p></td>
     <td><p>Если значение true, уменьшает количество операций ввода-вывода во время поиска с незначительным увеличением объема памяти и времени построения индекса.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">num_entry_points</code></p></td>
     <td><p>Количество точек входа-кандидатов для оптимизации выбора точки входа в поиск.</p></td>
     <td><p><strong>Тип</strong>: Integer</p><p><strong>Диапазон</strong>: [0, 1000]</p><p><strong>Значение по умолчанию</strong>: <code translate="no">100</code></p></td>
     <td><p>Большие значения могут сократить время поиска за счет начала поиска с более близкой точки входа.</p><p>Задайте более высокие значения для больших сегментов (например, для векторов размером 10 М и выше используйте значение 1000).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_code_budget_gb_ratio</code></p></td>
     <td><p>Управляет размером PQ-кодов (сжатых представлений точек данных) по сравнению с размером несжатых данных.</p></td>
     <td><p><strong>Тип</strong>: Float</p><p><strong>Диапазон</strong>: (0.0, 0.25]</p><p><strong>Значение по умолчанию</strong>: <code translate="no">0.125</code></p></td>
     <td><p>Более высокий коэффициент приводит к более точным результатам поиска, эффективно сохраняя больше информации об исходных векторах, но увеличивает вычислительную сложность при поиске.</p><p>В большинстве случаев рекомендуется задавать значение в этом диапазоне: (0.0417, 0.25].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disk_pq_code_budget_gb_ratio</code></p></td>
     <td><p>Контролирует размер PQ-кодов высокоточных векторов, хранящихся в индексе (используется для повторного ранжирования), по сравнению с размером несжатых данных.</p></td>
     <td><p><strong>Тип</strong>: Float</p><p><strong>Диапазон</strong>: [0, 0.25]</p><p><strong>Значение по умолчанию</strong>: <code translate="no">0.25</code></p></td>
     <td><p>При значении по умолчанию 0,25 векторы будут квантованы до 25 % от их исходного размера (сжатие 4×), что уменьшает занимаемую площадь на диске при относительно минимальном влиянии на точность.</p><p>Установите значение 0, чтобы хранить векторы с полной точностью в дисковом индексе для повторного ранжирования. Большее значение обеспечивает более высокий коэффициент отзыва, но увеличивает использование диска.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_cache_size</code></p></td>
     <td><p>Размер кэша векторов PQ в DRAM (байты). Кэш векторов PQ загружается во время загрузки индекса и используется во время поиска для уменьшения количества операций ввода-вывода (игнорируется в режиме производительности).</p></td>
     <td><p><strong>Тип</strong>: Целое число</p><p><strong>Диапазон</strong>: [0, 1073741824]</p><p><strong>Значение по умолчанию</strong>: <code translate="no">0</code></p></td>
     <td><p>Увеличение объема кэша повышает производительность запросов, но увеличивает расход DRAM.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_cache_budget_gb_ratio</code></p></td>
     <td><p>Контролирует объем DRAM, который будет использоваться для кэширования часто обращающихся узлов индекса.</p><p>Этот кэш загружается во время загрузки индекса и используется во время поиска для уменьшения количества операций ввода-вывода.</p></td>
     <td><p><strong>Тип</strong>: Float</p><p><strong>Диапазон</strong>: [0.0, 0.3)</p><p><strong>Значение по умолчанию</strong>: <code translate="no">0</code></p></td>
     <td><p>При большем значении выделяется больше памяти для кэширования, что уменьшает количество обращений к диску, но потребляет больше системной памяти. Меньшее значение использует меньше памяти для кэширования, потенциально увеличивая потребность в обращении к диску.</p></td>
   </tr>
</table>
<h3 id="Index-search-params" class="common-anchor-header">Параметры индексного поиска<button data-href="#Index-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Эти параметры влияют на то, как AISAQ выполняет поиск. Их настройка может повлиять на скорость поиска, задержку и использование ресурсов.</p>
<table>
   <tr>
     <th><p>Параметр</p></th>
     <th><p>Описание</p></th>
     <th><p>Диапазон значений</p></th>
     <th><p>Предложение по настройке</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">search_list</code></p></td>
     <td><p>Во время поиска этот параметр определяет размер пула кандидатов, который алгоритм сохраняет по мере прохождения графа. Большее значение увеличивает шансы найти истинных ближайших соседей (более высокий отзыв), но также увеличивает задержку поиска.</p></td>
     <td><p><strong>Тип</strong>: Целое число</p><p><strong>Диапазон</strong>: [topk, int32_max].</p><p><strong>Значение по умолчанию</strong>: <code translate="no">16</code></p></td>
     <td><p>Для достижения хорошего баланса между производительностью и точностью рекомендуется установить это значение равным или немного большим, чем количество результатов, которые вы хотите получить (top_k).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">beamwidth</code></p></td>
     <td><p>Управляет степенью параллелизма при поиске, определяя максимальное количество параллельных запросов ввода-вывода на диск для чтения узлов индекса.</p></td>
     <td><p><strong>Тип</strong>: Целое число</p><p><strong>Диапазон</strong>: [1, 16]</p><p><strong>Значение по умолчанию</strong>: <code translate="no">8</code></p></td>
     <td><p>Более высокие значения увеличивают параллелизм, что может ускорить поиск в системах с мощными процессорами и твердотельными накопителями. Однако слишком высокое значение может привести к чрезмерной нагрузке на ресурсы.</p><p>В большинстве случаев мы рекомендуем устанавливать значение 2.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectors_beamwidth</code></p></td>
     <td><p>Управляет степенью параллелизма при поиске, определяя максимальное количество параллельных запросов дискового ввода-вывода для чтения групп соседних векторов PQ (игнорируется в режиме производительности).</p></td>
     <td><p><strong>Тип</strong>: Целое число</p><p><strong>Диапазон</strong>: [1, 4] должно быть &lt;= <em>beamwidth</em></p><p><strong>Значение по умолчанию</strong>: <code translate="no">1</code></p></td>
     <td><p>Большие значения увеличивают параллелизм, что может ускорить поиск на системах с мощными процессорами и SSD. Однако слишком высокое значение может привести к чрезмерному потреблению ресурсов, так как каждая соседняя группа векторов PQ может содержать до max_degree векторов.</p><p>В большинстве случаев мы рекомендуем устанавливать значение 1.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_read_page_cache_size</code></p></td>
     <td><p>Размер кэша чтения PQ в DRAM на один поток поиска (байты). В нем кэшируются часто используемые страницы данных, содержащие векторы PQ (игнорируется в режиме производительности и применяется только в том случае, если значение rearrange равно true).</p><p>Кэш-память для чтения PQ повторно используется во всех сегментах AISAQ.</p></td>
     <td><p><strong>Тип</strong>: Целое число</p><p><strong>Диапазон</strong>: [0, 33554432]</p><p><strong>Значение по умолчанию</strong>: <code translate="no">5242880 (5MiB)</code></p></td>
     <td><p>Увеличение объема кэша повышает производительность запросов, но увеличивает расход DRAM.</p><p>Рекомендуемые значения: 2 Мбайт для малых сегментов (1 М векторов), 5 Мбайт для средних сегментов (50 М векторов) и 10 Мбайт для больших сегментов (250 М векторов).</p></td>
   </tr>
</table>
