---
id: reranking.md
title: Рерайтинг
summary: >-
  Гибридный поиск позволяет получить более точные результаты поиска за счет
  одновременного поиска по нескольким ANN. Многократный поиск дает несколько
  наборов результатов, которые требуют стратегии ранжирования, помогающей
  объединить и упорядочить результаты и получить единый набор результатов. В
  этом руководстве представлены стратегии реранжирования, поддерживаемые Milvus,
  и даны советы по выбору подходящей стратегии реранжирования.
---
<h1 id="Reranking" class="common-anchor-header">Рерайтинг<button data-href="#Reranking" class="anchor-icon" translate="no">
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
    </button></h1><p>Гибридный поиск позволяет добиться более точных результатов поиска за счет одновременного выполнения нескольких поисковых запросов ANN. Многократный поиск дает несколько наборов результатов, которые требуют стратегии ранжирования, помогающей объединить и переупорядочить результаты и получить единый набор результатов. В этом руководстве представлены стратегии реранжирования, поддерживаемые Milvus, и даны советы по выбору подходящей стратегии реранжирования.</p>
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
    </button></h2><p>На следующей схеме показан основной рабочий процесс проведения гибридного поиска в мультимодальном поисковом приложении. На схеме один путь - это базовый ANN-поиск по текстам, а другой - базовый ANN-поиск по изображениям. Каждый путь генерирует набор результатов, основанных на баллах сходства текста и изображения соответственно<strong>(Limit 1</strong> и <strong>Limit 2</strong>). Затем применяется стратегия ранжирования для ранжирования двух наборов результатов на основе единого стандарта, в конечном итоге объединяя два набора результатов в конечный набор результатов поиска, <strong>Limit(final)</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/multi-vector-rerank.png" alt="Multi Vector Rerank" class="doc-image" id="multi-vector-rerank" />
   </span> <span class="img-wrapper"> <span>Многовекторный реранкинг</span> </span></p>
<p>В гибридном поиске реранкинг - это важный этап, который объединяет результаты многовекторного поиска, чтобы обеспечить максимальную релевантность и точность конечного результата. В настоящее время Milvus поддерживает следующие две стратегии ранжирования:</p>
<ul>
<li><p><strong><a href="/docs/ru/reranking.md#WeightedRanker">WeightedRanker</a></strong>: Эта стратегия объединяет результаты, вычисляя взвешенную оценку оценок (или расстояний), полученных в результате различных векторных поисков. Веса присваиваются в зависимости от важности каждого поля вектора, что позволяет настраивать их в соответствии с приоритетами конкретного случая использования.</p></li>
<li><p><strong><a href="/docs/ru/reranking.md#RRFRanker">RRFRanker</a> (Reciprocal Rank Fusion Ranker)</strong>: Эта стратегия объединяет результаты на основе ранжирования. Она использует метод, который уравновешивает ранги результатов из разных поисковых запросов, что часто приводит к более справедливой и эффективной интеграции различных типов данных или модальностей.</p></li>
</ul>
<h2 id="WeightedRanker" class="common-anchor-header">WeightedRanker<button data-href="#WeightedRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>Стратегия WeightedRanker присваивает разные веса результатам каждого пути векторного поиска в зависимости от их важности.</p>
<h3 id="Mechanism-of-WeightedRanker" class="common-anchor-header">Механизм работы WeightedRanker</h3><p>Основной рабочий процесс стратегии WeightedRanker выглядит следующим образом:</p>
<ol>
<li><p><strong>Сбор оценок поиска</strong>: Сбор результатов и оценок каждого пути векторного поиска (score_1, score_2).</p></li>
<li><p><strong>Нормализация баллов</strong>: В каждом поиске могут использоваться различные метрики сходства, что приводит к различным распределениям баллов. Например, использование внутреннего продукта (IP) в качестве типа сходства может привести к оценкам в диапазоне [-∞,+∞], в то время как использование евклидова расстояния (L2) приводит к оценкам в диапазоне [0,+∞]. Поскольку диапазоны оценок при разных поисках отличаются и не могут быть напрямую сравнены, необходимо нормализовать оценки для каждого пути поиска. Обычно применяется функция <code translate="no">arctan</code> для преобразования оценок в диапазон между [0, 1] (score_1_normalized, score_2_normalized). Оценки, близкие к 1, указывают на большую схожесть.</p></li>
<li><p><strong>Присвоение весов</strong>: На основе важности, придаваемой различным векторным полям, нормализованным оценкам (score_1_normalized, score_2_normalized) присваиваются веса<strong>(wi</strong>). Веса каждого пути должны находиться в диапазоне [0,1]. Результирующими взвешенными оценками являются score_1_weighted и score_2_weighted.</p></li>
<li><p><strong>Слияние оценок</strong>: Взвешенные оценки (score_1_weighted, score_2_weighted) ранжируются от наибольшей к наименьшей, чтобы получить итоговый набор оценок (score_final).</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/weighted-reranker.png" alt="Weighted Reranker" class="doc-image" id="weighted-reranker" />
   </span> <span class="img-wrapper"> <span>Взвешенный ранжировщик</span> </span></p>
<h3 id="Example-of-WeightedRanker" class="common-anchor-header">Пример взвешенного ранжировщика</h3><p>Этот пример демонстрирует мультимодальный гибридный поиск (topK=5) с использованием изображений и текста и показывает, как стратегия WeightedRanker ранжирует результаты двух ANN-поисков.</p>
<ul>
<li>Результаты поиска ANN по изображениям （topK=5)：.</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Оценка (изображение)</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>0.92</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>0.88</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>0.85</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>0.83</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>0.8</p></td>
   </tr>
</table>
<ul>
<li>Результаты поиска ANN по текстам （topK=5)：</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Оценка (текст)</strong></p></th>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>0.91</p></td>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>0.87</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>0.85</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>0.82</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>0.78</p></td>
   </tr>
</table>
<ul>
<li>С помощью WeightedRanker присвойте веса результатам поиска изображений и текста. Предположим, что вес для поиска изображений ANN равен 0,6, а вес для поиска текста - 0,4.</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Оценка (изображение)</strong></p></th>
     <th><p><strong>Оценка (текст)</strong></p></th>
     <th><p><strong>Взвешенный балл</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>0.92</p></td>
     <td><p>0.87</p></td>
     <td><p>0.6×0.92+0.4×0.87=0.90</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>0.88</p></td>
     <td><p>N/A</p></td>
     <td><p>0.6×0.88+0.4×0=0.528</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>0.85</p></td>
     <td><p>Н/Д</p></td>
     <td><p>0.6×0.85+0.4×0=0.51</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>0.83</p></td>
     <td><p>0.91</p></td>
     <td><p>0.6×0.83+0.4×0.91=0.86</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>0.80</p></td>
     <td><p>0.82</p></td>
     <td><p>0.6×0.80+0.4×0.82=0.81</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>Нет на изображении</p></td>
     <td><p>0.85</p></td>
     <td><p>0.6×0+0.4×0.85=0.34</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>Нет на изображении</p></td>
     <td><p>0.78</p></td>
     <td><p>0.6×0+0.4×0.78=0.312</p></td>
   </tr>
</table>
<ul>
<li>Итоговые результаты после повторного ранжирования（topK=5)：</li>
</ul>
<table>
   <tr>
     <th><p><strong>Ранг</strong></p></th>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Итоговый балл</strong></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>101</p></td>
     <td><p>0.90</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>198</p></td>
     <td><p>0.86</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>175</p></td>
     <td><p>0.81</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>203</p></td>
     <td><p>0.528</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>150</p></td>
     <td><p>0.51</p></td>
   </tr>
</table>
<h3 id="Usage-of-WeightedRanker" class="common-anchor-header">Использование WeightedRanker</h3><p>При использовании стратегии WeightedRanker необходимо ввести значения весов. Количество вводимых весовых значений должно соответствовать количеству базовых поисковых запросов ANN в гибридном поиске. Вводимые значения веса должны лежать в диапазоне [0,1], причем значения ближе к 1 означают большую важность.</p>
<p>Например, предположим, что в гибридном поиске есть два основных поисковых запроса ANN: поиск текста и поиск изображений. Если текстовый поиск считается более важным, ему должен быть присвоен больший вес.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker

rerank= WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>) 
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.WeightedRanker;

<span class="hljs-type">WeightedRanker</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">WeightedRanker</span>(Arrays.asList(<span class="hljs-number">0.8f</span>, <span class="hljs-number">0.3f</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>

reranker := milvusclient.NewWeightedReranker([]<span class="hljs-type">float64</span>{<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-attr">rerank</span>: <span class="hljs-title class_">WeightedRanker</span>(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{
        &quot;strategy&quot;: &quot;ws&quot;,
        &quot;params&quot;: {&quot;weights&quot;: [0.8,0.3]}
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="RRFRanker" class="common-anchor-header">RRFRanker<button data-href="#RRFRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>Reciprocal Rank Fusion (RRF) - это метод слияния данных, который объединяет ранжированные списки на основе взаимного расположения их рангов. Эта стратегия переранжирования эффективно уравновешивает важность каждого пути векторного поиска.</p>
<h3 id="Mechanism-of-RRFRanker" class="common-anchor-header">Механизм работы RRFRanker</h3><p>Основной рабочий процесс стратегии RRFRanker выглядит следующим образом:</p>
<ol>
<li><p><strong>Сбор рейтингов поиска</strong>: Собираем рейтинги результатов из каждого пути векторного поиска (rank_1, rank_2).</p></li>
<li><p><strong>Слияние рангов</strong>: Преобразование рангов из каждого пути (rank_rrf_1, rank_rrf_2) в соответствии с формулой .</p>
<p>В формулу расчета входит <em>N</em>, представляющее собой количество поисковых запросов. <em>ranki</em><em>(d</em>) - ранговая позиция документа <em>d</em>, полученная <em>i(th)</em> ретривером. <em>k</em> - параметр сглаживания, обычно устанавливаемый на 60.</p></li>
<li><p><strong>Агрегированное ранжирование</strong>: Повторное ранжирование результатов поиска на основе объединенных рейтингов для получения окончательных результатов.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/RRF-reranker.png" alt="RRF Reranker" class="doc-image" id="rrf-reranker" />
   </span> <span class="img-wrapper"> <span>RRF Reranker</span> </span></p>
<h3 id="Example-of-RRFRanker" class="common-anchor-header">Пример RRFRanker</h3><p>Этот пример демонстрирует гибридный поиск (topK=5) на разреженных плотных векторах и показывает, как стратегия RRFRanker ранжирует результаты двух ANN-поисков.</p>
<ul>
<li>Результаты поиска ANN на разреженных векторах текстов （topK=5)：</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Ранг (разреженный)</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>1</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>2</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>3</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>4</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>5</p></td>
   </tr>
</table>
<ul>
<li>Результаты поиска ANN на плотных векторах текстов （topK=5)：</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Ранг (плотный)</strong></p></th>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>1</p></td>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>2</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>3</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>4</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>5</p></td>
   </tr>
</table>
<ul>
<li>Используйте RRF, чтобы изменить ранжирование двух наборов результатов поиска. Предположим, что параметр сглаживания <code translate="no">k</code> установлен на 60.</li>
</ul>
<table>
   <tr>
     <th><p><strong>ИДЕНТИФИКАТОР</strong></p></th>
     <th><p><strong>Оценка (разреженная)</strong></p></th>
     <th><p><strong>Оценка (плотная)</strong></p></th>
     <th><p><strong>Итоговый балл</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>1</p></td>
     <td><p>2</p></td>
     <td><p>1/(60+1)+1/(60+2) = 0.01639</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>4</p></td>
     <td><p>1</p></td>
     <td><p>1/(60+4)+1/(60+1) = 0.01593</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>5</p></td>
     <td><p>4</p></td>
     <td><p>1/(60+5)+1/(60+4) = 0.01554</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>2</p></td>
     <td><p>Н/А</p></td>
     <td><p>1/(60+2) = 0.01613</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>3</p></td>
     <td><p>N/A</p></td>
     <td><p>1/(60+3) = 0.01587</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>N/A</p></td>
     <td><p>3</p></td>
     <td><p>1/(60+3) = 0.01587</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>N/A</p></td>
     <td><p>5</p></td>
     <td><p>1/(60+5) = 0.01554</p></td>
   </tr>
</table>
<ul>
<li>Окончательные результаты после повторного ранжирования（topK=5)：</li>
</ul>
<table>
   <tr>
     <th><p><strong>Ранг</strong></p></th>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Итоговый балл</strong></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>101</p></td>
     <td><p>0.01639</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>203</p></td>
     <td><p>0.01613</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>198</p></td>
     <td><p>0.01593</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>150</p></td>
     <td><p>0.01587</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>110</p></td>
     <td><p>0.01587</p></td>
   </tr>
</table>
<h3 id="Usage-of-RRFRanker" class="common-anchor-header">Использование RRFRanker</h3><p>При использовании стратегии ранжирования RRF необходимо настроить параметр <code translate="no">k</code>. Это сглаживающий параметр, который может эффективно изменять относительные веса полнотекстового поиска по сравнению с векторным поиском. По умолчанию значение этого параметра равно 60, и оно может быть изменено в диапазоне (0, 16384). Значение должно быть числом с плавающей точкой. Рекомендуемое значение находится в диапазоне [10, 100]. Хотя <code translate="no">k=60</code> является распространенным выбором, оптимальное значение <code translate="no">k</code> может варьироваться в зависимости от конкретных приложений и наборов данных. Мы рекомендуем тестировать и настраивать этот параметр в зависимости от конкретного случая использования для достижения наилучшей производительности.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

ranker = RRFRanker(<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.RRFRanker;

<span class="hljs-type">RRFRanker</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-number">100</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">reranker := milvusclient.NewRRFReranker().WithK(<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-attr">rerank</span>: <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-string">&quot;100&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-string">&quot;rerank&quot;</span>: {
    <span class="hljs-string">&quot;strategy&quot;</span>: <span class="hljs-string">&quot;rrf&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;k&quot;</span>: 100
    }
}
<span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{
        &quot;strategy&quot;: &quot;rrf&quot;,
        &quot;params&quot;: {&quot;k&quot;: 100}
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Select-the-right-reranking-strategy" class="common-anchor-header">Выберите правильную стратегию ранжирования<button data-href="#Select-the-right-reranking-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>При выборе стратегии ранжирования следует обратить внимание на то, есть ли упор на один или несколько базовых ANN-поисков по векторным полям.</p>
<ul>
<li><p><strong>WeightedRanker</strong>: Эта стратегия рекомендуется, если вы хотите, чтобы результаты были акцентированы на определенном векторном поле. WeightedRanker позволяет присваивать более высокие веса определенным векторным полям, делая на них больший акцент. Например, при мультимодальном поиске текстовые описания изображения могут считаться более важными, чем цвета на этом изображении.</p></li>
<li><p><strong>RRFRanker (Reciprocal Rank Fusion Ranker)</strong>: Эта стратегия рекомендуется, когда нет конкретного акцента. RRF может эффективно сбалансировать важность каждого векторного поля.</p></li>
</ul>
