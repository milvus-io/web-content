---
id: gpu-ivf-pq.md
title: GPU_IVF_PQ
summary: >-
  Индекс GPU_IVF_PQ основывается на концепции IVF_PQ, объединяя инвертированную
  кластеризацию файлов с Product Quantization (PQ), которая разбивает
  высокоразмерные векторы на более мелкие подпространства и квантует их для
  эффективного поиска сходства. Разработанный исключительно для сред GPU,
  GPU_IVF_PQ использует параллельную обработку для ускорения вычислений и
  эффективной работы с большими векторными данными. Для получения дополнительной
  информации об основополагающих концепциях обратитесь к разделу IVF_PQ.
---
<h1 id="GPUIVFPQ" class="common-anchor-header">GPU_IVF_PQ<button data-href="#GPUIVFPQ" class="anchor-icon" translate="no">
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
    </button></h1><p>Индекс <strong>GPU_IVF_PQ</strong> основывается на концепции <strong>IVF_PQ</strong>, объединяя инвертированную кластеризацию файлов с Product Quantization (PQ), которая разбивает высокоразмерные векторы на более мелкие подпространства и квантует их для эффективного поиска сходства. Разработанный исключительно для сред GPU, GPU_IVF_PQ использует параллельную обработку для ускорения вычислений и эффективной работы с большими векторными данными. Для получения дополнительной информации об основополагающих концепциях обратитесь к разделу <a href="/docs/ru/ivf-pq.md">IVF_PQ</a>.</p>
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
    </button></h2><p>Чтобы построить индекс <code translate="no">GPU_IVF_PQ</code> для векторного поля в Milvus, используйте метод <code translate="no">add_index()</code>, указав <code translate="no">index_type</code>, <code translate="no">metric_type</code> и дополнительные параметры для индекса.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;GPU_IVF_PQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-comment"># Number of sub-vectors to split eahc vector into</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>В данной конфигурации:</p>
<ul>
<li><p><code translate="no">index_type</code>: Тип индекса, который будет построен. В этом примере задайте значение <code translate="no">GPU_IVF_PQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Метод, используемый для вычисления расстояния между векторами. Поддерживаются следующие значения: <code translate="no">COSINE</code>, <code translate="no">L2</code> и <code translate="no">IP</code>. Подробнее см. в разделе <a href="/docs/ru/metric.md">Типы метрик</a>.</p></li>
<li><p><code translate="no">params</code>: Дополнительные параметры конфигурации для построения индекса.</p>
<ul>
<li><code translate="no">m</code>: Количество субвекторов, на которые нужно разбить вектор.</li>
</ul>
<p>Чтобы узнать больше параметров построения, доступных для индекса <code translate="no">GPU_IVF_PQ</code>, обратитесь к разделу <a href="/docs/ru/gpu-ivf-pq.md#Index-building-params">Параметры построения индекса</a>.</p></li>
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
<p>Чтобы узнать больше параметров поиска, доступных для индекса <code translate="no">GPU_IVF_PQ</code>, обратитесь к разделу <a href="/docs/ru/gpu-ivf-pq.md#Index-specific-search-params">Параметры поиска по индексу</a>.</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">Параметры построения индекса</h3><p>В следующей таблице перечислены параметры, которые могут быть настроены в <code translate="no">params</code> при <a href="/docs/ru/gpu-ivf-pq.md#Build-index">построении индекса</a>.</p>
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
     <td><p><strong>Тип</strong>: Integer <strong>Диапазон</strong>: [1, 65536]</p>
<p><strong>Значение по умолчанию</strong>: <code translate="no">128</code></p></td>
     <td><p>Большие значения <code translate="no">nlist</code> улучшают отзыв за счет создания более точных кластеров, но увеличивают время построения индекса. Оптимизируйте значение в зависимости от размера набора данных и доступных ресурсов. В большинстве случаев мы рекомендуем устанавливать значение в этом диапазоне: [32, 4096].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>PQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>Количество подвекторов (используемых для квантования), на которые нужно разделить каждый высокоразмерный вектор в процессе квантования.</p></td>
     <td><p><strong>Тип</strong>: Целое число <strong>Диапазон</strong>: [1, 65536]</p>
<p><strong>Значение по умолчанию</strong>: Нет</p></td>
     <td><p>Большее значение <code translate="no">m</code> может повысить точность, но также увеличивает сложность вычислений и потребление памяти. <code translate="no">m</code> должно быть делителем размерности вектора<em>(D</em>), чтобы обеспечить правильное разложение. Обычно рекомендуемое значение <em>m = D/2</em>.</p>
<p>В большинстве случаев мы рекомендуем задавать значение в этом диапазоне: [D/8, D].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>Количество битов, используемых для представления индекса центроида каждого субвектора в сжатом виде. Оно напрямую определяет размер каждой кодовой книги. Каждая кодовая книга будет содержать $2^{\textit{nbits}}$ центроидов. Например, если <code translate="no">nbits</code> имеет значение 8, то каждый субвектор будет представлен 8-битным индексом центроида. Это позволяет иметь $2^8$ (256) возможных центроидов в кодовой книге для данного субвектора.</p></td>
     <td><p><strong>Тип</strong>: Целое число <strong>Диапазон</strong>: [1, 64]</p>
<p><strong>Значение по умолчанию</strong>: <code translate="no">8</code></p></td>
     <td><p>Большее значение <code translate="no">nbits</code> позволяет использовать большие кодовые книги, что потенциально приводит к более точному представлению исходных векторов. Однако это также означает использование большего количества битов для хранения каждого индекса, что приводит к меньшему сжатию. В большинстве случаев мы рекомендуем устанавливать значение в этом диапазоне: [1, 16].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">cache_dataset_on_device</code></p></td>
     <td><p>Определяет, нужно ли кэшировать исходный набор данных в памяти GPU. Возможные значения:</p>
<ul>
<li><p><code translate="no">"true"</code>: Кэширование исходного набора данных для улучшения запоминания путем уточнения результатов поиска.</p></li>
<li><p><code translate="no">"false"</code>: Не кэшировать исходный набор данных для экономии памяти графического процессора.</p></li>
</ul></td>
     <td><p><strong>Тип</strong>: Строка <strong>Диапазон</strong>: [<code translate="no">"true"</code>, <code translate="no">"false"</code>].</p>
<p><strong>Значение по умолчанию</strong>: <code translate="no">"false"</code></p></td>
     <td><p>Установка значения <code translate="no">"true"</code> улучшает запоминание за счет уточнения результатов поиска, но использует больше памяти GPU. Установка значения <code translate="no">"false"</code> экономит память GPU.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Параметры поиска, специфичные для индекса</h3><p>В следующей таблице перечислены параметры, которые могут быть настроены в <code translate="no">search_params.params</code> при <a href="/docs/ru/gpu-ivf-pq.md#Search-on-index">поиске по индексу</a>.</p>
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
     <td><p><strong>Тип</strong>: Целое число <strong>Диапазон</strong>: [1, <em>nlist</em>].</p>
<p><strong>Значение по умолчанию</strong>: <code translate="no">8</code></p></td>
     <td><p>Более высокие значения позволяют искать больше кластеров, что улучшает запоминание за счет расширения области поиска, но ценой увеличения задержки запроса. Установите значение <code translate="no">nprobe</code> пропорционально <code translate="no">nlist</code>, чтобы сбалансировать скорость и точность.</p>
<p>В большинстве случаев мы рекомендуем устанавливать значение в этом диапазоне: [1, nlist].</p></td>
   </tr>
</table>
