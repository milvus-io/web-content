---
id: decay-ranker-overview.md
title: Обзор Decay RankerCompatible with Milvus 2.6.x
summary: >-
  При традиционном векторном поиске результаты ранжируются исключительно по
  степени сходства векторов — то есть по тому, насколько точно они совпадают в
  математическом пространстве. Однако в реальных приложениях релевантность
  контента зачастую зависит не только от семантического сходства.
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
    </button></h1><p>В традиционном векторном поиске результаты ранжируются исключительно по схожести векторов — то есть по тому, насколько близко они совпадают в математическом пространстве. Однако в реальных приложениях релевантность контента часто зависит не только от семантической схожести.</p>
<p>Рассмотрим следующие повседневные сценарии:</p>
<ul>
<li><p>Поиск новостей, при котором вчерашняя статья должна занимать более высокое место в рейтинге, чем похожая статья трехлетней давности</p></li>
<li><p>Поиск ресторанов, при котором заведения, расположенные в 5 минутах ходьбы, отображаются выше тех, до которых нужно ехать 30 минут</p></li>
<li><p>Платформа электронной коммерции, которая продвигает популярные товары, даже если они чуть менее похожи на поисковый запрос</p></li>
</ul>
<p>Все эти сценарии объединяет одна общая потребность: необходимость балансировать сходство векторов с другими числовыми факторами, такими как время, расстояние или популярность.</p>
<p>Ранжировщики с убывающим весом в Milvus решают эту задачу, корректируя поисковый рейтинг на основе значений числовых полей. Они позволяют уравновесить векторное сходство с «свежестью», «близостью» или другими числовыми свойствами ваших данных, создавая более интуитивный и контекстуально релевантный поиск.</p>
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
<li><p>Ранжирование с учетом срока действия не может использоваться при групповом поиске.</p></li>
<li><p>Поле, используемое для ранжирования с убывающей оценкой, должно быть числовым (<code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">FLOAT</code> или <code translate="no">DOUBLE</code>).</p></li>
<li><p>Каждый ранжировщик по затуханию может использовать только одно числовое поле.</p></li>
<li><p><strong>Согласованность единиц измерения времени</strong>: при использовании ранжирования по временному затуханию единицы измерения для параметров <code translate="no">origin</code>, <code translate="no">scale</code> и <code translate="no">offset</code> должны совпадать с единицами, используемыми в данных вашей коллекции:</p>
<ul>
<li><p>Если в вашей коллекции временные метки хранятся в <strong>секундах</strong>, используйте секунды для всех параметров</p></li>
<li><p>Если в вашей коллекции временные метки хранятся в <strong>миллисекундах</strong>, используйте миллисекунды для всех параметров</p></li>
<li><p>Если в вашей коллекции временные метки хранятся в <strong>микросекундах</strong>, используйте микросекунды для всех параметров</p></li>
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
    </button></h2><p>Рейтинг с учетом затухания улучшает традиционный векторный поиск за счет включения в процесс ранжирования таких числовых факторов, как время или географическое расстояние. Весь процесс проходит следующие этапы:</p>
<h3 id="Stage-1-Calculate-normalized-similarity-scores" class="common-anchor-header">Этап 1: Расчет нормализованных оценок схожести<button data-href="#Stage-1-Calculate-normalized-similarity-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>Сначала Milvus вычисляет и нормализует показатели сходства векторов, чтобы обеспечить согласованность сравнения:</p>
<ul>
<li><p>Для метрик расстояния <strong>L2</strong> и <strong>JACCARD</strong> (где более низкие значения указывают на более высокое сходство):</p>
<pre><code translate="no" class="language-plaintext">normalized_score = 1.0 - (2 × arctan(score))/π
<button class="copy-code-btn"></button></code></pre>
<p>Это преобразует расстояния в показатели сходства в диапазоне от 0 до 1, где более высокое значение означает большее сходство.</p></li>
<li><p>Для метрик <strong>IP</strong>, <strong>COSINE</strong> и <strong>BM25</strong> (где более высокие значения уже указывают на лучшее совпадение): показатели используются напрямую, без нормализации.</p></li>
</ul>
<h3 id="Stage-2-Calculate-decay-scores" class="common-anchor-header">Этап 2: Расчет показателей затухания<button data-href="#Stage-2-Calculate-decay-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>Далее Milvus вычисляет показатель затухания на основе числового значения поля (например, временной метки или расстояния) с использованием выбранного вами ранжера затухания:</p>
<ul>
<li><p>Каждый алгоритм ранжирования по коэффициенту затухания преобразует исходные числовые значения в нормализованные показатели релевантности в диапазоне от 0 до 1</p></li>
<li><p>Показатель затухания отражает степень релевантности элемента на основе его «расстояния» от идеальной точки</p></li>
</ul>
<p>Конкретная формула расчёта зависит от типа алгоритма ранжирования с затуханием. Подробности о том, как рассчитывается оценка затухания, см. на страницах, посвящённых <a href="/docs/ru/gaussian-decay.md#Formula">гауссовому затуханию</a>, <a href="/docs/ru/exponential-decay.md#Formula">экспоненциальному затуханию</a> и <a href="/docs/ru/linear-decay.md#Formula">линейному затуханию</a>.</p>
<h3 id="Stage-3-Compute-final-scores" class="common-anchor-header">Этап 3: Вычисление окончательных оценок<button data-href="#Stage-3-Compute-final-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>Наконец, Milvus объединяет нормализованный показатель сходства и показатель затухания для получения итогового рейтингового показателя:</p>
<pre><code translate="no" class="language-plaintext">final_score = normalized_similarity_score × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>В случае гибридного поиска (объединяющего несколько векторных полей) Milvus берет максимальный нормализованный показатель сходства среди поисковых запросов:</p>
<pre><code translate="no" class="language-plaintext">final_score = max([normalized_score₁, normalized_score₂, ..., normalized_scoreₙ]) × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>Например, если в ходе гибридного поиска научная статья получает оценку 0,82 по векторному сходству и 0,91 по текстовому поиску на основе алгоритма BM25, Milvus использует 0,91 в качестве базовой оценки сходства перед применением коэффициента затухания.</p>
<h3 id="Decay-ranking-in-action" class="common-anchor-header">Ранжирование с учетом затухания на практике<button data-href="#Decay-ranking-in-action" class="anchor-icon" translate="no">
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
    </button></h3><p>Рассмотрим ранжирование с учетом затухания на практическом примере — поиске <strong>«научных статей по ИИ»</strong> с временным затуханием:</p>
<div class="alert note">
<p>В этом примере оценки с учетом временного затухания отражают, как релевантность снижается со временем — более новые статьи получают оценки, ближе к 1,0, а более старые — более низкие. Эти значения рассчитываются с помощью специального алгоритма ранжирования с учетом временного затухания. Подробности см. в разделе <a href="/docs/ru/decay-ranker-overview.md#Choose-the-right-decay-ranker">«Выбор подходящего алгоритма ранжирования с учетом временного затухания</a>».</p>
</div>
<table>
   <tr>
     <th><p>Статья</p></th>
     <th><p>Вектор схожести</p></th>
     <th><p>Нормализованный показатель схожести</p></th>
     <th><p>Дата публикации</p></th>
     <th><p>Показатель снижения значимости</p></th>
     <th><p>Итоговый балл</p></th>
     <th><p>Итоговый рейтинг</p></th>
   </tr>
   <tr>
     <td><p>Статья A</p></td>
     <td><p>Высокий</p></td>
     <td><p>0,85 (<code translate="no">COSINE</code>)</p></td>
     <td><p>2 недели назад</p></td>
     <td><p>0,80</p></td>
     <td><p>0,68</p></td>
     <td>2</td>
   </tr>
   <tr>
     <td><p>Работа B</p></td>
     <td><p>Очень высокий</p></td>
     <td><p>0,92 (<code translate="no">COSINE</code>)</p></td>
     <td><p>6 месяцев назад</p></td>
     <td><p>0,45</p></td>
     <td><p>0,41</p></td>
     <td>4</td>
   </tr>
   <tr>
     <td><p>Работа C</p></td>
     <td><p>Средний</p></td>
     <td><p>0,75 (<code translate="no">COSINE</code>)</p></td>
     <td><p>1 день назад</p></td>
     <td><p>0,98</p></td>
     <td><p>0,74</p></td>
     <td>1</td>
   </tr>
   <tr>
     <td><p>Работа D</p></td>
     <td><p>Средний-высокий</p></td>
     <td><p>0,76 (<code translate="no">COSINE</code>)</p></td>
     <td><p>3 недели назад</p></td>
     <td><p>0,70</p></td>
     <td><p>0,53</p></td>
     <td>3</td>
   </tr>
</table>
<p>Без переранжирования с учетом затухания статья B заняла бы первое место по чистому векторному сходству (0,92). Однако при применении переранжирования с учетом затухания:</p>
<ul>
<li><p>Статья C поднимается на первое место, несмотря на среднее сходство, поскольку она очень свежая (опубликована вчера)</p></li>
<li><p>Статья B опускается на 4-е место, несмотря на отличное сходство, поскольку она относительно старая</p></li>
<li><p>В статье D используется коэффициент сходства COSINE, поэтому её оценка 0,76 используется напрямую перед применением метода затухания</p></li>
</ul>
<h2 id="Choose-the-right-decay-ranker" class="common-anchor-header">Выберите подходящий алгоритм ранжирования с убыванием<button data-href="#Choose-the-right-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus предлагает несколько различных алгоритмов ранжирования с убыванием значимости — <code translate="no">gauss</code>, <code translate="no">exp</code>, <code translate="no">linear</code>, каждый из которых предназначен для конкретных случаев использования:</p>
<table>
   <tr>
     <th><p>Ранжировщик с затуханием</p></th>
     <th><p>Характеристики</p></th>
     <th><p>Идеальные сценарии использования</p></th>
     <th><p>Пример сценария</p></th>
   </tr>
   <tr>
     <td><p>Гауссова (<code translate="no">gauss</code>)</p></td>
     <td><p>Естественное постепенное снижение, умеренно расширяющееся</p></td>
     <td><ul><li><p>Общие поисковые запросы, требующие сбалансированных результатов</p></li><li><p>Приложения, в которых у пользователей есть интуитивное представление о расстоянии</p></li><li><p>Когда умеренное расстояние не должно сильно ухудшать результаты</p></li></ul></td>
     <td><p>При поиске ресторанов качественные заведения, расположенные на расстоянии 3 км, остаются видимыми, хотя и занимают более низкие позиции в рейтинге, чем ближайшие варианты</p></td>
   </tr>
   <tr>
     <td><p>Экспоненциальный (<code translate="no">exp</code>)</p></td>
     <td><p>Сначала быстро снижается, но сохраняет длинный хвост</p></td>
     <td><ul><li><p>Ленты новостей, где актуальность имеет решающее значение</p></li><li><p>Социальные сети, где должен преобладать свежий контент</p></li><li><p>Когда близость является важным фактором, но исключительные удаленные объекты должны оставаться видимыми</p></li></ul></td>
     <td><p>В новостном приложении вчерашние статьи занимают гораздо более высокие позиции, чем контент недельной давности, но при этом могут по-прежнему отображаться старые статьи с высокой релевантностью</p></td>
   </tr>
   <tr>
     <td><p>Линейный (<code translate="no">linear</code>)</p></td>
     <td><p>Постоянное, предсказуемое снижение с чёткой границей</p></td>
     <td><ul><li><p>Приложения с естественными границами</p></li><li><p>Сервисы с ограничениями по расстоянию</p></li><li><p>Контент со сроком действия или четкими пороговыми значениями</p></li></ul></td>
     <td><p>В поисковике событий события, выходящие за пределы двухнедельного окна в будущем, просто не отображаются</p></td>
   </tr>
</table>
<p>Подробную информацию о том, как каждый алгоритм ранжирования по спаданию рассчитывает оценки и о конкретных моделях спада, см. в соответствующей документации:</p>
<ul>
<li><p><a href="/docs/ru/gaussian-decay.md">Гауссово затухание</a></p></li>
<li><p><a href="/docs/ru/exponential-decay.md">Экспоненциальный спад</a></p></li>
<li><p><a href="/docs/ru/linear-decay.md">Линейное затухание</a></p></li>
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
    </button></h2><p>Ранжировщики с затуханием можно применять как к стандартному векторному поиску, так и к гибридным операциям поиска в Milvus. Ниже приведены ключевые фрагменты кода для реализации этой функции.</p>
<div class="alert note">
<p>Перед использованием функций затухания необходимо сначала создать коллекцию с соответствующими числовыми полями (такими как временные метки, расстояния и т. д.), которые будут использоваться для расчётов затухания. Полные рабочие примеры, включая настройку коллекции, определение схемы и вставку данных, см. в <a href="/docs/ru/tutorial-implement-a-time-based-ranking-in-milvus.md">руководстве «Реализация ранжирования по времени в Milvus</a>».</p>
</div>
<h3 id="Create-a-decay-ranker" class="common-anchor-header">Создание рангера с затуханием<button data-href="#Create-a-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Для реализации ранжирования с учетом затухания сначала определите объект ` <code translate="no">Function</code> ` с соответствующей конфигурацией:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType
<span class="hljs-keyword">import</span> datetime

<span class="hljs-comment"># Create a decay function for timestamp-based decay</span>
<span class="hljs-comment"># Note: All time parameters must use the same unit as your collection data</span>
rerank = Function(
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.DecayRanker;
<span class="hljs-keyword">import</span> java.time.ZoneId;
<span class="hljs-keyword">import</span> java.time.ZonedDateTime;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">ZonedDateTime</span> <span class="hljs-variable">zdt</span> <span class="hljs-operator">=</span> ZonedDateTime.of(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">25</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, ZoneId.systemDefault());

<span class="hljs-type">DecayRanker</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> DecayRanker.builder()
        .name(<span class="hljs-string">&quot;time_decay&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;timestamp&quot;</span>))
        .function(<span class="hljs-string">&quot;gauss&quot;</span>)
        .origin(zdt.toInstant().getEpochSecond())
        .scale(<span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
        .offset(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
        .decay(<span class="hljs-number">0.5</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

rerank := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;time_decay&quot;</span>).
    WithInputFields(<span class="hljs-string">&quot;timestamp&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;decay&quot;</span>).
    WithParam(<span class="hljs-string">&quot;function&quot;</span>, <span class="hljs-string">&quot;gauss&quot;</span>).
    WithParam(<span class="hljs-string">&quot;origin&quot;</span>, <span class="hljs-number">1735689600</span>).
    WithParam(<span class="hljs-string">&quot;scale&quot;</span>, <span class="hljs-number">7</span>*<span class="hljs-number">24</span>*<span class="hljs-number">60</span>*<span class="hljs-number">60</span>).
    WithParam(<span class="hljs-string">&quot;offset&quot;</span>, <span class="hljs-number">24</span>*<span class="hljs-number">60</span>*<span class="hljs-number">60</span>).
    WithParam(<span class="hljs-string">&quot;decay&quot;</span>, <span class="hljs-number">0.5</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">rerank</span> = DecayRerank::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">function</span>(Function::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;time_decay&quot;</span>)
        .<span class="hljs-title function_ invoke__">input_fields</span>([<span class="hljs-string">&quot;timestamp&quot;</span>])
        .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Rerank)
        .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;decay&quot;</span>))
    .<span class="hljs-title function_ invoke__">decay_function</span>(<span class="hljs-string">&quot;gauss&quot;</span>)
    .<span class="hljs-title function_ invoke__">origin</span>(<span class="hljs-number">1735689600</span>)
    .<span class="hljs-title function_ invoke__">scale</span>(<span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
    .<span class="hljs-title function_ invoke__">offset</span>(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
    .<span class="hljs-title function_ invoke__">decay</span>(<span class="hljs-number">0.5</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> rerank = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::DecayRerank&gt;(<span class="hljs-string">&quot;time_decay&quot;</span>);
rerank-&gt;<span class="hljs-built_in">AddInputFieldName</span>(<span class="hljs-string">&quot;timestamp&quot;</span>);
rerank-&gt;<span class="hljs-built_in">SetFunction</span>(<span class="hljs-string">&quot;gauss&quot;</span>);
rerank-&gt;<span class="hljs-built_in">SetOrigin</span>(<span class="hljs-number">1735689600</span>);
rerank-&gt;<span class="hljs-built_in">SetScale</span>(<span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>);
rerank-&gt;<span class="hljs-built_in">SetOffset</span>(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>);
rerank-&gt;<span class="hljs-built_in">SetDecay</span>(<span class="hljs-number">0.5</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> {<span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> rerank = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;time_decay&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&quot;timestamp&quot;</span>],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;decay&quot;</span>,
    <span class="hljs-attr">function</span>: <span class="hljs-string">&quot;gauss&quot;</span>,
    <span class="hljs-attr">origin</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Date</span>.<span class="hljs-title function_">UTC</span>(<span class="hljs-number">2025</span>, <span class="hljs-number">0</span>, <span class="hljs-number">15</span>) / <span class="hljs-number">1000</span>),
    <span class="hljs-attr">scale</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,
    <span class="hljs-attr">offset</span>: <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,
    <span class="hljs-attr">decay</span>: <span class="hljs-number">0.5</span>,
  },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-comment">// Create a decay function for timestamp-based decay</span>
<span class="hljs-comment">// Note: All time parameters must use the same unit as your collection data</span>
<span class="hljs-keyword">var</span> rerank = <span class="hljs-keyword">new</span> DecayRerank(<span class="hljs-string">&quot;time_decay&quot;</span>)     <span class="hljs-comment">// Function identifier</span>
    .WithInputField(<span class="hljs-string">&quot;timestamp&quot;</span>)                <span class="hljs-comment">// Numeric field to use for decay</span>
    .WithFunction(<span class="hljs-string">&quot;gauss&quot;</span>)                       <span class="hljs-comment">// Choose decay function type: &quot;gauss&quot;, &quot;exp&quot;, or &quot;linear&quot;</span>
    .WithOrigin(<span class="hljs-keyword">new</span> DateTimeOffset(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">15</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, TimeSpan.Zero).ToUnixTimeSeconds()) <span class="hljs-comment">// Reference point (seconds)</span>
    .WithScale(<span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)                 <span class="hljs-comment">// 7 days in seconds (must match collection data unit)</span>
    .WithOffset(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)                    <span class="hljs-comment">// 1 day no-decay zone (must match collection data unit)</span>
    .WithDecay(<span class="hljs-number">0.5f</span>);                            <span class="hljs-comment">// Half score at scale distance</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Параметр</p></th>
     <th><p>Обязателен?</p></th>
     <th><p>Описание</p></th>
     <th><p>Значение/Пример</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Да</p></td>
     <td><p>Идентификатор вашей функции, используемый при выполнении поиска. Выберите описательное имя, соответствующее вашему случаю использования.</p></td>
     <td><p><code translate="no">"time_decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Да</p></td>
     <td><p>Числовое поле для расчета показателя затухания. Определяет, какой атрибут данных будет использоваться для расчета затухания (например, временные метки для затухания по времени, координаты для затухания по местоположению). </p><p>Должно быть полем в вашей коллекции, содержащим соответствующие числовые значения. Поддерживаются типы INT8/16/32/64, FLOAT, DOUBLE.</p></td>
     <td><p><code translate="no">["timestamp"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Да</p></td>
     <td><p>Указывает тип создаваемой функции.</p><p>Для всех ранжировщиков с затуханием должно быть установлено значение « <code translate="no">RERANK</code> ».</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Да</p></td>
     <td><p>Указывает метод переранжирования, который следует использовать.</p><p>Должно быть установлено в значение « <code translate="no">"decay"</code> » для включения функциональности ранжирования с затуханием.</p></td>
     <td><p><code translate="no">"decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.function</code></p></td>
     <td><p>Да</p></td>
     <td><p>Указывает, какой математический ранжировщик по убыванию релевантности следует применить. Определяет форму кривой снижения релевантности.</p><p>См. раздел <a href="/docs/ru/decay-ranker-overview.md#Choose-the-right-decay-ranker">«Выбор подходящего алгоритма ранжирования с затуханием</a> » для получения рекомендаций по выбору соответствующей функции.</p></td>
     <td><p><code translate="no">"gauss"</code>, « <code translate="no">"exp"</code> » или <code translate="no">"linear"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.origin</code></p></td>
     <td><p>Да</p></td>
     <td><p>Опорная точка, от которой рассчитывается оценка снижения релевантности. Элементы с этим значением получают максимальные оценки релевантности.</p><p>Для временного затухания единица измерения времени должна соответствовать данным вашей коллекции.</p></td>
     <td><ul><li><p>Для временных меток: текущее время (например, <code translate="no">int(time.time())</code>)</p></li><li><p>для геолокации: текущие координаты пользователя</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.scale</code></p></td>
     <td><p>Да</p></td>
     <td><p>Расстояние или время, при достижении которых показатель релевантности снижается до значения <code translate="no">decay</code>. Определяет скорость снижения показателя релевантности.</p><p>Для временного снижения релевантности единица измерения времени должна соответствовать вашим данным сбора.</p><p>Более высокие значения приводят к более постепенному снижению релевантности; более низкие значения — к более резкому снижению.</p></td>
     <td><ul><li><p>Для времени: период в секундах (например, <code translate="no">7 * 24 * 60 * 60</code> в течение 7 дней)</p></li><li><p>Для расстояния: метры (например, <code translate="no">5000</code> на расстоянии 5 км)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.offset</code></p></td>
     <td><p>Нет</p></td>
     <td><p>Создает «зону без снижения» вокруг <code translate="no">origin</code>, в которой элементы сохраняют полные оценки (оценка снижения = 1,0).</p><p>Для снижения релевантности по времени единица измерения времени должна соответствовать вашим данным сбора.</p><p>Элементы в пределах этого диапазона от <code translate="no">origin</code> сохраняют максимальную релевантность.</p></td>
     <td><ul><li><p>Для времени: период в секундах (например, <code translate="no">24 * 60 * 60</code> в течение 1 дня)</p></li><li><p>Для расстояния: метры (например, <code translate="no">500</code> на 500 м)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.decay</code></p></td>
     <td><p>Нет</p></td>
     <td><p>Значение показателя на расстоянии « <code translate="no">scale</code> » регулирует крутизну кривой. Меньшие значения создают более крутые кривые спада; большие значения — более пологие кривые спада.</p><p>Должно быть в диапазоне от 0 до 1.</p></td>
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
    </button></h3><p>После определения рангера затухания его можно применять во время операций поиска, передавая его в параметр ` <code translate="no">ranker</code> `:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the decay function in standard vector search</span>
results = milvus_client.search(
    collection_name,
    data=[your_query_vector], <span class="hljs-comment"># Replace with your query vector</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>],  <span class="hljs-comment"># Include the decay field in outputs to see values</span>
<span class="highlighted-wrapper-line">    ranker=rerank,                      <span class="hljs-comment"># Apply the decay ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.FunctionScore;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;search query&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;vector_field&quot;</span>)
        .limit(<span class="hljs-number">10</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>))
        .functionScore(FunctionScore.builder()
                .addFunction(rerank)
                .build())
        .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

functionScore := entity.NewFunctionScore().AddFunction(rerank)

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    collection_name, <span class="hljs-comment">// collection name</span>
    <span class="hljs-number">10</span>,              <span class="hljs-comment">// limit</span>
    []entity.Vector{your_query_vector}, <span class="hljs-comment">// query vector</span>
).WithANNSField(<span class="hljs-string">&quot;vector_field&quot;</span>).
    WithFunctionScore(functionScore).
    WithOutputFields(<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">function_score</span> = FunctionScore::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">add_function</span>(rerank);
<span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(collection_name)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[your_query_vector]))
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;vector_field&quot;</span>)
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">output_fields</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>])
    .<span class="hljs-title function_ invoke__">rerank</span>(function_score)
    .<span class="hljs-title function_ invoke__">build</span>()?;
<span class="hljs-keyword">let</span> <span class="hljs-variable">resp</span> = client.<span class="hljs-title function_ invoke__">search</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> function_score = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::FunctionScore&gt;();
function_score-&gt;<span class="hljs-built_in">AddFunction</span>(rerank);

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(collection_name)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;vector_field&quot;</span>)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                   .<span class="hljs-built_in">WithRerank</span>(function_score)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;document&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;timestamp&quot;</span>)
                   .<span class="hljs-built_in">AddFloatVector</span>(your_query_vector);

milvus::SearchResponse response;
status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: collection_name,
  <span class="hljs-attr">data</span>: [your_query_vector], <span class="hljs-comment">// Replace with your query vector</span>
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;vector_field&quot;</span>,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>],
  <span class="hljs-attr">rerank</span>: rerank,
  <span class="hljs-attr">consistency_level</span>: <span class="hljs-string">&quot;Strong&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> config = <span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
};
<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(config);
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-comment">// Use the decay function in standard vector search</span>
SearchResp results = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = collectionName,
    Vectors = [yourQueryVector], <span class="hljs-comment">// Replace with your query vector</span>
    VectorFieldName = <span class="hljs-string">&quot;vector_field&quot;</span>,
    Limit = <span class="hljs-number">10</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        OutputFields = { <span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span> },  <span class="hljs-comment">// Include the decay field in outputs to see values</span>
        FunctionScoreReranker = rerank,              <span class="hljs-comment">// Apply the decay ranker here</span>
        ConsistencyLevel = ConsistencyLevel.Strong
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
