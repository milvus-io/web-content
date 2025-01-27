---
id: use-partition-key.md
title: Использование ключа раздела
---
<h1 id="Use-Partition-Key​" class="common-anchor-header">Использование Partition Key<button data-href="#Use-Partition-Key​" class="anchor-icon" translate="no">
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
    </button></h1><p>Partition Key - это решение для оптимизации поиска на основе разделов. Назначив определенное скалярное поле в качестве ключа раздела и задав условия фильтрации на основе ключа раздела во время поиска, можно сузить область поиска до нескольких разделов, тем самым повысив эффективность поиска. В этой статье мы расскажем о том, как использовать ключ раздела, и о связанных с этим моментах.</p>
<h2 id="Overview​" class="common-anchor-header">Обзор<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>В Milvus можно использовать разделы для разделения данных и повышения эффективности поиска, ограничивая область поиска определенными разделами. Если вы решили управлять разделами вручную, вы можете создать максимум 1024 раздела в коллекции и вставить сущности в эти разделы на основе определенного правила, чтобы сузить область поиска, ограничив поиск определенным количеством разделов.</p>
<p>Milvus представляет ключ раздела для повторного использования разделов при разделении данных, чтобы преодолеть ограничение на количество разделов, которые можно создать в коллекции. При создании коллекции в качестве ключа раздела можно использовать скалярное поле. Когда коллекция готова, Milvus создает указанное количество разделов внутри коллекции, причем каждый раздел соответствует диапазону значений в ключе раздела. Получив вставленные сущности, Milvus сохраняет их в разных разделах на основе значений ключа раздела.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/partition-vs-partition-key.png" alt="Partition v.s. Partition Key" class="doc-image" id="partition-v.s.-partition-key" />
   </span> <span class="img-wrapper"> <span>Раздел против ключа раздела</span> </span></p>
<p>На следующем рисунке показано, как Milvus обрабатывает поисковые запросы в коллекции с включенной функцией Partition Key и без нее. </p>
<ul>
<li><p>Если ключ раздела отключен, Milvus ищет в коллекции сущности, наиболее похожие на вектор запроса. Вы можете сузить область поиска, если знаете, какой раздел содержит наиболее релевантные результаты. </p></li>
<li><p>Если функция Partition Key включена, Milvus определяет область поиска на основе значения Partition Key, указанного в фильтре поиска, и сканирует только те сущности в разделах, которые совпадают. </p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/with-and-without-partition-key.png" alt="With or Without Partition Key" class="doc-image" id="with-or-without-partition-key" />
   </span> <span class="img-wrapper"> <span>С ключом раздела или без него</span> </span></p>
<h2 id="Use-Partition-Key​" class="common-anchor-header">Использовать ключ раздела<button data-href="#Use-Partition-Key​" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы использовать ключ раздела, вам необходимо</p>
<ul>
<li><p>Задать ключ раздела.</p></li>
<li><p>задать количество создаваемых разделов (необязательно) и</p></li>
<li><p>создать условие фильтрации на основе ключа раздела.</p></li>
</ul>
<h3 id="Set-Partition-Key​" class="common-anchor-header">Установка ключа раздела</h3><p>Чтобы назначить скалярное поле в качестве ключа раздела, необходимо установить его атрибут <code translate="no">is_partition_key</code> на <code translate="no">true</code> при добавлении скалярного поля.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (​
    MilvusClient, DataType​
)​
​
client = MilvusClient(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,​
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
)​
​
schema = client.create_schema()​
​
<span class="hljs-comment"># Add the partition key​</span>
schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_varchar&quot;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">512</span>,​
    <span class="hljs-comment"># highlight-next-line​</span>
    is_partition_key=<span class="hljs-literal">True</span>,​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)​
        .build());​
​
<span class="hljs-comment">// Create schema​</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();​
​
<span class="hljs-comment">// Add the partition key​</span>
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;my_varchar&quot;</span>)​
        .dataType(DataType.VarChar)​
        .maxLength(<span class="hljs-number">512</span>)​
        <span class="hljs-comment">// highlight-next-line​</span>
        .isPartitionKey(<span class="hljs-literal">true</span>)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});​
​
<span class="hljs-comment">// 3. Create a collection in customized setup mode​</span>
<span class="hljs-comment">// 3.1 Define fields​</span>
<span class="hljs-keyword">const</span> fields = [​
    {​
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_varchar&quot;</span>,​
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,​
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>,​
        <span class="hljs-comment">// highlight-next-line​</span>
        <span class="hljs-attr">is_partition_key</span>: <span class="hljs-literal">true</span>​
    }​
]​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{​
        &quot;autoId&quot;: true,​
        &quot;enabledDynamicField&quot;: false,​
        &quot;fields&quot;: [​
            {​
                &quot;fieldName&quot;: &quot;my_id&quot;,​
                &quot;dataType&quot;: &quot;Int64&quot;,​
                &quot;isPrimary&quot;: true​
            },​
            {​
                &quot;fieldName&quot;: &quot;my_vector&quot;,​
                &quot;dataType&quot;: &quot;FloatVector&quot;,​
                &quot;elementTypeParams&quot;: {​
                    &quot;dim&quot;: &quot;5&quot;​
                }​
            },​
            {​
                &quot;fieldName&quot;: &quot;my_varchar&quot;,​
                &quot;dataType&quot;: &quot;VarChar&quot;,​
                &quot;isPartitionKey&quot;: true,​
                &quot;elementTypeParams&quot;: {​
                    &quot;max_length&quot;: 512​
                }​
            }​
        ]​
    }&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-Partition-Numbers​" class="common-anchor-header">Установка номеров разделов</h3><p>Когда вы назначаете скалярное поле в коллекции в качестве ключа раздела, Milvus автоматически создает 16 разделов в коллекции. Получив сущность, Milvus выбирает раздел на основе значения Partition Key этой сущности и сохраняет сущность в этом разделе, в результате чего некоторые или все разделы будут содержать сущности с разными значениями Partition Key. </p>
<p>Вы также можете определить количество разделов, которые нужно создать вместе с коллекцией. Это возможно только в том случае, если в качестве ключа раздела указано скалярное поле.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    schema=schema,​
    <span class="hljs-meta"># highlight-next-<span class="hljs-keyword">line</span>​</span>
    num_partitions=<span class="hljs-number">1024</span>​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
                .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
                .collectionSchema(schema)​
                .numPartitions(<span class="hljs-number">1024</span>)​
                .build();​
        client.createCollection(createCollectionReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">create_collection</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,​
    <span class="hljs-attr">schema</span>: schema,​
    <span class="hljs-attr">num_partitions</span>: <span class="hljs-number">1024</span>​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{​
    &quot;partitionsNum&quot;: 1024​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;myCollection\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-Filtering-Condition​" class="common-anchor-header">Создание условия фильтрации</h3><p>При выполнении ANN-поиска в коллекции с включенной функцией Partition Key необходимо включить в запрос поиска выражение фильтрации, включающее Partition Key. В выражении фильтрации можно ограничить значение Partition Key определенным диапазоном, чтобы Milvus ограничил область поиска соответствующими разделами.</p>
<p>Следующие примеры демонстрируют фильтрацию на основе ключей разделов на основе конкретного значения ключа раздела и набора значений ключей разделов.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Filter based on a single partition key value, or​</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;partition_key == &quot;x&quot; &amp;&amp; &lt;other conditions&gt;&#x27;</span>​
​
<span class="hljs-comment"># Filter based on multiple partition key values​</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;partition_key in [&quot;x&quot;, &quot;y&quot;, &quot;z&quot;] &amp;&amp; &lt;other conditions&gt;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Filter based on a single partition key value, or​</span>
<span class="hljs-title class_">String</span> filter = <span class="hljs-string">&quot;partition_key == &#x27;x&#x27; &amp;&amp; &lt;other conditions&gt;&quot;</span>;​
​
<span class="hljs-comment">// Filter based on multiple partition key values​</span>
<span class="hljs-title class_">String</span> filter = <span class="hljs-string">&quot;partition_key in [&#x27;x&#x27;, &#x27;y&#x27;, &#x27;z&#x27;] &amp;&amp; &lt;other conditions&gt;&quot;</span>;​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Filter based on a single partition key value, or​</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;partition_key == &quot;x&quot; &amp;&amp; &lt;other conditions&gt;&#x27;</span>​
​
<span class="hljs-comment">// Filter based on multiple partition key values​</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;partition_key in [&quot;x&quot;, &quot;y&quot;, &quot;z&quot;] &amp;&amp; &lt;other conditions&gt;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-comment"># Filter based on a single partition key value, or​</span>
export <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;partition_key == &quot;x&quot; &amp;&amp; &lt;other conditions&gt;&#x27;</span>​
​
<span class="hljs-comment"># Filter based on multiple partition key values​</span>
export <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;partition_key in [&quot;x&quot;, &quot;y&quot;, &quot;z&quot;] &amp;&amp; &lt;other conditions&gt;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Замените <code translate="no">partition_key</code> на имя поля, назначенного в качестве ключа раздела.</p>
</div>
<h2 id="Use-Partition-Key-Isolation" class="common-anchor-header">Использование изоляции ключей разделов<button data-href="#Use-Partition-Key-Isolation" class="anchor-icon" translate="no">
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
    </button></h2><p>В сценарии с несколькими арендаторами можно назначить скалярное поле, связанное с идентификаторами арендаторов, в качестве ключа раздела и создать фильтр на основе определенного значения в этом скалярном поле. Чтобы еще больше повысить производительность поиска в подобных сценариях, Milvus представляет функцию Partition Key Isolation.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/partition-key-isolation.png" alt="Partition Key Isolation" class="doc-image" id="partition-key-isolation" />
   </span> <span class="img-wrapper"> <span>Изоляция ключей разделов</span> </span></p>
<p>Как показано на рисунке выше, Milvus группирует сущности на основе значения Partition Key и создает отдельный индекс для каждой из этих групп. Получив запрос на поиск, Milvus находит индекс на основе значения Partition Key, указанного в условии фильтрации, и ограничивает область поиска сущностями, включенными в индекс, что позволяет избежать сканирования нерелевантных сущностей во время поиска и значительно повысить производительность поиска. После включения функции Partition Key Isolation вы можете включить только определенное значение в фильтр на основе Partition-key, чтобы Milvus мог ограничить область поиска сущностями, включенными в индекс, которые соответствуют.</p>
<div class="alert note">
<p>В настоящее время функция Partition-Key Isolation применяется только к поиску с типом индекса, установленным на HNSW.</p>
</div>
<h3 id="Enable-Partition-Key-Isolation" class="common-anchor-header">Включение функции изоляции ключей разделов</h3><p>В следующих примерах кода показано, как включить функцию Partition Key Isolation.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    <span class="hljs-comment"># highlight-next-line</span>
    properties={<span class="hljs-string">&quot;partitionkey.isolation&quot;</span>: <span class="hljs-literal">True</span>}
)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">collection</span>.<span class="hljs-property">request</span>.<span class="hljs-property">CreateCollectionReq</span>;

<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">String</span>&gt; properties = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
properties.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;partitionkey.isolation&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>);

<span class="hljs-title class_">CreateCollectionReq</span> createCollectionReq = <span class="hljs-title class_">CreateCollectionReq</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .<span class="hljs-title function_">collectionSchema</span>(schema)
        .<span class="hljs-title function_">numPartitions</span>(<span class="hljs-number">1024</span>)
        .<span class="hljs-title function_">properties</span>(properties)
        .<span class="hljs-title function_">build</span>();
client.<span class="hljs-title function_">createCollection</span>(createCollectionReq);

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">properties</span>: {
        <span class="hljs-string">&quot;partitionkey.isolation&quot;</span>: <span class="hljs-literal">true</span>
    }
})

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{
    &quot;partitionKeyIsolation&quot;: true
}&#x27;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;myCollection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>
}&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<p>После включения изоляции ключа раздела вы можете задать ключ раздела и количество разделов, как описано в разделе <a href="#Set-Partition-Numbers">Установка номеров разделов</a>. Обратите внимание, что фильтр на основе ключа раздела должен включать только определенное значение ключа раздела.</p>
