---
id: prepare-source-data.md
order: 0
title: Preparar los datos de origen
summary: >-
  Esta página trata sobre algo que debe tener en cuenta antes de empezar a
  introducir datos en bloque en su colección.
---
<h1 id="Prepare-Source-Data" class="common-anchor-header">Preparar los datos de origen<button data-href="#Prepare-Source-Data" class="anchor-icon" translate="no">
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
    </button></h1><p>En esta página se trata algo que debe tener en cuenta antes de empezar a insertar datos en bloque en su colección.</p>
<h2 id="Before-you-start" class="common-anchor-header">Antes de empezar<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>La colección de destino requiere la asignación de los datos de origen a su esquema. El siguiente diagrama muestra cómo se asignan los datos de origen aceptables al esquema de una colección de destino.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/map-data-to-schema.png" alt="Map data to schema" class="doc-image" id="map-data-to-schema" />
   </span> <span class="img-wrapper"> <span>Asignación de datos al esquema</span> </span></p>
<p>Debe examinar cuidadosamente sus datos y diseñar el esquema de la colección de destino en consecuencia.</p>
<p>Tomando como ejemplo los datos JSON del diagrama anterior, hay dos entidades en la lista de filas y cada fila tiene seis campos. El esquema de la colección incluye selectivamente cuatro: <strong>id</strong>, <strong>vector</strong>, <strong>scalar_1</strong> y <strong>scalar_2</strong>.</p>
<p>Hay dos cosas más a considerar cuando se diseña el esquema:</p>
<ul>
<li><p><strong>Si activar AutoID</strong></p>
<p>El campo <strong>id</strong> sirve como campo primario de la colección. Para que el campo primario se incremente automáticamente, puede activar <strong>AutoID</strong> en el esquema. En este caso, debe excluir el campo <strong>id</strong> de cada fila de los datos de origen.</p></li>
<li><p><strong>Habilitar o no campos dinámicos</strong></p>
<p>La colección de destino también puede almacenar campos no incluidos en su esquema predefinido si el esquema habilita los campos dinámicos. El campo <strong>$meta</strong> es un campo JSON reservado para contener campos dinámicos y sus valores en pares clave-valor. En el diagrama anterior, los campos <strong>dynamic_field_1</strong> y <strong>dynamic_field_2</strong> y los valores se guardarán como pares clave-valor en el campo <strong>$meta</strong>.</p></li>
</ul>
<p>El siguiente código muestra cómo configurar el esquema para la colección ilustrada en el diagrama anterior.</p>
<div class="language-python">
<p>Para obtener más información, consulte <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md"><code translate="no">create_schema()</code></a> y <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md"><code translate="no">add_field()</code></a> en la referencia del SDK.</p>
</div>
<div class="language-java">
<p>Para obtener más información, consulte <a href="https://milvus.io/api-reference/java/v2.4.x/v2/CollectionSchema/CollectionSchema.md"><code translate="no">CollectionSchema</code></a> en la referencia del SDK.</p>
</div>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># You need to work out a collection schema out of your dataset.</span>
schema = MilvusClient.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_field=<span class="hljs-literal">True</span>
)

schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;scalar_1&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;scalar_2&quot;</span>, datatype=DataType.INT64)

schema.verify()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.grpc.DataType;
<span class="hljs-keyword">import</span> io.milvus.param.collection.CollectionSchemaParam;
<span class="hljs-keyword">import</span> io.milvus.param.collection.FieldType;

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
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-up-BulkWriter" class="common-anchor-header">Configuración de BulkWriter<button data-href="#Set-up-BulkWriter" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>BulkWriter</strong> es una herramienta diseñada para convertir conjuntos de datos sin procesar en un formato adecuado para su importación a través de la API de importación RESTful. Ofrece dos tipos de escritores:</p>
<ul>
<li><strong>LocalBulkWriter</strong>: Lee el conjunto de datos designado y lo transforma en un formato fácil de usar.</li>
<li><strong>RemoteBulkWriter</strong>: Realiza la misma tarea que LocalBulkWriter pero, además, transfiere los archivos de datos convertidos a un bucket de almacenamiento de objetos remoto especificado.</li>
</ul>
<p><strong>RemoteBulkWriter</strong> se diferencia de <strong>LocalBulkWriter</strong> en que <strong>RemoteBulkWriter</strong> transfiere los archivos de datos convertidos a un bucket de almacenamiento de objetos de destino.</p>
<h3 id="Set-up-LocalBulkWriter" class="common-anchor-header">Configuración de LocalBulkWriter</h3><p>Un <strong>LocalBulkWriter</strong> añade filas del conjunto de datos de origen y las consigna en un archivo local del formato especificado.</p>
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
<p>Al crear un <strong>LocalBulkWriter</strong>, debe:</p>
<ul>
<li>Hacer referencia al esquema creado en <code translate="no">schema</code>.</li>
<li>Establecer <code translate="no">local_path</code> como directorio de salida.</li>
<li>Establecer <code translate="no">file_type</code> como tipo de archivo de salida.</li>
<li>Si el conjunto de datos contiene un gran número de registros, se recomienda segmentar los datos configurando <code translate="no">segment_size</code> con un valor adecuado.</li>
</ul>
<p>Para obtener más información sobre la configuración de los parámetros, consulte <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/DataImport/LocalBulkWriter/LocalBulkWriter.md">LocalBulkWriter</a> en la referencia del SDK.</p>
</div>
<div class="language-java">
<p>Al crear un <strong>LocalBulkWriter</strong>, debe:</p>
<ul>
<li>Hacer referencia al esquema creado en <code translate="no">CollectionSchema()</code>.</li>
<li>Establecer el directorio de salida en <code translate="no">withLocalPath()</code>.</li>
<li>Establecer el tipo de archivo de salida en <code translate="no">withFileType()</code>.</li>
<li>Si su conjunto de datos contiene un gran número de registros, se recomienda segmentar los datos configurando <code translate="no">withChunkSize()</code> con un valor adecuado.</li>
</ul>
<p>Para más detalles sobre la configuración de parámetros, consulte LocalBulkWriter en la referencia SDK.</p>
</div>
<h3 id="Set-up-RemoteBulkWriter" class="common-anchor-header">Configuración de RemoteBulkWriter</h3><p>En lugar de enviar los datos añadidos a un archivo local, <strong>RemoteBulkWriter</strong> los envía a un bucket remoto. Por lo tanto, debe configurar un objeto <strong>ConnectParam</strong> antes de crear un <strong>RemoteBulkWriter</strong>.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.bulk_writer <span class="hljs-keyword">import</span> RemoteBulkWriter
<span class="hljs-comment"># Use `from pymilvus import RemoteBulkWriter` </span>
<span class="hljs-comment"># when you use pymilvus earlier than 2.4.2 </span>

<span class="hljs-comment"># Third-party constants</span>
ACCESS_KEY=<span class="hljs-string">&quot;minioadmin&quot;</span>
SECRET_KEY=<span class="hljs-string">&quot;minioadmin&quot;</span>
BUCKET_NAME=<span class="hljs-string">&quot;milvus-bucket&quot;</span>

<span class="hljs-comment"># Connections parameters to access the remote bucket</span>
conn = RemoteBulkWriter.S3ConnectParam(
    endpoint=<span class="hljs-string">&quot;localhost:9000&quot;</span>, <span class="hljs-comment"># the default MinIO service started along with Milvus</span>
    access_key=ACCESS_KEY,
    secret_key=SECRET_KEY,
    bucket_name=BUCKET_NAME,
    secure=<span class="hljs-literal">False</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.bulkwriter.common.clientenum.BulkFileType;
<span class="hljs-keyword">import</span> io.milvus.bulkwriter.connect.S3ConnectParam;
<span class="hljs-keyword">import</span> io.milvus.bulkwriter.connect.StorageConnectParam;

<span class="hljs-type">String</span> <span class="hljs-variable">ACCESS_KEY</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;minioadmin&quot;</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">SECRET_KEY</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;minioadmin&quot;</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">BUCKET_NAME</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;milvus-bucket&quot;</span>;

<span class="hljs-type">StorageConnectParam</span> <span class="hljs-variable">storageConnectParam</span> <span class="hljs-operator">=</span> S3ConnectParam.newBuilder()
    .withEndpoint(MINIO_URI)
    .withAccessKey(ACCESS_KEY)
    .withSecretKey(SECRET_KEY)
    .withBucketName(BUCKET_NAME)
    .build();
<button class="copy-code-btn"></button></code></pre>
<p>Una vez que los parámetros de conexión están listos, puede hacer referencia a ellos en el <strong>RemoteBulkWriter</strong> de la siguiente manera:</p>
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
<p>Los parámetros para crear un <strong>RemoteBulkWriter</strong> son apenas los mismos que para un <strong>LocalBulkWriter</strong>, excepto <code translate="no">connect_param</code>. Para obtener más información sobre la configuración de los parámetros, consulte <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/DataImport/RemoteBulkWriter/RemoteBulkWriter.md">RemoteBulkWriter</a> y <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/DataImport/RemoteBulkWriter/S3ConnectParam.md">ConnectParam</a> en la referencia del SDK.</p>
</div>
<div class="language-java">
<p>Los parámetros para crear un <strong>RemoteBulkWriter</strong> son apenas los mismos que los de un <strong>LocalBulkWriter</strong>, excepto <code translate="no">StorageConnectParam</code>. Para más detalles sobre la configuración de los parámetros, consulte RemoteBulkWriter y StorageConnectParam en la referencia del SDK.</p>
</div>
<h2 id="Start-writing" class="common-anchor-header">Empezar a escribir<button data-href="#Start-writing" class="anchor-icon" translate="no">
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
<p>Un <strong>BulkWriter</strong> tiene dos métodos: <code translate="no">append_row()</code> añade una fila desde un conjunto de datos de origen y <code translate="no">commit()</code> consigna las filas añadidas en un archivo local o en un bucket remoto.</p>
</div>
<div class="language-java">
<p>Un <strong>BulkWriter</strong> tiene dos métodos: <code translate="no">appendRow()</code> añade una fila desde un conjunto de datos de origen y <code translate="no">commit()</code> consigna las filas añadidas en un archivo local o en un bucket remoto.</p>
</div>
<p>A modo de demostración, el siguiente código añade datos generados aleatoriamente.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
<span class="hljs-keyword">import</span> <span class="hljs-type">string</span>

def generate_random_str(length=<span class="hljs-number">5</span>):
    letters = <span class="hljs-type">string</span>.ascii_uppercase
    digits = <span class="hljs-type">string</span>.digits
    
    <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;&#x27;</span>.join(random.choices(letters + digits, k=length))

<span class="hljs-keyword">for</span> i in <span class="hljs-keyword">range</span>(<span class="hljs-number">10000</span>):
    writer.append_row({
        <span class="hljs-string">&quot;id&quot;</span>: i, 
        <span class="hljs-string">&quot;vector&quot;</span>: [random.uniform(<span class="hljs-number">-1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ in <span class="hljs-keyword">range</span>(<span class="hljs-number">768</span>)],
        <span class="hljs-string">&quot;scalar_1&quot;</span>: generate_random_str(random.randint(<span class="hljs-number">1</span>, <span class="hljs-number">20</span>)),
        <span class="hljs-string">&quot;scalar_2&quot;</span>: random.randint(<span class="hljs-number">0</span>, <span class="hljs-number">100</span>)
    })
    
writer.commit()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.<span class="hljs-property">alibaba</span>.<span class="hljs-property">fastjson</span>.<span class="hljs-property">JSONObject</span>;

<span class="hljs-keyword">for</span> (int i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10000</span>; i++) {
    <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span> json = <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>();
    json.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;id&quot;</span>, i);
    json.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title function_">get_random_vector</span>(<span class="hljs-number">768</span>));
    json.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;scalar_1&quot;</span>, <span class="hljs-title function_">get_random_string</span>(<span class="hljs-number">20</span>));
    json.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;scalar_2&quot;</span>, (long) (<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">100</span>));

    <span class="hljs-comment">// localBulkWriter.appendRow(json);</span>
    remoteBulkWriter.<span class="hljs-title function_">appendRow</span>(json);
}

<span class="hljs-comment">// localBulkWriter.commit(false);</span>
remoteBulkWriter.<span class="hljs-title function_">commit</span>(<span class="hljs-literal">false</span>);
<button class="copy-code-btn"></button></code></pre>
<p>Dado que el esquema definido permite campos dinámicos, también se pueden incluir campos no definidos por el esquema en los datos a insertar, como se indica a continuación.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
<span class="hljs-keyword">import</span> string

<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_random_string</span>(<span class="hljs-params">length=<span class="hljs-number">5</span></span>):
    letters = string.ascii_uppercase
    digits = string.digits
    
    <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;&#x27;</span>.join(random.choices(letters + digits, k=length))

<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">10000</span>):
    writer.append_row({
        <span class="hljs-string">&quot;id&quot;</span>: i, 
        <span class="hljs-string">&quot;vector&quot;</span>:[random.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">768</span>)],
        <span class="hljs-string">&quot;scalar_1&quot;</span>: generate_random_string(),
        <span class="hljs-string">&quot;scalar_2&quot;</span>: random.randint(<span class="hljs-number">0</span>, <span class="hljs-number">100</span>),
        <span class="hljs-string">&quot;dynamic_field_1&quot;</span>: random.choice([<span class="hljs-literal">True</span>, <span class="hljs-literal">False</span>]),
        <span class="hljs-string">&quot;dynamic_field_2&quot;</span>: random.randint(<span class="hljs-number">0</span>, <span class="hljs-number">100</span>)
    })
    
writer.commit()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">for</span> (int i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10000</span>; i++) {
    <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span> json = <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>();
    json.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;id&quot;</span>, i);
    json.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title function_">get_random_vector</span>(<span class="hljs-number">768</span>));
    json.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;scalar_1&quot;</span>, <span class="hljs-title function_">get_random_string</span>(<span class="hljs-number">20</span>));
    json.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;scalar_2&quot;</span>, (long) (<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">100</span>));
    json.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;dynamic_field_1&quot;</span>, <span class="hljs-title function_">get_random_boolean</span>());
    json.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;dynamic_field_2&quot;</span>, (long) (<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">100</span>));

    <span class="hljs-comment">// localBulkWriter.appendRow(json);</span>
    remoteBulkWriter.<span class="hljs-title function_">appendRow</span>(json);
}

<span class="hljs-comment">// localBulkWriter.commit(false);</span>
remoteBulkWriter.<span class="hljs-title function_">commit</span>(<span class="hljs-literal">false</span>);
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-the-results" class="common-anchor-header">Verificar los resultados<button data-href="#Verify-the-results" class="anchor-icon" translate="no">
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
<p>Para comprobar los resultados, puedes obtener la ruta de salida real imprimiendo la propiedad <code translate="no">batch_files</code> del escritor.</p>
</div>
<div class="language-java">
<p>Para comprobar los resultados, puede obtener la ruta de salida real imprimiendo el método <code translate="no">getBatchFiles()</code> del escritor.</p>
</div>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">print</span>(writer.batch_files)

<span class="hljs-comment"># [[&#x27;d4220a9e-45be-4ccb-8cb5-bf09304b9f23/1.parquet&#x27;],</span>
<span class="hljs-comment">#  [&#x27;d4220a9e-45be-4ccb-8cb5-bf09304b9f23/2.parquet&#x27;]]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// localBulkWriter.getBatchFiles();</span>
remoteBulkWriter.<span class="hljs-title function_">getBatchFiles</span>();

<span class="hljs-comment">// </span>

<span class="hljs-comment">// Close the BulkWriter</span>
<span class="hljs-keyword">try</span> {
    localBulkWriter.<span class="hljs-title function_">close</span>();
    remoteBulkWriter.<span class="hljs-title function_">close</span>();            
} <span class="hljs-keyword">catch</span> (<span class="hljs-title class_">Exception</span> e) {
    <span class="hljs-comment">// <span class="hljs-doctag">TODO:</span> handle exception</span>
    e.<span class="hljs-title function_">printStackTrace</span>();
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>BulkWriter</strong> genera un UUID, crea una subcarpeta utilizando el UUID en el directorio de salida proporcionado y coloca todos los archivos generados en la subcarpeta. <a href="https://assets.zilliz.com/bulk_writer.zip">Haga clic aquí</a> para descargar los datos de muestra preparados.</p>
<p>Las posibles estructuras de carpetas son las siguientes</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># JSON</span>
├── folder
│   └── 45ae1139-1d87-4aff-85f5-0039111f9e6b
│       └── <span class="hljs-number">1.j</span>son 

<span class="hljs-comment"># Parquet</span>
├── folder
│   └── 45ae1139-1d87-4aff-85f5-0039111f9e6b
│       └── <span class="hljs-number">1.</span>parquet 
<button class="copy-code-btn"></button></code></pre>
