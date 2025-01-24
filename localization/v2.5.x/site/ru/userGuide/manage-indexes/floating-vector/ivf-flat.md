---
id: ivf-flat.md
order: 1
summary: В этой статье мы познакомимся с индексом IVF_FLAT в Milvus.
title: IVF_FLAT
---
<h1 id="IVFFLAT" class="common-anchor-header">IVF_FLAT<button data-href="#IVFFLAT" class="anchor-icon" translate="no">
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
    </button></h1><p>Индекс <strong>IVF_FLAT</strong> - это алгоритм индексирования, который позволяет повысить производительность поиска для векторов с плавающей точкой.</p>
<p>Этот тип индекса идеально подходит для крупных наборов данных, требующих быстрых ответов на запросы и высокой точности, особенно если кластеризация набора данных позволяет сократить пространство поиска, а для хранения данных кластера имеется достаточно памяти.</p>
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
    </button></h2><p>Термин <strong>IVF_FLAT</strong> означает <strong>Inverted File Flat</strong>, что отражает двухуровневый подход к индексированию и поиску векторов с плавающей точкой:</p>
<ul>
<li><strong>Inverted File (IVF):</strong> Относится к кластеризации векторного пространства на управляемые области с помощью <a href="https://en.wikipedia.org/wiki/K-means_clustering">кластеризации k-means</a>. Каждый кластер представлен <strong>центроидом</strong>, служащим точкой отсчета для векторов внутри него.</li>
<li><strong>Плоский:</strong> означает, что внутри каждого кластера векторы хранятся в исходном виде (плоская структура), без сжатия или квантования, для точного вычисления расстояния.</li>
</ul>
<p>На следующем рисунке показано, как это работает:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-1.png" alt="ivf-flat-1.png" class="doc-image" id="ivf-flat-1.png" />
   </span> <span class="img-wrapper"> <span>ivf-flat-1.png</span> </span></p>
<p>Этот метод индексирования ускоряет процесс поиска, но имеет потенциальный недостаток: кандидат, найденный как ближайший к вкраплению запроса, может оказаться не совсем ближайшим. Это может произойти, если ближайший к запросу эмбеддинг находится в кластере, отличном от того, который был выбран на основе ближайшего центроида (см. визуализацию ниже).</p>
<p>Для решения этой проблемы <strong>IVF_FLAT</strong> предоставляет два гиперпараметра, которые мы можем настраивать:</p>
<ul>
<li><code translate="no">nlist</code>: Определяет количество разделов, которые нужно создать с помощью алгоритма k-means.</li>
<li><code translate="no">nprobe</code>: : Указывает количество разделов, которые следует учитывать при поиске кандидатов.</li>
</ul>
<p>Теперь, если мы установим значение <code translate="no">nprobe</code> равным 3 вместо 1, мы получим следующий результат:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-2.png" alt="ivf-flat-2.png" class="doc-image" id="ivf-flat-2.png" />
   </span> <span class="img-wrapper"> <span>ivf-flat-2.png</span> </span></p>
<p>Увеличив значение <code translate="no">nprobe</code>, можно включить в поиск больше разделов, что поможет не пропустить ближайшее к запросу вкрапление, даже если оно находится в другом разделе. Однако за это приходится платить увеличением времени поиска, поскольку необходимо оценить больше кандидатов. Дополнительные сведения о настройке параметров индекса см. в разделе <a href="#index-params">Параметры индекса</a>.</p>
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
    </button></h2><p>Чтобы построить индекс <code translate="no">IVF_FLAT</code> для векторного поля в Milvus, используйте метод <code translate="no">add_index()</code>, указав <code translate="no">index_type</code>, <code translate="no">metric_type</code> и дополнительные параметры для индекса.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Number of clusters for the index</span>
    } <span class="hljs-comment"># Index building params</span>
)

<button class="copy-code-btn"></button></code></pre>
<p>В данной конфигурации:</p>
<ul>
<li><p><code translate="no">index_type</code>: Тип индекса, который будет построен. В этом примере задайте значение <code translate="no">IVF_FLAT</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Метод, используемый для вычисления расстояния между векторами. Поддерживаются следующие значения: <code translate="no">COSINE</code>, <code translate="no">L2</code> и <code translate="no">IP</code>. Подробнее см. в разделе <a href="/docs/ru/metric.md">Типы метрик</a>.</p></li>
<li><p><code translate="no">params</code>: Дополнительные параметры конфигурации для построения индекса.</p>
<ul>
<li><code translate="no">nlist</code>: Количество кластеров для разделения набора данных.</li>
</ul>
<p>Чтобы узнать о параметрах построения, доступных для индекса <code translate="no">IVF_FLAT</code>, обратитесь к разделу <a href="#Index-building-params">Параметры построения индекса</a>.</p></li>
</ul>
<p>После того как параметры индекса настроены, вы можете создать индекс, используя метод <code translate="no">create_index()</code> напрямую или передавая параметры индекса в метод <code translate="no">create_collection</code>. Подробности см. в разделе <a href="/docs/ru/create-collection.md">Создание коллекции</a>.</p>
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
        <span class="hljs-string">&quot;nprobe&quot;</span>: 10, <span class="hljs-comment"># Number of clusters to search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    data=[[0.1, 0.2, 0.3, 0.4, 0.5]],  <span class="hljs-comment"># Query vector</span>
    <span class="hljs-built_in">limit</span>=3,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)

<button class="copy-code-btn"></button></code></pre>
<p>В этой конфигурации:</p>
<ul>
<li><p><code translate="no">params</code>: Дополнительные параметры конфигурации для поиска по индексу.</p>
<ul>
<li><code translate="no">nprobe</code>: Количество кластеров для поиска.</li>
</ul>
<p>Чтобы узнать больше параметров поиска, доступных для индекса <code translate="no">IVF_FLAT</code>, обратитесь к разделу <a href="#index-specific-search-params">Параметры поиска по индексу</a>.</p></li>
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
    </button></h2><p>В этом разделе представлен обзор параметров, используемых для построения индекса и выполнения поиска по нему.</p>
<h3 id="Index-building-params" class="common-anchor-header">Параметры построения индекса</h3><p>В следующей таблице перечислены параметры, которые могут быть настроены в <code translate="no">params</code> при <a href="#Build-index">построении индекса</a>.</p>
<table>
<thead>
<tr><th><strong>Параметр</strong></th><th><strong>Описание</strong></th><th><strong>Диапазон значений</strong></th><th><strong>Предложение по настройке</strong></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Количество кластеров, создаваемых с помощью алгоритма k-means при построении индекса. Каждый кластер, представленный центроидом, хранит список векторов. Увеличение этого параметра уменьшает количество векторов в каждом кластере, создавая меньшие, более целенаправленные разделы.</td><td><strong>Тип</strong>: Целое число<br><strong>Диапазон</strong>: [1, 65536]<br><strong>Значение по умолчанию</strong>: <code translate="no">128</code></td><td>Большие значения <code translate="no">nlist</code> улучшают отзыв за счет создания более точных кластеров, но увеличивают время построения индекса. Оптимизируйте в зависимости от размера набора данных и доступных ресурсов. В большинстве случаев мы рекомендуем устанавливать значение в этом диапазоне: [32, 4096].</td></tr>
</tbody>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Параметры поиска, специфичные для индекса</h3><p>В следующей таблице перечислены параметры, которые можно настроить в <code translate="no">search_params.params</code> при <a href="#Search-on-index">поиске по индексу</a>.</p>
<table>
<thead>
<tr><th><strong>Параметр</strong></th><th><strong>Описание</strong></th><th><strong>Диапазон значений</strong></th><th><strong>Предложение по настройке</strong></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Число кластеров для поиска кандидатов. Большие значения позволяют искать в большем числе кластеров, что улучшает запоминание за счет расширения области поиска, но ценой увеличения задержки запроса.</td><td><strong>Тип</strong>: Целое число<br><strong>Диапазон</strong>: [1, <em>nlist</em>].<br><strong>Значение по умолчанию</strong>: <code translate="no">8</code></td><td>Увеличение этого значения улучшает запоминание, но может замедлить поиск. Установите <code translate="no">nprobe</code> пропорционально <code translate="no">nlist</code>, чтобы сбалансировать скорость и точность.<br>В большинстве случаев мы рекомендуем устанавливать значение в этом диапазоне: [1, nlist].</td></tr>
</tbody>
</table>
