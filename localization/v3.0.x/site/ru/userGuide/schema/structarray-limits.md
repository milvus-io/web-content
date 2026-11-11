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
    </button></h2><p>Основные ограничения StructArray:</p>
<table>
<thead>
<tr><th>Область</th><th>Ограничение</th></tr>
</thead>
<tbody>
<tr><td>Форма схемы</td><td>Struct можно использовать только в качестве типа элемента поля массива. Struct не поддерживается в качестве поля коллекции верхнего уровня.</td></tr>
<tr><td>Схема подполей</td><td>Все элементы Struct в одном поле StructArray используют одну предопределенную схему Struct.</td></tr>
<tr><td>Вложенные подполя</td><td>Начиная с версии Milvus 3.0.6, структура (Struct) может содержать скалярные подполя типа « <code translate="no">ARRAY</code> » с одним уровнем вложения. Вложенные подполя типа « <code translate="no">Struct</code> », « <code translate="no">ArrayOfStruct</code> » и JSON не поддерживаются ни в одной версии.</td></tr>
<tr><td>Параметр capacity</td><td><code translate="no">max_capacity</code> является обязательным параметром и ограничивает количество элементов Struct, которые одна сущность может хранить в поле StructArray.</td></tr>
<tr><td>Изменения подполей</td><td>Начиная с Milvus 3.0.6, вы можете добавить подполе, допускающее нулевые значения элемента, в существующее поле StructArray или удалить из него подполе. В более ранних версиях для этого требуется удалить и заново добавить всё поле StructArray.</td></tr>
<tr><td>Путь к подполю</td><td>Используйте пути в формате <code translate="no">structArray[subfield]</code>, например <code translate="no">chunks[emb]</code>, для индексов, целей поиска, полей вывода и фильтров. Не используйте <code translate="no">chunks.emb</code>.</td></tr>
<tr><td>Вставка формы</td><td>Вставьте поле StructArray в виде массива объектов. Не используйте синтаксис путей внутри данных вставки.</td></tr>
<tr><td>Векторные индексы</td><td>Векторное поле или векторное подполе принимает только один индекс. Используйте отдельные векторные подполя для поиска по EmbeddingList и поиска на уровне элементов.</td></tr>
<tr><td>Функции</td><td>Функции полей не поддерживаются для полей или подполей внутри поля StructArray.</td></tr>
<tr><td>Поля, допускающие значение null</td><td>Поля StructArray, допускающие нулевые значения, зависят от версии. Нулевое значение на уровне строки применяется ко всему полю StructArray. Начиная с Milvus 3.0.6, подполе может дополнительно допускать нулевое значение в отдельном элементе Struct: <code translate="no">nullable=True</code> для скалярного или векторного подполя, <code translate="no">element_nullable=True</code> для массивного подполя. Сам элемент Struct не может быть нулевым.</td></tr>
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
    </button></h2><p>Схемы StructArray имеют следующие ограничения:</p>
<table>
<thead>
<tr><th>Ограничение</th><th>Подробности</th></tr>
</thead>
<tbody>
<tr><td>Struct не является типом поля верхнего уровня.</td><td>Создайте поле StructArray как <code translate="no">datatype=DataType.ARRAY</code> с <code translate="no">element_type=DataType.STRUCT</code> и <code translate="no">struct_schema</code>.</td></tr>
<tr><td>Все элементы используют одну схему.</td><td>Каждый элемент Struct в поле StructArray соответствует тому же списку подполей и тем же типам данных подполей.</td></tr>
<tr><td><code translate="no">max_capacity</code> обязательно.</td><td>Количество элементов Struct в одной сущности не должно превышать значения <code translate="no">max_capacity</code>, настроенного для поля StructArray.</td></tr>
<tr><td>Скалярные подполя <code translate="no">ARRAY</code> имеют <code translate="no">max_capacity</code> для каждого подполя.</td><td>Скалярное подполе структуры « <code translate="no">ARRAY</code> » объявляет размер внутреннего массива ( <code translate="no">max_capacity</code> ), и Milvus отклоняет элемент Struct, внутренний массив которого превышает объявленную емкость этого подполя. Значения в разных подполях не обязательно должны совпадать. Значение должно быть больше 0 и не должно превышать максимальное значение для данного подполя ( <code translate="no">proxy.maxArrayCapacity</code>), которое по умолчанию равно 4096.</td></tr>
<tr><td>Подополя могут изменяться в Milvus 3.0.6 и более поздних версиях.</td><td>Добавьте подполе, допускающее нулевые значения, или удалите подполе по его пути, например <code translate="no">chunks[lang]</code>. Нельзя удалить последнее подполе поля StructArray, последнее векторное поле коллекции или подполе, используемое функцией. В более ранних версиях удалите поле StructArray и добавьте его заново с обновленной схемой.</td></tr>
<tr><td>Вложенные Struct не поддерживаются.</td><td>Struct не может содержать вложенные подполя типа <code translate="no">Struct</code>, <code translate="no">ArrayOfStruct</code> или JSON. Начиная с Milvus 3.0.6, Struct может содержать скалярные подполя типа <code translate="no">ARRAY</code> с одним уровнем вложенности. Подполе типа <code translate="no">ARRAY</code> не может содержать векторы.</td></tr>
<tr><td>Функции не поддерживаются внутри StructArray.</td><td>Не определяйте функции полей для полей StructArray или их подполей.</td></tr>
<tr><td>Свойства полей ограничены для полей StructArray.</td><td>Начиная с Milvus 3.0.6, при использовании команды « <code translate="no">alter_collection_field()</code> » для поля StructArray или по пути к подполю допускаются только типы « <code translate="no">mmap.enabled</code> », « <code translate="no">field.description</code> » и « <code translate="no">warmup</code> ». Другие свойства, такие как « <code translate="no">max_capacity</code> » и « <code translate="no">max_length</code> », отклоняются.</td></tr>
<tr><td>Анализ текста в подполях не поддерживается.</td><td>Установка значения <code translate="no">enable_match</code> или <code translate="no">enable_analyzer</code> для подполя Struct приводит к отклонению. Текстовые индексы создаются только для полей верхнего уровня.</td></tr>
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
    </button></h2><p>Поподполя StructArray сопоставляются физическому хранению в виде массива. В следующей таблице перечислены поддерживаемые и неподдерживаемые физические типы:</p>
<table>
<thead>
<tr><th>Физический тип подполя Struct</th><th>Поддержка</th><th>Примечания</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Array&lt;Bool&gt;</code></td><td>Поддерживается</td><td>Определите подполе как ` <code translate="no">DataType.BOOL</code>`.</td></tr>
<tr><td><code translate="no">Array&lt;Int8/Int16/Int32/Int64&gt;</code></td><td>Поддерживается</td><td>Определите подполе как <code translate="no">DataType.INT8</code>, <code translate="no">DataType.INT16</code>, <code translate="no">DataType.INT32</code> или <code translate="no">DataType.INT64</code>.</td></tr>
<tr><td><code translate="no">Array&lt;Float/Double&gt;</code></td><td>Поддерживается</td><td>Определите подполе как <code translate="no">DataType.FLOAT</code> или <code translate="no">DataType.DOUBLE</code>.</td></tr>
<tr><td><code translate="no">Array&lt;VarChar&gt;</code></td><td>Поддерживается</td><td>Определите подполе как <code translate="no">DataType.VARCHAR</code> и установите <code translate="no">max_length</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;FloatVector&gt;</code></td><td>Поддерживается</td><td>Определите подполе как <code translate="no">DataType.FLOAT_VECTOR</code> и установите <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;Float16Vector&gt;</code></td><td>Поддерживается</td><td>Определите подполе как « <code translate="no">DataType.FLOAT16_VECTOR</code> » и установите значение « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;BFloat16Vector&gt;</code></td><td>Поддерживается</td><td>Определите подполе как « <code translate="no">DataType.BFLOAT16_VECTOR</code> » и установите значение « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;Int8Vector&gt;</code></td><td>Поддерживается</td><td>Определите подполе как « <code translate="no">DataType.INT8_VECTOR</code> » и установите значение « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;BinaryVector&gt;</code></td><td>Поддерживается</td><td>Определите подполе как « <code translate="no">DataType.BINARY_VECTOR</code> » и установите значение « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;SparseFloatVector&gt;</code></td><td>Не поддерживается</td><td>Подполя в виде разреженных векторов не поддерживаются в полях StructArray.</td></tr>
<tr><td><code translate="no">Array&lt;String&gt;</code></td><td>Не поддерживается</td><td>Используйте <code translate="no">VARCHAR</code>, а не <code translate="no">String</code>.</td></tr>
<tr><td><code translate="no">Array&lt;JSON&gt;</code></td><td>Не поддерживается</td><td>По podpola JSON не поддерживаются в полях StructArray.</td></tr>
<tr><td><code translate="no">Array&lt;Geometry&gt;</code></td><td>Не поддерживается</td><td>По podpolu «Геометрия» и функции ГИС не поддерживаются в полях StructArray.</td></tr>
<tr><td><code translate="no">Array&lt;Text&gt;</code></td><td>Не поддерживается</td><td>По podpolu «Текст» в полях StructArray не поддерживаются.</td></tr>
<tr><td><code translate="no">Array&lt;Timestamptz&gt;</code></td><td>Не поддерживается</td><td>По podpolu «Timestamptz» и выражения, зависящие от времени, не поддерживаются в полях StructArray.</td></tr>
<tr><td><code translate="no">Array&lt;Array&gt;</code></td><td>Поддерживается в Milvus 3.0.6 и более поздних версиях</td><td>Определите подполе как <code translate="no">DataType.ARRAY</code> со скалярным <code translate="no">element_type</code> и <code translate="no">max_capacity</code> для внутреннего массива. Каждый элемент Struct будет содержать один внутренний массив. Установите для подполя параметр <code translate="no">nullable=True</code>, чтобы разрешить нулевой внутренний массив, и <code translate="no">element_nullable=True</code>, чтобы разрешить нулевые значения внутри него.</td></tr>
<tr><td><code translate="no">Array</code> <code translate="no">Array</code>, , векторов, или <code translate="no">Array</code> <code translate="no">Array</code> <code translate="no">Struct</code> <code translate="no">ArrayOfStruct</code></td><td>Не поддерживается</td><td>Вложение массивов внутри структуры ограничено одним уровнем, внутренний массив не может содержать векторы, а вложенные подполя типа «Struct» или «Array-of-Struct» не поддерживаются.</td></tr>
</tbody>
</table>
<h2 id="Nullable-and-dynamic-schema-limits" class="common-anchor-header">Ограничения для нулевых значений и динамических схем<button data-href="#Nullable-and-dynamic-schema-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>В следующей таблице описано поведение StructArray с возможностью принятия нулевых значений и добавление полей в динамический StructArray с учетом приведенного ниже заявления о доступности:</p>
<table>
<thead>
<tr><th>Возможность</th><th>Ограничение</th></tr>
</thead>
<tbody>
<tr><td>Поле StructArray, допускающее значение null</td><td>С учетом приведенного ниже заявления о доступности установите флаг « <code translate="no">nullable=True</code> » для родительского объекта StructArray; не настраивайте подполя Struct как допускающие значение NULL независимо.</td></tr>
<tr><td>Значение NULL в Python</td><td>Используйте ` <code translate="no">None</code> ` для вставки нулевого значения StructArray в Python. Не используйте ` <code translate="no">Null</code> ` или ` <code translate="no">null</code>`.</td></tr>
<tr><td>Область действия значения null</td><td>Значение NULL распространяется на всё поле StructArray. Например, <code translate="no">chunks=None</code> допустимо только в том случае, если <code translate="no">chunks</code> допускает значение null.</td></tr>
<tr><td>Частично нулевое значение StructArray</td><td>Если поле StructArray содержит допустимое значение массива, не смешивайте массивы подполей с нулевым значением с массивами подполей с допустимыми значениями в одном и том же значении.</td></tr>
<tr><td>Null на уровне элементов</td><td>Поддерживается в Milvus 3.0.6 и более поздних версиях. Скалярное, векторное или подполе <code translate="no">ARRAY</code> может допускать значение null в отдельных элементах Struct: <code translate="no">nullable=True</code> для скалярного или векторного подполя, <code translate="no">element_nullable=True</code> для подполя <code translate="no">ARRAY</code>. Настройка <code translate="no">nullable</code> на уровне строки по-прежнему наследуется от родительского объекта StructArray; установка <code translate="no">nullable=True</code> для подполя включает null на уровне элемента, а не на уровне строки.</td></tr>
<tr><td>Нулевой элемент Struct</td><td>Сам элемент Struct не может быть нулевым, например <code translate="no">[null, {...}]</code>. Вместо этого установите значения подполей элемента равными нулю.</td></tr>
<tr><td>Пропущенные подполя</td><td>Начиная с Milvus 3.0.6, вы можете опустить подполе, допускающее значение null на уровне элемента, из элемента Struct, и Milvus сохранит для него значение null. Подполе, не допускающее значение null на уровне элемента, должно присутствовать в каждом элементе Struct. В более ранних версиях каждый элемент Struct должен содержать все подполя.</td></tr>
<tr><td>Динамическое добавление поля StructArray</td><td>С учетом приведенного ниже заявления о доступности.</td></tr>
<tr><td>Требование к допускаемости нулевого значения при динамическом добавлении</td><td>Поле StructArray, добавленное в существующую коллекцию, должно допускать значение null, поскольку существующие сущности не имеют значения для нового поля.</td></tr>
<tr><td>Сущности после динамического добавления</td><td>Сущности возвращают значение « <code translate="no">null</code> » для добавленного поля StructArray.</td></tr>
<tr><td>Динамическое добавление подполя</td><td>Поддерживается в Milvus 3.0.6 и более поздних версиях. Добавляемое подполе должно создаваться с возможностью принятия значения null ( <code translate="no">nullable=True</code>); добавляемое подполе типа « <code translate="no">ARRAY</code> » дополнительно принимает значение « <code translate="no">element_nullable=True</code> » для нулевых значений внутри внутреннего массива. Сущности возвращают значение null для нового подполя в каждом из своих элементов Struct, а сущности, у которых поле StructArray равно null, остаются такими же.</td></tr>
</tbody>
</table>
<p>Milvus 3.0.0 и более поздние версии поддерживают поля StructArray, допускающие значение null, векторные массивы, допускающие значение null, а также динамическое добавление полей StructArray как в автономных, так и в распределенных развертываниях. Более ранние версии Milvus не поддерживают эти возможности.</p>
<p>Milvus 3.0.6 и более поздние версии дополнительно поддерживают нулевые значения на уровне элементов, скалярные подполя <code translate="no">ARRAY</code>, а также добавление или удаление подполей существующего поля StructArray. Эти возможности требуют Storage V2 и недоступны во внешних коллекциях.</p>
<p>В Zilliz Cloud эти возможности доступны в кластерах On-Demand, на которых работает Milvus 3.0.0 или более поздней версии. Кластеры Serving их не поддерживают.</p>
<p>Примеры вставки <a href="/docs/ru/insert-data-into-structarray-fields.md">данных</a> в поля StructArray, допускающие значение null, см. в разделе <a href="/docs/ru/insert-data-into-structarray-fields.md">«Вставка данных в поля StructArray</a>».</p>
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
    </button></h2><p>Для данных вставки в StructArray действуют следующие ограничения:</p>
<table>
<thead>
<tr><th>Ограничение</th><th>Подробности</th></tr>
</thead>
<tbody>
<tr><td>Формат данных</td><td>Вставьте поле StructArray в виде массива объектов Struct, например <code translate="no">chunks: [{&quot;text&quot;: &quot;...&quot;, &quot;emb&quot;: [...]}]</code>.</td></tr>
<tr><td>Имена подполей</td><td>Внутри каждого объекта Struct используйте имена подполей, такие как <code translate="no">text</code> и <code translate="no">emb</code>, а не пути, такие как <code translate="no">chunks[text]</code>.</td></tr>
<tr><td>Соответствие схеме</td><td>Каждый элемент Struct должен соответствовать схеме Struct. Начиная с версии Milvus 3.0.6, подполе элемента Struct, допускающее значение null, можно опустить или присвоить ему значение <code translate="no">null</code>.</td></tr>
<tr><td>Емкость</td><td>Количество элементов Struct в одной сущности не должно превышать <code translate="no">max_capacity</code>.</td></tr>
<tr><td>Размеры вектора</td><td>Значения векторов должны соответствовать значению « <code translate="no">dim</code> », настроенному для их подполей-векторов.</td></tr>
<tr><td>Дублирование в режиме поиска</td><td>Если вам требуется как поиск по EmbeddingList, так и поиск на уровне элементов, записывайте векторы в два отдельных векторных подполя.</td></tr>
</tbody>
</table>
<h2 id="Index-and-metric-limits" class="common-anchor-header">Ограничения на индексы и метрики<button data-href="#Index-and-metric-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Векторное подполе StructArray может быть индексировано либо для поиска по EmbeddingList, либо для поиска на уровне элементов. Одно и то же векторное подполе не может использовать обе семьи метрик, поскольку каждое векторное поле или векторное подполе принимает только один индекс. В режимах поиска используются следующие семьи метрик:</p>
<table>
<thead>
<tr><th>Режим поиска</th><th>Семейство метрик</th><th>Уровень результатов</th></tr>
</thead>
<tbody>
<tr><td>Поиск по EmbeddingList</td><td><code translate="no">MAX_SIM</code>, метрики « <code translate="no">MAX_SIM_COSINE</code> », « <code translate="no">MAX_SIM_IP</code> », « <code translate="no">MAX_SIM_L2</code> » или бинарные метрики « <code translate="no">MAX_SIM_*</code> »</td><td>Результаты на уровне сущностей.</td></tr>
<tr><td>Поиск на уровне элементов</td><td>Обычные векторные метрики, такие как <code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code>, <code translate="no">HAMMING</code> или <code translate="no">JACCARD</code></td><td>Результаты на уровне элементов, которые могут включать смещение найденного элемента.</td></tr>
</tbody>
</table>
<p>Если требуются оба режима, используйте отдельные векторные подполя. Например, используйте <code translate="no">chunks[emb_list_vector]</code> для поиска по EmbeddingList и <code translate="no">chunks[emb]</code> для поиска на уровне элементов.</p>
<p>Подполя вектора StructArray учитываются как векторные поля при расчете ограничения на уровне коллекции <code translate="no">proxy.maxVectorFieldNum</code>, которое по умолчанию равно 10. Поле StructArray, векторные подполя которого являются единственными векторными полями коллекции, является допустимым, и удаление такого поля отклоняется, если в результате у коллекции не останется ни одного векторного поля. Удерживайте общее количество векторных полей и векторных подполей в пределах ограничений вашей целевой версии и уровня обслуживания.</p>
<p>Начиная с Milvus 3.0.6, векторное подполе с допускаемыми нулевыми элементами поддерживает только поиск на уровне элементов с использованием обычных векторных метрик. Метрики <code translate="no">MAX_SIM*</code>, индексы EmbeddingList и поиск по EmbeddingList отклоняются для векторных подполей с допускаемыми нулевыми элементами, а функция <code translate="no">AUTOINDEX</code> не выбирает для них метрику <code translate="no">MAX_SIM*</code>. Нулевые векторы не участвуют в поиске. Скалярные индексы не поддерживаются в подполях с допустимыми нулевыми элементами или в скалярных подполях типа ` <code translate="no">ARRAY</code> `.</p>
<p>Матрицу поддерживаемых типов индексов и метрик см. в разделе <a href="/docs/ru/index-structarray-fields.md">«Поля StructArray индекса</a>».</p>
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
    </button></h2><p>Поведение поиска в StructArray имеет следующие ограничения:</p>
<table>
<thead>
<tr><th>Поведение поиска</th><th>Поддержка и ограничения</th></tr>
</thead>
<tbody>
<tr><td>Базовый поиск в EmbeddingList</td><td>Поддерживается для подполей вектора StructArray, индексированных с помощью метрик <code translate="no">MAX_SIM*</code>. Возвращает результаты на уровне сущностей.</td></tr>
<tr><td>Базовый поиск на уровне элементов</td><td>Поддерживается для подполей вектора StructArray, индексированных с помощью обычных векторных метрик. Может возвращать смещения совпадающих элементов.</td></tr>
<tr><td>Поиск по диапазону</td><td>Поддерживается в зависимости от режима поиска и поддержки индексов/метрик целевой версии. Для получения информации о поведении гибридного поиска по диапазону при запросах StructArray на уровне элементов проверьте вашу целевую версию.</td></tr>
<tr><td>Групповой поиск</td><td>Поиск с группировкой на уровне элементов может возвращать смещения. Поведение гибридного поиска с группировкой для запросов StructArray на уровне элементов зависит от версии.</td></tr>
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
    </button></h2><p>Скалярная фильтрация StructArray осуществляется с помощью операторов StructArray, таких как « <code translate="no">element_filter</code> » и семейства операторов « <code translate="no">MATCH_*</code> ». Подробная матрица поддержки предикатов приведена в разделе <a href="/docs/ru/struct-array-operators.md">«Операторы StructArray</a>».</p>
<p>В общих чертах:</p>
<ul>
<li><p>Используйте оператор « <code translate="no">$[subfield]</code> » только внутри операторов StructArray.</p></li>
<li><p>Выражения фильтрации на уровне строк также могут напрямую ссылаться на пути StructArray: <code translate="no">chunks[0][section]</code> для позиции одного элемента, <code translate="no">array_length(chunks)</code> для количества элементов, <code translate="no">array_contains(chunks[section], ...)</code> для значений подполей по всем элементам и <code translate="no">chunks is null</code> для поля StructArray, допускающего нулевые значения.</p></li>
<li><p>Используйте скалярные подполя для скалярных предикатов.</p></li>
<li><p>Не используйте векторные подполя в качестве входных данных для скалярных предикатов типа « <code translate="no">$[...]</code> ».</p></li>
</ul>
<ul>
<li>Синтаксис JSON-пути, функции JSON, функции сопоставления текста, функции геометрии/ГИС и выражения Timestamptz не поддерживаются для предикатов на уровне элементов StructArray. Начиная с Milvus 3.0.6, <code translate="no">array_contains</code>, <code translate="no">array_contains_any</code>, <code translate="no">array_contains_all</code> и <code translate="no">array_length</code> поддерживаются в <code translate="no">$[subfield]</code> для скалярных подполей <code translate="no">ARRAY</code>, а <code translate="no">$[subfield] is null</code> / <code translate="no">is not null</code> поддерживается для всех типов подполей.</li>
</ul>
<ul>
<li>Начиная с Milvus 3.0.6, нулевое значение подполя в элементе Struct приводит к тому, что предикат элемента становится неизвестным, а не ложным. Оператор <code translate="no">element_filter</code> сохраняет только те элементы, предикат которых истинный, а оператор <code translate="no">MATCH_*</code> считает элемент с неизвестным предикатом пропуском. Подробности см. в разделе <a href="/docs/ru/struct-array-operators.md">«Операторы StructArray</a>».</li>
</ul>
<ul>
<li>Предпочтительно использовать явные булевы сравнения, такие как ` <code translate="no">$[has_code] == true</code> `, вместо простых булевых выражений.</li>
</ul>
<p><a id="Import-limits"></a></p>
<h2 id="Import-and-storage-limits" class="common-anchor-header">Ограничения на импорт и хранение<button data-href="#Import-and-storage-limits" class="anchor-icon" translate="no">
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
<tr><td>Форматы исходных файлов</td><td>Файлы JSON, JSONL, CSV и Parquet могут содержать поля StructArray. Файлы NumPy содержат по одному файлу на каждое поле верхнего уровня и не могут предоставлять данные StructArray; для коллекций, имеющих поле StructArray, используйте файлы JSON, CSV или Parquet. Информацию о формах файлов см. в разделе <a href="/docs/ru/prepare-source-data.md#StructArray-fields-in-source-files">«Подготовка исходных данных</a>».</td></tr>
<tr><td>Формат хранения</td><td>Подполя с допустимыми нулевыми элементами и скалярные подполя типа « <code translate="no">ARRAY</code> » требуют использования Storage V2. Для коллекций, использующих эти подполя, доступ к Storage V1 невозможен: создание коллекции и вставка данных могут казаться успешными, но при сбросе данных возникает сбой, что является неподдерживаемым состоянием. Storage V3 с параметром « <code translate="no">common.storage.enableGrowingSourceFlush</code> » ( ), установленным в значение « <code translate="no">true</code> » ( ), отклоняет запросы, в которых используются подполя с допустимыми нулевыми значениями элементов или скалярные подполя типа « <code translate="no">ARRAY</code> ».</td></tr>
<tr><td>Внешние коллекции</td><td>Подполя с допустимым нулевым значением элемента и скалярные подполя <code translate="no">ARRAY</code> не поддерживаются во внешних коллекциях.</td></tr>
<tr><td>Резервное копирование и импорт моментальных снимков</td><td>Импорт из бинарного журнала (например, восстановление резервной копии) и импорт из источника моментальных снимков отклоняются для коллекций, содержащих подполя, допускающие значение null, или скалярные подполя <code translate="no">ARRAY</code>.</td></tr>
<tr><td>Переход на более раннюю версию</td><td>Коллекции, содержащие подполя, допускающие нулевые значения, или скалярные подполя типа ` <code translate="no">ARRAY</code> `, не могут работать в версиях Milvus старше 3.0.6. Воспроизведение журнала предварительной записи (Binlog) в более старой версии приводит к паническому состоянию. Повторное обновление до Milvus 3.0.6 или более поздней версии восстанавливает данные.</td></tr>
</tbody>
</table>
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
<li><p>Чтобы создать поле StructArray, ознакомьтесь со статьей <a href="/docs/ru/create-structarray-field.md">«Создание поля StructArray</a>».</p></li>
<li><p>Чтобы вставить данные, ознакомьтесь со статьёй <a href="/docs/ru/insert-data-into-structarray-fields.md">«Вставка данных в поля StructArray</a>».</p></li>
<li><p>Чтобы создать векторные и скалярные индексы, ознакомьтесь с разделом <a href="/docs/ru/index-structarray-fields.md">«Индексирование полей StructArray</a>».</p></li>
<li><p>Чтобы ознакомиться с синтаксисом фильтров StructArray, прочтите раздел <a href="/docs/ru/struct-array-operators.md">«Операторы StructArray</a>».</p></li>
</ol>
