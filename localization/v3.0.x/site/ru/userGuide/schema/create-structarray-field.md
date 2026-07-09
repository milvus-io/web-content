---
id: create-structarray-field.md
title: Создание поля StructArray
summary: >-
  Поле StructArray следует создавать в том случае, если одна сущность должна
  содержать упорядоченный список структурированных элементов. Поле StructArray
  представляет собой поле типа Array, тип элементов которого — Struct. Каждый
  элемент Struct соответствует одной и той же схеме и может содержать скалярные
  подполя, векторные подполя или и те, и другие.
---
<h1 id="Create-a-StructArray-Field" class="common-anchor-header">Создание поля StructArray<button data-href="#Create-a-StructArray-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>Создайте поле StructArray, если одна сущность должна содержать упорядоченный список структурированных элементов. Поле StructArray — это поле типа Array, тип элементов которого — Struct. Каждый элемент Struct соответствует одной и той же схеме и может содержать скалярные подполя, векторные подполя или и те, и другие.</p>
<p>На этой странице показано, как определить схему Struct, добавить её в качестве поля StructArray, выбрать подполя для последующего поиска и фильтрации, а также разобраться в правилах схемы, которые применяются перед вставкой или индексированием данных.</p>
<h2 id="Before-you-begin" class="common-anchor-header">Прежде чем начать<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>На этой странице используется коллекция с именем « <code translate="no">tech_articles</code> ». Каждая сущность представляет одну техническую статью, а поле « <code translate="no">chunks</code> » хранит данные на уровне фрагментов в виде элементов Struct.</p>
<table>
<thead>
<tr><th>Поле</th><th>Тип</th><th>Назначение</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">doc_id</code></td><td><code translate="no">INT64</code></td><td>Первичный ключ статьи.</td></tr>
<tr><td><code translate="no">title</code></td><td><code translate="no">VARCHAR</code></td><td>Заголовок статьи.</td></tr>
<tr><td><code translate="no">category</code></td><td><code translate="no">VARCHAR</code></td><td>Категория на уровне статьи.</td></tr>
<tr><td><code translate="no">title_vector</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>Векторное поле на уровне статьи, используемое далее в примерах гибридного поиска.</td></tr>
<tr><td><code translate="no">chunks</code></td><td><code translate="no">ARRAY</code></td><td>Поле StructArray, в котором хранятся текст на уровне фрагментов, метаданные и вложения.</td></tr>
</tbody>
</table>
<p>Поле StructArray « <code translate="no">chunks</code> » содержит следующие подполя.</p>
<table>
<thead>
<tr><th>Поле</th><th>Тип</th><th>Назначение</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">text</code></td><td><code translate="no">VARCHAR</code></td><td>Текст фрагмента.</td></tr>
<tr><td><code translate="no">section</code></td><td><code translate="no">VARCHAR</code></td><td>Имя раздела, например <code translate="no">index</code>, <code translate="no">search</code> или <code translate="no">filter</code>.</td></tr>
<tr><td><code translate="no">page</code></td><td><code translate="no">INT64</code></td><td>Номер страницы или логическое положение фрагмента.</td></tr>
<tr><td><code translate="no">quality_score</code></td><td><code translate="no">FLOAT</code></td><td>Оценка на уровне фрагмента, используемая в примерах скалярной фильтрации и диапазонов.</td></tr>
<tr><td><code translate="no">has_code</code></td><td><code translate="no">BOOL</code></td><td>Содержит ли фрагмент код.</td></tr>
<tr><td><code translate="no">emb_list_vector</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>Векторное подполе для поиска в EmbeddingList с использованием метрик <code translate="no">MAX_SIM*</code>.</td></tr>
<tr><td><code translate="no">emb</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>Векторное подполе для поиска на уровне элементов с использованием обычных векторных метрик.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Векторное поле или векторное подполе принимает только один индекс. Если вам нужен как поиск по EmbeddingList, так и поиск на уровне элементов, определите два отдельных векторных подполя. В данном примере поле « <code translate="no">chunks[emb_list_vector]</code> » предназначено для поиска по EmbeddingList, а поле « <code translate="no">chunks[emb]</code> » — для поиска на уровне элементов.</p>
</div>
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
    </button></h2><p>Поле StructArray хранит одно значение массива для каждого подполя Struct. При определении схемы Struct выбирайте типы подполей из поддерживаемых семейств скалярных и векторных типов.</p>
<table>
<thead>
<tr><th>Физический тип подполя Struct</th><th>Поддержка</th><th>Примечания</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Array</code></td><td>Поддерживается</td><td>Определите подполе как <code translate="no">DataType.BOOL</code>.</td></tr>
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
<tr><td>Вложенные <code translate="no">Array</code>, <code translate="no">ArrayOfVector</code>, <code translate="no">Struct</code> или <code translate="no">ArrayOfStruct</code></td><td>Не поддерживается</td><td>Поле StructArray не может содержать вложенные массивы, вложенные векторные массивы, вложенные поля Struct или вложенные поля Array-of-Struct.</td></tr>
</tbody>
</table>
<p>Информацию о поддержке в конкретных версиях, поведении при наличии значения null и других ограничениях см. в разделе <a href="/docs/ru/structarray-limits.md">«Ограничения StructArray</a>».</p>
<h2 id="Create-a-collection-with-a-StructArray-field" class="common-anchor-header">Создание коллекции с полем StructArray<button data-href="#Create-a-collection-with-a-StructArray-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы создать поле StructArray, сначала определите схему Struct, используемую каждым элементом. Затем добавьте поле Array и установите для его типа элемента значение Struct.</p>
<ol>
<li><p>Создайте схему коллекции.</p></li>
<li><p>Добавьте поля на уровне коллекции, такие как первичный ключ и поля на уровне статьи.</p></li>
<li><p>Создайте схему Struct для элементов, хранящихся внутри поля StructArray.</p></li>
<li><p>Добавьте скалярные и векторные подполя в схему Struct.</p></li>
<li><p>Добавьте поле «Array» с параметром « <code translate="no">element_type=DataType.STRUCT</code> ».</p></li>
<li><p>Установите для параметра « <code translate="no">struct_schema</code> » схему Struct.</p></li>
<li><p>Установите параметр « <code translate="no">max_capacity</code> », чтобы ограничить количество элементов Struct, которые каждая сущность может хранить в этом поле.</p></li>
</ol>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

schema = client.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_field=<span class="hljs-literal">False</span>,
)

<span class="hljs-comment"># Collection-level fields.</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;doc_id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;title&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">512</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;category&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;title_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Struct schema used by each element in the StructArray field.</span>
chunk_schema = client.create_struct_field_schema()
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;text&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">65535</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;section&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;page&quot;</span>,
    datatype=DataType.INT64,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;quality_score&quot;</span>,
    datatype=DataType.FLOAT,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;has_code&quot;</span>,
    datatype=DataType.BOOL,
)

<span class="hljs-comment"># Vector subfield for EmbeddingList search.</span>
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb_list_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Vector subfield for element-level search.</span>
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Add the StructArray field.</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    schema=schema,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Understand-StructArray-field-paths" class="common-anchor-header">Понимание путей к полям StructArray<button data-href="#Understand-StructArray-field-paths" class="anchor-icon" translate="no">
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
    </button></h2><p>После создания поля StructArray обращайтесь к его подполям с использованием синтаксиса пути <code translate="no">structArray[subfield]</code>. Используйте этот синтаксис при создании индексов, поиске векторных подполей, выводе подполей или построении скалярных фильтров.</p>
<table>
<thead>
<tr><th>Путь</th><th>Значение</th><th>Типичное использование</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">chunks[text]</code></td><td>Поле « <code translate="no">text</code> » внутри каждого элемента Struct.</td><td>Поле вывода или скалярная фильтрация.</td></tr>
<tr><td><code translate="no">chunks[section]</code></td><td>Метка секции для каждого фрагмента.</td><td>Скалярная фильтрация.</td></tr>
<tr><td><code translate="no">chunks[quality_score]</code></td><td>Показатель качества на уровне фрагмента.</td><td>Скалярная фильтрация или скалярный индекс.</td></tr>
<tr><td><code translate="no">chunks[emb_list_vector]</code></td><td>Векторное подполе, используемое в качестве списка вложений.</td><td>Поиск в EmbeddingList с помощью <code translate="no">MAX_SIM*</code>.</td></tr>
<tr><td><code translate="no">chunks[emb]</code></td><td>Векторное подполе, используемое каждым элементом Struct независимо.</td><td>Векторный поиск на уровне элементов.</td></tr>
</tbody>
</table>
<h2 id="Make-a-StructArray-field-nullable" class="common-anchor-header">Сделать поле StructArray допускающим значение null<button data-href="#Make-a-StructArray-field-nullable" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus v3.0.x поддерживает поля StructArray, допускающие значение null. Поле StructArray, допускающее значение null, позволяет сущности хранить значения типа ` <code translate="no">null</code> ` для всего поля StructArray.</p>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Предупреждение
Поля StructArray, допускающие значение null, доступны только в Milvus v3.0.x. Для такого поля сущность может предоставить допустимое значение StructArray или установить для всего поля значение <code translate="no">null</code>. При вставке допустимого значения StructArray все подполя должны либо быть равны null, либо иметь допустимые значения. Вставка сущности, в которой некоторые подполя установлены в null, а другие — в допустимые значения, приводит к ошибке. Подробности см. в разделе <a href="/docs/ru/structarray-limits.md">«Ограничения StructArray</a>».</p>
</div>
<h2 id="Add-a-StructArray-field-to-an-existing-collection" class="common-anchor-header">Добавление поля StructArray в существующую коллекцию<button data-href="#Add-a-StructArray-field-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus v3.0.x поддерживает добавление поля StructArray в существующую коллекцию. Добавляемое поле StructArray должно быть допускать значение null, поскольку сущности, уже существующие в коллекции, не имеют значений для нового поля.</p>
<p>Чтобы добавить поле StructArray в существующую коллекцию, сначала определите схему Struct. Затем вызовите метод ` <code translate="no">add_collection_struct_field()</code> ` и установите значение ` <code translate="no">nullable=True</code>`.</p>
<pre><code translate="no" class="language-python">chunk_schema = client.create_struct_field_schema()
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;text&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">65535</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;section&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;page&quot;</span>,
    datatype=DataType.INT64,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;quality_score&quot;</span>,
    datatype=DataType.FLOAT,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;has_code&quot;</span>,
    datatype=DataType.BOOL,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb_list_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

client.add_collection_struct_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>После добавления поля StructArray существующие сущности возвращают значение ` <code translate="no">null</code> ` для нового поля по всем его подполям.</p>
<p>После создания поля StructArray вы не сможете добавлять новые подполя к этому существующему полю StructArray. Если позже вам понадобятся дополнительные атрибуты элементов, вызовите метод ` <code translate="no">drop_collection_field()</code> `, чтобы удалить поле StructArray, а затем добавьте новое поле StructArray с обновленной схемой Struct.</p>
<pre><code translate="no" class="language-python">client.drop_collection_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
)

client.add_collection_struct_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    struct_schema=updated_chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Schema-rules" class="common-anchor-header">Правила схемы<button data-href="#Schema-rules" class="anchor-icon" translate="no">
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
<tr><th>Правило</th><th>Объяснение</th></tr>
</thead>
<tbody>
<tr><td>Struct используется в качестве типа элемента массива (Array).</td><td>Создайте поле StructArray как поле Array с помощью команды « <code translate="no">element_type=STRUCT</code> ». Не создавайте Struct в качестве поля коллекции верхнего уровня.</td></tr>
<tr><td>Все элементы используют одну схему.</td><td>Каждый элемент Struct в одном и том же поле StructArray соответствует схеме Struct, определённой для этого поля.</td></tr>
<tr><td><code translate="no">max_capacity</code> обязателен.</td><td>Оно ограничивает количество элементов Struct, которые каждая сущность может хранить в поле StructArray.</td></tr>
<tr><td>Допускаются только поддерживаемые типы подполей.</td><td>Используйте скалярные и векторные типы подполей, поддерживаемые StructArray. Не определяйте подполя типов JSON, Geometry, Text, Timestamptz, SparseFloatVector или вложенные подполя Struct / Array.</td></tr>
<tr><td>Для векторных подполей перед поиском необходимо создать индексы.</td><td>Перед запуском векторного поиска создайте индексы по путям, таким как <code translate="no">chunks[emb_list_vector]</code> или <code translate="no">chunks[emb]</code>.</td></tr>
<tr><td>Одно векторное подполе имеет один индекс.</td><td>Если вам нужен как поиск по EmbeddingList, так и поиск на уровне элементов, создайте два отдельных векторных подполя.</td></tr>
<tr><td>Существующие подполя StructArray являются фиксированными.</td><td>После создания поля StructArray не рассчитывайте на добавление дополнительных подполей в это же поле StructArray.</td></tr>
<tr><td>Функции внутри Struct не поддерживаются.</td><td>Не определяйте функции для полей или подполей внутри поля StructArray.</td></tr>
<tr><td>Скалярные подполя должны соответствовать требованиям фильтрации.</td><td>Добавляйте такие поля, как <code translate="no">section</code>, <code translate="no">quality_score</code> или <code translate="no">has_code</code>, только в том случае, если вам понадобится впоследствии фильтровать, группировать или выводить их.</td></tr>
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
<li><p>Создание <code translate="no">DataType.STRUCT</code> в качестве поля коллекции верхнего уровня вместо использования его в качестве типа элемента поля Array.</p></li>
<li><p>Забывание установить « <code translate="no">max_capacity</code> » для поля «StructArray».</p></li>
<li><p>Определение неподдерживаемых типов подполей, таких как JSON, Geometry, Text, Timestamptz, SparseFloatVector, вложенный Array, вложенный Struct или Array-of-Struct.</p></li>
<li><p>Использование <code translate="no">String</code> в качестве типа подполя. Используйте <code translate="no">VARCHAR</code> и установите <code translate="no">max_length</code>.</p></li>
<li><p>Использование одного векторного подполя как для поиска по EmbeddingList, так и для поиска на уровне элементов.</p></li>
<li><p>Добавление только векторных подполей и игнорирование скалярных подполей, необходимых для фильтрации, таких как <code translate="no">section</code>, <code translate="no">quality_score</code> или <code translate="no">has_code</code>.</p></li>
<li><p>Рассматривать векторные подполя как входные данные для скалярных предикатов <code translate="no">$[...]</code>. Использовать векторные подполя для векторного поиска, а скалярные подполя — для скалярных предикатов.</p></li>
<li><p>Предположение о том, что в существующее поле StructArray можно добавлять новые подполя после его создания.</p></li>
<li><p>Использование <code translate="no">chunks.emb</code> или <code translate="no">chunks.emb_list_vector</code> вместо требуемого синтаксиса пути <code translate="no">chunks[emb]</code> или <code translate="no">chunks[emb_list_vector]</code>.</p></li>
<li><p>Рассмотрение поведения StructArray, допускающего нулевые значения, как доступного в каждой целевой версии.</p></li>
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
<li><p>Чтобы вставить вложенные данные в поле StructArray, ознакомьтесь с разделом <a href="/docs/ru/insert-data-into-structarray-fields.md">«Вставка данных в поля StructArray</a>».</p></li>
<li><p>Чтобы создать векторные и скалярные индексы, ознакомьтесь с разделом <a href="/docs/ru/index-structarray-fields.md">«Индексирование полей StructArray</a>».</p></li>
<li><p>Чтобы выполнить поиск по векторным подполям StructArray, ознакомьтесь с разделом «Базовый векторный поиск с использованием StructArray».</p></li>
<li><p>Чтобы ознакомиться с поддерживаемыми типами данных, поведением при наличии нулевых значений и ограничениями, специфичными для конкретных версий, ознакомьтесь с разделом <a href="/docs/ru/structarray-limits.md">«Ограничения StructArray</a>».</p></li>
</ol>
