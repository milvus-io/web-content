---
id: gpu_index.md
related_key: gpu_index
summary: Механизм индексации GPU в Milvus.
title: Индекс GPU
---
<h1 id="GPU-Index" class="common-anchor-header">Индекс GPU<button data-href="#GPU-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus поддерживает различные типы GPU-индексов для повышения производительности и эффективности поиска, особенно в сценариях с высокой пропускной способностью и большим количеством обращений. В этой теме представлен обзор типов GPU-индексов, поддерживаемых Milvus, их подходящих вариантов использования и характеристик производительности. Информацию о создании индексов с помощью GPU см. в разделе <a href="/docs/ru/index-with-gpu.md">Индекс с GPU</a>.</p>
<p>Важно отметить, что использование GPU-индекса не обязательно снизит задержку по сравнению с использованием CPU-индекса. Если вы хотите полностью увеличить пропускную способность, вам потребуется очень высокое давление запросов или большое количество векторов запросов.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/gpu_index.png" alt="performance" class="doc-image" id="performance" />
   </span> <span class="img-wrapper"> <span>производительность</span> </span></p>
<p>Поддержка GPU в Milvus обеспечивается командой Nvidia <a href="https://rapids.ai/">RAPIDS</a>. Ниже перечислены типы GPU-индексов, поддерживаемые Milvus в настоящее время.</p>
<h2 id="GPUCAGRA" class="common-anchor-header">GPU_CAGRA<button data-href="#GPUCAGRA" class="anchor-icon" translate="no">
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
    </button></h2><p>GPU_CAGRA - это графовый индекс, оптимизированный для GPU. Использование GPU класса inference для запуска GPU-версии Milvus может быть более экономичным по сравнению с использованием дорогих GPU класса training.</p>
<ul>
<li><p>Параметры построения индекса</p>
<table>
<thead>
<tr><th>Параметр</th><th>Описание</th><th>Значение по умолчанию</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">intermediate_graph_degree</code></td><td>Влияет на запоминание и время построения, определяя степень графа перед обрезкой. Рекомендуемые значения: <code translate="no">32</code> или <code translate="no">64</code>.</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">graph_degree</code></td><td>Влияет на производительность поиска и запоминание, определяя степень графа после обрезки. Большая разница между этими двумя степенями приводит к увеличению времени построения. Его значение должно быть меньше значения <strong>intermediate_graph_degree</strong>.</td><td><code translate="no">64</code></td></tr>
<tr><td><code translate="no">build_algo</code></td><td>Выбирает алгоритм генерации графа перед обрезкой. Возможные значения:</br><code translate="no">IVF_PQ</code>: : Обеспечивает более высокое качество, но меньшее время построения.</br> <code translate="no">NN_DESCENT</code>: Обеспечивает более быстрое построение с потенциально более низким отзывом.</td><td><code translate="no">IVF_PQ</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>Решает, кэшировать ли исходный набор данных в памяти GPU. Возможные значения:</br><code translate="no">“true”</code>: Кэширует исходный набор данных, чтобы повысить запоминаемость за счет уточнения результатов поиска.</br> <code translate="no">“false”</code>: Не кэширует исходный набор данных для экономии памяти GPU.</td><td><code translate="no">“false”</code></td></tr>
<tr><td><code translate="no">adapt_for_cpu</code></td><td>Определяет, использовать ли GPU для построения индексов и CPU для поиска. <br/>Установка этого параметра в значение <code translate="no">true</code> требует наличия параметра <code translate="no">ef</code> в поисковых запросах.</td><td><code translate="no">“false”</code></td></tr>
</tbody>
</table>
</li>
<li><p>Параметры поиска</p>
<table>
<thead>
<tr><th>Параметр</th><th>Описание</th><th>Значение по умолчанию</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">itopk_size</code></td><td>Определяет размер промежуточных результатов, сохраняемых во время поиска. Большее значение может улучшить запоминание за счет снижения производительности поиска. Оно должно быть, по крайней мере, равно конечному значению top-k (limit) и, как правило, равно 2 (например, 16, 32, 64, 128).</td><td>Пустой</td></tr>
<tr><td><code translate="no">search_width</code></td><td>Определяет количество точек входа в граф CAGRA во время поиска. Увеличение этого значения может улучшить запоминание, но может повлиять на производительность поиска (например, 1, 2, 4, 8, 16, 32).</td><td>Empty</td></tr>
<tr><td><code translate="no">min_iterations</code> / <code translate="no">max_iterations</code></td><td>Управляет процессом итерации поиска. По умолчанию они установлены на <code translate="no">0</code>, и CAGRA автоматически определяет количество итераций на основе <code translate="no">itopk_size</code> и <code translate="no">search_width</code>. Настройка этих значений вручную может помочь сбалансировать производительность и точность.</td><td><code translate="no">0</code></td></tr>
<tr><td><code translate="no">team_size</code></td><td>Указывает количество потоков CUDA, используемых для вычисления метрического расстояния на GPU. Обычные значения - от 2 до 32 (например, 2, 4, 8, 16, 32). Это значение незначительно влияет на производительность поиска. По умолчанию используется значение <code translate="no">0</code>, при котором Milvus автоматически выбирает <code translate="no">team_size</code> в зависимости от размерности вектора.</td><td><code translate="no">0</code></td></tr>
<tr><td><code translate="no">ef</code></td><td>Определяет компромисс между временем запроса и точностью. Более высокое значение <code translate="no">ef</code> приводит к более точному, но более медленному поиску. <br/>Этот параметр обязателен, если при построении индекса вы установили <code translate="no">adapt_for_cpu</code> на <code translate="no">true</code>.</td><td><code translate="no">[top_k, int_max]</code></td></tr>
</tbody>
</table>
</li>
</ul>
<ul>
<li><p>Ограничения на поиск</p>
<table>
<thead>
<tr><th>Параметр</th><th>Диапазон</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (top-K)</td><td>&lt;= 1024</td></tr>
<tr><td><code translate="no">limit</code> (top-K)</td><td>&lt;=max((<code translate="no">itopk_size</code> + 31)// 32, <code translate="no">search_width</code>) * 32</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUIVFFLAT" class="common-anchor-header">GPU_IVF_FLAT<button data-href="#GPUIVFFLAT" class="anchor-icon" translate="no">
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
    </button></h2><p>Подобно <a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a>, GPU_IVF_FLAT также делит векторные данные на кластеры <code translate="no">nlist</code>, а затем сравнивает расстояния между целевым входным вектором и центром каждого кластера. В зависимости от количества кластеров, к которым система настроена на запрос (<code translate="no">nprobe</code>), результаты поиска сходства возвращаются на основе сравнений между целевым входным вектором и векторами только в наиболее похожих кластерах, что значительно сокращает время запроса.</p>
<p>Настраивая <code translate="no">nprobe</code>, можно найти идеальный баланс между точностью и скоростью для конкретного сценария. Результаты <a href="https://zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">тестирования производительности IVF_FLAT</a> показывают, что время выполнения запроса резко увеличивается как при увеличении количества векторов целевого входа (<code translate="no">nq</code>), так и при увеличении количества кластеров для поиска (<code translate="no">nprobe</code>).</p>
<p>GPU_IVF_FLAT - это самый базовый ЭКО-индекс, и закодированные данные, хранящиеся в каждом блоке, соответствуют исходным данным.</p>
<p>При проведении поиска следует учитывать, что для любого поиска по коллекции, проиндексированной GPU_IVF_FLAT, можно задать top-K до 256.</p>
<ul>
<li><p>Параметры построения индекса</p>
<table>
<thead>
<tr><th>Параметр</th><th>Описание</th><th>Диапазон</th><th>Значение по умолчанию</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Количество единиц кластера</td><td>[1, 65536]</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>Определяет, нужно ли кэшировать исходный набор данных в памяти GPU. Возможные значения:</br><code translate="no">“true”</code>: Кэширует исходный набор данных для улучшения запоминания путем уточнения результатов поиска.</br> <code translate="no">“false”</code>: Не кэшировать исходный набор данных для экономии памяти графического процессора.</td><td><code translate="no">&quot;true&quot;</code> <code translate="no">&quot;flase&quot;</code></td><td><code translate="no">&quot;false&quot;</code></td></tr>
</tbody>
</table>
</li>
<li><p>Параметры поиска</p>
<ul>
<li><p>Общий поиск</p>
<table>
<thead>
<tr><th>Параметр</th><th>Описание</th><th>Диапазон</th><th>Значение по умолчанию</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Количество единиц для запроса</td><td>[1, nlist]</td><td><code translate="no">8</code></td></tr>
</tbody>
</table>
</li>
</ul></li>
<li><p>Ограничения на поиск</p>
<table>
<thead>
<tr><th>Параметр</th><th>Диапазон</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (top-K)</td><td>&lt;= <code translate="no">2048</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUIVFPQ" class="common-anchor-header">GPU_IVF_PQ<button data-href="#GPUIVFPQ" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">PQ</code> (Product Quantization) равномерно разлагает исходное высокоразмерное векторное пространство на декартово произведение <code translate="no">m</code> низкоразмерных векторных пространств, а затем квантует разложенные низкоразмерные векторные пространства. Вместо вычисления расстояний между целевым вектором и центром всех единиц, квантование по продуктам позволяет вычислять расстояния между целевым вектором и центром кластеризации каждого низкоразмерного пространства и значительно сокращает временную и пространственную сложность алгоритма.</p>
<p>IVF_PQ выполняет кластеризацию индекса ЭКО перед квантованием произведения векторов. Его индексный файл еще меньше, чем у IVF_SQ8, но это также приводит к потере точности при поиске векторов.</p>
<div class="alert note">
<p>Параметры построения индекса и параметры поиска зависят от дистрибутива Milvus. Сначала выберите свой дистрибутив Milvus.</p>
<p>При поиске обратите внимание, что для любого поиска по коллекции, проиндексированной GPU_IVF_FLAT, можно установить top-K до 8192.</p>
</div>
<ul>
<li><p>Параметры построения индекса</p>
<table>
<thead>
<tr><th>Параметр</th><th>Описание</th><th>Диапазон</th><th>Значение по умолчанию</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Количество единиц кластера</td><td>[1, 65536]</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">m</code></td><td>Количество коэффициентов квантования произведения,</td><td><code translate="no">dim mod m or = 0</code></td><td><code translate="no">0</code></td></tr>
<tr><td><code translate="no">nbits</code></td><td>[Необязательно] Количество бит, в которых хранится каждый низкоразмерный вектор.</td><td>[1, 16]</td><td><code translate="no">8</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>Определяет, нужно ли кэшировать исходный набор данных в памяти GPU. Возможные значения:</br><code translate="no">“true”</code>: Кэширует исходный набор данных для улучшения запоминания путем уточнения результатов поиска.</br> <code translate="no">“false”</code>: Не кэшировать исходный набор данных для экономии памяти графического процессора.</td><td><code translate="no">&quot;true&quot;</code> <code translate="no">&quot;false&quot;</code></td><td><code translate="no">&quot;false&quot;</code></td></tr>
</tbody>
</table>
</li>
<li><p>Параметры поиска</p>
<ul>
<li><p>Общий поиск</p>
<table>
<thead>
<tr><th>Параметр</th><th>Описание</th><th>Диапазон</th><th>Значение по умолчанию</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Количество единиц для запроса</td><td>[1, nlist]</td><td><code translate="no">8</code></td></tr>
</tbody>
</table>
</li>
</ul></li>
<li><p>Ограничения на поиск</p>
<table>
<thead>
<tr><th>Параметр</th><th>Диапазон</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (top-K)</td><td>&lt;= <code translate="no">1024</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUBRUTEFORCE" class="common-anchor-header">GPU_BRUTE_FORCE<button data-href="#GPUBRUTEFORCE" class="anchor-icon" translate="no">
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
    </button></h2><p>GPU_BRUTE_FORCE предназначен для случаев, когда крайне важен высокий отзыв, гарантируя отзыв, равный 1, путем сравнения каждого запроса со всеми векторами в наборе данных. В качестве параметров построения индекса и поиска ему требуются только тип метрики (<code translate="no">metric_type</code>) и top-k (<code translate="no">limit</code>).</p>
<p>Для GPU_BRUTE_FORCE дополнительные параметры построения индекса и поиска не требуются.</p>
<h2 id="Conclusion" class="common-anchor-header">Заключение<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>В настоящее время Milvus загружает все индексы в память GPU для эффективной работы поиска. Объем загружаемых данных зависит от размера памяти GPU:</p>
<ul>
<li><strong>GPU_CAGRA</strong>: использование памяти примерно в 1,8 раза больше, чем исходные векторные данные.</li>
<li><strong>GPU_IVF_FLAT</strong> и <strong>GPU_BRUTE_FORCE</strong>: Требуется память, равная размеру исходных данных.</li>
<li><strong>GPU_IVF_PQ</strong>: Использует меньший объем памяти, который зависит от настроек параметров сжатия.</li>
</ul>
