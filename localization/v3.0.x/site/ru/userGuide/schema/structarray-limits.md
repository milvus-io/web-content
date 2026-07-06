---
id: structarray-limits.md
title: Ограничения StructArray
summary: >-
  Поддержка StructArray охватывает определение схемы, вставку данных,
  индексирование, режимы поиска и фильтры, специфичные для StructArray.
  Используйте эту страницу в качестве справочника по ограничениям, прежде чем
  полагаться на поведение StructArray в производственной среде.
---
<h1 id="StructArray-Limits" class="common-anchor-header">Ограничения StructArray<button data-href="#StructArray-Limits" class="anchor-icon" translate="no">
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
    </button></h1><p>Поддержка StructArray охватывает определение схемы, вставку данных, индексирование, режимы поиска и фильтры, специфичные для StructArray. Используйте эту страницу в качестве справочника по ограничениям, прежде чем полагаться на поведение StructArray в производственной среде.</p>
<p>Большинство ограничений StructArray обусловлено одним из трёх факторов: моделью схемы StructArray, выбранным режимом поиска для подполей вектора и версией Milvus, на которой работает ваша коллекция.</p>
<h2 id="Limits-at-a-glance" class="common-anchor-header">Краткий обзор ограничений<button data-href="#Limits-at-a-glance" class="anchor-icon" translate="no">
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
<tr><th>Область</th><th>Ограничение</th></tr>
</thead>
<tbody>
<tr><td>Форма схемы</td><td>Struct можно использовать только в качестве типа элемента поля Array. Struct не поддерживается в качестве поля коллекции верхнего уровня.</td></tr>
<tr><td>Схема подполя</td><td>Все элементы Struct в одном поле StructArray используют одну предопределенную схему Struct.</td></tr>
<tr><td>Емкость</td><td><code translate="no">max_capacity</code> является обязательным параметром и ограничивает количество элементов Struct, которые одна сущность может хранить в поле StructArray.</td></tr>
<tr><td>Изменения подполей</td><td>После создания поля StructArray вы не сможете добавлять подполя в это существующее поле StructArray.</td></tr>
<tr><td>Путь к подполю</td><td>Используйте пути в формате <code translate="no">structArray[subfield]</code>, например <code translate="no">chunks[emb]</code>, для индексов, целей поиска, полей вывода и фильтров. Не используйте <code translate="no">chunks.emb</code>.</td></tr>
<tr><td>Вставка формы</td><td>Вставьте поле StructArray в виде массива объектов. Не используйте синтаксис путей внутри данных вставки.</td></tr>
<tr><td>Векторные индексы</td><td>Векторное поле или векторное подполе принимает только один индекс. Используйте отдельные векторные подполя для поиска по EmbeddingList и поиска на уровне элементов.</td></tr>
<tr><td>Функции</td><td>Функции полей не поддерживаются для полей или подполей внутри поля StructArray.</td></tr>
<tr><td>Поля, допускающие значение null</td><td>Поля StructArray, допускающие значение null, зависят от версии. Если они поддерживаются, значение null применяется ко всему полю StructArray, а не к отдельному элементу Struct независимо.</td></tr>
<tr><td>Динамическое добавление поля</td><td>Добавление поля StructArray в существующую коллекцию зависит от версии и требует, чтобы добавляемое поле допускало значение null.</td></tr>
</tbody>
</table>
<h2 id="Schema-limits" class="common-anchor-header">Ограничения схемы<button data-href="#Schema-limits" class="anchor-icon" translate="no">
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
<tr><th>Ограничение</th><th>Подробности</th></tr>
</thead>
<tbody>
<tr><td>Struct не является типом поля верхнего уровня.</td><td>Создайте поле StructArray как « <code translate="no">datatype=DataType.ARRAY</code> » с « <code translate="no">element_type=DataType.STRUCT</code> » и « <code translate="no">struct_schema</code> ».</td></tr>
<tr><td>Все элементы используют одну схему.</td><td>Каждый элемент Struct в поле StructArray соответствует тому же списку подполей и тем же типам данных подполей.</td></tr>
<tr><td><code translate="no">max_capacity</code> обязателен.</td><td>Количество элементов Struct в одной сущности не должно превышать значение <code translate="no">max_capacity</code>, настроенное для поля StructArray.</td></tr>
<tr><td>Существующие подполя являются фиксированными.</td><td>К существующему полю StructArray нельзя добавлять новые подполя. Чтобы изменить схему подполей, удалите поле StructArray и добавьте его заново с обновленной схемой.</td></tr>
<tr><td>Вложенные StructArray не поддерживаются.</td><td>Поле StructArray не может содержать вложенные подполя типа <code translate="no">Array</code>, <code translate="no">ArrayOfVector</code>, <code translate="no">Struct</code> или <code translate="no">ArrayOfStruct</code>.</td></tr>
<tr><td>Функции внутри StructArray не поддерживаются.</td><td>Не определяйте функции полей для полей StructArray или их подполей.</td></tr>
</tbody>
</table>
<p>Примеры создания схем см. в разделе <a href="/docs/ru/create-structarray-field.md">«Создание поля StructArray</a>».</p>
<h2 id="Supported-subfield-data-types" class="common-anchor-header">Поддерживаемые типы данных подполей<button data-href="#Supported-subfield-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Поподполя StructArray сопоставляются физическому хранению в виде массива. В следующей таблице перечислены поддерживаемые и неподдерживаемые физические типы.</p>
<table>
<thead>
<tr><th>Физический тип подполя Struct</th><th>Поддержка</th><th>Примечания</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Array</code></td><td>Поддерживается</td><td>Определите подполе как ` <code translate="no">DataType.BOOL</code>`.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Поддерживается</td><td>Определите подполе как <code translate="no">DataType.INT8</code>, <code translate="no">DataType.INT16</code>, <code translate="no">DataType.INT32</code> или <code translate="no">DataType.INT64</code>.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Поддерживается</td><td>Определите подполе как <code translate="no">DataType.FLOAT</code> или <code translate="no">DataType.DOUBLE</code>.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Поддерживается</td><td>Определите подполе как <code translate="no">DataType.VARCHAR</code> и установите <code translate="no">max_length</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Поддерживается</td><td>Определите подполе как <code translate="no">DataType.FLOAT_VECTOR</code> и установите <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Поддерживается</td><td>Определите подполе как « <code translate="no">DataType.FLOAT16_VECTOR</code> » и установите значение « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Поддерживается</td><td>Определите подполе как « <code translate="no">DataType.BFLOAT16_VECTOR</code> » и установите значение « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Поддерживается</td><td>Определите подполе как « <code translate="no">DataType.INT8_VECTOR</code> » и установите значение « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Поддерживается</td><td>Определите подполе как « <code translate="no">DataType.BINARY_VECTOR</code> » и установите значение « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Не поддерживается</td><td>Подполя в виде разреженных векторов не поддерживаются в полях StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Не поддерживается</td><td>Используйте <code translate="no">VARCHAR</code>, а не <code translate="no">String</code>.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Не поддерживается</td><td>Поподполя JSON не поддерживаются в полях StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Не поддерживается</td><td>По podpolu «Геометрия» и функции ГИС не поддерживаются в полях StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Не поддерживается</td><td>По podpolu «Текст» в полях StructArray не поддерживаются.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Не поддерживается</td><td>По podpola «Timestamptz» и выражения, связанные со временем, не поддерживаются в полях StructArray.</td></tr>
<tr><td>Вложенные <code translate="no">Array</code>, <code translate="no">ArrayOfVector</code>, <code translate="no">Struct</code> или <code translate="no">ArrayOfStruct</code></td><td>Не поддерживается</td><td>Поля StructArray не поддерживают вложенные подполя типа массива, вектор-массива, Struct или массива структур.</td></tr>
</tbody>
</table>
<h2 id="Nullable-and-dynamic-schema-limits" class="common-anchor-header">Ограничения, связанные с допускающими нулевые значения и динамическими схемами<button data-href="#Nullable-and-dynamic-schema-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Поведение StructArray с возможностью присвоения значения null и динамическое добавление полей StructArray зависят от версии.</p>
<table>
<thead>
<tr><th>Возможность</th><th>Ограничение</th></tr>
</thead>
<tbody>
<tr><td>Поле StructArray с возможностью принятия нулевого значения</td><td>Поддерживается только в версиях, в которых реализована поддержка StructArray с возможностью присвоения нулевых значений и векторных массивов с возможностью присвоения нулевых значений.</td></tr>
<tr><td>Нулевое значение в Python</td><td>Для вставки нулевого значения StructArray в Python используйте ` <code translate="no">None</code> `. Не используйте ` <code translate="no">Null</code> ` или ` <code translate="no">null</code>`.</td></tr>
<tr><td>Область действия нулевого значения</td><td>Значение null распространяется на всё поле StructArray. Например, выражение <code translate="no">chunks=None</code> допустимо только в том случае, если <code translate="no">chunks</code> допускает значение null.</td></tr>
<tr><td>Частично нулевое значение StructArray</td><td>Если поле StructArray содержит допустимое значение массива, не смешивайте массивы подполей с нулевым значением с массивами подполей с допустимыми значениями в одном и том же значении.</td></tr>
<tr><td>Динамическое добавление поля StructArray</td><td>Добавление поля StructArray в существующую коллекцию поддерживается только в версиях, в которых реализована поддержка динамического добавления полей StructArray.</td></tr>
<tr><td>Требование к допускаемости нулевых значений при динамическом добавлении</td><td>Поле StructArray, добавляемое в существующую коллекцию, должно быть допускать значение null, поскольку у существующих сущностей отсутствует значение для нового поля.</td></tr>
<tr><td>Сущности после динамического добавления</td><td>Существующие сущности возвращают значение « <code translate="no">null</code> » для добавленного поля StructArray по всем его подполям.</td></tr>
</tbody>
</table>
<p>В Milvus v3.0.x доступны поля StructArray, допускающие значение null, векторные массивы, допускающие значение null, а также динамическое добавление полей StructArray.</p>
<p>Примеры вставки с полями StructArray, допускающими значение null, см. в разделе <a href="/docs/ru/insert-data-into-structarray-fields.md">«Вставка данных в поля StructArray</a>».</p>
<h2 id="Insert-limits" class="common-anchor-header">Ограничения на вставку<button data-href="#Insert-limits" class="anchor-icon" translate="no">
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
<tr><th>Ограничение</th><th>Подробности</th></tr>
</thead>
<tbody>
<tr><td>Формат полезных данных</td><td>Вставьте поле StructArray в виде массива объектов Struct, например <code translate="no">chunks: [{&quot;text&quot;: &quot;...&quot;, &quot;emb&quot;: [...]}]</code>.</td></tr>
<tr><td>Имена подполей</td><td>Внутри каждого объекта Struct используйте имена подполей, такие как <code translate="no">text</code> и <code translate="no">emb</code>, а не пути, такие как <code translate="no">chunks[text]</code>.</td></tr>
<tr><td>Соответствие схеме</td><td>Каждый элемент Struct должен соответствовать схеме Struct.</td></tr>
<tr><td>Емкость</td><td>Количество элементов Struct в одной сущности не должно превышать <code translate="no">max_capacity</code>.</td></tr>
<tr><td>Размеры вектора</td><td>Значения вектора должны соответствовать параметру « <code translate="no">dim</code> », настроенному для их векторных подполей.</td></tr>
<tr><td>Дублирование в режиме поиска</td><td>Если вам требуется как поиск по EmbeddingList, так и поиск на уровне элементов, записывайте векторы в два отдельных векторных подполя.</td></tr>
</tbody>
</table>
<h2 id="Index-and-metric-limits" class="common-anchor-header">Ограничения на индекс и метрику<button data-href="#Index-and-metric-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Векторное подполе StructArray может быть индексировано либо для поиска по EmbeddingList, либо для поиска на уровне элементов. Одно и то же векторное подполе не может использовать обе семьи метрик, поскольку каждое векторное поле или векторное подполе принимает только один индекс.</p>
<table>
<thead>
<tr><th>Режим поиска</th><th>Семейство метрик</th><th>Уровень результата</th></tr>
</thead>
<tbody>
<tr><td>Поиск по EmbeddingList</td><td><code translate="no">MAX_SIM</code>, метрики « <code translate="no">MAX_SIM_COSINE</code> », « <code translate="no">MAX_SIM_IP</code> », « <code translate="no">MAX_SIM_L2</code> » или бинарные метрики « <code translate="no">MAX_SIM_*</code> »</td><td>Результаты на уровне сущностей.</td></tr>
<tr><td>Поиск на уровне элементов</td><td>Обычные векторные метрики, такие как <code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code>, <code translate="no">HAMMING</code> или <code translate="no">JACCARD</code></td><td>Результаты на уровне элементов, которые могут включать смещение найденного элемента.</td></tr>
</tbody>
</table>
<p>Если требуются оба режима, используйте отдельные векторные подполя. Например, используйте <code translate="no">chunks[emb_list_vector]</code> для поиска по EmbeddingList и <code translate="no">chunks[emb]</code> для поиска на уровне элементов.</p>
<p>При планировании схемы коллекции подполя вектора StructArray учитываются как подполя вектора. Общее количество векторных полей и подполей вектора должно укладываться в пределы, установленные для целевой версии и уровня обслуживания.</p>
<p>Поддерживаемые матрицы типов index и metric см. в разделе <a href="/docs/ru/index-structarray-fields.md">«Поля StructArray индекса</a>».</p>
<h2 id="Search-limits" class="common-anchor-header">Ограничения поиска<button data-href="#Search-limits" class="anchor-icon" translate="no">
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
<tr><th>Поведение поиска</th><th>Поддержка и ограничения</th></tr>
</thead>
<tbody>
<tr><td>Базовый поиск по EmbeddingList</td><td>Поддерживается для подполей вектора StructArray, индексированных с помощью метрик типа « <code translate="no">MAX_SIM*</code> ». Возвращает результаты на уровне сущностей.</td></tr>
<tr><td>Базовый поиск на уровне элементов</td><td>Поддерживается для подполей вектора StructArray, индексированных с помощью обычных векторных метрик. Может возвращать смещения совпадающих элементов.</td></tr>
<tr><td>Поиск по диапазону</td><td>Поддерживается в зависимости от режима поиска и поддержки индексов/метрик целевой версии. Для поведения гибридного поиска по диапазону в запросах StructArray на уровне элементов проверьте вашу целевую версию.</td></tr>
<tr><td>Поиск с группировкой</td><td>Поиск с группировкой на уровне элементов может возвращать смещения. Поведение гибридного поиска с группировкой для запросов StructArray на уровне элементов зависит от версии.</td></tr>
<tr><td>Гибридный поиск</td><td>Запрос гибридного поиска может включать запросы на подполя вектора StructArray только в том случае, если целевая версия поддерживает данную комбинацию поиска. Каждый запрос по-прежнему следует семейству метрик индексированного подполя вектора.</td></tr>
<tr><td>Вывод смещений</td><td>Смещение доступно для результатов поиска на уровне элементов. Поиск EmbeddingList возвращает результаты на уровне сущностей и не использует смещения элементов в качестве основной единицы результата.</td></tr>
</tbody>
</table>
<h2 id="Filter-and-operator-limits" class="common-anchor-header">Ограничения фильтров и операторов<button data-href="#Filter-and-operator-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Скалярная фильтрация StructArray осуществляется с помощью операторов StructArray, таких как « <code translate="no">element_filter</code> » и семейство операторов « <code translate="no">MATCH_*</code> ». Подробная матрица поддержки предикатов приведена в разделе <a href="/docs/ru/struct-array-operators.md">«Операторы StructArray</a>».</p>
<p>В общих чертах:</p>
<ul>
<li><p>Используйте оператор « <code translate="no">$[subfield]</code> » только внутри операторов StructArray.</p></li>
<li><p>Используйте скалярные подполя для скалярных предикатов.</p></li>
<li><p>Не используйте векторные подполя в качестве входных данных для скалярных предикатов типа « <code translate="no">$[...]</code> ».</p></li>
<li><p>Синтаксис JSON-путей, функции JSON, функции контейнеров массивов, функции сопоставления текста, функции геометрии/ГИС и выражения Timestamptz не поддерживаются для предикатов на уровне элементов StructArray.</p></li>
<li><p>Предпочтительно использовать явные булевы сравнения, такие как ` <code translate="no">$[has_code] == true</code> `, вместо простых булевых выражений.</p></li>
</ul>
<h2 id="Related-pages" class="common-anchor-header">Связанные страницы<button data-href="#Related-pages" class="anchor-icon" translate="no">
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
<li><p>Чтобы создать поле StructArray, ознакомьтесь со статьёй <a href="/docs/ru/create-structarray-field.md">«Создание поля StructArray</a>».</p></li>
<li><p>Для вставки данных ознакомьтесь с разделом <a href="/docs/ru/insert-data-into-structarray-fields.md">«Вставка данных в поля StructArray</a>».</p></li>
<li><p>Чтобы создать векторные и скалярные индексы, ознакомьтесь с разделом <a href="/docs/ru/index-structarray-fields.md">«Индексирование полей StructArray</a>».</p></li>
<li><p>Чтобы ознакомиться с синтаксисом фильтров StructArray, прочтите раздел <a href="/docs/ru/struct-array-operators.md">«Операторы StructArray</a>».</p></li>
</ol>
