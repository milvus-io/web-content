---
id: reranking.md
summary: >-
  В этой теме рассматривается процесс реранжирования, объясняется его значение и
  реализуются два метода реранжирования.
title: Ранжирование
---
<h1 id="Reranking" class="common-anchor-header">Ранжирование<button data-href="#Reranking" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus обеспечивает возможности гибридного поиска с помощью API <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md">hybrid_search()</a>, используя сложные стратегии ранжирования для уточнения результатов поиска по нескольким экземплярам <code translate="no">AnnSearchRequest</code>. В этой теме рассматривается процесс реранжирования, объясняется его значение и реализация различных стратегий реранжирования в Milvus.</p>
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
    </button></h2><p>Следующий рисунок иллюстрирует выполнение гибридного поиска в Milvus и подчеркивает роль реранкинга в этом процессе.</p>
<p><img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/multi-vector-rerank.png" alt="reranking_process" width="300"/></p>
<p>Ранжирование в гибридном поиске - это важный этап, который объединяет результаты из нескольких векторных полей, обеспечивая релевантность и точную расстановку приоритетов в итоговой выдаче. В настоящее время Milvus предлагает следующие стратегии ранжирования:</p>
<ul>
<li><p><code translate="no">WeightedRanker</code>: Этот подход объединяет результаты, вычисляя средневзвешенное значение оценок (или векторных расстояний) из разных векторных поисков. Он присваивает веса в зависимости от значимости каждого векторного поля.</p></li>
<li><p><code translate="no">RRFRanker</code>: Эта стратегия объединяет результаты на основе их рангов в различных векторных столбцах.</p></li>
</ul>
<h2 id="Weighted-Scoring-WeightedRanker" class="common-anchor-header">Взвешенная оценка (WeightedRanker)<button data-href="#Weighted-Scoring-WeightedRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>Стратегия <code translate="no">WeightedRanker</code> присваивает различные веса результатам из каждого маршрута векторного поиска на основе значимости каждого векторного поля. Эта стратегия ранжирования применяется, когда значимость каждого векторного поля варьируется, что позволяет выделить определенные векторные поля по сравнению с другими, присвоив им более высокие веса. Например, при мультимодальном поиске текстовое описание может считаться более важным, чем распределение цветов на изображениях.</p>
<p>Основной процесс работы WeightedRanker выглядит следующим образом:</p>
<ul>
<li><p><strong>Сбор оценок во время поиска</strong>: Сбор результатов и их оценок из различных маршрутов векторного поиска.</p></li>
<li><p><strong>Нормализация оценок</strong>: Нормализация оценок по каждому маршруту в диапазоне [0,1], где значения ближе к 1 означают более высокую релевантность. Эта нормализация очень важна, так как распределения баллов варьируются в зависимости от типа метрики. Например, расстояние для IP находится в диапазоне [-∞,+∞], а расстояние для L2 - в диапазоне [0,+∞]. Milvus использует функцию <code translate="no">arctan</code>, преобразуя значения в диапазон [0,1], чтобы обеспечить стандартизированную основу для различных типов метрик.</p>
<p><img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/arctan.png" alt="arctan-function" width="300"/></p></li>
<li><p><strong>Распределение веса</strong>: Присвойте вес <code translate="no">w𝑖</code> каждому маршруту векторного поиска. Пользователи задают веса, которые отражают надежность, точность или другие важные метрики источника данных. Каждый вес находится в диапазоне [0,1].</p></li>
<li><p><strong>Слияние баллов</strong>: Вычисление средневзвешенного значения нормализованных оценок для получения итоговой оценки. Затем результаты ранжируются на основе этих оценок от самой высокой до самой низкой, чтобы получить окончательные отсортированные результаты.</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x//assets/weighted-reranker.png" alt="weighted-reranker" class="doc-image" id="weighted-reranker" />
   </span> <span class="img-wrapper"> <span>взвешенный ранжир</span> </span></p>
<p>Чтобы использовать эту стратегию, примените экземпляр <code translate="no">WeightedRanker</code> и задайте значения весов, передав переменное количество числовых аргументов.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker

<span class="hljs-comment"># Use WeightedRanker to combine results with specified weights</span>
rerank = WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.7</span>) 
<button class="copy-code-btn"></button></code></pre>
<p>Обратите внимание, что:</p>
<ul>
<li><p>Каждое значение веса варьируется от 0 (наименее важный) до 1 (наиболее важный), влияя на итоговый суммарный балл.</p></li>
<li><p>Общее количество значений веса, указанных в <code translate="no">WeightedRanker</code>, должно быть равно количеству экземпляров <code translate="no">AnnSearchRequest</code>, созданных ранее.</p></li>
<li><p>Стоит отметить, что из-за различий в измерениях разных типов метрик мы нормализуем расстояния между результатами отзыва так, чтобы они лежали в интервале [0,1], где 0 означает "разные", а 1 - "похожие". Итоговая оценка будет представлять собой сумму значений веса и расстояния.</p></li>
</ul>
<h2 id="Reciprocal-Rank-Fusion-RRFRanker" class="common-anchor-header">Взаимное слияние рангов (RRFRanker)<button data-href="#Reciprocal-Rank-Fusion-RRFRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>RRF - это метод слияния данных, который объединяет ранжированные списки на основе взаимности их рангов. Это эффективный способ сбалансировать влияние каждого векторного поля, особенно когда нет четкого приоритета важности. Эта стратегия обычно используется, когда необходимо уделить равное внимание всем векторным полям или когда существует неопределенность в отношении относительной важности каждого поля.</p>
<p>Основной процесс RRF выглядит следующим образом:</p>
<ul>
<li><p><strong>Сбор рейтингов во время поиска</strong>: Ретриверы по нескольким векторным полям получают и сортируют результаты.</p></li>
<li><p><strong>Слияние рангов</strong>: Алгоритм RRF взвешивает и объединяет ранги, полученные от каждого ретривера. Формула выглядит следующим образом:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x//assets/rrf-ranker.png" alt="rrf-ranker" class="doc-image" id="rrf-ranker" />
   </span> <span class="img-wrapper"> <span>rrf-ranker</span> </span></p>
<p>Здесь 𝑁 представляет собой количество различных маршрутов поиска, rank𝑖(𝑑) - ранговая позиция извлеченного документа 𝑑 по 𝑖-му ретриверу, а 𝑘 - параметр сглаживания, обычно устанавливаемый на 60.</p></li>
<li><p><strong>Комплексное ранжирование</strong>: Повторное ранжирование найденных результатов на основе комбинированных оценок для получения окончательных результатов.</p></li>
</ul>
<p>Чтобы использовать эту стратегию, примените экземпляр <code translate="no">RRFRanker</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

<span class="hljs-comment"># Default k value is 60</span>
ranker = RRFRanker()

<span class="hljs-comment"># Or specify k value</span>
ranker = RRFRanker(k=<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<p>RRF позволяет сбалансировать влияние полей без указания явных весов. Лучшие совпадения, согласованные несколькими полями, будут приоритетными в итоговом рейтинге.</p>
