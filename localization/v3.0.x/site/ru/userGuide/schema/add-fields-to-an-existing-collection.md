---
id: add-fields-to-an-existing-collection.md
title: Изменение схемы коллекции
summary: >-
  Измените существующую схему коллекции, добавив или удалив пользовательские
  поля или функции вместе с сгенерированными ими векторными полями.
---
<h1 id="Alter-Collection-Schema" class="common-anchor-header">Изменение схемы коллекции<button data-href="#Alter-Collection-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>По мере перехода коллекции из стадии разработки в производственную среду ее схема часто изменяется. Вы можете добавить скалярные поля, такие как « <code translate="no">source_uri</code> » или « <code translate="no">review_status</code> », для фильтрации и реализации бизнес-логики, добавить новое векторное поле для вложений, сгенерированных вашим приложением, добавить функцию BM25 и сгенерированное ею разреженное векторное поле для лексического поиска по существующему тексту, либо удалить поля и функции, которые больше не используются. Функция «Изменить схему коллекции» позволяет вносить поддерживаемые изменения в поля и функции на месте, вместо того чтобы заново создавать коллекцию.</p>
<div class="alert note">
<p>В данном руководстве рассматриваются изменения схемы для пользовательских полей и функций с генерируемыми ими векторными полями в управляемых коллекциях. Чтобы добавить поле во внешнюю коллекцию, см. раздел <a href="/docs/ru/alter-external-collection-schema.md">«Изменение схемы внешней коллекции» (Alter External Collection Schema)</a>. Для изменения свойств полей, таких как изменение значения параметра « <code translate="no">max_length</code> » для поля « <code translate="no">VARCHAR</code> » или параметра « <code translate="no">max_capacity</code> » для поля « <code translate="no">ARRAY</code> », см. раздел <a href="/docs/ru/alter-collection-field.md">«Изменение поля коллекции» (Alter Collection Field</a>). Информацию о динамическом поведении полей см. в разделах <a href="/docs/ru/enable-dynamic-field.md">«Динамическое поле</a> » и <a href="/docs/ru/modify-collection.md">«Изменение коллекции</a>».</p>
</div>
<h2 id="Limits" class="common-anchor-header">Ограничения<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Добавление полей, определяемых пользователем</strong></p>
<ul>
<li><p>Добавляемые пользовательские поля должны допускать нулевые значения. Укажите <code translate="no">nullable=True</code> при вызове <code translate="no">add_collection_field()</code>. Для существующих сущностей добавляемое поле является <code translate="no">NULL</code>, если только вы не добавляете скалярное поле с <code translate="no">default_value</code>.</p></li>
<li><p>Добавление пользовательских скалярных полей поддерживается в Milvus 2.6.x и более поздних версиях. Добавление пользовательских векторных полей поддерживается в Milvus 2.6.18 и более поздних версиях.</p></li>
<li><p>Добавление полей StructArray поддерживается в Milvus 3.0.0 и более поздних версиях. Добавляемые поля StructArray должны допускать нулевые значения.</p></li>
<li><p>Имена полей должны быть уникальными среди полей в коллекции.</p></li>
</ul>
<p><strong>Добавление функции и сгенерированного ею векторного поля</strong></p>
<ul>
<li><p>При каждом обновлении схемы можно добавить только одну функцию и одно сгенерированное векторное поле.</p></li>
<li><p>Поддерживаемая функция определяет тип сгенерированного векторного поля: « <code translate="no">BM25</code> » генерирует поле « <code translate="no">SPARSE_FLOAT_VECTOR</code> », а « <code translate="no">MINHASH</code> » — поле « <code translate="no">BINARY_VECTOR</code> ».</p></li>
<li><p>Генерируемое векторное поле должно быть новым полем. Оно не может ссылаться на поле, уже существующее в схеме коллекции.</p></li>
<li><p>Сгенерированное векторное поле не может быть допускать значение null.</p></li>
<li><p>Поля ввода, используемые функцией, должны уже существовать в коллекции.</p></li>
<li><p>При добавлении функции BM25 или MinHash в существующую коллекцию входные данные функции должны представлять собой поле типа « <code translate="no">VARCHAR</code> ». Входные данные типа « <code translate="no">TEXT</code> » не поддерживаются в данном рабочем процессе, поскольку Milvus не может заполнить сгенерированные выходные данные для существующих сущностей на основе этого типа входных данных.</p></li>
</ul>
<p><strong>Удаление полей, определённых пользователем</strong></p>
<ul>
<li><p>Нельзя удалить поле первичного ключа, поле ключа разбиения, поле кластеризующего ключа или последнее векторное поле в коллекции.</p></li>
<li><p>Можно удалить целое поле « <code translate="no">ARRAY&lt;STRUCT&gt;</code> », но нельзя удалить отдельное подполе внутри поля « <code translate="no">ARRAY&lt;STRUCT&gt;</code> ».</p></li>
<li><p>Нельзя напрямую удалить поле, используемое в качестве поля входа функции или сгенерированное в качестве поля выхода функции. Чтобы удалить поле выхода функции, удалите саму функцию, которая его генерирует.</p></li>
</ul>
<p><strong>Удаление функции и сгенерированного ею векторного поля</strong></p>
<ul>
<li><p>В этом рабочем процессе изменения схемы удаление функции приводит к удалению самой функции, сгенерированного ею векторного поля и связанного индекса. Поля ввода функции остаются в схеме коллекции.</p></li>
<li><p>Удаление функции отклоняется, если в результате удаления сгенерированного ею векторного поля в коллекции не останется ни одного векторного поля.</p></li>
</ul>
<div class="alert note">
<p>Для изменений схемы, выходящих за рамки поддерживаемых операций добавления и удаления, необходимо заново создать или перенести коллекцию.</p>
</div>
<p><a id="add-fields-to-an-existing-collection"></a></p>
<h2 id="Add-fields-and-Functions-to-an-existing-collection" class="common-anchor-header">Добавление полей и функций в существующую коллекцию<button data-href="#Add-fields-and-Functions-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Выберите рабочий процесс в зависимости от того, добавляете ли вы пользовательское поле или функцию, генерирующую векторное поле:</p>
<ul>
<li><p><a href="#add-user-defined-scalar-fields--milvus-26x">Добавляйте пользовательские скалярные поля</a>, если вам нужны новые метаданные для фильтрации, вывода результатов запросов или логики приложения.</p></li>
<li><p><a href="#add-structarray-fields--milvus-300">Добавляйте поля StructArray</a>, если вам требуется массивное поле, элементы которого имеют одинаковую схему Struct.</p></li>
<li><p><a href="#add-user-defined-vector-fields--milvus-2618">Добавляйте пользовательские векторные поля</a>, если ваше приложение генерирует вложения и записывает векторные значения в Milvus.</p></li>
<li><p><a href="#add-a-function-and-its-generated-vector-field--milvus-30x">Добавьте функцию и генерируемое ею векторное поле</a>, если Milvus должен генерировать векторные значения на основе существующих полей, таких как разреженные векторы BM25 или сигнатуры MinHash из текста.</p></li>
</ul>
<p>Во всех случаях имя нового поля не должно уже существовать в коллекции, а общее количество полей не может превышать ограничение Milvus на количество полей. Подробности см. в разделе <a href="/docs/ru/limitations.md#number-of-resources-in-a-collection">«Ограничения Milvus</a>».</p>
<h3 id="Add-user-defined-scalar-fields--Milvus-26x" class="common-anchor-header">Добавление пользовательских скалярных полей<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Add-user-defined-scalar-fields--Milvus-26x" class="anchor-icon" translate="no">
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
    </button></h3><p>Используйте команду ` <code translate="no">add_collection_field()</code> `, чтобы добавить пользовательское скалярное поле в существующую коллекцию.</p>
<p>Это отличается от хранения произвольных ключей в динамическом поле: после того как обновление схемы станет доступным, новое скалярное поле станет полноценной частью схемы коллекции. Вы можете вставлять или обновлять значения в этом поле, создавать на нём индексы там, где это поддерживается, использовать его в запросах и фильтрах поиска, а также возвращать его в результатах запроса или поиска.</p>
<p>Поскольку существующие сущности были вставлены до появления нового поля, каждое добавляемое пользовательское скалярное поле должно допускать значение null:</p>
<ul>
<li><p>Если вы добавляете скалярное поле с параметром ` <code translate="no">nullable=True</code> ` и без параметра ` <code translate="no">default_value</code>`, существующие сущности возвращают значение ` <code translate="no">NULL</code> ` для нового поля.</p></li>
<li><p>Если вы добавите скалярное поле с атрибутом « <code translate="no">nullable=True</code> » и атрибутом « <code translate="no">default_value</code> », существующие сущности будут возвращать значение по умолчанию вместо значения « <code translate="no">NULL</code> ».</p></li>
</ul>
<p>Скалярные выражения фильтрации не сопоставляются со скалярными значениями типа <code translate="no">NULL</code>. Подробности см. в разделе <a href="/docs/ru/nullable-and-default.md">«Поля, допускающие значение null</a>».</p>
<p><strong>Пример: добавление скалярного поля, допускающего значение null</strong></p>
<p>В следующем примере к существующей коллекции с именем <code translate="no">product_catalog</code> добавляется поле <code translate="no">source</code>, допускающее значение null.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;source&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.VARCHAR,</span>
<span class="highlighted-comment-line">    max_length=<span class="hljs-number">128</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>После добавления поля сущности, уже существовавшие в коллекции, возвращают значение « <code translate="no">NULL</code> » для параметра « <code translate="no">source</code> ». Новые сущности могут устанавливать значение « <code translate="no">source</code> » при вставке или обновлении с условием (upsert).</p>
<p><strong>Пример: добавление скалярного поля со значением по умолчанию</strong></p>
<p>Если существующие сущности должны возвращать конкретное значение вместо <code translate="no">NULL</code>, укажите <code translate="no">default_value</code> при добавлении скалярного поля. В следующем примере добавляется поле <code translate="no">review_status</code>, а в качестве значения по умолчанию используется <code translate="no">&quot;unreviewed&quot;</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;review_status&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.VARCHAR,</span>
<span class="highlighted-comment-line">    max_length=<span class="hljs-number">32</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">    default_value=<span class="hljs-string">&quot;unreviewed&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>После добавления поля сущности, уже существовавшие в коллекции, возвращают значение « <code translate="no">&quot;unreviewed&quot;</code> » для параметра « <code translate="no">review_status</code> ». Новые сущности могут устанавливать другое значение или использовать значение по умолчанию, если значение не указано.</p>
<h3 id="Add-StructArray-fields--Milvus-300" class="common-anchor-header">Добавление полей StructArray<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0</span><button data-href="#Add-StructArray-fields--Milvus-300" class="anchor-icon" translate="no">
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
    </button></h3><p>Используйте <code translate="no">add_collection_struct_field()</code> для добавления поля StructArray, которое принимает массивы элементов Struct. Чтобы добавить поле StructArray, выполните следующие действия:</p>
<ol>
<li><p>Создайте схему Struct, содержащую необходимые подполя поддерживаемых типов данных. Типы данных, которые можно использовать, см. в описании <a href="/docs/ru/array-of-structs.md#Data-types">StructArray</a>.</p></li>
<li><p>Сделайте ссылку на созданную выше схему Struct и задайте максимальную емкость поля в параметре <code translate="no">add_collection_struct_field()</code>.</p></li>
<li><p>Укажите параметр « <code translate="no">nullable=True</code> » в запросе.</p></li>
</ol>
<p><strong>Пример: добавление поля StructArray, допускающего значение null</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Create a Struct schema.</span>
struct_schema = client.create_struct_field_schema()

<span class="hljs-comment"># Add scalar fields to the Struct.</span>
struct_schema.add_field(<span class="hljs-string">&quot;text&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>)
struct_schema.add_field(<span class="hljs-string">&quot;chapter&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)

<span class="hljs-comment"># Add vector fields to the Struct with mmap enabled.</span>
struct_schema.add_field(<span class="hljs-string">&quot;text_vector&quot;</span>, DataType.FLOAT_VECTOR, mmap_enabled=<span class="hljs-literal">True</span>, dim=<span class="hljs-number">5</span>)
struct_schema.add_field(<span class="hljs-string">&quot;chapter_vector&quot;</span>, DataType.FLOAT_VECTOR, mmap_enabled=<span class="hljs-literal">True</span>, dim=<span class="hljs-number">5</span>)

<span class="highlighted-comment-line">client.add_collection_struct_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;books&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,</span>
<span class="highlighted-comment-line">    struct_schema=struct_schema,</span>
<span class="highlighted-comment-line">    max_capacity=<span class="hljs-number">1024</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>После добавления поля StructArray сущности, уже существующие в коллекции, возвращают значение « <code translate="no">NULL</code> » для параметра « <code translate="no">chunks</code> » во всех своих подполях. При вставке новой сущности убедитесь, что все подполя либо имеют значение « <code translate="no">NULL</code> », либо содержат допустимые значения. Вставка сущности, в которой для некоторых подполей установлено значение « <code translate="no">NULL</code> », а для других — допустимые значения, приводит к ошибкам.</p>
<h3 id="Add-user-defined-vector-fields--Milvus-2618+" class="common-anchor-header">Добавление пользовательских векторных полей<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.18+</span><button data-href="#Add-user-defined-vector-fields--Milvus-2618+" class="anchor-icon" translate="no">
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
    </button></h3><p>Используйте <code translate="no">add_collection_field()</code> для добавления пользовательского векторного поля, если ваше приложение генерирует вложения и записывает векторные значения в Milvus.</p>
<p>Каждое добавленное пользовательское векторное поле должно быть допускать значение null. Существующие сущности имеют значение « <code translate="no">NULL</code> » для нового векторного поля до тех пор, пока вы не запишете векторные значения с помощью upsert или рабочего процесса backfill. Новые сущности могут включать векторное поле при вставке. Векторный поиск пропускает сущности, векторное значение которых равно « <code translate="no">NULL</code> ». Подробности см. в разделе <a href="/docs/ru/nullable-and-default.md">«Поля, допускающие значение null</a>».</p>
<p><strong>Пример: добавление векторного поля, допускающего нулевые значения</strong></p>
<p>В следующем примере к существующей коллекции добавляется допускающее нулевые значения плотное векторное поле с именем <code translate="no">embedding_v2</code>. Установите значение <code translate="no">dim</code> равным размерности вложений, сгенерированных вашим приложением.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;embedding_v2&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.FLOAT_VECTOR,</span>
<span class="highlighted-comment-line">    dim=<span class="hljs-number">768</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>После добавления поля создайте индекс для нового векторного поля, прежде чем выполнять поиск по нему:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding_v2&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>Существующие сущности имеют значение <code translate="no">NULL</code> для параметра <code translate="no">embedding_v2</code> и пропускаются при поиске по этому полю. Чтобы сделать существующие сущности доступными для поиска по параметру <code translate="no">embedding_v2</code>, запишите непустые векторные значения с помощью операции upsert или рабочего процесса backfill. Новые сущности могут включать значение <code translate="no">embedding_v2</code> при вставке.</p>
<p><a id="add-vector-fields-generated-by-functions--milvus-30x"></a></p>
<h3 id="Add-a-Function-and-its-generated-vector-field--Milvus-30x" class="common-anchor-header">Добавление функции и сгенерированного ею векторного поля<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Add-a-Function-and-its-generated-vector-field--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>Используйте этот рабочий процесс, когда Milvus должен сгенерировать новое векторное поле на основе данных, уже хранящихся в существующей коллекции. Эта операция добавляет три связанных элемента схемы:</p>
<ul>
<li><p>Определение функции, которая считывает данные из одного или нескольких существующих полей ввода.</p></li>
<li><p>Новое векторное поле, в котором хранится выходные данные функции.</p></li>
<li><p>Определение индекса, привязанное к новому векторному полю.</p></li>
</ul>
<p>Например, функция BM25 считывает существующее поле « <code translate="no">VARCHAR</code> » и генерирует поле « <code translate="no">SPARSE_FLOAT_VECTOR</code> » для лексического поиска. Функция MinHash генерирует поле « <code translate="no">BINARY_VECTOR</code> » для обнаружения почти дубликатов. Этот рабочий процесс не добавляет и не заменяет поле ввода функции.</p>
<div class="alert note">
<p>Для работы этой функции требуется Storage V3. Инструкции по включению и сведения о совместимости см. в разделе <a href="/docs/ru/storage-v3.md">«Storage V3</a>».</p>
</div>
<p>Добавление функции и сгенерированного ею векторного поля в существующую коллекцию также требует уплотнения версии схемы и уплотнения версии хранилища. Milvus отклоняет запрос, если любой из этих параметров отключен. Эти дополнительные предварительные условия применяются только при изменении существующей коллекции; при определении функции в исходной схеме коллекции этот рабочий процесс заполнения существующих данных не используется.</p>
<p>Поддерживаемая функция определяет тип сгенерированного векторного поля:</p>
<table>
<thead>
<tr><th>Функция</th><th>Тип сгенерированного векторного поля</th><th>Типичное поле ввода</th><th>Типичный сценарий использования</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BM25</code></td><td><code translate="no">SPARSE_FLOAT_VECTOR</code></td><td>Поле « <code translate="no">VARCHAR</code> » с включенным анализатором</td><td>Лексический поиск и релевантность ключевых слов</td></tr>
<tr><td><code translate="no">MINHASH</code></td><td><code translate="no">BINARY_VECTOR</code></td><td>Поле « <code translate="no">VARCHAR</code> »</td><td>Обнаружение почти-дубликатов</td></tr>
</tbody>
</table>
<p>Подробнее о том, как работает каждая из этих функций, см. в разделах <a href="/docs/ru/bm25-function.md">«Функция BM25</a> » и <a href="/docs/ru/minhash-function.md">«Функция MinHash</a>».</p>
<p>Сгенерированное векторное поле не должно уже существовать в коллекции и не может быть допускать значение null. Поле ввода функции должно уже существовать.</p>
<p><strong>Пример: добавление функции BM25 и сгенерированного ею разреженного векторного поля</strong></p>
<p>В следующем примере к существующей коллекции добавляется функция BM25 с именем « <code translate="no">text_bm25</code> » и сгенерированное ею разреженное векторное поле с именем « <code translate="no">text_sparse</code> ». В коллекции уже должно присутствовать поле « <code translate="no">VARCHAR</code> » с именем « <code translate="no">text</code> », для которого включен анализатор.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

sparse_field = client.create_field_schema(
    name=<span class="hljs-string">&quot;text_sparse&quot;</span>,
    data_type=DataType.SPARSE_FLOAT_VECTOR,
    desc=<span class="hljs-string">&quot;BM25-generated sparse vector field&quot;</span>,
)

bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;text_sparse&quot;</span>],
    function_type=FunctionType.BM25,
)

index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;text_sparse&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,
    params={
        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,
        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,
        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>,
    },
)

<span class="highlighted-comment-line">client.add_function_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_schema=sparse_field,</span>
<span class="highlighted-comment-line">    func=bm25_function,</span>
<span class="highlighted-comment-line">    index_params=index_params,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Объект <code translate="no">index_params</code> должен содержать ровно одно определение индекса для нового выходного поля функции. Milvus добавляет функцию, сгенерированное ею векторное поле и определение связанного индекса в рамках одного изменения схемы. Не вызывайте <code translate="no">create_index()</code> отдельно после <code translate="no">add_function_field()</code>.</p>
<p>Концептуально эта операция добавляет следующие определения: функцию, сгенерированное поле вывода и связанный индекс:</p>
<pre><code translate="no" class="language-plaintext">New Function:
  name: &quot;text_bm25&quot;
  type: BM25
  input_field_names: [&quot;text&quot;]
  output_field_names: [&quot;text_sparse&quot;]

New generated output field:
  name: &quot;text_sparse&quot;
  data_type: SPARSE_FLOAT_VECTOR
  nullable: false

Bound index:
  field_name: &quot;text_sparse&quot;
  index_type: SPARSE_INVERTED_INDEX
  metric_type: BM25
<button class="copy-code-btn"></button></code></pre>
<p>После успешного выполнения запроса ` <code translate="no">describe_collection()</code> ` возвращает как новую функцию ` <code translate="no">text_bm25</code> `, так и сгенерированное ею векторное поле ` <code translate="no">text_sparse</code> ` в схеме коллекции. Milvus генерирует выходные данные функции для новых сущностей по мере их записи. Для существующих сущностей Milvus заполняет сгенерированное векторное поле асинхронно посредством фоновой компактизации. Видимость схемы подтверждает, что обновление схемы прошло успешно, но не указывает на то, что заполнение данных завершилось для каждой существующей сущности. Полный рабочий процесс поиска BM25 описан в разделе <a href="/docs/ru/full-text-search.md">«Полнотекстовый поиск</a>».</p>
<p>Milvus также поддерживает функции MinHash и сгенерированные ими двоичные векторные поля для обнаружения почти-дубликатов. Функция MinHash использует поле « <code translate="no">FunctionType.MINHASH</code> » и записывает данные в новое поле вывода « <code translate="no">BINARY_VECTOR</code> ». Подробности настройки см. в разделе <a href="/docs/ru/minhash-function.md">«Функция MinHash</a>».</p>
<p><a id="drop-fields-from-an-existing-collection"></a></p>
<h2 id="Drop-fields-and-Functions-from-an-existing-collection" class="common-anchor-header">Удаление полей и функций из существующей коллекции<button data-href="#Drop-fields-and-Functions-from-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Вы можете удалить пользовательские поля напрямую, если они больше не входят в модель вашей коллекции. Чтобы удалить функцию и сгенерированное ею векторное поле, удалите саму функцию; Milvus удалит сгенерированное поле и его индекс в рамках одного изменения схемы.</p>
<h3 id="Drop-user-defined-fields--Milvus-30x" class="common-anchor-header">Удаление пользовательских полей<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Drop-user-defined-fields--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>Используйте команду ` <code translate="no">drop_collection_field()</code> ` для удаления пользовательского скалярного, векторного или StructArray-поля, которое больше не входит в модель вашей коллекции.</p>
<p>Удаление поля сначала изменяет схему коллекции и видимость поля:</p>
<ul>
<li><p>После успешного выполнения команды « <code translate="no">drop_collection_field()</code> » схема коллекции обновляется: команда « <code translate="no">describe_collection()</code> » больше не возвращает удаленное поле, а запросы или поиски больше не могут возвращать это поле в « <code translate="no">output_fields</code> » или использовать его в выражениях.</p></li>
<li><p>Индексы, построенные на удалённом поле, очищаются в рамках обновления схемы.</p></li>
</ul>
<p>Очистка хранилища осуществляется отдельно от очистки схемы. Подробности см. в разделе <a href="#when-is-storage-space-reclaimed-after-dropping-a-field">«Когда освобождается место в хранилище после удаления поля?</a>».</p>
<p><strong>Пример: удаление пользовательского скалярного поля</strong></p>
<p>В следующем примере предполагается, что « <code translate="no">experiment_tag</code> » — это пользовательское скалярное поле в коллекции « <code translate="no">product_catalog</code> », и оно удаляется из этой коллекции.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;experiment_tag&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>После удаления поля можно вызвать функцию ` <code translate="no">describe_collection()</code> `, чтобы убедиться, что поле больше не входит в схему.</p>
<p><strong>Пример: удаление поля StructArray</strong></p>
<p>В следующем примере предполагается, что ` <code translate="no">chunks</code> ` — это поле типа `StructArray` в ` <code translate="no">my_collection</code>`, и оно удаляется из коллекции.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Пример: удаление пользовательского векторного поля</strong></p>
<p>Векторное поле можно удалить с помощью того же метода <code translate="no">drop_collection_field()</code>, однако после удаления коллекция должна по-прежнему содержать хотя бы одно векторное поле. Это полезно для коллекций, которые временно содержат несколько векторных представлений, а впоследствии стандартизируются на одном из них.</p>
<p>В следующем примере предполагается, что <code translate="no">image_vector</code> — это пользовательское векторное поле в <code translate="no">hybrid_catalog</code>, а в коллекции по-прежнему сохраняется другое векторное поле, например <code translate="no">text_vector</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;hybrid_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;image_vector&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Если <code translate="no">image_vector</code> является последним векторным полем в коллекции, операция удаления отклоняется.</p>
<p><a id="drop-vector-fields-generated-by-functions--milvus-30x"></a></p>
<h3 id="Drop-a-Function-and-its-generated-vector-field--Milvus-30x" class="common-anchor-header">Удаление функции и сгенерированного ею векторного поля<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Drop-a-Function-and-its-generated-vector-field--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>Используйте эту операцию, если вам больше не нужна функция или сгенерированное ею векторное поле, например, функция BM25 и сгенерированное ею разреженное векторное поле.</p>
<p>Вызовите команду ` <code translate="no">drop_function_field()</code> `, указав имя функции. Milvus удаляет функцию, сгенерированное ею векторное поле и связанный индекс, сохраняя при этом входные поля функции.</p>
<p><strong>Пример: удаление функции BM25 и сгенерированного ею разреженного векторного поля</strong></p>
<p>В следующем примере предполагается, что « <code translate="no">text_bm25</code> » — это функция BM25 в « <code translate="no">product_catalog</code> », которая генерирует разреженное векторное поле вывода с именем « <code translate="no">text_sparse</code> ».</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_function_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    function_name=<span class="hljs-string">&quot;text_bm25&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>После успешного выполнения операции <code translate="no">describe_collection()</code> больше не возвращает удалённую функцию или сгенерированное ею векторное поле. Поля ввода функции остаются в схеме.</p>
<p>Если удаление выходного поля функции приведёт к тому, что коллекция останется без какого-либо векторного поля, операция отклоняется.</p>
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
    </button></h2><h3 id="Which-method-should-I-use-to-add-a-field-or-Function" class="common-anchor-header">Какой метод следует использовать для добавления поля или функции?<button data-href="#Which-method-should-I-use-to-add-a-field-or-Function" class="anchor-icon" translate="no">
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
    </button></h3><p>Используйте команду <code translate="no">add_collection_field()</code> для добавления пользовательского скалярного или векторного поля.</p>
<p>Используйте <code translate="no">add_collection_struct_field()</code> для добавления поля StructArray, если вам требуется поле массива, элементы которого имеют одну и ту же схему Struct.</p>
<p>Используйте ` <code translate="no">add_function_field()</code> ` для добавления функции, сгенерированного ею векторного поля и определения привязанного индекса в рамках одного изменения схемы.</p>
<h3 id="Why-must-added-user-defined-fields-be-nullable" class="common-anchor-header">Почему добавляемые пользовательские поля должны допускать нулевые значения?<button data-href="#Why-must-added-user-defined-fields-be-nullable" class="anchor-icon" translate="no">
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
    </button></h3><p>Существующие сущности были вставлены до появления нового поля, поэтому у них отсутствуют значения для этого поля. Установка параметра ` <code translate="no">nullable=True</code> ` позволяет Milvus представлять отсутствующее значение как ` <code translate="no">NULL</code> ` до тех пор, пока ваше приложение не запишет значение или, в случае скалярных полей, пока не будет применено значение по умолчанию.</p>
<p>Это правило применяется к пользовательским скалярным полям и пользовательским векторным полям, добавленным с флагом « <code translate="no">add_collection_field()</code> », а также к полям StructArray, добавленным с флагом « <code translate="no">add_collection_struct_field()</code> ». Оно не применяется к сгенерированному векторному полю функции, которое не может быть допускать значение null.</p>
<h3 id="What-happens-to-existing-entities-after-I-add-a-user-defined-field" class="common-anchor-header">Что происходит с существующими сущностями после добавления пользовательского поля?<button data-href="#What-happens-to-existing-entities-after-I-add-a-user-defined-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Для пользовательского скалярного поля существующие сущности возвращают значение по умолчанию ( <code translate="no">NULL</code> ), если вы не задали значение по умолчанию для векторного поля ( <code translate="no">default_value</code>). Если вы задали значение по умолчанию для векторного поля ( <code translate="no">default_value</code>), существующие сущности возвращают это значение по умолчанию.</p>
<p>Для пользовательского векторного поля существующие сущности имеют значение « <code translate="no">NULL</code> » для нового векторного поля. Векторный поиск по добавленному полю пропускает сущности, векторное значение которых равно « <code translate="no">NULL</code> ». Чтобы сделать существующие сущности доступными для поиска по новому векторному полю, запишите непустые векторные значения с помощью операции upsert или рабочего процесса backfill. Новые сущности могут включать новое векторное поле при вставке.</p>
<p>Для поля StructArray существующие сущности возвращают значение <code translate="no">NULL</code> для нового поля StructArray по всем его подполям. Новые сущности должны предоставлять либо значение <code translate="no">NULL</code> для всех подполей, либо допустимые значения для всех подполей.</p>
<h3 id="Can-I-add-BM25-lexical-search-to-an-existing-collection" class="common-anchor-header">Можно ли добавить лексический поиск BM25 в существующую коллекцию?<button data-href="#Can-I-add-BM25-lexical-search-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Да. Если в коллекции уже имеется поле « <code translate="no">VARCHAR</code> » с включенным анализатором, вы можете добавить функцию BM25 и сгенерированное ею поле разреженного вектора для лексического поиска. В этом рабочем процессе Milvus добавляет функцию, новое поле вывода « <code translate="no">SPARSE_FLOAT_VECTOR</code> » и определение связанного индекса в рамках одного изменения схемы. В данном рабочем процессе изменения схемы нельзя использовать существующее поле « <code translate="no">TEXT</code> » в качестве входных данных для BM25. Чтобы использовать входные данные « <code translate="no">TEXT</code> », определите поле и функцию BM25 при создании коллекции.</p>
<p>При вызове метода ` <code translate="no">add_function_field()</code>` необходимо предоставить объект ` <code translate="no">index_params</code> `, содержащий один индекс ` <code translate="no">SPARSE_INVERTED_INDEX</code> ` с ` <code translate="no">metric_type=&quot;BM25&quot;</code> ` для нового поля вывода. Milvus привязывает определение индекса к сгенерированному полю в рамках одного и того же изменения схемы.</p>
<h3 id="How-do-I-drop-a-Function-and-its-generated-vector-field" class="common-anchor-header">Как удалить функцию и сгенерированное ею векторное поле?<button data-href="#How-do-I-drop-a-Function-and-its-generated-vector-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Вызовите команду ` <code translate="no">drop_function_field()</code> ` с именем функции. В этом рабочем процессе изменения схемы Milvus удаляет функцию, сгенерированное ею векторное поле и связанный с ним индекс одновременно, сохраняя при этом входные поля функции.</p>
<h3 id="Do-I-need-to-wait-after-altering-a-collection-schema" class="common-anchor-header">Нужно ли ждать после изменения схемы коллекции?<button data-href="#Do-I-need-to-wait-after-altering-a-collection-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>Обычно ручное ожидание не требуется. Если ваша следующая операция зависит от обновленной схемы, вы можете сначала вызвать ` <code translate="no">describe_collection()</code> `, чтобы подтвердить схему, которую Milvus возвращает в данный момент.</p>
<p>В распределённой среде может наблюдаться небольшой период распространения изменений, пока компоненты Milvus обновляют метаданные коллекции. Если операция, выполняемая сразу после изменения схемы, завершается с ошибкой, связанной со схемой, обновите схему и повторите операцию.</p>
<h3 id="When-is-storage-space-reclaimed-after-dropping-a-field" class="common-anchor-header">Когда освобождается место в хранилище после удаления поля?<button data-href="#When-is-storage-space-reclaimed-after-dropping-a-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Удаление поля исключает его из текущей схемы и из области видимости обычных запросов и поиска, однако исторические данные для этого поля не удаляются физически из объектного хранилища сразу.</p>
<p>Место в хранилище может быть освобождено позже в ходе уплотнения. Уплотнение — это фоновый процесс, в ходе которого существующие файлы данных реорганизуются в новые, более компактные файлы. После удаления поля вновь уплотнённые файлы соответствуют текущей схеме и не содержат удалённого поля. Milvus не гарантирует немедленного или происходящего в определённый момент времени сокращения объёма хранилища после удаления поля.</p>
<h3 id="What-happens-if-I-add-a-scalar-field-with-the-same-name-as-a-dynamic-field-key" class="common-anchor-header">Что произойдет, если я добавлю скалярное поле с тем же именем, что и ключ динамического поля?<button data-href="#What-happens-if-I-add-a-scalar-field-with-the-same-name-as-a-dynamic-field-key" class="anchor-icon" translate="no">
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
    </button></h3><p>Если динамическое поле включено, вы можете добавить скалярное поле с тем же именем, что и у существующего ключа динамического поля. Новое скалярное поле маскирует ключ динамического поля в обычном выводе запроса, но исходные динамические данные сохраняются в <code translate="no">$meta</code>.</p>
<p>Например, если в существующих сущностях хранится динамический ключ с именем <code translate="no">source</code>, а вы позже добавите скалярное поле с именем <code translate="no">source</code>, то в обычном выводе запроса <code translate="no">source</code> будет использоваться скалярное поле. Чтобы получить доступ к исходному динамическому значению, используйте синтаксис пути <code translate="no">$meta</code>, например <code translate="no">$meta[&quot;source&quot;]</code>.</p>
