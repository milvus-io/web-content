---
id: hnsw.md
title: HNSW
summary: >-
  Индекс HNSW — это алгоритм индексирования на основе графов, который позволяет
  повысить производительность при поиске векторов с плавающей запятой в
  высокомерном пространстве. Он обеспечивает превосходную точность поиска и
  низкую задержку, однако требует значительных затрат памяти для поддержания
  своей иерархической графовой структуры.
---
<h1 id="HNSW" class="common-anchor-header">HNSW<button data-href="#HNSW" class="anchor-icon" translate="no">
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
    </button></h1><p>Индекс <strong>HNSW</strong> — это алгоритм индексирования <strong>на основе графов</strong>, который позволяет повысить производительность при поиске векторов с плавающей запятой в высокомерном пространстве. Он обеспечивает <strong>превосходную</strong> точность поиска и <strong>низкую</strong> задержку, однако требует <strong>значительных</strong> затрат памяти для поддержания иерархической структуры графа.</p>
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
    </button></h2><p>Алгоритм Hierarchical Navigable Small World (HNSW) строит многоуровневый граф, напоминающий карту с различными уровнями масштабирования. <strong>Нижний уровень</strong> содержит все точки данных, тогда как <strong>верхние уровни</strong> состоят из подмножества точек данных, отобранных из нижнего уровня.</p>
<p>В этой иерархии каждый слой содержит узлы, представляющие точки данных, соединенные ребрами, которые указывают на их близость. Верхние слои обеспечивают переходы на большие расстояния, позволяющие быстро приблизиться к цели, в то время как нижние слои обеспечивают детализированный поиск для получения наиболее точных результатов.</p>
<p>Вот как это работает:</p>
<ol>
<li><p><strong>Точка входа</strong>: поиск начинается с фиксированной точки входа на верхнем слое, которая представляет собой заранее определённый узел в графе.</p></li>
<li><p><strong>Жадный поиск</strong>: алгоритм «жадно» перемещается к ближайшему соседу на текущем уровне, пока не достигнет предельного приближения к вектору запроса. Верхние уровни выполняют навигационную функцию, действуя как грубый фильтр для определения потенциальных точек входа для более точного поиска на нижних уровнях.</p></li>
<li><p><strong>Спуск по слоям</strong>: как только на текущем слое достигается <strong>локальный минимум</strong>, алгоритм переходит на более низкий слой, используя заранее установленное соединение, и повторяет алгоритм жадного поиска.</p></li>
<li><p><strong>Окончательное</strong> <strong>уточнение</strong>: этот процесс продолжается до тех пор, пока не будет достигнут нижний слой, где на этапе окончательного уточнения определяются ближайшие соседи.</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/hnsw.png" alt="HNSW" class="doc-image" id="hnsw" /> 
   <span>HNSW</span>
  
 </span></p>
<p>Производительность HNSW зависит от нескольких ключевых параметров, которые определяют как структуру графа, так и поведение поиска. К ним относятся:</p>
<ul>
<li><p><code translate="no">M</code>: Максимальное количество ребер или связей, которые каждый узел может иметь в графе на каждом уровне иерархии. Более высокое значение <code translate="no">M</code> приводит к более плотному графу и повышает полноту и точность, поскольку поиск имеет больше путей для исследования, что также потребляет больше памяти и замедляет время вставки из-за дополнительных связей. Как показано на изображении выше, <strong>M = 5</strong> означает, что каждый узел в графе HNSW напрямую связан максимум с 5 другими узлами. Это создает умеренно плотную структуру графа, в которой у узлов имеется несколько путей для достижения других узлов.</p></li>
<li><p><code translate="no">efConstruction</code>: Количество кандидатов, рассматриваемых при построении индекса. Более высокое значение параметра « <code translate="no">efConstruction</code> » обычно приводит к получению графа лучшего качества, но требует больше времени на построение.</p></li>
<li><p><code translate="no">ef</code>: Количество соседей, оцениваемых во время поиска. Увеличение значения <code translate="no">ef</code> повышает вероятность нахождения ближайших соседей, но замедляет процесс поиска.</p></li>
</ul>
<p>Подробнее о том, как настроить эти параметры в соответствии с вашими потребностями, см. в разделе <a href="/docs/ru/hnsw.md#Index-params">«Параметры индекса</a>».</p>
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
    </button></h2><p>В этом примере используется подключенный клиент с именем <code translate="no">client</code> и существующая коллекция с именем <code translate="no">your_collection_name</code>. В коллекции имеется пятимерное векторное поле с именем <code translate="no">your_vector_field_name</code>.</p>
<p>Определите параметры индекса с помощью команды ` <code translate="no">add_index()</code>`, а затем создайте индекс с помощью команды ` <code translate="no">create_index()</code>`.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">100</span> <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
    } <span class="hljs-comment"># Index building params</span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>В данной конфигурации:</p>
<ul>
<li><p><code translate="no">index_type</code>: Тип создаваемого индекса. В данном примере установите значение <code translate="no">HNSW</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Метод, используемый для вычисления расстояния между векторами. Поддерживаемые значения: <code translate="no">COSINE</code>, <code translate="no">L2</code> и <code translate="no">IP</code>. Подробности см. в разделе <a href="/docs/ru/metric.md">«Типы метрик</a>».</p></li>
<li><p><code translate="no">params</code>: Дополнительные параметры настройки для построения индекса.</p>
<ul>
<li><p><code translate="no">M</code>: Максимальное количество соседей, с которыми может соединиться каждый узел.</p></li>
<li><p><code translate="no">efConstruction</code>: Количество потенциальных соседей, рассматриваемых для соединения при построении индекса.</p></li>
</ul>
<p>В примере в качестве настроек, переопределяющих значения по умолчанию, заданы <code translate="no">M=64</code> и <code translate="no">efConstruction=100</code>. Значения по умолчанию и допустимые диапазоны см. в разделе <a href="/docs/ru/hnsw.md#Index-building-params">«Параметры построения индекса</a>».</p></li>
</ul>
<p>Чтобы одновременно создать коллекцию и её индекс, передайте параметры индекса в <code translate="no">create_collection()</code>. Подробности см. в разделе <a href="/docs/ru/create-collection.md">«Создание коллекции</a>».</p>
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
    </button></h2><p>После построения индекса и вставки сущностей загрузите коллекцию и выполните поиск по её векторному полю. Для обычного поиска kNN установите значение параметра ` <code translate="no">ef</code> ` не ниже ` <code translate="no">limit</code>`.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of neighbors to consider during the search</span>
    }
}

client.load_collection(collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>)

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>В этой конфигурации:</p>
<ul>
<li><p><code translate="no">params</code>: Дополнительные параметры настройки для поиска по индексу.</p>
<ul>
<li><code translate="no">ef</code>: Количество соседей, учитываемых при поиске.</li>
</ul>
<p>Чтобы узнать больше о параметрах поиска, доступных для индекса <code translate="no">HNSW</code>, см. раздел <a href="/docs/ru/hnsw.md#Index-specific-search-params">«Параметры поиска для конкретных индексов</a>».</p></li>
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
    </button></h2><p>В приведенных ниже таблицах перечислены параметры для построения индекса и поиска. Настройки сервера могут переопределять значения по умолчанию для параметров, которые вы не указали.</p>
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
    </button></h3><p>В следующей таблице перечислены параметры, которые можно настроить в <code translate="no">params</code> при <a href="/docs/ru/hnsw.md#Build-index">построении индекса</a>.</p>
<table>
   <tr>
     <th><p>Параметр</p></th>
     <th><p>Описание</p></th>
     <th><p>Диапазон значений</p></th>
     <th><p>Рекомендации по настройке</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">M</code></p></td>
     <td><p>Максимальное количество соединений (или ребер), которые может иметь каждый узел в графе, включая как исходящие, так и входящие ребра. Этот параметр напрямую влияет как на построение индекса, так и на поиск.</p></td>
     <td><p><strong>Тип</strong>: Целое число. <strong>Диапазон</strong>: [2, 2048]</p><p><strong>Значение по умолчанию</strong>: <code translate="no">30</code> (до 30 исходящих и 30 входящих ребер на узел)</p></td>
     <td><p>Более высокое значение <code translate="no">M</code> обычно обеспечивает <strong>более высокую точность</strong>, но <strong>увеличивает нагрузку на память</strong> и <strong>замедляет как построение индекса, так и поиск</strong>. Рассмотрите возможность увеличения значения <code translate="no">M</code> для наборов данных с высокой размерностью или в тех случаях, когда крайне важен высокий показатель recall.</p><p>Рассмотрите возможность уменьшения значения <code translate="no">M</code>, если основными приоритетами являются использование памяти и скорость поиска.</p><p>В большинстве случаев мы рекомендуем устанавливать значение в пределах диапазона: [5, 100].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>Количество соседей-кандидатов, рассматриваемых для соединения при построении индекса. Для каждого нового элемента оценивается более широкий набор кандидатов, однако максимальное количество фактически устанавливаемых соединений по-прежнему ограничено значением <code translate="no">M</code>.</p></td>
     <td><p><strong>Тип</strong>: Целое число. <strong>Диапазон</strong>: [1, <em>int_max</em>]</p><p><strong>Значение по умолчанию</strong>: <code translate="no">360</code></p></td>
     <td><p>Более высокое значение параметра ` <code translate="no">efConstruction</code> ` обычно приводит к <strong>повышению точности индекса</strong>, так как просматривается больше потенциальных связей. Однако это также приводит к <strong>увеличению времени индексирования и роста потребления памяти</strong> во время построения. Рассмотрите возможность увеличения значения ` <code translate="no">efConstruction</code> ` для повышения точности, особенно в сценариях, где время индексирования не является критическим фактором.</p><p>Рассмотрите возможность уменьшения значения <code translate="no">efConstruction</code> для ускорения построения индекса, если имеются ограничения по ресурсам.</p><p>В большинстве случаев мы рекомендуем устанавливать значение в пределах диапазона: [50, 500].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Параметры поиска для конкретного индекса<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>В следующей таблице перечислены параметры, которые можно настроить в <code translate="no">search_params.params</code> при <a href="/docs/ru/hnsw.md#Search-on-index">поиске по индексу</a>.</p>
<table>
   <tr>
     <th><p>Параметр</p></th>
     <th><p>Описание</p></th>
     <th><p>Диапазон значений</p></th>
     <th><p>Рекомендации по настройке</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>Регулирует ширину поиска при поиске ближайших соседей. Определяет, сколько узлов будет посещено и оценено в качестве потенциальных ближайших соседей.  Этот параметр влияет только на процесс поиска и применяется исключительно к нижнему уровню графа.</p></td>
     <td><p><strong>Тип</strong>: Целое число. <strong>Диапазон</strong>: [1, <em>int_max</em>]</p><p><strong>Значение по умолчанию</strong>: <code translate="no">max(limit, 16)</code> для обычного поиска kNN; <code translate="no">512</code> для диапазонного поиска.</p><p>Для обычного поиска kNN явно заданное значение <code translate="no">ef</code> должно быть больше или равно <code translate="no">limit</code> (количество ближайших соседей, которые необходимо вернуть).</p></td>
     <td><p>Более высокое значение <code translate="no">ef</code>, как правило, приводит к <strong>повышению точности поиска</strong>, так как учитывается больше потенциальных соседей. Однако это также <strong>увеличивает время поиска</strong>. Рассмотрите возможность увеличения <code translate="no">ef</code>, если достижение высокого показателя охвата является критически важным, а скорость поиска не столь важна.</p><p>Рассмотрите возможность уменьшения значения <code translate="no">ef</code>, чтобы уделить приоритет более быстрому поиску, особенно в тех случаях, когда допустимо небольшое снижение точности.</p><p>В большинстве случаев мы рекомендуем устанавливать значение в пределах следующего диапазона: [K, 10K].</p></td>
   </tr>
</table>
