---
id: import-data.md
order: 1
title: Daten importieren
summary: >-
  Auf dieser Seite wird das Verfahren zum Importieren der vorbereiteten Daten
  erläutert.
---
<h1 id="Import-data" class="common-anchor-header">Daten importieren<button data-href="#Import-data" class="anchor-icon" translate="no">
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
    </button></h1><p>Auf dieser Seite wird das Verfahren zum Importieren der vorbereiteten Daten beschrieben.</p>
<h2 id="Before-you-start" class="common-anchor-header">Bevor Sie beginnen<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
<li><p>Sie haben Ihre Daten bereits vorbereitet und in den Milvus-Bucket gelegt.</p>
<p>Falls nicht, sollten Sie zuerst <strong>RemoteBulkWriter</strong> verwenden, um Ihre Daten vorzubereiten, und sicherstellen, dass die vorbereiteten Daten bereits in den Milvus-Bucket der MinIO-Instanz übertragen wurden, die zusammen mit Ihrer Milvus-Instanz gestartet wurde. Details hierzu finden Sie unter <a href="/docs/de/prepare-source-data.md">Quelldaten vorbereiten</a>.</p></li>
<li><p>Sie haben bereits eine Sammlung mit dem Schema erstellt, das Sie zur Vorbereitung Ihrer Daten verwenden. Falls nicht, lesen Sie bitte den Abschnitt <a href="/docs/de/manage-collections.md">Verwalten von Sammlungen</a>.</p></li>
</ul>
<div class="language-python">
<p>Das folgende Code-Snippet erstellt eine einfache Sammlung mit dem angegebenen Schema. Weitere Informationen zu Parametern finden Sie unter <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md"><code translate="no">create_schema()</code></a> und <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md"><code translate="no">create_collection()</code></a> in der SDK-Referenz.</p>
</div>
<div class="language-java">
<p>Das folgende Codeschnipsel erstellt eine einfache Sammlung mit dem angegebenen Schema. Weitere Informationen zu den Parametern finden Sie unter <a href="https://milvus.io/api-reference/java/v2.4.x/v1/Collection/createCollection.md"><code translate="no">createCollection()</code></a> in der SDK-Referenz.</p>
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
<h2 id="Import-data" class="common-anchor-header">Daten importieren<button data-href="#Import-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Um die vorbereiteten Daten zu importieren, müssen Sie einen Importauftrag wie folgt erstellen:</p>
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
<p>Der Anfragekörper enthält zwei Felder:</p>
<ul>
<li><p><code translate="no">collectionName</code></p>
<p>Den Namen der Zielsammlung.</p></li>
<li><p><code translate="no">files</code></p>
<p>Eine Liste mit Listen von Dateipfaden relativ zum Stammverzeichnis des Milvus-Buckets auf der MioIO-Instanz, die zusammen mit Ihrer Milvus-Instanz gestartet wurde. Mögliche Unterlisten sind folgende:</p>
<ul>
<li><p><strong>JSON-Dateien</strong></p>
<p>Wenn die vorbereitete Datei im JSON-Format vorliegt, <strong>sollte jede Unterliste den Pfad zu einer einzelnen vorbereiteten JSON-Datei enthalten</strong>.</p>
<pre><code translate="no">[
    <span class="hljs-string">&quot;/d1782fa1-6b65-4ff3-b05a-43a436342445/1.json&quot;</span>
],
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Parquet-Dateien</strong></p>
<p>Wenn die vorbereitete Datei im Parquet-Format vorliegt, <strong>sollte jede Teilliste den Pfad zu einer einzelnen vorbereiteten Parquet-Datei enthalten</strong>.</p>
<pre><code translate="no">[
    <span class="hljs-string">&quot;/a6fb2d1c-7b1b-427c-a8a3-178944e3b66d/1.parquet&quot;</span>
]

<button class="copy-code-btn"></button></code></pre></li>
</ul></li>
</ul>
<p>Die mögliche Rückgabe ist wie folgt:</p>
<pre><code translate="no">{
    <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
    <span class="hljs-string">&quot;data&quot;</span>: {
        <span class="hljs-string">&quot;jobId&quot;</span>: <span class="hljs-string">&quot;448707763884413158&quot;</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Check-import-progress" class="common-anchor-header">Importfortschritt prüfen<button data-href="#Check-import-progress" class="anchor-icon" translate="no">
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
    </button></h2><p>Sobald Sie eine Importauftrags-ID erhalten haben, können Sie den Importfortschritt wie folgt überprüfen:</p>
<pre><code translate="no"><span class="hljs-built_in">export</span> MILVUS_URI=<span class="hljs-string">&quot;localhost:19530&quot;</span>

curl --request POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/jobs/import/get_progress&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data-raw <span class="hljs-string">&#x27;{
    &quot;jobId&quot;: &quot;449839014328146739&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Die mögliche Antwort lautet wie folgt:</p>
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
<h2 id="List-Import-Jobs" class="common-anchor-header">Importaufträge auflisten<button data-href="#List-Import-Jobs" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können alle Importaufträge in Bezug auf eine bestimmte Sammlung wie folgt auflisten:</p>
<pre><code translate="no"><span class="hljs-built_in">export</span> MILVUS_URI=<span class="hljs-string">&quot;localhost:19530&quot;</span>

curl --request POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/jobs/import/list&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data-raw <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;quick_setup&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Die möglichen Werte sind wie folgt:</p>
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
