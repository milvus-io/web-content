---
id: use-json-fields.md
title: Campo JSON
summary: >-
  Milvus consente di memorizzare e indicizzare dati strutturati all'interno di
  un singolo campo utilizzando il tipo di dati JSON. Questo permette di creare
  schemi flessibili con attributi annidati, consentendo al contempo un
  filtraggio efficiente tramite l'indicizzazione dei percorsi JSON.
---
<h1 id="JSON-Field" class="common-anchor-header">Campo JSON<button data-href="#JSON-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus consente di memorizzare e indicizzare dati strutturati all'interno di un singolo campo utilizzando il tipo di dati <code translate="no">JSON</code>. Questo permette di creare schemi flessibili con attributi annidati, consentendo al contempo un filtraggio efficiente tramite l'indicizzazione dei percorsi JSON.</p>
<h2 id="What-is-a-JSON-field" class="common-anchor-header">Che cos'è un campo JSON?<button data-href="#What-is-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Un campo JSON è un campo definito dallo schema di Milvus che memorizza dati strutturati a valore-chiave. I valori possono includere stringhe, numeri, booleani, array o oggetti profondamente annidati.</p>
<p>Ecco un esempio di come potrebbe apparire un campo JSON in un documento:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;electronics&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;BrandA&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">99.99</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;string_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;99.99&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;tags&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;clearance&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;summer_sale&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;supplier&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;SupplierX&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;country&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;USA&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;contact&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;email&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;support@supplierx.com&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;phone&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>In questo esempio:</p>
<ul>
<li><p><code translate="no">metadata</code> è il campo JSON definito nello schema.</p></li>
<li><p>È possibile memorizzare valori piatti (ad esempio, <code translate="no">category</code>, <code translate="no">in_stock</code>), array (<code translate="no">tags</code>) e oggetti annidati (<code translate="no">supplier</code>).</p></li>
</ul>
<h2 id="Define-a-JSON-field-in-the-schema" class="common-anchor-header">Definire un campo JSON nello schema<button data-href="#Define-a-JSON-field-in-the-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>Per utilizzare un campo JSON, occorre definirlo esplicitamente nello schema della collezione, specificando <code translate="no">DataType</code> come <code translate="no">JSON</code>.</p>
<p>L'esempio seguente crea una collezione con il suo schema contenente questi campi:</p>
<ul>
<li><p>La chiave primaria (<code translate="no">product_id</code>)</p></li>
<li><p>Un campo <code translate="no">vector</code> (obbligatorio per ogni raccolta)</p></li>
<li><p>Un campo <code translate="no">metadata</code> di tipo <code translate="no">JSON</code>, che può memorizzare dati strutturati come valori piatti, array o oggetti annidati.</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Create schema with a JSON field</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">True</span>)

schema.add_field(field_name=<span class="hljs-string">&quot;product_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)
<span class="highlighted-wrapper-line">schema.add_field(field_name=<span class="hljs-string">&quot;metadata&quot;</span>, datatype=DataType.JSON, nullable=<span class="hljs-literal">True</span>)  <span class="hljs-comment"># JSON field that allows null values</span></span>

client.create_collection(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    schema=schema
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.*;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .enableDynamicField(<span class="hljs-literal">true</span>)
        .build();
        
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;product_id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(Boolean.TRUE)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;metadata&quot;</span>)
        .dataType(DataType.JSON)
        .isNullable(<span class="hljs-literal">true</span>)
        .build());
        
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .collectionSchema(schema)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}

schema := entity.NewSchema().WithDynamicFieldEnabled(<span class="hljs-literal">true</span>)
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;product_id&quot;</span>).pk
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;vector&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">5</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;metadata&quot;</span>).
    WithDataType(entity.FieldTypeJSON).
    WithNullable(<span class="hljs-literal">true</span>),
)

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, schema))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Si può anche attivare la funzione di campo dinamico per memorizzare campi non dichiarati in modo flessibile, ma non è necessaria per il funzionamento dei campi JSON. Per ulteriori informazioni, consultare <a href="/docs/it/enable-dynamic-field.md">Campo dinamico</a>.</p>
</div>
<h2 id="Insert-entities-with-JSON-data" class="common-anchor-header">Inserire entità con dati JSON<button data-href="#Insert-entities-with-JSON-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta creata la collezione, inserire le entità che contengono oggetti JSON strutturati nel campo <code translate="no">metadata</code> JSON.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">entities = [
    {
        <span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>],
        <span class="hljs-string">&quot;metadata&quot;</span>: {
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;string_price&quot;</span>: <span class="hljs-string">&quot;99.99&quot;</span>,
            <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>],
            <span class="hljs-string">&quot;supplier&quot;</span>: {
                <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;SupplierX&quot;</span>,
                <span class="hljs-string">&quot;country&quot;</span>: <span class="hljs-string">&quot;USA&quot;</span>,
                <span class="hljs-string">&quot;contact&quot;</span>: {
                    <span class="hljs-string">&quot;email&quot;</span>: <span class="hljs-string">&quot;support@supplierx.com&quot;</span>,
                    <span class="hljs-string">&quot;phone&quot;</span>: <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
                }
            }
        }
    }
]

client.insert(collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>, data=entities)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row.addProperty(<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-number">1</span>);
row.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(Arrays.asList(<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>)));

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">metadata</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
metadata.addProperty(<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;electronics&quot;</span>);
metadata.addProperty(<span class="hljs-string">&quot;brand&quot;</span>, <span class="hljs-string">&quot;BrandA&quot;</span>);
metadata.addProperty(<span class="hljs-string">&quot;in_stock&quot;</span>, <span class="hljs-literal">true</span>);
metadata.addProperty(<span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-number">99.99</span>);
metadata.addProperty(<span class="hljs-string">&quot;string_price&quot;</span>, <span class="hljs-string">&quot;99.99&quot;</span>);
metadata.add(<span class="hljs-string">&quot;tags&quot;</span>, gson.toJsonTree(Arrays.asList(<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>)));

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">supplier</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
supplier.addProperty(<span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;SupplierX&quot;</span>);
supplier.addProperty(<span class="hljs-string">&quot;country&quot;</span>, <span class="hljs-string">&quot;USA&quot;</span>);

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">contact</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
contact.addProperty(<span class="hljs-string">&quot;email&quot;</span>, <span class="hljs-string">&quot;support@supplierx.com&quot;</span>);
contact.addProperty(<span class="hljs-string">&quot;phone&quot;</span>, <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>);

supplier.add(<span class="hljs-string">&quot;contact&quot;</span>, contact);
metadata.add(<span class="hljs-string">&quot;supplier&quot;</span>, supplier);
row.add(<span class="hljs-string">&quot;metadata&quot;</span>, metadata);

client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .data(Collections.singletonList(row))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;product_catalog&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;product_id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">1</span>}).
    WithFloatVectorColumn(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-number">5</span>, [][]<span class="hljs-type">float32</span>{
        {<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>},
    }).WithColumns(
    column.NewColumnJSONBytes(<span class="hljs-string">&quot;metadata&quot;</span>, [][]<span class="hljs-type">byte</span>{
        []<span class="hljs-type">byte</span>(<span class="hljs-string">`{
            &quot;category&quot;: &quot;electronics&quot;,
            &quot;brand&quot;: &quot;BrandA&quot;,
            &quot;in_stock&quot;: True,
            &quot;price&quot;: 99.99,
            &quot;string_price&quot;: &quot;99.99&quot;,
            &quot;tags&quot;: [&quot;clearance&quot;, &quot;summer_sale&quot;],
            &quot;supplier&quot;: {
                &quot;name&quot;: &quot;SupplierX&quot;,
                &quot;country&quot;: &quot;USA&quot;,
                &quot;contact&quot;: {
                    &quot;email&quot;: &quot;support@supplierx.com&quot;,
                    &quot;phone&quot;: &quot;+1-800-555-0199&quot;
                }
            }
        }`</span>),
    }),
))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-values-inside-the-JSON-field--Milvus-2511+" class="common-anchor-header">Indicizzare i valori all'interno del campo JSON<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.11+</span><button data-href="#Index-values-inside-the-JSON-field--Milvus-2511+" class="anchor-icon" translate="no">
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
    </button></h2><p>Per accelerare il filtraggio scalare sui campi JSON, Milvus supporta l'indicizzazione dei campi JSON utilizzando l'<strong>indicizzazione dei percorsi JSON</strong>. Ciò consente di filtrare per chiavi o valori annidati all'interno di un oggetto JSON senza scansionare l'intero campo.</p>
<div class="alert note">
<p>L'indicizzazione dei campi JSON è <strong>facoltativa</strong>. È comunque possibile eseguire interrogazioni o filtri in base ai percorsi JSON senza un indice, ma ciò può comportare un rallentamento delle prestazioni a causa di una ricerca brutale.</p>
</div>
<h3 id="JSON-path-indexing-syntax" class="common-anchor-header">Sintassi dell'indicizzazione dei percorsi JSON</h3><p>Per creare un indice di percorso JSON, specificare:</p>
<ul>
<li><p><strong>Percorso JSON</strong> (<code translate="no">json_path</code>): Il percorso della chiave o del campo annidato nell'oggetto JSON che si desidera indicizzare.</p>
<ul>
<li><p>Esempio: <code translate="no">metadata[&quot;category&quot;]</code></p>
<p>Questo definisce dove il motore di indicizzazione deve cercare all'interno della struttura JSON.</p></li>
</ul></li>
<li><p><strong>Tipo di cast JSON</strong> (<code translate="no">json_cast_type</code>): Il tipo di dati che Milvus deve utilizzare per interpretare e indicizzare il valore nel percorso specificato.</p>
<ul>
<li><p>Questo tipo deve corrispondere al tipo di dati effettivo del campo da indicizzare. Se si desidera convertire il tipo di dati in un altro durante l'indicizzazione, si può <a href="/docs/it/use-json-fields.md#Use-JSON-cast-functions-for-type-conversion">utilizzare una funzione cast</a>.</p></li>
<li><p>Per un elenco completo, vedere <a href="/docs/it/use-json-fields.md#Supported-JSON-cast-types">di seguito</a>.</p></li>
</ul></li>
</ul>
<h4 id="Supported-JSON-cast-types" class="common-anchor-header">Tipi di cast JSON supportati</h4><p>I tipi di cast non fanno distinzione tra maiuscole e minuscole. Sono supportati i seguenti tipi:</p>
<table>
   <tr>
     <th><p>Tipo di cast</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Esempio di valore JSON</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">bool</code></p></td>
     <td><p>Valore booleano</p></td>
     <td><p><code translate="no">true</code>, <code translate="no">false</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">double</code></p></td>
     <td><p>Valore numerico (intero o float)</p></td>
     <td><p><code translate="no">42</code>, <code translate="no">99.99</code>, <code translate="no">-15.5</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">varchar</code></p></td>
     <td><p>Valore stringa</p></td>
     <td><p><code translate="no">"electronics"</code>, <code translate="no">"BrandA"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">array_bool</code></p></td>
     <td><p>Array di booleani</p></td>
     <td><p><code translate="no">[true, false, true]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">array_double</code></p></td>
     <td><p>Matrice di numeri</p></td>
     <td><p><code translate="no">[1.2, 3.14, 42]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">array_varchar</code></p></td>
     <td><p>Array di stringhe</p></td>
     <td><p><code translate="no">["tag1", "tag2", "tag3"]</code></p></td>
   </tr>
</table>
<div class="alert note">
<p>Gli array devono contenere elementi dello stesso tipo per un'indicizzazione ottimale. Per ulteriori informazioni, consultare <a href="/docs/it/array_data_type.md">Campo di array</a>.</p>
</div>
<h4 id="Example-Create-JSON-path-indexes" class="common-anchor-header">Esempio: Creare indici di percorsi JSON</h4><p>Utilizzando la struttura JSON <code translate="no">metadata</code> della nostra introduzione, ecco alcuni esempi di come creare indici su diversi percorsi JSON:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Index the category field as a string</span>
index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTEDfor JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,  <span class="hljs-comment"># Unique index name</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>, <span class="hljs-comment"># Path to the JSON key to be indexed</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span> <span class="hljs-comment"># Data cast type</span></span>
<span class="highlighted-comment-line">    }</span>
)

<span class="hljs-comment"># Index the tags array as string array</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTEDfor JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;tags_array_index&quot;</span>, <span class="hljs-comment"># Unique index name</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;tags\&quot;]&quot;</span>, <span class="hljs-comment"># Path to the JSON key to be indexed</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;array_varchar&quot;</span> <span class="hljs-comment"># Data cast type</span></span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

Map&lt;String,Object&gt; extraParams1 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams1.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>);
extraParams1.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;varchar&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;metadata&quot;</span>)
        .indexName(<span class="hljs-string">&quot;category_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams1)
        .build());

Map&lt;String,Object&gt; extraParams2 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams2.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;tags\&quot;]&quot;</span>);
extraParams2.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;array_varchar&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;metadata&quot;</span>)
        .indexName(<span class="hljs-string">&quot;tags_array_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams2)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
)

jsonIndex1 := index.NewJSONPathIndex(index.AUTOINDEX, <span class="hljs-string">&quot;varchar&quot;</span>, <span class="hljs-string">`metadata[&quot;category&quot;]`</span>)
    .WithIndexName(<span class="hljs-string">&quot;category_index&quot;</span>)
jsonIndex2 := index.NewJSONPathIndex(index.AUTOINDEX, <span class="hljs-string">&quot;array_varchar&quot;</span>, <span class="hljs-string">`metadata[&quot;tags&quot;]`</span>)
    .WithIndexName(<span class="hljs-string">&quot;tags_array_index&quot;</span>)

indexOpt1 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>, jsonIndex1)
indexOpt2 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>, jsonIndex2)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Use-JSON-cast-functions-for-type-conversion--Milvus-2514+" class="common-anchor-header">Utilizzare le funzioni di cast JSON per la conversione dei tipi<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.14+</span></h3><p>Se la chiave del campo JSON contiene valori in un formato non corretto (ad esempio, numeri memorizzati come stringhe), è possibile utilizzare le funzioni di cast per convertire i valori durante l'indicizzazione.</p>
<h4 id="Supported-cast-functions" class="common-anchor-header">Funzioni cast supportate</h4><p>Le funzioni cast non fanno distinzione tra maiuscole e minuscole. Sono supportati i seguenti tipi:</p>
<table>
   <tr>
     <th><p>Funzione di fusione</p></th>
     <th><p>Converte da → a</p></th>
     <th><p>Caso d'uso</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">"STRING_TO_DOUBLE"</code></p></td>
     <td><p>Stringa → Numerico (doppio)</p></td>
     <td><p>Convertire <code translate="no">"99.99"</code> in <code translate="no">99.99</code></p></td>
   </tr>
</table>
<h4 id="Example-Cast-string-numbers-to-double" class="common-anchor-header">Esempio: Conversione di numeri di stringa in numeri doppi</h4><div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Convert string numbers to double for indexing</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTEDfor JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;string_to_double_index&quot;</span>, <span class="hljs-comment"># Unique index name</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;string_price\&quot;]&quot;</span>, <span class="hljs-comment"># Path to the JSON key to be indexed</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;double&quot;</span>, <span class="hljs-comment"># Data cast type</span>
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;json_cast_function&quot;</span>: <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span> <span class="hljs-comment"># Cast function; case insensitive</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String,Object&gt; extraParams3 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams3.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;string_price\&quot;]&quot;</span>);
extraParams3.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;double&quot;</span>);
extraParams3.put(<span class="hljs-string">&quot;json_cast_function&quot;</span>, <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;metadata&quot;</span>)
        .indexName(<span class="hljs-string">&quot;string_to_double_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams3)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">jsonIndex3 := index.NewJSONPathIndex(index.AUTOINDEX, <span class="hljs-string">&quot;double&quot;</span>, <span class="hljs-string">`metadata[&quot;string_price&quot;]`</span>)
                    .WithIndexName(<span class="hljs-string">&quot;string_to_double_index&quot;</span>)

indexOpt3 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>, jsonIndex3)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><p>Il parametro <code translate="no">json_cast_type</code> è obbligatorio e deve essere uguale al tipo di output della funzione di cast.</p></li>
<li><p>Se la conversione fallisce (ad esempio, stringa non numerica), il valore viene saltato e non indicizzato.</p></li>
</ul>
</div>
<h3 id="Apply-indexes-to-the-collection" class="common-anchor-header">Applicare gli indici all'insieme</h3><p>Dopo aver definito i parametri degli indici, è possibile applicarli all'insieme utilizzando <code translate="no">create_index()</code>:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_index(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .indexParams(indexParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">indexTask1, err := client.CreateIndex(ctx, indexOpt1)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
indexTask2, err := client.CreateIndex(ctx, indexOpt2)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
indexTask3, err := client.CreateIndex(ctx, indexOpt3)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Filter-by-JSON-field-values" class="common-anchor-header">Filtrare in base ai valori dei campi JSON<button data-href="#Filter-by-JSON-field-values" class="anchor-icon" translate="no">
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
    </button></h2><p>Dopo aver inserito e indicizzato i campi JSON, è possibile filtrare su di essi utilizzando espressioni di filtro standard con la sintassi del percorso JSON.</p>
<p>Ad esempio:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata[&quot;category&quot;] == &quot;electronics&quot;&#x27;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata[&quot;price&quot;] &gt; 50&#x27;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains(metadata[&quot;tags&quot;], &quot;featured&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;metadata[&quot;category&quot;] == &quot;electronics&quot;&#x27;</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;metadata[&quot;price&quot;] &gt; 50&#x27;</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;json_contains(metadata[&quot;tags&quot;], &quot;featured&quot;)&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&#x27;metadata[&quot;category&quot;] == &quot;electronics&quot;&#x27;</span>
filter := <span class="hljs-string">&#x27;metadata[&quot;price&quot;] &gt; 50&#x27;</span>
filter := <span class="hljs-string">&#x27;json_contains(metadata[&quot;tags&quot;], &quot;featured&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per utilizzare queste espressioni in una ricerca o in una query, assicurarsi che:</p>
<ul>
<li><p>Sia stato creato un indice su ogni campo vettoriale.</p></li>
<li><p>L'insieme sia caricato in memoria.</p></li>
</ul>
<p>Per un elenco completo degli operatori e delle espressioni supportate, consultare la sezione <a href="/docs/it/json-operators.md">Operatori JSON</a>.</p>
<h2 id="Pull-it-all-together" class="common-anchor-header">Mettere insieme tutto<button data-href="#Pull-it-all-together" class="anchor-icon" translate="no">
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
    </button></h2><p>A questo punto si è imparato a definire, inserire e, facoltativamente, indicizzare valori strutturati all'interno di un campo JSON.</p>
<p>Per completare il flusso di lavoro in un'applicazione reale, è necessario anche:</p>
<ul>
<li><p><strong>Creare un indice sui campi vettoriali</strong> (obbligatorio per ogni campo vettoriale di una collezione).</p>
<p>Fare riferimento a <a href="/docs/it/create-collection.md#Optional-Set-Index-Parameters">Impostare i parametri dell'indice</a></p></li>
<li><p><strong>Caricare l'insieme</strong></p>
<p>Fare riferimento a <a href="/docs/it/load-and-release.md">Caricare e rilasciare</a></p></li>
<li><p><strong>Cercare o interrogare usando i filtri dei percorsi JSON</strong></p>
<p>Fare riferimento a <a href="/docs/it/filtered-search.md">Ricerca filtrata</a> e <a href="/docs/it/json-operators.md">operatori JSON</a></p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">DOMANDE FREQUENTI<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="What-are-the-differences-between-a-JSON-field-and-the-dynamic-field" class="common-anchor-header">Quali sono le differenze tra un campo JSON e un campo dinamico?</h3><ul>
<li><p>Il<strong>campo JSON</strong> è definito dallo schema. È necessario dichiarare esplicitamente il campo nello schema.</p></li>
<li><p>Il<strong>campo dinamico</strong> è un oggetto JSON nascosto (<code translate="no">$meta</code>) che memorizza automaticamente qualsiasi campo non definito nello schema.</p></li>
</ul>
<p>Entrambi supportano strutture annidate e l'indicizzazione dei percorsi JSON, ma i campi dinamici sono più adatti a strutture di dati opzionali o in evoluzione.</p>
<p>Per maggiori dettagli, consultare <a href="/docs/it/enable-dynamic-field.md">Campo dinamico</a>.</p>
<h3 id="Are-there-any-limitations-on-the-size-of-a-JSON-field" class="common-anchor-header">Ci sono limitazioni sulla dimensione di un campo JSON?</h3><p>Sì. Ogni campo JSON è limitato a 65.536 byte.</p>
<h3 id="Does-a-JSON-field-support-setting-a-default-value" class="common-anchor-header">Un campo JSON supporta l'impostazione di un valore predefinito?</h3><p>No, i campi JSON non supportano valori predefiniti. Tuttavia, è possibile impostare <code translate="no">nullable=True</code> quando si definisce il campo per consentire l'inserimento di voci vuote.</p>
<p>Fare riferimento a <a href="/docs/it/nullable-and-default.md">Nullable e Default</a> per i dettagli.</p>
<h3 id="Are-there-any-naming-conventions-for-JSON-field-keys" class="common-anchor-header">Esistono convenzioni di denominazione per le chiavi dei campi JSON?</h3><p>Sì. Per garantire la compatibilità con le query e l'indicizzazione:</p>
<ul>
<li><p>Utilizzare solo lettere, numeri e trattini bassi nelle chiavi JSON.</p></li>
<li><p>Evitare l'uso di caratteri speciali, spazi o punti (<code translate="no">.</code>, <code translate="no">/</code>, ecc.).</p></li>
<li><p>Le chiavi incompatibili possono causare problemi di parsing nelle espressioni dei filtri.</p></li>
</ul>
<h3 id="How-does-Milvus-handle-string-values-in-JSON-fields" class="common-anchor-header">Come gestisce Milvus i valori stringa nei campi JSON?</h3><p>Milvus memorizza i valori stringa esattamente come appaiono nell'input JSON, senza alcuna trasformazione semantica. Le stringhe non correttamente virgolettate possono causare errori durante l'analisi.</p>
<p><strong>Esempi di stringhe valide</strong>:</p>
<pre><code translate="no" class="language-plaintext">&quot;a\&quot;b&quot;, &quot;a&#x27;b&quot;, &quot;a\\b&quot;
<button class="copy-code-btn"></button></code></pre>
<p><strong>Esempi di stringhe non valide</strong>:</p>
<pre><code translate="no" class="language-plaintext">&#x27;a&quot;b&#x27;, &#x27;a\&#x27;b&#x27;
<button class="copy-code-btn"></button></code></pre>
<h3 id="What-filtering-logic-does-Milvus-use-for-indexed-JSON-paths" class="common-anchor-header">Quale logica di filtraggio utilizza Milvus per i percorsi JSON indicizzati?</h3><ul>
<li><p><strong>Indicizzazione numerica</strong>:</p>
<p>Se un indice viene creato con <code translate="no">json_cast_type=&quot;double&quot;</code>, solo le condizioni di filtro numeriche (ad esempio, <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">== 42</code>) faranno leva sull'indice. Le condizioni non numeriche costringeranno a una scansione brutale.</p></li>
<li><p><strong>Indicizzazione delle stringhe</strong>:</p>
<p>Se un indice utilizza <code translate="no">json_cast_type=&quot;varchar&quot;</code>, solo le condizioni di filtro di tipo stringa trarranno vantaggio dall'indice; gli altri tipi di condizioni saranno costretti a una ricerca brute-force.</p></li>
<li><p><strong>Indicizzazione booleana</strong>:</p>
<p>L'indicizzazione booleana si comporta in modo simile all'indicizzazione delle stringhe, con l'utilizzo dell'indice solo quando la condizione corrisponde strettamente a vero o falso.</p></li>
</ul>
<h3 id="How-do-term-expressions-work-with-JSON-field-indexing" class="common-anchor-header">Come funzionano le espressioni di termine con l'indicizzazione dei campi JSON?</h3><p>È possibile utilizzare le espressioni di termine come <code translate="no">json[&quot;field&quot;] IN [value1, value2, …]</code> per filtrare le entità.</p>
<ul>
<li><p>L'indice si applica solo se il valore desiderato è uno scalare.</p></li>
<li><p>Se <code translate="no">json[&quot;field&quot;]</code> è un array, la query non utilizzerà l'indice e ricorrerà a una ricerca brutale.</p></li>
</ul>
<h3 id="What-about-numeric-precision-when-indexing-JSON-fields" class="common-anchor-header">Che ne è della precisione numerica quando si indicizzano i campi JSON?</h3><p>Milvus memorizza tutti i valori numerici indicizzati come doppi.</p>
<p>Se un valore numerico supera <strong>2^53</strong>, può perdere precisione. Questa perdita di precisione può far sì che le query di filtro non corrispondano esattamente ai valori fuori range.</p>
<h3 id="How-does-Milvus-handle-data-integrity-for-JSON-field-indexing" class="common-anchor-header">Come gestisce Milvus l'integrità dei dati per l'indicizzazione dei campi JSON?</h3><p>Milvus non converte o normalizza automaticamente i tipi di dati incoerenti.</p>
<p>Ad esempio, se alcune righe memorizzano <code translate="no">&quot;price&quot;: &quot;99.99&quot;</code> come stringa e altre memorizzano <code translate="no">&quot;price&quot;: 99.99</code> come numero mentre l'indice è definito come double, solo le righe con valori numerici saranno indicizzate.</p>
<p>Le incoerenze causeranno il salto silenzioso delle righe interessate durante l'indicizzazione.</p>
<h3 id="What-happens-if-type-casting-fails-when-indexing-a-JSON-field" class="common-anchor-header">Cosa succede se il casting del tipo fallisce durante l'indicizzazione di un campo JSON?</h3><p>Se un valore non può essere lanciato all'indirizzo <code translate="no">json_cast_type</code> specificato (ad esempio, una stringa non numerica quando ci si aspetta un <code translate="no">double</code>), tale valore viene silenziosamente saltato e <strong>non incluso nell'indice</strong>. Di conseguenza, le entità con errori di fusione saranno <strong>escluse dai risultati dei filtri</strong> che si basano sull'indice.</p>
<p>Per evitare un comportamento imprevisto delle query, assicurarsi che tutti i valori nel percorso JSON indicizzato siano tipizzati in modo coerente.</p>
<h3 id="Can-I-create-multiple-indexes-on-the-same-JSON-path-with-different-cast-types" class="common-anchor-header">È possibile creare più indici sullo stesso percorso JSON con tipi di cast diversi?</h3><p>No, ogni percorso JSON supporta <strong>un solo indice</strong>. È necessario scegliere un singolo <code translate="no">json_cast_type</code> che corrisponda ai propri dati. La creazione di più indici sullo stesso percorso con tipi di cast diversi non è supportata.</p>
<h3 id="What-if-values-at-a-JSON-path-have-inconsistent-types" class="common-anchor-header">Cosa succede se i valori di un percorso JSON hanno tipi incoerenti?</h3><p>Tipi incoerenti tra le entità possono portare a un'<strong>indicizzazione parziale</strong>. Ad esempio, se <code translate="no">metadata[&quot;price&quot;]</code> è memorizzato sia come numero (<code translate="no">99.99</code>) che come stringa (<code translate="no">&quot;99.99&quot;</code>) e l'indice è definito con <code translate="no">json_cast_type=&quot;double&quot;</code>, solo i valori numerici saranno indicizzati. Le voci in forma di stringa verranno saltate e non appariranno nei risultati del filtro.</p>
<h3 id="Can-I-use-filters-with-a-different-type-than-the-indexed-cast-type" class="common-anchor-header">È possibile utilizzare filtri con un tipo diverso dal tipo di cast indicizzato?</h3><p>Se l'espressione del filtro utilizza un tipo diverso da quello dell'indice <code translate="no">json_cast_type</code>, il sistema <strong>non utilizzerà l'indice</strong> e potrà passare a una scansione bruta più lenta, se i dati lo consentono. Per ottenere prestazioni ottimali, allineare sempre l'espressione del filtro al tipo di cast dell'indice.</p>
