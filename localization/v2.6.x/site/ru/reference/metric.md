---
id: metric.md
summary: >-
  Milvus поддерживает различные метрики сходства, включая евклидово расстояние,
  внутреннее произведение, Жаккарда и т.д.
title: Метрики сходства
---
<h1 id="Similarity-Metrics" class="common-anchor-header">Метрики сходства<button data-href="#Similarity-Metrics" class="anchor-icon" translate="no">
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
    </button></h1><p>В Milvus метрики сходства используются для измерения сходства между векторами. Выбор хорошей метрики расстояния помогает значительно улучшить производительность классификации и кластеризации.</p>
<p>В следующей таблице показано, как эти широко используемые метрики сходства сочетаются с различными формами входных данных и индексами Milvus. В настоящее время Milvus поддерживает различные типы данных, включая вкрапления с плавающей точкой (часто известные как векторы с плавающей точкой или плотные векторы), двоичные вкрапления (также известные как двоичные векторы) и разреженные вкрапления (также известные как разреженные векторы).</p>
<div class="filter">
 <a href="#floating">Встраивания с плавающей точкой</a> <a href="#binary">Двоичные встраивания</a> <a href="#sparse">Разреженные встраивания</a></div>
<div class="filter-floating table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">Метрические типы</th>
    <th class="tg-0pky">Индексные типы</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>Евклидово расстояние (L2)</li><li>Внутреннее произведение (IP)</li><li>Косинусное сходство (COSINE)</li></td>
    <td class="tg-0pky" rowspan="2"><ul><li>FLAT</li><li>IVF_FLAT</li><li>IVF_SQ8</li><li>IVF_PQ</li><li>GPU_IVF_FLAT</li><li>GPU_IVF_PQ</li><li>HNSW</li><li>DISKANN</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-binary table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">Метрические типы</th>
    <th class="tg-0pky">Типы индексов</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>Жаккард</li><li>Хэмминг</li></ul></td>
    <td class="tg-0pky"><ul><li>BIN_FLAT</li><li>BIN_IVF_FLAT</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-sparse table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">Метрические типы</th>
    <th class="tg-0pky">Типы индексов</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">IP</td>
    <td class="tg-0pky"><ul><li>РАЗРЕЖЕННЫЙ_ИНВЕРТИРОВАННЫЙ_ИНДЕКС</li><li>SPARSE_WAND</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<h3 id="Euclidean-distance-L2" class="common-anchor-header">Евклидово расстояние (L2)<button data-href="#Euclidean-distance-L2" class="anchor-icon" translate="no">
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
    </button></h3><p>По сути, евклидово расстояние измеряет длину отрезка, соединяющего две точки.</p>
<p>Формула для евклидова расстояния выглядит следующим образом:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/euclidean_metric.png" alt="euclidean" class="doc-image" id="euclidean" />
   </span> <span class="img-wrapper"> <span>евклидово</span>расстояние </span></p>
<p>где <strong>a</strong> = (<sub>a0</sub>, <sub>a1</sub>,...,<sub>an-1</sub>) и <strong>b</strong> = (<sub>b0</sub>, <sub>b0</sub>,..., <sub>bn-1</sub>) - две точки в n-мерном евклидовом пространстве.</p>
<p>Это наиболее часто используемая метрика расстояния, которая очень полезна, когда данные непрерывны.</p>
<div class="alert note">
Milvus вычисляет значение перед применением квадратного корня только в том случае, если в качестве метрики расстояния выбрано евклидово расстояние.</div>
<h3 id="Inner-product-IP" class="common-anchor-header">Внутреннее произведение (IP)<button data-href="#Inner-product-IP" class="anchor-icon" translate="no">
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
    </button></h3><p>Расстояние IP между двумя векторными вкраплениями определяется следующим образом:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/IP_formula.png" alt="ip" class="doc-image" id="ip" />
   </span> <span class="img-wrapper"> <span>ip</span> </span></p>
<p>IP более полезно, если вам нужно сравнить ненормированные данные или если вам важны величина и угол.</p>
<div class="alert note">
<p>Если применить метрику расстояния IP к нормализованным эмбеддингам, результат будет эквивалентен вычислению косинусного сходства между эмбеддингами.</p>
</div>
<p>Предположим, что X' нормализовано из вкрапления X:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/normalize_formula.png" alt="normalize" class="doc-image" id="normalize" />
   </span> <span class="img-wrapper"> <span>normalize</span> </span></p>
<p>Корреляция между двумя эмбеддингами выглядит следующим образом:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/normalization_formula.png" alt="normalization" class="doc-image" id="normalization" />
   </span> <span class="img-wrapper"> <span>нормализация</span> </span></p>
<h3 id="Cosine-Similarity" class="common-anchor-header">Косинусное сходство<button data-href="#Cosine-Similarity" class="anchor-icon" translate="no">
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
    </button></h3><p>Косинусное сходство использует косинус угла между двумя наборами векторов для измерения того, насколько они похожи. Вы можете представить два набора векторов как два отрезка прямой, которые начинаются из одного и того же начала координат ([0,0,...]), но направлены в разные стороны.</p>
<p>Чтобы вычислить косинусоидальное сходство между двумя наборами векторов <strong>A = (<sub>a0</sub>, <sub>a1</sub>,...,<sub>an-1</sub>)</strong> и <strong>B = (<sub>b0</sub>, <sub>b1</sub>,..., <sub>bn-1</sub>)</strong>, используйте следующую формулу:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/cosine_similarity.png" alt="cosine_similarity" class="doc-image" id="cosine_similarity" />
   </span> <span class="img-wrapper"> <span>косинусное_подобие</span> </span></p>
<p>Косинусное сходство всегда находится в интервале <strong>[-1, 1]</strong>. Например, косинус сходства двух пропорциональных векторов равен <strong>1</strong>, двух ортогональных векторов - <strong>0</strong>, а двух противоположных векторов - <strong>-1</strong>. Чем больше косинус, тем меньше угол между двумя векторами, что говорит о том, что эти два вектора более похожи друг на друга.</p>
<p>Вычитая косинус сходства из 1, можно получить косинусное расстояние между двумя векторами.</p>
<h3 id="Jaccard-distance" class="common-anchor-header">Расстояние Жаккара<button data-href="#Jaccard-distance" class="anchor-icon" translate="no">
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
    </button></h3><p>Коэффициент сходства Жаккара измеряет сходство между двумя выборочными совокупностями и определяется как кардинальность пересечения определяемых совокупностей, деленная на кардинальность их объединения. Он может быть применен только к конечным выборочным совокупностям.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/jaccard_coeff.png" alt="Jaccard similarity coefficient" class="doc-image" id="jaccard-similarity-coefficient" />
   </span> <span class="img-wrapper"> <span>Коэффициент сходства Жаккара</span> </span></p>
<p>Расстояние Жаккара измеряет несходство между наборами данных и получается путем вычитания коэффициента сходства Жаккара из 1. Для бинарных переменных расстояние Жаккара эквивалентно коэффициенту Танимото.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/jaccard_dist.png" alt="Jaccard distance" class="doc-image" id="jaccard-distance" />
   </span> <span class="img-wrapper"> <span>Расстояние Жаккара</span> </span></p>
<h3 id="Hamming-distance" class="common-anchor-header">Расстояние Хэмминга<button data-href="#Hamming-distance" class="anchor-icon" translate="no">
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
    </button></h3><p>Расстояние Хэмминга измеряет расстояние между строками двоичных данных. Расстояние между двумя строками одинаковой длины - это количество битовых позиций, в которых биты различаются.</p>
<p>Например, пусть есть две строки: 1101 1001 и 1001 1101.</p>
<p>11011001 ⊕ 10011101 = 01000100. Поскольку они содержат две 1, расстояние Хэмминга d (11011001, 10011101) = 2.</p>
<h3 id="Structural-Similarity" class="common-anchor-header">Структурное сходство<button data-href="#Structural-Similarity" class="anchor-icon" translate="no">
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
    </button></h3><p>Когда химическая структура является частью более крупной химической структуры, первая называется субструктурой, а вторая - суперструктурой. Например, этанол является подструктурой уксусной кислоты, а уксусная кислота - надстройкой этанола.</p>
<p>Структурное сходство используется для определения того, похожи ли две химические формулы друг на друга тем, что одна из них является надстройкой или подструктурой другой.</p>
<p>Чтобы определить, является ли A надстройкой B, используйте следующую формулу:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/superstructure.png" alt="superstructure" class="doc-image" id="superstructure" />
   </span> <span class="img-wrapper"> <span>надстройка</span> </span></p>
<p>где:</p>
<ul>
<li>A - двоичное представление химической формулы, которую необходимо найти</li>
<li>B - двоичное представление химической формулы в базе данных.</li>
</ul>
<p>Если формула возвращает <code translate="no">0</code>, то <strong>A</strong> не является надстройкой <strong>B</strong>. В противном случае результат будет обратным.</p>
<p>Чтобы определить, является ли A подструктурой B, используйте следующую формулу:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/substructure.png" alt="substructure" class="doc-image" id="substructure" />
   </span> <span class="img-wrapper"> <span>субструктура</span> </span></p>
<p>Где:</p>
<ul>
<li>A - двоичное представление химической формулы, которую необходимо найти</li>
<li>B - двоичное представление химической формулы в базе данных.</li>
</ul>
<p>Если формула возвращает <code translate="no">0</code>, то <strong>A</strong> не является подструктурой <strong>B</strong>. В противном случае результат будет обратным.</p>
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
    </button></h2><p><details>
<summary><font color="#4fc4f9">Почему в результате векторного поиска в топ1 попадает не сам вектор поиска, если тип метрики - внутреннее произведение?</font></summary>Это происходит, если вы не нормализовали векторы при использовании внутреннего произведения в качестве метрики расстояния.</details>
<details>
<summary><font color="#4fc4f9">Что такое нормализация? Зачем нужна нормализация?</font></summary></p>
<p>Нормализация - это процесс преобразования вложения (вектора) таким образом, чтобы его норма была равна 1. Если вы используете внутреннее произведение для расчета сходства вкраплений, вам необходимо нормализовать вкрапления. После нормализации внутреннее произведение равно косинусному сходству.</p>
<p>
Дополнительную информацию см. в <a href="https://en.wikipedia.org/wiki/Unit_vector">Википедии</a>.</p>
</details>
<details>
<summary><font color="#4fc4f9">Почему я получаю разные результаты, используя в качестве метрики расстояния евклидово расстояние (L2) и внутреннее произведение (IP)?</font></summary>Проверьте, нормализованы ли векторы. Если нет, то сначала нужно нормализовать векторы. Теоретически говоря, сходство, полученное по L2, отличается от сходства, полученного по IP, если векторы не нормализованы.</details>
<h2 id="Whats-next" class="common-anchor-header">Что дальше<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Узнайте больше о поддерживаемых <a href="/docs/ru/index.md">типах индексов</a> в Milvus.</li>
</ul>
