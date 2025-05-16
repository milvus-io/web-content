---
id: index-vector-fields.md
order: 1
summary: >-
  Este guia orienta-o nas operações básicas de criação e gestão de índices em
  campos vectoriais de uma coleção.
title: Indexar campos vectoriais
---
<h1 id="Index-Vector-Fields" class="common-anchor-header">Indexar campos vectoriais<button data-href="#Index-Vector-Fields" class="anchor-icon" translate="no">
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
    </button></h1><p>Este guia orienta-o nas operações básicas de criação e gestão de índices em campos vectoriais de uma coleção.</p>
<h2 id="Overview" class="common-anchor-header">Visão geral<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Aproveitando os metadados armazenados num ficheiro de índice, o Milvus organiza os seus dados numa estrutura especializada, facilitando a rápida recuperação da informação solicitada durante as pesquisas ou consultas.</p>
<p>O Milvus fornece vários tipos de índices e métricas para ordenar os valores de campo para pesquisas de similaridade eficientes. A tabela seguinte lista os tipos de índices e métricas suportados para diferentes tipos de campos vectoriais. Atualmente, o Milvus suporta vários tipos de dados vectoriais, incluindo embeddings de vírgula flutuante (frequentemente conhecidos como vectores de vírgula flutuante ou vectores densos), embeddings binários (também conhecidos como vectores binários) e embeddings esparsos (também conhecidos como vectores esparsos). Para obter detalhes, consulte <a href="/docs/pt/v2.4.x/index.md">Índice na memória</a> e <a href="/docs/pt/v2.4.x/metric.md">métricas de similaridade</a>.</p>
<div class="filter">
 <a href="#floating">Incorporações de ponto flutuante</a> <a href="#binary">Incorporações binárias</a> <a href="#sparse">Incorporações esparsas</a></div>
<div class="filter-floating table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">Tipos de métricas</th>
    <th class="tg-0pky">Tipos de índice</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>Distância euclidiana (L2)</li><li>Produto interno (IP)</li><li>Semelhança de cosseno (COSINE)</li></td>
    <td class="tg-0pky" rowspan="2"><ul><li>FLAT</li><li>IVF_FLAT</li><li>IVF_SQ8</li><li>IVF_PQ</li><li>GPU_IVF_FLAT</li><li>GPU_IVF_PQ</li><li>HNSW</li><li>DISKANN</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-binary table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">Tipos de métricas</th>
    <th class="tg-0pky">Tipos de índices</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>Jaccard (JACCARD)</li><li>Hamming (HAMMING)</li></ul></td>
    <td class="tg-0pky"><ul><li>BIN_FLAT</li><li>BIN_IVF_FLAT</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-sparse table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">Tipos métricos</th>
    <th class="tg-0pky">Tipos de índices</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">IP</td>
    <td class="tg-0pky"><ul><li>ÍNDICE_ESPARSO_INVERTIDO</li><li>SPARSE_WAND</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<p>Recomenda-se a criação de índices para o campo vetorial e para os campos escalares que são acessados com freqüência.</p>
<h2 id="Preparations" class="common-anchor-header">Preparações<button data-href="#Preparations" class="anchor-icon" translate="no">
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
    </button></h2><p>Como explicado em <a href="/docs/pt/v2.4.x/manage-collections.md">Gerir colecções</a>, o Milvus gera automaticamente um índice e carrega-o para a memória ao criar uma coleção se alguma das seguintes condições for especificada no pedido de criação da coleção:</p>
<ul>
<li><p>A dimensionalidade do campo vetorial e o tipo de métrica, ou</p></li>
<li><p>O esquema e os parâmetros do índice.</p></li>
</ul>
<p>O trecho de código abaixo reaproveita o código existente para estabelecer uma ligação a uma instância Milvus e criar uma coleção sem especificar os seus parâmetros de índice. Neste caso, a coleção não tem um índice e permanece descarregada.</p>
<div class="language-python">
<p>Para preparar a indexação, utilize <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a> para ligar ao servidor Milvus e configurar uma coleção utilizando <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md"><code translate="no">create_schema()</code></a>, <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md"><code translate="no">add_field()</code></a>, e <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md"><code translate="no">create_collection()</code></a>.</p>
</div>
<div class="language-java">
<p>Para preparar a indexação, utilize <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Client/MilvusClientV2.md"><code translate="no">MilvusClientV2</code></a> para se ligar ao servidor Milvus e configurar uma coleção utilizando <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createSchema.md"><code translate="no">createSchema()</code></a>, <a href="https://milvus.io/api-reference/java/v2.4.x/v2/CollectionSchema/addField.md"><code translate="no">addField()</code></a>, e <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md"><code translate="no">createCollection()</code></a>.</p>
</div>
<div class="language-javascript">
<p>Para preparar a indexação, utilize <a href="https://milvus.io/api-reference/node/v2.4.x/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a> para se ligar ao servidor Milvus e criar uma coleção utilizando <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md"><code translate="no">createCollection()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># 1. Set up a Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
)

<span class="hljs-comment"># 2. Create schema</span>
<span class="hljs-comment"># 2.1. Create schema</span>
schema = MilvusClient.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_field=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># 2.2. Add fields to schema</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)

<span class="hljs-comment"># 3. Create collection</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup&quot;</span>, 
    schema=schema, 
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;

<span class="hljs-comment">// 1. Connect to Milvus server</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
    .uri(CLUSTER_ENDPOINT)
    .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-comment">// 2. Create a collection</span>

<span class="hljs-comment">// 2.1 Create schema</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

<span class="hljs-comment">// 2.2 Add fields to schema</span>
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;id&quot;</span>).dataType(DataType.Int64).isPrimaryKey(<span class="hljs-literal">true</span>).autoID(<span class="hljs-literal">false</span>).build());
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;vector&quot;</span>).dataType(DataType.FloatVector).dimension(<span class="hljs-number">5</span>).build());

<span class="hljs-comment">// 3 Create a collection without schema and index parameters</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
.collectionName(<span class="hljs-string">&quot;customized_setup&quot;</span>)
.collectionSchema(schema)
.build();

client.createCollection(customizedSetupReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 1. Set up a Milvus Client</span>
client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-comment">// 2. Define fields for the collection</span>
<span class="hljs-keyword">const</span> fields = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>
    },
]

<span class="hljs-comment">// 3. Create a collection</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup&quot;</span>,
    <span class="hljs-attr">fields</span>: fields,
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)  

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-a-Collection" class="common-anchor-header">Indexar uma coleção<button data-href="#Index-a-Collection" class="anchor-icon" translate="no">
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
<p>Para criar um índice para uma coleção ou indexar uma coleção, utilize <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/prepare_index_params.md"><code translate="no">prepare_index_params()</code></a> para preparar os parâmetros do índice e <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/create_index.md"><code translate="no">create_index()</code></a> para criar o índice.</p>
</div>
<div class="language-java">
<p>Para criar um índice para uma coleção ou indexar uma coleção, utilize <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md"><code translate="no">IndexParam</code></a> para preparar os parâmetros do índice e <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/createIndex.md"><code translate="no">createIndex()</code></a> para criar o índice.</p>
</div>
<div class="language-javascript">
<p>Para criar um índice para uma coleção ou indexar uma coleção, utilize <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md"><code translate="no">createIndex()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4.1. Set up the index parameters</span>
index_params = MilvusClient.prepare_index_params()

<span class="hljs-comment"># 4.2. Add an index on the vector field.</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
    index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>,
    params={ <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span> }
)

<span class="hljs-comment"># 4.3. Create an index file</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;customized_setup&quot;</span>,
    index_params=index_params,
    sync=<span class="hljs-literal">False</span> <span class="hljs-comment"># Whether to wait for index creation to complete before returning. Defaults to True.</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;

<span class="hljs-comment">// 4 Prepare index parameters</span>

<span class="hljs-comment">// 4.2 Add an index for the vector field &quot;vector&quot;</span>
<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForVectorField</span> <span class="hljs-operator">=</span> IndexParam.builder()
    .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
    .indexName(<span class="hljs-string">&quot;vector_index&quot;</span>)
    .indexType(IndexParam.IndexType.IVF_FLAT)
    .metricType(IndexParam.MetricType.COSINE)
    .extraParams(Map.of(<span class="hljs-string">&quot;nlist&quot;</span>, <span class="hljs-number">128</span>))
    .build();

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(indexParamForVectorField);

<span class="hljs-comment">// 4.3 Crate an index file</span>
<span class="hljs-type">CreateIndexReq</span> <span class="hljs-variable">createIndexReq</span> <span class="hljs-operator">=</span> CreateIndexReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup&quot;</span>)
    .indexParams(indexParams)
    .build();

client.createIndex(createIndexReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 4. Set up index for the collection</span>
<span class="hljs-comment">// 4.1. Set up the index parameters</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,   
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;vector_index&quot;</span>,
    <span class="hljs-attr">params</span>: { <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span> }
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<table class="language-python">
  <thead>
    <tr>
      <th>Parâmetro</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">field_name</code></td>
      <td>O nome do ficheiro de destino ao qual se aplica este objeto.</td>
    </tr>
    <tr>
      <td><code translate="no">metric_type</code></td>
      <td>O algoritmo que é utilizado para medir a semelhança entre vectores. Os valores possíveis são <strong>IP</strong>, <strong>L2</strong>, <strong>COSINE</strong>, <strong>JACCARD</strong>, <strong>HAMMING</strong>. Esta opção só está disponível quando o campo especificado é um campo vetorial. Para mais informações, consulte <a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">Índices suportados no Milvus</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">index_type</code></td>
      <td>O nome do algoritmo utilizado para organizar os dados no campo específico. Para os algoritmos aplicáveis, consulte <a href="https://milvus.io/docs/index.md">Índice na memória</a> e <a href="https://milvus.io/docs/disk_index.md">Índice no disco</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">index_name</code></td>
      <td>O nome do ficheiro de índice gerado depois de este objeto ter sido aplicado.</td>
    </tr>
    <tr>
      <td><code translate="no">params</code></td>
      <td>Os parâmetros de ajuste fino para o tipo de índice especificado. Para obter detalhes sobre possíveis chaves e intervalos de valores, consulte <a href="https://milvus.io/docs/index.md">Índice na memória</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">collection_name</code></td>
      <td>O nome de uma coleção existente.</td>
    </tr>
    <tr>
      <td><code translate="no">index_params</code></td>
      <td>Um objeto <strong>IndexParams</strong> que contém uma lista de objectos <strong>IndexParam</strong>.</td>
    </tr>
    <tr>
      <td><code translate="no">sync</code></td>
      <td>Controla a forma como o índice é criado em relação ao pedido do cliente. Valores válidos:<br><ul><li><code translate="no">True</code> (predefinição): O cliente espera até que o índice esteja totalmente construído antes de retornar. Isso significa que você não receberá uma resposta até que o processo seja concluído.</li><li><code translate="no">False</code>: O cliente regressa imediatamente após a receção do pedido e o índice está a ser criado em segundo plano. Para saber se a criação do índice foi concluída, utilize o método <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/describe_index.md">describe_index()</a>.</li></ul></td>
    </tr>
  </tbody>
</table>
<table class="language-java">
  <thead>
    <tr>
      <th>Parâmetro</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">fieldName</code></td>
      <td>O nome do campo de destino ao qual se aplica este objeto IndexParam.</td>
    </tr>
    <tr>
      <td><code translate="no">indexName</code></td>
      <td>O nome do ficheiro de índice gerado depois de este objeto ter sido aplicado.</td>
    </tr>
    <tr>
      <td><code translate="no">indexType</code></td>
      <td>O nome do algoritmo utilizado para organizar os dados no campo específico. Para obter informações sobre os algoritmos aplicáveis, consulte <a href="https://milvus.io/docs/index.md">Índice na memória</a> e <a href="https://milvus.io/docs/disk_index.md">Índice no disco</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">metricType</code></td>
      <td>A métrica de distância a utilizar para o índice. Os valores possíveis são <strong>IP</strong>, <strong>L2</strong>, <strong>COSINE</strong>, <strong>JACCARD</strong>, <strong>HAMMING</strong>.</td>
    </tr>
    <tr>
      <td><code translate="no">extraParams</code></td>
      <td>Parâmetros de índice extra. Para obter detalhes, consulte <a href="https://milvus.io/docs/index.md">Índice na memória</a> e <a href="https://milvus.io/docs/disk_index.md">Índice no disco</a>.</td>
    </tr>
  </tbody>
</table>
<table class="language-javascript">
  <thead>
    <tr>
      <th>Parâmetro</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collection_name</code></td>
      <td>O nome de uma coleção existente.</td>
    </tr>
    <tr>
      <td><code translate="no">field_name</code></td>
      <td>O nome do campo no qual criar um índice.</td>
    </tr>
    <tr>
      <td><code translate="no">index_type</code></td>
      <td>O tipo do índice a criar.</td>
    </tr>
    <tr>
      <td><code translate="no">metric_type</code></td>
      <td>O tipo de métrica utilizado para medir a distância do vetor.</td>
    </tr>
    <tr>
      <td><code translate="no">index_name</code></td>
      <td>O nome do índice a criar.</td>
    </tr>
    <tr>
      <td><code translate="no">params</code></td>
      <td>Outros parâmetros específicos do índice.</td>
    </tr>
  </tbody>
</table>
<div class="admonition note">
<p><strong>notas</strong></p>
<p>Atualmente, só é possível criar um ficheiro de índice para cada campo de uma coleção.</p>
</div>
<h2 id="Check-Index-Details" class="common-anchor-header">Verificar detalhes do índice<button data-href="#Check-Index-Details" class="anchor-icon" translate="no">
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
    </button></h2><p>Depois de ter criado um índice, pode verificar os seus detalhes.</p>
<div class="language-python">
<p>Para verificar os detalhes do índice, utilize <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/list_indexes.md"><code translate="no">list_indexes()</code></a> para listar os nomes dos índices e <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/describe_index.md"><code translate="no">describe_index()</code></a> para obter os detalhes do índice.</p>
</div>
<div class="language-java">
<p>Para verificar os detalhes do índice, utilize <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/describeIndex.md"><code translate="no">describeIndex()</code></a> para obter os detalhes do índice.</p>
</div>
<div class="language-javascript">
<p>Para verificar os detalhes do índice, utilize <a href="https://milvus.io/api-reference/node/v2.4.x/Management/describeIndex.md"><code translate="no">describeIndex()</code></a> para obter os detalhes do índice.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 5. Describe index</span>
res = client.list_indexes(
    collection_name=<span class="hljs-string">&quot;customized_setup&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     &quot;vector_index&quot;,</span>
<span class="hljs-comment"># ]</span>

res = client.describe_index(
    collection_name=<span class="hljs-string">&quot;customized_setup&quot;</span>,
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;index_type&quot;: ,</span>
<span class="hljs-comment">#     &quot;metric_type&quot;: &quot;COSINE&quot;,</span>
<span class="hljs-comment">#     &quot;field_name&quot;: &quot;vector&quot;,</span>
<span class="hljs-comment">#     &quot;index_name&quot;: &quot;vector_index&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">index</span>.<span class="hljs-property">request</span>.<span class="hljs-property">DescribeIndexReq</span>;
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">index</span>.<span class="hljs-property">response</span>.<span class="hljs-property">DescribeIndexResp</span>;

<span class="hljs-comment">// 5. Describe index</span>
<span class="hljs-comment">// 5.1 List the index names</span>
<span class="hljs-title class_">ListIndexesReq</span> listIndexesReq = <span class="hljs-title class_">ListIndexesReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;customized_setup&quot;</span>)
    .<span class="hljs-title function_">build</span>();

<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">String</span>&gt; indexNames = client.<span class="hljs-title function_">listIndexes</span>(listIndexesReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(indexNames);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     &quot;vector_index&quot;</span>
<span class="hljs-comment">// ]</span>

<span class="hljs-comment">// 5.2 Describe an index</span>
<span class="hljs-title class_">DescribeIndexReq</span> describeIndexReq = <span class="hljs-title class_">DescribeIndexReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;customized_setup&quot;</span>)
    .<span class="hljs-title function_">indexName</span>(<span class="hljs-string">&quot;vector_index&quot;</span>)
    .<span class="hljs-title function_">build</span>();

<span class="hljs-title class_">DescribeIndexResp</span> describeIndexResp = client.<span class="hljs-title function_">describeIndex</span>(describeIndexReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(describeIndexResp));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//     &quot;metricType&quot;: &quot;COSINE&quot;,</span>
<span class="hljs-comment">//     &quot;indexType&quot;: &quot;AUTOINDEX&quot;,</span>
<span class="hljs-comment">//     &quot;fieldName&quot;: &quot;vector&quot;,</span>
<span class="hljs-comment">//     &quot;indexName&quot;: &quot;vector_index&quot;</span>
<span class="hljs-comment">// }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 5. Describe the index</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;vector_index&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(res.<span class="hljs-property">index_descriptions</span>, <span class="hljs-literal">null</span>, <span class="hljs-number">2</span>))

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     &quot;params&quot;: [</span>
<span class="hljs-comment">//       {</span>
<span class="hljs-comment">//         &quot;key&quot;: &quot;index_type&quot;,</span>
<span class="hljs-comment">//         &quot;value&quot;: &quot;AUTOINDEX&quot;</span>
<span class="hljs-comment">//       },</span>
<span class="hljs-comment">//       {</span>
<span class="hljs-comment">//         &quot;key&quot;: &quot;metric_type&quot;,</span>
<span class="hljs-comment">//         &quot;value&quot;: &quot;COSINE&quot;</span>
<span class="hljs-comment">//       }</span>
<span class="hljs-comment">//     ],</span>
<span class="hljs-comment">//     &quot;index_name&quot;: &quot;vector_index&quot;,</span>
<span class="hljs-comment">//     &quot;indexID&quot;: &quot;449007919953063141&quot;,</span>
<span class="hljs-comment">//     &quot;field_name&quot;: &quot;vector&quot;,</span>
<span class="hljs-comment">//     &quot;indexed_rows&quot;: &quot;0&quot;,</span>
<span class="hljs-comment">//     &quot;total_rows&quot;: &quot;0&quot;,</span>
<span class="hljs-comment">//     &quot;state&quot;: &quot;Finished&quot;,</span>
<span class="hljs-comment">//     &quot;index_state_fail_reason&quot;: &quot;&quot;,</span>
<span class="hljs-comment">//     &quot;pending_index_rows&quot;: &quot;0&quot;</span>
<span class="hljs-comment">//   }</span>
<span class="hljs-comment">// ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<p>Pode verificar o ficheiro de índice criado num campo específico e recolher as estatísticas sobre o número de linhas indexadas utilizando este ficheiro de índice.</p>
<h2 id="Drop-an-Index" class="common-anchor-header">Eliminar um índice<button data-href="#Drop-an-Index" class="anchor-icon" translate="no">
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
    </button></h2><p>Pode simplesmente eliminar um índice se este já não for necessário.</p>
<div class="alert note">
<p>Antes de eliminar um índice, certifique-se de que este foi libertado primeiro.</p>
</div>
<div class="language-python">
<p>Para eliminar um índice, utilize <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/drop_index.md"><code translate="no">drop_index()</code></a>.</p>
</div>
<div class="language-java">
<p>Para eliminar um índice, utilize <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/dropIndex.md"><code translate="no">dropIndex()</code></a>.</p>
</div>
<div class="language-javascript">
<p>Para eliminar um índice, utilize <a href="https://milvus.io/api-reference/node/v2.4.x/Management/dropIndex.md"><code translate="no">dropIndex()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 6. Drop index</span>
client.drop_index(
    collection_name=<span class="hljs-string">&quot;customized_setup&quot;</span>,
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 6. Drop index</span>

<span class="hljs-type">DropIndexReq</span> <span class="hljs-variable">dropIndexReq</span> <span class="hljs-operator">=</span> DropIndexReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup&quot;</span>)
    .indexName(<span class="hljs-string">&quot;vector_index&quot;</span>)
    .build();

client.dropIndex(dropIndexReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 6. Drop the index</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;vector_index&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
