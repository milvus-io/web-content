---
id: hnsw.md
order: 1
summary: В этой статье будет представлен индекс HNSW в Milvus.
title: HNSW
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
    </button></h1><p>Индекс <strong>HNSW</strong> - это алгоритм индексирования <strong>на основе графа</strong>, который позволяет повысить производительность при поиске плавающих векторов высокой размерности. Он обеспечивает <strong>отличную</strong> точность поиска и <strong>низкую</strong> задержку, но требует <strong>больших</strong> затрат памяти для поддержания иерархической структуры графа.</p>
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
    </button></h2><p>Алгоритм Hierarchical Navigable Small World (HNSW) строит многослойный граф, подобно карте с различными уровнями масштабирования. <strong>Нижний слой</strong> содержит все точки данных, а <strong>верхние слои</strong> состоят из подмножества точек данных, отобранных из нижнего слоя.</p>
<p>В этой иерархии каждый слой содержит узлы, представляющие точки данных, соединенные ребрами, которые указывают на их близость. Верхние слои обеспечивают прыжки на большие расстояния для быстрого приближения к цели, в то время как нижние слои обеспечивают тонкий поиск для получения наиболее точных результатов.</p>
<p>Вот как это работает:</p>
<ol>
<li><strong>Точка входа</strong>: Поиск начинается с фиксированной точки входа на верхнем слое, которая представляет собой заранее определенный узел графа.</li>
<li><strong>Жадный поиск</strong>: Алгоритм жадно перемещается к ближайшему соседу на текущем слое, пока не сможет приблизиться к вектору запроса. Верхние слои служат навигационной цели, выступая в качестве грубого фильтра для поиска потенциальных точек входа для более тонкого поиска на нижних уровнях.</li>
<li><strong>Спуск по слоям</strong>: После достижения <strong>локального минимума</strong> на текущем слое алгоритм переходит на нижний слой, используя заранее установленную связь, и повторяет жадный поиск.</li>
<li><strong>Окончательное</strong> <strong>уточнение</strong>: Этот процесс продолжается до тех пор, пока не будет достигнут нижний слой, где на последнем этапе уточнения определяются ближайшие соседи.</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/hnsw.png" alt="HNSW" class="doc-image" id="hnsw" />
   </span> <span class="img-wrapper"> <span>HNSW</span> </span></p>
<p>Производительность HNSW зависит от нескольких ключевых параметров, которые управляют как структурой графа, так и поведением поиска. К ним относятся:</p>
<ul>
<li><code translate="no">M</code>: Максимальное количество ребер или связей, которые может иметь каждый узел в графе на каждом уровне иерархии. Более высокое значение <code translate="no">M</code> приводит к более плотному графу и увеличивает запоминание и точность, поскольку поиск имеет больше путей для изучения, но при этом потребляет больше памяти и замедляет время вставки из-за дополнительных связей. Как показано на рисунке выше, <strong>M = 5</strong> означает, что каждый узел в графе HNSW напрямую связан максимум с 5 другими узлами. Это создает умеренно плотную структуру графа, в которой узлы имеют множество путей для достижения других узлов.</li>
<li><code translate="no">efConstruction</code>: Количество кандидатов, учитываемых при построении индекса. Более высокое значение <code translate="no">efConstruction</code> обычно приводит к лучшему качеству графа, но требует больше времени на построение.</li>
<li><code translate="no">ef</code>: Количество соседей, оцениваемых во время поиска. Увеличение <code translate="no">ef</code> повышает вероятность нахождения ближайших соседей, но замедляет процесс поиска.</li>
</ul>
<p>Подробнее о том, как настроить эти параметры в соответствии с вашими потребностями, читайте в разделе <a href="#index-params">Index params</a>.</p>
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
    </button></h2><p>Чтобы построить индекс <code translate="no">HNSW</code> по векторному полю в Milvus, используйте метод <code translate="no">add_index()</code>, указав <code translate="no">index_type</code>, <code translate="no">metric_type</code> и дополнительные параметры для индекса.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

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
<button class="copy-code-btn"></button></code></pre>
<p>В данной конфигурации:</p>
<ul>
<li><p><code translate="no">index_type</code>: Тип индекса, который будет построен. В этом примере задайте значение <code translate="no">HNSW</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Метод, используемый для вычисления расстояния между векторами. Поддерживаются следующие значения: <code translate="no">COSINE</code>, <code translate="no">L2</code> и <code translate="no">IP</code>. Подробнее см. в разделе <a href="/docs/ru/metric.md">Типы метрик</a>.</p></li>
<li><p><code translate="no">params</code>: Дополнительные параметры конфигурации для построения индекса.</p>
<ul>
<li><code translate="no">M</code>: Максимальное количество соседей, с которыми может соединиться каждый узел.</li>
<li><code translate="no">efConstruction</code>: Количество соседей-кандидатов, рассматриваемых для подключения при построении индекса.</li>
</ul>
<p>Чтобы узнать больше параметров построения, доступных для индекса <code translate="no">HNSW</code>, обратитесь к разделу <a href="#Index-building-params">Параметры построения индекса</a>.</p></li>
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
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of neighbors to consider during the search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>В этой конфигурации:</p>
<ul>
<li><p><code translate="no">params</code>: Дополнительные параметры конфигурации для поиска по индексу.</p>
<ul>
<li><code translate="no">ef</code>: : Количество соседей, учитываемых при поиске.</li>
</ul>
<p>Чтобы узнать больше параметров поиска, доступных для индекса <code translate="no">HNSW</code>, обратитесь к разделу <a href="#index-specific-search-params">Параметры поиска по индексу</a>.</p></li>
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
<tr><td><code translate="no">M</code></td><td>Максимальное количество связей （или ребер), которое может иметь каждый узел в графе, включая как исходящие, так и входящие ребра.<br>Этот параметр напрямую влияет как на построение индекса, так и на поиск.</td><td><strong>Тип</strong>: Целое число<br><strong>Диапазон</strong>: [2, 2048]<br><strong>Значение по умолчанию</strong>: <code translate="no">30</code> (до 30 исходящих и 30 входящих ребер на узел).</td><td>Большее значение <code translate="no">M</code> обычно приводит к <strong>повышению точности</strong>, но <strong>увеличивает объем памяти</strong> и <strong>замедляет построение индекса и поиск</strong>.<br>Рассмотрите возможность увеличения <code translate="no">M</code> для наборов данных с высокой размерностью или в случаях, когда важна высокая запоминаемость.<br>Уменьшайте <code translate="no">M</code>, если важны расход памяти и скорость поиска.<br>В большинстве случаев мы рекомендуем устанавливать значение в этом диапазоне: [5, 100].</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>Количество соседей-кандидатов, рассматриваемых для подключения при построении индекса.<br>Для каждого нового элемента оценивается больший пул кандидатов, но максимальное количество фактически установленных соединений все равно ограничено <code translate="no">M</code>.</td><td><strong>Тип</strong>: Целое число<br><strong>Диапазон</strong>: [1, <em>int_max</em>].<br><strong>Значение по умолчанию</strong>: <code translate="no">360</code></td><td>Более высокое значение <code translate="no">efConstruction</code> обычно приводит к <strong>более точному индексу</strong>, так как исследуется больше потенциальных соединений. Однако это также приводит к <strong>увеличению времени индексирования и увеличению использования памяти</strong> при построении.<br>Рассмотрите возможность увеличения <code translate="no">efConstruction</code> для повышения точности, особенно в сценариях, где время индексирования менее критично.<br>Уменьшите <code translate="no">efConstruction</code>, чтобы ускорить построение индекса, если ограничены ресурсы.<br>В большинстве случаев мы рекомендуем устанавливать значение в этом диапазоне: [50, 500].</td></tr>
</tbody>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Параметры поиска, специфичные для индекса</h3><p>В следующей таблице перечислены параметры, которые могут быть настроены в <code translate="no">search_params.params</code> при <a href="#Search-on-index">поиске по индексу</a>.</p>
<table>
<thead>
<tr><th><strong>Параметр</strong></th><th><strong>Описание</strong></th><th><strong>Диапазон значений</strong></th><th><strong>Предложение по настройке</strong></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td><strong>Управляет широтой поиска при извлечении ближайших соседей.</strong> Он определяет, сколько вершин будет посещено и оценено как потенциальные ближайшие соседи. Этот параметр влияет только на процесс поиска и применяется исключительно к нижнему слою графа.</td><td><strong>Тип</strong>: Целое число<br><strong>Диапазон</strong>: [1, <em>int_max</em>].<br><strong>Значение по умолчанию</strong>: <em>limit</em> (TopK ближайших соседей для возврата)</td><td>Большее значение <code translate="no">ef</code> обычно приводит к <strong>повышению точности поиска</strong>, так как рассматривается больше потенциальных соседей. Однако это также <strong>увеличивает время поиска</strong>.<br>Рассмотрите возможность увеличения <code translate="no">ef</code>, когда достижение высокого отзыва является критически важным, а скорость поиска менее важна.<br>Рассмотрите возможность уменьшения <code translate="no">ef</code>, чтобы отдать предпочтение более быстрому поиску, особенно в сценариях, где небольшое снижение точности допустимо.<br>В большинстве случаев мы рекомендуем устанавливать значение в этом диапазоне: [K, 10K].</td></tr>
</tbody>
</table>
