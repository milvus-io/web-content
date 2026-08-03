---
id: array-operators.md
title: Операторы ARRAY
summary: >-
  Milvus предоставляет операторы ARRAY для фильтрации полей ARRAY и частичного
  обновления значений полей ARRAY.
---
<h1 id="ARRAY-Operators" class="common-anchor-header">Операторы ARRAY<button data-href="#ARRAY-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus предоставляет операторы ARRAY для фильтрации полей ARRAY и частичного обновления значений полей ARRAY.</p>
<div class="alert note">
<p>Все элементы массива должны быть одного типа, а вложенные структуры внутри массивов обрабатываются как простые строки. Поэтому при работе с полями ARRAY рекомендуется избегать чрезмерно глубокого вложения и стремиться к тому, чтобы структуры данных были максимально плоскими для обеспечения оптимальной производительности.</p>
</div>
<p>Операторы ARRAY в Milvus охватывают два сценария использования:</p>
<ul>
<li><p>Выражения фильтрации для запросов и поиска.</p></li>
<li><p>Частичное обновление в запросах типа « <code translate="no">upsert</code> ».</p></li>
</ul>
<h2 id="Available-ARRAY-operators" class="common-anchor-header">Доступные операторы ARRAY<button data-href="#Available-ARRAY-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>В следующей таблице перечислены операторы ARRAY, доступные в Milvus.</p>
<table>
<thead>
<tr><th>Оператор</th><th>Использование в</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/ru/v2.6.x/array-operators.md#ARRAYCONTAINS">ARRAY_CONTAINS(идентификатор, выражение)</a></td><td>Выражение фильтра</td><td>Проверяет, существует ли конкретный элемент в поле ARRAY.</td></tr>
<tr><td><a href="/docs/ru/v2.6.x/array-operators.md#ARRAYCONTAINSALL">ARRAY_CONTAINS_ALL(идентификатор, выражение)</a></td><td>Фильтрующее выражение</td><td>Проверяет, присутствуют ли все элементы указанного списка в поле ARRAY.</td></tr>
<tr><td><a href="/docs/ru/v2.6.x/array-operators.md#ARRAYCONTAINSANY">ARRAY_CONTAINS_ANY(идентификатор, выражение)</a></td><td>Фильтрующее выражение</td><td>Проверяет, присутствует ли хотя бы один элемент из указанного списка в поле ARRAY.</td></tr>
<tr><td><a href="/docs/ru/v2.6.x/array-operators.md#ARRAYLENGTH">ARRAY_LENGTH(идентификатор)</a></td><td>Фильтрующее выражение</td><td>Возвращает количество элементов в поле ARRAY; может использоваться в сочетании с операторами сравнения для фильтрации.</td></tr>
<tr><td><a href="/docs/ru/v2.6.x/array-operators.md#ARRAYAPPEND">ARRAY_APPEND</a></td><td><code translate="no">upsert</code> with <code translate="no">field_ops</code></td><td>Добавляет элементы полезных данных к существующему полю ARRAY. Доступно в Milvus версии 2.6.17 и более поздних.</td></tr>
<tr><td><a href="/docs/ru/v2.6.x/array-operators.md#ARRAYREMOVE">ARRAY_REMOVE</a></td><td><code translate="no">upsert</code> с <code translate="no">field_ops</code></td><td>Удаляет из существующего поля ARRAY все элементы, которые соответствуют значению в полезных данных запроса. Доступно в Milvus версии 2.6.17 и более поздних.</td></tr>
</tbody>
</table>
<h2 id="ARRAYCONTAINS" class="common-anchor-header">ARRAY_CONTAINS<button data-href="#ARRAYCONTAINS" class="anchor-icon" translate="no">
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
    </button></h2><p>Оператор « <code translate="no">ARRAY_CONTAINS</code> » проверяет наличие конкретного элемента в поле типа «array». Это полезно, когда требуется найти сущности, в массиве которых присутствует заданный элемент.</p>
<p><strong>Пример</strong></p>
<p>Предположим, у вас есть поле типа «массив» <code translate="no">history_temperatures</code>, содержащее зафиксированные минимальные температуры за разные годы. Чтобы найти все сущности, в массиве которых содержится значение <code translate="no">23</code>, можно использовать следующее выражение фильтра:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS(history_temperatures, 23)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Это вернёт все сущности, в массиве которых <code translate="no">history_temperatures</code> содержится значение <code translate="no">23</code>.</p>
<h2 id="ARRAYCONTAINSALL" class="common-anchor-header">ARRAY_CONTAINS_ALL<button data-href="#ARRAYCONTAINSALL" class="anchor-icon" translate="no">
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
    </button></h2><p>Оператор <code translate="no">ARRAY_CONTAINS_ALL</code> гарантирует, что все элементы указанного списка присутствуют в поле массива. Этот оператор полезен, когда требуется найти сущности, содержащие несколько значений в массиве.</p>
<p><strong>Пример</strong></p>
<p>Если необходимо найти все сущности, в массиве которых <code translate="no">history_temperatures</code> содержатся как <code translate="no">23</code>, так и <code translate="no">24</code>, можно использовать:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Это вернёт все сущности, в массиве которых <code translate="no">history_temperatures</code> содержатся оба указанных значения.</p>
<h2 id="ARRAYCONTAINSANY" class="common-anchor-header">ARRAY_CONTAINS_ANY<button data-href="#ARRAYCONTAINSANY" class="anchor-icon" translate="no">
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
    </button></h2><p>Оператор ` <code translate="no">ARRAY_CONTAINS_ANY</code> ` проверяет, присутствует ли в поле массива хотя бы один из элементов указанного списка. Это полезно, когда требуется найти сущности, содержащие хотя бы одно из указанных значений в массиве.</p>
<p><strong>Пример</strong></p>
<p>Чтобы найти все сущности, в массиве которых <code translate="no">history_temperatures</code> содержится либо <code translate="no">23</code>, либо <code translate="no">24</code>, можно использовать:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Это вернёт все сущности, в массиве которых <code translate="no">history_temperatures</code> содержится хотя бы одно из значений <code translate="no">23</code> или <code translate="no">24</code>.</p>
<h2 id="ARRAYLENGTH" class="common-anchor-header">ARRAY_LENGTH<button data-href="#ARRAYLENGTH" class="anchor-icon" translate="no">
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
    </button></h2><p>Функция <code translate="no">ARRAY_LENGTH</code> возвращает длину (количество элементов) массивного поля. Она принимает ровно один параметр: идентификатор массивного поля.</p>
<p><strong>Пример</strong></p>
<p>Чтобы найти все сущности, у которых массив <code translate="no">history_temperatures</code> содержит менее 10 элементов:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_LENGTH(history_temperatures) &lt; 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Это вернёт все сущности, у которых массив <code translate="no">history_temperatures</code> содержит менее 10 элементов.</p>
<h2 id="ARRAYAPPEND--Milvus-2617+" class="common-anchor-header">ARRAY_APPEND<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.17+</span><button data-href="#ARRAYAPPEND--Milvus-2617+" class="anchor-icon" translate="no">
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
    </button></h2><p>Оператор ` <code translate="no">ARRAY_APPEND</code> ` добавляет элементы полезных данных к существующему полю `ARRAY` во время запроса ` <code translate="no">upsert</code> `. Это не выражение фильтра. Используйте его, если хотите добавить значения в массив, не запрашивая сначала текущее значение массива.</p>
<p>В следующем примере на языке Python оператор ` <code translate="no">&quot;premium&quot;</code> ` добавляется к полю `ARRAY` при выполнении запроса ` <code translate="no">tags</code> ` для сущности, первичный ключ которой — ` <code translate="no">1</code>`:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldOp, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.upsert(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
    data=[{<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;premium&quot;</span>]}],
<span class="highlighted-wrapper-line">    field_ops={<span class="hljs-string">&quot;tags&quot;</span>: FieldOp.array_append()},</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Добавление <code translate="no">ARRAY_APPEND</code> к полю с помощью <code translate="no">field_ops</code> включает семантику частичного обновления для этого поля. Полную информацию о рабочем процессе, поддерживаемых типах элементов и ограничениях см. в разделе <a href="/docs/ru/v2.6.x/upsert-entities.md#Upsert-ARRAY-fields-with-partial-update-operators">«Upsert полей ARRAY с помощью операторов частичного обновления</a>».</p>
<h2 id="ARRAYREMOVE--Milvus-2617+" class="common-anchor-header">ARRAY_REMOVE<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.17+</span><button data-href="#ARRAYREMOVE--Milvus-2617+" class="anchor-icon" translate="no">
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
    </button></h2><p>Оператор ` <code translate="no">ARRAY_REMOVE</code> ` удаляет из существующего поля типа `ARRAY` все элементы, которые соответствуют значению в полезной нагрузке запроса, во время выполнения запроса ` <code translate="no">upsert</code> `. Это не выражение фильтра. Используйте его, если необходимо удалить соответствующие значения из массива без предварительного запроса текущего значения массива.</p>
<p>В следующем примере на языке Python удаляются элементы, соответствующие выражению ` <code translate="no">&quot;trial&quot;</code> `, из поля ARRAY ` <code translate="no">tags</code> ` сущности, первичный ключ которой — ` <code translate="no">1</code>`:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldOp, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.upsert(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
    data=[{<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;trial&quot;</span>]}],
<span class="highlighted-wrapper-line">    field_ops={<span class="hljs-string">&quot;tags&quot;</span>: FieldOp.array_remove()},</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Привязка <code translate="no">ARRAY_REMOVE</code> к полю с помощью <code translate="no">field_ops</code> включает семантику частичного обновления для этого поля. Полную информацию о рабочем процессе, поддерживаемых типах элементов и ограничениях см. в разделе <a href="/docs/ru/v2.6.x/upsert-entities.md#Upsert-ARRAY-fields-with-partial-update-operators">«Операторы частичного обновления для полей ARRAY с функцией Upsert</a>».</p>
