---
id: hnsw-sq.md
title: HNSW_SQ
summary: >-
  HNSW_SQ сочетает в себе иерархические навигационные графы «малого мира» (HNSW)
  со скалярной квантованием (SQ), создавая усовершенствованный метод векторной
  индексации, который обеспечивает контролируемый компромисс между размером и
  точностью. По сравнению со стандартным HNSW этот тип индекса сохраняет высокую
  скорость обработки запросов, хотя время построения индекса при этом
  незначительно увеличивается.
---
<h1 id="HNSWSQ" class="common-anchor-header">HNSW_SQ<button data-href="#HNSWSQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>HNSW_SQ</strong> сочетает в себе иерархические навигационные графы «малого мира» (HNSW) со скалярной квантованием (SQ), создавая усовершенствованный метод векторной индексации, который обеспечивает контролируемый компромисс между размером и точностью. По сравнению со стандартным <a href="/docs/ru/hnsw.md">HNSW</a> этот тип индекса сохраняет высокую скорость обработки запросов, хотя время построения индекса при этом незначительно увеличивается.</p>
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
    </button></h2><p>HNSW_SQ сочетает в себе две технологии индексирования: <strong>HNSW</strong> для быстрой навигации на основе графов и <strong>SQ</strong> для эффективного сжатия векторов.</p>
<h3 id="HNSW" class="common-anchor-header">HNSW<button data-href="#HNSW" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSW строит многоуровневый граф, в котором каждый узел соответствует вектору в наборе данных. В этом графе узлы соединяются на основе их сходства, что обеспечивает быстрый обход пространства данных. Иерархическая структура позволяет алгоритму поиска сужать круг потенциальных соседей, что значительно ускоряет процесс поиска в высокоразмерных пространствах.</p>
<p>Дополнительную информацию см. в разделе <a href="/docs/ru/hnsw.md">HNSW</a>.</p>
<h3 id="SQ" class="common-anchor-header">SQ<button data-href="#SQ" class="anchor-icon" translate="no">
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
    </button></h3><p>SQ — это метод сжатия векторов путем их представления с использованием меньшего количества битов. Например:</p>
<ul>
<li><p><strong>SQ8</strong> использует 8 бит, отображая значения на 256 уровней.  Дополнительную информацию см. в разделе <a href="/docs/ru/ivf-sq8.md#SQ8">IVF_SQ8</a>.</p></li>
<li><p><strong>SQ6</strong> использует 6 битов для представления каждого значения с плавающей запятой, что даёт 64 дискретных уровня.</p></li>
</ul>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/hnsw-sq.png" alt="Hnsw Sq" class="doc-image" id="hnsw-sq" /> 
   <span>Hnsw Sq</span>
  
 </span></p>
<p>Такое снижение точности значительно уменьшает объем занимаемой памяти и ускоряет вычисления, сохраняя при этом основную структуру данных.</p>
<h3 id="SQ4U" class="common-anchor-header">SQ4U<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.8+</span><button data-href="#SQ4U" class="anchor-icon" translate="no">
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
    </button></h3><p>Для сценариев, требующих экстремально высокой скорости запросов и минимального использования памяти, Milvus представляет « <code translate="no">SQ4U</code> » — 4-битное равномерное скалярное квантование. Это агрессивная форма скалярного квантования, которая сжимает значение с плавающей запятой каждого измерения в <strong>4-битное</strong> целое число без знака.</p>
<p>Буква «U» в аббревиатуре SQ4U означает «Uniform» (равномерная). В отличие от неравномерного скалярного квантования, при котором минимальные и максимальные значения обычно вычисляются независимо для каждого измерения (квантование по измерениям), SQ4U применяет стратегию <strong>глобального равномерного квантования</strong>:</p>
<ol>
<li><p><strong>Глобальная статистика</strong>: система вычисляет <strong>единое</strong> минимальное значение <code translate="no">vmin</code> и <strong>единый</strong> диапазон значений <code translate="no">vdiff</code>, которые применяются ко <strong>всем измерениям</strong> вектора (или ко всему сегменту вектора).</p></li>
<li><p><strong>Равномерное отображение</strong>: глобальный диапазон значений делится на 16 равных интервалов. Каждое значение с плавающей запятой в векторе, независимо от того, к какому измерению оно относится, отображается в 4-битное целое число (0–15) с использованием этих общих параметров.</p></li>
</ol>
<p><strong>Преимущества в производительности:</strong></p>
<ul>
<li><p><strong>Коэффициент сжатия 8:</strong> уменьшает размер в 8 раз по сравнению с <code translate="no">FP32</code> и в 2 раза по сравнению с <code translate="no">SQ8</code>, что значительно снижает нагрузку на пропускную способность памяти — часто являющуюся узким местом при векторном поиске.</p></li>
<li><p><strong>Оптимизация SIMD:</strong> компактная структура позволяет современным процессорам (AVX2/AVX-512) обрабатывать больше измерений за один такт. Важно, что использование глобальных параметров устраняет необходимость загрузки изменяющихся значений масштаба/смещения во время вычисления расстояния, что позволяет поддерживать полную загрузку конвейера команд.</p></li>
<li><p><strong>Эффективность кэша:</strong> меньший размер векторов означает, что в кэш процессора помещается больше данных, что снижает задержку, вызванную доступом к памяти.</p></li>
</ul>
<div class="alert note">
<p>Благодаря совместному использованию глобальных параметров алгоритм SQ4U демонстрирует наилучшую производительность при работе с нормализованными данными или наборами данных с однородным распределением значений по всем измерениям.</p>
</div>
<h3 id="HNSW-+-SQ" class="common-anchor-header">HNSW + SQ<button data-href="#HNSW-+-SQ" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSW_SQ объединяет преимущества алгоритмов HNSW и SQ, обеспечивая эффективный приближенный поиск ближайших соседей. Принцип работы следующий:</p>
<ol>
<li><p><strong>Сжатие данных:</strong> SQ сжимает векторы с помощью алгоритма сжатия векторов по коэффициентам ( <code translate="no">sq_type</code>, например, SQ6 или SQ8), что снижает использование памяти. Такое сжатие может снизить точность, но позволяет системе обрабатывать более крупные наборы данных.</p></li>
<li><p><strong>Построение графа:</strong> сжатые векторы используются для построения графа HNSW. Поскольку данные сжаты, результирующий граф имеет меньший размер, что ускоряет поиск.</p></li>
<li><p><strong>Поиск кандидатов:</strong> при подаче вектора-запроса алгоритм использует сжатые данные для быстрого выявления набора соседей-кандидатов из графа HNSW.</p></li>
<li><p><strong>(Необязательно) Уточнение результатов:</strong> первоначальные результаты-кандидаты можно уточнить для повышения точности на основе следующих параметров:</p>
<ul>
<li><p><code translate="no">refine</code>: Определяет, активирован ли этот этап уточнения. При значении « <code translate="no">true</code> » система пересчитывает расстояния, используя представления с более высокой точностью или несжатые представления.</p></li>
<li><p><code translate="no">refine_type</code>: Указывает уровень точности данных, используемых при уточнении (например, SQ6, SQ8, BF16). Выбор более высокой точности, такой как « <code translate="no">FP32</code> », может дать более точные результаты, но требует большего объёма памяти. Этот уровень точности должен превышать точность исходного сжатого набора данных, заданную параметром « <code translate="no">sq_type</code> ».</p></li>
<li><p><code translate="no">refine_k</code>: Выступает в качестве коэффициента увеличения. Например, если значение top <em>k</em> равно 100, а <code translate="no">refine_k</code> равно 2, система заново ранжирует 200 лучших кандидатов и возвращает 100 лучших, повышая общую точность.</p></li>
</ul></li>
</ol>
<p>Полный список параметров и допустимых значений см. в разделе <a href="/docs/ru/hnsw-sq.md#Index-params">«Параметры индекса</a>».</p>
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
    </button></h2><p>Чтобы построить индекс <code translate="no">HNSW_SQ</code> для векторного поля в Milvus, используйте метод <code translate="no">add_index()</code>, указав <code translate="no">index_type</code>, <code translate="no">metric_type</code> и дополнительные параметры для индекса.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW_SQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">100</span>, <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
        <span class="hljs-string">&quot;sq_type&quot;</span>: <span class="hljs-string">&quot;SQ6&quot;</span>, <span class="hljs-comment"># Scalar quantizer type</span>
        <span class="hljs-string">&quot;refine&quot;</span>: true, <span class="hljs-comment"># Whether to enable the refinement step</span>
        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;SQ8&quot;</span> <span class="hljs-comment"># Precision level of data used for refinement</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>В данной конфигурации:</p>
<ul>
<li><p><code translate="no">index_type</code>: Тип создаваемого индекса. В данном примере установите значение <code translate="no">HNSW_SQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Метод, используемый для вычисления расстояния между векторами. Поддерживаемые значения: <code translate="no">COSINE</code>, <code translate="no">L2</code> и <code translate="no">IP</code>. Подробности см. в разделе <a href="/docs/ru/metric.md">«Типы метрик</a>».</p></li>
<li><p><code translate="no">params</code>: Дополнительные параметры конфигурации для построения индекса. Подробности см. в разделе <a href="/docs/ru/hnsw-sq.md#Index-building-params">«Параметры построения индекса</a>».</p></li>
</ul>
<p>После настройки параметров индекса можно создать индекс, непосредственно вызвав метод ` <code translate="no">create_index()</code> ` или передав параметры индекса в методе ` <code translate="no">create_collection</code> `. Подробности см. в разделе <a href="/docs/ru/create-collection.md">«Создание коллекции</a>».</p>
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
    </button></h2><p>После построения индекса и вставки сущностей можно выполнять поиск по схожести в индексе.</p>
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
<p>В данной конфигурации:</p>
<ul>
<li><code translate="no">params</code>: Дополнительные параметры настройки для поиска по индексу. Подробности см. в разделе <a href="/docs/ru/hnsw-sq.md#Index-specific-search-params">«Параметры поиска, специфичные для индекса</a>».</li>
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
    </button></h3><p>В следующей таблице перечислены параметры, которые можно настроить в <code translate="no">params</code> при <a href="/docs/ru/hnsw-sq.md#share-PRYPd4xBJonkoZxPpNWcdnebnNh">построении индекса</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Параметр</p></th>
     <th><p>Описание</p></th>
     <th><p>Диапазон значений</p></th>
     <th><p>Рекомендации по настройке</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">M</code></p></td>
     <td><p>Максимальное количество связей (или ребер), которые может иметь каждый узел в графе, включая как исходящие, так и входящие ребра.</p><p>Этот параметр напрямую влияет как на построение индекса, так и на поиск.</p></td>
     <td><p><strong>Тип</strong>: Целое число</p><p><strong>Диапазон</strong>: [2, 2048]</p><p><strong>Значение по умолчанию</strong>: <code translate="no">30</code> (до 30 исходящих и 30 входящих ребер на узел)</p></td>
     <td><p>Более высокое значение <code translate="no">M</code>, как правило, обеспечивает <strong>более высокую точность</strong>, но <strong>увеличивает нагрузку на память</strong> и <strong>замедляет как построение индекса, так и поиск</strong>.</p><p>Рассмотрите возможность увеличения <code translate="no">M</code> для наборов данных с высокой размерностью или в тех случаях, когда крайне важен высокий показатель recall.</p><p>Уменьшение значения <code translate="no">M</code> следует рассматривать в тех случаях, когда основными приоритетами являются объем используемой памяти и скорость поиска.</p><p>В большинстве случаев мы рекомендуем устанавливать значение в пределах диапазона: [5, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>Количество соседей-кандидатов, рассматриваемых для установления связи при построении индекса.</p><p>Для каждого нового элемента оценивается более широкий набор кандидатов, но максимальное количество фактически устанавливаемых связей по-прежнему ограничено параметром ` <code translate="no">M</code>`.</p></td>
     <td><p><strong>Тип</strong>: Целое число</p><p><strong>Диапазон</strong>: [1, <em>int_max</em>]</p><p><strong>Значение по умолчанию</strong>: <code translate="no">360</code></p></td>
     <td><p>Более высокое значение параметра ` <code translate="no">efConstruction</code> `, как правило, приводит к <strong>повышению точности индекса</strong>, так как проанализируется больше потенциальных связей. Однако это также приводит к <strong>увеличению времени индексирования и объёма используемой памяти</strong> во время построения.</p><p>Рассмотрите возможность увеличения значения <code translate="no">efConstruction</code> для повышения точности, особенно в сценариях, где время индексирования не является критическим фактором.</p><p>Рассмотрите возможность уменьшения значения <code translate="no">efConstruction</code> для ускорения построения индекса, если имеются ограничения по ресурсам.</p><p>В большинстве случаев мы рекомендуем устанавливать значение в пределах диапазона [50, 500].</p></td>
   </tr>
   <tr>
     <td><p>SQ</p></td>
     <td><p><code translate="no">sq_type</code></p></td>
     <td><p>Определяет метод скалярной квантования для сжатия векторов. Каждый вариант обеспечивает свой баланс между степенью сжатия и точностью:</p><ul><li><p><code translate="no">SQ4U</code>: Кодирует векторы с использованием 4-битной равномерной квантования. Этот режим обеспечивает максимальную скорость и степень сжатия.</p></li><li><p><code translate="no">SQ6</code>: Кодирует векторы с использованием 6-битных целых чисел.</p></li><li><p><code translate="no">SQ8</code>: Кодирует векторы с использованием 8-битных целых чисел.</p></li><li><p><code translate="no">BF16</code>: Использует формат Bfloat16.</p></li><li><p><code translate="no">FP16</code>: Использует стандартный 16-битный формат с плавающей запятой.</p></li></ul></td>
     <td><p><strong>Тип</strong>: Строка</p><p><strong>Диапазон</strong>: [ <code translate="no">SQ4U</code>, <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code> ]</p><p><strong>Значение по умолчанию</strong>: <code translate="no">SQ8</code></p></td>
     <td><p>Выбор значения <code translate="no">sq_type</code> зависит от конкретных потребностей приложения. Значение <code translate="no">SQ4U</code> выбирается для обеспечения максимальной скорости и эффективности использования памяти. Значения <code translate="no">SQ6</code> или <code translate="no">SQ8</code> могут быть подходящими для сбалансированной производительности. С другой стороны, если точность имеет первостепенное значение, предпочтительными могут быть значения <code translate="no">BF16</code> или <code translate="no">FP16</code>.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>Булевый флаг, определяющий, применяется ли этап уточнения во время поиска. Уточнение предполагает переранжирование первоначальных результатов путем вычисления точных расстояний между вектором запроса и кандидатами.</p></td>
     <td><p><strong>Тип</strong>: Булево значение</p><p><strong>Диапазон</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]</p><p><strong>Значение по умолчанию</strong>: <code translate="no">false</code></p></td>
     <td><p>Установите значение <code translate="no">true</code>, если требуется высокая точность и вы готовы смириться с немного более длительным временем поиска. Используйте значение <code translate="no">false</code>, если приоритетом является скорость и допустим небольшой компромисс в точности.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>Определяет точность данных, используемых для уточнения ранжирования.</p><p>Эта точность должна быть выше, чем у сжатых векторов (как задано параметром ` <code translate="no">sq_type</code>`), что влияет как на точность переранжированных векторов, так и на их объем в памяти.</p></td>
     <td><p><strong>Тип</strong>: Строка</p><p><strong>Диапазон</strong>: [ <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code> ]</p><p><strong>Значение по умолчанию</strong>: нет</p></td>
     <td><p>Используйте <code translate="no">FP32</code> для максимальной точности при более высоких затратах памяти или <code translate="no">SQ6</code>/<code translate="no">SQ8</code> для лучшего сжатия. <code translate="no">BF16</code> и <code translate="no">FP16</code> предлагают сбалансированную альтернативу.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Параметры поиска, специфичные для индекса<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>В следующей таблице перечислены параметры, которые можно настроить в <code translate="no">search_params.params</code> при <a href="/docs/ru/hnsw-sq.md#Search-on-index">поиске по индексу</a>. Настройки сервера могут переопределять значения по умолчанию для параметров, которые вы не указали.</p>
<table>
   <tr>
     <th></th>
     <th><p>Параметр</p></th>
     <th><p>Описание</p></th>
     <th><p>Диапазон значений</p></th>
     <th><p>Рекомендации по настройке</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>Управляет шириной поиска при поиске ближайших соседей. Определяет, сколько узлов будет посещено и оценено в качестве потенциальных ближайших соседей. </p><p>Этот параметр влияет только на процесс поиска и применяется исключительно к нижнему уровню графа.</p></td>
     <td><p><strong>Тип</strong>: Целое число</p><p><strong>Диапазон</strong>: [1, <em>int_max</em>]</p><p><strong>Значение по умолчанию</strong>: <code translate="no">max(limit, 16)</code> для обычного поиска kNN; <code translate="no">512</code> для диапазонного поиска.</p><p>Для обычного поиска kNN явно заданное значение <code translate="no">ef</code> должно быть больше или равно <code translate="no">limit</code> (количество ближайших соседей, которые необходимо вернуть).</p></td>
     <td><p>Более высокое значение <code translate="no">ef</code>, как правило, приводит к <strong>повышению точности поиска</strong>, так как учитывается больше потенциальных соседей. Однако это также <strong>увеличивает время поиска</strong>.</p><p>Рассмотрите возможность увеличения значения <code translate="no">ef</code>, если достижение высокого показателя recall является критически важным, а скорость поиска не столь важна.</p><p>Рассмотрите возможность уменьшения значения <code translate="no">ef</code>, чтобы ускорить поиск, особенно в тех случаях, когда допустимо небольшое снижение точности.</p><p>В большинстве случаев мы рекомендуем устанавливать значение в пределах диапазона: [K, 10K].</p></td>
   </tr>
   <tr>
     <td><p>SQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Коэффициент увеличения, определяющий, сколько дополнительных кандидатов проверяется на этапе уточнения по сравнению с запрашиваемыми K лучшими результатами.</p></td>
     <td><p><strong>Тип</strong>: Float</p><p><strong>Диапазон</strong>: [1, <em>float_max</em>)</p><p><strong>Значение по умолчанию</strong>: 1</p></td>
     <td><p>Более высокие значения параметра « <code translate="no">refine_k</code> » могут повысить полноту и точность, но также увеличат время поиска и потребление ресурсов. Значение 1 означает, что в процессе уточнения учитываются только первоначальные K лучших результатов.</p></td>
   </tr>
</table>
