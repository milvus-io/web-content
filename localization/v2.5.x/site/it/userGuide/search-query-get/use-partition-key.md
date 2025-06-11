---
id: use-partition-key.md
title: Utilizzare la chiave di partizione
summary: >-
  La chiave di partizione è una soluzione di ottimizzazione della ricerca basata
  sulle partizioni. Designando un campo scalare specifico come Chiave di
  partizione e specificando condizioni di filtraggio basate sulla Chiave di
  partizione durante la ricerca, è possibile restringere l'ambito di ricerca a
  diverse partizioni, migliorando così l'efficienza della ricerca. Questo
  articolo illustra l'uso della chiave di partizione e le relative
  considerazioni.
---

<h1 id="Use-Partition-Key" class="common-anchor-header">Utilizzare la chiave di partizione<button data-href="#Use-Partition-Key" class="anchor-icon" translate="no">
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
    </button></h1><p>La chiave di partizione è una soluzione di ottimizzazione della ricerca basata sulle partizioni. Designando un campo scalare specifico come chiave di partizione e specificando condizioni di filtraggio basate sulla chiave di partizione durante la ricerca, è possibile restringere l'ambito di ricerca a diverse partizioni, migliorando così l'efficienza della ricerca. Questo articolo illustra l'uso della chiave di partizione e le relative considerazioni.</p>
<h2 id="Overview" class="common-anchor-header">Panoramica<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>In Milvus è possibile utilizzare le partizioni per implementare la segregazione dei dati e migliorare le prestazioni di ricerca limitando l'ambito di ricerca a partizioni specifiche. Se si sceglie di gestire le partizioni manualmente, è possibile creare un massimo di 1.024 partizioni in una raccolta e inserire entità in queste partizioni in base a una regola specifica, in modo da poter restringere l'ambito di ricerca limitando le ricerche a un numero specifico di partizioni.</p>
<p>Milvus introduce la chiave di partizione per riutilizzare le partizioni nella segregazione dei dati e superare il limite del numero di partizioni che si possono creare in una raccolta. Quando si crea una raccolta, si può usare un campo scalare come chiave di partizione. Una volta che la collezione è pronta, Milvus crea il numero specificato di partizioni all'interno della collezione. Quando riceve un'entità inserita, Milvus calcola un valore di hash usando il valore della chiave di partizione dell'entità, esegue un'operazione modulo basata sul valore di hash e sulla proprietà <code translate="no">partitions_num</code> della collezione per ottenere l'ID della partizione di destinazione e memorizza l'entità nella partizione di destinazione.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/partition-vs-partition-key.png" alt="Partition Vs Partition Key" class="doc-image" id="partition-vs-partition-key" />
   </span> <span class="img-wrapper"> <span>Partizione Vs. chiave di partizione</span> </span></p>
<p>La figura seguente illustra come Milvus elabora le richieste di ricerca in una raccolta con o senza la funzione Chiave di partizione attivata.</p>
<ul>
<li><p>Se la chiave di partizione è disattivata, Milvus cerca le entità più simili al vettore della query all'interno della raccolta. È possibile restringere l'ambito di ricerca se si conosce la partizione che contiene i risultati più rilevanti.</p></li>
<li><p>Se la chiave di partizione è attivata, Milvus determina l'ambito di ricerca in base al valore della chiave di partizione specificato in un filtro di ricerca e analizza solo le entità all'interno delle partizioni che corrispondono.</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/with-and-without-partition-key.png" alt="With And Without Partition Key" class="doc-image" id="with-and-without-partition-key" />
   </span> <span class="img-wrapper"> <span>Con e senza chiave di partizione</span> </span></p>
<h2 id="Use-Partition-Key" class="common-anchor-header">Utilizzare la chiave di partizione<button data-href="#Use-Partition-Key" class="anchor-icon" translate="no">
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
    </button></h2><p>Per utilizzare la chiave di partizione, è necessario</p>
<ul>
<li><p><a href="/docs/it/v2.5.x/use-partition-key.md#Set-Partition-Key">Impostare la chiave di partizione</a>,</p></li>
<li><p><a href="/docs/it/v2.5.x/use-partition-key.md#Set-Partition-Numbers">impostare il numero di partizioni da creare</a> (facoltativo), e</p></li>
<li><p><a href="/docs/it/v2.5.x/use-partition-key.md#Create-Filtering-Condition">creare una condizione di filtraggio basata sulla chiave di partizione</a>.</p></li>
</ul>
<h3 id="Set-Partition-Key" class="common-anchor-header">Impostazione della chiave di partizione</h3><p>Per designare un campo scalare come chiave di partizione, è necessario impostare l'attributo <code translate="no">is_partition_key</code> su <code translate="no">true</code> quando si aggiunge il campo scalare.</p>
<div class="alert note">
<p>Quando si imposta un campo scalare come chiave di partizione, i valori del campo non possono essere vuoti o nulli.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    MilvusClient, DataType
)

client = MilvusClient(
uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

schema = client.create_schema()

schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>,
datatype=DataType.INT64,
is_primary=<span class="hljs-literal">True</span>)

schema.add_field(field_name=<span class="hljs-string">&quot;vector&quot;</span>,
datatype=DataType.FLOAT_VECTOR,
dim=<span class="hljs-number">5</span>)

<span class="hljs-comment"># Add the partition key</span>
schema.add_field(
field_name=<span class="hljs-string">&quot;my_varchar&quot;</span>,
datatype=DataType.VARCHAR,
max_length=<span class="hljs-number">512</span>,
<span class="hljs-comment"># highlight-next-line</span>
is_partition_key=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

<span class="hljs-comment">// Create schema</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());
        
<span class="hljs-comment">// Add the partition key</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_varchar&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">512</span>)
        <span class="hljs-comment">// highlight-next-line</span>
        .isPartitionKey(<span class="hljs-literal">true</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;localhost:19530&quot;</span>
client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

schema := entity.NewSchema().WithDynamicFieldEnabled(<span class="hljs-literal">false</span>)
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;my_varchar&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithIsPartitionKey(<span class="hljs-literal">true</span>).
    WithMaxLength(<span class="hljs-number">512</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;vector&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">5</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-comment">// 3. Create a collection in customized setup mode</span>
<span class="hljs-comment">// 3.1 Define fields</span>
<span class="hljs-keyword">const</span> fields = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_varchar&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>,
        <span class="hljs-comment">// highlight-next-line</span>
        <span class="hljs-attr">is_partition_key</span>: <span class="hljs-literal">true</span>
    }
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: true,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;vector&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: &quot;5&quot;
                }
            },
            {
                &quot;fieldName&quot;: &quot;my_varchar&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;isPartitionKey&quot;: true,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 512
                }
            }
        ]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-Partition-Numbers" class="common-anchor-header">Impostazione dei numeri di partizione</h3><p>Quando si designa un campo scalare in una collezione come chiave di partizione, Milvus crea automaticamente 16 partizioni nella collezione. Quando riceve un'entità, Milvus sceglie una partizione in base al valore della chiave di partizione di questa entità e memorizza l'entità nella partizione, in modo che alcune o tutte le partizioni contengano entità con valori diversi della chiave di partizione.</p>
<p>È anche possibile determinare il numero di partizioni da creare insieme alla collezione. Questo è valido solo se si ha un campo scalare designato come chiave di partizione.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    <span class="hljs-comment"># highlight-next-line</span>
    num_partitions=<span class="hljs-number">128</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
.collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
.collectionSchema(schema)
.numPartitions(<span class="hljs-number">128</span>)
.build();
client.createCollection(createCollectionReq);
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithNumPartitions(<span class="hljs-number">128</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">create_collection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-attr">num_partitions</span>: <span class="hljs-number">128</span>
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{
    &quot;partitionsNum&quot;: 128
}&#x27;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-Filtering-Condition" class="common-anchor-header">Creare una condizione di filtraggio</h3><p>Quando si effettuano ricerche RNA in una raccolta con la funzione Chiave di partizione attivata, è necessario includere nella richiesta di ricerca un'espressione di filtraggio che coinvolga la Chiave di partizione. Nell'espressione di filtraggio, è possibile limitare il valore della chiave di partizione all'interno di un intervallo specifico, in modo che Milvus restringa l'ambito di ricerca alle partizioni corrispondenti.</p>
<p>Quando si eseguono operazioni di cancellazione, è consigliabile includere un'espressione di filtro che specifichi una singola chiave di partizione per ottenere una cancellazione più efficiente. Questo approccio limita l'operazione di cancellazione a una particolare partizione, riducendo l'amplificazione della scrittura durante la compattazione e conservando le risorse per la compattazione e l'indicizzazione.</p>
<p>Gli esempi seguenti dimostrano il filtraggio basato sulle chiavi di partizione in base a un valore specifico della chiave di partizione e a un insieme di valori della chiave di partizione.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Filter based on a single partition key value, or</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;partition_key == &quot;x&quot; &amp;&amp; &lt;other conditions&gt;&#x27;</span>

<span class="hljs-comment"># Filter based on multiple partition key values</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;partition_key in [&quot;x&quot;, &quot;y&quot;, &quot;z&quot;] &amp;&amp; &lt;other conditions&gt;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java"><span class="hljs-comment">// Filter based on a single partition key value, or</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;partition_key == &#x27;x&#x27; &amp;&amp; &lt;other conditions&gt;&quot;</span>;

<span class="hljs-comment">// Filter based on multiple partition key values</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;partition_key in [&#x27;x&#x27;, &#x27;y&#x27;, &#x27;z&#x27;] &amp;&amp; &lt;other conditions&gt;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Filter based on a single partition key value, or</span>
filter = <span class="hljs-string">&quot;partition_key == &#x27;x&#x27; &amp;&amp; &lt;other conditions&gt;&quot;</span>

<span class="hljs-comment">// Filter based on multiple partition key values</span>
filter = <span class="hljs-string">&quot;partition_key in [&#x27;x&#x27;, &#x27;y&#x27;, &#x27;z&#x27;] &amp;&amp; &lt;other conditions&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Filter based on a single partition key value, or</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;partition_key == &quot;x&quot; &amp;&amp; &lt;other conditions&gt;&#x27;</span>

<span class="hljs-comment">// Filter based on multiple partition key values</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;partition_key in [&quot;x&quot;, &quot;y&quot;, &quot;z&quot;] &amp;&amp; &lt;other conditions&gt;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Filter based on a single partition key value, or</span>
<span class="hljs-built_in">export</span> filter=<span class="hljs-string">&#x27;partition_key == &quot;x&quot; &amp;&amp; &lt;other conditions&gt;&#x27;</span>

<span class="hljs-comment"># Filter based on multiple partition key values</span>
<span class="hljs-built_in">export</span> filter=<span class="hljs-string">&#x27;partition_key in [&quot;x&quot;, &quot;y&quot;, &quot;z&quot;] &amp;&amp; &lt;other conditions&gt;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>È necessario sostituire <code translate="no">partition_key</code> con il nome del campo designato come chiave di partizione.</p>
</div>
<h2 id="Use-Partition-Key-Isolation" class="common-anchor-header">Utilizzare l'isolamento della chiave di partizione<button data-href="#Use-Partition-Key-Isolation" class="anchor-icon" translate="no">
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
    </button></h2><p>Nello scenario multi-tenancy, è possibile designare il campo scalare relativo alle identità dei tenant come chiave di partizione e creare un filtro basato su un valore specifico di questo campo scalare. Per migliorare ulteriormente le prestazioni di ricerca in scenari simili, Milvus introduce la funzione Partition Key Isolation.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/partition-key-isolation.png" alt="Partition Key Isolation" class="doc-image" id="partition-key-isolation" />
   </span> <span class="img-wrapper"> <span>Isolamento della chiave di partizione</span> </span></p>
<p>Come mostrato nella figura precedente, Milvus raggruppa le entità in base al valore della chiave di partizione e crea un indice separato per ciascuno di questi gruppi. Quando riceve una richiesta di ricerca, Milvus individua l'indice in base al valore della chiave di partizione specificato nella condizione di filtraggio e limita l'ambito di ricerca alle entità incluse nell'indice, evitando così la scansione di entità irrilevanti durante la ricerca e migliorando notevolmente le prestazioni della ricerca.</p>
<p>Una volta abilitato l'isolamento della chiave di partizione, è necessario includere solo un valore specifico nel filtro basato sulla chiave di partizione, in modo che Milvus possa restringere la portata della ricerca all'interno delle entità incluse nell'indice che corrispondono.</p>
<div class="alert note">
<p>Attualmente, la funzione Isolamento chiave di partizione si applica solo alle ricerche con il tipo di indice impostato su HNSW.</p>
</div>
<h3 id="Enable-Partition-Key-Isolation" class="common-anchor-header">Abilitazione dell'isolamento delle chiavi di partizione</h3><p>I seguenti esempi di codice mostrano come abilitare l'isolamento delle chiavi di partizione.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    <span class="hljs-comment"># highlight-next-line</span>
    properties={<span class="hljs-string">&quot;partitionkey.isolation&quot;</span>: <span class="hljs-literal">True</span>}
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

Map&lt;String, String&gt; properties = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
properties.put(<span class="hljs-string">&quot;partitionkey.isolation&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>);

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
.collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
.collectionSchema(schema)
.properties(properties)
.build();
client.createCollection(createCollectionReq);
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithProperty(<span class="hljs-string">&quot;partitionkey.isolation&quot;</span>, <span class="hljs-literal">true</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">properties</span>: {
        <span class="hljs-string">&quot;partitionkey.isolation&quot;</span>: <span class="hljs-literal">true</span>
    }
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{
    &quot;partitionKeyIsolation&quot;: true
}&#x27;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dopo aver abilitato l'isolamento della chiave di partizione, è possibile impostare la chiave di partizione e il numero di partizioni come descritto in <a href="/docs/it/v2.5.x/use-partition-key.md#Set-Partition-Numbers">Impostazione dei numeri di partizione</a>. Si noti che il filtro basato sulla chiave di partizione deve includere solo un valore specifico della chiave di partizione.</p>
