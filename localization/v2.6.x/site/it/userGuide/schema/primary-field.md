---
id: primary-field.md
title: Campo primario e AutoID
summary: >-
  Ogni collezione in Milvus deve avere un campo primario per identificare in
  modo univoco ogni entità. Questo campo garantisce che ogni entità possa essere
  inserita, aggiornata, interrogata o cancellata senza ambiguità.
---
<h1 id="Primary-Field--AutoID" class="common-anchor-header">Campo primario e AutoID<button data-href="#Primary-Field--AutoID" class="anchor-icon" translate="no">
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
    </button></h1><p>Ogni collezione in Milvus deve avere un campo primario per identificare in modo univoco ogni entità. Questo campo garantisce che ogni entità possa essere inserita, aggiornata, interrogata o cancellata senza ambiguità.</p>
<p>A seconda del caso d'uso, è possibile lasciare che Milvus generi automaticamente gli ID (AutoID) o assegnare manualmente i propri ID.</p>
<h2 id="What-is-a-primary-field" class="common-anchor-header">Che cos'è un campo primario?<button data-href="#What-is-a-primary-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Un campo primario funge da chiave univoca per ogni entità di una raccolta, come una chiave primaria in un database tradizionale. Milvus utilizza il campo primario per gestire le entità durante le operazioni di inserimento, upsert, cancellazione e interrogazione.</p>
<p>Requisiti della chiave:</p>
<ul>
<li><p>Ogni collezione deve avere <strong>esattamente un</strong> campo primario.</p></li>
<li><p>I valori del campo primario non possono essere nulli.</p></li>
<li><p>Il tipo di dati deve essere specificato al momento della creazione e non può essere modificato in seguito.</p></li>
</ul>
<h2 id="Supported-data-types" class="common-anchor-header">Tipi di dati supportati<button data-href="#Supported-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Il campo primario deve utilizzare un tipo di dati scalare supportato che possa identificare in modo univoco le entità.</p>
<table>
   <tr>
     <th><p>Tipo di dati</p></th>
     <th><p>Descrizione</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">INT64</code></p></td>
     <td><p>Tipo intero a 64 bit, comunemente usato con AutoID. È l'opzione consigliata per la maggior parte dei casi d'uso.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">VARCHAR</code></p></td>
     <td><p>Tipo di stringa a lunghezza variabile. Si usa quando gli identificatori delle entità provengono da sistemi esterni (ad esempio, codici prodotto o ID utente). Richiede la proprietà <code translate="no">max_length</code> per definire il numero massimo di byte consentito per ogni valore.</p></td>
   </tr>
</table>
<h2 id="Choose-between-AutoID-and-Manual-IDs" class="common-anchor-header">Scegliere tra AutoID e ID manuali<button data-href="#Choose-between-AutoID-and-Manual-IDs" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus supporta due modalità di assegnazione dei valori delle chiavi primarie.</p>
<table>
   <tr>
     <th><p>Modalità</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Consigliato per</p></th>
   </tr>
   <tr>
     <td><p>AutoID</p></td>
     <td><p>Milvus genera automaticamente identificatori univoci per le entità inserite o importate.</p></td>
     <td><p>La maggior parte degli scenari in cui non è necessario gestire manualmente gli ID.</p></td>
   </tr>
   <tr>
     <td><p>ID manuale</p></td>
     <td><p>L'utente fornisce personalmente gli ID univoci durante l'inserimento o l'importazione dei dati.</p></td>
     <td><p>Quando gli ID devono essere allineati con sistemi esterni o set di dati preesistenti.</p></td>
   </tr>
</table>
<div class="alert note">
<ul>
<li><p>Se non siete sicuri di quale modalità scegliere, <a href="/docs/it/primary-field.md#Quickstart-Use-AutoID">iniziate con AutoID</a> per un'ingestione più semplice e un'unicità garantita.</p></li>
<li><p>Si consiglia di affidarsi a <code translate="no">autoId</code> in tutti i casi, a meno che non sia utile impostare manualmente le chiavi primarie.</p></li>
</ul>
</div>
<h2 id="Quickstart-Use-AutoID" class="common-anchor-header">Avvio rapido: Usare AutoID<button data-href="#Quickstart-Use-AutoID" class="anchor-icon" translate="no">
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
    </button></h2><p>È possibile lasciare che Milvus gestisca automaticamente la generazione di ID.</p>
<h3 id="Step-1-Create-a-collection-with-AutoID" class="common-anchor-header">Passo 1: Creare una collezione con AutoID<button data-href="#Step-1-Create-a-collection-with-AutoID" class="anchor-icon" translate="no">
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
    </button></h3><p>Abilitare <code translate="no">auto_id=True</code> nella definizione del campo primario. Milvus gestirà automaticamente la generazione degli ID.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

schema = client.create_schema()

<span class="hljs-comment"># Define primary field with AutoID enabled</span>
<span class="highlighted-comment-line">schema.add_field(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-comment"># Primary field name</span></span>
<span class="highlighted-comment-line">    is_primary=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">    auto_id=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Milvus generates IDs automatically; Defaults to False</span></span>
<span class="highlighted-comment-line">    datatype=DataType.INT64</span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Define the other fields</span>
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>) <span class="hljs-comment"># Vector field</span>
schema.add_field(field_name=<span class="hljs-string">&quot;category&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>) <span class="hljs-comment"># Scalar field of the VARCHAR type</span>

<span class="hljs-comment"># Create the collection</span>
<span class="hljs-keyword">if</span> client.has_collection(<span class="hljs-string">&quot;demo_autoid&quot;</span>):
    client.drop_collection(<span class="hljs-string">&quot;demo_autoid&quot;</span>)
client.create_collection(collection_name=<span class="hljs-string">&quot;demo_autoid&quot;</span>, schema=schema)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());
        
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">collectionSchema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .build();
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">4</span>)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;category&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .build());

client.dropCollection(DropCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;demo_autoid&quot;</span>)
        .build());

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;demo_autoid&quot;</span>)
        .collectionSchema(collectionSchema)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
});

<span class="hljs-comment">// Define schema fields</span>
<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
    <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;Primary field&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">autoID</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Milvus generates IDs automatically</span>
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,
    <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;Vector field&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
    <span class="hljs-attr">dim</span>: <span class="hljs-number">4</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;category&quot;</span>,
    <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;Scalar field&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
  },
];

<span class="hljs-comment">// Create the collection</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;demo_autoid&quot;</span>,
  <span class="hljs-attr">fields</span>: schema,
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> SCHEMA=<span class="hljs-string">&#x27;{
    &quot;autoID&quot;: true,
    &quot;fields&quot;: [
        {
            &quot;fieldName&quot;: &quot;id&quot;,
            &quot;dataType&quot;: &quot;Int64&quot;,
            &quot;isPrimary&quot;: true,
            &quot;elementTypeParams&quot;: {}
        },
        {
            &quot;fieldName&quot;: &quot;embedding&quot;,
            &quot;dataType&quot;: &quot;FloatVector&quot;,
            &quot;isPrimary&quot;: false,
            &quot;elementTypeParams&quot;: {
                &quot;dim&quot;: &quot;4&quot;
            }
        },
        {
            &quot;fieldName&quot;: &quot;category&quot;,
            &quot;dataType&quot;: &quot;VarChar&quot;,
            &quot;isPrimary&quot;: false,
            &quot;elementTypeParams&quot;: {
                &quot;max_length&quot;: &quot;1000&quot;
            }
        }
    ]
}&#x27;</span>

curl -X POST <span class="hljs-string">&#x27;http://localhost:19530/v2/vectordb/collections/create&#x27;</span> \
-H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;demo_autoid\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$SCHEMA</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Insert-Data" class="common-anchor-header">Passo 2: Inserire i dati<button data-href="#Step-2-Insert-Data" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Importante:</strong> Non includere la colonna del campo primario nei dati. Milvus genera automaticamente gli ID.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">data = [
    {<span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;book&quot;</span>},
    {<span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;toy&quot;</span>},
]

res = client.insert(collection_name=<span class="hljs-string">&quot;demo_autoid&quot;</span>, data=data)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Generated IDs:&quot;</span>, res.get(<span class="hljs-string">&quot;ids&quot;</span>))

<span class="hljs-comment"># Output example:</span>
<span class="hljs-comment"># Generated IDs: [461526052788333649, 461526052788333650]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.*;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;

List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row1.add(<span class="hljs-string">&quot;embedding&quot;</span>, gson.toJsonTree(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>}));
row1.addProperty(<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;book&quot;</span>);
rows.add(row1);

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row2.add(<span class="hljs-string">&quot;embedding&quot;</span>, gson.toJsonTree(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>}));
row2.addProperty(<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;toy&quot;</span>);
rows.add(row2);

<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertR</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;demo_autoid&quot;</span>)
        .data(rows)
        .build());
System.out.printf(<span class="hljs-string">&quot;Generated IDs: %s\n&quot;</span>, insertR.getPrimaryKeys());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [
    {<span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;book&quot;</span>},
    {<span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;toy&quot;</span>},
];

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;demo_autoid&quot;</span>,
    <span class="hljs-attr">fields_data</span>: data,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> INSERT_DATA=<span class="hljs-string">&#x27;[
    {
        &quot;embedding&quot;: [0.1, 0.2, 0.3, 0.4],
        &quot;category&quot;: &quot;book&quot;
    },
    {
        &quot;embedding&quot;: [0.2, 0.3, 0.4, 0.5],
        &quot;category&quot;: &quot;toy&quot;
    }
]&#x27;</span>

curl -X POST <span class="hljs-string">&#x27;http://localhost:19530/v2/vectordb/entities/insert&#x27;</span> \
-H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;demo_autoid\&quot;,
    \&quot;data\&quot;: <span class="hljs-variable">$INSERT_DATA</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Usare <code translate="no">upsert()</code> invece di <code translate="no">insert()</code> quando si lavora con entità esistenti per evitare errori di ID duplicati.</p>
</div>
<h2 id="Use-manual-IDs" class="common-anchor-header">Utilizzare ID manuali<button data-href="#Use-manual-IDs" class="anchor-icon" translate="no">
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
    </button></h2><p>Se è necessario controllare gli ID manualmente, disabilitare AutoID e fornire i propri valori.</p>
<h3 id="Step-1-Create-a-collection-without-AutoID" class="common-anchor-header">Passo 1: Creare un insieme senza AutoID<button data-href="#Step-1-Create-a-collection-without-AutoID" class="anchor-icon" translate="no">
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
    </button></h3><div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

schema = client.create_schema()

<span class="hljs-comment"># Define the primary field without AutoID</span>
<span class="highlighted-comment-line">schema.add_field(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;product_id&quot;</span>,</span>
<span class="highlighted-comment-line">    is_primary=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">    auto_id=<span class="hljs-literal">False</span>,  <span class="hljs-comment"># You&#x27;ll provide IDs manually at data ingestion</span></span>
<span class="highlighted-comment-line">    datatype=DataType.VARCHAR,</span>
<span class="highlighted-comment-line">    max_length=<span class="hljs-number">100</span> <span class="hljs-comment"># Required when datatype is VARCHAR</span></span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Define the other fields</span>
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>) <span class="hljs-comment"># Vector field</span>
schema.add_field(field_name=<span class="hljs-string">&quot;category&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>) <span class="hljs-comment"># Scalar field of the VARCHAR type</span>

<span class="hljs-comment"># Create the collection</span>
<span class="hljs-keyword">if</span> client.has_collection(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>):
    client.drop_collection(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>)
client.create_collection(collection_name=<span class="hljs-string">&quot;demo_manual_ids&quot;</span>, schema=schema)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());
        
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">collectionSchema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .build();
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;product_id&quot;</span>)
        .dataType(DataType.VarChar)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">false</span>)
        .maxLength(<span class="hljs-number">100</span>)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">4</span>)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;category&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .build());

client.dropCollection(DropCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>)
        .build());

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>)
        .collectionSchema(collectionSchema)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
  <span class="hljs-attr">username</span>: <span class="hljs-string">&quot;username&quot;</span>,
  <span class="hljs-attr">password</span>: <span class="hljs-string">&quot;Aa12345!!&quot;</span>,
});

<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;product_id&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VARCHAR</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FLOAT_VECTOR</span>,
    <span class="hljs-attr">dim</span>: <span class="hljs-number">4</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;category&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VARCHAR</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
  },
];

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;demo_autoid&quot;</span>,
  <span class="hljs-attr">schema</span>: schema,
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> SCHEMA=<span class="hljs-string">&#x27;{
    &quot;autoID&quot;: false,
    &quot;fields&quot;: [
        {
            &quot;fieldName&quot;: &quot;product_id&quot;,
            &quot;dataType&quot;: &quot;VarChar&quot;,
            &quot;isPrimary&quot;: true,
            &quot;elementTypeParams&quot;: {
                &quot;max_length&quot;: &quot;100&quot;
            }
        },
        {
            &quot;fieldName&quot;: &quot;embedding&quot;,
            &quot;dataType&quot;: &quot;FloatVector&quot;,
            &quot;isPrimary&quot;: false,
            &quot;elementTypeParams&quot;: {
                &quot;dim&quot;: &quot;4&quot;
            }
        },
        {
            &quot;fieldName&quot;: &quot;category&quot;,
            &quot;dataType&quot;: &quot;VarChar&quot;,
            &quot;isPrimary&quot;: false,
            &quot;elementTypeParams&quot;: {
                &quot;max_length&quot;: &quot;1000&quot;
            }
        }
    ]
}&#x27;</span>

curl -X POST <span class="hljs-string">&#x27;http://localhost:19530/v2/vectordb/collections/create&#x27;</span> \
-H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;demo_manual_ids\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$SCHEMA</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Insert-data-with-your-IDs" class="common-anchor-header">Passo 2: Inserire i dati con i propri ID<button data-href="#Step-2-Insert-data-with-your-IDs" class="anchor-icon" translate="no">
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
    </button></h3><p>È necessario includere la colonna del campo primario in ogni operazione di inserimento.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Each entity must contain the primary field `product_id`</span>
data = [
    {<span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-string">&quot;PROD-001&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;book&quot;</span>},
    {<span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-string">&quot;PROD-002&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;toy&quot;</span>},
]

res = client.insert(collection_name=<span class="hljs-string">&quot;demo_manual_ids&quot;</span>, data=data)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Generated IDs:&quot;</span>, res.get(<span class="hljs-string">&quot;ids&quot;</span>))

<span class="hljs-comment"># Output example:</span>
<span class="hljs-comment"># Generated IDs: [&#x27;PROD-001&#x27;, &#x27;PROD-002&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.*;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;

List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row1.addProperty(<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;PROD-001&quot;</span>);
row1.add(<span class="hljs-string">&quot;embedding&quot;</span>, gson.toJsonTree(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>}));
row1.addProperty(<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;book&quot;</span>);
rows.add(row1);

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row2.addProperty(<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;PROD-002&quot;</span>);
row2.add(<span class="hljs-string">&quot;embedding&quot;</span>, gson.toJsonTree(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>}));
row2.addProperty(<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;toy&quot;</span>);
rows.add(row2);

<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertR</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>)
        .data(rows)
        .build());
System.out.printf(<span class="hljs-string">&quot;Generated IDs: %s\n&quot;</span>, insertR.getPrimaryKeys());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">
<span class="hljs-keyword">const</span> data = [
    {<span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-string">&quot;PROD-001&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;book&quot;</span>},
    {<span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-string">&quot;PROD-002&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;toy&quot;</span>},
];

<span class="hljs-keyword">const</span> insert = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;demo_autoid&quot;</span>,
    <span class="hljs-attr">fields_data</span>: data,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(insert);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> INSERT_DATA=<span class="hljs-string">&#x27;[
    {
        &quot;product_id&quot;: &quot;PROD-001&quot;,
        &quot;embedding&quot;: [0.1, 0.2, 0.3, 0.4],
        &quot;category&quot;: &quot;book&quot;
    },
    {
        &quot;product_id&quot;: &quot;PROD-002&quot;,
        &quot;embedding&quot;: [0.2, 0.3, 0.4, 0.5],
        &quot;category&quot;: &quot;toy&quot;
    }
]&#x27;</span>

<span class="hljs-comment"># 插入数据</span>
curl -X POST <span class="hljs-string">&#x27;http://localhost:19530/v2/vectordb/entities/insert&#x27;</span> \
-H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;demo_manual_ids\&quot;,
    \&quot;data\&quot;: <span class="hljs-variable">$INSERT_DATA</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Le vostre responsabilità:</p>
<ul>
<li><p>Assicurarsi che tutti gli ID siano unici per tutte le entità.</p></li>
<li><p>Includere il campo primario in ogni operazione di inserimento/importazione</p></li>
<li><p>Gestire autonomamente i conflitti di ID e il rilevamento dei duplicati</p></li>
</ul>
<h2 id="Advanced-usage" class="common-anchor-header">Utilizzo avanzato<button data-href="#Advanced-usage" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Migrate-data-with-existing-AutoIDs" class="common-anchor-header">Migrare i dati con gli AutoID esistenti<button data-href="#Migrate-data-with-existing-AutoIDs" class="anchor-icon" translate="no">
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
    </button></h3><p>Per preservare gli ID esistenti durante la migrazione dei dati, abilitare la proprietà <code translate="no">allow_insert_auto_id</code> effettuando la chiamata <code translate="no">alter_collection_properties</code>. Se impostata su true, Milvus accetta gli ID forniti dall'utente anche se AutoID è abilitato.</p>
<p>Per i dettagli sulla configurazione, fare riferimento a <a href="/docs/it/modify-collection.md#Example-5-Enable-allowinsertautoid">Modifica della raccolta</a>.</p>
<h3 id="Ensure-global-AutoID-uniqueness-across-clusters" class="common-anchor-header">Garantire l'unicità dell'AutoID globale in tutti i cluster<button data-href="#Ensure-global-AutoID-uniqueness-across-clusters" class="anchor-icon" translate="no">
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
    </button></h3><p>Quando si eseguono più cluster Milvus, configurare un ID cluster unico per ciascuno di essi per garantire che gli AutoID non si sovrappongano mai.</p>
<p><strong>Configurazione:</strong> Modificare la configurazione <code translate="no">common.clusterID</code> in <code translate="no">milvus.yaml</code> prima di inizializzare il cluster:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">common:</span>
  <span class="hljs-attr">clusterID:</span> <span class="hljs-number">3</span>   <span class="hljs-comment"># Must be unique across all clusters (Range: 0-7)</span>
<button class="copy-code-btn"></button></code></pre>
<p>In questa configurazione, <code translate="no">clusterID</code> specifica l'identificatore unico usato nella generazione dell'AutoID, che va da 0 a 7 (supporta fino a otto cluster).</p>
<div class="alert note">
<p>Milvus gestisce internamente l'inversione dei bit per consentire un'espansione futura senza sovrapposizioni di ID. Non è necessaria alcuna configurazione manuale oltre all'impostazione dell'ID del cluster.</p>
</div>
<h2 id="Reference-How-AutoID-works" class="common-anchor-header">Riferimento: Come funziona AutoID<button data-href="#Reference-How-AutoID-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Capire come AutoID genera internamente gli identificatori univoci può aiutare a <a href="/docs/it/primary-field.md#Ensure-global-AutoID-uniqueness-across-clusters">configurare</a> correttamente <a href="/docs/it/primary-field.md#Ensure-global-AutoID-uniqueness-across-clusters">gli ID dei cluster</a> e a risolvere i problemi relativi agli ID.</p>
<p>AutoID utilizza un formato strutturato a 64 bit per garantire l'unicità:</p>
<pre><code translate="no" class="language-plaintext">[sign_bit][cluster_id][physical_ts][logical_ts]
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Segmento</p></th>
     <th><p>Descrizione</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">sign_bit</code></p></td>
     <td><p>Riservato per uso interno</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">cluster_id</code></p></td>
     <td><p>Identifica quale cluster ha generato l'ID (intervallo di valori: 0-7)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">physical_ts</code></p></td>
     <td><p>Timestamp in millisecondi quando l'ID è stato generato</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">logical_ts</code></p></td>
     <td><p>Contatore per distinguere gli ID creati nello stesso millisecondo</p></td>
   </tr>
</table>
<div class="alert note">
<p>Anche quando AutoID è abilitato con <code translate="no">VARCHAR</code> come tipo di dati, Milvus genera comunque ID numerici. Questi sono memorizzati come stringhe numeriche con una lunghezza massima di 20 caratteri (intervallo uint64).</p>
</div>
