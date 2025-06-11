---
id: diskann.md
title: DISKANN
summary: >-
  В крупномасштабных сценариях, где наборы данных могут включать миллиарды и
  даже триллионы векторов, стандартные методы индексирования в памяти (например,
  HNSW, IVF_FLAT) часто не успевают за скоростью из-за нехватки памяти. DISKANN
  предлагает дисковый подход, который решает эти проблемы, сохраняя высокую
  точность и скорость поиска, когда размер набора данных превышает объем
  доступной оперативной памяти.
---
<h1 id="DISKANN" class="common-anchor-header">DISKANN<button data-href="#DISKANN" class="anchor-icon" translate="no">
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
    </button></h1><p>В крупномасштабных сценариях, где наборы данных могут включать миллиарды и даже триллионы векторов, стандартные методы индексирования в памяти (например, <a href="/docs/ru/hnsw.md">HNSW</a>, <a href="/docs/ru/ivf-flat.md">IVF_FLAT</a>) часто не успевают за скоростью из-за ограничений памяти. <strong>DISKANN</strong> предлагает дисковый подход, который решает эти проблемы, сохраняя высокую точность и скорость поиска, когда размер набора данных превышает объем доступной оперативной памяти.</p>
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
    </button></h2><p><strong>DISKANN</strong> сочетает в себе две ключевые технологии для эффективного векторного поиска:</p>
<ul>
<li><p><strong>Vamana Graph</strong> - <strong>дисковый</strong> индекс на <strong>основе графа</strong>, который соединяет точки данных (или векторы) для эффективной навигации во время поиска.</p></li>
<li><p><strong>Product Quantization (PQ)</strong> - метод сжатия <strong>в памяти</strong>, который уменьшает размер векторов, позволяя быстро вычислять приблизительное расстояние между векторами.</p></li>
</ul>
<h3 id="Index-construction" class="common-anchor-header">Построение индексов</h3><h4 id="Vamana-graph" class="common-anchor-header">Граф Вамана</h4><p>Граф Vamana занимает центральное место в дисковой стратегии DISKANN. Он может работать с очень большими наборами данных, поскольку ему не нужно полностью размещаться в памяти во время или после построения.</p>
<p>На следующем рисунке показано, как строится граф Vamana.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/diskann.png" alt="Diskann" class="doc-image" id="diskann" />
   </span> <span class="img-wrapper"> <span>Diskann</span> </span></p>
<ol>
<li><p><strong>Начальные случайные соединения:</strong> Каждая точка данных (вектор) представлена в виде узла в графе. Изначально эти узлы соединяются случайным образом, образуя плотную сеть. Обычно узел начинает иметь около 500 ребер (или связей) для обеспечения широкой связности.</p></li>
<li><p><strong>Уточнение для повышения эффективности:</strong> Первоначальный случайный граф подвергается процессу оптимизации, чтобы сделать его более эффективным для поиска. Это включает в себя два ключевых этапа:</p>
<ul>
<li><p><strong>Обрезка лишних ребер:</strong> Алгоритм отбрасывает ненужные связи на основе расстояния между узлами. На этом этапе приоритет отдается более качественным ребрам.</p>
<p>Параметр <code translate="no">max_degree</code> ограничивает максимальное количество ребер на узел. Более высокое значение <code translate="no">max_degree</code> приводит к увеличению плотности графа, что потенциально позволяет находить больше релевантных соседей (более высокий уровень запоминания), но также увеличивает объем памяти и время поиска.</p></li>
<li><p><strong>Добавление стратегических кратчайших путей:</strong> Vamana вводит дальние ребра, соединяющие точки данных, которые находятся на большом расстоянии друг от друга в векторном пространстве. Эти ярлыки позволяют быстро перемещаться по графу, минуя промежуточные узлы и значительно ускоряя навигацию.</p>
<p>Параметр <code translate="no">search_list_size</code> определяет широту процесса уточнения графа. Более высокий <code translate="no">search_list_size</code> расширяет поиск соседей во время построения и может повысить итоговую точность, но увеличивает время построения индекса.</p></li>
</ul></li>
</ol>
<p>Чтобы узнать больше о настройке параметров, обратитесь к разделу <a href="/docs/ru/diskann.md#diskann-params">DISKANN params</a>.</p>
<h4 id="PQ" class="common-anchor-header">PQ</h4><p>DISKANN использует <strong>PQ</strong> для сжатия высокоразмерных векторов в более мелкие представления<strong>(PQ-коды</strong>), которые хранятся в памяти для быстрого вычисления приблизительного расстояния.</p>
<p>Параметр <code translate="no">pq_code_budget_gb_ratio</code> управляет объемом памяти, выделенным для хранения этих PQ-кодов. Он представляет собой соотношение между общим размером векторов (в гигабайтах) и местом, выделенным для хранения PQ-кодов. Вы можете рассчитать фактический бюджет PQ-кодов (в гигабайтах) по этой формуле:</p>
<pre><code translate="no" class="language-plaintext">PQ Code Budget (GB) = vec_field_size_gb * pq_code_budget_gb_ratio
<button class="copy-code-btn"></button></code></pre>
<p>где:</p>
<ul>
<li><p><code translate="no">vec_field_size_gb</code> общий размер векторов (в гигабайтах).</p></li>
<li><p><code translate="no">pq_code_budget_gb_ratio</code> задаваемый пользователем коэффициент, представляющий собой долю общего объема данных, зарезервированную для PQ-кодов. Этот параметр позволяет найти компромисс между точностью поиска и ресурсами памяти. Дополнительные сведения о настройке параметров см. в разделе <a href="/docs/ru/diskann.md#share-CEVtdKUBuou0g7xHU1uc1rmYnsd">Конфигурации DISKANN</a>.</p></li>
</ul>
<p>Технические подробности о методе PQ см. в разделе <a href="/docs/ru/ivf-pq.md#share-MA6SdYG0io3EASxoSpyc7JW3nvc">IVF_PQ</a>.</p>
<h3 id="Search-process" class="common-anchor-header">Процесс поиска</h3><p>После того как индекс (граф Vamana на диске и коды PQ в памяти) построен, DISKANN выполняет поиск ANN следующим образом:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/diskann-2.png" alt="Diskann 2" class="doc-image" id="diskann-2" />
   </span> <span class="img-wrapper"> <span>Дисканн 2</span> </span></p>
<ol>
<li><p><strong>Запрос и точка входа:</strong> Вектор запроса задается для поиска ближайших соседей. DISKANN начинает работу с выбранной точки входа в граф Вамана, часто это узел, расположенный вблизи глобального центроида набора данных. Глобальный центроид представляет собой среднее значение всех векторов, что позволяет минимизировать расстояние обхода графа для поиска нужных соседей.</p></li>
<li><p><strong>Поиск соседей:</strong> Алгоритм собирает потенциальных соседей-кандидатов (круги красного цвета на рисунке) с ребер текущего узла, используя коды PQ в памяти для аппроксимации расстояний между этими кандидатами и вектором запроса. Эти потенциальные соседи-кандидаты - узлы, непосредственно связанные с выбранной точкой входа через ребра в графе Vamana.</p></li>
<li><p><strong>Выбор узлов для точного расчета расстояния:</strong> Из приблизительных результатов выбирается подмножество наиболее перспективных соседей (круги зеленого цвета на рисунке) для точной оценки расстояния по их исходным, несжатым векторам. Это требует считывания данных с диска, что может занять много времени. DISKANN использует два параметра для контроля этого тонкого баланса между точностью и скоростью:</p>
<ul>
<li><p><code translate="no">beam_width_ratio</code>: Коэффициент, который управляет широтой поиска, определяя, сколько соседей-кандидатов выбирается параллельно для изучения их соседей. Большее значение <code translate="no">beam_width_ratio</code> приводит к более широкому поиску, что потенциально ведет к повышению точности, но также увеличивает вычислительные затраты и объем дисковых операций ввода-вывода. Ширина луча, или количество выбранных узлов, определяется по формуле: <code translate="no">Beam width = Number of CPU cores * beam_width_ratio</code>.</p></li>
<li><p><code translate="no">search_cache_budget_gb_ratio</code>: Доля памяти, выделяемая для кэширования часто используемых дисковых данных. Такое кэширование позволяет минимизировать дисковый ввод-вывод и ускорить повторный поиск, поскольку данные уже находятся в памяти.</p></li>
</ul>
<p>Чтобы узнать больше о настройке параметров, обратитесь к разделу <a href="/docs/ru/diskann.md#share-CEVtdKUBuou0g7xHU1uc1rmYnsd">Конфигурации DISKANN</a>.</p></li>
<li><p><strong>Итеративное исследование:</strong> Поиск итеративно уточняет набор кандидатов, многократно выполняя приблизительные оценки (используя PQ), а затем точные проверки (используя исходные векторы с диска), пока не будет найдено достаточное количество соседей.</p></li>
</ol>
<h2 id="Enable-DISKANN-in-Milvus" class="common-anchor-header">Включение DISKANN в Milvus<button data-href="#Enable-DISKANN-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>По умолчанию <strong>DISKANN</strong> в Milvus отключен, чтобы отдать предпочтение скорости индексов в памяти для наборов данных, которые удобно размещаются в оперативной памяти. Однако если вы работаете с большими массивами данных или хотите воспользоваться преимуществами масштабируемости <strong>DISKANN</strong> и оптимизации SSD, вы можете легко включить эту функцию.</p>
<p>Вот как включить DISKANN в Milvus:</p>
<ol>
<li><p><strong>Обновите файл конфигурации Milvus</strong></p>
<ol>
<li><p>Найдите свой файл конфигурации Milvus<strong>.</strong> (Подробные сведения о поиске этого файла см. в документации Milvus по конфигурации).</p></li>
<li><p>Найдите параметр <code translate="no">queryNode.enableDisk</code> и установите его значение на <code translate="no">true</code>:</p>
<pre><code translate="no" class="language-yaml"> <span class="hljs-attr">queryNode:</span>
     <span class="hljs-attr">enableDisk:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Enables query nodes to load and search using the on-disk index</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol></li>
<li><p><strong>Оптимизация хранилища для DISKANN</strong></p></li>
</ol>
<p>Чтобы обеспечить наилучшую производительность DISKANN, рекомендуется хранить данные Milvus на быстром NVMe SSD. Вот как это сделать для автономного и кластерного развертывания Milvus:</p>
<ul>
<li><p><strong>Milvus Standalone</strong></p>
<ul>
<li><p>Смонтируйте каталог данных Milvus на NVMe SSD в контейнере Milvus. Это можно сделать в файле <code translate="no">docker-compose.yml</code> или с помощью других инструментов управления контейнером.</p></li>
<li><p>Например, если ваш NVMe SSD смонтирован по адресу <code translate="no">/mnt/nvme</code>, вы должны обновить раздел <code translate="no">volumes</code>в файле <code translate="no">docker-compose.yml</code> следующим образом:</p></li>
</ul>
<pre><code translate="no" class="language-yaml"> <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">/mnt/nvme/volumes/milvus:/var/lib/milvus</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Кластер Milvus</strong></p>
<ul>
<li><p>Смонтируйте каталог данных Milvus на NVMe SSD в контейнерах QueryNode и IndexNode. Этого можно добиться с помощью настроек оркестровки контейнеров.</p></li>
<li><p>Монтируя данные на NVMe SSD в обоих типах узлов, вы обеспечиваете высокую скорость чтения и записи для операций поиска и индексирования.</p></li>
</ul></li>
</ul>
<p>После внесения этих изменений перезапустите экземпляр Milvus, чтобы настройки вступили в силу. Теперь Milvus будет использовать возможности DISKANN для работы с большими наборами данных, обеспечивая эффективный и масштабируемый векторный поиск.</p>
<h2 id="Configure-DISKANN" class="common-anchor-header">Настройка DISKANN<button data-href="#Configure-DISKANN" class="anchor-icon" translate="no">
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
    </button></h2><p>Параметры DISKANN можно настроить двумя основными способами:</p>
<ul>
<li><p><strong>Файл конфигурации Milvus:</strong> настройка параметров DISKANN с помощью файла конфигурации Milvus. Этот метод подходит для настройки общих параметров конфигурации экземпляра Milvus.</p></li>
<li><p><strong>Milvus SDK:</strong> Тонкая настройка параметров DISKANN с помощью Milvus SDK во время создания индекса или операций поиска. Это позволяет осуществлять более детальный контроль и динамическую настройку параметров в зависимости от конкретных случаев использования.</p></li>
</ul>
<div class="alert note">
<p>Настройки, выполненные с помощью SDK, отменяют любые параметры, заданные в файле конфигурации, обеспечивая гибкость и контроль для конкретных приложений и наборов данных.</p>
</div>
<h3 id="Milvus-configuration-file" class="common-anchor-header">Файл конфигурации Milvus</h3><p>Вот пример настройки параметров DISKANN в файле <code translate="no">milvus.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># When enable this configuration, the index parameters defined following will be automatically populated as index parameters, without requiring user input.</span>
  <span class="hljs-attr">DISKANN:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">max_degree:</span> <span class="hljs-number">56</span> <span class="hljs-comment"># Maximum degree of the Vamana graph</span>
      <span class="hljs-attr">pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.125</span> <span class="hljs-comment"># Size limit on the PQ code (compared with raw data)</span>
      <span class="hljs-attr">search_cache_budget_gb_ratio:</span> <span class="hljs-number">0.1</span> <span class="hljs-comment"># Ratio of cached node numbers to raw data</span>
      <span class="hljs-attr">search_list_size:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># Size of the candidate list during building graph</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">beam_width_ratio:</span> <span class="hljs-number">4</span> <span class="hljs-comment"># Ratio between the maximum number of IO requests per search iteration and CPU number</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="SDK-configuration" class="common-anchor-header">Конфигурация SDK</h3><p>Здесь приведен пример настройки параметров DISKANN с помощью Milvus SDK.</p>
<h4 id="Build" class="common-anchor-header">Построение</h4><p>Чтобы построить индекс <code translate="no">IVF_FLAT</code> по векторному полю в Milvus, используйте метод <code translate="no">add_index()</code>, указав <code translate="no">index_type</code>, <code translate="no">metric_type</code> и дополнительные параметры индекса.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;DISKANN&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;max_degree&quot;</span>: <span class="hljs-number">56</span>, <span class="hljs-comment"># Maximum number of connections (edges) each data point can have</span>
        <span class="hljs-string">&quot;search_list_size&quot;</span>: <span class="hljs-number">100</span>,
        <span class="hljs-string">&quot;search_cache_budget_gb_ratio&quot;</span>: <span class="hljs-number">0.10</span>, <span class="hljs-comment"># Amount of memory allocated for caching frequently accessed parts of the graph</span>
        <span class="hljs-string">&quot;pq_code_budget_gb_ratio&quot;</span>: <span class="hljs-number">0.125</span> <span class="hljs-comment"># Size of the PQ codes (compressed representations of data points) compared to the size of the uncompressed data</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>После того как параметры индекса настроены, вы можете создать индекс, используя метод <code translate="no">create_index()</code> напрямую или передавая параметры индекса в метод <code translate="no">create_collection</code>. Подробнее см. в разделе <a href="/docs/ru/create-collection.md">Создание коллекции</a>.</p>
<h4 id="Search" class="common-anchor-header">Поиск</h4><p>После того как индекс создан и сущности вставлены, можно выполнять поиск по сходству в индексе.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;beam_width_ratio&quot;</span>: <span class="hljs-number">4.0</span>, <span class="hljs-comment"># degree of parallelism during search by determining the maximum number of parallel disk I/O requests relative to the number of available CPU cores.</span>
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
<h2 id="DISKANN-params" class="common-anchor-header">Параметры DISKANN<button data-href="#DISKANN-params" class="anchor-icon" translate="no">
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
    </button></h2><p>Тонкая настройка параметров DISKANN позволяет адаптировать его поведение к конкретному набору данных и поисковой нагрузке, добиваясь правильного баланса между скоростью, точностью и использованием памяти.</p>
<h3 id="Index-building-params" class="common-anchor-header">Параметры построения индексов</h3><p>Эти параметры влияют на то, как строится индекс DISKANN. Их настройка может повлиять на размер индекса, время построения и качество поиска.</p>
<table>
   <tr>
     <th></th>
     <th><p>Параметр</p></th>
     <th><p>Описание</p></th>
     <th><p>Диапазон значений</p></th>
     <th><p>Предложение по настройке</p></th>
   </tr>
   <tr>
     <td><p>Vamana</p></td>
     <td><p><code translate="no">max_degree</code></p></td>
     <td><p>Управляет максимальным количеством связей (ребер), которые может иметь каждая точка данных в графе Vamana.</p></td>
     <td><p><strong>Тип</strong>: Integer <strong>Диапазон</strong>: [1, 512]</p>
<p><strong>Значение по умолчанию</strong>: <code translate="no">56</code></p></td>
     <td><p>Более высокие значения создают более плотные графы, что потенциально повышает запоминаемость (поиск более релевантных результатов), но также увеличивает расход памяти и время построения. 
 В большинстве случаев мы рекомендуем устанавливать значение в пределах этого диапазона: [10, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">search_list_size</code></p></td>
     <td><p>Определяет количество соседей-кандидатов, рассматриваемых для каждой точки данных при построении графа.</p></td>
     <td><p><strong>Тип</strong>: Integer <strong>Диапазон</strong>: [1, <em>int_max</em>].</p>
<p><strong>Значение по умолчанию</strong>: <code translate="no">100</code></p></td>
     <td><p>Большие значения приводят к созданию более полных графов, что потенциально улучшает качество поиска, но также увеличивает время построения. 
 В большинстве случаев мы рекомендуем задавать значение в пределах этого диапазона: [K, 10K].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">search_cache_budget_gb_ratio</code></p></td>
     <td><p>Управляет объемом памяти, выделяемой для кэширования часто используемых частей графа при построении индекса.</p></td>
     <td><p><strong>Тип</strong>: Float <strong>Диапазон</strong>: [0.0, 0.3)</p>
<p><strong>Значение по умолчанию</strong>: <code translate="no">0.10</code></p></td>
     <td><p>При большем значении выделяется больше памяти для кэширования, что значительно сокращает дисковый ввод-вывод, но потребляет больше системной памяти. Меньшее значение использует меньше памяти для кэширования, потенциально увеличивая потребность в обращении к диску. В большинстве случаев мы рекомендуем устанавливать значение в этом диапазоне: [0.0, 0.3).</p></td>
   </tr>
   <tr>
     <td><p>PQ</p></td>
     <td><p><code translate="no">pq_code_budget_gb_ratio</code></p></td>
     <td><p>Регулирует размер PQ-кодов (сжатых представлений точек данных) по сравнению с размером несжатых данных.</p></td>
     <td><p><strong>Тип</strong>: Плавающая величина <strong>Диапазон</strong>: (0.0, 0.25).</p>
<p><strong>Значение по умолчанию</strong>: <code translate="no">0.125</code></p></td>
     <td><p>Более высокое соотношение приводит к более точным результатам поиска за счет выделения большей доли памяти под PQ-коды, эффективно сохраняя больше информации об исходных векторах. Однако для этого требуется больше памяти, что ограничивает возможности работы с большими наборами данных. Более низкое соотношение уменьшает расход памяти, но потенциально приводит к снижению точности, так как меньшие PQ-коды сохраняют меньше информации. Этот подход подходит для сценариев, в которых ограничение памяти является проблемой, и потенциально позволяет индексировать большие наборы данных.</p>
<p>В большинстве случаев мы рекомендуем устанавливать значение в этом диапазоне: (0.0625, 0.25).</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Параметры поиска, специфичные для индекса</h3><p>Эти параметры влияют на то, как DISKANN выполняет поиск. Их настройка может повлиять на скорость поиска, задержку и использование ресурсов.</p>
<table>
   <tr>
     <th></th>
     <th><p>Параметр</p></th>
     <th><p>Описание</p></th>
     <th><p>Диапазон значений</p></th>
     <th><p>Предложение по настройке</p></th>
   </tr>
   <tr>
     <td><p>Vamana</p></td>
     <td><p><code translate="no">beam_width_ratio</code></p></td>
     <td><p>Управляет степенью параллелизма при поиске, определяя максимальное количество параллельных запросов ввода-вывода с диска относительно количества доступных ядер процессора.</p></td>
     <td><p><strong>Тип</strong>: Float <strong>Диапазон</strong>: [1, max(128 / количество CPU, 16)].</p>
<p><strong>Значение по умолчанию</strong>: <code translate="no">4.0</code></p></td>
     <td><p>Более высокие значения увеличивают параллелизм, что может ускорить поиск в системах с мощными процессорами и SSD. Однако слишком высокое значение может привести к чрезмерной нагрузке на ресурсы. В большинстве случаев мы рекомендуем устанавливать значение в пределах этого диапазона: [1.0, 4.0].</p></td>
   </tr>
</table>
