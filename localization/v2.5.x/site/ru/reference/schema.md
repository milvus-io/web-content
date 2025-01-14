---
id: schema.md
summary: 'Узнайте, как определить схему в Milvus.'
title: Управление схемой
---
<h1 id="Manage-Schema" class="common-anchor-header">Управление схемой<button data-href="#Manage-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>В этой теме рассказывается о схемах в Milvus. Схема используется для определения свойств коллекции и полей в ней.</p>
<h2 id="Field-schema" class="common-anchor-header">Схема поля<button data-href="#Field-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>Схема поля - это логическое определение поля. Это первое, что необходимо определить, прежде чем определять <a href="#Collection-schema">схему коллекции</a> и <a href="/docs/ru/manage-collections.md">управлять коллекциями</a>.</p>
<p>Milvus поддерживает только одно поле первичного ключа в коллекции.</p>
<h3 id="Field-schema-properties" class="common-anchor-header">Свойства схемы поля</h3><table class="properties">
    <thead>
    <tr>
        <th>Свойства</th>
        <th>Описание</th>
        <th>Примечание</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">name</code></td>
        <td>Имя создаваемого поля в коллекции</td>
        <td>Тип данных: Строка.<br/>Обязательно</td>
    </tr>
    <tr>
        <td><code translate="no">dtype</code></td>
        <td>Тип данных поля</td>
        <td>Обязательный</td>
    </tr>
    <tr>
        <td><code translate="no">description</code></td>
        <td>Описание поля</td>
        <td>Тип данных: Строка.<br/>Необязательно.</td>
    </tr>
    <tr>
        <td><code translate="no">is_primary</code></td>
        <td>Устанавливать ли поле в качестве поля первичного ключа или нет</td>
        <td>Тип данных: Boolean (<code translate="no">true</code> или <code translate="no">false</code>).<br/>Обязательно для поля первичного ключа</td>
    </tr>
        <tr>
            <td><code translate="no">auto_id</code> (Обязательно для поля первичного ключа)</td>
            <td>Переключатель для включения или отключения автоматического присвоения идентификатора (первичного ключа).</td>
            <td><code translate="no">True</code> или <code translate="no">False</code></td>
        </tr>
        <tr>
            <td><code translate="no">max_length</code> (Обязательно для поля VARCHAR)</td>
            <td>Максимальная длина байта для строк, разрешенных к вставке. Обратите внимание, что многобайтовые символы (например, символы Юникода) могут занимать более одного байта каждый, поэтому убедитесь, что длина байта вставляемых строк не превышает указанного предела.</td>
            <td>[1, 65,535]</td>
        </tr>
    <tr>
        <td><code translate="no">dim</code></td>
        <td>Размерность вектора</td>
            <td>Тип данных: Integer &isin;[1, 32768].<br/>Обязательно для плотного векторного поля. Опустите для <a href="https://milvus.io/docs/sparse_vector.md">разреженного векторного</a> поля.</td>
    </tr>
    <tr>
        <td><code translate="no">is_partition_key</code></td>
        <td>Является ли это поле полем с ключом раздела.</td>
        <td>Тип данных: Булево (<code translate="no">true</code> или <code translate="no">false</code>).</td>
    </tr>
    </tbody>
</table>
<h3 id="Create-a-field-schema" class="common-anchor-header">Создание схемы поля</h3><p>Чтобы уменьшить сложность при вставке данных, Milvus позволяет указать значение по умолчанию для каждого скалярного поля при создании схемы поля, за исключением поля первичного ключа. Это означает, что если вы оставите поле пустым при вставке данных, то к нему будет применено значение по умолчанию, указанное вами для этого поля.</p>
<p>Создайте обычную схему поля:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, FieldSchema
id_field = FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;primary id&quot;</span>)
age_field = FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, description=<span class="hljs-string">&quot;age&quot;</span>)
embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)

<span class="hljs-comment"># The following creates a field and use it as the partition key</span>
position_field = FieldSchema(name=<span class="hljs-string">&quot;position&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>, is_partition_key=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Создать схему поля со значениями по умолчанию:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, FieldSchema

fields = [
  FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
  <span class="hljs-comment"># configure default value `25` for field `age`</span>
  FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, default_value=<span class="hljs-number">25</span>, description=<span class="hljs-string">&quot;age&quot;</span>),
  embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)
]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Supported-data-types" class="common-anchor-header">Поддерживаемые типы данных</h3><p><code translate="no">DataType</code> определяет тип данных, которые содержит поле. Разные поля поддерживают разные типы данных.</p>
<ul>
<li><p>Поле первичного ключа поддерживает:</p>
<ul>
<li>INT64: numpy.int64</li>
<li>VARCHAR: VARCHAR</li>
</ul></li>
<li><p>Скалярное поле поддерживает:</p>
<ul>
<li>BOOL: Boolean (<code translate="no">true</code> или <code translate="no">false</code>)</li>
<li>INT8: numpy.int8</li>
<li>INT16: numpy.int16</li>
<li>INT32: numpy.int32</li>
<li>INT64: numpy.int64</li>
<li>FLOAT: numpy.float32</li>
<li>DOUBLE: numpy.double</li>
<li>VARCHAR: VARCHAR</li>
<li>JSON: <a href="/docs/ru/use-json-fields.md">JSON</a></li>
<li>Array: <a href="/docs/ru/array_data_type.md">Array</a></li>
</ul>
<p>Доступен JSON как составной тип данных. Поле JSON состоит из пар ключ-значение. Каждый ключ - это строка, а значение может быть числом, строкой, булевым значением, массивом или списком. Подробнее см. в разделе <a href="/docs/ru/use-json-fields.md">JSON: новый тип данных</a>.</p></li>
<li><p>Поддерживается векторное поле:</p>
<ul>
<li>BINARY_VECTOR: хранит двоичные данные в виде последовательности 0 и 1, используется для компактного представления признаков при обработке изображений и поиске информации.</li>
<li>FLOAT_VECTOR: хранит 32-битные числа с плавающей точкой, широко используемые в научных вычислениях и машинном обучении для представления вещественных чисел.</li>
<li>FLOAT16_VECTOR: хранит 16-битные числа с плавающей точкой половинной точности, используемые в глубоком обучении и вычислениях на GPU для повышения эффективности использования памяти и пропускной способности.</li>
<li>BFLOAT16_VECTOR: хранит 16-битные числа с плавающей точкой с пониженной точностью, но с тем же диапазоном экспонент, что и Float32. Это популярно в глубоком обучении для снижения требований к памяти и вычислениям без существенного влияния на точность.</li>
<li>SPARSE_FLOAT_VECTOR: хранит список ненулевых элементов и соответствующих им индексов, используется для представления разреженных векторов. Для получения дополнительной информации обратитесь к разделу <a href="/docs/ru/sparse_vector.md">"Разреженные векторы</a>".</li>
</ul>
<p>Milvus поддерживает несколько векторных полей в коллекции. Дополнительные сведения см. в разделе <a href="/docs/ru/multi-vector-search.md">Гибридный поиск</a>.</p></li>
</ul>
<h2 id="Collection-schema" class="common-anchor-header">Схема коллекции<button data-href="#Collection-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>Схема коллекции - это логическое определение коллекции. Обычно перед определением схемы коллекции и <a href="/docs/ru/manage-collections.md">управлением коллекциями</a> необходимо определить <a href="#Field-schema">схему поля</a>.</p>
<h3 id="Collection-schema-properties" class="common-anchor-header">Свойства схемы коллекции</h3><table class="properties">
    <thead>
    <tr>
        <th>Свойства</th>
        <th>Описание</th>
        <th>Примечание</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">field</code></td>
        <td>Поля в создаваемой коллекции</td>
        <td>Обязательное</td>
    </tr>
    <tr>
        <td><code translate="no">description</code></td>
        <td>Описание коллекции</td>
        <td>Тип данных: Строка.<br/>Необязательно.</td>
    </tr>
    <tr>
        <td><code translate="no">partition_key_field</code></td>
        <td>Имя поля, которое будет выступать в качестве ключа раздела.</td>
        <td>Тип данных: Строка.<br/>Необязательно.</td>
    </tr>
    <tr>
        <td><code translate="no">enable_dynamic_field</code></td>
        <td>Включать ли динамическую схему или нет.</td>
        <td>Тип данных: Булево (<code translate="no">true</code> или <code translate="no">false</code>).<br/>Необязательно, по умолчанию <code translate="no">False</code>.<br/>Подробнее о динамической схеме см. в разделе <a herf="enable-dynamic-field.md">Динамическая схема</a> и в руководствах пользователя по управлению коллекциями.</td>
    </tr>
    </tbody>
</table>
<h3 id="Create-a-collection-schema" class="common-anchor-header">Создание схемы коллекции</h3><div class="alert note">
  Перед определением схемы коллекции определите схемы полей.</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, FieldSchema, CollectionSchema
id_field = FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;primary id&quot;</span>)
age_field = FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, description=<span class="hljs-string">&quot;age&quot;</span>)
embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)

<span class="hljs-comment"># Enable partition key on a field if you need to implement multi-tenancy based on the partition-key field</span>
position_field = FieldSchema(name=<span class="hljs-string">&quot;position&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>, is_partition_key=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Set enable_dynamic_field to True if you need to use dynamic fields. </span>
schema = CollectionSchema(fields=[id_field, age_field, embedding_field], auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;desc of a collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Создайте коллекцию с указанной схемой:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">Collection</span>, connections
conn = connections.<span class="hljs-title function_">connect</span>(host=<span class="hljs-string">&quot;127.0.0.1&quot;</span>, port=<span class="hljs-number">19530</span>)
collection_name1 = <span class="hljs-string">&quot;tutorial_1&quot;</span>
collection1 = <span class="hljs-title class_">Collection</span>(name=collection_name1, schema=schema, using=<span class="hljs-string">&#x27;default&#x27;</span>, shards_num=<span class="hljs-number">2</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>Вы можете определить номер шарда с помощью <code translate="no">shards_num</code>.</li>
<li>Вы можете определить сервер Milvus, на котором хотите создать коллекцию, указав псевдоним в <code translate="no">using</code>.</li>
<li>Вы можете включить функцию ключа раздела для поля, установив <code translate="no">is_partition_key</code> на <code translate="no">True</code> для поля, если вам нужно реализовать <a href="/docs/ru/multi_tenancy.md">многопользовательскую работу на основе ключа раздела</a>.</li>
<li>Можно включить динамическую схему, установив <code translate="no">enable_dynamic_field</code> на <code translate="no">True</code> в схеме коллекции, если необходимо <a href="/docs/ru/enable-dynamic-field.md">включить динамическое поле</a>.</li>
</ul>
</div>
<p><br/>
Вы также можете создать коллекцию с помощью <code translate="no">Collection.construct_from_dataframe</code>, который автоматически генерирует схему коллекции из DataFrame и создает коллекцию.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection
<span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd
df = pd.DataFrame({
    <span class="hljs-string">&quot;id&quot;</span>: [i <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;age&quot;</span>: [random.randint(<span class="hljs-number">20</span>, <span class="hljs-number">40</span>) <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;embedding&quot;</span>: [[random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(dim)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;position&quot;</span>: <span class="hljs-string">&quot;test_pos&quot;</span>
})

collection, ins_res = Collection.construct_from_dataframe(
    <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    df,
    primary_field=<span class="hljs-string">&#x27;id&#x27;</span>,
    auto_id=<span class="hljs-literal">False</span>
    )
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><ul>
<li>Узнайте, как подготовить схему при <a href="/docs/ru/manage-collections.md">управлении коллекциями</a>.</li>
<li>Подробнее о <a href="/docs/ru/enable-dynamic-field.md">динамической схеме</a>.</li>
<li>Подробнее о разделе-ключе в <a href="/docs/ru/multi_tenancy.md">Multi-tenancy</a>.</li>
</ul>
