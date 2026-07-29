---
id: json-indexing.md
title: Индексирование JSON
summary: >-
  Поля JSON предоставляют гибкий способ хранения структурированных метаданных в
  Milvus. Без индексирования запросы по полям JSON требуют полного сканирования
  коллекции, что приводит к замедлению работы по мере роста набора данных.
  Индексирование JSON создает индексы по конкретным путям внутри данных JSON,
  благодаря чему запросы на равенство, диапазон и другие фильтрующие запросы по
  этим путям выполняются быстро.
---
<h1 id="JSON-Indexing" class="common-anchor-header">Индексирование JSON<button data-href="#JSON-Indexing" class="anchor-icon" translate="no">
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
    </button></h1><p>Поля JSON предоставляют гибкий способ хранения структурированных метаданных в Milvus. Без индексирования запросы по полям JSON требуют полного сканирования коллекции, что приводит к замедлению работы по мере роста набора данных. Индексирование JSON создает индекс по определенному пути внутри данных JSON, благодаря чему запросы на равенство, диапазон и другие фильтры по этому пути выполняются быстро.</p>
<p>Индексирование JSON идеально подходит для:</p>
<ul>
<li><p>Структурированных схем с постоянными, известными ключами</p></li>
<li><p>Запросы на равенство, « <code translate="no">IN</code> », диапазон и сопоставление текста по конкретным путям JSON</p></li>
<li><p>Сценариев, в которых требуется точный контроль над тем, какие ключи индексируются</p></li>
</ul>
<p>Для сложных JSON-документов с разнообразными шаблонами запросов в качестве альтернативы рассмотрите возможность использования <a href="/docs/ru/json-shredding.md">фрагментации JSON</a>.</p>
<h2 id="Index-type-overview" class="common-anchor-header">Обзор типов индексов<button data-href="#Index-type-overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus предлагает четыре типа индексов для путей JSON. Каждый из них подходит для своего шаблона запроса.</p>
<p>Перед выбором типа индекса определите <strong>тип преобразования</strong> для пути JSON. Тип преобразования определяет, как Milvus интерпретирует значение по данному пути и какие типы индексов доступны.</p>
<h3 id="Understand-cast-types" class="common-anchor-header">Понимание типов преобразования<button data-href="#Understand-cast-types" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">json_cast_type</code> — это тип данных, используемый для интерпретации и индексирования значения по адресу <code translate="no">json_path</code>. Он отличается от типа схемы поля: поле по-прежнему является полем « <code translate="no">JSON</code> », но каждый индексируемый путь рассматривается как конкретный тип — скаляр, массив или объект JSON.</p>
<p>Выберите тип приведения, соответствующий значениям, хранящимся по данному пути. Чтобы проверить, поддерживает ли тип приведения работу с конкретным типом индекса, см. <a href="/docs/ru/json-indexing.md#compatibility-reference">Справочник по совместимости</a>.</p>
<table>
<thead>
<tr><th>Тип приведения</th><th>Используйте, если значение пути…</th><th>Пример значения</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>Булево значение</td><td><code translate="no">true</code></td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td>Числовое значение</td><td><code translate="no">99.99</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>Строковое значение</td><td><code translate="no">&quot;electronics&quot;</code></td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td>Массив булевых значений</td><td><code translate="no">[true, false]</code></td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td>Массив числовых значений</td><td><code translate="no">[1.2, 3.14]</code></td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td>Массив строковых значений</td><td><code translate="no">[&quot;tag1&quot;, &quot;tag2&quot;]</code></td></tr>
<tr><td><code translate="no">JSON</code></td><td>Целый объект JSON или его подобъект. Индексирование целых объектов JSON больше не поддерживается, начиная с версии Milvus 3.0.0.</td><td><code translate="no">{&quot;supplier&quot;: {&quot;country&quot;: &quot;USA&quot;}}</code></td></tr>
</tbody>
</table>
<p>Если значения по одному и тому же пути имеют несовместимые типы, индексируются только значения, соответствующие типу приведения. Например, если <code translate="no">metadata[&quot;price&quot;]</code> содержит как <code translate="no">99.99</code>, так и <code translate="no">&quot;99.99&quot;</code>, индекс с типом приведения <code translate="no">DOUBLE</code> включает числовое значение и пропускает строковое. Для преобразования строковых значений во время индексирования используйте <code translate="no">json_cast_function</code>; см. <a href="/docs/ru/json-indexing.md#example-5-convert-data-type-at-index-time">Пример 5: Преобразование типа данных при индексировании</a>.</p>
<h3 id="Choose-an-index-type" class="common-anchor-header">Выбор типа индекса<button data-href="#Choose-an-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>После выбора типа приведения выберите тип индекса в соответствии с шаблоном вашего запроса.</p>
<table>
<thead>
<tr><th>Шаблон запроса</th><th>Рекомендуемый тип индекса</th><th>Требования к типу приведения</th><th>Примечания</th></tr>
</thead>
<tbody>
<tr><td>Смешанные фильтры равенства и диапазона для скалярных значений</td><td><code translate="no">AUTOINDEX</code></td><td>Используйте <code translate="no">BOOL</code>, <code translate="no">DOUBLE</code> или <code translate="no">VARCHAR</code>.</td><td>Позвольте Milvus выбрать внутреннюю структуру индекса на основе кардинальности значений.</td></tr>
<tr><td>Фильтры по значениям внутри массивов JSON</td><td><code translate="no">INVERTED</code></td><td>Используйте <code translate="no">ARRAY_BOOL</code>, <code translate="no">ARRAY_DOUBLE</code> или <code translate="no">ARRAY_VARCHAR</code>.</td><td>Обязательно для всех типов, преобразованных из массивов.</td></tr>
<tr><td>Индексирование всего объекта или его части (устарело)</td><td><code translate="no">INVERTED</code> или <code translate="no">AUTOINDEX</code> (только для обеспечения совместимости)</td><td>Используйте <code translate="no">JSON</code>.</td><td>Поддерживается в целях совместимости. Для новых рабочих нагрузок создавайте индексы по конкретным путям или рассмотрите возможность использования <a href="/docs/ru/json-shredding.md">JSON-шреддинга</a>.</td></tr>
<tr><td>Фильтры диапазона для чисел или сортируемых строк</td><td><code translate="no">STL_SORT</code> или <code translate="no">AUTOINDEX</code></td><td>Используйте <code translate="no">DOUBLE</code> или <code translate="no">VARCHAR</code>.</td><td>Используйте <code translate="no">STL_SORT</code> для принудительного применения отсортированной схемы; используйте <code translate="no">AUTOINDEX</code>, если требуется автоматический выбор.</td></tr>
<tr><td>Фильтры равенства или « <code translate="no">IN</code> » для значений с низкой кардинальностью</td><td><code translate="no">BITMAP</code> или <code translate="no">AUTOINDEX</code></td><td>Используйте <code translate="no">BOOL</code> или <code translate="no">VARCHAR</code>.</td><td>Используйте <code translate="no">BITMAP</code> для принудительной растровой компоновки. Для числовых значений используйте <code translate="no">AUTOINDEX</code> или <code translate="no">STL_SORT</code>.</td></tr>
</tbody>
</table>
<p>Если вы сомневаетесь, начните с <code translate="no">AUTOINDEX</code> для скалярных путей. Явно используйте <code translate="no">INVERTED</code> для типов преобразования массивов и запросов на сопоставление текста. Индексирование JSON целых объектов с помощью <code translate="no">INVERTED</code> или <code translate="no">AUTOINDEX</code> по-прежнему поддерживается, но с версии Milvus 3.0.0 считается устаревшим.</p>
<h3 id="AUTOINDEX" class="common-anchor-header">AUTOINDEX<button data-href="#AUTOINDEX" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">AUTOINDEX</code> зависит от указанного вами параметра <code translate="no">json_cast_type</code>. В Milvus 3.0 параметр <code translate="no">AUTOINDEX</code> больше не всегда преобразуется в <code translate="no">INVERTED</code> для индексов JSON-путей.</p>
<table>
<thead>
<tr><th>Поведение при приведении типов</th><th><code translate="no">AUTOINDEX</code> поведение</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code>, <code translate="no">DOUBLE</code>, <code translate="no">VARCHAR</code></td><td>Выбирает между <code translate="no">BITMAP</code> и <code translate="no">STL_SORT</code> в зависимости от кардинальности значений.</td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code>, <code translate="no">ARRAY_DOUBLE</code>, <code translate="no">ARRAY_VARCHAR</code></td><td>Не поддерживается. Явно используйте « <code translate="no">INVERTED</code> » в качестве типа индекса.</td></tr>
<tr><td><code translate="no">JSON</code></td><td>Использует <code translate="no">INVERTED</code> для индексирования целых объектов или их подобъектов. Этот режим признан устаревшим, начиная с Milvus 3.0.0.</td></tr>
</tbody>
</table>
<p>Для скалярных типов приведения (<code translate="no">BOOL</code>, <code translate="no">DOUBLE</code> и <code translate="no">VARCHAR</code>) рекомендуется использовать <code translate="no">AUTOINDEX</code> в качестве отправной точки, если вы хотите, чтобы Milvus самостоятельно выбирал внутреннюю структуру индекса. Во время построения индекса Milvus измеряет <strong>кардинальность</strong> значений по пути JSON. Кардинальность означает количество различных значений по данному пути.</p>
<p>Исходя из кардинальности, Milvus выбирает одну из двух внутренних схем:</p>
<ul>
<li><p><strong>Низкая кардинальность</strong>: значения часто повторяются, например, <code translate="no">metadata[&quot;in_stock&quot;]</code> с <code translate="no">true</code> и <code translate="no">false</code>, или <code translate="no">metadata[&quot;status&quot;]</code> с небольшим набором строк статуса. Milvus внутренне создаёт индекс типа « <code translate="no">BITMAP</code> » для быстрого сравнения на равенство и фильтров типа « <code translate="no">IN</code> ».</p></li>
<li><p><strong>Высокая кардинальность</strong>: большинство значений являются уникальными, например <code translate="no">metadata[&quot;price&quot;]</code>, <code translate="no">metadata[&quot;created_at&quot;]</code> или <code translate="no">metadata[&quot;product_id&quot;]</code>. Milvus внутренне создает индекс <code translate="no">STL_SORT</code> для быстрой фильтрации по диапазонам, такой как <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code> и <code translate="no">&lt;=</code>.</p></li>
</ul>
<p>По умолчанию пороговое значение <code translate="no">BITMAP</code>-vs-<code translate="no">STL_SORT</code> составляет <strong>100 уникальных значений</strong>. Это пороговое значение можно настроить с помощью <code translate="no">bitmap_cardinality_limit</code>; см. раздел <a href="/docs/ru/json-indexing.md#how-do-i-tune-autoindexs-bitmap-vs-stl-sort-threshold">«Как настроить пороговое значение BITMAP-vs-STL_SORT для AUTOINDEX?</a>».</p>
<div class="alert note">
<p><strong>Изменение поведения в Milvus 3.0</strong>. В более ранних версиях при использовании <code translate="no">AUTOINDEX</code> для JSON-путей всегда создавался индекс <code translate="no">INVERTED</code>. Начиная с Milvus 3.0, <code translate="no">AUTOINDEX</code> выбирает между <code translate="no">BITMAP</code> и <code translate="no">STL_SORT</code> для скалярных типов преобразования. Для <code translate="no">JSON</code> <code translate="no">AUTOINDEX</code> по-прежнему использует <code translate="no">INVERTED</code>, хотя индексирование JSON целых объектов больше не рекомендуется. Для массивных типов преобразования и запросов на сопоставление текста явно укажите <code translate="no">INVERTED</code>.</p>
</div>
<h3 id="INVERTED" class="common-anchor-header">INVERTED<button data-href="#INVERTED" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">INVERTED</code> — лучший выбор, если вам нужны запросы с текстовым сопоставлением или индексирование массивов. Он также остается доступным для устаревшего индексирования целых объектов JSON.</p>
<p>Явно указывайте <code translate="no">INVERTED</code> в следующих случаях:</p>
<ul>
<li><p>Вам необходимо индексировать значения внутри массивов JSON.</p></li>
<li><p>Вы поддерживаете существующий индекс для всего объекта JSON или его подобъекта и хотите явно задать поведение « <code translate="no">INVERTED</code> ».</p></li>
<li><p>Вы хотите использовать один тип индекса, который обрабатывает запросы на равенство, « <code translate="no">IN</code> », диапазон, текстовое совпадение и массивы. Поддержка индексирования целых объектов остается доступной в целях совместимости, но за счет увеличения размера индекса.</p></li>
</ul>
<p>Для существующих индексов на целые объекты JSON (<code translate="no">json_cast_type=&quot;JSON&quot;</code>) вы можете продолжать использовать либо <code translate="no">INVERTED</code>, либо <code translate="no">AUTOINDEX</code>. В <code translate="no">AUTOINDEX</code> для этого типа приведения используется <code translate="no">INVERTED</code>. Индексирование целых объектов JSON больше не рекомендуется для новых рабочих нагрузок.</p>
<p>Подробности см. в разделе <a href="/docs/ru/inverted.md">INVERTED</a>.</p>
<h3 id="STLSORT" class="common-anchor-header">STL_SORT<button data-href="#STLSORT" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">STL_SORT</code> сохраняет значения из пути JSON в отсортированном порядке. Оптимизировано для фильтров диапазона по числовым значениям или сортируемым строковым значениям.</p>
<p><code translate="no">STL_SORT</code> Поддерживает только типы преобразования <code translate="no">DOUBLE</code> и <code translate="no">VARCHAR</code>. Используйте его, если:</p>
<ul>
<li><p>Ваши фильтры сравнивают значения с типами <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code> или <code translate="no">&lt;=</code>.</p></li>
<li><p>Индексированные значения имеют высокую кардинальность, например цены, временные метки, идентификаторы или сортируемые коды.</p></li>
<li><p>Вы хотите принудительно использовать отсортированную компоновку вместо того, чтобы позволить <code translate="no">AUTOINDEX</code> выбрать её самостоятельно.</p></li>
</ul>
<p><code translate="no">STL_SORT</code> Не поддерживаются типы приведения <code translate="no">BOOL</code>, <code translate="no">ARRAY_*</code> или <code translate="no">JSON</code>. Для массивов используйте <code translate="no">INVERTED</code>. Существующие индексы целых объектов могут по-прежнему использовать <code translate="no">INVERTED</code> или <code translate="no">AUTOINDEX</code>, однако индексирование JSON целых объектов устарело.</p>
<p>Подробности см. в разделе <a href="/docs/ru/stl-sort.md">STL_SORT</a>.</p>
<h3 id="BITMAP" class="common-anchor-header">BITMAP<button data-href="#BITMAP" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">BITMAP</code> создает компактную растровую карту для каждого уникального значения по пути JSON. Она оптимизирована для фильтров равенства и <code translate="no">IN</code> при работе со значениями, которые часто повторяются.</p>
<p><code translate="no">BITMAP</code> Поддерживает только типы приведения <code translate="no">BOOL</code> и <code translate="no">VARCHAR</code>. Используйте его, если:</p>
<ul>
<li><p>Ваши фильтры используют типы преобразования « <code translate="no">==</code> » или « <code translate="no">IN</code> ».</p></li>
<li><p>Индексируемые значения имеют низкую кардинальность, например, булевы значения, значения статуса или небольшой набор категорий.</p></li>
<li><p>Вы хотите принудительно использовать растровую компоновку вместо того, чтобы позволить <code translate="no">AUTOINDEX</code> выбрать её самостоятельно.</p></li>
</ul>
<p><code translate="no">BITMAP</code> не поддерживает типы приведения <code translate="no">DOUBLE</code>, <code translate="no">ARRAY_*</code> или <code translate="no">JSON</code>. Для числовых значений вместо них используйте <code translate="no">AUTOINDEX</code>, <code translate="no">STL_SORT</code> или <code translate="no">INVERTED</code>.</p>
<p>Подробности см. в разделе <a href="/docs/ru/bitmap.md">BITMAP</a>.</p>
<h3 id="Compatibility-reference" class="common-anchor-header">Справочник по совместимости<button data-href="#Compatibility-reference" class="anchor-icon" translate="no">
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
    </button></h3><p>Используйте приведенную ниже таблицу в качестве краткого справочника по поддерживаемым комбинациям типов данных ( <code translate="no">(cast type, index type)</code> ).</p>
<table>
<thead>
<tr><th>Тип приведения</th><th>Описание</th><th>Пример значения</th><th>AUTOINDEX</th><th>INVERTED</th><th>STL_SORT</th><th>BITMAP</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>Булевы значения (<code translate="no">true</code>/<code translate="no">false</code>).</td><td><code translate="no">true</code></td><td>Да</td><td>Да</td><td>Нет</td><td>Да</td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td>Числовые значения (целые или с плавающей запятой).</td><td><code translate="no">99.99</code></td><td>Да</td><td>Да</td><td>Да</td><td>Нет</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>Строковые значения.</td><td><code translate="no">&quot;electronics&quot;</code></td><td>Да</td><td>Да</td><td>Да</td><td>Да</td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td>Массив логических значений.</td><td><code translate="no">[true, false]</code></td><td>Нет</td><td>Да</td><td>Нет</td><td>Нет</td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td>Массив чисел.</td><td><code translate="no">[1.2, 3.14]</code></td><td>Нет</td><td>Да</td><td>Нет</td><td>Нет</td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td>Массив строк.</td><td><code translate="no">[&quot;tag1&quot;, &quot;tag2&quot;]</code></td><td>Нет</td><td>Да</td><td>Нет</td><td>Нет</td></tr>
<tr><td><code translate="no">JSON</code></td><td>Полный объект JSON или его подобъект с автоматическим определением типов и сглаживанием. Устарело, начиная с Milvus 3.0.0.</td><td>любой вложенный объект</td><td>Да (устарело)</td><td>Да (устарело)</td><td>Нет</td><td>Нет</td></tr>
</tbody>
</table>
<p>Для ячеек, помеченных как « <code translate="no">No</code> », Milvus отклоняет запрос на этапе создания индекса. Для типов, преобразуемых в массивы, явно используйте « <code translate="no">INVERTED</code> » (поиск по «<code translate="no">AUTOINDEX</code> » не охватывает массивы).</p>
<h2 id="Create-a-JSON-index" class="common-anchor-header">Создание индекса JSON<button data-href="#Create-a-JSON-index" class="anchor-icon" translate="no">
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
    </button></h2><p>В этом разделе подробно описан процесс индексирования данных JSON различных форм. Во всех примерах используется приведенная ниже примерная структура и предполагается, что у вас уже есть коллекция, содержащая поле <code translate="no">JSON</code> с именем <code translate="no">metadata</code>.</p>
<h3 id="Sample-JSON-structure" class="common-anchor-header">Пример структуры JSON<button data-href="#Sample-JSON-structure" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;electronics&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;BrandA&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">99.99</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;string_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;99.99&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;tags&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;clearance&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;summer_sale&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;supplier&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;SupplierX&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;country&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;USA&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;contact&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;email&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;support@supplierx.com&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;phone&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Basic-setup" class="common-anchor-header">Базовая настройка<button data-href="#Basic-setup" class="anchor-icon" translate="no">
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
    </button></h3><p>В приведенных ниже примерах предполагается, что у вас есть хранилище данных ( <code translate="no">MilvusClient</code> ) с именем <code translate="no">client</code>, подключенное к вашему развертыванию Milvus, а также коллекция, которая уже содержит поле <code translate="no">JSON</code> с именем <code translate="no">metadata</code>. Если вам нужно настроить их с нуля, разверните блок ниже.</p>
<p><details></p>
<p><summary>Подключение и создание примерной коллекции</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Define a schema with a JSON field</span>
schema = client.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;pk&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;vec&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>)
schema.add_field(<span class="hljs-string">&quot;metadata&quot;</span>, DataType.JSON, nullable=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Minimal vector index so the collection can be loaded</span>
vec_index = client.prepare_index_params()
vec_index.add_index(field_name=<span class="hljs-string">&quot;vec&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;L2&quot;</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    schema=schema,
    index_params=vec_index,
)

<span class="hljs-comment"># Insert one row that matches the sample JSON structure above</span>
client.insert(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    data=[{
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;vec&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>],
        <span class="hljs-string">&quot;metadata&quot;</span>: {
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;string_price&quot;</span>: <span class="hljs-string">&quot;99.99&quot;</span>,
            <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>],
            <span class="hljs-string">&quot;supplier&quot;</span>: {
                <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;SupplierX&quot;</span>,
                <span class="hljs-string">&quot;country&quot;</span>: <span class="hljs-string">&quot;USA&quot;</span>,
                <span class="hljs-string">&quot;contact&quot;</span>: {
                    <span class="hljs-string">&quot;email&quot;</span>: <span class="hljs-string">&quot;support@supplierx.com&quot;</span>,
                    <span class="hljs-string">&quot;phone&quot;</span>: <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
                }
            }
        }
    }],
)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Подготовьте объект `index-params` для сбора определений индексов, добавленных в примерах ниже:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
<button class="copy-code-btn"></button></code></pre>
<p>В каждом из приведенных ниже примеров показан один вызов ` <code translate="no">index_params.add_index(...)</code> `. Выберите те из них, которые соответствуют вашим данным, и вызовите их на одном и том же объекте ` <code translate="no">index_params</code> `. Затем в конце примените всё в одном вызове ` <code translate="no">client.create_index(...)</code> `. Подробности см. в разделе <a href="/docs/ru/json-indexing.md#apply-the-index">«Применение индекса</a>».</p>
<h3 id="Example-1-Index-a-top-level-key-with-AUTOINDEX" class="common-anchor-header">Пример 1: Индексирование ключа верхнего уровня с помощью AUTOINDEX<button data-href="#Example-1-Index-a-top-level-key-with-AUTOINDEX" class="anchor-icon" translate="no">
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
    </button></h3><p>Создайте индекс для поля <code translate="no">category</code>, чтобы обеспечить быструю фильтрацию по категориям продуктов. С помощью <code translate="no">AUTOINDEX</code> Milvus выбирает <code translate="no">BITMAP</code> или <code translate="no">STL_SORT</code> в зависимости от количества уникальных категорий в ваших данных.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,</span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Index-a-nested-key" class="common-anchor-header">Пример 2: Индексирование вложенного ключа<button data-href="#Example-2-Index-a-nested-key" class="anchor-icon" translate="no">
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
    </button></h3><p>Создайте индекс для глубоко вложенного поля « <code translate="no">email</code> » для поиска контактов поставщиков. Параметр <code translate="no">json_path</code> поддерживает скобочную нотацию любой глубины.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;email_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;][&quot;contact&quot;][&quot;email&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,</span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Range-queries-with-STLSORT" class="common-anchor-header">Пример 3: Запросы по диапазону с использованием STL_SORT<button data-href="#Example-3-Range-queries-with-STLSORT" class="anchor-icon" translate="no">
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
    </button></h3><p>Если вы знаете, что в ваших запросах по пути будут преобладать сравнения по диапазонам (<code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, <code translate="no">&lt;=</code>), выберите сразу <code translate="no">STL_SORT</code>. Это позволяет обойти измерение кардинальности и сразу построить отсортированную структуру.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;price_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;price&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;DOUBLE&quot;</span>,
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>После индексирования запросы по диапазону, такие как <code translate="no">metadata[&quot;price&quot;] &gt; 50 AND metadata[&quot;price&quot;] &lt; 100</code>, используют бинарный поиск вместо полного сканирования.</p>
<h3 id="Example-4-Equality-queries-with-BITMAP" class="common-anchor-header">Пример 4: Запросы на равенство с использованием BITMAP<button data-href="#Example-4-Equality-queries-with-BITMAP" class="anchor-icon" translate="no">
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
    </button></h3><p>Для ключей с низкой кардинальностью, таких как коды статуса, булевы значения или строки, подобные перечислениям, сразу выбирайте <code translate="no">BITMAP</code>. Запросы на равенство и запросы типа <code translate="no">IN</code> превращаются в битовые операции.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;BITMAP&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;in_stock_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;in_stock&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;BOOL&quot;</span>,
    }
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">BITMAP</code> Также отлично подходит для полей, таких как столбец типа « <code translate="no">status</code> » с небольшим количеством различных строковых значений.</p>
<h3 id="Example-5-Convert-data-type-at-index-time" class="common-anchor-header">Пример 5: Преобразование типа данных при создании индекса<button data-href="#Example-5-Convert-data-type-at-index-time" class="anchor-icon" translate="no">
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
    </button></h3><p>Если числовые данные по ошибке хранятся в виде строк, используйте <code translate="no">STRING_TO_DOUBLE</code> для преобразования значения в число во время построения индекса.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;string_to_double_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;string_price&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;DOUBLE&quot;</span>,
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;json_cast_function&quot;</span>: <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Если преобразование для какой-либо строки завершилось неудачей (например, в случае нечисловой строки, такой как <code translate="no">&quot;invalid&quot;</code>), эта строка пропускается при индексировании.</p>
<h3 id="Example-6-Index-entire-JSON-objects" class="common-anchor-header">Пример 6: Индексирование целых JSON-объектов<button data-href="#Example-6-Index-entire-JSON-objects" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert warning">
<p>Начиная с версии Milvus 3.0.0, индексирование целых объектов JSON (<code translate="no">json_cast_type=&quot;JSON&quot;</code>), также известное как плоское индексирование JSON, признано устаревшим. Существующие индексы и новые запросы на создание индексов по-прежнему поддерживаются в целях совместимости, но этот режим больше не рекомендуется для новых рабочих нагрузок. Создавайте индексы JSON-путей для известных путей запросов. Для сложных или развивающихся JSON-документов с широким спектром шаблонов запросов рассмотрите возможность использования <a href="/docs/ru/json-shredding.md">фрагментации JSON</a>. Фрагментация JSON не ускоряет обработку значений внутри массивов; для таких запросов используйте индексы JSON-путей с типами преобразования массивов.</p>
</div>
<p>Для совместимых существующих рабочих нагрузок установка параметра « <code translate="no">json_cast_type=&quot;JSON&quot;</code> » приводит к индексированию полной структуры по заданному пути. Milvus преобразует вложенные объекты в пути и автоматически определяет тип каждого значения. Все ключи, расположенные по данному пути, становятся доступными для поиска.</p>
<p><code translate="no">AUTOINDEX</code> Прозрачно использует « <code translate="no">INVERTED</code> » для преобразования типа « <code translate="no">JSON</code> », поскольку преобразование в плоскую структуру и определение типа являются возможностями инвертированного индекса.</p>
<p>Индексируйте весь объект <code translate="no">metadata</code>:</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;metadata_full_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Или проиндексируйте подобъект, например всю информацию <code translate="no">supplier</code>:</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;supplier_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Индексирование целых объектов увеличивает размер индекса. Для новых рабочих нагрузок с глубоко вложенными документами и разнообразными шаблонами запросов используйте индексы по конкретным путям или рассмотрите возможность использования <a href="/docs/ru/json-shredding.md">JSON-шреддинга</a>.</p>
<h3 id="Apply-the-index" class="common-anchor-header">Примените индекс<button data-href="#Apply-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>После добавления всех параметров индекса примените их к коллекции:</p>
<pre><code translate="no" class="language-python">client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Создание индекса выполняется асинхронно. Воспользуйтесь <code translate="no">client.describe_index(...)</code>, чтобы проверить состояние создания конкретного индекса. Поле « <code translate="no">state</code> » (Состояние создания) отображает « <code translate="no">Finished</code> » (Создание завершено) после завершения создания, а поля « <code translate="no">total_rows</code> » (Создание в процессе), « <code translate="no">indexed_rows</code> » (Создание в процессе) и « <code translate="no">pending_index_rows</code> » (Создание в процессе) отображают ход создания.</p>
<pre><code translate="no" class="language-python">client.describe_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Пример ответа:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;json_path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;json_cast_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;VARCHAR&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;index_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AUTOINDEX&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;metadata&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;index_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;category_index&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;total_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;indexed_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;pending_index_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;state&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Finished&quot;</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Как только <code translate="no">state</code> сообщит о <code translate="no">Finished</code>, запросы по индексированному пути будут автоматически использовать новый индекс.</p>
<p>Для записей <code translate="no">AUTOINDEX</code> поле <code translate="no">index_type</code> в этом ответе отображается как <code translate="no">AUTOINDEX</code>. В настоящее время Milvus не раскрывает, какая базовая схема (<code translate="no">BITMAP</code> или <code translate="no">STL_SORT</code>) была выбрана на этапе сборки. Рассматривайте этот выбор как внутреннюю оптимизацию: запросы на равенство, <code translate="no">IN</code> и диапазон по данному пути будут работать независимо от того, какая схема была выбрана.</p>
<h2 id="FAQ" class="common-anchor-header">Часто задаваемые вопросы<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-do-I-choose-between-AUTOINDEX-and-an-explicit-index-type" class="common-anchor-header">Как выбрать между AUTOINDEX и явным типом индекса?<button data-href="#How-do-I-choose-between-AUTOINDEX-and-an-explicit-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>Начните с <code translate="no">AUTOINDEX</code>. Он выбирает подходящую схему расположения исходя из кардинальности ваших данных и охватывает большинство запросов на равенство, <code translate="no">IN</code>, и диапазонных запросов по JSON-путям. Выбирайте явный тип, если:</p>
<ul>
<li><p>Вы знаете шаблон своих запросов (например, всегда используете запросы по диапазону с <code translate="no">STL_SORT</code>, а запросы на равенство для значений с низкой кардинальностью — с <code translate="no">BITMAP</code>) и хотите обойтись без измерения кардинальности.</p></li>
<li><p>Вам нужны запросы на совпадение текста или подстроки. Используйте <code translate="no">INVERTED</code>.</p></li>
<li><p>Вы индексируете типы, преобразованные из массивов. Явно используйте <code translate="no">INVERTED</code>.</p></li>
<li><p>Вы обслуживаете существующий индекс JSON для целых объектов. Как <code translate="no">INVERTED</code>, так и <code translate="no">AUTOINDEX</code> по-прежнему поддерживаются в целях совместимости, но индексирование JSON для целых объектов устарело, начиная с Milvus 3.0.0.</p></li>
</ul>
<h3 id="What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="common-anchor-header">Что произойдет, если в фильтрующем выражении запроса используется тип, отличный от типа приведения индекса?<button data-href="#What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="anchor-icon" translate="no">
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
    </button></h3><p>Если в выражении фильтра используется тип, отличный от типа <code translate="no">json_cast_type</code> индекса, Milvus не использует индекс и может переключиться на более медленное переборное сканирование, если это допускают данные. Для обеспечения максимальной производительности всегда согласовывайте выражение фильтра с типом приведения индекса. Например, если числовой индекс создан с использованием <code translate="no">json_cast_type=&quot;DOUBLE&quot;</code>, индекс будет использоваться только при числовых условиях фильтрации.</p>
<h3 id="What-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="common-anchor-header">Что делать, если ключ JSON содержит несовместимые типы данных в разных сущностях?<button data-href="#What-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="anchor-icon" translate="no">
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
    </button></h3><p>Несогласованные типы могут привести к <strong>частичной индексации</strong>. Например, если <code translate="no">metadata[&quot;price&quot;]</code> хранится как число (<code translate="no">99.99</code>) и как строка (<code translate="no">&quot;99.99&quot;</code>), и вы создаете индекс с помощью <code translate="no">json_cast_type=&quot;DOUBLE&quot;</code>, индексируются только числовые значения. Записи в виде строк пропускаются и не появятся в результатах фильтрации. Используйте <code translate="no">json_cast_function=&quot;STRING_TO_DOUBLE&quot;</code> для приведения строк к числам во время индексирования или исправьте исходные данные так, чтобы все записи имели один тип.</p>
<h3 id="Can-I-create-multiple-indexes-on-the-same-JSON-key" class="common-anchor-header">Можно ли создать несколько индексов по одному и тому же ключу JSON?<button data-href="#Can-I-create-multiple-indexes-on-the-same-JSON-key" class="anchor-icon" translate="no">
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
    </button></h3><p>Нет. Milvus допускает не более одного индекса на каждую пару « <code translate="no">(field, json_path)</code> », независимо от типа приведения или типа индекса. Вы не можете создать одновременно индекс <code translate="no">INVERTED</code> и индекс <code translate="no">BITMAP</code> на одном и том же пути, а также два индекса на одном и том же пути с разными типами приведения. Однако вы можете создать индекс для всего объекта JSON и отдельный индекс для вложенного ключа внутри этого объекта, поскольку это разные пути.</p>
<h3 id="How-do-I-tune-AUTOINDEXs-BITMAP-vs-STLSORT-threshold" class="common-anchor-header">Как настроить пороговое значение BITMAP-vs-STL_SORT для AUTOINDEX?<button data-href="#How-do-I-tune-AUTOINDEXs-BITMAP-vs-STLSORT-threshold" class="anchor-icon" translate="no">
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
    </button></h3><p>По умолчанию <code translate="no">AUTOINDEX</code> выбирает <code translate="no">BITMAP</code>, если индексируемые значения имеют <strong>100 или менее различных значений</strong>, и <code translate="no">STL_SORT</code> в остальных случаях. Вы можете переопределить этот порог, добавив <code translate="no">&quot;bitmap_cardinality_limit&quot;</code> в параметры индекса (диапазон: 1–1000):</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;bitmap_cardinality_limit&quot;</span>: <span class="hljs-number">200</span>,  <span class="hljs-comment"># use BITMAP up to 200 distinct values</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Большинству пользователей не нужно настраивать этот параметр. Увеличьте его, если у вас есть поле со средней кардинальностью, для которого вы предпочитаете битовую карту; уменьшите его, чтобы быстрее переключить <code translate="no">AUTOINDEX</code> на <code translate="no">STL_SORT</code>. Этот параметр игнорируется, если вы явно указываете <code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code> или <code translate="no">BITMAP</code>.</p>
