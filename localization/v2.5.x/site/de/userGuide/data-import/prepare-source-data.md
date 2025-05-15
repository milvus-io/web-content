---
id: prepare-source-data.md
order: 0
title: Quelldaten vorbereiten
summary: >-
  Auf dieser Seite geht es um etwas, das Sie bedenken sollten, bevor Sie mit der
  Masseneintragung von Daten in Ihre Sammlung beginnen.
---
<h1 id="Prepare-Source-Data" class="common-anchor-header">Quelldaten vorbereiten<button data-href="#Prepare-Source-Data" class="anchor-icon" translate="no">
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
    </button></h1><p>Auf dieser Seite werden einige Punkte behandelt, die Sie beachten sollten, bevor Sie mit dem Einfügen von Daten in Ihre Sammlung beginnen.</p>
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
    </button></h2><p>Die Zielsammlung erfordert eine Zuordnung der Quelldaten zu ihrem Schema. Das folgende Diagramm zeigt, wie akzeptable Quelldaten auf das Schema einer Zielsammlung abgebildet werden.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/map-data-to-schema.png" alt="Map data to schema" class="doc-image" id="map-data-to-schema" />
   </span> <span class="img-wrapper"> <span>Zuordnen von Daten zum Schema</span> </span></p>
<p>Sie sollten Ihre Daten sorgfältig prüfen und das Schema der Zielsammlung entsprechend gestalten.</p>
<p>Nehmen wir die JSON-Daten im obigen Diagramm als Beispiel: Es gibt zwei Entitäten in der Zeilenliste, wobei jede Zeile sechs Felder hat. Das Schema der Sammlung enthält selektiv vier: <strong>id</strong>, <strong>vector</strong>, <strong>scalar_1</strong> und <strong>scalar_2</strong>.</p>
<p>Beim Entwurf des Schemas sind noch zwei weitere Dinge zu berücksichtigen:</p>
<ul>
<li><p><strong>Ob AutoID aktiviert werden soll.</strong></p>
<p>Das Feld <strong>id</strong> dient als Primärfeld der Sammlung. Um das Primärfeld automatisch zu inkrementieren, können Sie <strong>AutoID</strong> im Schema aktivieren. In diesem Fall sollten Sie das <strong>id-Feld</strong> aus jeder Zeile der Quelldaten ausschließen.</p></li>
<li><p><strong>Dynamische Felder aktivieren</strong></p>
<p>Die Zielsammlung kann auch Felder speichern, die nicht in ihrem vordefinierten Schema enthalten sind, wenn das Schema dynamische Felder zulässt. Das <strong>$meta-Feld</strong> ist ein reserviertes JSON-Feld, um dynamische Felder und ihre Werte in Schlüssel-Wert-Paaren zu speichern. Im obigen Diagramm werden die Felder <strong>dynamic_field_1</strong> und <strong>dynamic_field_2</strong> und die Werte als Schlüssel-Wert-Paare im <strong>$meta-Feld</strong> gespeichert.</p></li>
</ul>
<p>Der folgende Code zeigt, wie Sie das Schema für die im obigen Diagramm dargestellte Sammlung einrichten.</p>
<div class="language-python">
<p>Weitere Informationen finden Sie unter <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md"><code translate="no">create_schema()</code></a> und <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md"><code translate="no">add_field()</code></a> in der SDK-Referenz.</p>
</div>
<div class="language-java">
<p>Um weitere Informationen zu erhalten, siehe <a href="https://milvus.io/api-reference/java/v2.4.x/v2/CollectionSchema/CollectionSchema.md"><code translate="no">CollectionSchema</code></a> in der SDK-Referenz.</p>
</div>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># You need to work out a collection schema out of your dataset.</span>
schema = MilvusClient.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_field=<span class="hljs-literal">True</span>
)

DIM = <span class="hljs-number">512</span>

schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
schema.add_field(field_name=<span class="hljs-string">&quot;bool&quot;</span>, datatype=DataType.BOOL),
schema.add_field(field_name=<span class="hljs-string">&quot;int8&quot;</span>, datatype=DataType.INT8),
schema.add_field(field_name=<span class="hljs-string">&quot;int16&quot;</span>, datatype=DataType.INT16),
schema.add_field(field_name=<span class="hljs-string">&quot;int32&quot;</span>, datatype=DataType.INT32),
schema.add_field(field_name=<span class="hljs-string">&quot;int64&quot;</span>, datatype=DataType.INT64),
schema.add_field(field_name=<span class="hljs-string">&quot;float&quot;</span>, datatype=DataType.FLOAT),
schema.add_field(field_name=<span class="hljs-string">&quot;double&quot;</span>, datatype=DataType.DOUBLE),
schema.add_field(field_name=<span class="hljs-string">&quot;varchar&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">512</span>),
schema.add_field(field_name=<span class="hljs-string">&quot;json&quot;</span>, datatype=DataType.JSON),
schema.add_field(field_name=<span class="hljs-string">&quot;array_str&quot;</span>, datatype=DataType.ARRAY, max_capacity=<span class="hljs-number">100</span>, element_type=DataType.VARCHAR, max_length=<span class="hljs-number">128</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;array_int&quot;</span>, datatype=DataType.ARRAY, max_capacity=<span class="hljs-number">100</span>, element_type=DataType.INT64)
schema.add_field(field_name=<span class="hljs-string">&quot;float_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=DIM),
schema.add_field(field_name=<span class="hljs-string">&quot;binary_vector&quot;</span>, datatype=DataType.BINARY_VECTOR, dim=DIM),
schema.add_field(field_name=<span class="hljs-string">&quot;float16_vector&quot;</span>, datatype=DataType.FLOAT16_VECTOR, dim=DIM),
<span class="hljs-comment"># schema.add_field(field_name=&quot;bfloat16_vector&quot;, datatype=DataType.BFLOAT16_VECTOR, dim=DIM),</span>
schema.add_field(field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)

schema.verify()

<span class="hljs-built_in">print</span>(schema)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.bulkwriter.BulkImport;
<span class="hljs-keyword">import</span> io.milvus.bulkwriter.RemoteBulkWriter;
<span class="hljs-keyword">import</span> io.milvus.bulkwriter.RemoteBulkWriterParam;
<span class="hljs-keyword">import</span> io.milvus.bulkwriter.common.clientenum.BulkFileType;
<span class="hljs-keyword">import</span> io.milvus.bulkwriter.common.clientenum.CloudStorage;
<span class="hljs-keyword">import</span> io.milvus.bulkwriter.connect.S3ConnectParam;
<span class="hljs-keyword">import</span> io.milvus.bulkwriter.connect.StorageConnectParam;
<span class="hljs-keyword">import</span> io.milvus.bulkwriter.request.describe.MilvusDescribeImportRequest;
<span class="hljs-keyword">import</span> io.milvus.bulkwriter.request.import_.MilvusImportRequest;
<span class="hljs-keyword">import</span> io.milvus.bulkwriter.request.list.MilvusListImportJobsRequest;
<span class="hljs-keyword">import</span> io.milvus.common.utils.Float16Utils;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.*;

<span class="hljs-keyword">import</span> java.io.IOException;
<span class="hljs-keyword">import</span> java.nio.ByteBuffer;
<span class="hljs-keyword">import</span> java.util.*;
<span class="hljs-keyword">import</span> java.util.concurrent.TimeUnit;

<span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">final</span> <span class="hljs-type">String</span> <span class="hljs-variable">MINIO_ENDPOINT</span> <span class="hljs-operator">=</span> CloudStorage.MINIO.getEndpoint(<span class="hljs-string">&quot;http://127.0.0.1:9000&quot;</span>);
<span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">final</span> <span class="hljs-type">String</span> <span class="hljs-variable">BUCKET_NAME</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;a-bucket&quot;</span>;
<span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">final</span> <span class="hljs-type">String</span> <span class="hljs-variable">ACCESS_KEY</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;minioadmin&quot;</span>;
<span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">final</span> <span class="hljs-type">String</span> <span class="hljs-variable">SECRET_KEY</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;minioadmin&quot;</span>;

<span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">final</span> <span class="hljs-type">Integer</span> <span class="hljs-variable">DIM</span> <span class="hljs-operator">=</span> <span class="hljs-number">512</span>;
<span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">final</span> <span class="hljs-type">Gson</span> <span class="hljs-variable">GSON_INSTANCE</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();

<span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> CreateCollectionReq.CollectionSchema <span class="hljs-title function_">createSchema</span><span class="hljs-params">()</span> {
    CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .enableDynamicField(<span class="hljs-literal">true</span>)
        .build();
    schema.addField(AddFieldReq.builder()
            .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
            .dataType(io.milvus.v2.common.DataType.Int64)
            .isPrimaryKey(Boolean.TRUE)
            .autoID(<span class="hljs-literal">false</span>)
            .build());
    schema.addField(AddFieldReq.builder()
            .fieldName(<span class="hljs-string">&quot;bool&quot;</span>)
            .dataType(DataType.Bool)
            .build());
    schema.addField(AddFieldReq.builder()
            .fieldName(<span class="hljs-string">&quot;int8&quot;</span>)
            .dataType(DataType.Int8)
            .build());
    schema.addField(AddFieldReq.builder()
            .fieldName(<span class="hljs-string">&quot;int16&quot;</span>)
            .dataType(DataType.Int16)
            .build());
    schema.addField(AddFieldReq.builder()
            .fieldName(<span class="hljs-string">&quot;int32&quot;</span>)
            .dataType(DataType.Int32)
            .build());
    schema.addField(AddFieldReq.builder()
            .fieldName(<span class="hljs-string">&quot;int64&quot;</span>)
            .dataType(DataType.Int64)
            .build());
    schema.addField(AddFieldReq.builder()
            .fieldName(<span class="hljs-string">&quot;float&quot;</span>)
            .dataType(DataType.Float)
            .build());
    schema.addField(AddFieldReq.builder()
            .fieldName(<span class="hljs-string">&quot;double&quot;</span>)
            .dataType(DataType.Double)
            .build());
    schema.addField(AddFieldReq.builder()
            .fieldName(<span class="hljs-string">&quot;varchar&quot;</span>)
            .dataType(DataType.VarChar)
            .maxLength(<span class="hljs-number">512</span>)
            .build());
    schema.addField(AddFieldReq.builder()
            .fieldName(<span class="hljs-string">&quot;json&quot;</span>)
            .dataType(io.milvus.v2.common.DataType.JSON)
            .build());
    schema.addField(AddFieldReq.builder()
            .fieldName(<span class="hljs-string">&quot;array_int&quot;</span>)
            .dataType(io.milvus.v2.common.DataType.Array)
            .maxCapacity(<span class="hljs-number">100</span>)
            .elementType(io.milvus.v2.common.DataType.Int64)
            .build());
    schema.addField(AddFieldReq.builder()
            .fieldName(<span class="hljs-string">&quot;array_str&quot;</span>)
            .dataType(io.milvus.v2.common.DataType.Array)
            .maxCapacity(<span class="hljs-number">100</span>)
            .elementType(io.milvus.v2.common.DataType.VarChar)
            .maxLength(<span class="hljs-number">128</span>)
            .build());
    schema.addField(AddFieldReq.builder()
            .fieldName(<span class="hljs-string">&quot;float_vector&quot;</span>)
            .dataType(io.milvus.v2.common.DataType.FloatVector)
            .dimension(DIM)
            .build());
    schema.addField(AddFieldReq.builder()
            .fieldName(<span class="hljs-string">&quot;binary_vector&quot;</span>)
            .dataType(io.milvus.v2.common.DataType.BinaryVector)
            .dimension(DIM)
            .build());
    schema.addField(AddFieldReq.builder()
            .fieldName(<span class="hljs-string">&quot;float16_vector&quot;</span>)
            .dataType(io.milvus.v2.common.DataType.Float16Vector)
            .dimension(DIM)
            .build());
    schema.addField(AddFieldReq.builder()
            .fieldName(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
            .dataType(io.milvus.v2.common.DataType.SparseFloatVector)
            .build());
    
    <span class="hljs-keyword">return</span> schema;
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-up-BulkWriter" class="common-anchor-header">BulkWriter einrichten<button data-href="#Set-up-BulkWriter" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>BulkWriter</strong> ist ein Tool zur Konvertierung von Rohdatensätzen in ein Format, das für den Import über die RESTful Import API geeignet ist. Es bietet zwei Arten von Writern:</p>
<ul>
<li><strong>LocalBulkWriter</strong>: Liest den angegebenen Datensatz und wandelt ihn in ein einfach zu verwendendes Format um.</li>
<li><strong>RemoteBulkWriter</strong>: Führt dieselbe Aufgabe wie der LocalBulkWriter aus, überträgt die konvertierten Datendateien jedoch zusätzlich in einen angegebenen Remote Object Storage Bucket.</li>
</ul>
<p><strong>RemoteBulkWriter</strong> unterscheidet sich von <strong>LocalBulkWriter</strong> dadurch, dass <strong>RemoteBulkWriter</strong> die konvertierten Datendateien in einen Zielobjektspeicherbereich überträgt.</p>
<h3 id="Set-up-LocalBulkWriter" class="common-anchor-header">LocalBulkWriter einrichten</h3><p>Ein <strong>LocalBulkWriter</strong> fügt Zeilen aus dem Quelldatensatz an und überträgt sie in eine lokale Datei des angegebenen Formats.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.bulk_writer <span class="hljs-keyword">import</span> LocalBulkWriter, BulkFileType
<span class="hljs-comment"># Use `from pymilvus import LocalBulkWriter, BulkFileType` </span>
<span class="hljs-comment"># when you use pymilvus earlier than 2.4.2 </span>

writer = LocalBulkWriter(
    schema=schema,
    local_path=<span class="hljs-string">&#x27;.&#x27;</span>,
    segment_size=<span class="hljs-number">512</span> * <span class="hljs-number">1024</span> * <span class="hljs-number">1024</span>, <span class="hljs-comment"># Default value</span>
    file_type=BulkFileType.PARQUET
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.bulkwriter.LocalBulkWriter;
<span class="hljs-keyword">import</span> io.milvus.bulkwriter.LocalBulkWriterParam;
<span class="hljs-keyword">import</span> io.milvus.bulkwriter.common.clientenum.BulkFileType;

<span class="hljs-type">LocalBulkWriterParam</span> <span class="hljs-variable">localBulkWriterParam</span> <span class="hljs-operator">=</span> LocalBulkWriterParam.newBuilder()
    .withCollectionSchema(schema)
    .withLocalPath(<span class="hljs-string">&quot;.&quot;</span>)
    .withChunkSize(<span class="hljs-number">512</span> * <span class="hljs-number">1024</span> * <span class="hljs-number">1024</span>)
    .withFileType(BulkFileType.PARQUET)
    .build();

<span class="hljs-type">LocalBulkWriter</span> <span class="hljs-variable">localBulkWriter</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">LocalBulkWriter</span>(localBulkWriterParam);
<button class="copy-code-btn"></button></code></pre>
<div class="language-python">
<p>Wenn Sie einen <strong>LocalBulkWriter</strong> erstellen, sollten Sie:</p>
<ul>
<li>Verweisen Sie auf das erstellte Schema in <code translate="no">schema</code>.</li>
<li>Setzen Sie <code translate="no">local_path</code> auf das Ausgabeverzeichnis.</li>
<li>Setzen Sie <code translate="no">file_type</code> auf den Ausgabedateityp.</li>
<li>Wenn Ihr Datensatz eine große Anzahl von Datensätzen enthält, sollten Sie Ihre Daten segmentieren, indem Sie <code translate="no">segment_size</code> auf einen geeigneten Wert setzen.</li>
</ul>
<p>Einzelheiten zu den Parametereinstellungen finden Sie unter <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/DataImport/LocalBulkWriter/LocalBulkWriter.md">LocalBulkWriter</a> in der SDK-Referenz.</p>
</div>
<div class="language-java">
<p>Wenn Sie einen <strong>LocalBulkWriter</strong> erstellen, sollten Sie:</p>
<ul>
<li>Verweisen Sie auf das erstellte Schema in <code translate="no">CollectionSchema()</code>.</li>
<li>Legen Sie das Ausgabeverzeichnis in <code translate="no">withLocalPath()</code> fest.</li>
<li>Legen Sie den Ausgabedateityp in <code translate="no">withFileType()</code> fest.</li>
<li>Wenn Ihr Datensatz eine große Anzahl von Datensätzen enthält, empfiehlt es sich, Ihre Daten zu segmentieren, indem Sie <code translate="no">withChunkSize()</code> auf einen geeigneten Wert einstellen.</li>
</ul>
<p>Einzelheiten zu den Parametereinstellungen finden Sie unter LocalBulkWriter in der SDK-Referenz.</p>
</div>
<h3 id="Set-up-RemoteBulkWriter" class="common-anchor-header">RemoteBulkWriter einrichten</h3><p>Anstatt angehängte Daten in eine lokale Datei zu übertragen, überträgt ein <strong>RemoteBulkWriter</strong> sie in einen entfernten Bucket. Daher sollten Sie ein <strong>ConnectParam-Objekt</strong> einrichten, bevor Sie einen <strong>RemoteBulkWriter</strong> erstellen.</p>
<div class="multipleCode">
 <a href="#java">Python-Java</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.bulk_writer <span class="hljs-keyword">import</span> RemoteBulkWriter
<span class="hljs-comment"># Use `from pymilvus import RemoteBulkWriter` </span>
<span class="hljs-comment"># when you use pymilvus earlier than 2.4.2 </span>

<span class="hljs-comment"># Third-party constants</span>
ACCESS_KEY=<span class="hljs-string">&quot;minioadmin&quot;</span>
SECRET_KEY=<span class="hljs-string">&quot;minioadmin&quot;</span>
BUCKET_NAME=<span class="hljs-string">&quot;a-bucket&quot;</span>

<span class="hljs-comment"># Connections parameters to access the remote bucket</span>
conn = RemoteBulkWriter.S3ConnectParam(
    endpoint=<span class="hljs-string">&quot;localhost:9000&quot;</span>, <span class="hljs-comment"># the default MinIO service started along with Milvus</span>
    access_key=ACCESS_KEY,
    secret_key=SECRET_KEY,
    bucket_name=BUCKET_NAME,
    secure=<span class="hljs-literal">False</span>
)

<span class="hljs-keyword">from</span> pymilvus.bulk_writer <span class="hljs-keyword">import</span> BulkFileType
<span class="hljs-comment"># Use `from pymilvus import BulkFileType` </span>
<span class="hljs-comment"># when you use pymilvus earlier than 2.4.2 </span>

writer = RemoteBulkWriter(
    schema=schema,
    remote_path=<span class="hljs-string">&quot;/&quot;</span>,
    connect_param=conn,
    file_type=BulkFileType.PARQUET
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;bulk writer created.&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> RemoteBulkWriter <span class="hljs-title function_">createRemoteBulkWriter</span><span class="hljs-params">(CreateCollectionReq.CollectionSchema collectionSchema)</span> <span class="hljs-keyword">throws</span> IOException {
    <span class="hljs-type">StorageConnectParam</span> <span class="hljs-variable">connectParam</span> <span class="hljs-operator">=</span> S3ConnectParam.newBuilder()
            .withEndpoint(MINIO_ENDPOINT)
            .withBucketName(BUCKET_NAME)
            .withAccessKey(ACCESS_KEY)
            .withSecretKey(SECRET_KEY)
            .build();
    <span class="hljs-type">RemoteBulkWriterParam</span> <span class="hljs-variable">bulkWriterParam</span> <span class="hljs-operator">=</span> RemoteBulkWriterParam.newBuilder()
            .withCollectionSchema(collectionSchema)
            .withRemotePath(<span class="hljs-string">&quot;/&quot;</span>)
            .withConnectParam(connectParam)
            .withFileType(BulkFileType.PARQUET)
            .build();
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RemoteBulkWriter</span>(bulkWriterParam);
}
<button class="copy-code-btn"></button></code></pre>
<p>Sobald die Verbindungsparameter fertig sind, kann man sie im <strong>RemoteBulkWriter</strong> wie folgt referenzieren:</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.bulk_writer <span class="hljs-keyword">import</span> BulkFileType
<span class="hljs-comment"># Use `from pymilvus import BulkFileType` </span>
<span class="hljs-comment"># when you use pymilvus earlier than 2.4.2 </span>

writer = RemoteBulkWriter(
    schema=schema,
    remote_path=<span class="hljs-string">&quot;/&quot;</span>,
    connect_param=conn,
    file_type=BulkFileType.PARQUET
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.bulkwriter.RemoteBulkWriter;
<span class="hljs-keyword">import</span> io.milvus.bulkwriter.RemoteBulkWriterParam;

<span class="hljs-type">RemoteBulkWriterParam</span> <span class="hljs-variable">remoteBulkWriterParam</span> <span class="hljs-operator">=</span> RemoteBulkWriterParam.newBuilder()
    .withCollectionSchema(schema)
    .withConnectParam(storageConnectParam)
    .withChunkSize(<span class="hljs-number">512</span> * <span class="hljs-number">1024</span> * <span class="hljs-number">1024</span>)
    .withRemotePath(<span class="hljs-string">&quot;/&quot;</span>)
    .withFileType(BulkFileType.PARQUET)
    .build();

<span class="hljs-type">RemoteBulkWriter</span> <span class="hljs-variable">remoteBulkWriter</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RemoteBulkWriter</span>(remoteBulkWriterParam);
<button class="copy-code-btn"></button></code></pre>
<div class="language-python">
<p>Die Parameter für die Erstellung eines <strong>RemoteBulkWriters</strong> sind fast dieselben wie die für einen <strong>LocalBulkWriter</strong>, mit Ausnahme von <code translate="no">connect_param</code>. Details zu den Parametereinstellungen finden Sie unter <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/DataImport/RemoteBulkWriter/RemoteBulkWriter.md">RemoteBulkWriter</a> und <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/DataImport/RemoteBulkWriter/S3ConnectParam.md">ConnectParam</a> in der SDK-Referenz.</p>
</div>
<div class="language-java">
<p>Die Parameter für die Erstellung eines <strong>RemoteBulkWriters</strong> sind fast die gleichen wie die für einen <strong>LocalBulkWriter</strong>, außer <code translate="no">StorageConnectParam</code>. Einzelheiten zu den Parametereinstellungen finden Sie unter RemoteBulkWriter und StorageConnectParam in der SDK-Referenz.</p>
</div>
<h2 id="Start-writing" class="common-anchor-header">Schreiben starten<button data-href="#Start-writing" class="anchor-icon" translate="no">
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
    </button></h2><div class="language-python">
<p>Ein <strong>BulkWriter</strong> hat zwei Methoden: <code translate="no">append_row()</code> fügt eine Zeile aus einem Quelldatensatz hinzu, und <code translate="no">commit()</code> überträgt hinzugefügte Zeilen in eine lokale Datei oder einen Remote-Bucket.</p>
</div>
<div class="language-java">
<p>Ein <strong>BulkWriter</strong> hat zwei Methoden: <code translate="no">appendRow()</code> fügt eine Zeile aus einem Quelldatensatz hinzu, und <code translate="no">commit()</code> überträgt hinzugefügte Zeilen in eine lokale Datei oder einen Remote-Bucket.</p>
</div>
<p>Zu Demonstrationszwecken fügt der folgende Code zufällig generierte Daten hinzu.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random, string, json
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
<span class="hljs-keyword">import</span> tensorflow <span class="hljs-keyword">as</span> tf

<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_random_str</span>(<span class="hljs-params">length=<span class="hljs-number">5</span></span>):
    letters = string.ascii_uppercase
    digits = string.digits
    
    <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;&#x27;</span>.join(random.choices(letters + digits, k=length))

<span class="hljs-comment"># optional input for binary vector:</span>
<span class="hljs-comment"># 1. list of int such as [1, 0, 1, 1, 0, 0, 1, 0]</span>
<span class="hljs-comment"># 2. numpy array of uint8</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">gen_binary_vector</span>(<span class="hljs-params">to_numpy_arr</span>):
    raw_vector = [random.randint(<span class="hljs-number">0</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(DIM)]
    <span class="hljs-keyword">if</span> to_numpy_arr:
        <span class="hljs-keyword">return</span> np.packbits(raw_vector, axis=-<span class="hljs-number">1</span>)
    <span class="hljs-keyword">return</span> raw_vector

<span class="hljs-comment"># optional input for float vector:</span>
<span class="hljs-comment"># 1. list of float such as [0.56, 1.859, 6.55, 9.45]</span>
<span class="hljs-comment"># 2. numpy array of float32</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">gen_float_vector</span>(<span class="hljs-params">to_numpy_arr</span>):
    raw_vector = [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(DIM)]
    <span class="hljs-keyword">if</span> to_numpy_arr:
        <span class="hljs-keyword">return</span> np.array(raw_vector, dtype=<span class="hljs-string">&quot;float32&quot;</span>)
    <span class="hljs-keyword">return</span> raw_vector

<span class="hljs-comment"># # optional input for bfloat16 vector:</span>
<span class="hljs-comment"># # 1. list of float such as [0.56, 1.859, 6.55, 9.45]</span>
<span class="hljs-comment"># # 2. numpy array of bfloat16</span>
<span class="hljs-comment"># def gen_bf16_vector(to_numpy_arr):</span>
<span class="hljs-comment">#     raw_vector = [random.random() for _ in range(DIM)]</span>
<span class="hljs-comment">#     if to_numpy_arr:</span>
<span class="hljs-comment">#         return tf.cast(raw_vector, dtype=tf.bfloat16).numpy()</span>
<span class="hljs-comment">#     return raw_vector</span>

<span class="hljs-comment"># optional input for float16 vector:</span>
<span class="hljs-comment"># 1. list of float such as [0.56, 1.859, 6.55, 9.45]</span>
<span class="hljs-comment"># 2. numpy array of float16</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">gen_fp16_vector</span>(<span class="hljs-params">to_numpy_arr</span>):
    raw_vector = [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(DIM)]
    <span class="hljs-keyword">if</span> to_numpy_arr:
        <span class="hljs-keyword">return</span> np.array(raw_vector, dtype=np.float16)
    <span class="hljs-keyword">return</span> raw_vector

<span class="hljs-comment"># optional input for sparse vector:</span>
<span class="hljs-comment"># only accepts dict like {2: 13.23, 45: 0.54} or {&quot;indices&quot;: [1, 2], &quot;values&quot;: [0.1, 0.2]}</span>
<span class="hljs-comment"># note: no need to sort the keys</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">gen_sparse_vector</span>(<span class="hljs-params">pair_dict: <span class="hljs-built_in">bool</span></span>):
    raw_vector = {}
    dim = random.randint(<span class="hljs-number">2</span>, <span class="hljs-number">20</span>)
    <span class="hljs-keyword">if</span> pair_dict:
        raw_vector[<span class="hljs-string">&quot;indices&quot;</span>] = [i <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(dim)]
        raw_vector[<span class="hljs-string">&quot;values&quot;</span>] = [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(dim)]
    <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(dim):
            raw_vector[i] = random.random()
    <span class="hljs-keyword">return</span> raw_vector

<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">10000</span>):
    writer.append_row({
        <span class="hljs-string">&quot;id&quot;</span>: np.int64(i),
        <span class="hljs-string">&quot;bool&quot;</span>: <span class="hljs-literal">True</span> <span class="hljs-keyword">if</span> i % <span class="hljs-number">3</span> == <span class="hljs-number">0</span> <span class="hljs-keyword">else</span> <span class="hljs-literal">False</span>,
        <span class="hljs-string">&quot;int8&quot;</span>: np.int8(i%<span class="hljs-number">128</span>),
        <span class="hljs-string">&quot;int16&quot;</span>: np.int16(i%<span class="hljs-number">1000</span>),
        <span class="hljs-string">&quot;int32&quot;</span>: np.int32(i%<span class="hljs-number">100000</span>),
        <span class="hljs-string">&quot;int64&quot;</span>: np.int64(i),
        <span class="hljs-string">&quot;float&quot;</span>: np.float32(i/<span class="hljs-number">3</span>),
        <span class="hljs-string">&quot;double&quot;</span>: np.float64(i/<span class="hljs-number">7</span>),
        <span class="hljs-string">&quot;varchar&quot;</span>: <span class="hljs-string">f&quot;varchar_<span class="hljs-subst">{i}</span>&quot;</span>,
        <span class="hljs-string">&quot;json&quot;</span>: json.dumps({<span class="hljs-string">&quot;dummy&quot;</span>: i, <span class="hljs-string">&quot;ok&quot;</span>: <span class="hljs-string">f&quot;name_<span class="hljs-subst">{i}</span>&quot;</span>}),
        <span class="hljs-string">&quot;array_str&quot;</span>: np.array([<span class="hljs-string">f&quot;str_<span class="hljs-subst">{k}</span>&quot;</span> <span class="hljs-keyword">for</span> k <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>)], np.dtype(<span class="hljs-string">&quot;str&quot;</span>)),
        <span class="hljs-string">&quot;array_int&quot;</span>: np.array([k <span class="hljs-keyword">for</span> k <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">10</span>)], np.dtype(<span class="hljs-string">&quot;int64&quot;</span>)),
        <span class="hljs-string">&quot;float_vector&quot;</span>: gen_float_vector(<span class="hljs-literal">True</span>),
        <span class="hljs-string">&quot;binary_vector&quot;</span>: gen_binary_vector(<span class="hljs-literal">True</span>),
        <span class="hljs-string">&quot;float16_vector&quot;</span>: gen_fp16_vector(<span class="hljs-literal">True</span>),
        <span class="hljs-comment"># &quot;bfloat16_vector&quot;: gen_bf16_vector(True),</span>
        <span class="hljs-string">&quot;sparse_vector&quot;</span>: gen_sparse_vector(<span class="hljs-literal">True</span>),
        <span class="hljs-string">f&quot;dynamic_<span class="hljs-subst">{i}</span>&quot;</span>: i,
    })
    <span class="hljs-keyword">if</span> (i+<span class="hljs-number">1</span>)%<span class="hljs-number">1000</span> == <span class="hljs-number">0</span>:
        writer.commit()
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;committed&#x27;</span>)

<span class="hljs-built_in">print</span>(writer.batch_files)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-type">byte</span>[] genBinaryVector() {
    <span class="hljs-type">Random</span> <span class="hljs-variable">ran</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();
    <span class="hljs-type">int</span> <span class="hljs-variable">byteCount</span> <span class="hljs-operator">=</span> DIM / <span class="hljs-number">8</span>;
    <span class="hljs-type">ByteBuffer</span> <span class="hljs-variable">vector</span> <span class="hljs-operator">=</span> ByteBuffer.allocate(byteCount);
    <span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; byteCount; ++i) {
        vector.put((<span class="hljs-type">byte</span>) ran.nextInt(Byte.MAX_VALUE));
    }
    <span class="hljs-keyword">return</span> vector.array();
}

<span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> List&lt;Float&gt; <span class="hljs-title function_">genFloatVector</span><span class="hljs-params">()</span> {
    <span class="hljs-type">Random</span> <span class="hljs-variable">ran</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();
    List&lt;Float&gt; vector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
    <span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; DIM; ++i) {
        vector.add(ran.nextFloat());
    }
    <span class="hljs-keyword">return</span> vector;
}

<span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-type">byte</span>[] genFloat16Vector() {
    List&lt;Float&gt; originalVector = genFloatVector();
    <span class="hljs-keyword">return</span> Float16Utils.f32VectorToFp16Buffer(originalVector).array();
}

<span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> SortedMap&lt;Long, Float&gt; <span class="hljs-title function_">genSparseVector</span><span class="hljs-params">()</span> {
    <span class="hljs-type">Random</span> <span class="hljs-variable">ran</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();
    SortedMap&lt;Long, Float&gt; sparse = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TreeMap</span>&lt;&gt;();
    <span class="hljs-type">int</span> <span class="hljs-variable">dim</span> <span class="hljs-operator">=</span> ran.nextInt(<span class="hljs-number">18</span>) + <span class="hljs-number">2</span>; <span class="hljs-comment">// [2, 20)</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; dim; ++i) {
        sparse.put((<span class="hljs-type">long</span>)ran.nextInt(<span class="hljs-number">1000000</span>), ran.nextFloat());
    }
    <span class="hljs-keyword">return</span> sparse;
}

<span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> List&lt;String&gt; <span class="hljs-title function_">genStringArray</span><span class="hljs-params">(<span class="hljs-type">int</span> length)</span> {
    List&lt;String&gt; arr = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
    <span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; length; i++) {
        arr.add(<span class="hljs-string">&quot;str_&quot;</span> + i);
    }
    <span class="hljs-keyword">return</span> arr;
}

<span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> List&lt;Long&gt; <span class="hljs-title function_">genIntArray</span><span class="hljs-params">(<span class="hljs-type">int</span> length)</span> {
    List&lt;Long&gt; arr = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
    <span class="hljs-keyword">for</span> (<span class="hljs-type">long</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; length; i++) {
        arr.add(i);
    }
    <span class="hljs-keyword">return</span> arr;
}

<span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> RemoteBulkWriter <span class="hljs-title function_">createRemoteBulkWriter</span><span class="hljs-params">(CreateCollectionReq.CollectionSchema collectionSchema)</span> <span class="hljs-keyword">throws</span> IOException {
    <span class="hljs-type">StorageConnectParam</span> <span class="hljs-variable">connectParam</span> <span class="hljs-operator">=</span> S3ConnectParam.newBuilder()
            .withEndpoint(MINIO_ENDPOINT)
            .withBucketName(BUCKET_NAME)
            .withAccessKey(ACCESS_KEY)
            .withSecretKey(SECRET_KEY)
            .build();
    <span class="hljs-type">RemoteBulkWriterParam</span> <span class="hljs-variable">bulkWriterParam</span> <span class="hljs-operator">=</span> RemoteBulkWriterParam.newBuilder()
            .withCollectionSchema(collectionSchema)
            .withRemotePath(<span class="hljs-string">&quot;/&quot;</span>)
            .withConnectParam(connectParam)
            .withFileType(BulkFileType.PARQUET)
            .build();
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RemoteBulkWriter</span>(bulkWriterParam);
}

<span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> List&lt;List&lt;String&gt;&gt; <span class="hljs-title function_">uploadData</span><span class="hljs-params">()</span> <span class="hljs-keyword">throws</span> Exception {
    CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">collectionSchema</span> <span class="hljs-operator">=</span> createSchema();
    <span class="hljs-keyword">try</span> (<span class="hljs-type">RemoteBulkWriter</span> <span class="hljs-variable">remoteBulkWriter</span> <span class="hljs-operator">=</span> createRemoteBulkWriter(collectionSchema)) {
        <span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10000</span>; ++i) {
            <span class="hljs-type">JsonObject</span> <span class="hljs-variable">rowObject</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();

            rowObject.addProperty(<span class="hljs-string">&quot;id&quot;</span>, i);
            rowObject.addProperty(<span class="hljs-string">&quot;bool&quot;</span>, i % <span class="hljs-number">3</span> == <span class="hljs-number">0</span>);
            rowObject.addProperty(<span class="hljs-string">&quot;int8&quot;</span>, i % <span class="hljs-number">128</span>);
            rowObject.addProperty(<span class="hljs-string">&quot;int16&quot;</span>, i % <span class="hljs-number">1000</span>);
            rowObject.addProperty(<span class="hljs-string">&quot;int32&quot;</span>, i % <span class="hljs-number">100000</span>);
            rowObject.addProperty(<span class="hljs-string">&quot;int64&quot;</span>, i);
            rowObject.addProperty(<span class="hljs-string">&quot;float&quot;</span>, i / <span class="hljs-number">3</span>);
            rowObject.addProperty(<span class="hljs-string">&quot;double&quot;</span>, i / <span class="hljs-number">7</span>);
            rowObject.addProperty(<span class="hljs-string">&quot;varchar&quot;</span>, <span class="hljs-string">&quot;varchar_&quot;</span> + i);
            rowObject.addProperty(<span class="hljs-string">&quot;json&quot;</span>, String.format(<span class="hljs-string">&quot;{\&quot;dummy\&quot;: %s, \&quot;ok\&quot;: \&quot;name_%s\&quot;}&quot;</span>, i, i));
            rowObject.add(<span class="hljs-string">&quot;array_str&quot;</span>, GSON_INSTANCE.toJsonTree(genStringArray(<span class="hljs-number">5</span>)));
            rowObject.add(<span class="hljs-string">&quot;array_int&quot;</span>, GSON_INSTANCE.toJsonTree(genIntArray(<span class="hljs-number">10</span>)));
            rowObject.add(<span class="hljs-string">&quot;float_vector&quot;</span>, GSON_INSTANCE.toJsonTree(genFloatVector()));
            rowObject.add(<span class="hljs-string">&quot;binary_vector&quot;</span>, GSON_INSTANCE.toJsonTree(genBinaryVector()));
            rowObject.add(<span class="hljs-string">&quot;float16_vector&quot;</span>, GSON_INSTANCE.toJsonTree(genFloat16Vector()));
            rowObject.add(<span class="hljs-string">&quot;sparse_vector&quot;</span>, GSON_INSTANCE.toJsonTree(genSparseVector()));
            rowObject.addProperty(<span class="hljs-string">&quot;dynamic&quot;</span>, <span class="hljs-string">&quot;dynamic_&quot;</span> + i);

            remoteBulkWriter.appendRow(rowObject);

            <span class="hljs-keyword">if</span> ((i+<span class="hljs-number">1</span>)%<span class="hljs-number">1000</span> == <span class="hljs-number">0</span>) {
                remoteBulkWriter.commit(<span class="hljs-literal">false</span>);
            }
        }

        List&lt;List&lt;String&gt;&gt; batchFiles = remoteBulkWriter.getBatchFiles();
        System.out.println(batchFiles);
        <span class="hljs-keyword">return</span> batchFiles;
    } <span class="hljs-keyword">catch</span> (Exception e) {
        <span class="hljs-keyword">throw</span> e;
    }
}

<span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">main</span><span class="hljs-params">(String[] args)</span> <span class="hljs-keyword">throws</span> Exception {
    List&lt;List&lt;String&gt;&gt; batchFiles = uploadData();
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-the-results" class="common-anchor-header">Überprüfen der Ergebnisse<button data-href="#Verify-the-results" class="anchor-icon" translate="no">
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
    </button></h2><div class="language-python">
<p>Um die Ergebnisse zu überprüfen, können Sie den tatsächlichen Ausgabepfad ermitteln, indem Sie die Eigenschaft <code translate="no">batch_files</code> des Writers ausgeben.</p>
</div>
<div class="language-java">
<p>Um die Ergebnisse zu überprüfen, können Sie den tatsächlichen Ausgabepfad ermitteln, indem Sie die Methode <code translate="no">getBatchFiles()</code> des Writers ausdrucken.</p>
</div>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">print</span>(writer.batch_files)

<span class="hljs-comment"># [[&#x27;d4220a9e-45be-4ccb-8cb5-bf09304b9f23/1.parquet&#x27;],</span>
<span class="hljs-comment">#  [&#x27;d4220a9e-45be-4ccb-8cb5-bf09304b9f23/2.parquet&#x27;]]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// localBulkWriter.getBatchFiles();</span>
remoteBulkWriter.getBatchFiles();

<span class="hljs-comment">// </span>

<span class="hljs-comment">// Close the BulkWriter</span>
<span class="hljs-keyword">try</span> {
    localBulkWriter.close();
    remoteBulkWriter.close();            
} <span class="hljs-keyword">catch</span> (Exception e) {
    <span class="hljs-comment">// <span class="hljs-doctag">TODO:</span> handle exception</span>
    e.printStackTrace();
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>BulkWriter</strong> generiert eine UUID, erstellt einen Unterordner mit der UUID im angegebenen Ausgabeverzeichnis und legt alle generierten Dateien in diesem Unterordner ab. <a href="https://assets.zilliz.com/bulk_writer.zip">Klicken Sie hier</a>, um die vorbereiteten Beispieldaten herunterzuladen.</p>
<p>Mögliche Ordnerstrukturen sind wie folgt:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># JSON</span>
├── folder
│   └── 45ae1139-1d87-4aff-85f5-0039111f9e6b
│       └── 1.json 

<span class="hljs-comment"># Parquet</span>
├── folder
│   └── 45ae1139-1d87-4aff-85f5-0039111f9e6b
│       └── 1.parquet 
<button class="copy-code-btn"></button></code></pre>
