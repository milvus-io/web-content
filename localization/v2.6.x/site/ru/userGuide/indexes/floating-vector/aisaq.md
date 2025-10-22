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
    </button></h1><p>AISAQ - это дисковый векторный индекс, который расширяет возможности <a href="/docs/ru/diskann.md">DISKANN</a> для работы с миллиардными массивами данных без превышения лимита оперативной памяти. В отличие от DISKANN, который хранит сжатые векторы в памяти, AISAQ хранит все данные на диске, предлагая два режима для баланса производительности и стоимости хранения.</p>
<p>Используйте AISAQ, если ваш векторный набор данных слишком велик и не помещается в оперативной памяти, или если вам нужно оптимизировать расходы на инфраструктуру, пожертвовав производительностью запросов ради снижения требований к памяти.</p>
<h2 id="How-AISAQ-works" class="common-anchor-header">Как работает AISAQ<button data-href="#How-AISAQ-works" class="anchor-icon" translate="no">
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
    </button></h2><p>На приведенной выше диаграмме сравниваются схемы хранения данных <strong>DISKANN</strong>, <strong>AISAQ-Performance</strong> и <strong>AISAQ-Scale</strong>, показывающие, как данные (необработанные векторы, списки ребер и PQ-коды) распределяются между оперативной памятью и диском.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/aisaq-vs-diskann.png" alt="Aisaq Vs Diskann" class="doc-image" id="aisaq-vs-diskann" />
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
<p>Подробное объяснение этих компонентов и параметров см. в разделе <a href="/docs/ru/diskann.md">ДИСКАНН</a>.</p>
<h3 id="AISAQ-modes" class="common-anchor-header">Режимы AISAQ<button data-href="#AISAQ-modes" class="anchor-icon" translate="no">
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
    </button></h3><p>AISAQ предлагает две стратегии хранения данных на дисках. Основное различие заключается в том, как хранятся данные, сжатые в PQ.</p>
<h4 id="AISAQ-performance" class="common-anchor-header">AISAQ-performance</h4><p><strong>AISAQ-performance</strong> обеспечивает полностью дисковое хранение, перемещая данные PQ из памяти на диск и поддерживая низкий показатель IOPS за счет размещения данных и резервирования.</p>
<p>В этом режиме:</p>
<ul>
<li><p>Необработанный вектор каждого узла, список ребер и PQ-данные его соседей хранятся вместе на диске.</p></li>
<li><p>Такая компоновка гарантирует, что посещение узла (например, <em>вектора 0</em>) потребует только одного дискового ввода-вывода.</p></li>
<li><p>Однако из-за избыточного хранения данных PQ вблизи нескольких узлов размер индексного файла значительно увеличивается, занимая больше места на диске.</p></li>
</ul>
<h4 id="AISAQ-scale" class="common-anchor-header">AISAQ-scale</h4><p><strong>AISAQ-scale</strong> нацелен на <em>сокращение использования дискового пространства</em> при сохранении всех данных на диске.</p>
<p>В этом режиме:</p>
<ul>
<li><p>PQ-данные хранятся на диске отдельно, без избыточности.</p></li>
<li><p>Такая конструкция минимизирует размер индекса, но приводит к увеличению количества операций ввода-вывода при обходе графа.</p></li>
<li><p>Чтобы снизить нагрузку на IOPS, AISAQ применяет две оптимизации:</p>
<ul>
<li><p>Стратегия перестановки, которая сортирует векторы PQ по приоритету для улучшения локальности данных.</p></li>
<li><p>Кэш PQ в DRAM (pq_cache_size), который кэширует часто используемые данные PQ.</p></li>
</ul></li>
</ul>
<p>В результате AISAQ-scale достигает большей эффективности хранения, но меньшей производительности, чем DISKANN или AISAQ-Performance.</p>
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
      <span class="hljs-attr">max_degree:</span> <span class="hljs-number">56</span> <span class="hljs-comment"># Maximum degree of the Vamana graph</span>
      <span class="hljs-attr">pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.125</span> <span class="hljs-comment"># Size limit on the PQ code (compared with raw data)</span>
      <span class="hljs-attr">search_list_size:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># Size of the candidate list during building graph</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">beam_width_ratio:</span> <span class="hljs-number">4</span> <span class="hljs-comment"># Ratio between the maximum number of IO requests per search iteration and CPU number</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="AISAQ-specific-parameters" class="common-anchor-header">Специфические для AISAQ параметры<button data-href="#AISAQ-specific-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>AISAQ наследует многие параметры от DISKANN. Чтобы избежать избыточности, ниже подробно описаны только специфические для AISAQ параметры. Описание общих параметров, таких как <code translate="no">max_degree</code>, <code translate="no">pq_code_budget_gb_ratio</code>, <code translate="no">search_list_size</code> и <code translate="no">beam_width_ratio</code>, см. в разделе <a href="/docs/ru/diskann.md#DISKANN-params">DISKANN</a>.</p>
<table>
   <tr>
     <th><p>Параметр</p></th>
     <th><p>Описание</p></th>
     <th><p>Диапазон значений</p></th>
     <th><p>Предложение по настройке</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inline_pq</code></p></td>
     <td><p>Количество векторов PQ, хранящихся в режиме inline на каждом узле. Определяет расположение хранилища (режим Performance vs. Scale).</p></td>
     <td><p><strong>Тип</strong>: Целое число</p><p><strong>Диапазон</strong>: [0, <em>max_degree</em>].</p><p><strong>Значение по умолчанию</strong>: <code translate="no">-1</code></p></td>
     <td><p>Чем ближе <code translate="no">inline_pq</code> к <em>max_degree</em>, тем выше производительность, но размер индексного файла значительно увеличивается.</p><p>Когда <code translate="no">inline_pq</code> приближается к 0, производительность снижается, а размер индекса становится таким же, как у DISKANN.</p><p><strong>Примечание</strong>: Это сильно зависит от производительности диска. Если производительность диска низкая, не рекомендуется включать эту опцию, так как ограниченная пропускная способность диска может стать узким местом и снизить общую производительность.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rearrange</code></p></td>
     <td><p>Включает сортировку векторов PQ по приоритету для улучшения локальности ввода-вывода.</p></td>
     <td><p><strong>Тип</strong>: Булево</p><p><strong>Диапазон</strong>: [true, false].</p><p><strong>Значение по умолчанию</strong>: <code translate="no">false</code></p></td>
     <td><p>Сокращает ввод/вывод запросов, но увеличивает время создания индекса.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_cache_size</code></p></td>
     <td><p>Размер кэша PQ в DRAM (байты).</p></td>
     <td><p><strong>Тип</strong>: Целое число</p><p><strong>Диапазон</strong>: [0, 1&lt;&lt;30]</p><p><strong>Значение по умолчанию</strong>: <code translate="no">0</code></p></td>
     <td><p>Увеличение объема кэша повышает производительность запросов, но увеличивает расход DRAM.</p></td>
   </tr>
</table>
<h2 id="Considerations" class="common-anchor-header">Соображения<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>Производительность диска имеет значение. AISAQ сильно зависит от IOPS SSD; плохое хранение может снизить QPS.</p></li>
<li><p>Режим AISAQ-performance ≈ DISKANN latency, но может потребовать в несколько раз больше дискового пространства.</p></li>
<li><p>Масштабный режим AISAQ подходит для автономного поиска или архивации данных, где QPS не так важен.</p></li>
</ul>
