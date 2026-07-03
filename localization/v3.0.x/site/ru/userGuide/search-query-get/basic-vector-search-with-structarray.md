---
id: basic-vector-search-with-structarray.md
title: Базовый векторный поиск с использованием StructArray
summary: >-
  Используйте эту страницу для векторного поиска по векторным подполям внутри
  поля StructArray. StructArray поддерживает два основных режима векторного
  поиска: поиск по списку вложений (EmbeddingList), при котором оценивается
  список вложений, хранящийся в каждой сущности, и поиск на уровне элементов,
  при котором каждый элемент Struct просматривается независимо.
---
<h1 id="Basic-Vector-Search-with-StructArray" class="common-anchor-header">Базовый векторный поиск с использованием StructArray<button data-href="#Basic-Vector-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Используйте эту страницу для выполнения векторного поиска по подполям вектора внутри поля StructArray. StructArray поддерживает два основных режима векторного поиска: поиск по списку вложений (EmbeddingList), при котором оценивается список вложений, хранящийся в каждой сущности, и поиск на уровне элементов, при котором каждый элемент Struct просматривается независимо.</p>
<p>На этой странице используется коллекция « <code translate="no">tech_articles</code> » из раздела <a href="/docs/ru/create-structarray-field.md">«Создание поля StructArray</a>». В коллекции имеется поле StructArray с именем « <code translate="no">chunks</code> ». Каждый фрагмент содержит текст, скалярные метаданные, векторное подполе с именем « <code translate="no">emb_list_vector</code> » с индексом для поиска по списку вложений, а также векторное подполе с именем « <code translate="no">emb</code> » с индексом для поиска на уровне элементов.</p>
<h2 id="Before-you-begin" class="common-anchor-header">Перед началом работы<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Убедитесь, что схема коллекции, данные и индексы уже подготовлены.</p>
<table>
<thead>
<tr><th>Требования</th><th>Где это подготовить</th></tr>
</thead>
<tbody>
<tr><td>Создайте поле StructArray, например <code translate="no">chunks</code>.</td><td><a href="/docs/ru/create-structarray-field.md">Создание поля StructArray</a></td></tr>
<tr><td>Вставьте сущности, поле <code translate="no">chunks</code> которых содержит объекты Struct.</td><td><a href="/docs/ru/insert-data-into-structarray-fields.md">Вставка данных в поля StructArray</a></td></tr>
<tr><td>Создайте индекс <code translate="no">MAX_SIM*</code> на <code translate="no">chunks[emb_list_vector]</code> для поиска по EmbeddingList.</td><td><a href="/docs/ru/index-structarray-fields.md">Индексирование полей StructArray</a></td></tr>
<tr><td>Создайте обычный векторно-метрический индекс на поле « <code translate="no">chunks[emb]</code> » для поиска на уровне элементов.</td><td><a href="/docs/ru/index-structarray-fields.md">Индексирование полей StructArray</a></td></tr>
</tbody>
</table>
<div class="alert note">
<p>Предупреждение</p>
<p>Векторное поле или векторное подполе допускает только один индекс. Если вам нужен как поиск по EmbeddingList, так и поиск на уровне элементов, создайте два отдельных векторных подполя. На этой странице поле <code translate="no">chunks[emb_list_vector]</code> индексируется для поиска по EmbeddingList, а поле <code translate="no">chunks[emb]</code> — для поиска на уровне элементов.</p>
</div>
<h2 id="Choose-a-search-mode" class="common-anchor-header">Выбор режима поиска<button data-href="#Choose-a-search-mode" class="anchor-icon" translate="no">
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
<tr><th>Аспект</th><th>Поиск по EmbeddingList</th><th>Поиск на уровне элементов</th></tr>
</thead>
<tbody>
<tr><td>Целевое подполе</td><td><code translate="no">chunks[emb_list_vector]</code></td><td><code translate="no">chunks[emb]</code></td></tr>
<tr><td>Данные запроса</td><td>Список вложений, содержащий один или несколько векторов.</td><td>Обычный вектор.</td></tr>
<tr><td>Семейство метрик</td><td><code translate="no">MAX_SIM*</code>, например <code translate="no">MAX_SIM_COSINE</code>.</td><td>Обычные векторные метрики, такие как <code translate="no">COSINE</code>, <code translate="no">IP</code> или <code translate="no">L2</code>.</td></tr>
<tr><td>Что представляет собой один результат</td><td>Соответствующий объект, подполе вектора StructArray которого схоже со списком вложений запроса.</td><td>Соответствующий элемент Struct внутри поля StructArray.</td></tr>
<tr><td>Детализация результатов</td><td>Уровень сущности.</td><td>Уровень элемента Struct.</td></tr>
<tr><td>Смещение</td><td>Не применимо.</td><td>Определяет позицию найденного элемента структуры с нулевым индексом при возвращении.</td></tr>
<tr><td>Типичное использование</td><td>ColBERT, ColPali и другие шаблоны поиска с поздним взаимодействием.</td><td>Поиск на уровне фрагментов, абзацев, клипов, патчей или фактов.</td></tr>
</tbody>
</table>
<h2 id="Run-EmbeddingList-search" class="common-anchor-header">Запуск поиска с помощью EmbeddingList<button data-href="#Run-EmbeddingList-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Используйте поиск EmbeddingList, если сам запрос содержит несколько векторов, а целевое подполе вектора StructArray индексируется с помощью метрики « <code translate="no">MAX_SIM*</code> ». Результатом является совпадение на уровне сущностей.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">from</span> pymilvus.client.embedding_list <span class="hljs-keyword">import</span> EmbeddingList

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query = EmbeddingList()
query.add([<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>])
query.add([<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>])

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit[<span class="hljs-string">&quot;id&quot;</span>], hit[<span class="hljs-string">&quot;distance&quot;</span>], hit[<span class="hljs-string">&quot;entity&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<p>В этом режиме поиска параметр « <code translate="no">limit</code> » определяет, сколько сущностей будет возвращено по каждому запросу. Результат может включать подполя StructArray, однако само совпадение представляет собой найденную родительскую сущность, а не какой-то конкретный элемент Struct.</p>
<div class="alert note">
<p>Полное руководство по ColBERT или ColPali см. в разделе <a href="/docs/ru/search-with-embedding-lists.md">«Поиск с использованием списков вложений</a>». На этой странице рассматриваются только основные особенности поиска по StructArray.</p>
</div>
<h2 id="Run-element-level-search" class="common-anchor-header">Запуск поиска на уровне элементов<button data-href="#Run-element-level-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Используйте поиск на уровне элементов, когда каждый элемент Struct должен участвовать в векторном поиске независимо. Запрос представляет собой обычный вектор, а целевое подполе вектора должно индексироваться с помощью обычной векторной метрики.</p>
<pre><code translate="no" class="language-python">query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">5</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[page]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(
            <span class="hljs-string">&quot;doc_id:&quot;</span>, hit[<span class="hljs-string">&quot;id&quot;</span>],
            <span class="hljs-string">&quot;distance:&quot;</span>, hit[<span class="hljs-string">&quot;distance&quot;</span>],
            <span class="hljs-string">&quot;offset:&quot;</span>, hit.get(<span class="hljs-string">&quot;offset&quot;</span>),
            <span class="hljs-string">&quot;entity:&quot;</span>, hit[<span class="hljs-string">&quot;entity&quot;</span>],
        )
<button class="copy-code-btn"></button></code></pre>
<p>При поиске на уровне элементов каждый результат соответствует найденному элементу Struct. Значение « <code translate="no">offset</code> » представляет собой позицию этого элемента в поле StructArray, начиная с нуля. Один и тот же объект может появляться несколько раз, если запросу соответствует более одного элемента Struct. Значение « <code translate="no">limit</code> » применяется к найденным элементам, а не к уникальным родительским объектам.</p>
<h2 id="Interpret-results" class="common-anchor-header">Интерпретация результатов<button data-href="#Interpret-results" class="anchor-icon" translate="no">
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
<tr><th>Элемент результата</th><th>Поиск по списку вложений (EmbeddingList)</th><th>Поиск на уровне элементов</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">id</code></td><td>Первичный ключ найденного объекта.</td><td>Первичный ключ сущности, содержащей найденный элемент Struct.</td></tr>
<tr><td><code translate="no">distance</code> или оценка</td><td>Оценка или расстояние между списком вложений запроса и сохраненным списком вложений.</td><td>Оценка или расстояние между вектором запроса и вектором найденного элемента Struct.</td></tr>
<tr><td><code translate="no">offset</code></td><td>Не применимо.</td><td>Позиция со нулевой базой соответствующего элемента Struct при возвращении.</td></tr>
<tr><td>Повторяющиеся первичные ключи</td><td>Не ожидается для отдельного запроса, поскольку результаты предоставляются на уровне сущности.</td><td>Возможно, поскольку могут совпадать несколько элементов Struct в одной сущности.</td></tr>
<tr><td>Запрашиваемые поля вывода StructArray</td><td>Возвращаются из найденной сущности.</td><td>Возвращаются с формой совпадения на уровне элементов, поддерживаемой целевым API и SDK.</td></tr>
</tbody>
</table>
<h2 id="Common-mistakes" class="common-anchor-header">Распространенные ошибки<button data-href="#Common-mistakes" class="anchor-icon" translate="no">
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
<li><p>Использование <code translate="no">chunks.emb</code> вместо требуемого синтаксиса пути к подполю <code translate="no">chunks[emb]</code>.</p></li>
<li><p>Использование запроса EmbeddingList для векторного подполя, индексированного с помощью обычной векторной метрики.</p></li>
<li><p>Использование обычного векторного запроса к векторному подполю, индексированному с помощью метрики <code translate="no">MAX_SIM*</code>.</p></li>
<li><p>Ожидание того, что поиск на уровне элементов <code translate="no">limit</code> вернет столько же уникальных родительских сущностей. Он возвращает совпадения на уровне элементов.</p></li>
<li><p>Ожидается, что поиск EmbeddingList вернет одно конкретное смещение элемента. Вместо этого возвращаются совпадения на уровне сущностей.</p></li>
<li><p>Повторное использование одного векторного подполя для обоих режимов поиска. Используйте отдельные векторные подполя, поскольку каждое векторное подполе принимает только один индекс.</p></li>
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
<li><p>Чтобы ограничить поиск на уровне элементов с помощью скалярных условий, ознакомьтесь с разделом <a href="/docs/ru/filtered-search-with-structarray.md">«Фильтрованный поиск с StructArray</a>».</p></li>
<li><p>Чтобы выполнить поиск по границам оценки или расстояния, ознакомьтесь с разделом <a href="/docs/ru/range-search-with-structarray.md">«Поиск по диапазону с использованием StructArray</a>».</p></li>
<li><p>Чтобы после поиска на уровне элементов возвращалось не более одного результата на родительский объект, ознакомьтесь с разделом <a href="/docs/ru/grouping-search-with-structarray.md">«Групповой поиск с использованием StructArray</a>».</p></li>
<li><p>Чтобы объединить поиск с использованием StructArray с другими векторными поисками, ознакомьтесь с разделом <a href="/docs/ru/hybrid-search-with-structarray.md">«Гибридный поиск с использованием StructArray</a>».</p></li>
<li><p>Чтобы ознакомиться с поддерживаемыми типами данных, метриками, фильтрами и ограничениями для конкретных версий, ознакомьтесь с разделом <a href="/docs/ru/structarray-limits.md">«Ограничения StructArray</a>».</p></li>
</ol>
