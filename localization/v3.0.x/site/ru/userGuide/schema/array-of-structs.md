---
id: array-of-structs.md
title: Обзор StructArray
summary: >-
  Используйте StructArray, когда одному объекту необходимо хранить упорядоченный
  список структурированных элементов, например один документ, состоящий из
  множества фрагментов, одну страницу, состоящую из множества визуальных блоков,
  или одно видео, состоящее из множества клипов. StructArray хранит эти элементы
  внутри родительского объекта, при этом позволяя осуществлять векторный поиск и
  скалярную фильтрацию по полям внутри каждого элемента.
---
<h1 id="StructArray-Overview" class="common-anchor-header">Обзор StructArray<button data-href="#StructArray-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Используйте StructArray, когда одному объекту необходимо хранить упорядоченный список структурированных элементов, например один документ, состоящий из множества фрагментов, одну страницу, состоящую из множества визуальных фрагментов, или одно видео, состоящее из множества клипов. StructArray хранит эти элементы внутри родительского объекта, при этом позволяя выполнять векторный поиск и скалярную фильтрацию по полям внутри каждого элемента.</p>
<h2 id="What-is-StructArray" class="common-anchor-header">Что такое StructArray?<button data-href="#What-is-StructArray" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>StructArray</strong>, также известный как массив структур, хранит упорядоченный набор элементов Struct в каждом объекте. Каждый элемент Struct в массиве соответствует одной и той же схеме. Элемент Struct может содержать скалярные подполя, векторные подполя или и те, и другие.</p>
<p>Например, коллекция может хранить одну статью в качестве сущности, а её фрагменты — в поле StructArray с именем <code translate="no">chunks</code>. Каждый фрагмент может включать текст, метаданные раздела, оценки качества и одно или несколько векторных вложений.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;doc_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;title&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Vector search tuning guide&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;search&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;title_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.10</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.20</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.30</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.40</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;chunks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Use HNSW efSearch to trade recall for latency.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;page&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.92</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb_list_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.11</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.21</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.31</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.41</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.12</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.20</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.33</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.39</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Range search returns vectors within a distance boundary.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;search&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;page&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.86</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb_list_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.18</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.23</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.29</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.36</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.19</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.24</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.30</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.37</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Два векторных подполя в этом примере представляют один и тот же фрагмент с двух точек зрения поиска. Поле ` <code translate="no">chunks[emb_list_vector]</code> ` предназначено для поиска по списку вложений (EmbeddingList) с использованием метрик ` <code translate="no">MAX_SIM*</code> `, а поле ` <code translate="no">chunks[emb]</code> ` — для поиска на уровне элементов с использованием обычных векторных метрик, таких как ` <code translate="no">COSINE</code>`, ` <code translate="no">IP</code>` или ` <code translate="no">L2</code>`.</p>
</div>
<h2 id="When-to-use-StructArray" class="common-anchor-header">Когда использовать StructArray<button data-href="#When-to-use-StructArray" class="anchor-icon" translate="no">
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
    </button></h2><p>Используйте StructArray, если естественная единица, которую вы хотите вернуть, больше естественной единицы, по которой вы хотите выполнять поиск или фильтрацию.</p>
<table>
<thead>
<tr><th>Пример использования</th><th>Почему StructArray помогает</th><th>Типичное поле StructArray</th></tr>
</thead>
<tbody>
<tr><td>Поиск документов</td><td>Хранение одного документа в виде сущности при поиске по его фрагментам.</td><td><code translate="no">chunks</code></td></tr>
<tr><td>Поиск с поздним взаимодействием</td><td>Хранение документа или страницы в виде списка вложений и оценка с помощью <code translate="no">MAX_SIM*</code>.</td><td><code translate="no">chunks[emb_list_vector]</code> или <code translate="no">patches[emb]</code></td></tr>
<tr><td>Поиск на уровне элементов</td><td>Возвращайте наиболее релевантный фрагмент, клип, патч или наблюдение, включая его смещение в массиве.</td><td><code translate="no">chunks[emb]</code></td></tr>
<tr><td>Структурированная фильтрация</td><td>Фильтрация по скалярным подполям внутри элементов Struct, таких как section, score, page или flags.</td><td><code translate="no">chunks[section]</code>, <code translate="no">chunks[quality_score]</code></td></tr>
<tr><td>Уменьшение количества дубликатов результатов родительских элементов</td><td>Сохраняйте дочерние элементы под одним и тем же родительским объектом вместо того, чтобы хранить каждый дочерний элемент в отдельной строке.</td><td><code translate="no">chunks</code>, <code translate="no">clips</code>, <code translate="no">patches</code></td></tr>
</tbody>
</table>
<h2 id="Decision-Matrix" class="common-anchor-header">Матрица принятия решений<button data-href="#Decision-Matrix" class="anchor-icon" translate="no">
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
    </button></h2><p>Используйте следующую матрицу для выбора подходящего пути StructArray.</p>
<table>
<thead>
<tr><th>Цель</th><th>Рекомендуемый путь</th><th>Уровень детализации результатов</th><th>Начните с этого</th></tr>
</thead>
<tbody>
<tr><td>Моделируйте один родительский объект со множеством структурированных дочерних объектов.</td><td>Создайте поле StructArray.</td><td>Сущность содержит упорядоченные элементы Struct.</td><td><a href="/docs/ru/create-structarray-field.md">Создание поля StructArray</a></td></tr>
<tr><td>Вставьте родительские записи с вложенными данными дочерних элементов.</td><td>Вставка сущностей, поле StructArray которых представляет собой список объектов Struct.</td><td>Вставка на уровне сущности.</td><td><a href="/docs/ru/insert-data-into-structarray-fields.md">Вставка данных в поля StructArray</a></td></tr>
<tr><td>Запустить ColBERT, ColPali или поиск с поздним взаимодействием на уровне документа.</td><td>Использовать поиск по EmbeddingList с индексом « <code translate="no">MAX_SIM*</code> ».</td><td>Уровень сущностей.</td><td><a href="/docs/ru/search-with-embedding-lists.md">Поиск с помощью списков вложений</a></td></tr>
<tr><td>Поиск отдельных фрагментов, клипов или участков.</td><td>Используйте поиск на уровне элементов с помощью обычной векторной метрики.</td><td>Уровень элементов Struct, с учетом смещения, если оно доступно.</td><td>Базовый векторный поиск с StructArray</td></tr>
<tr><td>Ограничьте векторный поиск на уровне элементов элементами, соответствующими скалярным условиям.</td><td>Используйте ` <code translate="no">element_filter</code>`.</td><td>Фильтрация на уровне элементов; форма результата зависит от типа поиска.</td><td>Поиск с фильтрацией с помощью StructArray</td></tr>
<tr><td>Выберите объекты в зависимости от того, сколько элементов Struct удовлетворяют условию.</td><td>Используйте команды « <code translate="no">MATCH_ANY</code> », « <code translate="no">MATCH_ALL</code> », « <code translate="no">MATCH_LEAST</code> », « <code translate="no">MATCH_MOST</code> » или « <code translate="no">MATCH_EXACT</code> ».</td><td>Уровень объекта.</td><td><a href="/docs/ru/struct-array-operators.md">Операторы StructArray</a></td></tr>
<tr><td>Используйте границы по оценке или расстоянию для подполей вектора StructArray.</td><td>Используйте поиск по диапазону на уровне элементов.</td><td>Уровень элемента Struct.</td><td>Поиск по диапазону с StructArray</td></tr>
<tr><td>Возвращайте не более одного результата на каждую родительскую сущность после поиска на уровне элементов.</td><td>Используйте поиск с группировкой по первичному ключу.</td><td>Уровень сущности после группировки.</td><td>Групповой поиск с StructArray</td></tr>
<tr><td>Объедините поиск по элементам StructArray с другим векторным полем.</td><td>Используйте гибридный поиск с одним запросом AnnSearchRequest, нацеленным на векторное подполе StructArray.</td><td>Поиск на уровне элементов, переранжирование на уровне сущностей.</td><td>Гибридный поиск с StructArray</td></tr>
</tbody>
</table>
<h2 id="Understand-the-two-search-models" class="common-anchor-header">Понимание двух моделей поиска<button data-href="#Understand-the-two-search-models" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>### Поиск по EmbeddingList При поиске по EmbeddingList векторы внутри подполя векторного массива StructArray рассматриваются как один список вложений для родительского объекта. Запрос также представляет собой список вложений. Milvus сравнивает список вложений запроса с сохраненным списком вложений, используя метрику « <code translate="no">MAX_SIM*</code> », и возвращает соответствующие объекты. - Данные запроса: список вложений. - Семейство метрик: « <code translate="no">MAX_SIM*</code> ». - Уровень детализации результатов: уровень сущности. - Наилучшее применение: поиск на поздних этапах взаимодействия на уровне документа или страницы.</th><th>### Поиск на уровне элементов При поиске на уровне элементов каждый элемент Struct рассматривается как независимый кандидат для векторного поиска. Каждый результат соответствует найденному элементу внутри поля StructArray, а в результатах без группировки может отображаться смещение элемента. - Данные запроса: обычный вектор. - Семейство метрик: метрики для обычных векторов. - Детализация результатов: уровень элементов Struct. - Оптимально подходит для: поиска на уровне фрагментов, клипов или участков.</th></tr>
</thead>
<tbody>
</tbody>
</table>
<div class="alert note">
<p>Предупреждение</p>
<p>Если вашей коллекции требуется как поиск по EmbeddingList, так и поиск на уровне элементов, используйте два отдельных векторных подполя. Векторное поле или векторное подполе допускает только один индекс, а эти два режима поиска требуют разных семейств метрик.</p>
</div>
<h2 id="Documentation-map" class="common-anchor-header">Карта документации<button data-href="#Documentation-map" class="anchor-icon" translate="no">
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
    </button></h2><p>Документация по StructArray разделена на страницы, посвящённые моделированию, и страницы, посвящённые поиску. Используйте страницы по моделированию для определения и подготовки данных. Используйте страницы по поиску для выбора подходящего поведения при извлечении и фильтрации.</p>
<table>
<thead>
<tr><th>Область</th><th>Страница</th><th>Используйте для</th></tr>
</thead>
<tbody>
<tr><td>Моделирование</td><td><a href="/docs/ru/create-structarray-field.md">Создание поля StructArray</a></td><td>Определите схему структуры и добавьте поле StructArray.</td></tr>
<tr><td>Моделирование</td><td><a href="/docs/ru/insert-data-into-structarray-fields.md">Вставка данных в поля StructArray</a></td><td>Подготовьте и вставьте вложенные данные StructArray.</td></tr>
<tr><td>Моделирование</td><td><a href="/docs/ru/index-structarray-fields.md">Индексирование полей StructArray</a></td><td>Создание векторных и скалярных индексов для полей StructArray.</td></tr>
<tr><td>Справочная информация</td><td><a href="/docs/ru/structarray-limits.md">Ограничения StructArray</a></td><td>Проверка ограничений схемы, типов данных, индексов, поиска, фильтрации и версий.</td></tr>
<tr><td>Поиск</td><td>Базовый векторный поиск с использованием StructArray</td><td>Сравните поиск по EmbeddingList и векторный поиск на уровне элементов.</td></tr>
<tr><td>Поиск</td><td>Поиск по диапазону с StructArray</td><td>Используйте ограничения диапазона с подполями вектора StructArray.</td></tr>
<tr><td>Поиск</td><td>Групповой поиск с StructArray</td><td>Группировка результатов поиска на уровне элементов по первичному ключу.</td></tr>
<tr><td>Поиск</td><td>Гибридный поиск с StructArray</td><td>Объединение поиска на уровне элементов StructArray с другими векторными поисками.</td></tr>
<tr><td>Поиск</td><td>Поиск с фильтрами с использованием StructArray</td><td>Используйте фильтры StructArray при поиске, запросе и гибридном поиске.</td></tr>
<tr><td>Поиск</td><td><a href="/docs/ru/search-with-embedding-lists.md">Поиск с использованием списков вложений</a></td><td>Создавайте системы поиска в стиле ColBERT и ColPali с помощью StructArray.</td></tr>
<tr><td>Фильтр</td><td><a href="/docs/ru/struct-array-operators.md">Операторы StructArray</a></td><td>Справочный синтаксис для операторов <code translate="no">element_filter</code> и <code translate="no">MATCH_*</code>.</td></tr>
</tbody>
</table>
<h2 id="Key-limits-to-check-first" class="common-anchor-header">Основные ограничения, которые следует проверить в первую очередь<button data-href="#Key-limits-to-check-first" class="anchor-icon" translate="no">
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
<li><p>Struct можно использовать в качестве типа элемента поля Array. Он не используется в качестве поля коллекции верхнего уровня.</p></li>
<li><p>Все элементы Struct в одном поле StructArray используют одну предопределенную схему.</p></li>
<li><p>Для подполей Vector требуются индексы. При поиске с помощью EmbeddingList используются метрики <code translate="no">MAX_SIM*</code>, а при поиске на уровне элементов — обычные векторные метрики.</p></li>
<li><p><code translate="no">element_filter</code> <code translate="no">MATCH_*</code> и предназначены для скалярных подполей внутри полей StructArray. Используйте оператор только внутри этих операторов. <code translate="no">$[subfield]</code> </p></li>
<li><p>Некоторые комбинации поиска зависят от версии или режима работы. Ознакомьтесь с <a href="/docs/ru/structarray-limits.md">ограничениями StructArray</a>, прежде чем использовать поиск по диапазону, групповой поиск, гибридный поиск, поля с допустимыми нулевыми значениями или динамически добавленные поля.</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">Следующие шаги<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>Чтобы разработать схему, ознакомьтесь с разделом <a href="/docs/ru/create-structarray-field.md">«Создание поля StructArray</a>».</p></li>
<li><p>Чтобы подготовить данные, ознакомьтесь с разделом <a href="/docs/ru/insert-data-into-structarray-fields.md">«Вставка данных в поля StructArray</a>».</p></li>
<li><p>Чтобы выбрать индексы, ознакомьтесь с разделом <a href="/docs/ru/index-structarray-fields.md">«Индексирование полей StructArray</a>».</p></li>
<li><p>Чтобы выполнить поиск по векторным подполям StructArray, начните с раздела «Базовый векторный поиск с StructArray».</p></li>
<li><p>Чтобы отфильтровать скалярные подполя StructArray, ознакомьтесь с разделами <a href="/docs/ru/struct-array-operators.md">«Операторы StructArray</a> » и «Фильтрованный поиск с использованием StructArray».</p></li>
</ol>
