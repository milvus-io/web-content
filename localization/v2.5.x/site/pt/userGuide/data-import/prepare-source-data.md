---
id: prepare-source-data.md
order: 0
title: Preparar os dados de origem
summary: >-
  Esta página aborda algo que deve considerar antes de começar a inserir dados
  em massa na sua coleção.
---
<h1 id="Prepare-Source-Data" class="common-anchor-header">Preparar os dados de origem<button data-href="#Prepare-Source-Data" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta página aborda algo que deve considerar antes de começar a inserir dados em massa na sua coleção.</p>
<h2 id="Before-you-start" class="common-anchor-header">Antes de começar<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>A coleção de destino requer o mapeamento dos dados de origem para o seu esquema. O diagrama abaixo mostra como os dados de origem aceitáveis são mapeados para o esquema de uma coleção de destino.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/map-data-to-schema.png" alt="Map data to schema" class="doc-image" id="map-data-to-schema" />
   </span> <span class="img-wrapper"> <span>Mapear dados para o esquema</span> </span></p>
<p>Deve examinar cuidadosamente os seus dados e conceber o esquema da coleção de destino em conformidade.</p>
<p>Tomando como exemplo os dados JSON no diagrama acima, existem duas entidades na lista de linhas, cada linha com seis campos. O esquema da coleção inclui seletivamente quatro: <strong>id</strong>, <strong>vetor</strong>, <strong>scalar_1</strong> e <strong>scalar_2</strong>.</p>
<p>Há mais dois aspectos a considerar ao conceber o esquema:</p>
<ul>
<li><p><strong>Se deve ser ativado o AutoID</strong></p>
<p>O campo <strong>id</strong> serve como o campo primário da coleção. Para fazer com que o campo primário seja automaticamente incrementado, pode ativar o <strong>AutoID</strong> no esquema. Neste caso, deve excluir o campo <strong>id</strong> de cada linha nos dados de origem.</p></li>
<li><p><strong>Ativar ou não campos dinâmicos</strong></p>
<p>A coleção de destino também pode armazenar campos não incluídos no seu esquema predefinido se o esquema permitir campos dinâmicos. O campo <strong>$meta</strong> é um campo JSON reservado para armazenar campos dinâmicos e seus valores em pares de valores chave. No diagrama acima, os campos <strong>dynamic_field_1</strong> e <strong>dynamic_field_2</strong> e os valores serão guardados como pares de valores chave no campo <strong>$meta</strong>.</p></li>
</ul>
<p>O código seguinte mostra como configurar o esquema para a coleção ilustrada no diagrama acima.</p>
<div class="language-python">
<p>Para obter mais informações, consulte <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md"><code translate="no">create_schema()</code></a> e <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md"><code translate="no">add_field()</code></a> na referência do SDK.</p>
</div>
<div class="language-java">
<p>Para obter mais informações, consulte <a href="https://milvus.io/api-reference/java/v2.4.x/v2/CollectionSchema/CollectionSchema.md"><code translate="no">CollectionSchema</code></a> na referência do SDK.</p>
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
<h2 id="Set-up-BulkWriter" class="common-anchor-header">Configurar o BulkWriter<button data-href="#Set-up-BulkWriter" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>BulkWriter</strong> é uma ferramenta concebida para converter conjuntos de dados brutos num formato adequado para importação através da API de importação RESTful. Ele oferece dois tipos de gravadores:</p>
<ul>
<li><strong>LocalBulkWriter</strong>: Lê o conjunto de dados designado e o transforma em um formato fácil de usar.</li>
<li><strong>RemoteBulkWriter</strong>: Executa a mesma tarefa que o LocalBulkWriter, mas transfere adicionalmente os arquivos de dados convertidos para um bucket de armazenamento de objeto remoto especificado.</li>
</ul>
<p><strong>RemoteBulkWriter</strong> difere de <strong>LocalBulkWriter</strong> porque <strong>RemoteBulkWriter</strong> transfere os arquivos de dados convertidos para um bucket de armazenamento de objetos de destino.</p>
<h3 id="Set-up-LocalBulkWriter" class="common-anchor-header">Configurar o LocalBulkWriter</h3><p>Um <strong>LocalBulkWriter</strong> acrescenta linhas do conjunto de dados de origem e transfere-as para um ficheiro local do formato especificado.</p>
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
<p>Ao criar um <strong>LocalBulkWriter</strong>, deve:</p>
<ul>
<li>Referenciar o esquema criado em <code translate="no">schema</code>.</li>
<li>Definir <code translate="no">local_path</code> como o diretório de saída.</li>
<li>Definir <code translate="no">file_type</code> para o tipo de ficheiro de saída.</li>
<li>Se o conjunto de dados contiver um grande número de registos, é aconselhável segmentar os dados, definindo <code translate="no">segment_size</code> para um valor adequado.</li>
</ul>
<p>Para obter detalhes sobre as definições de parâmetros, consulte <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/DataImport/LocalBulkWriter/LocalBulkWriter.md">LocalBulkWriter</a> na referência do SDK.</p>
</div>
<div class="language-java">
<p>Ao criar um <strong>LocalBulkWriter</strong>, deve:</p>
<ul>
<li>Referenciar o esquema criado em <code translate="no">CollectionSchema()</code>.</li>
<li>Definir o diretório de saída em <code translate="no">withLocalPath()</code>.</li>
<li>Definir o tipo de ficheiro de saída em <code translate="no">withFileType()</code>.</li>
<li>Se o conjunto de dados contiver um grande número de registos, é aconselhável segmentar os dados, definindo <code translate="no">withChunkSize()</code> para um valor adequado.</li>
</ul>
<p>Para obter detalhes sobre as definições de parâmetros, consulte LocalBulkWriter na referência do SDK.</p>
</div>
<h3 id="Set-up-RemoteBulkWriter" class="common-anchor-header">Configurar o RemoteBulkWriter</h3><p>Em vez de confirmar os dados anexados a um arquivo local, um <strong>RemoteBulkWriter</strong> confirma-os em um bucket remoto. Por conseguinte, deve configurar um objeto <strong>ConnectParam</strong> antes de criar um <strong>RemoteBulkWriter</strong>.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a></div>
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
<p>Quando os parâmetros de ligação estiverem prontos, pode referenciá-los no <strong>RemoteBulkWriter</strong> da seguinte forma:</p>
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
<p>Os parâmetros para criar um <strong>RemoteBulkWriter</strong> são praticamente os mesmos que os de um <strong>LocalBulkWriter</strong>, exceto <code translate="no">connect_param</code>. Para mais pormenores sobre as definições dos parâmetros, consulte <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/DataImport/RemoteBulkWriter/RemoteBulkWriter.md">RemoteBulkWriter</a> e <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/DataImport/RemoteBulkWriter/S3ConnectParam.md">ConnectParam</a> na referência do SDK.</p>
</div>
<div class="language-java">
<p>Os parâmetros para criar um <strong>RemoteBulkWriter</strong> são praticamente os mesmos que os de um <strong>LocalBulkWriter</strong>, exceto <code translate="no">StorageConnectParam</code>. Para mais informações sobre as definições dos parâmetros, consulte RemoteBulkWriter e StorageConnectParam na referência do SDK.</p>
</div>
<h2 id="Start-writing" class="common-anchor-header">Iniciar a escrita<button data-href="#Start-writing" class="anchor-icon" translate="no">
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
<p>Um <strong>BulkWriter</strong> tem dois métodos: <code translate="no">append_row()</code> adiciona uma linha de um conjunto de dados de origem e <code translate="no">commit()</code> confirma as linhas adicionadas em um arquivo local ou em um bucket remoto.</p>
</div>
<div class="language-java">
<p>Um <strong>BulkWriter</strong> tem dois métodos: <code translate="no">appendRow()</code> adiciona uma linha a partir de um conjunto de dados de origem e <code translate="no">commit()</code> confirma as linhas adicionadas num ficheiro local ou num bucket remoto.</p>
</div>
<p>Para fins de demonstração, o código a seguir anexa dados gerados aleatoriamente.</p>
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
<h2 id="Verify-the-results" class="common-anchor-header">Verificar os resultados<button data-href="#Verify-the-results" class="anchor-icon" translate="no">
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
<p>Para verificar os resultados, pode obter o caminho de saída real imprimindo a propriedade <code translate="no">batch_files</code> do escritor.</p>
</div>
<div class="language-java">
<p>Para verificar os resultados, pode obter o caminho de saída real imprimindo o método <code translate="no">getBatchFiles()</code> do escritor.</p>
</div>
<div class="multipleCode">
 <a href="#java">Java</a> <a href="#python">Python </a></div>
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
<p><strong>O BulkWriter</strong> gera um UUID, cria uma subpasta utilizando o UUID no diretório de saída fornecido e coloca todos os ficheiros gerados na subpasta. <a href="https://assets.zilliz.com/bulk_writer.zip">Clique aqui</a> para descarregar os dados de amostra preparados.</p>
<p>As estruturas de pastas possíveis são as seguintes:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># JSON</span>
├── folder
│   └── 45ae1139-1d87-4aff-85f5-0039111f9e6b
│       └── 1.json 

<span class="hljs-comment"># Parquet</span>
├── folder
│   └── 45ae1139-1d87-4aff-85f5-0039111f9e6b
│       └── 1.parquet 
<button class="copy-code-btn"></button></code></pre>
