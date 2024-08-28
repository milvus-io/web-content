---
id: prepare-source-data.md
order: 0
title: Préparer les données sources
summary: >-
  Cette page traite d'un aspect que vous devez prendre en considération avant de
  commencer à insérer des données en vrac dans votre collection.
---
<h1 id="Prepare-Source-Data" class="common-anchor-header">Préparer les données sources<button data-href="#Prepare-Source-Data" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette page traite des éléments à prendre en compte avant de commencer à insérer des données en vrac dans votre collection.</p>
<h2 id="Before-you-start" class="common-anchor-header">Avant de commencer<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>La collection cible nécessite la mise en correspondance des données sources avec son schéma. Le diagramme ci-dessous montre comment des données sources acceptables sont mises en correspondance avec le schéma d'une collection cible.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/map-data-to-schema.png" alt="Map data to schema" class="doc-image" id="map-data-to-schema" />
   </span> <span class="img-wrapper"> <span>Mettre en correspondance les données et le schéma</span> </span></p>
<p>Vous devez examiner attentivement vos données et concevoir le schéma de la collection cible en conséquence.</p>
<p>Si l'on prend comme exemple les données JSON du diagramme ci-dessus, il y a deux entités dans la liste des lignes, chaque ligne ayant six champs. Le schéma de la collection en inclut sélectivement quatre : <strong>id</strong>, <strong>vector</strong>, <strong>scalar_1</strong>, et <strong>scalar_2</strong>.</p>
<p>Deux autres éléments doivent être pris en compte lors de la conception du schéma :</p>
<ul>
<li><p><strong>L'activation ou non de l'AutoID</strong></p>
<p>Le champ <strong>id</strong> est le champ primaire de la collection. Pour que le champ primaire s'incrémente automatiquement, vous pouvez activer <strong>AutoID</strong> dans le schéma. Dans ce cas, vous devez exclure le champ <strong>id</strong> de chaque ligne des données source.</p></li>
<li><p><strong>Activation ou non des champs dynamiques</strong></p>
<p>La collection cible peut également stocker des champs qui ne sont pas inclus dans son schéma prédéfini si ce dernier autorise les champs dynamiques. Le champ <strong>$meta</strong> est un champ JSON réservé pour contenir les champs dynamiques et leurs valeurs dans des paires clé-valeur. Dans le schéma ci-dessus, les champs <strong>dynamic_field_1</strong> et <strong>dynamic_field_2</strong> et leurs valeurs seront enregistrés sous forme de paires clé-valeur dans le champ <strong>$meta</strong>.</p></li>
</ul>
<p>Le code suivant montre comment configurer le schéma de la collection illustrée dans le diagramme ci-dessus.</p>
<div class="language-python">
<p>Pour obtenir plus d'informations, reportez-vous à <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md"><code translate="no">create_schema()</code></a> et <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md"><code translate="no">add_field()</code></a> dans la référence du SDK.</p>
</div>
<div class="language-java">
<p>Pour obtenir plus d'informations, reportez-vous à <a href="https://milvus.io/api-reference/java/v2.4.x/v2/CollectionSchema/CollectionSchema.md"><code translate="no">CollectionSchema</code></a> dans la référence du SDK.</p>
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
<h2 id="Set-up-BulkWriter" class="common-anchor-header">Configurer BulkWriter<button data-href="#Set-up-BulkWriter" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>BulkWriter</strong> est un outil conçu pour convertir des ensembles de données brutes dans un format adapté à l'importation via l'API d'importation RESTful. Il propose deux types de rédacteurs :</p>
<ul>
<li><strong>LocalBulkWriter</strong>: Lit l'ensemble de données désigné et le transforme dans un format facile à utiliser.</li>
<li><strong>RemoteBulkWriter</strong>: Effectue la même tâche que LocalBulkWriter, mais transfère en plus les fichiers de données convertis vers un panier de stockage d'objets distant spécifié.</li>
</ul>
<p><strong>RemoteBulkWriter</strong> diffère de <strong>LocalBulkWriter</strong> en ce que <strong>RemoteBulkWriter</strong> transfère les fichiers de données convertis vers une unité de stockage d'objets cible.</p>
<h3 id="Set-up-LocalBulkWriter" class="common-anchor-header">Configuration de LocalBulkWriter</h3><p>Un <strong>LocalBulkWriter</strong> ajoute des lignes au jeu de données source et les enregistre dans un fichier local au format spécifié.</p>
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
<p>Lors de la création d'un <strong>LocalBulkWriter</strong>, vous devez :</p>
<ul>
<li>faire référence au schéma créé dans <code translate="no">schema</code>.</li>
<li>Définir <code translate="no">local_path</code> comme répertoire de sortie.</li>
<li>Définir <code translate="no">file_type</code> comme type de fichier de sortie.</li>
<li>Si votre jeu de données contient un grand nombre d'enregistrements, il est conseillé de segmenter vos données en fixant <code translate="no">segment_size</code> à une valeur appropriée.</li>
</ul>
<p>Pour plus de détails sur le paramétrage, reportez-vous à <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/DataImport/LocalBulkWriter/LocalBulkWriter.md">LocalBulkWriter</a> dans la référence SDK.</p>
</div>
<div class="language-java">
<p>Lors de la création d'un <strong>LocalBulkWriter</strong>, vous devez :</p>
<ul>
<li>référencer le schéma créé sur <code translate="no">CollectionSchema()</code>.</li>
<li>Définir le répertoire de sortie sur <code translate="no">withLocalPath()</code>.</li>
<li>Définir le type de fichier de sortie sur <code translate="no">withFileType()</code>.</li>
<li>Si votre jeu de données contient un grand nombre d'enregistrements, il est conseillé de segmenter vos données en fixant <code translate="no">withChunkSize()</code> à une valeur appropriée.</li>
</ul>
<p>Pour plus de détails sur le paramétrage, reportez-vous à LocalBulkWriter dans la référence SDK.</p>
</div>
<h3 id="Set-up-RemoteBulkWriter" class="common-anchor-header">Configuration de RemoteBulkWriter</h3><p>Au lieu d'enregistrer les données ajoutées dans un fichier local, un <strong>RemoteBulkWriter</strong> les enregistre dans un bucket distant. Par conséquent, vous devez configurer un objet <strong>ConnectParam</strong> avant de créer un <strong>RemoteBulkWriter</strong>.</p>
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
<p>Une fois que les paramètres de connexion sont prêts, vous pouvez les référencer dans le <strong>RemoteBulkWriter</strong> comme suit :</p>
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
<p>Les paramètres de création d'un <strong>RemoteBulkWriter</strong> sont à peu près les mêmes que ceux d'un <strong>LocalBulkWriter</strong>, à l'exception de <code translate="no">connect_param</code>. Pour plus de détails sur le réglage des paramètres, voir <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/DataImport/RemoteBulkWriter/RemoteBulkWriter.md">RemoteBulkWriter</a> et <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/DataImport/RemoteBulkWriter/S3ConnectParam.md">ConnectParam</a> dans la référence SDK.</p>
</div>
<div class="language-java">
<p>Les paramètres de création d'un <strong>RemoteBulkWriter</strong> sont à peu près les mêmes que ceux d'un <strong>LocalBulkWriter</strong>, à l'exception de <code translate="no">StorageConnectParam</code>. Pour plus de détails sur les paramètres, voir RemoteBulkWriter et StorageConnectParam dans la référence du SDK.</p>
</div>
<h2 id="Start-writing" class="common-anchor-header">Démarrer l'écriture<button data-href="#Start-writing" class="anchor-icon" translate="no">
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
<p>Un <strong>BulkWriter</strong> possède deux méthodes : <code translate="no">append_row()</code> ajoute une ligne à partir d'un jeu de données source et <code translate="no">commit()</code> valide les lignes ajoutées dans un fichier local ou un bucket distant.</p>
</div>
<div class="language-java">
<p>Un <strong>BulkWriter</strong> possède deux méthodes : <code translate="no">appendRow()</code> ajoute une ligne à partir d'un jeu de données source et <code translate="no">commit()</code> enregistre les lignes ajoutées dans un fichier local ou un panier distant.</p>
</div>
<p>À des fins de démonstration, le code suivant ajoute des données générées de manière aléatoire.</p>
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
<p>Étant donné que le schéma défini autorise les champs dynamiques, vous pouvez également inclure des champs non définis par le schéma dans les données à insérer, comme suit.</p>
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
<h2 id="Verify-the-results" class="common-anchor-header">Vérifier les résultats<button data-href="#Verify-the-results" class="anchor-icon" translate="no">
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
<p>Pour vérifier les résultats, vous pouvez obtenir le chemin de sortie réel en imprimant la propriété <code translate="no">batch_files</code> de l'auteur.</p>
</div>
<div class="language-java">
<p>Pour vérifier les résultats, vous pouvez obtenir le chemin de sortie réel en imprimant la méthode <code translate="no">getBatchFiles()</code> du rédacteur.</p>
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
<p><strong>BulkWriter</strong> génère un UUID, crée un sous-dossier utilisant l'UUID dans le répertoire de sortie fourni et place tous les fichiers générés dans le sous-dossier. <a href="https://assets.zilliz.com/bulk_writer.zip">Cliquez ici</a> pour télécharger l'exemple de données préparé.</p>
<p>Les structures de dossier possibles sont les suivantes :</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># JSON</span>
├── folder
│   └── 45ae1139-1d87-4aff-85f5-0039111f9e6b
│       └── <span class="hljs-number">1.j</span>son 

<span class="hljs-comment"># Parquet</span>
├── folder
│   └── 45ae1139-1d87-4aff-85f5-0039111f9e6b
│       └── <span class="hljs-number">1.</span>parquet 
<button class="copy-code-btn"></button></code></pre>
