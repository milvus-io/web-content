---
id: prepare-source-data.md
order: 0
title: ソースデータの準備
summary: このページでは、データをコレクションに一括挿入する前に考慮すべきことについて説明します。
---
<h1 id="Prepare-Source-Data" class="common-anchor-header">ソースデータの準備<button data-href="#Prepare-Source-Data" class="anchor-icon" translate="no">
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
    </button></h1><p>このページでは、データをコレクションに一括挿入する前に考慮すべきことについて説明します。</p>
<h2 id="Before-you-start" class="common-anchor-header">開始する前に<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>ターゲット・コレクションでは、ソース・データをそのスキーマにマッピングする必要があります。下図は、許容可能なソース・データをターゲット・コレクションのスキーマにマッピングする方法を示しています。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/map-data-to-schema.png" alt="Map data to schema" class="doc-image" id="map-data-to-schema" />
   </span> <span class="img-wrapper"> <span>データをスキーマにマップする</span> </span></p>
<p>データを慎重に調べ、それに応じてターゲット・コレクションのスキーマを設計する必要があります。</p>
<p>上図の JSON データを例にとると、行リストには 2 つのエンティティがあり、各行には 6 つのフィールドがあります。コレクションのスキーマには、<strong>id</strong>、<strong>vector</strong>、<strong>scalar_1</strong>、<strong>scalar_2の</strong>4つが選択的に含まれます。</p>
<p>スキーマを設計する際に考慮すべきことがさらに2つあります：</p>
<ul>
<li><p><strong>AutoIDを有効にするかどうか。</strong></p>
<p><strong>id</strong>フィールドはコレクションのプライマリフィールドとして機能します。プライマリフィールドを自動的にインクリメントするには、スキーマで<strong>AutoID を</strong>有効にします。この場合、ソースデータの各行から<strong>id</strong>フィールドを除外する必要があります。</p></li>
<li><p><strong>ダイナミック・フィールドを有効にするかどうか</strong></p>
<p>スキーマでダイナミック・フィールドを有効にすると、ターゲット・コレクションは、事前に定義されたスキーマに含まれないフィールドも格納できます。<strong>meta</strong>フィールドは、動的フィールドとその値をキーと値のペアで保持するための予約済み JSON フィールドです。上の図では、フィールド<strong>dynamic_field_</strong>1と<strong>dynamic_field_</strong>2とその値がキーと値のペアとして<strong>$meta</strong>フィールドに保存されます。</p></li>
</ul>
<p>以下のコードでは、上図のコレクションのスキーマを設定する方法を示します。</p>
<div class="language-python">
<p>より詳細な情報を得るには <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md"><code translate="no">create_schema()</code></a>および <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md"><code translate="no">add_field()</code></a>を参照してください。</p>
</div>
<div class="language-java">
<p>詳細については、SDKリファレンスの <a href="https://milvus.io/api-reference/java/v2.4.x/v2/CollectionSchema/CollectionSchema.md"><code translate="no">CollectionSchema</code></a>を参照してください。</p>
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
<h2 id="Set-up-BulkWriter" class="common-anchor-header">BulkWriterのセットアップ<button data-href="#Set-up-BulkWriter" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>BulkWriterは</strong>、生のデータセットをRESTful Import API経由でインポートするのに適した形式に変換するためのツールです。2種類のライターを提供しています：</p>
<ul>
<li><strong>LocalBulkWriter</strong>：指定されたデータセットを読み込み、使いやすい形式に変換します。</li>
<li><strong>RemoteBulkWriter</strong>：LocalBulkWriterと同じタスクを実行しますが、変換されたデータファイルを指定のリモート・オブジェクト・ストレージ・バケットに転送します。</li>
</ul>
<p><strong>RemoteBulkWriterが</strong> <strong>LocalBulkWriterと</strong>異なる点は、<strong>RemoteBulkWriterが</strong>変換されたデータファイルをターゲット・オブジェクト・ストレージ・バケットに転送する点です。</p>
<h3 id="Set-up-LocalBulkWriter" class="common-anchor-header">LocalBulkWriterのセットアップ</h3><p><strong>LocalBulkWriter</strong>は、ソースデータセットから行を追加し、指定された形式のローカルファイルにコミットします。</p>
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
<p><strong>LocalBulkWriter を</strong>作成するときは、次のようにします：</p>
<ul>
<li><code translate="no">schema</code> で作成したスキーマを参照する。</li>
<li><code translate="no">local_path</code> を出力ディレクトリに設定します。</li>
<li><code translate="no">file_type</code> を出力ファイル・タイプに設定する。</li>
<li>データセットに多数のレコードが含まれる場合は、<code translate="no">segment_size</code> を適切な値に設定してデータを分割することをお勧めします。</li>
</ul>
<p>パラメータ設定の詳細については、SDKリファレンスの<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/DataImport/LocalBulkWriter/LocalBulkWriter.md">LocalBulkWriterを</a>参照してください。</p>
</div>
<div class="language-java">
<p><strong>LocalBulkWriterを</strong>作成するときは、次のようにしてください：</p>
<ul>
<li><code translate="no">CollectionSchema()</code> で作成したスキーマを参照する。</li>
<li><code translate="no">withLocalPath()</code> で出力ディレクトリを設定します。</li>
<li><code translate="no">withFileType()</code> で出力ファイル タイプを設定する。</li>
<li>データセットに多数のレコードが含まれる場合は、<code translate="no">withChunkSize()</code> を適切な値に設定してデータを分割することをお勧めします。</li>
</ul>
<p>パラメータ設定の詳細については、SDKリファレンスのLocalBulkWriterを参照してください。</p>
</div>
<h3 id="Set-up-RemoteBulkWriter" class="common-anchor-header">RemoteBulkWriterのセットアップ</h3><p><strong>RemoteBulkWriterは</strong>、追加されたデータをローカルファイルにコミットする代わりに、リモートバケットにコミットします。したがって、<strong>RemoteBulkWriterを</strong>作成する前に<strong>ConnectParam</strong>オブジェクトを設定する必要があります。</p>
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
<p>接続パラメータが準備できたら、以下のように<strong>RemoteBulkWriterで</strong>参照できます：</p>
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
<p><strong>RemoteBulkWriter を</strong>作成するためのパラメータは、<code translate="no">connect_param</code> を除き、<strong>LocalBulkWriter</strong> のパラメータとほとんど同じです。パラメータ設定の詳細については、SDKリファレンスの<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/DataImport/RemoteBulkWriter/RemoteBulkWriter.md">RemoteBulkWriterと</a> <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/DataImport/RemoteBulkWriter/S3ConnectParam.md">ConnectParamを</a>参照してください。</p>
</div>
<div class="language-java">
<p><strong>RemoteBulkWriter を</strong>作成するためのパラメータは、<code translate="no">StorageConnectParam</code> を除き、<strong>LocalBulkWriter</strong> のパラメータとほとんど同じです。パラメータ設定の詳細については、SDK リファレンスの RemoteBulkWriter および StorageConnectParam を参照してください。</p>
</div>
<h2 id="Start-writing" class="common-anchor-header">書き込みの開始<button data-href="#Start-writing" class="anchor-icon" translate="no">
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
<p><strong>BulkWriterには</strong>、<code translate="no">append_row()</code> ソースデータセットから行を追加するメソッドと、<code translate="no">commit()</code> 追加した行をローカルファイルまたはリモートバケットにコミットするメソッドがあります。</p>
</div>
<div class="language-java">
<p><code translate="no">appendRow()</code> はソースデータセットから行を追加し、<code translate="no">commit()</code> は追加した行をローカルファイルあるいはリモートバケットにコミットする。</p>
</div>
<p>デモンストレーションのために、以下のコードではランダムに生成されたデータを追加している。</p>
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
<p>定義されているスキーマは動的フィールドを許可しているので、以下のように、挿入するデータにスキーマで定義されていないフィールドを含めることもできる。</p>
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
<h2 id="Verify-the-results" class="common-anchor-header">結果の確認<button data-href="#Verify-the-results" class="anchor-icon" translate="no">
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
<p>結果を確認するには、ライターの<code translate="no">batch_files</code> プロパティを表示することで、実際の出力パスを取得できます。</p>
</div>
<div class="language-java">
<p>結果を確認するには、ライターの<code translate="no">getBatchFiles()</code> メソッドを表示することで、実際の出力パスを取得できます。</p>
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
<p><strong>BulkWriterは</strong>UUIDを生成し、提供された出力ディレクトリにUUIDを使用したサブフォルダを作成し、生成されたすべてのファイルをサブフォルダに配置します。用意されているサンプルデータのダウンロードは<a href="https://assets.zilliz.com/bulk_writer.zip">こちら</a></p>
<p>可能なフォルダ構造は以下の通りです：</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># JSON</span>
├── folder
│   └── 45ae1139-1d87-4aff-85f5-0039111f9e6b
│       └── <span class="hljs-number">1.j</span>son 

<span class="hljs-comment"># Parquet</span>
├── folder
│   └── 45ae1139-1d87-4aff-85f5-0039111f9e6b
│       └── <span class="hljs-number">1.</span>parquet 
<button class="copy-code-btn"></button></code></pre>
