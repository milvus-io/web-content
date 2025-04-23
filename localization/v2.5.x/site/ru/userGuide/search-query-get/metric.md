---
id: metric.md
title: Типы метрик
summary: >-
  Метрики сходства используются для измерения сходства между векторами. Выбор
  подходящей метрики расстояния позволяет значительно повысить эффективность
  классификации и кластеризации.
---
<h1 id="Metric-Types" class="common-anchor-header">Типы метрик<button data-href="#Metric-Types" class="anchor-icon" translate="no">
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
    </button></h1><p>Метрики сходства используются для измерения сходства между векторами. Выбор подходящей метрики расстояния позволяет значительно улучшить производительность классификации и кластеризации.</p>
<p>В настоящее время Milvus поддерживает такие типы метрик сходства: Евклидово расстояние (<code translate="no">L2</code>), внутреннее произведение (<code translate="no">IP</code>), косинусное сходство (<code translate="no">COSINE</code>), <code translate="no">JACCARD</code>, <code translate="no">HAMMING</code>, и <code translate="no">BM25</code> (специально разработанная для полнотекстового поиска по разреженным векторам).</p>
<p>В таблице ниже приведены соответствия между различными типами полей и соответствующими им типами метрик.</p>
<table>
   <tr>
     <th><p>Тип поля</p></th>
     <th><p>Диапазон измерений</p></th>
     <th><p>Поддерживаемые метрические типы</p></th>
     <th><p>Метрический тип по умолчанию</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code></p></td>
     <td><p><code translate="no">COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">FLOAT16_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code></p></td>
     <td><p><code translate="no">COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BFLOAT16_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code></p></td>
     <td><p><code translate="no">COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">SPARSE\_FLOAT\_VECTOR</code></p></td>
     <td><p>Размерность указывать не нужно.</p></td>
     <td><p><code translate="no">IP</code>, <code translate="no">BM25</code> (используется только для полнотекстового поиска)</p></td>
     <td><p><code translate="no">IP</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BINARY_VECTOR</code></p></td>
     <td><p>8-32,768*8</p></td>
     <td><p><code translate="no">HAMMING</code>, <code translate="no">JACCARD</code></p></td>
     <td><p><code translate="no">HAMMING</code></p></td>
   </tr>
</table>
<div class="alert note">
<ul>
<li><p>Для векторных полей типа <code translate="no">SPARSE\_FLOAT\_VECTOR</code> метрический тип <code translate="no">BM25</code> используется только при полнотекстовом поиске. Дополнительные сведения см. в разделе <a href="/docs/ru/full-text-search.md">Полнотекстовый поиск</a>.</p></li>
<li><p>Для векторных полей типа <code translate="no">BINARY_VECTOR</code> значение размерности (<code translate="no">dim</code>) должно быть кратно 8.</p></li>
</ul>
</div>
<p>В таблице ниже приведены характеристики значений расстояния сходства для всех поддерживаемых метрических типов и диапазон их значений.</p>
<table>
   <tr>
     <th><p>Тип метрики</p></th>
     <th><p>Характеристики значений расстояния сходства</p></th>
     <th><p>Диапазон значений расстояния сходства</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">L2</code></p></td>
     <td><p>Меньшее значение указывает на большее сходство.</p></td>
     <td><p>[0, ∞)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">IP</code></p></td>
     <td><p>Большее значение указывает на большее сходство.</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">COSINE</code></p></td>
     <td><p>Большее значение указывает на большее сходство.</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">JACCARD</code></p></td>
     <td><p>Меньшее значение указывает на большее сходство.</p></td>
     <td><p>[0, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">HAMMING</code></p></td>
     <td><p>Меньшее значение указывает на большее сходство.</p></td>
     <td><p>[0, dim(vector)]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BM25</code></p></td>
     <td><p>Оценка релевантности на основе частоты терминов, инвертированной частоты документов и нормализации документов.</p></td>
     <td><p>[0, ∞)</p></td>
   </tr>
</table>
<h2 id="Euclidean-distance-L2" class="common-anchor-header">Евклидово расстояние (L2)<button data-href="#Euclidean-distance-L2" class="anchor-icon" translate="no">
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
    </button></h2><p>По сути, евклидово расстояние измеряет длину отрезка, соединяющего 2 точки.</p>
<p>Формула для евклидова расстояния выглядит следующим образом:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/euclidean-metric.png" alt="Euclidean Metric" class="doc-image" id="euclidean-metric" />
   </span> <span class="img-wrapper"> <span>Евклидова метрика</span> </span></p>
<p>где <strong>a = (<sub>a0</sub>, <sub>a1</sub>,...,<sub>an-1</sub>)</strong> и <strong>b = (<sub>b0</sub>, <sub>b1</sub>,..., <sub>bn-1</sub>)</strong> - две точки в n-мерном евклидовом пространстве.</p>
<p>Это наиболее часто используемая метрика расстояния, которая очень полезна, когда данные непрерывны.</p>
<div class="alert note">
<p>Milvus вычисляет значение перед применением квадратного корня только в том случае, если в качестве метрики расстояния выбрано евклидово расстояние.</p>
</div>
<h2 id="Inner-product-IP" class="common-anchor-header">Внутреннее произведение (IP)<button data-href="#Inner-product-IP" class="anchor-icon" translate="no">
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
    </button></h2><p>Расстояние IP между двумя вкраплениями определяется следующим образом:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/IP-formula.png" alt="IP Formula" class="doc-image" id="ip-formula" />
   </span> <span class="img-wrapper"> <span>Формула IP</span> </span></p>
<p>IP более полезно, если вам нужно сравнить ненормированные данные или если вам важны величина и угол.</p>
<div class="alert note">
<p>Если вы используете IP для вычисления сходства между эмбеддингами, вы должны нормализовать ваши эмбеддинги. После нормализации внутреннее произведение равно косинусному сходству.</p>
</div>
<p>Предположим, что X' нормализовано из вкрапления X:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/normalize-formula.png" alt="Normalize Formula" class="doc-image" id="normalize-formula" />
   </span> <span class="img-wrapper"> <span>Формула нормализации</span> </span></p>
<p>Корреляция между двумя эмбеддингами выглядит следующим образом:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/correlation-between-embeddings.png" alt="Correlation Between Embeddings" class="doc-image" id="correlation-between-embeddings" />
   </span> <span class="img-wrapper"> <span>Корреляция между эмбеддингами</span> </span></p>
<h2 id="Cosine-similarity" class="common-anchor-header">Косинусное сходство<button data-href="#Cosine-similarity" class="anchor-icon" translate="no">
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
    </button></h2><p>Косинусное сходство использует косинус угла между двумя наборами векторов для измерения того, насколько они похожи. Можно представить два набора векторов как отрезки прямых, начинающиеся из одной и той же точки, например [0,0,...], но направленные в разные стороны.</p>
<p>Чтобы вычислить косинусоидальное сходство между двумя наборами векторов <strong>A = (<sub>a0</sub>, <sub>a1</sub>,...,<sub>an-1</sub>)</strong> и <strong>B = (<sub>b0</sub>, <sub>b1</sub>,..., <sub>bn-1</sub>)</strong>, используйте следующую формулу:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/cosine-similarity.png" alt="Cosine Similarity" class="doc-image" id="cosine-similarity" />
   </span> <span class="img-wrapper"> <span>Косинусное сходство</span> </span></p>
<p>Косинусное сходство всегда находится в интервале <strong>[-1, 1]</strong>. Например, косинус сходства двух пропорциональных векторов равен <strong>1</strong>, двух ортогональных векторов - <strong>0</strong>, а двух противоположных векторов - <strong>-1</strong>. Чем больше косинус, тем меньше угол между двумя векторами, что говорит о том, что эти два вектора более похожи друг на друга.</p>
<p>Вычитая косинус сходства из 1, вы можете получить косинусоидальное расстояние между двумя векторами.</p>
<h2 id="JACCARD-distance" class="common-anchor-header">Расстояние JACCARD<button data-href="#JACCARD-distance" class="anchor-icon" translate="no">
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
    </button></h2><p>Коэффициент сходства JACCARD измеряет сходство между двумя выборочными совокупностями и определяется как кардинальность пересечения заданных совокупностей, деленная на кардинальность их объединения. Он может быть применен только к конечным выборочным совокупностям.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/JACCARD-similarity-coefficient-formula.png" alt="JACCARD Similarity Coefficient Formula" class="doc-image" id="jaccard-similarity-coefficient-formula" />
   </span> <span class="img-wrapper"> <span>Формула коэффициента сходства JACCARD</span> </span></p>
<p>Расстояние JACCARD измеряет несходство между наборами данных и получается путем вычитания коэффициента сходства JACCARD из 1. Для бинарных переменных расстояние JACCARD эквивалентно коэффициенту Танимото.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/JACCARD-distance-formula.png" alt="JACCARD Distance Formula" class="doc-image" id="jaccard-distance-formula" />
   </span> <span class="img-wrapper"> <span>Формула расстояния JACCARD</span> </span></p>
<h2 id="HAMMING-distance" class="common-anchor-header">Расстояние Хамминга<button data-href="#HAMMING-distance" class="anchor-icon" translate="no">
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
    </button></h2><p>Расстояние Хамминга измеряет бинарные строки данных. Расстояние между двумя строками одинаковой длины - это количество битовых позиций, в которых биты различаются.</p>
<p>Например, пусть есть две строки, 1101 1001 и 1001 1101.</p>
<p>11011001 ⊕ 10011101 = 01000100. Поскольку они содержат две 1, расстояние HAMMING, d (11011001, 10011101) = 2.</p>
<h2 id="BM25-similarity" class="common-anchor-header">Сходство BM25<button data-href="#BM25-similarity" class="anchor-icon" translate="no">
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
    </button></h2><p>BM25 - это широко используемый метод измерения релевантности текста, специально разработанный для <a href="/docs/ru/full-text-search.md">полнотекстового поиска</a>. Он объединяет следующие три ключевых фактора:</p>
<ul>
<li><p><strong>Частота терминов (TF):</strong> Измеряет, насколько часто термин встречается в документе. Хотя более высокая частота часто указывает на большую важность, BM25 использует параметр насыщенности k_1, чтобы предотвратить доминирование слишком частых терминов в оценке релевантности.</p></li>
<li><p><strong>Обратная частота документа (IDF):</strong> Отражает важность термина во всем корпусе документов. Термины, встречающиеся в меньшем количестве документов, получают более высокое значение IDF, что указывает на больший вклад в релевантность.</p></li>
<li><p><strong>Нормализация длины документа:</strong> Длинные документы имеют тенденцию получать более высокие оценки, так как содержат больше терминов. BM25 уменьшает это смещение путем нормализации длины документов, а параметр b управляет силой этой нормализации.</p></li>
</ul>
<p>Баллы BM25 рассчитываются следующим образом:</p>
<p>score(D, Q)=\sum_{i=1}^{n}IDF(q_i)\cdot {{TF(q_i,D)\cdot(k_1+1)}\over{TF(q_i, D)+k_1\cdot(1-b+b\cdot {{|D|}\over{avgdl}})}}</p>
<p>Описание параметра:</p>
<ul>
<li><p>Q: Текст запроса, предоставленный пользователем.</p></li>
<li><p>D: оцениваемый документ.</p></li>
<li><p>TF(q_i, D): Частота термина, показывающая, как часто термин q_i встречается в документе D.</p></li>
<li><p>IDF(q_i): Обратная частота документа, рассчитывается как:</p>
<p>IDF(q_i)=\log({N-n(q_i)+0.5\over n(q_i)+0.5} + 1)</p>
<p>где N - общее количество документов в корпусе, аn(q_i) - количество документов, содержащих термин q_i.</p></li>
<li><p>|D|: Длина документа D (общее количество терминов).</p></li>
<li><p>avgdl: средняя длина всех документов в корпусе.</p></li>
<li><p>k_1: Регулирует влияние частоты терминов на оценку. Более высокие значения увеличивают важность частоты терминов. Типичный диапазон - [1.2, 2.0], в то время как Milvus допускает диапазон [0, 3].</p></li>
<li><p>b: Управляет степенью нормализации длины, в диапазоне от 0 до 1. Если значение равно 0, нормализация не применяется; если значение равно 1, применяется полная нормализация.</p></li>
</ul>
