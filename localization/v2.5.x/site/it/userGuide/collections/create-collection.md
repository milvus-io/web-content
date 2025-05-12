---
id: create-collection.md
title: Creare una raccolta
summary: >-
  È possibile creare una raccolta definendone lo schema, i parametri
  dell'indice, il tipo di metrica e se caricarla o meno al momento della
  creazione. Questa pagina illustra come creare una raccolta da zero.
---
<h1 id="Create-Collection" class="common-anchor-header">Creare una raccolta<button data-href="#Create-Collection" class="anchor-icon" translate="no">
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
    </button></h1><p>È possibile creare una raccolta definendone lo schema, i parametri dell'indice, il tipo di metrica e se caricarla o meno al momento della creazione. Questa pagina spiega come creare una raccolta da zero.</p>
<h2 id="Overview" class="common-anchor-header">Schema<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Una collezione è una tabella bidimensionale con colonne fisse e righe variabili. Ogni colonna rappresenta un campo e ogni riga rappresenta un'entità. Per implementare questa gestione strutturale dei dati è necessario uno schema. Ogni entità da inserire deve soddisfare i vincoli definiti nello schema.</p>
<p>È possibile determinare ogni aspetto di una collezione, compreso il suo schema, i parametri dell'indice, il tipo di metrica e se caricarla o meno al momento della creazione, per garantire che la collezione soddisfi pienamente i propri requisiti.</p>
<p>Per creare una raccolta, è necessario</p>
<ul>
<li><p><a href="/docs/it/create-collection.md#Create-Schema">Creare lo schema</a></p></li>
<li><p><a href="/docs/it/create-collection.md#Optional-Set-Index-Parameters">Impostare i parametri dell'indice</a> (opzionale)</p></li>
<li><p><a href="/docs/it/create-collection.md#Create-a-Collection">Creare la raccolta</a></p></li>
</ul>
<h2 id="Create-Schema" class="common-anchor-header">Creare uno schema<button data-href="#Create-Schema" class="anchor-icon" translate="no">
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
    </button></h2><p>Uno schema definisce la struttura dei dati di una raccolta. Quando si crea una raccolta, è necessario progettare lo schema in base alle proprie esigenze. Per maggiori dettagli, consultare <a href="/docs/it/schema.md">Schema spiegato</a>.</p>
<p>I seguenti frammenti di codice creano uno schema con il campo dinamico abilitato e tre campi obbligatori denominati <code translate="no">my_id</code>, <code translate="no">my_vector</code> e <code translate="no">my_varchar</code>.</p>
<div class="alert note">
<p>È possibile impostare valori predefiniti per qualsiasi campo scalare e renderlo nullable. Per maggiori dettagli, consultare <a href="/docs/it/nullable-and-default.md">Nullable e Default</a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. Create a collection in customized setup mode</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># 3.1. Create schema</span>
schema = MilvusClient.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_field=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># 3.2. Add fields to schema</span>
schema.add_field(field_name=<span class="hljs-string">&quot;my_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;my_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;my_varchar&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">TOKEN</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;root:Milvus&quot;</span>;

<span class="hljs-comment">// 1. Connect to Milvus server</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(CLUSTER_ENDPOINT)
        .token(TOKEN)
        .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-comment">// 3. Create a collection in customized setup mode</span>

<span class="hljs-comment">// 3.1 Create schema</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

<span class="hljs-comment">// 3.2 Add fields to schema</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">false</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_varchar&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">512</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-comment">// 3. Create a collection in customized setup mode</span>
<span class="hljs-comment">// 3.1 Define fields</span>
<span class="hljs-keyword">const</span> fields = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">false</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_varchar&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>
    }
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>
    
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/pkg/v2/common&quot;</span>
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

schema := entity.NewSchema().WithDynamicFieldEnabled(<span class="hljs-literal">true</span>).
        WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_id&quot;</span>).WithIsAutoID(<span class="hljs-literal">false</span>).WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(<span class="hljs-literal">true</span>)).
        WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_vector&quot;</span>).WithDataType(entity.FieldTypeFloatVector).WithDim(<span class="hljs-number">5</span>)).
        WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_varchar&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">512</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: false,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;my_id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;my_vector&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: &quot;5&quot;
                }
            },
            {
                &quot;fieldName&quot;: &quot;my_varchar&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 512
                }
            }
        ]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Optional-Set-Index-Parameters" class="common-anchor-header">(Facoltativo) Impostare i parametri dell'indice<button data-href="#Optional-Set-Index-Parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>La creazione di un indice su un campo specifico accelera la ricerca su questo campo. Un indice registra l'ordine delle entità all'interno di un insieme. Come mostrato nei seguenti frammenti di codice, è possibile utilizzare <code translate="no">metric_type</code> e <code translate="no">index_type</code> per selezionare i modi appropriati per Milvus di indicizzare un campo e misurare le somiglianze tra le incorporazioni vettoriali.</p>
<p>In Milvus, si può usare <code translate="no">AUTOINDEX</code> come tipo di indice per tutti i campi vettoriali e uno tra <code translate="no">COSINE</code>, <code translate="no">L2</code> e <code translate="no">IP</code> come tipo di metrica in base alle proprie esigenze.</p>
<p>Come dimostrato nel frammento di codice precedente, è necessario impostare sia il tipo di indice che il tipo di metrica per i campi vettoriali e solo il tipo di indice per i campi scalari. Gli indici sono obbligatori per i campi vettoriali e si consiglia di creare indici sui campi scalari usati frequentemente nelle condizioni di filtraggio.</p>
<p>Per maggiori dettagli, consultare la sezione <a href="/docs/it/index-vector-fields.md">Indicizzazione dei campi vettoriali</a> e <a href="/docs/it/index-scalar-fields.md">Indicizzazione dei campi scalari</a>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3.3. Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># 3.4. Add indexes</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;my_id&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;my_vector&quot;</span>, 
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-comment">// 3.3 Prepare index parameters</span>
<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForIdField</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;my_id&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .build();

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForVectorField</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;my_vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build();

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(indexParamForIdField);
indexParams.add(indexParamForVectorField);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3.2 Prepare index parameters</span>
<span class="hljs-keyword">const</span> index_params = [{
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;my_id&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>
},{
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;my_vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>
}]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

collectionName := <span class="hljs-string">&quot;customized_setup_1&quot;</span>
indexOptions := []milvusclient.CreateIndexOption{
    milvusclient.NewCreateIndexOption(collectionName, <span class="hljs-string">&quot;my_vector&quot;</span>, index.NewAutoIndex(entity.COSINE)),
    milvusclient.NewCreateIndexOption(collectionName, <span class="hljs-string">&quot;my_id&quot;</span>, index.NewAutoIndex(entity.COSINE)),
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;my_vector&quot;,
            &quot;metricType&quot;: &quot;COSINE&quot;,
            &quot;indexName&quot;: &quot;my_vector&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;
        },
        {
            &quot;fieldName&quot;: &quot;my_id&quot;,
            &quot;indexName&quot;: &quot;my_id&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;
        }
    ]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-a-Collection" class="common-anchor-header">Creare una collezione<button data-href="#Create-a-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Se si è creata una collezione con parametri di indice, Milvus carica automaticamente la collezione alla sua creazione. In questo caso, tutti i campi indicati nei parametri dell'indice vengono indicizzati.</p>
<p>I seguenti frammenti di codice dimostrano come creare la collezione con parametri di indice e verificarne lo stato di caricamento.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3.5. Create a collection with the index loaded simultaneously</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_1&quot;</span>,
    schema=schema,
    index_params=index_params
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;customized_setup_1&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.GetLoadStateReq;

<span class="hljs-comment">// 3.4 Create a collection with schema and index parameters</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq1</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;customized_setup_1&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexParams)
        .build();

client.createCollection(customizedSetupReq1);

<span class="hljs-comment">// 3.5 Get load state of the collection</span>
<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">customSetupLoadStateReq1</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()
        .collectionName(<span class="hljs-string">&quot;customized_setup_1&quot;</span>)
        .build();

<span class="hljs-type">Boolean</span> <span class="hljs-variable">loaded</span> <span class="hljs-operator">=</span> client.getLoadState(customSetupLoadStateReq1);
System.out.println(loaded);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3.3 Create a collection with fields and index parameters</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_1&quot;</span>,
    <span class="hljs-attr">fields</span>: fields,
    <span class="hljs-attr">index_params</span>: index_params,
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)  

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_1&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;customized_setup_1&quot;</span>, schema).
    WithIndexOptions(indexOptions...))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(<span class="hljs-string">&quot;collection created&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;customized_setup_1\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>È anche possibile creare una collezione senza parametri di indice e aggiungerli successivamente. In questo caso, Milvus non carica la collezione al momento della sua creazione. .</p>
<p>Il seguente frammento di codice mostra come creare una collezione senza indice e lo stato di caricamento della collezione rimane non caricato al momento della creazione.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3.6. Create a collection and index it separately</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    schema=schema,
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: NotLoad&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 3.6 Create a collection and index it separately</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq2</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .collectionSchema(schema)
    .build();

client.createCollection(customizedSetupReq2);

<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">customSetupLoadStateReq2</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()
        .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
        .build();
        
<span class="hljs-type">Boolean</span> <span class="hljs-variable">loaded</span> <span class="hljs-operator">=</span> client.getLoadState(customSetupLoadStateReq2);
System.out.println(loaded);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// false</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3.4 Create a collection and index it seperately</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    <span class="hljs-attr">fields</span>: fields,
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateNotLoad</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;customized_setup_2&quot;</span>, schema))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(<span class="hljs-string">&quot;collection created&quot;</span>)

state, err := client.GetLoadState(ctx, milvusclient.NewGetLoadStateOption(<span class="hljs-string">&quot;customized_setup_2&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(state.State)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;customized_setup_2\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>
}&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/get_load_state&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;customized_setup_2\&quot;
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-Collection-Properties" class="common-anchor-header">Impostare le proprietà dell'insieme<button data-href="#Set-Collection-Properties" class="anchor-icon" translate="no">
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
    </button></h2><p>È possibile impostare le proprietà della collezione da creare per adattarla al proprio servizio. Le proprietà applicabili sono le seguenti.</p>
<h3 id="Set-Shard-Number" class="common-anchor-header">Imposta numero di frammenti</h3><p>I frammenti sono fette orizzontali di una raccolta. Ogni frammento corrisponde a un canale di ingresso dei dati. Ogni raccolta ha un frammento per impostazione predefinita. È possibile impostare il numero appropriato di shard quando si crea una raccolta, in base al throughput previsto e al volume dei dati da inserire nella raccolta.</p>
<p>Nei casi più comuni, si consiglia di aumentare il numero di shard di uno ogni volta che il throughput previsto aumenta di 500 MB/s o il volume dei dati da inserire aumenta di 100 GB. Questo suggerimento si basa sulla nostra esperienza e potrebbe non essere completamente adatto agli scenari applicativi. È possibile modificare questo numero per adattarlo alle proprie esigenze o utilizzare il valore predefinito.</p>
<p>Il seguente frammento di codice mostra come impostare il numero di shard quando si crea una collezione.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># With shard number</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_3&quot;</span>,
    schema=schema,
    <span class="hljs-comment"># highlight-next-line</span>
    num_shards=<span class="hljs-number">1</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// With shard number</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq3</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_3&quot;</span>)
    .collectionSchema(collectionSchema)
    <span class="hljs-comment">// highlight-next-line</span>
    .numShards(<span class="hljs-number">1</span>)
    .build();
client.createCollection(customizedSetupReq3);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> createCollectionReq = {
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_3&quot;</span>,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-comment">// highlight-next-line</span>
    <span class="hljs-attr">shards_num</span>: <span class="hljs-number">1</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;customized_setup_3&quot;</span>, schema).WithShardNum(<span class="hljs-number">1</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(<span class="hljs-string">&quot;collection created&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{
    &quot;shardsNum&quot;: 1
}&#x27;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;customized_setup_3\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Enable-mmap" class="common-anchor-header">Abilitare mmap</h3><p>Milvus abilita mmap su tutte le collezioni per impostazione predefinita, consentendo a Milvus di mappare i dati grezzi dei campi in memoria invece di caricarli completamente. Questo riduce l'impronta di memoria e aumenta la capacità della raccolta. Per maggiori dettagli su mmap, vedere <a href="/docs/it/mmap.md">Uso di mmap</a>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#plaintext">plaintext</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># With mmap</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_4&quot;</span>,
    schema=schema,
    <span class="hljs-comment"># highlight-next-line</span>
    enable_mmap=<span class="hljs-literal">False</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.param.Constant;

<span class="hljs-comment">// With MMap</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq4</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;customized_setup_4&quot;</span>)
        .collectionSchema(schema)
        <span class="hljs-comment">// highlight-next-line</span>
        .property(Constant.MMAP_ENABLED, <span class="hljs-string">&quot;false&quot;</span>)
        .build();
client.createCollection(customizedSetupReq4);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.<span class="hljs-title function_">create_collection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_4&quot;</span>,
    <span class="hljs-attr">schema</span>: schema,
     <span class="hljs-attr">properties</span>: {
        <span class="hljs-string">&#x27;mmap.enabled&#x27;</span>: <span class="hljs-literal">true</span>,
     },
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;customized_setup_4&quot;</span>, schema).
    WithProperty(common.MmapEnabledKey, <span class="hljs-literal">true</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(<span class="hljs-string">&quot;collection created&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-plaintext">export params=&#x27;{
    &quot;mmap.enabled&quot;: True
}&#x27;

export CLUSTER_ENDPOINT=&quot;http://localhost:19530&quot;
export TOKEN=&quot;root:Milvus&quot;

curl --request POST \
--url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/collections/create&quot; \
--header &quot;Authorization: Bearer ${TOKEN}&quot; \
--header &quot;Content-Type: application/json&quot; \
-d &quot;{
    \&quot;collectionName\&quot;: \&quot;customized_setup_5\&quot;,
    \&quot;schema\&quot;: $schema,
    \&quot;params\&quot;: $params
}&quot;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-Collection-TTL" class="common-anchor-header">Impostare il TTL dell'insieme</h3><p>Se i dati di una raccolta devono essere abbandonati per un periodo specifico, si può impostare il suo Time-To-Live (TTL) in secondi. Una volta scaduto il TTL, Milvus cancella le entità della raccolta. La cancellazione è asincrona, il che significa che le ricerche e le interrogazioni sono ancora possibili prima che la cancellazione sia completata.</p>
<p>Il seguente frammento di codice imposta il TTL a un giorno (86400 secondi). Si consiglia di impostare il TTL almeno a un paio di giorni.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># With TTL</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_5&quot;</span>,
    schema=schema,
    <span class="hljs-comment"># highlight-start</span>
    properties={
        <span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">86400</span>
    }
    <span class="hljs-comment"># highlight-end</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.param.Constant;

<span class="hljs-comment">// With TTL</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq5</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;customized_setup_5&quot;</span>)
        .collectionSchema(schema)
        <span class="hljs-comment">// highlight-next-line</span>
        .property(Constant.TTL_SECONDS, <span class="hljs-string">&quot;86400&quot;</span>)
        .build();
client.createCollection(customizedSetupReq5);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> createCollectionReq = {
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_5&quot;</span>,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-comment">// highlight-start</span>
    <span class="hljs-attr">properties</span>: {
        <span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">86400</span>
    }
    <span class="hljs-comment">// highlight-end</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;customized_setup_5&quot;</span>, schema).
    WithProperty(common.CollectionTTLConfigKey, <span class="hljs-literal">true</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(<span class="hljs-string">&quot;collection created&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{
    &quot;ttlSeconds&quot;: 86400
}&#x27;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;customized_setup_5\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-Consistency-Level" class="common-anchor-header">Impostare il livello di consistenza</h3><p>Quando si crea una raccolta, è possibile impostare il livello di coerenza per le ricerche e le query nella raccolta. È anche possibile modificare il livello di consistenza dell'insieme durante una ricerca o una query specifica.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># With consistency level</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_6&quot;</span>,
    schema=schema,
    <span class="hljs-comment"># highlight-next</span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;

<span class="hljs-comment">// With consistency level</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq6</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;customized_setup_6&quot;</span>)
        .collectionSchema(schema)
        <span class="hljs-comment">// highlight-next-line</span>
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build();
client.createCollection(customizedSetupReq6);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> createCollectionReq = {
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_6&quot;</span>,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-comment">// highlight-next</span>
    <span class="hljs-attr">consistency_level</span>: <span class="hljs-string">&quot;Bounded&quot;</span>,
    <span class="hljs-comment">// highlight-end</span>
}

client.<span class="hljs-title function_">createCollection</span>(createCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;customized_setup_6&quot;</span>, schema).
    WithConsistencyLevel(entity.ClBounded))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(<span class="hljs-string">&quot;collection created&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{
    &quot;consistencyLevel&quot;: &quot;Bounded&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;customized_setup_6\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per ulteriori informazioni sui livelli di consistenza, vedere <a href="/docs/it/tune_consistency.md">Livello di consistenza</a>.</p>
<h3 id="Enable-Dynamic-Field" class="common-anchor-header">Abilitare il campo dinamico</h3><p>Il campo dinamico di una collezione è un campo riservato JavaScript Object Notation (JSON) chiamato <strong>$meta</strong>. Una volta abilitato questo campo, Milvus salva tutti i campi non definiti da schemi in ogni entità e i loro valori come coppie chiave-valore nel campo riservato.</p>
<p>Per i dettagli su come utilizzare il campo dinamico, consultare <a href="/docs/it/enable-dynamic-field.md">Campo dinamico</a>.</p>
