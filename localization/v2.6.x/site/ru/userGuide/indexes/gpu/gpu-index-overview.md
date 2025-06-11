---
id: gpu-index-overview.md
title: Обзор индексов на GPU
summary: >-
  Создание индекса с поддержкой GPU в Milvus может значительно повысить
  производительность поиска в сценариях с высокой пропускной способностью и
  большим количеством обращений.
---
<h1 id="GPU-Index-Overview" class="common-anchor-header">Обзор индексов на GPU<button data-href="#GPU-Index-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Создание индекса с поддержкой GPU в Milvus может значительно повысить производительность поиска в сценариях с высокой пропускной способностью и большим количеством запросов.</p>
<p>На следующем рисунке сравнивается пропускная способность (запросы в секунду) различных конфигураций индексов для разных аппаратных установок, векторных наборов данных (Cohere и OpenAI) и размеров поисковых партий, и показано, что <code translate="no">GPU_CAGRA</code> постоянно превосходит другие методы.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/gpu-index-performance.png" alt="Gpu Index Performance" class="doc-image" id="gpu-index-performance" />
   </span> <span class="img-wrapper"> <span>Производительность индекса на ГПУ</span> </span></p>
<h2 id="Limits" class="common-anchor-header">Пределы<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>Для <code translate="no">GPU_IVF_FLAT</code> максимальное значение для <code translate="no">limit</code> составляет 1 024.</p></li>
<li><p>Для <code translate="no">GPU_IVF_PQ</code> и <code translate="no">GPU_CAGRA</code> максимальное значение для <code translate="no">limit</code> равно 1 024.</p></li>
<li><p>Хотя для <code translate="no">GPU_BRUTE_FORCE</code> нет установленного значения <code translate="no">limit</code>, рекомендуется не превышать 4 096, чтобы избежать потенциальных проблем с производительностью.</p></li>
<li><p>В настоящее время индексы GPU не поддерживают расстояние <code translate="no">COSINE</code>. Если требуется расстояние <code translate="no">COSINE</code>, данные следует сначала нормализовать, а затем можно использовать расстояние внутреннего произведения (IP) в качестве замены.</p></li>
<li><p>Защита от OOM при загрузке для GPU-индексов поддерживается не полностью, слишком большой объем данных может привести к сбою QueryNode.</p></li>
<li><p>GPU-индексы не поддерживают такие функции поиска, как <a href="/docs/ru/range-search.md">поиск по диапазону</a> и <a href="/docs/ru/grouping-search.md">поиск по группировке</a>.</p></li>
</ul>
<h2 id="Supported-GPU-index-types" class="common-anchor-header">Поддерживаемые типы индексов GPU<button data-href="#Supported-GPU-index-types" class="anchor-icon" translate="no">
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
    </button></h2><p>В следующей таблице перечислены типы индексов GPU, поддерживаемые Milvus.</p>
<table>
   <tr>
     <th><p>Тип индекса</p></th>
     <th><p>Описание</p></th>
     <th><p>Использование памяти</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/gpu-cagra.md">GPU_CAGRA</a></p></td>
     <td><p>GPU_CAGRA - это графовый индекс, оптимизированный для GPU. Использование GPU класса inference для запуска GPU-версии Milvus может быть более экономичным по сравнению с использованием дорогих GPU класса training.</p></td>
     <td><p>Объем памяти примерно в 1,8 раза больше, чем у исходных векторных данных.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/gpu-ivf-flat.md">GPU_IVF_FLAT</a></p></td>
     <td><p>GPU_IVF_FLAT - это самый базовый ЭКО-индекс, и закодированные данные, хранящиеся в каждом блоке, соответствуют исходным данным. При выполнении поиска следует учитывать, что для любого поиска по коллекции, проиндексированной GPU_IVF_FLAT, можно задать top-k (<code translate="no">limit</code>) до 256.</p></td>
     <td><p>Требуется память, равная размеру исходных данных.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/gpu-ivf-pq.md">GPU_IVF_PQ</a></p></td>
     <td><p>GPU_IVF_PQ выполняет кластеризацию индексов ЭКО перед квантованием произведения векторов. При выполнении поиска следует учитывать, что для любого поиска по коллекции, проиндексированной GPU_IVF_FLAT, можно установить top-k (<code translate="no">limit</code>) до 8 192.</p></td>
     <td><p>Использует меньший объем памяти, который зависит от настроек параметров сжатия.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/gpu-brute-force.md">GPU_BRUTE_FORCE</a></p></td>
     <td><p>GPU_BRUTE_FORCE предназначен для случаев, когда крайне важен высокий отзыв, гарантируя отзыв, равный 1, путем сравнения каждого запроса со всеми векторами в наборе данных. В качестве параметров построения индекса и поиска ему требуются только тип метрики (<code translate="no">metric_type</code>) и top-k (<code translate="no">limit</code>).</p></td>
     <td><p>Требуется память, равная размеру исходных данных.</p></td>
   </tr>
</table>
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
    </button></h2><p>Milvus использует глобальный пул графической памяти для выделения памяти GPU. Он поддерживает два параметра <code translate="no">initMemSize</code> и <code translate="no">maxMemSize</code> в <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L767-L769">конфигурационном файле Milvus</a>. Изначально размер пула устанавливается на <code translate="no">initMemSize</code>, а после превышения этого лимита автоматически увеличивается до <code translate="no">maxMemSize</code>.</p>
<p>По умолчанию <code translate="no">initMemSize</code> составляет 1/2 доступной памяти GPU при запуске Milvus, а по умолчанию <code translate="no">maxMemSize</code> равен всей доступной памяти GPU.</p>
<p>До версии Milvus 2.4.1 Milvus использует единый пул памяти GPU. В версиях до 2.4.1 рекомендуется устанавливать оба значения в 0.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>Начиная с Milvus 2.4.1, пул памяти GPU используется только для временных данных GPU во время поиска. Поэтому рекомендуется устанавливать значения 2048 и 4096.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">2048</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">4096</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>Чтобы узнать, как построить GPU-индекс, обратитесь к специальному руководству для каждого типа индекса.</p>
<h2 id="FAQ" class="common-anchor-header">ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<p>GPU-индекс особенно полезен в ситуациях, требующих высокой пропускной способности или большого количества обращений. Например, при работе с большими партиями данных производительность индексирования на GPU может превышать производительность индексирования на CPU в 100 раз. В сценариях с небольшими партиями индексы на GPU по-прежнему значительно превосходят индексы на CPU по производительности. Кроме того, если требуется быстрая вставка данных, использование GPU может существенно ускорить процесс создания индексов.</p></li>
<li><p><strong>В каких сценариях GPU-индексы, такие как GPU_CAGRA, GPU_IVF_PQ, GPU_IVF_FLAT и GPU_BRUTE_FORCE, являются наиболее подходящими?</strong></p>
<p><code translate="no">GPU_CAGRA</code> Эти индексы идеально подходят для сценариев, в которых требуется повышенная производительность, хотя и ценой потребления большего объема памяти. В средах, где экономия памяти является приоритетом, индекс <code translate="no">GPU_IVF_PQ</code> может помочь минимизировать требования к хранению, хотя это сопровождается большими потерями в точности. Индекс <code translate="no">GPU_IVF_FLAT</code> является сбалансированным вариантом, предлагающим компромисс между производительностью и потреблением памяти. Наконец, индекс <code translate="no">GPU_BRUTE_FORCE</code> предназначен для исчерпывающих поисковых операций, гарантируя коэффициент отзыва, равный 1, при выполнении сквозного поиска.</p></li>
</ul>
