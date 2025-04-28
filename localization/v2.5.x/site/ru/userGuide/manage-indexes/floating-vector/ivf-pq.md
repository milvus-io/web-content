---
id: ivf-pq.md
title: IVF_PQ
summary: >-
  Индекс IVF_PQ - это основанный на квантовании алгоритм индексации для
  приближенного поиска ближайших соседей в высокоразмерных пространствах. Хотя
  IVF_PQ не так быстр, как некоторые методы на основе графов, он часто требует
  значительно меньше памяти, что делает его практичным выбором для больших
  наборов данных.
---
<h1 id="IVFPQ" class="common-anchor-header">IVF_PQ<button data-href="#IVFPQ" class="anchor-icon" translate="no">
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
    </button></h1><p>Индекс <strong>IVF_PQ</strong> - это <strong>основанный на квантовании</strong> алгоритм индексации для приближенного поиска ближайших соседей в высокоразмерных пространствах. Хотя <strong>IVF_PQ</strong> не так быстр, как некоторые методы на основе графов, он часто требует значительно меньше памяти, что делает его практичным выбором для больших наборов данных.</p>
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
    </button></h2><p><strong>IVF_PQ</strong> означает <strong>Inverted File with Product Quantization</strong>- гибридный подход, сочетающий индексирование и сжатие для эффективного векторного поиска и извлечения информации. В нем задействованы два основных компонента: <strong>Inverted File (IVF)</strong> и <strong>Product Quantization (PQ)</strong>.</p>
<h3 id="IVF" class="common-anchor-header">ЭКО</h3><p>ЭКО напоминает создание индекса в книге. Вместо того чтобы сканировать каждую страницу (или, в нашем случае, каждый вектор), вы ищете определенные ключевые слова (кластеры) в индексе, чтобы быстро найти соответствующие страницы (векторы). В нашем сценарии векторы сгруппированы в кластеры, и алгоритм будет искать в нескольких кластерах, которые близки к вектору запроса.</p>
<p>Вот как это работает:</p>
<ol>
<li><p><strong>Кластеризация:</strong> Ваш набор векторных данных делится на определенное количество кластеров с помощью алгоритма кластеризации, например k-means. Каждый кластер имеет центроид (репрезентативный вектор для кластера).</p></li>
<li><p><strong>Назначение:</strong> Каждый вектор назначается в кластер, центроид которого находится ближе всего к нему.</p></li>
<li><p><strong>Инвертированный индекс:</strong> Создается индекс, сопоставляющий центроид каждого кластера со списком векторов, отнесенных к этому кластеру.</p></li>
<li><p><strong>Поиск:</strong> При поиске ближайших соседей алгоритм поиска сравнивает вектор запроса с центроидами кластеров и выбирает наиболее перспективный кластер (кластеры). Затем поиск сужается до векторов, входящих в эти выбранные кластеры.</p></li>
</ol>
<p>Чтобы узнать больше о технических деталях, обратитесь к <a href="/docs/ru/ivf-flat.md">IVF_FLAT</a>.</p>
<h3 id="PQ" class="common-anchor-header">PQ</h3><p><strong>Квантование по продукту (PQ)</strong> - это метод сжатия высокоразмерных векторов, который значительно снижает требования к хранению данных и обеспечивает быстрое выполнение операций поиска по сходству.</p>
<p>Процесс PQ включает в себя следующие основные этапы:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-pq-1.png" alt="Ivf Pq 1" class="doc-image" id="ivf-pq-1" />
   </span> <span class="img-wrapper"> <span>Ivf Pq 1</span> </span></p>
<ol>
<li><p><strong>Декомпозиция размерности</strong>: Алгоритм начинает с разложения каждого высокоразмерного вектора на <code translate="no">m</code> равных по размеру подвекторов. Это разложение преобразует исходное D-мерное пространство в <code translate="no">m</code> дизъюнктивные подпространства, где каждое подпространство содержит <em>D/m</em> измерений. Параметр <code translate="no">m</code> управляет гранулярностью разложения и напрямую влияет на степень сжатия.</p></li>
<li><p><strong>Генерация кодовой книги подпространства</strong>: Внутри каждого подпространства алгоритм применяет <a href="https://en.wikipedia.org/wiki/K-means_clustering">кластеризацию k-means</a> для получения набора репрезентативных векторов (центроидов). Эти центроиды в совокупности формируют кодовую книгу для данного подпространства. Количество центроидов в каждой кодовой книге определяется параметром <code translate="no">nbits</code>, где каждая кодовая книга содержит <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2nbits2^{\textit{nbits}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span></span></span></span> 2 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> nbits центроидов. Например, если</span></span></span></span></span></span></span></span></span> <code translate="no">nbits = 8</code>, то каждая кодовая книга будет содержать 256 центроидов. Каждому центроиду присваивается уникальный индекс с <code translate="no">nbits</code> бит.</p></li>
<li><p><strong>Векторное</strong> <strong>квантование</strong>: Для каждого подвектора в исходном векторе PQ определяет ближайший центроид в соответствующем подпространстве, используя определенный тип метрики. Этот процесс эффективно сопоставляет каждый подвектор с ближайшим вектором-представителем в кодовой книге. Вместо того чтобы хранить полные координаты подвектора, сохраняется только индекс соответствующего центроида.</p></li>
<li><p><strong>Сжатое представление</strong>: Окончательное сжатое представление состоит из индексов <code translate="no">m</code>, по одному из каждого подпространства, которые в совокупности называются <strong>PQ-кодами</strong>. Такое кодирование позволяет сократить объем памяти с <em>D × 32</em> бит (в предположении 32-битных чисел с плавающей точкой) до <em>m</em> × <em>n бит</em>, что обеспечивает значительное сжатие при сохранении возможности аппроксимации расстояний между векторами.</p></li>
</ol>
<p>Более подробную информацию о настройке и оптимизации параметров см. в разделе <a href="/docs/ru/ivf-pq.md#Index-params">Index params</a>.</p>
<div class="alert note">
<p>Рассмотрим вектор с размерностью <em>D = 128</em>, использующий 32-битные числа с плавающей точкой. При параметрах PQ <em>m = 64</em> (подвекторы) и <em>nbits = 8</em> (таким образом, <em>k =</em> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">282^8</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span></span></span></span> 2 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> 8</span></span></span></span></span></span></span></span></span> <em>= 256</em> центроидов на подпространство), мы можем сравнить требования к хранению:</p>
<ul>
<li><p>Оригинальный вектор: 128 измерений × 32 бита = 4 096 бит.</p></li>
<li><p>PQ-сжатый вектор: 64 подвектора × 8 бит = 512 бит.</p></li>
</ul>
<p>Это означает 8-кратное сокращение требований к хранению.</p>
</div>
<p><strong>Вычисление расстояния с помощью PQ</strong></p>
<p>При выполнении поиска по сходству с вектором запроса PQ обеспечивает эффективное вычисление расстояния за счет следующих шагов:</p>
<ol>
<li><p><strong>Препроцессирование запроса</strong></p>
<ul>
<li><p>Вектор запроса декомпозируется на подвекторы <code translate="no">m</code> в соответствии с оригинальной структурой декомпозиции PQ.</p></li>
<li><p>Для каждого подвектора запроса и соответствующей ему кодовой книги (содержащей <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2nbits2^{\textit{nbits}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span></span></span></span> 2 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> nbits центроидов), вычисляются и сохраняются расстояния до всех центроидов.</span></span></span></span></span></span></span></span></span> </p></li>
<li><p>При этом создается <code translate="no">m</code> таблиц поиска, где каждая таблица содержит <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2nbits2^{\textit{nbits}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span></span></span></span> 2 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> nbits расстояний.</span></span></span></span></span></span></span></span></span> </p></li>
</ul></li>
<li><p><strong>Аппроксимация расстояний</strong></p>
<p>Для любого вектора базы данных, представленного PQ-кодами, его приблизительное расстояние до вектора запроса вычисляется следующим образом:</p>
<ul>
<li><p>Для каждого из подвекторов <code translate="no">m</code> извлекаем предварительно вычисленное расстояние из соответствующей таблицы поиска, используя сохраненный индекс центроида.</p></li>
<li><p>Просуммируйте эти <code translate="no">m</code> расстояния, чтобы получить приблизительное расстояние, основанное на определенном типе метрики (например, евклидово расстояние).</p></li>
</ul></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-pq-2.png" alt="Ivf Pq 2" class="doc-image" id="ivf-pq-2" />
   </span> <span class="img-wrapper"> <span>Ivf Pq 2</span> </span></p>
<h3 id="IVF-+-PQ" class="common-anchor-header">IVF + PQ</h3><p>Индекс <strong>IVF_PQ</strong> объединяет сильные стороны <strong>IVF</strong> и <strong>PQ</strong> для ускорения поиска. Процесс работает в два этапа:</p>
<ol>
<li><p><strong>Грубая фильтрация с помощью ЭКО</strong>: ЭКО разбивает векторное пространство на кластеры, сокращая область поиска. Вместо того чтобы оценивать весь набор данных, алгоритм фокусируется только на кластерах, наиболее близких к вектору запроса.</p></li>
<li><p><strong>Тонкое сравнение с помощью PQ</strong>: внутри выбранных кластеров PQ использует сжатые и квантованные представления векторов для быстрого вычисления приблизительных расстояний.</p></li>
</ol>
<p>На производительность индекса <strong>IVF_PQ</strong> существенно влияют параметры, управляющие алгоритмами IVF и PQ. Настройка этих параметров очень важна для достижения оптимальных результатов для конкретного набора данных и приложения. Более подробную информацию об этих параметрах и о том, как их настраивать, можно найти в разделе <a href="/docs/ru/ivf-pq.md#Index-params">Index params</a>.</p>
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
    </button></h2><p>Чтобы построить индекс <code translate="no">IVF_PQ</code> по векторному полю в Milvus, используйте метод <code translate="no">add_index()</code>, указав <code translate="no">index_type</code>, <code translate="no">metric_type</code> и дополнительные параметры для индекса.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_PQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-comment"># Number of sub-vectors to split eahc vector into</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>В данной конфигурации:</p>
<ul>
<li><p><code translate="no">index_type</code>: Тип индекса, который будет построен. В этом примере задайте значение <code translate="no">IVF_PQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Метод, используемый для вычисления расстояния между векторами. Поддерживаются следующие значения: <code translate="no">COSINE</code>, <code translate="no">L2</code> и <code translate="no">IP</code>. Подробнее см. в разделе <a href="/docs/ru/metric.md">Типы метрик</a>.</p></li>
<li><p><code translate="no">params</code>: Дополнительные параметры конфигурации для построения индекса.</p>
<ul>
<li><code translate="no">m</code>: Количество субвекторов, на которые нужно разбить вектор.</li>
</ul>
<p>Чтобы узнать больше параметров построения, доступных для индекса <code translate="no">IVF_PQ</code>, обратитесь к разделу <a href="/docs/ru/ivf-pq.md#Index-building-params">Параметры построения индекса</a>.</p></li>
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
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of clusters to search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>В этой конфигурации:</p>
<ul>
<li><p><code translate="no">params</code>: Дополнительные параметры конфигурации для поиска по индексу.</p>
<ul>
<li><code translate="no">nprobe</code>: Количество кластеров для поиска.</li>
</ul>
<p>Чтобы узнать больше параметров поиска, доступных для индекса <code translate="no">IVF_PQ</code>, обратитесь к разделу <a href="/docs/ru/ivf-pq.md#Index-specific-search-params">Параметры поиска по индексу</a>.</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">Параметры построения индекса</h3><p>В следующей таблице перечислены параметры, которые могут быть настроены в <code translate="no">params</code> при <a href="/docs/ru/ivf-pq.md#Build-index">построении индекса</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Параметр</p></th>
     <th><p>Описание</p></th>
     <th><p>Диапазон значений</p></th>
     <th><p>Предложение по настройке</p></th>
   </tr>
   <tr>
     <td><p>ЭКО</p></td>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>Количество кластеров, создаваемых с помощью алгоритма k-means при построении индекса.</p></td>
     <td><p><strong>Тип</strong>: Integer <strong>Диапазон</strong>: [1, 65536]</p><p><strong>Значение по умолчанию</strong>: <code translate="no">128</code></p></td>
     <td><p>Большие значения <code translate="no">nlist</code> улучшают отзыв за счет создания более точных кластеров, но увеличивают время построения индекса. Оптимизируйте значение в зависимости от размера набора данных и доступных ресурсов. В большинстве случаев мы рекомендуем устанавливать значение в этом диапазоне: [32, 4096].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>PQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>Количество подвекторов (используемых для квантования), на которые нужно разделить каждый высокоразмерный вектор в процессе квантования.</p></td>
     <td><p><strong>Тип</strong>: Целое число <strong>Диапазон</strong>: [1, 65536]</p><p><strong>Значение по умолчанию</strong>: Нет</p></td>
     <td><p>Большее значение <code translate="no">m</code> может повысить точность, но также увеличивает сложность вычислений и потребление памяти. <code translate="no">m</code> должно быть делителем размерности вектора<em>(D</em>), чтобы обеспечить правильное разложение. Обычно рекомендуемое значение <em>m = D/2</em>.</p><p>В большинстве случаев мы рекомендуем задавать значение в этом диапазоне: [D/8, D].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>Количество битов, используемых для представления индекса центроида каждого субвектора в сжатом виде. Оно напрямую определяет размер каждой кодовой книги. Каждая кодовая книга будет содержать $2^{\textit{nbits}}$ центроидов. Например, если <code translate="no">nbits</code> имеет значение 8, то каждый субвектор будет представлен 8-битным индексом центроида. Это позволяет иметь $2^8$ (256) возможных центроидов в кодовой книге для данного субвектора.</p></td>
     <td><p><strong>Тип</strong>: Целое число <strong>Диапазон</strong>: [1, 64]</p><p><strong>Значение по умолчанию</strong>: <code translate="no">8</code></p></td>
     <td><p>Большее значение <code translate="no">nbits</code> позволяет использовать большие кодовые книги, что потенциально приводит к более точному представлению исходных векторов. Однако это также означает использование большего количества битов для хранения каждого индекса, что приводит к меньшему сжатию. В большинстве случаев мы рекомендуем устанавливать значение в этом диапазоне: [1, 16].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Параметры поиска, специфичные для индексов</h3><p>В следующей таблице перечислены параметры, которые могут быть настроены в <code translate="no">search_params.params</code> при <a href="/docs/ru/ivf-pq.md#Search-on-index">поиске по индексу</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Параметр</p></th>
     <th><p>Описание</p></th>
     <th><p>Диапазон значений</p></th>
     <th><p>Предложение по настройке</p></th>
   </tr>
   <tr>
     <td><p>ЭКО</p></td>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>Количество кластеров для поиска кандидатов.</p></td>
     <td><p><strong>Тип</strong>: Целое число <strong>Диапазон</strong>: [1, <em>nlist</em>].</p><p><strong>Значение по умолчанию</strong>: <code translate="no">8</code></p></td>
     <td><p>Большие значения позволяют искать больше кластеров, что улучшает запоминание благодаря расширению области поиска, но ценой увеличения задержки запроса. Установите значение <code translate="no">nprobe</code> пропорционально значению <code translate="no">nlist</code>, чтобы сбалансировать скорость и точность.</p><p>В большинстве случаев мы рекомендуем устанавливать значение в этом диапазоне: [1, nlist].</p></td>
   </tr>
</table>
