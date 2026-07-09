---
id: alter-external-collection-schema.md
title: Изменение схемы внешней коллекцииCompatible with Milvus 3.0.x
summary: >-
  Узнайте, как добавить дополнительное поле из внешнего источника данных в
  существующую внешнюю коллекцию.
beta: Milvus 3.0.x
---
<h1 id="Alter-External-Collection-Schema" class="common-anchor-header">Изменение схемы внешней коллекции<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Alter-External-Collection-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>Внешние источники данных часто меняются после создания внешней коллекции. Например, таблица lakehouse, в которой уже хранятся вложения, может впоследствии содержать новое скалярное поле, такое как оценка, категория или метка времени, которое вы хотите возвращать в результатах запроса или использовать в фильтрах.</p>
<p>Вместо того чтобы заново создавать внешнюю коллекцию или копировать исходные данные в Milvus, добавьте поле Milvus, сопоставленное с существующим полем во внешнем источнике данных. После добавления поля обновите внешнюю коллекцию, чтобы новое поле можно было использовать в запросах и поисках.</p>
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
    </button></h2><ul>
<li><p>В настоящее время внешние коллекции поддерживают добавление полей после их создания. Другие изменения схемы, такие как удаление полей, переименование полей, изменение типов данных полей, изменение размерности векторов или пересопоставление <code translate="no">external_field</code>, не поддерживаются.</p></li>
<li><p>Можно добавлять только те поля, которые уже существуют во внешнем источнике данных. Эта операция сопоставляет существующее внешнее поле с полем Milvus. При этом не создается новое поле во внешнем источнике данных и не происходит заполнение исходных данных.</p></li>
<li><p>Добавление полей типа <code translate="no">SPARSE_FLOAT_VECTOR</code> в существующую внешнюю коллекцию не поддерживается.</p></li>
<li><p>Добавление полей StructArray в существующую внешнюю коллекцию не поддерживается. Если вашей внешней коллекции требуется поле StructArray, определите его в схеме коллекции при создании коллекции.</p></li>
</ul>
<h2 id="Add-a-field" class="common-anchor-header">Добавление поля<button data-href="#Add-a-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Перед добавлением поля в внешнюю коллекцию убедитесь, что это поле уже существует во внешнем источнике данных. Затем вызовите метод ` <code translate="no">add_collection_field()</code> `, чтобы сделать это поле доступным в Milvus, установив для параметра ` <code translate="no">external_field</code> ` имя поля во внешнем источнике данных. Установите для параметра ` <code translate="no">data_type</code> ` тип данных Milvus, соответствующий типу поля во внешнем источнике данных. Например, если сопоставленное поле хранит значения двойной точности, используйте ` <code translate="no">DataType.DOUBLE</code>`.</p>
<p>В отличие от управляемых коллекций, значения для добавленного поля считываются из внешнего источника данных после обновления внешней коллекции.</p>
<h3 id="Add-a-scalar-field" class="common-anchor-header">Добавление скалярного поля<button data-href="#Add-a-scalar-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Используйте « <code translate="no">add_collection_field()</code> » для добавления скалярного поля, если вы хотите возвращать это поле в результатах запроса или использовать его в фильтрах. В следующем примере добавляется поле « <code translate="no">score</code> », которое сопоставляется с полем « <code translate="no">score</code> » во внешнем источнике данных.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

client.add_collection_field(
    collection_name=<span class="hljs-string">&quot;product_embeddings&quot;</span>,
    field_name=<span class="hljs-string">&quot;score&quot;</span>,
    data_type=DataType.DOUBLE,
    nullable=<span class="hljs-literal">True</span>,
<span class="highlighted-wrapper-line">    external_field=<span class="hljs-string">&quot;score&quot;</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>В данном примере « <code translate="no">score</code> » — это имя поля в Milvus, а « <code translate="no">external_field=&quot;score&quot;</code> » сопоставляет его с полем « <code translate="no">score</code> » во внешнем источнике данных. Укажите « <code translate="no">nullable=True</code> », поскольку поле добавляется после того, как коллекция уже была создана.</p>
<h3 id="Add-a-vector-field" class="common-anchor-header">Добавление векторного поля<button data-href="#Add-a-vector-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Вы также можете добавить векторное поле, если внешний источник данных уже содержит векторные значения. Укажите вектор <code translate="no">data_type</code> и <code translate="no">dim</code> так, чтобы они соответствовали векторному полю во внешнем источнике данных.</p>
<p>В следующем примере добавляется плотное векторное поле с именем <code translate="no">image_embedding_v2</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

client.add_collection_field(
    collection_name=<span class="hljs-string">&quot;product_embeddings&quot;</span>,
    field_name=<span class="hljs-string">&quot;image_embedding_v2&quot;</span>,
    data_type=DataType.FLOAT_VECTOR,
<span class="highlighted-wrapper-line">    dim=<span class="hljs-number">768</span>,</span>
    nullable=<span class="hljs-literal">True</span>,
<span class="highlighted-wrapper-line">    external_field=<span class="hljs-string">&quot;image_embedding_v2&quot;</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Если вы планируете выполнять векторный поиск по добавленному векторному полю, создайте индекс для этого поля перед обновлением внешней коллекции.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;image_embedding_v2&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;product_embeddings&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Refresh-the-external-collection" class="common-anchor-header">Обновление внешней коллекции<button data-href="#Refresh-the-external-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>После изменения схемы внешней коллекции обновите внешнюю коллекцию, чтобы Milvus обновил метаданные внешней коллекции и применил изменения схемы к результатам запросов, поиска и фильтрации.</p>
<pre><code translate="no" class="language-python">client.refresh_external_collection(
    collection_name=<span class="hljs-string">&quot;product_embeddings&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
