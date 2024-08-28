---
id: prepare-source-data.md
order: 0
title: 소스 데이터 준비
summary: 이 페이지에서는 컬렉션에 데이터를 대량으로 삽입하기 전에 고려해야 할 사항에 대해 설명합니다.
---
<h1 id="Prepare-Source-Data" class="common-anchor-header">소스 데이터 준비<button data-href="#Prepare-Source-Data" class="anchor-icon" translate="no">
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
    </button></h1><p>이 페이지에서는 컬렉션에 데이터를 일괄 삽입하기 전에 고려해야 할 사항에 대해 설명합니다.</p>
<h2 id="Before-you-start" class="common-anchor-header">시작하기 전에<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>대상 컬렉션을 사용하려면 소스 데이터를 해당 스키마에 매핑해야 합니다. 아래 다이어그램은 허용되는 소스 데이터를 대상 컬렉션의 스키마에 매핑하는 방법을 보여줍니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/map-data-to-schema.png" alt="Map data to schema" class="doc-image" id="map-data-to-schema" />
   </span> <span class="img-wrapper"> <span>데이터를 스키마에 매핑</span> </span></p>
<p>데이터를 면밀히 검토하고 그에 따라 대상 컬렉션의 스키마를 설계해야 합니다.</p>
<p>위 다이어그램의 JSON 데이터를 예로 들어보면 행 목록에 두 개의 엔티티가 있고 각 행에는 6개의 필드가 있습니다. 컬렉션 스키마는 <strong>id</strong>, <strong>벡터</strong>, <strong>scalar_1</strong>, <strong>scalar_2의</strong> 네 가지를 선택적으로 포함합니다.</p>
<p>스키마를 설계할 때 고려해야 할 두 가지 사항이 더 있습니다:</p>
<ul>
<li><p><strong>자동 ID 활성화 여부</strong></p>
<p><strong>id</strong> 필드는 컬렉션의 기본 필드 역할을 합니다. 기본 필드가 자동으로 증가하도록 하려면 스키마에서 <strong>AutoID를</strong> 활성화하면 됩니다. 이 경우 소스 데이터의 각 행에서 <strong>id</strong> 필드를 제외해야 합니다.</p></li>
<li><p><strong>동적 필드 활성화 여부</strong></p>
<p>스키마에서 동적 필드를 활성화하는 경우 대상 컬렉션은 사전 정의된 스키마에 포함되지 않은 필드도 저장할 수 있습니다. <strong> 메타</strong> 필드는 동적 필드와 해당 값을 키-값 쌍으로 보유하기 위해 예약된 JSON 필드입니다. 위 다이어그램에서 <strong>dynamic_field_1</strong> 및 <strong>dynamic_field_2</strong> 필드와 값은 <strong>$meta</strong> 필드에 키-값 쌍으로 저장됩니다.</p></li>
</ul>
<p>다음 코드는 위 다이어그램에 설명된 컬렉션의 스키마를 설정하는 방법을 보여줍니다.</p>
<div class="language-python">
<p>자세한 정보를 얻으려면 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md"><code translate="no">create_schema()</code></a> 및 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md"><code translate="no">add_field()</code></a> 를 참조하세요.</p>
</div>
<div class="language-java">
<p>자세한 정보를 얻으려면 SDK 참조에서 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/CollectionSchema/CollectionSchema.md"><code translate="no">CollectionSchema</code></a> 를 참조하세요.</p>
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
<h2 id="Set-up-BulkWriter" class="common-anchor-header">BulkWriter 설정<button data-href="#Set-up-BulkWriter" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>BulkWriter는</strong> 원시 데이터 세트를 RESTful 가져오기 API를 통해 가져오기에 적합한 형식으로 변환하도록 설계된 도구입니다. 두 가지 유형의 작성기를 제공합니다:</p>
<ul>
<li><strong>로컬 벌크 라이터</strong>: 지정된 데이터 집합을 읽고 사용하기 쉬운 형식으로 변환합니다.</li>
<li><strong>RemoteBulkWriter</strong>: LocalBulkWriter와 동일한 작업을 수행하지만 변환된 데이터 파일을 지정된 원격 개체 스토리지 버킷으로 추가로 전송합니다.</li>
</ul>
<p><strong>RemoteBulkWriter는</strong> 변환된 데이터 파일을 대상 오브젝트 스토리지 버킷으로 전송한다는 점에서 <strong>LocalBulkWriter와</strong> 다릅니다.</p>
<h3 id="Set-up-LocalBulkWriter" class="common-anchor-header">LocalBulkWriter 설정</h3><p><strong>LocalBulkWriter는</strong> 소스 데이터 집합의 행을 추가하고 지정된 형식의 로컬 파일에 커밋합니다.</p>
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
<p><strong>로컬 대량</strong> 작성기를 만들 때는 다음과 같이 해야 합니다:</p>
<ul>
<li><code translate="no">schema</code> 에서 생성된 스키마를 참조합니다.</li>
<li><code translate="no">local_path</code> 을 출력 디렉터리로 설정합니다.</li>
<li><code translate="no">file_type</code> 을 출력 파일 유형으로 설정합니다.</li>
<li>데이터 세트에 많은 수의 레코드가 포함되어 있는 경우 <code translate="no">segment_size</code> 을 적절한 값으로 설정하여 데이터를 세분화하는 것이 좋습니다.</li>
</ul>
<p>매개변수 설정에 대한 자세한 내용은 SDK 참조에서 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/DataImport/LocalBulkWriter/LocalBulkWriter.md">LocalBulkWriter를</a> 참조하세요.</p>
</div>
<div class="language-java">
<p><strong>로컬벌크라이터를</strong> 생성할 때는 다음과 같이 해야 합니다:</p>
<ul>
<li><code translate="no">CollectionSchema()</code> 에서 생성된 스키마를 참조합니다.</li>
<li><code translate="no">withLocalPath()</code> 에서 출력 디렉터리를 설정합니다.</li>
<li><code translate="no">withFileType()</code> 에서 출력 파일 유형을 설정합니다.</li>
<li>데이터 세트에 많은 수의 레코드가 포함되어 있는 경우 <code translate="no">withChunkSize()</code> 을 적절한 값으로 설정하여 데이터를 세분화하는 것이 좋습니다.</li>
</ul>
<p>매개변수 설정에 대한 자세한 내용은 SDK 참조에서 LocalBulkWriter를 참조하세요.</p>
</div>
<h3 id="Set-up-RemoteBulkWriter" class="common-anchor-header">RemoteBulkWriter 설정</h3><p><strong>RemoteBulkWriter는</strong> 추가된 데이터를 로컬 파일에 커밋하는 대신 원격 버킷에 커밋합니다. 따라서 <strong>RemoteBulkWriter를</strong> 만들기 전에 <strong>ConnectParam</strong> 객체를 설정해야 합니다.</p>
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
<p>연결 매개변수가 준비되면 다음과 같이 <strong>RemoteBulkWriter에서</strong> 이를 참조할 수 있습니다:</p>
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
<p><strong>RemoteBulkWriter를</strong> 만들기 위한 매개 변수는 <code translate="no">connect_param</code> 을 제외하고는 <strong>LocalBulkWriter의</strong> 매개 변수와 거의 동일합니다. 매개변수 설정에 대한 자세한 내용은 SDK 참조에서 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/DataImport/RemoteBulkWriter/RemoteBulkWriter.md">RemoteBulkWriter</a> 및 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/DataImport/RemoteBulkWriter/S3ConnectParam.md">ConnectParam을</a> 참조하세요.</p>
</div>
<div class="language-java">
<p><strong>RemoteBulkWriter를</strong> 만들기 위한 매개변수는 <code translate="no">StorageConnectParam</code> 을 제외하고는 <strong>LocalBulkWriter의</strong> 매개변수와 거의 동일합니다. 매개변수 설정에 대한 자세한 내용은 SDK 참조에서 RemoteBulkWriter 및 StorageConnectParam을 참조하세요.</p>
</div>
<h2 id="Start-writing" class="common-anchor-header">쓰기 시작<button data-href="#Start-writing" class="anchor-icon" translate="no">
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
<p><code translate="no">append_row()</code> 는 소스 데이터 세트에서 행을 추가하고 <code translate="no">commit()</code> 는 추가된 행을 로컬 파일 또는 원격 버킷에 커밋합니다.</p>
</div>
<div class="language-java">
<p><code translate="no">appendRow()</code> 는 소스 데이터 집합에서 행을 추가하고 <code translate="no">commit()</code> 는 추가된 행을 로컬 파일 또는 원격 버킷에 커밋합니다.</p>
</div>
<p>데모를 위해 다음 코드는 무작위로 생성된 데이터를 추가합니다.</p>
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
<p>정의된 스키마는 동적 필드를 허용하므로, 다음과 같이 데이터에 스키마에 정의되지 않은 필드를 포함하여 삽입할 수도 있습니다.</p>
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
<h2 id="Verify-the-results" class="common-anchor-header">결과 확인<button data-href="#Verify-the-results" class="anchor-icon" translate="no">
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
<p>결과를 확인하려면 작성자의 <code translate="no">batch_files</code> 속성을 인쇄하여 실제 출력 경로를 얻을 수 있습니다.</p>
</div>
<div class="language-java">
<p>결과를 확인하려면 작성기의 <code translate="no">getBatchFiles()</code> 메서드를 출력하여 실제 출력 경로를 얻을 수 있습니다.</p>
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
<p><strong>벌크라이터는</strong> UUID를 생성하고, 제공된 출력 디렉토리에 UUID를 사용하여 하위 폴더를 생성한 후 생성된 모든 파일을 하위 폴더에 배치합니다. 준비된 샘플 데이터를 다운로드하려면 <a href="https://assets.zilliz.com/bulk_writer.zip">여기를 클릭하세요</a>.</p>
<p>가능한 폴더 구조는 다음과 같습니다:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># JSON</span>
├── folder
│   └── 45ae1139-1d87-4aff-85f5-0039111f9e6b
│       └── <span class="hljs-number">1.j</span>son 

<span class="hljs-comment"># Parquet</span>
├── folder
│   └── 45ae1139-1d87-4aff-85f5-0039111f9e6b
│       └── <span class="hljs-number">1.</span>parquet 
<button class="copy-code-btn"></button></code></pre>
