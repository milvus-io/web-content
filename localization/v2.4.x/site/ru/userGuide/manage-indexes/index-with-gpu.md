---
id: index-with-gpu.md
order: 3
summary: >-
  В этом руководстве объясняется, как создать индекс с поддержкой GPU в Milvus,
  чтобы повысить производительность поиска.
title: Индекс с GPU
---
<h1 id="Index-with-GPU" class="common-anchor-header">Индекс с GPU<button data-href="#Index-with-GPU" class="anchor-icon" translate="no">
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
    </button></h1><p>В этом руководстве описаны шаги по созданию индекса с поддержкой GPU в Milvus, который может значительно повысить производительность поиска в сценариях с высокой пропускной способностью и большим количеством обращений. Подробные сведения о типах индексов с поддержкой GPU в Milvus см. в разделе <a href="/docs/ru/v2.4.x/gpu_index.md">Индекс GPU</a>.</p>
<h2 id="Configure-Milvus-settings-for-GPU-memory-control" class="common-anchor-header">Настройка параметров Milvus для управления памятью GPU<button data-href="#Configure-Milvus-settings-for-GPU-memory-control" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus использует глобальный пул графической памяти для выделения памяти GPU.</p>
<p>Он поддерживает два параметра <code translate="no">initMemSize</code> и <code translate="no">maxMemSize</code> в <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L767-L769">файле конфигурации Milvus</a>. Изначально размер пула устанавливается на <code translate="no">initMemSize</code>, а после превышения этого лимита автоматически увеличивается до <code translate="no">maxMemSize</code>.</p>
<p>По умолчанию <code translate="no">initMemSize</code> составляет 1/2 доступной памяти GPU при запуске Milvus, а по умолчанию <code translate="no">maxMemSize</code> равен всей доступной памяти GPU.</p>
<p>До версии Milvus 2.4.1 (включая версию 2.4.1) Milvus использовал единый пул памяти GPU. Для версий до 2.4.1 (включая версию 2.4.1) рекомендовалось установить оба значения в 0.</p>
<pre><code translate="no" class="language-yaml">gpu:
  initMemSize: <span class="hljs-number">0</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  maxMemSize: <span class="hljs-number">0</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>Начиная с Milvus 2.4.1, пул памяти GPU используется только для временных данных GPU во время поиска. Поэтому рекомендуется устанавливать значения 2048 и 4096.</p>
<pre><code translate="no" class="language-yaml">gpu:
  initMemSize: <span class="hljs-number">2048</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  maxMemSize: <span class="hljs-number">4096</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-an-index" class="common-anchor-header">Построение индекса<button data-href="#Build-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>В следующих примерах показано, как создавать GPU-индексы разных типов.</p>
<h3 id="Prepare-index-parameters" class="common-anchor-header">Подготовка параметров индекса</h3><p>При настройке параметров индекса GPU определите <strong>index_type</strong>, <strong>metric_type</strong> и <strong>params</strong>:</p>
<ul>
<li><p><strong>index_type</strong><em>(string</em>): Тип индекса, используемого для ускорения векторного поиска. Возможные варианты: <strong>GPU_CAGRA</strong>, <strong>GPU_IVF_FLAT</strong>, <strong>GPU_IVF_PQ</strong> и <strong>GPU_BRUTE_FORCE</strong>.</p></li>
<li><p><strong>metric_type</strong><em>(строка</em>): Тип метрики, используемой для измерения сходства векторов. Возможные варианты: <strong>IP</strong> и <strong>L2</strong>.</p></li>
<li><p><strong>params</strong><em>(dict</em>): Специфические для индекса параметры построения. Валидные опции для этого параметра зависят от типа индекса.</p></li>
</ul>
<p>Ниже приведены примеры конфигураций для различных типов индексов:</p>
<ul>
<li><p>Индекс<strong>GPU_CAGRA</strong> </p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;GPU_CAGRA&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&#x27;intermediate_graph_degree&#x27;</span>: <span class="hljs-number">64</span>,
        <span class="hljs-string">&#x27;graph_degree&#x27;</span>: <span class="hljs-number">32</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>Возможные опции для <strong>параметра params</strong> включают:</p>
<ul>
<li><p><strong>intermediate_graph_degree</strong><em>(int</em>): Влияет на запоминание и время построения, определяя степень графа перед обрезкой. Рекомендуемые значения - <strong>32</strong> или <strong>64</strong>.</p></li>
<li><p><strong>graph_degree</strong><em>(int</em>): Влияет на производительность поиска и запоминание, задавая степень графа после обрезки. Обычно она равна половине <strong>промежуточной_графовой_степени</strong>. Большая разница между этими двумя степенями приводит к увеличению времени построения. Его значение должно быть меньше значения <strong>intermediate_graph_degree</strong>.</p></li>
<li><p><strong>build_algo</strong><em>(строка</em>): Выбирает алгоритм построения графа перед обрезкой. Возможные варианты:</p>
<ul>
<li><p><strong>IVF_PQ</strong>: предлагает более высокое качество, но более медленное время построения.</p></li>
<li><p><strong>NN_DESCENT</strong>: Обеспечивает более быстрое построение с потенциально более низким отзывом.</p></li>
</ul></li>
<li><p><strong>cache_dataset_on_device</strong><em>(string</em>, <strong>"true"</strong> | <strong>"false")</strong>: Решает, нужно ли кэшировать исходный набор данных в памяти GPU. Значение <strong>"true"</strong> повышает запоминаемость за счет уточнения результатов поиска, а значение <strong>"false"</strong> экономит память GPU.</p></li>
</ul></li>
<li><p>Индекс<strong>GPU_IVF_FLAT</strong> или <strong>GPU_IVF_PQ</strong> </p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;GPU_IVF_FLAT&quot;</span>, <span class="hljs-comment"># Or GPU_IVF_PQ</span>
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">1024</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>Параметры <strong>params</strong> идентичны тем, что используются в <strong><a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a></strong> и <strong><a href="https://milvus.io/docs/index.md#IVF_PQ">IVF_PQ</a></strong>.</p></li>
<li><p>Индекс<strong>GPU_BRUTE_FORCE</strong> </p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&#x27;index_type&#x27;</span>: <span class="hljs-string">&#x27;GPU_BRUTE_FORCE&#x27;</span>,
    <span class="hljs-string">&#x27;metric_type&#x27;</span>: <span class="hljs-string">&#x27;L2&#x27;</span>,
    <span class="hljs-string">&#x27;params&#x27;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<p>Никаких дополнительных конфигураций <strong>params</strong> не требуется.</p></li>
</ul>
<h3 id="Build-index" class="common-anchor-header">Построение индекса</h3><p>После настройки параметров индекса в <strong>index_params</strong> вызовите метод <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/create_index.md"><code translate="no">create_index()</code></a> для построения индекса.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get an existing collection</span>
collection = Collection(<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>)

collection.create_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-comment"># Name of the vector field on which an index is built</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Search" class="common-anchor-header">Поиск<button data-href="#Search" class="anchor-icon" translate="no">
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
    </button></h2><p>После того как вы построили индекс GPU, следующим шагом будет подготовка параметров поиска перед выполнением поиска.</p>
<h3 id="Prepare-search-parameters" class="common-anchor-header">Подготовка параметров поиска</h3><p>Ниже приведены примеры конфигураций для различных типов индексов:</p>
<ul>
<li><p>Индекс<strong>GPU_BRUTE_FORCE</strong> </p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<p>Никаких дополнительных конфигураций <strong>параметров</strong> не требуется.</p></li>
<li><p>Индекс<strong>GPU_CAGRA</strong> </p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;itopk_size&quot;</span>: <span class="hljs-number">128</span>,
        <span class="hljs-string">&quot;search_width&quot;</span>: <span class="hljs-number">4</span>,
        <span class="hljs-string">&quot;min_iterations&quot;</span>: <span class="hljs-number">0</span>,
        <span class="hljs-string">&quot;max_iterations&quot;</span>: <span class="hljs-number">0</span>,
        <span class="hljs-string">&quot;team_size&quot;</span>: <span class="hljs-number">0</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>Ключевые параметры поиска включают:</p>
<ul>
<li><p><strong>itopk_size</strong>: Определяет размер промежуточных результатов, сохраняемых во время поиска. Большее значение может улучшить запоминание за счет снижения производительности поиска. Оно должно быть как минимум равно конечному значению top-k<strong>(limit</strong>) и обычно является показателем степени 2 (например, 16, 32, 64, 128).</p></li>
<li><p><strong>search_width</strong>: задает количество точек входа в граф CAGRA во время поиска. Увеличение этого значения может улучшить запоминание, но может повлиять на производительность поиска.</p></li>
<li><p><strong>min_iterations</strong> / <strong>max_iterations</strong>: Эти параметры управляют процессом итераций поиска. По умолчанию они установлены в <strong>0</strong>, и CAGRA автоматически определяет количество итераций, основываясь на <strong>itopk_size</strong> и <strong>search_width</strong>. Настройка этих значений вручную может помочь сбалансировать производительность и точность.</p></li>
<li><p><strong>team_size</strong>: Указывает количество потоков CUDA, используемых для вычисления метрического расстояния на GPU. Обычные значения - от 2 до 32 (например, 2, 4, 8, 16, 32). Это значение незначительно влияет на производительность поиска. Значение по умолчанию - <strong>0</strong>, при котором Milvus автоматически выбирает <strong>размер team_size</strong> на основе размерности вектора.</p></li>
</ul></li>
<li><p>Индекс<strong>GPU_IVF_FLAT</strong> или <strong>GPU_IVF_PQ</strong> </p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, 
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
}
<button class="copy-code-btn"></button></code></pre>
<p>Параметры поиска для этих двух типов индексов аналогичны тем, что используются в <strong><a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a> и <a href="https://milvus.io/docs/index.md#IVF_PQ">IVF_PQ</a></strong>. Дополнительные сведения см. в разделе <a href="https://milvus.io/docs/search.md#Prepare-search-parameters">Проведение поиска векторного сходства</a>.</p></li>
</ul>
<h3 id="Conduct-a-search" class="common-anchor-header">Выполните поиск</h3><p>Воспользуйтесь методом <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/search.md"><code translate="no">search()</code></a> для выполнения поиска векторного сходства в индексе GPU.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Load data into memory</span>
collection.load()

collection.search(
    data=[[query_vector]], <span class="hljs-comment"># Your query vector</span>
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-comment"># Name of the vector field</span>
    param=search_params,
    limit=<span class="hljs-number">100</span> <span class="hljs-comment"># Number of the results to return</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">Ограничения<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>При использовании индексов GPU следует помнить о некоторых ограничениях:</p>
<ul>
<li><p>Для <strong>GPU_IVF_FLAT</strong> максимальное значение <strong>limit</strong> равно 1024.</p></li>
<li><p>Для <strong>GPU_IVF_PQ</strong> и <strong>GPU_CAGRA</strong> максимальное значение <strong>limit</strong> равно 1024.</p></li>
<li><p>Хотя для <strong>GPU_BRUTE_FORCE</strong> нет установленного предела, рекомендуется не превышать 4096, чтобы избежать потенциальных проблем с производительностью.</p></li>
<li><p>В настоящее время индексы GPU не поддерживают расстояние COSINE. Если требуется расстояние COSINE, то сначала следует нормализовать данные, а затем использовать вместо него расстояние внутреннего произведения (IP).</p></li>
<li><p>Защита от OOM при загрузке для GPU-индексов поддерживается не полностью, слишком большой объем данных может привести к сбоям в работе QueryNode.</p></li>
<li><p>GPU-индексы не поддерживают такие функции поиска, как <a href="https://milvus.io/docs/single-vector-search.md#Range-search">поиск по диапазону</a> и <a href="https://milvus.io/docs/single-vector-search.md#Grouping-searchh">поиск по группировке</a>.</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>Когда целесообразно использовать GPU-индекс?</strong></p>
<p>GPU-индекс особенно полезен в ситуациях, когда требуется высокая пропускная способность или высокий уровень отзыва. Например, при работе с большими партиями данных производительность индексирования на GPU может превышать производительность индексирования на CPU в 100 раз. В сценариях с небольшими партиями индексы на GPU по-прежнему значительно превосходят индексы на CPU по производительности. Кроме того, если требуется быстрая вставка данных, использование GPU может существенно ускорить процесс создания индексов.</p></li>
<li><p><strong>Для каких сценариев наиболее подходят индексы на GPU, такие как CAGRA, GPU_IVF_PQ, GPU_IVF_FLAT и GPU_BRUTE_FORCE?</strong></p>
<p>Индексы CAGRA идеально подходят для сценариев, требующих повышенной производительности, хотя и за счет потребления большего объема памяти. В средах, где приоритетом является экономия памяти, индекс <strong>GPU_IVF_PQ</strong> может помочь минимизировать требования к хранению данных, хотя при этом теряется точность. Индекс <strong>GPU_IVF_FLAT</strong> служит сбалансированным вариантом, предлагая компромисс между производительностью и использованием памяти. И наконец, индекс <strong>GPU_BRUTE_FORCE</strong> предназначен для операций исчерпывающего поиска, гарантируя коэффициент отзыва равный 1 при выполнении обходного поиска.</p></li>
</ul>
