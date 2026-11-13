---
id: scalar_index.md
related_key: scalar_index
summary: >-
  Скалярные индексы ускоряют фильтрацию по невекторным полям. В данном
  справочнике объясняется, как Milvus выбирает скалярные индексы, какие типы
  индексов можно указать и какие типы данных поддерживает каждый индекс.
title: Скалярный индекс
---
<h1 id="Scalar-Index" class="common-anchor-header">Скалярный индекс<button data-href="#Scalar-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Скалярные индексы ускоряют фильтрацию по невекторным полям, таким как категории, цены, временные метки и местоположения. Когда выражение фильтра сужает поиск, скалярный индекс позволяет Milvus находить соответствующие объекты без сканирования поля.</p>
<p>Если вы не уверены, какой индекс выбрать, воспользуйтесь функцией « <code translate="no">AUTOINDEX</code> ». Указывать тип индекса вручную следует только в том случае, если требуется определённое поведение.</p>
<h2 id="Choosing-a-scalar-index" class="common-anchor-header">Выбор скалярного индекса<button data-href="#Choosing-a-scalar-index" class="anchor-icon" translate="no">
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
    </button></h2><p>В приведенной ниже таблице указаны индексы, которые Milvus выбирает по умолчанию при использовании <code translate="no">AUTOINDEX</code>, а также типы индексов, которые можно указать вручную для каждого типа данных.</p>
<table>
<thead>
<tr><th>Тип данных</th><th>AUTOINDEX по умолчанию</th><th>Типы индексов для ручной настройки</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">BITMAP</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code>, <code translate="no">TRIE</code>, <code translate="no">NGRAM</code>, <code translate="no">FMINDEX</code></td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td><td><code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td><td><code translate="no">RTREE</code></td></tr>
<tr><td><code translate="no">JSON</code> с приведением типа к скалярному значению или массиву</td><td><code translate="no">HYBRID</code></td><td>Зависит от <code translate="no">json_cast_type</code>; см. <a href="#JSON-field-indexing">индексирование полей JSON</a>.</td></tr>
<tr><td><code translate="no">JSON</code> с <code translate="no">json_cast_type=&quot;JSON&quot;</code></td><td><code translate="no">INVERTED</code></td><td><code translate="no">INVERTED</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">BITMAP</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;INT8&gt;</code> через <code translate="no">ARRAY&lt;INT64&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;FLOAT&gt;</code>, <code translate="no">ARRAY&lt;DOUBLE&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">TEXT</code></td><td>Не поддерживается</td><td>Нет</td></tr>
</tbody>
</table>
<p><code translate="no">HYBRID</code> — это внутренняя стратегия, а не тип, который можно указать напрямую. См. раздел <a href="#How-AUTOINDEX-selects">«Как работает AUTOINDEX</a>».</p>
<p>Применяются следующие ограничения:</p>
<ul>
<li><strong>Первичные ключи:</strong> оператор « <code translate="no">BITMAP</code> » недоступен для полей, являющихся первичными ключами.</li>
<li><strong>Массивы:</strong> рекурсивные массивы и массивы с элементами, допускающими значение null, не поддерживают скалярную индексацию, включая <code translate="no">AUTOINDEX</code>. Обычные массивы поддерживают элементы типа Boolean, integer, floating-point и VARCHAR.</li>
<li><strong>Массивы структур:</strong> скалярные подполя индексируются по отдельности. Их поддержка может отличаться от поддержки обычных массивов; например, подполе структуры типа «логическое» не поддерживает явное использование <code translate="no">STL_SORT</code>.</li>
<li><strong>TEXT:</strong> Созданные пользователем скалярные индексы, включая <code translate="no">AUTOINDEX</code>, недоступны. Анализ текста и поиск по алгоритму BM25 используют отдельные механизмы.</li>
</ul>
<h2 id="Index-types" class="common-anchor-header">Типы индексов<button data-href="#Index-types" class="anchor-icon" translate="no">
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
<tr><th>Тип индекса</th><th>Назначение</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td>Универсальные фильтры равенства, принадлежности и диапазона.</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>Поля с небольшим количеством различных значений; компактная побитовая фильтрация.</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>Поиск отсортированных значений и фильтрация по диапазону.</td></tr>
<tr><td><code translate="no">TRIE</code></td><td>Равенство строк и сопоставление префиксов.</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>Использование оператора LIKE и регулярных выражений для строк путем сужения круга подходящих кандидатов.</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td>Точное сопоставление префиксов, суффиксов и вставных подстрок.</td></tr>
<tr><td><code translate="no">RTREE</code></td><td>Пространственная фильтрация по полям GEOMETRY.</td></tr>
</tbody>
</table>
<p>Примеры создания, параметры индекса и поддерживаемые запросы см. в разделах <a href="/docs/ru/bitmap.md">BITMAP</a>, <a href="/docs/ru/inverted.md">INVERTED</a>, <a href="/docs/ru/ngram.md">NGRAM</a>, <a href="/docs/ru/stl-sort.md">STL_SORT</a>, <a href="/docs/ru/trie.md">TRIE</a>, <a href="/docs/ru/fmindex.md">FMINDEX</a> и <a href="/docs/ru/rtree.md">RTREE</a>.</p>
<h2 id="How-AUTOINDEX-selects" class="common-anchor-header">Как происходит выбор индекса с помощью AUTOINDEX<button data-href="#How-AUTOINDEX-selects" class="anchor-icon" translate="no">
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
    </button></h2><p>С помощью параметра ` <code translate="no">AUTOINDEX</code>` Milvus выбирает индекс на основе типа поля, конфигурации сервера и, для некоторых полей, количества уникальных значений (кардинальности). Выбор по умолчанию приведён в разделе <a href="#Choosing-a-scalar-index">«Выбор скалярного индекса</a>».</p>
<p>Для большинства полей при использовании параметра ` <code translate="no">AUTOINDEX</code> ` применяется внутренняя стратегия ` <code translate="no">HYBRID</code> `, которая выбирает индекс по кардинальности:</p>
<ul>
<li><strong><code translate="no">BITMAP</code></strong> когда сборка содержит менее 100 различных значений;</li>
<li><strong><code translate="no">STL_SORT</code></strong> если сборка содержит 100 или более различных значений.</li>
</ul>
<p>Для массивных индексов применяется отдельная политика совместимости: их ветвь для высокой кардинальности использует « <code translate="no">STL_SORT</code> », если кластер это поддерживает, а в противном случае — « <code translate="no">INVERTED</code> ». См. раздел <a href="#Version-compatibility">«Совместимость версий</a>».</p>
<p><code translate="no">HYBRID</code> является исключительно внутренним — его нельзя указать напрямую. Внутренний выбор также может использовать индекс, недоступный в качестве явного варианта для данного поля, например растровую индексацию для значений с плавающей запятой.</p>
<blockquote>
<p>Эти параметры выбора являются значениями по умолчанию. Администраторы могут изменять их с помощью <code translate="no">scalarAutoIndex.params.build</code>. По умолчанию для параметра <code translate="no">scalarAutoIndex.enable</code> установлено значение <code translate="no">false</code>, которое по-прежнему допускает явный выбор <code translate="no">AUTOINDEX</code> и selection, когда тип индекса не указан; установка значения <code translate="no">true</code> также применяет автоматический выбор к иначе допустимым ручным запросам.</p>
</blockquote>
<h2 id="JSON-field-indexing" class="common-anchor-header">Индексирование полей JSON<button data-href="#JSON-field-indexing" class="anchor-icon" translate="no">
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
    </button></h2><p>Для индексирования значений JSON укажите <code translate="no">json_cast_type</code>, чтобы указать тип значений, подлежащих индексированию. Этот параметр обязателен как для автоматического, так и для ручного индексирования. Используйте <code translate="no">json_path</code> для указания пути; если он опущен, Milvus использует имя поля, указанное в запросе.</p>
<table>
<thead>
<tr><th>json_cast_type</th><th>AUTOINDEX (по умолчанию)</th><th>Типы ручной индексации</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code>, <code translate="no">NGRAM</code></td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">JSON</code></td><td><code translate="no">INVERTED</code></td><td><code translate="no">INVERTED</code></td></tr>
</tbody>
</table>
<p>Преобразование <code translate="no">JSON</code> выбирает полную индексацию JSON вместо индекса скалярного пути с типом и изменяет значение по умолчанию <code translate="no">AUTOINDEX</code> с <code translate="no">HYBRID</code> на <code translate="no">INVERTED</code>.</p>
<p>Необязательный преобразователь <code translate="no">json_cast_function=&quot;STRING_TO_DOUBLE&quot;</code> преобразует строковые значения при преобразовании <code translate="no">DOUBLE</code>. Его нельзя использовать с другими типами преобразований. Ни <code translate="no">TRIE</code>, ни <code translate="no">FMINDEX</code> не поддерживают поля JSON.</p>
<h2 id="Supported-predicates" class="common-anchor-header">Поддерживаемые предикаты<button data-href="#Supported-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p>В приведенных ниже таблицах показано, для оценки каких предикатов может использоваться каждый индекс. <strong>Поддержка индекса не гарантирует, что Milvus будет использовать этот индекс для каждого запроса.</strong> Milvus может сканировать данные полей, если индекс не подходит для конкретного выражения или шаблона.</p>
<h3 id="Comparisons-and-membership" class="common-anchor-header">Сравнения и принадлежность<button data-href="#Comparisons-and-membership" class="anchor-icon" translate="no">
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
    </button></h3><p>К операторам равенства и принадлежности относятся: <code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">in</code> и <code translate="no">not in</code>. К операторам сравнения диапазонов относятся: <code translate="no">&lt;</code>, <code translate="no">&lt;=</code>, <code translate="no">&gt;</code>, <code translate="no">&gt;=</code>, а также выражения типа <code translate="no">10 &lt;= price &lt; 50</code>.</p>
<table>
<thead>
<tr><th>Тип индекса</th><th>Типы данных полей</th><th>Предикаты, поддерживаемые индексом</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td><code translate="no">BOOL</code></td><td>Равенство и принадлежность</td></tr>
<tr><td><code translate="no">INVERTED</code></td><td>Целые числа, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">VARCHAR</code></td><td>Равенство, принадлежность и диапазоны</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td><code translate="no">BOOL</code></td><td>Равенство и принадлежность</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>Целые числа, <code translate="no">VARCHAR</code></td><td>Равенство, принадлежность и интервалы</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>Целые числа, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">TIMESTAMPTZ</code>, <code translate="no">VARCHAR</code></td><td>Равенство, принадлежность и диапазоны</td></tr>
<tr><td><code translate="no">TRIE</code></td><td><code translate="no">VARCHAR</code></td><td>Равенство, принадлежность и диапазоны; при вычислении диапазона может быть посещено несколько индексированных строк</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td><code translate="no">VARCHAR</code></td><td>Только шаблоны строк; отсутствует прямой поиск по равенству, принадлежности или диапазону</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td><code translate="no">VARCHAR</code></td><td>Только строковые шаблоны; отсутствует прямой поиск по равенству, принадлежности или диапазону</td></tr>
<tr><td><code translate="no">RTREE</code></td><td><code translate="no">GEOMETRY</code></td><td>Пространственные предикаты, перечисленные ниже</td></tr>
<tr><td><code translate="no">AUTOINDEX</code></td><td>Поддерживаемые скалярные типы</td><td>Зависит от выбранного индекса. Внутренние выборки типа « <code translate="no">HYBRID</code> » используют возможности соответствующего растрового, отсортированного или инвертированного индекса.</td></tr>
</tbody>
</table>
<p>При сравнении диапазонов VARCHAR значения строк сравниваются, а не интерпретируются как числа. В таблице описаны сравнения только с литеральными значениями; это не означает, что арифметические выражения или сравнения между двумя полями получают такое же ускорение за счет индекса.</p>
<h3 id="String-patterns" class="common-anchor-header">Строковые шаблоны<button data-href="#String-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>Эта таблица применима к полям типа VARCHAR. Для строк-путей JSON используйте индекс и приведение типа <code translate="no">VARCHAR</code>, поддерживаемые таблицей индексирования JSON; в этом случае применяется соответствующее поведение строк.</p>
<ul>
<li><strong>Да:</strong> индекс возвращает точные совпадения.</li>
<li><strong>Проверка индексированных значений:</strong> Milvus оценивает шаблон по строкам, хранящимся в индексе, что может потребовать просмотра множества различных строк.</li>
<li><strong>Варианты:</strong> индекс сужает круг возможных совпадений, после чего Milvus проверяет исходные значения.</li>
<li><strong>Сканирование:</strong> индекс не обслуживает предикат; Milvus использует другой допустимый путь или сканирует поле.</li>
</ul>
<table>
<thead>
<tr><th>Тип индекса</th><th>Префикс <code translate="no">like &quot;abc%&quot;</code></th><th>Суффикс <code translate="no">like &quot;%abc&quot;</code></th><th>Подстрока <code translate="no">like &quot;%abc%&quot;</code></th><th>Общий LIKE <code translate="no">like &quot;a%b_c&quot;</code></th><th>Регулярное выражение <code translate="no">=~ &quot;a.*b&quot;</code></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td>Да</td><td>Сканирование</td><td>Сканирование</td><td>Да</td><td>Сканировать</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>Проверить индексированные значения</td><td>Проверить индексированные значения</td><td>Проверить индексированные значения</td><td>Проверить индексированные значения</td><td>Проверить индексированные значения</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>Да</td><td>Проверить индексированные значения</td><td>Проверить индексированные значения</td><td>Проверить индексированные значения</td><td>Проверить индексированные значения</td></tr>
<tr><td><code translate="no">TRIE</code></td><td>Да</td><td>Проверить индексированные значения</td><td>Проверить индексированные значения</td><td>Проверить индексированные значения</td><td>Проверить индексированные значения</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>Кандидаты</td><td>Кандидаты</td><td>Кандидаты; точное совпадение с литералом в пределах заданного диапазона длины грамма</td><td>Варианты</td><td>Варианты</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td>Да</td><td>Да</td><td>Да</td><td>Кандидаты</td><td>Кандидаты</td></tr>
</tbody>
</table>
<p>Эти записи описывают оператор после планирования запроса. Milvus может упростить литеральный шаблон LIKE до проверки на равенство, а простое регулярное выражение с анкором — до проверки на равенство, префикс или суффикс; например, <code translate="no">name =~ &quot;^abc$&quot;</code> превращается в проверку на равенство и обращается к таблице равенств.</p>
<p><code translate="no">INVERTED</code> простые формы с суффиксом и подстрокой обрабатываются как сканирование, даже если для более сложных шаблонов LIKE можно использовать индекс. Для выражения « <code translate="no">NGRAM</code> » требуется литеральный текст длиной не менее <code translate="no">min_gram</code> символов; для общего шаблона LIKE каждый непустой фрагмент литерала должен соответствовать этому минимуму, а ускорение работы с регулярными выражениями зависит от извлечения подходящих литералов. В противном случае Milvus выполняет сканирование данных. Оператор ` <code translate="no">FMINDEX</code> ` также может выбрать сканирование, если шаблон обеспечивает незначительную полезную фильтрацию или его обработка через индекс слишком затратна.</p>
<p>Это предикаты со строковыми значениями. Функции на основе токенов, такие как <code translate="no">TEXT_MATCH</code> и <code translate="no">PHRASE_MATCH</code>, используют индексирование по совпадению текста, настраиваемое через свойства полей; выбор скалярного индекса <code translate="no">INVERTED</code> не включает эти функции.</p>
<h3 id="Array-JSON-and-spatial-predicates" class="common-anchor-header">Предикаты массивов, JSON и пространственные предикаты<button data-href="#Array-JSON-and-spatial-predicates" class="anchor-icon" translate="no">
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
    </button></h3><table>
<thead>
<tr><th>Тип индекса</th><th>Тип данных или приведение</th><th>Предикаты, которые могут использовать индекс</th><th>Примечания</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code> или допустимый выбор из <code translate="no">AUTOINDEX</code> </td><td>Обычные массивы с поддерживаемыми типами элементов</td><td><code translate="no">ARRAY_CONTAINS</code>, <code translate="no">ARRAY_CONTAINS_ANY</code>, <code translate="no">ARRAY_CONTAINS_ALL</code></td><td>Соответствует элементам независимо от их позиции. Ограничения по индексу и типу по-прежнему действуют.</td></tr>
<tr><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td><td>Обычные массивы значений типа Boolean, integer или VARCHAR</td><td><code translate="no">==</code> по всему массиву и <code translate="no">!=</code></td><td>Можно использовать кандидаты индекса, за которыми следует проверка исходных массивов. Для массивов с плавающей запятой используется сканирование; растровые индексы не поддерживают этот путь кандидата.</td></tr>
<tr><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code> или допустимый выбор <code translate="no">AUTOINDEX</code> </td><td>JSON-пути, приведенные к типу <code translate="no">BOOL</code>, <code translate="no">DOUBLE</code> или <code translate="no">VARCHAR</code></td><td>Сравнения и проверка принадлежности, соответствующие типу приведения</td><td>Индексированный путь и преобразование должны соответствовать запросу. Шаблоны строк соответствуют приведенной выше таблице.</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>JSON-пути, преобразованные в <code translate="no">VARCHAR</code></td><td>шаблоны LIKE и регулярных выражений</td><td>Используются те же правила допустимости шаблонов, что и для индексов VARCHAR NGRAM.</td></tr>
<tr><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code> или допустимый выбор <code translate="no">AUTOINDEX</code> </td><td>JSON-пути, преобразованные в <code translate="no">ARRAY_BOOL</code>, <code translate="no">ARRAY_DOUBLE</code> или <code translate="no">ARRAY_VARCHAR</code></td><td><code translate="no">JSON_CONTAINS</code>, <code translate="no">JSON_CONTAINS_ANY</code>, <code translate="no">JSON_CONTAINS_ALL</code></td><td>Требуются совместимые типы элементов. Операнды смешанного типа или вложенные массивы могут обрабатываться методом сканирования.</td></tr>
<tr><td><code translate="no">INVERTED</code> с приведением <code translate="no">JSON</code></td><td>Полный индекс JSON</td><td>Сравнения и проверка принадлежности по поддерживаемым скалярным путям; поддерживаемые строковые шаблоны; проверка на содержание в JSON по поддерживаемым массивным путям</td><td>Строковые пути ведут себя по принципу INVERTED. Содержание в массиве требует совместимых типов элементов.</td></tr>
<tr><td>Индексы JSON-путей и полные индексы JSON</td><td>Индексированные пути JSON</td><td><code translate="no">exists</code></td><td>Проверяет, существует ли путь, что отличается от проверки его значения или того, является ли всё поле нулевым.</td></tr>
<tr><td><code translate="no">RTREE</code></td><td><code translate="no">GEOMETRY</code></td><td><code translate="no">ST_EQUALS</code>, <code translate="no">ST_INTERSECTS</code>, <code translate="no">ST_CONTAINS</code>, <code translate="no">ST_WITHIN</code>, <code translate="no">ST_TOUCHES</code>, <code translate="no">ST_OVERLAPS</code>, <code translate="no">ST_CROSSES</code>, <code translate="no">ST_DWITHIN</code></td><td>Использует ограничительные прямоугольники для поиска кандидатов, а затем проверяет точное пространственное соотношение. <code translate="no">ST_ISVALID</code> не использует RTREE.</td></tr>
</tbody>
</table>
<p>Поддержка вхождения в массив не подразумевает поиск по индексу элемента в конкретной позиции, как, например, в <code translate="no">values[0]</code>, или по длине массива. Равенство всего массива также должно проверять порядок и длину, что невозможно установить только на основе принадлежности элементов.</p>
<p><code translate="no">IS NULL</code> и <code translate="no">IS NOT NULL</code> используют информацию о допустимости и не требуют конкретного скалярного типа индекса. Вы можете комбинировать предикаты с <code translate="no">and</code>, <code translate="no">or</code> и <code translate="no">not</code>; каждая часть может использовать свой собственный допустимый путь выполнения.</p>
<h2 id="Version-compatibility" class="common-anchor-header">Совместимость версий<button data-href="#Version-compatibility" class="anchor-icon" translate="no">
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
    </button></h2><p>Большинство скалярных индексов — <code translate="no">BITMAP</code>, <code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code>, <code translate="no">TRIE</code> и <code translate="no">NGRAM</code> для обычных скалярных полей — не имеют требований к версии. Приведенные ниже требования применяются только к более новым комбинациям: индексам на массивах полей, индексам JSON-path и <code translate="no">FMINDEX</code>.</p>
<p>В этих требованиях используются номера версий механизма скалярных индексов — внутренний счетчик возможностей, отличный от номеров выпусков программного обеспечения Milvus.</p>
<table>
<thead>
<tr><th>Возможность</th><th>Требование</th></tr>
</thead>
<tbody>
<tr><td>Явное <code translate="no">FMINDEX</code></td><td>Версия механизма скалярного индексирования 5 или более поздняя</td></tr>
<tr><td>Явная поддержка сортировки массивов по ключу ( <code translate="no">STL_SORT</code> ) для обычных массивов</td><td>Движок скалярных индексов версии 3 или более поздней, с включенной поддержкой сортировки массивов</td></tr>
<tr><td><code translate="no">HYBRID</code> выбор <code translate="no">STL_SORT</code> для обычных массивов</td><td>Движок скалярных индексов версии 5 или новее с включенной поддержкой сортировки массивов</td></tr>
<tr><td><code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code> или <code translate="no">HYBRID</code> для скалярных путей JSON</td><td>Движок скалярного индексирования версии 4 или более поздней</td></tr>
<tr><td><code translate="no">STL_SORT</code> или <code translate="no">HYBRID</code> для типизированных путей массивов JSON</td><td>Движок скалярных индексов версии 3 или более поздней, с включенной поддержкой сортировки массивов</td></tr>
</tbody>
</table>
<p>Если требование совместимости с массивами или JSON не выполняется, затронутые автоматические запросы могут переключиться на <code translate="no">INVERTED</code>, а явные запросы с неподдерживаемыми комбинациями завершаются с ошибкой. Для обычных массивов <code translate="no">HYBRID</code> ветвь с высокой кардинальностью продолжает использовать <code translate="no">INVERTED</code> до тех пор, пока не станет доступна сортированная индексация.</p>
<h2 id="Performance-considerations" class="common-anchor-header">Соображения по производительности<button data-href="#Performance-considerations" class="anchor-icon" translate="no">
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
    </button></h2><p>Производительность индекса зависит от распределения данных и фильтров, используемых вашим приложением. Кардинальность, длина строк, длина массива и количество совпадающих сущностей могут влиять на использование памяти и задержку запросов. Сравните индексы, используя репрезентативные данные и выражения фильтров, и одновременно измерьте использование памяти, время построения и задержку запросов.</p>
<h3 id="Estimating-memory-requirements" class="common-anchor-header">Оценка требований к памяти<button data-href="#Estimating-memory-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>Приведённые ниже формулы дают приблизительное представление о объёме памяти, необходимом для скалярного индекса после загрузки при отключенном отображении в памяти. Формулы <code translate="no">STL_SORT</code> предполагают наличие обычных скалярных полей без нулевых значений.</p>
<ul>
<li><code translate="no">N</code>: количество сущностей.</li>
<li><code translate="no">D</code>: количество уникальных значений.</li>
<li><code translate="no">l</code>: средняя длина уникальных строк, в <strong>байтах</strong>.</li>
<li><code translate="no">S</code>: размер построенного индекса до сжатия при хранении, в <strong>байтах</strong>.</li>
</ul>
<table>
<thead>
<tr><th>Тип индекса</th><th>Приблизительный объём памяти в байтах</th><th>Интуитивное представление</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">STL_SORT</code> на <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code> или <code translate="no">FLOAT</code></td><td><code translate="no">12 * N</code></td><td>Около 12 байт на каждую сущность.</td></tr>
<tr><td><code translate="no">STL_SORT</code> на <code translate="no">INT64</code>, <code translate="no">DOUBLE</code> или <code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">20 * N</code></td><td>Около 20 байт на один объект для более крупных значений.</td></tr>
<tr><td><code translate="no">STL_SORT</code> на <code translate="no">VARCHAR</code></td><td><code translate="no">8 * N + (l + 16) * D</code></td><td>Повторяющиеся строки используют общее хранилище, поэтому меньшее количество уникальных строк обычно означает меньший объем памяти.</td></tr>
<tr><td><code translate="no">BITMAP</code>, с использованием плотных растровых карт</td><td><code translate="no">(D + 1) * N / 8</code></td><td>Каждому уникальному значению требуется примерно один бит на сущность плюс одна растровая карта для отслеживания допустимых сущностей.</td></tr>
<tr><td><code translate="no">INVERTED</code> или <code translate="no">NGRAM</code></td><td><code translate="no">S</code></td><td>Начните с размера, приблизительно равного размеру построенного индекса.</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td><code translate="no">2 * S</code></td><td>Заложите примерно вдвое больший размер, чем у построенного индекса.</td></tr>
</tbody>
</table>
<p>Поделите результат на <code translate="no">1024 * 1024</code>, чтобы преобразовать байты в <strong>MiB</strong>. Например, индекс <code translate="no">STL_SORT</code> для одного миллиона непустых значений типа <code translate="no">INT64</code> требует примерно <strong>19 MiB</strong> для своих основных структур данных. Для полей VARCHAR, где каждая строка уникальна, оценка упрощается до <code translate="no">(l + 24) * N</code>; один миллион уникальных строк, средний размер которых составляет 32 байта, даёт примерно <strong>53 MiB</strong>.</p>
<p>Формула BITMAP описывает хранение плотной растровой карты; включение опционального кэша смещений добавляет примерно <code translate="no">8 * N</code> байт в 64-битной системе. Для <code translate="no">INVERTED</code>, <code translate="no">NGRAM</code> и <code translate="no">FMINDEX</code> создайте индекс на репрезентативных данных, чтобы получить <code translate="no">S</code> — размер исходных данных не заменяет размер построенного индекса. Для <code translate="no">AUTOINDEX</code> используйте формулу для фактически выбранного индекса, примените оценки к каждому сегменту, а затем суммируйте их по всем загруженным сегментам и репликам.</p>
<p>Это приблизительные цифры для планирования, а не ограничения по памяти. Они не учитывают временную память, используемую во время построения, загрузки и запросов, и более чувствительны к уникальным значениям и распределению данных для строковых и растровых индексов, чем для числовых <code translate="no">STL_SORT</code>. Фиксированный процент точности не гарантируется. Для отображения в памяти, устаревших форматов индексов, массивов и полей JSON требуется отдельное измерение. Перед определением размера развертывания проверьте фактическое использование памяти с помощью репрезентативных данных и запросов и оставьте запас на пиковые нагрузки.</p>
<h2 id="Whats-next" class="common-anchor-header">Дальнейшие действия<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Примеры создания и настройки индексов см. в разделах <a href="/docs/ru/bitmap.md">BITMAP</a>, <a href="/docs/ru/inverted.md">INVERTED</a>, <a href="/docs/ru/ngram.md">NGRAM</a>, <a href="/docs/ru/stl-sort.md">STL_SORT</a>, <a href="/docs/ru/trie.md">TRIE</a>, <a href="/docs/ru/fmindex.md">FMINDEX</a> и <a href="/docs/ru/rtree.md">RTREE</a>.</li>
<li>Описание полей и схемы коллекций см. в разделе <a href="/docs/ru/schema.md">«Объяснение схем</a>».</li>
</ul>
