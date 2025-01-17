---
id: manage-partitions.md
title: Управление разделами
---
<h1 id="Manage-Partitions" class="common-anchor-header">Управление разделами<button data-href="#Manage-Partitions" class="anchor-icon" translate="no">
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
    </button></h1><p>В этом руководстве рассказывается о том, как создавать и управлять разделами в коллекции.</p>
<h2 id="Overview" class="common-anchor-header">Обзор<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Раздел в Milvus представляет собой подразделение коллекции. Эта функциональность позволяет разделить физическое хранилище коллекции на несколько частей, что способствует повышению производительности запросов за счет сужения фокуса на меньшем подмножестве данных, а не на всей коллекции.</p>
<p>При создании коллекции автоматически создается как минимум один раздел по умолчанию с именем <strong>_default</strong>. В коллекции можно создать не более 1024 разделов.</p>
<div class="admonition note">
<p><b>заметки</b></p>
<p>Milvus представляет функцию <strong>Partition Key</strong>, использующую базовые разделы для хранения сущностей на основе хэшированных значений определенного поля. Эта функция облегчает реализацию многопользовательского доступа, повышая производительность поиска. Для получения подробной информации читайте раздел <a href="https://milvus.io/docs/use-partition-key.md">Использование Partition Key</a>.</p>
<p>Если в коллекции включена функция <strong>Partition Key</strong>, Milvus берет на себя управление всеми разделами, освобождая вас от этой обязанности.</p>
</div>
<h2 id="Preparations" class="common-anchor-header">Подготовка<button data-href="#Preparations" class="anchor-icon" translate="no">
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
    </button></h2><p>В приведенном ниже фрагменте кода используется существующий код для установки соединения с Milvus и создания коллекции в режиме быстрой настройки, указывая, что коллекция загружается при создании.</p>
<div class="language-python">
<p>Для подготовки используйте <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a> для подключения к Milvus и <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md"><code translate="no">create_collection()</code></a> для создания коллекции в режиме быстрой настройки.</p>
</div>
<div class="language-java">
<p>Для подготовки используйте <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Client/MilvusClientV2.md"><code translate="no">MilvusClientV2</code></a> для подключения к Milvus и <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md"><code translate="no">createCollection()</code></a> для создания коллекции в режиме быстрой настройки.</p>
</div>
<div class="language-javascript">
<p>Для подготовки используйте <a href="https://milvus.io/api-reference/node/v2.4.x/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a> для подключения к Milvus и <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md"><code translate="no">createCollection()</code></a> для создания коллекции в режиме быстрой настройки.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># 1. Set up a Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
)

<span class="hljs-comment"># 2. Create a collection</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    dimension=<span class="hljs-number">5</span>,
)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;

<span class="hljs-comment">// 1. Connect to Milvus server</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
    .uri(CLUSTER_ENDPOINT)
    .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-comment">// 2. Create a collection in quick setup mode</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">quickSetupReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .dimension(<span class="hljs-number">5</span>)
    .build();

client.createCollection(quickSetupReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-comment">// 1. Set up a Milvus Client</span>
client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address});

<span class="hljs-comment">// 2. Create a collection in quick setup mode</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">dimension</span>: <span class="hljs-number">5</span>,
});  
<button class="copy-code-btn"></button></code></pre>
<div class="admonition note">
<p><b>заметки</b></p>
<p>В приведенном выше фрагменте кода индекс коллекции был создан вместе с коллекцией, что указывает на то, что коллекция загружается при создании.</p>
</div>
<h2 id="List-Partitions" class="common-anchor-header">Список разделов<button data-href="#List-Partitions" class="anchor-icon" translate="no">
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
    </button></h2><p>После того как коллекция готова, вы можете перечислить ее разделы.</p>
<div class="language-python">
<p>Чтобы перечислить разделы, используйте <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Partitions/list_partitions.md"><code translate="no">list_partitions()</code></a>.</p>
</div>
<div class="language-java">
<p>Чтобы перечислить разделы, используйте <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Partitions/listPartitions.md"><code translate="no">listPartitions()</code></a>.</p>
</div>
<div class="language-javascript">
<p>Чтобы перечислить разделы, используйте <a href="https://milvus.io/api-reference/node/v2.4.x/Partitions/listPartitions.md"><code translate="no">listPartitions()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. List partitions</span>
res = client.list_partitions(collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [&quot;_default&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">partition</span>.<span class="hljs-property">request</span>.<span class="hljs-property">ListPartitionsReq</span>;

<span class="hljs-comment">// 3. List all partitions in the collection</span>
<span class="hljs-title class_">ListPartitionsReq</span> listPartitionsReq = <span class="hljs-title class_">ListPartitionsReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">build</span>();

<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">String</span>&gt; partitionNames = client.<span class="hljs-title function_">listPartitions</span>(listPartitionsReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(partitionNames);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [&quot;_default&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3. List partitions</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listPartitions</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">partition_names</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [ &#x27;_default&#x27; ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<p>Вывод приведенного выше фрагмента кода включает имена разделов в указанной коллекции.</p>
<div class="admonition note">
<p><b>заметки</b></p>
<p>Если вы задали поле в качестве ключа раздела в коллекции, Milvus создает не менее <strong>64</strong> разделов вместе с коллекцией. При выводе списка разделов результаты могут отличаться от результатов, полученных в приведенных выше фрагментах кода.</p>
<p>Подробнее см. в разделе <a href="https://milvus.io/docs/use-partition-key.md">Использование ключа раздела</a>.</p>
</div>
<h2 id="Create-Partitions" class="common-anchor-header">Создание разделов<button data-href="#Create-Partitions" class="anchor-icon" translate="no">
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
    </button></h2><p>В коллекцию можно добавить дополнительные разделы. В коллекции может быть до 4 096 разделов.</p>
<div class="language-python">
<p>Чтобы создать разделы, используйте команду <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Partitions/create_partition.md"><code translate="no">create_partition()</code></a>.</p>
</div>
<div class="language-java">
<p>Чтобы создать разделы, используйте <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Partitions/createPartition.md"><code translate="no">createPartition()</code></a>.</p>
</div>
<div class="language-javascript">
<p>Чтобы создать разделы, используйте <a href="https://milvus.io/api-reference/node/v2.4.x/Partitions/createPartition.md"><code translate="no">createPartition()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4. Create more partitions</span>
client.create_partition(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

client.create_partition(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionB&quot;</span>
)

res = client.list_partitions(collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [&quot;_default&quot;, &quot;partitionA&quot;, &quot;partitionB&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.CreatePartitionReq;

<span class="hljs-comment">// 4. Create more partitions</span>
<span class="hljs-type">CreatePartitionReq</span> <span class="hljs-variable">createPartitionReq</span> <span class="hljs-operator">=</span> CreatePartitionReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .build();

client.createPartition(createPartitionReq);

createPartitionReq = CreatePartitionReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionB&quot;</span>)
    .build();

client.createPartition(createPartitionReq);

listPartitionsReq = ListPartitionsReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .build();

partitionNames = client.listPartitions(listPartitionsReq);

System.out.println(partitionNames);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     &quot;_default&quot;,</span>
<span class="hljs-comment">//     &quot;partitionA&quot;,</span>
<span class="hljs-comment">//     &quot;partitionB&quot;</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 4. Create more partitions</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createPartition</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createPartition</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionB&quot;</span>
})

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listPartitions</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">partition_names</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [ &#x27;_default&#x27;, &#x27;partitionA&#x27;, &#x27;partitionB&#x27; ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<p>Приведенный выше фрагмент кода создает раздел в коллекции и выводит список разделов коллекции.</p>
<div class="admonition note">
<p><b>заметки</b></p>
<p>Если вы задали поле в качестве ключа раздела в коллекции, Milvus берет на себя управление разделами в коллекции. Поэтому при попытке создания разделов могут возникнуть ошибки.</p>
<p>Подробнее см. в разделе <a href="https://milvus.io/docs/use-partition-key.md">Использование ключа раздела</a>.</p>
</div>
<h2 id="Check-for-a-Specific-Partition" class="common-anchor-header">Проверка наличия определенного раздела<button data-href="#Check-for-a-Specific-Partition" class="anchor-icon" translate="no">
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
    </button></h2><p>Можно также проверить существование определенного раздела.</p>
<div class="language-python">
<p>Чтобы проверить наличие определенного раздела, используйте команду <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Partitions/has_partition.md"><code translate="no">has_partition()</code></a>.</p>
</div>
<div class="language-java">
<p>Чтобы проверить наличие определенного раздела, используйте <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Partitions/hasPartition.md"><code translate="no">hasPartition()</code></a>.</p>
</div>
<div class="language-javascript">
<p>Чтобы проверить наличие определенного раздела, используйте <a href="https://milvus.io/api-reference/node/v2.4.x/Partitions/hasPartition.md"><code translate="no">hasPartition()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 5. Check whether a partition exists</span>
res = client.has_partition(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># True</span>

res = client.has_partition(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionC&quot;</span>
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># False</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.HasPartitionReq;

<span class="hljs-comment">// 5. Check whether a partition exists</span>
<span class="hljs-type">HasPartitionReq</span> <span class="hljs-variable">hasPartitionReq</span> <span class="hljs-operator">=</span> HasPartitionReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .build();

<span class="hljs-type">boolean</span> <span class="hljs-variable">exists</span> <span class="hljs-operator">=</span> client.hasPartition(hasPartitionReq);

System.out.println(exists);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>

hasPartitionReq = HasPartitionReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionC&quot;</span>)
    .build();

exists = client.hasPartition(hasPartitionReq);

System.out.println(exists);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// false</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 5. Check whether a partition exists</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">hasPartition</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">value</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// true</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">hasPartition</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionC&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">value</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// false</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<p>В приведенном выше фрагменте кода проверяется, есть ли в коллекции разделы с именами <code translate="no">partitionA</code> и <code translate="no">partitionC</code>.</p>
<h2 id="Load--Release-Partitions" class="common-anchor-header">Загрузка и освобождение разделов<button data-href="#Load--Release-Partitions" class="anchor-icon" translate="no">
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
    </button></h2><p>Вы можете загружать и освобождать определенные разделы, чтобы сделать их доступными или недоступными для поиска и запросов.</p>
<h3 id="Get-Load-Status" class="common-anchor-header">Получение состояния загрузки</h3><div class="language-python">
<p>Чтобы проверить состояние загрузки коллекции и ее разделов, используйте команду <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/get_load_state.md"><code translate="no">get_load_state()</code></a>.</p>
</div>
<div class="language-java">
<p>Чтобы проверить состояние загрузки коллекции и ее разделов, используйте <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/getLoadState.md"><code translate="no">getLoadState()</code></a>.</p>
</div>
<div class="language-javascript">
<p>Чтобы проверить состояние загрузки коллекции и ее разделов, используйте <a href="https://milvus.io/api-reference/node/v2.4.x/Management/getLoadState.md"><code translate="no">getLoadState()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Release the collection</span>
client.release_collection(collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>)

<span class="hljs-comment"># Check the load status</span>
res = client.get_load_state(collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>, 
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>, 
    partition_name=<span class="hljs-string">&quot;partitionB&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: NotLoad&gt;&quot;</span>
<span class="hljs-comment"># }</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.GetLoadStateReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.ReleaseCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.LoadPartitionsReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.ReleasePartitionsReq;

<span class="hljs-comment">// 6. Load a partition independantly</span>
<span class="hljs-comment">// 6.1 Release the collection</span>
<span class="hljs-type">ReleaseCollectionReq</span> <span class="hljs-variable">releaseCollectionReq</span> <span class="hljs-operator">=</span> ReleaseCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .build();

client.releaseCollection(releaseCollectionReq);

<span class="hljs-comment">// 6.2 Load partitionA</span>
<span class="hljs-type">LoadPartitionsReq</span> <span class="hljs-variable">loadPartitionsReq</span> <span class="hljs-operator">=</span> LoadPartitionsReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionNames(List.of(<span class="hljs-string">&quot;partitionA&quot;</span>))
    .build();

client.loadPartitions(loadPartitionsReq);

Thread.sleep(<span class="hljs-number">3000</span>);

<span class="hljs-comment">// 6.3 Check the load status of the collection and its partitions</span>
<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">getLoadStateReq</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .build();

<span class="hljs-type">boolean</span> <span class="hljs-variable">state</span> <span class="hljs-operator">=</span> client.getLoadState(getLoadStateReq);

System.out.println(state);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.println(state);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionB&quot;</span>)
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.println(state);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// false</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 6. Load a partition indenpendantly</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">releaseCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateNotLoad</span>
<span class="hljs-comment">// </span>

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadPartitions</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;partitionA&quot;</span>]
})

<span class="hljs-keyword">await</span> <span class="hljs-title function_">sleep</span>(<span class="hljs-number">3000</span>)

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionB&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<p>Возможный статус загрузки может быть одним из следующих</p>
<ul>
<li><p><strong>Загружена</strong></p>
<p>Коллекция помечается как <code translate="no">Loaded</code>, если хотя бы один из ее разделов был загружен.</p></li>
<li><p><strong>NotLoad</strong></p>
<p>Коллекция помечается как <code translate="no">NotLoad</code>, если ни один из ее разделов не был загружен.</p></li>
<li><p><strong>Загрузка</strong></p>
<p>Коллекция помечается как Loading, если хотя бы один из ее разделов находится в процессе загрузки.</p></li>
</ul>
<h3 id="Load-Partitions" class="common-anchor-header">Загрузка разделов</h3><div class="language-python">
<p>Чтобы загрузить все разделы коллекции, можно просто вызвать команду <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/load_collection.md"><code translate="no">load_collection()</code></a>. Чтобы загрузить определенные разделы коллекции, используйте <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Partitions/load_partitions.md"><code translate="no">load_partitions()</code></a>.</p>
</div>
<div class="language-java">
<p>Чтобы загрузить все разделы коллекции, можно просто вызвать <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/loadCollection.md"><code translate="no">loadCollection()</code></a>. Чтобы загрузить определенные разделы коллекции, используйте <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Partitions/loadPartitions.md"><code translate="no">loadPartitions()</code></a>.</p>
</div>
<div class="language-javascript">
<p>Чтобы загрузить все разделы коллекции, можно просто вызвать <a href="https://milvus.io/api-reference/node/v2.4.x/Management/loadCollection.md"><code translate="no">loadCollection()</code></a>. Чтобы загрузить определенные разделы коллекции, используйте <a href="https://milvus.io/api-reference/node/v2.4.x/Partitions/loadPartitions.md"><code translate="no">loadPartitions()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">client.load_partitions(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>]
)

res = client.get_load_state(collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">LoadPartitionsReq</span> <span class="hljs-variable">loadPartitionsReq</span> <span class="hljs-operator">=</span> LoadPartitionsReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionNames(List.of(<span class="hljs-string">&quot;partitionA&quot;</span>))
    .build();

client.loadPartitions(loadPartitionsReq);

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.println(state);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadPartitions</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;partitionA&quot;</span>]
})

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">//</span>
<button class="copy-code-btn"></button></code></pre>
<p>Чтобы загрузить несколько разделов за раз, сделайте следующее:</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">client.load_partitions(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>, <span class="hljs-string">&quot;partitionB&quot;</span>]
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionB&quot;</span>
)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">LoadPartitionsReq loadPartitionsReq = LoadPartitionsReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionNames(List.of(<span class="hljs-string">&quot;partitionA&quot;</span>, <span class="hljs-string">&quot;partitionB&quot;</span>))
    .build();

client.loadPartitions(loadPartitionsReq);

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.<span class="hljs-built_in">println</span>(state);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionB&quot;</span>)
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.<span class="hljs-built_in">println</span>(state);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadPartitions</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;partitionA&quot;</span>, <span class="hljs-string">&quot;partitionB&quot;</span>]
})

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionB&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<p>Чтобы загрузить указанные поля в одном или нескольких разделах, сделайте следующее:</p>
<pre><code translate="no" class="language-python">client.load_partitions(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>],
    load_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>],
    skip_load_dynamic_field=<span class="hljs-literal">True</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Обратите внимание, что только поля, перечисленные в <code translate="no">load_fields</code>, могут использоваться в качестве условий фильтрации и выходных полей в поиске и запросах. В список всегда следует включать первичный ключ. Имена полей, исключенные из загрузки, не будут доступны для фильтрации или вывода.</p>
<p>Вы можете использовать <code translate="no">skip_load_dynamic_field=True</code>, чтобы пропустить загрузку динамического поля. Milvus рассматривает динамическое поле как единое поле, поэтому все ключи в динамическом поле будут включены или исключены вместе.</p>
<h3 id="Release-Partitions" class="common-anchor-header">Освобождение разделов</h3><div class="language-python">
<p>Чтобы освободить все разделы коллекции, можно просто вызвать команду <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/release_collection.md"><code translate="no">release_collection()</code></a>. Чтобы освободить определенные разделы коллекции, используйте <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Partitions/release_partitions.md"><code translate="no">release_partitions()</code></a>.</p>
</div>
<div class="language-java">
<p>Чтобы освободить все разделы коллекции, можно просто вызвать <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/releaseCollection.md"><code translate="no">releaseCollection()</code></a>. Чтобы освободить определенные разделы коллекции, используйте <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Partitions/releasePartitions.md"><code translate="no">releasePartitions()</code></a>.</p>
</div>
<div class="language-javascript">
<p>Чтобы освободить все разделы коллекции, можно просто вызвать <a href="https://milvus.io/api-reference/node/v2.4.x/Management/releaseCollection.md"><code translate="no">releaseCollection()</code></a>. Чтобы освободить определенные разделы коллекции, используйте <a href="https://milvus.io/api-reference/node/v2.4.x/Partitions/releasePartitions.md"><code translate="no">releasePartitions()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 7. Release a partition</span>
client.release_partitions(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>]
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>, 
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: NotLoad&gt;&quot;</span>
<span class="hljs-comment"># }</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.ReleasePartitionsReq;

<span class="hljs-comment">// 7. Release a partition</span>
<span class="hljs-type">ReleasePartitionsReq</span> <span class="hljs-variable">releasePartitionsReq</span> <span class="hljs-operator">=</span> ReleasePartitionsReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionNames(List.of(<span class="hljs-string">&quot;partitionA&quot;</span>))
    .build();

client.releasePartitions(releasePartitionsReq);

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.println(state);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// false</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 7. Release a partition</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">releasePartitions</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;partitionA&quot;</span>]
})

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateNotLoad</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<p>Чтобы освободить несколько разделов одновременно, сделайте следующее:</p>
<pre><code translate="no" class="language-python">client.release_partitions(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_names=[<span class="hljs-string">&quot;_default&quot;</span>, <span class="hljs-string">&quot;partitionA&quot;</span>, <span class="hljs-string">&quot;partitionB&quot;</span>]
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: NotLoad&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Drop-Partitions" class="common-anchor-header">Сбрасывать разделы<button data-href="#Drop-Partitions" class="anchor-icon" translate="no">
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
    </button></h2><p>Освободив раздел, вы можете отказаться от него, если он больше не нужен.</p>
<div class="language-python">
<p>Чтобы удалить раздел, используйте <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Partitions/drop_partition.md"><code translate="no">drop_partition()</code></a>.</p>
</div>
<div class="language-java">
<p>Чтобы удалить раздел, используйте <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Partitions/dropPartition.md"><code translate="no">dropPartition()</code></a>.</p>
</div>
<div class="language-javascript">
<p>Чтобы удалить раздел, используйте <a href="https://milvus.io/api-reference/node/v2.4.x/Partitions/dropPartition.md"><code translate="no">dropPartition()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 8. Drop a partition</span>
client.drop_partition(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionB&quot;</span>
)

res = client.list_partitions(collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [&quot;_default&quot;, &quot;partitionA&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.ReleasePartitionsReq;

<span class="hljs-type">ReleasePartitionsReq</span> <span class="hljs-variable">releasePartitionsReq</span> <span class="hljs-operator">=</span> ReleasePartitionsReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionNames(List.of(<span class="hljs-string">&quot;_default&quot;</span>, <span class="hljs-string">&quot;partitionA&quot;</span>, <span class="hljs-string">&quot;partitionB&quot;</span>))
    .build();

client.releasePartitions(releasePartitionsReq);

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.println(state);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// false</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">releasePartitions</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;_default&quot;</span>, <span class="hljs-string">&quot;partitionA&quot;</span>, <span class="hljs-string">&quot;partitionB&quot;</span>]
})

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//   status: {</span>
<span class="hljs-comment">//     error_code: &#x27;Success&#x27;,</span>
<span class="hljs-comment">//     reason: &#x27;&#x27;,</span>
<span class="hljs-comment">//     code: 0,</span>
<span class="hljs-comment">//     retriable: false,</span>
<span class="hljs-comment">//     detail: &#x27;&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   state: &#x27;LoadStateNotLoad&#x27;</span>
<span class="hljs-comment">// }</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<div class="admonition note">
<p><b>примечания</b></p>
<p>Перед сбросом раздела необходимо освободить его из памяти.</p>
</div>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>Сколько данных можно хранить в разделе?</strong></p>
<p>Рекомендуется хранить в разделе не более 1B данных.</p></li>
<li><p><strong>Какое максимальное количество разделов можно создать?</strong></p>
<p>По умолчанию Milvus позволяет создать не более 1 024 разделов. Максимальное количество разделов можно настроить с помощью параметра <code translate="no">rootCoord.maxPartitionNum</code>. Подробности см. в разделе <a href="https://milvus.io/docs/configure_rootcoord.md#rootCoordmaxPartitionNum">Конфигурации системы</a>.</p></li>
<li><p><strong>Как отличить разделы от ключей разделов?</strong></p>
<p>Разделы - это физические единицы хранения, а ключи разделов - это логические концепции, которые автоматически назначают данные определенным разделам на основе заданного столбца.</p>
<p>Например, в Milvus, если у вас есть коллекция с ключом раздела, определенным как поле <code translate="no">color</code>, система автоматически распределяет данные по разделам на основе хэшированных значений поля <code translate="no">color</code> для каждой сущности. Этот автоматизированный процесс освобождает пользователя от необходимости вручную указывать разделы при вставке или поиске данных.</p>
<p>С другой стороны, при ручном создании разделов необходимо назначить данные каждому разделу на основе критериев ключа раздела. Если у вас есть коллекция с полем <code translate="no">color</code>, вы должны вручную назначить сущности со значением <code translate="no">color</code> <code translate="no">red</code> на <code translate="no">partition A</code>, а сущности со значением <code translate="no">color</code> <code translate="no">blue</code> на <code translate="no">partition B</code>. Такое ручное управление требует больше усилий.</p>
<p>В целом, разделы и ключи разделов используются для оптимизации вычислений данных и повышения эффективности запросов. Важно понимать, что включение ключа раздела означает отказ от контроля над ручным управлением вставкой и загрузкой данных разделов, поскольку эти процессы полностью автоматизированы и выполняются Milvus.</p></li>
</ul>
