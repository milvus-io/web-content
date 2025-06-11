---
id: ivf-sq8.md
title: IVF_SQ8
summary: >-
  Индекс IVF_SQ8 - это алгоритм индексирования на основе квантования,
  разработанный для решения масштабных задач поиска сходства. Этот тип индекса
  обеспечивает более быстрый поиск при значительно меньшем объеме памяти по
  сравнению с методами исчерпывающего поиска.
---
<h1 id="IVFSQ8" class="common-anchor-header">IVF_SQ8<button data-href="#IVFSQ8" class="anchor-icon" translate="no">
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
    </button></h1><p>Индекс <strong>IVF_SQ8</strong> - это алгоритм индексирования <strong>на основе квантования</strong>, предназначенный для решения масштабных задач поиска сходства. Этот тип индекса обеспечивает более быстрый поиск при значительно меньшем объеме памяти по сравнению с методами исчерпывающего поиска.</p>
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
    </button></h2><p>Индекс IVF_SQ8 построен на двух ключевых компонентах:</p>
<ul>
<li><p><strong>Инвертированный файл (IVF)</strong>: Организует данные в кластеры, позволяя поисковому алгоритму сосредоточиться только на наиболее релевантных подмножествах векторов.</p></li>
<li><p><strong>Скалярная квантизация (SQ8)</strong>: Сжимает векторы в более компактную форму, значительно сокращая расход памяти и сохраняя при этом достаточную точность для быстрых расчетов сходства.</p></li>
</ul>
<h3 id="IVF" class="common-anchor-header">ЭКО</h3><p>ЭКО - это как создание индекса в книге. Вместо того чтобы сканировать каждую страницу (или, в нашем случае, каждый вектор), вы ищете определенные ключевые слова (кластеры) в индексе, чтобы быстро найти соответствующие страницы (векторы). В нашем сценарии векторы сгруппированы в кластеры, и алгоритм будет искать в нескольких кластерах, которые близки к вектору запроса.</p>
<p>Вот как это работает:</p>
<ol>
<li><p><strong>Кластеризация:</strong> Ваш набор векторных данных делится на определенное количество кластеров с помощью алгоритма кластеризации, например k-means. Каждый кластер имеет центроид (репрезентативный вектор для кластера).</p></li>
<li><p><strong>Назначение:</strong> Каждый вектор назначается в кластер, центроид которого находится ближе всего к нему.</p></li>
<li><p><strong>Инвертированный индекс:</strong> Создается индекс, сопоставляющий центроид каждого кластера со списком векторов, отнесенных к этому кластеру.</p></li>
<li><p><strong>Поиск:</strong> При поиске ближайших соседей алгоритм поиска сравнивает вектор запроса с центроидами кластеров и выбирает наиболее перспективный кластер (кластеры). Затем поиск сужается до векторов, входящих в эти выбранные кластеры.</p></li>
</ol>
<p>Чтобы узнать больше о технических деталях, обратитесь к разделу <a href="/docs/ru/ivf-flat.md">IVF_FLAT</a>.</p>
<h3 id="SQ8" class="common-anchor-header">SQ8</h3><p>Скалярное квантование (SQ) - это техника, используемая для уменьшения размера высокоразмерных векторов путем замены их значений более компактными представлениями. В варианте <strong>SQ8</strong> для хранения каждого значения размерности вектора используются 8-битные целые числа вместо типичных 32-битных чисел с плавающей точкой. Это значительно сокращает объем памяти, необходимый для хранения данных.</p>
<p>Вот как работает SQ8:</p>
<ol>
<li><p><strong>Определение диапазона:</strong> Сначала определяются минимальное и максимальное значения в векторе. Этот диапазон определяет границы квантования.</p></li>
<li><p><strong>Нормализация:</strong> Нормализуйте значения вектора в диапазоне от 0 до 1 с помощью формулы:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mtext>normalized_value</mtext><mo>=</mo><mfrac><mrow><mtext>value</mtext><mo>−</mo><mtext>min</mtext></mrow><mrow><mtext>max</mtext><mo>−</mo><mtext>min</mtext></mrow></mfrac></mrow><annotation encoding="application/x-tex">\text{normalized\_value} = \frac{\text{value} - \text{min}}{\text{max} - \text{min}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0044em;vertical-align:-0.31em;"></span><span class="mord text"><span class="mord">normalized_value</span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.1408em;vertical-align:-0.7693em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3714em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">max</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">min</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">value</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">min</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.7693em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>Это обеспечивает пропорциональное отображение всех значений в стандартном диапазоне, подготавливая их к сжатию.</p></li>
<li><p><strong>8-битное сжатие:</strong> Умножьте нормализованное значение на 255 (максимальное значение для 8-битного целого числа) и округлите результат до ближайшего целого числа. Это эффективно сжимает каждое значение в 8-битное представление.</p></li>
</ol>
<p>Предположим, у вас есть значение размерности 1,2, с минимальным значением -1,7 и максимальным значением 2,3. На следующем рисунке показано, как SQ8 применяется для преобразования значения float32 в целое число int8.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/ivf-sq8.png" alt="Ivf Sq8" class="doc-image" id="ivf-sq8" />
   </span> <span class="img-wrapper"> <span>Ivf Sq8</span> </span></p>
<h3 id="IVF-+-SQ8" class="common-anchor-header">ЭКО + SQ8</h3><p>Индекс IVF_SQ8 сочетает в себе IVF и SQ8 для эффективного выполнения поиска по сходству:</p>
<ol>
<li><p><strong>IVF сужает область поиска</strong>: Набор данных делится на кластеры, и когда выдается запрос, IVF сначала сравнивает запрос с центроидами кластеров, выбирая наиболее релевантные кластеры.</p></li>
<li><p><strong>SQ8 ускоряет вычисление расстояний</strong>: Внутри выбранных кластеров SQ8 сжимает векторы в 8-битные целые числа, сокращая объем памяти и ускоряя вычисление расстояний.</p></li>
</ol>
<p>Используя ЭКО для фокусировки поиска и SQ8 для ускорения вычислений, IVF_SQ8 достигает как быстрого времени поиска, так и эффективности использования памяти.</p>
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
    </button></h2><p>Чтобы построить индекс <code translate="no">IVF_SQ8</code> для векторного поля в Milvus, используйте метод <code translate="no">add_index()</code>, указав <code translate="no">index_type</code>, <code translate="no">metric_type</code> и дополнительные параметры для индекса.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_SQ8&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Number of clusters to create using the k-means algorithm during index building</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>В данной конфигурации:</p>
<ul>
<li><p><code translate="no">index_type</code>: Тип индекса, который будет построен. В этом примере задайте значение <code translate="no">IVF_SQ8</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Метод, используемый для вычисления расстояния между векторами. Поддерживаются следующие значения: <code translate="no">COSINE</code>, <code translate="no">L2</code> и <code translate="no">IP</code>. Подробнее см. в разделе <a href="/docs/ru/metric.md">Типы метрик</a>.</p></li>
<li><p><code translate="no">params</code>: Дополнительные параметры конфигурации для построения индекса.</p>
<ul>
<li><code translate="no">nlist</code>: Количество кластеров, создаваемых с помощью алгоритма k-means при построении индекса.</li>
</ul>
<p>Чтобы узнать о параметрах построения, доступных для индекса <code translate="no">IVF_SQ8</code>, обратитесь к разделу <a href="/docs/ru/ivf-sq8.md#share-BwprdWFCjoMBtMxorO0cWrUPnjb">Параметры построения индекса</a>.</p></li>
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
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">8</span>, <span class="hljs-comment"># Number of clusters to search for candidates</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>В этой конфигурации:</p>
<ul>
<li><p><code translate="no">params</code>: Дополнительные параметры конфигурации для поиска по индексу.</p>
<ul>
<li><code translate="no">nprobe</code>: Количество кластеров для поиска кандидатов.</li>
</ul>
<p>Чтобы узнать больше параметров поиска, доступных для индекса <code translate="no">IVF_SQ8</code>, обратитесь к разделу <a href="/docs/ru/ivf-sq8.md#share-PJhqdqNaNodKiexm6F1cD2IInbe">Параметры поиска по индексу</a>.</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">Параметры построения индекса</h3><p>В следующей таблице перечислены параметры, которые могут быть настроены в <code translate="no">params</code> при <a href="/docs/ru/ivf-sq8.md#share-X9Y9dTuhDohRRBxSvzBcXmIEnu4">построении индекса</a>.</p>
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
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Параметры поиска, специфичные для индекса</h3><p>В следующей таблице перечислены параметры, которые можно настроить в <code translate="no">search_params.params</code> при <a href="/docs/ru/ivf-sq8.md#share-TI73dmWBOoEnocxQ8H7clSYUnLg">поиске по индексу</a>.</p>
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
