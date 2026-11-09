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
    </button></h1><p>По мере перехода коллекции из стадии разработки в стадию производства ее схема часто изменяется. Вы можете добавить скалярные поля, такие как « <code translate="no">source_uri</code> » или « <code translate="no">review_status</code> », для фильтрации и реализации логики приложения; добавить новое векторное поле для вложений, сгенерированных вашим приложением; добавить функцию BM25 и сгенерированное ею разреженное векторное поле для лексического поиска по существующему тексту; либо удалить поля и функции, которые больше не используются. Функция «Изменить схему коллекции» позволяет вносить поддерживаемые изменения в поля и функции на месте, вместо того чтобы заново создавать коллекцию.</p>
<div class="alert note">
<p>В данном руководстве рассматриваются изменения схемы для пользовательских полей и для функций с их сгенерированными векторными полями в управляемых коллекциях. Чтобы добавить поле во внешнюю коллекцию, см. <a href="/docs/ru/alter-external-collection-schema.md">раздел «Изменение схемы внешней коллекции» (Alter External Collection Schema)</a>. Для изменения свойств полей, таких как изменение значения параметра « <code translate="no">max_length</code> » в поле « <code translate="no">VARCHAR</code> » или параметра « <code translate="no">max_capacity</code> » в поле « <code translate="no">ARRAY</code> », см. раздел <a href="/docs/ru/alter-collection-field.md">«Изменение поля коллекции» (Alter Collection Field</a>). Информацию о динамическом поведении полей см. в разделах <a href="/docs/ru/enable-dynamic-field.md">«Динамическое поле</a> » и <a href="/docs/ru/modify-collection.md">«Изменение коллекции</a>».</p>
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
<li><p>Добавляемые пользовательские поля должны допускать значение null. Укажите <code translate="no">nullable=True</code> при вызове <code translate="no">add_collection_field()</code>. Для существующих сущностей добавляемое поле является <code translate="no">NULL</code>, если только вы не добавляете скалярное поле с <code translate="no">default_value</code>.</p></li>
<li><p>Добавление пользовательских скалярных полей поддерживается в Milvus 2.6.x и более поздних версиях. Добавление пользовательских векторных полей поддерживается в Milvus 2.6.18 и более поздних версиях.</p></li>
</ul>
<ul>
<li>Добавление полей StructArray поддерживается в Milvus 3.0.0 и более поздних версиях. Добавляемые поля StructArray должны допускать нулевые значения.</li>
</ul>
<ul>
<li>Имена полей должны быть уникальными среди полей в коллекции.</li>
</ul>
<p><strong>Добавление функции и сгенерированного ею векторного поля</strong></p>
<ul>
<li><p>При каждом обновлении схемы можно добавить только одну функцию и одно сгенерированное векторное поле.</p></li>
<li><p>Поддерживаемая функция определяет тип сгенерированного векторного поля: функция « <code translate="no">BM25</code> » генерирует поле типа « <code translate="no">SPARSE_FLOAT_VECTOR</code> », а функция « <code translate="no">MINHASH</code> » — поле типа « <code translate="no">BINARY_VECTOR</code> ».</p></li>
<li><p>Генерируемое векторное поле должно быть новым полем. Оно не может ссылаться на поле, уже существующее в схеме коллекции.</p></li>
<li><p>Сгенерированное векторное поле не может быть допускать значение null.</p></li>
<li><p>Поля ввода, используемые функцией, должны уже существовать в коллекции.</p></li>
<li><p>При добавлении функции BM25 или MinHash к существующей коллекции входные данные функции должны представлять собой поле типа « <code translate="no">VARCHAR</code> ». Входные данные типа « <code translate="no">TEXT</code> » не поддерживаются в данном рабочем процессе, поскольку Milvus не может заполнить сгенерированные выходные данные для существующих сущностей на основе этого типа входных данных.</p></li>
</ul>
<p><strong>Удаление полей, определённых пользователем</strong></p>
<ul>
<li><p>Нельзя удалить поле первичного ключа, поле ключа разбиения, поле кластеризующего ключа или последнее векторное поле в коллекции.</p></li>
<li><p>Можно удалить целое поле типа « <code translate="no">ARRAY&lt;STRUCT&gt;</code> », но нельзя удалить отдельное подполе внутри поля типа « <code translate="no">ARRAY&lt;STRUCT&gt;</code> ».</p></li>
<li><p>Нельзя напрямую удалить поле, используемое в качестве поля входа функции или сгенерированное в качестве поля выхода функции. Чтобы удалить поле выхода функции, удалите саму функцию, которая его генерирует.</p></li>
</ul>
<p><strong>Удаление функции и сгенерированного ею векторного поля</strong></p>
<ul>
<li><p>В этом рабочем процессе изменения схемы удаление функции приводит к удалению самой функции, сгенерированного ею векторного поля и связанного индекса. Поля ввода функции остаются в схеме коллекции.</p></li>
<li><p>Удаление функции будет отклонено, если в результате удаления сгенерированного ею векторного поля в коллекции не останется ни одного векторного поля.</p></li>
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
<li><p><a href="#Add-user-defined-scalar-fields--Milvus-26x">Добавляйте пользовательские скалярные поля</a>, если вам нужны новые метаданные для фильтрации, вывода результатов запросов или логики приложения.</p></li>
<li><p><a href="#Add-StructArray-fields--Milvus-300">Добавляйте поля StructArray</a>, если вам требуется массивное поле, элементы которого имеют одинаковую схему Struct.</p></li>
<li><p><a href="#Add-user-defined-vector-fields--Milvus-2618">Добавляйте пользовательские векторные поля</a>, если ваше приложение генерирует вложения и записывает векторные значения в Milvus.</p></li>
<li><p><a href="#Add-a-Function-and-its-generated-vector-field--Milvus-30x">Добавьте функцию и генерируемое ею векторное поле</a>, если Milvus должен генерировать векторные значения на основе существующих полей, таких как разреженные векторы BM25 или сигнатуры MinHash из текста.</p></li>
</ul>
<p>Во всех случаях имя нового поля не должно уже существовать в коллекции, а общее количество полей не может превышать ограничение Milvus на количество полей. Подробности см. в разделе <a href="/docs/ru/limitations.md#number-of-resources-in-a-collection">«Ограничения Milvus</a>».</p>
<h3 id="Add-user-defined-scalar-fields" class="common-anchor-header">Добавление пользовательских скалярных полей<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Add-user-defined-scalar-fields" class="anchor-icon" translate="no">
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
<p>Это отличается от хранения произвольных ключей в динамическом поле: после того как обновление схемы станет доступным, новое скалярное поле станет полноценной частью схемы коллекции. Вы можете вставлять или обновлять значения в этом поле, создавать на нем индексы там, где это поддерживается, использовать его в запросах и фильтрах поиска, а также возвращать его в результатах запроса или поиска.</p>
<p>Поскольку существующие сущности были вставлены до появления нового поля, каждое добавляемое пользовательское скалярное поле должно допускать значение null:</p>
<ul>
<li><p>Если вы добавляете скалярное поле с параметром ` <code translate="no">nullable=True</code> ` и без параметра ` <code translate="no">default_value</code>`, существующие сущности возвращают значение ` <code translate="no">NULL</code> ` для нового поля.</p></li>
<li><p>Если вы добавите скалярное поле с атрибутом « <code translate="no">nullable=True</code> » и атрибутом « <code translate="no">default_value</code> », существующие сущности будут возвращать значение по умолчанию вместо значения « <code translate="no">NULL</code> ».</p></li>
</ul>
<p>Скалярные выражения фильтра не сопоставляются со скалярными значениями <code translate="no">NULL</code>. Подробности см. в разделе <a href="/docs/ru/nullable-and-default.md">«Поля, допускающие значение null</a>».</p>
<p><strong>Пример: добавление скалярного поля, допускающего значение null</strong></p>
<p>В следующем примере к существующей коллекции с именем <code translate="no">product_catalog</code> добавляется поле <code translate="no">source</code>, допускающее значение null.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient, Function, FunctionType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;root:Milvus&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;source&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.VARCHAR,</span>
<span class="highlighted-comment-line">    max_length=<span class="hljs-number">128</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddCollectionFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddCollectionStructFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFunctionFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropFunctionFieldReq;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);
client.addCollectionField(AddCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;source&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">128</span>)
        .isNullable(<span class="hljs-literal">true</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
)

ctx := context.Background()
client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to connect to milvus server: &quot;</span>, err.Error())
}

newField := entity.NewField().
    WithName(<span class="hljs-string">&quot;source&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithNullable(<span class="hljs-literal">true</span>).
    WithMaxLength(<span class="hljs-number">128</span>)
err = client.AddCollectionField(ctx, milvusclient.NewAddCollectionFieldOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, newField))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to add field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;
client
    .<span class="hljs-title function_ invoke__">add_collection_field</span>(
        AddCollectionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">field</span>(
                FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;source&quot;</span>)
                    .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)
                    .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">128</span>)
                    .<span class="hljs-title function_ invoke__">nullable</span>(<span class="hljs-literal">true</span>),
            )
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-built_in">WithToken</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

milvus::FieldSchema field = milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;source&quot;</span>, milvus::DataType::VARCHAR)
                                .<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">128</span>)
                                .<span class="hljs-built_in">WithNullable</span>(<span class="hljs-literal">true</span>);
status = client-&gt;<span class="hljs-built_in">AddCollectionField</span>(
    milvus::<span class="hljs-built_in">AddCollectionFieldRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>).<span class="hljs-built_in">WithField</span>(std::<span class="hljs-built_in">move</span>(field)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addCollectionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">field</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;source&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;VarChar&quot;</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">128</span>,
        <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>,
    },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;

<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig { Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span> });
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-keyword">await</span> client.AddCollectionFieldAsync(<span class="hljs-keyword">new</span> AddCollectionFieldReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>,
    Field = FieldSchema.CreateVarchar(<span class="hljs-string">&quot;source&quot;</span>, maxLength: <span class="hljs-number">128</span>, nullable: <span class="hljs-literal">true</span>)
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
     --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/collections/fields/add&quot;</span> \
     --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
     --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
     -d <span class="hljs-string">&#x27;{
       &quot;collectionName&quot;: &quot;product_catalog&quot;,
       &quot;schema&quot;: {
         &quot;fieldName&quot;: &quot;source&quot;,
         &quot;dataType&quot;: &quot;VarChar&quot;,
         &quot;nullable&quot;: true,
         &quot;elementTypeParams&quot;: {
           &quot;max_length&quot;: 128
         }
       }
     }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>После добавления поля сущности, уже существовавшие в коллекции, возвращают значение « <code translate="no">NULL</code> » для параметра « <code translate="no">source</code> ». Новые сущности могут устанавливать значение « <code translate="no">source</code> » при вставке или обновлении.</p>
<p><strong>Пример: добавление скалярного поля со значением по умолчанию</strong></p>
<p>Если существующие сущности должны возвращать конкретное значение вместо <code translate="no">NULL</code>, укажите <code translate="no">default_value</code> при добавлении скалярного поля. В следующем примере добавляется поле <code translate="no">review_status</code>, а в качестве значения по умолчанию используется <code translate="no">&quot;unreviewed&quot;</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;review_status&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.VARCHAR,</span>
<span class="highlighted-comment-line">    max_length=<span class="hljs-number">32</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">    default_value=<span class="hljs-string">&quot;unreviewed&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.addCollectionField(AddCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;review_status&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">32</span>)
        .isNullable(<span class="hljs-literal">true</span>)
        .defaultValue(<span class="hljs-string">&quot;unreviewed&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">newField := entity.NewField().
    WithName(<span class="hljs-string">&quot;review_status&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithNullable(<span class="hljs-literal">true</span>).
    WithMaxLength(<span class="hljs-number">32</span>).
    WithDefaultValueString(<span class="hljs-string">&quot;unreviewed&quot;</span>)
err = client.AddCollectionField(ctx, milvusclient.NewAddCollectionFieldOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, newField))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to add field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client
    .<span class="hljs-title function_ invoke__">add_collection_field</span>(
        AddCollectionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">field</span>(
                FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;review_status&quot;</span>)
                    .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)
                    .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">32</span>)
                    .<span class="hljs-title function_ invoke__">nullable</span>(<span class="hljs-literal">true</span>)
                    .<span class="hljs-title function_ invoke__">default_value</span>(DefaultValue::<span class="hljs-title function_ invoke__">String</span>(<span class="hljs-string">&quot;unreviewed&quot;</span>.<span class="hljs-title function_ invoke__">into</span>())),
            )
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">milvus::FieldSchema field = milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;review_status&quot;</span>, milvus::DataType::VARCHAR)
                                .<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">32</span>)
                                .<span class="hljs-built_in">WithNullable</span>(<span class="hljs-literal">true</span>)
                                .<span class="hljs-built_in">WithDefaultValue</span>(<span class="hljs-string">&quot;unreviewed&quot;</span>);
status = client-&gt;<span class="hljs-built_in">AddCollectionField</span>(
    milvus::<span class="hljs-built_in">AddCollectionFieldRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>).<span class="hljs-built_in">WithField</span>(std::<span class="hljs-built_in">move</span>(field)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addCollectionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">field</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;review_status&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;VarChar&quot;</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">32</span>,
        <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">default_value</span>: <span class="hljs-string">&quot;unreviewed&quot;</span>,
    },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">await</span> client.AddCollectionFieldAsync(<span class="hljs-keyword">new</span> AddCollectionFieldReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>,
    Field = FieldSchema.CreateVarchar(<span class="hljs-string">&quot;review_status&quot;</span>, maxLength: <span class="hljs-number">32</span>, nullable: <span class="hljs-literal">true</span>, defaultValue: <span class="hljs-string">&quot;unreviewed&quot;</span>)
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
     --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/collections/fields/add&quot;</span> \
     --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
     --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
     -d <span class="hljs-string">&#x27;{
       &quot;collectionName&quot;: &quot;product_catalog&quot;,
       &quot;schema&quot;: {
         &quot;fieldName&quot;: &quot;review_status&quot;,
         &quot;dataType&quot;: &quot;VarChar&quot;,
         &quot;nullable&quot;: true,
         &quot;defaultValue&quot;: &quot;unreviewed&quot;,
         &quot;elementTypeParams&quot;: {
           &quot;max_length&quot;: 32
         }
       }
     }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>После добавления поля сущности, уже существовавшие в коллекции, возвращают значение « <code translate="no">&quot;unreviewed&quot;</code> » для параметра « <code translate="no">review_status</code> ». Новые сущности могут устанавливать другое значение или использовать значение по умолчанию, если значение не указано.</p>
<h3 id="Add-StructArray-fields" class="common-anchor-header">Добавление полей StructArray<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0</span><button data-href="#Add-StructArray-fields" class="anchor-icon" translate="no">
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
<li><p>Создайте схему Struct, содержащую необходимые подполя поддерживаемых типов данных. Информацию о допустимых типах данных см. в разделе <a href="/docs/ru/structarray-limits.md#Supported-subfield-data-types">«Ограничения StructArray</a>».</p></li>
<li><p>Сделайте ссылку на созданную выше схему Struct и установите максимальную емкость поля в параметре <code translate="no">add_collection_struct_field()</code>.</p></li>
<li><p>Укажите параметр « <code translate="no">nullable=True</code> » в запросе.</p></li>
</ol>
<p><strong>Пример: добавление поля StructArray, допускающего значение null</strong></p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create a struct schema</span>
struct_schema = client.create_struct_field_schema()

<span class="hljs-comment"># add a scalar field to the struct</span>
struct_schema.add_field(<span class="hljs-string">&quot;text&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>)
struct_schema.add_field(<span class="hljs-string">&quot;chapter&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)

<span class="hljs-comment"># add a vector field to the struct with mmap enabled</span>
struct_schema.add_field(<span class="hljs-string">&quot;text_vector&quot;</span>, DataType.FLOAT_VECTOR, mmap_enabled=<span class="hljs-literal">True</span>, dim=<span class="hljs-number">5</span>)
struct_schema.add_field(<span class="hljs-string">&quot;chapter_vector&quot;</span>, DataType.FLOAT_VECTOR, mmap_enabled=<span class="hljs-literal">True</span>, dim=<span class="hljs-number">5</span>)

<span class="highlighted-comment-line">client.add_collection_struct_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;books&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,</span>
<span class="highlighted-comment-line">    struct_schema=struct_schema,</span>
<span class="highlighted-comment-line">    max_capacity=<span class="hljs-number">1024</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span></span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Create a struct schema and add its subfields</span>
<span class="hljs-comment">// add a vector subfield with mmap enabled</span>
Map&lt;String, String&gt; mmapParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
mmapParams.put(<span class="hljs-string">&quot;mmap.enabled&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>);
client.addCollectionStructField(AddCollectionStructFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;books&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;chunks&quot;</span>)
        .maxCapacity(<span class="hljs-number">1024</span>)
        .nullable(<span class="hljs-literal">true</span>)
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
                .dataType(DataType.VarChar)
                .maxLength(<span class="hljs-number">65535</span>)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;chapter&quot;</span>)
                .dataType(DataType.VarChar)
                .maxLength(<span class="hljs-number">512</span>)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;text_vector&quot;</span>)
                .dataType(DataType.FloatVector)
                .dimension(<span class="hljs-number">5</span>)
                .typeParams(mmapParams)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;chapter_vector&quot;</span>)
                .dataType(DataType.FloatVector)
                .dimension(<span class="hljs-number">5</span>)
                .typeParams(mmapParams)
                .build())
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Create a struct schema and add its subfields</span>
<span class="hljs-comment">// add a vector subfield with mmap enabled</span>
structSchema := entity.NewStructSchema().
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;text&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">65535</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;chapter&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">512</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;text_vector&quot;</span>).WithDataType(entity.FieldTypeFloatVector).WithDim(<span class="hljs-number">5</span>).WithTypeParams(<span class="hljs-string">&quot;mmap.enabled&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;chapter_vector&quot;</span>).WithDataType(entity.FieldTypeFloatVector).WithDim(<span class="hljs-number">5</span>).WithTypeParams(<span class="hljs-string">&quot;mmap.enabled&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>))
newField := entity.NewField().
    WithName(<span class="hljs-string">&quot;chunks&quot;</span>).
    WithDataType(entity.FieldTypeArray).
    WithElementType(entity.FieldTypeStruct).
    WithNullable(<span class="hljs-literal">true</span>).
    WithMaxCapacity(<span class="hljs-number">1024</span>).
    WithStructSchema(structSchema)
err = client.AddCollectionStructField(ctx, milvusclient.NewAddCollectionStructFieldOption(<span class="hljs-string">&quot;books&quot;</span>, newField))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to add struct field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Create a struct schema and add its subfields</span>
<span class="hljs-comment">// add a vector subfield with mmap enabled</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">struct_schema</span> = StructFieldSchema::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;chunks&quot;</span>)
    .<span class="hljs-title function_ invoke__">max_capacity</span>(<span class="hljs-number">1024</span>)
    .<span class="hljs-title function_ invoke__">nullable</span>(<span class="hljs-literal">true</span>)
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;text&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)
            .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">65535</span>),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;chapter&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)
            .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">512</span>),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;text_vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector)
            .<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">5</span>)
            .<span class="hljs-title function_ invoke__">type_params</span>(
                std::collections::HashMap::<span class="hljs-title function_ invoke__">from</span>([(<span class="hljs-string">&quot;mmap.enabled&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;true&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>())]),
            ),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;chapter_vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector)
            .<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">5</span>)
            .<span class="hljs-title function_ invoke__">type_params</span>(
                std::collections::HashMap::<span class="hljs-title function_ invoke__">from</span>([(<span class="hljs-string">&quot;mmap.enabled&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;true&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>())]),
            ),
    );
client
    .<span class="hljs-title function_ invoke__">add_collection_struct_field</span>(
        AddCollectionStructFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;books&quot;</span>)
            .<span class="hljs-title function_ invoke__">struct_field</span>(struct_schema)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Create a struct schema and add its subfields</span>
<span class="hljs-comment">// add a vector subfield with mmap enabled</span>
milvus::StructFieldSchema struct_schema = milvus::<span class="hljs-built_in">StructFieldSchema</span>(<span class="hljs-string">&quot;chunks&quot;</span>)
                                              .<span class="hljs-built_in">WithMaxCapacity</span>(<span class="hljs-number">1024</span>)
                                              .<span class="hljs-built_in">WithNullable</span>(<span class="hljs-literal">true</span>)
                                              .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;text&quot;</span>, milvus::DataType::VARCHAR).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">65535</span>))
                                              .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;chapter&quot;</span>, milvus::DataType::VARCHAR).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">512</span>))
                                              .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;text_vector&quot;</span>, milvus::DataType::FLOAT_VECTOR).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">5</span>).<span class="hljs-built_in">AddTypeParam</span>(<span class="hljs-string">&quot;mmap.enabled&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>))
                                              .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;chapter_vector&quot;</span>, milvus::DataType::FLOAT_VECTOR).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">5</span>).<span class="hljs-built_in">AddTypeParam</span>(<span class="hljs-string">&quot;mmap.enabled&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>));
status = client-&gt;<span class="hljs-built_in">AddCollectionStructField</span>(
    milvus::<span class="hljs-built_in">AddCollectionStructFieldRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;books&quot;</span>).<span class="hljs-built_in">WithStructField</span>(std::<span class="hljs-built_in">move</span>(struct_schema)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Create a struct schema and add its subfields</span>
<span class="hljs-comment">// add a vector subfield with mmap enabled</span>

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addCollectionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;books&quot;</span>,
    <span class="hljs-attr">field</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;chunks&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;Array&quot;</span>,
        <span class="hljs-attr">element_type</span>: <span class="hljs-string">&quot;Struct&quot;</span>,
        <span class="hljs-attr">max_capacity</span>: <span class="hljs-number">1024</span>,
        <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">fields</span>: [
            { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;VarChar&quot;</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">65535</span> },
            { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;chapter&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;VarChar&quot;</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span> },
            { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_vector&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;FloatVector&quot;</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">true</span> },
            { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;chapter_vector&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;FloatVector&quot;</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">true</span> },
        ],
    },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// Create a struct schema</span>
<span class="hljs-keyword">var</span> structSchema = <span class="hljs-keyword">new</span> StructFieldSchema(<span class="hljs-string">&quot;chunks&quot;</span>)
{
    MaxCapacity = <span class="hljs-number">1024</span>,
    Nullable = <span class="hljs-literal">true</span>
};

<span class="hljs-comment">// add a scalar field to the struct</span>
structSchema.Fields.Add(FieldSchema.CreateVarchar(<span class="hljs-string">&quot;text&quot;</span>, maxLength: <span class="hljs-number">65535</span>));
structSchema.Fields.Add(FieldSchema.CreateVarchar(<span class="hljs-string">&quot;chapter&quot;</span>, maxLength: <span class="hljs-number">512</span>));

<span class="hljs-comment">// add a vector field to the struct with mmap enabled</span>
<span class="hljs-keyword">var</span> textVector = FieldSchema.CreateFloatVector(<span class="hljs-string">&quot;text_vector&quot;</span>, dimension: <span class="hljs-number">5</span>);
textVector.TypeParams[<span class="hljs-string">&quot;mmap.enabled&quot;</span>] = <span class="hljs-string">&quot;true&quot;</span>;
structSchema.Fields.Add(textVector);

<span class="hljs-keyword">var</span> chapterVector = FieldSchema.CreateFloatVector(<span class="hljs-string">&quot;chapter_vector&quot;</span>, dimension: <span class="hljs-number">5</span>);
chapterVector.TypeParams[<span class="hljs-string">&quot;mmap.enabled&quot;</span>] = <span class="hljs-string">&quot;true&quot;</span>;
structSchema.Fields.Add(chapterVector);

<span class="hljs-keyword">await</span> client.AddCollectionStructFieldAsync(<span class="hljs-keyword">new</span> AddCollectionStructFieldReq
{
    CollectionName = <span class="hljs-string">&quot;books&quot;</span>,
    StructField = structSchema
});
<button class="copy-code-btn"></button></code></pre>
<p>После добавления поля StructArray сущности, уже существующие в коллекции, возвращают значение « <code translate="no">NULL</code> » для параметра « <code translate="no">chunks</code> » во всех своих подполях. При вставке новой сущности убедитесь, что все подполя либо имеют значение « <code translate="no">NULL</code> », либо содержат допустимые значения. Вставка сущности, в которой некоторые подполя имеют значение « <code translate="no">NULL</code> », а другие — допустимые значения, приводит к ошибкам.</p>
<h3 id="Add-user-defined-vector-fields" class="common-anchor-header">Добавление пользовательских векторных полей<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.18+</span><button data-href="#Add-user-defined-vector-fields" class="anchor-icon" translate="no">
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
<p>В следующем примере к существующей коллекции добавляется векторное поле с плотной заполненностью и возможностью принятия нулевых значений, имеющее имя <code translate="no">embedding_v2</code>. Установите значение <code translate="no">dim</code> равным размерности вложений, сгенерированных вашим приложением.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;embedding_v2&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.FLOAT_VECTOR,</span>
<span class="highlighted-comment-line">    dim=<span class="hljs-number">768</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.addCollectionField(AddCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;embedding_v2&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">768</span>)
        .isNullable(<span class="hljs-literal">true</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">newField := entity.NewField().
    WithName(<span class="hljs-string">&quot;embedding_v2&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithNullable(<span class="hljs-literal">true</span>).
    WithDim(<span class="hljs-number">768</span>)
err = client.AddCollectionField(ctx, milvusclient.NewAddCollectionFieldOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, newField))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to add field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client
    .<span class="hljs-title function_ invoke__">add_collection_field</span>(
        AddCollectionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">field</span>(
                FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;embedding_v2&quot;</span>)
                    .<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector)
                    .<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">768</span>)
                    .<span class="hljs-title function_ invoke__">nullable</span>(<span class="hljs-literal">true</span>),
            )
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">milvus::FieldSchema field = milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;embedding_v2&quot;</span>, milvus::DataType::FLOAT_VECTOR)
                                .<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">768</span>)
                                .<span class="hljs-built_in">WithNullable</span>(<span class="hljs-literal">true</span>);
status = client-&gt;<span class="hljs-built_in">AddCollectionField</span>(
    milvus::<span class="hljs-built_in">AddCollectionFieldRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>).<span class="hljs-built_in">WithField</span>(std::<span class="hljs-built_in">move</span>(field)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addCollectionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">field</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embedding_v2&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;FloatVector&quot;</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>,
        <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>,
    },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">var</span> embeddingV2 = FieldSchema.CreateFloatVector(<span class="hljs-string">&quot;embedding_v2&quot;</span>, dimension: <span class="hljs-number">768</span>);
embeddingV2.Nullable = <span class="hljs-literal">true</span>;

<span class="hljs-keyword">await</span> client.AddCollectionFieldAsync(<span class="hljs-keyword">new</span> AddCollectionFieldReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>,
    Field = embeddingV2
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
     --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/collections/fields/add&quot;</span> \
     --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
     --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
     -d <span class="hljs-string">&#x27;{
       &quot;collectionName&quot;: &quot;product_catalog&quot;,
       &quot;schema&quot;: {
         &quot;fieldName&quot;: &quot;embedding_v2&quot;,
         &quot;dataType&quot;: &quot;FloatVector&quot;,
         &quot;nullable&quot;: true,
         &quot;elementTypeParams&quot;: {
           &quot;dim&quot;: 768
         }
       }
     }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>После добавления поля создайте индекс для нового векторного поля перед выполнением поиска по нему:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
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
<pre><code translate="no" class="language-java">client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .indexParams(Collections.singletonList(IndexParam.builder()
                .fieldName(<span class="hljs-string">&quot;embedding_v2&quot;</span>)
                .indexType(IndexParam.IndexType.AUTOINDEX)
                .metricType(IndexParam.MetricType.COSINE)
                .build()))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">indexOpt := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-string">&quot;embedding_v2&quot;</span>, index.NewAutoIndex(entity.COSINE))
_, err = client.CreateIndex(ctx, indexOpt)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to create index: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client
    .<span class="hljs-title function_ invoke__">create_index</span>(
        CreateIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">index_param</span>(
                IndexParam::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;embedding_v2&quot;</span>)
                    .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::AutoIndex)
                    .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Cosine),
            )
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-function">milvus::IndexDesc <span class="hljs-title">index_desc</span><span class="hljs-params">(<span class="hljs-string">&quot;embedding_v2&quot;</span>, <span class="hljs-string">&quot;&quot;</span>, milvus::IndexType::AUTOINDEX, milvus::MetricType::COSINE)</span></span>;
status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(
    milvus::<span class="hljs-built_in">CreateIndexRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>).<span class="hljs-built_in">AddIndex</span>(std::<span class="hljs-built_in">move</span>(index_desc)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;embedding_v2&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">await</span> client.CreateIndexAsync(<span class="hljs-keyword">new</span> CreateIndexReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>,
    Indexes = <span class="hljs-keyword">new</span>[]
    {
        <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;embedding_v2&quot;</span>, <span class="hljs-string">&quot;embedding_v2&quot;</span>, IndexType.AutoIndex, MetricType.Cosine)
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
     --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/indexes/create&quot;</span> \
     --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
     --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
     -d <span class="hljs-string">&#x27;{
       &quot;collectionName&quot;: &quot;product_catalog&quot;,
       &quot;indexParams&quot;: [
         {
           &quot;fieldName&quot;: &quot;embedding_v2&quot;,
           &quot;params&quot;: {&quot;index_type&quot;: &quot;AUTOINDEX&quot;},
           &quot;metricType&quot;: &quot;COSINE&quot;
         }
       ]
     }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Существующие сущности имеют значение « <code translate="no">NULL</code> » для параметра « <code translate="no">embedding_v2</code> » и пропускаются при поиске по этому полю. Чтобы сделать существующие сущности доступными для поиска с помощью параметра « <code translate="no">embedding_v2</code> », запишите непустые векторные значения с помощью операции upsert или рабочего процесса backfill. Новые сущности могут включать значение « <code translate="no">embedding_v2</code> » при вставке.</p>
<p><a id="add-vector-fields-generated-by-functions--milvus-30x"></a></p>
<h3 id="Add-a-Function-and-its-generated-vector-field" class="common-anchor-header">Добавление функции и сгенерированного ею векторного поля<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Add-a-Function-and-its-generated-vector-field" class="anchor-icon" translate="no">
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
<p>В следующем примере к существующей коллекции добавляется функция BM25 с именем « <code translate="no">text_bm25</code> » и сгенерированное ею разреженное векторное поле с именем « <code translate="no">text_sparse</code> ». В коллекции уже должно присутствовать поле « <code translate="no">VARCHAR</code> » с именем « <code translate="no">text</code> » и включенным анализатором.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
</div>
<pre><code translate="no" class="language-python">sparse_field = client.create_field_schema(
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
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Add a BM25 function, its generated sparse vector field, and the bound index</span>
client.addFunctionField(AddFunctionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;text_sparse&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .indexParam(IndexParam.builder()
                .fieldName(<span class="hljs-string">&quot;text_sparse&quot;</span>)
                .indexType(IndexParam.IndexType.SPARSE_INVERTED_INDEX)
                .metricType(IndexParam.MetricType.BM25)
                .build())
        .function(CreateCollectionReq.Function.builder()
                .name(<span class="hljs-string">&quot;text_bm25&quot;</span>)
                .functionType(FunctionType.BM25)
                .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
                .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text_sparse&quot;</span>))
                .build())
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Add a BM25 function, its generated sparse vector field, and the bound index</span>
field := entity.NewField().
    WithName(<span class="hljs-string">&quot;text_sparse&quot;</span>).
    WithDataType(entity.FieldTypeSparseVector)
function := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;text_bm25&quot;</span>).
    WithType(entity.FunctionTypeBM25).
    WithInputFields(<span class="hljs-string">&quot;text&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;text_sparse&quot;</span>)
boundIndex := index.NewSparseInvertedIndex(entity.BM25, <span class="hljs-number">0.2</span>)
err = client.AddFunctionField(ctx, milvusclient.NewAddFunctionFieldOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, field, function, boundIndex))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to add function field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Add a BM25 function, its generated sparse vector field, and the bound index</span>
client
    .<span class="hljs-title function_ invoke__">add_function_field</span>(
        AddFunctionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">field</span>(
                FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;text_sparse&quot;</span>)
                    .<span class="hljs-title function_ invoke__">data_type</span>(DataType::SparseFloatVector),
            )
            .<span class="hljs-title function_ invoke__">function</span>(
                Function::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;text_bm25&quot;</span>)
                    .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Bm25)
                    .<span class="hljs-title function_ invoke__">input_fields</span>([<span class="hljs-string">&quot;text&quot;</span>])
                    .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;text_sparse&quot;</span>]),
            )
            .<span class="hljs-title function_ invoke__">index</span>(
                IndexParam::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;text_sparse&quot;</span>)
                    .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::SparseInvertedIndex)
                    .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Bm25),
            )
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Add a BM25 function, its generated sparse vector field, and the bound index</span>
<span class="hljs-function">milvus::FieldSchema <span class="hljs-title">sparse_field</span><span class="hljs-params">(<span class="hljs-string">&quot;text_sparse&quot;</span>, milvus::DataType::SPARSE_FLOAT_VECTOR)</span></span>;
milvus::FunctionPtr function = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::Function&gt;(<span class="hljs-string">&quot;text_bm25&quot;</span>, milvus::FunctionType::BM25);
function-&gt;<span class="hljs-built_in">AddInputFieldName</span>(<span class="hljs-string">&quot;text&quot;</span>);
function-&gt;<span class="hljs-built_in">AddOutputFieldName</span>(<span class="hljs-string">&quot;text_sparse&quot;</span>);
<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">index</span><span class="hljs-params">(<span class="hljs-string">&quot;text_sparse&quot;</span>, <span class="hljs-string">&quot;&quot;</span>, milvus::IndexType::SPARSE_INVERTED_INDEX, milvus::MetricType::BM25)</span></span>;
status = client-&gt;<span class="hljs-built_in">AddFunctionField</span>(milvus::<span class="hljs-built_in">AddFunctionFieldRequest</span>()
                                      .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
                                      .<span class="hljs-built_in">WithField</span>(std::<span class="hljs-built_in">move</span>(sparse_field))
                                      .<span class="hljs-built_in">WithFunction</span>(function)
                                      .<span class="hljs-built_in">WithIndex</span>(std::<span class="hljs-built_in">move</span>(index)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Add a BM25 function, its generated sparse vector field, and the bound index</span>

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addFunctionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">field</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_sparse&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;SparseFloatVector&quot;</span>,
    },
    <span class="hljs-attr">function</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_bm25&quot;</span>,
        <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
        <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&quot;text&quot;</span>],
        <span class="hljs-attr">output_field_names</span>: [<span class="hljs-string">&quot;text_sparse&quot;</span>],
    },
    <span class="hljs-attr">extra_params</span>: {
        <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
        <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
        <span class="hljs-attr">params</span>: {
            <span class="hljs-attr">inverted_index_algo</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,
            <span class="hljs-attr">bm25_k1</span>: <span class="hljs-number">1.2</span>,
            <span class="hljs-attr">bm25_b</span>: <span class="hljs-number">0.75</span>,
        },
    },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">await</span> client.AddFunctionFieldAsync(<span class="hljs-keyword">new</span> AddFunctionFieldReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>,
    Field = FieldSchema.CreateSparseFloatVector(<span class="hljs-string">&quot;text_sparse&quot;</span>, description: <span class="hljs-string">&quot;BM25-generated sparse vector field&quot;</span>),
    Function = FunctionSchema.CreateBm25(<span class="hljs-string">&quot;text_bm25&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;text_sparse&quot;</span>),
    IndexParam = <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;text_sparse&quot;</span>, <span class="hljs-string">&quot;text_sparse&quot;</span>, IndexType.SparseInvertedIndex, MetricType.Bm25)
    {
        ExtraParams = { [<span class="hljs-string">&quot;inverted_index_algo&quot;</span>] = <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>, [<span class="hljs-string">&quot;bm25_k1&quot;</span>] = <span class="hljs-string">&quot;1.2&quot;</span>, [<span class="hljs-string">&quot;bm25_b&quot;</span>] = <span class="hljs-string">&quot;0.75&quot;</span> }
    }
});
<button class="copy-code-btn"></button></code></pre>
<p>Объект ` <code translate="no">index_params</code> ` должен содержать ровно одно определение индекса для нового выходного поля `Function`. Milvus добавляет функцию, сгенерированное ею векторное поле и определение связанного индекса в рамках одного изменения схемы. Не вызывайте ` <code translate="no">create_index()</code> ` отдельно после ` <code translate="no">add_function_field()</code>`.</p>
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
<p>Milvus также поддерживает функции MinHash и генерируемые ими двоичные векторные поля для обнаружения почти-дубликатов. Функция MinHash использует поле « <code translate="no">FunctionType.MINHASH</code> » и записывает данные в новое поле вывода « <code translate="no">BINARY_VECTOR</code> ». Подробности настройки см. в разделе <a href="/docs/ru/minhash-function.md">«Функция MinHash</a>».</p>
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
<h3 id="Drop-user-defined-fields" class="common-anchor-header">Удаление пользовательских полей<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Drop-user-defined-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Используйте команду ` <code translate="no">drop_collection_field()</code> ` для удаления пользовательского скалярного, векторного или поля типа `StructArray`, которое больше не входит в модель вашей коллекции.</p>
<p>Удаление поля сначала изменяет схему коллекции и видимость поля:</p>
<ul>
<li><p>После успешного выполнения команды « <code translate="no">drop_collection_field()</code> » схема коллекции обновляется: команда « <code translate="no">describe_collection()</code> » больше не возвращает удаленное поле, а запросы или поиски больше не могут возвращать это поле в « <code translate="no">output_fields</code> » или использовать его в выражениях.</p></li>
<li><p>Индексы, построенные на удалённом поле, очищаются в рамках обновления схемы.</p></li>
</ul>
<p>Очистка хранилища осуществляется отдельно от очистки схемы. Подробности см. в разделе <a href="#When-is-storage-space-reclaimed-after-dropping-a-field">«Когда освобождается место в хранилище после удаления поля?</a>».</p>
<p><strong>Пример: удаление пользовательского скалярного поля</strong></p>
<p>В следующем примере предполагается, что ` <code translate="no">experiment_tag</code> ` — это пользовательское скалярное поле в коллекции ` <code translate="no">product_catalog</code>`, и оно удаляется из этой коллекции.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
</div>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;experiment_tag&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.dropCollectionField(DropCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;experiment_tag&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.DropCollectionField(ctx, milvusclient.NewDropCollectionFieldOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-string">&quot;experiment_tag&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to drop field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client
    .<span class="hljs-title function_ invoke__">drop_collection_field</span>(
        DropCollectionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;experiment_tag&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">status = client-&gt;<span class="hljs-built_in">DropCollectionField</span>(milvus::<span class="hljs-built_in">DropCollectionFieldRequest</span>()
                                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
                                         .<span class="hljs-built_in">WithFieldName</span>(<span class="hljs-string">&quot;experiment_tag&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollectionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;experiment_tag&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">await</span> client.DropCollectionFieldAsync(<span class="hljs-keyword">new</span> DropCollectionFieldReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>,
    FieldName = <span class="hljs-string">&quot;experiment_tag&quot;</span>
});
<button class="copy-code-btn"></button></code></pre>
<p>После удаления поля можно вызвать метод ` <code translate="no">describe_collection()</code> `, чтобы убедиться, что поле больше не входит в схему.</p>
<p><strong>Пример: удаление поля StructArray</strong></p>
<p>В следующем примере предполагается, что ` <code translate="no">chunks</code> ` является полем `StructArray` в ` <code translate="no">my_collection</code>`, и оно удаляется из коллекции.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
</div>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.dropCollectionField(DropCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;chunks&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.DropCollectionField(ctx, milvusclient.NewDropCollectionFieldOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;chunks&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to drop field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client
    .<span class="hljs-title function_ invoke__">drop_collection_field</span>(
        DropCollectionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;chunks&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">status = client-&gt;<span class="hljs-built_in">DropCollectionField</span>(milvus::<span class="hljs-built_in">DropCollectionFieldRequest</span>()
                                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                                         .<span class="hljs-built_in">WithFieldName</span>(<span class="hljs-string">&quot;chunks&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollectionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;chunks&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">await</span> client.DropCollectionFieldAsync(<span class="hljs-keyword">new</span> DropCollectionFieldReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    FieldName = <span class="hljs-string">&quot;chunks&quot;</span>
});
<button class="copy-code-btn"></button></code></pre>
<p><strong>Пример: удаление пользовательского векторного поля</strong></p>
<p>Векторное поле можно удалить с помощью того же метода ` <code translate="no">drop_collection_field()</code> `, но после удаления коллекция должна по-прежнему содержать хотя бы одно векторное поле. Это полезно для коллекций, которые временно содержат несколько векторных представлений, а затем стандартизируются на одном из них.</p>
<p>В следующем примере предполагается, что ` <code translate="no">image_vector</code> ` — это пользовательское векторное поле в ` <code translate="no">hybrid_catalog</code>`, а в коллекции по-прежнему сохраняется другое векторное поле, например ` <code translate="no">text_vector</code>`.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
</div>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;hybrid_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;image_vector&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.dropCollectionField(DropCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;hybrid_catalog&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;image_vector&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.DropCollectionField(ctx, milvusclient.NewDropCollectionFieldOption(<span class="hljs-string">&quot;hybrid_catalog&quot;</span>, <span class="hljs-string">&quot;image_vector&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to drop field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client
    .<span class="hljs-title function_ invoke__">drop_collection_field</span>(
        DropCollectionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;hybrid_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;image_vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">status = client-&gt;<span class="hljs-built_in">DropCollectionField</span>(milvus::<span class="hljs-built_in">DropCollectionFieldRequest</span>()
                                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;hybrid_catalog&quot;</span>)
                                         .<span class="hljs-built_in">WithFieldName</span>(<span class="hljs-string">&quot;image_vector&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollectionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hybrid_catalog&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;image_vector&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">await</span> client.DropCollectionFieldAsync(<span class="hljs-keyword">new</span> DropCollectionFieldReq
{
    CollectionName = <span class="hljs-string">&quot;hybrid_catalog&quot;</span>,
    FieldName = <span class="hljs-string">&quot;image_vector&quot;</span>
});
<button class="copy-code-btn"></button></code></pre>
<p>Если <code translate="no">image_vector</code> является последним векторным полем в коллекции, операция удаления отклоняется.</p>
<p><a id="drop-vector-fields-generated-by-functions--milvus-30x"></a></p>
<h3 id="Drop-a-Function-and-its-generated-vector-field" class="common-anchor-header">Удаление функции и сгенерированного ею векторного поля<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Drop-a-Function-and-its-generated-vector-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Используйте эту операцию, когда вам больше не нужна функция или сгенерированное ею векторное поле, например, функция BM25 и сгенерированное ею разреженное векторное поле.</p>
<p>Вызовите ` <code translate="no">drop_function_field()</code> `, указав имя функции. Milvus удаляет функцию, сгенерированное ею векторное поле и связанный индекс, сохраняя при этом входные поля функции.</p>
<p><strong>Пример: удаление функции BM25 и сгенерированного ею разреженного векторного поля</strong></p>
<p>В следующем примере предполагается, что ` <code translate="no">text_bm25</code> ` — это функция BM25 в ` <code translate="no">product_catalog</code> `, которая генерирует разреженное векторное поле вывода с именем ` <code translate="no">text_sparse</code>`.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
</div>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">client.drop_function_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    function_name=<span class="hljs-string">&quot;text_bm25&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.dropFunctionField(DropFunctionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .functionName(<span class="hljs-string">&quot;text_bm25&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.DropFunctionField(ctx, milvusclient.NewDropFunctionFieldOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-string">&quot;text_bm25&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to drop function field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client
    .<span class="hljs-title function_ invoke__">drop_function_field</span>(
        DropFunctionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">function_name</span>(<span class="hljs-string">&quot;text_bm25&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">status = client-&gt;<span class="hljs-built_in">DropFunctionField</span>(milvus::<span class="hljs-built_in">DropFunctionFieldRequest</span>()
                                       .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
                                       .<span class="hljs-built_in">WithFunctionName</span>(<span class="hljs-string">&quot;text_bm25&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropFunctionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">function_name</span>: <span class="hljs-string">&quot;text_bm25&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">await</span> client.DropFunctionFieldAsync(<span class="hljs-keyword">new</span> DropFunctionFieldReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>,
    FunctionName = <span class="hljs-string">&quot;text_bm25&quot;</span>
});
<button class="copy-code-btn"></button></code></pre>
<p>После успешного выполнения операции <code translate="no">describe_collection()</code> больше не возвращает удалённую функцию или сгенерированное ею векторное поле. Поля ввода функции остаются в схеме.</p>
<p>Если удаление выходного поля функции приведёт к тому, что коллекция останется без векторного поля, операция отклоняется.</p>
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
    </button></h3><p>Используйте <code translate="no">add_collection_field()</code> для добавления пользовательского скалярного или векторного поля.</p>
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
    </button></h3><p>Существующие сущности были вставлены до появления нового поля, поэтому у них нет значений для этого поля. Установка параметра ` <code translate="no">nullable=True</code> ` позволяет Milvus представлять отсутствующее значение как ` <code translate="no">NULL</code> ` до тех пор, пока ваше приложение не запишет значение или, в случае скалярных полей, пока не будет применено значение по умолчанию.</p>
<p>Это правило применяется к пользовательским скалярным полям и пользовательским векторным полям, добавленным с флагом « <code translate="no">add_collection_field()</code> », а также к полям StructArray, добавленным с флагом « <code translate="no">add_collection_struct_field()</code> ». Оно не применяется к сгенерированному векторному полю функции, которое не может быть допускать нулевые значения.</p>
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
    </button></h3><p>Для пользовательского скалярного поля существующие сущности возвращают значение по умолчанию ( <code translate="no">NULL</code> ), если вы не задали значение по умолчанию для нового поля ( <code translate="no">default_value</code>). Если вы задали значение по умолчанию для нового поля ( <code translate="no">default_value</code>), существующие сущности возвращают это значение.</p>
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
    </button></h3><p>Да. Если в коллекции уже имеется поле « <code translate="no">VARCHAR</code> » с включенным анализатором, вы можете добавить функцию BM25 и сгенерированное ею поле разреженного вектора для лексического поиска. В этом рабочем процессе Milvus добавляет функцию, новое поле вывода « <code translate="no">SPARSE_FLOAT_VECTOR</code> » и определение связанного индекса в рамках одного изменения схемы. В этом рабочем процессе изменения схемы нельзя использовать существующее поле « <code translate="no">TEXT</code> » в качестве входных данных для BM25. Чтобы использовать входные данные « <code translate="no">TEXT</code> », определите поле и функцию BM25 при создании коллекции.</p>
<p>При вызове метода ` <code translate="no">add_function_field()</code>` необходимо предоставить объект ` <code translate="no">index_params</code> `, содержащий один индекс ` <code translate="no">SPARSE_INVERTED_INDEX</code> ` с ` <code translate="no">metric_type=&quot;BM25&quot;</code> ` для нового выходного поля. Milvus привязывает определение индекса к сгенерированному полю в рамках одного и того же изменения схемы.</p>
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
    </button></h3><p>Вызовите метод ` <code translate="no">drop_function_field()</code> `, указав имя функции. В рамках этого рабочего процесса изменения схемы Milvus удаляет функцию, сгенерированное ею векторное поле и связанный с ним индекс, сохраняя при этом входные поля функции.</p>
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
<p>В распределённом развёртывании может наблюдаться небольшой период распространения изменений, пока компоненты Milvus обновляют метаданные коллекции. Если операция, выполняемая сразу после изменения схемы, завершается с ошибкой, связанной со схемой, обновите схему и повторите операцию.</p>
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
    </button></h3><p>Удаление поля приводит к его исключению из текущей схемы и из области видимости обычных запросов и поиска, однако исторические данные для этого поля не удаляются физически из объектного хранилища сразу.</p>
<p>Место в хранилище может быть освобождено позже в ходе уплотнения. Уплотнение — это фоновый процесс, в ходе которого существующие файлы данных реорганизуются в новые, более компактные файлы. После удаления поля вновь уплотнённые файлы соответствуют текущей схеме и не содержат удалённого поля. Milvus не гарантирует немедленного или происходящего в определённый момент времени сокращения объёма хранилища после удаления поля.</p>
<h3 id="What-happens-if-I-add-a-scalar-field-with-the-same-name-as-a-dynamic-field-key" class="common-anchor-header">Что произойдет, если я добавлю скалярное поле с таким же именем, как у ключа динамического поля?<button data-href="#What-happens-if-I-add-a-scalar-field-with-the-same-name-as-a-dynamic-field-key" class="anchor-icon" translate="no">
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
