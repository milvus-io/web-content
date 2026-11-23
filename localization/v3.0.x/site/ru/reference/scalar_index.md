---
id: scalar_index.md
related_key: scalar_index
summary: >-
  Сравните типы скалярных индексов, проверьте совместимость полей и разберитесь
  в принципах автоматического выбора индексов.
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
    </button></h1><p>Скалярные индексы могут ускорить <a href="/docs/ru/boolean.md">фильтрацию</a> по невекторным полям. Воспользуйтесь этим обзором, чтобы выбрать индекс, проверить совместимость полей и понять принципы автоматического выбора.</p>
<p>Рекомендуется индексировать поля, используемые в часто применяемых или медленно работающих фильтрах. Для каждого поля, включенного в запрос на создание индекса, выберите один из двух вариантов:</p>
<ul>
<li><strong>Укажите тип индекса:</strong> выберите тип, совместимый с типом данных поля и вашими фильтрами.</li>
<li><strong>Используйте параметр « <code translate="no">AUTOINDEX</code> »:</strong> установите значение « <code translate="no">index_type</code> » на « <code translate="no">AUTOINDEX</code> », чтобы Milvus самостоятельно выбрал тип. См. раздел <a href="#AUTOINDEX-behavior">«Поведение параметра AUTOINDEX</a>».</li>
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
    </button></h2><p><a id="Supported-predicates"></a>
<a id="Comparisons-and-membership"></a>
<a id="String-patterns"></a></p>
<p>Откройте руководство по индексу, чтобы ознакомиться с поддерживаемыми фильтрами, параметрами и этапами создания:</p>
<table>
<thead>
<tr><th>Тип индекса</th><th>Используется для</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/ru/inverted.md">INVERTED</a></td><td>Фильтры равенства, принадлежности и диапазона.</td></tr>
<tr><td><a href="/docs/ru/bitmap.md">BITMAP</a></td><td>Поля с небольшим количеством различных значений, например коды статуса.</td></tr>
<tr><td><a href="/docs/ru/stl-sort.md">STL_SORT</a></td><td>Поиск значений и фильтры диапазона.</td></tr>
<tr><td><a href="/docs/ru/trie.md">TRIE</a></td><td>Точный поиск строк и сопоставление префиксов в полях типа « <code translate="no">VARCHAR</code> ».</td></tr>
<tr><td><a href="/docs/ru/ngram.md">NGRAM</a></td><td>Фильтры LIKE и подходящие регулярные выражения.</td></tr>
<tr><td><a href="/docs/ru/rtree.md">RTREE</a></td><td>Пространственные фильтры для полей типа « <code translate="no">GEOMETRY</code> ».</td></tr>
</tbody>
</table>
<p>Перед созданием индекса ознакомьтесь с приведенной ниже таблицей совместимости полей и проверьте, поддерживает ли выбранный индекс нужные фильтры.</p>
<p><details id="Filter-execution">
<summary><strong>Как фильтры используют индексы</strong></summary></p>
<p>Индекс используется только для подходящих выражений; остальные фильтры могут сканировать данные. Арифметические операции и сравнения между полями не наследуют ускорение поиска по литералам. Информацию о логических комбинациях и проверках на NULL см. в разделе <a href="/docs/ru/basic-operators.md">«Основные операторы</a>».</p>
<p></details></p>
<p><a id="Choosing-a-scalar-index"></a></p>
<h2 id="Supported-field-types" class="common-anchor-header">Поддерживаемые типы полей<button data-href="#Supported-field-types" class="anchor-icon" translate="no">
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
    </button></h2><p><a id="Array-JSON-and-spatial-predicates"></a>
<a id="JSON-field-indexing"></a></p>
<p>Определите тип данных вашего поля, чтобы узнать, какие явные индексы для него поддерживаются. В строках массива « <code translate="no">ARRAY&lt;T&gt;</code> » означает « <code translate="no">ARRAY</code> » с « <code translate="no">element_type=T</code> »:</p>
<table>
<thead>
<tr><th>Тип поля</th><th>Типы явных индексов</th><th>Условия</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td>Скалярные поля типа «Булево значение» не поддерживают <code translate="no">STL_SORT</code>.</td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td><td><code translate="no">BITMAP</code> недоступно для полей первичного ключа.</td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td><td>Явное использование <code translate="no">BITMAP</code> недопустимо.</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code>, <code translate="no">TRIE</code>, <code translate="no">NGRAM</code></td><td><code translate="no">BITMAP</code> недоступно для полей первичного ключа. См. <a href="#String-pattern-indexes">выбор индекса по фильтру</a>.</td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td><td>См. <a href="/docs/ru/timestamptz-field.md">поле TIMESTAMPTZ</a>.</td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td><td>См. <a href="/docs/ru/rtree.md">RTREE</a>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td>См. <a href="/docs/ru/array_data_type.md#Array-index-support">«Поддержка индекса массива</a>».</td></tr>
<tr><td><code translate="no">ARRAY&lt;INT8&gt;</code>, <code translate="no">ARRAY&lt;INT16&gt;</code>, <code translate="no">ARRAY&lt;INT32&gt;</code>, <code translate="no">ARRAY&lt;INT64&gt;</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td>См. раздел <a href="/docs/ru/array_data_type.md#Array-index-support">«Поддержка индексов массивов</a>».</td></tr>
<tr><td><code translate="no">ARRAY&lt;FLOAT&gt;</code>, <code translate="no">ARRAY&lt;DOUBLE&gt;</code></td><td><code translate="no">INVERTED</code></td><td>См. раздел <a href="/docs/ru/array_data_type.md#Array-index-support">«Поддержка индексов массивов</a>».</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td>См. раздел <a href="/docs/ru/array_data_type.md#Array-index-support">«Поддержка индексов массивов</a>».</td></tr>
<tr><td><code translate="no">JSON</code></td><td>Зависит от индексированного пути и типа приведения.</td><td>Проверьте <a href="/docs/ru/json-indexing.md#Understand-cast-types">совместимость и требования к JSON-путям</a>.</td></tr>
<tr><td>Невекторные подполя StructArray</td><td>Зависит от типа данных подполя.</td><td>Индексируйте подполя отдельно; подполя типа ` <code translate="no">BOOL</code> ` не могут использовать явное ` <code translate="no">STL_SORT</code>`. См. <a href="/docs/ru/index-structarray-fields.md#Create-scalar-indexes">правила для подполей</a>.</td></tr>
<tr><td><code translate="no">TEXT</code></td><td>Нет</td><td>Созданные пользователем скалярные индексы, включая <code translate="no">AUTOINDEX</code>, недоступны.</td></tr>
</tbody>
</table>
<div class="alert note">
<blockquote>
<p>Скалярные индексы, включая <code translate="no">AUTOINDEX</code>, не поддерживают рекурсивные поля ARRAY или массивы с элементами, допускающими значение null. См. раздел <a href="/docs/ru/array_data_type.md#Array-index-support">«Поддержка индексов массивов</a> для фильтров обычных массивов» и <a href="/docs/ru/index-structarray-fields.md#Create-scalar-indexes">«Индексирование полей StructArray»</a> для ознакомления с правилами для подполей.</p>
</blockquote>
</div>
<p><details id="String-pattern-indexes">
<summary><strong>Выбор индекса для фильтров VARCHAR</strong></summary></p>
<p>Для поля типа ` <code translate="no">VARCHAR</code> ` сравните совместимые индексы с учётом ваших фильтров:</p>
<table>
<thead>
<tr><th>Требования к фильтрации</th><th>Рекомендации по индексам и условия</th></tr>
</thead>
<tbody>
<tr><td>Точный поиск строк и префиксов</td><td><a href="/docs/ru/trie.md#Queries-accelerated-by-TRIE">TRIE</a>, <a href="/docs/ru/stl-sort.md#Queries-accelerated-by-STLSORT">STL_SORT</a> или <a href="/docs/ru/inverted.md#Queries-accelerated-by-INVERTED">INVERTED</a>.</td></tr>
<tr><td>Небольшое количество различных строковых значений</td><td><a href="/docs/ru/bitmap.md#Queries-accelerated-by-BITMAP">BITMAP</a>; шаблоны сравниваются с индексированными значениями.</td></tr>
<tr><td>LIKE или регулярное выражение с подходящими фиксированными литералами</td><td><a href="/docs/ru/ngram.md#Queries-accelerated-by-NGRAM">NGRAM</a> для полей типа « <code translate="no">VARCHAR</code> » или путей к строкам в формате JSON с учётом условий длины грамма и повторной проверки.</td></tr>
<tr><td>Регулярное выражение без пригодных фиксированных литералов</td><td>Запрос может сканировать данные или оценивать множество индексированных значений; проверьте условия выбранного индекса.</td></tr>
</tbody>
</table>
<p>Диапазоны в индексах типа « <code translate="no">VARCHAR</code> » используют сортировку строк, даже если строки содержат числа. Использование индекса зависит от планирования запроса, извлекаемых литералов, кардинальности и распределения данных. Правила планирования см. в разделе <a href="/docs/ru/pattern-matching.md#Accelerate-pattern-matching-with-indexes">«Сопоставление шаблонов</a> ». Для строк-путей JSON проверьте требования к пути и приведению типов в разделе <a href="/docs/ru/json-indexing.md">«Индексирование JSON</a>».</p>
<p></details></p>
<p><a id="How-AUTOINDEX-selects"></a></p>
<h2 id="AUTOINDEX-behavior" class="common-anchor-header">Поведение параметра AUTOINDEX<button data-href="#AUTOINDEX-behavior" class="anchor-icon" translate="no">
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
    </button></h2><p>Установите для параметра « <code translate="no">index_type</code> » значение « <code translate="no">AUTOINDEX</code> » в определении индекса каждого выбранного поля. Milvus выбирает тип на основе типа данных и, где это применимо, количества уникальных значений при каждом построении индекса:</p>
<table>
<thead>
<tr><th>Тип поля</th><th>Выбор по умолчанию</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code>, <code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">VARCHAR</code></td><td><code translate="no">BITMAP</code> если количество уникальных значений меньше 100; в противном случае — <code translate="no">STL_SORT</code>.</td></tr>
<tr><td><code translate="no">ARRAY</code> где <code translate="no">element_type</code> принимает значения <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code> или <code translate="no">VARCHAR</code></td><td><code translate="no">BITMAP</code> если количество уникальных элементов меньше 100; в противном случае <code translate="no">INVERTED</code>.</td></tr>
<tr><td><code translate="no">JSON</code> пути преобразуются в <code translate="no">BOOL</code>, <code translate="no">DOUBLE</code> или <code translate="no">VARCHAR</code></td><td><code translate="no">INVERTED</code> по умолчанию в версии 3.0. <a href="/docs/ru/json-indexing.md#Index-requirements">Настройка «JSON opt-in</a> » включает описанную выше стратегию скалярного растрового изображения/сортировки.</td></tr>
<tr><td><code translate="no">JSON</code> пути, приведенные к типу <code translate="no">ARRAY_BOOL</code>, <code translate="no">ARRAY_DOUBLE</code> или <code translate="no">ARRAY_VARCHAR</code></td><td>Используйте явное указание <code translate="no">INVERTED</code>; сопоставление по умолчанию в версии 3.0.6 отклоняет автоматический выбор для таких преобразований.</td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td></tr>
<tr><td><code translate="no">TEXT</code></td><td>Не поддерживается.</td></tr>
</tbody>
</table>
<div class="alert note">
<blockquote>
<p>Для поддерживаемого скалярного поля определение индекса, в котором опущено <code translate="no">index_type</code>, также запрашивает автоматический выбор. Поля, не включённые в запрос, не индексируются.</p>
</blockquote>
</div>
<p><a id="Version-compatibility"></a></p>
<p><details>
<summary><strong>Подробности выбора</strong></summary></p>
<ul>
<li><strong>Внутренние схемы размещения:</strong> параметр ` <code translate="no">AUTOINDEX</code> ` может выбирать схемы размещения, недоступные в качестве явных вариантов, например растровую индексацию для ` <code translate="no">FLOAT</code> ` и ` <code translate="no">DOUBLE</code>`. Стратегия, основанная на кардинальности, внутренне называется ` <code translate="no">HYBRID</code> `; вы не можете указать её напрямую. Выбранный индекс определяет, какие фильтры могут его использовать.</li>
<li><strong>Пороговое значение кардинальности:</strong> <a id="Cardinality-threshold"></a>Установите значение <code translate="no">bitmap_cardinality_limit</code> (диапазон: 1–1000), чтобы переопределить пороговое значение по умолчанию. При значениях ниже этого порога используется растровый индекс; при значениях, равных или превышающих порог, применяется макет с высокой кардинальностью для данного типа данных. Явные варианты <code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code> и <code translate="no">BITMAP</code> обходят выбор на основе кардинальности и игнорируют этот порог.</li>
<li><strong>Переопределения администратора:</strong> изменение сопоставлений типов осуществляется через <code translate="no">scalarAutoIndex.params.build</code>. Параметр <code translate="no">scalarAutoIndex.enable=false</code> (по умолчанию) по-прежнему допускает явное использование <code translate="no">AUTOINDEX</code>; параметр <code translate="no">true</code> также применяет автоматический отбор к допустимым ручным запросам.</li>
</ul>
<p></details></p>
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
    </button></h2><p><a id="Performance-considerations"></a>
<a id="Estimating-memory-requirements"></a></p>
<p>Выберите руководство для следующей задачи:</p>
<ul>
<li><strong>Создание индекса:</strong> воспользуйтесь <a href="#Index-types">руководством по индексам</a> для ознакомления с параметрами и примерами создания.</li>
<li><strong>Планирование ресурсов:</strong> ознакомьтесь с рекомендациями по памяти для <a href="/docs/ru/stl-sort.md#Memory-considerations">STL_SORT</a>, <a href="/docs/ru/bitmap.md#Memory-considerations">BITMAP</a>, <a href="/docs/ru/inverted.md#Memory-considerations">INVERTED</a> или <a href="/docs/ru/ngram.md#Memory-considerations">NGRAM</a>. Сравните использование памяти, время сборки и задержку запросов с типичными данными и фильтрами.</li>
<li><strong>Настройте текстовый поиск:</strong> <a href="/docs/ru/keyword-match.md">«Text Match»</a> и <a href="/docs/ru/full-text-search.md">«Full Text Search»</a> охватывают анализ текста, BM25, <code translate="no">TEXT_MATCH</code> и <code translate="no">PHRASE_MATCH</code>. Скалярный индекс <code translate="no">INVERTED</code> не поддерживает эти механизмы.</li>
</ul>
<p><details id="Drop-index-compatibility">
<summary><strong>Удаление скалярных индексов в старых версиях Milvus</strong></summary></p>
<p>В Milvus v2.6.3 или более ранних версиях перед удалением скалярного индекса необходимо освободить коллекцию. Начиная с версии v2.6.4, индекс можно удалить без освобождения коллекции.</p>
<p></details></p>
