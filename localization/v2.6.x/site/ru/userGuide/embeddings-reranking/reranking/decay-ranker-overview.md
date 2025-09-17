---
id: decay-ranker-overview.md
title: Обзор Decay RankerCompatible with Milvus 2.6.x
summary: >-
  В традиционном векторном поиске результаты ранжируются исключительно по
  векторному сходству - насколько близко векторы совпадают в математическом
  пространстве. Но в реальных приложениях то, что делает контент действительно
  релевантным, часто зависит не только от семантического сходства.
beta: Milvus 2.6.x
---
<h1 id="Decay-Ranker-Overview" class="common-anchor-header">Обзор Decay Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Decay-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>В традиционном векторном поиске результаты ранжируются исключительно по векторному сходству - насколько близко векторы совпадают в математическом пространстве. Но в реальных приложениях то, что делает контент действительно релевантным, часто зависит не только от семантического сходства.</p>
<p>Рассмотрим эти повседневные сценарии:</p>
<ul>
<li><p>Поиск новостей, в котором вчерашняя статья должна занимать более высокое место, чем аналогичная статья трехлетней давности.</p></li>
<li><p>Система поиска ресторанов, которая отдает предпочтение заведениям, расположенным в 5 минутах езды, а не тем, до которых нужно ехать 30 минут.</p></li>
<li><p>Платформа электронной коммерции, которая продвигает трендовые товары, даже если они чуть менее похожи на поисковый запрос.</p></li>
</ul>
<p>Все эти сценарии объединяет общая потребность: сбалансировать векторное сходство с другими числовыми факторами, такими как время, расстояние или популярность.</p>
<p>Ранжировщики распада в Milvus решают эту задачу, корректируя рейтинги поиска на основе значений числовых полей. Они позволяют сбалансировать векторное сходство со "свежестью", "близостью" или другими числовыми свойствами ваших данных, создавая более интуитивный и контекстуально релевантный опыт поиска.</p>
<h2 id="Usage-notes" class="common-anchor-header">Примечания по использованию<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p>Ранжирование по распаду нельзя использовать при поиске по группам.</p></li>
<li><p>Поле, используемое для ранжирования по распаду, должно быть числовым (<code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">FLOAT</code> или <code translate="no">DOUBLE</code>).</p></li>
<li><p>Каждый ранжировщик распада может использовать только одно числовое поле.</p></li>
<li><p><strong>Согласованность единиц времени</strong>: При использовании ранжирования по времени единицы измерения для параметров <code translate="no">origin</code>, <code translate="no">scale</code> и <code translate="no">offset</code> должны соответствовать единицам измерения, используемым в данных вашей коллекции:</p>
<ul>
<li>Если в коллекции хранятся временные метки в <strong>секундах</strong>, используйте секунды для всех параметров.</li>
<li>Если в коллекции хранятся временные метки в <strong>миллисекундах</strong>, используйте миллисекунды для всех параметров</li>
<li>Если ваша коллекция хранит временные метки в <strong>микросекундах</strong>, используйте микросекунды для всех параметров.</li>
</ul></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">Как это работает<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Ранжирование по распаду расширяет возможности традиционного векторного поиска за счет включения в процесс ранжирования таких числовых факторов, как время или географическое расстояние. Весь процесс проходит по следующим этапам:</p>
<h3 id="Stage-1-Calculate-normalized-similarity-scores" class="common-anchor-header">Этап 1: Вычисление нормализованных баллов сходства<button data-href="#Stage-1-Calculate-normalized-similarity-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>Сначала Milvus рассчитывает и нормализует баллы сходства векторов, чтобы обеспечить последовательное сравнение:</p>
<ul>
<li><p>Для метрик расстояния <strong>L2</strong> и <strong>JACCARD</strong> (где меньшие значения указывают на большую схожесть):</p>
<pre><code translate="no" class="language-plaintext">normalized_score = 1.0 - (2 × arctan(score))/π
<button class="copy-code-btn"></button></code></pre>
<p>Расстояния преобразуются в баллы сходства от 0 до 1, где большее значение лучше.</p></li>
<li><p>Для метрик <strong>IP</strong>, <strong>COSINE</strong> и <strong>BM25</strong> (где более высокие значения уже указывают на лучшее сходство): Баллы используются напрямую без нормализации.</p></li>
</ul>
<h3 id="Stage-2-Calculate-decay-scores" class="common-anchor-header">Этап 2: Расчет оценок распада<button data-href="#Stage-2-Calculate-decay-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>Далее Milvus рассчитывает оценку распада на основе значения числового поля (например, временной метки или расстояния), используя выбранный вами ранжировщик распада:</p>
<ul>
<li><p>Каждый ранжировщик распада преобразует необработанные числовые значения в нормализованные оценки релевантности в диапазоне от 0 до 1.</p></li>
<li><p>Балл распада отражает степень релевантности элемента в зависимости от его "расстояния" до идеальной точки.</p></li>
</ul>
<p>Формула расчета зависит от типа ранжировщика распада. Подробнее о том, как рассчитать балл распада, читайте на страницах, посвященных <a href="/docs/ru/gaussian-decay.md#Formula">гауссову распаду</a>, <a href="/docs/ru/exponential-decay.md#Formula">экспоненциальному распаду</a> и <a href="/docs/ru/linear-decay.md#Formula">линейному распаду</a>.</p>
<h3 id="Stage-3-Compute-final-scores" class="common-anchor-header">Этап 3: Вычисление итоговых оценок<button data-href="#Stage-3-Compute-final-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>Наконец, Milvus объединяет нормализованный балл сходства и балл распада, чтобы получить итоговый балл ранжирования:</p>
<pre><code translate="no" class="language-plaintext">final_score = normalized_similarity_score × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>В случае гибридного поиска (сочетающего несколько векторных полей) Milvus берет максимальный нормализованный балл сходства среди поисковых запросов:</p>
<pre><code translate="no" class="language-plaintext">final_score = max([normalized_score₁, normalized_score₂, ..., normalized_scoreₙ]) × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>Например, если научная статья получила 0,82 балла за векторное сходство и 0,91 балла за поиск текста на основе BM25 в гибридном поиске, Milvus использует 0,91 балла в качестве базового балла сходства перед применением коэффициента распада.</p>
<h3 id="Decay-ranking-in-action" class="common-anchor-header">Ранжирование по распаду в действии<button data-href="#Decay-ranking-in-action" class="anchor-icon" translate="no">
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
    </button></h3><p>Давайте посмотрим на ранжирование по распаду в практическом сценарии - поиск <strong>"исследовательских работ по искусственному интеллекту"</strong> с распадом по времени:</p>
<div class="alert note">
<p>В этом примере показатели распада отражают, как релевантность уменьшается со временем - более новые статьи получают оценки ближе к 1,0, более старые - ниже. Эти значения рассчитываются с помощью специального ранжировщика распада. Подробнее см. в разделе <a href="/docs/ru/decay-ranker-overview.md#Choose-the-right-decay-ranker">Выбор правильного ранжировщика распада</a>.</p>
</div>
<table>
   <tr>
     <th><p>Статья</p></th>
     <th><p>Векторное сходство</p></th>
     <th><p>Нормализованный балл сходства</p></th>
     <th><p>Дата публикации</p></th>
     <th><p>Оценка распада</p></th>
     <th><p>Итоговый балл</p></th>
     <th><p>Итоговый ранг</p></th>
   </tr>
   <tr>
     <td><p>Бумага A</p></td>
     <td><p>Высокий</p></td>
     <td><p>0,85 (<code translate="no">COSINE</code>)</p></td>
     <td><p>2 недели назад</p></td>
     <td><p>0.80</p></td>
     <td><p>0.68</p></td>
     <td>2</td>
   </tr>
   <tr>
     <td><p>Бумага B</p></td>
     <td><p>Очень высокий</p></td>
     <td><p>0,92 (<code translate="no">COSINE</code>)</p></td>
     <td><p>6 месяцев назад</p></td>
     <td><p>0.45</p></td>
     <td><p>0.41</p></td>
     <td>3</td>
   </tr>
   <tr>
     <td><p>Бумага C</p></td>
     <td><p>Средний</p></td>
     <td><p>0.75 (<code translate="no">COSINE</code>)</p></td>
     <td><p>1 день назад</p></td>
     <td><p>0.98</p></td>
     <td><p>0.74</p></td>
     <td>1</td>
   </tr>
   <tr>
     <td><p>Бумага D</p></td>
     <td><p>Средне-высокий</p></td>
     <td><p>0.76 (<code translate="no">COSINE</code>)</p></td>
     <td><p>3 недели назад</p></td>
     <td><p>0.70</p></td>
     <td><p>0.53</p></td>
     <td>4</td>
   </tr>
</table>
<p>Без ранжирования по распаду бумага B заняла бы самое высокое место на основе чистого векторного сходства (0,92). Однако с применением ранжирования по распаду:</p>
<ul>
<li><p>Работа C поднимается на позицию №1, несмотря на среднее сходство, потому что она очень свежая (опубликована вчера).</p></li>
<li><p>Работа B опускается на позицию № 3, несмотря на отличное сходство, потому что она относительно старая.</p></li>
<li><p>Работа D использует расстояние L2 (где меньше - лучше), поэтому ее оценка нормализуется с 1,2 до 0,76 перед применением распада</p></li>
</ul>
<h2 id="Choose-the-right-decay-ranker" class="common-anchor-header">Выберите правильный ранжировщик распада<button data-href="#Choose-the-right-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus предлагает различные ранжировщики распада - <code translate="no">gauss</code>, <code translate="no">exp</code>, <code translate="no">linear</code>, каждый из которых предназначен для конкретных случаев использования:</p>
<table>
   <tr>
     <th><p>Ранжировщик распада</p></th>
     <th><p>Характеристики</p></th>
     <th><p>Идеальные сценарии использования</p></th>
     <th><p>Пример сценария</p></th>
   </tr>
   <tr>
     <td><p>Гаусс (<code translate="no">gauss</code>)</p></td>
     <td><p>Естественный постепенный спад, который умеренно расширяется</p></td>
     <td><ul>
<li><p>Общий поиск, требующий сбалансированных результатов</p></li>
<li><p>Приложения, в которых пользователи интуитивно чувствуют расстояние</p></li>
<li><p>Когда умеренное расстояние не должно сильно ухудшать результаты</p></li>
</ul></td>
     <td><p>При поиске ресторана качественные заведения, расположенные на расстоянии 3 км, остаются доступными для обнаружения, хотя и ранжируются ниже, чем близлежащие варианты</p></td>
   </tr>
   <tr>
     <td><p>Экспоненциальный (<code translate="no">exp</code>)</p></td>
     <td><p>Сначала быстро снижается, но потом сохраняет длинный хвост</p></td>
     <td><ul>
<li><p>Новостные ленты, где критична повторяемость</p></li>
<li><p>Социальные сети, где должен преобладать свежий контент</p></li>
<li><p>Когда предпочтение отдается близости, но исключительные удаленные материалы должны оставаться видимыми</p></li>
</ul></td>
     <td><p>В новостном приложении вчерашние статьи ранжируются гораздо выше, чем материалы недельной давности, но высоко релевантные старые статьи все равно могут появляться</p></td>
   </tr>
   <tr>
     <td><p>Линейный (<code translate="no">linear</code>)</p></td>
     <td><p>Последовательный, предсказуемый спад с четкой границей</p></td>
     <td><ul>
<li><p>Приложения с естественными границами</p></li>
<li><p>Услуги с ограничениями по расстоянию</p></li>
<li><p>Контент с датами истечения срока действия или четкими пороговыми значениями.</p></li>
</ul></td>
     <td><p>В системе поиска событий события, выходящие за рамки двухнедельного будущего, просто не отображаются.</p></td>
   </tr>
</table>
<p>Подробную информацию о том, как каждый ранжировщик распада рассчитывает баллы и конкретные модели распада, см. в специальной документации:</p>
<ul>
<li><p><a href="/docs/ru/gaussian-decay.md">Гауссово распадение</a></p></li>
<li><p><a href="/docs/ru/exponential-decay.md">Экспоненциальный распад</a></p></li>
<li><p><a href="/docs/ru/linear-decay.md">Линейный распад</a></p></li>
</ul>
<h2 id="Implementation-example" class="common-anchor-header">Пример реализации<button data-href="#Implementation-example" class="anchor-icon" translate="no">
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
    </button></h2><p>Ранжировщики распада могут применяться как к стандартному векторному поиску, так и к гибридным операциям поиска в Milvus. Ниже приведены ключевые фрагменты кода для реализации этой возможности.</p>
<div class="alert note">
<p>Перед использованием функций распада необходимо создать коллекцию с соответствующими числовыми полями (например, временными метками, расстояниями и т. д.), которые будут использоваться для расчетов распада. Полные рабочие примеры, включающие настройку коллекции, определение схемы и вставку данных, см. в разделе <a href="/docs/ru/tutorial-implement-a-time-based-ranking-in-milvus.md">Учебник: Реализация ранжирования по времени в Milvus</a>.</p>
</div>
<h3 id="Create-a-decay-ranker" class="common-anchor-header">Создание ранжировщика распада<button data-href="#Create-a-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Чтобы реализовать ранжирование по распаду, сначала определите объект <code translate="no">Function</code> с соответствующей конфигурацией:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

<span class="hljs-comment"># Create a decay function for timestamp-based decay</span>
<span class="hljs-comment"># Note: All time parameters must use the same unit as your collection data</span>
decay_ranker = Function(
    name=<span class="hljs-string">&quot;time_decay&quot;</span>,                  <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;timestamp&quot;</span>],    <span class="hljs-comment"># Numeric field to use for decay</span>
    function_type=FunctionType.RERANK,  <span class="hljs-comment"># Must be set to RERANK for decay rankers</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;decay&quot;</span>,            <span class="hljs-comment"># Specify decay reranker. Must be &quot;decay&quot;</span>
        <span class="hljs-string">&quot;function&quot;</span>: <span class="hljs-string">&quot;gauss&quot;</span>,            <span class="hljs-comment"># Choose decay function type: &quot;gauss&quot;, &quot;exp&quot;, or &quot;linear&quot;</span>
        <span class="hljs-string">&quot;origin&quot;</span>: <span class="hljs-built_in">int</span>(datetime.datetime(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">15</span>).timestamp()),    <span class="hljs-comment"># Reference point (seconds)</span>
        <span class="hljs-string">&quot;scale&quot;</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,      <span class="hljs-comment"># 7 days in seconds (must match collection data unit)</span>
        <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,         <span class="hljs-comment"># 1 day no-decay zone (must match collection data unit)</span>
        <span class="hljs-string">&quot;decay&quot;</span>: <span class="hljs-number">0.5</span>                    <span class="hljs-comment"># Half score at scale distance</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Параметр</p></th>
     <th><p>Требуется?</p></th>
     <th><p>Описание</p></th>
     <th><p>Значение/пример</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Да</p></td>
     <td><p>Идентификатор вашей функции, используемый при выполнении поиска. Выберите описательное имя, соответствующее вашему сценарию использования.</p></td>
     <td><p><code translate="no">"time_decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Да</p></td>
     <td><p>Числовое поле для расчета показателя распада. Определяет, какой атрибут данных будет использоваться для вычисления распада (например, временные метки для распада на основе времени, координаты для распада на основе местоположения). 
 Это должно быть поле в вашей коллекции, содержащее соответствующие числовые значения. Поддерживаются INT8/16/32/64, FLOAT, DOUBLE.</p></td>
     <td><p><code translate="no">["timestamp"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Да</p></td>
     <td><p>Указывает тип создаваемой функции. Должно быть установлено значение <code translate="no">RERANK</code> для всех ранжировщиков распада.</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Да</p></td>
     <td><p>Указывает используемый метод ранжирования. Должно быть установлено значение <code translate="no">"decay"</code>, чтобы включить функцию ранжирования по распаду.</p></td>
     <td><p><code translate="no">"decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.function</code></p></td>
     <td><p>Да</p></td>
     <td><p>Указывает, какой математический ранжировщик распада следует применить. Определяет форму кривой снижения релевантности. Рекомендации по выбору подходящей функции см. в разделе <a href="/docs/ru/decay-ranker-overview.md#Choose-the-right-decay-ranker">Выбор правильного ранжировщика распада</a>.</p></td>
     <td><p><code translate="no">"gauss"</code>, <code translate="no">"exp"</code>, или <code translate="no">"linear"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.origin</code></p></td>
     <td><p>Да</p></td>
     <td><p>Точка отсчета, от которой рассчитывается балл распада. Элементы, находящиеся на этом значении, получают максимальные баллы релевантности. Для распада, основанного на времени, единица измерения времени должна соответствовать данным коллекции.</p></td>
     <td><ul>
<li>Для временных меток: текущее время (например, <code translate="no">int(time.time())</code>).</li>
<li>Для геолокации: текущие координаты пользователя.</li>
</ul></td>
   </tr>
   <tr>
          <td><p><code translate="no">params.scale</code></p></td>
     <td><p>Да</p></td>
     <td><p>Расстояние или время, за которое релевантность снижается до значения <code translate="no">decay</code>. Определяет, как быстро снижается релевантность. При использовании временной зависимости единица времени должна соответствовать данным сбора. Большие значения создают более постепенное снижение релевантности, меньшие - более резкое.</p></td>
     <td><ul>
<li>Для времени: период в секундах (например, <code translate="no">7 * 24 * 60 * 60</code> в течение 7 дней).</li>
<li>Для расстояния: метры (например, <code translate="no">5000</code> для 5 км).</li>
</ul></td>
   </tr>
   <tr>
          <td><p><code translate="no">params.offset</code></p></td>
     <td><p>Нет</p></td>
     <td><p>Создает "зону без распада" вокруг <code translate="no">origin</code>, где предметы сохраняют полную оценку (оценка распада = 1,0). Предметы в этом диапазоне <code translate="no">origin</code> сохраняют максимальную релевантность. Для распада, основанного на времени, единица измерения времени должна соответствовать данным вашей коллекции.</p></td>
     <td><ul>
<li>Для времени: период в секундах (например, <code translate="no">24 * 60 * 60</code> за 1 день).</li>
<li>Для расстояния: метры (например, <code translate="no">500</code> для 500 м).</li>
</ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.decay</code></p></td>
     <td><p>Нет</p></td>
     <td><p>Значение балла на расстоянии <code translate="no">scale</code>, контролирует крутизну кривой. Более низкие значения создают более крутые кривые спада; более высокие значения создают более плавные кривые спада. Должно быть между 0 и 1.</p></td>
     <td><p><code translate="no">0.5</code> (по умолчанию)</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">Применить к стандартному векторному поиску<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Определив ранжир распада, вы можете применить его в процессе поиска, передав параметр <code translate="no">ranker</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the decay function in standard vector search</span>
results = milvus_client.search(
    collection_name,
    data=[<span class="hljs-string">&quot;search query&quot;</span>],
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>],  <span class="hljs-comment"># Include the decay field in outputs to see values</span>
<span class="highlighted-wrapper-line">    ranker=decay_ranker,                      <span class="hljs-comment"># Apply the decay ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">Применить к гибридному поиску<button data-href="#Apply-to-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Рангомеры распада также можно применять в гибридных поисковых операциях, которые объединяют несколько векторных полей:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Define search requests for different vector fields</span>
dense_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;search query&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

sparse_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;search query&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

<span class="hljs-comment"># Apply decay ranker to hybrid search</span>
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [dense_request, sparse_request],
<span class="highlighted-wrapper-line">    ranker=decay_ranker,                      <span class="hljs-comment"># Same decay ranker works with hybrid search</span></span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>При гибридном поиске Milvus сначала находит максимальную оценку сходства из всех векторных полей, а затем применяет к ней коэффициент распада.</p>
