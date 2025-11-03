---
id: rrf-ranker.md
title: RRF Ranker
summary: >-
  Reciprocal Rank Fusion (RRF) Ranker - это стратегия ранжирования для
  гибридного поиска Milvus, которая уравновешивает результаты из нескольких
  векторных путей поиска на основе их рейтинговых позиций, а не сырых оценок
  сходства. Подобно спортивному турниру, в котором учитывается рейтинг игроков,
  а не их индивидуальная статистика, RRF Ranker объединяет результаты поиска на
  основе того, насколько высоко каждый элемент занимает позиции в разных путях
  поиска, создавая справедливый и сбалансированный итоговый рейтинг.
---
<h1 id="RRF-Ranker" class="common-anchor-header">RRF Ranker<button data-href="#RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>Reciprocal Rank Fusion (RRF) Ranker - это стратегия ранжирования для гибридного поиска Milvus, которая уравновешивает результаты из нескольких векторных путей поиска на основе их рейтинговых позиций, а не сырых оценок сходства. Подобно спортивному турниру, в котором учитывается рейтинг игроков, а не их индивидуальная статистика, RRF Ranker объединяет результаты поиска на основе того, насколько высоко каждый элемент занимает позиции в разных путях поиска, создавая справедливый и сбалансированный итоговый рейтинг.</p>
<h2 id="When-to-use-RRF-Ranker" class="common-anchor-header">Когда использовать RRF Ranker<button data-href="#When-to-use-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>RRF Ranker специально разработан для гибридных сценариев поиска, в которых необходимо сбалансировать результаты, полученные по нескольким векторным путям поиска, без присвоения явных весов важности. Он особенно эффективен для:</p>
<table>
   <tr>
     <th><p>Пример использования</p></th>
     <th><p>Пример</p></th>
     <th><p>Почему RRF Ranker хорошо работает</p></th>
   </tr>
   <tr>
     <td><p>Мультимодальный поиск с равной важностью</p></td>
     <td><p>Поиск изображений и текстов, где обе модальности имеют одинаковое значение</p></td>
     <td><p>Балансирует результаты, не требуя произвольных весовых коэффициентов</p></td>
   </tr>
   <tr>
     <td><p>Ансамблевый векторный поиск</p></td>
     <td><p>Объединение результатов различных моделей встраивания</p></td>
     <td><p>Демократическое объединение рейтингов без предпочтения распределения баллов какой-либо конкретной модели</p></td>
   </tr>
   <tr>
     <td><p>Межъязыковой поиск</p></td>
     <td><p>Поиск документов на нескольких языках</p></td>
     <td><p>Справедливое ранжирование результатов независимо от языковых особенностей встраивания</p></td>
   </tr>
   <tr>
     <td><p>Экспертные рекомендации</p></td>
     <td><p>Объединение рекомендаций от нескольких экспертных систем</p></td>
     <td><p>Создает консенсусные рейтинги, когда различные системы используют несравнимые методы оценки</p></td>
   </tr>
</table>
<p>Если в вашем приложении для гибридного поиска требуется сбалансировать несколько путей поиска демократическим путем без присвоения явных весов, RRF Ranker - ваш идеальный выбор.</p>
<h2 id="Mechanism-of-RRF-Ranker" class="common-anchor-header">Механизм работы RRF Ranker<button data-href="#Mechanism-of-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Основной рабочий процесс стратегии RRFRanker выглядит следующим образом:</p>
<ol>
<li><p><strong>Сбор поисковых рейтингов</strong>: Собираем ранги результатов из каждого пути векторного поиска (rank_1, rank_2).</p></li>
<li><p><strong>Слияние рангов</strong>: Преобразование рангов из каждого пути (rank_rrf_1, rank_rrf_2) в соответствии с формулой.</p>
<p>Формула расчета включает <em>N</em>, представляющее собой количество поисковых запросов. <em>ranki</em><em>(d</em>) - ранговая позиция документа <em>d</em>, полученная <em>i-м</em> ретривером. <em>k</em> - параметр сглаживания, обычно устанавливаемый на 60.</p></li>
<li><p><strong>Агрегированное ранжирование</strong>: Повторное ранжирование результатов поиска на основе объединенных рейтингов для получения окончательных результатов.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/rrf-ranker.png" alt="Rrf Ranker" class="doc-image" id="rrf-ranker" />
   </span> <span class="img-wrapper"> <span>Ранжировщик RRF</span> </span></p>
<h2 id="Example-of-RRF-Ranker" class="common-anchor-header">Пример RRF Ranker<button data-href="#Example-of-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Этот пример демонстрирует гибридный поиск (topK=5) на разреженных плотных векторах и показывает, как стратегия RRFRanker ранжирует результаты двух ANN-поисков.</p>
<ul>
<li><p>Результаты ANN-поиска на разреженных векторах текстов （topK=5)：.</p>
<p><table>
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
</table></p></li>
<li><p>Результаты поиска ANN на плотных векторах текстов （topK=5)：</p>
<p><table>
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
</table></p></li>
<li><p>Используйте RRF, чтобы изменить ранжирование двух наборов результатов поиска. Предположим, что параметр сглаживания <code translate="no">k</code> установлен на 60.</p>
<p><table>
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
</table></p></li>
<li><p>Окончательные результаты после повторного ранжирования（topK=5)：</p>
<p><table>
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
</table></p></li>
</ul>
<h2 id="Usage-of-RRF-Ranker" class="common-anchor-header">Использование ранжировщика RRF<button data-href="#Usage-of-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>При использовании стратегии ранжирования RRF необходимо настроить параметр <code translate="no">k</code>. Это сглаживающий параметр, который может эффективно изменять относительные веса полнотекстового поиска по сравнению с векторным поиском. По умолчанию значение этого параметра равно 60, и оно может быть изменено в диапазоне (0, 16384). Значение должно быть числом с плавающей точкой. Рекомендуемое значение находится в диапазоне [10, 100]. Хотя <code translate="no">k=60</code> является распространенным выбором, оптимальное значение <code translate="no">k</code> может варьироваться в зависимости от ваших конкретных приложений и наборов данных. Мы рекомендуем тестировать и настраивать этот параметр в зависимости от конкретного случая использования для достижения наилучшей производительности.</p>
<h3 id="Create-an-RRF-Ranker" class="common-anchor-header">Создание ранжировщика RRF<button data-href="#Create-an-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>После настройки коллекции с несколькими векторными полями создайте ранжировщик RRF с подходящим параметром сглаживания:</p>
<div class="alert note">
<p>Milvus 2.6.x и более поздние версии позволяют настраивать стратегии ранжирования непосредственно через <code translate="no">Function</code> API. Если вы используете более раннюю версию (до v2.6.0), обратитесь к документации по <a href="https://milvus.io/docs/v2.5.x/reranking.md#Usage-of-RRFRanker">ранжированию</a> за инструкциями по настройке.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

ranker = Function(
    name=<span class="hljs-string">&quot;rrf&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;rrf&quot;</span>, 
        <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">100</span>  <span class="hljs-comment"># Optional</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">Function</span> <span class="hljs-variable">rr</span> <span class="hljs-operator">=</span> CreateCollectionReq.Function.builder()
                .functionType(FunctionType.RERANK)
                .param(<span class="hljs-string">&quot;strategy&quot;</span>, <span class="hljs-string">&quot;rrf&quot;</span>)
                .param(<span class="hljs-string">&quot;params&quot;</span>, <span class="hljs-string">&quot;{\&quot;k\&quot;: 100}&quot;</span>)
                .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> ranker = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;weight&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">function_type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;weighted&quot;</span>,
    <span class="hljs-attr">weights</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.9</span>],
    <span class="hljs-attr">norm_score</span>: <span class="hljs-literal">true</span>,
  },
};

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Restful</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Параметр</p></th>
     <th><p>Требуемый?</p></th>
     <th><p>Описание</p></th>
     <th><p>Значение/пример</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Да</p></td>
     <td><p>Уникальный идентификатор для данной функции</p></td>
     <td><p><code translate="no">"rrf"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Да</p></td>
     <td><p>Список векторных полей, к которым следует применить функцию (должен быть пустым для RRF Ranker)</p></td>
     <td><p>[]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Да</p></td>
     <td><p>Тип вызываемой функции; используйте <code translate="no">RERANK</code> для указания стратегии ранжирования.</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Да</p></td>
     <td><p>Указывает используемый метод ранжирования.</p><p>Должно быть установлено значение <code translate="no">rrf</code>, чтобы использовать RRF Ranker.</p></td>
     <td><p><code translate="no">"weighted"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.k</code></p></td>
     <td><p>Нет</p></td>
     <td><p>Параметр сглаживания, который контролирует влияние рангов документов; более высокий <code translate="no">k</code> снижает чувствительность к верхним рангам. Диапазон: (0, 16384); по умолчанию: <code translate="no">60</code>.</p><p>Подробности см. в разделе <a href="/docs/ru/rrf-ranker.md#Mechanism-of-RRF-Ranker">Механизм работы RRF Ranker</a>.</p></td>
     <td><p><code translate="no">100</code></p></td>
   </tr>
</table>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">Применение к гибридному поиску<button data-href="#Apply-to-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h3><p>RRF Ranker разработан специально для гибридных поисковых операций, которые объединяют несколько векторных полей. Вот как использовать его в гибридном поиске:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, AnnSearchRequest

<span class="hljs-comment"># Connect to Milvus server</span>
milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Assume you have a collection setup</span>

<span class="hljs-comment"># Define text vector search request</span>
text_search = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;modern dining table&quot;</span>],
    anns_field=<span class="hljs-string">&quot;text_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Define image vector search request</span>
image_search = AnnSearchRequest(
    data=[image_embedding],  <span class="hljs-comment"># Image embedding vector</span>
    anns_field=<span class="hljs-string">&quot;image_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Apply RRF Ranker to product hybrid search</span>
<span class="hljs-comment"># The smoothing parameter k controls the balance</span>
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [text_search, image_search],  <span class="hljs-comment"># Multiple search requests</span>
<span class="highlighted-wrapper-line">    ranker=ranker,  <span class="hljs-comment"># Apply the RRF ranker</span></span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.AnnSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.HybridSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());
        
List&lt;AnnSearchReq&gt; searchRequests = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;text_vector&quot;</span>)
        .vectors(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;\&quot;modern dining table\&quot;&quot;</span>)))
        .limit(<span class="hljs-number">10</span>)
        .build());
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;image_vector&quot;</span>)
        .vectors(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(imageEmbedding)))
        .limit(<span class="hljs-number">10</span>)
        .build());
        
<span class="hljs-type">HybridSearchReq</span> <span class="hljs-variable">hybridSearchReq</span> <span class="hljs-operator">=</span> HybridSearchReq.builder()
                .collectionName(COLLECTION_NAME)
                .searchRequests(searchRequests)
                .ranker(ranker)
                .limit(<span class="hljs-number">10</span>)
                .outputFields(Arrays.asList(<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>))
                .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.hybridSearch(hybridSearchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> milvusClient = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">const</span> text_search = {
    <span class="hljs-attr">data</span>: [<span class="hljs-string">&quot;modern dining table&quot;</span>],
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;text_vector&quot;</span>,
    <span class="hljs-attr">param</span>: {},
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
};

<span class="hljs-keyword">const</span> image_search = {
  <span class="hljs-attr">data</span>: [image_embedding],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;image_vector&quot;</span>,
  <span class="hljs-attr">param</span>: {},
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
};

<span class="hljs-keyword">const</span> ranker = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;weight&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">function_type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;weighted&quot;</span>,
    <span class="hljs-attr">weights</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.9</span>],
    <span class="hljs-attr">norm_score</span>: <span class="hljs-literal">true</span>,
  },
};

<span class="hljs-keyword">const</span> search = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: collection_name,
  <span class="hljs-attr">data</span>: [text_search, image_search],
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>],
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">rerank</span>: ranker,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Более подробную информацию о гибридном поиске см. в разделе <a href="/docs/ru/multi-vector-search.md">Многовекторный гибридный поиск</a>.</p>
