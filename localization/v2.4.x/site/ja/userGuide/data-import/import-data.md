---
id: import-data.md
order: 1
title: インポートデータ
summary: このページでは、準備したデータをインポートする手順を示します。
---
<h1 id="Import-data" class="common-anchor-header">データのインポート<button data-href="#Import-data" class="anchor-icon" translate="no">
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
    </button></h1><p>このページでは、準備したデータをインポートする手順を説明します。</p>
<h2 id="Before-you-start" class="common-anchor-header">始める前に<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
<li><p>あなたは既にデータを準備し、Milvusバケットに配置しています。</p>
<p>そうでない場合は、まず<strong>RemoteBulkWriterを</strong>使用してデータを準備し、準備したデータが<strong>Milvus</strong>インスタンスと一緒に起動したMinIOインスタンス上のMilvusバケットに転送済みであることを確認してください。詳細は<a href="/docs/ja/prepare-source-data.md">ソースデータの準備を</a>参照してください。</p></li>
<li><p>データの準備に使用するスキーマでコレクションを作成済みである。そうでない場合は、「<a href="/docs/ja/manage-collections.md">コレクションの管理</a>」を参照してください。</p></li>
</ul>
<div class="language-python">
<p>以下のコード・スニペットは、指定されたスキーマで単純なコレクションを作成します。パラメータの詳細については <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md"><code translate="no">create_schema()</code></a>および <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md"><code translate="no">create_collection()</code></a>を参照してください。</p>
</div>
<div class="language-java">
<p>次のコード・スニペットは、指定されたスキーマで単純なコレクションを作成します。パラメータの詳細については、SDKリファレンスの <a href="https://milvus.io/api-reference/java/v2.4.x/v1/Collection/createCollection.md"><code translate="no">createCollection()</code></a>を参照してください。</p>
</div>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a></div>
<pre><code translate="no" class="language-python">client = MilvusClient(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

schema = MilvusClient.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_field=<span class="hljs-literal">True</span>
)

schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;scalar_1&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;scalar_2&quot;</span>, datatype=DataType.INT64)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    schema=schema
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.client.MilvusServiceClient;
<span class="hljs-keyword">import</span> io.milvus.param.ConnectParam;
<span class="hljs-keyword">import</span> io.milvus.grpc.DataType;
<span class="hljs-keyword">import</span> io.milvus.param.collection.CollectionSchemaParam;
<span class="hljs-keyword">import</span> io.milvus.param.collection.CollectionSchemaParam;
<span class="hljs-keyword">import</span> io.milvus.param.collection.FieldType;

<span class="hljs-keyword">final</span> <span class="hljs-type">MilvusServiceClient</span> <span class="hljs-variable">milvusClient</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusServiceClient</span>(
ConnectParam.newBuilder()
    .withUri(<span class="hljs-string">&quot;localhost:19530&quot;</span>)
    .withToken(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
    .build()
);

<span class="hljs-comment">// Define schema for the target collection</span>
<span class="hljs-type">FieldType</span> <span class="hljs-variable">id</span> <span class="hljs-operator">=</span> FieldType.newBuilder()
    .withName(<span class="hljs-string">&quot;id&quot;</span>)
    .withDataType(DataType.Int64)
    .withPrimaryKey(<span class="hljs-literal">true</span>)
    .withAutoID(<span class="hljs-literal">false</span>)
    .build();

<span class="hljs-type">FieldType</span> <span class="hljs-variable">vector</span> <span class="hljs-operator">=</span> FieldType.newBuilder()
    .withName(<span class="hljs-string">&quot;vector&quot;</span>)
    .withDataType(DataType.FloatVector)
    .withDimension(<span class="hljs-number">768</span>)
    .build();

<span class="hljs-type">FieldType</span> <span class="hljs-variable">scalar1</span> <span class="hljs-operator">=</span> FieldType.newBuilder()
    .withName(<span class="hljs-string">&quot;scalar_1&quot;</span>)
    .withDataType(DataType.VarChar)
    .withMaxLength(<span class="hljs-number">512</span>)
    .build();

<span class="hljs-type">FieldType</span> <span class="hljs-variable">scalar2</span> <span class="hljs-operator">=</span> FieldType.newBuilder()
    .withName(<span class="hljs-string">&quot;scalar_2&quot;</span>)
    .withDataType(DataType.Int64)
    .build();

<span class="hljs-type">CollectionSchemaParam</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CollectionSchemaParam.newBuilder()
    .withEnableDynamicField(<span class="hljs-literal">true</span>)
    .addFieldType(id)
    .addFieldType(vector)
    .addFieldType(scalar1)
    .addFieldType(scalar2)
    .build();

<span class="hljs-comment">// Create a collection with the given schema</span>
milvusClient.createCollection(CreateCollectionParam.newBuilder()
    .withCollectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .withSchema(schema)
    .build()
);
<button class="copy-code-btn"></button></code></pre>
<h2 id="Import-data" class="common-anchor-header">データのインポート<button data-href="#Import-data" class="anchor-icon" translate="no">
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
    </button></h2><p>準備されたデータをインポートするには、以下のようにインポートジョブを作成する必要があります：</p>
<pre><code translate="no"><span class="hljs-built_in">export</span> MILVUS_URI=<span class="hljs-string">&quot;localhost:19530&quot;</span>

curl --request POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/jobs/import/create&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data-raw <span class="hljs-string">&#x27;{
    &quot;files&quot;: [
        [
            &quot;/8ca44f28-47f7-40ba-9604-98918afe26d1/1.parquet&quot;
        ],
        [
            &quot;/8ca44f28-47f7-40ba-9604-98918afe26d1/2.parquet&quot;
        ]
    ],
    &quot;collectionName&quot;: &quot;quick_setup&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>リクエストボディには2つのフィールドがあります：</p>
<ul>
<li><p><code translate="no">collectionName</code></p>
<p>ターゲットコレクションの名前。</p></li>
<li><p><code translate="no">files</code></p>
<p>Milvusインスタンスと共に起動されたMioIOインスタンス上のMilvusバケットのルートパスからの相対的なファイルパスのリスト。可能なサブリストは以下の通りです：</p>
<ul>
<li><p><strong>JSONファイル</strong></p>
<p>準備されたファイルがJSON形式の場合、<strong>各サブリストには準備されたJSONファイル1つのパスが含まれる</strong>。</p>
<pre><code translate="no">[
    <span class="hljs-string">&quot;/d1782fa1-6b65-4ff3-b05a-43a436342445/1.json&quot;</span>
],
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Parquetファイル</strong></p>
<p>準備されたファイルがParquet形式の場合、<strong>各サブリストは準備された1つのParquetファイルへのパスを含む必要が</strong>あります。</p>
<pre><code translate="no">[
    <span class="hljs-string">&quot;/a6fb2d1c-7b1b-427c-a8a3-178944e3b66d/1.parquet&quot;</span>
]

<button class="copy-code-btn"></button></code></pre></li>
</ul></li>
</ul>
<p>返り値は以下のようになります：</p>
<pre><code translate="no">{
    <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
    <span class="hljs-string">&quot;data&quot;</span>: {
        <span class="hljs-string">&quot;jobId&quot;</span>: <span class="hljs-string">&quot;448707763884413158&quot;</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Check-import-progress" class="common-anchor-header">インポートの進行状況の確認<button data-href="#Check-import-progress" class="anchor-icon" translate="no">
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
    </button></h2><p>インポート・ジョブIDを取得したら、以下のようにしてインポートの進捗状況を確認できます：</p>
<pre><code translate="no"><span class="hljs-built_in">export</span> MILVUS_URI=<span class="hljs-string">&quot;localhost:19530&quot;</span>

curl --request POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/jobs/import/get_progress&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data-raw <span class="hljs-string">&#x27;{
    &quot;jobId&quot;: &quot;449839014328146739&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>可能な応答は以下のとおりです：</p>
<pre><code translate="no">{
    <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
    <span class="hljs-string">&quot;data&quot;</span>: {
        <span class="hljs-string">&quot;collectionName&quot;</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
        <span class="hljs-string">&quot;completeTime&quot;</span>: <span class="hljs-string">&quot;2024-05-18T02:57:13Z&quot;</span>,
        <span class="hljs-string">&quot;details&quot;</span>: [
            {
                <span class="hljs-string">&quot;completeTime&quot;</span>: <span class="hljs-string">&quot;2024-05-18T02:57:11Z&quot;</span>,
                <span class="hljs-string">&quot;fileName&quot;</span>: <span class="hljs-string">&quot;id:449839014328146740 paths:\&quot;/8ca44f28-47f7-40ba-9604-98918afe26d1/1.parquet\&quot; &quot;</span>,
                <span class="hljs-string">&quot;fileSize&quot;</span>: <span class="hljs-number">31567874</span>,
                <span class="hljs-string">&quot;importedRows&quot;</span>: <span class="hljs-number">100000</span>,
                <span class="hljs-string">&quot;progress&quot;</span>: <span class="hljs-number">100</span>,
                <span class="hljs-string">&quot;state&quot;</span>: <span class="hljs-string">&quot;Completed&quot;</span>,
                <span class="hljs-string">&quot;totalRows&quot;</span>: <span class="hljs-number">100000</span>
            },
            {
                <span class="hljs-string">&quot;completeTime&quot;</span>: <span class="hljs-string">&quot;2024-05-18T02:57:11Z&quot;</span>,
                <span class="hljs-string">&quot;fileName&quot;</span>: <span class="hljs-string">&quot;id:449839014328146741 paths:\&quot;/8ca44f28-47f7-40ba-9604-98918afe26d1/2.parquet\&quot; &quot;</span>,
                <span class="hljs-string">&quot;fileSize&quot;</span>: <span class="hljs-number">31517224</span>,
                <span class="hljs-string">&quot;importedRows&quot;</span>: <span class="hljs-number">100000</span>,
                <span class="hljs-string">&quot;progress&quot;</span>: <span class="hljs-number">100</span>,
                <span class="hljs-string">&quot;state&quot;</span>: <span class="hljs-string">&quot;Completed&quot;</span>,
                <span class="hljs-string">&quot;totalRows&quot;</span>: <span class="hljs-number">200000</span>            
            }
        ],
        <span class="hljs-string">&quot;fileSize&quot;</span>: <span class="hljs-number">63085098</span>,
        <span class="hljs-string">&quot;importedRows&quot;</span>: <span class="hljs-number">200000</span>,
        <span class="hljs-string">&quot;jobId&quot;</span>: <span class="hljs-string">&quot;449839014328146739&quot;</span>,
        <span class="hljs-string">&quot;progress&quot;</span>: <span class="hljs-number">100</span>,
        <span class="hljs-string">&quot;state&quot;</span>: <span class="hljs-string">&quot;Completed&quot;</span>,
        <span class="hljs-string">&quot;totalRows&quot;</span>: <span class="hljs-number">200000</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="List-Import-Jobs" class="common-anchor-header">インポート・ジョブの一覧表示<button data-href="#List-Import-Jobs" class="anchor-icon" translate="no">
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
    </button></h2><p>次のように、特定のコレクションに関連するすべてのインポートジョブをリストできます：</p>
<pre><code translate="no"><span class="hljs-built_in">export</span> MILVUS_URI=<span class="hljs-string">&quot;localhost:19530&quot;</span>

curl --request POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/jobs/import/list&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data-raw <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;quick_setup&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>可能な値は以下のとおりです：</p>
<pre><code translate="no">{
    <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
    <span class="hljs-string">&quot;data&quot;</span>: {
        <span class="hljs-string">&quot;records&quot;</span>: [
            {
                <span class="hljs-string">&quot;collectionName&quot;</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
                <span class="hljs-string">&quot;jobId&quot;</span>: <span class="hljs-string">&quot;448761313698322011&quot;</span>,
                <span class="hljs-string">&quot;progress&quot;</span>: <span class="hljs-number">50</span>,
                <span class="hljs-string">&quot;state&quot;</span>: <span class="hljs-string">&quot;Importing&quot;</span>
            }
        ]
    }
}
<button class="copy-code-btn"></button></code></pre>
